import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Candidate batches follow docs/security-intelligence/incident-classification-framework.md.
// They stay candidate-only: no reviewed mappings, no VERIS values, no publication.
const PINNED_ATTACK_IDS = new Set(["T1195.001", "T1195.002"]);
const KINDS = new Set(["supply_chain", "breach", "intrusion", "malware_campaign"]);
const EPISTEMIC = new Set(["reported", "observed", "hypothesis", "disputed", "unknown"]);

type Mapping = {
  domain: string;
  attackId: string | null;
  stixId: string | null;
  attackDatasetVersion: string | null;
  mappingStatus: string;
  rationale: string | null;
  sourceClaimIds: string[];
  reviewer: string | null;
};
type Candidate = {
  incidentId: string;
  incidentKind: string;
  reviewStatus: string;
  discovery: { publisher: string; canonicalUrl: string; sourceRole: string; discoveredAt: string; usageRights: string }[];
  veris: Record<string, unknown>;
  claims: { id: string; statement: string; epistemicStatus: string; sourceUrl: string }[];
  attackMappings: Mapping[];
  defensiveMappings: unknown[];
  weaknessMappings: unknown[];
  unresolvedQuestions: string[];
};
type Batch = { status: string; publishable: boolean; candidates: Candidate[] };

const dir = join(process.cwd(), "data/security-intelligence/candidates");
const batches = readdirSync(dir)
  .filter((f) => f.endsWith(".json"))
  .map((f) => [f, JSON.parse(readFileSync(join(dir, f), "utf8")) as Batch] as const);
const seedIds = new Set(
  (JSON.parse(readFileSync(join(process.cwd(), "data/security-intelligence/incidents.seed.json"), "utf8")) as { id: string }[]).map((i) => i.id),
);

describe.each(batches)("candidate batch %s", (_name, batch) => {
  it("is candidate-only and never publishable", () => {
    expect(batch.status).toBe("candidate_only");
    expect(batch.publishable).toBe(false);
  });

  it.each(batch.candidates)("$incidentId follows the classification framework", (c) => {
    expect(c.incidentId).toMatch(/^incident:[a-z0-9-]+$/);
    expect(seedIds.has(c.incidentId)).toBe(false);
    expect(KINDS.has(c.incidentKind)).toBe(true);
    expect(c.reviewStatus).toBe("candidate");

    expect(c.discovery.length).toBeGreaterThan(0);
    for (const d of c.discovery) {
      expect(d.publisher.trim()).not.toBe("");
      expect(new URL(d.canonicalUrl).protocol).toBe("https:");
      expect(["primary", "secondary"]).toContain(d.sourceRole);
      expect(Number.isNaN(Date.parse(d.discoveredAt))).toBe(false);
      expect(d.usageRights.trim()).not.toBe("");
    }
    if (!c.discovery.some((d) => d.sourceRole === "primary")) {
      expect(c.unresolvedQuestions.some((q) => q.startsWith("Primary source needed"))).toBe(true);
    }

    // VERIS enums are not imported yet, so only null values are allowed.
    for (const field of ["schemaVersion", "actor", "action", "asset", "attribute"]) expect(c.veris[field]).toBeNull();

    const claimIds = new Set(c.claims.map((cl) => cl.id));
    expect(claimIds.size).toBe(c.claims.length);
    for (const cl of c.claims) {
      expect(EPISTEMIC.has(cl.epistemicStatus)).toBe(true);
      expect(new URL(cl.sourceUrl).protocol).toBe("https:");
      expect(c.discovery.map((d) => d.canonicalUrl)).toContain(cl.sourceUrl);
    }

    for (const m of c.attackMappings) {
      expect(m.domain).toBe("enterprise-attack");
      expect(m.reviewer).toBeNull();
      expect(m.stixId).toBeNull();
      expect(m.attackDatasetVersion).toBeNull();
      expect(["not_evaluated", "candidate"]).toContain(m.mappingStatus);
      if (m.mappingStatus === "candidate") {
        expect(PINNED_ATTACK_IDS.has(m.attackId ?? "")).toBe(true);
        expect(m.rationale?.trim()).toBeTruthy();
        expect(m.sourceClaimIds.length).toBeGreaterThan(0);
        for (const id of m.sourceClaimIds) {
          expect(claimIds.has(id)).toBe(true);
          const claim = c.claims.find((cl) => cl.id === id);
          expect(["reported", "observed"]).toContain(claim?.epistemicStatus);
        }
      } else {
        expect(m.attackId).toBeNull();
        expect(m.sourceClaimIds).toEqual([]);
      }
    }
    expect(c.defensiveMappings).toEqual([]);
    expect(c.weaknessMappings).toEqual([]);
  });
});
