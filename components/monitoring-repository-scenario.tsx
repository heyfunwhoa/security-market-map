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
      <div className="space-y-2 text-sm leading-6">
        <h5 className="font-semibold">Who should we check with internally?</h5>
        <p>Start with whoever triages these findings in your organization, often AppSec or the SOC. Ask who will keep the case and follow up while ownership is unclear.</p>
        <details>
          <summary className="min-h-11 cursor-pointer py-2 font-semibold focus-visible:outline-2 focus-visible:outline-ring">Find a contact by the question you need answered</summary>
          <dl className="space-y-3 pt-1">
            {scenario.id === "contractor" ? (
              <div><dt className="font-semibold">Which project was the contractor working on?</dt><dd>Ask the internal project sponsor or engineering lead which team worked with the contractor and whether anyone recognizes the integration.</dd></div>
            ) : (
              <div><dt className="font-semibold">What company work does this repo support?</dt><dd>Ask the repository maintainer which application uses it and who maintains that application.</dd></div>
            )}
            <div><dt className="font-semibold">Did one of our accounts issue this key?</dt><dd>Ask the cloud or SaaS account administrator to check the credential identifier against account records. If they find a match, ask who has authority to revoke it.</dd></div>
            <div><dt className="font-semibold">What depends on this key?</dt><dd>Ask the application or service owner which workloads use it and who can confirm they still work after a change.</dd></div>
            <div><dt className="font-semibold">Could someone have used it?</dt><dd>If misuse is suspected, involve the SOC or incident response lead in parallel. Ask what the logs cover and what remains unknown.</dd></div>
          </dl>
        </details>
      </div>
      {scenario.id === "contractor" && children}
    </div>
  );
}
