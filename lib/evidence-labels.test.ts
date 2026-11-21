import { describe, expect, it } from "vitest";
import { catalog } from "./catalog";
import { claimNeedsRecheck, isSourceStale } from "./coverage";
import { EVIDENCE_LABELS, evidenceLabel } from "./evidence-labels";
import { verificationLabel } from "./format";
import { sourceTypeSchema, verificationStatusSchema } from "./schema";

describe("shared evidence vocabulary", () => {
  it("labels every claim verification status and source type explicitly", () => {
    for (const status of [...verificationStatusSchema.options, ...sourceTypeSchema.options]) {
      expect(EVIDENCE_LABELS[status], `missing label for ${status}`).toBeTruthy();
    }
  });

  it("never shows a raw code, even for an unlisted status", () => {
    expect(evidenceLabel("some_new_state")).toBe("Some new state");
    expect(evidenceLabel("")).toBe("Unknown");
    for (const label of Object.values(EVIDENCE_LABELS)) expect(label).not.toMatch(/_/);
  });

  it("uses one wording for comparison tables and badges", () => {
    for (const status of verificationStatusSchema.options) expect(verificationLabel(status)).toBe(evidenceLabel(status));
  });

  it("flags a claim for recheck exactly when its source is past its review window at the snapshot date", () => {
    for (const claim of catalog.claims) {
      const source = catalog.sources.find((item) => item.id === claim.sourceId);
      expect(claimNeedsRecheck(claim, catalog.sources, catalog.asOf)).toBe(source ? isSourceStale(source, catalog.asOf) : false);
    }
    expect(claimNeedsRecheck({ sourceId: "source:missing" }, catalog.sources, catalog.asOf)).toBe(false);
  });
});
