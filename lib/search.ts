export type SearchHit = {
  href: string;
  kind: string;
  title: string;
  text: string;
};

export function searchHits(query: string, hits: SearchHit[]): SearchHit[] {
  const needle = query.trim().toLowerCase();
  if (needle.length < 2) return [];
  const matches = hits.filter((hit) => `${hit.title} ${hit.text} ${hit.kind}`.toLowerCase().includes(needle));
  const exactDefinition = matches.find((hit) => hit.kind === "Glossary" && hit.href === `/learn#${needle}`);
  if (exactDefinition) {
    return [exactDefinition, ...matches.filter((hit) => hit !== exactDefinition)].slice(0, 12);
  }
  return matches.slice(0, 12);
}
