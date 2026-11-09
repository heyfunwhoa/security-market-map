import type { EvidenceEdge, EvidenceGraph, GraphNode, NodeKind } from "./contract";

const KIND_ORDER: NodeKind[] = [
  "domain",
  "category",
  "use_case",
  "capability",
  "product",
  "vendor",
  "persona",
  "claim",
  "source",
];

const CANVAS_KINDS = new Set<NodeKind>(["domain", "category", "use_case", "product"]);

export const CANVAS_NODE_CAP = 16;

export type GraphViewQuery = {
  categoryId: string | "all";
  search: string;
  includeEvidenceNodes: boolean;
  selectedId: string | null;
};

function compareNodes(left: GraphNode, right: GraphNode): number {
  const kindDelta = KIND_ORDER.indexOf(left.kind) - KIND_ORDER.indexOf(right.kind);
  if (kindDelta !== 0) return kindDelta;
  return left.label.localeCompare(right.label) || left.id.localeCompare(right.id);
}

export function nodeMatchesCategory(graph: EvidenceGraph, node: GraphNode, categoryId: string): boolean {
  if (categoryId === "all") return true;
  if (node.kind === "category") return node.catalogId === categoryId;
  if (node.kind === "claim" || node.kind === "source") return false;
  if (node.categoryIds.includes(categoryId)) return true;
  if (node.kind !== "product" && node.kind !== "vendor") return false;
  const useCases = new Set(
    graph.nodes.filter((item) => item.kind === "use_case" && item.categoryIds.includes(categoryId)).map((item) => item.catalogId),
  );
  return graph.edges.some((edge) => {
    if (edge.predicate !== "compared_as" || !edge.useCaseId || !useCases.has(edge.useCaseId)) return false;
    if (node.kind === "product") return edge.fromId === node.id || edge.toId === node.id;
    return graph.nodes.some((product) =>
      product.kind === "product" &&
      product.vendorId === node.catalogId &&
      (edge.fromId === product.id || edge.toId === product.id),
    );
  });
}

export function filterGraphNodes(graph: EvidenceGraph, query: GraphViewQuery): GraphNode[] {
  const needle = query.search.trim().toLowerCase();
  const selected = query.selectedId ? graph.nodes.find((node) => node.id === query.selectedId) : undefined;
  const base = graph.nodes.filter((node) => {
    if (node.kind === "claim" || node.kind === "source") {
      if (!query.includeEvidenceNodes || !selected) return false;
      return graph.edges.some((edge) =>
        (edge.fromId === selected.id && edge.toId === node.id) ||
        (edge.toId === selected.id && edge.fromId === node.id),
      );
    }
    return nodeMatchesCategory(graph, node, query.categoryId);
  });
  const searched = needle.length === 0
    ? base
    : base.filter((node) => `${node.label} ${node.catalogId} ${node.summary} ${node.kind}`.toLowerCase().includes(needle));
  const withSelection = selected && !searched.some((node) => node.id === selected.id) ? [...searched, selected] : searched;
  return [...withSelection].sort(compareNodes);
}

export function edgesAmong(graph: EvidenceGraph, nodes: readonly GraphNode[]): EvidenceEdge[] {
  const ids = new Set(nodes.map((node) => node.id));
  return graph.edges
    .filter((edge) => ids.has(edge.fromId) && ids.has(edge.toId))
    .sort((left, right) => left.id.localeCompare(right.id));
}

export function incidentEdges(graph: EvidenceGraph, nodeId: string): EvidenceEdge[] {
  return graph.edges
    .filter((edge) => edge.fromId === nodeId || edge.toId === nodeId)
    .sort((left, right) => left.id.localeCompare(right.id));
}

export function canvasNodes(nodes: readonly GraphNode[], selectedId: string | null, cap = CANVAS_NODE_CAP): {
  nodes: GraphNode[];
  truncated: boolean;
} {
  const preferred = nodes.filter((node) => CANVAS_KINDS.has(node.kind)).sort(compareNodes);
  const selected = preferred.find((node) => node.id === selectedId);
  const kept: GraphNode[] = [];
  if (selected) kept.push(selected);
  for (const node of preferred) {
    if (kept.length >= cap) break;
    if (kept.some((item) => item.id === node.id)) continue;
    kept.push(node);
  }
  return {
    nodes: kept.sort(compareNodes),
    truncated: preferred.length > kept.length || nodes.length > preferred.length,
  };
}

export function layoutPosition(nodes: readonly GraphNode[]): Map<string, { x: number; y: number }> {
  const positions = new Map<string, { x: number; y: number }>();
  const columns = 4;
  const ordered = [...nodes].sort(compareNodes);
  ordered.forEach((node, index) => {
    positions.set(node.id, {
      x: (index % columns) * 210,
      y: Math.floor(index / columns) * 88,
    });
  });
  return positions;
}
