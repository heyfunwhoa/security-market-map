import { ClaimList } from "@/components/claims";
import { PageIntro, StatusPill } from "@/components/chrome";
import { SourceIntake } from "@/components/source-intake";
import { catalog } from "@/lib/catalog";
import { conflictingClaims, reviewQueue, staleSources } from "@/lib/coverage";
import { formatDate, sourceTypeLabel } from "@/lib/format";
import { firecrawlAdapter, exaAdapter } from "@/lib/ingestion/adapters";

export const metadata = { title: "Sources" };

export default function SourcesPage() {
  const stale = staleSources(catalog.sources, catalog.asOf);
  const queue = reviewQueue(catalog.claims);
  const conflicts = conflictingClaims(catalog.claims);
  const firecrawl = firecrawlAdapter.configured();
  const exa = exaAdapter.configured();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro
        kicker="Sources"
        title="The ledger, the stale pile, and the conflicts"
        lede="Every published claim in the atlas points here. Recrawl windows are short for marketing pages and longer for standards. Adapters for Firecrawl and Exa exist and are not called when the app starts."
      />

      <section className="mt-8 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[40rem] text-sm">
          <thead className="bg-muted/60 text-left">
            <tr>
              <th className="p-3">Source</th>
              <th className="p-3">Type</th>
              <th className="p-3">Retrieved</th>
              <th className="p-3">Volatility</th>
            </tr>
          </thead>
          <tbody>
            {catalog.sources.map((source) => (
              <tr key={source.id} className="border-t border-border align-top">
                <td className="p-3">
                  <a className="font-medium text-primary hover:underline" href={source.url}>
                    {source.title}
                  </a>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {source.author ?? "Author not recorded"}
                    {source.publishedAt ? ` · published ${formatDate(source.publishedAt)}` : ""}
                    {` · accessed ${formatDate(source.retrievedAt)}`}
                  </p>
                  <p className="mt-1 text-muted-foreground">{source.excerpt}</p>
                </td>
                <td className="p-3">
                  <StatusPill status={source.sourceType} />
                  <p className="mt-1 text-xs text-muted-foreground">{sourceTypeLabel(source.sourceType)}</p>
                </td>
                <td className="p-3">{formatDate(source.retrievedAt)}</td>
                <td className="p-3">{source.volatility}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl">Stale evidence</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Fast sources go stale after 30 days, moderate after 120, stable after 365. Today is{" "}
          {formatDate(catalog.asOf)}.
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
    </main>
  );
}
