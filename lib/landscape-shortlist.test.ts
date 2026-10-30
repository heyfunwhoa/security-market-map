import { describe, expect, it } from "vitest";
import { shortlistUrl, toggleShortlist } from "./landscape-shortlist";
import { comparisonSelection } from "./comparison-selection";
import { catalog } from "./catalog";

describe("landscape shortlist handoff", () => {
  it("limits selection to four while allowing removal and replacement", () => {
    const full = ["a", "b", "c", "d"];
    expect(toggleShortlist(full, "e")).toEqual(full);
    expect(toggleShortlist(toggleShortlist(full, "b"), "e")).toEqual(["a", "c", "d", "e"]);
    expect(full).toEqual(["a", "b", "c", "d"]);
  });
  it("preserves an explicit shortlist and use case through the existing compare parser", () => {
    const ids = ["trufflehog", "gitguardian"];
    const params = Object.fromEntries(new URL(shortlistUrl(ids, "uc-detect"), "https://example.test").searchParams);
    expect(comparisonSelection(params, catalog)).toMatchObject({ productIds: ids, useCaseId: "uc-detect", categoryId: "" });
  });
  it("does not pass the landscape Any sentinel as a use case", () => {
    const params = new URL(shortlistUrl(["trufflehog", "gitguardian"], "all"), "https://example.test").searchParams;
    expect(params.has("use")).toBe(false);
    expect(params.has("category")).toBe(false);
  });
});
