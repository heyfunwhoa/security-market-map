export type SearchHit = {
  href: string;
  kind: string;
  title: string;
  text: string;
};

export function searchHits(query: string, hits: SearchHit[]): SearchHit[] {
  const needle = query.trim().toLowerCase();
  if (needle.length < 2) return [];
  return hits
    .filter((hit) => `${hit.title} ${hit.text} ${hit.kind}`.toLowerCase().includes(needle))
    .slice(0, 12);
}
