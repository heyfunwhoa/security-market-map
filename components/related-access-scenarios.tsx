import Link from "next/link";
import { ClaimList } from "@/components/claims";
import { catalog, categoryBySlug, sourceById } from "@/lib/catalog";
import { formatDate } from "@/lib/format";
import scenarios from "@/research/related-access-scenarios.json";

const link = "text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
const byId = new Map(catalog.claims.map((claim) => [claim.id, claim]));

export function RelatedAccessScenarios() {
  return (
    <section aria-labelledby="related-access-scenarios" className="max-w-4xl space-y-4 rounded-xl border border-border p-4 sm:p-6">
      <h2 id="related-access-scenarios" tabIndex={-1} className="scroll-mt-24 text-2xl">When one access change leaves another path open</h2>
      <p className="leading-7">Removing a person, changing a permission or replacing a credential can each leave another way to reach the same resource. Choose a situation to see who owns it, what to ask and what evidence the team could collect. The evaluations are illustrative. Each platform behavior links to its publisher.</p>
      {scenarios.map((item) => (
        <details key={item.id} className="rounded-lg border border-border px-4">
          <summary className="cursor-pointer py-3 font-semibold focus-visible:outline-2 focus-visible:outline-ring">{item.title}</summary>
          <div className="space-y-3 pb-4 text-sm leading-6">
            <p>{item.scenario}</p>
            <dl className="space-y-2">
              <div><dt className="font-semibold">Who owns it?</dt><dd>{item.owner}</dd></div>
              <div><dt className="font-semibold">Ask in discovery</dt><dd>{item.question}</dd></div>
              <div><dt className="font-semibold">What would prove it?</dt><dd>{item.proof}</dd></div>
              <div><dt className="font-semibold">What could we miss?</dt><dd>{item.limit}</dd></div>
            </dl>
            {item.claimIds.length > 0 && <ClaimList claims={item.claimIds.map((id) => byId.get(id)!)} />}
            {item.sourceIds.map((id) => {
              const source = sourceById(id)!;
              return (
                <div key={id} className="space-y-1 rounded-lg border border-border p-3">
                  <p>{source.excerpt}</p>
                  <a className={link} href={source.canonicalUrl}>{source.publisher} · {source.title}</a>
                  <p className="text-xs text-muted-foreground">Official documentation · Checked {formatDate(source.retrievedAt)}</p>
                </div>
              );
            })}
            <Link className={link} href={`/categories/${item.categoryId}`}>Explore {categoryBySlug(item.categoryId)!.name}</Link>
          </div>
        </details>
      ))}
    </section>
  );
}
