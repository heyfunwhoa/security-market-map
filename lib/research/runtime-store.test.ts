import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { catalog } from "../catalog";
import {
  createHashicorpLedger,
  currentVendorMonitorView,
  executeVendorResearch,
  MONITOR_AS_OF,
  recordVendorReview,
} from "./vendor-monitor";
import {
  forgetResearchLedger,
  loadResearchLedger,
  researchLedgerPath,
  resetResearchLedger,
  saveResearchLedger,
} from "./runtime-store";

const directory = fs.mkdtempSync(path.join(os.tmpdir(), "research-ledger-"));
const ledgerFile = path.join(directory, "ledger.json");

afterEach(() => {
  resetResearchLedger();
  delete process.env.RESEARCH_LEDGER_PATH;
});

describe("research ledger file", () => {
  it("reloads a saved HashiCorp run after the process memory is cleared", async () => {
    process.env.RESEARCH_LEDGER_PATH = ledgerFile;
    const ledger = createHashicorpLedger();
    await executeVendorResearch({ ledger, vendorId: "hashicorp", asOf: MONITOR_AS_OF });
    saveResearchLedger(ledger);
    forgetResearchLedger();
    const loaded = loadResearchLedger(createHashicorpLedger);
    expect(loaded.findings).toHaveLength(1);
    expect(loaded.proposals[0]?.reviewStatus).toBe("pending");
    const view = await currentVendorMonitorView();
    expect(view.persistence).toBe("durable_file");
    expect(view.liveMonitoring).toBe(false);
    expect(view.proposals[0]?.reviewStatus).toBe("pending");
  });

  it("leaves a corrupt ledger file unchanged", () => {
    process.env.RESEARCH_LEDGER_PATH = ledgerFile;
    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(ledgerFile, "{");
    expect(() => loadResearchLedger(createHashicorpLedger)).toThrow(/not valid JSON/);
    expect(fs.readFileSync(ledgerFile, "utf8")).toBe("{");
    expect(() => saveResearchLedger(createHashicorpLedger())).toThrow(/not valid JSON/);
    expect(fs.readFileSync(ledgerFile, "utf8")).toBe("{");
    expect(researchLedgerPath()).toBe(ledgerFile);
  });

  it("records an acceptance without publishing the catalog claim", async () => {
    process.env.RESEARCH_LEDGER_PATH = ledgerFile;
    const before = catalog.claims.find((claim) => claim.id === "claim-vault-dynamic");
    const ledger = createHashicorpLedger();
    await executeVendorResearch({ ledger, vendorId: "hashicorp", asOf: MONITOR_AS_OF });
    const proposalId = ledger.proposals[0]?.id ?? "";
    saveResearchLedger(ledger);
    forgetResearchLedger();
    const accepted = recordVendorReview({
      proposedClaimId: proposalId,
      decision: "accept",
      reviewer: "Ada",
      rationale: "The excerpt matches the public tutorial and stays unpublished.",
    });
    expect(accepted).toMatchObject({ ok: true, published: false, reviewStatus: "accepted" });
    expect(catalog.claims.find((claim) => claim.id === "claim-vault-dynamic")).toEqual(before);
    forgetResearchLedger();
    const stored = loadResearchLedger(createHashicorpLedger);
    expect(stored.decisions).toHaveLength(1);
    expect(stored.decisions[0]?.publishesAutomatically).toBe(false);
    expect(stored.proposals[0]?.verificationStatus).toBe("needs_review");
    const again = recordVendorReview({
      proposedClaimId: proposalId,
      decision: "accept",
      reviewer: "Ada",
      rationale: "A second acceptance is not a new publication.",
    });
    expect(again).toMatchObject({ ok: false, status: 400 });
    expect(recordVendorReview({ proposedClaimId: "prop-abcdef01", decision: "reject", reviewer: "Ada", rationale: "Missing." })).toMatchObject({
      ok: false,
      status: 404,
    });
  });
});
