import { PageIntro } from "@/components/chrome";
import { TerritoryWorkspace } from "@/components/territory-workspace";
import { catalog } from "@/lib/catalog";

export const metadata = { title: "Territory" };

export default function TerritoryPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro
        kicker="Territory"
        title="An account brief you can defend"
        lede="Type only what you know. Unknown incumbents stay out of the fit score. The Markdown export carries your sources and the discovery questions for the use cases you select."
      />
      <div className="mt-8">
        <TerritoryWorkspace useCases={catalog.useCases} />
      </div>
    </main>
  );
}
