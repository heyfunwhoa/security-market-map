import { buyerComparison, comparisonDraft } from "@/lib/buyer-comparison";
import { comparisonSelection } from "@/lib/comparison-selection";
import { PageIntro } from "@/components/chrome";
import { TerritoryWorkspace } from "@/components/territory-workspace";
import { catalog } from "@/lib/catalog";

export const metadata = { title: "Territory" };

export default async function TerritoryPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const { use } = params;
  const selection = comparisonSelection({ use, products: params.products }, catalog);
  const comparison = buyerComparison(catalog, selection.useCaseId, selection.productIds);
  const draft = comparison ? comparisonDraft(comparison, [params.finding1, params.finding2]) : undefined;
  const startingUse = catalog.useCases.find((item) => item.id === use);
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro
        kicker="Territory"
        title="An account brief you can defend"
        lede="Type only what you know. Unknown incumbents stay out of the fit score. The Markdown export carries your sources and the discovery questions for the use cases you select."
      />
      <div className="mt-8">
        {startingUse && !draft && <p className="mb-4 text-sm">New briefs start with the buyer question <strong>{startingUse.name}</strong>.</p>}
        <TerritoryWorkspace useCases={catalog.useCases} startingUseId={startingUse?.id} comparisonDraft={draft} />
      </div>
    </main>
  );
}
