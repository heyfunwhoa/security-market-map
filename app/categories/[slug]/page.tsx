import { SECRETS_COMPARISON_URL } from "@/lib/comparison-selection";
import { AcademyLinks } from "@/components/academy-links";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AreaDiagram } from "@/components/area-diagram";
import { CloudAppShortlist, DataSecurityShortlist } from "@/components/cloud-app-shortlist";
import { ClaimList } from "@/components/claims";
import { FlowStrip } from "@/components/category-map";
import { PageIntro } from "@/components/chrome";
import { catalog, categoryBySlug, claimsForSubject, vendorById } from "@/lib/catalog";

export function generateStaticParams() {
  return catalog.categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: categoryBySlug(slug)?.name ?? "Category" };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) notFound();
  const domains = catalog.domains.filter((domain) => category.domainIds.includes(domain.id));
  const adjacent = catalog.categories.filter((item) => category.adjacentCategoryIds.includes(item.id));
  const products = catalog.products.filter((product) =>
    product.primaryCategoryIds.includes(category.id),
  );
  const useCases = catalog.useCases.filter((useCase) => useCase.categoryIds.includes(category.id));
  const primaryVendors = [...new Set(products.map((product) => product.vendorId))]
    .flatMap((id) => { const vendor = vendorById(id); return vendor ? [vendor] : []; });

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro kicker={category.layer === "adjacent" ? "Adjacent" : "Category"} title={category.name} lede={category.definition} />
      <p className="mt-4 max-w-3xl text-sm leading-6">
        <span className="font-semibold">Buyer question. </span>
        {category.buyerQuestion}
      </p>
      {category.id === "secrets-detection" ? (
        <section className="mt-6 rounded-xl border border-border bg-card p-4" aria-labelledby="compare-category">
          <h2 id="compare-category" className="text-2xl">Compare secrets detection evidence</h2>
          <p className="mt-2 text-sm leading-6">
            Start with TruffleHog, GitHub Secret Scanning, GitGuardian and Gitleaks,
            then find other products in this category. Compare discovery and credential
            verification separately; each supported statement links to its original source.
            This shortlist is a starting point, not a ranking.
          </p>
          <Link href={SECRETS_COMPARISON_URL} className="mt-3 inline-flex min-h-11 items-center rounded-md border border-border px-3 text-sm font-medium text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
            Compare secrets detection products
          </Link>
        </section>
      ) : null}
      <section className="mt-8">
        <h2 className="text-2xl">Domains</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {domains.map((domain) => (
            <li key={domain.id}>
              <Link
                href={`/domains/${domain.slug}`}
                className="rounded-full border border-border px-3 py-1 text-sm hover:bg-muted"
              >
                {domain.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl">Illustrative flow</h2>
        <div className="mt-3">
          <FlowStrip flow={category.flow} />
        </div>
      </section>
      <dl className="mt-8 grid gap-4 text-sm leading-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4">
          <dt className="font-semibold">Who usually owns it</dt>
          <dd className="mt-1">{category.buyerOwner}</dd>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <dt className="font-semibold">Budget</dt>
          <dd className="mt-1">{category.budgetSource}</dd>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <dt className="font-semibold">Triggers</dt>
          <dd className="mt-1">{category.triggers.join("; ")}</dd>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <dt className="font-semibold">Outcomes worth measuring</dt>
          <dd className="mt-1">{category.outcomes.join("; ")}</dd>
        </div>
      </dl>
      <p className="mt-6 text-sm leading-6">{category.exampleWorkflow}</p>
      <CloudAppShortlist categoryId={category.id} />
      <DataSecurityShortlist categoryId={category.id} />
      <AcademyLinks categoryId={category.id} />
      <section className="mt-8">
        <h2 className="text-2xl">Adjacent categories</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {adjacent.map((item) => (
            <li key={item.id}>
              <Link href={`/categories/${item.slug}`} className="rounded-full border border-border px-3 py-1 text-sm hover:bg-muted">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl">Use cases</h2>
        <ul className="mt-3 space-y-2">
          {useCases.map((useCase) => (
            <li key={useCase.id}>
              <Link href={`/use-cases/${useCase.slug}`} className="text-sm font-medium text-primary hover:underline">
                {useCase.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      {products.length > 0 ? (
        <div className="mt-8">
          <AreaDiagram
            title={category.name}
            problem={
              primaryVendors.length > 12
                ? `${category.buyerQuestion} The diagram shows 12 of ${primaryVendors.length} primary vendors.`
                : category.buyerQuestion
            }
            href={null}
            examples={primaryVendors.slice(0, 12).map((vendor) => ({
              label: vendor.name, href: `/vendors/${vendor.slug}`,
            }))}
          />
        </div>
      ) : null}
      <section className="mt-8">
        <h2 className="text-2xl">Primary products</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {products.map((product) => (
            <li key={product.id}>
              <Link
                href={`/vendors/${vendorById(product.vendorId)?.slug ?? ""}`}
                className="block rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted"
              >
                {product.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl">Claims about this category</h2>
        <div className="mt-3">
          <ClaimList claims={claimsForSubject("category", category.id)} />
        </div>
      </section>
    </main>
  );
}
