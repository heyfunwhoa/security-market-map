import Link from "next/link";
import { notFound } from "next/navigation";
import { AreaDiagram } from "@/components/area-diagram";
import { depthLabel } from "@/components/domain-map";
import { PageIntro } from "@/components/chrome";
import { catalog, domainBySlug, vendorById } from "@/lib/catalog";

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
  const neighbors = catalog.domains.filter((item) => domain.neighborIds.includes(item.id));
  const products = catalog.products.filter((product) =>
    product.primaryCategoryIds.some((id) => domain.categoryIds.includes(id)),
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro kicker={depthLabel(domain.depth)} title={domain.name} lede={domain.charter} />
      <div className="mt-6">
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
      {domain.depth === "mapped" ? (
        <p className="mt-4 max-w-3xl rounded-xl border border-border bg-card p-4 text-sm leading-6">
          This domain is a research map. Categories that are not also in identity have no capability
          claims. A vendor listed here is a research candidate. Comparison cells stay Unknown until a
          page is cited.
        </p>
      ) : (
        <p className="mt-4 max-w-3xl rounded-xl border border-border bg-card p-4 text-sm leading-6">
          Claims in this domain carry a source, a date, and a verification status. Vendor-published is
          not the same as verified. A blank cell is Unknown.
        </p>
      )}
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
      <section className="mt-8">
        <h2 className="text-2xl">Categories</h2>
        <ul className="mt-3 grid gap-3 md:grid-cols-2">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/categories/${category.slug}`}
                className="block h-full rounded-xl border border-border bg-card p-4 hover:bg-muted"
              >
                <span className="font-medium">{category.name}</span>
                <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                  {category.buyerQuestion}
                </span>
              </Link>
            </li>
          ))}
        </ul>
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
    </main>
  );
}
