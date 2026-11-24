import type { Catalog } from "./catalog";
import { claimsForDomain } from "./domain-study";
import type { Claim, Domain } from "./schema";

/** Status shown on every domain tile. Identity is the evidenced slice; the rest are mapped. */
export function domainStatusLabel(depth: Domain["depth"]): string {
  return depth === "evidenced" ? "Evidenced" : "Mapped";
}

/** Claims attached to each domain, using the same rule as the domain page's evidence list. */
export function domainClaimCounts(catalog: Pick<Catalog, "domains" | "claims" | "products" | "vendors">): Record<string, number> {
  return Object.fromEntries(
    catalog.domains.map((domain) => [
      domain.id,
      claimsForDomain(domain.categoryIds, catalog.claims, catalog.products, catalog.vendors).length,
    ]),
  );
}

/** First sentence of the charter, for a compact tile. */
export function charterLead(charter: string): string {
  const match = charter.match(/^.+?[.?!](?=\s|$)/);
  return match ? match[0] : charter;
}

/** Domain names a claim belongs to, by its subject's category placement. */
export function claimDomainLabel(
  claim: Pick<Claim, "subjectType" | "subjectId">,
  catalog: Pick<Catalog, "domains" | "categories" | "products" | "vendors">,
): string {
  const categoryIds =
    claim.subjectType === "category"
      ? [claim.subjectId]
      : claim.subjectType === "product"
        ? (catalog.products.find((item) => item.id === claim.subjectId)?.primaryCategoryIds ?? [])
        : (catalog.vendors.find((item) => item.id === claim.subjectId)?.primaryCategoryIds ?? []);
  const domainIds = new Set(
    categoryIds.flatMap((id) => catalog.categories.find((category) => category.id === id)?.domainIds ?? []),
  );
  return catalog.domains
    .filter((domain) => domainIds.has(domain.id))
    .map((domain) => domain.name)
    .join(" · ");
}
