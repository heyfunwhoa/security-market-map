export type SearchHit = {
  href: string;
  kind: string;
  title: string;
  text: string;
};

export type SearchGroup = { label: string; hits: SearchHit[] };

/** Display order for grouped results. Kinds not listed here sort after these. */
export const SEARCH_GROUPS: { label: string; kinds: string[] }[] = [
  { label: "Vendors and products", kinds: ["Vendor", "Product"] },
  { label: "Use cases", kinds: ["Use case"] },
  { label: "Categories and domains", kinds: ["Category", "Domain"] },
  { label: "Buyer seats", kinds: ["Buyer seat"] },
  { label: "Terms", kinds: ["Glossary"] },
  { label: "Incidents", kinds: ["Incident"] },
  { label: "Claims and graph", kinds: ["Claim", "Graph"] },
];

const KIND_ORDER = SEARCH_GROUPS.flatMap((group) => group.kinds);
const MAX_RESULTS = 24;
/** Claims are numerous and wordy; keep them from crowding out named records. */
const MAX_CLAIMS = 2;

/** Groups of equivalent words, e.g. ["nhi", "non-human identity"]. */
export type AliasGroups = string[][];

const normalize = (value: string) => value.trim().toLowerCase().replace(/\s+/g, " ");

/**
 * Builds alias groups from glossary terms: the id, the term, the term without a
 * trailing "(ACRONYM)", the acronym itself, and an expansion written as "Expansion: ..."
 * or "ACRONYM. Expansion." at the start of the definition.
 */
export function aliasesFromGlossary(
  terms: { id: string; term: string; definition: string }[],
): AliasGroups {
  return terms.map((entry) => {
    const words = new Set<string>([normalize(entry.id.replace(/-/g, " ")), normalize(entry.term)]);
    const paren = entry.term.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
    if (paren) {
      words.add(normalize(paren[1]));
      words.add(normalize(paren[2]));
    }
    const lead = entry.definition.match(/^([A-Z][A-Za-z -]{6,80}?)[:.]/);
    if (lead && /^[A-Z0-9-]{2,8}$/.test(entry.term.trim())) words.add(normalize(lead[1]));
    return [...words].filter((word) => word.length >= 2);
  });
}

/** Common market wording that the glossary doesn't spell out. Edit freely. */
export const EXTRA_ALIASES: AliasGroups = [
  ["pam", "privileged access management", "privileged access"],
  ["iga", "identity governance", "identity governance and administration"],
  ["cspm", "cloud security posture management"],
  ["cnapp", "cloud-native application protection platform"],
  ["sso", "single sign-on"],
  ["mfa", "multi-factor authentication"],
  ["leaked key", "leaked secret", "exposed secret", "leaked credential", "exposed credential"],
];

function expand(needle: string, aliases: AliasGroups): string[] {
  const out = new Set([needle]);
  for (const group of aliases) if (group.includes(needle)) for (const word of group) out.add(word);
  return [...out];
}

function score(hit: SearchHit, needle: string): number {
  const title = hit.title.toLowerCase();
  if (title === needle) return 100;
  if (title.startsWith(needle)) return 80;
  if (new RegExp(`\\b${needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(title)) return 60;
  if (title.includes(needle)) return 50;
  if (`${hit.text} ${hit.kind}`.toLowerCase().includes(needle)) return 20;
  // Every word present, in any order: "leaked key" finds "key leaked in a repo".
  const words = needle.split(" ").filter((word) => word.length >= 2);
  if (words.length > 1) {
    if (words.every((word) => title.includes(word))) return 40;
    const all = `${title} ${hit.text}`.toLowerCase();
    if (words.every((word) => all.includes(word))) return 15;
  }
  return 0;
}

/**
 * Ranked search: exact title, then title starts with, then a word in the title, then
 * anywhere in the title, then the description. Alias matches score a little lower than
 * the typed word. An exact glossary acronym stays first, and claims are capped.
 */
export function searchHits(query: string, hits: SearchHit[], aliases: AliasGroups = []): SearchHit[] {
  const needle = normalize(query);
  if (needle.length < 2) return [];
  const needles = expand(needle, aliases);
  const ranked = hits
    .map((hit, index) => {
      const best = Math.max(
        ...needles.map((word) => score(hit, word) - (word === needle ? 0 : 5)),
      );
      const exactTerm = hit.kind === "Glossary" && hit.href === `/learn#${needle}` ? 1000 : 0;
      return { hit, index, value: best + exactTerm };
    })
    .filter((row) => row.value > 0)
    .sort((a, b) => {
      if (b.value !== a.value) return b.value - a.value;
      const kind = rank(a.hit.kind) - rank(b.hit.kind);
      return kind !== 0 ? kind : a.index - b.index;
    });
  const results: SearchHit[] = [];
  let claims = 0;
  for (const { hit } of ranked) {
    if (hit.kind === "Claim" && ++claims > MAX_CLAIMS) continue;
    results.push(hit);
    if (results.length === MAX_RESULTS) break;
  }
  return results;
}

function rank(kind: string): number {
  const at = KIND_ORDER.indexOf(kind);
  return at === -1 ? KIND_ORDER.length : at;
}

/**
 * Splits ranked hits into display groups. Groups appear in the order of their best hit,
 * so the strongest match is always in the first group; rank order is kept inside each.
 */
export function groupSearchHits(hits: SearchHit[], perGroup = 5): SearchGroup[] {
  const groups = SEARCH_GROUPS.map((group) => ({
    label: group.label,
    first: hits.findIndex((hit) => group.kinds.includes(hit.kind)),
    hits: hits.filter((hit) => group.kinds.includes(hit.kind)).slice(0, perGroup),
  }));
  const otherHits = hits.filter((hit) => !KIND_ORDER.includes(hit.kind));
  if (otherHits.length) {
    groups.push({ label: "Other", first: hits.indexOf(otherHits[0]), hits: otherHits.slice(0, perGroup) });
  }
  return groups
    .filter((group) => group.hits.length > 0)
    .sort((a, b) => a.first - b.first)
    .map(({ label, hits: groupHits }) => ({ label, hits: groupHits }));
}
