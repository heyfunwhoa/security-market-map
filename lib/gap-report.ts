import { catalog, type Catalog } from "./catalog";
import { evidenceGraphProblems, type EvidenceGraph } from "./evidence-graph/contract";
import { marketMapGraph } from "./evidence-graph/market-map-slice";
import { seats } from "./persona-graph";
import { majorityTargetedSeats, targetingForCategory, TARGETING_MIN_VENDORS } from "./vendor-targeting";

/**
 * What the map doesn't know yet. Every gap is computed from the typed catalog and the
 * market-map evidence graph, so it can't invent problems or quietly fix them.
 */
export type GapKind =
  | "category-no-alternatives"
  | "category-no-owner"
  | "category-no-vendors"
  | "seat-no-sourced-pain"
  | "seat-no-objections"
  | "pain-unlinked"
  | "contested-ownership"
  | "stale-review"
  | "graph-problem";

export type Gap = { kind: GapKind; severity: "high" | "medium" | "low"; subjectId: string; message: string };

export const GAP_LABEL: Record<GapKind, string> = {
  "category-no-alternatives": "Categories with no alternatives recorded",
  "category-no-owner": "Categories with no owning seat",
  "category-no-vendors": "Categories with no vendors",
  "seat-no-sourced-pain": "Seats whose pains are all hypotheses",
  "seat-no-objections": "Seats with no objections recorded",
  "pain-unlinked": "Pains not linked to a category, capability, or use case",
  "contested-ownership": "Categories owned by many seats (check who really buys)",
  "stale-review": "Profiles not reviewed in 180+ days",
  "graph-problem": "Evidence graph contract problems",
};

const STALE_DAYS = 180;

export function gapReport(source: Catalog = catalog, now: Date = new Date(), graph: EvidenceGraph = marketMapGraph): Gap[] {
  const gaps: Gap[] = [];
  const allSeats = seats(source);
  const owners = new Map<string, string[]>();
  for (const seat of allSeats) for (const id of seat.categoryIds) owners.set(id, [...(owners.get(id) ?? []), seat.id]);

  for (const category of source.categories) {
    if (category.layer === "core" && !source.alternatives.some((alt) => alt.categoryId === category.id)) {
      gaps.push({ kind: "category-no-alternatives", severity: "medium", subjectId: category.id, message: `${category.name}: what do buyers do instead?` });
    }
    const owning = owners.get(category.id) ?? [];
    if (owning.length === 0) gaps.push({ kind: "category-no-owner", severity: "high", subjectId: category.id, message: `${category.name} has no owning seat.` });
    if (owning.length >= 4) {
      // Vendor targeting shows who gets pitched, not who buys, so the gap stays open and
      // carries the vendor counts as context until field notes settle it.
      const targeting = targetingForCategory(category.id, source);
      const pitched = targeting.vendorCount >= TARGETING_MIN_VENDORS
        ? ` Vendors mostly pitch ${majorityTargetedSeats(targeting).join(", ") || "no single seat"} (${targeting.vendorCount} vendors recorded).`
        : "";
      gaps.push({ kind: "contested-ownership", severity: "low", subjectId: category.id, message: `${category.name} is owned by ${owning.length} seats: ${owning.join(", ")}.${pitched}` });
    }
    const hasVendor = source.vendors.some((v) => v.primaryCategoryIds.includes(category.id) || v.adjacentCategoryIds.includes(category.id));
    if (!hasVendor) gaps.push({ kind: "category-no-vendors", severity: "low", subjectId: category.id, message: `${category.name} has no vendors in the catalog.` });
  }

  const seatsInObjections = new Set(source.objections.flatMap((obj) => obj.seatIds));
  for (const seat of allSeats) {
    const pains = seat.profile.pains;
    if (!pains.some((pain) => pain.evidence !== "hypothesis" && pain.evidence !== "unknown")) {
      gaps.push({ kind: "seat-no-sourced-pain", severity: "medium", subjectId: seat.id, message: `${seat.name}: ${pains.length} pains, none sourced or field-validated.` });
    }
    if (!seatsInObjections.has(seat.id) && seat.profile.objections.length === 0) {
      gaps.push({ kind: "seat-no-objections", severity: "low", subjectId: seat.id, message: `${seat.name} has no objections recorded.` });
    }
    for (const pain of pains) {
      if (pain.relatedCategoryIds.length + pain.relatedCapabilityIds.length + pain.relatedUseCaseIds.length === 0) {
        gaps.push({ kind: "pain-unlinked", severity: "low", subjectId: seat.id, message: `${seat.name}: "${pain.pain}"` });
      }
    }
    const reviewed = new Date(`${seat.profile.lastReviewedAt}T00:00:00Z`);
    if ((now.getTime() - reviewed.getTime()) / 86_400_000 > STALE_DAYS) {
      gaps.push({ kind: "stale-review", severity: "medium", subjectId: seat.id, message: `${seat.name} last reviewed ${seat.profile.lastReviewedAt}.` });
    }
  }

  for (const problem of evidenceGraphProblems(graph)) {
    gaps.push({ kind: "graph-problem", severity: "high", subjectId: graph.sliceId, message: problem });
  }
  return gaps;
}

export function gapSummary(gaps: Gap[]) {
  const byKind = new Map<GapKind, Gap[]>();
  for (const gap of gaps) byKind.set(gap.kind, [...(byKind.get(gap.kind) ?? []), gap]);
  return [...byKind.entries()].map(([kind, items]) => ({ kind, label: GAP_LABEL[kind], count: items.length, items }));
}
