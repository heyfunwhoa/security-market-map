import { catalog } from "./catalog";
import { evidenceCell } from "./compare";
import { developerEndpointCapabilities } from "./data/developer-endpoint-comparison";

export const PRODUCT_RESEARCH_SLUGS = [
  "gitguardian-developer-endpoint",
  "aikido-device-protection",
  "kingfisher",
] as const;

export type ProductResearchSlug = (typeof PRODUCT_RESEARCH_SLUGS)[number];

/** Scroll clearance for the in-page nav once it sticks on large screens. */
export const PRODUCT_ANCHOR_CLASS =
  "scroll-mt-48 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

export function isProductResearchSlug(slug: string): slug is ProductResearchSlug {
  return (PRODUCT_RESEARCH_SLUGS as readonly string[]).includes(slug);
}

export function productResearchCategory(slug: ProductResearchSlug): { href: string; label: string } {
  if (slug === "kingfisher") {
    return { href: "/categories/secrets-detection", label: "Secrets detection" };
  }
  return { href: "/categories/endpoint-control", label: "Endpoint control" };
}

export type SectionLink = { id: string; label: string };

export function productResearchSections(slug: ProductResearchSlug): SectionLink[] {
  return [
    { id: "how-it-works", label: "How it works" },
    ...(slug === "kingfisher"
      ? [
          { id: "product-focus-title", label: "Zoom in" },
          { id: "kingfisher-upstream", label: "Upstream" },
        ]
      : []),
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
  if (productId === "kingfisher") return [];
  return developerEndpointCapabilities
    .filter((capability) => evidenceCell(catalog.claims, productId, capability.id, asOf, catalog.sources).status !== "evidenced")
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
