import Link from "next/link";
import { StatusPill } from "@/components/chrome";
import { resolveDecisionGuide } from "@/lib/decision-guide";
import { isProductResearchSlug } from "@/lib/product-destination";

/** Semantic table; scrolls horizontally on narrow screens. No motion. */
export function DecisionGuide({ useCaseId }: { useCaseId: string }) {
  const guide = resolveDecisionGuide(useCaseId);
  if (!guide) return null;
  return (
    <section aria-labelledby="decision-guide" className="mt-10 min-w-0">
      <h2 id="decision-guide" className="text-2xl">{guide.title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{guide.intro}</p>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border" tabIndex={0} role="region" aria-label="Decision guide table, scrolls sideways">
        <table className="w-full min-w-[56rem] border-collapse text-sm">
          <caption className="sr-only">{guide.title}</caption>
          <thead>
            <tr className="bg-muted/50 text-left align-bottom">
              <th scope="col" className="p-3 font-semibold">Product</th>
              {guide.capabilities.map((capability) => (
                <th key={capability.id} scope="col" className="p-3 font-semibold">{capability.name}</th>
              ))}
            </tr>
          </thead>
          {guide.groups.map((group) => (
            <tbody key={group.approach}>
              <tr>
                <th scope="colgroup" colSpan={guide.capabilities.length + 1} className="border-t border-border bg-card p-3 text-left font-medium">
                  {group.approach}
                </th>
              </tr>
              {group.rows.map(({ product, cells }) => (
                <tr key={product.id} className="border-t border-border">
                  <th scope="row" className="p-3 text-left font-normal">
                    {isProductResearchSlug(product.slug) ? (
                      <Link href={`/products/${product.slug}`} className="inline-flex min-h-11 items-center text-primary underline underline-offset-4">{product.name}</Link>
                    ) : product.name}
                  </th>
                  {cells.map(({ capability, status }) => (
                    <td key={capability.id} className="p-3"><StatusPill status={status} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">Open a product for its sources, what is not proven and how to test it in a pilot.</p>
    </section>
  );
}
