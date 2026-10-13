import type { Source } from "../lib/schema";
import { isSourceStale } from "../lib/coverage";
import type { EvidenceCell } from "../lib/compare";
import { sourceTypeLabel, verificationLabel } from "../lib/format";

/** Reuses native disclosure: status and limits remain visible before expansion. */
export function ComparisonEvidence({
  cell,
  productName,
  capabilityName,
  asOf,
  sources = [],
}: {
  cell: EvidenceCell;
  productName: string;
  capabilityName: string;
  asOf: string;
  sources?: Source[];
}) {
  if (cell.claims.length === 0) {
    return (
      <p className="mt-2 text-muted-foreground">
        Unknown. No sourced claim. Missing evidence does not mean the capability
        is absent.
      </p>
    );
  }

  const sourceIds = [...new Set(cell.claims.map((claim) => claim.sourceId))];
  const missingSources = sourceIds.filter((id) => !sources.some((source) => source.id === id));
  const stale = sources.filter((source) => sourceIds.includes(source.id) && isSourceStale(source, asOf));

  return (
    <div className="mt-2 space-y-3 break-words">
      <p className="text-xs text-muted-foreground">
        {cell.claims.length} source-linked{" "}
        {cell.claims.length === 1 ? "claim" : "claims"} · comparison as of{" "}
        {asOf}
      </p>
      {cell.status === "limited" ||
      cell.status === "conflicting" ||
      cell.status === "unverified" ? (
        <p className="text-sm font-medium">
          {cell.status === "limited"
            ? "Scope limits apply. Read the qualifications before comparing."
            : cell.status === "conflicting"
              ? "Sources conflict. Resolve the disagreement before relying on this cell."
              : "Evidence needs review. This is not verified support."}
        </p>
      ) : null}
      {stale.length > 0 ? (
        <p className="text-sm font-medium">Source refresh due at this comparison date. Recheck {stale.map((source) => source.title).join(", ")} before relying on this evidence.</p>
      ) : null}
      {missingSources.length > 0 ? (
        <p className="text-sm font-medium">Source freshness unavailable. The source registry entry is missing; review required.</p>
      ) : null}
      <details className="rounded-md border border-border p-2">
        <summary className="min-h-11 cursor-pointer py-2 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
          Supporting sources
          <span className="sr-only">
            {" "}
            for {productName}: {capabilityName}
          </span>
        </summary>
        <ul className="mt-2 space-y-4">
          {cell.claims.map((claim) => (
            <li key={claim.id} className="space-y-2">
              <p>{claim.statement}</p>
              <p className="text-xs">
                {verificationLabel(claim.verificationStatus)} ·{" "}
                {sourceTypeLabel(claim.sourceType)} · {claim.polarity}
              </p>
              <a
                className="inline-block min-h-11 py-2 text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                href={claim.sourceUrl}
              >
                Open source
                <span className="sr-only">
                  {" "}
                  for {productName}: {claim.statement}
                </span>
              </a>
              <dl className="space-y-1 text-xs text-muted-foreground">
                <div>
                  <dt className="inline font-medium">Last checked: </dt>
                  <dd className="inline">{claim.lastCheckedAt}</dd>
                </div>
                <div>
                  <dt className="inline font-medium">Published: </dt>
                  <dd className="inline">
                    {claim.publishedAt ?? "Not stated"}
                  </dd>
                </div>
                <div>
                  <dt className="inline font-medium">Source ID: </dt>
                  <dd className="inline">{claim.sourceId}</dd>
                </div>
              </dl>
              {claim.notes ? (
                <p className="border-l-2 border-border pl-2 text-sm">
                  <strong>Qualification: </strong>
                  {claim.notes}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </details>
      <p className="text-xs leading-5 text-muted-foreground">
        <strong>Limits: </strong>Claims describe the cited scope at the recorded
        date. Vendor statements are not independent validation. Verify current
        edition, deployment and availability before a decision.
      </p>
    </div>
  );
}

