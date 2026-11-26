import Link from "next/link";
import { AGENTS, agentCoverageNotPublished, resolveAgentCoverage } from "@/lib/agent-coverage";
import { catalog } from "@/lib/catalog";
import { isProductResearchSlug } from "@/lib/product-destination";

/** Which agents each product's own recorded claim names. Semantic table; scrolls sideways on small screens. */
export function AgentCoverage() {
  const rows = resolveAgentCoverage();
  const unpublished = agentCoverageNotPublished
    .map((id) => catalog.products.find((product) => product.id === id)?.name)
    .filter(Boolean);
  return (
    <section aria-labelledby="agent-coverage" className="mt-10 min-w-0">
      <h2 id="agent-coverage" className="text-2xl">Which agents each product names</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
        Taken from one recorded claim per product, usually the vendor&apos;s own page. &ldquo;Listed&rdquo; means the claim names the agent; a blank means it does not, which is not proof of no support. Scope says what the claim is about.
      </p>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border" tabIndex={0} role="region" aria-label="Agent coverage table, scrolls sideways">
        <table className="w-full min-w-[64rem] border-collapse text-sm">
          <caption className="sr-only">AI agents named in each product&apos;s recorded claim</caption>
          <thead>
            <tr className="bg-muted/50 text-left align-bottom">
              <th scope="col" className="p-3 font-semibold">Product</th>
              <th scope="col" className="p-3 font-semibold">Scope</th>
              {AGENTS.map((agent) => <th key={agent.key} scope="col" className="p-3 font-semibold">{agent.label}</th>)}
              <th scope="col" className="p-3 font-semibold">Source</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.productId} className="border-t border-border">
                <th scope="row" className="p-3 text-left font-normal">
                  {isProductResearchSlug(row.product.slug) ? (
                    <Link href={`/products/${row.product.slug}`} className="inline-flex min-h-11 items-center text-primary underline underline-offset-4">{row.product.name}</Link>
                  ) : row.product.name}
                </th>
                <td className="p-3 text-muted-foreground">{row.scope}</td>
                {AGENTS.map((agent) => (
                  <td key={agent.key} className="p-3">
                    {(row.agents as readonly string[]).includes(agent.key) ? <span className="font-medium">Listed</span> : <span className="sr-only">Not listed</span>}
                  </td>
                ))}
                <td className="p-3">
                  <a href={row.claim.sourceUrl} aria-label={`Source for ${row.product.name}: ${row.claim.statement}`} className="inline-flex min-h-11 items-center text-primary underline underline-offset-4">Source</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">No public agent list recorded for: {unpublished.join(", ")}.</p>
    </section>
  );
}
