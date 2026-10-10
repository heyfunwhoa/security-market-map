/**
 * Deterministic, side-effect-free ingestion planner. A real worker must persist
 * plans transactionally and only publish after separate editorial approval.
 */
export type IncomingRecord = {
 sourceId: string; externalId: string; sourceUrl: string;
 publishedAt: string | null; retrievedAt: string; sha256: string;
 statement: string; subjects: string[];
};
export type PlanState = "insert" | "unchanged" | "revision" | "quarantine";
export type IngestionPlan = {
 key: string; state: PlanState; reason: string;
 sourceId: string; externalId: string; sha256: string;
};
export function ingestKey(record: Pick<IncomingRecord, "sourceId" | "externalId">) {
 return JSON.stringify([record.sourceId.trim(),record.externalId.trim()]);
}
export function planIngestion(
 incoming: IncomingRecord,
 lastSeen: ReadonlyMap<string,string>,
 allowedSourceIds: ReadonlySet<string>,
): IngestionPlan {
 const key=ingestKey(incoming);
 const base={key,sourceId:incoming.sourceId,externalId:incoming.externalId,sha256:incoming.sha256};
 if(!allowedSourceIds.has(incoming.sourceId)) return {...base,state:"quarantine",reason:"unknown source"};
 try { if(new URL(incoming.sourceUrl).protocol!=="https:") throw new Error("not HTTPS"); }
 catch {return {...base,state:"quarantine",reason:"invalid or insecure URL"};}
 if(!incoming.externalId.trim() || !incoming.statement.trim() || !/^[a-f0-9]{64}$/.test(incoming.sha256)) {
   return {...base,state:"quarantine",reason:"invalid identity, content or checksum"};
 }
 if(!Number.isFinite(Date.parse(incoming.retrievedAt))) return {...base,state:"quarantine",reason:"invalid retrieval time"};
 const previous=lastSeen.get(key);
 if(previous===incoming.sha256) return {...base,state:"unchanged",reason:"duplicate source revision"};
 return previous
   ? {...base,state:"revision",reason:"new source content; create a draft for editorial review"}
   : {...base,state:"insert",reason:"new source record; create a draft for editorial review"};
}
export type EvidenceStatus = "reported"|"observed"|"hypothesis"|"disputed"|"unknown";
export type EvidenceAssertion = { id:string; sources:string[]; status:EvidenceStatus; statement:string; upstreamSourceIds:string[] };
/** Sharing one underlying press release must not be counted as independent corroboration. */
export function independentEvidenceGroups(assertions:readonly EvidenceAssertion[]):number {
 const upstream=new Set<string>();
 for(const assertion of assertions) {
   if(assertion.status==="hypothesis" || assertion.status==="unknown") continue;
   for(const id of (assertion.upstreamSourceIds.length?assertion.upstreamSourceIds:assertion.sources)) upstream.add(id);
 }
 return upstream.size;
}
/** A correction invalidates any cached projection rooted in the changed claim. */
export function correctionInvalidationKeys(claimId:string, relatedEntityIds:readonly string[]) {
 return [...new Set([`claim:${claimId}`,...relatedEntityIds.map(id=>`entity:${id}`)])].sort();
}
