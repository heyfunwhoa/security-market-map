/**
 * One trust-label system for the whole map. Every status that says how far to trust a
 * statement maps to one of eight labels. Colour on a pill means trust and nothing else;
 * source types, availability and taxonomy pills are neutral.
 */
export type TrustLabel =
  | "Verified"
  | "Sourced"
  | "Vendor said this"
  | "Needs review"
  | "Lead"
  | "Conflicting"
  | "Outdated"
  | "Unknown";

export const TRUST_LABELS: Record<string, TrustLabel> = {
  verified: "Verified",
  independently_verified: "Verified",
  field_validated: "Verified",
  evidenced: "Sourced",
  source_referenced: "Sourced",
  practitioner_published: "Sourced",
  // Incident epistemic statuses: a source reports it, or a primary party observed it.
  reported: "Sourced",
  observed: "Sourced",
  vendor_published: "Vendor said this",
  vendor_reported: "Vendor said this",
  needs_review: "Needs review",
  unverified: "Needs review",
  research_candidate: "Lead",
  hypothesis: "Lead",
  conflicting: "Conflicting",
  disputed: "Conflicting",
  superseded: "Outdated",
  unknown: "Unknown",
};

export const TRUST_TONES: Record<TrustLabel, string> = {
  Verified: "border-emerald-700/25 bg-emerald-50 text-emerald-950 dark:border-emerald-400/30 dark:bg-emerald-950 dark:text-emerald-100",
  Sourced: "border-indigo-800/20 bg-indigo-50 text-indigo-950 dark:border-indigo-400/30 dark:bg-indigo-950 dark:text-indigo-100",
  "Vendor said this": "border-sky-800/20 bg-sky-50 text-sky-950 dark:border-sky-400/30 dark:bg-sky-950 dark:text-sky-100",
  "Needs review": "border-amber-800/25 bg-amber-50 text-amber-950 dark:border-amber-400/30 dark:bg-amber-950 dark:text-amber-100",
  Lead: "border-dashed border-amber-800/40 bg-transparent text-amber-950 dark:border-amber-400/40 dark:text-amber-100",
  Conflicting: "border-rose-800/25 bg-rose-50 text-rose-950 dark:border-rose-400/30 dark:bg-rose-950 dark:text-rose-100",
  Outdated: "border-stone-300 bg-stone-100 text-stone-600 line-through decoration-stone-400 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-300",
  Unknown: "border-dashed border-stone-500 bg-transparent text-stone-700 dark:border-stone-400 dark:text-stone-200",
};

/** What each trust label means, for legends and screen-reader descriptions. */
export const TRUST_MEANINGS: Record<TrustLabel, string> = {
  Verified: "Checked against an independent or primary public source.",
  Sourced: "Tied to a cited source, but not independently checked.",
  "Vendor said this": "The vendor published it. Dated, not independently tested.",
  "Needs review": "Has a source that a person still needs to check.",
  Lead: "An idea or tip with no source yet. Not treated as fact.",
  Conflicting: "Sources disagree. Both stay on the page.",
  Outdated: "Replaced by newer evidence. Kept for history.",
  Unknown: "No source found yet. Not a verdict that the capability is missing.",
};

export function trustLabel(status: string): TrustLabel | undefined {
  return TRUST_LABELS[status];
}

/**
 * Compare-grid answers: what the evidence says the product does. Separate from trust.
 * "Not supported" must never look like Unknown: the vendor saying no is not "we don't know".
 */
export const ANSWER_LABELS: Record<string, { label: string; tone: string }> = {
  limited: { label: "Scoped", tone: "border-stone-600 bg-white text-stone-900 dark:border-stone-400 dark:bg-stone-900 dark:text-stone-100" },
  not_supported: { label: "Not supported", tone: "border-stone-700 bg-stone-700 text-white dark:border-stone-300 dark:bg-stone-200 dark:text-stone-900" },
};

/** Fallback for a status with no label yet: readable words, never a raw snake_case code on screen. */
export function readableStatus(status: string): string {
  const words = status.replaceAll("_", " ").trim();
  return words ? words[0].toUpperCase() + words.slice(1) : "Unknown";
}
