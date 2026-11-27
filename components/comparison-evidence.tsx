import Link from "next/link";
import type { Source } from "../lib/schema";
import { isSourceStale } from "../lib/coverage";
import type { EvidenceCell } from "../lib/compare";
import { sourceTypeLabel, verificationLabel } from "../lib/format";

/** Reuses native disclosure: the answer, status and warnings stay visible before expansion. */
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
  const sourceIds = [...new Set(cell.claims.map((claim) => claim.sourceId))];
  const missingSources = sourceIds.filter(
    (id) => !sources.some((source) => source.id === id),
  );
  const stale = sources.filter(
    (source) => sourceIds.includes(source.id) && isSourceStale(source, asOf),
  );

  return (
    <div className="mt-2 space-y-3 break-words">
      {cell.claims.length === 0 ? (
        <p className="text-muted-foreground">
          Unknown. No current sourced claim. Missing evidence does not mean the
          capability is absent.
        </p>
      ) : null}
      {(cell.supersededClaims?.length ?? 0) > 0 ? (
        <div className="space-y-2">
          <p className="text-sm font-medium">
            Corrected / superseded evidence: {cell.supersededClaims!.length}{" "}
            previous statement(s) excluded from this result.
          </p>
          <details className="rounded-md border border-border p-2">
            <summary className="min-h-11 cursor-pointer py-2 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
              Superseded history
              <span className="sr-only">
                {" "}
                for {productName}: {capabilityName}
              </span>
            </summary>
            <ul className="mt-2 space-y-3">
              {cell.supersededClaims!.map((claim) => (
                <li key={claim.id} className="space-y-1 text-sm">
                  <p>{claim.statement}</p>
                  <p>
                    Superseded · excluded from current evidence ·{" "}
                    {sourceTypeLabel(claim.sourceType)}
                  </p>
                  <p>
                    Observed: {claim.observedAt} · Last checked:{" "}
                    {claim.lastCheckedAt}
                  </p>
                  <a
                    href={claim.sourceUrl}
                    className="inline-flex min-h-11 items-center text-primary underline focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    Original source for superseded statement
                  </a>
                  {claim.notes ? <p>Qualification: {claim.notes}</p> : null}
                </li>
              ))}
            </ul>
          </details>
        </div>
      ) : null}
      {cell.claims.length > 0 ? (
        <>
          {/* The answer first: the first current statement, clamped; full text stays in the sources. */}
          <p className="line-clamp-3 text-sm leading-5">{cell.claims[0].statement}</p>
          <p className="text-xs text-muted-foreground">
            {cell.claims.some((claim) => claim.verificationStatus === "verified")
              ? "Reviewed · independent source"
              : cell.claims.some(
                    (claim) => claim.verificationStatus === "vendor_published",
                  )
                ? "Vendor-reported; not independently validated"
                : verificationLabel(cell.claims[0].verificationStatus)}{" "}
            · {cell.claims.length} {cell.claims.length === 1 ? "claim" : "claims"},{" "}
            {sourceIds.length} {sourceIds.length === 1 ? "source" : "sources"} ·
            checked {latestCheck(cell.claims)}
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
            <p className="text-sm font-medium">
              Stale: Source refresh due at this comparison date. Recheck{" "}
              {stale.map((source) => source.title).join(", ")} before relying on
              this evidence.
            </p>
          ) : null}
          {missingSources.length > 0 ? (
            <p className="text-sm font-medium">
              Source freshness unavailable. The source registry entry is
              missing; review required.
            </p>
          ) : null}
          <details className="rounded-md border border-border p-2">
            <summary className="min-h-11 cursor-pointer py-2 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
              Supporting sources ({cell.claims.length})
              <span className="sr-only">
                {" "}
                for {productName}: {capabilityName}
              </span>
            </summary>
            <ul className="mt-2 space-y-4">
              {cell.claims.map((claim) => {
                const source = sources.find(
                  (entry) => entry.id === claim.sourceId,
                );
                return (
                  <li key={claim.id} className="space-y-2">
                    <p>{claim.statement}</p>
                    <p className="text-xs">
                      Review state:{" "}
                      {verificationLabel(claim.verificationStatus)} ·{" "}
                      {sourceTypeLabel(claim.sourceType)} · {claim.polarity}
                    </p>
                    <a
                      className="inline-block min-h-11 py-2 text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      href={claim.sourceUrl}
                    >
                      {source?.title || "Open source"}
                      <span className="sr-only">
                        {" "}
                        for {productName}: {claim.statement}
                      </span>
                    </a>
                    {source && <Link href={`/sources?claim=${encodeURIComponent(claim.id)}`} className="ml-3 inline-flex min-h-11 items-center text-primary underline underline-offset-4">View ledger entry</Link>}
                    <dl className="space-y-1 text-xs text-muted-foreground">
                      <div>
                        <dt className="inline font-medium">Publisher: </dt>
                        <dd className="inline">
                          {source?.publisher ?? "Registry entry unavailable"}
                        </dd>
                      </div>
                      <div>
                        <dt className="inline font-medium">Retrieved: </dt>
                        <dd className="inline">
                          {source?.retrievedAt ?? "Registry entry unavailable"}
                        </dd>
                      </div>
                      <div>
                        <dt className="inline font-medium">Observed: </dt>
                        <dd className="inline">{claim.observedAt}</dd>
                      </div>
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
                    {source?.excerpt ? (
                      <figure className="border-l-2 border-border pl-2 text-sm">
                        <figcaption className="font-medium">
                          Source excerpt
                        </figcaption>
                        <blockquote>{source.excerpt}</blockquote>
                      </figure>
                    ) : null}
                    {claim.notes ? (
                      <p className="border-l-2 border-border pl-2 text-sm">
                        <strong>Qualification: </strong>
                        {claim.notes}
                      </p>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </details>
        </>
      ) : null}
    </div>
  );
}

function latestCheck(claims: { lastCheckedAt: string }[]): string {
  return claims.map((claim) => claim.lastCheckedAt).sort().at(-1) ?? "date not recorded";
}

/** One always-visible note for the whole comparison, instead of repeating it in every cell. */
export function ComparisonLimits() {
  return (
    <p className="mt-3 text-sm leading-6 text-muted-foreground">
      <strong>Limits: </strong>Claims describe the cited scope at the recorded
      date. Vendor statements are not independent validation. Verify current
      edition, deployment and availability before a decision. Unknown means no
      current sourced claim, not that the capability is absent.
    </p>
  );
}
