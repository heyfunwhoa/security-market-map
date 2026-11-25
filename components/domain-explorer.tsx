"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { DomainMap } from "@/components/domain-map";
import type { Domain } from "@/lib/schema";
import { cn } from "@/lib/utils";

/**
 * An illustrative incident path. Selecting a step highlights the domains whose controls sit at
 * that step. The mapping is an editorial teaching aid, not a coverage claim.
 */
export const ATTACK_PATH = [
  { id: "identity", label: "Identity", detail: "An identity gets access.", domainIds: ["identity"] },
  { id: "app-network", label: "App or network", detail: "It uses an application or network path.", domainIds: ["appsec", "corporate"] },
  { id: "workload", label: "Workload", detail: "The path reaches a workload.", domainIds: ["cloud", "platform"] },
  { id: "data", label: "Data", detail: "The workload may affect data.", domainIds: ["data"] },
] as const;

export function DomainExplorer({ domains, claimCounts }: { domains: Domain[]; claimCounts: Record<string, number> }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = ATTACK_PATH.find((step) => step.id === activeId) ?? null;
  const names = active
    ? domains.filter((domain) => (active.domainIds as readonly string[]).includes(domain.id)).map((domain) => domain.name)
    : [];

  return (
    <div>
      <details className="rounded-xl border border-border bg-card px-4">
        <summary className="min-h-11 cursor-pointer py-3 text-sm font-medium">Follow an illustrative attack across domains</summary>
        <ol className="mt-3 grid grid-cols-2 gap-2 sm:flex sm:items-stretch sm:gap-0" aria-label="Illustrative attack path">
          {ATTACK_PATH.map((step, index) => {
            const selected = step.id === activeId;
            return (
              <li key={step.id} className="flex items-stretch sm:flex-1">
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveId(selected ? null : step.id)}
                  className={cn(
                    "flex min-h-11 w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    selected ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:bg-muted",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                      selected ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground",
                    )}
                  >
                    {index + 1}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{step.label}</span>
                    <span className={cn("mt-0.5 block text-xs leading-5", selected ? "text-primary-foreground" : "text-muted-foreground")}>
                      {step.detail}
                    </span>
                  </span>
                </button>
                {index < ATTACK_PATH.length - 1 ? (
                  <ChevronRight aria-hidden="true" className="mx-1 hidden size-5 shrink-0 self-center text-muted-foreground sm:block" />
                ) : null}
              </li>
            );
          })}
        </ol>
        <p className="mt-3 min-h-6 text-sm text-muted-foreground" aria-live="polite">
          {active
            ? `${active.label}: ${names.join(" and ")} highlighted below.`
            : "Select a step to highlight the domains that act at that point."}
        </p>
      </details>
      <div className="mt-4">
        <DomainMap domains={domains} claimCounts={claimCounts} highlightIds={active?.domainIds} />
      </div>
    </div>
  );
}
