import Link from "next/link";
import { CategoryMap } from "@/components/category-map";
import { ClaimList } from "@/components/claims";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { catalog } from "@/lib/catalog";
import {
  capabilitiesWithoutStrongEvidence,
  productsWithoutCapabilityEvidence,
  reviewQueue,
  staleSources,
} from "@/lib/coverage";
import { AnnotatedText } from "@/components/annotated-text";
import { claimDomainLabel } from "@/lib/domain-evidence";
import { formatDate } from "@/lib/format";
import { INCIDENT_KIND_LABELS, incidentFeed, latestIncidents } from "@/lib/incident-feed";

export default function HomePage() {
  const recent = [...catalog.claims]
    .sort((a, b) => (b.publishedAt ?? b.observedAt).localeCompare(a.publishedAt ?? a.observedAt))
    .slice(0, 4);
  const thin = capabilitiesWithoutStrongEvidence(catalog.capabilities, catalog.claims);
  const unsourcedProducts = productsWithoutCapabilityEvidence(catalog.products, catalog.claims);
  const stale = staleSources(catalog.sources, catalog.asOf);
  const queue = reviewQueue(catalog.claims);
  const labels = Object.fromEntries(recent.map((claim) => [claim.id, claimDomainLabel(claim, catalog)]));
  const seen = new Set<string>();
  const newestIncidents = latestIncidents(3);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
        For AEs, SEs, and analysts preparing customer conversations
      </p>
      <h1 className="mt-3 max-w-3xl text-4xl tracking-tight text-balance sm:text-5xl">
        Security Market Map
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
        Browse security domains and categories, or find a company and follow the sources behind its product profile. Identity and secrets have the deepest coverage.
      </p>
      <nav aria-label="Start exploring" className="mt-6 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="#market-domains">Browse by domain</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/landscape">Browse products</Link>
        </Button>
      </nav>
      <form action="/landscape" role="search" aria-label="Find a product or company" className="mt-5 max-w-xl">
        <label htmlFor="home-product" className="text-sm font-semibold">Find a product or company</label>
        <div className="mt-1 flex gap-2">
          <Input type="search" name="q" id="home-product" placeholder="e.g. WorkOS" className="min-h-11 min-w-0 bg-card" />
          <Button type="submit" variant="outline" className="min-h-11">Search</Button>
        </div>
      </form>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">
        As of {formatDate(catalog.asOf)}. {catalog.domains.length} domains, {catalog.categories.length} categories,{" "}
        {catalog.claims.length} cited claims. Not a ranking, and Unknown stays Unknown.{" "}
        <Link href="/methodology" className="text-primary underline underline-offset-4">
          How to read this map
        </Link>
      </p>

      <section className="mt-8" aria-labelledby="market-domains">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <h2 id="market-domains" tabIndex={-1} className="scroll-mt-24 text-3xl tracking-tight">Security domains</h2>
          <div className="flex flex-wrap gap-x-4 text-sm text-primary">
            <Link href="/domains" className="inline-flex min-h-11 items-center underline">Open the full domain map</Link>
            <Link href="/categories" className="inline-flex min-h-11 items-center underline">Categories A–Z</Link>
          </div>
        </div>
        <ul className="mt-2 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
          {catalog.domains.map((domain) => (
            <li key={domain.id} className="border-b border-border">
              <Link href={`/domains/${domain.slug}`} className="flex min-h-11 items-center justify-between gap-2 py-2 text-sm hover:underline">
                <span className="font-medium">{domain.name}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{domain.categoryIds.length} categories</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="questions-heading">
        <h2 id="questions-heading" className="text-3xl tracking-tight">
          Questions to explore
        </h2>
        <Link href="/use-cases" className="inline-flex min-h-11 items-center text-sm text-primary underline">Browse buyer questions</Link>
        <ul className="mt-2 grid gap-3 md:grid-cols-3">
          {[
            { href: "/use-cases/customer-auth", title: "How do customers sign in to our product?", context: "Customer identity" },
            { href: "/domains/secops#secops-buyer-guide", title: "Who investigates a security finding?", context: "Security operations" },
            { href: "/use-cases/secrets-detection", title: "What happens after a live secret is exposed?", context: "Secrets detection and remediation" },
          ].map(({ href, title, context }) => (
            <li key={href}><Link href={href} className="block h-full rounded-xl border border-border bg-card p-4 hover:bg-muted">
              <span className="text-sm text-muted-foreground">{context}</span>
              <span className="mt-1 block font-heading text-xl">{title}</span>
            </Link></li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="incidents-heading">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="incidents-heading" className="text-3xl tracking-tight">
            Latest incidents
          </h2>
          <Link href="/incidents" className="text-sm text-primary underline underline-offset-4">
            All {incidentFeed.length} reviewed incidents, with talk tracks
          </Link>
        </div>
        <ul className="mt-4 grid gap-3 md:grid-cols-3">
          {newestIncidents.map((item) => (
            <li key={item.slug} className="min-w-0 rounded-xl border border-border bg-card p-4 text-sm">
              <p className="text-xs font-semibold tracking-[0.12em] text-primary uppercase">
                {INCIDENT_KIND_LABELS[item.incident.kind]} · {formatDate(item.incident.disclosedOn)}
              </p>
              <Link
                href={`/incidents/${item.slug}`}
                className="mt-2 block font-semibold leading-6 underline-offset-4 hover:underline"
              >
                {item.incident.title}
              </Link>
              <p className="mt-1 text-xs text-muted-foreground">
                Source: {item.sources.map((source) => source.publisher).join(", ")}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl tracking-tight">Featured research in identity and secrets</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          These piles overlap. A vault complements governance on credential issuance and competes with another
          vault on secrets management.
        </p>
        <div className="mt-4">
          <CategoryMap
            categories={catalog.categories.filter((category) => category.domainIds.includes("identity"))}
          />
        </div>
      </section>

      <section className="mt-12 rounded-xl border border-border bg-card p-5" aria-labelledby="learn-heading">
        <p className="text-xs font-semibold tracking-wide text-primary uppercase">New to identity?</p>
        <h2 id="learn-heading" className="mt-1 text-2xl tracking-tight">
          Secret, <AnnotatedText text="NHI" seen={seen} />, entitlement, privileged session
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          The glossary and the difference between detection, vaulting, and NHI governance are on the learn page.
        </p>
        <Link href="/learn" className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-primary underline-offset-4 hover:underline">
          Open the learn page
        </Link>
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl tracking-tight">Recently dated claims</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Newest first, across all domains. Each card names its domain and how the claim was checked.
          </p>
          <div className="mt-4">
            <ClaimList claims={recent} labels={labels} />
          </div>
        </div>
        <div>
          <h2 className="text-3xl tracking-tight">Coverage gaps</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6">
            <li className="rounded-xl border border-border bg-card p-4">
              <span className="font-semibold">{thin.length} capabilities</span> have no verified or
              vendor-published assertion. <AnnotatedText text="Session control and ITDR detection are in that set on purpose." seen={seen} />
            </li>
            <li className="rounded-xl border border-border bg-card p-4">
              <span className="font-semibold">{unsourcedProducts.length} products</span> have no
              capability claim. They stay on the map as research candidates. SailPoint and Saviynt are
              examples: shortlist them, do not check a feature.
            </li>
            <li className="rounded-xl border border-border bg-card p-4">
              <span className="font-semibold">{queue.length} claims</span> are in the review queue, and{" "}
              <span className="font-semibold">{stale.length} sources</span> are past their recrawl
              window.{" "}
              <Link href="/sources?view=review" className="text-primary underline-offset-4 hover:underline">
                Open the source ledger
              </Link>
              .
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
