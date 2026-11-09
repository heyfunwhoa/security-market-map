import { buildContextGraph, neighbors, type ContextGraph, type GraphNode, type GraphNodeType } from "./context-graph";

/**
 * Octave-style context search: return grounding nodes and their one-hop neighborhood for a query,
 * without running an agent. Plain keyword scoring over labels and keys, so results are explainable.
 */
export type ContextHit = { node: GraphNode; score: number; related: { type: string; node: GraphNode }[] };

const STOP = new Set(["the", "a", "an", "and", "or", "of", "for", "to", "in", "on", "with", "our", "my", "is", "are"]);

/** Crude stemmer so "leaked", "leaking" and "leaks" all match "leak". */
function stem(word: string) {
  return word.replace(/(ings?|ed|es|s)$/, "").replace(/(.)\1$/, "$1");
}

function terms(text: string) {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((term) => term.length > 1 && !STOP.has(term))
    .map(stem);
}

/** Concepts ground answers better than catalog entries, so they rank first on ties. */
const TYPE_WEIGHT: Partial<Record<GraphNodeType, number>> = {
  pain: 0.3,
  objection: 0.3,
  trigger: 0.3,
  alternative: 0.25,
  category: 0.25,
  "use-case": 0.25,
  seat: 0.2,
  capability: 0.15,
  segment: 0.15,
};

let cached: ContextGraph | undefined;

export function contextSearch(query: string, options: { types?: GraphNodeType[]; limit?: number; graph?: ContextGraph } = {}): ContextHit[] {
  const graph = options.graph ?? (cached ??= buildContextGraph());
  const wanted = terms(query);
  if (wanted.length === 0) return [];
  const hits: ContextHit[] = [];
  for (const node of graph.nodes) {
    if (node.type === "source" || node.type === "company-size") continue;
    if (options.types && !options.types.includes(node.type)) continue;
    const haystack = terms(`${node.label} ${String(node.attrs?.key ?? "")}`);
    const set = new Set(haystack);
    const matched = wanted.filter((term) => set.has(term) || haystack.some((word) => word.startsWith(term) && term.length >= 4)).length;
    if (matched === 0) continue;
    const score =
      matched / wanted.length + (node.label.toLowerCase().includes(query.toLowerCase()) ? 1 : 0) + (TYPE_WEIGHT[node.type] ?? 0);
    hits.push({ node, score, related: [] });
  }
  hits.sort((a, b) => b.score - a.score || a.node.label.localeCompare(b.node.label));
  return hits.slice(0, options.limit ?? 10).map((hit) => ({
    ...hit,
    related: neighbors(graph, hit.node.id)
      .filter((item) => item.node.type !== "source")
      .slice(0, 25)
      .map((item) => ({ type: item.edge.type, node: item.node })),
  }));
}
