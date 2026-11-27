import { CompanyResearchGaps, companyResearchGaps } from "@/components/company-research-gaps";
import { productDestination } from "@/lib/product-destination";
import { productComparisonUrl, shortlistUrl } from "@/lib/landscape-shortlist";
import { landscapeFilterUrl, initialLandscapeFilters, productSectionId } from "@/lib/landscape-filters";
import { ProductBuyerContext } from "@/components/product-buyer-context";
import { isProductResearchSlug } from "@/lib/product-research";
import { ProfileBreadcrumbs, ProfileLink } from "@/components/catalog-profile-navigation";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClaimList } from "@/components/claims";
import { PageIntro, StatusPill } from "@/components/chrome";
import { ResearchPanelLive } from "@/components/research-panel-live";
import {
  catalog,
  claimsForSubject,
  productsForVendor,
  productById,
  relationshipsForProduct,
  sourceById,
  vendorById,
  vendorBySlug,
} from "@/lib/catalog";
import { availabilityLabel, formatDate, scopeLabel } from "@/lib/format";
import { evidenceSummary } from "@/lib/evidence-summary";
import { previewHashicorpMonitor } from "@/lib/research/vendor-monitor";

export function generateStaticParams() {
  return catalog.vendors.map((vendor) => ({ slug: vendor.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: vendorBySlug(slug)?.name ?? "Vendor" };
}

export default async function VendorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vendor = vendorBySlug(slug);
  if (!vendor) notFound();
  const products = productsForVendor(vendor.id);
  const gaps = companyResearchGaps[vendor.id];
  const vendorClaims = claimsForSubject("vendor", vendor.id);
  const productClaims = products.flatMap((product) => claimsForSubject("product", product.id));
  const events = catalog.events
    .filter((event) => event.vendorId === vendor.id)
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
  const stories = catalog.stories.filter((story) => story.vendorId === vendor.id);
  const prices = catalog.pricing.filter((price) => products.some((product) => product.id === price.productId));
  const changelog = [...vendorClaims, ...productClaims].sort((a, b) =>
    (b.publishedAt ?? b.observedAt).localeCompare(a.publishedAt ?? a.observedAt),
  );
  const monitor = vendor.id === "hashicorp" ? await previewHashicorpMonitor() : null;
  const summary = evidenceSummary([...vendorClaims, ...productClaims], catalog.capabilities);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <ProfileBreadcrumbs catalogFallback={{ href: landscapeFilterUrl(initialLandscapeFilters, vendor.name), label: "Catalog results" }} current={vendor.name} />
      <PageIntro kicker="Company" title={vendor.name} lede={vendor.positioning} />
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <StatusPill status={vendor.verificationStatus} />
        {vendor.formerNames.map((name) => (
          <span key={name} className="text-sm text-muted-foreground">
            Formerly {name}
          </span>
        ))}
        <a className="text-sm text-primary underline-offset-4 hover:underline" href={vendor.website}>
          Official site
        </a>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        Scope marked for filtering: {vendor.identityScopes.map(scopeLabel).join(", ")}. Scope is a
        research starting point, not a certified coverage claim.
      </p>
      {gaps && <a href="#research-gaps" className="inline-flex min-h-11 items-center text-sm text-primary underline underline-offset-4">Research gaps</a>}
      {products.length > 1 && <nav aria-label="Find a product on this company page" className="mt-4">
        <details className="rounded-lg border border-border bg-card px-4">
          <summary className="min-h-11 cursor-pointer py-3 text-sm font-semibold">Jump to a product ({products.length})</summary>
          <ul className="grid gap-x-5 pb-2 sm:grid-cols-2">
            {[...products].sort((a, b) => a.name.localeCompare(b.name)).map((product) => <li key={product.id}>
              <a className="inline-flex min-h-11 items-center text-sm text-primary underline" href={`#${productSectionId(product.id)}`}>{product.name}</a>
            </li>)}
          </ul>
        </details>
      </nav>}
      <section aria-labelledby="evidence-summary" className="mt-6 rounded-xl border border-border bg-card p-4">
        <h2 id="evidence-summary" className="text-lg font-semibold">Evidence on this page</h2>
        {summary.total === 0 ? (
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            No current sourced claim yet. Everything below is the map&apos;s placement, not evidence about the product.
          </p>
        ) : (
          <>
            <p className="mt-2 text-sm leading-6">
              {summary.labelCounts.map(([label, count]) => `${count} ${label}`).join(" · ")}
              {summary.lastChecked ? ` · last checked ${formatDate(summary.lastChecked)}` : ""}
            </p>
            {summary.capabilityNames.length > 0 ? (
              <ul aria-label="Capabilities with a claim" className="mt-3 flex flex-wrap gap-2">
                {summary.capabilityNames.map((name) => (
                  <li key={name} className="rounded-full border border-border px-3 py-1 text-sm">{name}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">No claim is tied to a specific capability yet.</p>
            )}
          </>
        )}
      </section>
      {monitor ? <ResearchPanelLive initial={monitor} /> : null}

      <section className="mt-8">
        <h2 className="text-2xl">Products</h2>
        {products.length === 0 && <div className="mt-2 text-sm">
          <p>No product is mapped to this company yet.</p>
          <ul className="flex flex-wrap gap-x-4" aria-label="Company categories">
            {catalog.categories.filter((category) => vendor.primaryCategoryIds.includes(category.id)).map((category) => <li key={category.id}>
              <Link href={`/categories/${category.slug}`} className="inline-flex min-h-11 items-center text-primary underline">{category.name}</Link>
            </li>)}
          </ul>
        </div>}
        <ul className="mt-3 grid gap-3">
          {products.map((product) => (
            <li key={product.id} id={productSectionId(product.id)} tabIndex={-1} className="scroll-mt-24 rounded-xl border border-border bg-card p-4 target:ring-2 target:ring-ring">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold">{isProductResearchSlug(product.slug) ? <ProfileLink href={`/products/${product.slug}`} className="inline-flex min-h-11 items-center break-words text-primary underline underline-offset-4 hover:underline">{product.name}</ProfileLink> : product.name}</h3>
                {product.availability !== "unknown" && <StatusPill status={product.availability} />}
              </div>
              <p className="mt-2 text-sm leading-6">{product.positioning}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {availabilityLabel(product.availability)}. {product.availabilityNote}
              </p>
              <a className="mt-2 inline-block text-sm text-primary underline-offset-4 hover:underline" href={product.officialUrl}>
                Product source
              </a>
              <ProfileLink href={productComparisonUrl(product)} className="ml-3 inline-flex min-h-11 items-center text-sm font-medium text-primary underline underline-offset-4">Compare {product.name}</ProfileLink>
              <div className="mt-3">
                <h4 className="mb-3 font-semibold">Product evidence and research gaps</h4>
                <ClaimList claims={claimsForSubject("product", product.id)} linkable />
                <div className="mt-4">
                  <ProductBuyerContext categories={catalog.categories} primaryIds={product.primaryCategoryIds} adjacentIds={product.adjacentCategoryIds} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {gaps ? (
        <CompanyResearchGaps gaps={gaps} questions={vendor.openQuestions} claims={productClaims} />
      ) : (
        <section className="mt-10">
          <h2 className="text-2xl">Open questions</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">
            {vendor.openQuestions.map((question) => <li key={question}>{question}</li>)}
          </ul>
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-2xl">Related products by use case</h2>
        <ul className="mt-3 space-y-3">
          {products.flatMap((product) =>
            relationshipsForProduct(product.id).map((edge) => {
              const otherId =
                edge.fromProductId === product.id ? edge.toProductId : edge.fromProductId;
              const other = productById(otherId);
              const otherVendor = other && vendorById(other.vendorId);
              const source = edge.sourceId && sourceById(edge.sourceId);
              const useCase = catalog.useCases.find((item) => item.id === edge.useCaseId);
              return (
                <li key={`${product.id}-${edge.id}`} className="rounded-xl border border-border p-4 text-sm leading-6">
                  <StatusPill status={edge.type} />
                  <p className="mt-2">
                    <span className="font-medium">{product.name}</span> and{" "}
                    {other && otherVendor ? (
                      <ProfileLink href={productDestination(other, otherVendor.slug)} className="font-medium text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ring">
                        {other.name}
                      </ProfileLink>
                    ) : other?.name} for{" "}
                    <Link href={`/use-cases/${useCase?.slug ?? ""}`} className="text-primary hover:underline">
                      {useCase?.name}
                    </Link>
                    .
                  </p>
                  <p className="mt-1 text-muted-foreground">{edge.rationale}</p>
                  {other && edge.type === "direct_competitor" && <ProfileLink href={shortlistUrl([product.id, other.id], edge.useCaseId)} className="mr-4 inline-flex min-h-11 items-center text-primary underline underline-offset-4">Compare {product.name} and {other.name}</ProfileLink>}
                  {source && (
                    <a href={source.url} className="mt-1 inline-flex min-h-11 items-center text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ring">
                      {source.publisher} · {source.title}
                    </a>
                  )}
                </li>
              );
            }),
          )}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl">Acquisitions and renames</h2>
        {events.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">No dated corporate event in this seed.</p>
        ) : (
          <ol className="mt-3 space-y-3">
            {events.map((event) => (
              <li key={event.id} className="rounded-xl border border-border p-4 text-sm leading-6">
                <p className="text-xs text-muted-foreground">{formatDate(event.date)}</p>
                <p className="font-semibold">{event.title}</p>
                <p className="mt-1">{event.summary}</p>
                <a className="text-primary hover:underline" href={sourceById(event.sourceId)?.url}>
                  Source
                </a>
              </li>
            ))}
          </ol>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-2xl">Company-level claims</h2>
        <div className="mt-3">
          <ClaimList claims={vendorClaims} />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl">Customer stories</h2>
        {stories.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">
            None seeded. Vendor-published stories are not implied, and no customer logos were added to fill the page.
          </p>
        ) : (
          <ul className="mt-3 space-y-3">
            {stories.map((story) => (
              <li key={story.id} className="rounded-xl border border-border p-4 text-sm leading-6">
                <StatusPill status={story.proofType} />
                <h3 className="mt-2 font-semibold">
                  <a className="inline-flex min-h-11 items-center text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ring" href={sourceById(story.sourceId)?.url}>
                    {story.title}
                  </a>
                </h3>
                <p className="mt-1">{story.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-2xl">Pricing signals</h2>
        {prices.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">
            No public list price, promotional offer, field signal, or quote is recorded for these products.
          </p>
        ) : (
          <ul className="mt-3 space-y-3">
            {prices.map((price) => (
              <li key={price.id} className="rounded-xl border border-border p-4 text-sm leading-6">
                <StatusPill status={price.signalType} />
                <p className="mt-2">{price.statement}</p>
                <p className="mt-1 text-muted-foreground">{price.caveats}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-2xl">Change log</h2>
        <div className="mt-3">
          <ClaimList claims={changelog} />
        </div>
      </section>
    </main>
  );
}
