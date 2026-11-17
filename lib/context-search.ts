import type { EdgePredicate, EvidenceBasis, EvidenceGraph, GraphNode, NodeKind } from "./evidence-graph/contract";
import { marketMapGraph } from "./evidence-graph/market-map-slice";

/**
 * Context search over the market-map evidence graph: return grounding nodes and their one-hop
 * neighborhood, with each edge's evidence basis, without running an agent. Plain keyword scoring over labels and keys, so results are explainable.
 */
export type ContextHit = { node: GraphNode; score: number; related: Related[] };
type Related = { predicate: EdgePredicate; evidenceBasis: EvidenceBasis; node: GraphNode };

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
const TYPE_WEIGHT: Partial<Record<NodeKind, number>> = {
  pain: 0.3,
  objection: 0.3,
  trigger: 0.3,
  alternative: 0.25,
  category: 0.25,
  use_case: 0.25,
  persona: 0.2,
  capability: 0.15,
  segment: 0.15,
  question: 0.2,
};

export function contextSearch(query: string, options: { types?: NodeKind[]; limit?: number; graph?: EvidenceGraph } = {}): ContextHit[] {
  const graph = options.graph ?? marketMapGraph;
  const byId = new Map(graph.nodes.map((node) => [node.id, node]));
  const wanted = terms(query);
  if (wanted.length === 0) return [];
  const hits: ContextHit[] = [];
  for (const node of graph.nodes) {
    if (node.kind === "source" || node.kind === "claim") continue;
    if (options.types && !options.types.includes(node.kind)) continue;
    const haystack = terms(`${node.label} ${node.catalogId}`);
    const set = new Set(haystack);
    const matched = wanted.filter((term) => set.has(term) || haystack.some((word) => word.startsWith(term) && term.length >= 4)).length;
    if (matched === 0) continue;
    const score =
      matched / wanted.length + (node.label.toLowerCase().includes(query.toLowerCase()) ? 1 : 0) + (TYPE_WEIGHT[node.kind] ?? 0);
    hits.push({ node, score, related: [] });
  }
  hits.sort((a, b) => b.score - a.score || a.node.label.localeCompare(b.node.label));
  return hits.slice(0, options.limit ?? 10).map((hit) => ({
    ...hit,
    related: graph.edges
      .filter((edge) => edge.fromId === hit.node.id || edge.toId === hit.node.id)
      .flatMap((edge): Related[] => {
        const node = byId.get(edge.fromId === hit.node.id ? edge.toId : edge.fromId);
        return node && node.kind !== "source" ? [{ predicate: edge.predicate, evidenceBasis: edge.evidenceBasis, node }] : [];
      })
      .slice(0, 25),
  }));
}
