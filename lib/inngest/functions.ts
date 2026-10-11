import { cron, NonRetriableError } from "inngest";
import { z } from "zod";
import { inngest } from "./client";
import { loadResearchLedger, saveResearchLedger } from "../research/runtime-store";
import {
  createHashicorpLedger,
  executeVendorResearch,
  FOLLOW_UP_FUNCTION_ID,
  MONITOR_AS_OF,
  openMaterialAlerts,
  planScheduledBatch,
  RESEARCH_CONCURRENCY,
  RESEARCH_FUNCTION_ID,
  RESEARCH_IDEMPOTENCY,
  RESEARCH_RETRY_LIMIT,
  RESEARCH_THROTTLE,
  SCHEDULE_FUNCTION_ID,
  VENDOR_RESEARCH_CHANGED,
  VENDOR_RESEARCH_REQUESTED,
  markResearchFailed,
  type VendorResearchSummary,
} from "../research/vendor-monitor";

type ResearchStep = {
  run: (id: string, fn: () => unknown) => Promise<unknown>;
  sendEvent: (id: string, payload: unknown) => Promise<unknown>;
};

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const vendorId = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(80);
const researchRequest = z.object({ vendorId, asOf: isoDate });
const researchChange = researchRequest.extend({
  changeKey: z.string().regex(/^[a-z0-9-]+(?:,[a-z0-9-]+)*$/).max(2000),
});

function parseEvent<T>(schema: z.ZodType<T>, data: unknown, label: string): T {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    throw new NonRetriableError(`${label} payload is invalid. ${parsed.error.issues.map((issue) => issue.message).join(" ")}`);
  }
  return parsed.data;
}

export async function handleScheduleVendorResearch({
  step,
}: {
  step: ResearchStep;
}) {
  const batch = (await step.run("select-due-vendors", () => {
    const ledger = loadResearchLedger(createHashicorpLedger);
    const asOf = new Date().toISOString().slice(0, 10);
    return planScheduledBatch(ledger, asOf);
  })) as { vendorId: string; asOf: string }[];
  if (batch.length === 0) return { queued: 0 };
  await step.sendEvent(
    "queue-vendor-research",
    batch.map((item) => ({ name: VENDOR_RESEARCH_REQUESTED, data: item })),
  );
  return { queued: batch.length };
}

export async function handleResearchVendor({
  event,
  step,
  attempt = 0,
}: {
  event: { data: { vendorId: string; asOf: string } };
  step: ResearchStep;
  attempt?: number;
}): Promise<VendorResearchSummary> {
  parseEvent(researchRequest, event.data, "vendor/research.requested");
  const summary = (await step.run("check-permitted-sources", async () => {
    const ledger = loadResearchLedger(createHashicorpLedger);
    const result = await executeVendorResearch({
      ledger,
      vendorId: event.data.vendorId,
      asOf: event.data.asOf,
      attempt,
    });
    saveResearchLedger(ledger);
    return result;
  })) as VendorResearchSummary;
  if (summary.materialChangeIds.length > 0) {
    await step.sendEvent("queue-material-review", {
      name: VENDOR_RESEARCH_CHANGED,
      data: {
        vendorId: summary.vendorId,
        asOf: summary.asOf,
        changeKey: summary.materialChangeIds.join(","),
      },
    });
  }
  return summary;
}

export async function handleVendorChange({
  event,
  step,
}: {
  event: { data: { vendorId: string; asOf: string; changeKey: string } };
  step: Pick<ResearchStep, "run">;
}): Promise<string[]> {
  parseEvent(researchChange, event.data, "vendor/research.changed");
  return (await step.run("open-material-alerts", () => {
    const ledger = loadResearchLedger(createHashicorpLedger);
    const alerts = openMaterialAlerts(ledger, {
      vendorId: event.data.vendorId,
      asOf: event.data.asOf,
      changeIds: event.data.changeKey.split(",").filter((id) => id.length > 0),
    });
    saveResearchLedger(ledger);
    return alerts.map((alert) => alert.id);
  })) as string[];
}

export const scheduleVendorResearch = inngest.createFunction(
  {
    id: SCHEDULE_FUNCTION_ID,
    name: "Schedule vendor research",
    triggers: [cron("0 12 * * 1")],
    concurrency: 1,
    retries: RESEARCH_RETRY_LIMIT,
  },
  async ({ step }) => handleScheduleVendorResearch({ step: step as unknown as ResearchStep }),
);

export const researchVendor = inngest.createFunction(
  {
    id: RESEARCH_FUNCTION_ID,
    name: "Research one vendor",
    triggers: [{ event: VENDOR_RESEARCH_REQUESTED }],
    retries: RESEARCH_RETRY_LIMIT,
    concurrency: { limit: RESEARCH_CONCURRENCY },
    idempotency: RESEARCH_IDEMPOTENCY,
    throttle: RESEARCH_THROTTLE,
    onFailure: async ({ event }) => {
      const original = researchRequest.safeParse(event.data.event.data);
      const message = event.data.error.message || "Research function failed after retries.";
      markResearchFailed({
        vendorId: original.success ? original.data.vendorId : null,
        asOf: original.success ? original.data.asOf : MONITOR_AS_OF,
        reason: message,
        functionId: RESEARCH_FUNCTION_ID,
      });
    },
  },
  async ({ event, step, attempt }) =>
    handleResearchVendor({
      event: { data: { vendorId: String(event.data.vendorId ?? ""), asOf: String(event.data.asOf ?? "") } },
      step: step as unknown as ResearchStep,
      attempt,
    }),
);

export const reviewVendorChange = inngest.createFunction(
  {
    id: FOLLOW_UP_FUNCTION_ID,
    name: "Review a material vendor change",
    triggers: [{ event: VENDOR_RESEARCH_CHANGED }],
    retries: RESEARCH_RETRY_LIMIT,
    concurrency: { limit: RESEARCH_CONCURRENCY },
    idempotency: 'event.data.vendorId + "-" + event.data.asOf + "-" + event.data.changeKey',
  },
  async ({ event, step }) =>
    handleVendorChange({
      event: {
        data: {
          vendorId: String(event.data.vendorId ?? ""),
          asOf: String(event.data.asOf ?? ""),
          changeKey: String(event.data.changeKey ?? ""),
        },
      },
      step: step as unknown as ResearchStep,
    }),
);

export const researchFunctions = [scheduleVendorResearch, researchVendor, reviewVendorChange];
