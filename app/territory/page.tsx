import { PageIntro } from "@/components/chrome";
import { TerritoryWorkspace } from "@/components/territory-workspace";
import { catalog } from "@/lib/catalog";

export const metadata = { title: "Territory" };

export default async function TerritoryPage({ searchParams }: { searchParams: Promise<{ use?: string }> }) {
  const { use } = await searchParams;
  const startingUse = catalog.useCases.find((item) => item.id === use);
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro
        kicker="Territory"
        title="An account brief you can defend"
        lede="Type only what you know. Unknown incumbents stay out of the fit score. The Markdown export carries your sources and the discovery questions for the use cases you select."
      />
      <div className="mt-8">
        {startingUse && <p className="mb-4 text-sm">New briefs start with the buyer question <strong>{startingUse.name}</strong>.</p>}
        <TerritoryWorkspace useCases={catalog.useCases} startingUseId={startingUse?.id} />
      </div>
    </main>
  );
}
