import Link from "next/link";
import { CategoryMap } from "@/components/category-map";
import { ClaimList } from "@/components/claims";
import { DomainExplorer } from "@/components/domain-explorer";
import { Button } from "@/components/ui/button";
import { catalog } from "@/lib/catalog";
import {
  capabilitiesWithoutStrongEvidence,
  productsWithoutCapabilityEvidence,
  reviewQueue,
  staleSources,
} from "@/lib/coverage";
import { domainClaimCounts } from "@/lib/domain-evidence";
import { formatDate } from "@/lib/format";

export default function HomePage() {
  const recent = [...catalog.claims]
    .sort((a, b) => (b.publishedAt ?? b.observedAt).localeCompare(a.publishedAt ?? a.observedAt))
    .slice(0, 4);
  const thin = capabilitiesWithoutStrongEvidence(catalog.capabilities, catalog.claims);
  const unsourcedProducts = productsWithoutCapabilityEvidence(catalog.products, catalog.claims);
  const stale = staleSources(catalog.sources, catalog.asOf);
  const queue = reviewQueue(catalog.claims);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
        For AEs, SEs, and analysts preparing customer conversations
      </p>
      <h1 className="mt-3 max-w-3xl text-4xl tracking-tight text-balance sm:text-5xl">
        Identity and secrets, mapped with evidence.
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
        Every claim links to its source and date. Identity has the deepest evidence. The other ten domains are
        mapped, and their evidence is thinner.
      </p>
      <nav aria-label="Start exploring" className="mt-6 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/domains">Explore domains</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/compare">Compare evidence</Link>
        </Button>
      </nav>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">
        As of {formatDate(catalog.asOf)}. {catalog.domains.length} domains, {catalog.categories.length} categories,{" "}
        {catalog.claims.length} cited claims. Not a ranking, and Unknown stays Unknown.{" "}
        <Link href="/methodology" className="text-primary underline underline-offset-4">
          How to read this map
        </Link>
      </p>

      <section className="mt-12" aria-labelledby="domains-heading">
        <h2 id="domains-heading" className="text-3xl tracking-tight">
          Eleven domains, one map
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Follow an attack to see which domains act at each step, or open a domain directly.
        </p>
        <div className="mt-4">
          <DomainExplorer domains={catalog.domains} claimCounts={domainClaimCounts(catalog)} />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl tracking-tight">Identity, the evidenced slice</h2>
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

      <section className="mt-12" aria-labelledby="learn-heading">
        <Link
          href="/learn"
          className="block rounded-xl border border-border bg-card p-5 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="text-xs font-semibold tracking-wide text-primary uppercase">New to identity?</span>
          <h2 id="learn-heading" className="mt-1 text-2xl tracking-tight">
            Secret, NHI, entitlement, privileged session
          </h2>
          <span className="mt-2 block max-w-3xl text-sm leading-6 text-muted-foreground">
            The glossary and the difference between detection, vaulting, and NHI governance are on the learn page.
          </span>
          <span className="mt-3 block text-sm font-medium text-primary">Open the learn page</span>
        </Link>
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl tracking-tight">Recently dated claims</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Newest published or observed date first. Vendor said this means the company page. Independent source means a public standard.
          </p>
          <div className="mt-4">
            <ClaimList claims={recent} />
          </div>
        </div>
        <div>
          <h2 className="text-3xl tracking-tight">Coverage gaps</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6">
            <li className="rounded-xl border border-border bg-card p-4">
              <span className="font-semibold">{thin.length} capabilities</span> have no verified or
              vendor-published assertion. Session control and ITDR detection are in that set on purpose.
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
              <Link href="/sources" className="text-primary underline-offset-4 hover:underline">
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
