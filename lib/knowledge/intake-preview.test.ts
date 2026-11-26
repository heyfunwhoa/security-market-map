import { describe, expect, it } from "vitest";
import { previewIntake, neighbors } from "./intake-preview";
const sourceId = "src-sacr-caasm-20261019";
const revision = "2026-11-17";
const entries = [{kind:"category",id:"asset-intelligence",label:"Asset Intelligence"},{kind:"category",id:"security-asset-management",label:"Cyber asset management",aliases:["CAASM"]},{kind:"vendor",id:"axonius",label:"Axonius"}];
const proposal = {id:"p1",from:"category:asset-intelligence",to:"category:security-asset-management",relation:"analyst_evolution",sourceId,revision,locator:"pp. 9–11",statement:"SACR frames asset intelligence as extending CAASM toward decision-grade context."};
const input = {kind:"concept" as const,query:"Asset Intelligence",entries,sourceId,revision,proposals:[proposal]};
describe("offline intake preview",()=>{
 it("reuses category and source identity",()=>{const p=previewIntake(input);expect(p.matches[0].id).toBe("asset-intelligence");expect(p.changes[0].sourceId).toBe(sourceId);expect(p.published).toBe(false)});
 it("supports reverse exploration of pending proposals",()=>{const p=previewIntake(input);expect(neighbors(p,proposal.from)[0].ref).toBe(proposal.to);expect(neighbors(p,proposal.to)[0].ref).toBe(proposal.from)});
 it("deduplicates replay within a batch",()=>expect(previewIntake({...input,proposals:[proposal,proposal]}).changes).toHaveLength(1));
 it("flags explicit conflicts",()=>expect(previewIntake({...input,proposals:[{...proposal,conflict:true}]}).changes[0].disposition).toBe("conflict"));
 it("rejects missing references and wrong revisions",()=>{for(const p of [{...proposal,to:"vendor:unknown"},{...proposal,revision:"unknown"},{...proposal,locator:""}])expect(previewIntake({...input,proposals:[p]}).changes[0].disposition).toBe("unsupported")});
 it("resolves aliases",()=>expect(previewIntake({...input,query:"CAASM"}).matches[0].id).toBe("security-asset-management"));
});
