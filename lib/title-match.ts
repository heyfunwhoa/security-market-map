import { catalog, type Catalog } from "./catalog";
import { acronymGlossary, seniorityLevels, titleForms, titleRules, type TitleRule } from "./data/titles";
import { seats, type Seat } from "./persona-graph";
import type { BuyingRole, SeatFunction, SeniorityLevel } from "./schema";

/**
 * Title → seat matching. Reads a raw job title, detects seniority, and ranks candidate seats using
 * persona/stakeholder aliases, per-seat title stems, the acronym glossary, and rules for generic titles.
 * Output is a routing hint, not a fact about authority or budget.
 */

export type MatchConfidence = "high" | "medium" | "low";

export type TitleCandidate = {
  seatId: string;
  name: string;
  function: SeatFunction;
  score: number;
  confidence: MatchConfidence;
  via: string[];
};

export type TitleMatch = {
  title: string;
  normalized: string;
  seniority: SeniorityLevel;
  candidates: TitleCandidate[];
  /** True when the top candidates are close, or the best match came only from a generic-title rule. */
  ambiguous: boolean;
  notes: string[];
  /** Buying roles for the top candidate at this seniority (seat roles ∩ level roles; falls back to seat roles). */
  likelyBuyingRoles: BuyingRole[];
};

const LEVEL_ORDER: SeniorityLevel[] = ["c-level", "vp", "director", "manager", "senior-ic", "ic"];
const RULE_SCORE: Record<TitleRule["confidence"], number> = { high: 3, medium: 2, low: 1 };

/** Aliases too generic to identify a seat on their own; they score like an acronym hint. */
const WEAK_ALIASES = new Set(["team lead", "security analyst", "soc", "em", "ir", "security", "privacy", "platform", "board", "legal", "hr", "people", "founder", "co founder"]);
/** One-word stems that name a broad area; they lose to more specific stems. */
const GENERIC_STEMS = new Set(["security", "platform", "engineering", "it", "software", "identity", "detection", "trust", "people", "systems", "application", "infrastructure", "development", "technology", "finance", "legal", "board", "ai"]);

export function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9+]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const phrase = (needle: string) => new RegExp(`(^| )${needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}( |$)`);

export function detectSeniority(normalized: string): SeniorityLevel {
  for (const level of LEVEL_ORDER) {
    if (level === "ic") break;
    if (seniorityLevels[level].patterns.some((pattern) => new RegExp(pattern).test(normalized))) return level;
  }
  return "ic";
}

const confidenceFor = (score: number): MatchConfidence => (score >= 2.5 ? "high" : score >= 1.8 ? "medium" : "low");

function aliasesFor(seat: Seat, source: Catalog): string[] {
  const persona = source.personas.find((item) => item.id === seat.id);
  const stakeholder = source.stakeholders.find((item) => item.id === seat.id);
  return [seat.name, ...(persona?.aliases ?? []), ...(stakeholder?.aliases ?? [])];
}

export function matchTitle(title: string, source: Catalog = catalog): TitleMatch {
  const normalized = normalizeTitle(title);
  const seniority = detectSeniority(normalized);
  const allSeats = seats(source);
  const best = new Map<string, { score: number; via: Set<string> }>();
  const notes = new Set<string>();
  const bump = (seatId: string, score: number, via: string) => {
    const current = best.get(seatId) ?? { score: 0, via: new Set<string>() };
    current.score = Math.max(current.score, score);
    current.via.add(via);
    best.set(seatId, current);
  };

  // 1. Rules for generic and overloaded titles.
  const firedRules = titleRules.filter((rule) => new RegExp(rule.pattern).test(normalized));
  const socAudit = firedRules.some((rule) => rule.id === "soc-audit");
  for (const rule of firedRules) {
    notes.add(rule.note);
    for (const seatId of rule.seatIds) bump(seatId, rule.specific ? 4 : RULE_SCORE[rule.confidence], `rule:${rule.id}`);
  }
  const blockedBySocAudit = (needle: string) => socAudit && /(^| )soc( |$)/.test(needle);

  for (const seat of allSeats) {
    // 2. Exact aliases. Multi-word aliases are stronger than single acronyms.
    for (const alias of aliasesFor(seat, source)) {
      const needle = normalizeTitle(alias);
      if (needle.length < 2 || blockedBySocAudit(needle)) continue;
      if (phrase(needle).test(normalized)) {
        const words = needle.split(" ").length;
        // An alias that carries its own seniority ("VP Security") must be the whole title;
        // otherwise "VP Security Operations" would read as the CISO.
        const leveled = /(^| )(vp|vice president|head|director|chief|svp|evp)( |$)/.test(needle);
        if (leveled && needle !== normalized) continue;
        const score = WEAK_ALIASES.has(needle) ? 1.5 : words > 1 ? 3 + words * 0.1 : 2.5;
        bump(seat.id, score, `alias:${alias}`);
      }
    }
    // 3. Title stems, gated by the levels the seat usually reaches and an IC noun at IC levels.
    const form = titleForms[seat.id];
    if (form && form.levels.includes(seniority)) {
      for (const stem of form.stems) {
        const needle = normalizeTitle(stem);
        if (!needle || blockedBySocAudit(needle) || !phrase(needle).test(normalized)) continue;
        const isIcLevel = seniority === "ic" || seniority === "senior-ic";
        const nounHit = form.icNouns.some((noun) => phrase(normalizeTitle(noun)).test(normalized));
        if (isIcLevel && form.icNouns.length > 0 && !nounHit) continue;
        const base = GENERIC_STEMS.has(needle) ? 1.6 : 2 + needle.split(" ").length * 0.1;
        bump(seat.id, base + (nounHit ? 0.3 : 0), `stem:${stem}`);
      }
    }
  }

  // 4. Acronym glossary (weak on its own; adds cautions).
  for (const entry of acronymGlossary) {
    const needle = normalizeTitle(entry.acronym);
    if (!needle || blockedBySocAudit(needle) || !phrase(needle).test(normalized)) continue;
    if (entry.caution) notes.add(`${entry.acronym}: ${entry.caution}`);
    for (const seatId of entry.seatIds) bump(seatId, 1.5, `acronym:${entry.acronym}`);
  }

  const seatById = new Map(allSeats.map((seat) => [seat.id, seat]));
  const candidates: TitleCandidate[] = [...best.entries()]
    .flatMap(([seatId, hit]) => {
      const seat = seatById.get(seatId);
      if (!seat) return [];
      return [{
        seatId,
        name: seat.name,
        function: seat.profile.function,
        score: Math.round(hit.score * 100) / 100,
        confidence: confidenceFor(hit.score),
        via: [...hit.via],
      }];
    })
    .sort((a, b) => b.score - a.score || a.seatId.localeCompare(b.seatId))
    .slice(0, 5);

  const [top, second] = candidates;
  const onlyRules = top ? top.via.every((via) => via.startsWith("rule:")) && top.confidence !== "high" : false;
  const lowRuleSeats = new Set(firedRules.filter((rule) => rule.confidence === "low").flatMap((rule) => rule.seatIds));
  const weakTop = top !== undefined && top.confidence !== "high" && lowRuleSeats.has(top.seatId);
  const seatlessRule = firedRules.some((rule) => rule.seatIds.length === 0);
  const ambiguous = seatlessRule || !top || (second !== undefined && top.score - second.score < 0.3) || onlyRules || weakTop;
  if (seniority === "director" && /\bhead\b/.test(normalized)) notes.add("Head of can be the top security seat at smaller companies.");

  return {
    title,
    normalized,
    seniority,
    candidates,
    ambiguous,
    notes: [...notes],
    likelyBuyingRoles: top ? buyingRolesFor(top.seatId, seniority, source) : [],
  };
}

/** Seat roles that this seniority level usually plays; falls back to the seat's roles. */
export function buyingRolesFor(seatId: string, seniority: SeniorityLevel, source: Catalog = catalog): BuyingRole[] {
  const profile = source.personaProfiles.find((item) => item.personaId === seatId);
  if (!profile) return [];
  const levelRoles = new Set(seniorityLevels[seniority].typicalBuyingRoles);
  const overlap = profile.buyingRoles.filter((role) => levelRoles.has(role));
  return overlap.length ? overlap : profile.buyingRoles;
}

/** Typical titles for a seat at each level it reaches, generated from its title form. */
export function typicalTitles(seatId: string): Partial<Record<SeniorityLevel, string[]>> {
  const form = titleForms[seatId];
  if (!form) return {};
  const [stem, altStem] = form.stems;
  const [noun] = form.icNouns;
  const out: Partial<Record<SeniorityLevel, string[]>> = {};
  const add = (level: SeniorityLevel, titles: string[]) => {
    if (!form.levels.includes(level)) return;
    const clean = [...new Set(titles.filter(Boolean))];
    if (clean.length) out[level] = clean;
  };
  if (stem) {
    add("ic", noun ? [`${stem} ${noun}`, altStem ? `${altStem} ${noun}` : ""] : [stem]);
    const engineeringLadder = noun !== undefined && /engineer|architect|researcher|developer/i.test(noun);
    add(
      "senior-ic",
      !noun
        ? [`Senior ${stem}`]
        : engineeringLadder
          ? [`Senior ${stem} ${noun}`, `Staff ${stem} ${noun}`, `Principal ${stem} ${noun}`]
          : [`Senior ${stem} ${noun}`, `Lead ${stem} ${noun}`],
    );
    add("manager", [`${stem} Manager`, altStem ? `${altStem} Manager` : ""]);
    add("director", [`Director of ${stem}`, `Head of ${stem}`]);
    add("vp", [`VP of ${stem}`]);
  }
  const chiefAliases = [
    ...(catalog.personas.find((item) => item.id === seatId)?.aliases ?? []),
    ...(catalog.stakeholders.find((item) => item.id === seatId)?.aliases ?? []),
  ].filter((alias) => /^chief\b|^c[a-z]{1,2}o$/i.test(alias) || /founder|board|committee/i.test(alias));
  add("c-level", chiefAliases);
  return out;
}

/** Seats grouped by function, each with its acronyms. */
export function seatsByFunction(source: Catalog = catalog): Record<SeatFunction, { id: string; name: string; acronyms: string[] }[]> {
  const grouped = {} as Record<SeatFunction, { id: string; name: string; acronyms: string[] }[]>;
  for (const seat of seats(source)) {
    const acronyms = acronymGlossary.filter((entry) => entry.seatIds.includes(seat.id)).map((entry) => entry.acronym);
    (grouped[seat.profile.function] ??= []).push({ id: seat.id, name: seat.name, acronyms });
  }
  return grouped;
}
