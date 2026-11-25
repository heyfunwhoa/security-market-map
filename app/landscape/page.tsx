import { productDestination } from "@/lib/product-destination";
import Link from "next/link";
import { Suspense } from "react";
import { PageIntro } from "@/components/chrome";
import { LandscapeBrowser, type LandscapeEdge, type LandscapeRow } from "@/components/landscape-browser";
import { catalog, vendorById } from "@/lib/catalog";
import { personaFilterLabel } from "@/lib/format";

export const metadata = { title: "Landscape" };

export default function LandscapePage() {
  const rows: LandscapeRow[] = catalog.products.map((product) => ({
    productId: product.id,
    detailHref: productDestination(product, vendorById(product.vendorId)!.slug),
    productName: product.name,
    vendorName: vendorById(product.vendorId)?.name ?? product.vendorId,
    vendorSlug: vendorById(product.vendorId)?.slug ?? "",
    positioning: product.positioning,
    categoryIds: [...product.primaryCategoryIds, ...product.adjacentCategoryIds],
    domainIds: [
      ...new Set(
        catalog.categories
          .filter((category) =>
            [...product.primaryCategoryIds, ...product.adjacentCategoryIds].includes(category.id),
          )
          .flatMap((category) => category.domainIds),
      ),
    ],
    scopes: product.identityScopes,
    deployment: product.deployment,
    useCaseIds: product.useCaseIds,
    availability: product.availability,
  }));

  const edges: LandscapeEdge[] = catalog.relationships.flatMap((relationship) => {
    const from = catalog.products.find((product) => product.id === relationship.fromProductId);
    const to = catalog.products.find((product) => product.id === relationship.toProductId);
    if (!from || !to) return [];
    return [
      {
        productId: from.id,
        type: relationship.type,
        useCaseId: relationship.useCaseId,
        otherName: to.name,
      },
      {
        productId: to.id,
        type: relationship.type,
        useCaseId: relationship.useCaseId,
        otherName: from.name,
      },
    ];
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro
        kicker="Landscape"
        title="Find a security product"
        lede="Search the catalog or narrow it by buyer question. Select two to four products to compare their evidence."
      />
      <div className="mt-8">
        <Suspense fallback={<p role="status">Loading landscape filters…</p>}>
        <LandscapeBrowser
          rows={rows}
          edges={edges}
          categories={catalog.categories.map((category) => ({ id: category.id, label: category.name, domainIds: category.domainIds }))}
          domains={catalog.domains.map((domain) => ({ id: domain.id, label: domain.name }))}
          useCases={catalog.useCases.map((useCase) => ({ id: useCase.id, label: useCase.name }))}
          personas={catalog.personas.map((persona) => ({
            id: persona.id,
            label: personaFilterLabel(persona.name, persona.aliases),
            categoryIds: persona.categoryIds,
          }))}
        />
        </Suspense>
      </div>
      <p className="mt-5"><Link href="/landscape/public-exposure" className="text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ring">Compare public monitoring and external exposure scenarios</Link></p>
    </main>
  );
}
