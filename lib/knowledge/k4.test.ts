import { describe, expect, it } from "vitest";
import { catalog } from "@/lib/catalog";
import fixture from "@/lib/integrations/fixtures/ase-synthetic-product.v1.json";
import { previewResearchEvidenceBatch } from "@/lib/integrations/research-evidence";
import { catalogIndexFrom, catalogRevision } from "./catalog-index";
import { secretsExposureFixture } from "./fixtures";
import { correctionImpact } from "./impact";
import type { MappingInput } from "./model";
import { assessmentsFromPreview } from "./upstream";
import { validateKnowledge, type FreshnessPolicy, type KnowledgeContext } from "./validate";

/** K4 (KRU-215): freshness, revocation, correction impact and rollback safety. */
const index = catalogIndexFrom(catalog);
const REV = catalogRevision(catalog);
const CAP = "fx-map-capability-supports-initiative";
const REQ = "fx-map-category-relevant-to-requirement";
const PRODUCT = "fx-map-product-implements-capability";
// Fixture checks are dated 2026-11-17.
const policy = (evaluatedOn: string): FreshnessPolicy => ({ evaluatedOn, maxAgeDays: { upstream: 30, publicationRevision: 365 } });

function setup(extra: Partial<KnowledgeContext> = {}) {
  const f = structuredClone(secretsExposureFixture(REV));
  const context: KnowledgeContext = { catalog: index, upstream: f.upstream, allowSynthetic: true, ...extra };
  return { ...f, context };
}
type Fixture = ReturnType<typeof setup>;
const run = (f: Fixture) => validateKnowledge({ records: f.records, mappings: f.mappings, consumers: f.consumers }, f.context);
const result = (f: Fixture, id: string) => run(f).mappings.find((m) => m.id === id)!;
const codes = (f: Fixture, id: string) => result(f, id).denials.map((d) => d.code);

/** A requirement defined in the fixture publication, to exercise publication freshness. */
const definedIn: MappingInput = {
  id: "fx-map-requirement-defined-in",
  revision: "r1",
  relation: "defined_in",
  from: { kind: "requirement", id: "fx-req-revoke-exposed", revision: "r1" },
  to: { kind: "publication_revision", id: "fx-pubrev-credential-guide", revision: "r1" },
  correspondence: "editorial",
  scope: "Where the requirement text comes from.",
  rationale: "The requirement is quoted by ID from this edition.",
  epistemicStatus: "hypothesis",
  confidence: "unknown",
  evidence: [],
  lifecycle: "approved",
  supersededBy: null,
  publisherReview: { decision: "approved", reviewer: "fixture-reviewer", reviewedOn: "2026-11-17" },
  synthetic: true,
};

describe("freshness", () => {
  it("changes nothing when no policy is given, and reports no age", () => {
    const report = run(setup());
    expect(report.mappings.every((m) => m.mapping_checks_passed && m.evidenceAgeDays === null)).toBe(true);
  });

  it("passes evidence within the limit and reports its age", () => {
    const r = result(setup({ freshness: policy("2026-12-17") }), CAP);
    expect(r).toMatchObject({ mapping_checks_passed: true, evidenceAgeDays: 30 });
  });

  it("blocks evidence past the limit from supporting a current mapping", () => {
    const f = setup({ freshness: policy("2026-12-18") });
    expect(codes(f, CAP)).toEqual(["evidence_stale"]);
    expect(result(f, CAP).evidenceAgeDays).toBe(31);
  });

  it("keeps the stale mapping's confidence and age visible instead of dropping it", () => {
    const r = result(setup({ freshness: policy("2027-03-01") }), CAP);
    expect(r).toMatchObject({ mapping_checks_passed: false, confidence: "medium", evidenceAgeDays: 104 });
  });

  it("rejects a check dated after the evaluation date", () => {
    expect(codes(setup({ freshness: policy("2026-11-01") }), CAP)).toEqual(["freshness_date_invalid"]);
  });

  it("blocks mappings to a publication revision that has not been checked recently enough", () => {
    const f = setup({ freshness: policy("2027-11-18") });
    f.mappings.push(structuredClone(definedIn));
    expect(codes(f, definedIn.id)).toEqual(["target_stale"]);
    const g = setup({ freshness: policy("2027-11-17") });
    g.mappings.push(structuredClone(definedIn));
    expect(codes(g, definedIn.id)).toEqual([]);
  });

  it("refuses an evaluation date that is not an ISO date instead of guessing one", () => {
    expect(() => run(setup({ freshness: { evaluatedOn: "today", maxAgeDays: { upstream: 30, publicationRevision: 365 } } }))).toThrow(/ISO date/);
  });
});

describe("revocation", () => {
  const revoked = { evidenceId: "fx-ase-evidence-1", reason: "rights_revoked", recordedOn: "2026-11-18", recordedBy: "fixture-owner" };

  it("blocks evidence whose rights were revoked, even though its assessment still says accepted", () => {
    const f = setup({ revocations: [revoked] });
    expect(f.upstream.find((a) => a.evidenceId === "fx-ase-evidence-1")?.status).toBe("accepted");
    expect(codes(f, CAP)).toEqual(["evidence_revoked"]);
    expect(run(f).consumers[0]).toMatchObject({ decision_recorded: false });
  });

  it("cannot be undone by rolling the inputs back", () => {
    // Roll back to the original inputs, including the original accepted assessment.
    const original = setup();
    const rolledBack = setup({ revocations: [revoked], upstream: structuredClone(original.upstream) });
    expect(codes(rolledBack, CAP)).toEqual(["evidence_revoked"]);
  });

  it("blocks a retracted catalog claim and a withdrawn record", () => {
    const f = setup({
      revocations: [
        { evidenceId: "claim-trufflehog-verify", reason: "retracted", recordedOn: "2026-11-18", recordedBy: "fixture-owner" },
        { ref: { kind: "requirement", id: "fx-req-revoke-exposed" }, reason: "withdrawn", recordedOn: "2026-11-18", recordedBy: "fixture-owner" },
      ],
    });
    expect(codes(f, PRODUCT)).toEqual(["evidence_revoked"]);
    expect(codes(f, REQ)).toEqual(["target_revoked"]);
  });

  it("rejects a malformed revocation instead of ignoring the evidence check", () => {
    const report = run(setup({ revocations: [{ ...revoked, ref: { kind: "category", id: "secrets-detection" } }] }));
    expect(report.rejectedInputs).toEqual([expect.objectContaining({ list: "revocations", index: 0 })]);
  });

  it("blocks evidence the reader later saw retracted at the source", () => {
    const pkg = {
      ...structuredClone(fixture),
      id: "evidence:k4-validity",
      kind: "sourced_fact",
      epistemicStatus: "observed",
      subject: { type: "capability", id: "cap-secret-verification" },
      marketMapRefs: { vendorIds: [], productIds: [], categoryIds: [], capabilityIds: ["cap-secret-verification"], unresolvedRefs: [] },
      idempotencyKey: "idem-k4-validity",
    };
    const f = setup();
    Object.assign(f.mappings.find((m) => m.id === CAP)!, { evidence: [{ kind: "upstream_evidence", evidenceId: pkg.id }] });
    f.context.upstream = assessmentsFromPreview(previewResearchEvidenceBatch([pkg]), "2026-11-17");
    expect(codes(f, CAP)).toEqual([]);
    f.context.revocations = [{ evidenceId: pkg.id, reason: "retracted", recordedOn: "2026-11-18", recordedBy: "fixture-owner" }];
    expect(codes(f, CAP)).toEqual(["evidence_revoked"]);
  });
});

describe("correction impact", () => {
  it("lists the mappings and consumer decisions a revoked piece of evidence affects", () => {
    const f = setup();
    const impact = correctionImpact(f, { kind: "evidence_revoked", evidenceId: "fx-ase-evidence-1" });
    expect(impact.affectedMappings.map((m) => m.id)).toEqual([CAP]);
    expect(impact.consumerDispositions).toEqual([
      { consumerId: "fixture-consumer", mappingId: CAP, mappingRevision: "r1", previousDecision: "accept", disposition: "needs_review" },
    ]);
  });

  it("queues review for mappings pinned to an old record revision, and never re-approves them", () => {
    const f = setup();
    const impact = correctionImpact(f, { kind: "record_revised", ref: { kind: "business_problem", id: "fx-bp-exposed-credentials" }, newRevision: "r2" });
    expect(impact.affectedMappings.map((m) => m.id).sort()).toEqual(["fx-map-category-addresses-problem", "fx-map-problem-has-outcome"]);
    // Direct only: the outcome's metric mapping does not reference the problem.
    expect(impact.affectedMappings.map((m) => m.id)).not.toContain("fx-map-outcome-measured-by");
    // Applying the revision leaves those mappings failing until a reviewed mapping revision exists.
    Object.assign(f.records.find((r) => r.id === "fx-bp-exposed-credentials")!, { revision: "r2" });
    expect(codes(f, "fx-map-problem-has-outcome")).toEqual(["revision_mismatch"]);
  });

  it("does not ask a consumer that rejected a mapping to act again", () => {
    const f = setup();
    f.consumers[0].decision = "reject";
    expect(correctionImpact(f, { kind: "evidence_revoked", evidenceId: "fx-ase-evidence-1" }).consumerDispositions).toEqual([]);
  });

  it("shows how far a catalog snapshot change reaches", () => {
    const f = setup();
    const impact = correctionImpact(f, { kind: "catalog_snapshot", newRevision: "catalog@2026-12-01" });
    expect(impact.affectedMappings.map((m) => m.id).sort()).toEqual([CAP, "fx-map-category-addresses-problem", REQ, PRODUCT].sort());
  });

  it("lists mappings that reference a withdrawn record", () => {
    const impact = correctionImpact(setup(), { kind: "record_withdrawn", ref: { kind: "product", id: "trufflehog" } });
    expect(impact.affectedMappings.map((m) => m.id)).toEqual([PRODUCT]);
  });

  it("skips mappings that are already withdrawn or superseded", () => {
    const f = setup();
    f.mappings.find((m) => m.id === CAP)!.lifecycle = "withdrawn";
    expect(correctionImpact(f, { kind: "evidence_revoked", evidenceId: "fx-ase-evidence-1" }).affectedMappings).toEqual([]);
  });
});
