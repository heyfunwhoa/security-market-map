import { expect, it } from "vitest";
import guide from "../research/public-secret-monitoring.json";
import { catalog, productById, sourceById, vendorById } from "./catalog";
import { publicMonitoringClaims } from "./data/public-monitoring";

it("resolves every public monitoring explanation to one vendor, a catalog product and its registered evidence", () => {
  const offers = guide.groups.flatMap((group) => group.offerings);
  const ids = offers.map((offer) => offer.productId);
  expect(new Set(ids).size).toBe(offers.length);
  expect(new Set(publicMonitoringClaims.map((claim) => claim.subjectId))).toEqual(new Set(ids));
  for (const id of ids) {
    const product = productById(id);
    expect(product).toBeDefined();
    expect(vendorById(product!.vendorId)).toBeDefined();
    for (const claim of publicMonitoringClaims.filter((item) => item.subjectId === id)) {
      expect(catalog.claims).toContainEqual(claim);
      const source = sourceById(claim.sourceId);
      expect(source?.canonicalUrl).toBe(claim.sourceUrl);
      expect(catalog.sources.filter((other) => other.canonicalUrl === claim.sourceUrl)).toHaveLength(1);
      expect(claim.verificationStatus).toBe("vendor_published");
    }
  }
});
