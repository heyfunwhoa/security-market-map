import { budgetInputSchema, type BudgetInput } from "./schema";

export const BUDGET_DISCLAIMER =
  "This worksheet only rearranges numbers you type. It is not a forecast, a commissioned ROI study, or an expected result. Public list price, a promotional offer, a field rumor, and a quote are different evidence. None of them are prefilled here.";

export type BudgetLine = {
  id: string;
  label: string;
  detail: string;
  amount: number;
  kind: "labor" | "retired" | "cost";
};

export type BudgetModel = {
  years: 3;
  lines: BudgetLine[];
  modeledLabor: number;
  modeledRetiredTools: number;
  modeledCost: number;
  modeledDifference: number;
  disclaimer: string;
};

export function buildBudget(raw: BudgetInput): BudgetModel {
  const input = budgetInputSchema.parse(raw);
  const years = 3 as const;
  const review =
    input.identities * input.reviewHoursPerIdentityPerYear * input.hourlyRate * years;
  const jml =
    input.jmlEventsPerYear * input.hoursPerJmlEvent * input.hourlyRate * years;
  const requests =
    input.requestsPerYear * (input.minutesPerRequest / 60) * input.hourlyRate * years;
  const admin = input.adminHoursPerYear * input.hourlyRate * years;
  const retired = input.retiredToolsAnnual * years;
  const license = input.annualLicense * years;
  const implementation = input.implementationCost;
  const modeledLabor = review + jml + requests;
  const modeledCost = license + implementation + admin;

  return {
    years,
    lines: [
      {
        id: "reviews",
        label: "Access-review labor",
        detail: `${input.identities} identities × ${input.reviewHoursPerIdentityPerYear} h × $${input.hourlyRate}/h × ${years} years`,
        amount: review,
        kind: "labor",
      },
      {
        id: "jml",
        label: "Joiner-mover-leaver labor",
        detail: `${input.jmlEventsPerYear} events × ${input.hoursPerJmlEvent} h × $${input.hourlyRate}/h × ${years} years`,
        amount: jml,
        kind: "labor",
      },
      {
        id: "requests",
        label: "Manual request labor",
        detail: `${input.requestsPerYear} requests × ${input.minutesPerRequest} min × $${input.hourlyRate}/h × ${years} years`,
        amount: requests,
        kind: "labor",
      },
      {
        id: "retired",
        label: "Tools or services you say would be retired",
        detail: `$${input.retiredToolsAnnual} per year × ${years} years. Enter zero unless you have a quote or a contract to point at.`,
        amount: retired,
        kind: "retired",
      },
      {
        id: "license",
        label: "License",
        detail: `$${input.annualLicense} per year × ${years} years. This is your figure, not a list price.`,
        amount: license,
        kind: "cost",
      },
      {
        id: "implementation",
        label: "Implementation",
        detail: "Entered once. Not annualized.",
        amount: implementation,
        kind: "cost",
      },
      {
        id: "admin",
        label: "Ongoing administration",
        detail: `${input.adminHoursPerYear} h × $${input.hourlyRate}/h × ${years} years`,
        amount: admin,
        kind: "cost",
      },
    ],
    modeledLabor,
    modeledRetiredTools: retired,
    modeledCost,
    modeledDifference: modeledLabor + retired - modeledCost,
    disclaimer: BUDGET_DISCLAIMER,
  };
}

export function money(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
