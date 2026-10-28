"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { relationshipLabel } from "@/lib/format";

export type RelationshipEntry = {
  id: string;
  fromId: string;
  toId: string;
  fromName: string;
  toName: string;
  fromSlug: string;
  toSlug: string;
  type: string;
  useCaseId: string;
  useCaseName: string;
  rationale: string;
  sourceUrl: string | null;
  sourceTitle: string | null;
};

export function RelationshipExplorer({ entries }: { entries: RelationshipEntry[] }) {
  const [product, setProduct] = useState("all");
  const [useCase, setUseCase] = useState("all");
  const [kind, setKind] = useState("all");
  const [limit, setLimit] = useState(24);
  const products = useMemo(() => [...new Map(entries.flatMap((edge) => [[edge.fromId, edge.fromName] as const, [edge.toId, edge.toName] as const])).entries()].sort((a, b) => a[1].localeCompare(b[1])), [entries]);
  const useCases = useMemo(() => [...new Map(entries.map((edge) => [edge.useCaseId, edge.useCaseName] as const)).entries()].sort((a, b) => a[1].localeCompare(b[1])), [entries]);
  const shown = entries.filter((edge) =>
    (product === "all" || edge.fromId === product || edge.toId === product) &&
    (useCase === "all" || edge.useCaseId === useCase) &&
    (kind === "all" || edge.type === kind)
  );
  const name = products.find(([id]) => id === product)?.[1];
  const visible = shown.slice(0, limit);
  const resetLimit = () => setLimit(24);

  return <section aria-labelledby="relationships-title" className="mt-10 rounded-2xl border border-border bg-card p-4 sm:p-6">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 id="relationships-title" className="font-heading text-2xl">Explore product relationships</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">Zoom from a product to its mapped alternatives and complements. Each connection is scoped to a buyer use case, not a universal competitor or verified integration claim.</p>
      </div>
      <button type="button" onClick={() => { setProduct("all"); setUseCase("all"); setKind("all"); resetLimit(); }} className="min-h-11 text-sm text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-ring">Show all relationships</button>
    </div>
    <div className="mt-5 grid gap-3 sm:grid-cols-3">
      <div><label htmlFor="edge-product" className="text-sm font-medium">Focus product</label>
      <select id="edge-product" value={product} onChange={(e) => { setProduct(e.target.value); resetLimit(); }} className="mt-1 min-h-11 w-full rounded-md border border-input bg-background px-2 text-sm"><option value="all">All products</option>{products.map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></div>
      <div><label htmlFor="edge-use" className="text-sm font-medium">Buyer use case</label>
      <select id="edge-use" value={useCase} onChange={(e) => { setUseCase(e.target.value); resetLimit(); }} className="mt-1 min-h-11 w-full rounded-md border border-input bg-background px-2 text-sm"><option value="all">All use cases</option>{useCases.map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></div>
      <div><label htmlFor="edge-kind" className="text-sm font-medium">Connection type</label>
      <select id="edge-kind" value={kind} onChange={(e) => { setKind(e.target.value); resetLimit(); }} className="mt-1 min-h-11 w-full rounded-md border border-input bg-background px-2 text-sm"><option value="all">All relationship types</option>{["direct_competitor", "bundled_alternative", "complement", "adjacent_budget"].map((type) => <option value={type} key={type}>{relationshipLabel(type)}</option>)}</select></div>
    </div>
    {name ? <p className="mt-4 text-sm font-medium">Focused on {name}. Select another connected product to explore sideways.</p> : null}
    <p role="status" className="mt-4 text-sm text-muted-foreground">{shown.length} mapped relationships. No ranking or capability equivalence implied.</p>
    {shown.length === 0 ? <p className="mt-3 rounded-lg border border-dashed p-4 text-sm">No recorded relationship matches. This means unknown, not that products cannot work together.</p> :
      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {visible.map((edge) => <li key={edge.id} className="rounded-xl border border-border bg-background p-4">
          <p className="text-xs text-muted-foreground">{edge.useCaseName} · {relationshipLabel(edge.type)}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm font-semibold">
            <button type="button" onClick={() => { setProduct(edge.fromId); resetLimit(); }} className="min-h-11 text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-ring">{edge.fromName}</button>
            <span aria-hidden="true">↔</span>
            <button type="button" onClick={() => { setProduct(edge.toId); resetLimit(); }} className="min-h-11 text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-ring">{edge.toName}</button>
          </div>
          <p className="mt-2 text-sm leading-6">{edge.rationale}</p>
          <div className="mt-3 flex flex-wrap gap-4 text-xs">
            <Link href={`/vendors/${edge.fromSlug}`} className="text-primary underline-offset-4 hover:underline">View {edge.fromName}</Link>
            <Link href={`/vendors/${edge.toSlug}`} className="text-primary underline-offset-4 hover:underline">View {edge.toName}</Link>
            {edge.sourceUrl ? <a target="_blank" rel="noopener noreferrer" href={edge.sourceUrl} className="text-primary underline-offset-4 hover:underline">Source: {edge.sourceTitle}</a> : <span className="text-muted-foreground">No linked source: interpret as an editorial relationship hypothesis</span>}
          </div>
        </li>)}
      </ul>}
    {shown.length > visible.length ? <button type="button" onClick={() => setLimit((previous) => previous + 24)} className="mt-4 min-h-11 rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring">Show more relationships ({visible.length} of {shown.length} shown)</button> : null}
  </section>;
}
