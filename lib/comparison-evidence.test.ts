import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ComparisonEvidence } from "../components/comparison-evidence";
import { evidenceCell } from "./compare";
import type { Claim } from "./schema";

const claim: Claim = {
  id: "fixture-claim",
  statement: "Fictional product supports a scoped workflow.",
  subjectType: "product",
  subjectId: "fixture-product",
  capabilityId: "fixture-capability",
  polarity: "asserts",
  sourceId: "fixture-source",
  sourceUrl: "https://example.test/docs",
  sourceType: "official_docs",
  publishedAt: null,
  observedAt: "2026-10-01",
  effectiveFrom: null,
  effectiveTo: null,
  confidence: "medium",
  verificationStatus: "vendor_published",
  lastCheckedAt: "2026-10-01",
  conflictsWith: [],
  notes: "Only the named edition is covered.",
};
const render = (claims: Claim[]) =>
  renderToStaticMarkup(
    createElement(ComparisonEvidence, {
      cell: evidenceCell(
        claims,
        "fixture-product",
        "fixture-capability",
        "2026-10-12",
      ),
      productName: "Fictional product",
      capabilityName: "Example capability",
      asOf: "2026-10-12",
    }),
  );

describe("comparison source disclosure", () => {
  it("retains provenance, dates and qualifications without claiming independent validation", () => {
    const html = render([claim]);
    for (const text of [
      "Supporting sources",
      "Vendor said this",
      "Not stated",
      "2026-10-01",
      "fixture-source",
      "Only the named edition",
      "Limits:",
    ])
      expect(html).toContain(text);
    expect(html).toContain('href="https://example.test/docs"');
    expect(html).not.toContain("<details open");
  });
  it("keeps missing and superseded evidence unknown", () => {
    for (const claims of [
      [],
      [{ ...claim, verificationStatus: "superseded" as const }],
    ]) {
      const html = render(claims);
      expect(html).toContain(
        "Missing evidence does not mean the capability is absent",
      );
      expect(html).not.toContain("<details");
    }
  });
  it("surfaces conflict and scope warnings outside the disclosure", () => {
    expect(
      render([claim, { ...claim, id: "denial", polarity: "denies" }]).split(
        "<details",
      )[0],
    ).toContain("Sources conflict");
    expect(
      render([{ ...claim, polarity: "limits" }]).split("<details")[0],
    ).toContain("Scope limits apply");
    expect(
      render([{ ...claim, verificationStatus: "needs_review" }]).split(
        "<details",
      )[0],
    ).toContain("Evidence needs review");
  });
});
