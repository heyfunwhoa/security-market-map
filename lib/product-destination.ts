import { ciamProfiles, type CiamProductSlug } from "./data/ciam-profiles";
import { productDetailUrl } from "./landscape-filters";
import type { Product } from "./schema";

export const PRODUCT_RESEARCH_SLUGS = [
  "gitguardian-developer-endpoint",
  "aikido-device-protection",
  "kingfisher",
  "bay-platform",
  "island-agentic-endpoint-posture",
  "palo-alto-koi",
  "crowdstrike-falcon-guardian",
  ...(Object.keys(ciamProfiles) as CiamProductSlug[]),
] as const;

export type ProductResearchSlug = (typeof PRODUCT_RESEARCH_SLUGS)[number];

export function isProductResearchSlug(slug: string): slug is ProductResearchSlug {
  return (PRODUCT_RESEARCH_SLUGS as readonly string[]).includes(slug);
}

export function productDestination(product: Pick<Product, "slug" | "id">, vendorSlug: string): string {
  return isProductResearchSlug(product.slug)
    ? `/products/${product.slug}`
    : productDetailUrl(vendorSlug, product.id);
}
