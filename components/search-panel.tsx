"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { searchHits, type SearchHit } from "@/lib/search";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export const OPEN_SEARCH_EVENT = "atlas-search-open";

export function openSearch() {
  window.dispatchEvent(new Event(OPEN_SEARCH_EVENT));
}

export function SearchCommand({ hits }: { hits: SearchHit[] }) {
  const router = useRouter();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const navigating = useRef(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchHits(query, hits), [query, hits]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    }
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_SEARCH_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_SEARCH_EVENT, onOpen);
    };
  }, []);

  function choose(href: string) {
    navigating.current = true;
    setOpen(false);
    setQuery("");
    router.push(href);
  }

  return (
    <>
      <Button
        ref={triggerRef}
        type="button"
        variant="outline"
        size="sm"
        className="min-h-11 min-w-11 px-3"
        onClick={() => setOpen(true)}
        aria-label="Search the map"
        aria-keyshortcuts="Control+K Meta+K"
      >
        <Search />
        <span className="hidden sm:inline">Search</span>
      </Button>
      <CommandDialog
        open={open}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          if (!navigating.current) triggerRef.current?.focus();
          navigating.current = false;
        }}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) setQuery("");
        }}
        title="Search the map"
        description="Search domains, vendors, products, use cases, glossary terms, and claims."
      >
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder="Try Opal Zero, standing privilege, or vault"
          aria-label="Search the map"
        />
        <CommandList aria-label="Search results">
          <CommandEmpty>
            {query.trim().length < 2 ? "Type at least two letters." : "Nothing in the seed matches that."}
          </CommandEmpty>
          {results.map((hit) => (
            <CommandItem
              key={`${hit.kind}-${hit.href}-${hit.title}`}
              value={`${hit.kind} ${hit.href} ${hit.title}`}
              onSelect={() => choose(hit.href)}
            >
              <span className="mt-0.5 shrink-0 text-xs tracking-wide text-muted-foreground uppercase">
                {hit.kind}
              </span>
              <span className="min-w-0 font-medium">{hit.title}</span>
            </CommandItem>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}

export function SearchPanel() {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-sm font-semibold">Search the map</p>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">
        Domains, vendors, products, use cases, glossary terms, and claims. The same search is in the header.
      </p>
      <Button type="button" variant="outline" className="mt-3" onClick={openSearch}>
        <Search />
        Search
        <span className="text-xs text-muted-foreground">Ctrl K</span>
      </Button>
    </div>
  );
}
