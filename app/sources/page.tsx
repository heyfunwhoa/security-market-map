import Link from "next/link";
import { ClaimList } from "@/components/claims";
import { PageIntro, StatusPill } from "@/components/chrome";
import { SourceIntake } from "@/components/source-intake";
import { ResearchPanelLive } from "@/components/research-panel-live";
import { catalog } from "@/lib/catalog";
import { conflictingClaims, reviewQueue, staleSources } from "@/lib/coverage";
import { formatDate, sourceTypeLabel } from "@/lib/format";
import { firecrawlAdapter, exaAdapter } from "@/lib/ingestion/adapters";
import { previewHashicorpMonitor } from "@/lib/research/vendor-monitor";

export const metadata = { title: "Sources" };

type LedgerParams = Record<string, string | string[] | undefined>;
const pageSize = 25;
const linkStyle = "inline-flex min-h-11 items-center text-primary underline underline-offset-4 aria-[current=page]:font-bold";

export default async function SourcesPage({ searchParams }: { searchParams: Promise<LedgerParams> }) {
  const params = await searchParams;
  const text = typeof params.q === "string" ? params.q.trim() : "";
  const needle = text.toLowerCase();
  const types = [...new Set(catalog.sources.map((source) => source.sourceType))].sort();
  const type = types.find((value) => value === params.type) ?? "";
  const claim = catalog.claims.find((item) => item.id === params.claim);
  const sourceId = claim?.sourceId ?? (typeof params.source === "string" ? params.source : "");
  const reviewing = params.view === "review";
  const filtered = catalog.sources.filter((source) =>
    (!sourceId || source.id === sourceId) && (!type || source.sourceType === type) &&
    (!needle || [source.title, source.publisher, source.author, source.url, source.excerpt]
      .some((value) => value?.toLowerCase().includes(needle))));
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const requestedPage = Number(params.page);
  const page = Number.isSafeInteger(requestedPage) ? Math.min(pages, Math.max(1, requestedPage)) : 1;
  const start = (page - 1) * pageSize;
  function pageUrl(next: number) {
    const query = new URLSearchParams({ page: String(next) });
    if (text) query.set("q", text);
    if (type) query.set("type", type);
    if (sourceId) query.set("source", sourceId);
    return `/sources?${query}`;
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro kicker="Research" title={reviewing ? "Review research evidence" : "Find a source"}
        lede={reviewing ? "Check freshness, conflicts and research awaiting review." : "Find the original publication, its date, and the passage behind a claim."} />
      <nav aria-label="Source views" className="my-4 flex flex-wrap gap-5 border-b border-border">
        <Link href="/sources" aria-current={!reviewing ? "page" : undefined} className={linkStyle}>Source ledger</Link>
        <Link href="/sources?view=review" aria-current={reviewing ? "page" : undefined} className={linkStyle}>Research review</Link>
      </nav>
      {reviewing ? <ResearchReview /> : <>
        {claim && <section aria-label="Selected claim" className="my-5"><h2 className="mb-3 text-2xl">Selected claim</h2><ClaimList claims={[claim]} /></section>}
        <form action="/sources" className="flex flex-wrap items-end gap-3">
          <label className="min-w-0 grow text-sm font-semibold" htmlFor="source-search">Search by title, publisher or keyword
            <input id="source-search" name="q" type="search" defaultValue={text} className="mt-1 block min-h-11 w-full rounded-md border border-input bg-card px-3" />
          </label>
          <label className="text-sm font-semibold" htmlFor="source-type">Source type
            <select id="source-type" name="type" defaultValue={type} className="mt-1 block min-h-11 rounded-md border border-input bg-card px-2">
              <option value="">All types</option>
              {types.map((value) => <option key={value} value={value}>{sourceTypeLabel(value)}</option>)}
            </select>
          </label>
          <button className="min-h-11 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground">Search sources</button>
        </form>
        <p className="mt-4 text-sm" role="status">
          {filtered.length ? `Showing ${start + 1}–${Math.min(start + pageSize, filtered.length)} of ${filtered.length} sources` : "No matching sources."}
          {(sourceId || text || type) && <Link href="/sources" className={`${linkStyle} ml-3`}>Show all sources</Link>}
        </p>
        <section tabIndex={0} aria-label="Source results" className="mt-3 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm sm:min-w-[40rem]">
            <thead className="bg-muted/60 text-left">
              <tr>
                <th scope="col" className="p-3">Source</th>
                <th scope="col" className="hidden p-3 sm:table-cell">Type</th>
                <th scope="col" className="hidden p-3 sm:table-cell">Retrieved</th>
                <th scope="col" className="hidden p-3 sm:table-cell">Volatility</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(start, start + pageSize).map((source) => (
                <tr key={source.id} className="border-t border-border align-top">
                  <td className="p-3">
                    <a className="font-medium text-primary hover:underline [overflow-wrap:anywhere]" href={source.url}>
                      {source.title}
                    </a>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {source.author ?? "Author not recorded"}
                      {source.publishedAt ? ` · published ${formatDate(source.publishedAt)}` : ""}
                      {` · accessed ${formatDate(source.retrievedAt)}`}
                    </p>
                    <p className="mt-1 text-muted-foreground [overflow-wrap:anywhere]">{source.excerpt}</p>
                    <p className="mt-2 text-xs text-muted-foreground sm:hidden">{sourceTypeLabel(source.sourceType)} · {source.volatility} volatility</p>
                  </td>
                  <td className="hidden p-3 sm:table-cell">
                    <StatusPill status={source.sourceType} />
                    <p className="mt-1 text-xs text-muted-foreground">{sourceTypeLabel(source.sourceType)}</p>
                  </td>
                  <td className="hidden p-3 sm:table-cell">{formatDate(source.retrievedAt)}</td>
                  <td className="hidden p-3 sm:table-cell">{source.volatility}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {pages > 1 && <nav aria-label="Source pages" className="mt-3 flex flex-wrap items-center gap-4">
          {page > 1 && <Link href={pageUrl(page - 1)} className={linkStyle}>Previous page</Link>}
          <span className="text-sm">Page {page} of {pages}</span>
          {page < pages && <Link href={pageUrl(page + 1)} className={linkStyle}>Next page</Link>}
        </nav>}
      </>}
    </main>
  );
}

async function ResearchReview() {
  const monitor = await previewHashicorpMonitor();
  const stale = staleSources(catalog.sources, catalog.asOf);
  const queue = reviewQueue(catalog.claims);
  const conflicts = conflictingClaims(catalog.claims);
  const firecrawl = firecrawlAdapter.configured();
  const exa = exaAdapter.configured();

  return <>
      <ResearchPanelLive initial={monitor} />
      <section className="mt-10">
        <h2 className="text-2xl">Stale evidence</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Fast sources go stale 30 days after they were retrieved, moderate after 120, stable after 365. Ages are
          measured against the catalog date, {formatDate(catalog.asOf)}, not today&apos;s date: this page is built
          ahead of time and does not re-check sources.
        </p>
        <ul className="mt-3 space-y-2 text-sm">
          {stale.map((source) => (
            <li key={source.id}>
              <a className="text-primary hover:underline" href={source.url}>
                {source.title}
              </a>{" "}
              <span className="text-muted-foreground">
                retrieved {formatDate(source.retrievedAt)}, {source.volatility}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl">Review queue</h2>
        <div className="mt-3">
          <ClaimList claims={queue} />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl">Conflicts, side by side</h2>
        <div className="mt-3">
          <ClaimList claims={conflicts} />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl">Ingestion adapters</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Firecrawl is {firecrawl ? "configured" : "not configured"}. Exa is {exa ? "configured" : "not configured"}.
          Keys belong in environment variables. A future job may discover pages, hash them, and wait for a
          person. This page does not start that job.
        </p>
        <div className="mt-4">
          <SourceIntake />
        </div>
      </section>
  </>;
}
