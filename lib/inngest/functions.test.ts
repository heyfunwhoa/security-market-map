import { NonRetriableError } from "inngest";
import { beforeEach, describe, expect, it } from "vitest";
import { catalog } from "../catalog";
import { researchFindingSchema } from "../research/schema";
import { resetResearchLedger } from "../research/runtime-store";
import {
  MONITOR_AS_OF,
  RESEARCH_BATCH_SIZE,
  RESEARCH_CONCURRENCY,
  RESEARCH_IDEMPOTENCY,
  RESEARCH_RETRY_LIMIT,
  createHashicorpLedger,
  executeVendorResearch,
  openMaterialAlerts,
  planScheduledBatch,
  previewHashicorpMonitor,
  vaultChangedDocument,
} from "../research/vendor-monitor";
import {
  handleResearchVendor,
  handleScheduleVendorResearch,
  handleVendorChange,
  researchVendor,
  reviewVendorChange,
  scheduleVendorResearch,
} from "./functions";

function createStep() {
  const sent: unknown[] = [];
  const ran: string[] = [];
  return {
    sent,
    ran,
    step: {
      async run(id: string, fn: () => unknown) {
        ran.push(id);
        return await fn();
      },
      async sendEvent(id: string, payload: unknown) {
        ran.push(id);
        sent.push(payload);
        return { ids: [id] };
      },
    },
  };
}

describe("vendor research workflow", () => {
  beforeEach(() => {
    resetResearchLedger();
  });

  it("stores a pending vendor claim without publishing the catalog", async () => {
    const before = catalog.claims.map((claim) => ({
      id: claim.id,
      statement: claim.statement,
      verificationStatus: claim.verificationStatus,
    }));
    const positioning = catalog.vendors.find((vendor) => vendor.id === "hashicorp")?.positioning;
    const ledger = createHashicorpLedger();
    const summary = await executeVendorResearch({
      ledger,
      vendorId: "hashicorp",
      asOf: MONITOR_AS_OF,
    });
    expect(summary.workflowStatus).toBe("completed");
    expect(summary.evidenceClasses).toEqual(["vendor_claim"]);
    expect(summary.materialChangeIds).toEqual([]);
    expect(ledger.findings).toHaveLength(1);
    expect(ledger.findings[0]?.verificationStatus).toBe("needs_review");
    expect(ledger.findings[0]?.generatedByModel).toBe(false);
    expect(ledger.findings[0]?.previousExcerpt).toBeNull();
    expect(ledger.proposals[0]?.priorClaimId).toBe("claim-vault-dynamic");
    expect(ledger.snapshots).toHaveLength(1);
    expect(catalog.vendors.find((vendor) => vendor.id === "hashicorp")?.positioning).toBe(positioning);
    expect(
      catalog.claims.map((claim) => ({
        id: claim.id,
        statement: claim.statement,
        verificationStatus: claim.verificationStatus,
      })),
    ).toEqual(before);
    expect(
      researchFindingSchema.safeParse({ ...ledger.findings[0], evidenceClass: "ai_hypothesis" }).success,
    ).toBe(false);
  });

  it("keeps the earlier excerpt when the page changes and opens one alert", async () => {
    const ledger = createHashicorpLedger();
    await executeVendorResearch({ ledger, vendorId: "hashicorp", asOf: MONITOR_AS_OF });
    const firstExcerpt = ledger.snapshots[0]?.excerpt;
    const changed = await executeVendorResearch({
      ledger,
      vendorId: "hashicorp",
      asOf: MONITOR_AS_OF,
      documents: [vaultChangedDocument],
    });
    expect(changed.materialChangeIds).toHaveLength(1);
    expect(ledger.snapshots).toHaveLength(2);
    expect(ledger.snapshots[0]?.excerpt).toBe(firstExcerpt);
    expect(ledger.findings).toHaveLength(2);
    expect(ledger.findings[1]?.previousExcerpt).toBe(firstExcerpt);
    const alerts = openMaterialAlerts(ledger, {
      vendorId: "hashicorp",
      asOf: MONITOR_AS_OF,
      changeIds: changed.materialChangeIds,
    });
    expect(alerts).toHaveLength(1);
    expect(alerts[0]?.previousExcerpt).toBe(firstExcerpt);
    expect(alerts[0]?.nextExcerpt).toContain("does not list a price");
    openMaterialAlerts(ledger, {
      vendorId: "hashicorp",
      asOf: MONITOR_AS_OF,
      changeIds: changed.materialChangeIds,
    });
    expect(ledger.alerts).toHaveLength(1);
    const missing = openMaterialAlerts(ledger, {
      vendorId: "hashicorp",
      asOf: MONITOR_AS_OF,
      changeIds: ["chg-not-in-this-process"],
    });
    expect(missing).toEqual([]);
    expect(ledger.alerts).toHaveLength(1);
    expect(ledger.workflowRuns.at(-1)?.status).toBe("failed");
    expect(ledger.workflowRuns.at(-1)?.failureReason).toMatch(/not in this process ledger/);
  });

  it("does not store a second snapshot or finding for the same excerpt", async () => {
    const ledger = createHashicorpLedger();
    await executeVendorResearch({ ledger, vendorId: "hashicorp", asOf: MONITOR_AS_OF });
    const second = await executeVendorResearch({ ledger, vendorId: "hashicorp", asOf: MONITOR_AS_OF });
    expect(second.findingIds).toEqual([]);
    expect(second.materialChangeIds).toEqual([]);
    expect(ledger.snapshots).toHaveLength(1);
    expect(ledger.findings).toHaveLength(1);
    expect(ledger.workflowRuns).toHaveLength(2);
    expect(ledger.runs[1]?.outcome).toBe("unchanged");
  });

  it("records a failure when the fixture is missing and when the vendor is unknown", async () => {
    const missingFixture = createHashicorpLedger();
    const failed = await executeVendorResearch({
      ledger: missingFixture,
      vendorId: "hashicorp",
      asOf: MONITOR_AS_OF,
      documents: [],
    });
    expect(failed.workflowStatus).toBe("failed");
    expect(failed.failureReason).toBe("fixture_missing");
    expect(missingFixture.snapshots).toHaveLength(0);
    expect(missingFixture.findings).toHaveLength(0);
    const unknown = createHashicorpLedger();
    const rejected = await executeVendorResearch({
      ledger: unknown,
      vendorId: "not-a-vendor",
      asOf: MONITOR_AS_OF,
    });
    expect(rejected.workflowStatus).toBe("failed");
    expect(unknown.workflowRuns[0]?.failureReason).toMatch(/No monitored vendor plan/);
  });

  it("limits a scheduled batch to registered vendors that are due", () => {
    const ledger = createHashicorpLedger();
    expect(planScheduledBatch(ledger, MONITOR_AS_OF)).toEqual([
      { vendorId: "hashicorp", asOf: MONITOR_AS_OF },
    ]);
    expect(RESEARCH_BATCH_SIZE).toBe(5);
    ledger.sources[0] = { ...ledger.sources[0]!, lastCheckedAt: MONITOR_AS_OF, lastCheckStatus: "unchanged" };
    expect(planScheduledBatch(ledger, MONITOR_AS_OF)).toEqual([]);
  });
});

describe("Inngest functions", () => {
  beforeEach(() => {
    resetResearchLedger();
  });

  it("schedules HashiCorp, checks the fixture, and follows a material change", async () => {
    const schedule = createStep();
    const scheduled = await handleScheduleVendorResearch({ step: schedule.step });
    expect(scheduled.queued).toBe(1);
    expect(schedule.sent[0]).toEqual([
      {
        name: "vendor/research.requested",
        data: { vendorId: "hashicorp", asOf: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/) },
      },
    ]);

    const research = createStep();
    const summary = await handleResearchVendor({
      event: { data: { vendorId: "hashicorp", asOf: MONITOR_AS_OF } },
      step: research.step,
    });
    expect(summary.workflowStatus).toBe("completed");
    expect(research.sent).toEqual([]);
    expect(research.ran).toEqual(["check-permitted-sources"]);

    const ledger = createHashicorpLedger();
    await executeVendorResearch({
      ledger,
      vendorId: "hashicorp",
      asOf: MONITOR_AS_OF,
      documents: [vaultChangedDocument],
    });
    const { saveResearchLedger } = await import("../research/runtime-store");
    saveResearchLedger(ledger);
    const follow = createStep();
    const changed = await handleResearchVendor({
      event: { data: { vendorId: "hashicorp", asOf: MONITOR_AS_OF } },
      step: follow.step,
    });
    expect(changed.materialChangeIds.length).toBeGreaterThan(0);
    expect(follow.sent).toEqual([
      {
        name: "vendor/research.changed",
        data: {
          vendorId: "hashicorp",
          asOf: MONITOR_AS_OF,
          changeKey: changed.materialChangeIds.join(","),
        },
      },
    ]);
    const review = createStep();
    const alertIds = await handleVendorChange({
      event: {
        data: {
          vendorId: "hashicorp",
          asOf: MONITOR_AS_OF,
          changeKey: changed.materialChangeIds.join(","),
        },
      },
      step: review.step,
    });
    expect(alertIds).toHaveLength(1);
  });

  it("configures schedule, retries, concurrency, idempotency, and throttle", () => {
    expect(scheduleVendorResearch.opts.triggers).toEqual([{ cron: "0 12 * * 1" }]);
    expect(scheduleVendorResearch.opts.retries).toBe(RESEARCH_RETRY_LIMIT);
    expect(researchVendor.opts.retries).toBe(RESEARCH_RETRY_LIMIT);
    expect(researchVendor.opts.concurrency).toEqual({ limit: RESEARCH_CONCURRENCY });
    expect(researchVendor.opts.idempotency).toBe(RESEARCH_IDEMPOTENCY);
    expect(researchVendor.opts.throttle).toMatchObject({ limit: 2, period: "1h", key: "event.data.vendorId" });
    expect(researchVendor.opts.triggers).toEqual([{ event: "vendor/research.requested" }]);
    expect(reviewVendorChange.opts.idempotency).toContain("event.data.changeKey");
    expect(typeof researchVendor.opts.onFailure).toBe("function");
    expect(RESEARCH_CONCURRENCY).toBe(1);
  });

  it("rejects a malformed research event without retrying it", async () => {
    const research = createStep();
    await expect(
      handleResearchVendor({
        event: { data: { vendorId: "hashicorp", asOf: "yesterday" } },
        step: research.step,
      }),
    ).rejects.toBeInstanceOf(NonRetriableError);
    expect(research.ran).toEqual([]);
  });

  it("previews an offline HashiCorp monitor without claiming a live crawl", async () => {
    const view = await previewHashicorpMonitor();
    expect(view.liveMonitoring).toBe(false);
    expect(view.persistence).toBe("offline_fixture");
    expect(view.lastResearchedAt).toBe(MONITOR_AS_OF);
    expect(view.freshness).toBe("current");
    expect(view.findings[0]?.evidenceClass).toBe("vendor_claim");
    expect(view.failures).toEqual([]);
    expect(view.versions).toHaveLength(1);
  });
});
