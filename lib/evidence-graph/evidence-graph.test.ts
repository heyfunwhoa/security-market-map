import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { EvidenceGraphExplorer } from "../../components/evidence-graph-explorer";
import { GET } from "../../app/api/evidence-graph/route";
import { catalog } from "../catalog";
import {
  evidenceGraphProblems,
  graphEdgeId,
  graphNodeId,
  type EvidenceEdge,
  type EvidenceGraph,
} from "./contract";
import { IDENTITY_SECRETS_NHI_SLICE, identitySecretsNhiGraph } from "./identity-slice";
import {
  EvidenceGraphQueryError,
  claimAssertsVerifiedProductCapability,
  expandEvidenceGraph,
  projectEvidenceGraph,
  type ProjectableCatalog,
} from "./project";
import { readEvidenceGraph } from "./read";
import { canvasNodes, diagramNodes, filterGraphNodes } from "./view";

function baseCatalog(overrides: Partial<ProjectableCatalog> = {}): ProjectableCatalog {
  return {
    asOf: "2026-10-13",
    domains: [{ id: "identity", slug: "identity", name: "Identity security", charter: "Who can authenticate." }],
    categories: [{
      id: "secrets-management",
      slug: "secrets-management",
      name: "Secrets management",
      definition: "Issuing and storing secrets.",
      buyerQuestion: "Where do workload secrets live?",
      domainIds: ["identity"],
      adjacentCategoryIds: [],
    }],
    vendors: [{
      id: "hashicorp",
      slug: "hashicorp",
      name: "HashiCorp",
      positioning: "Research candidate vendor.",
      verificationStatus: "research_candidate",
    }],
    products: [{
      id: "vault",
      slug: "vault",
      vendorId: "hashicorp",
      name: "Vault",
      positioning: "Secrets manager.",
      primaryCategoryIds: ["secrets-management"],
      adjacentCategoryIds: [],
      useCaseIds: ["uc-vault"],
    }],
    capabilities: [{
      id: "cap-dynamic",
      slug: "dynamic",
      name: "Dynamic secrets",
      description: "Issue a short-lived credential.",
      categoryId: "secrets-management",
    }],
    useCases: [{
      id: "uc-vault",
      slug: "secrets-vaulting",
      name: "Secrets vaulting",
      problem: "Applications need a secret without a standing key.",
      buyerQuestion: "Who issues the credential?",
      categoryIds: ["secrets-management"],
      capabilityIds: ["cap-dynamic"],
    }],
    personas: [{
      id: "identity-security",
      name: "Identity security",
      title: "Identity lead",
      caresAbout: "Ownership of machine credentials.",
      categoryIds: ["secrets-management"],
    }],
    sources: [{
      id: "src-standard",
      title: "Example standard",
      url: "https://example.com/standard",
      publisher: "Example",
      sourceType: "standard",
      publishedAt: "2026-01-01",
      retrievedAt: "2026-02-02",
    }],
    claims: [],
    relationships: [],
    ...overrides,
  };
}

const slice = {
  id: "fixture",
  title: "Fixture",
  categoryIds: ["secrets-management"],
  useCaseIds: ["uc-vault"],
};

const peerProduct = {
  id: "akeyless",
  slug: "akeyless",
  vendorId: "hashicorp",
  name: "Akeyless",
  positioning: "Second secrets manager.",
  primaryCategoryIds: ["secrets-management"],
  adjacentCategoryIds: [],
  useCaseIds: ["uc-vault"],
};

function projectFixture(overrides: Partial<ProjectableCatalog> = {}) {
  const base = baseCatalog();
  return projectEvidenceGraph(baseCatalog({
    products: [...base.products, peerProduct],
    relationships: [{
      id: "rel-default",
      fromProductId: "vault",
      toProductId: "akeyless",
      type: "direct_competitor",
      useCaseId: "uc-vault",
      rationale: "Default fixture comparison without a source.",
      sourceId: null,
    }],
    ...overrides,
  }), slice);
}

describe("evidence graph contract", () => {
  it("keeps stable ids and does not invent a second identifier", () => {
    expect(graphNodeId("product", "vault")).toBe("product:vault");
    const first = projectFixture();
    const second = projectFixture();
    expect(first.problems).toEqual([]);
    expect(first.graph.nodes.map((node) => node.id)).toEqual(second.graph.nodes.map((node) => node.id));
    expect(first.graph.edges.map((edge) => edge.id)).toEqual(second.graph.edges.map((edge) => edge.id));
    expect(first.graph.nodes.some((node) => node.id === "product:vault")).toBe(true);
    expect(first.graph.edges.every((edge) => edge.id === graphEdgeId(edge))).toBe(true);
  });

  it("rejects an orphan endpoint and a duplicate edge id", () => {
    const missing = projectFixture({
      relationships: [{
        id: "rel-missing",
        fromProductId: "vault",
        toProductId: "not-a-product",
        type: "complement",
        useCaseId: "uc-vault",
        rationale: "The other product is not in the catalog.",
        sourceId: null,
      }],
    });
    expect(missing.problems.some((problem) => problem.includes("not-a-product"))).toBe(true);
    expect(missing.graph.edges.some((edge) => edge.catalogRecordId === "rel-missing")).toBe(false);

    const duplicate = projectFixture({
      relationships: [
        { id: "rel-same", fromProductId: "vault", toProductId: "akeyless", type: "complement", useCaseId: "uc-vault", rationale: "First.", sourceId: null },
        { id: "rel-same", fromProductId: "vault", toProductId: "akeyless", type: "direct_competitor", useCaseId: "uc-vault", rationale: "Second.", sourceId: null },
      ],
    });
    expect(duplicate.problems.some((problem) => problem.includes("Duplicate relationship id rel-same"))).toBe(true);

    const valid = projectFixture().graph;
    const template = valid.edges[0];
    if (!template) throw new Error("Fixture graph has no edges");
    const orphanEdge: EvidenceEdge = {
      ...template,
      id: graphEdgeId({ predicate: "compared_as", fromId: "product:vault", toId: "product:missing", catalogRecordId: "rel-orphan" }),
      predicate: "compared_as",
      fromId: "product:vault",
      toId: "product:missing",
      catalogRecordId: "rel-orphan",
      evidenceBasis: "unknown",
      assertsProductCapability: false,
      sourceIds: [],
    };
    const orphan: EvidenceGraph = {
      ...valid,
      edges: [...valid.edges, orphanEdge].sort((left, right) => left.id.localeCompare(right.id)),
    };
    expect(evidenceGraphProblems(orphan).some((problem) => problem.includes("endpoint outside the graph"))).toBe(true);

    const duplicatedNode: EvidenceGraph = { ...valid, nodes: [valid.nodes[0]!, ...valid.nodes] };
    expect(evidenceGraphProblems(duplicatedNode).some((problem) => problem.includes("Duplicate node id"))).toBe(true);
  });

  it("keeps an unsourced comparison Unknown and preserves source provenance", () => {
    const projected = projectFixture({
      relationships: [{
        id: "rel-unknown",
        fromProductId: "vault",
        toProductId: "akeyless",
        type: "direct_competitor",
        useCaseId: "uc-vault",
        rationale: "No source was recorded.",
        sourceId: null,
      }],
    });
    const unknown = projected.graph.edges.find((edge) => edge.catalogRecordId === "rel-unknown");
    expect(unknown?.evidenceBasis).toBe("unknown");
    expect(unknown?.sourceIds).toEqual([]);
    expect(unknown?.lastCheckedAt).toBeNull();
    expect(unknown?.assertsProductCapability).toBe(false);

    const sourced = projectFixture({
      relationships: [{
        id: "rel-sourced",
        fromProductId: "vault",
        toProductId: "akeyless",
        type: "complement",
        useCaseId: "uc-vault",
        rationale: "A source is attached, which is not independent verification.",
        sourceId: "src-standard",
      }],
    });
    const edge = sourced.graph.edges.find((item) => item.catalogRecordId === "rel-sourced");
    expect(edge?.evidenceBasis).toBe("source_referenced");
    expect(edge?.sourceIds).toEqual(["src-standard"]);
    expect(edge?.retrievedAt).toBe("2026-02-02");
    expect(edge?.publishedAt).toBe("2026-01-01");
    expect(edge?.assertsProductCapability).toBe(false);
    expect(sourced.graph.nodes.find((node) => node.id === "source:src-standard")?.retrievedAt).toBe("2026-02-02");
  });

  it("does not promote taxonomy, hypotheses, vendor reports, denials, or review-queue claims into verified product capabilities", () => {
    const taxonomy = projectFixture().graph.edges.find((edge) => edge.predicate === "primary_category");
    expect(taxonomy?.evidenceBasis).toBe("taxonomy_mapping");
    expect(taxonomy?.assertsProductCapability).toBe(false);
    const interest = projectFixture().graph.edges.find((edge) => edge.predicate === "buyer_interest");
    expect(interest?.evidenceBasis).toBe("hypothesis");
    expect(interest?.sourceIds).toEqual([]);

    const vendorReported = projectFixture({
      sources: [{
        id: "src-vendor",
        title: "Vendor page",
        url: "https://example.com/vendor",
        publisher: "HashiCorp",
        sourceType: "official_docs",
        publishedAt: null,
        retrievedAt: "2026-03-03",
      }],
      claims: [{
        id: "claim-vendor",
        statement: "The vendor says Vault can issue dynamic secrets.",
        subjectType: "product",
        subjectId: "vault",
        capabilityId: "cap-dynamic",
        polarity: "asserts",
        sourceId: "src-vendor",
        sourceType: "official_docs",
        publishedAt: null,
        observedAt: "2026-03-04",
        verificationStatus: "vendor_published",
        lastCheckedAt: "2026-03-05",
        notes: null,
        conflictsWith: [],
      }],
    });
    const vendorEdge = vendorReported.graph.edges.find((edge) => edge.predicate === "concerns_capability");
    expect(vendorEdge?.evidenceBasis).toBe("vendor_reported");
    expect(vendorEdge?.assertsProductCapability).toBe(false);
    expect(vendorEdge?.lastCheckedAt).toBe("2026-03-05");
    expect(vendorReported.graph.nodes.find((node) => node.kind === "vendor")?.recordStatus).toBe("research_candidate");

    const denied = projectFixture({
      claims: [{
        id: "claim-deny",
        statement: "The standard says this product does not provide the capability.",
        subjectType: "product",
        subjectId: "vault",
        capabilityId: "cap-dynamic",
        polarity: "denies",
        sourceId: "src-standard",
        sourceType: "standard",
        publishedAt: "2026-01-01",
        observedAt: "2026-02-03",
        verificationStatus: "verified",
        lastCheckedAt: "2026-02-04",
        notes: null,
        conflictsWith: [],
      }],
    });
    const denial = denied.graph.edges.find((edge) => edge.predicate === "concerns_capability");
    expect(denial?.polarity).toBe("denies");
    expect(denial?.assertsProductCapability).toBe(false);

    const queued = projectFixture({
      claims: [{
        id: "claim-review",
        statement: "This capability still needs review.",
        subjectType: "product",
        subjectId: "vault",
        capabilityId: "cap-dynamic",
        polarity: "asserts",
        sourceId: "src-standard",
        sourceType: "standard",
        publishedAt: null,
        observedAt: "2026-02-03",
        verificationStatus: "needs_review",
        lastCheckedAt: "2026-02-04",
        notes: "Do not treat the gap as a product finding.",
        conflictsWith: [],
      }],
    });
    expect(queued.graph.edges.find((edge) => edge.predicate === "concerns_capability")?.assertsProductCapability).toBe(false);
    expect(queued.graph.edges.find((edge) => edge.predicate === "concerns_capability")?.evidenceBasis).toBe("needs_review");

    const promoted = projectFixture().graph;
    const illegal: EvidenceGraph = {
      ...promoted,
      edges: promoted.edges.map((edge) => edge.predicate === "primary_category" ? { ...edge, assertsProductCapability: true } : edge),
    };
    expect(evidenceGraphProblems(illegal).some((problem) => problem.includes("promotes taxonomy_mapping"))).toBe(true);
    expect(claimAssertsVerifiedProductCapability({
      subjectType: "category",
      polarity: "asserts",
      capabilityId: null,
      verificationStatus: "verified",
      sourceType: "standard",
    })).toBe(false);
  });

  it("allows a verified product capability only for an asserting standard claim", () => {
    const projected = projectFixture({
      claims: [{
        id: "claim-verified",
        statement: "A standard documents this product capability.",
        subjectType: "product",
        subjectId: "vault",
        capabilityId: "cap-dynamic",
        polarity: "asserts",
        sourceId: "src-standard",
        sourceType: "standard",
        publishedAt: "2026-01-01",
        observedAt: "2026-02-03",
        verificationStatus: "verified",
        lastCheckedAt: "2026-02-04",
        notes: null,
        conflictsWith: [],
      }],
    });
    expect(projected.problems).toEqual([]);
    const capability = projected.graph.edges.find((edge) => edge.predicate === "concerns_capability");
    const about = projected.graph.edges.find((edge) => edge.predicate === "about");
    expect(capability?.assertsProductCapability).toBe(true);
    expect(capability?.sourceIds).toEqual(["src-standard"]);
    expect(about?.assertsProductCapability).toBe(false);
  });

  it("bounds expansion and rejects an unknown root or an unsupported depth", () => {
    const graph = projectFixture().graph;
    const first = expandEvidenceGraph(graph, { rootId: "category:secrets-management", depth: 1, nodeLimit: 3, edgeLimit: 3 });
    const second = expandEvidenceGraph(graph, { rootId: "category:secrets-management", depth: 1, nodeLimit: 3, edgeLimit: 3 });
    expect(first).toEqual(second);
    expect(first.nodes.length).toBeLessThanOrEqual(3);
    expect(first.edges.every((edge) => first.nodes.some((node) => node.id === edge.fromId) && first.nodes.some((node) => node.id === edge.toId))).toBe(true);
    expect(() => expandEvidenceGraph(graph, { rootId: "category:missing", depth: 1, nodeLimit: 5, edgeLimit: 5 })).toThrow(EvidenceGraphQueryError);
    expect(() => expandEvidenceGraph(graph, { rootId: "category:secrets-management", depth: 3, nodeLimit: 5, edgeLimit: 5 })).toThrow(/depth/);
  });
});

describe("identity, secrets, and NHI projection", () => {
  it("validates the catalog slice without promoting candidates, personas, or category tags", () => {
    expect(identitySecretsNhiGraph.contractVersion).toBe("1.1.0");
    expect(evidenceGraphProblems(identitySecretsNhiGraph)).toEqual([]);
    expect(identitySecretsNhiGraph.nodes.some((node) => node.id === "product:vault")).toBe(true);
    expect(identitySecretsNhiGraph.nodes.some((node) => node.catalogId === "legal-counsel" || node.catalogId === "legal")).toBe(false);
    expect(identitySecretsNhiGraph.nodes.filter((node) => node.kind === "vendor").every((node) => node.recordStatus === "research_candidate")).toBe(true);
    expect(identitySecretsNhiGraph.edges.some((edge) => edge.assertsProductCapability)).toBe(false);

    const unknown = identitySecretsNhiGraph.edges.find((edge) => edge.catalogRecordId === "rel-c1-sail-jml");
    expect(unknown?.evidenceBasis).toBe("unknown");
    expect(unknown?.sourceIds).toEqual([]);
    expect(unknown?.assertsProductCapability).toBe(false);

    const sourced = identitySecretsNhiGraph.edges.find((edge) => edge.catalogRecordId === "rel-vault-nhi");
    expect(sourced?.evidenceBasis).toBe("source_referenced");
    expect(sourced?.sourceIds).toEqual(["src-oasis-about"]);
    expect(sourced?.retrievedAt).toBe(catalog.sources.find((source) => source.id === "src-oasis-about")?.retrievedAt);
    expect(sourced?.assertsProductCapability).toBe(false);

    const owasp = identitySecretsNhiGraph.edges.find((edge) => edge.catalogRecordId === "claim-owasp-nhi-top10" && edge.predicate === "about");
    expect(owasp?.evidenceBasis).toBe("independently_verified");
    expect(owasp?.assertsProductCapability).toBe(false);
    expect(owasp?.lastCheckedAt).toBe("2026-09-24");

    const gap = identitySecretsNhiGraph.edges.find((edge) => edge.catalogRecordId === "claim-sailpoint-nhi-gap");
    expect(gap?.evidenceBasis).toBe("needs_review");
    expect(gap?.assertsProductCapability).toBe(false);

    const interest = identitySecretsNhiGraph.edges.find((edge) => edge.fromId === "persona:identity-security" && edge.predicate === "buyer_interest");
    expect(interest?.evidenceBasis).toBe("hypothesis");
    expect(interest?.sourceIds).toEqual([]);

    const omitted = identitySecretsNhiGraph.omissions.primaryProductsNotProjected.find((item) => item.categoryId === "secrets-detection");
    expect(omitted?.count).toBeGreaterThan(0);
    expect(identitySecretsNhiGraph.omissions.statement).toMatch(/not evidence/i);
  });

  it("serves a read-only slice and rejects unbounded or unknown queries", async () => {
    const slice = readEvidenceGraph("http://localhost/api/evidence-graph");
    expect("nodes" in slice).toBe(true);
    if ("mode" in slice) throw new Error("The unsliced read should be the full projection");
    expect(slice.nodes.some((node) => node.id === "category:nhi")).toBe(true);

    const expanded = readEvidenceGraph("http://localhost/api/evidence-graph?root=category:nhi&depth=1&nodeLimit=5&edgeLimit=5");
    expect(expanded).toMatchObject({ mode: "expansion", rootId: "category:nhi", depth: 1 });
    if (!("mode" in expanded)) throw new Error("Expected an expansion");
    expect(expanded.nodes.length).toBeLessThanOrEqual(5);
    expect(expanded.edges.length).toBeLessThanOrEqual(5);

    const depth = await GET(new Request("http://localhost/api/evidence-graph?root=category:nhi&depth=9"));
    expect(depth.status).toBe(400);
    const missing = await GET(new Request("http://localhost/api/evidence-graph?root=product:not-real"));
    expect(missing.status).toBe(400);
    const limit = await GET(new Request("http://localhost/api/evidence-graph?root=category:nhi&nodeLimit=500"));
    expect(limit.status).toBe(400);
    const extra = await GET(new Request("http://localhost/api/evidence-graph?refresh=true"));
    expect(extra.status).toBe(400);
    const body = await depth.json();
    expect(body.error).toMatch(/depth/);
  });

  it("filters the visible slice without hiding the selected record", () => {
    const nhi = filterGraphNodes(identitySecretsNhiGraph, {
      categoryId: "nhi",
      search: "",
      includeEvidenceNodes: false,
      selectedId: "category:nhi",
    });
    expect(nhi.some((node) => node.id === "category:nhi")).toBe(true);
    expect(nhi.some((node) => node.kind === "claim")).toBe(false);
    const searched = filterGraphNodes(identitySecretsNhiGraph, {
      categoryId: "all",
      search: "vault",
      includeEvidenceNodes: false,
      selectedId: null,
    });
    expect(searched.some((node) => node.id === "product:vault")).toBe(true);
    const canvas = canvasNodes(identitySecretsNhiGraph.nodes, "product:vault", 2);
    expect(canvas.truncated).toBe(true);
    expect(canvas.nodes).toHaveLength(2);
    expect(canvas.nodes.some((node) => node.id === "product:vault")).toBe(true);
  });

  it("opens on one category neighborhood and keeps the full slice available", () => {
    expect(IDENTITY_SECRETS_NHI_SLICE.categoryIds[0]).toBe("workforce-identity");
    const visible = filterGraphNodes(identitySecretsNhiGraph, {
      categoryId: "workforce-identity",
      search: "",
      includeEvidenceNodes: false,
      selectedId: "category:workforce-identity",
    });
    const diagram = diagramNodes(visible, "workforce-identity", "category:workforce-identity");
    expect(diagram.nodes.length).toBeLessThanOrEqual(8);
    expect(diagram.nodes.some((node) => node.id === "category:workforce-identity")).toBe(true);
    expect(diagram.nodes.some((node) => node.kind === "use_case")).toBe(true);
    expect(diagram.nodes.some((node) => node.kind === "product")).toBe(true);
    expect(diagram.nodes.some((node) => node.kind === "domain")).toBe(false);
    const wide = diagramNodes(identitySecretsNhiGraph.nodes, "all", null);
    expect(wide.nodes.length).toBeLessThanOrEqual(16);
    expect(wide.nodes.length).toBeGreaterThan(diagram.nodes.length);

    const html = renderToStaticMarkup(createElement(EvidenceGraphExplorer, {
      graph: identitySecretsNhiGraph,
      initialCategoryId: IDENTITY_SECRETS_NHI_SLICE.categoryIds[0],
      initialNodeId: `category:${IDENTITY_SECRETS_NHI_SLICE.categoryIds[0]}`,
    }));
    expect(html).toMatch(/aria-pressed="true"[^>]*>Workforce identity</);
    expect(html).toMatch(/aria-pressed="false"[^>]*>All in this slice</);
    expect(html).toContain("Showing Workforce identity");
    expect(html).toContain("narrow screen");
  });

  it("renders the searchable list, filters, evidence panel, relationship list, and mobile fallback", () => {
    const unknown = identitySecretsNhiGraph.edges.find((edge) => edge.catalogRecordId === "rel-c1-sail-jml");
    const html = renderToStaticMarkup(createElement(EvidenceGraphExplorer, {
      graph: identitySecretsNhiGraph,
      initialCategoryId: "all",
      initialNodeId: unknown?.fromId ?? "category:nhi",
    }));
    expect(html).toContain("Search nodes");
    expect(html).toContain('aria-pressed="true"');
    expect(html).toContain('role="listbox"');
    expect(html).toContain('role="option"');
    expect(html).toContain("Relationships");
    expect(html).toContain("Does not assert a product capability.");
    expect(html).toContain("Unknown");
    expect(html).toContain("narrow screen");
    expect(html).toContain("Taxonomy mapping");
    expect(html).toContain("research candidate");
    expect(html).not.toContain("legal-counsel");
  });
});

describe("contract 1.1.0 additions", () => {
  it("accepts every catalog source type and the field_validated basis", async () => {
    const { evidenceBasisSchema, evidenceBasisLabels, evidenceEdgeSchema } = await import("./contract");
    const { sourceTypeSchema } = await import("../schema");
    expect(evidenceBasisSchema.options).toContain("field_validated");
    expect(evidenceBasisLabels.field_validated).toBe("Field validated");
    const sourceTypeField = evidenceEdgeSchema.shape.sourceType;
    for (const type of sourceTypeSchema.options) expect(sourceTypeField.safeParse(type).success, type).toBe(true);
  });
});
