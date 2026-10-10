import type { ResearchLedger } from "./ledger";

let ledger: ResearchLedger | null = null;

export function peekResearchLedger(): ResearchLedger | null {
  return ledger;
}

export function loadResearchLedger(create: () => ResearchLedger): ResearchLedger {
  if (!ledger) ledger = create();
  return ledger;
}

export function saveResearchLedger(next: ResearchLedger): void {
  ledger = next;
}

export function resetResearchLedger(): void {
  ledger = null;
}
