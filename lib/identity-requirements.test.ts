import { describe, expect, it } from "vitest";
import { catalog, catalogProblems, identityRequirementsForCategory } from "@/lib/catalog";

describe("industry identity requirements", () => {
  const overlay = catalog.segmentOverlays[0];
  const withReq = (req: (typeof overlay.identityRequirements)[number]) => ({
    ...catalog,
    segmentOverlays: [{ ...overlay, identityRequirements: [req] }, ...catalog.segmentOverlays.slice(1)],
  });
  const valid = {
    id: "test-mfa",
    requirement: "Test requirement.",
    rule: "Test rule",
    categoryIds: ["workforce-identity"],
    sourceIds: [catalog.sources[0].id],
  };

  it("accepts a requirement with real categories and sources", () => {
    expect(catalogProblems(withReq(valid)).filter((p) => p.includes("identity requirement"))).toEqual([]);
  });

  it("rejects unknown categories and sources", () => {
    const problems = catalogProblems(withReq({ ...valid, categoryIds: ["not-a-category"], sourceIds: ["not-a-source"] }));
    expect(problems.some((p) => p.includes("category not-a-category missing"))).toBe(true);
    expect(problems.some((p) => p.includes("source not-a-source missing"))).toBe(true);
  });

  it("only links requirements whose sources are in the registry", () => {
    for (const o of catalog.segmentOverlays) {
      for (const req of o.identityRequirements) {
        expect(req.sourceIds.length, req.id).toBeGreaterThan(0);
        for (const id of req.categoryIds) {
          expect(identityRequirementsForCategory(id).some((r) => r.req.id === req.id), `${req.id} → ${id}`).toBe(true);
        }
      }
    }
  });
});
