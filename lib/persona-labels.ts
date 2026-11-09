import type { CompanySize, PersonaProfile, SeatFunction } from "./schema";

export const FUNCTION_LABEL: Record<SeatFunction, string> = {
  security: "Security",
  engineering: "Engineering",
  it: "IT",
  "legal-privacy": "Legal and privacy",
  "finance-procurement": "Finance and procurement",
  executive: "Executive and board",
  people: "People",
  external: "Outside providers",
};

export const FUNCTION_ORDER = Object.keys(FUNCTION_LABEL) as SeatFunction[];

export const EVIDENCE_LABEL: Record<PersonaProfile["evidence"], string> = {
  sourced: "Sourced",
  practitioner_published: "Practitioner-published",
  field_validated: "Field-validated",
  hypothesis: "Hypothesis — test in discovery",
  unknown: "Unknown",
};

export const SIZE_LABEL: Record<CompanySize, string> = {
  small: "Small (under ~500)",
  "mid-market": "Mid-market (~500–5,000)",
  enterprise: "Enterprise (~5,000+)",
};

export const PRESENCE_LABEL = {
  dedicated: "Usually a dedicated role",
  shared: "Usually part of someone else's job",
  "usually-absent": "Usually not a separate role",
  external: "Usually outsourced",
} as const;

export function humanize(value: string): string {
  return value.replace(/-/g, " ").replace(/^\w/, (letter) => letter.toUpperCase());
}
