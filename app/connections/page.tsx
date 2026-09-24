import Link from "next/link";
import { PageIntro } from "@/components/chrome";
import {
  capabilityBands,
  companyLenses,
  credentialChain,
  groups,
  identityKinds,
  nhiTypes,
  owaspRisks,
  readings,
  segments,
  type SeedLink,
} from "@/lib/data/connections";

export const metadata = { title: "Connections" };

function SeedLinks({ items }: { items: SeedLink[] }) {
  return (
    <span>
      {items.map((item, index) => (
        <span key={`${item.label}-${item.href ?? "plain"}`}>
          {index > 0 ? ", " : null}
          {item.href ? (
            <Link href={item.href} className="text-primary hover:underline">
              {item.label}
            </Link>
          ) : (
            <span>
              {item.label}
              <span className="text-muted-foreground"> (not seeded)</span>
            </span>
          )}
        </span>
      ))}
    </span>
  );
}

export default function ConnectionsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro
        kicker="Connections"
        title="Non-human identity is a discipline, not one product category"
        lede="It overlaps identity governance, secrets management, privileged access, cloud permissions, and agent authorization. An API key is a credential. The identity is the application, workload, service account, or agent that credential represents. This page is a synthesis of that landscape. It is not a Magic Quadrant, a Wave, or a feature comparison."
      />

      <section className="mt-10">
        <h2 className="text-3xl tracking-tight">Three kinds of identity, four jobs</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Workforce identity, machine identity, and agent identity share discovery, authentication,
          governance, and lifecycle. They do not share a buyer. A cell on a vendor page stays Unknown
          until a source is attached.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {identityKinds.map((kind) => (
            <article key={kind.name} className="rounded-xl border border-border bg-card p-4">
              <h3 className="text-xl">{kind.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{kind.examples}</p>
              <p className="mt-3 text-sm leading-6">{kind.question}</p>
            </article>
          ))}
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {capabilityBands.map((band) => (
            <Link
              key={band.name}
              href={band.href}
              className="rounded-xl border border-border bg-muted/50 p-4 hover:bg-muted"
            >
              <span className="font-medium">{band.name}</span>
              <span className="mt-1 block text-sm text-muted-foreground">{band.items}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl tracking-tight">One leaked key, seven different jobs</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          TruffleHog and Akeyless can be bought together. Detection does not replace issuance, and a
          vault does not prove who owns the identity. Gartner&apos;s August 2024 secrets-management
          note, which this atlas has not retrieved, is cited in the readings below for the same split.
        </p>
        <ol className="mt-4 grid gap-3 md:grid-cols-2">
          {credentialChain.map((step, index) => (
            <li key={step.problem}>
              <Link href={step.href} className="block h-full rounded-xl border border-border bg-card p-4 hover:bg-muted">
                <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                  {index + 1}. {step.capability}
                </span>
                <span className="mt-2 block text-sm leading-6">{step.problem}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl tracking-tight">What counts as a non-human identity</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="bg-muted/60">
              <tr>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Example</th>
                <th className="p-3 font-semibold">Questions that are not the same</th>
              </tr>
            </thead>
            <tbody>
              {nhiTypes.map((row) => (
                <tr key={row.type} className="border-t border-border align-top">
                  <td className="p-3 font-medium">{row.type}</td>
                  <td className="p-3 text-muted-foreground">{row.example}</td>
                  <td className="p-3">{row.questions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl tracking-tight">Segments, and where they overlap</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Names are examples already in this seed, or marked when they are not. A vendor in two rows
          is not a claim that both capabilities are licensed. Certificate lifecycle vendors are named
          and left unseeded.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[52rem] text-left text-sm">
            <thead className="bg-muted/60">
              <tr>
                <th className="p-3 font-semibold">Segment</th>
                <th className="p-3 font-semibold">Primary problem</th>
                <th className="p-3 font-semibold">Examples</th>
              </tr>
            </thead>
            <tbody>
              {segments.map((segment) => (
                <tr key={segment.name} className="border-t border-border align-top">
                  <td className="p-3 font-medium">
                    {segment.href ? (
                      <Link href={segment.href} className="text-primary hover:underline">
                        {segment.name}
                      </Link>
                    ) : (
                      segment.name
                    )}
                  </td>
                  <td className="p-3">{segment.problem}</td>
                  <td className="p-3 text-muted-foreground">
                    <SeedLinks items={segment.examples} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl tracking-tight">Four competitive groups</h2>
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {groups.map((group) => (
            <article key={group.name} className="rounded-xl border border-border bg-card p-4">
              <h3 className="text-xl">{group.name}</h3>
              <p className="mt-2 text-sm font-medium">{group.problem}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{group.body}</p>
              <p className="mt-3 text-sm">
                <SeedLinks items={group.examples} />
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl tracking-tight">Where to look first</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[48rem] text-left text-sm">
            <thead className="bg-muted/60">
              <tr>
                <th className="p-3 font-semibold">Company</th>
                <th className="p-3 font-semibold">Start here</th>
                <th className="p-3 font-semibold">The adjacent question</th>
              </tr>
            </thead>
            <tbody>
              {companyLenses.map((row) => (
                <tr key={row.company} className="border-t border-border align-top">
                  <td className="p-3 font-medium">
                    <Link href={row.href} className="text-primary hover:underline">
                      {row.company}
                    </Link>
                  </td>
                  <td className="p-3">{row.focus}</td>
                  <td className="p-3 text-muted-foreground">{row.beside}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl tracking-tight">OWASP NHI Top 10, 2025</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Retrieved from the{" "}
          <a
            className="text-primary hover:underline"
            href="https://owasp.org/www-project-non-human-identities-top-10/2025/table-of-contents/"
          >
            OWASP table of contents
          </a>
          . Each risk points at the closest category or use case in this atlas. The link is a place to
          look, not a statement that a product on that page solves the risk.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[48rem] text-left text-sm">
            <thead className="bg-muted/60">
              <tr>
                <th className="p-3 font-semibold">Risk</th>
                <th className="p-3 font-semibold">What it means</th>
                <th className="p-3 font-semibold">Closest place in this map</th>
              </tr>
            </thead>
            <tbody>
              {owaspRisks.map((risk) => (
                <tr key={risk.id} className="border-t border-border align-top">
                  <td className="p-3 font-medium">
                    {risk.id} {risk.name}
                  </td>
                  <td className="p-3 text-muted-foreground">{risk.meaning}</td>
                  <td className="p-3">
                    <Link href={risk.href} className="text-primary hover:underline">
                      {risk.capability}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl tracking-tight">Research named, not copied</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Gartner and Forrester titles below are the reports used to frame this page. Their pages were
          not retrieved, so nothing in a comparison cell depends on them. Mention in a report is not a
          ranking.
        </p>
        <ul className="mt-4 grid gap-3">
          {readings.map((reading) => (
            <li key={reading.title} className="rounded-xl border border-border bg-card p-4 text-sm leading-6">
              <span className="font-medium">
                {reading.href ? (
                  <a href={reading.href} className="text-primary hover:underline">
                    {reading.title}
                  </a>
                ) : (
                  reading.title
                )}
              </span>
              <span className="mt-1 block text-muted-foreground">
                {reading.published}. {reading.use}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
