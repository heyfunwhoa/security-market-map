import { catalog } from "./catalog";
import { isCiamProduct } from "./data/ciam-profiles";
import { evidenceCell } from "./compare";
import { developerEndpointCapabilities } from "./data/developer-endpoint-comparison";
import { agenticEndpointCapabilities } from "./data/agentic-endpoint-comparison";
import { hasProfileSteps } from "./product-profile";

export { PRODUCT_RESEARCH_SLUGS, isProductResearchSlug, type ProductResearchSlug } from "./product-destination";
import type { ProductResearchSlug } from "./product-destination";

/** Scroll clearance for the in-page nav once it sticks on large screens. */
export const PRODUCT_ANCHOR_CLASS =
  "scroll-mt-48 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

const AGENTIC_RUNTIME_SLUGS = new Set<string>([
  "bay-platform",
  "island-agentic-endpoint-posture",
  "palo-alto-koi",
  "crowdstrike-falcon-guardian",
  "backslash-agentic-endpoint",
  "knostic-kirin",
  "zenity-platform",
]);

export function productResearchCategory(slug: ProductResearchSlug): { href: string; label: string } {
  if (isCiamProduct(slug)) return { href: "/categories/ciam", label: "Customer identity (CIAM)" };
  if (slug === "kingfisher") {
    return { href: "/categories/secrets-detection", label: "Secrets detection" };
  }
  if (AGENTIC_RUNTIME_SLUGS.has(slug)) return { href: "/categories/agentic-runtime", label: "Agentic runtime enforcement" };
  return { href: "/categories/endpoint-control", label: "Endpoint control" };
}

export type SectionLink = { id: string; label: string };

export function productResearchSections(slug: ProductResearchSlug): SectionLink[] {
  if (!isCiamProduct(slug) && hasProfileSteps(slug)) {
    return [
      { id: "where-it-fits", label: "Where it fits" },
      { id: "how-it-works", label: "How it works" },
      ...(slug === "kingfisher" ? [{ id: "kingfisher-upstream", label: "Upstream" }] : []),
      { id: "limitations", label: "Limitations" },
      { id: "company", label: "Company and news" },
      { id: "investigate", label: "Pilot questions" },
      { id: "evidence", label: "All sources" },
    ];
  }
  return [
    { id: "how-it-works", label: "How it works" },
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
  // Use the capability set that matches the buyer question for this product.
  const product = catalog.products.find((item) => item.id === productId);
  const capabilities = product?.useCaseIds.includes("uc-agentic-endpoint") ? agenticEndpointCapabilities : developerEndpointCapabilities;
  return capabilities
    .filter((capability) => {
      const status = evidenceCell(catalog.claims, productId, capability.id, asOf, catalog.sources).status;
      // Only a cell with no current claim is unknown. Limited, conflicting and unverified cells
      // have evidence to inspect, with a stated boundary, a dispute or a review flag.
      return status === "unknown";
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
