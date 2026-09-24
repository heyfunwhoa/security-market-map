import { describe, expect, it } from "vitest";
import { buildBudget } from "./budget";
import { catalog, catalogProblems } from "./catalog";
import {
  capabilityBands,
  companyLenses,
  credentialChain,
  estateAreas,
  groups,
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

  it("meets the seed minimums", () => {
    const identityCategories = catalog.categories.filter((category) =>
      category.domainIds.includes("identity"),
    );
    expect(identityCategories.length).toBeGreaterThanOrEqual(12);
    expect(catalog.categories.length).toBeGreaterThanOrEqual(40);
    expect(catalog.domains).toHaveLength(10);
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
    ]);
    expect(catalog.domains.find((domain) => domain.id === "identity")?.depth).toBe("evidenced");
    expect(catalog.domains.filter((domain) => domain.id !== "identity").every((domain) => domain.depth === "mapped")).toBe(
      true,
    );
    expect(catalog.vendors.length).toBeGreaterThanOrEqual(35);
    expect(catalog.useCases.length).toBeGreaterThanOrEqual(8);
    expect(catalog.claims.length).toBeGreaterThanOrEqual(12);
  });

  it("does not invent capability evidence outside the identity domain", () => {
    const outside = catalog.capabilities.filter((capability) => {
      const category = catalog.categories.find((item) => item.id === capability.categoryId);
      return category && !category.domainIds.includes("identity");
    });
    expect(outside.length).toBeGreaterThan(0);
    for (const capability of outside) {
      expect(catalog.claims.some((claim) => claim.capabilityId === capability.id)).toBe(false);
    }
    const cell = evidenceCell(catalog.claims, "snyk", "cap-sca", "2026-09-23");
    expect(cell.status).toBe("unknown");
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
