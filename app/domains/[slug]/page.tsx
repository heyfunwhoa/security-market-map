import { PageJourney } from "@/components/page-journey";
import { Breadcrumbs } from "@/components/breadcrumbs";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AreaDiagram } from "@/components/area-diagram";
import { FlowStrip } from "@/components/category-map";
import { ClaimList } from "@/components/claims";
import { CloudAppShortlist, DataSecurityShortlist } from "@/components/cloud-app-shortlist";
import { depthLabel } from "@/components/domain-map";
import { PageIntro } from "@/components/chrome";
import { catalog, domainBySlug, sourceById, vendorById } from "@/lib/catalog";
import { claimsForDomain, claimsForGlossaryTerm, glossaryForDomain, questionsForDomain } from "@/lib/domain-study";
import { aiIntersections, REVIEWED } from "@/lib/data/brief";

export function generateStaticParams() {
  return catalog.domains.map((domain) => ({ slug: domain.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: domainBySlug(slug)?.name ?? "Domain" };
}

export default async function DomainPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const domain = domainBySlug(slug);
  if (!domain) notFound();

  const categories = catalog.categories.filter((category) => domain.categoryIds.includes(category.id));
  const questions = questionsForDomain(domain.slug);
  const terms = glossaryForDomain(domain.categoryIds, catalog.glossary);
  const claims = claimsForDomain(domain.categoryIds, catalog.claims, catalog.products, catalog.vendors);
  const neighbors = catalog.domains.filter((item) => domain.neighborIds.includes(item.id));
  const products = catalog.products.filter((product) =>
    product.primaryCategoryIds.some((id) => domain.categoryIds.includes(id)),
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumbs parents={[{ href: "/", label: "Home" }, { href: "/domains", label: "Domains" }]} current={domain.name} />
      <PageIntro
        kicker={depthLabel(domain.depth)}
        title={domain.name}
        lede="Read the question, the charter, then each category. Words link to the learn page when a definition already exists."
      />
      <PageJourney steps={[
        { href: "#study-question", title: "Understand the problem", description: "Start with the buyer question and domain charter." },
        { href: "#study-categories", title: "Explore categories", description: "Choose a category to narrow the map and find relevant tools." },
        { href: "#study-evidence", title: "Check the evidence", description: "Inspect attributed claims and what is still Unknown." },
      ]} back={{ href: "/domains", label: "Broaden to all domains" }} />
      <p className="mt-6 max-w-3xl text-sm leading-6 text-muted-foreground">
        Question, charter, categories, and words are teaching notes. They are not sourced claims.
      </p>
      <dl className="mt-8 grid gap-4 text-sm leading-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4">
          <dt className="font-semibold">Typical owner</dt>
          <dd className="mt-1">{domain.typicalOwner}</dd>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <dt className="font-semibold">Budget</dt>
          <dd className="mt-1">{domain.budget}</dd>
        </div>
      </dl>
      <section className="mt-8" aria-labelledby="study-question">
        <h2 id="study-question" tabIndex={-1} className="scroll-mt-24 text-2xl focus-visible:outline-2 focus-visible:outline-ring">
          Question
        </h2>
        {questions.length > 0 ? (
          <ul className="mt-3 grid gap-3">
            {questions.map((item) => (
              <li key={item.id} className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm font-medium text-muted-foreground">{item.name}</p>
                <p className="mt-1 text-lg leading-7">{item.question}</p>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-3 grid gap-2">
            {categories.map((category) => (
              <li key={category.id} className="rounded-xl border border-border bg-card p-4 text-sm leading-6">
                {category.buyerQuestion}
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="mt-8" aria-labelledby="study-charter">
        <h2 id="study-charter" tabIndex={-1} className="scroll-mt-24 text-2xl focus-visible:outline-2 focus-visible:outline-ring">
          Charter
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6">{domain.charter}</p>
      </section>
      <section className="mt-8" aria-labelledby="study-categories">
        <h2 id="study-categories" tabIndex={-1} className="scroll-mt-24 text-2xl focus-visible:outline-2 focus-visible:outline-ring">
          Categories
        </h2>
        <div className="mt-4">
          <AreaDiagram
            title={domain.name}
            problem="Categories in this domain. A category in two domains is drawn again on the neighboring page."
            href={null}
            examples={categories.map((category) => ({
              label: category.name,
              href: `/categories/${category.slug}`,
            }))}
          />
        </div>
        <div className="mt-6 grid gap-6">
          {categories.map((category) => (
            <article key={category.id} className="rounded-xl border border-border bg-card p-4">
              <h3 className="text-xl">
                <Link href={`/categories/${category.slug}`} className="text-primary hover:underline">
                  {category.name}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-6">{category.definition}</p>
              <p className="mt-3 text-sm leading-6">
                <span className="font-semibold">Buyer question. </span>
                {category.buyerQuestion}
              </p>
              <details className="mt-4 rounded-lg border border-border p-3">
                <summary className="min-h-11 cursor-pointer rounded-sm py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-ring">Show illustrative workflow</summary>
                <FlowStrip flow={category.flow} />
              </details>
            </article>
          ))}
        </div>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl">Primary products in this seed</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {products.length} products list a category in this domain as primary. That is placement on the
          map, not a capability verdict.
        </p>
        {products.length === 0 ? (
          <p className="mt-3 text-sm">No product in the seed uses a category here as its primary placement.</p>
        ) : (
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {products.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/vendors/${vendorById(product.vendorId)?.slug ?? ""}`}
                  className="block rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted"
                >
                  <span className="font-medium">{product.name}</span>
                  <span className="mt-0.5 block text-muted-foreground">{product.positioning}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="mt-8" aria-labelledby="study-words">
        <h2 id="study-words" tabIndex={-1} className="scroll-mt-24 text-2xl focus-visible:outline-2 focus-visible:outline-ring">
          Words
        </h2>
        {terms.length > 0 ? (
          <ul className="mt-3 grid gap-3 md:grid-cols-2">
            {terms.map((term) => (
              <li key={term.id} className="rounded-xl border border-border bg-card p-4">
                <h3 className="text-lg">
                  <Link href={`/learn#${term.id}`} className="text-primary hover:underline">
                    {term.term}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-6">{term.definition}</p>
                {claimsForGlossaryTerm(term.id, catalog.claims).map((claim) => (
                  <p key={claim.id} className="mt-3 text-sm leading-6">
                    <a href={claim.sourceUrl} className="text-primary hover:underline">
                      {sourceById(claim.sourceId)?.title ?? "Source"}
                    </a>
                  </p>
                ))}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 max-w-3xl rounded-xl border border-border bg-card p-4 text-sm leading-6">
            Words for this area are not written yet.
          </p>
        )}
      </section>
      <section className="mt-8" aria-labelledby="study-evidence">
        <h2 id="study-evidence" tabIndex={-1} className="scroll-mt-24 text-2xl focus-visible:outline-2 focus-visible:outline-ring">
          Evidence
        </h2>
        {domain.depth === "mapped" ? (
          <p className="mt-3 max-w-3xl rounded-xl border border-border bg-card p-4 text-sm leading-6">
            This domain is a research map. Categories that are not also in identity have no capability
            claims. A vendor listed here is a research candidate. Comparison cells stay Unknown until a
            page is cited.
          </p>
        ) : (
          <div className="mt-3 max-w-3xl rounded-xl border border-border bg-card p-4 text-sm leading-6">
            <p>
              Claims in this domain carry a source, a date, and a label. Vendor said this means the
              company page. Independent source means a public standard. A blank cell is Unknown.
            </p>
            <p className="mt-3">
              <Link href="/learn" className="text-primary hover:underline">
                Open the learn page
              </Link>
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {catalog.scenarios.map((scenario) => (
                <li key={scenario.id}>
                  <Link href={`/learn?scenario=${scenario.id}#scenarios`} className="text-primary hover:underline">
                    {scenario.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-4">
          <ClaimList claims={claims} />
        </div>
      </section>
      {domain.id === "ai" ? (
        <section className="mt-6">
          <p className="text-sm text-muted-foreground">Reviewed {REVIEWED}. That label is not a review of the 3 Sep 2026 and 22 Jul 2026 sentences in the charter. Those sentences are not Gartner categories, and they are not capability cells.</p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead className="bg-muted/60">
                <tr>
                  <th className="p-3">Neighboring control</th>
                  <th className="p-3">Where it meets AI security</th>
                </tr>
              </thead>
              <tbody>
                {aiIntersections.map((row) => (
                  <tr key={row.domain} className="border-t border-border align-top">
                    <td className="p-3">
                      <Link href={row.href} className="text-primary hover:underline">
                        {row.domain}
                      </Link>
                    </td>
                    <td className="p-3">{row.intersection}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      <section className="mt-8">
        <h2 className="text-2xl">Neighboring domains</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {neighbors.map((item) => (
            <li key={item.id}>
              <Link
                href={`/domains/${item.slug}`}
                className="rounded-full border border-border px-3 py-1 text-sm hover:bg-muted"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <CloudAppShortlist domainId={domain.id} />
      <DataSecurityShortlist domainId={domain.id} />

    </main>
  );
}
