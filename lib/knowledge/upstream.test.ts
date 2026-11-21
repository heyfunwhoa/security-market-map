import { describe, expect, it } from "vitest";
import { catalog } from "@/lib/catalog";
import fixture from "@/lib/integrations/fixtures/ase-synthetic-product.v1.json";
import { previewResearchEvidenceBatch } from "@/lib/integrations/research-evidence";
import { catalogIndexFrom, catalogRevision } from "./catalog-index";
import { secretsExposureFixture } from "./fixtures";
import { assessmentsFromPreview } from "./upstream";
import { validateKnowledge } from "./validate";

/**
 * Bounded integration exercise from KRU-212: unchanged research-evidence-v1 packages go through
 * the existing reader, its output becomes K1 upstream assessments, and one mapping is validated.
 * Every package is synthetic (example.com sources, invented subjects except the catalog IDs named).
 */
const index = catalogIndexFrom(catalog);
const REV = catalogRevision(catalog);
const CAP = "fx-map-capability-supports-initiative";
const CHECKED = "2026-11-17";

/** The pinned fixture, re-aimed at a real catalog capability. Same contract, new identity. */
function capabilityPackage(overrides: Record<string, unknown> = {}) {
  return {
    ...structuredClone(fixture),
    id: "evidence:synthetic-secret-validity",
    kind: "sourced_fact",
    epistemicStatus: "observed",
    subject: { type: "capability", id: "cap-secret-verification", displayName: "Secret validity check" },
    statement: "Synthetic package: a validity check asks the issuer whether a found credential still works.",
    marketMapRefs: { vendorIds: [], productIds: [], categoryIds: [], capabilityIds: ["cap-secret-verification"], unresolvedRefs: [] },
    correlationId: "corr-synthetic-secret-validity",
    idempotencyKey: "idem-synthetic-secret-validity",
    ...overrides,
  };
}

/** Runs the batch and validates the capability mapping against one evidence ID. */
function validateWith(packages: unknown[], evidenceId: string) {
  const preview = previewResearchEvidenceBatch(packages);
  const f = structuredClone(secretsExposureFixture(REV));
  const mapping = f.mappings.find((m) => m.id === CAP)!;
  mapping.evidence = [{ kind: "upstream_evidence", evidenceId }];
  const upstream = assessmentsFromPreview(preview, CHECKED);
  const report = validateKnowledge({ records: f.records, mappings: f.mappings, consumers: f.consumers }, { catalog: index, upstream, allowSynthetic: true });
  return { preview, upstream, mapping: report.mappings.find((m) => m.id === CAP)!, consumer: report.consumers[0] };
}

const codes = (result: { denials: { code: string }[] }) => result.denials.map((denial) => denial.code);

describe("research-evidence-v1 → K1 integration", () => {
  it("accepts the unchanged pinned package as upstream evidence about its own subject", () => {
    const { preview, upstream } = validateWith([fixture], fixture.id);
    expect(preview.receipts).toEqual([{ index: 0, status: "preview", evidenceId: fixture.id }]);
    expect(upstream).toEqual([
      expect.objectContaining({ evidenceId: fixture.id, status: "accepted", evidenceKind: "vendor_claim", subjectRefs: ["product:fictional-machine-credentials"] }),
    ]);
    expect(preview.views[0].publicationAllowed).toBe(false);
  });

  it("refuses that package as evidence for an unrelated capability mapping", () => {
    expect(codes(validateWith([fixture], fixture.id).mapping)).toEqual(["evidence_subject_mismatch"]);
  });

  it("passes end to end when the package is about the mapping's capability, and the consumer can accept it", () => {
    const pkg = capabilityPackage();
    const { mapping, consumer } = validateWith([pkg], pkg.id);
    expect(mapping).toMatchObject({ mapping_checks_passed: true, denials: [] });
    expect(consumer).toMatchObject({ decision: "accept", decision_recorded: true });
  });

  it("blocks evidence the reader later superseded, and accepts the correction", () => {
    const first = capabilityPackage();
    const correction = capabilityPackage({
      id: "evidence:synthetic-secret-validity-v2",
      supersedes: first.id,
      idempotencyKey: "idem-synthetic-secret-validity-v2",
      producedAt: "2026-10-12T15:00:00.000Z",
      reviewedAt: "2026-10-12T12:00:00.000Z",
    });
    const old = validateWith([first, correction], first.id);
    expect(old.upstream.find((a) => a.evidenceId === first.id)?.status).toBe("blocked");
    expect(codes(old.mapping)).toEqual(["upstream_blocked"]);
    expect(validateWith([first, correction], correction.id).mapping.mapping_checks_passed).toBe(true);
  });

  it("blocks evidence invalidated by a source correction", () => {
    const pkg = capabilityPackage();
    const result = validateWith([pkg, { ...pkg, invalidatedBySourceCorrection: true }], pkg.id);
    expect(codes(result.mapping)).toEqual(["upstream_blocked"]);
    expect(result.consumer.decision_recorded).toBe(false);
  });

  it("fails closed when the reader rejects a package", () => {
    const pkg = capabilityPackage({ schemaVersion: "2" });
    const result = validateWith([pkg], pkg.id);
    expect(result.preview.receipts).toEqual([{ index: 0, status: "rejected", code: "invalid_schema" }]);
    expect(result.upstream).toEqual([]);
    expect(codes(result.mapping)).toEqual(["upstream_assessment_missing"]);
  });

  it("does not double-count a duplicate replay", () => {
    const pkg = capabilityPackage();
    const result = validateWith([pkg, structuredClone(pkg)], pkg.id);
    expect(result.preview.receipts.map((r) => r.status)).toEqual(["preview", "duplicate"]);
    expect(result.upstream).toHaveLength(1);
    expect(result.mapping.mapping_checks_passed).toBe(true);
  });

  it("keeps vendor-reported evidence from supporting an observed mapping", () => {
    const pkg = capabilityPackage({ kind: "vendor_claim", epistemicStatus: "reported" });
    const preview = previewResearchEvidenceBatch([pkg]);
    const f = structuredClone(secretsExposureFixture(REV));
    const mapping = f.mappings.find((m) => m.id === CAP)!;
    Object.assign(mapping, { evidence: [{ kind: "upstream_evidence", evidenceId: pkg.id }], epistemicStatus: "observed" });
    const report = validateKnowledge({ records: f.records, mappings: f.mappings }, { catalog: index, upstream: assessmentsFromPreview(preview, CHECKED), allowSynthetic: true });
    expect(codes(report.mappings.find((m) => m.id === CAP)!)).toEqual(["vendor_status_upgraded"]);
  });
});
