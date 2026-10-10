import type { RetrievalAdapter, RetrievedDocument } from "./adapters";
import { assertResearchLedger, type ResearchLedger } from "./ledger";
import { fingerprint, normalizeContent, normalizeMonitoredUrl, retainText } from "./normalize";
import { isCheckDue, retrievalAllowed } from "./policy";
import {
  detectedChangeSchema,
  fixtureStatementSchema,
  monitoredSourceSchema,
  proposedClaimSchema,
  retrievalRunSchema,
  sourcePolicySchema,
  sourceSnapshotSchema,
  type DetectedChange,
  type FixtureStatement,
  type MonitoredSource,
  type ProposedClaim,
  type RetrievalRun,
  type SourceSnapshot,
} from "./schema";

export type CheckResult = {
  run: RetrievalRun;
  snapshot: SourceSnapshot | null;
  change: DetectedChange | null;
  proposals: ProposedClaim[];
  reusedSnapshot: boolean;
};

function replaceSource(
  ledger: ResearchLedger,
  sourceId: string,
  patch: Pick<MonitoredSource, "lastCheckStatus" | "lastCheckedAt">,
) {
  const index = ledger.sources.findIndex((source) => source.id === sourceId);
  ledger.sources[index] = monitoredSourceSchema.parse({
    ...ledger.sources[index],
    ...patch,
  });
}

function latestSnapshot(ledger: ResearchLedger, sourceId: string): SourceSnapshot | null {
  for (let index = ledger.runs.length - 1; index >= 0; index -= 1) {
    const run = ledger.runs[index];
    if (run.monitoredSourceId !== sourceId || !run.snapshotId) continue;
    return ledger.snapshots.find((snapshot) => snapshot.id === run.snapshotId) ?? null;
  }
  return null;
}

function pushRun(ledger: ResearchLedger, run: RetrievalRun): RetrievalRun {
  const parsed = retrievalRunSchema.parse(run);
  ledger.runs.push(parsed);
  return parsed;
}

export async function checkMonitoredSource(input: {
  ledger: ResearchLedger;
  sourceId: string;
  adapter: RetrievalAdapter;
  asOf: string;
  force?: boolean;
}): Promise<CheckResult> {
  const source = input.ledger.sources.find((item) => item.id === input.sourceId);
  if (!source) throw new Error(`Monitored source ${input.sourceId} is not in the ledger.`);
  const policy = input.ledger.policies.find((item) => item.id === source.policyId);
  if (!policy) throw new Error(`Source policy ${source.policyId} is not in the ledger.`);
  if (policy.monitoredSourceId !== source.id) {
    throw new Error(`Source policy ${policy.id} does not belong to ${source.id}.`);
  }
  if (policy.classification !== source.classification || policy.permissionStatus !== source.permissionStatus) {
    throw new Error(`Source ${source.id} does not match its policy.`);
  }
  sourcePolicySchema.parse(policy);
  monitoredSourceSchema.parse(source);

  const sequence = input.ledger.runs.length + 1;
  const runId = `run-${source.id}-${String(sequence).padStart(4, "0")}`;
  const blank = {
    id: runId,
    monitoredSourceId: source.id,
    sequence,
    startedAt: input.asOf,
    finishedAt: input.asOf,
    snapshotId: null,
    changeId: null,
  };

  if (!source.enabled) {
    const run = pushRun(input.ledger, {
      ...blank,
      adapter: "none",
      mode: "not_run",
      outcome: "skipped_disabled",
      denialReason: null,
    });
    assertResearchLedger(input.ledger);
    return { run, snapshot: null, change: null, proposals: [], reusedSnapshot: false };
  }

  if (!input.force && !isCheckDue(source, input.asOf)) {
    const run = pushRun(input.ledger, {
      ...blank,
      adapter: "none",
      mode: "not_run",
      outcome: "not_due",
      denialReason: null,
    });
    assertResearchLedger(input.ledger);
    return { run, snapshot: null, change: null, proposals: [], reusedSnapshot: false };
  }

  const gate = retrievalAllowed(policy);
  if (!gate.allowed) {
    const run = pushRun(input.ledger, {
      ...blank,
      adapter: "none",
      mode: "not_run",
      outcome: "denied",
      denialReason: gate.reason,
    });
    replaceSource(input.ledger, source.id, {
      lastCheckStatus: "skipped_permissions",
      lastCheckedAt: input.asOf,
    });
    assertResearchLedger(input.ledger);
    return { run, snapshot: null, change: null, proposals: [], reusedSnapshot: false };
  }

  if (gate.scope === "metadata") {
    return recordDocument({
      ledger: input.ledger,
      source,
      asOf: input.asOf,
      runId,
      sequence,
      adapterName: "none",
      mode: "not_run",
      scope: "metadata",
      document: {
        url: source.canonicalUrl,
        title: source.title,
        publishedAt: source.publishedAt,
        text: "",
        statements: [],
      },
    });
  }

  const response = await input.adapter.retrieve({
    canonicalUrl: source.canonicalUrl,
    scope: gate.scope,
  });
  if (!response.ok) {
    const run = pushRun(input.ledger, {
      ...blank,
      adapter: input.adapter.name,
      mode: "not_run",
      outcome: "error",
      denialReason: response.reason,
    });
    replaceSource(input.ledger, source.id, {
      lastCheckStatus: "error",
      lastCheckedAt: input.asOf,
    });
    assertResearchLedger(input.ledger);
    return { run, snapshot: null, change: null, proposals: [], reusedSnapshot: false };
  }

  return recordDocument({
    ledger: input.ledger,
    source,
    asOf: input.asOf,
    runId,
    sequence,
    adapterName: input.adapter.name,
    mode: response.mode,
    scope: gate.scope,
    document: response.document,
  });
}

function recordDocument(input: {
  ledger: ResearchLedger;
  source: MonitoredSource;
  asOf: string;
  runId: string;
  sequence: number;
  adapterName: RetrievalRun["adapter"];
  mode: RetrievalRun["mode"];
  scope: "metadata" | "excerpt" | "full_text";
  document: RetrievedDocument;
}): CheckResult {
  let canonical: string;
  try {
    canonical = normalizeMonitoredUrl(input.document.url);
  } catch {
    return fail(input, "invalid_url");
  }
  if (canonical !== normalizeMonitoredUrl(input.source.canonicalUrl)) {
    return fail(input, "url_mismatch");
  }

  const retained = retainText(input.document.text, input.scope);
  const hash = fingerprint(
    input.scope === "metadata"
      ? ["metadata", canonical, input.document.title ?? "", input.document.publishedAt ?? ""]
      : [input.scope, retained.normalizedText],
  );
  const snapshotId = `snap-${input.source.id}-${hash}`;
  const existing = input.ledger.snapshots.find(
    (snapshot) => snapshot.id === snapshotId && snapshot.monitoredSourceId === input.source.id,
  );
  const latest = latestSnapshot(input.ledger, input.source.id);

  if (latest && latest.contentHash === hash) {
    const run = pushRun(input.ledger, {
      id: input.runId,
      monitoredSourceId: input.source.id,
      sequence: input.sequence,
      startedAt: input.asOf,
      finishedAt: input.asOf,
      adapter: input.adapterName,
      mode: input.mode,
      outcome: "unchanged",
      denialReason: null,
      snapshotId: latest.id,
      changeId: null,
    });
    replaceSource(input.ledger, input.source.id, {
      lastCheckStatus: "unchanged",
      lastCheckedAt: input.asOf,
    });
    assertResearchLedger(input.ledger);
    return { run, snapshot: latest, change: null, proposals: [], reusedSnapshot: true };
  }

  let snapshot: SourceSnapshot;
  try {
    snapshot = existing
      ? existing
      : sourceSnapshotSchema.parse({
          id: snapshotId,
          monitoredSourceId: input.source.id,
          retrievalRunId: input.runId,
          canonicalUrl: canonical,
          retrievedAt: input.asOf,
          contentHash: hash,
          normalizedText: retained.normalizedText,
          excerpt: retained.excerpt,
          title: input.document.title,
          publishedAt: input.document.publishedAt ?? input.source.publishedAt,
          scope: input.scope,
          storedLength: retained.normalizedText.length,
          truncated: retained.truncated,
        });
  } catch {
    return fail(input, "invalid_snapshot");
  }

  const previousHash = latest?.contentHash ?? null;
  const changeId = `chg-${input.source.id}-${previousHash ?? "none"}-${hash}`;
  const priorChange = input.ledger.changes.find((change) => change.id === changeId);
  if (priorChange) {
    if (!existing) input.ledger.snapshots.push(snapshot);
    const run = pushRun(input.ledger, {
      id: input.runId,
      monitoredSourceId: input.source.id,
      sequence: input.sequence,
      startedAt: input.asOf,
      finishedAt: input.asOf,
      adapter: input.adapterName,
      mode: input.mode,
      outcome: "duplicate",
      denialReason: null,
      snapshotId: snapshot.id,
      changeId: priorChange.id,
    });
    replaceSource(input.ledger, input.source.id, {
      lastCheckStatus: "duplicate",
      lastCheckedAt: input.asOf,
    });
    assertResearchLedger(input.ledger);
    return { run, snapshot, change: priorChange, proposals: [], reusedSnapshot: true };
  }

  let statements: FixtureStatement[] = [];
  if (input.scope !== "metadata") {
    try {
      statements = input.document.statements
        .filter((statement) => statement.statement.trim().length > 0)
        .map((statement) => fixtureStatementSchema.parse(statement));
    } catch {
      return fail(input, "invalid_statement");
    }
  }

  const proposals: ProposedClaim[] = [];
  for (const statement of statements) {
    const normalizedStatement = normalizeContent(statement.statement);
    const dedupeKey = fingerprint([input.source.id, canonical, normalizedStatement]);
    if (input.ledger.proposals.some((proposal) => proposal.dedupeKey === dedupeKey)) continue;
    if (proposals.some((proposal) => proposal.dedupeKey === dedupeKey)) continue;
    const origin = input.mode === "mocked" ? "mocked_adapter" : "offline_fixture";
    try {
      proposals.push(
        proposedClaimSchema.parse({
          id: `prop-${dedupeKey}`,
          dedupeKey,
          changeId,
          snapshotId: snapshot.id,
          monitoredSourceId: input.source.id,
          statement: normalizedStatement,
          subjectType: statement.subjectType,
          subjectId: statement.subjectId,
          capabilityId: statement.capabilityId,
          polarity: statement.polarity,
          sourceId: input.source.catalogSourceId,
          priorClaimId: statement.priorClaimId,
          sourceUrl: canonical,
          sourceType: statement.sourceType,
          publishedAt: snapshot.publishedAt,
          observedAt: input.asOf,
          confidence: "low",
          verificationStatus: "needs_review",
          reviewStatus: "pending",
          attribution: `${input.source.publisher} (${input.source.classification}), observed ${input.asOf} via ${input.mode}. Snapshot ${snapshot.id}. Pending human review.`,
          origin,
          notes: "Phase 1 proposal. A review decision does not publish a catalog claim or verify a capability.",
          autoPublished: false,
        }),
      );
    } catch {
      return fail(input, "invalid_proposal");
    }
  }

  const change = detectedChangeSchema.parse({
    id: changeId,
    monitoredSourceId: input.source.id,
    snapshotId: snapshot.id,
    previousSnapshotId: latest?.id ?? null,
    kind: !latest ? "initial" : existing ? "reversion" : "content",
    summary: !latest
      ? "First retained observation for this source. Queued for human review."
      : existing
        ? "Normalized content matches an earlier snapshot. The earlier snapshot was kept."
        : "Normalized content changed. The previous snapshot was kept.",
    previousHash,
    nextHash: hash,
    detectedAt: input.asOf,
    queueStatus: proposals.length > 0 ? "proposal_opened" : "queued",
  });
  if (!existing) input.ledger.snapshots.push(snapshot);
  input.ledger.changes.push(change);
  input.ledger.proposals.push(...proposals);

  const run = pushRun(input.ledger, {
    id: input.runId,
    monitoredSourceId: input.source.id,
    sequence: input.sequence,
    startedAt: input.asOf,
    finishedAt: input.asOf,
    adapter: input.adapterName,
    mode: input.mode,
    outcome: "recorded",
    denialReason: null,
    snapshotId: snapshot.id,
    changeId: change.id,
  });
  replaceSource(input.ledger, input.source.id, {
    lastCheckStatus: "changed",
    lastCheckedAt: input.asOf,
  });
  assertResearchLedger(input.ledger);
  return {
    run,
    snapshot,
    change,
    proposals,
    reusedSnapshot: Boolean(existing),
  };
}

function fail(
  input: {
    ledger: ResearchLedger;
    source: MonitoredSource;
    asOf: string;
    runId: string;
    sequence: number;
    adapterName: RetrievalRun["adapter"];
    mode: RetrievalRun["mode"];
  },
  reason: string,
): CheckResult {
  const run = pushRun(input.ledger, {
    id: input.runId,
    monitoredSourceId: input.source.id,
    sequence: input.sequence,
    startedAt: input.asOf,
    finishedAt: input.asOf,
    adapter: input.adapterName,
    mode: input.mode,
    outcome: "error",
    denialReason: reason,
    snapshotId: null,
    changeId: null,
  });
  replaceSource(input.ledger, input.source.id, {
    lastCheckStatus: "error",
    lastCheckedAt: input.asOf,
  });
  assertResearchLedger(input.ledger);
  return { run, snapshot: null, change: null, proposals: [], reusedSnapshot: false };
}
