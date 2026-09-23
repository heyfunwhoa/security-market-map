import Link from "next/link";
import { CategoryMap } from "@/components/category-map";
import { ClaimList, DistinctionCards } from "@/components/claims";
import { DomainMap } from "@/components/domain-map";
import { SearchPanel } from "@/components/search-panel";
import { Button } from "@/components/ui/button";
import { catalog, searchIndex } from "@/lib/catalog";
import {
  capabilitiesWithoutStrongEvidence,
  productsWithoutCapabilityEvidence,
  reviewQueue,
  staleSources,
} from "@/lib/coverage";
import { formatDate } from "@/lib/format";

const PATH = [
  {
    href: "/learn",
    title: "Learn the layers",
    body: "Walk a leaked key through detection, the machine identity, the vault, a review, and an agent call.",
  },
  {
    href: "/learn#distinctions",
    title: "Separate the words",
    body: "Secret, NHI, entitlement, and privileged session. Then detection versus vaulting versus governance.",
  },
  {
    href: "/compare?use=uc-agent&products=c1-platform,opal-zero,entra-agent-id,idira",
    title: "Compare with the gaps visible",
    body: "C1, Opal Zero, Entra Agent ID, and Idira on agent authorization. Unknown stays on the page.",
  },
  {
    href: "/territory",
    title: "Write an account hypothesis",
    body: "Only the stack you recorded. The score ignores blank incumbents instead of treating them as whitespace.",
  },
];

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
        Coverage notes for a cybersecurity analyst
      </p>
      <h1 className="mt-3 max-w-3xl text-4xl tracking-tight text-balance sm:text-5xl">
        A map of the security estate, with evidence only where a source exists.
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
        Corporate IT, application security, product security, cloud, data, operations, and identity sit
        on one map because the budgets collide. Identity is the evidenced slice. The other domains are
        mapped: owners, categories, and research candidates. A cell without a source says Unknown.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/domains">Browse the domains</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/learn">I&apos;m new to identity</Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <SearchPanel hits={searchIndex()} />
        <aside className="rounded-xl border border-border bg-card p-4 text-sm leading-6">
          <p className="font-semibold">As of {formatDate(catalog.asOf)}</p>
          <p className="mt-2 text-muted-foreground">
            {catalog.domains.length} domains, {catalog.categories.length} overlapping categories,{" "}
            {catalog.vendors.length} research-candidate vendors, {catalog.claims.length} cited claims.
            Only the identity domain carries those claims.
          </p>
        </aside>
      </div>

      <section className="mt-12">
        <h2 className="text-3xl tracking-tight">Domain map</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Evidenced means claims, dates, and explicit gaps. Mapped means the category and the buyer are
          named, and capability cells stay Unknown.
        </p>
        <div className="mt-4">
          <DomainMap domains={catalog.domains} />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl tracking-tight">Identity, the evidenced slice</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          These are not mutually exclusive piles. A vault complements governance when the question is
          credential issuance, and competes with another vault when the question is secrets management.
          Several of these categories also appear in AppSec, cloud, corporate security, or platform.
        </p>
        <div className="mt-4">
          <CategoryMap
            categories={catalog.categories.filter((category) => category.domainIds.includes("identity"))}
          />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl tracking-tight">If you are new to identity</h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-2">
          {PATH.map((step, index) => (
            <li key={step.href}>
              <Link
                href={step.href}
                className="block h-full rounded-xl border border-border bg-card p-4 hover:bg-muted"
              >
                <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                  {index + 1}
                </span>
                <span className="mt-1 block text-lg font-semibold">{step.title}</span>
                <span className="mt-1 block text-sm leading-6 text-muted-foreground">{step.body}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12" id="distinctions">
        <DistinctionCards items={catalog.distinctions} />
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl tracking-tight">Recently dated claims</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Newest published or observed date first. Vendor-published is not the same as verified.
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
