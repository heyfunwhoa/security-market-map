import type { Category, Product, UseCase } from "./schema";

/** Category membership never establishes capability support. */
export const SECRETS_MANAGEMENT_COMPARISON_URL =
  "/compare?category=secrets-management&use=uc-vault&products=infisical,vault,akeyless";

export const SECRETS_COMPARISON_URL =
  "/compare?category=secrets-detection&use=uc-detect&products=trufflehog,github-secret-scanning,gitguardian,gitleaks";

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
    useCases[0]?.id ??
    "";
  const candidates = productsInCategory(catalog.products, categoryId);
  const raw =
    typeof params.products === "string"
      ? params.products
      : categoryId
        ? ""
        : "c1-platform,opal-platform,sailpoint-isc,saviynt-eic";
  const productIds = [...new Set(raw.split(",").map((id) => id.trim()))]
    .filter((id) => candidates.some((product) => product.id === id))
    .slice(0, 4);
  return { categoryId, useCaseId, productIds };
}
