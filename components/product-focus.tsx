"use client";

import { useState } from "react";

export type FocusStage = { title: string; summary: string; check: string; boundary: string };

export function ProductFocus({ stages }: { stages: readonly FocusStage[] }) {
  const [active, setActive] = useState<number | null>(null);
  const current = active === null ? null : stages[active];
  return (
    <section aria-labelledby="product-focus-title" className="mt-8 rounded-xl border border-border bg-card p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="product-focus-title" className="text-xl font-semibold">Zoom in: one control at a time</h2>
          <p className="mt-1 text-sm text-muted-foreground">Choose a stage to focus on its decision, evidence and limits. This is an explanation, not a live scanner.</p>
        </div>
        <button type="button" onClick={() => setActive(null)} disabled={active === null} className="min-h-11 rounded-md border border-border px-3 text-sm font-medium enabled:hover:bg-muted disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">Show all stages</button>
      </div>
      <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-5" role="group" aria-label="Focus stage">
        {stages.map((stage, index) => (
          <button key={stage.title} type="button" aria-pressed={active === index}
            onClick={() => setActive(index)}
            className={`min-h-14 rounded-lg border px-3 py-3 text-left text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${active === index ? "border-primary bg-muted font-semibold" : "border-border hover:bg-muted"}`}>
            <span className="block text-xs text-muted-foreground">Stage {index + 1}</span>{stage.title}
          </button>
        ))}
      </div>
      {current ? (
        <div key={current.title} className="mt-5 rounded-lg border border-border p-4" role="region" aria-label={`${current.title} detail`}>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Focused stage</p>
          <h3 className="mt-1 text-lg font-semibold">{current.title}</h3>
          <p className="mt-2 text-sm leading-6">{current.summary}</p>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <div><dt className="font-semibold">What to verify</dt><dd className="mt-1 leading-6 text-muted-foreground">{current.check}</dd></div>
            <div><dt className="font-semibold">Boundary / remaining risk</dt><dd className="mt-1 leading-6 text-muted-foreground">{current.boundary}</dd></div>
          </dl>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" className="min-h-11 rounded-md border border-border px-3 text-sm enabled:hover:bg-muted disabled:opacity-50" disabled={active === 0} onClick={() => setActive((prev) => prev === null ? null : Math.max(0, prev - 1))}>Previous</button>
            <button type="button" className="min-h-11 rounded-md border border-border px-3 text-sm enabled:hover:bg-muted disabled:opacity-50" disabled={active === stages.length - 1} onClick={() => setActive((prev) => prev === null ? null : Math.min(stages.length - 1, prev + 1))}>Next stage</button>
          </div>
        </div>
      ) : (
        <p role="status" className="mt-4 text-sm text-muted-foreground">Overview mode: all stages are available. Select a stage for focused details.</p>
      )}
    </section>
  );
}
