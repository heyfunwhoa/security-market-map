import type { Catalog } from "./catalog";
import { claimsForDomain } from "./domain-study";
import type { Domain } from "./schema";

/** Status shown on every domain tile. Identity is the evidenced slice; the rest are mapped. */
export function domainStatusLabel(depth: Domain["depth"]): string {
  return depth === "evidenced" ? "Evidenced" : "Mapped, evidence coming";
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
