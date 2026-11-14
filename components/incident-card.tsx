import Link from "next/link";
import { StatusPill } from "@/components/chrome";
import { formatDate } from "@/lib/format";
import { ecosystemLabel, INCIDENT_KIND_LABELS, type FeedIncident } from "@/lib/incident-feed";

/** Card order: what/when/status → title → summary → talk track → evidence footer. */
export function IncidentCard({ item }: { item: FeedIncident }) {
  const { incident, sources, salesNote } = item;
  const titleId = `incident-${item.slug}`;
  return (
    <article aria-labelledby={titleId} className="rounded-xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <p className="text-xs font-semibold tracking-[0.12em] text-primary uppercase">
          {INCIDENT_KIND_LABELS[incident.kind]} · Disclosed {formatDate(incident.disclosedOn)}
        </p>
        <StatusPill status={incident.reviewStatus} />
      </div>
      <h2 id={titleId} className="mt-2 text-xl leading-snug tracking-tight">
        <Link
          href={`/incidents/${item.slug}`}
          className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {incident.title}
        </Link>
      </h2>
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{incident.summary}</p>

      <div className="mt-4 border-l-2 border-primary/40 pl-3">
        <p className="flex flex-wrap items-center gap-2 text-xs font-semibold text-foreground">
          Talk track {salesNote && <StatusPill status={salesNote.status} />}
        </p>
        <p className="mt-1 text-sm leading-6">{salesNote ? salesNote.headline : "No talk track yet."}</p>
      </div>

      <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-3 text-sm">
        <div>
          <dt className="sr-only">Sources</dt>
          <dd>
            <span className="text-muted-foreground">Source{sources.length > 1 ? "s" : ""}: </span>
            {sources.map((source, index) => (
              <span key={source.id}>
                {index > 0 && "; "}
                {source.publisher}, {formatDate(source.publishedOn)}
              </span>
            ))}
          </dd>
        </div>
        <div>
          <dt className="sr-only">Ecosystems</dt>
          <dd>{incident.affectedEcosystems.map(ecosystemLabel).join(", ") || "Ecosystem not stated"}</dd>
        </div>
        <div>
          <dt className="inline text-muted-foreground">ATT&CK: </dt>
          <dd className="inline">{incident.techniqueIds.length ? incident.techniqueIds.join(", ") : "Not evaluated"}</dd>
        </div>
        {incident.uncertaintyNotes.length > 0 && (
          <div>
            <dt className="sr-only">Open questions</dt>
            <dd>
              {incident.uncertaintyNotes.length} open question{incident.uncertaintyNotes.length > 1 ? "s" : ""}
            </dd>
          </div>
        )}
      </dl>
    </article>
  );
}

export function IncidentCardList({ items }: { items: FeedIncident[] }) {
  return (
    <ol className="mt-6 space-y-4">
      {items.map((item) => (
        <li key={item.slug}>
          <IncidentCard item={item} />
        </li>
      ))}
    </ol>
  );
}
