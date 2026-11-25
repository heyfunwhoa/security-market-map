import { catalog } from "./catalog";
import { isCiamProduct } from "./data/ciam-profiles";
import { evidenceCell } from "./compare";
import { developerEndpointCapabilities } from "./data/developer-endpoint-comparison";

export { PRODUCT_RESEARCH_SLUGS, isProductResearchSlug, type ProductResearchSlug } from "./product-destination";
import type { ProductResearchSlug } from "./product-destination";

/** Scroll clearance for the in-page nav once it sticks on large screens. */
export const PRODUCT_ANCHOR_CLASS =
  "scroll-mt-48 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

export function productResearchCategory(slug: ProductResearchSlug): { href: string; label: string } {
  if (isCiamProduct(slug)) return { href: "/categories/ciam", label: "Customer identity (CIAM)" };
  if (slug === "kingfisher") {
    return { href: "/categories/secrets-detection", label: "Secrets detection" };
  }
  if (slug === "bay-platform") return { href: "/categories/agentic-runtime", label: "Agentic runtime enforcement" };
  return { href: "/categories/endpoint-control", label: "Endpoint control" };
}

export type SectionLink = { id: string; label: string };

export function productResearchSections(slug: ProductResearchSlug): SectionLink[] {
  return [
    { id: "how-it-works", label: "How it works" },
    ...(slug === "kingfisher" || slug === "aikido-device-protection" || slug === "bay-platform" ? [{ id: "product-focus-title", label: "Zoom in" }] : []),
    ...(slug === "kingfisher" ? [{ id: "kingfisher-upstream", label: "Upstream" }] : []),
    ...(isCiamProduct(slug) ? [{ id: "market-context", label: "Buyer and economics" }] : []),
    { id: "limitations", label: "Limitations" },
    { id: "evidence", label: "Evidence" },
    { id: "investigate", label: "Pilot questions" },
    { id: "adjacency", label: "Categories" },
  ];
}

/**
 * Control boundaries with no evidenced claim.
 * Unknown is not a finding that the control is unsupported.
 * Kingfisher is not an endpoint-comparison product; its detector coverage stays not_evaluated for KRU-189.
 */
export function unknownControlBoundaries(productId: string, asOf: string): string[] {
  if (isCiamProduct(productId) || productId === "kingfisher") return [];
  return developerEndpointCapabilities
    .filter((capability) => {
      const status = evidenceCell(catalog.claims, productId, capability.id, asOf, catalog.sources).status;
      // A limited cell has evidence, with a stated boundary; it is not unknown.
      return status !== "evidenced" && status !== "limited";
    })
    .map((capability) => capability.name);
}

export function moveFocusStage(
  active: number | null,
  action: "previous" | "next" | "all",
  count: number,
): number | null {
  if (action === "all") return null;
  if (active === null) return null;
  if (action === "previous") return active > 0 ? active - 1 : active;
  return active < count - 1 ? active + 1 : active;
}
