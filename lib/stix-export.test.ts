import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { toStixBundle, uuidv5, type SeedIncident, type SeedSource } from "./stix-export";

const dir = join(process.cwd(), "data/security-intelligence");
const incidents = JSON.parse(readFileSync(join(dir, "incidents.seed.json"), "utf8")) as SeedIncident[];
const sources = JSON.parse(readFileSync(join(dir, "sources.seed.json"), "utf8")) as SeedSource[];
const createdOn = (JSON.parse(readFileSync(join(dir, "stix-created-on.json"), "utf8")) as { createdOn: Record<string, string> }).createdOn;
const bundle = toStixBundle(incidents, sources, createdOn);
const stixIncidents = bundle.objects.filter((o) => o.type === "incident");

describe("STIX 2.1 export", () => {
  it("exports every reviewed incident and nothing else", () => {
    const reviewed = incidents.filter((i) => i.reviewStatus === "seed_reviewed");
    expect(stixIncidents).toHaveLength(reviewed.length);
    const draft = { ...reviewed[0], id: "incident:draft-example", reviewStatus: "candidate" };
    expect(toStixBundle([draft], sources, createdOn).objects.filter((o) => o.type === "incident")).toHaveLength(0);
  });

  it("is deterministic, so re-exports update the same objects", () => {
    expect(toStixBundle(incidents, sources, createdOn)).toEqual(bundle);
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
    expect(() => toStixBundle([{ ...incidents[0], sourceIds: ["source:missing"] }], sources, createdOn)).toThrow(/unknown source/);
  });

  it("keeps created fixed when an incident is re-reviewed, and moves only modified", () => {
    const target = incidents.find((i) => i.reviewStatus === "seed_reviewed")!;
    const id = `incident--${uuidv5(target.id)}`;
    const before = bundle.objects.find((o) => o.id === id)!;
    const reReviewed = incidents.map((i) => (i.id === target.id ? { ...i, lastReviewedOn: "2027-01-15" } : i));
    const after = toStixBundle(reReviewed, sources, createdOn).objects.find((o) => o.id === id)!;
    expect(after.created).toBe(before.created);
    expect(after.modified).toBe("2027-01-15T00:00:00.000Z");
  });

  it("has a pinned created date for every exported incident, never after its review", () => {
    for (const i of incidents.filter((x) => x.reviewStatus === "seed_reviewed" || x.reviewStatus === "approved")) {
      expect(createdOn[i.id], i.id).toBeTruthy();
      expect(createdOn[i.id] <= i.lastReviewedOn, i.id).toBe(true);
    }
    const target = incidents.find((i) => i.reviewStatus === "seed_reviewed")!;
    const rest = Object.fromEntries(Object.entries(createdOn).filter(([k]) => k !== target.id));
    expect(() => toStixBundle([target], sources, rest)).toThrow(/no pinned STIX created date/);
    expect(() => toStixBundle([target], sources, { [target.id]: "2099-01-01" })).toThrow(/after lastReviewedOn/);
  });

  it("carries each cited source's reuse limits", () => {
    const rightsById = new Map(sources.map((s) => [s.id, s.rightsNote]));
    for (const o of stixIncidents) {
      const refs = (o.external_references as { external_id: string }[]).slice(1);
      const rights = o.x_smm_source_rights as { source_id: string; rights_note: string }[];
      expect(rights.map((r) => r.source_id)).toEqual(refs.map((r) => r.external_id));
      for (const r of rights) expect(r.rights_note).toBe(rightsById.get(r.source_id));
    }
  });
});
