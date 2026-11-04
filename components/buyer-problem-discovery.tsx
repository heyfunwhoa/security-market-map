"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export type BuyerProblem = {
  id: string;
  slug: string;
  name: string;
  buyerQuestion: string;
  problem: string;
  categories: { id: string; name: string }[];
};

export function BuyerProblemDiscovery({ problems }: { problems: BuyerProblem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const categories = useMemo(() =>
    [...new Map(problems.flatMap((item) => item.categories.map((part) => [part.id, part.name] as const))).entries()]
      .sort((a, b) => a[1].localeCompare(b[1])), [problems]);
  const shown = useMemo(() => {
    const q = query.toLocaleLowerCase().trim();
    return problems.filter((item) =>
      (category === "all" || item.categories.some((part) => part.id === category)) &&
      (!q || [item.name, item.buyerQuestion, item.problem, ...item.categories.map((part) => part.name)]
        .some((field) => field.toLocaleLowerCase().includes(q)))
    ).sort((a, b) => a.name.localeCompare(b.name));
  }, [problems, query, category]);
  return <section aria-labelledby="buyer-problems-title">
    <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
      <h2 id="buyer-problems-title" className="font-heading text-xl">What problem are you trying to solve?</h2>
      <p className="mt-2 text-sm text-muted-foreground">Start with a buyer&apos;s question, then explore architectures, categories and products. Results are catalog matches, not ranked recommendations.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_16rem]">
        <div><label htmlFor="problem-query" className="block text-sm font-medium">Search a problem or question</label>
        <input id="problem-query" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="e.g. secure machine credentials" className="mt-1 min-h-11 w-full rounded-md border border-input bg-background px-3 text-sm" /></div>
        <div><label htmlFor="problem-category" className="block text-sm font-medium">Market category</label>
        <select id="problem-category" value={category} onChange={(event) => setCategory(event.target.value)} className="mt-1 min-h-11 w-full rounded-md border border-input bg-background px-2 text-sm">
        <option value="all">All categories</option>{categories.map(([id, name]) => <option key={id} value={id}>{name}</option>)}
        </select></div>
      </div>
      <button type="button" onClick={() => { setQuery(""); setCategory("all"); }} className="mt-3 min-h-11 text-sm text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-ring">Zoom out to all problems</button>
    </div>
    <p role="status" className="mt-4 text-sm text-muted-foreground">{shown.length} buyer problems in this catalog. Missing results are not proof that a problem or vendor does not exist.</p>
    {shown.length === 0 ? <p className="mt-3 rounded-lg border border-dashed border-border p-5 text-sm">No matching mapped buyer problem. Clear filters to broaden your view.</p> :
    <ul className="mt-4 grid gap-3 md:grid-cols-2">
      {shown.map((item) => <li key={item.id}>
        <Link href={`/use-cases/${item.slug}`} className="block h-full rounded-xl border border-border bg-card p-4 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="mt-2 text-sm leading-6">{item.buyerQuestion}</p>
          <p className="mt-2 text-xs text-muted-foreground">{item.categories.map((part) => part.name).join(" · ")}</p>
          <span className="mt-3 inline-block text-sm font-medium text-primary">Explore buyer problem and options</span>
        </Link>
      </li>)}
    </ul>}
  </section>;
}
