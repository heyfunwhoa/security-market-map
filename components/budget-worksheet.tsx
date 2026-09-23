"use client";

import { useMemo, useState } from "react";
import { BUDGET_DISCLAIMER, buildBudget, money } from "@/lib/budget";
import type { BudgetInput } from "@/lib/schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FIELDS: { key: keyof BudgetInput; label: string; hint: string }[] = [
  { key: "identities", label: "Identities in scope", hint: "People, or people plus machines, if you say so." },
  { key: "applications", label: "Applications", hint: "Context only. Not multiplied into a savings claim." },
  { key: "reviewHoursPerIdentityPerYear", label: "Review hours per identity per year", hint: "Your estimate of manual certification time." },
  { key: "jmlEventsPerYear", label: "Joiner, mover, leaver events per year", hint: "Events, not headcount." },
  { key: "hoursPerJmlEvent", label: "Hours per joiner-mover-leaver event", hint: "Tickets, waiting, and rework you would count." },
  { key: "requestsPerYear", label: "Access requests per year", hint: "Manual requests, not automated ones." },
  { key: "minutesPerRequest", label: "Minutes per manual request", hint: "Include approver time if you want it in the labor line." },
  { key: "hourlyRate", label: "Loaded labor rate, USD per hour", hint: "Your rate. Not a benchmark." },
  { key: "retiredToolsAnnual", label: "Annual cost of tools you might retire", hint: "Leave at zero without a contract to point at." },
  { key: "implementationCost", label: "Implementation, one time", hint: "Services and internal project cost." },
  { key: "annualLicense", label: "Annual license", hint: "A quote if you have one. Not the Opal launch offer unless that offer applies." },
  { key: "adminHoursPerYear", label: "Ongoing admin hours per year", hint: "Labor that remains after the tool is in." },
];

const EMPTY: BudgetInput = {
  identities: 0,
  applications: 0,
  reviewHoursPerIdentityPerYear: 0,
  jmlEventsPerYear: 0,
  hoursPerJmlEvent: 0,
  requestsPerYear: 0,
  minutesPerRequest: 0,
  hourlyRate: 0,
  retiredToolsAnnual: 0,
  implementationCost: 0,
  annualLicense: 0,
  adminHoursPerYear: 0,
};

export function BudgetWorksheet() {
  const [raw, setRaw] = useState<Record<keyof BudgetInput, string>>({
    identities: "",
    applications: "",
    reviewHoursPerIdentityPerYear: "",
    jmlEventsPerYear: "",
    hoursPerJmlEvent: "",
    requestsPerYear: "",
    minutesPerRequest: "",
    hourlyRate: "",
    retiredToolsAnnual: "",
    implementationCost: "",
    annualLicense: "",
    adminHoursPerYear: "",
  });

  const model = useMemo(() => {
    const input = { ...EMPTY };
    for (const field of FIELDS) {
      const value = Number(raw[field.key]);
      input[field.key] = Number.isFinite(value) && value > 0 ? value : 0;
    }
    return buildBudget(input);
  }, [raw]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <form className="grid gap-3 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <div key={field.key} className="sm:col-span-1">
            <Label htmlFor={field.key}>{field.label}</Label>
            <Input
              id={field.key}
              inputMode="decimal"
              value={raw[field.key]}
              onChange={(event) =>
                setRaw((current) => ({ ...current, [field.key]: event.target.value }))
              }
              className="mt-1 bg-background"
            />
            <p className="mt-1 text-xs text-muted-foreground">{field.hint}</p>
          </div>
        ))}
      </form>
      <aside className="rounded-xl border border-border bg-card p-4">
        <h2 className="text-xl">Three-year worksheet</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{BUDGET_DISCLAIMER}</p>
        <ul className="mt-4 space-y-3">
          {model.lines.map((line) => (
            <li key={line.id} className="border-b border-border pb-3">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm font-medium">{line.label}</span>
                <span className="font-heading text-lg">{money(line.amount)}</span>
              </div>
              <p className="text-xs text-muted-foreground">{line.detail}</p>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between gap-3">
            <dt>Labor you entered</dt>
            <dd>{money(model.modeledLabor)}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt>Retired tools you entered</dt>
            <dd>{money(model.modeledRetiredTools)}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt>License, implementation, and remaining admin</dt>
            <dd>{money(model.modeledCost)}</dd>
          </div>
          <div className="flex justify-between gap-3 font-semibold">
            <dt>Entered labor and retired tools, minus entered cost</dt>
            <dd>{money(model.modeledDifference)}</dd>
          </div>
        </dl>
        <p className="mt-3 text-xs leading-5 text-muted-foreground">
          A positive difference is not savings. It is arithmetic on your inputs. Applications are
          recorded and not silently turned into a multiplier.
        </p>
      </aside>
    </div>
  );
}
