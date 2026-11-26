import { describe, expect, it } from "vitest";
import { searchLandscape, filterLandscapeRows, initialLandscapeFilters, landscapeFilterReducer, readLandscapeFilters, landscapeFilterUrl, readCatalogReturn, withCatalogReturn, productDetailUrl, productSectionId } from "./landscape-filters";
import type { LandscapeRow } from "@/components/landscape-browser";

const row = (productId: string, overrides: Partial<LandscapeRow> = {}): LandscapeRow => ({
  primaryCategoryIds: [],
  productId, detailHref: productDetailUrl("example", productId), productName: productId, vendorName: "Example", vendorSlug: "example",
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
  it("returns to the same category, search and shortlist through an anchored profile or comparison", () => {
    const filters = { ...initialLandscapeFilters, category: "ciam" };
    const view = landscapeFilterUrl(filters, "a & b?", ["workos", "descope"]);
    for (const href of ["/vendors/example#product-one", "/compare?products=workos,descope"]) {
      const target = new URL(withCatalogReturn(href, view), "https://example.test");
      const original = new URL(href, target.origin);
      expect(target.hash).toBe(original.hash);
      expect(target.searchParams.get("products")).toBe(original.searchParams.get("products"));
      expect(readCatalogReturn(target.searchParams.get("from"))).toBe(view);
    }
    expect(landscapeFilterUrl(initialLandscapeFilters, "", ["workos", "descope"])).toBe("/landscape?shortlist=workos%2Cdescope");
    expect(landscapeFilterUrl(filters)).toBe("/landscape?category=ciam");
  });
  it("accepts only catalog paths and approved filter, query and shortlist keys", () => {
    for (const value of [null, "//example.test", "https://example.test/landscape", "/landscape/other", "/landscape#x", "/landscape/../other"]) {
      expect(readCatalogReturn(value)).toBeNull();
    }
    expect(readCatalogReturn("/landscape")).toBe("/landscape");
    expect(readCatalogReturn("/landscape?category=ciam&from=elsewhere&category=other")).toBe("/landscape?category=ciam");
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

describe("company and product search", () => {
  const companies = [
    { slug: "example", name: "Example", formerNames: ["Former name"] },
    { slug: "company-only", name: "Company only", formerNames: [] },
  ];

  it("matches a recorded former name to the current company and its eligible products", () => {
    const result = searchLandscape(rows, companies, " FORMER Name ", false);
    expect(result.products).toEqual(rows);
    expect(result.companies).toEqual([companies[0]]);
    expect(searchLandscape([rows[1]], companies, "Former name", true).products).toEqual([rows[1]]);
  });

  it("can return a company without mapped products and respects an active product filter", () => {
    expect(searchLandscape(rows, companies, "Company only", false)).toEqual({ companies: [companies[1]], products: [] });
    expect(searchLandscape(rows, companies, "Company only", true)).toEqual({ companies: [], products: [] });
    expect(searchLandscape(rows, companies, "Alpha", false)).toEqual({ companies: [], products: [rows[1]] });
    expect(searchLandscape(rows, companies, " ", false)).toEqual({ companies: [], products: rows });
  });
});
