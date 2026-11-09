import type { Catalog } from "../catalog";
import { seats } from "../persona-graph";
import type { PersonaProfile } from "../schema";
import {
  evidenceGraphProblems,
  evidenceGraphSchema,
  graphEdgeId,
  graphNodeId,
  type EdgePredicate,
  type EvidenceBasis,
  type EvidenceEdge,
  type EvidenceGraph,
  type GraphNode,
  type NodeKind,
} from "./contract";

/**
 * Layers vendor-neutral buyer context onto a projected slice: seat pains, objections,
 * alternatives, buying triggers, and segment overlays. Nothing here asserts a product capability.
 * Links that are editorial mappings (pain → category, objection → alternative) are hypotheses;
 * a record's own evidence label is kept on the edge that states it.
 */

type Evidence = PersonaProfile["evidence"];

const NO_DATES = { publishedAt: null, observedAt: null, retrievedAt: null, lastCheckedAt: null } as const;

/** Map catalog evidence labels to the graph's evidence basis without upgrading anything. */
export function basisFor(evidence: Evidence, sourceIds: readonly string[]): { basis: EvidenceBasis; sourceIds: string[] } {
  if (evidence === "sourced") return sourceIds.length > 0 ? { basis: "source_referenced", sourceIds: [...sourceIds] } : { basis: "hypothesis", sourceIds: [] };
  if (evidence === "practitioner_published") return { basis: "practitioner_published", sourceIds: [...sourceIds] };
  if (evidence === "field_validated") return { basis: "field_validated", sourceIds: [...sourceIds] };
  if (evidence === "unknown") return { basis: "unknown", sourceIds: [] };
  return { basis: "hypothesis", sourceIds: [] };
}

const HYPOTHESIS = { basis: "hypothesis" as const, sourceIds: [] as string[] };

export function withBuyerContext(graph: EvidenceGraph, catalog: Catalog, options: { allSeats?: boolean } = {}): { graph: EvidenceGraph; problems: string[] } {
  const nodes = new Map(graph.nodes.map((node) => [node.id, node]));
  const edges = new Map(graph.edges.map((edge) => [edge.id, edge]));
  const has = (kind: NodeKind, id: string) => nodes.has(graphNodeId(kind, id));
  const sliceCategories = new Set(graph.nodes.filter((node) => node.kind === "category").map((node) => node.catalogId));
  const sourceById = new Map(catalog.sources.map((source) => [source.id, source]));

  const addNode = (node: Omit<GraphNode, "id" | "recordStatus" | "domainIds" | "vendorId" | "publishedAt" | "observedAt" | "retrievedAt" | "lastCheckedAt" | "externalUrl"> & { externalUrl?: string | null }) => {
    const id = graphNodeId(node.kind, node.catalogId);
    if (nodes.has(id)) return id;
    nodes.set(id, { id, recordStatus: null, domainIds: [], vendorId: null, externalUrl: null, ...NO_DATES, ...node });
    return id;
  };
  const ensureSources = (ids: readonly string[]) => {
    for (const sourceId of ids) {
      const source = sourceById.get(sourceId);
      if (!source || has("source", sourceId)) continue;
      addNode({
        kind: "source",
        catalogId: source.id,
        label: source.title.length > 88 ? `${source.title.slice(0, 87).trimEnd()}…` : source.title,
        summary: `${source.publisher}. ${source.title}`,
        detail: null,
        href: "/sources",
        externalUrl: source.url,
        categoryIds: [],
      });
      const node = nodes.get(graphNodeId("source", sourceId))!;
      nodes.set(node.id, { ...node, publishedAt: source.publishedAt, retrievedAt: source.retrievedAt });
    }
  };
  const addEdge = (predicate: EdgePredicate, fromId: string, toId: string, recordId: string, evidence: { basis: EvidenceBasis; sourceIds: string[] }, rationale: string) => {
    if (!nodes.has(fromId) || !nodes.has(toId) || fromId === toId) return;
    ensureSources(evidence.sourceIds);
    const edge: EvidenceEdge = {
      id: graphEdgeId({ predicate, fromId, toId, catalogRecordId: recordId }),
      predicate,
      fromId,
      toId,
      evidenceBasis: evidence.basis,
      assertsProductCapability: false,
      sourceIds: evidence.sourceIds,
      catalogRecordId: recordId,
      useCaseId: null,
      relationshipType: null,
      polarity: null,
      claimVerificationStatus: null,
      sourceType: null,
      subjectKind: null,
      capabilityId: null,
      rationale,
      ...NO_DATES,
    };
    edges.set(edge.id, edge);
  };

  const touches = (categoryIds: readonly string[]) => options.allSeats || categoryIds.some((id) => sliceCategories.has(id));

  // Seats: every seat already in the slice, plus seats with a pain, objection, or trigger in it.
  const allSeats = seats(catalog);
  const inSlice = new Set(
    allSeats
      .filter((seat) =>
        options.allSeats ||
        has("persona", seat.id) ||
        touches(seat.categoryIds) ||
        seat.profile.pains.some((pain) => touches(pain.relatedCategoryIds)) ||
        catalog.objections.some((obj) => obj.seatIds.includes(seat.id) && touches(obj.categoryIds)) ||
        catalog.buyingTriggers.some((trg) => trg.seatIds.includes(seat.id) && touches(trg.categoryIds)),
      )
      .map((seat) => seat.id),
  );
  for (const seat of allSeats) {
    if (!inSlice.has(seat.id)) continue;
    addNode({
      kind: "persona",
      catalogId: seat.id,
      label: seat.name,
      summary: seat.profile.job,
      detail: seat.kind === "stakeholder" ? "Business stakeholder seat. Profile evidence is shown per pain and edge." : "Buyer seat profile. Evidence is shown per pain and edge.",
      href: `/personas/${seat.id}`,
      categoryIds: seat.categoryIds.filter((id) => sliceCategories.has(id)),
    });
    const personaId = graphNodeId("persona", seat.id);
    const existing = nodes.get(personaId);
    if (existing && existing.href === null) nodes.set(personaId, { ...existing, href: `/personas/${seat.id}` });
    seat.profile.pains.forEach((pain, index) => {
      if (!options.allSeats && !touches(pain.relatedCategoryIds) && !has("persona", seat.id)) return;
      const catalogId = `${seat.id}:${index}`;
      const painId = addNode({ kind: "pain", catalogId, label: pain.pain, summary: pain.pain, detail: null, href: `/personas/${seat.id}`, categoryIds: pain.relatedCategoryIds.filter((id) => sliceCategories.has(id)) });
      addEdge("experiences", personaId, painId, catalogId, basisFor(pain.evidence, pain.sourceIds), "The seat profile records this pain with the evidence label shown.");
      for (const id of pain.relatedCategoryIds) addEdge("addressed_by", painId, graphNodeId("category", id), catalogId, HYPOTHESIS, "Editorial mapping from a pain to a category. Not a product capability.");
      for (const id of pain.relatedCapabilityIds) addEdge("addressed_by", painId, graphNodeId("capability", id), catalogId, HYPOTHESIS, "Editorial mapping from a pain to a catalog capability. Not a claim that any product has it.");
      for (const id of pain.relatedUseCaseIds) addEdge("raised_in", painId, graphNodeId("use_case", id), catalogId, HYPOTHESIS, "Editorial mapping from a pain to a buyer use case.");
    });
  }

  for (const alt of catalog.alternatives) {
    if (!touches([alt.categoryId])) continue;
    const altId = addNode({ kind: "alternative", catalogId: alt.id, label: alt.name, summary: `Good enough when: ${alt.whenItWins}`, detail: `Breaks when: ${alt.whenItBreaks}`, href: null, categoryIds: [alt.categoryId].filter((id) => sliceCategories.has(id)) });
    addEdge("substitutes_for", altId, graphNodeId("category", alt.categoryId), alt.id, basisFor(alt.evidence, alt.sourceIds), "What buyers do instead of buying in this category. Vendor-neutral.");
  }

  for (const obj of catalog.objections) {
    const relevant = obj.categoryIds.length === 0 ? obj.seatIds.some((id) => inSlice.has(id)) : touches(obj.categoryIds);
    if (!relevant) continue;
    const objId = addNode({ kind: "objection", catalogId: obj.id, label: obj.objection, summary: `Usually about: ${obj.underlyingConcern}`, detail: `Reframe to test: ${obj.reframe}`, href: null, categoryIds: obj.categoryIds.filter((id) => sliceCategories.has(id)) });
    const own = basisFor(obj.evidence, obj.sourceIds);
    for (const id of obj.seatIds) addEdge("raised_by", objId, graphNodeId("persona", id), obj.id, own, "The objection record lists this seat. The reframe is a hypothesis to test.");
    for (const id of obj.categoryIds) addEdge("about", objId, graphNodeId("category", id), obj.id, HYPOTHESIS, "Editorial mapping from an objection to a category.");
    for (const id of obj.alternativeIds) addEdge("points_to", objId, graphNodeId("alternative", id), obj.id, HYPOTHESIS, "The objection usually points at this alternative.");
  }

  for (const trg of catalog.buyingTriggers) {
    const relevant = trg.categoryIds.length === 0 ? trg.seatIds.some((id) => inSlice.has(id)) : touches(trg.categoryIds);
    if (!relevant) continue;
    const trgId = addNode({ kind: "trigger", catalogId: trg.id, label: trg.trigger, summary: trg.publicSignal ? `Public signal (a lead, not intent): ${trg.publicSignal}` : "No public signal recorded.", detail: null, href: null, categoryIds: trg.categoryIds.filter((id) => sliceCategories.has(id)) });
    const own = basisFor(trg.evidence, trg.sourceIds);
    for (const id of trg.useCaseIds) addEdge("activates", trgId, graphNodeId("use_case", id), trg.id, own, "The trigger record links this event to the use case.");
    for (const id of trg.categoryIds) addEdge("activates", trgId, graphNodeId("category", id), trg.id, own, "The trigger record links this event to the category.");
    for (const id of trg.seatIds) addEdge("involves", trgId, graphNodeId("persona", id), trg.id, HYPOTHESIS, "Seats usually involved when this trigger happens.");
  }

  for (const overlay of catalog.segmentOverlays) {
    const seatsHere = [...overlay.mandatedSeats.map((m) => m.personaId).filter((id): id is string => Boolean(id)), ...overlay.elevatedPersonaIds].filter((id) => inSlice.has(id));
    if (seatsHere.length === 0) continue;
    const segId = addNode({ kind: "segment", catalogId: overlay.id, label: overlay.name, summary: overlay.appliesTo, detail: overlay.notes ?? null, href: null, categoryIds: [] });
    for (const m of overlay.mandatedSeats) {
      if (m.personaId) addEdge("requires", segId, graphNodeId("persona", m.personaId), overlay.id, { basis: "source_referenced", sourceIds: [...m.sourceIds] }, `Named in a rule: ${m.rule}`);
    }
    for (const id of overlay.elevatedPersonaIds) addEdge("elevates", segId, graphNodeId("persona", id), overlay.id, basisFor(overlay.evidence, overlay.sourceIds), "This segment usually gives the seat more weight.");
  }

  const draft: EvidenceGraph = {
    ...graph,
    projectionNotes: [
      ...graph.projectionNotes,
      "Buyer context (seats, pains, objections, alternatives, triggers, segments) is vendor-neutral. Editorial mappings between concepts are hypotheses; each record keeps its own evidence label.",
    ],
    nodes: [...nodes.values()].sort((a, b) => a.id.localeCompare(b.id)),
    edges: [...edges.values()].sort((a, b) => a.id.localeCompare(b.id)),
  };
  const parsed = evidenceGraphSchema.safeParse(draft);
  if (!parsed.success) return { graph: draft, problems: parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`) };
  return { graph: parsed.data, problems: evidenceGraphProblems(parsed.data) };
}
