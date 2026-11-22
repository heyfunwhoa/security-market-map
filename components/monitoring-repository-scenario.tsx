"use client";

import { useState } from "react";

const scenarios = [
  {
    label: "Connected public company repo",
    internal: "The team connected this repository, so its commits are in scope.",
    external: "The commit is public. A detected secret can generate a company incident if GitGuardian can link the finding to your company.",
  },
  {
    label: "Contractor’s unconnected public repo",
    internal: "This repository is outside the team’s integration.",
    external: "The commit is public. A monitored developer or company-specific term could link a detected secret to the company.",
  },
  {
    label: "Connected private company repo",
    internal: "The team connected this repository, so its private commits are in scope.",
    external: "This private commit is outside the public feed. A copy posted publicly would be a separate occurrence.",
  },
] as const;

export function MonitoringRepositoryScenario() {
  const [selected, setSelected] = useState(0);
  const scenario = scenarios[selected];
  return (
    <div className="space-y-3">
      <fieldset>
        <legend className="font-semibold">Where did the example commit appear?</legend>
        <div className="mt-2 grid gap-2 sm:flex sm:flex-wrap">
          {scenarios.map((option, index) => (
            <label key={option.label} className="flex min-h-11 cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-sm has-checked:border-primary has-checked:bg-muted">
              <input type="radio" name="monitoring-repository" checked={index === selected} onChange={() => setSelected(index)} className="accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>
      <dl aria-live="polite" aria-atomic="true" className="grid gap-4 bg-muted/50 p-4 text-sm leading-6 sm:grid-cols-2">
        <div><dt className="font-semibold">Internal Monitoring</dt><dd>{scenario.internal}</dd></div>
        <div><dt className="font-semibold">Public Monitoring</dt><dd>{scenario.external}</dd></div>
      </dl>
    </div>
  );
}
