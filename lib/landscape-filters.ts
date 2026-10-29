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
