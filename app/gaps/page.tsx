import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageIntro } from "@/components/chrome";
import { catalog } from "@/lib/catalog";
import { gapReport, gapSummary } from "@/lib/gap-report";

export const metadata = { title: "Research gaps" };

const SEVERITY_ORDER = { high: 0, medium: 1, low: 2 } as const;

export default function GapsPage() {
  const gaps = gapReport(catalog, new Date(`${catalog.asOf}T00:00:00Z`));
  const groups = gapSummary(gaps).sort(
    (a, b) => SEVERITY_ORDER[a.items[0].severity] - SEVERITY_ORDER[b.items[0].severity] || b.count - a.count,
  );
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumbs parents={[{ href: "/", label: "Home" }]} current="Research gaps" />
      <PageIntro
        kicker="Research gaps"
        title="What the map doesn't know yet"
        lede={`Computed from the typed data as of ${catalog.asOf}. Nothing here is fixed automatically; each gap is a research or review task.`}
      />
      <p className="mt-4 text-sm">
        {gaps.length} gaps. Machine-readable at <code>/api/gaps</code>; the full graph is at <code>/api/evidence-graph?slice=market-map</code>.
      </p>
      <div className="mt-8 space-y-6 text-sm leading-6">
        {groups.map((group) => (
          <details key={group.kind} className="rounded-lg border border-border p-3" open={group.items[0].severity === "high"}>
            <summary className="min-h-11 cursor-pointer py-2 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
              {group.label} · {group.count} <span className="text-muted-foreground">({group.items[0].severity})</span>
            </summary>
            <ul className="mt-2 space-y-1">
              {group.items.map((gap) => (
                <li key={`${gap.kind}-${gap.subjectId}-${gap.message}`}>{gap.message}</li>
              ))}
            </ul>
          </details>
        ))}
      </div>
      <nav aria-label="Broaden" className="mt-10 flex flex-wrap gap-4 text-sm">
        <Link href="/personas" className="underline underline-offset-4">Buyer seats</Link>
        <Link href="/landscape" className="underline underline-offset-4">Landscape</Link>
      </nav>
    </main>
  );
}
