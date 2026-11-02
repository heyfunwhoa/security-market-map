import Link from "next/link";
import type { Category } from "@/lib/schema";

export function ProductBuyerContext({ categories, primaryIds, adjacentIds }: {
  categories: Category[]; primaryIds: string[]; adjacentIds: string[];
}) {
  const context = categories.filter((category) => primaryIds.includes(category.id) || adjacentIds.includes(category.id));
  return <section aria-label="Buyer and category context" className="mt-4 rounded-lg border border-border bg-muted/30 p-4">
    <h4 className="font-semibold">Buyer context</h4>
    <p className="mt-1 text-sm text-muted-foreground">Category-level buying context, not verified product coverage. Source-backed product claims and research gaps appear below.</p>
    {context.length ? <ul className="mt-3 grid gap-4 sm:grid-cols-2">{context.map((category) => <li key={category.id}>
      <Link href={`/categories/${category.slug}`} className="inline-flex min-h-11 items-center font-medium text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring">{category.name}</Link>
      <p className="text-xs text-muted-foreground">{primaryIds.includes(category.id) ? "Primary category" : "Adjacent category"}</p>
      <dl className="mt-2 space-y-2 text-sm"><div><dt className="font-medium">Buyer / owner</dt><dd>{category.buyerOwner}</dd></div><div><dt className="font-medium">Decision to make</dt><dd>{category.buyerQuestion}</dd></div></dl>
    </li>)}</ul> : <p className="mt-2 text-sm">Unknown: no category context recorded.</p>}
  </section>;
}
