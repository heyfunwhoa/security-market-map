import { describe, expect, it } from "vitest";
import { planIngestion,ingestKey, independentEvidenceGroups, correctionInvalidationKeys, type IncomingRecord } from "./security-intelligence-ingestion";
const sample:IncomingRecord={
 sourceId:"source:cisa-shai-hulud-alert",externalId:"notice-1",
 sourceUrl:"https://content.govdelivery.com/accounts/USDHSCISA/bulletins/3f408db",
 publishedAt:"2025-09-23",retrievedAt:"2026-10-10T12:00:00Z",
 sha256:"a".repeat(64),statement:"CISA reported a supply-chain incident",subjects:["incident:cisa-shai-hulud-2025"]
};
const allowed=new Set([sample.sourceId]);
describe("pure ingestion planner",()=>{
 it("is idempotent across retries and detects revisions",()=>{
  const key=ingestKey(sample);
  expect(planIngestion(sample,new Map(),allowed).state).toBe("insert");
  expect(planIngestion(sample,new Map([[key,sample.sha256]]),allowed).state).toBe("unchanged");
  expect(planIngestion({...sample,sha256:"b".repeat(64)},new Map([[key,sample.sha256]]),allowed).state).toBe("revision");
 });
 it("quarantines unapproved, non-HTTPS, invalid hashes and timestamps",()=>{
  expect(planIngestion(sample,new Map(),new Set()).state).toBe("quarantine");
  expect(planIngestion({...sample,sourceUrl:"http://example.com"},new Map(),allowed).state).toBe("quarantine");
  expect(planIngestion({...sample,sha256:"bad"},new Map(),allowed).state).toBe("quarantine");
  expect(planIngestion({...sample,retrievedAt:"not-a-date"},new Map(),allowed).state).toBe("quarantine");
 });
 it("does not mistake syndicated coverage for independent reporting",()=>{
  expect(independentEvidenceGroups([
   {id:"a",sources:["article-a"],upstreamSourceIds:["original-alert"],statement:"reported",status:"reported"},
   {id:"b",sources:["article-b"],upstreamSourceIds:["original-alert"],statement:"reported",status:"reported"},
  ])).toBe(1);
 });
 it("deduplicates correction cache keys",()=>{
  expect(correctionInvalidationKeys("c1",["e2","e1","e1"])).toEqual(["claim:c1","entity:e1","entity:e2"]);
 });
});
