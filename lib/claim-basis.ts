import type { Claim } from "./schema";

/** One sentence on how a claim was checked. Shown in the source badge tooltip. */
export function evidenceBasis(claim: Pick<Claim, "verificationStatus" | "sourceType">): string {
  if (claim.verificationStatus === "verified" && claim.sourceType === "standard") {
    return "Checked against an independent public source. This is not a test of a product.";
  }
  if (claim.verificationStatus === "vendor_published") {
    return "Vendor published. Not independently tested.";
  }
  if (claim.sourceType === "analyst") {
    return "Taken from a public analyst page. Paid report text and rankings are not copied here.";
  }
  if (claim.verificationStatus === "conflicting") {
    return "Two sources disagree. Both stay on the page.";
  }
  if (claim.verificationStatus === "needs_review") {
    return "Saved for a person to check. It is not treated as fact.";
  }
  return "Tied to the source linked on this card.";
}

/**
 * Notes in the data often end with the same publisher-reported caveat. The badge carries it,
 * so the card does not repeat it. The stored note is unchanged.
 */
export function noteWithoutCaveat(notes: string | null | undefined): string {
  if (!notes) return "";
  return notes
    .replace(/\s*Publisher-reported, not independently tested(?:[;.]\s*|\s*$)(\w?)/gi, (_match, next: string) =>
      next ? ` ${next.toUpperCase()}` : "",
    )
    .replace(/\s+/g, " ")
    .trim();
}
