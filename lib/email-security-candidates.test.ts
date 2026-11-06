import { describe, expect, it } from "vitest";
import { catalog, catalogProblems } from "./catalog";
import { emailSecurityProducts, emailSecuritySources, emailSecurityVendors } from "./data/email-security-candidates";

const expectedIds = ["aegisai", "sublime-security", "ocean-security", "strongestlayer"];

describe("agentic email security research candidates", () => {
  it("preserves the existing category and competitor references", () => {
    expect(catalogProblems(catalog)).toEqual([]);
    expect(catalog.categories.filter((item) => item.id === "email-security")).toHaveLength(1);
    expect(catalog.vendors.filter((item) => item.id === "abnormal")).toHaveLength(1);
    expect(catalog.vendors.filter((item) => item.id === "proofpoint")).toHaveLength(1);
    expect(catalog.vendors.filter((item) => item.id === "mimecast")).toHaveLength(1);
    expect(emailSecurityVendors.map((item) => item.id).sort()).toEqual([...expectedIds].sort());
  });

  it("keeps every new vendor and product as a research candidate with Unknown availability", () => {
    expect(emailSecurityProducts).toHaveLength(expectedIds.length);
    for (const vendorId of expectedIds) {
      const vendor = catalog.vendors.find((item) => item.id === vendorId);
      expect(vendor, vendorId).toBeDefined();
      expect(vendor?.verificationStatus).toBe("research_candidate");
      expect(vendor?.primaryCategoryIds).toContain("email-security");
      expect(vendor?.openQuestions.length).toBeGreaterThan(0);

      const product = catalog.products.find((item) => item.vendorId === vendorId);
      expect(product, vendorId).toBeDefined();
      expect(product?.availability).toBe("unknown");
      expect(product?.primaryCategoryIds).toContain("email-security");
      expect(product?.useCaseIds).toEqual([]);

      // Research-candidate positioning is not evidence of a published capability assertion.
      expect(
        catalog.claims.filter(
          (claim) => (claim.subjectType === "vendor" && claim.subjectId === vendorId) ||
            (claim.subjectType === "product" && claim.subjectId === product?.id),
        ),
      ).toEqual([]);
    }
  });

  it("attributes new sources without inventing verified status or competitive relationships", () => {
    expect(emailSecuritySources.length).toBeGreaterThanOrEqual(expectedIds.length);
    for (const source of emailSecuritySources) {
      expect(source.url).toBe(source.canonicalUrl);
      expect(source.retrievedAt).toBe("2026-11-05");
      expect(["official_docs", "vendor_marketing", "press_release"]).toContain(source.sourceType);
      expect(catalog.sources.some((item) => item.id === source.id)).toBe(true);
    }
    const newProductIds = new Set(emailSecurityProducts.map((item) => item.id));
    expect(catalog.relationships.filter((item) =>
      newProductIds.has(item.fromProductId) || newProductIds.has(item.toProductId),
    )).toEqual([]);
  });
});
