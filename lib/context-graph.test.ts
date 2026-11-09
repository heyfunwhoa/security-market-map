import { describe, expect, it } from "vitest";
import { catalog } from "./catalog";
import { buildContextGraph, neighbors, nodeId, painNodeId } from "./context-graph";
import { gapReport, gapSummary } from "./gap-report";

const graph = buildContextGraph();
const nodeIds = new Set(graph.nodes.map((n) => n.id));

describe("context graph", () => {
  it("has unique node ids and no dangling edges", () => {
    expect(nodeIds.size).toBe(graph.nodes.length);
    const dangling = graph.edges.filter((e) => !nodeIds.has(e.from) || !nodeIds.has(e.to));
    expect(dangling).toEqual([]);
  });

  it("includes every concept type", () => {
    for (const type of ["category", "capability", "seat", "pain", "objection", "alternative", "trigger", "segment", "source", "vendor", "use-case"]) {
      expect(graph.counts[type] ?? 0, type).toBeGreaterThan(0);
    }
  });

  it("walks seat → pain → capability → category", () => {
    const pains = neighbors(graph, nodeId("seat", "identity-security"), ["experiences"]).map((item) => item.node.id);
    expect(pains.length).toBeGreaterThan(0);
    const capabilityLinks = graph.edges.filter((e) => e.type === "addressed-by" && e.from.startsWith("pain:") && e.to.startsWith("capability:"));
    expect(capabilityLinks.length).toBeGreaterThan(0);
    const cap = capabilityLinks[0].to;
    expect(graph.edges.some((e) => e.type === "contains" && e.to === cap)).toBe(true);
  });

  it("links objections to the alternatives they point at", () => {
    const edges = neighbors(graph, nodeId("objection", "obj-open-source-is-fine"), ["points-to"]);
    expect(edges.map((item) => item.node.type)).toContain("alternative");
  });

  it("keeps a seat and a category with the same key as separate nodes", () => {
    expect(nodeIds.has(nodeId("seat", "ot-security"))).toBe(true);
    expect(nodeIds.has(nodeId("category", "ot-security"))).toBe(true);
    expect(graph.counts.seat).toBeGreaterThanOrEqual(45);
  });

  it("uses stable pain ids", () => {
    expect(nodeIds.has(painNodeId("ciso", 0))).toBe(true);
  });
});

describe("gap report", () => {
  const gaps = gapReport(catalog, new Date(`${catalog.asOf}T00:00:00Z`));

  it("finds no dangling edges", () => {
    expect(gaps.filter((gap) => gap.kind === "dangling-edge")).toEqual([]);
  });

  it("flags core categories without alternatives and leaves covered ones alone", () => {
    const missing = new Set(gaps.filter((gap) => gap.kind === "category-no-alternatives").map((gap) => gap.subjectId));
    expect(missing.has("secrets-detection")).toBe(false);
    expect(missing.size).toBeGreaterThan(0);
  });

  it("summarizes by kind", () => {
    const summary = gapSummary(gaps);
    expect(summary.reduce((total, group) => total + group.count, 0)).toBe(gaps.length);
  });
});

describe("context search", () => {
  it("finds secrets concepts with their neighborhood", async () => {
    const { contextSearch } = await import("./context-search");
    const hits = contextSearch("leaked secrets", { limit: 5 });
    expect(hits.length).toBeGreaterThan(0);
    expect(hits.some((hit) => hit.related.length > 0)).toBe(true);
    expect(contextSearch("   ")).toEqual([]);
  });

  it("filters by node type", async () => {
    const { contextSearch } = await import("./context-search");
    const hits = contextSearch("platform", { types: ["objection"] });
    expect(hits.every((hit) => hit.node.type === "objection")).toBe(true);
  });
});
