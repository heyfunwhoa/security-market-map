import { describe, expect, it } from "vitest";
import { evaluateCandidateHandoff, type CandidateIntake } from "./incident-handoff";
const fixture = (): CandidateIntake => ({
  status: "candidate_only", canonicalUrl: "https://docs.limacharlie.io/fictional-advisory",
  publisher: "Fictional publisher", retrievedAt: null, publishedAt: null,
  contentSha256: "a".repeat(64), hashVersion: 1, sourceVersion: "fixture-1",
  claims: [], uncertainties: ["Unknown incident technique"], correctionStatus: "none",
  exportable: false, fetched: false
});
describe("fixture-only ASE → Market Map incident boundary", () => {
  it("blocks candidate intake even with hash and provenance", () => {
    const result = evaluateCandidateHandoff(fixture());
    expect(result.status).toBe("blocked_unreviewed");
    expect(result.classification).toBeNull(); expect(result.publishable).toBe(false);
  });
  it("is replay deterministic without writes", () => {
    const packet=fixture();
    expect(evaluateCandidateHandoff(packet)).toEqual(evaluateCandidateHandoff(packet));
  });
  it("retains a fingerprint tied to hash and version", () => {
    const original=evaluateCandidateHandoff(fixture()).fingerprint;
    const changed=fixture(); changed.sourceVersion="fixture-2";
    expect(evaluateCandidateHandoff(changed).fingerprint).not.toBe(original);
  });
  it.each(["retracted","superseded"] as const)("blocks %s source correction", correctionStatus => {
    expect(evaluateCandidateHandoff({...fixture(),correctionStatus}).status).toBe("blocked_correction");
  });
  it("denies missing or malformed provenance", () => {
    expect(evaluateCandidateHandoff({...fixture(),contentSha256:"bogus"}).status).toBe("blocked_invalid");
  });
  it("denies injected factual claims and does not infer approval", () => {
    expect(evaluateCandidateHandoff({...fixture(),claims:[{id:"claim",status:"disputed"}]}).status).toBe("blocked_invalid");
  });
  it("never creates a classifier input or publishable incident", () => {
    const result=evaluateCandidateHandoff(fixture());
    expect(result.classification).toBeNull();
    expect(result.publishable).toBe(false);
  });
});
