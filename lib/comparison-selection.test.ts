import { describe, expect, it } from "vitest";
import { catalog } from "./catalog";
import {
  comparisonSelection,
  comparisonPresetCategory,
  productsInCategory,
  SECRETS_COMPARISON_URL,
  SECRETS_MANAGEMENT_COMPARISON_URL,
} from "./comparison-selection";

describe("category comparison navigation", () => {
  it("keeps management presets scoped and detection scoped separately", () => {
    expect(comparisonPresetCategory("secrets-three")).toBe("secrets-management");
    expect(comparisonPresetCategory("vault")).toBe("secrets-management");
    expect(comparisonPresetCategory("detect")).toBe("secrets-detection");
    expect(comparisonPresetCategory("iga")).toBe("");
  });

  it("round-trips the management preset through its category-scoped URL", () => {
    const params = new URLSearchParams({
      category: comparisonPresetCategory("secrets-three"),
      use: "uc-vault",
      products: ["infisical", "vault", "akeyless"].join(","),
    });
    expect(comparisonSelection(Object.fromEntries(params), catalog)).toEqual({
      categoryId: "secrets-management",
      useCaseId: "uc-vault",
      productIds: ["infisical", "vault", "akeyless"],
    });
  });
  it("opens the source-first secrets-management shortlist", () => {
    const query = Object.fromEntries(
      new URL(SECRETS_MANAGEMENT_COMPARISON_URL, "https://example.test").searchParams,
    );
    expect(comparisonSelection(query, catalog)).toEqual({
      categoryId: "secrets-management",
      useCaseId: "uc-vault",
      productIds: ["infisical", "vault", "akeyless"],
    });
  });

  it("opens the existing secrets slice with two evidence-backed capabilities", () => {
    const query = Object.fromEntries(
      new URL(SECRETS_COMPARISON_URL, "https://example.test").searchParams,
    );
    const state = comparisonSelection(query, catalog);
    expect(state.categoryId).toBe("secrets-detection");
    expect(state.useCaseId).toBe("uc-detect");
    expect(state.productIds).toEqual([
      "trufflehog",
      "github-secret-scanning",
      "gitguardian",
      "gitleaks",
    ]);
    expect(
      catalog.useCases.find((item) => item.id === state.useCaseId)
        ?.capabilityIds,
    ).toEqual(["cap-secret-discovery", "cap-secret-verification"]);
  });
  it("preserves an empty selection after reload instead of restoring defaults", () => {
    expect(comparisonSelection({ products: "" }, catalog).productIds).toEqual(
      [],
    );
    expect(
      comparisonSelection({ category: "secrets-detection" }, catalog)
        .productIds,
    ).toEqual([]);
  });
  it("deduplicates, caps and rejects unknown/out-of-category products", () => {
    expect(
      comparisonSelection(
        {
          category: "secrets-detection",
          use: "uc-jml",
          products:
            "trufflehog,trufflehog,invalid,c1-platform,github-secret-scanning",
        },
        catalog,
      ),
    ).toEqual({
      categoryId: "secrets-detection",
      useCaseId: "uc-detect",
      productIds: ["trufflehog", "github-secret-scanning"],
    });
    expect(
      comparisonSelection(
        { products: catalog.products.map((item) => item.id).join(",") },
        catalog,
      ).productIds,
    ).toHaveLength(4);
    expect(() =>
      comparisonSelection(
        { use: ["uc-detect", "uc-jml"], products: ["trufflehog", "gitleaks"] },
        catalog,
      ),
    ).not.toThrow();
  });
  it("does not infer support from category membership and handles no mapped use case", () => {
    expect(productsInCategory([], "secrets-detection")).toEqual([]);
    const category = catalog.categories.find(
      (item) =>
        !catalog.useCases.some((use) => use.categoryIds.includes(item.id)),
    )!;
    expect(
      comparisonSelection({ category: category.id }, catalog).useCaseId,
    ).toBe("");
  });
});
