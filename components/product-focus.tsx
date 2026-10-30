"use client";

import { useState } from "react";
import { PRODUCT_ANCHOR_CLASS, moveFocusStage } from "@/lib/product-research";

export type FocusStage = { title: string; summary: string; check: string; boundary: string };

const controlClass =
  "min-h-11 rounded-md border border-border px-3 text-sm font-medium hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-disabled:hover:bg-transparent";

export function ProductFocus({ stages }: { stages: readonly FocusStage[] }) {
  const [active, setActive] = useState<number | null>(null);
  const current = active === null ? null : stages[active];
  const move = (action: "previous" | "next" | "all") => setActive(moveFocusStage(active, action, stages.length));

  return (
    <section aria-labelledby="product-focus-title" className="mt-8 rounded-xl border border-border bg-card p-4 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 id="product-focus-title" tabIndex={-1} className={`${PRODUCT_ANCHOR_CLASS} text-xl font-semibold`}>
            Zoom in: one control at a time
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose a stage to focus on its decision, evidence and limits. This is an explanation, not a live scanner.
          </p>
        </div>
        <button type="button" onClick={() => move("all")} aria-disabled={active === null} className={controlClass}>
          Show all stages
        </button>
      </div>
      <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-5" role="group" aria-label="Focus stage">
        {stages.map((stage, index) => (
          <button
            key={stage.title}
            type="button"
            aria-pressed={active === index}
            onClick={() => setActive(index)}
            className={`min-h-14 rounded-lg border px-3 py-3 text-left text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${active === index ? "border-primary bg-muted font-semibold" : "border-border hover:bg-muted"}`}
          >
            <span className="block text-xs text-muted-foreground">Stage {index + 1}</span>
            {stage.title}
          </button>
        ))}
      </div>
      <div className="mt-5" aria-live="polite">
        {current ? (
          <div className="rounded-lg border border-border p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Focused stage</p>
            <h3 className="mt-1 text-lg font-semibold">{current.title}</h3>
            <p className="mt-2 text-sm leading-6">{current.summary}</p>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-semibold">What to verify</dt>
                <dd className="mt-1 leading-6 text-muted-foreground">{current.check}</dd>
              </div>
              <div>
                <dt className="font-semibold">Boundary / remaining risk</dt>
                <dd className="mt-1 leading-6 text-muted-foreground">{current.boundary}</dd>
              </div>
            </dl>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Overview mode: all stages are available. Select a stage for focused details.</p>
        )}
      </div>
      {current ? (
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" className={controlClass} aria-disabled={active === 0} onClick={() => move("previous")}>
            Previous
          </button>
          <button type="button" className={controlClass} aria-disabled={active === stages.length - 1} onClick={() => move("next")}>
            Next
          </button>
        </div>
      ) : null}
    </section>
  );
}
