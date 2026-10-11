import fs from "node:fs";
import path from "node:path";
import { researchProblems, type ResearchLedger } from "./ledger";

const LEDGER_KEYS = [
  "sources",
  "policies",
  "runs",
  "snapshots",
  "changes",
  "proposals",
  "decisions",
  "findings",
  "alerts",
  "workflowRuns",
] as const;

let ledger: ResearchLedger | null = null;

export class ResearchLedgerPersistenceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ResearchLedgerPersistenceError";
  }
}

/**
 * `memory` keeps the ledger in the process. A path stores JSON for this machine.
 * Tests stay in memory unless they set a path. The default file is gitignored.
 */
export function researchLedgerPath(): string | null {
  const configured = process.env.RESEARCH_LEDGER_PATH?.trim();
  if (configured === "memory") return null;
  if (configured) return configured;
  if (process.env.VITEST) return null;
  return path.join(process.cwd(), ".data", "research-ledger.json");
}

export function peekResearchLedger(): ResearchLedger | null {
  return ledger;
}

export function readPersistedResearchLedger(): ResearchLedger | null {
  const file = researchLedgerPath();
  if (!file || !fs.existsSync(/*turbopackIgnore: true*/ file)) return null;
  return readLedgerFile(file);
}

export function loadResearchLedger(create: () => ResearchLedger): ResearchLedger {
  if (ledger) return ledger;
  const persisted = readPersistedResearchLedger();
  ledger = persisted ?? create();
  return ledger;
}

export function saveResearchLedger(next: ResearchLedger): void {
  const problems = researchProblems(next);
  if (problems.length > 0) {
    throw new ResearchLedgerPersistenceError(`Refusing to store an invalid research ledger. ${problems[0]}`);
  }
  const file = researchLedgerPath();
  if (file && fs.existsSync(/*turbopackIgnore: true*/ file)) readLedgerFile(file);
  ledger = next;
  if (!file) return;
  fs.mkdirSync(/*turbopackIgnore: true*/ path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(/*turbopackIgnore: true*/ temporary, `${JSON.stringify(next, null, 2)}\n`);
  fs.renameSync(/*turbopackIgnore: true*/ temporary, file);
}

export function restoreResearchLedger(next: ResearchLedger): void {
  ledger = next;
}

export function forgetResearchLedger(): void {
  ledger = null;
}

export function resetResearchLedger(): void {
  ledger = null;
  const file = researchLedgerPath();
  if (file && process.env.VITEST) fs.rmSync(/*turbopackIgnore: true*/ file, { force: true });
}

function readLedgerFile(file: string): ResearchLedger {
  let parsed: unknown;
  try {
    parsed = JSON.parse(fs.readFileSync(/*turbopackIgnore: true*/ file, "utf8"));
  } catch {
    throw new ResearchLedgerPersistenceError(`Research ledger at ${file} is not valid JSON. It was left unchanged.`);
  }
  if (!isLedgerShape(parsed)) {
    throw new ResearchLedgerPersistenceError(`Research ledger at ${file} is missing ledger arrays. It was left unchanged.`);
  }
  const problems = researchProblems(parsed);
  if (problems.length > 0) {
    throw new ResearchLedgerPersistenceError(
      `Research ledger at ${file} failed validation. It was left unchanged. ${problems[0]}`,
    );
  }
  return parsed;
}

function isLedgerShape(value: unknown): value is ResearchLedger {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return LEDGER_KEYS.every((key) => Array.isArray(record[key]));
}
