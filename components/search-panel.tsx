"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { searchHits, type SearchHit } from "@/lib/catalog";
import { Input } from "@/components/ui/input";

export function SearchPanel({ hits }: { hits: SearchHit[] }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchHits(query, hits), [query, hits]);

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <label htmlFor="atlas-search" className="text-sm font-semibold">
        Search the map
      </label>
      <Input
        id="atlas-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Try Opal Zero, standing privilege, or vault"
        className="mt-2 h-10 bg-background"
        aria-controls="atlas-search-results"
      />
      <ul id="atlas-search-results" className="mt-3 space-y-2" aria-live="polite">
        {query.trim().length >= 2 && results.length === 0 ? (
          <li className="text-sm text-muted-foreground">Nothing in the seed matches that.</li>
        ) : null}
        {results.map((hit) => (
          <li key={`${hit.kind}-${hit.href}-${hit.title}`}>
            <Link
              href={hit.href}
              className="block rounded-md px-2 py-1.5 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="text-xs tracking-wide text-muted-foreground uppercase">{hit.kind}</span>
              <span className="mt-0.5 block text-sm font-medium">{hit.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
