"use client";

import { useState } from "react";
import Link from "next/link";
import type { Scenario } from "@/lib/schema";

export type ScenarioView = Omit<Scenario, "steps"> & {
  steps: (Scenario["steps"][number] & {
    categoryName: string;
    categorySlug: string;
    capabilityName: string;
    evidenced: { name: string; href: string }[];
  })[];
};

export function ScenarioPlayer({ scenarios }: { scenarios: ScenarioView[] }) {
  const [scenarioId, setScenarioId] = useState(scenarios[0]?.id ?? "");
  const [stepId, setStepId] = useState(scenarios[0]?.steps[0]?.id ?? "");
  const scenario = scenarios.find((item) => item.id === scenarioId) ?? scenarios[0];
  const step = scenario.steps.find((item) => item.id === stepId) ?? scenario.steps[0];

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Scenarios">
        {scenarios.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={item.id === scenario.id}
            onClick={() => {
              setScenarioId(item.id);
              setStepId(item.steps[0].id);
            }}
            className="rounded-full border border-border px-3 py-1.5 text-sm aria-selected:bg-primary aria-selected:text-primary-foreground"
          >
            {item.title}
          </button>
        ))}
      </div>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{scenario.summary}</p>
      <ol className="mt-4 grid gap-2 md:grid-cols-5">
        {scenario.steps.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              aria-pressed={item.id === step.id}
              onClick={() => setStepId(item.id)}
              className="h-full w-full rounded-lg border border-border bg-card p-3 text-left text-sm aria-pressed:border-primary"
            >
              <span className="text-xs font-semibold text-primary">Step {index + 1}</span>
              <span className="mt-1 block font-medium">{item.title}</span>
            </button>
          </li>
        ))}
      </ol>
      <article className="mt-4 rounded-xl border border-border bg-card p-5">
        <p className="text-xs font-semibold tracking-wide text-primary uppercase">
          <Link href={`/categories/${step.categorySlug}`} className="hover:underline">
            {step.categoryName}
          </Link>
          {" · "}
          {step.capabilityName}
        </p>
        <h3 className="mt-2 text-2xl">{step.title}</h3>
        <p className="mt-3 text-sm leading-6">{step.narrative}</p>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          <span className="font-semibold text-foreground">Handoff. </span>
          {step.handoff}
        </p>
        <div className="mt-4">
          <h4 className="text-sm font-semibold">Products with evidence for this step</h4>
          {step.evidenced.length === 0 ? (
            <p className="mt-1 text-sm text-muted-foreground">
              Unknown. No product in the seed has a sourced claim for this capability. Ask in the call.
            </p>
          ) : (
            <ul className="mt-2 flex flex-wrap gap-2">
              {step.evidenced.map((item) => (
                <li key={item.href + item.name}>
                  <Link href={item.href} className="rounded-full border border-border px-3 py-1 text-sm hover:bg-muted">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>
    </div>
  );
}
