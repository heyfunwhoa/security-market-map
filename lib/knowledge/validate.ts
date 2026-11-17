import {
  KNOWLEDGE_MODEL_VERSION,
  RELATION_RULES,
  catalogKindSchema,
  consumerAcceptanceSchema,
  knowledgeRecordSchema,
  mappingSchema,
  upstreamAssessmentSchema,
  type CatalogKind,
  type ConsumerAcceptance,
  type KnowledgeRecord,
  type Mapping,
  type Ref,
  type RefKind,
  type UpstreamAssessment,
} from "./model";

/** Every reason a record, mapping or consumer decision fails. Codes are stable; messages explain. */
export type DenialCode =
  | "invalid_shape"
  | "synthetic_not_allowed"
  | "duplicate_record"
  | "duplicate_mapping"
  | "dangling_internal_reference"
  | "superseded_without_replacement"
  | "unknown_reference"
  | "revision_mismatch"
  | "target_withdrawn"
  | "target_superseded"
  | "relation_not_allowed"
  | "product_compliance_inference"
  | "missing_evidence"
  | "editorial_overclaims"
  | "evidence_unknown_claim"
  | "evidence_not_reviewed"
  | "evidence_conflicting"
  | "evidence_withdrawn"
  | "evidence_subject_mismatch"
  | "upstream_assessment_missing"
  | "upstream_blocked"
  | "upstream_unknown"
  | "upstream_outdated"
  | "vendor_status_upgraded"
  | "lifecycle_not_approved"
  | "mapping_withdrawn"
  | "mapping_superseded"
  | "publisher_review_missing"
  | "consumer_unknown_mapping"
  | "consumer_revision_mismatch"
  | "consumer_accepts_failing_mapping"
  | "duplicate_consumer_decision";

export type Denial = { code: DenialCode; message: string };

/** Claim facts the validator needs from the existing catalog. Built by catalogIndexFrom(). */
export type CatalogClaimFacts = {
  verificationStatus: "verified" | "vendor_published" | "needs_review" | "conflicting" | "superseded";
  subjectType: string;
  subjectId: string;
  capabilityId: string | null;
};

export type CatalogIndex = {
  /** Catalog records carry no per-record revision yet, so every catalog ref pins the catalog snapshot. */
  revision: string;
  ids: Record<CatalogKind, ReadonlySet<string>>;
  claims: ReadonlyMap<string, CatalogClaimFacts>;
};

export type KnowledgeInput = {
  records: readonly unknown[];
  mappings: readonly unknown[];
  consumers?: readonly unknown[];
};

export type KnowledgeContext = {
  catalog: CatalogIndex;
  /** Upstream results keyed by evidence ID. Missing means fail closed, never "assume fine". */
  upstream: readonly unknown[];
  /** Off by default, so worked examples and fixtures can never pass as real research. */
  allowSynthetic?: boolean;
};

export type MappingResult = {
  id: string;
  revision: string;
  /** Named so it cannot be mistaken for publication authorization. */
  mapping_checks_passed: boolean;
  denials: Denial[];
  /** Carried through unchanged, including "unknown". */
  confidence: Mapping["confidence"];
  epistemicStatus: Mapping["epistemicStatus"];
};

export type ConsumerResult = {
  consumerId: string;
  mappingId: string;
  mappingRevision: string;
  decision: ConsumerAcceptance["decision"] | null;
  decision_recorded: boolean;
  denials: Denial[];
};

export type KnowledgeReport = {
  modelVersion: typeof KNOWLEDGE_MODEL_VERSION;
  catalogRevision: string;
  recordProblems: ({ index: number; id: string | null } & Denial)[];
  mappings: MappingResult[];
  consumers: ConsumerResult[];
  /** Entries in the input that could not be parsed at all. */
  rejectedInputs: { list: "mappings" | "consumers" | "upstream"; index: number; message: string }[];
};

const deny = (code: DenialCode, message: string): Denial => ({ code, message });
const refLabel = (ref: Ref) => `${ref.kind}:${ref.id}@${ref.revision}`;
const isCatalogKind = (kind: RefKind): kind is CatalogKind => catalogKindSchema.safeParse(kind).success;

/** Internal references each knowledge record makes to another knowledge record. */
function internalRefs(record: KnowledgeRecord): { field: string; kind: KnowledgeRecord["kind"]; id: string }[] {
  switch (record.kind) {
    case "publication_revision":
      return [{ field: "publisherId", kind: "publisher", id: record.publisherId }];
    case "requirement_set":
      return [{ field: "publicationRevisionId", kind: "publication_revision", id: record.publicationRevisionId }];
    case "requirement":
      return [{ field: "requirementSetId", kind: "requirement_set", id: record.requirementSetId }];
    case "outcome":
      return [{ field: "businessProblemId", kind: "business_problem", id: record.businessProblemId }];
    case "metric_definition":
      return [{ field: "outcomeId", kind: "outcome", id: record.outcomeId }];
    case "initiative":
      return [{ field: "businessProblemId", kind: "business_problem", id: record.businessProblemId }];
    default:
      return [];
  }
}

export function validateKnowledge(input: KnowledgeInput, context: KnowledgeContext): KnowledgeReport {
  const report: KnowledgeReport = {
    modelVersion: KNOWLEDGE_MODEL_VERSION,
    catalogRevision: context.catalog.revision,
    recordProblems: [],
    mappings: [],
    consumers: [],
    rejectedInputs: [],
  };
  const allowSynthetic = context.allowSynthetic === true;

  // Records: parse, reject duplicates, index by kind + id (one current revision per id).
  const records = new Map<string, KnowledgeRecord>();
  input.records.forEach((raw, index) => {
    const parsed = knowledgeRecordSchema.safeParse(raw);
    if (!parsed.success) {
      report.recordProblems.push({ index, id: null, ...deny("invalid_shape", parsed.error.issues[0]?.message ?? "Invalid record") });
      return;
    }
    const record = parsed.data;
    const key = `${record.kind}:${record.id}`;
    if (records.has(key)) {
      report.recordProblems.push({ index, id: record.id, ...deny("duplicate_record", `${key} appears more than once; keep one current revision and supersede the rest.`) });
      return;
    }
    if (record.synthetic && !allowSynthetic) {
      report.recordProblems.push({ index, id: record.id, ...deny("synthetic_not_allowed", `${key} is a synthetic fixture record.`) });
    }
    records.set(key, record);
  });
  input.records.forEach((raw, index) => {
    const parsed = knowledgeRecordSchema.safeParse(raw);
    if (!parsed.success) return;
    const record = parsed.data;
    for (const ref of internalRefs(record)) {
      if (!records.has(`${ref.kind}:${ref.id}`)) {
        report.recordProblems.push({ index, id: record.id, ...deny("dangling_internal_reference", `${record.kind}:${record.id}.${ref.field} names ${ref.kind}:${ref.id}, which does not exist.`) });
      }
    }
    if (record.kind === "initiative" && record.useCaseId && !context.catalog.ids.use_case.has(record.useCaseId)) {
      report.recordProblems.push({ index, id: record.id, ...deny("dangling_internal_reference", `initiative:${record.id}.useCaseId names use case ${record.useCaseId}, which is not in the catalog.`) });
    }
    if (record.status === "superseded") {
      const next = record.supersededBy;
      if (!next || !records.has(`${next.kind}:${next.id}`)) {
        report.recordProblems.push({ index, id: record.id, ...deny("superseded_without_replacement", `${record.kind}:${record.id} is superseded but names no existing replacement.`) });
      }
    }
  });
  const badRecords = new Set(report.recordProblems.map((problem) => problem.id).filter((id): id is string => id !== null));

  // Upstream assessments: last one per evidence ID wins only if unambiguous; duplicates are rejected.
  const upstream = new Map<string, UpstreamAssessment>();
  context.upstream.forEach((raw, index) => {
    const parsed = upstreamAssessmentSchema.safeParse(raw);
    if (!parsed.success) {
      report.rejectedInputs.push({ list: "upstream", index, message: parsed.error.issues[0]?.message ?? "Invalid assessment" });
      return;
    }
    if (upstream.has(parsed.data.evidenceId)) {
      report.rejectedInputs.push({ list: "upstream", index, message: `Second assessment for ${parsed.data.evidenceId}; one owner decision per evidence ID.` });
      return;
    }
    upstream.set(parsed.data.evidenceId, parsed.data);
  });

  // Mappings.
  const mappings: Mapping[] = [];
  const seenMappings = new Set<string>();
  const results = new Map<string, MappingResult>();
  input.mappings.forEach((raw, index) => {
    const parsed = mappingSchema.safeParse(raw);
    if (!parsed.success) {
      report.rejectedInputs.push({ list: "mappings", index, message: parsed.error.issues[0]?.message ?? "Invalid mapping" });
      return;
    }
    const mapping = parsed.data;
    const key = `${mapping.id}@${mapping.revision}`;
    const denials: Denial[] = [];
    if (seenMappings.has(key)) denials.push(deny("duplicate_mapping", `${key} was submitted more than once; the replay is ignored.`));
    seenMappings.add(key);
    mappings.push(mapping);
    const result: MappingResult = {
      id: mapping.id,
      revision: mapping.revision,
      mapping_checks_passed: false,
      denials,
      confidence: mapping.confidence,
      epistemicStatus: mapping.epistemicStatus,
    };
    report.mappings.push(result);
    if (!results.has(key)) results.set(key, result);
  });

  for (const [index, mapping] of mappings.entries()) {
    const result = report.mappings[index];
    if (result.denials.some((denial) => denial.code === "duplicate_mapping")) continue;
    const denials = result.denials;

    if (mapping.synthetic && !allowSynthetic) denials.push(deny("synthetic_not_allowed", `Mapping ${mapping.id} is a synthetic fixture.`));

    // References and exact revisions.
    for (const [end, ref] of [["from", mapping.from], ["to", mapping.to]] as const) {
      if (isCatalogKind(ref.kind)) {
        if (!context.catalog.ids[ref.kind].has(ref.id)) denials.push(deny("unknown_reference", `${end} ${refLabel(ref)} is not in the catalog.`));
        else if (ref.revision !== context.catalog.revision) denials.push(deny("revision_mismatch", `${end} ${refLabel(ref)} was made against a different catalog snapshot than ${context.catalog.revision}.`));
        continue;
      }
      const record = records.get(`${ref.kind}:${ref.id}`);
      if (!record) {
        denials.push(deny("unknown_reference", `${end} ${refLabel(ref)} does not exist.`));
        continue;
      }
      if (record.revision !== ref.revision) denials.push(deny("revision_mismatch", `${end} ${refLabel(ref)} does not match current revision ${record.revision}.`));
      if (record.status === "withdrawn") denials.push(deny("target_withdrawn", `${end} ${refLabel(ref)} is withdrawn.`));
      if (record.status === "superseded") denials.push(deny("target_superseded", `${end} ${refLabel(ref)} is superseded; map the replacement instead.`));
      if (badRecords.has(record.id)) denials.push(deny("dangling_internal_reference", `${end} ${refLabel(ref)} has its own record problems.`));
    }

    // Relation rules. Compliance can never be inferred from a vendor or product.
    const rule = RELATION_RULES[mapping.relation];
    if (mapping.to.kind === "requirement" && (mapping.from.kind === "product" || mapping.from.kind === "vendor")) {
      denials.push(deny("product_compliance_inference", `A ${mapping.from.kind} cannot be mapped to a requirement. Category relevance is not compliance proof.`));
    } else if (!(rule.from as readonly RefKind[]).includes(mapping.from.kind) || !(rule.to as readonly RefKind[]).includes(mapping.to.kind)) {
      denials.push(deny("relation_not_allowed", `${mapping.relation} does not connect ${mapping.from.kind} to ${mapping.to.kind}.`));
    }

    // Evidence and correspondence.
    if (mapping.correspondence === "editorial") {
      if (mapping.epistemicStatus !== "hypothesis" && mapping.epistemicStatus !== "unknown") {
        denials.push(deny("editorial_overclaims", `Editorial correspondence is interpretation; epistemic status must be hypothesis or unknown, not ${mapping.epistemicStatus}.`));
      }
    } else if (mapping.evidence.length === 0) {
      denials.push(deny("missing_evidence", `${mapping.correspondence} correspondence needs at least one piece of evidence.`));
    }
    for (const evidence of mapping.evidence) {
      let vendorReported = false;
      if (evidence.kind === "catalog_claim") {
        const claim = context.catalog.claims.get(evidence.claimId);
        if (!claim) {
          denials.push(deny("evidence_unknown_claim", `Claim ${evidence.claimId} is not in the catalog.`));
          continue;
        }
        if (claim.verificationStatus === "needs_review") denials.push(deny("evidence_not_reviewed", `Claim ${evidence.claimId} still needs review.`));
        if (claim.verificationStatus === "conflicting") denials.push(deny("evidence_conflicting", `Claim ${evidence.claimId} has conflicting sources.`));
        if (claim.verificationStatus === "superseded") denials.push(deny("evidence_withdrawn", `Claim ${evidence.claimId} is superseded and cannot support a current mapping.`));
        if (mapping.relation === "implements_capability" && (claim.subjectId !== mapping.from.id || claim.capabilityId !== mapping.to.id)) {
          denials.push(deny("evidence_subject_mismatch", `Claim ${evidence.claimId} is about ${claim.subjectType}:${claim.subjectId} / ${claim.capabilityId ?? "no capability"}, not this mapping's ends.`));
        }
        vendorReported = claim.verificationStatus === "vendor_published";
      } else {
        const assessment = upstream.get(evidence.evidenceId);
        if (!assessment) {
          denials.push(deny("upstream_assessment_missing", `No upstream result for ${evidence.evidenceId}; failing closed.`));
          continue;
        }
        if (assessment.status === "blocked") denials.push(deny("upstream_blocked", `Upstream checks blocked ${evidence.evidenceId}.`));
        if (assessment.status === "unknown") denials.push(deny("upstream_unknown", `Upstream status for ${evidence.evidenceId} is unknown; failing closed.`));
        if (assessment.status === "outdated") denials.push(deny("upstream_outdated", `Upstream result for ${evidence.evidenceId} is out of date; re-check before use.`));
        vendorReported = assessment.evidenceKind === "vendor_claim";
      }
      if (vendorReported && (mapping.epistemicStatus === "observed" || mapping.epistemicStatus === "tested")) {
        denials.push(deny("vendor_status_upgraded", `Vendor-reported evidence cannot support a mapping marked ${mapping.epistemicStatus}.`));
      }
    }

    // Lifecycle and publisher review.
    if (mapping.lifecycle === "withdrawn") denials.push(deny("mapping_withdrawn", "Withdrawn mappings never pass."));
    else if (mapping.lifecycle === "superseded") {
      denials.push(deny("mapping_superseded", "Superseded mappings never pass; use the replacement."));
      const next = mapping.supersededBy;
      if (!next || !mappings.some((other) => other.id === next.id && other.revision === next.revision)) {
        denials.push(deny("superseded_without_replacement", `Mapping ${mapping.id} names no submitted replacement.`));
      }
    } else if (mapping.lifecycle !== "approved") denials.push(deny("lifecycle_not_approved", `Lifecycle is ${mapping.lifecycle}, not approved.`));
    const review = mapping.publisherReview;
    if (review.decision !== "approved" || !review.reviewer || !review.reviewedOn) {
      denials.push(deny("publisher_review_missing", "Needs an approved publisher review with a named reviewer and date."));
    }

    result.mapping_checks_passed = denials.length === 0;
  }

  // Consumer decisions: independent, scoped, pinned to one exact mapping revision.
  const seenConsumer = new Set<string>();
  (input.consumers ?? []).forEach((raw, index) => {
    const parsed = consumerAcceptanceSchema.safeParse(raw);
    if (!parsed.success) {
      report.rejectedInputs.push({ list: "consumers", index, message: parsed.error.issues[0]?.message ?? "Invalid consumer decision" });
      return;
    }
    const decision = parsed.data;
    const denials: Denial[] = [];
    const key = `${decision.consumerId}|${decision.mappingId}@${decision.mappingRevision}`;
    if (seenConsumer.has(key)) denials.push(deny("duplicate_consumer_decision", `${decision.consumerId} already recorded a decision for this revision.`));
    seenConsumer.add(key);
    const target = results.get(`${decision.mappingId}@${decision.mappingRevision}`);
    if (!target) {
      const otherRevision = report.mappings.find((item) => item.id === decision.mappingId);
      denials.push(otherRevision
        ? deny("consumer_revision_mismatch", `Decision pins ${decision.mappingId}@${decision.mappingRevision}; submitted revision is ${otherRevision.revision}.`)
        : deny("consumer_unknown_mapping", `Mapping ${decision.mappingId} was not submitted.`));
    } else if (decision.decision === "accept" && !target.mapping_checks_passed) {
      denials.push(deny("consumer_accepts_failing_mapping", `Cannot accept ${decision.mappingId}@${decision.mappingRevision}: its checks did not pass.`));
    }
    report.consumers.push({
      consumerId: decision.consumerId,
      mappingId: decision.mappingId,
      mappingRevision: decision.mappingRevision,
      decision: denials.length === 0 ? decision.decision : null,
      decision_recorded: denials.length === 0,
      denials,
    });
  });

  return report;
}

/**
 * Direct targets only. There is deliberately no traversal helper: A→B and B→C never yields A→C.
 */
export function directTargets(mappings: readonly Pick<Mapping, "from" | "to" | "relation">[], from: Ref, relation?: Mapping["relation"]): Ref[] {
  return mappings
    .filter((mapping) => mapping.from.kind === from.kind && mapping.from.id === from.id && mapping.from.revision === from.revision)
    .filter((mapping) => !relation || mapping.relation === relation)
    .map((mapping) => mapping.to);
}
