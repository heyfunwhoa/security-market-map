import { describe, expect, it } from "vitest";
import type { Account } from "./schema";
import { accountBrief, DEFAULT_WEIGHTS, scoreAccount } from "./territory";
import { catalog } from "./catalog";

const draft: Account = {
  id: "synthetic-draft", name: "", industry: "", employees: "", identityEstimate: "",
  idp: "", iga: { state: "unknown", name: "" }, pam: { state: "unknown", name: "" },
  vault: { state: "unknown", name: "" }, cloud: [], compliance: [], agentAdoption: "unknown",
  triggers: "", partner: "", sourceLinks: [], hypothesis: "", notes: "", useCaseIds: [],
  updatedAt: "2026-10-30T12:00:00.000Z",
};

describe("territory account drafts", () => {
  it("allows new and cleared names without inventing a fit score or changing the draft", () => {
    for (const name of ["", "   ", "Fictional Test Company"]) {
      const account = { ...draft, name };
      expect(scoreAccount(account, DEFAULT_WEIGHTS).score).toBeNull();
      expect(account.name).toBe(name);
    }
  });

  it("exports unnamed drafts and preserves source-backed discovery content", () => {
    const useCase = catalog.useCases[0];
    const account = {
      ...draft, notes: "Synthetic discovery note", useCaseIds: [useCase.id],
      sourceLinks: [{ label: "Example source", url: "https://example.com/security" }],
    };
    const brief = accountBrief({ account, weights: DEFAULT_WEIGHTS, useCases: catalog.useCases });
    expect(brief).toContain("# Account brief: Untitled account");
    expect(brief).toContain("Synthetic discovery note");
    expect(brief).toContain("[Example source](https://example.com/security)");
    expect(brief).toContain(useCase.discoveryQuestions[0]);
    expect(brief).toContain("IGA: not recorded — do not assume");
  });
});
