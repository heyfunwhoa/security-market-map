import { describe, expect, it } from "vitest";
import { evidenceSummary } from "./evidence-summary";
import { catalog } from "./catalog";
import type { Claim } from "./schema";

const base = catalog.claims.find((claim) => claim.verificationStatus === "vendor_published" && claim.capabilityId)!;
const claim = (over: Partial<Claim>): Claim => ({ ...base, ...over });

describe("vendor evidence summary", () => {
  it("counts claims by trust label and keeps the latest check date", () => {
    const summary = evidenceSummary(
      [
        claim({ id: "a", lastCheckedAt: "2026-10-01" }),
        claim({ id: "b", lastCheckedAt: "2026-10-26" }),
        claim({ id: "c", verificationStatus: "needs_review", lastCheckedAt: "2026-09-01" }),
      ],
      catalog.capabilities,
    );
    expect(summary.total).toBe(3);
    expect(summary.labelCounts).toEqual([["Vendor said this", 2], ["Needs review", 1]]);
    expect(summary.lastChecked).toBe("2026-10-26");
    expect(summary.capabilityNames.length).toBe(1);
  });

  it("leaves superseded claims out", () => {
    const summary = evidenceSummary([claim({ verificationStatus: "superseded" })], catalog.capabilities);
    expect(summary.total).toBe(0);
    expect(summary.lastChecked).toBeUndefined();
  });

  it("does not invent capabilities for claims without one", () => {
    const summary = evidenceSummary([claim({ capabilityId: null })], catalog.capabilities);
    expect(summary.capabilityNames).toEqual([]);
  });
});
