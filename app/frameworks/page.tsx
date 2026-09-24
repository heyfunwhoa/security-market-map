import Link from "next/link";
import { PageIntro } from "@/components/chrome";
import { ecpZones, gatewayTradeoff, nhiLifecycle, REVIEWED } from "@/lib/data/brief";

export const metadata = { title: "Emerging frameworks" };

export default function FrameworksPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro
        kicker="Emerging frameworks"
        title="SACR frameworks, labeled as SACR frameworks"
        lede="ARISE and Endpoint Control and Prevention come from Software Analyst Cyber Research. They are not Gartner categories. The NHI lifecycle below is a buyer checklist. The 2024 vendor landscape in that guide needs a current check."
      />
      <p className="mt-4 text-sm text-muted-foreground">Reviewed {REVIEWED}.</p>

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
          Source: SACR and Kevin He, 18 Mar 2026.{" "}
          <a className="text-primary hover:underline" href="https://softwareanalyst.substack.com/p/runtime-security-for-ai-agents-an">
            Runtime security for AI agents
          </a>
          .
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl tracking-tight">Endpoint control zones</h2>
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
          Source: SACR, Lawrence Pingree, and Francis Odum, 22 Jul 2026.{" "}
          <a className="text-primary hover:underline" href="https://softwareanalyst.substack.com/p/the-ciso-guide-to-endpoint-control">
            The CISO guide to endpoint control and prevention
          </a>
          .
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
