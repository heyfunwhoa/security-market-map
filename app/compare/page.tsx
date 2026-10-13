import { CompareWorkbench } from "@/components/compare-workbench";
import { PageIntro } from "@/components/chrome";
import { comparisonSelection } from "@/lib/comparison-selection";
import { catalog } from "@/lib/catalog";

export const metadata = { title: "Compare" };

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const selection = comparisonSelection(params, catalog);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro
        kicker="Compare"
        title="Evidence in the cell, or the word Unknown"
        lede="Secrets detection, vaulting, and NHI governance stay on different rows. Category membership never fills a checkbox."
      />
      <div className="mt-8">
        <CompareWorkbench
          categories={catalog.categories}
          categoryId={selection.categoryId}
          products={catalog.products}
          useCases={catalog.useCases}
          capabilities={catalog.capabilities}
          claims={catalog.claims}
          sources={catalog.sources}
          asOf={catalog.asOf}
          initialUseCase={selection.useCaseId}
          initialProducts={selection.productIds}
        />
      </div>
    </main>
  );
}
