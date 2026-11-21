import { expect, it } from "vitest";
import guide from "../research/public-secret-monitoring.json";
import exposureGroups from "../research/public-exposure-options.json";
import managementCases from "../research/secrets-management-guide.json";
import related from "../research/external-exposure-guides.json";
import { catalog, categoryBySlug, productById, sourceById, vendorById } from "./catalog";
import { publicMonitoringClaims } from "./data/public-monitoring";

it("resolves every public monitoring explanation to one vendor, a catalog product and its registered evidence", () => {
  const offers = guide.groups.flatMap((group) => group.offerings);
  const ids = offers.map((offer) => offer.productId);
  expect(new Set(ids).size).toBe(offers.length);
  const linkedProducts = new Set(ids);
  for (const [category, guide] of Object.entries(related)) {
    expect(categoryBySlug(category)).toBeDefined();
    const companies = new Set<string>();
    for (const option of guide.options) {
      const claim = publicMonitoringClaims.find((item) => item.id === option.claimId);
      expect(claim, option.claimId).toBeDefined();
      linkedProducts.add(claim!.subjectId);
      companies.add(productById(claim!.subjectId)!.vendorId);
    }
    expect(companies.size).toBeGreaterThanOrEqual(2);
  }
  const scenarioIds = new Set<string>();
  for (const scenario of exposureGroups.flatMap((group) => group.cases)) {
    expect(scenarioIds.has(scenario.id)).toBe(false);
    scenarioIds.add(scenario.id);
    expect(categoryBySlug(scenario.categoryId)).toBeDefined();
    const vendors = new Set<string>();
    for (const option of scenario.options) {
      const claims = option.claimIds.map((id) => publicMonitoringClaims.find((claim) => claim.id === id));
      expect(claims.length).toBeGreaterThan(0);
      expect(claims.every((claim) => claim && claim.subjectId === claims[0]?.subjectId)).toBe(true);
      const product = productById(claims[0]!.subjectId)!;
      linkedProducts.add(product.id);
      vendors.add(product.vendorId);
    }
    expect(vendors.size).toBeGreaterThanOrEqual(3);
  }
  expect(scenarioIds.size).toBe(13);
  expect(new Set(publicMonitoringClaims.map((claim) => claim.subjectId))).toEqual(linkedProducts);
  for (const id of linkedProducts) {
    const product = productById(id);
    expect(product).toBeDefined();
    expect(vendorById(product!.vendorId)).toBeDefined();
    expect(publicMonitoringClaims.some((claim) => claim.subjectId === id)).toBe(true);
    for (const claim of publicMonitoringClaims.filter((item) => item.subjectId === id)) {
      expect(catalog.claims).toContainEqual(claim);
      const source = sourceById(claim.sourceId);
      expect(source?.canonicalUrl).toBe(claim.sourceUrl);
      expect(catalog.sources.filter((other) => other.canonicalUrl === claim.sourceUrl)).toHaveLength(1);
      expect(claim.verificationStatus).toBe("vendor_published");
    }
  }
});

it("links each secrets management decision to publisher evidence for distinct products", () => {
  const expected = ["store", "deliver", "machine-access", "rotate", "issue", "replace", "audit"];
  expect(managementCases.map((item) => item.id)).toEqual(expected);
  const guideClaims = new Set<string>();
  for (const item of managementCases) {
    const vendors = new Set<string>();
    for (const option of item.options) {
      expect(option.claimIds.length).toBeGreaterThan(0);
      const claims = option.claimIds.map((id) => {
        const claim = catalog.claims.find((record) => record.id === id)!;
        expect(claim, id).toBeDefined();
        expect(sourceById(claim.sourceId)?.canonicalUrl).toBe(claim.sourceUrl);
        expect(claim.verificationStatus).toBe("vendor_published");
        guideClaims.add(id);
        return claim;
      });
      expect(new Set(claims.map((claim) => claim.subjectId)).size).toBe(1);
      const product = productById(claims[0].subjectId)!;
      expect(vendorById(product.vendorId)).toBeDefined();
      vendors.add(product.vendorId);
    }
    expect(vendors.size).toBeGreaterThanOrEqual(2);
  }
  for (const claim of catalog.claims.filter((record) => record.id.startsWith("claim-management-"))) {
    expect(guideClaims.has(claim.id), claim.id).toBe(true);
  }
});
