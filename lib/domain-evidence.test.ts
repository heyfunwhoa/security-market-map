import { describe, expect, it } from "vitest";
import { catalog } from "./catalog";
import { charterLead, domainClaimCounts, domainStatusLabel } from "./domain-evidence";

describe("domain evidence status", () => {
  it("labels identity evidenced and every other domain mapped, evidence coming", () => {
    for (const domain of catalog.domains) {
      expect(domainStatusLabel(domain.depth)).toBe(domain.id === "identity" ? "Evidenced" : "Mapped, evidence coming");
    }
  });

  it("counts claims per domain from the data, with identity the deepest", () => {
    const counts = domainClaimCounts(catalog);
    expect(Object.keys(counts)).toHaveLength(catalog.domains.length);
    const identity = counts.identity;
    for (const [id, count] of Object.entries(counts)) {
      if (id !== "identity") expect(count).toBeLessThan(identity);
    }
  });

  it("keeps only the first sentence of a charter", () => {
    expect(charterLead("Who can log in. What they can do.")).toBe("Who can log in.");
    expect(charterLead("No period")).toBe("No period");
  });
});
