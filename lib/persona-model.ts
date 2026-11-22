import { catalog, type Catalog } from "./catalog";
import { companySizeBands } from "./data/company-segments";
import { acronymGlossary, seniorityLevels, titleForms, titleRules } from "./data/titles";
import { seats } from "./persona-graph";
import type { SeniorityLevel } from "./schema";
import { seatsByFunction, typicalTitles } from "./title-match";

/**
 * One JSON-able snapshot of the persona model, for other projects (Account Signal Engine, GTM tools,
 * ICP scoring) to consume without importing the whole catalog. Served at /api/persona-model.
 * Bump PERSONA_MODEL_VERSION when a field is renamed or removed.
 */
export const PERSONA_MODEL_VERSION = "1.2.0";

const LEVELS: SeniorityLevel[] = ["ic", "senior-ic", "manager", "director", "vp", "c-level"];

export function personaModel(source: Catalog = catalog) {
  return {
    version: PERSONA_MODEL_VERSION,
    asOf: source.asOf,
    seniorityLevels,
    companySizeBands,
    seats: seats(source).map((seat) => {
      const persona = source.personas.find((item) => item.id === seat.id);
      const stakeholder = source.stakeholders.find((item) => item.id === seat.id);
      return {
        id: seat.id,
        name: seat.name,
        kind: seat.kind,
        title: persona?.title ?? stakeholder?.title ?? "",
        aliases: persona?.aliases ?? stakeholder?.aliases ?? [],
        acronyms: acronymGlossary.filter((entry) => entry.seatIds.includes(seat.id)).map((entry) => entry.acronym),
        categoryIds: seat.categoryIds,
        discoveryQuestions: persona?.questions ?? stakeholder?.questions ?? [],
        titleForm: titleForms[seat.id],
        typicalTitles: typicalTitles(seat.id),
        profile: seat.profile,
      };
    }),
    useCaseSeats: source.useCaseSeats,
    segmentOverlays: source.segmentOverlays,
    acronymGlossary,
    titleRules,
    sourceIds: [...new Set(seats(source).flatMap((seat) => [
      ...seat.profile.sourceIds,
      ...seat.profile.pains.flatMap((pain) => pain.sourceIds),
      ...seat.profile.edges.flatMap((edge) => edge.sourceIds),
    ]))].sort(),
  };
}

export type PersonaModel = ReturnType<typeof personaModel>;

const FUNCTION_LABELS: Record<string, string> = {
  security: "Security",
  engineering: "Engineering",
  it: "IT",
  "legal-privacy": "Legal & privacy",
  "finance-procurement": "Finance & procurement",
  executive: "Executive & board",
  people: "People",
  external: "External providers",
};
const LEVEL_SHORT: Record<SeniorityLevel, string> = { ic: "IC", "senior-ic": "Sr IC", manager: "Mgr", director: "Dir", vp: "VP", "c-level": "C" };
const LEVEL_EXAMPLES: Record<SeniorityLevel, string> = {
  ic: "Engineer, Analyst, Administrator",
  "senior-ic": "Senior, Staff, Principal, Lead, Architect",
  manager: "Manager, Sr. Manager, Supervisor",
  director: "Director, Senior Director, Head of",
  vp: "VP, SVP, EVP",
  "c-level": "Chief …, CISO/CTO/CIO/CFO, Founder",
};

/** Markdown reference for docs/market-research/security-titles-and-pains.md. */
export function renderTitlesAndPains(source: Catalog = catalog): string {
  const sourceById = new Map(source.sources.map((item) => [item.id, item]));
  const lines: string[] = [
    "# Security seats — functions, titles, acronyms, and pains",
    "",
    `As of: ${source.asOf}. Generated from \`lib/data/persona-profiles.ts\`, \`lib/data/stakeholders.ts\`, and \`lib/data/titles.ts\` by \`renderTitlesAndPains()\`. Do not hand-edit; run \`npm run docs:personas\`.`,
    "",
    'Use `matchTitle("Sr. Manager, Product Security")` in `lib/title-match.ts` to resolve a real title to seat, function, seniority, and confidence. Titles and roles are hypotheses for routing research; confirm authority and budget in discovery.',
    "",
    "## Seniority levels",
    "",
    "| Level | Reads from titles like | Usually plays |",
    "| --- | --- | --- |",
    ...[...LEVELS].reverse().map((level) => `| ${seniorityLevels[level].label} | ${LEVEL_EXAMPLES[level]} | ${seniorityLevels[level].typicalBuyingRoles.join(", ")} |`),
    "",
    '"Head of" reads as director by default; at small companies it is often the top seat.',
    "",
    "## Acronyms that need care",
    "",
    "| Acronym | Means | Watch out |",
    "| --- | --- | --- |",
    ...acronymGlossary.filter((entry) => entry.caution).map((entry) => `| ${entry.acronym} | ${entry.expansion} | ${entry.caution} |`),
  ];
  const grouped = seatsByFunction(source);
  for (const [fn, label] of Object.entries(FUNCTION_LABELS)) {
    const list = grouped[fn as keyof typeof grouped];
    if (!list?.length) continue;
    lines.push("", `## ${label} (${list.length})`, "", "| Seat | Acronyms | Typical titles by level | Pains |", "| --- | --- | --- | --- |");
    for (const seat of list) {
      const profile = source.personaProfiles.find((item) => item.personaId === seat.id);
      if (!profile) continue;
      const titles = typicalTitles(seat.id);
      const titleCell = LEVELS.filter((level) => titles[level]?.length)
        .map((level) => `**${LEVEL_SHORT[level]}:** ${titles[level]!.slice(0, 2).join("; ")}`)
        .join("<br>");
      const painCell = profile.pains
        .map((pain) => {
          const publishers = pain.sourceIds.map((id) => sourceById.get(id)?.publisher ?? id).join(", ");
          if (pain.evidence === "hypothesis") return pain.pain;
          if (pain.evidence === "field_validated") return `${pain.pain} (field notes)`;
          return `${pain.pain} (${publishers})`;
        })
        .join("<br>");
      lines.push(`| \`${seat.id}\` ${seat.name} | ${seat.acronyms.join(", ") || "—"} | ${titleCell || "—"} | ${painCell} |`);
    }
  }
  lines.push(
    "",
    "Pains with a publisher in parentheses are sourced (survey or report; vendor-published sources are labeled in `lib/data/persona-sources.ts`). The rest are hypotheses.",
    "",
  );
  return lines.join("\n");
}
