"use client";

import { useState } from "react";
import Link from "next/link";
import { marketAreas, type MarketArea } from "@/lib/market-areas";

const ATTACK_PATH = [
  { label: "Identity", detail: "An identity gets access." },
  { label: "Application or network", detail: "It uses an application or network path." },
  { label: "Workload", detail: "The path reaches a workload." },
  { label: "Data", detail: "The workload may affect data." },
];

function AreaDetail({ area }: { area: MarketArea }) {
  return (
    <div>
      <h3 id="market-map-detail-title" className="font-heading text-lg leading-tight">
        {area.name}
      </h3>
      <p className="mt-2 text-sm leading-6">{area.question}</p>
      <p className="mt-3 text-xs tracking-wide text-muted-foreground uppercase">Categories</p>
      <p className="mt-1 text-sm leading-6">{area.categories}</p>
      <p className="mt-3 text-xs tracking-wide text-muted-foreground uppercase">
        Illustrative vendors
      </p>
      <p className="mt-1 text-sm leading-6">{area.examples}</p>
      <Link
        href={area.href}
        className="mt-4 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Open this area
      </Link>
    </div>
  );
}

export function MarketMapExplorer() {
  const [activeId, setActiveId] = useState("identity");
  const active = marketAreas.find((area) => area.id === activeId) ?? marketAreas[0];

  return (
    <figure className="mt-6">
      <figcaption className="max-w-3xl text-sm leading-6 text-muted-foreground">
        An illustrative incident path and the market areas teams use to understand it are related,
        but they are different views. Follow the path, then select a market area to inspect its
        question, categories, and examples. All areas have equal visual weight.
      </figcaption>

      <section
        className="mt-4 rounded-2xl border border-border bg-card p-4 sm:p-5"
        aria-labelledby="market-map-path-heading"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 id="market-map-path-heading" className="font-heading text-lg">
            Illustrative path through an environment
          </h3>
          <span className="text-xs text-muted-foreground">A sequence, not a coverage claim</span>
        </div>
        <ol className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4" aria-label="Illustrative incident path">
          {ATTACK_PATH.map((step, index) => (
            <li key={step.label} className="flex min-h-24 items-center gap-3 rounded-xl border border-border bg-background p-3">
              <span
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <span>
                <span className="block text-sm font-semibold">{step.label}</span>
                <span className="mt-1 block text-sm leading-5 text-muted-foreground">{step.detail}</span>
              </span>
            </li>
          ))}
        </ol>
        <Link href="/attack-path" className="mt-3 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          Explore the five-step coding-agent scenario
        </Link>
      </section>

      <div className="mt-4 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <h3 className="font-heading text-lg">Market areas</h3>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Every tile is the same size. Accent color identifies a tile; it does not indicate rank,
            spend, evidence strength, or capability.
          </p>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3" aria-label="Security market areas">
            {marketAreas.map((area) => {
              const selected = area.id === active.id;
              return (
                <li key={area.id}>
                  <button
                    type="button"
                    aria-pressed={selected}
                    aria-label={`${area.name}. ${area.question}`}
                    onClick={() => setActiveId(area.id)}
                    className={`flex h-24 w-full items-center gap-3 rounded-xl border bg-card p-4 text-left transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      selected ? "border-primary shadow-sm" : "border-border hover:bg-muted"
                    }`}
                  >
                    <span
                      className="mt-1 size-3 shrink-0 rounded-sm border border-foreground/15"
                      style={{ backgroundColor: area.fill }}
                      aria-hidden="true"
                    />
                    <span className="min-w-0 font-semibold leading-5 text-balance">
                      {area.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <aside
          className="rounded-2xl border border-border bg-card p-4"
          aria-labelledby="market-map-detail-title"
          aria-live="polite"
        >
          <AreaDetail area={active} />
        </aside>
      </div>
    </figure>
  );
}
