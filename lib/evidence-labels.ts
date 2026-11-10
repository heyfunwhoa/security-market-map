/**
 * One trust-label system for the whole map. Every status that says how far to trust a
 * statement maps to one of six labels. Colour on a pill means trust and nothing else;
 * source types, availability and taxonomy pills are neutral.
 */
export type TrustLabel = "Verified" | "Sourced" | "Vendor claim" | "Needs review" | "Conflicting" | "Unknown";

export const TRUST_LABELS: Record<string, TrustLabel> = {
  verified: "Verified",
  independently_verified: "Verified",
  evidenced: "Sourced",
  source_referenced: "Sourced",
  vendor_published: "Vendor claim",
  vendor_reported: "Vendor claim",
  needs_review: "Needs review",
  research_candidate: "Needs review",
  unverified: "Needs review",
  hypothesis: "Needs review",
  conflicting: "Conflicting",
  disputed: "Conflicting",
  unknown: "Unknown",
};

export const TRUST_TONES: Record<TrustLabel, string> = {
  Verified: "border-emerald-700/25 bg-emerald-50 text-emerald-950",
  Sourced: "border-indigo-800/20 bg-indigo-50 text-indigo-950",
  "Vendor claim": "border-sky-800/20 bg-sky-50 text-sky-950",
  "Needs review": "border-amber-800/25 bg-amber-50 text-amber-950",
  Conflicting: "border-rose-800/25 bg-rose-50 text-rose-950",
  Unknown: "border-dashed border-stone-500 bg-transparent text-stone-700",
};

/** What each trust label means, for legends and screen-reader descriptions. */
export const TRUST_MEANINGS: Record<TrustLabel, string> = {
  Verified: "Checked against an independent or primary public source.",
  Sourced: "Tied to a cited source, but not independently checked.",
  "Vendor claim": "The vendor published it. Dated, not independently tested.",
  "Needs review": "Recorded for a person to check. Not treated as fact.",
  Conflicting: "Sources disagree. Both stay on the page.",
  Unknown: "No source found yet. Not a verdict that the capability is missing.",
};

export function trustLabel(status: string): TrustLabel | undefined {
  return TRUST_LABELS[status];
}
