import Link from "next/link";
import { PageIntro } from "@/components/chrome";
import { ecpZones, gatewayTradeoff, nhiLifecycle, REVIEWED } from "@/lib/data/brief";

export const metadata = { title: "Emerging frameworks" };

export default function FrameworksPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro
        kicker="Emerging frameworks"
        title="Pages from Software Analyst Cyber Research"
        lede="Two sentences on this map come from pages re-read on 27 Oct 2026. Agentic runtime is the 3 Sep 2026 report. Endpoint control is the 22 Jul 2026 report. They are not Gartner categories. The NHI checklist cites a 27 Sep 2024 page. Lists on this page are not capability cells."
      />
      <p className="mt-4 text-sm text-muted-foreground">Reviewed {REVIEWED}. That label is not a review of the sentences re-read on 27 Oct 2026.</p>
      <p className="mt-4"><Link href="/frameworks/incident-lab" className="inline-flex rounded-lg border border-border px-4 py-2 text-sm font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2">Open synthetic incident classification lab</Link></p>

      <section className="mt-10">
        <h2 className="text-2xl tracking-tight">NHI lifecycle</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Source: SACR, 27 Sep 2024,{" "}
          <a className="text-primary hover:underline" href="https://softwareanalyst.substack.com/p/the-complete-guide-to-the-growing">
            The complete guide to the growing impact of non-human identities
          </a>
          . Author byline: SACR.
        </p>
        <ol className="mt-4 grid gap-3 md:grid-cols-2">
          {nhiLifecycle.map((item, index) => (
            <li key={item.step} className="rounded-xl border border-border p-4 text-sm leading-6">
              <p className="font-semibold">
                {index + 1}. {item.step}
              </p>
              <p className="mt-1">{item.question}</p>
              <p className="mt-2 text-muted-foreground">{item.stale}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl tracking-tight">Gateway enforcement and direct-access monitoring</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <article className="rounded-xl border border-border p-4 text-sm leading-6">
            <h3 className="font-semibold">Gateway</h3>
            <p className="mt-2">{gatewayTradeoff.gateway}</p>
          </article>
          <article className="rounded-xl border border-border p-4 text-sm leading-6">
            <h3 className="font-semibold">Direct access</h3>
            <p className="mt-2">{gatewayTradeoff.direct}</p>
          </article>
          <article className="rounded-xl border border-primary/40 p-4 text-sm leading-6">
            <h3 className="font-semibold">Tradeoff</h3>
            <p className="mt-2">{gatewayTradeoff.both}</p>
          </article>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Source re-read 27 Oct 2026: SACR, 18 Mar 2026, updated 29 Jul 2026,{" "}
          <a className="text-primary hover:underline" href="https://softwareanalyst.io/reports/the-runtime-enforcement-challenge-and-the-emerging-vendor-landscape">
            The runtime enforcement challenge
          </a>
          . The page does not name shadow agents, and it does not fill a block cell. An earlier Substack URL was not the page re-read that day.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl tracking-tight">Endpoint control labels</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          These five labels are this map&apos;s reading. They were not copied into capability cells.
          The report did not rank products and did not say this replaces endpoint detection.
        </p>
        <ol className="mt-4 grid gap-3 md:grid-cols-2">
          {ecpZones.map((zone, index) => (
            <li key={zone.zone} className="rounded-xl border border-border p-4 text-sm leading-6">
              <span className="font-semibold">
                {index + 1}. {zone.zone}.{" "}
              </span>
              {zone.meaning}
            </li>
          ))}
        </ol>
        <p className="mt-3 text-sm text-muted-foreground">
          Source re-read 27 Oct 2026: SACR, Francis Odum and Lawrence Pingree, 22 Jul 2026, updated 29 Jul 2026,{" "}
          <a className="text-primary hover:underline" href="https://softwareanalyst.io/reports/the-ciso-guide-to-endpoint-control-and-prevention-ecp-the-next-architecture-for-endpoint-security">
            The CISO guide to endpoint control and prevention
          </a>
          . The sentence kept from that page is on the endpoint-control category. An earlier Substack URL was not the page re-read that day.
        </p>
      </section>

      <p className="mt-8 text-sm">
        <Link href="/case-studies/cyera-oasis" className="text-primary hover:underline">
          Cyera and Oasis case study
        </Link>
      </p>
    </main>
  );
}
