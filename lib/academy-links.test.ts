import { describe, expect, it } from "vitest";
import { academyPreviews, academyPreviewsForCategory } from "./academy-links";
import { catalog } from "./catalog";

// Editorial contract from PR #50: unrelated categories must not acquire cards.
const expected: Record<string, string[]> = {
  "secrets-detection": ["credential-risk"],
  "secrets-management": ["credential-risk", "identity-journey"],
  nhi: ["credential-risk", "identity-journey"],
  aspm: ["credential-risk", "source-verification"],
  "workforce-identity": ["identity-journey"],
  dspm: ["source-verification"],
  sast: ["source-verification"],
  sca: ["source-verification"],
  dast: ["source-verification"],
};

describe("public Academy link contract", () => {
  it("preserves the nine intended category mappings and omits every unrelated category", () => {
    for (const category of catalog.categories) {
      expect(academyPreviewsForCategory(category.id).map((item) => item.id))
        .toEqual(expected[category.id] ?? []);
    }
    expect(academyPreviewsForCategory("unknown-category")).toEqual([]);
  });
  it("retains distinct public destinations without private repository or progress parameters", () => {
    expect(academyPreviews.map((item) => item.href)).toEqual([
      "https://byjoyaing.com/builder-academy/credential-risk",
      "https://byjoyaing.com/builder-academy/identity-journey",
      "https://byjoyaing.com/ai-academy/journeys/source-verification",
    ]);
    for (const preview of academyPreviews) {
      const url = new URL(preview.href);
      expect(url.protocol).toBe("https:");
      expect(url.hostname).toBe("byjoyaing.com");
      expect(url.search).toBe("");
      expect(url.hash).toBe("");
    }
  });
  it("rejects dangling category mappings and duplicate card identity", () => {
    expect(new Set(academyPreviews.map((item) => item.id)).size).toBe(academyPreviews.length);
    for (const preview of academyPreviews) {
      expect(preview.title.length).toBeGreaterThan(0);
      expect(preview.summary.length).toBeLessThan(240);
      expect(new Set(preview.categoryIds).size).toBe(preview.categoryIds.length);
      for (const id of preview.categoryIds) expect(catalog.categories.some((item) => item.id === id)).toBe(true);
    }
  });
});
