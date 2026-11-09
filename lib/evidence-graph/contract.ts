import { z } from "zod";

/**
 * Read-only evidence graph contract v1.
 * A projection of the validated catalog. It does not store a second set of facts.
 */
export const EVIDENCE_GRAPH_VERSION = "1.0.0" as const;

export const EXPANSION_LIMITS = {
  defaultDepth: 1,
  maxDepth: 2,
  defaultNodeLimit: 40,
  maxNodeLimit: 80,
  defaultEdgeLimit: 60,
  maxEdgeLimit: 160,
} as const;

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export const nodeKindSchema = z.enum([
  "domain",
  "category",
  "use_case",
  "capability",
  "vendor",
  "product",
  "persona",
  "claim",
  "source",
]);

export const edgePredicateSchema = z.enum([
  "in_domain",
  "adjacent_to",
  "primary_category",
  "adjacent_category",
  "published_by",
  "listed_for_use_case",
  "groups_capability",
  "includes_category",
  "includes_capability",
  "buyer_interest",
  "compared_as",
  "about",
  "concerns_capability",
  "cites",
  "conflicts_with",
]);

export const evidenceBasisSchema = z.enum([
  "taxonomy_mapping",
  "catalog_structure",
  "hypothesis",
  "unknown",
  "source_referenced",
  "vendor_reported",
  "needs_review",
  "disputed",
  "superseded",
  "independently_verified",
]);

export const nodeKindLabels: Record<z.infer<typeof nodeKindSchema>, string> = {
  domain: "Domain",
  category: "Category",
  use_case: "Use case",
  capability: "Capability",
  vendor: "Vendor",
  product: "Product",
  persona: "Persona",
  claim: "Claim",
  source: "Source",
};

export const predicateLabels: Record<z.infer<typeof edgePredicateSchema>, string> = {
  in_domain: "In domain",
  adjacent_to: "Adjacent category",
  primary_category: "Primary category",
  adjacent_category: "Adjacent category listing",
  published_by: "Published by",
  listed_for_use_case: "Listed for use case",
  groups_capability: "Groups capability",
  includes_category: "Includes category",
  includes_capability: "Includes capability",
  buyer_interest: "Buyer interest",
  compared_as: "Catalog comparison",
  about: "Statement about",
  concerns_capability: "Statement concerns capability",
  cites: "Cites source",
  conflicts_with: "Conflicts with",
};

export const evidenceBasisLabels: Record<z.infer<typeof evidenceBasisSchema>, string> = {
  taxonomy_mapping: "Taxonomy mapping",
  catalog_structure: "Catalog structure",
  hypothesis: "Hypothesis",
  unknown: "Unknown",
  source_referenced: "Source referenced",
  vendor_reported: "Vendor reported",
  needs_review: "Needs review",
  disputed: "Disputed",
  superseded: "Superseded",
  independently_verified: "Independently verified",
};

export const graphNodeSchema = z.object({
  id: z.string().min(1),
  kind: nodeKindSchema,
  catalogId: z.string().min(1),
  label: z.string().min(1),
  summary: z.string().min(1),
  detail: z.string().nullable(),
  href: z.string().min(1).nullable(),
  externalUrl: z.string().url().nullable(),
  recordStatus: z.literal("research_candidate").nullable(),
  categoryIds: z.array(z.string()),
  domainIds: z.array(z.string()),
  vendorId: z.string().nullable(),
  publishedAt: isoDate.nullable(),
  observedAt: isoDate.nullable(),
  retrievedAt: isoDate.nullable(),
  lastCheckedAt: isoDate.nullable(),
}).strict();

export const evidenceEdgeSchema = z.object({
  id: z.string().min(1),
  predicate: edgePredicateSchema,
  fromId: z.string().min(1),
  toId: z.string().min(1),
  evidenceBasis: evidenceBasisSchema,
  assertsProductCapability: z.boolean(),
  sourceIds: z.array(z.string()),
  catalogRecordId: z.string().nullable(),
  useCaseId: z.string().nullable(),
  relationshipType: z.enum(["direct_competitor", "bundled_alternative", "complement", "adjacent_budget"]).nullable(),
  polarity: z.enum(["asserts", "denies", "limits"]).nullable(),
  claimVerificationStatus: z.enum(["verified", "vendor_published", "needs_review", "conflicting", "superseded"]).nullable(),
  sourceType: z.enum([
    "official_docs",
    "vendor_marketing",
    "press_release",
    "customer_story",
    "analyst",
    "review",
    "standard",
    "internal_note",
  ]).nullable(),
  subjectKind: z.enum(["vendor", "product", "category", "capability"]).nullable(),
  capabilityId: z.string().nullable(),
  rationale: z.string().min(1),
  publishedAt: isoDate.nullable(),
  observedAt: isoDate.nullable(),
  retrievedAt: isoDate.nullable(),
  lastCheckedAt: isoDate.nullable(),
}).strict();

export const evidenceGraphSchema = z.object({
  contractVersion: z.literal(EVIDENCE_GRAPH_VERSION),
  sliceId: z.string().min(1),
  title: z.string().min(1),
  catalogAsOf: isoDate,
  projectionNotes: z.array(z.string().min(1)).min(1),
  nodes: z.array(graphNodeSchema),
  edges: z.array(evidenceEdgeSchema),
  omissions: z.object({
    statement: z.string().min(1),
    primaryProductsNotProjected: z.array(z.object({
      categoryId: z.string().min(1),
      count: z.number().int().nonnegative(),
    }).strict()),
    categoriesNotExpanded: z.array(z.object({
      fromCategoryId: z.string().min(1),
      categoryId: z.string().min(1),
    }).strict()),
    relationshipsOutsideSlice: z.number().int().nonnegative(),
  }).strict(),
  limits: z.object({
    defaultDepth: z.literal(EXPANSION_LIMITS.defaultDepth),
    maxDepth: z.literal(EXPANSION_LIMITS.maxDepth),
    defaultNodeLimit: z.literal(EXPANSION_LIMITS.defaultNodeLimit),
    maxNodeLimit: z.literal(EXPANSION_LIMITS.maxNodeLimit),
    defaultEdgeLimit: z.literal(EXPANSION_LIMITS.defaultEdgeLimit),
    maxEdgeLimit: z.literal(EXPANSION_LIMITS.maxEdgeLimit),
  }).strict(),
}).strict();

export type NodeKind = z.infer<typeof nodeKindSchema>;
export type EdgePredicate = z.infer<typeof edgePredicateSchema>;
export type EvidenceBasis = z.infer<typeof evidenceBasisSchema>;
export type GraphNode = z.infer<typeof graphNodeSchema>;
export type EvidenceEdge = z.infer<typeof evidenceEdgeSchema>;
export type EvidenceGraph = z.infer<typeof evidenceGraphSchema>;

export type EvidenceGraphExpansion = {
  contractVersion: typeof EVIDENCE_GRAPH_VERSION;
  sliceId: string;
  mode: "expansion";
  rootId: string;
  depth: number;
  nodeLimit: number;
  edgeLimit: number;
  truncated: boolean;
  reasons: string[];
  nodes: GraphNode[];
  edges: EvidenceEdge[];
};

export function graphNodeId(kind: NodeKind, catalogId: string): string {
  return `${kind}:${catalogId}`;
}

export function graphEdgeId(parts: {
  predicate: EdgePredicate;
  fromId: string;
  toId: string;
  catalogRecordId: string | null;
}): string {
  return `edge:${parts.predicate}:${parts.fromId}:${parts.toId}:${parts.catalogRecordId ?? "membership"}`;
}

const NON_CAPABILITY_BASIS = new Set<EvidenceBasis>([
  "taxonomy_mapping",
  "catalog_structure",
  "hypothesis",
  "unknown",
  "source_referenced",
  "vendor_reported",
  "needs_review",
  "disputed",
  "superseded",
]);

/** Semantic checks. Shape checks live in the Zod contract. */
export function evidenceGraphProblems(graph: EvidenceGraph): string[] {
  const problems: string[] = [];
  const nodeIds = new Set<string>();
  const nodes = new Map<string, GraphNode>();
  for (const node of graph.nodes) {
    if (nodeIds.has(node.id)) problems.push(`Duplicate node id ${node.id}`);
    if (node.id !== graphNodeId(node.kind, node.catalogId)) {
      problems.push(`Node ${node.id} does not use the stable id for ${node.kind}:${node.catalogId}`);
    }
    nodeIds.add(node.id);
    nodes.set(node.id, node);
  }

  const edgeIds = new Set<string>();
  for (const edge of graph.edges) {
    if (edgeIds.has(edge.id)) problems.push(`Duplicate edge id ${edge.id}`);
    edgeIds.add(edge.id);
    if (edge.fromId === edge.toId) problems.push(`Edge ${edge.id} points at itself`);
    if (!nodes.has(edge.fromId) || !nodes.has(edge.toId)) {
      problems.push(`Edge ${edge.id} has an endpoint outside the graph`);
    }
    const expectedId = graphEdgeId({
      predicate: edge.predicate,
      fromId: edge.fromId,
      toId: edge.toId,
      catalogRecordId: edge.catalogRecordId,
    });
    if (edge.id !== expectedId) problems.push(`Edge ${edge.id} is not the deterministic id ${expectedId}`);
    for (const sourceId of edge.sourceIds) {
      const source = nodes.get(graphNodeId("source", sourceId));
      if (!source || source.kind !== "source") {
        problems.push(`Edge ${edge.id} cites missing source ${sourceId}`);
      }
    }
    if (edge.evidenceBasis === "unknown" && edge.sourceIds.length > 0) {
      problems.push(`Unknown edge ${edge.id} cites a source`);
    }
    if (edge.evidenceBasis === "source_referenced" && edge.sourceIds.length === 0) {
      problems.push(`Source-referenced edge ${edge.id} has no source`);
    }
    if (edge.evidenceBasis === "hypothesis" && edge.sourceIds.length > 0) {
      problems.push(`Hypothesis edge ${edge.id} cites a source it does not have on this schema`);
    }
    if (NON_CAPABILITY_BASIS.has(edge.evidenceBasis) && edge.assertsProductCapability) {
      problems.push(`Edge ${edge.id} promotes ${edge.evidenceBasis} to a product capability`);
    }
    if (edge.assertsProductCapability) {
      const allowed =
        edge.predicate === "concerns_capability" &&
        edge.evidenceBasis === "independently_verified" &&
        edge.polarity === "asserts" &&
        edge.claimVerificationStatus === "verified" &&
        edge.sourceType === "standard" &&
        edge.subjectKind === "product" &&
        edge.capabilityId !== null;
      if (!allowed) problems.push(`Edge ${edge.id} asserts a product capability without the verified-standard rule`);
    }
    if (edge.predicate === "buyer_interest" && edge.evidenceBasis !== "hypothesis") {
      problems.push(`Buyer-interest edge ${edge.id} is not labeled as a hypothesis`);
    }
    if (edge.predicate === "compared_as" && edge.evidenceBasis === "independently_verified") {
      problems.push(`Comparison ${edge.id} is marked independently verified`);
    }
    if (
      (edge.predicate === "primary_category" || edge.predicate === "adjacent_category" || edge.predicate === "in_domain") &&
      edge.evidenceBasis !== "taxonomy_mapping"
    ) {
      problems.push(`Taxonomy edge ${edge.id} has basis ${edge.evidenceBasis}`);
    }
  }

  for (const node of graph.nodes) {
    if (node.kind === "vendor" && node.recordStatus !== "research_candidate") {
      problems.push(`Vendor ${node.id} dropped its research-candidate status`);
    }
  }

  const nodeOrder = graph.nodes.map((node) => node.id);
  const sortedNodes = [...nodeOrder].sort((left, right) => left.localeCompare(right));
  if (nodeOrder.some((id, index) => id !== sortedNodes[index])) problems.push("Nodes are not sorted by id");
  const edgeOrder = graph.edges.map((edge) => edge.id);
  const sortedEdges = [...edgeOrder].sort((left, right) => left.localeCompare(right));
  if (edgeOrder.some((id, index) => id !== sortedEdges[index])) problems.push("Edges are not sorted by id");

  return problems;
}
