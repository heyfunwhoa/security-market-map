import { describe, expect, it } from "vitest";
import { filterLandscapeRows, initialLandscapeFilters, landscapeFilterReducer, readLandscapeFilters, landscapeFilterUrl, productDetailUrl, productSectionId } from "./landscape-filters";
import type { LandscapeRow } from "@/components/landscape-browser";

const row = (productId: string, overrides: Partial<LandscapeRow> = {}): LandscapeRow => ({
  productId, productName: productId, vendorName: "Example", vendorSlug: "example",
  positioning: "Candidate", categoryIds: ["vault"], domainIds: ["identity"],
  scopes: ["nhi"], deployment: ["saas"], useCaseIds: ["delivery"], availability: "unknown",
  ...overrides,
});
const rows = [row("Zulu"), row("Alpha", { deployment: ["self_hosted"] })];

describe("landscape filter journeys", () => {
  it("resets every filter and recovers the complete alphabetical list after no results", () => {
    const narrowed = { domain: "missing", category: "missing", useCase: "missing", persona: "missing",
      deployment: "missing", scope: "missing", relation: "missing", focusedProduct: "missing" };
    expect(filterLandscapeRows(rows, [], [], narrowed)).toEqual([]);
    const reset = landscapeFilterReducer(narrowed, { type: "reset" });
    expect(filterLandscapeRows(rows, [], [], reset).map((r) => r.productId)).toEqual(["Alpha", "Zulu"]);
    expect(rows.map((r) => r.productId)).toEqual(["Zulu", "Alpha"]);
  });
  it("clears downstream selection on domain change while retaining explicit refinements", () => {
    const state = { ...initialLandscapeFilters, category: "vault", focusedProduct: "Zulu", deployment: "saas" };
    expect(landscapeFilterReducer(state, { type: "select", key: "domain", value: "cloud" }))
      .toEqual({ ...initialLandscapeFilters, domain: "cloud", deployment: "saas" });
  });
  it.each(["category", "useCase", "persona", "deployment", "scope", "relation"] as const)(
    "clears stale product focus when %s changes", (key) => {
      const state = { ...initialLandscapeFilters, focusedProduct: "Zulu" };
      expect(landscapeFilterReducer(state, { type: "select", key, value: "new" }).focusedProduct).toBe("all");
    },
  );
  it("applies refinements to product options and keeps relationships scoped to the selected use case", () => {
    const edges = [{ productId: "Zulu", type: "complement", useCaseId: "other", otherName: "Beta" }];
    const filters = { ...initialLandscapeFilters, deployment: "saas", persona: "platform", scope: "nhi" };
    const personas = [{ id: "platform", categoryIds: ["vault"] }];
    expect(filterLandscapeRows(rows, edges, personas, filters).map((r) => r.productId)).toEqual(["Zulu"]);
    expect(filterLandscapeRows(rows, edges, personas, { ...filters, relation: "complement", useCase: "delivery" })).toEqual([]);
    expect(filterLandscapeRows(rows, edges, personas, { ...filters, relation: "complement" })).toHaveLength(1);
  });
});

describe("shareable landscape views", () => {
  const options = {
    domain: ["identity"], category: ["vault"], useCase: ["delivery"], persona: ["platform"],
    deployment: ["saas"], scope: ["nhi"], relation: ["complement"], focusedProduct: ["Zulu"],
  };
  it("round trips every filter, including product, through a copied URL", () => {
    const state = { domain: "identity", category: "vault", useCase: "delivery", persona: "platform",
      deployment: "saas", scope: "nhi", relation: "complement", focusedProduct: "Zulu" };
    const params = new URL(landscapeFilterUrl(state), "https://example.test").searchParams;
    expect(readLandscapeFilters(params, options)).toEqual(state);
  });
  it("ignores unknown values and unrelated URL parameters", () => {
    const params = new URLSearchParams("domain=removed&category=vault&product=missing&scope=invalid&returnTo=https://example.test");
    expect(readLandscapeFilters(params, options)).toEqual({ ...initialLandscapeFilters, category: "vault" });
  });
  it("returns to the bare landscape URL on reset and can restore the previous URL state", () => {
    const before = { ...initialLandscapeFilters, domain: "identity", deployment: "saas" };
    const beforeUrl = landscapeFilterUrl(before);
    expect(landscapeFilterUrl(landscapeFilterReducer(before, { type: "reset" }))).toBe("/landscape");
    expect(readLandscapeFilters(new URL(beforeUrl, "https://example.test").searchParams, options)).toEqual(before);
  });
  it("links to the same unique product anchor rendered on its vendor page", () => {
    const first = new URL(productDetailUrl("example", "vault-one"), "https://example.test");
    const second = new URL(productDetailUrl("example", "vault-two"), "https://example.test");
    expect(first.pathname).toBe("/vendors/example");
    expect(decodeURIComponent(first.hash.slice(1))).toBe(productSectionId("vault-one"));
    expect(first.hash).not.toBe(second.hash);
  });
});
