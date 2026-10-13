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

  it("does not transfer detection to a vault, identity product, or validation capability", () => {
    expect(evidenceCell(secretsSweepClaims, "vault", "cap-secret-discovery", "2026-10-13").status).toBe("unknown");
    expect(evidenceCell(secretsSweepClaims, "sentinelone-identity", "cap-secret-discovery", "2026-10-13").status).toBe("unknown");
    expect(evidenceCell(secretsSweepClaims, "vault-radar", "cap-secret-discovery", "2026-10-13").status).toBe("evidenced");
    expect(evidenceCell(secretsSweepClaims, "snyk-secrets", "cap-secret-verification", "2026-10-13").status).toBe("unknown");
  });
});
