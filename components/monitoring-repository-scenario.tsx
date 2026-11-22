"use client";

import { type ReactNode, useState } from "react";

const scenarios = [
  {
    id: "contractor",
    label: "Contractor’s unconnected public repo",
    internal: "This repository is outside the team’s integration.",
    external: null,
  },
  {
    id: "company-public",
    label: "Connected public company repo",
    internal: "The team connected this repository, so its commits are in scope.",
    external: "A separate public incident is possible if GitGuardian links the finding to your company. An internal alert alone tells you only what the integration found.",
  },
  {
    id: "company-private",
    label: "Connected private company repo",
    internal: "The team connected this repository, so its private commits are in scope.",
    external: "This private commit is outside the public feed. A copy posted publicly would be a separate occurrence.",
  },
] as const;

export function MonitoringRepositoryScenario({ children }: { children: ReactNode }) {
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
        <div><dt className="font-semibold">Public Monitoring</dt><dd className="space-y-2">
          {scenario.external ?? <>
            <p><strong>Company match found.</strong> GitGuardian can attach a public finding to your company, for example if it recognizes the contractor as a monitored developer.</p>
            <p><strong>No company link established.</strong> Public visibility alone gives your team no reason to expect an alert. The key’s owner is still unknown.</p>
          </>}
        </dd></div>
      </dl>
      <p className="text-sm leading-6"><strong>Who can rotate the key?</strong> If your company’s cloud account issued it, contact the team that manages that account. If the issuer is unknown, confirm it before assigning rotation.</p>
      {scenario.id === "contractor" && children}
    </div>
  );
}
