import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ComparisonEvidence } from "../components/comparison-evidence";
import { evidenceCell } from "./compare";
import type { Claim, Source } from "./schema";

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
const render = (claims: Claim[], sources: Source[] = []) =>
  renderToStaticMarkup(
    createElement(ComparisonEvidence, {
      cell: evidenceCell(
        claims,
        "fixture-product",
        "fixture-capability",
        "2026-10-12",
      ),
      sources,
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
      expect(html).not.toContain("Supporting sources");
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

describe("comparison review readiness", () => {
  it("does not turn an unreviewed denial into confirmed absence", () => {
    expect(
      evidenceCell(
        [{ ...claim, polarity: "denies", verificationStatus: "needs_review" }],
        "fixture-product",
        "fixture-capability",
        "2026-10-12",
      ).status,
    ).toBe("unverified");
    expect(
      evidenceCell(
        [{ ...claim, polarity: "denies" }],
        "fixture-product",
        "fixture-capability",
        "2026-10-12",
      ).status,
    ).toBe("not_supported");
  });
  it("keeps stale and unavailable freshness warnings outside optional details", () => {
    const source: Source = {
      id: "fixture-source",
      title: "Synthetic source",
      url: claim.sourceUrl,
      canonicalUrl: claim.sourceUrl,
      publisher: "Fixture",
      sourceType: "official_docs",
      publishedAt: null,
      retrievedAt: "2026-01-01",
      volatility: "fast",
      excerpt: "Fixture",
    };
    expect(render([claim], [source]).split("<details")[0]).toContain(
      "Source refresh due",
    );
    expect(render([claim]).split("<details")[0]).toContain(
      "Source freshness unavailable",
    );
    expect(
      render([claim], [{ ...source, retrievedAt: "2026-10-01" }]),
    ).not.toContain("Source refresh due");
  });
});

describe("synthetic correction acceptance", () => {
  const source: Source = {
    id: "fixture-source",
    title: "Synthetic source",
    url: claim.sourceUrl,
    canonicalUrl: claim.sourceUrl,
    publisher: "Fixture",
    sourceType: "official_docs",
    publishedAt: null,
    retrievedAt: "2026-10-01",
    volatility: "fast",
    excerpt: "Fixture only",
  };
  const superseded: Claim = {
    ...claim,
    verificationStatus: "superseded",
    notes: "Corrected by fixture-correction after scope review.",
  };
  const correction: Claim = {
    ...claim,
    id: "fixture-correction",
    polarity: "denies",
    statement:
      "Fictional product does not support this workflow in the documented edition.",
    observedAt: "2026-10-10",
    lastCheckedAt: "2026-10-10",
    notes:
      "Synthetic correction; replaces fixture-claim. Vendor-reported, not independently tested.",
  };

  it("changes the affected result and retains excluded history and original provenance", () => {
    expect(
      evidenceCell([claim], claim.subjectId, claim.capabilityId!, "2026-10-12")
        .status,
    ).toBe("evidenced");
    const cell = evidenceCell(
      [superseded, correction],
      claim.subjectId,
      claim.capabilityId!,
      "2026-10-12",
      [source],
    );
    expect(cell.status).toBe("not_supported");
    expect(cell.claims.map((item) => item.id)).toEqual(["fixture-correction"]);
    expect(cell.supersededClaims).toEqual([superseded]);
    const html = render([superseded, correction], [source]);
    expect(html.split("<details")[0]).toContain(
      "Corrected / superseded evidence",
    );
    expect(html).toContain("Superseded history");
    expect(html).toContain(correction.statement);
    expect(html).toContain('href="https://example.test/docs"');
    expect(html).toContain("Vendor-reported; not independently validated");
  });
  it("does not resurrect superseded support when no replacement exists", () => {
    const cell = evidenceCell(
      [superseded],
      claim.subjectId,
      claim.capabilityId!,
      "2026-10-12",
    );
    expect(cell.status).toBe("unknown");
    expect(cell.claims).toEqual([]);
    expect(render([superseded])).toContain("Superseded history");
  });
  it("fails closed for a missing source registry entry while preserving the original URL", () => {
    const cell = evidenceCell(
      [claim],
      claim.subjectId,
      claim.capabilityId!,
      "2026-10-12",
      [],
    );
    expect(cell.status).toBe("unverified");
    const html = renderToStaticMarkup(
      createElement(ComparisonEvidence, {
        cell,
        sources: [],
        productName: "Fixture",
        capabilityName: "Fixture",
        asOf: "2026-10-12",
      }),
    );
    expect(html).toContain("Source freshness unavailable");
    expect(html).toContain('href="https://example.test/docs"');
  });
  it("keeps reviewed independent evidence distinct from publisher-reported and stale evidence", () => {
    const html = render(
      [{ ...claim, verificationStatus: "verified", sourceType: "standard" }],
      [{ ...source, sourceType: "standard" }],
    );
    expect(html.split("<details")[0]).toContain(
      "Reviewed · independent source",
    );
    expect(html).not.toContain("Vendor-reported;");
    expect(
      render([claim], [{ ...source, retrievedAt: "2026-01-01" }]).split(
        "<details",
      )[0],
    ).toContain("Stale:");
  });
});
