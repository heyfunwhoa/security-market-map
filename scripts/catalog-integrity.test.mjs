import assert from "node:assert/strict";
import test from "node:test";
import { identityProblems, provenanceProblems } from "../lib/catalog-integrity.ts";

test("rejects duplicate IDs even when slugs differ", () => {
  assert.deepEqual(identityProblems({ vendors: [{ id: "same", slug: "one" }, { id: "same", slug: "two" }] }), ["Duplicate vendors id same"]);
});
test("checks every supplied collection but keeps entity namespaces separate", () => {
  assert.deepEqual(identityProblems({ vendors: [{ id: "same" }], products: [{ id: "same" }] }), []);
  for (const kind of ["vendors", "products", "sources", "claims", "events", "relationships", "categories"]) {
    assert.deepEqual(identityProblems({ [kind]: [{ id: "duplicate" }, { id: "duplicate" }] }), [`Duplicate ${kind} id duplicate`]);
  }
});
test("rejects source-type laundering", () => {
  assert.deepEqual(provenanceProblems([{ id: "source", sourceType: "vendor_marketing" }], [
    { id: "claim", sourceId: "source", sourceType: "standard", subjectType: "vendor", subjectId: "vendor" },
  ], []), ["Claim claim source type does not match its source"]);
});
test("rejects an orphan capability subject", () => {
  assert.deepEqual(provenanceProblems([], [
    { id: "claim", sourceId: "source", sourceType: "official_docs", subjectType: "capability", subjectId: "missing" },
  ], []), ["Claim claim capability subject missing"]);
});
test("accepts consistent provenance and a known capability", () => {
  assert.deepEqual(provenanceProblems([{ id: "source", sourceType: "official_docs" }], [
    { id: "claim", sourceId: "source", sourceType: "official_docs", subjectType: "capability", subjectId: "known" },
  ], ["known"]), []);
});

test("checks the current merged vendor, product, source and claim records", async () => {
  const market = await import("../lib/data/market.ts");
  const ecosystem = await import("../lib/data/ecosystem.ts");
  const expanded = await import("../lib/data/analyst-expansion.ts");
  const sweep = await import("../lib/data/secrets-sweep.ts");
  const { sources } = await import("../lib/data/sources.ts");
  const { claims } = await import("../lib/data/claims.ts");
  const { capabilities } = await import("../lib/data/capabilities.ts");
  const collections = {
    vendors: [...market.vendors, ...ecosystem.ecosystemVendors, ...sweep.secretsSweepVendors, ...expanded.expandedVendors],
    products: [...market.products, ...ecosystem.ecosystemProducts, ...sweep.secretsSweepProducts, ...expanded.expandedProducts],
    sources: [...sources, ...sweep.secretsSweepSources, ...expanded.expandedSources],
    claims: [...claims, ...sweep.secretsSweepClaims, ...expanded.expandedClaims],
  };
  assert.deepEqual(identityProblems(collections), []);
  assert.deepEqual(provenanceProblems(collections.sources, collections.claims,
    [...capabilities, ...ecosystem.ecosystemCapabilities].map((item) => item.id)), []);
});

test("contribution documents link to existing local files", async () => {
  const { readFile, access } = await import("node:fs/promises");
  for (const path of ["../CONTRIBUTING.md", "../docs/market-research/review-template.md"]) {
    const file = new URL(path, import.meta.url);
    const content = await readFile(file, "utf8");
    for (const match of content.matchAll(/\]\(([^)]+)\)/g)) {
      const target = match[1].split("#")[0];
      if (!target || /^[a-z]+:/i.test(target)) continue;
      await assert.doesNotReject(access(new URL(target, file)), `Missing local target: ${target}`);
    }
  }
});
