export function toggleShortlist(selected: string[], id: string): string[] {
  if (selected.includes(id)) return selected.filter((item) => item !== id);
  return selected.length < 4 ? [...selected, id] : selected;
}

export function shortlistUrl(selected: string[], useCase: string): string {
  const params = new URLSearchParams({ products: selected.join(",") });
  if (useCase !== "all") params.set("use", useCase);
  return `/compare?${params.toString()}`;
}
