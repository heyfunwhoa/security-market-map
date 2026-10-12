import { describe, expect, it } from "vitest";
import { catalog } from "./catalog";
import { claimsForDomain, claimsForGlossaryTerm, glossaryForDomain, questionsForDomain } from "./domain-study";
import { marketCircles } from "./market-circles";

describe("domain study path", () => {
  it("opens a domain lesson from every map circle", () => {
    expect(marketCircles.map((circle) => circle.href)).toEqual([
      "/domains/corporate",
      "/domains/identity",
      "/domains/corporate",
      "/domains/ai",
      "/domains/appsec",
      "/domains/corporate",
      "/domains/offensive",
      "/domains/cloud",
      "/domains/secops",
      "/domains/data",
      "/domains/grc",
    ]);
  });

  it("uses the identity question and the full glossary", () => {
    expect(questionsForDomain("identity").map((item) => item.question)).toEqual([
      "Who or what can access a system?",
    ]);
    const identity = catalog.domains.find((domain) => domain.id === "identity");
    expect(glossaryForDomain(identity?.categoryIds ?? [], catalog.glossary)).toHaveLength(
      catalog.glossary.length,
    );
  });

  it("has no written words for data security", () => {
    const data = catalog.domains.find((domain) => domain.id === "data");
    expect(glossaryForDomain(data?.categoryIds ?? [], catalog.glossary)).toEqual([]);
  });

  it("puts sourced identity claims on the identity lesson", () => {
    const identity = catalog.domains.find((domain) => domain.id === "identity");
    const claims = claimsForDomain(
      identity?.categoryIds ?? [],
      catalog.claims,
      catalog.products,
      catalog.vendors,
    );
    const ids = claims.map((claim) => claim.id);
    expect(ids).toContain("claim-owasp-nhi");
    expect(ids).toContain("claim-owasp-nhi-top10");
    expect(ids).toContain("claim-wid-definition");
    expect(ids).toContain("claim-infisical-store");
    expect(claims.find((claim) => claim.id === "claim-owasp-nhi")?.verificationStatus).toBe("verified");
    expect(claims.find((claim) => claim.id === "claim-wid-definition")?.verificationStatus).toBe(
      "vendor_published",
    );
  });

  it("links a glossary term only when a claim already states that idea", () => {
    const workload = claimsForGlossaryTerm("workload-identity", catalog.claims);
    expect(workload.map((claim) => claim.sourceId)).toEqual(["src-entra-wid"]);
    expect(claimsForGlossaryTerm("secret", catalog.claims)).toEqual([]);
    expect(claimsForGlossaryTerm("agent", catalog.claims)).toEqual([]);
  });

  it("shares a term when its category also sits in another domain", () => {
    const appsec = catalog.domains.find((domain) => domain.id === "appsec");
    const terms = glossaryForDomain(appsec?.categoryIds ?? [], catalog.glossary).map((term) => term.id);
    expect(terms).toContain("secret");
  });
});
