import { seatsForUseCase } from "@/lib/persona-graph";
import { productDestination } from "@/lib/product-destination";
import Link from "next/link";
import { DiscoveryQuestions } from "@/components/discovery-questions";
import { notFound } from "next/navigation";
import { PageIntro, StatusPill } from "@/components/chrome";
import { catalog, findUseCase, vendorById } from "@/lib/catalog";
import { pageMetadata } from "@/lib/page-metadata";
import { shortlistUrl } from "@/lib/landscape-shortlist";
import { relationshipLabel } from "@/lib/format";

export function generateStaticParams() {
  return catalog.useCases.map((useCase) => ({ slug: useCase.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const useCase = findUseCase(slug);
  if (!useCase) return { title: "Use case" };
  return pageMetadata({ title: useCase.name, description: `${useCase.buyerQuestion} ${useCase.problem}`, path: `/use-cases/${useCase.slug}` });
}

export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const useCase = findUseCase(slug);
  if (!useCase) notFound();

  const candidates = catalog.products.filter((product) => product.useCaseIds.includes(useCase.id));
  const { seats } = seatsForUseCase(useCase.id);
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
            <DiscoveryQuestions useCase={useCase} />
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
          {seats.length > 0 && <div>
            <h2 className="font-semibold">Buyer profiles</h2>
            <ul className="flex flex-wrap gap-x-4">{seats.map((seat) => <li key={seat.id}><Link className="inline-flex min-h-11 items-center text-primary underline" href={`/personas/${seat.id}`}>{seat.name}</Link></li>)}</ul>
          </div>}
          <div>
            <p className="font-semibold">Success metrics you can measure</p>
            <ul className="mt-1 list-disc pl-5">
              {useCase.successMetrics.map((metric) => (
                <li key={metric}>{metric}</li>
              ))}
            </ul>
          </div>
          <nav aria-label="Account preparation" className="flex flex-wrap gap-x-4">
            <Link href="/territory" className="inline-flex min-h-11 items-center text-primary underline">Prepare an account brief</Link>
            <Link href="/budget" className="inline-flex min-h-11 items-center text-primary underline">Open budget worksheet</Link>
          </nav>
        </aside>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl">Candidates</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          These products are mapped to this buyer question. Compare their documented capabilities and research gaps.
        </p>
        <Link href={`/landscape?useCase=${encodeURIComponent(useCase.id)}`} className="inline-flex min-h-11 items-center font-medium text-primary underline underline-offset-4">Build a shortlist for this use case</Link>
        {useCase.comparisonShortlists && (
          <nav aria-labelledby="comparison-shortlists" className="my-4">
            <h3 id="comparison-shortlists" className="text-lg font-semibold">{useCase.comparisonShortlists.title}</h3>
            <ul className="mt-1">
              {useCase.comparisonShortlists.options.map(({ label, productIds }) => (
                <li key={label}>
                  <Link href={shortlistUrl(productIds, useCase.id)} className="inline-flex min-h-11 items-center text-primary underline underline-offset-4">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            {useCase.comparisonShortlists.worksheets && (
              <ul aria-label="Evaluation worksheets" className="flex flex-wrap gap-x-5">
                {useCase.comparisonShortlists.worksheets.map(({ label, path }) => (
                  <li key={path}>
                    <a href={path} download className="inline-flex min-h-11 items-center text-primary underline underline-offset-4">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </nav>
        )}
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {candidates.map((product) => (
            <li key={product.id}>
              <Link
                href={productDestination(product, vendorById(product.vendorId)!.slug)}
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
                  {from && to && edge.type === "direct_competitor" && (
                    <Link href={shortlistUrl([from.id, to.id], useCase.id)} className="inline-flex min-h-11 items-center text-primary underline underline-offset-4">
                      Compare {from.name} and {to.name} for this use case
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
