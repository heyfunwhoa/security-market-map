import { z } from "zod";

/**
 * K1 knowledge model prototype (KRU-212). Offline only: nothing in the app imports this module,
 * and it adds no catalog records. See docs/architecture/knowledge-model-reconciliation.md.
 *
 * Scope rule: source privacy, rights and review are checked upstream (ASE's exporter and
 * Technical Docs research-evidence-v1, read here by lib/integrations/research-evidence.ts).
 * This module takes those results as inputs and checks only what K1 owns: references,
 * revisions, mapping lifecycle, publisher review and consumer acceptance.
 */
export const KNOWLEDGE_MODEL_VERSION = "k1-prototype-1";

/** Existing catalog records. Reused by ID; never redefined here. */
export const catalogKindSchema = z.enum(["category", "capability", "vendor", "product", "use_case", "source", "claim"]);

/** New knowledge records proposed by K1. */
export const knowledgeKindSchema = z.enum([
  "publisher",
  "publication_revision",
  "requirement_set",
  "requirement",
  "business_problem",
  "outcome",
  "metric_definition",
  "initiative",
]);

export const refKindSchema = z.union([catalogKindSchema, knowledgeKindSchema]);
export type CatalogKind = z.infer<typeof catalogKindSchema>;
export type KnowledgeKind = z.infer<typeof knowledgeKindSchema>;
export type RefKind = z.infer<typeof refKindSchema>;

/** Every reference names a kind, an ID and the exact revision it was made against. */
export const refSchema = z.object({
  kind: refKindSchema,
  id: z.string().min(1),
  revision: z.string().min(1),
});
export type Ref = z.infer<typeof refSchema>;

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const text = z.string().trim().min(1);

/** Repository that owns the canonical record. ASE owns acquisition; Technical Docs owns shared contracts. */
export const ownerRepoSchema = z.enum(["security-market-map", "account-signal-engine", "technical-docs"]);

/** Editorial state. Deliberately separate from epistemic status. */
export const editorialStatusSchema = z.enum(["candidate", "reviewed", "published", "withdrawn", "superseded"]);

const recordBase = {
  id: text,
  revision: text,
  aliases: z.array(text).default([]),
  ownerRepo: ownerRepoSchema,
  status: editorialStatusSchema,
  /** Required when status is superseded; must point at a record that exists. */
  supersededBy: refSchema.nullable().default(null),
  /** Marks records invented for tests and worked examples so they can never pass as real research. */
  synthetic: z.boolean().default(false),
};

/** Rights travel with the publication; Unknown is a value, not a gap to fill. */
export const rightsSchema = z.enum(["metadata_only", "citation_and_paraphrase", "licensed", "unknown"]);

export const knowledgeRecordSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("publisher"), ...recordBase, name: text, officialDomains: z.array(text), role: text }),
  z.object({
    kind: z.literal("publication_revision"),
    ...recordBase,
    publisherId: text,
    title: text,
    edition: text.nullable(),
    originalDocumentId: text.nullable(),
    url: z.string().url(),
    publishedOn: isoDate.nullable(),
    checkedOn: isoDate,
    rights: rightsSchema,
    contentHash: text.nullable(),
  }),
  z.object({
    kind: z.literal("requirement_set"),
    ...recordBase,
    publicationRevisionId: text,
    requirementKind: z.enum(["law", "regulation", "standard", "guidance", "assurance", "contractual"]),
    jurisdiction: text.nullable(),
  }),
  z.object({
    kind: z.literal("requirement"),
    ...recordBase,
    requirementSetId: text,
    originalRequirementId: text,
    applicability: text.nullable(),
  }),
  z.object({ kind: z.literal("business_problem"), ...recordBase, title: text, affectedProcess: text }),
  z.object({
    kind: z.literal("outcome"),
    ...recordBase,
    businessProblemId: text,
    description: text,
    /** Desired, vendor-reported and observed outcomes are different records, never one field flipped. */
    outcomeType: z.enum(["desired", "vendor_reported", "observed"]),
  }),
  z.object({
    kind: z.literal("metric_definition"),
    ...recordBase,
    outcomeId: text,
    unit: text,
    numerator: text.nullable(),
    denominator: text.nullable(),
    counterMetric: text,
  }),
  z.object({
    kind: z.literal("initiative"),
    ...recordBase,
    businessProblemId: text,
    /** Reuses an existing catalog use case when one fits, instead of a parallel record. */
    useCaseId: text.nullable(),
  }),
]);
export type KnowledgeRecord = z.infer<typeof knowledgeRecordSchema>;
export type KnowledgeRecordInput = z.input<typeof knowledgeRecordSchema>;

/**
 * Allowed relation types and the kinds each may connect. Anything else is rejected.
 * No relation lets a vendor or product satisfy a requirement: category relevance is not compliance.
 */
export const RELATION_RULES = {
  addresses_problem: { from: ["category", "capability", "initiative"], to: ["business_problem"] },
  has_outcome: { from: ["business_problem"], to: ["outcome"] },
  measured_by: { from: ["outcome"], to: ["metric_definition"] },
  supports_initiative: { from: ["category", "capability"], to: ["initiative"] },
  relevant_to_requirement: { from: ["category", "capability"], to: ["requirement"] },
  defined_in: { from: ["category", "capability", "requirement", "metric_definition"], to: ["publication_revision"] },
  implements_capability: { from: ["product"], to: ["capability"] },
} as const satisfies Record<string, { from: readonly RefKind[]; to: readonly RefKind[] }>;

export const relationTypeSchema = z.enum(Object.keys(RELATION_RULES) as [keyof typeof RELATION_RULES, ...(keyof typeof RELATION_RULES)[]]);
export type RelationType = z.infer<typeof relationTypeSchema>;

/** How a mapping was established. Exact and partial need evidence; editorial is interpretation. */
export const correspondenceSchema = z.enum(["exact", "partial", "editorial"]);
/** What is known about the mapped statement. Independent of review. */
export const epistemicStatusSchema = z.enum(["reported", "observed", "tested", "hypothesis", "unknown"]);
/** Unknown stays Unknown. It is never coerced to low or dropped. */
export const mappingConfidenceSchema = z.enum(["high", "medium", "low", "unknown"]);
export const mappingLifecycleSchema = z.enum(["draft", "in_review", "approved", "withdrawn", "superseded"]);

export const evidenceRefSchema = z.discriminatedUnion("kind", [
  /** An existing typed catalog claim, by ID. */
  z.object({ kind: z.literal("catalog_claim"), claimId: text }),
  /** A research-evidence-v1 package, assessed upstream. */
  z.object({ kind: z.literal("upstream_evidence"), evidenceId: text }),
]);
export type EvidenceRef = z.infer<typeof evidenceRefSchema>;

export const mappingSchema = z.object({
  id: text,
  revision: text,
  relation: relationTypeSchema,
  from: refSchema,
  to: refSchema,
  correspondence: correspondenceSchema,
  scope: text,
  rationale: text,
  epistemicStatus: epistemicStatusSchema,
  confidence: mappingConfidenceSchema,
  evidence: z.array(evidenceRefSchema),
  lifecycle: mappingLifecycleSchema,
  supersededBy: z.object({ id: text, revision: text }).nullable().default(null),
  publisherReview: z.object({
    decision: z.enum(["pending", "approved", "rejected"]),
    reviewer: text.nullable(),
    reviewedOn: isoDate.nullable(),
  }),
  synthetic: z.boolean().default(false),
});
export type Mapping = z.infer<typeof mappingSchema>;
export type MappingInput = z.input<typeof mappingSchema>;

/**
 * A consuming application's own decision about one exact mapping revision.
 * Publisher approval never implies consumer acceptance.
 */
export const consumerAcceptanceSchema = z.object({
  consumerId: text,
  mappingId: text,
  mappingRevision: text,
  decision: z.enum(["accept", "reject", "defer"]),
  useScope: text,
  rationale: text,
  reviewer: text,
  reviewedOn: isoDate,
});
export type ConsumerAcceptance = z.infer<typeof consumerAcceptanceSchema>;

/**
 * Result of the upstream checks for one research-evidence package, as recorded by its owner.
 * Synthetic in tests: this is an input shape, not a working adapter or trusted approval service.
 */
export const upstreamAssessmentSchema = z.object({
  evidenceId: text,
  contract: z.literal("research-evidence-v1"),
  status: z.enum(["accepted", "blocked", "unknown", "outdated"]),
  evidenceKind: z.enum(["sourced_fact", "vendor_claim"]),
  /**
   * Catalog records the evidence is about, as "kind:id" (for example "capability:cap-secret-verification").
   * A mapping with a catalog end must share one of these, so evidence about one product cannot
   * support a mapping about another.
   */
  subjectRefs: z.array(text).default([]),
  checkedOn: isoDate,
});
export type UpstreamAssessment = z.infer<typeof upstreamAssessmentSchema>;
