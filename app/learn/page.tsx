import Link from "next/link";
import { CedarRidgeScenario } from "@/components/cedar-ridge-scenario";
import { AwsFoundationsCourse } from "@/components/aws-foundations-course";
import { cedarRidgeId } from "@/lib/data/cedar-ridge";
import { DistinctionCards } from "@/components/claims";
import { PageIntro } from "@/components/chrome";
import { ScenarioPlayer, type ScenarioView } from "@/components/scenario-player";
import { catalog, vendorById } from "@/lib/catalog";
import { evidenceCell } from "@/lib/compare";

export const metadata = { title: "Learn" };

export default async function LearnPage({
  searchParams,
}: {
  searchParams: Promise<{ scenario?: string; mode?: string; step?: string }>;
}) {
  const { scenario, mode, step } = await searchParams;
  const scenarios: ScenarioView[] = catalog.scenarios.map((scenario) => ({
    ...scenario,
    steps: scenario.steps.map((step) => {
      const category = catalog.categories.find((item) => item.id === step.categoryId);
      const capability = catalog.capabilities.find((item) => item.id === step.capabilityId);
      const evidenced = catalog.products.flatMap((product) => {
        const cell = evidenceCell(catalog.claims, product.id, step.capabilityId, catalog.asOf);
        if (cell.status !== "evidenced" && cell.status !== "limited") return [];
        const vendor = vendorById(product.vendorId);
        return [{ name: product.name, href: `/vendors/${vendor?.slug ?? ""}` }];
      });
      return {
        ...step,
        categoryName: category?.name ?? step.categoryId,
        categorySlug: category?.slug ?? step.categoryId,
        capabilityName: capability?.name ?? step.capabilityId,
        evidenced,
      };
    }),
  }));

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro
        kicker="Learn"
        title="The words a cybersecurity analyst needs before the logo slide"
        lede="Explore the glossary, investigate suspicious AWS workload access in the Cedar Ridge scenario, or walk through two calls about a leaked key and standing administrator access."
      />

      {scenario !== cedarRidgeId && <AwsFoundationsCourse />}

      {scenario === cedarRidgeId ? (
        <CedarRidgeScenario mode={mode} step={step} />
      ) : (
        <section className="mt-8 rounded-xl border border-border bg-card p-4" aria-labelledby="cedar-ridge-entry">
          <h2 id="cedar-ridge-entry" className="text-xl">Cedar Ridge Health</h2>
          <p className="mt-2 text-sm">Investigate suspicious access to S3 by a workload identity in a fictional AWS environment.</p>
          <Link className="mt-2 inline-flex min-h-11 items-center text-primary underline" href={`/learn?scenario=${cedarRidgeId}#${cedarRidgeId}`}>
            Start the Cedar Ridge scenario
          </Link>
        </section>
      )}

      <section className="mt-10" aria-labelledby="glossary-heading">
        <h2 id="glossary-heading" className="text-3xl">
          Glossary
        </h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {catalog.glossary.map((term) => (
            <article key={term.id} id={term.id} className="rounded-xl border border-border bg-card p-4">
              <h3 className="text-xl">{term.term}</h3>
              <p className="mt-2 text-sm leading-6">{term.definition}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12" id="distinctions">
        <DistinctionCards items={catalog.distinctions} />
      </section>

      <section className="mt-12" id="scenarios">
        <h2 className="text-3xl">Two calls</h2>
        <div className="mt-4">
          <ScenarioPlayer scenarios={scenarios} initialScenarioId={scenario} />
        </div>
      </section>
    </main>
  );
}
