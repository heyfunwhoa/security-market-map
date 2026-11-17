import { describe, expect, it } from "vitest";
import { latestClaimDate } from "./as-of";
import { catalog } from "./catalog";

describe("as-of date", () => {
  it("is the newest checked, observed, or published claim date", () => {
    expect(
      latestClaimDate([
        { lastCheckedAt: "2026-10-01", observedAt: "2026-09-01", publishedAt: null },
        { lastCheckedAt: "2026-09-15", observedAt: "2026-11-02", publishedAt: "2026-08-01" },
      ]),
    ).toBe("2026-11-02");
    expect(latestClaimDate([])).toBeNull();
  });

  it("keeps the catalog date in step with the claim cards", () => {
    const newestChecked = catalog.claims.map((claim) => claim.lastCheckedAt).sort().at(-1);
    expect(catalog.asOf >= (newestChecked ?? "")).toBe(true);
    expect(catalog.asOf).toBe(latestClaimDate(catalog.claims));
  });
});
