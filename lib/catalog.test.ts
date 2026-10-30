import { describe, expect, it } from "vitest";
import { buildBudget } from "./budget";
import { catalog, catalogProblems } from "./catalog";
import { gatewayTradeoff, runtimeLayers } from "./data/brief";
import {
  capabilityBands,
  companyLenses,
  credentialChain,
  estateAreas,
  groups,
  cloudAppEcosystem,
  dataSecurityEcosystem,
  identityEras,
  nhiEcosystem,
  namedShortlists,
  sacrLanes,
  owaspRisks,
  segments,
} from "./data/connections";
import { compareProducts, evidenceCell } from "./compare";
import { conflictingClaims, isSourceStale } from "./coverage";
import type { Claim } from "./schema";
import { DEFAULT_WEIGHTS, scoreAccount } from "./territory";
import type { Account } from "./schema";

describe("catalog integrity", () => {
  it("parses and cross-checks the seed", () => {
    expect(catalogProblems(catalog)).toEqual([]);
  });

  it("reserves verified for an independent public standard", () => {
    const verified = catalog.claims.filter((claim) => claim.verificationStatus === "verified");
    expect(verified.map((claim) => claim.id).sort()).toEqual(["claim-owasp-nhi", "claim-owasp-nhi-top10"]);
    expect(verified.every((claim) => claim.sourceType === "standard")).toBe(true);
    const vendorClaim = catalog.claims.find((claim) => claim.id === "claim-vault-dynamic");
    expect(vendorClaim?.verificationStatus).toBe("vendor_published");
    const problems = catalogProblems({
      ...catalog,
      claims: catalog.claims.map((claim) =>
        claim.id === "claim-vault-dynamic" ? { ...claim, verificationStatus: "verified" as const } : claim,
      ),
    });
    expect(problems.some((problem) => problem.includes("claim-vault-dynamic") && problem.includes("cannot be verified"))).toBe(
      true,
    );
  });

  it("meets the seed minimums", () => {
    const identityCategories = catalog.categories.filter((category) =>
      category.domainIds.includes("identity"),
    );
    expect(identityCategories.length).toBeGreaterThanOrEqual(12);
    expect(catalog.categories.length).toBeGreaterThanOrEqual(40);
    expect(catalog.domains).toHaveLength(11);
    expect(catalog.domains.map((domain) => domain.id)).toEqual([
      "identity",
      "corporate",
      "appsec",
      "product",
      "cloud",
      "data",
      "secops",
      "grc",
      "offensive",
      "platform",
      "ai",
    ]);
    expect(catalog.domains.find((domain) => domain.id === "identity")?.depth).toBe("evidenced");
    expect(catalog.domains.filter((domain) => domain.id !== "identity").every((domain) => domain.depth === "mapped")).toBe(
      true,
    );
    expect(catalog.vendors.length).toBeGreaterThanOrEqual(35);
    expect(catalog.useCases.length).toBeGreaterThanOrEqual(8);
    expect(catalog.claims.length).toBeGreaterThanOrEqual(12);
  });

  it("keeps security-org personas distinct, aliased, and category-linked", () => {
    const byId = Object.fromEntries(catalog.personas.map((persona) => [persona.id, persona]));
    const required = [
      "appsec",
      "product-security",
      "platform-security",
      "platform",
      "it-security",
      "ciso",
      "security-architect",
      "identity-security",
      "cloud-sec",
      "data-security",
      "privacy",
      "soc-lead",
      "detection-engineer",
      "offensive-security",
      "grc-owner",
      "ai-security",
      "ai-owner",
      "engineering-manager",
      "security-champion",
      "soc-analyst",
      "incident-response",
      "threat-hunter",
      "threat-intel",
      "digital-forensics",
      "insider-risk",
      "network-security",
      "saas-security",
      "ot-security",
      "exposure-management",
      "cyber-recovery",
      "supply-chain-security",
      "security-awareness",
      "mssp-ops",
      "provider-founder",
      "secops-platform-architect",
      "security-product-leader",
      "ir-services-lead",
      "service-delivery",
      "procurement",
      "vciso",
      "malware-analyst",
      "legal-counsel",
      "email-security",
      "ai-operator-owner",
      "developer",
      "cto",
    ] as const;
    for (const id of required) {
      expect(byId[id], id).toBeDefined();
      expect(byId[id].categoryIds.length).toBeGreaterThan(0);
      expect(byId[id].aliases.length, `${id} aliases`).toBeGreaterThan(0);
      for (const categoryId of byId[id].categoryIds) {
        expect(
          catalog.categories.some((category) => category.id === categoryId),
          `${id} → ${categoryId}`,
        ).toBe(true);
      }
    }
    expect(byId.appsec.aliases).toEqual(expect.arrayContaining(["AppSec", "Application security"]));
    expect(byId["product-security"].aliases).toEqual(expect.arrayContaining(["ProdSec", "Product security"]));
    expect(byId["platform-security"].aliases).toEqual(
      expect.arrayContaining(["PlatformSec", "Infrastructure security"]),
    );
    expect(byId.platform.aliases).toEqual(expect.arrayContaining(["DevOps", "SRE", "Platform engineering"]));
    expect(byId["it-security"].aliases).toEqual(
      expect.arrayContaining(["Corporate security", "IT security", "VM owner"]),
    );
    expect(byId.privacy.aliases).toEqual(expect.arrayContaining(["DPO", "Privacy"]));
    expect(byId["threat-intel"].aliases).toEqual(expect.arrayContaining(["CTI", "Threat analysis"]));
    expect(byId["incident-response"].aliases).toEqual(expect.arrayContaining(["IR", "Incident response"]));
    expect(byId["saas-security"].aliases).toEqual(expect.arrayContaining(["SSPM owner", "SaaSSec"]));
    expect(byId["ot-security"].aliases).toEqual(expect.arrayContaining(["OT security", "ICS security"]));
    expect(byId.platform.id).not.toBe(byId["platform-security"].id);
    expect(byId["ai-security"].id).not.toBe(byId["ai-owner"].id);
    expect(byId["soc-lead"].id).not.toBe(byId["detection-engineer"].id);
    expect(byId["soc-lead"].id).not.toBe(byId["soc-analyst"].id);
    expect(byId["data-security"].id).not.toBe(byId.privacy.id);
    expect(byId["digital-forensics"].id).not.toBe(byId["incident-response"].id);
    expect(byId["provider-founder"].aliases).toEqual(expect.arrayContaining(["LC-PER-01", "MSSP CEO"]));
    expect(byId["secops-platform-architect"].aliases).toEqual(
      expect.arrayContaining(["LC-PER-02", "Security platform architect"]),
    );
    expect(byId["security-product-leader"].aliases).toEqual(
      expect.arrayContaining(["LC-PER-07", "AI SOC builder"]),
    );
    expect(byId["detection-engineer"].aliases).toEqual(
      expect.arrayContaining(["Security automation engineer", "LC-PER-04"]),
    );
    expect(byId["provider-founder"].id).not.toBe(byId["mssp-ops"].id);
    expect(byId["secops-platform-architect"].id).not.toBe(byId["security-architect"].id);
    expect(byId["security-product-leader"].id).not.toBe(byId["ai-owner"].id);
    expect(byId.vciso.id).not.toBe(byId.ciso.id);
    expect(byId["legal-counsel"].aliases).toEqual(
      expect.arrayContaining(["Legal counsel", "LC committee: legal"]),
    );
    expect(byId["email-security"].aliases).toEqual(
      expect.arrayContaining(["EmailSec", "SEG owner", "LC use case: email security"]),
    );
    expect(byId["legal-counsel"].id).not.toBe(byId.privacy.id);
    expect(byId["email-security"].id).not.toBe(byId["it-security"].id);
    expect(byId["soc-lead"].aliases).toEqual(expect.arrayContaining(["LC-AUD-03 (ops seat)"]));
    expect(byId["ai-operator-owner"].aliases).toEqual(
      expect.arrayContaining(["AI operator owner", "LC agentic operator governance"]),
    );
    expect(byId["ai-operator-owner"].id).not.toBe(byId["security-product-leader"].id);
    expect(byId["ai-operator-owner"].id).not.toBe(byId["ai-security"].id);
    expect(byId["detection-engineer"].aliases).toEqual(
      expect.arrayContaining(["Lead SecOps", "LC use case: SecOps engineering"]),
    );
    expect(byId.appsec.aliases).toEqual(expect.arrayContaining(["LC use case: code security"]));
    expect(byId["cloud-sec"].aliases).toEqual(expect.arrayContaining(["LC use case: cloud security"]));
    expect(new Set(catalog.personas.map((persona) => persona.id)).size).toBe(catalog.personas.length);
  });

  it("formats persona filter labels with acronym samples", async () => {
    const { personaFilterLabel } = await import("./format");
    expect(personaFilterLabel("AppSec lead", ["AppSec", "Application security", "ASE", "Software security"])).toBe(
      "AppSec lead · AppSec / Application security / ASE",
    );
    expect(personaFilterLabel("CISO / VP of security", ["CISO / VP of security", "CISO"])).toBe(
      "CISO / VP of security · CISO",
    );
  });

  it("does not invent capability evidence outside the identity domain", () => {
    const sourcedOutside = new Set(["cap-sast", "cap-cspm", "cap-endpoint-detect", "cap-backup-restore"]);
    const outside = catalog.capabilities.filter((capability) => {
      const category = catalog.categories.find((item) => item.id === capability.categoryId);
      return category && !category.domainIds.includes("identity");
    });
    expect(outside.length).toBeGreaterThan(0);
    for (const capability of outside) {
      const filled = catalog.claims.some((claim) => claim.capabilityId === capability.id);
      expect(filled).toBe(sourcedOutside.has(capability.id));
    }
    expect(evidenceCell(catalog.claims, "snyk", "cap-sca", "2026-10-26").status).toBe("unknown");
    expect(evidenceCell(catalog.claims, "semgrep", "cap-sca", "2026-10-26").status).toBe("unknown");
    expect(evidenceCell(catalog.claims, "checkmarx", "cap-sca", "2026-10-26").status).toBe("unknown");
    expect(evidenceCell(catalog.claims, "tenable", "cap-vm", "2026-10-26").status).toBe("unknown");
    expect(evidenceCell(catalog.claims, "qualys", "cap-vm", "2026-10-26").status).toBe("unknown");
    expect(evidenceCell(catalog.claims, "rapid7", "cap-vm", "2026-10-26").status).toBe("unknown");
    expect(evidenceCell(catalog.claims, "tenable", "cap-cspm", "2026-10-26").status).toBe("unknown");
    expect(evidenceCell(catalog.claims, "veeam", "cap-dspm", "2026-10-26").status).toBe("unknown");
    expect(evidenceCell(catalog.claims, "sentinelone-platform", "cap-endpoint-detect", "2026-10-26").status).toBe(
      "unknown",
    );
    expect(evidenceCell(catalog.claims, "crowdstrike-identity", "cap-itdr", "2026-10-26").status).toBe("unknown");
    expect(evidenceCell(catalog.claims, "proofpoint", "cap-dlp", "2026-10-26").status).toBe("unknown");
  });

  it("records sourced sentences for other security layers", () => {
    const asOf = "2026-10-26";
    expect(evidenceCell(catalog.claims, "semgrep", "cap-sast", asOf).status).toBe("evidenced");
    expect(evidenceCell(catalog.claims, "checkmarx", "cap-sast", asOf).status).toBe("evidenced");
    expect(evidenceCell(catalog.claims, "checkmarx", "cap-secret-discovery", asOf).status).toBe("evidenced");
    expect(evidenceCell(catalog.claims, "checkmarx", "cap-secret-verification", asOf).status).toBe("unknown");
    expect(evidenceCell(catalog.claims, "orca-security", "cap-cspm", asOf).status).toBe("evidenced");
    expect(evidenceCell(catalog.claims, "orca-security", "cap-secret-discovery", asOf).status).toBe("unknown");
    expect(evidenceCell(catalog.claims, "crowdstrike-platform", "cap-endpoint-detect", asOf).status).toBe("evidenced");
    expect(evidenceCell(catalog.claims, "rubrik", "cap-backup-restore", asOf).status).toBe("evidenced");
    expect(evidenceCell(catalog.claims, "veeam", "cap-backup-restore", asOf).status).toBe("evidenced");
    expect(catalog.claims.find((claim) => claim.id === "claim-abnormal-behavior")?.capabilityId).toBeNull();
    expect(catalog.claims.find((claim) => claim.id === "claim-splunk-telemetry")?.capabilityId).toBeNull();
    expect(catalog.claims.find((claim) => claim.id === "claim-mimecast-email")?.capabilityId).toBeNull();
    const qualys = catalog.relationships.find((item) => item.id === "rel-qualys-tenable");
    expect(qualys?.type).toBe("direct_competitor");
    expect(qualys?.rationale).toContain("missing patches");
    expect(
      catalog.relationships.filter(
        (item) =>
          item.type === "direct_competitor" &&
          ["semgrep", "checkmarx", "orca-security", "crowdstrike-platform", "rubrik", "veeam", "splunk"].includes(
            item.fromProductId,
          ),
      ),
    ).toEqual([]);
    const sourcedIds = new Set([
      "claim-semgrep-sast",
      "claim-checkmarx-sast",
      "claim-checkmarx-secrets",
      "claim-tenable-exposure",
      "claim-tenable-cloud",
      "claim-tenable-identity",
      "claim-qualys-inventory",
      "claim-rapid7-offers",
      "claim-orca-posture",
      "claim-abnormal-behavior",
      "claim-proofpoint-channels",
      "claim-mimecast-email",
      "claim-crowdstrike-edr",
      "claim-sentinelone-endpoint",
      "claim-splunk-telemetry",
      "claim-rubrik-restore",
      "claim-veeam-restore",
      "claim-veeam-dspm",
    ]);
    const joined = catalog.claims
      .filter((claim) => sourcedIds.has(claim.id))
      .map((claim) => `${claim.statement} ${claim.notes ?? ""}`)
      .join("\n");
    for (const banned of ["$385", "80%", "46×", "Fortune 100", "industry's first", "Magic Quadrant"]) {
      expect(joined).not.toContain(banned);
    }
  });

  it("keeps every claim tied to a source and a check date", () => {
    for (const claim of catalog.claims) {
      expect(claim.sourceUrl).toMatch(/^https:\/\//);
      expect(claim.lastCheckedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(claim.observedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(catalog.sources.some((source) => source.id === claim.sourceId)).toBe(true);
    }
  });

  it("scopes every relationship to a use case", () => {
    for (const relationship of catalog.relationships) {
      expect(relationship.useCaseId.length).toBeGreaterThan(0);
      expect(relationship.rationale.length).toBeGreaterThan(20);
    }
  });

  it("links secrets products by job boundary and does not call the expansion vaults direct competitors", () => {
    const expected = [
      "rel-vault-radar",
      "rel-infisical-scanning",
      "rel-akeyless-github-scanner",
      "rel-truffle-infisical",
      "rel-truffle-doppler",
      "rel-delinea-dsv-secret-server",
      "rel-beyondtrust-secrets-pam",
      "rel-vault-bitwarden-sm",
      "rel-vault-1password-secrets",
      "rel-vault-keeper-sm",
      "rel-socket-trufflehog",
      "rel-tenable-secrets-trufflehog",
    ];
    for (const id of expected) {
      expect(catalog.relationships.some((relationship) => relationship.id === id), id).toBe(true);
    }
    const expansionVaults = new Set([
      "bitwarden-secrets-manager",
      "1password-secrets-automation",
      "keeper-secrets-manager",
      "delinea-devops-secrets-vault",
      "beyondtrust-secrets-safe",
    ]);
    for (const relationship of catalog.relationships) {
      const touchesExpansion =
        expansionVaults.has(relationship.fromProductId) || expansionVaults.has(relationship.toProductId);
      if (touchesExpansion) expect(relationship.type, relationship.id).not.toBe("direct_competitor");
    }
    const radar = catalog.relationships.find((relationship) => relationship.id === "rel-vault-radar");
    expect(radar?.toProductId).toBe("vault-radar");
    expect(radar?.type).toBe("complement");
  });

  it("points landscape connections at real seed pages", () => {
    const hrefs = [
      ...capabilityBands.map((band) => band.href),
      ...credentialChain.map((step) => step.href),
      ...segments.flatMap((segment) => [segment.href, ...segment.examples.map((item) => item.href)]),
      ...groups.flatMap((group) => group.examples.map((item) => item.href)),
      ...namedShortlists.flatMap((row) => row.examples.map((item) => item.href)),
      ...estateAreas.flatMap((area) => [area.href, ...area.examples.map((item) => item.href)]),
      ...identityEras.map((era) => era.href),
      ...nhiEcosystem.flatMap((box) => [box.href, ...box.examples.map((item) => item.href)]),
      ...cloudAppEcosystem.flatMap((box) => [
        box.href,
        ...box.categoryIds.map((id) => `/categories/${id}`),
        ...box.examples.map((item) => item.href),
      ]),
      ...dataSecurityEcosystem.flatMap((box) => [
        box.href,
        ...box.categoryIds.map((id) => `/categories/${id}`),
        ...box.examples.map((item) => item.href),
      ]),
      ...sacrLanes.map((lane) => lane.local),
      ...owaspRisks.map((risk) => risk.href),
      ...companyLenses.map((row) => row.href),
    ].filter((href): href is string => typeof href === "string" && href.startsWith("/"));

    for (const href of hrefs) {
      const slug = href.split("/").filter(Boolean).at(-1);
      if (href.startsWith("/vendors/")) {
        expect(catalog.vendors.some((vendor) => vendor.slug === slug), href).toBe(true);
      } else if (href.startsWith("/categories/")) {
        expect(catalog.categories.some((category) => category.slug === slug), href).toBe(true);
      } else if (href.startsWith("/use-cases/")) {
        expect(catalog.useCases.some((useCase) => useCase.slug === slug), href).toBe(true);
      }
    }
    expect(catalog.relationships.some((relationship) => relationship.id === "rel-truffle-akeyless")).toBe(true);
    expect(catalog.claims.some((claim) => claim.id === "claim-owasp-nhi-top10")).toBe(true);
  });

  it("does not record an analyst rank", () => {
    const text = catalog.claims.map((claim) => claim.statement).join(" ").toLowerCase();
    expect(text).not.toContain("magic quadrant");
    expect(text).toContain("records no placement");
  });

  it("keeps adjacent analyst fields off product cells and placements", () => {
    const ids = [
      "claim-gartner-cnapp-20250805",
      "claim-gartner-ctem-20250826",
      "claim-gartner-sse-20250828",
      "claim-gartner-siem-20251013",
      "claim-gartner-email-20260203",
      "claim-sacr-email-20260629",
      "claim-sacr-sdpp-20251120",
      "claim-sacr-detection-20260317",
      "claim-sacr-cloud-soc-20251211",
    ];
    const ctem = catalog.categories.find((category) => category.id === "ctem");
    expect(ctem?.slug).toBe("ctem");
    expect(ctem?.layer).toBe("adjacent");
    expect(ctem?.definition.toLowerCase()).not.toContain("gartner");
    expect(ctem?.domainIds).toEqual(["corporate", "cloud"]);
    expect(ctem?.adjacentCategoryIds).toEqual([
      "it-vulnerability-management",
      "external-attack-surface",
      "cspm",
      "breach-simulation",
      "cloud-vulnerability",
    ]);
    expect(catalog.categories.some((category) => category.id === "sse")).toBe(false);
    expect(catalog.products.some((product) => product.primaryCategoryIds.includes("ctem"))).toBe(false);
    expect(catalog.vendors.some((vendor) => vendor.primaryCategoryIds.includes("ctem"))).toBe(false);
    const finding = catalog.useCases.find((useCase) => useCase.id === "uc-finding-route");
    expect(finding?.categoryIds).toContain("ctem");
    expect(finding?.architecture).not.toContain("abstract is a program");
    expect(estateAreas.find((area) => area.href === "/categories/ctem")?.examples).toEqual([]);

    for (const id of ids) {
      const claim = catalog.claims.find((item) => item.id === id);
      expect(claim, id).toBeDefined();
      expect(claim?.subjectType).toBe("category");
      expect(claim?.capabilityId).toBeNull();
      expect(claim?.verificationStatus).toBe("needs_review");
      expect(claim?.sourceType).toBe("analyst");
      expect(claim?.observedAt).toBe("2026-10-26");
      expect(claim?.lastCheckedAt).toBe("2026-10-27");
      const source = catalog.sources.find((item) => item.id === claim?.sourceId);
      expect(source?.sourceType).toBe("analyst");
      expect(source?.url).toBe(claim?.sourceUrl);
      expect(source?.retrievedAt).toBe("2026-10-27");
      expect((source?.excerpt.length ?? 999)).toBeLessThanOrEqual(420);
    }

    const sse = catalog.claims.find((claim) => claim.id === "claim-gartner-sse-20250828");
    expect(sse?.subjectId).toBe("network-edge");
    expect(sse?.confidence).toBe("low");
    expect(sse?.statement).not.toMatch(/\bSASE\b/);
    expect(catalog.claims.find((claim) => claim.id === "claim-gartner-cnapp-20250805")?.statement).toContain(
      "protection requirements",
    );

    const bounded = ids
      .map((id) => {
        const claim = catalog.claims.find((item) => item.id === id);
        return `${claim?.statement ?? ""} ${claim?.notes ?? ""}`;
      })
      .join(" ")
      .toLowerCase();
    for (const banned of [
      "magic quadrant",
      "$290",
      "$225",
      "$3.3",
      "cribl",
      "panther",
      "cortex cloud",
      "observo",
      "onum",
      "chronosphere",
    ]) {
      expect(bounded, banned).not.toContain(banned);
    }

    expect(evidenceCell(catalog.claims, "tenable", "cap-vm", "2026-10-26").status).toBe("unknown");
    expect(evidenceCell(catalog.claims, "snyk", "cap-sca", "2026-10-26").status).toBe("unknown");
    expect(evidenceCell(catalog.claims, "qualys", "cap-vm", "2026-10-26").status).toBe("unknown");
    expect(catalog.relationships.filter((relationship) => relationship.type === "direct_competitor")).toHaveLength(35);
  });

  it("keeps newly sourced field sentences off product cells, rosters, and statistics", () => {
    const ids = [
      "claim-gartner-dspm-overview-20260707",
      "claim-gartner-dspm-buyers-20260529",
      "claim-gartner-secrets-20240812",
      "claim-sacr-sdpp-guide-20250421",
      "claim-sacr-hrm-20260521",
      "claim-sacr-dlp-20260423",
      "claim-sacr-exposure-ctem-20251009",
      "claim-sacr-exposure-vm-20251009",
      "claim-sacr-iga-entitlements-20251202",
      "claim-sacr-pam-20260127",
      "claim-sacr-drp-20260729",
    ];
    const drp = catalog.categories.find((category) => category.id === "digital-risk-protection");
    expect(drp?.layer).toBe("adjacent");
    expect(drp?.definition.toLowerCase()).not.toContain("sacr");
    expect(drp?.definition.toLowerCase()).not.toContain("gartner");
    expect(catalog.products.some((product) => product.primaryCategoryIds.includes("digital-risk-protection"))).toBe(false);
    expect(estateAreas.find((area) => area.href === "/categories/digital-risk-protection")?.examples).toEqual([]);
    expect(catalog.categories.some((category) => category.id === "human-risk-management")).toBe(false);

    for (const id of ids) {
      const claim = catalog.claims.find((item) => item.id === id);
      expect(claim, id).toBeDefined();
      expect(claim?.subjectType).toBe("category");
      expect(claim?.capabilityId).toBeNull();
      expect(claim?.verificationStatus).toBe("needs_review");
      expect(claim?.sourceType).toBe("analyst");
      expect(claim?.observedAt).toBe("2026-10-27");
      expect(claim?.lastCheckedAt).toBe("2026-10-27");
      const source = catalog.sources.find((item) => item.id === claim?.sourceId);
      expect(source?.sourceType).toBe("analyst");
      expect(source?.url).toBe(claim?.sourceUrl);
      expect(source?.retrievedAt).toBe("2026-10-27");
      expect((source?.excerpt.length ?? 999)).toBeLessThanOrEqual(420);
    }

    const exposureSource = catalog.sources.find((source) => source.id === "src-sacr-exposure-20251009");
    expect(catalog.claims.filter((claim) => claim.sourceId === exposureSource?.id)).toHaveLength(2);
    expect(catalog.claims.find((claim) => claim.id === "claim-gartner-secrets-20240812")?.statement).not.toMatch(
      /federation/i,
    );
    expect(catalog.claims.find((claim) => claim.id === "claim-sacr-hrm-20260521")?.subjectId).toBe("security-awareness");

    const bounded = ids
      .map((id) => {
        const claim = catalog.claims.find((item) => item.id === id);
        return `${claim?.statement ?? ""} ${claim?.notes ?? ""}`;
      })
      .join(" ")
      .toLowerCase();
    for (const banned of [
      "magic quadrant",
      "75%",
      "31%",
      "76%",
      "4.44",
      "$25",
      "cribl",
      "outtake",
      "cimento",
      "apono",
      "britive",
      "cyberark",
      "astelia",
      "axonius",
      "nagomi",
      "seemplicity",
      "zafran",
      "all logs",
      "critical enablers",
      "dspm is great",
    ]) {
      expect(bounded, banned).not.toContain(banned);
    }

    for (const subjectId of ["endpoint-security", "security-ratings"]) {
      expect(
        catalog.claims.some((claim) => claim.subjectType === "category" && claim.subjectId === subjectId),
        subjectId,
      ).toBe(false);
    }
    expect(evidenceCell(catalog.claims, "tenable", "cap-vm", "2026-10-27").status).toBe("unknown");
    expect(catalog.relationships.filter((relationship) => relationship.type === "direct_competitor")).toHaveLength(35);
  });

  it("keeps the next retrieved field sentences off rosters, scores, and statistics", () => {
    const ids = [
      "claim-gartner-xdr-20241023",
      "claim-gartner-ndr-20260518",
      "claim-gartner-ot-cps-20250218",
      "claim-gartner-ti-20240812",
      "claim-gartner-insider-20260504",
      "claim-gartner-web-api-waap-20251106",
      "claim-gartner-web-api-api-20251106",
      "claim-gartner-soar-20250130",
      "claim-sacr-soar-20240502",
      "claim-sacr-mdr-20260122",
      "claim-sacr-ecp-20260722",
      "claim-sacr-aspm-20240425",
      "claim-sacr-caasm-20261019",
      "claim-sacr-recovery-20260709",
      "claim-sacr-rvas-sast-20261026",
      "claim-sacr-rvas-20261026",
      "claim-sacr-arise-20260903",
      "claim-sacr-mcp-runtime-20260318",
    ];
    const rvas = catalog.categories.find((category) => category.id === "runtime-validated-application-security");
    expect(rvas?.layer).toBe("adjacent");
    expect(rvas?.definition.toLowerCase()).not.toContain("sacr");
    expect(catalog.products.some((product) => product.primaryCategoryIds.includes("runtime-validated-application-security"))).toBe(false);
    expect(estateAreas.find((area) => area.href === "/categories/runtime-validated-application-security")?.examples).toEqual([]);
    expect(catalog.categories.find((category) => category.id === "endpoint-control")?.definition).not.toContain("Software Analyst");
    expect(catalog.categories.find((category) => category.id === "agentic-runtime")?.definition).not.toContain("SACR");
    expect(catalog.categories.find((category) => category.id === "mcp-security")?.definition).not.toContain("SACR");

    for (const id of ids) {
      const claim = catalog.claims.find((item) => item.id === id);
      expect(claim, id).toBeDefined();
      expect(claim?.subjectType).toBe("category");
      expect(claim?.capabilityId).toBeNull();
      expect(claim?.verificationStatus).toBe("needs_review");
      expect(claim?.sourceType).toBe("analyst");
      expect(claim?.lastCheckedAt).toBe("2026-10-27");
      const source = catalog.sources.find((item) => item.id === claim?.sourceId);
      expect(source?.url).toBe(claim?.sourceUrl);
      expect(source?.retrievedAt).toBe("2026-10-27");
      expect((source?.excerpt.length ?? 999)).toBeLessThanOrEqual(420);
    }

    expect(catalog.claims.find((claim) => claim.id === "claim-gartner-insider-20260504")?.confidence).toBe("low");
    expect(catalog.claims.find((claim) => claim.id === "claim-gartner-ti-20240812")?.confidence).toBe("low");
    expect(catalog.claims.find((claim) => claim.id === "claim-gartner-web-api-waap-20251106")?.confidence).toBe("low");
    expect(catalog.claims.filter((claim) => claim.sourceId === "src-gartner-web-api-20251106")).toHaveLength(2);
    const bounded = ids
      .map((id) => {
        const claim = catalog.claims.find((item) => item.id === id);
        return `${claim?.statement ?? ""} ${claim?.notes ?? ""}`;
      })
      .join(" ")
      .toLowerCase();
    for (const banned of [
      "magic quadrant",
      "40%",
      "53%",
      "8.5%",
      "72.8",
      "torq",
      "tines",
      "mindflow",
      "axonius",
      "claroty",
      "dragos",
      "nozomi",
      "extrahop",
      "vectra",
      "arista",
    ]) {
      expect(bounded, banned).not.toContain(banned);
    }
    expect(evidenceCell(catalog.claims, "tenable", "cap-vm", "2026-10-27").status).toBe("unknown");
    expect(catalog.relationships.filter((relationship) => relationship.type === "direct_competitor")).toHaveLength(35);
  });

  it("keeps the identity, exposure, and AppSec sentences off cells, rosters, and prices", () => {
    const ids = [
      "claim-gartner-easm-20251231",
      "claim-gartner-asm-20240409",
      "claim-gartner-itdr-20251024",
      "claim-sacr-itdr-20240501",
      "claim-gartner-ciem-20250121",
      "claim-sacr-browser-20231207",
      "claim-sacr-sca-20240422",
      "claim-sacr-ssc-pillar-20240422",
      "claim-sacr-cspm-20240912",
      "claim-sacr-ai-prompt-20250310",
      "claim-sacr-ai-governance-20250310",
      "claim-sacr-aiap-20260210",
    ];
    expect(catalog.categories.find((category) => category.id === "external-attack-surface")?.definition).not.toContain("Analysts");
    expect(catalog.categories.find((category) => category.id === "enterprise-browser")?.definition).not.toContain("Analysts");
    expect(catalog.categories.find((category) => category.id === "ai-application-security")?.definition).not.toContain("Analysts");
    expect(catalog.categories.find((category) => category.id === "insider-risk")?.definition).not.toContain("Analysts");
    expect(catalog.claims.find((claim) => claim.id === "claim-gartner-ciem-20250121")?.confidence).toBe("low");
    expect(catalog.claims.filter((claim) => claim.sourceId === "src-sacr-sca-20240422")).toHaveLength(2);
    expect(catalog.claims.filter((claim) => claim.sourceId === "src-sacr-ai-20250310")).toHaveLength(2);

    for (const id of ids) {
      const claim = catalog.claims.find((item) => item.id === id);
      expect(claim, id).toBeDefined();
      expect(claim?.subjectType).toBe("category");
      expect(claim?.capabilityId).toBeNull();
      expect(claim?.verificationStatus).toBe("needs_review");
      expect(claim?.sourceType).toBe("analyst");
      expect(claim?.lastCheckedAt).toBe("2026-10-27");
      const source = catalog.sources.find((item) => item.id === claim?.sourceId);
      expect(source?.url).toBe(claim?.sourceUrl);
      expect(source?.retrievedAt).toBe("2026-10-27");
      expect((source?.excerpt.length ?? 999)).toBeLessThanOrEqual(420);
    }

    const bounded = ids
      .map((id) => {
        const claim = catalog.claims.find((item) => item.id === id);
        return `${claim?.statement ?? ""} ${claim?.notes ?? ""}`;
      })
      .join(" ")
      .toLowerCase();
    for (const banned of [
      "magic quadrant",
      "625",
      "99%",
      "85%",
      "90%",
      "77%",
      "okta",
      "sailpoint",
      "island",
      "talon",
      "conceal",
      "veza",
      "wiz",
      "orca",
      "gitguardian",
    ]) {
      expect(bounded, banned).not.toContain(banned);
    }
    expect(evidenceCell(catalog.claims, "snyk", "cap-sca", "2026-10-27").status).toBe("unknown");
    expect(evidenceCell(catalog.claims, "tenable", "cap-vm", "2026-10-27").status).toBe("unknown");
    expect(catalog.relationships.filter((relationship) => relationship.type === "direct_competitor")).toHaveLength(35);
    for (const subjectId of ["endpoint-security", "security-ratings", "dast"]) {
      expect(
        catalog.claims.some((claim) => claim.subjectType === "category" && claim.subjectId === subjectId),
        subjectId,
      ).toBe(false);
    }
  });

  it("keeps the next cloud, identity, and risk sentences off cells and rosters", () => {
    const ids = [
      "claim-gartner-ciam-20250507",
      "claim-gartner-cnapp-cores-20260422",
      "claim-gartner-cwpp-named-20260422",
      "claim-gartner-containers-20260423",
      "claim-gartner-iac-pac-20260810",
      "claim-gartner-microseg-20260618",
      "claim-gartner-tpcrm-20241108",
      "claim-gartner-partner-iam-20260302",
    ];
    expect(catalog.claims.filter((claim) => claim.sourceId === "src-gartner-cnapp-cores-20260422")).toHaveLength(2);
    for (const id of ["claim-gartner-cwpp-named-20260422", "claim-gartner-containers-20260423", "claim-gartner-iac-pac-20260810", "claim-gartner-partner-iam-20260302"]) {
      expect(catalog.claims.find((claim) => claim.id === id)?.confidence).toBe("low");
    }
    for (const id of ids) {
      const claim = catalog.claims.find((item) => item.id === id);
      expect(claim, id).toBeDefined();
      expect(claim?.subjectType).toBe("category");
      expect(claim?.capabilityId).toBeNull();
      expect(claim?.verificationStatus).toBe("needs_review");
      expect(claim?.sourceType).toBe("analyst");
      expect(claim?.lastCheckedAt).toBe("2026-10-27");
      const source = catalog.sources.find((item) => item.id === claim?.sourceId);
      expect(source?.url).toBe(claim?.sourceUrl);
      expect(source?.retrievedAt).toBe("2026-10-27");
      expect((source?.excerpt.length ?? 999)).toBeLessThanOrEqual(420);
    }
    const bounded = ids
      .map((id) => {
        const claim = catalog.claims.find((item) => item.id === id);
        return `${claim?.statement ?? ""} ${claim?.notes ?? ""}`;
      })
      .join(" ")
      .toLowerCase();
    for (const banned of ["magic quadrant", "snyk", "checkmarx", "semgrep", "wiz", "orca", "illumio"]) {
      expect(bounded, banned).not.toContain(banned);
    }
    expect(catalog.relationships.filter((relationship) => relationship.type === "direct_competitor")).toHaveLength(35);
  });

  it("keeps the workforce, simulation, and posture sentences off cells, scores, and prices", () => {
    const ids = [
      "claim-gartner-workforce-am-20250424",
      "claim-gartner-workforce-idv-20260225",
      "claim-gartner-bas-20240130",
      "claim-gartner-threat-model-20240530",
      "claim-gartner-adr-20260803",
      "claim-gartner-tokenization-20240813",
      "claim-forrester-sspm-20220819",
    ];
    expect(catalog.claims.find((claim) => claim.id === "claim-gartner-workforce-am-20250424")?.confidence).toBe("low");
    expect(catalog.claims.filter((claim) => claim.subjectType === "category" && claim.subjectId === "workforce-identity")).toHaveLength(2);
    for (const id of ids) {
      const claim = catalog.claims.find((item) => item.id === id);
      expect(claim, id).toBeDefined();
      expect(claim?.subjectType).toBe("category");
      expect(claim?.capabilityId).toBeNull();
      expect(claim?.verificationStatus).toBe("needs_review");
      expect(claim?.sourceType).toBe("analyst");
      expect(claim?.lastCheckedAt).toBe("2026-10-27");
      const source = catalog.sources.find((item) => item.id === claim?.sourceId);
      expect(source?.url).toBe(claim?.sourceUrl);
      expect(source?.publisher === "Gartner" || source?.publisher === "Forrester").toBe(true);
      expect(source?.retrievedAt).toBe("2026-10-27");
      expect((source?.excerpt.length ?? 999)).toBeLessThanOrEqual(420);
    }
    const bounded = ids
      .map((id) => {
        const claim = catalog.claims.find((item) => item.id === id);
        return `${claim?.statement ?? ""} ${claim?.notes ?? ""}`;
      })
      .join(" ")
      .toLowerCase();
    for (const banned of ["magic quadrant", "15.4", "wave", "roi", "peer insights"]) {
      expect(bounded, banned).not.toContain(banned);
    }
    expect(catalog.claims.filter((claim) => claim.subjectType === "category" && claim.subjectId === "dast")).toHaveLength(0);
    expect(catalog.claims.filter((claim) => claim.subjectType === "category" && claim.subjectId === "security-ratings")).toHaveLength(0);
    expect(catalog.relationships.filter((relationship) => relationship.type === "direct_competitor")).toHaveLength(35);
  });
});

describe("comparison", () => {
  const asOf = "2026-09-23";

  it("returns unknown when a product has no claim for the capability", () => {
    const cell = evidenceCell(catalog.claims, "sailpoint-isc", "cap-jml", asOf);
    expect(cell.status).toBe("unknown");
    expect(cell.claims).toHaveLength(0);
  });

  it("does not treat category membership as evidence", () => {
    const sailpoint = catalog.products.find((product) => product.id === "sailpoint-isc");
    expect(sailpoint?.primaryCategoryIds).toContain("iga");
    const rows = compareProducts({
      productIds: ["sailpoint-isc"],
      capabilityIds: ["cap-jml", "cap-sod"],
      claims: catalog.claims,
      asOf,
    });
    expect(rows.every((row) => row.cells["sailpoint-isc"].status === "unknown")).toBe(true);
  });

  it("shows sourced agent mechanisms without filling the missing ones", () => {
    const rows = compareProducts({
      productIds: ["opal-zero", "c1-platform", "entra-agent-id"],
      capabilityIds: ["cap-agent-decision", "cap-mcp-enforce", "cap-agent-inventory"],
      claims: catalog.claims,
      asOf,
    });
    const byCapability = Object.fromEntries(rows.map((row) => [row.capabilityId, row.cells]));
    expect(byCapability["cap-mcp-enforce"]["opal-zero"].status).toBe("evidenced");
    expect(byCapability["cap-mcp-enforce"]["c1-platform"].status).toBe("unknown");
    expect(byCapability["cap-agent-decision"]["entra-agent-id"].status).toBe("unknown");
    expect(byCapability["cap-agent-inventory"]["entra-agent-id"].status).toBe("evidenced");
  });

  it("keeps conflicting claims side by side", () => {
    const fixture: Claim[] = [
      {
        ...catalog.claims[0],
        id: "a",
        subjectType: "product",
        subjectId: "vault",
        capabilityId: "cap-dynamic-secrets",
        polarity: "asserts",
        verificationStatus: "conflicting",
        conflictsWith: ["b"],
        effectiveFrom: null,
        effectiveTo: null,
      },
      {
        ...catalog.claims[0],
        id: "b",
        subjectType: "product",
        subjectId: "vault",
        capabilityId: "cap-dynamic-secrets",
        polarity: "denies",
        verificationStatus: "conflicting",
        conflictsWith: ["a"],
        statement: "A conflicting denial used only in the test.",
        effectiveFrom: null,
        effectiveTo: null,
      },
    ];
    const cell = evidenceCell(fixture, "vault", "cap-dynamic-secrets", asOf);
    expect(cell.status).toBe("conflicting");
    expect(cell.claims.map((claim) => claim.id).sort()).toEqual(["a", "b"]);
  });

  it("drops superseded claims and claims outside their dates", () => {
    const live = catalog.claims.find((claim) => claim.id === "claim-vault-dynamic");
    expect(live).toBeTruthy();
    const stale: Claim = {
      ...live!,
      id: "old",
      verificationStatus: "superseded",
    };
    const future: Claim = {
      ...live!,
      id: "future",
      verificationStatus: "verified",
      effectiveFrom: "2027-01-01",
    };
    expect(evidenceCell([stale, future], "vault", "cap-dynamic-secrets", asOf).status).toBe(
      "unknown",
    );
  });

  it("surfaces the seeded naming conflict", () => {
    const conflicts = conflictingClaims(catalog.claims);
    const ids = conflicts.map((claim) => claim.id);
    expect(ids).toContain("claim-idira-standalone");
    expect(ids).toContain("claim-idira-rebrand");
  });
});

describe("budget and territory", () => {
  it("uses only entered figures and keeps the disclaimer", () => {
    const model = buildBudget({
      identities: 100,
      applications: 10,
      reviewHoursPerIdentityPerYear: 1,
      jmlEventsPerYear: 50,
      hoursPerJmlEvent: 2,
      requestsPerYear: 200,
      minutesPerRequest: 30,
      hourlyRate: 100,
      retiredToolsAnnual: 0,
      implementationCost: 50000,
      annualLicense: 80000,
      adminHoursPerYear: 100,
    });
    expect(model.years).toBe(3);
    expect(model.modeledLabor).toBe(100 * 1 * 100 * 3 + 50 * 2 * 100 * 3 + 200 * 0.5 * 100 * 3);
    expect(model.disclaimer).toMatch(/not a forecast/i);
    expect(model.lines.find((line) => line.id === "license")?.amount).toBe(240000);
  });

  it("does not treat a blank incumbent as whitespace", () => {
    const account: Account = {
      id: "a",
      name: "Northwind",
      industry: "",
      employees: "",
      identityEstimate: "",
      idp: "",
      iga: { state: "unknown", name: "" },
      pam: { state: "none", name: "" },
      vault: { state: "named", name: "Vault" },
      cloud: [],
      compliance: [],
      agentAdoption: "unknown",
      triggers: "",
      partner: "",
      sourceLinks: [],
      hypothesis: "",
      notes: "",
      useCaseIds: [],
      updatedAt: "2026-09-23",
    };
    const score = scoreAccount(account, DEFAULT_WEIGHTS);
    const iga = score.factors.find((factor) => factor.id === "igaWhitespace");
    const pam = score.factors.find((factor) => factor.id === "pamWhitespace");
    expect(iga?.value).toBeNull();
    expect(pam?.value).toBe(1);
    expect(score.score).not.toBeNull();
  });
});

describe("staleness", () => {
  it("flags the KuppingerCole NHI note as stale", () => {
    const source = catalog.sources.find((item) => item.id === "src-kc-nhi");
    expect(source).toBeTruthy();
    expect(isSourceStale(source!, catalog.asOf)).toBe(true);
  });
});

describe("Cyera Identity and the NHI shortlist", () => {
  const asOf = "2026-10-26";

  it("keeps Cyera Identity separate from the DSPM product and from Oasis", () => {
    const identity = catalog.products.find((product) => product.id === "cyera-identity");
    const dspm = catalog.products.find((product) => product.id === "cyera");
    expect(identity?.vendorId).toBe("cyera");
    expect(identity?.name).toBe("Cyera Identity");
    expect(dspm?.primaryCategoryIds).toContain("dspm");
    expect(dspm?.primaryCategoryIds).not.toContain("nhi");
    expect(catalog.products.some((product) => product.id === "oasis")).toBe(true);

    expect(evidenceCell(catalog.claims, "cyera-identity", "cap-nhi-inventory", asOf).status).toBe("evidenced");
    expect(evidenceCell(catalog.claims, "cyera-identity", "cap-nhi-ownership", asOf).status).toBe("evidenced");
    expect(evidenceCell(catalog.claims, "cyera-identity", "cap-nhi-lifecycle", asOf).status).toBe("evidenced");
    expect(evidenceCell(catalog.claims, "cyera-identity", "cap-secret-discovery", asOf).status).toBe("evidenced");
    expect(evidenceCell(catalog.claims, "cyera-identity", "cap-secret-verification", asOf).status).toBe("unknown");
    expect(evidenceCell(catalog.claims, "cyera-identity", "cap-workload-federation", asOf).status).toBe("unknown");
    expect(evidenceCell(catalog.claims, "cyera", "cap-nhi-inventory", asOf).status).toBe("unknown");
    expect(evidenceCell(catalog.claims, "cyera", "cap-secret-discovery", asOf).status).toBe("unknown");

    const close = catalog.claims.find((claim) => claim.id === "claim-cyera-oasis-complete");
    expect(close?.statement).toContain("$1 billion");
    expect(close?.capabilityId).toBeNull();
    expect(close?.verificationStatus).toBe("vendor_published");
    expect(catalog.events.some((event) => event.id === "evt-oasis-platform-continues" && event.date === "2026-09-30")).toBe(
      true,
    );

    const company = catalog.relationships.find((item) => item.id === "rel-cyera-oasis");
    expect(company?.type).toBe("complement");
    expect(company?.sourceId).toBe("src-cyera-oasis-customers");
    const fromIdentity = catalog.relationships.filter((item) => item.fromProductId === "cyera-identity");
    expect(fromIdentity.map((item) => item.id).sort()).toEqual(["rel-cyera-identity-oasis", "rel-cyera-identity-vault"]);
    expect(fromIdentity.every((item) => item.type !== "direct_competitor")).toBe(true);
    expect(fromIdentity.find((item) => item.id === "rel-cyera-identity-oasis")?.type).toBe("complement");
    expect(fromIdentity.find((item) => item.id === "rel-cyera-identity-vault")?.type).toBe("adjacent_budget");
  });

  it("fills only the NHI cells the current pages actually state", () => {
    expect(evidenceCell(catalog.claims, "token-security", "cap-nhi-inventory", asOf).status).toBe("evidenced");
    expect(evidenceCell(catalog.claims, "token-security", "cap-nhi-ownership", asOf).status).toBe("evidenced");
    expect(evidenceCell(catalog.claims, "token-security", "cap-nhi-lifecycle", asOf).status).toBe("evidenced");
    expect(evidenceCell(catalog.claims, "entro", "cap-nhi-inventory", asOf).status).toBe("evidenced");
    expect(evidenceCell(catalog.claims, "entro", "cap-nhi-ownership", asOf).status).toBe("evidenced");
    expect(evidenceCell(catalog.claims, "entro", "cap-nhi-lifecycle", asOf).status).toBe("evidenced");
    expect(evidenceCell(catalog.claims, "clutch", "cap-nhi-inventory", asOf).status).toBe("evidenced");
    expect(evidenceCell(catalog.claims, "clutch", "cap-nhi-ownership", asOf).status).toBe("unknown");
    expect(evidenceCell(catalog.claims, "clutch", "cap-nhi-lifecycle", asOf).status).toBe("unknown");
    expect(evidenceCell(catalog.claims, "aembit", "cap-workload-federation", asOf).status).toBe("unknown");
    expect(evidenceCell(catalog.claims, "aembit", "cap-nhi-inventory", asOf).status).toBe("unknown");
    expect(catalog.claims.find((claim) => claim.id === "claim-aembit-secretless")?.capabilityId).toBeNull();

    for (const id of ["rel-oasis-entro", "rel-oasis-token", "rel-oasis-clutch"]) {
      expect(catalog.relationships.find((item) => item.id === id)?.type).toBe("direct_competitor");
    }
    const aembit = catalog.relationships.find((item) => item.id === "rel-aembit-oasis");
    expect(aembit?.type).toBe("adjacent_budget");
    expect(aembit?.toProductId).toBe("oasis");
    expect(catalog.relationships.find((item) => item.id === "rel-akeyless-aembit")?.type).toBe("adjacent_budget");
  });

  it("keeps Astrix and Entro on their own records after the June 2026 closes", () => {
    expect(evidenceCell(catalog.claims, "astrix", "cap-nhi-inventory", asOf).status).toBe("evidenced");
    expect(evidenceCell(catalog.claims, "astrix", "cap-nhi-ownership", asOf).status).toBe("unknown");
    expect(evidenceCell(catalog.claims, "astrix", "cap-nhi-lifecycle", asOf).status).toBe("unknown");
    expect(evidenceCell(catalog.claims, "astrix", "cap-workload-federation", asOf).status).toBe("unknown");
    expect(evidenceCell(catalog.claims, "astrix", "cap-secret-discovery", asOf).status).toBe("unknown");
    expect(evidenceCell(catalog.claims, "astrix", "cap-agent-inventory", asOf).status).toBe("unknown");
    expect(evidenceCell(catalog.claims, "astrix", "cap-itdr", asOf).status).toBe("unknown");
    expect(catalog.claims.find((claim) => claim.id === "claim-astrix-deploy")?.capabilityId).toBeNull();
    expect(catalog.claims.find((claim) => claim.id === "claim-cisco-astrix-close")?.statement).toContain("29 Jun 2026");
    expect(catalog.claims.find((claim) => claim.id === "claim-cisco-astrix-close")?.capabilityId).toBeNull();
    expect(catalog.events.some((event) => event.id === "evt-astrix-cisco-close" && event.date === "2026-06-29")).toBe(true);

    expect(evidenceCell(catalog.claims, "entro", "cap-agent-inventory", asOf).status).toBe("evidenced");
    expect(evidenceCell(catalog.claims, "entro", "cap-itdr", asOf).status).toBe("evidenced");
    expect(evidenceCell(catalog.claims, "entro", "cap-secret-discovery", asOf).status).toBe("unknown");
    expect(evidenceCell(catalog.claims, "entro", "cap-secret-verification", asOf).status).toBe("unknown");
    expect(evidenceCell(catalog.claims, "entro-secrets", "cap-secret-discovery", asOf).status).toBe("unverified");
    expect(evidenceCell(catalog.claims, "sailpoint-isc", "cap-nhi-inventory", asOf).status).toBe("unknown");
    expect(evidenceCell(catalog.claims, "sailpoint-isc", "cap-nhi-lifecycle", asOf).status).toBe("unknown");
    expect(catalog.claims.find((claim) => claim.id === "claim-entro-slack")?.capabilityId).toBeNull();
    expect(catalog.claims.find((claim) => claim.id === "claim-entro-close")?.statement).toContain("29 Jun 2026");
    expect(catalog.claims.find((claim) => claim.id === "claim-entro-close")?.capabilityId).toBeNull();
    expect(catalog.events.some((event) => event.id === "evt-entro-close" && event.date === "2026-06-29")).toBe(true);
    expect(catalog.products.some((product) => product.id === "entro")).toBe(true);
    expect(catalog.products.some((product) => product.id === "astrix")).toBe(true);

    expect(catalog.relationships.find((item) => item.id === "rel-entro-sailpoint")?.type).toBe("complement");
    expect(
      catalog.relationships
        .filter((item) => item.fromProductId === "astrix" && item.type === "direct_competitor")
        .map((item) => item.id),
    ).toEqual(["rel-astrix-appomni"]);
    expect(
      catalog.relationships.filter((item) => item.fromProductId === "entro" && item.type === "direct_competitor"),
    ).toEqual([]);
  });

  it("does not turn SaaS discovery or a failed page load into an NHI cell", () => {
    for (const id of ["appomni", "grip", "natoma"]) {
      expect(evidenceCell(catalog.claims, id, "cap-nhi-inventory", asOf).status).toBe("unknown");
      expect(evidenceCell(catalog.claims, id, "cap-nhi-ownership", asOf).status).toBe("unknown");
      expect(evidenceCell(catalog.claims, id, "cap-nhi-lifecycle", asOf).status).toBe("unknown");
    }
    expect(catalog.claims.find((claim) => claim.id === "claim-appomni-discover")?.capabilityId).toBeNull();
    expect(catalog.claims.find((claim) => claim.id === "claim-grip-inventory")?.capabilityId).toBeNull();
    expect(catalog.claims.find((claim) => claim.id === "claim-natoma-site")?.verificationStatus).toBe("needs_review");
    expect(catalog.claims.find((claim) => claim.id === "claim-snowflake-natoma-intent")?.capabilityId).toBeNull();
    const board = groups.find((group) => group.name === "NHI discovery, posture, and governance");
    expect(board?.body).not.toContain("Entro, Token Security, and Clutch do not");
    expect(board?.body).toContain("AppOmni");
  });

  it("does not attribute a lede or a shortlist to an analyst page that was not retrieved", () => {
    for (const id of [
      "xdr",
      "ndr",
      "threat-intelligence",
      "waf-waap",
      "microsegmentation",
      "security-asset-management",
      "ot-security",
      "security-ratings",
      "cyber-recovery",
    ]) {
      expect(catalog.categories.find((category) => category.id === id)?.definition, id).not.toContain("Analysts");
    }
    const machine = namedShortlists.find((row) => row.market === "Machine identity");
    expect(machine?.frame).not.toMatch(/Gartner|Forrester|IDC/);
    const agents = namedShortlists.find((row) => row.market === "Agents");
    expect(agents?.frame).not.toMatch(/Gartner|Forrester|IDC/);
    expect(agents?.frame).toContain("agentic-runtime");
    const secrets = namedShortlists.find((row) => row.market === "Secrets");
    expect(secrets?.frame).toContain("12 Aug 2024");
    expect(gatewayTradeoff.gateway).toContain("18 Mar 2026");
    expect(gatewayTradeoff.gateway.toLowerCase()).not.toContain("never hit");
    expect(gatewayTradeoff.both.toLowerCase()).not.toContain("structural limit");
    expect(runtimeLayers.find((layer) => layer.layer === "Intent-aware decision")?.depth).not.toContain("separate layer");
    expect(runtimeLayers.find((layer) => layer.layer === "Pre-action enforcement")?.depth).not.toContain("production-relevant");
    expect(runtimeLayers.find((layer) => layer.layer === "Pre-action enforcement")?.depth).toContain("3 Sep 2026");
  });
});
