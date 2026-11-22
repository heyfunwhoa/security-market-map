import { describe, expect, it } from "vitest";
import { pillLabel } from "../components/chrome";
import { catalog } from "./catalog";
import { claimNeedsRecheck, isSourceStale } from "./coverage";
import { readableStatus, trustLabel } from "./evidence-labels";
import { verificationLabel } from "./format";
import { sourceTypeSchema, verificationStatusSchema } from "./schema";

describe("evidence badges", () => {
  it("gives every claim status a trust label and every source type a readable label", () => {
    for (const status of verificationStatusSchema.options) expect(trustLabel(status), status).toBeTruthy();
    for (const type of sourceTypeSchema.options) expect(pillLabel(type), type).not.toMatch(/_/);
  });

  it("never shows a raw code, even for an unlisted status", () => {
    expect(readableStatus("some_new_state")).toBe("Some new state");
    expect(readableStatus("")).toBe("Unknown");
    expect(pillLabel("some_new_state")).toBe("Some new state");
    expect(verificationLabel("some_new_state")).toBe("Some new state");
    expect(pillLabel("recheck_due")).toBe("Recheck due");
  });

  it("flags a claim for recheck exactly when its source is past its review window at the snapshot date", () => {
    for (const claim of catalog.claims) {
      const source = catalog.sources.find((item) => item.id === claim.sourceId);
      expect(claimNeedsRecheck(claim, catalog.sources, catalog.asOf)).toBe(source ? isSourceStale(source, catalog.asOf) : false);
    }
    expect(claimNeedsRecheck({ sourceId: "source:missing" }, catalog.sources, catalog.asOf)).toBe(false);
  });
});
