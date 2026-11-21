import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { catalog } from "@/lib/catalog";
import { catalogIndexFrom, catalogRevision } from "./catalog-index";
import { secretsExposureFixture } from "./fixtures";
import type { KnowledgeRecordInput, MappingInput } from "./model";
import { directTargets, validateKnowledge, type CatalogIndex, type DenialCode, type KnowledgeContext } from "./validate";

const index = catalogIndexFrom(catalog);
const REV = catalogRevision(catalog);

function setup() {
  const fixture = structuredClone(secretsExposureFixture(REV));
  const context: KnowledgeContext = { catalog: index, upstream: fixture.upstream, allowSynthetic: true };
  return { ...fixture, context };
}

type Fixture = ReturnType<typeof setup>;
const run = (f: Fixture) => validateKnowledge({ records: f.records, mappings: f.mappings, consumers: f.consumers }, f.context);
const mapping = (f: Fixture, id: string) => f.mappings.find((item) => item.id === id) as MappingInput;
const record = (f: Fixture, id: string) => f.records.find((item) => item.id === id) as KnowledgeRecordInput;
function codesFor(f: Fixture, id: string): DenialCode[] {
  const result = run(f).mappings.find((item) => item.id === id);
  if (!result) throw new Error(`no result for ${id}`);
  return result.denials.map((denial) => denial.code);
}

const CAP = "fx-map-capability-supports-initiative";
const PRODUCT = "fx-map-product-implements-capability";
const REQ = "fx-map-category-relevant-to-requirement";

describe("knowledge model K1 prototype", () => {
  it("passes the whole secrets-exposure fixture against the real catalog", () => {
    const report = run(setup());
    expect(report.catalogRevision).toBe(REV);
    expect(report.recordProblems).toEqual([]);
    expect(report.rejectedInputs).toEqual([]);
    expect(report.mappings).toHaveLength(6);
    for (const result of report.mappings) expect(result, result.id).toMatchObject({ mapping_checks_passed: true, denials: [] });
    expect(report.consumers).toEqual([expect.objectContaining({ decision: "accept", decision_recorded: true, denials: [] })]);
  });

  it("rejects synthetic fixtures unless explicitly allowed", () => {
    const f = setup();
    f.context.allowSynthetic = false;
    const report = run(f);
    expect(report.recordProblems.every((problem) => problem.code === "synthetic_not_allowed")).toBe(true);
    expect(report.mappings.every((result) => !result.mapping_checks_passed)).toBe(true);
  });

  it("reuses existing catalog identity namespaces instead of redefining them", () => {
    for (const [kind, id] of [["category", "secrets-detection"], ["capability", "cap-secret-verification"], ["product", "trufflehog"], ["use_case", "uc-detect"], ["claim", "claim-trufflehog-verify"]] as const) {
      expect(index.ids[kind].has(id), `${kind}:${id}`).toBe(true);
    }
  });

  describe("references and exact revisions", () => {
    it("rejects a catalog reference made against another snapshot", () => {
      const f = setup();
      mapping(f, CAP).from.revision = "catalog@2026-01-01";
      expect(codesFor(f, CAP)).toEqual(["revision_mismatch"]);
    });

    it("rejects a knowledge reference to a stale record revision", () => {
      const f = setup();
      mapping(f, CAP).to.revision = "r0";
      expect(codesFor(f, CAP)).toEqual(["revision_mismatch"]);
    });

    it("rejects unknown catalog and knowledge references", () => {
      const f = setup();
      mapping(f, CAP).from.id = "cap-does-not-exist";
      mapping(f, REQ).to.id = "fx-req-missing";
      // The capability's evidence is about the real capability, so it also stops matching.
      expect(codesFor(f, CAP)).toEqual(["unknown_reference", "evidence_subject_mismatch"]);
      expect(codesFor(f, REQ)).toEqual(["unknown_reference"]);
    });

    it("rejects withdrawn and superseded targets", () => {
      const f = setup();
      Object.assign(record(f, "fx-req-revoke-exposed"), { status: "withdrawn" });
      expect(codesFor(f, REQ)).toEqual(["target_withdrawn"]);
      const g = setup();
      Object.assign(record(g, "fx-req-revoke-exposed"), { status: "superseded", supersededBy: { kind: "requirement", id: "fx-req-revoke-exposed", revision: "r1" } });
      expect(codesFor(g, REQ)).toEqual(["target_superseded"]);
    });

    it("detects dangling internal references and propagates them to mappings", () => {
      const f = setup();
      Object.assign(record(f, "fx-req-revoke-exposed"), { requirementSetId: "fx-reqset-missing" });
      const report = run(f);
      expect(report.recordProblems).toEqual([expect.objectContaining({ id: "fx-req-revoke-exposed", code: "dangling_internal_reference" })]);
      expect(report.mappings.find((item) => item.id === REQ)?.denials.map((denial) => denial.code)).toEqual(["dangling_internal_reference"]);
    });

    it("rejects an initiative that names a use case outside the catalog", () => {
      const f = setup();
      Object.assign(record(f, "fx-init-revoke-on-exposure"), { useCaseId: "uc-made-up" });
      expect(run(f).recordProblems).toEqual([expect.objectContaining({ code: "dangling_internal_reference" })]);
    });

    it("rejects duplicate records and superseded records without a replacement", () => {
      const f = setup();
      f.records.push(structuredClone(record(f, "fx-bp-exposed-credentials")));
      Object.assign(record(f, "fx-metric-exposure-to-revocation"), { status: "superseded", supersededBy: null });
      const codes = run(f).recordProblems.map((problem) => problem.code);
      expect(codes).toContain("duplicate_record");
      expect(codes).toContain("superseded_without_replacement");
    });
  });

  describe("relations", () => {
    it("rejects relation types between incompatible kinds", () => {
      const f = setup();
      mapping(f, CAP).relation = "measured_by";
      expect(codesFor(f, CAP)).toEqual(["relation_not_allowed"]);
    });

    it("never lets a product or vendor satisfy a requirement", () => {
      for (const kind of ["product", "vendor"] as const) {
        const f = setup();
        const m = mapping(f, REQ);
        m.from = { kind, id: kind === "product" ? "trufflehog" : "truffle-security", revision: REV };
        expect(codesFor(f, REQ)).toEqual(["product_compliance_inference", "evidence_subject_mismatch"]);
      }
    });

    it("never infers transitive relationships", () => {
      const { mappings } = setup();
      const parsed = mappings.map((m) => ({ from: m.from, to: m.to, relation: m.relation }));
      const problem = { kind: "business_problem" as const, id: "fx-bp-exposed-credentials", revision: "r1" };
      expect(directTargets(parsed, problem)).toEqual([{ kind: "outcome", id: "fx-outcome-fast-revocation", revision: "r1" }]);
      const category = { kind: "category" as const, id: "secrets-detection", revision: REV };
      const targets = directTargets(parsed, category).map((ref) => ref.kind);
      expect(targets).toEqual(["business_problem", "requirement"]);
      expect(targets).not.toContain("outcome");
      expect(targets).not.toContain("metric_definition");
    });
  });

  describe("evidence and correspondence", () => {
    it("requires evidence for exact and partial correspondence", () => {
      const f = setup();
      mapping(f, CAP).evidence = [];
      expect(codesFor(f, CAP)).toEqual(["missing_evidence"]);
    });

    it("keeps editorial correspondence as interpretation", () => {
      const f = setup();
      mapping(f, "fx-map-category-addresses-problem").epistemicStatus = "observed";
      expect(codesFor(f, "fx-map-category-addresses-problem")).toEqual(["editorial_overclaims"]);
    });

    it("rejects catalog claims that are unknown, unreviewed or about something else", () => {
      const f = setup();
      mapping(f, PRODUCT).evidence = [{ kind: "catalog_claim", claimId: "claim-nope" }];
      expect(codesFor(f, PRODUCT)).toEqual(["evidence_unknown_claim"]);
      const g = setup();
      mapping(g, PRODUCT).evidence = [{ kind: "catalog_claim", claimId: "claim-gartner-secrets-20240812" }];
      expect(codesFor(g, PRODUCT)).toEqual(expect.arrayContaining(["evidence_not_reviewed", "evidence_subject_mismatch"]));
      const h = setup();
      mapping(h, PRODUCT).evidence = [{ kind: "catalog_claim", claimId: "claim-github-validity" }];
      expect(codesFor(h, PRODUCT)).toEqual(["evidence_subject_mismatch"]);
    });

    it("rejects superseded and conflicting catalog claims", () => {
      for (const [status, code] of [["superseded", "evidence_withdrawn"], ["conflicting", "evidence_conflicting"]] as const) {
        const f = setup();
        const claims = new Map(index.claims);
        claims.set("claim-trufflehog-verify", { ...claims.get("claim-trufflehog-verify")!, verificationStatus: status });
        f.context.catalog = { ...index, claims } satisfies CatalogIndex;
        expect(codesFor(f, PRODUCT)).toEqual([code]);
      }
    });

    it("does not upgrade vendor-reported evidence", () => {
      const f = setup();
      mapping(f, PRODUCT).epistemicStatus = "tested";
      expect(codesFor(f, PRODUCT)).toEqual(["vendor_status_upgraded"]);
      const g = setup();
      g.context.upstream = g.upstream.map((a) => ({ ...a, evidenceKind: "vendor_claim" as const }));
      mapping(g, CAP).epistemicStatus = "observed";
      expect(codesFor(g, CAP)).toEqual(["vendor_status_upgraded"]);
    });
  });

  describe("upstream assessments fail closed", () => {
    it.each([
      ["blocked", "upstream_blocked"],
      ["unknown", "upstream_unknown"],
      ["outdated", "upstream_outdated"],
    ] as const)("rejects %s upstream results", (status, code) => {
      const f = setup();
      f.context.upstream = f.upstream.map((a) => (a.evidenceId === "fx-ase-evidence-1" ? { ...a, status } : a));
      expect(codesFor(f, CAP)).toEqual([code]);
    });

    it("rejects evidence with no upstream result", () => {
      const f = setup();
      f.context.upstream = f.upstream.filter((a) => a.evidenceId !== "fx-ase-evidence-1");
      expect(codesFor(f, CAP)).toEqual(["upstream_assessment_missing"]);
    });

    it("refuses a second, conflicting upstream result for the same evidence", () => {
      const f = setup();
      f.context.upstream = [...f.upstream, { ...f.upstream[0], status: "blocked" }];
      const report = run(f);
      expect(report.rejectedInputs).toEqual([expect.objectContaining({ list: "upstream", index: 2 })]);
      expect(report.mappings.find((item) => item.id === CAP)?.mapping_checks_passed).toBe(true);
    });
  });

  describe("lifecycle and publisher review", () => {
    it.each([
      ["draft", "lifecycle_not_approved"],
      ["in_review", "lifecycle_not_approved"],
      ["withdrawn", "mapping_withdrawn"],
    ] as const)("rejects %s mappings", (lifecycle, code) => {
      const f = setup();
      mapping(f, CAP).lifecycle = lifecycle;
      expect(codesFor(f, CAP)).toEqual([code]);
    });

    it("requires a submitted replacement for a superseded mapping", () => {
      const f = setup();
      const old = mapping(f, CAP);
      f.mappings.push({ ...structuredClone(old), revision: "r2" });
      Object.assign(old, { lifecycle: "superseded", supersededBy: { id: CAP, revision: "r2" } });
      const report = run(f);
      expect(report.mappings.filter((item) => item.id === CAP).map((item) => [item.revision, item.mapping_checks_passed])).toEqual([["r1", false], ["r2", true]]);
      Object.assign(old, { supersededBy: { id: CAP, revision: "r9" } });
      expect(codesFor(f, CAP)).toEqual(["mapping_superseded", "superseded_without_replacement"]);
    });

    it("requires an approved publisher review with reviewer and date", () => {
      const f = setup();
      mapping(f, CAP).publisherReview = { decision: "pending", reviewer: null, reviewedOn: null };
      expect(codesFor(f, CAP)).toEqual(["publisher_review_missing"]);
      const g = setup();
      mapping(g, CAP).publisherReview = { decision: "approved", reviewer: null, reviewedOn: "2026-11-17" };
      expect(codesFor(g, CAP)).toEqual(["publisher_review_missing"]);
    });

    it("ignores a duplicate replay of the same mapping revision", () => {
      const f = setup();
      f.mappings.push(structuredClone(mapping(f, CAP)));
      const results = run(f).mappings.filter((item) => item.id === CAP);
      expect(results.map((item) => item.mapping_checks_passed)).toEqual([true, false]);
      expect(results[1].denials.map((denial) => denial.code)).toEqual(["duplicate_mapping"]);
    });
  });

  describe("consumer acceptance is separate from publisher approval", () => {
    it("records nothing for mappings a consumer has not decided on", () => {
      const report = run(setup());
      expect(report.mappings.filter((item) => item.mapping_checks_passed)).toHaveLength(6);
      expect(report.consumers.map((item) => item.mappingId)).toEqual([CAP]);
    });

    it("refuses acceptance of a mapping whose checks failed, but allows rejecting it", () => {
      const f = setup();
      mapping(f, CAP).lifecycle = "draft";
      expect(run(f).consumers[0]).toMatchObject({ decision: null, decision_recorded: false, denials: [expect.objectContaining({ code: "consumer_accepts_failing_mapping" })] });
      f.consumers[0].decision = "reject";
      expect(run(f).consumers[0]).toMatchObject({ decision: "reject", decision_recorded: true });
    });

    it("pins one exact mapping revision", () => {
      const f = setup();
      f.consumers[0].mappingRevision = "r0";
      expect(run(f).consumers[0].denials.map((denial) => denial.code)).toEqual(["consumer_revision_mismatch"]);
      f.consumers[0].mappingId = "fx-map-unknown";
      expect(run(f).consumers[0].denials.map((denial) => denial.code)).toEqual(["consumer_unknown_mapping"]);
    });

    it("requires a use scope and rationale, and one decision per consumer revision", () => {
      const f = setup();
      f.consumers.push(structuredClone(f.consumers[0]));
      expect(run(f).consumers[1].denials.map((denial) => denial.code)).toEqual(["duplicate_consumer_decision"]);
      const g = setup();
      g.consumers[0].useScope = " ";
      expect(run(g).rejectedInputs).toEqual([expect.objectContaining({ list: "consumers", index: 0 })]);
    });
  });

  it("preserves Unknown confidence instead of coercing it", () => {
    const report = run(setup());
    const editorial = report.mappings.filter((item) => item.id !== CAP && item.id !== PRODUCT && item.id !== REQ);
    expect(editorial.map((item) => item.confidence)).toEqual(["unknown", "unknown", "unknown"]);
  });

  it("reports malformed input instead of throwing", () => {
    const report = validateKnowledge({ records: [{ kind: "publisher" }], mappings: [{ id: "x" }], consumers: [42] }, { catalog: index, upstream: [null] });
    expect(report.recordProblems).toEqual([expect.objectContaining({ code: "invalid_shape" })]);
    expect(report.rejectedInputs.map((item) => item.list)).toEqual(["upstream", "mappings", "consumers"]);
  });

  it("stays offline: nothing outside lib/knowledge imports it", () => {
    const root = process.cwd();
    const offenders: string[] = [];
    const walk = (dir: string) => {
      for (const name of readdirSync(dir)) {
        if (["node_modules", ".next", "storybook-static", ".git", "knowledge"].includes(name)) continue;
        const path = join(dir, name);
        if (statSync(path).isDirectory()) walk(path);
        else if (/\.(ts|tsx|mjs)$/.test(name) && /lib\/knowledge/.test(readFileSync(path, "utf8"))) offenders.push(path.slice(root.length + 1));
      }
    };
    for (const dir of ["app", "components", "lib", "scripts"]) walk(join(root, dir));
    expect(offenders).toEqual([]);
  });
});
