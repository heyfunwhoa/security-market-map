import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { toStixBundle, uuidv5, type SeedIncident, type SeedSource } from "./stix-export";

const dir = join(process.cwd(), "data/security-intelligence");
const incidents = JSON.parse(readFileSync(join(dir, "incidents.seed.json"), "utf8")) as SeedIncident[];
const sources = JSON.parse(readFileSync(join(dir, "sources.seed.json"), "utf8")) as SeedSource[];
const bundle = toStixBundle(incidents, sources);
const stixIncidents = bundle.objects.filter((o) => o.type === "incident");

describe("STIX 2.1 export", () => {
  it("exports every reviewed incident and nothing else", () => {
    const reviewed = incidents.filter((i) => i.reviewStatus === "seed_reviewed");
    expect(stixIncidents).toHaveLength(reviewed.length);
    const draft = { ...reviewed[0], id: "incident:draft-example", reviewStatus: "candidate" };
    expect(toStixBundle([draft], sources).objects.filter((o) => o.type === "incident")).toHaveLength(0);
  });

  it("is deterministic, so re-exports update the same objects", () => {
    expect(toStixBundle(incidents, sources)).toEqual(bundle);
    expect(uuidv5("incident:cisa-solarwinds-2020")).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });

  it("keeps the evidence attached to every incident", () => {
    for (const o of stixIncidents) {
      const refs = o.external_references as { source_name: string; url?: string }[];
      expect(refs[0].source_name).toBe("security-market-map");
      expect(refs.slice(1).length).toBeGreaterThan(0);
      for (const r of refs.slice(1)) expect(new URL(r.url!).protocol).toBe("https:");
      expect(o.x_smm_epistemic_status).toBeTruthy();
      expect(Array.isArray(o.x_smm_uncertainty_notes)).toBe(true);
      expect(Object.values(o).includes(null)).toBe(false);
    }
  });

  it("never carries sales notes, category links or candidate data", () => {
    const text = JSON.stringify(bundle);
    for (const field of ["headline", "discoveryQuestion", "talkTrack", "consumerAnnotations", "basedOnSourceIds"]) expect(text).not.toContain(field);
  });

  it("fails loudly on a missing source", () => {
    expect(() => toStixBundle([{ ...incidents[0], sourceIds: ["source:missing"] }], sources)).toThrow(/unknown source/);
  });
});
