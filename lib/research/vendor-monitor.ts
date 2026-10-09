import { z } from "zod";
import { fixtureRetrievalAdapter, type RetrievedDocument } from "./adapters";
import { assertResearchLedger, createLedger, researchProblems, type ResearchLedger } from "./ledger";
import { normalizeMonitoredUrl } from "./normalize";
import { isCheckDue } from "./policy";
import { checkMonitoredSource } from "./pipeline";
import { applyReviewDecision } from "./review";
import {
  ResearchLedgerPersistenceError,
  loadResearchLedger,
  peekResearchLedger,
  readPersistedResearchLedger,
  researchLedgerPath,
  restoreResearchLedger,
  saveResearchLedger,
} from "./runtime-store";
import {
  materialAlertSchema,
  monitoredSourceSchema,
  researchFindingSchema,
  reviewDecisionKindSchema,
  sourcePolicySchema,
  workflowRunSchema,
  type MaterialAlert,
  type ProposalReviewStatus,
  type ResearchFinding,
  type WorkflowRun,
} from "./schema";

export const MONITOR_AS_OF = "2026-10-09";
export const RESEARCH_BATCH_SIZE = 5;
export const RESEARCH_CONCURRENCY = 1;
export const RESEARCH_RETRY_LIMIT = 2;
export const RESEARCH_FUNCTION_ID = "research-vendor";
export const SCHEDULE_FUNCTION_ID = "schedule-vendor-research";
export const FOLLOW_UP_FUNCTION_ID = "review-vendor-change";
export const VENDOR_RESEARCH_REQUESTED = "vendor/research.requested";
export const VENDOR_RESEARCH_CHANGED = "vendor/research.changed";
export const RESEARCH_IDEMPOTENCY = 'event.data.vendorId + "-" + event.data.asOf';
export const RESEARCH_THROTTLE = {
  limit: 2,
  period: "1h",
  key: "event.data.vendorId",
} as const;

const VAULT_URL = normalizeMonitoredUrl(
  "https://developer.hashicorp.com/vault/tutorials/get-started/understand-static-dynamic-secrets",
);

const vaultStatement =
  "HashiCorp Vault documentation says dynamic secrets do not exist until they are read, and that Vault revokes them when the lease ends.";

export const vaultMonitoredSource = monitoredSourceSchema.parse({
  id: "mon-vault-dynamic",
  catalogSourceId: "src-vault-dynamic",
  title: "Vault static and dynamic secrets",
  canonicalUrl: VAULT_URL,
  publisher: "HashiCorp",
  author: null,
  sourceType: "official_docs",
  classification: "vendor_first",
  publishedAt: null,
  monitoringFrequency: "quarterly",
  permissionStatus: "public_permitted",
  lastCheckStatus: "never_checked",
  lastCheckedAt: null,
  policyId: "policy-vault-dynamic",
  enabled: true,
});

export const vaultSourcePolicy = sourcePolicySchema.parse({
  id: "policy-vault-dynamic",
  monitoredSourceId: vaultMonitoredSource.id,
  classification: "vendor_first",
  permissionStatus: "public_permitted",
  retrievalScope: "excerpt",
  licenseNote:
    "HashiCorp's public Vault tutorial may be stored as a short excerpt. This workflow does not copy the full page and does not treat the vendor's statement as an independent fact.",
  authorizationRef: null,
  updatedAt: MONITOR_AS_OF,
});

export const vaultBaselineDocument: RetrievedDocument = {
  url: VAULT_URL,
  title: vaultMonitoredSource.title,
  publishedAt: null,
  text: "Vault docs: dynamic secrets are created when read and revoked when the lease ends.",
  statements: [
    {
      statement: vaultStatement,
      subjectType: "product",
      subjectId: "vault",
      capabilityId: "cap-dynamic-secrets",
      polarity: "asserts",
      sourceType: "official_docs",
      priorClaimId: "claim-vault-dynamic",
    },
  ],
};

export const vaultChangedDocument: RetrievedDocument = {
  ...vaultBaselineDocument,
  text: `${vaultBaselineDocument.text} The tutorial page still does not list a price.`,
  statements: [
    {
      ...vaultBaselineDocument.statements[0],
      statement: `${vaultStatement} The checked tutorial still does not list a price.`,
    },
  ],
};

export type VendorMonitorPlan = {
  vendorId: string;
  vendorName: string;
  vendorSlug: string;
  productId: string;
  categoryId: string;
  sourceIds: string[];
};

export const hashicorpMonitor: VendorMonitorPlan = {
  vendorId: "hashicorp",
  vendorName: "HashiCorp",
  vendorSlug: "hashicorp",
  productId: "vault",
  categoryId: "secrets-management",
  sourceIds: [vaultMonitoredSource.id],
};

const MONITORS = [hashicorpMonitor];

export function createHashicorpLedger(): ResearchLedger {
  const ledger = createLedger();
  ledger.sources.push(monitoredSourceSchema.parse({ ...vaultMonitoredSource }));
  ledger.policies.push(sourcePolicySchema.parse({ ...vaultSourcePolicy }));
  return ledger;
}

export function planScheduledBatch(ledger: ResearchLedger, asOf: string): { vendorId: string; asOf: string }[] {
  const due: { vendorId: string; asOf: string }[] = [];
  for (const plan of MONITORS) {
    const sources = plan.sourceIds
      .map((sourceId) => ledger.sources.find((source) => source.id === sourceId))
      .filter((source) => source !== undefined);
    if (sources.length === 0) continue;
    if (sources.some((source) => isCheckDue(source, asOf))) {
      due.push({ vendorId: plan.vendorId, asOf });
    }
  }
  return due.slice(0, RESEARCH_BATCH_SIZE);
}

export type VendorResearchSummary = {
  vendorId: string;
  asOf: string;
  findingIds: string[];
  materialChangeIds: string[];
  snapshotIds: string[];
  workflowStatus: "completed" | "failed";
  failureReason: string | null;
  evidenceClasses: string[];
};

export async function executeVendorResearch(input: {
  ledger: ResearchLedger;
  vendorId: string;
  asOf: string;
  documents?: RetrievedDocument[];
  attempt?: number;
}): Promise<VendorResearchSummary> {
  const plan = MONITORS.find((item) => item.vendorId === input.vendorId);
  const attempt = input.attempt ?? 0;
  if (!plan) {
    const failure = appendWorkflowRun(input.ledger, {
      vendorId: input.vendorId,
      functionId: RESEARCH_FUNCTION_ID,
      status: "failed",
      attempt,
      startedAt: input.asOf,
      finishedAt: input.asOf,
      failureReason: "No monitored vendor plan is registered for this id.",
    });
    assertResearchLedger(input.ledger);
    return emptySummary(input.vendorId, input.asOf, failure.failureReason);
  }

  const documents = input.documents ?? [vaultBaselineDocument];
  const adapter = fixtureRetrievalAdapter(documents);
  const knownChanges = new Set(input.ledger.changes.map((change) => change.id));
  const knownProposals = new Set(input.ledger.proposals.map((proposal) => proposal.id));
  const knownFindings = new Set(input.ledger.findings.map((finding) => finding.id));
  const failures: string[] = [];

  for (const sourceId of plan.sourceIds) {
    const source = input.ledger.sources.find((item) => item.id === sourceId);
    if (!source) {
      failures.push(`Monitored source ${sourceId} is not in the ledger.`);
      continue;
    }
    const result = await checkMonitoredSource({
      ledger: input.ledger,
      sourceId,
      adapter,
      asOf: input.asOf,
      force: true,
    });
    if (result.run.outcome === "error" || result.run.outcome === "denied") {
      failures.push(result.run.denialReason ?? result.run.outcome);
    }
    for (const proposal of input.ledger.proposals) {
      if (knownProposals.has(proposal.id)) continue;
      if (proposal.monitoredSourceId !== sourceId) continue;
      knownProposals.add(proposal.id);
      const snapshot = input.ledger.snapshots.find((item) => item.id === proposal.snapshotId);
      const change = input.ledger.changes.find((item) => item.id === proposal.changeId);
      const previous = change?.previousSnapshotId
        ? input.ledger.snapshots.find((item) => item.id === change.previousSnapshotId)
        : undefined;
      input.ledger.findings.push(
        researchFindingSchema.parse({
          id: `find-${proposal.id}`,
          proposalId: proposal.id,
          snapshotId: proposal.snapshotId,
          changeId: proposal.changeId,
          vendorId: plan.vendorId,
          productId: plan.productId,
          categoryId: plan.categoryId,
          classification: source.classification,
          evidenceClass: "vendor_claim",
          title: snapshot?.title ?? source.title,
          publisher: source.publisher,
          sourceUrl: proposal.sourceUrl,
          excerpt: snapshot?.excerpt ?? "",
          retrievedAt: input.asOf,
          eventDate: snapshot?.publishedAt ?? null,
          previousExcerpt: previous?.excerpt ?? null,
          previousHash: change?.previousHash ?? null,
          verificationStatus: "needs_review",
          generatedByModel: false,
        }),
      );
    }
  }

  const materialChangeIds = input.ledger.changes
    .filter((change) => !knownChanges.has(change.id) && change.kind !== "initial")
    .map((change) => change.id);
  const newFindings = input.ledger.findings.filter((finding) => !knownFindings.has(finding.id));
  const status = failures.length > 0 ? "failed" : "completed";
  appendWorkflowRun(input.ledger, {
    vendorId: plan.vendorId,
    functionId: RESEARCH_FUNCTION_ID,
    status,
    attempt,
    startedAt: input.asOf,
    finishedAt: input.asOf,
    failureReason: failures.length > 0 ? failures.join(" ") : null,
  });
  assertResearchLedger(input.ledger);

  return {
    vendorId: plan.vendorId,
    asOf: input.asOf,
    findingIds: newFindings.map((finding) => finding.id),
    materialChangeIds,
    snapshotIds: input.ledger.snapshots.map((snapshot) => snapshot.id),
    workflowStatus: status,
    failureReason: failures.length > 0 ? failures.join(" ") : null,
    evidenceClasses: [...new Set(newFindings.map((finding) => finding.evidenceClass))],
  };
}

export function openMaterialAlerts(
  ledger: ResearchLedger,
  input: { vendorId: string; asOf: string; changeIds: string[] },
): MaterialAlert[] {
  const missing = input.changeIds.filter((changeId) => !ledger.changes.some((change) => change.id === changeId));
  if (input.changeIds.length === 0 || missing.length > 0) {
    appendWorkflowRun(ledger, {
      vendorId: input.vendorId,
      functionId: FOLLOW_UP_FUNCTION_ID,
      status: "failed",
      attempt: 0,
      startedAt: input.asOf,
      finishedAt: input.asOf,
      failureReason:
        input.changeIds.length === 0
          ? "No change id was provided, so no material alert was opened."
          : `Change ids are not in this process ledger: ${missing.join(", ")}.`,
    });
    const problems = researchProblems(ledger);
    if (problems.length > 0) {
      throw new Error(`Research ledger failed:\n${problems.join("\n")}`);
    }
    return [];
  }

  const plan = MONITORS.find((item) => item.vendorId === input.vendorId);
  const opened: MaterialAlert[] = [];
  for (const changeId of input.changeIds) {
    const alertId = `alert-${changeId}`;
    const existing = ledger.alerts.find((alert) => alert.id === alertId);
    if (existing) {
      opened.push(existing);
      continue;
    }
    const change = ledger.changes.find((item) => item.id === changeId);
    if (!change || change.kind === "initial") continue;
    const snapshot = ledger.snapshots.find((item) => item.id === change.snapshotId);
    const previous = change.previousSnapshotId
      ? ledger.snapshots.find((item) => item.id === change.previousSnapshotId)
      : undefined;
    const finding = ledger.findings.find((item) => item.changeId === changeId);
    const alert = materialAlertSchema.parse({
      id: alertId,
      vendorId: input.vendorId,
      productId: plan?.productId ?? finding?.productId ?? null,
      changeId,
      findingId: finding?.id ?? null,
      summary: `Retained excerpt changed for ${plan?.vendorName ?? input.vendorId}. Review the pending vendor claim before any catalog edit.`,
      detectedAt: input.asOf,
      previousExcerpt: previous?.excerpt ?? null,
      nextExcerpt: snapshot?.excerpt ?? "",
      status: "open",
    });
    ledger.alerts.push(alert);
    opened.push(alert);
  }
  appendWorkflowRun(ledger, {
    vendorId: input.vendorId,
    functionId: FOLLOW_UP_FUNCTION_ID,
    status: "completed",
    attempt: 0,
    startedAt: input.asOf,
    finishedAt: input.asOf,
    failureReason: null,
  });
  const problems = researchProblems(ledger);
  if (problems.length > 0) {
    throw new Error(`Research ledger failed:\n${problems.join("\n")}`);
  }
  return opened;
}

export function markResearchFailed(input: {
  vendorId: string | null;
  asOf: string;
  reason: string;
  functionId: string;
  attempt?: number;
}): WorkflowRun {
  const ledger = loadResearchLedger(createHashicorpLedger);
  const run = appendWorkflowRun(ledger, {
    vendorId: input.vendorId,
    functionId: input.functionId,
    status: "failed",
    attempt: input.attempt ?? 0,
    startedAt: input.asOf,
    finishedAt: input.asOf,
    failureReason: input.reason,
  });
  saveResearchLedger(ledger);
  return run;
}

const reviewRequestSchema = z.object({
  proposedClaimId: z.string().regex(/^prop-[a-f0-9]+$/),
  decision: reviewDecisionKindSchema,
  reviewer: z.string().trim().min(1).max(80),
  rationale: z.string().trim().min(1).max(500),
});

export type ReviewRecordResult =
  | {
      ok: true;
      published: false;
      proposalId: string;
      reviewStatus: ProposalReviewStatus;
      decisionId: string;
    }
  | { ok: false; status: 400 | 404; error: string };

export function recordVendorReview(input: unknown): ReviewRecordResult {
  const parsed = reviewRequestSchema.safeParse(input);
  if (!parsed.success) return { ok: false, status: 400, error: "Review input is invalid." };
  let ledger: ResearchLedger;
  try {
    ledger = loadResearchLedger(createHashicorpLedger);
  } catch (error) {
    if (error instanceof ResearchLedgerPersistenceError) return { ok: false, status: 400, error: error.message };
    throw error;
  }
  const backup = structuredClone(ledger);
  try {
    const applied = applyReviewDecision(ledger, {
      ...parsed.data,
      decidedAt: new Date().toISOString().slice(0, 10),
    });
    saveResearchLedger(ledger);
    return {
      ok: true,
      published: false,
      proposalId: applied.proposal.id,
      reviewStatus: applied.proposal.reviewStatus,
      decisionId: applied.decision.id,
    };
  } catch (error) {
    restoreResearchLedger(backup);
    const message = error instanceof Error ? error.message : "Review was not recorded.";
    return {
      ok: false,
      status: message.includes("is not in the ledger") ? 404 : 400,
      error: message,
    };
  }
}

export type VendorMonitorView = {
  persistence: "offline_fixture" | "process_memory" | "durable_file";
  liveMonitoring: false;
  vendorId: string;
  vendorName: string;
  vendorSlug: string;
  productId: string;
  categoryId: string;
  lastResearchedAt: string | null;
  freshness: "current" | "due" | "never" | "failed";
  frequency: string;
  findings: ResearchFinding[];
  proposals: { id: string; statement: string; reviewStatus: ProposalReviewStatus }[];
  versions: { id: string; retrievedAt: string; excerpt: string; contentHash: string }[];
  alerts: MaterialAlert[];
  workflowRuns: WorkflowRun[];
  failures: WorkflowRun[];
  retryLimit: number;
  source: {
    title: string;
    url: string;
    publisher: string;
    retrievedAt: string | null;
    evidenceClass: "vendor_claim";
    permissionStatus: string;
  } | null;
};

export function vendorMonitorView(
  ledger: ResearchLedger,
  persistence: VendorMonitorView["persistence"],
): VendorMonitorView {
  const plan = hashicorpMonitor;
  const source = ledger.sources.find((item) => item.id === vaultMonitoredSource.id);
  const latestRun = [...ledger.workflowRuns].reverse().find((run) => run.vendorId === plan.vendorId);
  const failed = source?.lastCheckStatus === "error" || latestRun?.status === "failed";
  const freshness = !source || source.lastCheckStatus === "never_checked"
    ? "never"
    : failed
      ? "failed"
      : isCheckDue(source, MONITOR_AS_OF)
        ? "due"
        : "current";
  return {
    persistence,
    liveMonitoring: false,
    vendorId: plan.vendorId,
    vendorName: plan.vendorName,
    vendorSlug: plan.vendorSlug,
    productId: plan.productId,
    categoryId: plan.categoryId,
    lastResearchedAt: source?.lastCheckedAt ?? null,
    freshness,
    frequency: source?.monitoringFrequency ?? "quarterly",
    findings: ledger.findings.filter((finding) => finding.vendorId === plan.vendorId),
    proposals: ledger.proposals
      .filter((proposal) => proposal.monitoredSourceId === vaultMonitoredSource.id)
      .map((proposal) => ({
        id: proposal.id,
        statement: proposal.statement,
        reviewStatus: proposal.reviewStatus,
      })),
    versions: ledger.snapshots
      .filter((snapshot) => snapshot.monitoredSourceId === vaultMonitoredSource.id)
      .map((snapshot) => ({
        id: snapshot.id,
        retrievedAt: snapshot.retrievedAt,
        excerpt: snapshot.excerpt,
        contentHash: snapshot.contentHash,
      })),
    alerts: ledger.alerts.filter((alert) => alert.vendorId === plan.vendorId),
    workflowRuns: ledger.workflowRuns.filter((run) => run.vendorId === plan.vendorId),
    failures: ledger.workflowRuns.filter((run) => run.vendorId === plan.vendorId && run.status === "failed"),
    retryLimit: RESEARCH_RETRY_LIMIT,
    source: source
      ? {
          title: source.title,
          url: source.canonicalUrl,
          publisher: source.publisher,
          retrievedAt: source.lastCheckedAt,
          evidenceClass: "vendor_claim",
          permissionStatus: source.permissionStatus,
        }
      : null,
  };
}

export async function previewHashicorpMonitor(): Promise<VendorMonitorView> {
  const ledger = createHashicorpLedger();
  await executeVendorResearch({
    ledger,
    vendorId: hashicorpMonitor.vendorId,
    asOf: MONITOR_AS_OF,
  });
  return vendorMonitorView(ledger, "offline_fixture");
}

export async function currentVendorMonitorView(): Promise<VendorMonitorView> {
  const runtime = peekResearchLedger() ?? readPersistedResearchLedger();
  if (runtime && runtime.workflowRuns.some((run) => run.vendorId === hashicorpMonitor.vendorId)) {
    return vendorMonitorView(runtime, researchLedgerPath() ? "durable_file" : "process_memory");
  }
  return previewHashicorpMonitor();
}

function emptySummary(vendorId: string, asOf: string, failureReason: string | null): VendorResearchSummary {
  return {
    vendorId,
    asOf,
    findingIds: [],
    materialChangeIds: [],
    snapshotIds: [],
    workflowStatus: "failed",
    failureReason,
    evidenceClasses: [],
  };
}

function appendWorkflowRun(
  ledger: ResearchLedger,
  input: Omit<WorkflowRun, "id">,
): WorkflowRun {
  const sequence = ledger.workflowRuns.length + 1;
  const run = workflowRunSchema.parse({
    ...input,
    id: `wf-${input.functionId}-${input.vendorId ?? "none"}-${String(sequence).padStart(3, "0")}`,
  });
  ledger.workflowRuns.push(run);
  return run;
}
