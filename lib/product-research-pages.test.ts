import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ProductPage from "../app/products/[slug]/page";
import { ProductEvidenceExplorer } from "../components/product-evidence-explorer";
import { catalog, catalogProblems, claimsForSubject } from "./catalog";
import { moveFocusStage, productResearchSections, unknownControlBoundaries } from "./product-research";

async function pageHtml(slug: string) {
  const element = await ProductPage({ params: Promise.resolve({ slug }) });
  return renderToStaticMarkup(element);
}

function anchorIds(html: string) {
  return [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
}

describe("product research pages", () => {
  it("keeps canonical vendor and product ids unique", () => {
    expect(catalogProblems(catalog)).toEqual([]);
    for (const kind of ["vendors", "products", "sources", "claims"] as const) {
      const ids = catalog[kind].map((item) => item.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
    expect(catalog.products.filter((product) => product.id === "kingfisher")).toHaveLength(1);
    expect(catalog.products.filter((product) => product.id === "gitguardian")).toHaveLength(1);
    expect(catalog.products.filter((product) => product.id === "gitguardian-developer-endpoint")).toHaveLength(1);
    expect(catalog.vendors.filter((vendor) => vendor.id === "mongodb")).toHaveLength(1);
    expect(catalog.vendors.filter((vendor) => vendor.id === "aikido")).toHaveLength(1);
    expect(catalog.products.find((product) => product.id === "kingfisher")?.primaryCategoryIds).toEqual(["secrets-detection"]);
    expect(catalog.products.find((product) => product.id === "gitguardian-developer-endpoint")?.primaryCategoryIds).toContain("endpoint-control");
    expect(catalog.products.find((product) => product.id === "aikido-device-protection")?.primaryCategoryIds).toContain("endpoint-control");
  });

  it("leaves Kingfisher detector coverage not evaluated", () => {
    const claims = claimsForSubject("product", "kingfisher");
    expect(claims.length).toBeGreaterThan(0);
    expect(claims.every((claim) => claim.verificationStatus === "vendor_published")).toBe(true);
    expect(claims.some((claim) => claim.verificationStatus === "verified")).toBe(false);
    expect(unknownControlBoundaries("kingfisher", catalog.asOf)).toEqual([]);
    expect(claims.every((claim) => claim.sourceUrl.startsWith("https://"))).toBe(true);
  });

  it("names endpoint boundaries that have no evidenced claim", () => {
    expect(unknownControlBoundaries("gitguardian-developer-endpoint", catalog.asOf)).toEqual([
      "Supported package install interception",
      "AI provider and MCP usage inventory",
    ]);
    expect(unknownControlBoundaries("aikido-device-protection", catalog.asOf)).toEqual([
      "AI coding assistant tool-call hooks",
      "Endpoint honeytoken alert",
    ]);
  });

  it("moves the focused workflow without leaving the stage list", () => {
    expect(moveFocusStage(null, "previous", 5)).toBeNull();
    expect(moveFocusStage(null, "next", 5)).toBeNull();
    expect(moveFocusStage(2, "all", 5)).toBeNull();
    expect(moveFocusStage(0, "previous", 5)).toBe(0);
    expect(moveFocusStage(1, "previous", 5)).toBe(0);
    expect(moveFocusStage(3, "next", 5)).toBe(4);
    expect(moveFocusStage(4, "next", 5)).toBe(4);
  });

  it("renders Kingfisher in secrets detection with one workflow and atlas handoff", async () => {
    const html = await pageHtml("kingfisher");
    expect(html).toContain('href="/categories/secrets-detection"');
    expect(html).toContain("Secrets detection");
    expect(html).not.toContain('href="/categories/endpoint-control"');
    expect(html).not.toContain("/compare?category=endpoint-control");
    expect(html).toContain("How it works");
    expect(html).toContain("Show all stages");
    expect(html).toContain("Overview mode: all stages are available.");
    expect(html).toContain('aria-disabled="true"');
    expect(html.match(/aria-pressed="false"/g)).toHaveLength(5);
    expect(html).not.toContain(">Previous<");
    expect(html).toContain("not evaluated");
    expect(html).not.toContain("detector coverage is evaluated");
    expect(html).toContain("Publisher-reported, not independently tested.");
    expect(html).toContain("Vendor said this");
    expect(html).toContain("https://github.com/mongodb/kingfisher");
    expect(html).toContain("https://github.com/heyfunwhoa/detector-coverage-atlas");
    for (const section of productResearchSections("kingfisher")) {
      expect(anchorIds(html)).toContain(section.id);
      expect(html).toContain(`id="${section.id}"`);
      expect(html).toContain("scroll-mt-48");
    }
  });

  it("renders endpoint products with source links, unknown boundaries and comparison as secondary", async () => {
    const gitguardian = await pageHtml("gitguardian-developer-endpoint");
    expect(gitguardian).toContain('href="/categories/endpoint-control"');
    expect(gitguardian).toContain("Unknown control boundaries");
    expect(gitguardian).toContain("Supported package install interception");
    expect(gitguardian).toContain("https://docs.gitguardian.com/endpoint-protection/home");
    expect(gitguardian).toContain("Compare GitGuardian and Aikido");
    expect(gitguardian).not.toContain("product-focus-title");
    expect(anchorIds(gitguardian).every((id) => gitguardian.includes(`id="${id}"`))).toBe(true);

    const aikido = await pageHtml("aikido-device-protection");
    expect(aikido).toContain("Availability unknown");
    expect(aikido).toContain("AI coding assistant tool-call hooks");
    expect(aikido).toContain("Endpoint honeytoken alert");
    expect(aikido).toContain("https://help.aikido.dev/aikido-device-protection/miscellaneous-aikido-endpoint/how-does-endpoint-protection-work");
    expect(aikido).toContain("not independently tested");
    expect(anchorIds(aikido).every((id) => aikido.includes(`id="${id}"`))).toBe(true);
  });

  it("keeps an explicit unknown state and distinct evidence controls", () => {
    const empty = renderToStaticMarkup(createElement(ProductEvidenceExplorer, { claims: [] }));
    expect(empty).toContain("Evidence status: Unknown");
    expect(empty).toContain("not evidence that the capability is unsupported");

    const claims = claimsForSubject("product", "gitguardian-developer-endpoint");
    const html = renderToStaticMarkup(createElement(ProductEvidenceExplorer, { claims }));
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain("hidden=\"\"");
    expect(html.match(/aria-label="Open original source:/g)?.length).toBe(claims.length);
    expect(new Set(claims.map((claim) => `Open original source: ${claim.statement}`)).size).toBe(claims.length);
    for (const claim of claims) {
      expect(html).toContain(`Open original source: ${claim.statement}`);
      expect(html).toContain(`Evidence details: ${claim.statement}`);
      expect(html).toContain("Publication date Unknown");
    }
  });
});
