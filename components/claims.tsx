import Link from "next/link";
import { StatusPill } from "@/components/chrome";
import { formatDate } from "@/lib/format";
import type { Claim, Distinction } from "@/lib/schema";

export function ClaimList({ claims }: { claims: Claim[] }) {
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
            <StatusPill status={claim.verificationStatus} />
            <StatusPill status={claim.sourceType} />
            <span className="text-xs text-muted-foreground">
              {claim.publishedAt ? `Published ${formatDate(claim.publishedAt)} · ` : ""}
              Checked {formatDate(claim.lastCheckedAt)}
            </span>
          </div>
          <p className="mt-3 text-sm leading-6">{claim.statement}</p>
          {claim.notes ? <p className="mt-2 text-sm leading-6 text-muted-foreground">{claim.notes}</p> : null}
          <a
            href={claim.sourceUrl}
            className="mt-3 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Open source
          </a>
        </li>
      ))}
    </ul>
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
