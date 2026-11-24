import { type buyerComparison, ssoCriteria } from "@/lib/buyer-comparison";
import { Button } from "@/components/ui/button";

type Comparison = NonNullable<ReturnType<typeof buyerComparison>>;

export function BuyerComparisonGuide({ comparison }: { comparison: Comparison }) {
  const { products, findings, use, hasSso, prices, defaults } = comparison;
  const criteria = [...ssoCriteria, { title: "Commercial terms", ids: prices.map((price) => price.id), ask: "Quote the same number of tenants, connections and active users. Include provisioning and support in both proposals." }];
  return (
    <div className="mt-6 space-y-4">
      {hasSso && <section aria-labelledby="sso-decision" className="rounded-xl border border-border p-4">
        <h2 id="sso-decision" tabIndex={-1} className="scroll-mt-24 text-2xl">Enterprise SSO for an existing login</h2>
        {criteria.map((criterion, index) => (
          <details key={criterion.title} open={index === 0} className="mt-2 border-t border-border">
            <summary className="cursor-pointer py-3 font-semibold">{criterion.title}</summary>
            <dl className="grid gap-3 text-sm leading-6 sm:grid-cols-2">
              {products.map((product) => {
                const fact = criterion.ids.map((id) => findings.get(id)).find((entry) => entry?.productId === product.id);
                return <div key={product.id}><dt className="font-semibold">{product.name}</dt>
                  <dd>{fact ? <>{fact.statement} <a className="text-primary underline" href={fact.url}>{fact.label}</a> <span className="text-xs text-muted-foreground">· {fact.attribution}, checked {fact.checked}</span></> : "Unknown. No reviewed source answers this question here."}</dd></div>;
              })}
            </dl>
            <p className="mt-3 pb-3 text-sm"><strong>Verify in discovery. </strong>{criterion.ask}</p>
          </details>
        ))}
      </section>}
      <form action="/territory" method="get" className="rounded-xl border border-border bg-card p-4">
        <input type="hidden" name="use" value={use.id} />
        <input type="hidden" name="products" value={products.map((p) => p.id).join(",")} />
        <h2 id="brief-findings" tabIndex={-1} className="scroll-mt-24 text-xl">Take this comparison into discovery</h2>
        <p className="mt-1 text-sm text-muted-foreground">Bring the shortlist, up to two cited findings, an open question and a pilot into an editable account brief.</p>
        {findings.size > 0 && <details className="my-2">
          <summary className="cursor-pointer py-2 text-sm font-medium">Choose findings for the brief</summary>
          {[0, 1].map((index) => <div key={index} className="mt-2 text-sm">
            <label htmlFor={`brief-finding-${index}`}>Finding {index + 1}</label>
            <select id={`brief-finding-${index}`} key={defaults.join(",")} name={`finding${index + 1}`} defaultValue={defaults[index] ?? ""} className="mt-1 block min-h-11 w-full min-w-0 max-w-full rounded-md border border-input bg-background px-2">
              <option value="">Leave this finding open</option>
              {[...findings.values()].map((f) => <option key={f.id} value={f.id}>{f.product} · {f.statement}</option>)}
            </select></div>)}
        </details>}
        <Button type="submit" className="mt-2 min-h-11">Use this comparison in my brief</Button>
      </form>
    </div>
  );
}
