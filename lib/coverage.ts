import { addDays } from "./format";
import type { Capability, Claim, Product, Source } from "./schema";

const WINDOWS = { fast: 30, moderate: 120, stable: 365 } as const;

export function isSourceStale(source: Source, asOf: string): boolean {
  const due = addDays(source.retrievedAt, WINDOWS[source.volatility]);
  return due < asOf;
}

export function staleSources(sources: Source[], asOf: string): Source[] {
  return sources.filter((source) => isSourceStale(source, asOf));
}

export function reviewQueue(claims: Claim[]): Claim[] {
  return claims.filter(
    (claim) =>
      claim.verificationStatus === "needs_review" ||
      claim.confidence === "low" ||
      claim.sourceType === "internal_note",
  );
}

export function conflictingClaims(claims: Claim[]): Claim[] {
  const ids = new Set(claims.map((claim) => claim.id));
  return claims.filter(
    (claim) =>
      claim.verificationStatus === "conflicting" ||
      claim.conflictsWith.some((other) => ids.has(other)),
  );
}

export function capabilitiesWithoutStrongEvidence(
  capabilities: Capability[],
  claims: Claim[],
): Capability[] {
  return capabilities.filter((capability) => {
    return !claims.some(
      (claim) =>
        claim.capabilityId === capability.id &&
        claim.polarity === "asserts" &&
        (claim.verificationStatus === "verified" ||
          claim.verificationStatus === "vendor_published"),
    );
  });
}

export function productsWithoutCapabilityEvidence(
  products: Product[],
  claims: Claim[],
): Product[] {
  return products.filter(
    (product) =>
      !claims.some(
        (claim) =>
          claim.subjectType === "product" &&
          claim.subjectId === product.id &&
          claim.capabilityId &&
          claim.polarity === "asserts" &&
          (claim.verificationStatus === "verified" ||
            claim.verificationStatus === "vendor_published"),
      ),
  );
}
