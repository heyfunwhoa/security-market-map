import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageIntro } from "@/components/chrome";
import { seats } from "@/lib/persona-graph";
import { FUNCTION_LABEL, FUNCTION_ORDER, humanize } from "@/lib/persona-labels";
import { acronymGlossary } from "@/lib/data/titles";

export const metadata = { title: "Buyer seats" };

export default function PersonasPage() {
  const all = seats();
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumbs parents={[{ href: "/", label: "Home" }]} current="Buyer seats" />
      <PageIntro
        kicker="Buyer seats"
        title="Who buys, uses, approves, and blocks"
        lede="Security and non-security seats, grouped by function. Open a seat for its pains, titles by level, who covers it at each company size, and the categories it touches. Pains marked hypothesis still need discovery."
      />
      <div className="mt-8 space-y-10">
        {FUNCTION_ORDER.map((fn) => {
          const group = all.filter((seat) => seat.profile.function === fn);
          if (group.length === 0) return null;
          return (
            <section key={fn} aria-labelledby={`fn-${fn}`}>
              <h2 id={`fn-${fn}`} className="text-2xl">
                {FUNCTION_LABEL[fn]} <span className="text-base text-muted-foreground">({group.length})</span>
              </h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {group.map((seat) => {
                  const acronyms = acronymGlossary.filter((entry) => entry.seatIds.includes(seat.id)).map((entry) => entry.acronym);
                  return (
                    <li key={seat.id}>
                      <Link
                        href={`/personas/${seat.id}`}
                        className="block h-full min-h-11 rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      >
                        <span className="font-medium">{seat.name}</span>
                        {acronyms.length > 0 ? <span className="text-muted-foreground"> · {acronyms.slice(0, 3).join(", ")}</span> : null}
                        <span className="mt-1 block text-muted-foreground">{humanize(seat.profile.cluster)}</span>
                        <span className="mt-1 block">{seat.profile.pains[0]?.pain}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </main>
  );
}
