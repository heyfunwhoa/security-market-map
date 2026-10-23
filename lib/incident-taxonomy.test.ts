import { expect, it } from "vitest";
import { inspectOfflineTaxonomy } from "./incident-taxonomy";
import type { IncidentClassification } from "./incident-classifier";
function fixture(id="T1195.001"):IncidentClassification {return {incidentId:"synthetic:fixture",fixtureOnly:true,veris:{schemaVersion:null,actor:null,action:null,asset:null,attribute:null},claims:[{id:"fixture-claim",status:"reported"}],mappings:[{attackId:id,domain:"enterprise-attack",taxonomy:{name:"MITRE ATT&CK",version:null,stixId:null},claimIds:["fixture-claim"],rationale:"fictional altered software",status:"candidate"}],unknowns:["victim identity"],disagreements:[]};}
it("resolves real technique name and object version but never fabricates STIX ID",()=>{const r=inspectOfflineTaxonomy(fixture());expect(r.valid).toBe(true);expect(r.techniques[0].detail?.name).toBe("Compromise Software Dependencies and Development Tools");expect(r.techniques[0].stixId).toBeNull();expect(r.publishable).toBe(false);});
it("covers vendor software example",()=>expect(inspectOfflineTaxonomy(fixture("T1195.002")).techniques[0].detail?.techniqueVersion).toBe("1.1"));
it("rejects nonexistent IDs",()=>expect(inspectOfflineTaxonomy(fixture("T9999")).valid).toBe(false));
it("rejects invented STIX and collection versions",()=>{const x=fixture();x.mappings[0].taxonomy.version="20";expect(inspectOfflineTaxonomy(x).valid).toBe(false);});
it("rejects unsupported fake tactic by refusing unknown ID",()=>expect(inspectOfflineTaxonomy(fixture("TA0001")).valid).toBe(false));
it("rejects missing evidence",()=>{const x=fixture();x.mappings[0].claimIds=[];expect(inspectOfflineTaxonomy(x).valid).toBe(false);});
it("does not infer from disputed evidence",()=>{const x=fixture();x.claims[0].status="disputed";expect(inspectOfflineTaxonomy(x).valid).toBe(false);});
it("does not accept VERIS value without pinned schema",()=>{const x=fixture();x.veris.actor="External";expect(inspectOfflineTaxonomy(x).valid).toBe(false);});
it("rejects stale VERIS versions",()=>{const x=fixture();x.veris.schemaVersion="1.3.1";expect(inspectOfflineTaxonomy(x).valid).toBe(false);});
it("keeps fake reviewer approvals blocked",()=>{const x=fixture();x.mappings[0].status="reviewed_supported";expect(inspectOfflineTaxonomy(x).valid).toBe(false);});
