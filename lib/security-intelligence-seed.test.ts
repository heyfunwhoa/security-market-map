import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

type Source = { id: string; publisher: string; url: string; lastReviewedOn: string };
type Incident = {
  id: string;
  title: string;
  kind: string;
  disclosedOn: string;
  occurredOn: string | null;
  summary: string;
  epistemicStatus: string;
  reviewStatus: string;
  sourceIds: string[];
  techniqueIds: string[];
  packageIds: string[];
};

const load = <T>(name: string): T =>
  JSON.parse(readFileSync(join(process.cwd(), "data/security-intelligence", name), "utf8")) as T;

describe("security-intelligence architecture seed integrity", () => {
  const sources = load<Source[]>("sources.seed.json");
  const incidents = load<Incident[]>("incidents.seed.json");
  const ids = new Set(sources.map((source) => source.id));

  it("has unique, attributed HTTPS sources and stable source identifiers", () => {
    expect(ids.size).toBe(sources.length);
    for (const source of sources) {
      expect(source.id).toMatch(/^source:[a-z0-9-]+$/);
      expect(source.publisher.trim().length).toBeGreaterThan(0);
      expect(new URL(source.url).protocol).toBe("https:");
      expect(source.lastReviewedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("seeds only distinct, sourced incidents with explicit uncertainty", () => {
    expect(new Set(incidents.map((incident) => incident.id)).size).toBe(incidents.length);
    expect(incidents.length).toBeGreaterThanOrEqual(2);
    for (const incident of incidents) {
      expect(incident.id).toMatch(/^incident:[a-z0-9-]+$/);
      expect(incident.title.trim()).not.toBe("");
      expect(incident.summary.trim()).not.toBe("");
      expect(incident.disclosedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(incident.occurredOn).toBeNull();
      expect(incident.epistemicStatus).toBe("reported");
      expect(incident.reviewStatus).toBe("seed_reviewed");
      expect(incident.sourceIds.length).toBeGreaterThan(0);
      for (const id of incident.sourceIds) expect(ids.has(id)).toBe(true);
      expect(incident.techniqueIds).toEqual([]);
      expect(incident.packageIds).toEqual([]);
    }
  });
});
