import { describe, expect, it } from "vitest";
import { catalog, catalogProblems, claimsForSubject, searchHits } from "./catalog";
import { evidenceCell } from "./compare";
import { comparisonSelection, DEVELOPER_ENDPOINT_COMPARISON_URL } from "./comparison-selection";

describe("Kingfisher product research and developer endpoint evidence", () => {
  it("reuses one canonical Kingfisher product and MongoDB vendor", () => {
    expect(catalogProblems(catalog)).toEqual([]);
    expect(catalog.products.filter((p) => p.id === "kingfisher")).toHaveLength(1);
    expect(catalog.vendors.filter((v) => v.id === "mongodb")).toHaveLength(1);
    expect(catalog.products.find((p) => p.id === "kingfisher")?.vendorId).toBe("mongodb");
    expect(searchHits("Kingfisher").some((hit) => hit.kind === "Product")).toBe(true);
  });

  it("does not infer Kingfisher rule-level capabilities from a research profile", () => {
    expect(evidenceCell(catalog.claims, "kingfisher", "cap-dev-local-secret-scan", "2026-10-30").status).toBe("unknown");
    expect(claimsForSubject("product", "kingfisher").every((c) => c.sourceUrl.startsWith("https://"))).toBe(true);
  });

  it("resolves the endpoint comparison preset without assuming missing capabilities", () => {
    const query = Object.fromEntries(new URL(DEVELOPER_ENDPOINT_COMPARISON_URL, "https://example.test").searchParams);
    expect(comparisonSelection(query, catalog)).toEqual({
      categoryId: "endpoint-control",
      useCaseId: "uc-developer-endpoint",
      productIds: ["gitguardian-developer-endpoint", "aikido-device-protection"],
    });
    expect(evidenceCell(catalog.claims, "gitguardian-developer-endpoint", "cap-dev-package-install-policy", "2026-10-30", catalog.sources).status).toBe("unknown");
    expect(evidenceCell(catalog.claims, "aikido-device-protection", "cap-dev-ai-tool-hook", "2026-10-30", catalog.sources).status).toBe("unknown");
    expect(evidenceCell(catalog.claims, "aikido-device-protection", "cap-dev-local-secret-scan", "2026-10-30", catalog.sources).status).toBe("evidenced");
  });

  it("keeps all new product claims linked to registered sources", () => {
    const ids = new Set(["gitguardian-developer-endpoint", "aikido-device-protection"]);
    for (const claim of catalog.claims.filter((c) => ids.has(c.subjectId))) {
      expect(catalog.sources.find((s) => s.id === claim.sourceId)?.url).toBe(claim.sourceUrl);
      expect(claim.verificationStatus).toBe("vendor_published");
      expect(claim.capabilityId).toBeTruthy();
    }
  });
});
