import type { Claim } from "./schema";

/** Who said it. Vendor material includes press releases and vendor-published customer stories. */
export type SourceKind = "vendor" | "analyst" | "third-party";

export const VENDOR_SOURCE_TYPES: Claim["sourceType"][] = [
  "official_docs",
  "vendor_marketing",
  "press_release",
  "customer_story",
];

export function sourceKind(type: Claim["sourceType"]): SourceKind {
  if (VENDOR_SOURCE_TYPES.includes(type)) return "vendor";
  if (type === "analyst") return "analyst";
  return "third-party";
}

/** "3 vendor · 1 analyst · 0 third-party": always lists all three so a missing kind is visible. */
export function sourceMix(claims: Pick<Claim, "sourceType">[]): string {
  const count = (kind: SourceKind) => claims.filter((claim) => sourceKind(claim.sourceType) === kind).length;
  return `${count("vendor")} vendor · ${count("analyst")} analyst · ${count("third-party")} third-party`;
}

/**
 * Drops a leading "<Speaker> says (that)" from a claim statement for display in a row that already
 * names the source. Only "says" is dropped; "reports", "describes" and other framing verbs stay,
 * because removing them would change what the sentence asserts.
 */
export function withoutAttribution(statement: string): string {
  const match = /^[A-Z][\w&.'’-]*(?: [\w&.'’-]+){0,5} says (?:that )?(.+)$/.exec(statement);
  // "Bay says it was deployed…" would leave "It" with no subject, so keep the speaker.
  if (!match || /^(it|its|they|their)\b/i.test(match[1])) return statement;
  const rest = match[1];
  return rest.charAt(0).toUpperCase() + rest.slice(1);
}
