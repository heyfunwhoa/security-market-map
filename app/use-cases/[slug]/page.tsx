import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro, StatusPill } from "@/components/chrome";
import { catalog, findUseCase, vendorById } from "@/lib/catalog";
import { relationshipLabel } from "@/lib/format";

export function generateStaticParams() {
  return catalog.useCases.map((useCase) => ({ slug: useCase.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const useCase = findUseCase(slug);
  return { title: useCase?.name ?? "Use case" };
}

export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const useCase = findUseCase(slug);
  if (!useCase) notFound();

  const candidates = catalog.products.filter((product) => product.useCaseIds.includes(useCase.id));
  const edges = catalog.relationships.filter((relationship) => relationship.useCaseId === useCase.id);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro kicker="Use case" title={useCase.name} lede={useCase.buyerQuestion} />
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6 text-sm leading-6">
          <section>
            <h2 className="text-2xl">Problem</h2>
            <p className="mt-2">{useCase.problem}</p>
          </section>
          <section>
            <h2 className="text-2xl">Architecture</h2>
            <p className="mt-2">{useCase.architecture}</p>
          </section>
          <section>
            <h2 className="text-2xl">Discovery questions</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              {useCase.discoveryQuestions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </section>
        </div>
        <aside className="space-y-4 rounded-xl border border-border bg-card p-4 text-sm">
          <p>
            <span className="font-semibold">Budget owner. </span>
            {useCase.budgetOwner}
          </p>
          <p>
            <span className="font-semibold">Stakeholders. </span>
            {useCase.stakeholders.join(", ")}
          </p>
          <p>
            <span className="font-semibold">Triggers. </span>
            {useCase.triggers.join("; ")}
          </p>
          <div>
            <p className="font-semibold">Success metrics you can measure</p>
            <ul className="mt-1 list-disc pl-5">
              {useCase.successMetrics.map((metric) => (
                <li key={metric}>{metric}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl">Candidates</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Listed because the product is tagged for this use case. Open Compare before you treat that as a
          capability.
        </p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {candidates.map((product) => (
            <li key={product.id}>
              <Link
                href={`/vendors/${vendorById(product.vendorId)?.slug ?? ""}`}
                className="block rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted"
              >
                <span className="font-medium">{product.name}</span>
                <span className="mt-1 block text-muted-foreground">{product.positioning}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl">Relationships that apply here</h2>
        {edges.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">None seeded for this use case.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {edges.map((edge) => {
              const from = catalog.products.find((product) => product.id === edge.fromProductId);
              const to = catalog.products.find((product) => product.id === edge.toProductId);
              return (
                <li key={edge.id} className="rounded-xl border border-border bg-card p-4 text-sm leading-6">
                  <StatusPill status={edge.type} />
                  <p className="mt-2 font-medium">
                    {relationshipLabel(edge.type)}: {from?.name} and {to?.name}
                  </p>
                  <p className="mt-1 text-muted-foreground">{edge.rationale}</p>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
