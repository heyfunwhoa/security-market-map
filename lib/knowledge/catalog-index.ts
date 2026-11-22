import type { Catalog } from "@/lib/catalog";
import type { CatalogIndex } from "./validate";

/**
 * Catalog records have no per-record revision yet. Until K4 (KRU-215) decides finer-grained
 * revisions, every catalog reference pins the whole catalog snapshot, so a mapping made against
 * an older snapshot fails with revision_mismatch instead of silently matching.
 */
export function catalogRevision(catalog: Pick<Catalog, "asOf">): string {
  return `catalog@${catalog.asOf}`;
}

export function catalogIndexFrom(
  catalog: Pick<Catalog, "asOf" | "categories" | "capabilities" | "vendors" | "products" | "useCases" | "sources" | "claims">,
): CatalogIndex {
  const ids = (items: readonly { id: string }[]) => new Set(items.map((item) => item.id));
  return {
    revision: catalogRevision(catalog),
    ids: {
      category: ids(catalog.categories),
      capability: ids(catalog.capabilities),
      vendor: ids(catalog.vendors),
      product: ids(catalog.products),
      use_case: ids(catalog.useCases),
      source: ids(catalog.sources),
      claim: ids(catalog.claims),
    },
    claims: new Map(
      catalog.claims.map((claim) => [
        claim.id,
        {
          verificationStatus: claim.verificationStatus,
          subjectType: claim.subjectType,
          subjectId: claim.subjectId,
          capabilityId: claim.capabilityId,
        },
      ]),
    ),
  };
}
