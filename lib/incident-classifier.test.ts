import { describe, expect, it } from "vitest";
import { evaluateClassification, type IncidentClassification } from "./incident-classifier";
const base = (): IncidentClassification => ({
  incidentId: "synthetic:saas-example", fixtureOnly: true,
  veris: { schemaVersion: null, actor: null, action: null, asset: null, attribute: null },
  claims: [{ id: "source-claim-1", status: "reported" }],
  mappings: [{ attackId: "T1195.002", domain: "enterprise-attack", taxonomy: { name: "MITRE ATT&CK", version: null, stixId: null }, claimIds: ["source-claim-1"], rationale: "Synthetic vendor software alteration", status: "candidate" }],
  unknowns: ["Initial compromise mechanism"], disagreements: []
});
describe("offline incident classifier guardrails", () => {
  it("keeps a candidate unpublished even with evidence", () => { const result = evaluateClassification(base()); expect(result.valid).toBe(true); expect(result.publishable).toBe(false); expect(result.candidateIds).toEqual(["T1195.002"]); });
  it("rejects missing evidence", () => { const x = base(); x.mappings[0].claimIds = ["missing"]; expect(evaluateClassification(x).failures).toContain("Missing evidence: T1195.002"); });
  it("rejects invalid technique identifiers", () => { const x=base();x.mappings[0].attackId="TA0001";expect(evaluateClassification(x).valid).toBe(false); });
  it("requires reviewer and pinned taxonomy for reviewed classification", () => {const x=base();x.mappings[0].status="reviewed_supported";expect(evaluateClassification(x).failures).toContain("Missing human review: T1195.002");expect(evaluateClassification(x).failures).toContain("Unpinned taxonomy: T1195.002");});
  it("blocks disputed mappings", () => {const x=base();x.mappings[0].status="reviewed_supported";x.mappings[0].reviewer="fixture reviewer";x.mappings[0].reviewedAt="2026-10-17T00:00:00Z";x.mappings[0].taxonomy={name:"MITRE ATT&CK",version:"synthetic-stix",stixId:"attack-pattern--11111111-1111-4111-8111-111111111111"};x.disagreements=["Conflicting fictional sources"];expect(evaluateClassification(x).failures).toContain("Unresolved disagreement: T1195.002");});
  it("blocks withdrawn and corrected claim references", () => {const x=base();x.mappings[0].status="reviewed_supported";x.mappings[0].reviewer="fixture reviewer";x.mappings[0].reviewedAt="2026-10-17T00:00:00Z";x.mappings[0].taxonomy={name:"MITRE ATT&CK",version:"synthetic-stix",stixId:"attack-pattern--11111111-1111-4111-8111-111111111111"};x.claims[0].withdrawn=true;x.claims[0].supersededBy="source-claim-2";expect(evaluateClassification(x).failures).toContain("Unsupported, disputed or superseded evidence: T1195.002");});
  it("does not offer a publication path even with a fully reviewed synthetic example", () => {const x=base();x.mappings[0].status="reviewed_supported";x.mappings[0].reviewer="fixture reviewer";x.mappings[0].reviewedAt="2026-10-17T00:00:00Z";x.mappings[0].taxonomy={name:"MITRE ATT&CK",version:"synthetic-stix",stixId:"attack-pattern--11111111-1111-4111-8111-111111111111"};const out=evaluateClassification(x);expect(out.valid).toBe(true);expect(out.publishable).toBe(false);});
  it("accepts a second synthetic software-dependency scenario with explicit unknowns", () => {const x=base();x.incidentId="synthetic:npm-example";x.mappings[0].attackId="T1195.001";x.unknowns=["Downstream execution", "Successful theft"];expect(evaluateClassification(x).valid).toBe(true);expect(evaluateClassification(x).publishable).toBe(false);});
});
