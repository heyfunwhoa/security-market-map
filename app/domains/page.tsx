import Link from "next/link";
import { DomainExplorer } from "@/components/domain-explorer";
import { domainQuestions } from "@/lib/data/domain-questions";
import { PageIntro } from "@/components/chrome";
import { catalog } from "@/lib/catalog";
import { domainClaimCounts } from "@/lib/domain-evidence";

export const metadata = { title: "Domains" };

const SECRETS = [
  {
    problem: "A credential was committed to GitHub",
    motion: "Find it, check whether it still works, name an owner, and drive rotation.",
    market: "Application security / secrets detection",
    href: "/use-cases/secrets-detection",
  },
  {
    problem: "An application needs a credential at runtime",
    motion: "Store, issue, rotate, and audit the credential.",
    market: "Secrets management / privileged access",
    href: "/use-cases/secrets-vaulting",
  },
  {
    problem: "A service account or AI agent has excessive access",
    motion: "Inventory the identity, map permissions, set ownership, and reduce privilege.",
    market: "Nonhuman identity / access / cloud entitlements",
    href: "/use-cases/nhi-lifecycle",
  },
  {
    problem: "An exposed credential could reach sensitive cloud data",
    motion: "Connect the secret to an identity, an entitlement, a resource, and the data.",
    market: "Cloud security / CNAPP / data security",
    href: "/use-cases/cloud-entitlements",
  },
];

export default function DomainsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro
        kicker="Domains"
        title="The security market, mapped by what each solution protects"
        lede="Eleven domains. Each one names the buyer, the budget, and the categories inside it. Related categories can share a budget."
      />
      <p className="mt-4 flex flex-wrap gap-x-4 text-sm"><Link href="/categories" className="inline-flex min-h-11 items-center text-primary underline underline-offset-4">Categories A–Z</Link><a href="/domain-map.svg" download="security-market-map.svg" className="inline-flex min-h-11 items-center text-primary underline underline-offset-4">Download the domain map (SVG)</a></p>
      <div className="mt-4">
        <DomainExplorer domains={catalog.domains} claimCounts={domainClaimCounts(catalog)} />
      </div>

      <section className="mt-12" id="questions">
        <h2 className="text-3xl tracking-tight">The question each domain answers</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Vendor names in the table are examples this map chose. They are not a ranking. A{" "}
          <Link href="/categories/cnapp" className="text-primary hover:underline">
            5 Aug 2025 public abstract
          </Link>{" "}
          describes cloud-native application protection as life-cycle protection from development to
          production. It does not list the modules in a named product. A{" "}
          <Link href="/categories/network-edge" className="text-primary hover:underline">
            28 Aug 2025 public abstract
          </Link>{" "}
          is a procurement guide for security service edge. It does not define web gateways or
          private-application access.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[52rem] text-left text-sm">
            <thead className="bg-muted/60">
              <tr>
                <th className="p-3 font-semibold">Domain</th>
                <th className="p-3 font-semibold">Main question</th>
                <th className="p-3 font-semibold">Common categories</th>
                <th className="p-3 font-semibold">Illustrative vendors</th>
              </tr>
            </thead>
            <tbody>
              {catalog.domains.flatMap((domain) =>
                domainQuestions
                  .filter((area) => area.domainId === domain.id)
                  .map((area) => ({ area, domain })),
              ).map(({ area, domain }) => (
                <tr key={area.id} className="border-t border-border align-top">
                  <td className="p-3 font-medium">
                    <Link href={`/domains/${domain.slug}`} className="text-primary hover:underline">
                      {domain.name}
                    </Link>
                    {area.name !== domain.name ? (
                      <span className="mt-1 block text-xs font-normal text-muted-foreground">{area.name}</span>
                    ) : null}
                  </td>
                  <td className="p-3">{area.question}</td>
                  <td className="p-3 text-muted-foreground">{area.categories}</td>
                  <td className="p-3 text-muted-foreground">{area.examples}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl tracking-tight">Where secrets work sits</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Secrets security crosses markets with different buyers. A scanner, a vault, an identity
          governance platform, and a cloud platform may all say “secrets.” They enter the problem at
          different points. A buyer may need more than one. A{" "}
          <Link href="/categories/secrets-management" className="text-primary hover:underline">
            12 Aug 2024 public abstract
          </Link>{" "}
          says secrets management is part of machine identity management and is not the same thing. It
          does not place secrets management inside privileged access. The rows below are this map&apos;s
          split.
        </p>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {SECRETS.map((row) => (
            <li key={row.href}>
              <Link
                href={row.href}
                className="block h-full rounded-xl border border-border bg-card p-4 hover:bg-muted"
              >
                <span className="font-medium">{row.problem}</span>
                <span className="mt-2 block text-sm leading-6 text-muted-foreground">{row.motion}</span>
                <span className="mt-3 block text-xs font-semibold tracking-wide text-primary uppercase">
                  {row.market}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl tracking-tight">Sentences already attached to a page</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Each card names a page that was retrieved. The category page has the full sentence and what
          that page did not say. A spending forecast that was not retrieved is not on this page.
        </p>
        <ul className="mt-4 grid gap-3 text-sm leading-6 md:grid-cols-2">
          <li className="rounded-xl border border-border bg-card p-4">
            <span className="font-semibold">Extended detection and response.</span>{" "}
            <Link href="/categories/xdr" className="text-primary hover:underline">
              Gartner&apos;s 23 Oct 2024 public abstract
            </Link>{" "}
            says those products offer unified threat prevention, detection, and response. It does not
            say the product replaces a SIEM, and it does not name vendors.
          </li>
          <li className="rounded-xl border border-border bg-card p-4">
            <span className="font-semibold">SaaS posture.</span>{" "}
            <Link href="/categories/sspm" className="text-primary hover:underline">
              Forrester&apos;s 19 Aug 2022 public summary
            </Link>{" "}
            says these solutions allow configuration management and access-anomaly detection and
            prevention. Customer interviews were not retrieved. This is not an OAuth cell.
          </li>
          <li className="rounded-xl border border-border bg-card p-4">
            <span className="font-semibold">A live agent action.</span>{" "}
            <Link href="/categories/agentic-runtime" className="text-primary hover:underline">
              SACR&apos;s 3 Sep 2026 report
            </Link>{" "}
            says directory, governance, privileged access, and gateway controls remain necessary and
            were not designed to decide whether a live agent action should continue. It does not score
            a product.
          </li>
          <li className="rounded-xl border border-border bg-card p-4">
            <span className="font-semibold">This map&apos;s wording on consolidation.</span> A specialist
            may win a proof of concept and then lose the purchase to a platform the buyer already owns.
            That sentence is not an analyst finding. Evaluate the bundle against the actual requirement.
            One platform does not close every circle.
          </li>
        </ul>
      </section>

    </main>
  );
}
