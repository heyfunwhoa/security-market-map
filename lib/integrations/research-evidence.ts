import { z } from "zod";
import contract from "./contracts/research-evidence-v1.schema.json";

// Derived from the pinned canonical JSON Schema, not a reconstructed wire schema.
// The converter is semi-experimental in Zod; pin/negative tests guard this use.
const wireSchema = z.fromJSONSchema(contract as Parameters<typeof z.fromJSONSchema>[0]);

type SubjectType = "vendor" | "product" | "category" | "capability";
type Source = {
  sourceId: string; canonicalUrl: string; publisher: string;
  publishedAt?: string | null; retrievedAt: string; contentHash: string;
  sourceVersion: string; excerpt?: string;
};
type Evidence = {
  schemaVersion: "1"; id: string; kind: "sourced_fact" | "vendor_claim";
  reviewStatus: "approved"; epistemicStatus: "observed" | "reported";
  classification: "public" | "public-reviewed";
  subject: { type: SubjectType; id: string; displayName?: string };
  statement: string; limitations?: string[]; sources: Source[];
  interpretations: { id: string; kind: "ai_hypothesis" | "analyst_note";
    text: string; status: "unreviewed" | "supported" | "rejected" | "superseded" }[];
  marketMapRefs: { vendorIds?: string[]; productIds?: string[];
    categoryIds?: string[]; capabilityIds?: string[]; unresolvedRefs?: string[] };
  producedAt: string; reviewedAt?: string; correlationId: string;
  idempotencyKey?: string; supersedes?: string | null;
  invalidatedBySourceCorrection?: boolean;
};

export type ResearchEvidencePreview = {
  evidenceId: string; kind: Evidence["kind"]; epistemicStatus: Evidence["epistemicStatus"];
  classification: Evidence["classification"]; subject: Evidence["subject"];
  statement: string; sources: Source[]; producedAt: string; reviewedAt: string;
  correlationId: string; marketMapRefs: Evidence["marketMapRefs"];
  unknowns: string[]; limitations: string[];
  publicationAllowed: false; preventedByVendor: null; detectorCoverageInferred: false;
};
type Denial = "invalid_schema" | "invalid_dates" | "missing_review_time" |
  "invalid_source_url" | "vendor_claim_not_reported" | "invalidated" |
  "superseded" | "identity_conflict" | "invalid_correction";
export type PreviewReceipt = { index: number } & (
  { status: "preview" | "duplicate"; evidenceId: string } |
  { status: "rejected"; code: Denial }
);

// Consumer policy is stricter than v1's date-prefix patterns. No clock is invented.
function validDate(value: string): boolean {
  const match = /^(\d{4}-\d{2}-\d{2})(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z)?$/.exec(value);
  const time = Date.parse(value);
  return !!match && Number.isFinite(time) && new Date(time).toISOString().slice(0, 10) === match[1];
}

function policyDenial(p: Evidence): Denial | null {
  if (!p.reviewedAt) return "missing_review_time";
  const dates = [p.producedAt, p.reviewedAt, ...p.sources.flatMap(s =>
    s.publishedAt == null ? [s.retrievedAt] : [s.retrievedAt, s.publishedAt])];
  if (dates.some(date => !validDate(date)) || Date.parse(p.reviewedAt) > Date.parse(p.producedAt) ||
      p.sources.some(s => Date.parse(s.retrievedAt) > Date.parse(p.reviewedAt!))) return "invalid_dates";
  if (p.kind === "vendor_claim" && p.epistemicStatus !== "reported") return "vendor_claim_not_reported";
  for (const s of p.sources) {
    try {
      const url = new URL(s.canonicalUrl);
      if (url.protocol !== "https:" || !url.hostname || url.username || url.password || url.hash)
        return "invalid_source_url";
    } catch { return "invalid_source_url"; }
  }
  return null;
}

// Only validated JSON reaches this function. Sorted keys make property-order replay stable.
function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value !== null && typeof value === "object") return `{${Object.entries(value)
    .sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => `${JSON.stringify(k)}:${canonical(v)}`).join(",")}}`;
  return JSON.stringify(value);
}

function toPreview(p: Evidence): ResearchEvidencePreview {
  return {
    evidenceId: p.id, kind: p.kind, epistemicStatus: p.epistemicStatus,
    classification: p.classification, subject: p.subject, statement: p.statement,
    sources: p.sources, producedAt: p.producedAt, reviewedAt: p.reviewedAt!,
    correlationId: p.correlationId, marketMapRefs: p.marketMapRefs,
    unknowns: [
      ...(p.marketMapRefs.unresolvedRefs ?? []).map(id => `unresolved:${id}`),
      ...p.interpretations.filter(i => i.status !== "supported")
        .map(i => `interpretation:${i.id}:${i.status}:excluded`),
    ],
    limitations: [...(p.limitations ?? []),
      "Offline preview only; source rights, reviewer authority and local catalog mappings are not verified."],
    publicationAllowed: false, preventedByVendor: null, detectorCoverageInferred: false,
  };
}

/**
 * Pure, offline rehearsal over an ordered batch of synthetic export packages.
 * No fetch, env, filesystem, database, catalog import, durable store or publication.
 * Returns detached previews; interpretation text is never promoted into facts.
 * Caller must replay the complete history, including invalidations, each time.
 * This is not an authenticated correction channel or a production review service.
 */
export function previewResearchEvidenceBatch(packages: readonly unknown[]): {
  views: ResearchEvidencePreview[]; receipts: PreviewReceipt[];
} {
  const seen = new Map<string, { fingerprint: string; evidence: Evidence }>();
  const keys = new Map<string, string>();
  const blocked = new Set<string>();
  const superseded = new Set<string>();
  const active = new Map<string, ResearchEvidencePreview>();
  const receipts: PreviewReceipt[] = [];
  const block = (id: string) => { blocked.add(id); active.delete(id); };
  for (const [index, raw] of packages.entries()) {
    const reject = (code: Denial) => receipts.push({ index, status: "rejected", code });
    const parsed = wireSchema.safeParse(raw);
    if (!parsed.success) { reject("invalid_schema"); continue; }
    // Shape checked by the exact canonical schema above; policy adds local gates.
    const p = parsed.data as Evidence;
    const denied = policyDenial(p);
    if (denied) { reject(denied); continue; }
    if (p.invalidatedBySourceCorrection) {
      block(p.id); reject("invalidated"); continue;
    }
    if (blocked.has(p.id)) { reject("invalidated"); continue; }
    if (superseded.has(p.id)) { reject("superseded"); continue; }
    const fingerprint = canonical(p);
    const prior = seen.get(p.id);
    const keyOwner = p.idempotencyKey ? keys.get(p.idempotencyKey) : undefined;
    if ((prior && prior.fingerprint !== fingerprint) || (keyOwner && keyOwner !== p.id)) {
      block(p.id);
      if (keyOwner) block(keyOwner);
      reject("identity_conflict"); continue;
    }
    if (prior) { receipts.push({ index, status: "duplicate", evidenceId: p.id }); continue; }
    if (p.supersedes) {
      const previous = seen.get(p.supersedes)?.evidence;
      if (p.supersedes === p.id || !previous || !active.has(previous.id) ||
          previous.subject.type !== p.subject.type || previous.subject.id !== p.subject.id ||
          Date.parse(p.producedAt) < Date.parse(previous.producedAt) ||
          Date.parse(p.reviewedAt!) < Date.parse(previous.reviewedAt!)) {
        reject("invalid_correction"); continue;
      }
      superseded.add(previous.id); active.delete(previous.id);
    }
    seen.set(p.id, { fingerprint, evidence: p });
    if (p.idempotencyKey) keys.set(p.idempotencyKey, p.id);
    active.set(p.id, toPreview(p));
    receipts.push({ index, status: "preview", evidenceId: p.id });
  }
  return structuredClone({ views: [...active.values()], receipts });
}
