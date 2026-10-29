import { describe, expect, it } from "vitest";
import { filterLandscapeRows, initialLandscapeFilters, landscapeFilterReducer } from "./landscape-filters";
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
