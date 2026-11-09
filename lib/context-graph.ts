import { catalog, type Catalog } from "./catalog";
import { seats } from "./persona-graph";
import type { CompanySize } from "./schema";

/**
 * The market map as one typed graph: nodes and edges with stable IDs, so other projects and
 * agents can traverse it (Octave-style context graph, Cargo-style "derived from files in git").
 * Read-only. Seller-specific nodes (offerings, motions, proof, accounts) belong to consumers.
 */
export const CONTEXT_GRAPH_CONTRACT = "security-market-map.context-graph.v1";
export const CONTEXT_GRAPH_VERSION = "1.0.0";

export type GraphNodeType =
  | "domain"
  | "category"
  | "capability"
  | "outcome"
  | "use-case"
  | "vendor"
  | "product"
  | "seat"
  | "pain"
  | "objection"
  | "alternative"
  | "trigger"
  | "segment"
  | "company-size"
  | "source";

export type GraphEdgeType =
  | "contains"
  | "adjacent-to"
  | "makes"
  | "in-category"
  | "serves"
  | "uses"
  | "owns"
  | "experiences"
  | "addressed-by"
  | "raised-in"
  | "delivers"
  | "raised-by"
  | "about"
  | "points-to"
  | "substitutes-for"
  | "activates"
  | "involves"
  | "requires"
  | "elevates"
  | "present-at"
  | "cites"
  | `seat:${string}`;

export type GraphNode = { id: string; type: GraphNodeType; label: string; attrs?: Record<string, unknown> };
export type GraphEdge = { from: string; to: string; type: GraphEdgeType; evidence?: string; attrs?: Record<string, unknown> };
export type ContextGraph = {
  contract: typeof CONTEXT_GRAPH_CONTRACT;
  version: string;
  asOf: string;
  counts: Record<string, number>;
  nodes: GraphNode[];
  edges: GraphEdge[];
};

const SIZES: CompanySize[] = ["small", "mid-market", "enterprise"];

/** Node ids are `type:key` because keys can repeat across types (a seat and a category can both be "ot-security"). */
export function nodeId(type: GraphNodeType, key: string) {
  return `${type}:${key}`;
}

export function painNodeId(seatId: string, index: number) {
  return nodeId("pain", `${seatId}:${index}`);
}

export function buildContextGraph(source: Catalog = catalog): ContextGraph {
  const nodes = new Map<string, GraphNode>();
  const edges: GraphEdge[] = [];
  const node = (n: GraphNode) => {
    if (!nodes.has(n.id)) nodes.set(n.id, n);
  };
  const edge = (e: GraphEdge) => edges.push(e);
  const cite = (from: string, sourceIds: string[] = []) => {
    for (const id of sourceIds) edge({ from, to: nodeId("source", id), type: "cites" });
  };

  for (const s of source.sources) node({ id: nodeId("source", s.id), type: "source", label: s.title, attrs: { key: s.id, publisher: s.publisher, sourceType: s.sourceType, url: s.url } });
  for (const size of SIZES) node({ id: nodeId("company-size", size), type: "company-size", label: size, attrs: { key: size } });

  for (const d of source.domains) {
    node({ id: nodeId("domain", d.id), type: "domain", label: d.name, attrs: { key: d.id } });
    for (const c of d.categoryIds) edge({ from: nodeId("domain", d.id), to: nodeId("category", c), type: "contains" });
  }
  for (const c of source.categories) {
    const cid = nodeId("category", c.id);
    node({ id: cid, type: "category", label: c.name, attrs: { key: c.id, group: c.group, layer: c.layer, slug: c.slug } });
    for (const adj of c.adjacentCategoryIds) edge({ from: cid, to: nodeId("category", adj), type: "adjacent-to" });
    c.outcomes.forEach((outcome, index) => {
      const id = nodeId("outcome", `${c.id}:${index}`);
      node({ id, type: "outcome", label: outcome });
      edge({ from: cid, to: id, type: "delivers" });
    });
  }
  for (const cap of source.capabilities) {
    node({ id: nodeId("capability", cap.id), type: "capability", label: cap.name, attrs: { key: cap.id } });
    edge({ from: nodeId("category", cap.categoryId), to: nodeId("capability", cap.id), type: "contains" });
  }
  for (const uc of source.useCases) {
    const uid = nodeId("use-case", uc.id);
    node({ id: uid, type: "use-case", label: uc.name, attrs: { key: uc.id, slug: uc.slug } });
    for (const c of uc.categoryIds) edge({ from: uid, to: nodeId("category", c), type: "uses" });
    for (const cap of uc.capabilityIds) edge({ from: uid, to: nodeId("capability", cap), type: "uses" });
  }
  for (const v of source.vendors) {
    node({ id: nodeId("vendor", v.id), type: "vendor", label: v.name, attrs: { key: v.id, verificationStatus: v.verificationStatus } });
    for (const c of v.primaryCategoryIds) edge({ from: nodeId("vendor", v.id), to: nodeId("category", c), type: "in-category", attrs: { primary: true } });
  }
  for (const p of source.products) {
    const pid = nodeId("product", p.id);
    node({ id: pid, type: "product", label: p.name, attrs: { key: p.id } });
    edge({ from: nodeId("vendor", p.vendorId), to: pid, type: "makes" });
    for (const c of p.primaryCategoryIds) edge({ from: pid, to: nodeId("category", c), type: "in-category", attrs: { primary: true } });
    for (const c of p.adjacentCategoryIds) edge({ from: pid, to: nodeId("category", c), type: "in-category", attrs: { primary: false } });
    for (const uc of p.useCaseIds) edge({ from: pid, to: nodeId("use-case", uc), type: "serves" });
  }

  for (const seat of seats(source)) {
    const profile = seat.profile;
    const sid = nodeId("seat", seat.id);
    node({ id: sid, type: "seat", label: seat.name, attrs: { key: seat.id, kind: seat.kind, function: profile.function, cluster: profile.cluster, evidence: profile.evidence } });
    for (const c of seat.categoryIds) edge({ from: sid, to: nodeId("category", c), type: "owns" });
    for (const e of profile.edges) edge({ from: sid, to: nodeId("seat", e.toPersonaId), type: `seat:${e.type}`, evidence: e.evidence, attrs: { carries: e.carries } });
    for (const size of SIZES) {
      const presence = profile.bySize[size];
      edge({ from: sid, to: nodeId("company-size", size), type: "present-at", attrs: { presence: presence.presence, coveredBy: presence.coveredBy } });
    }
    profile.pains.forEach((pain, index) => {
      const id = painNodeId(seat.id, index);
      node({ id, type: "pain", label: pain.pain, attrs: { evidence: pain.evidence } });
      edge({ from: sid, to: id, type: "experiences", evidence: pain.evidence });
      for (const c of pain.relatedCategoryIds) edge({ from: id, to: nodeId("category", c), type: "addressed-by" });
      for (const cap of pain.relatedCapabilityIds) edge({ from: id, to: nodeId("capability", cap), type: "addressed-by" });
      for (const uc of pain.relatedUseCaseIds) edge({ from: id, to: nodeId("use-case", uc), type: "raised-in" });
      cite(id, pain.sourceIds);
    });
    cite(sid, profile.sourceIds);
  }

  for (const overlay of source.segmentOverlays) {
    const gid = nodeId("segment", overlay.id);
    node({ id: gid, type: "segment", label: overlay.name, attrs: { key: overlay.id, kind: overlay.kind, evidence: overlay.evidence } });
    for (const m of overlay.mandatedSeats) if (m.personaId) edge({ from: gid, to: nodeId("seat", m.personaId), type: "requires", evidence: "sourced", attrs: { rule: m.rule } });
    for (const id of overlay.elevatedPersonaIds) edge({ from: gid, to: nodeId("seat", id), type: "elevates", evidence: overlay.evidence });
    cite(gid, overlay.sourceIds);
  }

  for (const alt of source.alternatives) {
    const aid = nodeId("alternative", alt.id);
    node({ id: aid, type: "alternative", label: alt.name, attrs: { key: alt.id, kind: alt.kind, evidence: alt.evidence } });
    edge({ from: aid, to: nodeId("category", alt.categoryId), type: "substitutes-for", evidence: alt.evidence });
    if (alt.adjacentCategoryId) edge({ from: aid, to: nodeId("category", alt.adjacentCategoryId), type: "uses" });
    cite(aid, alt.sourceIds);
  }
  for (const obj of source.objections) {
    const oid = nodeId("objection", obj.id);
    node({ id: oid, type: "objection", label: obj.objection, attrs: { key: obj.id, evidence: obj.evidence } });
    for (const s of obj.seatIds) edge({ from: oid, to: nodeId("seat", s), type: "raised-by", evidence: obj.evidence });
    for (const c of obj.categoryIds) edge({ from: oid, to: nodeId("category", c), type: "about" });
    for (const a of obj.alternativeIds) edge({ from: oid, to: nodeId("alternative", a), type: "points-to" });
    cite(oid, obj.sourceIds);
  }
  for (const trg of source.buyingTriggers) {
    const tid = nodeId("trigger", trg.id);
    node({ id: tid, type: "trigger", label: trg.trigger, attrs: { key: trg.id, kind: trg.kind, evidence: trg.evidence, publicSignal: trg.publicSignal } });
    for (const uc of trg.useCaseIds) edge({ from: tid, to: nodeId("use-case", uc), type: "activates", evidence: trg.evidence });
    for (const c of trg.categoryIds) edge({ from: tid, to: nodeId("category", c), type: "activates", evidence: trg.evidence });
    for (const s of trg.seatIds) edge({ from: tid, to: nodeId("seat", s), type: "involves", evidence: trg.evidence });
    cite(tid, trg.sourceIds);
  }

  for (const claim of source.claims) {
    edge({ from: nodeId(claim.subjectType as GraphNodeType, claim.subjectId), to: nodeId("source", claim.sourceId), type: "cites", attrs: { claimId: claim.id } });
  }

  const nodeList = [...nodes.values()];
  const counts: Record<string, number> = { edges: edges.length };
  for (const n of nodeList) counts[n.type] = (counts[n.type] ?? 0) + 1;
  return { contract: CONTEXT_GRAPH_CONTRACT, version: CONTEXT_GRAPH_VERSION, asOf: source.asOf, counts, nodes: nodeList, edges };
}

/** Nodes one hop from `id`, in either direction, optionally filtered by edge type. */
export function neighbors(graph: ContextGraph, id: string, edgeTypes?: GraphEdgeType[]) {
  const byId = new Map(graph.nodes.map((n) => [n.id, n]));
  return graph.edges
    .filter((e) => (e.from === id || e.to === id) && (!edgeTypes || edgeTypes.includes(e.type)))
    .map((e) => ({ edge: e, node: byId.get(e.from === id ? e.to : e.from) }))
    .filter((item): item is { edge: GraphEdge; node: GraphNode } => Boolean(item.node));
}
