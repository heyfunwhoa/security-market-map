import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import fixture from "./fixtures/ase-synthetic-product.v1.json";
import { previewResearchEvidenceBatch as preview } from "./research-evidence";

const clone = (): Omit<typeof fixture, "supersedes"> & { supersedes: string | null } => structuredClone(fixture);
function corrected() {
  const p = clone();
  p.id = "evidence:synthetic-nhi-correction";
  p.idempotencyKey = "idem-synthetic-nhi-correction";
  p.supersedes = fixture.id;
  p.statement = "Corrected synthetic statement, not a real product claim.";
  p.sources[0].sourceVersion = "fixture-v2";
  p.sources[0].contentHash = "b".repeat(64);
  return p;
}
afterEach(() => vi.unstubAllGlobals());

describe("pinned ASE export to offline SMM preview", () => {
  it("pins the complete canonical schema byte-for-byte by Git blob", () => {
    const bytes = readFileSync(new URL("./contracts/research-evidence-v1.schema.json", import.meta.url));
    const blob = createHash("sha1").update(`blob ${bytes.length}\0`).update(bytes).digest("hex");
    expect(blob).toBe("f413f0a5c0606e1470727deaace6699fa171d938");
  });

  it("preserves the actual synthetic export's provenance, dates, IDs and reported status", () => {
    const fetch = vi.fn(() => { throw new Error("No network allowed"); });
    vi.stubGlobal("fetch", fetch);
    const input = clone();
    const before = structuredClone(input);
    const result = preview([input]);
    expect(result.receipts).toEqual([{ index: 0, status: "preview", evidenceId: fixture.id }]);
    expect(result.views).toHaveLength(1);
    expect(result.views[0]).toMatchObject({
      evidenceId: fixture.id, subject: fixture.subject, statement: fixture.statement,
      sources: fixture.sources, kind: "vendor_claim", epistemicStatus: "reported",
      producedAt: fixture.producedAt, reviewedAt: fixture.reviewedAt,
      correlationId: fixture.correlationId, publicationAllowed: false,
      preventedByVendor: null, detectorCoverageInferred: false,
    });
    expect(result.views[0].sources[0].publishedAt).toBeNull();
    expect(result.views[0].unknowns).toContain("unresolved:category:machine-identity-unknown");
    expect(input).toEqual(before);
    result.views[0].sources[0].publisher = "mutated output";
    expect(input).toEqual(before);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("preserves an omitted publication date without inventing one", () => {
    const p: Record<string, unknown> = clone();
    const source = (p.sources as Record<string, unknown>[])[0];
    delete source.publishedAt;
    expect(preview([p]).views[0].sources[0]).not.toHaveProperty("publishedAt");
  });

  it.each(["vendor", "product", "category", "capability"])("accepts supported v1 subject %s without inferring mappings", type => {
    const p = { ...clone(), kind: "sourced_fact", epistemicStatus: "observed",
      subject: { type, id: "synthetic-unresolved-subject" } };
    const view = preview([p]).views[0];
    expect(view.subject).toEqual(p.subject);
    expect(view.epistemicStatus).toBe("observed");
    expect(view.publicationAllowed).toBe(false);
  });

  it("keeps all interpretations outside the factual statement, including supported notes", () => {
    const p = clone();
    const interpretations = ["unreviewed", "rejected", "superseded", "supported"].map(status => ({
      id: `interpretation:synthetic-${status}`, kind: "ai_hypothesis", text: "Do not promote this text", status,
    }));
    const view = preview([{ ...p, interpretations }]).views[0];
    expect(view.statement).toBe(fixture.statement);
    expect(view).not.toHaveProperty("interpretations");
    expect(JSON.stringify(view)).not.toContain("Do not promote this text");
    expect(view.unknowns.filter(s => s.includes(":excluded"))).toHaveLength(3);
  });

  const malformed: [string, (p: ReturnType<typeof clone>) => unknown][] = [
    ["unknown schema version", p => ({ ...p, schemaVersion: "2" })],
    ["unreviewed claim", p => ({ ...p, reviewStatus: "pending" })],
    ["rejected claim", p => ({ ...p, reviewStatus: "rejected" })],
    ["hypothesis fact", p => ({ ...p, epistemicStatus: "hypothesis" })],
    ["private classification", p => ({ ...p, classification: "private" })],
    ["unsupported incident", p => ({ ...p, subject: { ...p.subject, type: "incident" } })],
    ["missing evidence ID", p => { const { id: _, ...rest } = p; void _; return rest; }],
    ["invalid evidence ID", p => ({ ...p, id: "invented-id" })],
    ["extra top-level field", p => ({ ...p, secret: "synthetic-extra-field" })],
    ["extra subject field", p => ({ ...p, subject: { ...p.subject, accountId: "synthetic" } })],
    ["extra source field", p => ({ ...p, sources: [{ ...p.sources[0], rawMarkdown: "not allowed" }] })],
    ["extra mapping field", p => ({ ...p, marketMapRefs: { ...p.marketMapRefs, buyingIntent: true } })],
    ["extra interpretation field", p => ({ ...p, interpretations: [{ id: "interpretation:synthetic", kind: "analyst_note", text: "x", status: "unreviewed", approved: true }] })],
    ["missing sources", p => ({ ...p, sources: [] })],
    ["missing nested source ID", p => { const { sourceId: _, ...s } = p.sources[0]; void _; return { ...p, sources: [s] }; }],
    ["missing version", p => ({ ...p, sources: [{ ...p.sources[0], sourceVersion: "" }] })],
    ["invalid nested hash", p => ({ ...p, sources: [{ ...p.sources[0], contentHash: "bad-hash" }] })],
    ["insecure URL", p => ({ ...p, sources: [{ ...p.sources[0], canonicalUrl: "http://example.com" }] })],
    ["overlong excerpt", p => ({ ...p, sources: [{ ...p.sources[0], excerpt: "x".repeat(421) }] })],
    ["overlong statement", p => ({ ...p, statement: "x".repeat(2001) })],
    ["wrong mapping array type", p => ({ ...p, marketMapRefs: { productIds: [1] } })],
    ["empty publication date", p => ({ ...p, sources: [{ ...p.sources[0], publishedAt: "" }] })],
    ["invalid correlation ID", p => ({ ...p, correlationId: "short" })],
    ["invalid supersedes ID", p => ({ ...p, supersedes: "not-an-evidence-id" })],
  ];
  it.each(malformed)("rejects full-schema violation: %s", (_label, mutate) => {
    expect(preview([mutate(clone())])).toMatchObject({ views: [], receipts: [{ status: "rejected", code: "invalid_schema" }] });
  });

  it.each([null, undefined, [], 42, "not a package"])("rejects malformed root %s", input => {
    expect(preview([input]).receipts[0]).toMatchObject({ status: "rejected", code: "invalid_schema" });
  });

  it.each(["2026-02-30", "2026-10-11junk", "2026-10-11T25:00:00Z"])("rejects semantically invalid dates %s", date => {
    expect(preview([{ ...clone(), producedAt: date }]).receipts[0]).toMatchObject({ status: "rejected", code: "invalid_dates" });
  });
  it("requires a review timestamp even though v1 makes it optional", () => {
    const { reviewedAt: _, ...p } = clone(); void _;
    expect(preview([p]).receipts[0]).toMatchObject({ status: "rejected", code: "missing_review_time" });
  });
  it("rejects review before retrieval or after production", () => {
    for (const reviewedAt of ["2026-10-01", "2026-10-12"]) {
      expect(preview([{ ...clone(), reviewedAt }]).receipts[0]).toMatchObject({ status: "rejected", code: "invalid_dates" });
    }
  });
  it.each(["https://", "https://user:pass@example.com", "https://example.com/#fragment"])("rejects noncanonical/credential URL %s", url => {
    const p = clone(); p.sources[0].canonicalUrl = url;
    expect(preview([p]).receipts[0]).toMatchObject({ status: "rejected", code: "invalid_source_url" });
  });
  it("does not upgrade a vendor claim to observed", () => {
    expect(preview([{ ...clone(), epistemicStatus: "observed" }]).receipts[0]).toMatchObject({ status: "rejected", code: "vendor_claim_not_reported" });
  });
});

describe("offline replay, collisions and corrections", () => {
  it("replays the same package in any object property order as one view", () => {
    const reordered = Object.fromEntries(Object.entries(clone()).reverse());
    const result = preview([clone(), reordered, clone()]);
    expect(result.views).toHaveLength(1);
    expect(result.receipts.map(r => r.status)).toEqual(["preview", "duplicate", "duplicate"]);
    expect(preview([clone(), reordered, clone()])).toEqual(result);
  });
  it("quarantines same-ID changed content rather than silently replacing a view", () => {
    const result = preview([clone(), { ...clone(), statement: "Conflicting statement" }, clone()]);
    expect(result.views).toEqual([]);
    expect(result.receipts.slice(1)).toMatchObject([
      { status: "rejected", code: "identity_conflict" }, { status: "rejected", code: "invalidated" },
    ]);
  });
  it("quarantines both packages on idempotency-key reuse with a different ID", () => {
    const result = preview([clone(), { ...clone(), id: "evidence:different-synthetic" }]);
    expect(result.views).toEqual([]);
    expect(result.receipts[1]).toMatchObject({ status: "rejected", code: "identity_conflict" });
  });
  it("replaces a superseded preview, blocks old replay and never reactivates old after invalidation", () => {
    const next = corrected();
    const result = preview([clone(), next, clone(), next]);
    expect(result.views.map(v => v.evidenceId)).toEqual([next.id]);
    expect(result.receipts[2]).toMatchObject({ status: "rejected", code: "superseded" });
    expect(result.receipts[3].status).toBe("duplicate");
    const withdrawn = [...[clone(), next], { ...next, invalidatedBySourceCorrection: true }, clone(), next];
    expect(preview(withdrawn).views).toEqual([]);
    // Replaying the full history after a simulated restart retains the denial.
    expect(preview(JSON.parse(JSON.stringify(withdrawn)))).toEqual(preview(withdrawn));
  });
  it("does not revive an invalidated ID even if the tombstone precedes its package", () => {
    const result = preview([{ ...clone(), invalidatedBySourceCorrection: true }, clone()]);
    expect(result.views).toEqual([]);
    expect(result.receipts.every(r => r.status === "rejected")).toBe(true);
  });
  it.each(["missing", "self", "different-subject", "older"])("rejects correction %s without deleting the prior view", which => {
    const next = corrected();
    if (which === "missing") next.supersedes = "evidence:not-in-history";
    if (which === "self") next.supersedes = next.id;
    if (which === "different-subject") next.subject.id = "different-product";
    if (which === "older") next.producedAt = "2026-10-11T13:00:00.000Z";
    const result = preview([clone(), next]);
    expect(result.views.map(v => v.evidenceId)).toEqual([fixture.id]);
    expect(result.receipts[1]).toMatchObject({ status: "rejected", code: "invalid_correction" });
  });
  it("a malformed correction cannot partly supersede an accepted preview", () => {
    const result = preview([clone(), { ...corrected(), classification: "private" }]);
    expect(result.views.map(v => v.evidenceId)).toEqual([fixture.id]);
    expect(result.receipts[1]).toMatchObject({ status: "rejected", code: "invalid_schema" });
  });
  it("a correction cannot fork a superseded predecessor", () => {
    const next = corrected();
    const fork = { ...next, id: "evidence:synthetic-fork", idempotencyKey: "idem-synthetic-fork" };
    expect(preview([clone(), next, fork]).views.map(v => v.evidenceId)).toEqual([next.id]);
  });
});
