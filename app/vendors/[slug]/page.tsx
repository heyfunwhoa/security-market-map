import Link from "next/link";
import { notFound } from "next/navigation";
import { ClaimList } from "@/components/claims";
import { PageIntro, StatusPill } from "@/components/chrome";
import {
  catalog,
  claimsForSubject,
  productsForVendor,
  relationshipsForProduct,
  sourceById,
  vendorBySlug,
} from "@/lib/catalog";
import { availabilityLabel, formatDate, relationshipLabel, scopeLabel } from "@/lib/format";

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

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro kicker="Research candidate" title={vendor.name} lede={vendor.positioning} />
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

      <section className="mt-8">
        <h2 className="text-2xl">Products</h2>
        <ul className="mt-3 grid gap-3">
          {products.map((product) => (
            <li key={product.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <StatusPill status={product.availability} />
              </div>
              <p className="mt-2 text-sm leading-6">{product.positioning}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {availabilityLabel(product.availability)}. {product.availabilityNote}
              </p>
              <a className="mt-2 inline-block text-sm text-primary underline-offset-4 hover:underline" href={product.officialUrl}>
                Product source
              </a>
              <div className="mt-3">
                <ClaimList claims={claimsForSubject("product", product.id)} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl">Open questions</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">
          {vendor.openQuestions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl">Category edges</h2>
        <ul className="mt-3 space-y-3">
          {products.flatMap((product) =>
            relationshipsForProduct(product.id).map((edge) => {
              const otherId =
                edge.fromProductId === product.id ? edge.toProductId : edge.fromProductId;
              const other = catalog.products.find((item) => item.id === otherId);
              const useCase = catalog.useCases.find((item) => item.id === edge.useCaseId);
              return (
                <li key={`${product.id}-${edge.id}`} className="rounded-xl border border-border p-4 text-sm leading-6">
                  <StatusPill status={edge.type} />
                  <p className="mt-2">
                    <span className="font-medium">{product.name}</span> {relationshipLabel(edge.type).toLowerCase()}{" "}
                    <span className="font-medium">{other?.name}</span> for{" "}
                    <Link href={`/use-cases/${useCase?.slug ?? ""}`} className="text-primary hover:underline">
                      {useCase?.name}
                    </Link>
                    .
                  </p>
                  <p className="mt-1 text-muted-foreground">{edge.rationale}</p>
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
        ) : null}
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
