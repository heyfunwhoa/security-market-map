import { readFileSync } from "node:fs";
import { join } from "node:path";
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

  it("keeps canonical vendor and product IDs unique for the endpoint research slice", () => {
    const productIds = catalog.products.map((product) => product.id);
    const vendorIds = catalog.vendors.map((vendor) => vendor.id);
    for (const id of ["kingfisher", "gitguardian-developer-endpoint", "aikido-device-protection"]) {
      expect(productIds.filter((candidate) => candidate === id)).toHaveLength(1);
    }
    expect(new Set(productIds).size).toBe(productIds.length);
    expect(new Set(vendorIds).size).toBe(vendorIds.length);
  });

  it("keeps Kingfisher Atlas detector coverage handoff as not evaluated", () => {
    const kingfisher = catalog.products.find((product) => product.id === "kingfisher");
    expect(kingfisher?.primaryCategoryIds).toContain("secrets-detection");
    expect(kingfisher?.primaryCategoryIds).not.toContain("endpoint-control");
    // Market Map must not invent rule-level detector support; Atlas remains not_evaluated until KRU-189.
    expect(evidenceCell(catalog.claims, "kingfisher", "cap-dev-local-secret-scan", "2026-10-30").status).toBe("unknown");
    expect(claimsForSubject("product", "kingfisher").every((claim) => claim.verificationStatus === "vendor_published")).toBe(
      true,
    );
    expect(claimsForSubject("product", "kingfisher").some((claim) => claim.capabilityId?.startsWith("cap-dev-"))).toBe(
      false,
    );
  });

  it("keeps evidence explorer AccordionTrigger as a direct AccordionItem sibling", () => {
    const source = readFileSync(join(process.cwd(), "components/product-evidence-explorer.tsx"), "utf8");
    expect(source).toContain('"use client"');
    expect(source).toContain("Open original source");
    expect(source).toContain("Evidence details");
    expect(source).toContain("Evidence status: Unknown");
    // Old layout wrapped the source link and AccordionTrigger in one flex row; that broke expand.
    expect(source).not.toMatch(/sm:justify-between[\s\S]{0,400}<AccordionTrigger/);
    expect(source).toMatch(/<\/a>\s*(?:\{\/\*[\s\S]*?\*\/\}\s*)?<AccordionTrigger[\s\S]*?<\/AccordionTrigger>\s*<AccordionContent/);
  });

  it("does not force accordion content height via the closed CSS variable", () => {
    const source = readFileSync(join(process.cwd(), "components/ui/accordion.tsx"), "utf8");
    expect(source).not.toContain("h-(--radix-accordion-content-height)");
  });
});
