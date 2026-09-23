import Link from "next/link";
import { PageIntro } from "@/components/chrome";
import { catalog } from "@/lib/catalog";

export const metadata = { title: "Use cases" };

export default function UseCasesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro
        kicker="Use cases"
        title="The buying question, before the shortlist"
        lede="Each use case names the problem, who pays, what good looks like, and the questions that keep a discovery call honest."
      />
      <ul className="mt-8 grid gap-3">
        {catalog.useCases.map((useCase) => (
          <li key={useCase.id}>
            <Link
              href={`/use-cases/${useCase.slug}`}
              className="block rounded-xl border border-border bg-card p-4 hover:bg-muted"
            >
              <span className="text-lg font-semibold">{useCase.name}</span>
              <span className="mt-1 block text-sm leading-6 text-muted-foreground">{useCase.buyerQuestion}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
