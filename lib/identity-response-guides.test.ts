import { expect, it } from "vitest";
import workforce from "../research/workforce-identity-buyers.json";
import handoff from "../research/credential-exposure-handoff.json";
import { catalog, categoryBySlug, productById, sourceById, vendorById } from "./catalog";

const claims = new Map(catalog.claims.map((item) => [item.id, item]));

it("keeps analyst framing at category level and binds every workforce option to original product evidence", () => {
  const analysts = [...workforce.analystIds, ...workforce.cases.map((item) => item.analystId)];
  const publishers = new Set<string>();
  for (const id of analysts) {
    const claim = claims.get(id)!;
    expect(claim.subjectType, id).toBe("category");
    expect(claim.sourceType).toBe("analyst");
    const source = sourceById(claim.sourceId)!;
    expect(source.canonicalUrl).toBe(claim.sourceUrl);
    publishers.add(source.publisher);
  }
  expect(publishers).toEqual(new Set(["Forrester", "Gartner", "KuppingerCole"]));
  expect(new Set(workforce.cases.map((item) => item.id)).size).toBe(workforce.cases.length);
  for (const item of workforce.cases) {
    expect(categoryBySlug(item.categoryId)).toBeDefined();
    const vendors = new Set<string>();
    for (const option of item.options) {
      const ids = option.claimIds.map((id) => {
        const claim = claims.get(id)!;
        expect(claim.subjectType).toBe("product");
        expect(claim.verificationStatus).toBe("vendor_published");
        expect(sourceById(claim.sourceId)?.canonicalUrl).toBe(claim.sourceUrl);
        return claim.subjectId;
      });
      expect(new Set(ids).size).toBe(1);
      const product = productById(ids[0])!;
      expect(vendorById(product.vendorId)).toBeDefined();
      vendors.add(product.vendorId);
    }
    expect(vendors.size).toBeGreaterThanOrEqual(2);
  }
});

it("resolves the incident examples to documented controls and external issuer evidence", () => {
  for (const sample of handoff.cases) {
    expect(sample.close).toBeTruthy();
    for (const id of sample.claimIds) {
      const claim = claims.get(id)!;
      expect(claim.subjectType).toBe("product");
      expect(sourceById(claim.sourceId)?.canonicalUrl).toBe(claim.sourceUrl);
    }
    for (const id of sample.sourceIds) expect(sourceById(id)?.sourceType).toBe("official_docs");
    expect(categoryBySlug(sample.guide.split("#")[0])).toBeDefined();
  }
});
