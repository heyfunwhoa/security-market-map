import Link from "next/link";
import { SourceBadge } from "@/components/source-badge";
import { sourceById } from "@/lib/catalog";
import { noteWithoutCaveat } from "@/lib/claim-basis";
import { formatDate, sourceTypeLabel } from "@/lib/format";
import type { Claim, Distinction } from "@/lib/schema";

export function ClaimList({ claims, labels }: { claims: Claim[]; labels?: Record<string, string> }) {
  if (claims.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border px-4 py-6 text-sm text-muted-foreground">
        No claims in this seed. That is a gap, not a verdict that the product lacks the capability.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {claims.map((claim) => (
        <li key={claim.id} className="rounded-xl border border-border bg-card p-4">
          <div className="flex flex-wrap items-center gap-2">
            <SourceBadge claim={claim} />
            {labels?.[claim.id] ? (
              <span className="rounded-full border border-border px-2 py-0.5 text-xs font-medium">{labels[claim.id]}</span>
            ) : null}
            <span className="text-xs text-muted-foreground">
              {claim.publishedAt ? `Published ${formatDate(claim.publishedAt)} · ` : ""}
              Checked {formatDate(claim.lastCheckedAt)}
            </span>
          </div>
          <p className="mt-3 text-sm leading-6">{claim.statement}</p>
          {noteWithoutCaveat(claim.notes) ? (
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{noteWithoutCaveat(claim.notes)}</p>
          ) : null}
          <ClaimSource claim={claim} />
        </li>
      ))}
    </ul>
  );
}

/**
 * Names the source in the link instead of a bare "Open source", and keeps the registry details
 * (publisher, type, dates, excerpt) one native disclosure away. Works with keyboard and touch;
 * nothing depends on hover. Adapted from the evidence block in components/comparison-evidence.tsx.
 */
// Registry titles keep the publisher's punctuation; visible copy avoids em dashes.
function displayTitle(title: string): string {
  return title.replace(/\s*\u2014\s*/g, ": ");
}

function ClaimSource({ claim }: { claim: Claim }) {
  const source = sourceById(claim.sourceId);
  return (
    <div className="mt-3 text-sm">
      <a
        href={claim.sourceUrl}
        className="inline-block font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {source ? `${source.publisher}: ${displayTitle(source.title)}` : "Open source"}
        <span className="sr-only"> (original source for this claim)</span>
      </a>
      {source ? (
        <details className="mt-2 rounded-md border border-border px-3 py-2">
          <summary className="cursor-pointer text-xs font-medium text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
            Source details
          </summary>
          <dl className="mt-2 space-y-1 text-xs text-muted-foreground">
            <div>
              <dt className="inline font-medium">Type: </dt>
              <dd className="inline">{sourceTypeLabel(source.sourceType)}</dd>
            </div>
            {source.author ? (
              <div>
                <dt className="inline font-medium">Author: </dt>
                <dd className="inline">{source.author}</dd>
              </div>
            ) : null}
            <div>
              <dt className="inline font-medium">Published: </dt>
              <dd className="inline">{source.publishedAt ? formatDate(source.publishedAt) : "Not stated"}</dd>
            </div>
            <div>
              <dt className="inline font-medium">Retrieved: </dt>
              <dd className="inline">{formatDate(source.retrievedAt)}</dd>
            </div>
          </dl>
          {source.excerpt ? (
            <figure className="mt-2 border-l-2 border-border pl-2">
              <figcaption className="text-xs font-medium">Registry summary of this source (paraphrased; the claim above may cite a different passage)</figcaption>
              <blockquote className="text-sm leading-6 text-muted-foreground">{source.excerpt}</blockquote>
            </figure>
          ) : null}
        </details>
      ) : null}
    </div>
  );
}

export function DistinctionCards({ items }: { items: Distinction[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {items.map((item) => (
        <article key={item.id} className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-2xl tracking-tight">{item.title}</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.lede}</p>
          <dl className="mt-4 space-y-3">
            {item.rows.map((row) => (
              <div key={row.label}>
                <dt className="text-sm font-semibold">{row.label}</dt>
                <dd className="text-sm leading-6 text-muted-foreground">{row.body}</dd>
              </div>
            ))}
          </dl>
        </article>
      ))}
    </div>
  );
}

export function RelatedLinks({
  hrefs,
}: {
  hrefs: { href: string; label: string; meta?: string }[];
}) {
  if (hrefs.length === 0) return null;
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {hrefs.map((item) => (
        <li key={item.href + item.label}>
          <Link
            href={item.href}
            className="block rounded-lg border border-border bg-card px-3 py-2 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="font-medium">{item.label}</span>
            {item.meta ? <span className="mt-0.5 block text-sm text-muted-foreground">{item.meta}</span> : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}
