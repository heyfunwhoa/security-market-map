import { CompareWorkbench } from "@/components/compare-workbench";
import { PageIntro } from "@/components/chrome";
import { catalog } from "@/lib/catalog";

export const metadata = { title: "Compare" };

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ use?: string; products?: string }>;
}) {
  const params = await searchParams;
  const useCaseId = catalog.useCases.some((useCase) => useCase.id === params.use)
    ? params.use!
    : "uc-jml";
  const requested = (params.products ?? "c1-platform,opal-platform,sailpoint-isc,saviynt-eic")
    .split(",")
    .map((id) => id.trim())
    .filter((id) => catalog.products.some((product) => product.id === id))
    .slice(0, 4);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro
        kicker="Compare"
        title="Evidence in the cell, or the word Unknown"
        lede="C1 versus Opal is a mechanism comparison, not a logo comparison. Secrets detection, vaulting, and NHI governance stay on different rows. Category membership never fills a checkbox."
      />
      <div className="mt-8">
        <CompareWorkbench
          products={catalog.products}
          useCases={catalog.useCases}
          capabilities={catalog.capabilities}
          claims={catalog.claims}
          asOf={catalog.asOf}
          initialUseCase={useCaseId}
          initialProducts={requested}
        />
      </div>
    </main>
  );
}
