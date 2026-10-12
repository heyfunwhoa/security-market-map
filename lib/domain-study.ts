import { marketCircles } from "./market-circles";
import type { Claim, GlossaryTerm } from "./schema";

type Placed = { id: string; primaryCategoryIds: readonly string[] };

/** Glossary lines that restate an existing claim. Other terms stay unsourced. */
const glossaryClaimIds: Record<string, readonly string[]> = {
  "workload-identity": ["claim-wid-definition"],
  federation: ["claim-wid-federation"],
  "dynamic-secret": ["claim-vault-dynamic"],
};

export type DomainQuestion = {
  id: string;
  name: string;
  question: string;
};

export function questionsForDomain(slug: string): DomainQuestion[] {
  return marketCircles
    .filter((circle) => circle.href === `/domains/${slug}`)
    .map((circle) => ({ id: circle.id, name: circle.name, question: circle.question }));
}

export function glossaryForDomain(categoryIds: readonly string[], glossary: readonly GlossaryTerm[]) {
  return glossary.filter((term) => term.categoryId != null && categoryIds.includes(term.categoryId));
}

export function claimsForDomain(
  categoryIds: readonly string[],
  claims: readonly Claim[],
  products: readonly Placed[],
  vendors: readonly Placed[],
): Claim[] {
  const categories = new Set(categoryIds);
  const productIds = new Set(
    products.filter((product) => product.primaryCategoryIds.some((id) => categories.has(id))).map((product) => product.id),
  );
  const vendorIds = new Set(
    vendors.filter((vendor) => vendor.primaryCategoryIds.some((id) => categories.has(id))).map((vendor) => vendor.id),
  );
  return claims.filter((claim) => {
    if (claim.subjectType === "category") return categories.has(claim.subjectId);
    if (claim.subjectType === "product") return productIds.has(claim.subjectId);
    if (claim.subjectType === "vendor") return vendorIds.has(claim.subjectId);
    return false;
  });
}

export function claimsForGlossaryTerm(termId: string, claims: readonly Claim[]): Claim[] {
  const ids = new Set(glossaryClaimIds[termId] ?? []);
  if (ids.size === 0) return [];
  return claims.filter((claim) => ids.has(claim.id));
}
