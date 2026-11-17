import type { ConsumerAcceptance, KnowledgeRecordInput, MappingInput, UpstreamAssessment } from "./model";

/**
 * Worked example for the secrets-exposure pilot path (KRU-214 owns the real one).
 *
 * Every knowledge record and mapping here is marked synthetic. Publisher, publication and
 * requirement are invented placeholders on example.org, not real guidance; the validator rejects
 * them unless allowSynthetic is set. Catalog references (secrets-detection, cap-secret-verification,
 * trufflehog, claim-trufflehog-verify, uc-detect) are real IDs so reuse is exercised end to end.
 * Upstream assessments are synthetic inputs, not results from a working adapter.
 */
export function secretsExposureFixture(catalogRev: string) {
  const fx = { synthetic: true, ownerRepo: "security-market-map" } as const;
  const records: KnowledgeRecordInput[] = [
    { kind: "publisher", id: "fx-publisher-guidance", revision: "r1", status: "reviewed", ...fx, name: "Fixture guidance body", officialDomains: ["example.org"], role: "Standards and guidance (fixture)" },
    {
      kind: "publication_revision",
      id: "fx-pubrev-credential-guide",
      revision: "r1",
      status: "reviewed",
      ...fx,
      publisherId: "fx-publisher-guidance",
      title: "Fixture credential handling guide",
      edition: "1.0",
      originalDocumentId: "FX-GUIDE-1",
      url: "https://example.org/fixture/credential-guide",
      publishedOn: null,
      checkedOn: "2026-11-17",
      rights: "citation_and_paraphrase",
      contentHash: null,
    },
    { kind: "requirement_set", id: "fx-reqset-credential-guide", revision: "r1", status: "reviewed", ...fx, publicationRevisionId: "fx-pubrev-credential-guide", requirementKind: "guidance", jurisdiction: null },
    { kind: "requirement", id: "fx-req-revoke-exposed", revision: "r1", status: "reviewed", ...fx, requirementSetId: "fx-reqset-credential-guide", originalRequirementId: "FX-1", applicability: "Fixture: credentials used by automated systems." },
    { kind: "business_problem", id: "fx-bp-exposed-credentials", revision: "r1", status: "reviewed", ...fx, title: "Exposed credentials stay usable", affectedProcess: "Credential lifecycle after an exposure" },
    { kind: "outcome", id: "fx-outcome-fast-revocation", revision: "r1", status: "reviewed", ...fx, businessProblemId: "fx-bp-exposed-credentials", description: "Exposed credentials stop working quickly, and closure is verified.", outcomeType: "desired" },
    {
      kind: "metric_definition",
      id: "fx-metric-exposure-to-revocation",
      revision: "r1",
      status: "reviewed",
      ...fx,
      outcomeId: "fx-outcome-fast-revocation",
      unit: "hours",
      numerator: null,
      denominator: null,
      counterMetric: "Detection coverage and developer disruption. A higher finding count alone is not lower risk.",
    },
    { kind: "initiative", id: "fx-init-revoke-on-exposure", revision: "r1", status: "reviewed", ...fx, businessProblemId: "fx-bp-exposed-credentials", useCaseId: "uc-detect" },
  ];

  const review = { decision: "approved", reviewer: "fixture-reviewer", reviewedOn: "2026-11-17" } as const;
  const base = { revision: "r1", lifecycle: "approved", publisherReview: review, synthetic: true, supersededBy: null } as const;
  const catalog = (kind: "category" | "capability" | "product", id: string) => ({ kind, id, revision: catalogRev });
  const known = (kind: KnowledgeRecordInput["kind"], id: string) => ({ kind, id, revision: "r1" });

  const mappings: MappingInput[] = [
    {
      ...base,
      id: "fx-map-category-addresses-problem",
      relation: "addresses_problem",
      from: catalog("category", "secrets-detection"),
      to: known("business_problem", "fx-bp-exposed-credentials"),
      correspondence: "editorial",
      scope: "Detection finds exposures; it does not revoke them.",
      rationale: "Finding an exposed credential is the first step toward revoking it.",
      epistemicStatus: "hypothesis",
      confidence: "unknown",
      evidence: [],
    },
    {
      ...base,
      id: "fx-map-capability-supports-initiative",
      relation: "supports_initiative",
      from: catalog("capability", "cap-secret-verification"),
      to: known("initiative", "fx-init-revoke-on-exposure"),
      correspondence: "partial",
      scope: "Validity checks tell responders which exposures are still live.",
      rationale: "Prioritizes revocation work; does not perform revocation.",
      epistemicStatus: "reported",
      confidence: "medium",
      evidence: [{ kind: "upstream_evidence", evidenceId: "fx-ase-evidence-1" }],
    },
    {
      ...base,
      id: "fx-map-problem-has-outcome",
      relation: "has_outcome",
      from: known("business_problem", "fx-bp-exposed-credentials"),
      to: known("outcome", "fx-outcome-fast-revocation"),
      correspondence: "editorial",
      scope: "Desired outcome only; no customer result is implied.",
      rationale: "The problem is resolved when exposed credentials stop working.",
      epistemicStatus: "hypothesis",
      confidence: "unknown",
      evidence: [],
    },
    {
      ...base,
      id: "fx-map-outcome-measured-by",
      relation: "measured_by",
      from: known("outcome", "fx-outcome-fast-revocation"),
      to: known("metric_definition", "fx-metric-exposure-to-revocation"),
      correspondence: "editorial",
      scope: "Definition only; baselines and targets stay with the consumer.",
      rationale: "Time to verified revocation tracks the outcome directly.",
      epistemicStatus: "hypothesis",
      confidence: "unknown",
      evidence: [],
    },
    {
      ...base,
      id: "fx-map-category-relevant-to-requirement",
      relation: "relevant_to_requirement",
      from: catalog("category", "secrets-detection"),
      to: known("requirement", "fx-req-revoke-exposed"),
      correspondence: "partial",
      scope: "Relevance only. Using a tool in this category is not evidence of meeting the requirement.",
      rationale: "The requirement presumes exposures are found before they can be revoked.",
      epistemicStatus: "reported",
      confidence: "low",
      evidence: [{ kind: "upstream_evidence", evidenceId: "fx-ase-evidence-2" }],
    },
    {
      ...base,
      id: "fx-map-product-implements-capability",
      relation: "implements_capability",
      from: catalog("product", "trufflehog"),
      to: catalog("capability", "cap-secret-verification"),
      correspondence: "exact",
      scope: "Vendor-documented capability; not independently tested here.",
      rationale: "The vendor documents checking discovered credentials with their issuer.",
      epistemicStatus: "reported",
      confidence: "medium",
      evidence: [{ kind: "catalog_claim", claimId: "claim-trufflehog-verify" }],
    },
  ];

  const upstream: UpstreamAssessment[] = [
    { evidenceId: "fx-ase-evidence-1", contract: "research-evidence-v1", status: "accepted", evidenceKind: "sourced_fact", subjectRefs: ["capability:cap-secret-verification"], checkedOn: "2026-11-17" },
    { evidenceId: "fx-ase-evidence-2", contract: "research-evidence-v1", status: "accepted", evidenceKind: "sourced_fact", subjectRefs: ["category:secrets-detection"], checkedOn: "2026-11-17" },
  ];

  const consumers: ConsumerAcceptance[] = [
    {
      consumerId: "fixture-consumer",
      mappingId: "fx-map-capability-supports-initiative",
      mappingRevision: "r1",
      decision: "accept",
      useScope: "Offline discovery preparation exercise only.",
      rationale: "Fits the consumer's question about which exposures to revoke first.",
      reviewer: "fixture-consumer-owner",
      reviewedOn: "2026-11-17",
    },
  ];

  return { records, mappings, upstream, consumers };
}
