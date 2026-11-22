import { describe, expect, it } from "vitest";
import { catalog } from "../catalog";
import { contextSearch } from "../context-search";
import { gapReport, gapSummary } from "../gap-report";
import { basisFor, withBuyerContext } from "./buyer-context";
import { evidenceGraphProblems, graphNodeId } from "./contract";
import { identitySecretsNhiGraph } from "./identity-slice";
import { marketMapGraph } from "./market-map-slice";
import { readEvidenceGraph } from "./read";

const BUYER_KINDS = new Set(["pain", "objection", "alternative", "trigger", "segment"]);

describe("market-map slice with buyer context", () => {
  it("passes every contract check", () => {
    expect(evidenceGraphProblems(marketMapGraph)).toEqual([]);
  });

  it("includes every seat and every buyer-context kind", () => {
    const personas = marketMapGraph.nodes.filter((node) => node.kind === "persona");
    expect(personas.length).toBeGreaterThanOrEqual(45);
    for (const kind of BUYER_KINDS) expect(marketMapGraph.nodes.some((node) => node.kind === kind), kind).toBe(true);
    expect(marketMapGraph.nodes.some((node) => node.id === graphNodeId("persona", "procurement"))).toBe(true);
  });

  it("never asserts a product capability from buyer context", () => {
    const buyerNodeIds = new Set(marketMapGraph.nodes.filter((node) => BUYER_KINDS.has(node.kind)).map((node) => node.id));
    const fromBuyer = marketMapGraph.edges.filter((edge) => buyerNodeIds.has(edge.fromId) || buyerNodeIds.has(edge.toId));
    expect(fromBuyer.length).toBeGreaterThan(0);
    expect(fromBuyer.every((edge) => !edge.assertsProductCapability)).toBe(true);
  });

  it("keeps editorial mappings as uncited hypotheses", () => {
    const mappings = marketMapGraph.edges.filter((edge) => ["addressed_by", "raised_in", "points_to"].includes(edge.predicate));
    expect(mappings.length).toBeGreaterThan(0);
    expect(mappings.every((edge) => edge.evidenceBasis === "hypothesis" && edge.sourceIds.length === 0)).toBe(true);
  });

  it("walks persona → pain → capability", () => {
    const pains = marketMapGraph.edges.filter((edge) => edge.predicate === "experiences" && edge.fromId === graphNodeId("persona", "identity-security"));
    expect(pains.length).toBeGreaterThan(0);
    expect(marketMapGraph.edges.some((edge) => edge.predicate === "addressed_by" && edge.toId.startsWith("capability:"))).toBe(true);
  });

  it("keeps the identity slice unchanged by default", () => {
    expect(identitySecretsNhiGraph.nodes.some((node) => BUYER_KINDS.has(node.kind))).toBe(false);
    const slice = readEvidenceGraph("http://localhost/api/evidence-graph");
    expect("sliceId" in slice && slice.sliceId).toBe("identity-secrets-nhi");
    const map = readEvidenceGraph("http://localhost/api/evidence-graph?slice=market-map&root=persona:appsec&depth=1");
    expect("mode" in map).toBe(true);
    expect(() => readEvidenceGraph("http://localhost/api/evidence-graph?slice=nope")).toThrow(/Unknown slice/);
  });

  it("can layer buyer context onto the identity slice too", () => {
    const layered = withBuyerContext(identitySecretsNhiGraph, catalog);
    expect(layered.problems).toEqual([]);
    expect(layered.graph.nodes.some((node) => node.kind === "alternative" && node.catalogId === "alt-nhi-spreadsheet")).toBe(true);
  });
});

describe("evidence mapping", () => {
  it("never upgrades a label", () => {
    expect(basisFor("sourced", ["s"]).basis).toBe("source_referenced");
    expect(basisFor("sourced", []).basis).toBe("hypothesis");
    expect(basisFor("practitioner_published", ["s"]).basis).toBe("practitioner_published");
    expect(basisFor("hypothesis", ["s"])).toEqual({ basis: "hypothesis", sourceIds: [] });
    expect(basisFor("unknown", ["s"])).toEqual({ basis: "unknown", sourceIds: [] });
  });
});

describe("gap report and context search on the evidence graph", () => {
  const gaps = gapReport(catalog, new Date(`${catalog.asOf}T00:00:00Z`));

  it("reports no contract problems", () => {
    expect(gaps.filter((gap) => gap.kind === "graph-problem")).toEqual([]);
  });

  it("has alternatives for every core category, objections for every seat, and a sourced pain for every seat", () => {
    expect(gaps.filter((gap) => gap.kind === "category-no-alternatives")).toEqual([]);
    expect(gaps.filter((gap) => gap.kind === "seat-no-objections")).toEqual([]);
    expect(gaps.filter((gap) => gap.kind === "seat-no-sourced-pain")).toEqual([]);
    expect(gapSummary(gaps).reduce((total, group) => total + group.count, 0)).toBe(gaps.length);
  });

  it("has qualification questions for every seat and segment, with good- and bad-fit framing", () => {
    const seatIds = marketMapGraph.nodes.filter((node) => node.kind === "persona").map((node) => node.catalogId);
    for (const id of seatIds) {
      const questions = catalog.qualificationQuestions.filter((q) => q.appliesTo.kind === "seat" && q.appliesTo.id === id);
      expect(questions.length, id).toBeGreaterThanOrEqual(3);
    }
    for (const overlay of catalog.segmentOverlays) {
      expect(catalog.qualificationQuestions.some((q) => q.appliesTo.kind === "segment" && q.appliesTo.id === overlay.id), overlay.id).toBe(true);
    }
    expect(catalog.qualificationQuestions.some((q) => q.fit === "bad")).toBe(true);
  });

  it("finds concepts with their evidence-labeled neighborhood", () => {
    const hits = contextSearch("leaked secrets", { limit: 5 });
    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0].related.every((item) => typeof item.evidenceBasis === "string")).toBe(true);
    expect(contextSearch("platform", { types: ["objection"] }).every((hit) => hit.node.kind === "objection")).toBe(true);
    expect(contextSearch("   ")).toEqual([]);
  });

  it("has at least one vendor for every category, without product cells in gated categories", () => {
    expect(gapReport().filter((gap) => gap.kind === "category-no-vendors")).toEqual([]);
    for (const id of ["digital-risk-protection", "runtime-validated-application-security", "ctem"]) {
      expect(catalog.products.some((product) => product.primaryCategoryIds.includes(id)), id).toBe(false);
    }
  });

  it("puts qualification questions in the market-map slice and context search", () => {
    const questions = marketMapGraph.nodes.filter((node) => node.kind === "question");
    expect(questions.length).toBeGreaterThan(100);
    const qualifies = marketMapGraph.edges.filter((edge) => edge.predicate === "qualifies");
    expect(qualifies.some((edge) => edge.toId === graphNodeId("persona", "cloud-sec"))).toBe(true);
    expect(qualifies.some((edge) => edge.toId.startsWith("segment:"))).toBe(true);
    expect(qualifies.every((edge) => edge.assertsProductCapability === false)).toBe(true);
    expect(qualifies.every((edge) => edge.evidenceBasis === "hypothesis" ? edge.sourceIds.length === 0 : true)).toBe(true);

    const hits = contextSearch("cloud security", { types: ["question"], limit: 5 });
    expect(hits.length).toBeGreaterThan(0);
    expect(hits.every((hit) => hit.node.kind === "question")).toBe(true);
    expect(hits[0].related.some((rel) => rel.predicate === "qualifies")).toBe(true);
  });
});
