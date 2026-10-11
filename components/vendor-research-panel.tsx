import { StatusPill } from "@/components/chrome";
import { VendorReviewForm } from "@/components/vendor-review-form";
import { formatDate } from "@/lib/format";
import type { VendorMonitorView } from "@/lib/research/vendor-monitor";

const FRESHNESS = {
  current: "Current",
  due: "Due for a check",
  never: "Not checked",
  failed: "Last check failed",
} as const;

const PERSISTENCE = {
  offline_fixture: "Offline fixture",
  process_memory: "This server process",
  durable_file: "Local ledger file",
} as const;

export function VendorResearchPanel({
  view,
  onReviewed,
}: {
  view: VendorMonitorView;
  onReviewed?: (view: VendorMonitorView) => void;
}) {
  return (
    <section className="mt-8 rounded-xl border border-border bg-card p-4" aria-labelledby="vendor-research-heading">
      <h2 id="vendor-research-heading" className="text-2xl">
        Vendor research
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {view.persistence === "durable_file"
          ? `Saved on this machine for ${view.vendorName}. The check still used the offline fixture.`
          : view.persistence === "process_memory"
            ? `Saved in this server process for ${view.vendorName}. The check still used the offline fixture.`
            : `Offline fixture for ${view.vendorName}.`}{" "}
        Inngest can schedule this check, and the result stays a pending vendor claim. Live website monitoring has
        not been run, and this panel does not publish catalog changes.
      </p>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-muted-foreground">Last researched</dt>
          <dd className="font-medium">{formatDate(view.lastResearchedAt)}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Freshness</dt>
          <dd className="font-medium">
            {FRESHNESS[view.freshness]} · {view.frequency}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Persistence</dt>
          <dd className="font-medium">{PERSISTENCE[view.persistence]}</dd>
        </div>
      </dl>

      <h3 className="mt-6 text-lg">Supporting source</h3>
      {view.source ? (
        <p className="mt-2 text-sm leading-6">
          <a className="font-medium text-primary hover:underline" href={view.source.url}>
            {view.source.title}
          </a>
          <span className="text-muted-foreground">
            {" "}
            · {view.source.publisher} · retrieved {formatDate(view.source.retrievedAt)} · {view.source.permissionStatus} ·
            vendor claim, not an independent fact
          </span>
        </p>
      ) : (
        <p className="mt-2 text-sm text-muted-foreground">No source is registered.</p>
      )}

      <h3 className="mt-6 text-lg">Pending findings</h3>
      {view.findings.length === 0 ? (
        <p className="mt-2 text-sm text-muted-foreground">No finding was stored.</p>
      ) : (
        <ul className="mt-2 space-y-3">
          {view.findings.map((finding) => (
            <li key={finding.id} className="rounded-lg border border-border p-3 text-sm leading-6">
              <StatusPill status={finding.verificationStatus} />
              <p className="mt-2">{finding.excerpt}</p>
              <p className="mt-1 text-muted-foreground">
                {finding.publisher}. Event date {formatDate(finding.eventDate)}. Category {finding.categoryId}. Product{" "}
                {finding.productId ?? "not linked"}. Previous excerpt: {finding.previousExcerpt ?? "none stored"}.
              </p>
            </li>
          ))}
        </ul>
      )}

      <h3 className="mt-6 text-lg">Proposals</h3>
      {view.proposals.length === 0 ? (
        <p className="mt-2 text-sm text-muted-foreground">No proposal was stored.</p>
      ) : (
        <ul className="mt-2 space-y-3">
          {view.proposals.map((proposal) => (
            <li key={proposal.id} className="rounded-lg border border-border p-3 text-sm leading-6">
              <StatusPill status={proposal.reviewStatus} />
              <p className="mt-2">{proposal.statement}</p>
              {view.persistence === "offline_fixture" ||
              !onReviewed ||
              proposal.reviewStatus === "accepted" ||
              proposal.reviewStatus === "rejected" ? null : (
                <VendorReviewForm proposalId={proposal.id} onReviewed={onReviewed} />
              )}
            </li>
          ))}
        </ul>
      )}

      <h3 className="mt-6 text-lg">Version history</h3>
      <ul className="mt-2 space-y-2 text-sm leading-6">
        {view.versions.map((version) => (
          <li key={version.id}>
            <span className="font-medium">{formatDate(version.retrievedAt)}</span>
            <span className="text-muted-foreground"> · {version.excerpt}</span>
          </li>
        ))}
      </ul>

      <h3 className="mt-6 text-lg">Material changes</h3>
      {view.alerts.length === 0 ? (
        <p className="mt-2 text-sm text-muted-foreground">
          No material alert is open. The first observation is queued for review and does not replace the published
          Vault claim.
        </p>
      ) : (
        <ul className="mt-2 space-y-3">
          {view.alerts.map((alert) => (
            <li key={alert.id} className="rounded-lg border border-border p-3 text-sm leading-6">
              <p>{alert.summary}</p>
              <p className="mt-1 text-muted-foreground">
                {formatDate(alert.detectedAt)} · {alert.status}. Previous: {alert.previousExcerpt ?? "none"}. Current:{" "}
                {alert.nextExcerpt}
              </p>
            </li>
          ))}
        </ul>
      )}

      <h3 className="mt-6 text-lg">Workflow</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Inngest retries a thrown research step up to {view.retryLimit} times. Completed fixture runs are listed below.
        A failed run stays in the list and does not delete earlier versions.
      </p>
      <ul className="mt-2 space-y-2 text-sm">
        {view.workflowRuns.map((run) => (
          <li key={run.id}>
            <span className="font-medium">{run.functionId}</span>
            <span className="text-muted-foreground">
              {" "}
              · {run.status} · attempt {run.attempt} · {formatDate(run.finishedAt)}
              {run.failureReason ? ` · ${run.failureReason}` : ""}
            </span>
          </li>
        ))}
      </ul>
      {view.failures.length === 0 ? (
        <p className="mt-2 text-sm text-muted-foreground">No failed research steps in this fixture run.</p>
      ) : null}
    </section>
  );
}
