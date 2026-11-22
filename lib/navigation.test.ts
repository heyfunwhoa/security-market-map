import { describe, expect, it } from "vitest";
import { HEADER_LINKS, NAV_GROUP_TITLES, NAV_HREFS } from "../components/chrome";

// The 17 pages the menu linked before it was regrouped by job (UX audit item 1).
const PAGES_BEFORE_REGROUP = [
  "/about", "/attack-path", "/budget", "/compare", "/connections", "/control-map", "/domains", "/evidence-graph", "/frameworks",
  "/incidents", "/landscape", "/learn", "/methodology", "/personas", "/sources", "/territory", "/use-cases",
];

describe("site menu", () => {
  it("is grouped by what a visitor is trying to do", () => {
    expect(NAV_GROUP_TITLES).toEqual(["Prep for an account", "Explore the market", "Understand how it works", "About the evidence"]);
  });

  it("keeps every page it linked before, once each", () => {
    expect([...NAV_HREFS].sort()).toEqual(PAGES_BEFORE_REGROUP);
    expect(new Set(NAV_HREFS).size).toBe(NAV_HREFS.length);
  });

  it("shows the account-prep entry point and the three market views in the header", () => {
    expect(HEADER_LINKS.map((link) => link.href)).toEqual(["/incidents", "/domains", "/landscape", "/compare"]);
  });
});
