import { describe, expect, it } from "vitest";
import { catalog, catalogProblems, searchHits } from "./catalog";
import { evidenceCell } from "./compare";
import { secretsSweepClaims, secretsSweepProducts } from "./data/secrets-sweep";

describe("secrets sweep evidence boundaries", () => {
  it("keeps all catalog identifiers unique and references valid", () => {
    expect(catalogProblems(catalog)).toEqual([]);
    for (const items of [catalog.vendors, catalog.products, catalog.sources, catalog.claims]) {
      expect(new Set(items.map((item) => item.id)).size).toBe(items.length);
    }
    expect(searchHits("Kingfisher").some((hit) => hit.kind === "Product")).toBe(true);
    expect(searchHits("Vault Radar").some((hit) => hit.kind === "Product")).toBe(true);
  });

  it("does not turn integration evidence into a native scanner claim", () => {
    for (const id of ["armorcode-integration", "tenable-secrets-connectors", "crowdstrike-legit-integration"]) {
      expect(evidenceCell(catalog.claims, id, "cap-secret-discovery", "2026-10-13").status).toBe("unknown");
      expect(secretsSweepProducts.find((product) => product.id === id)?.primaryCategoryIds).not.toContain("secrets-detection");
    }
  });

  it("keeps incomplete and retired scanner evidence unverified", () => {
    for (const id of ["jit-secrets", "forticnapp-secrets", "singularity-cloud-secrets", "entro-secrets", "sysdig-legacy-secrets"]) {
      expect(evidenceCell(catalog.claims, id, "cap-secret-discovery", "2026-10-13").status).toBe("unverified");
    }
    expect(secretsSweepClaims.every((claim) => claim.verificationStatus !== "verified")).toBe(true);
  });

  it("keeps DSPM and DLP neighbors adjacent unless a current page documents a secret detector", () => {
    for (const id of ["varonis-secrets", "bigid-secrets", "sentra-secrets", "strac-secrets", "teleskope-secrets"]) {
      expect(catalog.products.some((product) => product.id === id), id).toBe(true);
      expect(evidenceCell(catalog.claims, id, "cap-secret-discovery", "2026-10-26").status).toBe("evidenced");
      expect(evidenceCell(catalog.claims, id, "cap-secret-verification", "2026-10-26").status).toBe("unknown");
      expect(catalog.vendors.find((vendor) => vendor.id === catalog.products.find((product) => product.id === id)?.vendorId)?.adjacentCategoryIds).toContain(
        "secrets-detection",
      );
    }
    for (const parent of ["varonis", "bigid", "sentra", "strac", "teleskope", "cyera", "concentric-ai"]) {
      expect(evidenceCell(catalog.claims, parent, "cap-secret-discovery", "2026-10-26").status).toBe("unknown");
      expect(catalog.products.find((product) => product.id === parent)?.primaryCategoryIds).not.toContain(
        "secrets-detection",
      );
    }
    expect(catalog.vendors.find((vendor) => vendor.id === "cyera")?.adjacentCategoryIds).not.toContain(
      "secrets-detection",
    );
    expect(catalog.vendors.find((vendor) => vendor.id === "concentric-ai")?.adjacentCategoryIds).not.toContain(
      "secrets-detection",
    );
    for (const id of [
      "rel-varonis-secrets",
      "rel-varonis-secrets-truffle",
      "rel-bigid-secrets",
      "rel-bigid-secrets-truffle",
      "rel-sentra-secrets",
      "rel-sentra-secrets-truffle",
      "rel-strac-secrets",
      "rel-strac-secrets-truffle",
      "rel-teleskope-secrets",
      "rel-teleskope-secrets-truffle",
      "rel-cyera-secrets-adjacent",
      "rel-concentric-secrets-adjacent",
    ]) {
      expect(catalog.relationships.find((relationship) => relationship.id === id)?.type, id).toBe("adjacent_budget");
    }
    const neighbors = [
      "varonis-secrets",
      "bigid-secrets",
      "sentra-secrets",
      "strac-secrets",
      "teleskope-secrets",
      "cyera",
      "concentric-ai",
    ];
    expect(
      catalog.relationships.some(
        (relationship) =>
          neighbors.includes(relationship.fromProductId) &&
          relationship.toProductId === "trufflehog" &&
          relationship.type === "direct_competitor",
      ),
    ).toBe(false);
  });

  it("records later AppSec secrets modules without treating SAST password rules or Sonatype as scanners", () => {
    for (const id of [
      "veracode-container-secrets",
      "black-duck-secrets",
      "opentext-sast-secrets",
      "deepsource-secrets",
      "codacy-secrets",
    ]) {
      expect(catalog.products.some((product) => product.id === id), id).toBe(true);
      expect(evidenceCell(catalog.claims, id, "cap-secret-verification", "2026-10-26").status).toBe("unknown");
      expect(evidenceCell(catalog.claims, id, "cap-secret-discovery", "2026-10-26").status).toBe("evidenced");
    }
    expect(catalog.products.some((product) => product.id.includes("sonatype"))).toBe(false);
    expect(catalog.products.find((product) => product.id === "black-duck-secrets")?.vendorId).toBe("black-duck");
    expect(catalog.vendors.some((vendor) => vendor.id === "synopsys")).toBe(true);
    expect(catalog.vendors.find((vendor) => vendor.id === "veracode")?.adjacentCategoryIds).toContain(
      "secrets-detection",
    );
    const codacyEdges = catalog.relationships.filter((relationship) => relationship.fromProductId === "codacy-secrets");
    expect(codacyEdges.map((relationship) => relationship.type)).toEqual(["complement", "complement"]);
  });

  it("keeps Wiz Code adjacent to the CNAPP record and leaves SAST unsettled", () => {
    const code = catalog.products.find((product) => product.id === "wiz-code");
    expect(code?.vendorId).toBe("wiz");
    expect(code?.primaryCategoryIds).toContain("secrets-detection");
    expect(evidenceCell(catalog.claims, "wiz-code", "cap-secret-discovery", "2026-10-26").status).toBe("evidenced");
    expect(evidenceCell(catalog.claims, "wiz-code", "cap-secret-verification", "2026-10-26").status).toBe("unknown");
    expect(evidenceCell(catalog.claims, "wiz", "cap-secret-discovery", "2026-10-26").status).toBe("unknown");
    const codeClaims = catalog.claims.filter((claim) => claim.subjectId === "wiz-code");
    expect(new Set(codeClaims.map((claim) => claim.capabilityId))).toEqual(
      new Set([null, "cap-secret-discovery"]),
    );
    expect(catalog.relationships.find((relationship) => relationship.id === "rel-wiz-code")?.type).toBe(
      "adjacent_budget",
    );
    expect(catalog.relationships.find((relationship) => relationship.id === "rel-wiz-code-secrets")?.type).toBe(
      "complement",
    );
  });

  it("does not transfer detection to a vault, identity product, or validation capability", () => {
    expect(evidenceCell(secretsSweepClaims, "vault", "cap-secret-discovery", "2026-10-13").status).toBe("unknown");
    expect(evidenceCell(secretsSweepClaims, "sentinelone-identity", "cap-secret-discovery", "2026-10-13").status).toBe("unknown");
    expect(evidenceCell(secretsSweepClaims, "vault-radar", "cap-secret-discovery", "2026-10-13").status).toBe("evidenced");
    expect(evidenceCell(secretsSweepClaims, "snyk-secrets", "cap-secret-verification", "2026-10-13").status).toBe("unknown");
  });
});
