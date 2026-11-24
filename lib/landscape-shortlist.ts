export function toggleShortlist(selected: string[], id: string): string[] {
  if (selected.includes(id)) return selected.filter((item) => item !== id);
  return selected.length < 4 ? [...selected, id] : selected;
}

export function shortlistUrl(selected: string[], useCase: string): string {
  const params = new URLSearchParams({ products: selected.join(",") });
  if (useCase && useCase !== "all") params.set("use", useCase);
  return `/compare?${params.toString()}`;
}

export function productComparisonUrl(product: { id: string; useCaseIds: string[] }) {
  const use = product.useCaseIds.length === 1 ? product.useCaseIds[0] : "";
  return shortlistUrl([product.id], use);
}
