import type { LandscapeEdge, LandscapeRow } from "@/components/landscape-browser";

export const initialLandscapeFilters = {
  domain: "all", category: "all", useCase: "all", persona: "all",
  deployment: "all", scope: "all", relation: "all", focusedProduct: "all",
};
export type LandscapeFilters = typeof initialLandscapeFilters;
type FilterAction = { type: "reset" } | { type: "select"; key: keyof LandscapeFilters; value: string };

export function landscapeFilterReducer(state: LandscapeFilters, action: FilterAction): LandscapeFilters {
  if (action.type === "reset") return { ...initialLandscapeFilters };
  return {
    ...state,
    ...(action.key !== "focusedProduct" ? { focusedProduct: "all" } : {}),
    ...(action.key === "domain" ? { category: "all" } : {}),
    [action.key]: action.value,
  };
}

export function filterLandscapeRows(
  rows: LandscapeRow[], edges: LandscapeEdge[],
  personas: { id: string; categoryIds: string[] }[], filters: LandscapeFilters,
) {
  const { domain, category, useCase, persona, deployment, scope, relation, focusedProduct } = filters;
  const personaCategories = personas.find((item) => item.id === persona)?.categoryIds ?? [];
  return rows
    .filter((row) => domain === "all" || row.domainIds.includes(domain))
    .filter((row) => category === "all" || row.categoryIds.includes(category))
    .filter((row) => focusedProduct === "all" || row.productId === focusedProduct)
    .filter((row) => useCase === "all" || row.useCaseIds.includes(useCase))
    .filter((row) => persona === "all" || row.categoryIds.some((id) => personaCategories.includes(id)))
    .filter((row) => deployment === "all" || row.deployment.includes(deployment))
    .filter((row) => scope === "all" || row.scopes.includes(scope))
    .filter((row) => relation === "all" || edges.some((edge) =>
      edge.productId === row.productId && edge.type === relation &&
      (useCase === "all" || edge.useCaseId === useCase)))
    .sort((a, b) => a.productName.localeCompare(b.productName));
}

const filterParams: Record<keyof LandscapeFilters, string> = {
  domain: "domain", category: "category", useCase: "useCase", persona: "buyer",
  deployment: "deployment", scope: "scope", relation: "relation", focusedProduct: "product",
};
export type LandscapeFilterOptions = Record<keyof LandscapeFilters, readonly string[]>;

export function readLandscapeFilters(params: Pick<URLSearchParams, "get">, options: LandscapeFilterOptions): LandscapeFilters {
  const filters = { ...initialLandscapeFilters };
  for (const key of Object.keys(filterParams) as (keyof LandscapeFilters)[]) {
    const value = params.get(filterParams[key]);
    if (value && options[key].includes(value)) filters[key] = value;
  }
  return filters;
}

export function landscapeFilterUrl(filters: LandscapeFilters): string {
  const params = new URLSearchParams();
  for (const key of Object.keys(filterParams) as (keyof LandscapeFilters)[]) {
    if (filters[key] !== "all") params.set(filterParams[key], filters[key]);
  }
  return `/landscape${params.size ? `?${params.toString()}` : ""}`;
}

export function productSectionId(productId: string): string {
  return `product-${productId}`;
}

export function productDetailUrl(vendorSlug: string, productId: string): string {
  return `/vendors/${encodeURIComponent(vendorSlug)}#${encodeURIComponent(productSectionId(productId))}`;
}
