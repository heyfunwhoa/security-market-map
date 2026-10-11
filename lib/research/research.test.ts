import { describe, expect, it } from "vitest";
import { catalog } from "../catalog";
import { addDays } from "../format";
import type { RetrievalAdapter, RetrievedDocument } from "./adapters";
import { exaRetrievalAdapter, firecrawlRetrievalAdapter } from "./adapters";
import {
  owaspBaselineDocument,
  owaspChangedDocument,
  owaspMonitoredSource,
  owaspSourcePolicy,
  owaspWhitespaceDocument,
  restrictedAnalystPolicy,
  restrictedAnalystSource,
} from "./fixtures";
import { createLedger, researchProblems } from "./ledger";
import { normalizeContent, normalizeMonitoredUrl } from "./normalize";
import { checkMonitoredSource } from "./pipeline";
import { isCheckDue, retrievalAllowed } from "./policy";
import { applyReviewDecision } from "./review";
import {
  monitoredSourceSchema,
  proposedClaimSchema,
  reviewDecisionSchema,
  sourcePolicySchema,
} from "./schema";
import { createPhaseOneLedger, runOwaspPublicFixture } from "./vertical-slice";

const asOf = "2026-10-09";

function blockingAdapter(): { adapter: RetrievalAdapter; calls: () => number } {
  let calls = 0;
  return {
    calls: () => calls,
    adapter: {
      name: "fixture",
      configured: () => true,
      async retrieve() {
        calls += 1;
        throw new Error("adapter should not be called");
      },
    },
  };
}

describe("source policies", () => {
  it("permits a short excerpt from a public independent source", () => {
    expect(sourcePolicySchema.parse(owaspSourcePolicy).retrievalScope).toBe("excerpt");
    expect(retrievalAllowed(owaspSourcePolicy)).toEqual({ allowed: true, scope: "excerpt" });
  });

  it("rejects analyst full text without an authorization reference", () => {
    const parsed = sourcePolicySchema.safeParse({
      ...owaspSourcePolicy,
      id: "policy-analyst-full",
      classification: "industry_analyst",
      permissionStatus: "public_permitted",
      retrievalScope: "full_text",
      authorizationRef: null,
    });
    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      expect(parsed.error.issues.map((issue) => issue.message).join(" ")).toContain(
        "Analyst full text requires an authorization reference.",
      );
    }
  });

  it("rejects restricted and metadata-only policies that ask for page text", () => {
    const restricted = sourcePolicySchema.safeParse({
      ...restrictedAnalystPolicy,
      retrievalScope: "excerpt",
    });
    const metadata = sourcePolicySchema.safeParse({
      ...owaspSourcePolicy,
      permissionStatus: "metadata_only",
      retrievalScope: "excerpt",
    });
    expect(restricted.success).toBe(false);
    expect(metadata.success).toBe(false);
    if (!restricted.success) {
      expect(restricted.error.issues.map((issue) => issue.message).join(" ")).toContain(
        "Restricted sources cannot be retrieved.",
      );
    }
    if (!metadata.success) {
      expect(metadata.error.issues.map((issue) => issue.message).join(" ")).toContain(
        "Metadata-only sources cannot store page text.",
      );
    }
  });

  it("requires an authorization reference before authorized retrieval", () => {
    const missing = sourcePolicySchema.safeParse({
      ...owaspSourcePolicy,
      permissionStatus: "authorized",
      retrievalScope: "full_text",
      authorizationRef: null,
    });
    const present = sourcePolicySchema.safeParse({
      ...owaspSourcePolicy,
      classification: "industry_analyst",
      permissionStatus: "authorized",
      retrievalScope: "full_text",
      authorizationRef: "license-2026-owasp-not-this-one",
    });
    expect(missing.success).toBe(false);
    expect(present.success).toBe(true);
    if (!missing.success) {
      expect(missing.error.issues.map((issue) => issue.message).join(" ")).toContain(
        "Authorized retrieval requires an authorization reference.",
      );
    }
  });

  it("denies retrieval when a policy object skips validation", () => {
    const gate = retrievalAllowed({
      ...restrictedAnalystPolicy,
      retrievalScope: "full_text",
    });
    expect(gate.allowed).toBe(false);
  });
});

describe("research schema", () => {
  it("requires classification, canonical URL, frequency, permission, and last-check status", () => {
    const fields = [
      "classification",
      "canonicalUrl",
      "monitoringFrequency",
      "permissionStatus",
      "lastCheckStatus",
    ] as const;
    for (const field of fields) {
      const candidate = { ...owaspMonitoredSource };
      delete candidate[field];
      expect(monitoredSourceSchema.safeParse(candidate).success, field).toBe(false);
    }
    expect(monitoredSourceSchema.parse(owaspMonitoredSource).publisher).toBe("OWASP");
  });

  it("rejects a proposed claim that is already verified or high confidence", () => {
    const claim = {
      id: "prop-example",
      dedupeKey: "abc",
      changeId: "chg-example",
      snapshotId: "snap-example",
      monitoredSourceId: owaspMonitoredSource.id,
      statement: "A pending observation.",
      subjectType: "category",
      subjectId: "nhi",
      capabilityId: null,
      polarity: "asserts",
      sourceId: "src-owasp-nhi",
      priorClaimId: null,
      sourceUrl: owaspMonitoredSource.canonicalUrl,
      sourceType: "standard",
      publishedAt: null,
      observedAt: asOf,
      confidence: "low",
      verificationStatus: "needs_review",
      reviewStatus: "pending",
      attribution: "OWASP, pending human review.",
      origin: "offline_fixture",
      notes: null,
      autoPublished: false,
    };
    expect(proposedClaimSchema.parse(claim).verificationStatus).toBe("needs_review");
    expect(proposedClaimSchema.safeParse({ ...claim, verificationStatus: "verified" }).success).toBe(false);
    expect(proposedClaimSchema.safeParse({ ...claim, confidence: "high" }).success).toBe(false);
    expect(proposedClaimSchema.safeParse({ ...claim, autoPublished: true }).success).toBe(false);
  });

  it("rejects a review decision that publishes on its own", () => {
    const decision = {
      id: "decision-1",
      proposedClaimId: "prop-example",
      decision: "accept",
      reviewer: "ada",
      decidedAt: asOf,
      rationale: "Hold for a manual catalog edit.",
      publishesAutomatically: false,
      resultingClaimId: null,
    };
    expect(reviewDecisionSchema.parse(decision).resultingClaimId).toBeNull();
    expect(reviewDecisionSchema.safeParse({ ...decision, publishesAutomatically: true }).success).toBe(false);
    expect(reviewDecisionSchema.safeParse({ ...decision, resultingClaimId: "claim-new" }).success).toBe(false);
  });
});

describe("normalization", () => {
  it("drops tracking parameters and treats whitespace as the same content", () => {
    expect(
      normalizeMonitoredUrl(
        "HTTPS://OWASP.org/www-project-non-human-identities-top-10/2025/top-10-2025/?utm_source=newsletter&b=2&a=1#section",
      ),
    ).toBe(`${owaspMonitoredSource.canonicalUrl}?a=1&b=2`);
    expect(normalizeContent("OWASP   project \n")).toBe("OWASP project");
  });
});

describe("permissions and duplicates", () => {
  it("does not retrieve a restricted analyst source", async () => {
    const ledger = createLedger();
    ledger.sources.push({ ...restrictedAnalystSource });
    ledger.policies.push({ ...restrictedAnalystPolicy });
    const blocker = blockingAdapter();
    const result = await checkMonitoredSource({
      ledger,
      sourceId: restrictedAnalystSource.id,
      adapter: blocker.adapter,
      asOf,
      force: true,
    });
    expect(blocker.calls()).toBe(0);
    expect(result.run.outcome).toBe("denied");
    expect(result.run.denialReason).toMatch(/does not permit retrieval/);
    expect(ledger.snapshots).toHaveLength(0);
    expect(ledger.proposals).toHaveLength(0);
    expect(ledger.sources[0]?.lastCheckStatus).toBe("skipped_permissions");
    expect(researchProblems(ledger)).toEqual([]);
  });

  it("stores metadata without calling an adapter or opening a claim", async () => {
    const ledger = createPhaseOneLedger();
    ledger.policies[0] = sourcePolicySchema.parse({
      ...ledger.policies[0],
      permissionStatus: "metadata_only",
      retrievalScope: "metadata",
    });
    ledger.sources[0] = monitoredSourceSchema.parse({
      ...ledger.sources[0],
      permissionStatus: "metadata_only",
    });
    const blocker = blockingAdapter();
    const result = await checkMonitoredSource({
      ledger,
      sourceId: owaspMonitoredSource.id,
      adapter: blocker.adapter,
      asOf,
      force: true,
    });
    expect(blocker.calls()).toBe(0);
    expect(result.snapshot?.normalizedText).toBe("");
    expect(result.snapshot?.scope).toBe("metadata");
    expect(ledger.proposals).toHaveLength(0);
    expect(result.change?.queueStatus).toBe("queued");
  });

  it("skips a second identical observation, including whitespace-only edits", async () => {
    const first = await runOwaspPublicFixture({ asOf });
    const repeated = await runOwaspPublicFixture({
      ledger: first.ledger,
      document: owaspWhitespaceDocument,
      asOf,
    });
    expect(repeated.result.run.outcome).toBe("unchanged");
    expect(repeated.result.reusedSnapshot).toBe(true);
    expect(first.ledger.snapshots).toHaveLength(1);
    expect(first.ledger.proposals).toHaveLength(1);
    expect(first.ledger.runs).toHaveLength(2);
  });

  it("keeps the earlier snapshot when content changes and does not repeat the same proposal", async () => {
    const first = await runOwaspPublicFixture({ asOf });
    const sameStatement: RetrievedDocument = {
      ...owaspChangedDocument,
      statements: owaspBaselineDocument.statements,
    };
    const second = await runOwaspPublicFixture({
      ledger: first.ledger,
      document: sameStatement,
      asOf,
    });
    expect(second.result.run.outcome).toBe("recorded");
    expect(second.result.change?.kind).toBe("content");
    expect(first.ledger.snapshots).toHaveLength(2);
    expect(first.ledger.proposals).toHaveLength(1);
    expect(first.ledger.snapshots[0]?.normalizedText).toBe(owaspBaselineDocument.text);
    expect(second.result.change?.queueStatus).toBe("queued");
  });

  it("reuses an older snapshot on reversion and does not file the same change twice", async () => {
    const first = await runOwaspPublicFixture({ asOf });
    await runOwaspPublicFixture({ ledger: first.ledger, document: owaspChangedDocument, asOf });
    const reverted = await runOwaspPublicFixture({
      ledger: first.ledger,
      document: owaspBaselineDocument,
      asOf,
    });
    const duplicate = await runOwaspPublicFixture({
      ledger: first.ledger,
      document: owaspChangedDocument,
      asOf,
    });
    expect(reverted.result.change?.kind).toBe("reversion");
    expect(reverted.result.reusedSnapshot).toBe(true);
    expect(duplicate.result.run.outcome).toBe("duplicate");
    expect(first.ledger.snapshots).toHaveLength(2);
    expect(first.ledger.changes).toHaveLength(3);
    expect(first.ledger.proposals).toHaveLength(2);
    expect(researchProblems(first.ledger)).toEqual([]);
  });

  it("does not call the adapter again before the monitoring interval", async () => {
    const first = await runOwaspPublicFixture({ asOf });
    const blocker = blockingAdapter();
    const skipped = await checkMonitoredSource({
      ledger: first.ledger,
      sourceId: owaspMonitoredSource.id,
      adapter: blocker.adapter,
      asOf,
    });
    const dueOn = addDays(asOf, 90);
    expect(skipped.run.outcome).toBe("not_due");
    expect(blocker.calls()).toBe(0);
    expect(
      isCheckDue(
        { ...owaspMonitoredSource, lastCheckedAt: asOf, lastCheckStatus: "unchanged" },
        addDays(dueOn, -1),
      ),
    ).toBe(false);
    expect(
      isCheckDue(
        { ...owaspMonitoredSource, lastCheckedAt: asOf, lastCheckStatus: "unchanged" },
        dueOn,
      ),
    ).toBe(true);
  });
});

describe("review transitions", () => {
  it("moves a pending proposal through review without publishing it", async () => {
    const prior = catalog.claims.find((claim) => claim.id === "claim-owasp-nhi-top10");
    expect(prior?.verificationStatus).toBe("verified");
    const before = catalog.claims.map((claim) => ({
      id: claim.id,
      statement: claim.statement,
      verificationStatus: claim.verificationStatus,
    }));
    const { ledger, result } = await runOwaspPublicFixture({ asOf });
    const proposal = result.proposals[0];
    expect(proposal?.reviewStatus).toBe("pending");
    expect(proposal?.verificationStatus).toBe("needs_review");
    expect(proposal?.priorClaimId).toBe("claim-owasp-nhi-top10");
    expect(proposal?.confidence).toBe("low");

    expect(() =>
      applyReviewDecision(ledger, {
        proposedClaimId: proposal!.id,
        decision: "resubmit",
        reviewer: "ada",
        decidedAt: asOf,
        rationale: "Nothing has been sent back yet.",
      }),
    ).toThrow(/pending cannot resubmit/);

    const requested = applyReviewDecision(ledger, {
      proposedClaimId: proposal!.id,
      decision: "request_changes",
      reviewer: "ada",
      decidedAt: asOf,
      rationale: "Name the page section before this is considered for the seed.",
    });
    expect(requested.proposal.reviewStatus).toBe("changes_requested");
    const pendingAgain = applyReviewDecision(ledger, {
      proposedClaimId: proposal!.id,
      decision: "resubmit",
      reviewer: "ada",
      decidedAt: asOf,
      rationale: "The statement still matches the retained excerpt.",
    });
    expect(pendingAgain.proposal.reviewStatus).toBe("pending");
    const accepted = applyReviewDecision(ledger, {
      proposedClaimId: proposal!.id,
      decision: "accept",
      reviewer: "ada",
      decidedAt: asOf,
      rationale: "Accept the proposal for a later manual edit. Do not publish it from this run.",
    });
    expect(accepted.published).toBe(false);
    expect(accepted.proposal.reviewStatus).toBe("accepted");
    expect(accepted.proposal.verificationStatus).toBe("needs_review");
    expect(accepted.decision.publishesAutomatically).toBe(false);
    expect(accepted.decision.resultingClaimId).toBeNull();
    expect(ledger.decisions).toHaveLength(3);
    expect(() =>
      applyReviewDecision(ledger, {
        proposedClaimId: proposal!.id,
        decision: "reject",
        reviewer: "ada",
        decidedAt: asOf,
        rationale: "Too late.",
      }),
    ).toThrow(/accepted cannot reject/);
    expect(catalog.claims.map((claim) => ({
      id: claim.id,
      statement: claim.statement,
      verificationStatus: claim.verificationStatus,
    }))).toEqual(before);
    expect(owaspMonitoredSource.lastCheckStatus).toBe("never_checked");
  });

  it("allows defer and then reject", async () => {
    const { ledger, result } = await runOwaspPublicFixture({ asOf });
    const proposal = result.proposals[0]!;
    applyReviewDecision(ledger, {
      proposedClaimId: proposal.id,
      decision: "defer",
      reviewer: "ada",
      decidedAt: asOf,
      rationale: "Wait for the next public revision.",
    });
    const rejected = applyReviewDecision(ledger, {
      proposedClaimId: proposal.id,
      decision: "reject",
      reviewer: "ada",
      decidedAt: asOf,
      rationale: "The excerpt does not change the cited risk list.",
    });
    expect(rejected.proposal.reviewStatus).toBe("rejected");
    expect(ledger.decisions).toHaveLength(2);
    expect(ledger.proposals).toHaveLength(1);
  });
});

describe("offline vertical slice", () => {
  it("queues one pending claim for the public OWASP page from a fixture", async () => {
    const duplicated: RetrievedDocument = {
      ...owaspBaselineDocument,
      statements: [...owaspBaselineDocument.statements, ...owaspBaselineDocument.statements],
    };
    const { ledger, result } = await runOwaspPublicFixture({ document: duplicated, asOf });
    expect(result.run.adapter).toBe("fixture");
    expect(result.run.mode).toBe("offline_fixture");
    expect(result.run.outcome).toBe("recorded");
    expect(ledger.snapshots).toHaveLength(1);
    expect(ledger.changes).toHaveLength(1);
    expect(ledger.proposals).toHaveLength(1);
    expect(ledger.proposals[0]?.sourceUrl).toBe(owaspMonitoredSource.canonicalUrl);
    expect(ledger.proposals[0]?.sourceId).toBe("src-owasp-nhi");
    expect(ledger.decisions).toHaveLength(0);
    expect(researchProblems(ledger)).toEqual([]);
  });

  it("uses a mocked Firecrawl or Exa response without a key and refuses a live call", async () => {
    const previousFirecrawl = process.env.FIRECRAWL_API_KEY;
    const previousExa = process.env.EXA_API_KEY;
    delete process.env.FIRECRAWL_API_KEY;
    delete process.env.EXA_API_KEY;
    try {
      const mocked = firecrawlRetrievalAdapter(owaspBaselineDocument);
      expect(mocked.configured()).toBe(false);
      const ledger = createPhaseOneLedger();
      const recorded = await checkMonitoredSource({
        ledger,
        sourceId: owaspMonitoredSource.id,
        adapter: mocked,
        asOf,
        force: true,
      });
      expect(recorded.run.mode).toBe("mocked");
      expect(recorded.proposals[0]?.origin).toBe("mocked_adapter");
      expect(recorded.proposals[0]?.verificationStatus).toBe("needs_review");

      const missing = await checkMonitoredSource({
        ledger: createPhaseOneLedger(),
        sourceId: owaspMonitoredSource.id,
        adapter: exaRetrievalAdapter(),
        asOf,
        force: true,
      });
      expect(missing.run.outcome).toBe("error");
      expect(missing.run.denialReason).toBe("not_configured");
      expect(missing.snapshot).toBeNull();

      process.env.FIRECRAWL_API_KEY = "present";
      const live = await checkMonitoredSource({
        ledger: createPhaseOneLedger(),
        sourceId: owaspMonitoredSource.id,
        adapter: firecrawlRetrievalAdapter(),
        asOf,
        force: true,
      });
      expect(firecrawlRetrievalAdapter().configured()).toBe(true);
      expect(live.run.outcome).toBe("error");
      expect(live.run.denialReason).toBe("live_not_enabled");
      expect(live.snapshot).toBeNull();
    } finally {
      if (previousFirecrawl === undefined) delete process.env.FIRECRAWL_API_KEY;
      else process.env.FIRECRAWL_API_KEY = previousFirecrawl;
      if (previousExa === undefined) delete process.env.EXA_API_KEY;
      else process.env.EXA_API_KEY = previousExa;
    }
  });

  it("rejects a document whose canonical URL is a different page", async () => {
    const ledger = createPhaseOneLedger();
    const result = await checkMonitoredSource({
      ledger,
      sourceId: owaspMonitoredSource.id,
      asOf,
      force: true,
      adapter: {
        name: "fixture",
        configured: () => true,
        async retrieve() {
          return {
            ok: true,
            mode: "offline_fixture",
            document: { ...owaspBaselineDocument, url: "https://example.com/other" },
          };
        },
      },
    });
    expect(result.run.outcome).toBe("error");
    expect(result.run.denialReason).toBe("url_mismatch");
    expect(ledger.snapshots).toHaveLength(0);
    expect(ledger.proposals).toHaveLength(0);
  });
});
