import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  makeSourcedIncident,
  toAcademyLabEvidence,
  toMarketMapEvidence,
  type PublicIncident,
  type SourceRef,
} from "./security-intelligence-contract";

const read = <T>(name: string): T =>
  JSON.parse(readFileSync(join(process.cwd(), "data/security-intelligence", name), "utf8")) as T;

const incidents = read<PublicIncident[]>("incidents.seed.json");
const sources = read<SourceRef[]>("sources.seed.json");

describe("two consumers use exactly the same incident provenance", () => {
  it.each(incidents)("Market Map and Academy share the canonical incident and sources: $id", (incident) => {
    const evidence = makeSourcedIncident(incident, sources);
    const map = toMarketMapEvidence(evidence);
    const lab = toAcademyLabEvidence(evidence);
    expect(map.incidentId).toBe(lab.incidentId);
    expect(map.sourceIds).toEqual(lab.sourceIds);
    expect(map.sourceReport).toBe(lab.sourceReport);
    expect(map.unknowns).toEqual(lab.unsupportedLinks);
    expect(map.preventedByVendor).toBeNull();
    expect(lab.learnerPrompts.every((prompt) => prompt.status === "synthetic")).toBe(true);
    expect(map.techniqueIds).toEqual([]);
    expect(map.packageIds).toEqual([]);
  });

  it("fails closed on unreviewed, disputed and uncited claims", () => {
    const incident = incidents[0];
    expect(incident).toBeDefined();
    expect(() => makeSourcedIncident({ ...incident, reviewStatus: "needs_review" }, sources)).toThrow("Unreviewed");
    expect(() => makeSourcedIncident({ ...incident, epistemicStatus: "disputed" }, sources)).toThrow("Hypothetical");
    expect(() => makeSourcedIncident({ ...incident, sourceIds: [] }, sources)).toThrow("Missing cited source");
    expect(() => makeSourcedIncident({ ...incident, sourceIds: ["source:does-not-exist"] }, sources)).toThrow("Unresolvable");
  });
});
