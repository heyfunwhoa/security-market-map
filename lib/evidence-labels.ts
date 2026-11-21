/**
 * One vocabulary for evidence and status badges across the site (docs/ui-bank-adoption.md).
 * Every page that shows a claim, source or review state uses these labels via StatusPill,
 * so the same state never reads differently on two pages.
 */
export const EVIDENCE_LABELS: Record<string, string> = {

  verified: "Independent source",
  vendor_published: "Vendor said this",
  needs_review: "Needs review",
  conflicting: "Conflicting",
  superseded: "Superseded",
  research_candidate: "Research candidate",
  evidenced: "Evidence",
  limited: "Scoped",
  unverified: "Unverified",
  unknown: "Unknown",
  not_supported: "Not supported",
  taxonomy_mapping: "Taxonomy mapping",
  catalog_structure: "Catalog structure",
  hypothesis: "Hypothesis",
  source_referenced: "Source referenced",
  vendor_reported: "Vendor reported",
  independently_verified: "Independently verified",
  disputed: "Disputed",
  announced: "Announced",
  generally_available: "Documented",
  legacy_name: "Name in transition",
  official_docs: "Official docs",
  vendor_marketing: "Vendor marketing",
  press_release: "Press release",
  customer_story: "Customer story",
  analyst: "Analyst",
  review: "Review",
  standard: "Standard",
  internal_note: "Internal note",
  news: "News coverage",
  legal_summary: "Legal summary",
  academic: "Academic research",
  direct_competitor: "Direct competitor",
  bundled_alternative: "Bundled alternative",
  complement: "Complement",
  adjacent_budget: "Adjacent budget",
  seed_reviewed: "Seed reviewed",
  approved: "Reviewed",
  reported: "Reported",
  observed: "Observed",
  draft: "Draft",
  reviewed: "Reviewed",
  not_evaluated: "Not evaluated",
  recheck_due: "Recheck due",
};

/** Known label, or the code made readable (never a raw snake_case token on screen). */
export function evidenceLabel(status: string): string {
  const known = EVIDENCE_LABELS[status];
  if (known) return known;
  const words = status.replaceAll("_", " ").trim();
  return words ? words[0].toUpperCase() + words.slice(1) : "Unknown";
}
