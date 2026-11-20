import { expect, it } from "vitest";
import guide from "../research/public-secret-monitoring.json";
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
