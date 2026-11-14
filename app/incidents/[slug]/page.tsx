import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { StatusPill } from "@/components/chrome";
import { CopyTalkTrack } from "@/components/copy-talk-track";
import { formatDate } from "@/lib/format";
import {
  ecosystemLabel,
  INCIDENT_KIND_LABELS,
  incidentBySlug,
  incidentFeed,
  incidentFilterUrl,
  sourceTypeLabel,
  talkTrackText,
} from "@/lib/incident-feed";

export function generateStaticParams() {
  return incidentFeed.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: incidentBySlug(slug)?.incident.title ?? "Incident" };
}

const linkClass =
  "rounded-sm text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export default async function IncidentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = incidentBySlug(slug);
  if (!item) notFound();
  const { incident, sources, salesNote } = item;
  const copyText = talkTrackText(item);
  const noteSources = salesNote ? sources.filter((source) => salesNote.basedOnSourceIds.includes(source.id)) : [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumbs parents={[{ href: "/", label: "Home" }, { href: "/incidents", label: "Incidents" }]} current={incident.title} />
      <header className="max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">{INCIDENT_KIND_LABELS[incident.kind]}</p>
        <h1 className="mt-2 text-3xl tracking-tight text-balance sm:text-4xl">{incident.title}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <StatusPill status={incident.reviewStatus} />
          <StatusPill status={incident.epistemicStatus} />
          <span>Disclosed {formatDate(incident.disclosedOn)}</span>
          <span aria-hidden="true">·</span>
          <span>Occurred: {incident.occurredOn ? formatDate(incident.occurredOn) : "not stated"}</span>
          <span aria-hidden="true">·</span>
          <span>Last reviewed {formatDate(incident.lastReviewedOn)}</span>
        </div>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <aside aria-labelledby="talk-track" className="h-fit rounded-xl border border-border bg-card p-5 lg:order-2">
          <h2 id="talk-track" className="flex flex-wrap items-center gap-2 text-lg font-semibold">
            Talk track {salesNote && <StatusPill status={salesNote.status} />}
          </h2>
          {salesNote ? (
            <>
              {salesNote.status === "draft" && (
                <p className="mt-2 text-xs text-muted-foreground">Drafted {formatDate(salesNote.draftedOn)}. Not editorially reviewed yet.</p>
              )}
              <p className="mt-3 leading-7">{salesNote.headline}</p>
              <dl className="mt-3 space-y-3 text-sm">
                <div>
                  <dt className="font-semibold">Ask</dt>
                  <dd className="mt-1">{salesNote.discoveryQuestion}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Avoid</dt>
                  <dd className="mt-1">{salesNote.avoid}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Based on</dt>
                  <dd className="mt-1">
                    {noteSources.map((source) => `${source.publisher}, ${formatDate(source.publishedOn)}`).join("; ")}
                  </dd>
                </div>
              </dl>
              {copyText && <div className="mt-4"><CopyTalkTrack text={copyText} /></div>}
            </>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">No talk track yet.</p>
          )}
        </aside>

        <div className="space-y-8 lg:order-1">
          <section aria-labelledby="reported">
            <h2 id="reported" className="text-lg font-semibold">What was reported</h2>
            <p className="mt-2 leading-7">{incident.summary}</p>
          </section>

          <section aria-labelledby="unknowns">
            <h2 id="unknowns" className="text-lg font-semibold">What is not known</h2>
            {incident.uncertaintyNotes.length ? (
              <ul className="mt-2 list-disc space-y-1 pl-6 leading-7">
                {incident.uncertaintyNotes.map((note) => <li key={note}>{note}</li>)}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">No open questions recorded. That does not mean the record is complete.</p>
            )}
          </section>

          <section aria-labelledby="sources">
            <h2 id="sources" className="text-lg font-semibold">Sources ({sources.length})</h2>
            <ul className="mt-3 space-y-3">
              {sources.map((source) => (
                <li key={source.id} className="rounded-lg border border-border p-4 text-sm">
                  <p className="font-semibold">
                    {source.publisher} <span className="font-normal text-muted-foreground">· {sourceTypeLabel(source.type)}</span>
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    Published {formatDate(source.publishedOn)} · Reviewed {formatDate(source.lastReviewedOn)}
                  </p>
                  {source.rightsNote && <p className="mt-1 text-muted-foreground">Rights: {source.rightsNote}</p>}
                  <a href={source.url} className={`mt-2 inline-block break-all ${linkClass}`} rel="noreferrer">
                    Open source<span className="sr-only"> from {source.publisher} (external site)</span> ↗
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="classification">
            <h2 id="classification" className="text-lg font-semibold">Classification</h2>
            <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-muted-foreground">MITRE ATT&CK</dt>
                <dd className="mt-1">
                  {incident.techniqueIds.length ? incident.techniqueIds.join(", ") : <StatusPill status="not_evaluated" />}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Ecosystems</dt>
                <dd className="mt-1">{incident.affectedEcosystems.map(ecosystemLabel).join(", ") || "Not stated"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Packages</dt>
                <dd className="mt-1">{incident.packageIds.length ? incident.packageIds.join(", ") : "None linked"}</dd>
              </div>
            </dl>
            <p className="mt-3 text-sm text-muted-foreground">
              Techniques are listed only after a sourced mapping review. “Not evaluated” means nobody has reviewed it yet,
              not that the technique was absent.
            </p>
          </section>
        </div>
      </div>

      <nav aria-label="Back to incidents" className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-4 text-sm">
        <Link href="/incidents" className={linkClass}>← All incidents</Link>
        {incident.affectedEcosystems.map((ecosystem) => (
          <Link key={ecosystem} href={incidentFilterUrl({ kind: "all", ecosystem })} className={linkClass}>
            ← More {ecosystemLabel(ecosystem)} incidents
          </Link>
        ))}
      </nav>
    </main>
  );
}
