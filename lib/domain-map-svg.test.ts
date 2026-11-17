import { describe, expect, it } from "vitest";
import { catalog } from "./catalog";
import { domainClaimCounts } from "./domain-evidence";
import { domainMapSvg } from "./domain-map-svg";

describe("downloadable domain map", () => {
  const svg = domainMapSvg({
    domains: catalog.domains,
    claimCounts: domainClaimCounts(catalog),
    totalClaims: catalog.claims.length,
    asOf: catalog.asOf,
  });

  it("draws one equal-size tile per domain with data from the catalog", () => {
    expect(svg.match(/<rect x=/g)).toHaveLength(catalog.domains.length);
    expect(new Set(svg.match(/width="[\d.]+" height="132"/g)).size).toBe(1);
    // Long names wrap onto tspans, so compare the text with tags removed.
    const text = svg.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    for (const domain of catalog.domains) expect(text).toContain(domain.name.replace(/&/g, "&amp;"));
    expect(svg).toContain(`${catalog.claims.length} cited claims`);
  });

  it("is accessible, well-formed enough to open, and has no em dashes", () => {
    expect(svg.startsWith("<?xml")).toBe(true);
    expect(svg).toContain('role="img"');
    expect(svg).toContain("<title id=\"title\">");
    expect(svg).not.toContain("—");
  });
});
