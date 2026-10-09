import {
  detectedChangeSchema,
  monitoredSourceSchema,
  proposedClaimSchema,
  retrievalRunSchema,
  reviewDecisionSchema,
  sourcePolicySchema,
  sourceSnapshotSchema,
  type DetectedChange,
  type MonitoredSource,
  type ProposedClaim,
  type RetrievalRun,
  type ReviewDecision,
  type SourcePolicy,
  type SourceSnapshot,
} from "./schema";

export type ResearchLedger = {
  sources: MonitoredSource[];
  policies: SourcePolicy[];
  runs: RetrievalRun[];
  snapshots: SourceSnapshot[];
  changes: DetectedChange[];
  proposals: ProposedClaim[];
  decisions: ReviewDecision[];
};

export function createLedger(): ResearchLedger {
  return {
    sources: [],
    policies: [],
    runs: [],
    snapshots: [],
    changes: [],
    proposals: [],
    decisions: [],
  };
}

function unique(ids: string[], label: string, problems: string[]) {
  const seen = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) problems.push(`Duplicate ${label} id ${id}`);
    seen.add(id);
  }
}

export function researchProblems(ledger: ResearchLedger): string[] {
  const problems: string[] = [];
  const sources = new Map<string, MonitoredSource>();
  const policies = new Map<string, SourcePolicy>();
  const runs = new Map<string, RetrievalRun>();
  const snapshots = new Map<string, SourceSnapshot>();
  const changes = new Map<string, DetectedChange>();
  const proposals = new Map<string, ProposedClaim>();

  for (const source of ledger.sources) {
    const parsed = monitoredSourceSchema.safeParse(source);
    if (!parsed.success) problems.push(`Monitored source ${source.id} failed validation`);
    sources.set(source.id, source);
  }
  for (const policy of ledger.policies) {
    const parsed = sourcePolicySchema.safeParse(policy);
    if (!parsed.success) problems.push(`Source policy ${policy.id} failed validation`);
    policies.set(policy.id, policy);
    if (!sources.has(policy.monitoredSourceId)) {
      problems.push(`Source policy ${policy.id} source missing`);
    }
  }
  for (const source of ledger.sources) {
    const policy = policies.get(source.policyId);
    if (!policy) problems.push(`Monitored source ${source.id} policy missing`);
    if (policy && policy.monitoredSourceId !== source.id) {
      problems.push(`Monitored source ${source.id} policy points elsewhere`);
    }
    if (policy && policy.classification !== source.classification) {
      problems.push(`Monitored source ${source.id} classification differs from its policy`);
    }
    if (policy && policy.permissionStatus !== source.permissionStatus) {
      problems.push(`Monitored source ${source.id} permission differs from its policy`);
    }
  }
  for (const run of ledger.runs) {
    const parsed = retrievalRunSchema.safeParse(run);
    if (!parsed.success) problems.push(`Retrieval run ${run.id} failed validation`);
    runs.set(run.id, run);
    if (!sources.has(run.monitoredSourceId)) problems.push(`Retrieval run ${run.id} source missing`);
    if (run.snapshotId && !ledger.snapshots.some((snapshot) => snapshot.id === run.snapshotId)) {
      problems.push(`Retrieval run ${run.id} snapshot missing`);
    }
    if (run.changeId && !ledger.changes.some((change) => change.id === run.changeId)) {
      problems.push(`Retrieval run ${run.id} change missing`);
    }
  }
  for (const snapshot of ledger.snapshots) {
    const parsed = sourceSnapshotSchema.safeParse(snapshot);
    if (!parsed.success) problems.push(`Snapshot ${snapshot.id} failed validation`);
    snapshots.set(snapshot.id, snapshot);
    if (!sources.has(snapshot.monitoredSourceId)) problems.push(`Snapshot ${snapshot.id} source missing`);
    if (!runs.has(snapshot.retrievalRunId)) problems.push(`Snapshot ${snapshot.id} run missing`);
    const policy = ledger.policies.find((item) => item.monitoredSourceId === snapshot.monitoredSourceId);
    if (policy && (policy.permissionStatus === "restricted" || policy.retrievalScope === "none")) {
      problems.push(`Snapshot ${snapshot.id} stored text for a source that denies retrieval`);
    }
    if (policy?.retrievalScope === "metadata" && snapshot.normalizedText.length > 0) {
      problems.push(`Snapshot ${snapshot.id} stored body text for a metadata-only source`);
    }
  }
  for (const change of ledger.changes) {
    const parsed = detectedChangeSchema.safeParse(change);
    if (!parsed.success) problems.push(`Detected change ${change.id} failed validation`);
    changes.set(change.id, change);
    if (!snapshots.has(change.snapshotId)) problems.push(`Detected change ${change.id} snapshot missing`);
    if (change.previousSnapshotId && !snapshots.has(change.previousSnapshotId)) {
      problems.push(`Detected change ${change.id} previous snapshot missing`);
    }
  }
  for (const proposal of ledger.proposals) {
    const parsed = proposedClaimSchema.safeParse(proposal);
    if (!parsed.success) problems.push(`Proposed claim ${proposal.id} failed validation`);
    proposals.set(proposal.id, proposal);
    if (proposal.verificationStatus !== "needs_review") {
      problems.push(`Proposed claim ${proposal.id} left review`);
    }
    if (proposal.autoPublished) problems.push(`Proposed claim ${proposal.id} was auto-published`);
    const change = changes.get(proposal.changeId);
    if (!change) problems.push(`Proposed claim ${proposal.id} change missing`);
    const snapshot = snapshots.get(proposal.snapshotId);
    if (!snapshot) problems.push(`Proposed claim ${proposal.id} snapshot missing`);
    if (snapshot && snapshot.scope === "metadata") {
      problems.push(`Proposed claim ${proposal.id} was extracted from metadata only`);
    }
  }
  for (const decision of ledger.decisions) {
    const parsed = reviewDecisionSchema.safeParse(decision);
    if (!parsed.success) problems.push(`Review decision ${decision.id} failed validation`);
    if (decision.publishesAutomatically) problems.push(`Review decision ${decision.id} publishes automatically`);
    if (decision.resultingClaimId !== null) {
      problems.push(`Review decision ${decision.id} records a published claim`);
    }
    if (!proposals.has(decision.proposedClaimId)) {
      problems.push(`Review decision ${decision.id} proposal missing`);
    }
  }

  unique(
    ledger.sources.map((source) => source.id),
    "monitored source",
    problems,
  );
  unique(
    ledger.policies.map((policy) => policy.id),
    "source policy",
    problems,
  );
  unique(
    ledger.runs.map((run) => run.id),
    "retrieval run",
    problems,
  );
  unique(
    ledger.snapshots.map((snapshot) => snapshot.id),
    "snapshot",
    problems,
  );
  unique(
    ledger.changes.map((change) => change.id),
    "detected change",
    problems,
  );
  unique(
    ledger.proposals.map((proposal) => proposal.id),
    "proposed claim",
    problems,
  );
  unique(
    ledger.decisions.map((decision) => decision.id),
    "review decision",
    problems,
  );
  return problems;
}

export function assertResearchLedger(ledger: ResearchLedger): void {
  const problems = researchProblems(ledger);
  if (problems.length > 0) {
    throw new Error(`Research ledger failed:\n${problems.join("\n")}`);
  }
}
