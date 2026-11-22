import { expect, it } from "vitest";
import { catalog, productById, sourceById, vendorById } from "./catalog";
import { cedarRidgeSections } from "./data/cedar-ridge";

it("keeps Cedar Ridge deep links unique and resolves every evidence and market reference", () => {
  const ids = cedarRidgeSections.map(({ id }) => id);
  expect(new Set(ids).size).toBe(ids.length);

  for (const section of cedarRidgeSections) {
    for (const topic of section.topics) {
      for (const sourceId of topic.sourceIds ?? []) {
        expect(sourceById(sourceId), sourceId).toBeDefined();
      }
      for (const reference of topic.references ?? []) {
        if ("productId" in reference) {
          const product = productById(reference.productId);
          expect(product && vendorById(product.vendorId), reference.productId).toBeDefined();
        } else if ("vendorId" in reference) {
          expect(vendorById(reference.vendorId), reference.vendorId).toBeDefined();
        } else {
          expect(catalog.categories.some(({ id }) => id === reference.categoryId), reference.categoryId).toBe(true);
        }
      }
    }
  }
});
