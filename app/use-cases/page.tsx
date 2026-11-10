import { PageIntro } from "@/components/chrome";
import { BuyerProblemDiscovery } from "@/components/buyer-problem-discovery";
import { catalog } from "@/lib/catalog";

export const metadata = { title: "Use cases" };

export default function UseCasesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro kicker="Use cases" title="The buying question, before the shortlist"
        lede="Start with a problem rather than a vendor name. Explore the buyer's question, architecture, budget owner and relevant options in the existing catalog." />
      <div className="mt-8">
        <BuyerProblemDiscovery problems={catalog.useCases.map((useCase) => ({
          id: useCase.id,
          slug: useCase.slug,
          name: useCase.name,
          buyerQuestion: useCase.buyerQuestion,
          problem: useCase.problem,
          categories: catalog.categories.filter((category) => useCase.categoryIds.includes(category.id)).map((category) => ({ id: category.id, name: category.name })),
        }))} />
      </div>
    </main>
  );
}
