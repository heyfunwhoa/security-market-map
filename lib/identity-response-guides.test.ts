import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import PublicExposurePage from "../app/landscape/public-exposure/page";
import { CredentialExposureHandoff } from "../components/identity-response-guides";
import secOps from "../research/secops-buyers.json";
import awsHub from "../research/aws-security-hub-buyers.json";
import scenarios from "../research/related-access-scenarios.json";
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

it("links the public exposure scenario to the optional, evidence-specific payment handoff", () => {
  const landscape = renderToStaticMarkup(createElement(PublicExposurePage));
  const guide = renderToStaticMarkup(createElement(CredentialExposureHandoff));
  expect(landscape).toContain('href="/categories/secrets-management#payment-key-coordination"');
  const disclosure = guide.match(/<details[^>]*><summary[^>]*>See who needs to coordinate<\/summary>[\s\S]*?<\/details>/)?.[0];
  expect(disclosure).toBeDefined();
  expect(disclosure).not.toMatch(/^<details[^>]*\bopen\b/);
  expect(disclosure).toContain('id="payment-key-coordination"');
  expect(disclosure).toContain('<label for="payment-key-evidence"');
  expect(disclosure).toContain('selected="">Only the old key’s expiry</option>');
  expect(disclosure).toContain("Only the new key’s use</option>");
  expect(disclosure).toContain("Both checks confirmed</option>");
  expect(disclosure).toContain("Neither check confirmed</option>");
  expect(disclosure).toMatch(/Stripe account admin<\/dt><dd[^>]*><strong>Confirmed/);
  expect(disclosure).toMatch(/Payment service owner<\/dt><dd[^>]*><strong>Still open/);
  expect(disclosure).toContain("Incident owner’s next check-in");
  expect(disclosure).toContain(">Payments team</p>");
  expect(disclosure).toContain("Usage review stays open.");
  expect(disclosure).toContain('href="#exposure-partner-key"');
  expect(guide).toContain('id="exposure-partner-key"');
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


it("connects each related access scenario to a category and registered first-party evidence", () => {
  expect(new Set(scenarios.map((sample) => sample.id)).size).toBe(scenarios.length);
  for (const sample of scenarios) {
    expect(categoryBySlug(sample.categoryId), sample.id).toBeDefined();
    expect(sample.claimIds.length + sample.sourceIds.length).toBeGreaterThan(0);
    const evidence = [...sample.sourceIds];
    for (const id of sample.claimIds) {
      const claim = claims.get(id)!;
      expect(claim.subjectType, id).toBe("product");
      expect(claim.verificationStatus).toBe("vendor_published");
      expect(sourceById(claim.sourceId)?.canonicalUrl).toBe(claim.sourceUrl);
      evidence.push(claim.sourceId);
    }
    for (const id of evidence) {
      const source = sourceById(id)!;
      expect(source.sourceType, id).toBe("official_docs");
      expect(catalog.sources.filter((item) => item.canonicalUrl === source.canonicalUrl)).toHaveLength(1);
    }
  }
});

it("links the AWS guide to two distinct Amazon products and registered evidence for every case", () => {
  const products = ["aws-security-hub", "aws-security-hub-cspm"];
  for (const [i, option] of awsHub.products.entries()) {
    expect(productById(products[i])?.vendorId).toBe("amazon-web-services");
    for (const id of option.claimIds) {
      const claim = claims.get(id)!;
      expect(claim.subjectId, id).toBe(products[i]);
      expect(claim.verificationStatus).toBe("vendor_published");
      expect(sourceById(claim.sourceId)?.canonicalUrl).toBe(claim.sourceUrl);
    }
  }
  expect(new Set(awsHub.cases.map((item) => item.id)).size).toBe(awsHub.cases.length);
  for (const item of awsHub.cases) {
    expect(item.sourceIds.length, item.id).toBeGreaterThan(0);
    for (const id of item.sourceIds) expect(sourceById(id), id).toBeDefined();
  }
});

it("connects SecOps buying decisions to existing categories, products and original evidence", () => {
  expect(new Set(secOps.jobs.map((job) => job.category)).size).toBe(secOps.jobs.length);
  for (const job of secOps.jobs) {
    expect(categoryBySlug(job.category), job.title).toBeDefined();
    for (const option of job.options) {
      const products = new Set<string>();
      for (const id of option.claimIds) {
        const claim = claims.get(id)!;
        expect(claim.subjectType, id).toBe("product");
        expect(claim.verificationStatus, id).toBe("vendor_published");
        expect(productById(claim.subjectId), id).toBeDefined();
        expect(sourceById(claim.sourceId)?.canonicalUrl, id).toBe(claim.sourceUrl);
        products.add(claim.subjectId);
      }
      expect(products.size, option.label).toBe(1);
    }
  }
});
