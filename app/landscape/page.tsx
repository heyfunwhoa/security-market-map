import { PageIntro } from "@/components/chrome";
import { LandscapeBrowser, type LandscapeEdge, type LandscapeRow } from "@/components/landscape-browser";
import { catalog, vendorById } from "@/lib/catalog";

export const metadata = { title: "Landscape" };

export default function LandscapePage() {
  const rows: LandscapeRow[] = catalog.products.map((product) => ({
    productId: product.id,
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
        title="Who shows up for a use case, without a leaderboard"
        lede="Filter by domain, category, buyer, deployment, and scope. Use “Not an identity control” for AppSec, IT, and other tools that are on the map without being identity products. A relationship counts only inside a use case. There is no overall score."
      />
      <div className="mt-8">
        <LandscapeBrowser
          rows={rows}
          edges={edges}
          categories={catalog.categories.map((category) => ({ id: category.id, label: category.name }))}
          domains={catalog.domains.map((domain) => ({ id: domain.id, label: domain.name }))}
          useCases={catalog.useCases.map((useCase) => ({ id: useCase.id, label: useCase.name }))}
          personas={catalog.personas.map((persona) => ({
            id: persona.id,
            label: persona.name,
            categoryIds: persona.categoryIds,
          }))}
        />
      </div>
    </main>
  );
}
