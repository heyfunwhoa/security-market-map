import { catalog } from "./catalog";

/**
 * Acronyms that get a hover definition on first use. Every definition comes from data the site
 * already holds: a glossary entry, a category record, or, for SACR, the source ledger. No
 * definition is written here.
 */
type TermSource = { glossaryId: string } | { categoryId: string } | { publisher: string };

const SOURCES: Record<string, TermSource> = {
  // Glossary entries
  EPP: { glossaryId: "epp" },
  EDR: { glossaryId: "edr" },
  "AI-EDR": { glossaryId: "ai-edr" },
  ECPP: { glossaryId: "ecpp" },
  NHI: { glossaryId: "nhi" },
  ITDR: { glossaryId: "itdr" },
  CIEM: { glossaryId: "ciem" },
  CIAM: { glossaryId: "ciam" },
  MCP: { glossaryId: "mcp" },
  JIT: { glossaryId: "jit" },
  JML: { glossaryId: "jml" },
  // Category records
  ECP: { categoryId: "endpoint-control" },
  NDR: { categoryId: "ndr" },
  CDR: { categoryId: "cloud-detection" },
  MDR: { categoryId: "mdr" },
  AISOC: { categoryId: "ai-soc-investigation" },
  IGA: { categoryId: "iga" },
  PAM: { categoryId: "pam" },
  SAST: { categoryId: "sast" },
  DAST: { categoryId: "dast" },
  SCA: { categoryId: "sca" },
  ASPM: { categoryId: "aspm" },
  CSPM: { categoryId: "cspm" },
  CWPP: { categoryId: "cwpp" },
  CNAPP: { categoryId: "cnapp" },
  SSPM: { categoryId: "sspm" },
  DSPM: { categoryId: "dspm" },
  DLP: { categoryId: "dlp" },
  SIEM: { categoryId: "siem" },
  SOAR: { categoryId: "soar" },
  XDR: { categoryId: "xdr" },
  SDPP: { categoryId: "security-data-pipelines" },
  // Source ledger
  SACR: { publisher: "Software Analyst Cyber Research" },
};

export type TermDefinition = { term: string; title: string; definition: string; href: string };

export function termDefinition(acronym: string): TermDefinition | null {
  const source = SOURCES[acronym];
  if (!source) return null;
  if ("glossaryId" in source) {
    const entry = catalog.glossary.find((item) => item.id === source.glossaryId);
    return entry ? { term: acronym, title: entry.term, definition: entry.definition, href: `/learn#${entry.id}` } : null;
  }
  if ("categoryId" in source) {
    const entry = catalog.categories.find((item) => item.id === source.categoryId);
    return entry ? { term: acronym, title: entry.name, definition: entry.definition, href: `/categories/${entry.slug}` } : null;
  }
  const reports = catalog.sources.filter((item) => item.publisher.startsWith(source.publisher)).length;
  if (reports === 0) return null;
  return {
    term: acronym,
    title: source.publisher,
    definition: `An analyst publisher this map cites. ${reports} of its pages are on the source ledger. Not a ranking or a vendor classification.`,
    href: "/sources",
  };
}

export const DEFINED_TERMS = Object.keys(SOURCES);

/**
 * Split text into plain strings and the first occurrence of each defined acronym not yet in
 * `seen`. Pass one Set per page so only the first use on the page is marked.
 */
export function splitTerms(text: string, seen: Set<string>): (string | TermDefinition)[] {
  const pattern = new RegExp(`\\b(${DEFINED_TERMS.join("|")})\\b`, "g");
  const parts: (string | TermDefinition)[] = [];
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    const acronym = match[1];
    if (seen.has(acronym)) continue;
    const definition = termDefinition(acronym);
    if (!definition) continue;
    seen.add(acronym);
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(definition);
    last = match.index + acronym.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}
