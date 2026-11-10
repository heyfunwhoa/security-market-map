import type { Catalog } from "./catalog";
import { catalog } from "./catalog";
import { gapReport } from "./gap-report";
import { seats } from "./persona-graph";
import { typicalTitles } from "./title-match";
import { targetingForCategory } from "./vendor-targeting";

/**
 * Markdown export of the buyer library and market map, one file per seat and per category.
 * Generated from typed data; never edit the files by hand. Run `npm run context:md`.
 * Also writes `context/index.json` (a small search index) and `context/gaps.json`, which the
 * read-only MCP server in `scripts/context-mcp-server.mjs` reads offline.
 */

export type ContextFile = { path: string; content: string };
type IndexEntry = { id: string; type: string; title: string; text: string; file: string; evidence?: string };

const EVIDENCE: Record<string, string> = {
  sourced: "sourced",
  practitioner_published: "practitioner published",
  field_validated: "field validated",
  hypothesis: "hypothesis",
  unknown: "unknown",
};

function frontmatter(fields: Record<string, string | number>) {
  return ["---", ...Object.entries(fields).map(([key, value]) => `${key}: ${JSON.stringify(value)}`), "---", ""].join("\n");
}

function list(items: string[]) {
  return items.length === 0 ? "_None recorded._" : items.map((item) => `- ${item}`).join("\n");
}

export function renderContext(source: Catalog = catalog): ContextFile[] {
  const files: ContextFile[] = [];
  const index: IndexEntry[] = [];
  const sourceById = new Map(source.sources.map((s) => [s.id, s]));
  const categoryById = new Map(source.categories.map((c) => [c.id, c]));
  const allSeats = seats(source);
  const cite = (ids: readonly string[]) =>
    ids.length === 0 ? "" : ` (${ids.map((id) => { const s = sourceById.get(id); return s ? `[${s.publisher}](${s.url})` : id; }).join("; ")})`;
  const catName = (id: string) => categoryById.get(id)?.name ?? id;

  for (const seat of allSeats) {
    const p = seat.profile;
    const file = `context/seats/${seat.id}.md`;
    const sourcedPains = p.pains.filter((pain) => pain.evidence !== "hypothesis" && pain.evidence !== "unknown").length;
    const objections = source.objections.filter((o) => o.seatIds.includes(seat.id));
    const questions = source.qualificationQuestions.filter((q) => q.appliesTo.kind === "seat" && q.appliesTo.id === seat.id);
    const triggers = source.buyingTriggers.filter((t) => t.seatIds.includes(seat.id));
    const titles = typicalTitles(seat.id);
    const titleLines = Object.entries(titles)
      .filter(([, value]) => Array.isArray(value) && value.length > 0)
      .map(([level, value]) => `${level}: ${(value as string[]).join(", ")}`);
    const body = [
      frontmatter({ id: seat.id, type: "seat", name: seat.name, kind: seat.kind, function: p.function, sourcedPains, pains: p.pains.length }),
      `# ${seat.name}`,
      "",
      p.job,
      "",
      "## Typical titles",
      "",
      list(titleLines),
      "",
      "## Owns categories",
      "",
      list(seat.categoryIds.map((id) => `${catName(id)} (\`${id}\`)`)),
      "",
      "## Pains",
      "",
      list(p.pains.map((pain) => `${pain.pain} — ${EVIDENCE[pain.evidence] ?? pain.evidence}${cite(pain.sourceIds)}`)),
      "",
      "## Objections",
      "",
      list(objections.map((o) => `"${o.objection}" Usually about: ${o.underlyingConcern} Reframe to test: ${o.reframe} — ${EVIDENCE[o.evidence] ?? o.evidence}`)),
      "",
      "## Qualification questions",
      "",
      list(questions.map((q) => `${q.question} ${q.fit === "good" ? "Good fit if" : "Poor fit if"}: ${q.lookFor} (${q.weight} weight, ${EVIDENCE[q.evidence] ?? q.evidence})`)),
      "",
      "## Buying triggers",
      "",
      list(triggers.map((t) => `${t.trigger} — ${EVIDENCE[t.evidence] ?? t.evidence}${cite(t.sourceIds)}`)),
      "",
      "## Not a fit when",
      "",
      list(p.disconfirmation),
      "",
      "## Don't assume",
      "",
      list(p.doNotAssume),
      "",
      "_Generated from typed data in heyfunwhoa/security-market-map. Hypotheses are untested until field notes support them._",
      "",
    ].join("\n");
    files.push({ path: file, content: body });
    index.push({ id: seat.id, type: "seat", title: seat.name, text: `${seat.name} ${p.job} ${titleLines.join(" ")}`, file });
    p.pains.forEach((pain, i) => index.push({ id: `${seat.id}:${i}`, type: "pain", title: pain.pain, text: pain.pain, file, evidence: pain.evidence }));
    for (const o of objections) index.push({ id: o.id, type: "objection", title: o.objection, text: `${o.objection} ${o.underlyingConcern} ${o.reframe}`, file, evidence: o.evidence });
    for (const q of questions) index.push({ id: q.id, type: "question", title: q.question, text: `${q.question} ${q.lookFor}`, file, evidence: q.evidence });
  }

  for (const category of source.categories) {
    const file = `context/categories/${category.id}.md`;
    const owners = allSeats.filter((seat) => seat.categoryIds.includes(category.id));
    const primary = source.vendors.filter((v) => v.primaryCategoryIds.includes(category.id));
    const adjacent = source.vendors.filter((v) => v.adjacentCategoryIds.includes(category.id) && !v.primaryCategoryIds.includes(category.id));
    const alternatives = source.alternatives.filter((a) => a.categoryId === category.id);
    const objections = source.objections.filter((o) => o.categoryIds.includes(category.id));
    const triggers = source.buyingTriggers.filter((t) => t.categoryIds.includes(category.id));
    const body = [
      frontmatter({ id: category.id, type: "category", name: category.name, layer: category.layer, vendors: primary.length + adjacent.length }),
      `# ${category.name}`,
      "",
      category.definition,
      "",
      `**Buyer question:** ${category.buyerQuestion}`,
      "",
      `**Usual owner:** ${category.buyerOwner}`,
      "",
      `**Budget source:** ${category.budgetSource}`,
      "",
      "## Owning seats",
      "",
      list(owners.map((seat) => `${seat.name} (\`${seat.id}\`)`)),
      "",
      "## Who vendors sell to",
      "",
      targetingLines(category.id, source, allSeats),
      "",
      "## Vendors (primary)",
      "",
      list(primary.map((v) => `${v.name}: ${v.positioning}`)),
      "",
      "## Vendors (adjacent)",
      "",
      list(adjacent.map((v) => v.name)),
      "",
      "## What buyers do instead",
      "",
      list(alternatives.map((a) => `${a.name}. Good enough when: ${a.whenItWins} Breaks when: ${a.whenItBreaks} — ${EVIDENCE[a.evidence] ?? a.evidence}`)),
      "",
      "## Objections",
      "",
      list(objections.map((o) => `"${o.objection}" — ${EVIDENCE[o.evidence] ?? o.evidence}`)),
      "",
      "## Triggers",
      "",
      list([...category.triggers, ...triggers.map((t) => t.trigger)]),
      "",
      "_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._",
      "",
    ].join("\n");
    files.push({ path: file, content: body });
    index.push({ id: category.id, type: "category", title: category.name, text: `${category.name} ${category.definition} ${category.buyerQuestion}`, file });
    for (const a of alternatives) index.push({ id: a.id, type: "alternative", title: a.name, text: `${a.name} ${a.whenItWins} ${a.whenItBreaks}`, file, evidence: a.evidence });
  }

  files.push({ path: "context/index.json", content: `${JSON.stringify(index)}\n` });
  files.push({ path: "context/gaps.json", content: `${JSON.stringify(gapReport(source, new Date("2026-11-09")))}\n` });
  files.push({
    path: "context/README.md",
    content: [
      "# Context export",
      "",
      "Generated by `npm run context:md` from the typed catalog. Do not edit by hand; a test fails if these files drift from the data.",
      "",
      `- \`seats/\`: ${allSeats.length} seats`,
      `- \`categories/\`: ${source.categories.length} categories`,
      "- `index.json`: search index read by `scripts/context-mcp-server.mjs`",
      "- `gaps.json`: gap report",
      "",
    ].join("\n"),
  });
  return files;
}

function targetingLines(categoryId: string, source: Catalog, allSeats: { id: string; name: string }[]): string {
  const targeting = targetingForCategory(categoryId, source);
  if (targeting.vendorCount === 0) return "- None recorded.";
  const name = (id: string) => allSeats.find((seat) => seat.id === id)?.name ?? id;
  return [
    `From ${targeting.vendorCount} vendors' own pages, mapped to seats editorially. Vendor audience, not proof of who buys.`,
    "",
    ...targeting.seats.map(({ seatId, count }) => `- ${name(seatId)} (\`${seatId}\`): ${count} of ${targeting.vendorCount} vendors`),
  ].join("\n");
}

