import { readShortlist } from "./landscape-shortlist";
import type { Category, Product, UseCase } from "./schema";

/** Category membership never establishes capability support. */
export const SECRETS_MANAGEMENT_COMPARISON_URL =
  "/compare?category=secrets-management&use=uc-vault&products=infisical,vault,akeyless";

export const SECRETS_COMPARISON_URL =
  "/compare?category=secrets-detection&use=uc-detect&products=trufflehog,github-secret-scanning,gitguardian,gitleaks";

export const DEVELOPER_ENDPOINT_COMPARISON_URL =
  "/compare?category=endpoint-control&use=uc-developer-endpoint&products=gitguardian-developer-endpoint,aikido-device-protection";

/** Agentic endpoint products with recorded capability claims, in the order peers are offered. */
const AGENTIC_ENDPOINT_PEERS = [
  "bay-platform",
  "crowdstrike-falcon-guardian",
  "island-agentic-endpoint-posture",
  "palo-alto-koi",
  "knostic-kirin",
  "backslash-agentic-endpoint",
  "zenity-platform",
] as const;

/** Agentic endpoint comparison that starts with the given product; the compare page shows at most four. */
export function agenticEndpointComparisonUrl(productId: string): string {
  const ids = [productId, ...AGENTIC_ENDPOINT_PEERS.filter((id) => id !== productId)].slice(0, 4);
  return `/compare?category=agentic-runtime&use=uc-agentic-endpoint&products=${ids.join(",")}`;
}

/** Agentic endpoint peers for the Bay product page, on the agentic endpoint capability set. */
export const AGENTIC_ENDPOINT_COMPARISON_URL = agenticEndpointComparisonUrl("bay-platform");

export function productsInCategory(products: Product[], categoryId: string) {
  return products.filter(
    (product) =>
      !categoryId ||
      product.primaryCategoryIds.includes(categoryId) ||
      product.adjacentCategoryIds.includes(categoryId),
  );
}

/** URL state is authoritative, including an explicitly empty selection. */
export function comparisonSelection(
  params: Record<string, string | string[] | undefined>,
  catalog: { categories: Category[]; products: Product[]; useCases: UseCase[] },
) {
  const categoryId = catalog.categories.some(
    (item) => item.id === params.category,
  )
    ? (params.category as string)
    : "";
  const useCases = catalog.useCases.filter(
    (item) => !categoryId || item.categoryIds.includes(categoryId),
  );
  const useCaseId =
    useCases.find((item) => item.id === params.use)?.id ??
    (categoryId ? useCases[0]?.id : undefined) ??
    "";
  const candidates = productsInCategory(catalog.products, categoryId);
  const raw = typeof params.products === "string" ? params.products : "";
  const productIds = readShortlist(raw, candidates.map((product) => product.id));
  return { categoryId, useCaseId, productIds };
}

/** Preset navigation must keep the comparison category aligned with its use case. */
export function comparisonPresetCategory(presetId: string): string {
  if (presetId === "secrets-three" || presetId === "vault") return "secrets-management";
  if (presetId === "detect") return "secrets-detection";
  if (presetId === "developer-endpoint") return "endpoint-control";
  return "";
}
