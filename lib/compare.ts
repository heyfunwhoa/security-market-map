import type { Claim } from "./schema";

export type CellStatus =
  | "evidenced"
  | "limited"
  | "conflicting"
  | "unverified"
  | "unknown"
  | "not_supported";

export type EvidenceCell = {
  status: CellStatus;
  claims: Claim[];
};

const STRONG = new Set(["verified", "vendor_published", "conflicting"]);

export function claimsInForce(claims: Claim[], asOf: string): Claim[] {
  return claims.filter((claim) => {
    if (claim.verificationStatus === "superseded") return false;
    if (claim.effectiveFrom && claim.effectiveFrom > asOf) return false;
    if (claim.effectiveTo && claim.effectiveTo < asOf) return false;
    return true;
  });
}

function pairConflicts(claims: Claim[]): boolean {
  const ids = new Set(claims.map((claim) => claim.id));
  return claims.some(
    (claim) =>
      claim.verificationStatus === "conflicting" ||
      claim.conflictsWith.some((other) => ids.has(other)),
  );
}

/**
 * A cell is evidence about one product and one capability.
 * Category membership never fills a cell.
 */
export function evidenceCell(
  claims: Claim[],
  productId: string,
  capabilityId: string,
  asOf: string,
): EvidenceCell {
  const relevant = claimsInForce(claims, asOf).filter(
    (claim) =>
      claim.subjectType === "product" &&
      claim.subjectId === productId &&
      claim.capabilityId === capabilityId,
  );

  if (relevant.length === 0) return { status: "unknown", claims: [] };

  const asserts = relevant.filter((claim) => claim.polarity === "asserts");
  const denies = relevant.filter((claim) => claim.polarity === "denies");
  const limits = relevant.filter((claim) => claim.polarity === "limits");

  if (pairConflicts(relevant) || (asserts.length > 0 && denies.length > 0)) {
    return { status: "conflicting", claims: relevant };
  }
  if (denies.length > 0) return { status: "not_supported", claims: relevant };

  const strongAsserts = asserts.filter((claim) =>
    STRONG.has(claim.verificationStatus),
  );
  if (limits.length > 0 && strongAsserts.length > 0) {
    return { status: "limited", claims: relevant };
  }
  if (limits.length > 0) return { status: "limited", claims: relevant };
  if (strongAsserts.length > 0) return { status: "evidenced", claims: relevant };
  return { status: "unverified", claims: relevant };
}

export type ComparisonRow = {
  capabilityId: string;
  cells: Record<string, EvidenceCell>;
};

export function compareProducts(input: {
  productIds: string[];
  capabilityIds: string[];
  claims: Claim[];
  asOf: string;
}): ComparisonRow[] {
  return input.capabilityIds.map((capabilityId) => {
    const cells: Record<string, EvidenceCell> = {};
    for (const productId of input.productIds) {
      cells[productId] = evidenceCell(
        input.claims,
        productId,
        capabilityId,
        input.asOf,
      );
    }
    return { capabilityId, cells };
  });
}
