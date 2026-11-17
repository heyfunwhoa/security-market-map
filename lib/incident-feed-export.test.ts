import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import salesNotesSeed from "@/data/security-intelligence/sales-notes.json";
import incidentsSeed from "@/data/security-intelligence/incidents.seed.json";
import industriesSeed from "@/data/security-intelligence/incident-industries.json";
import { buildIncidentFeedExport, INCIDENT_FEED_EXPORT_PATH, renderIncidentFeedExport } from "./incident-feed-export";
import { incidentFeed } from "./incident-feed";

const ROOT = join(__dirname, "..");
const exported = buildIncidentFeedExport();

describe("incident feed consumer export", () => {
  it("contains exactly the published feed", () => {
    expect(exported.incidents.map((i) => i.id)).toEqual(incidentFeed.map((i) => i.incident.id));
    const reviewed = new Set((incidentsSeed as { id: string; reviewStatus: string }[]).filter((i) => i.reviewStatus === "seed_reviewed").map((i) => i.id));
    for (const i of exported.incidents) expect(reviewed.has(i.id)).toBe(true);
  });

  it("only carries reviewed sales notes grounded in the incident's own sources", () => {
    const reviewedNotes = new Set((salesNotesSeed as { incidentId: string; status: string }[]).filter((n) => n.status === "reviewed").map((n) => n.incidentId));
    for (const i of exported.incidents) {
      if (!i.salesNote) continue;
      expect(reviewedNotes.has(i.id)).toBe(true);
      for (const id of i.salesNote.basedOnSourceIds) expect(i.sources.map((s) => s.id)).toContain(id);
    }
  });

  it("keeps sources on every incident and names every linked category", () => {
    for (const i of exported.incidents) {
      expect(i.sources.length).toBeGreaterThan(0);
      for (const s of i.sources) expect(new URL(s.url).protocol).toBe("https:");
      for (const c of i.marketCategories) {
        expect(c.categoryName).toBeTruthy();
        expect(c.doesNotImply.trim()).not.toBe("");
      }
    }
  });

  it("only carries reviewed industry tags", () => {
    const reviewed = new Set(
      (industriesSeed as { incidentId: string; industry: string; status: string }[])
        .filter((t) => t.status === "reviewed")
        .map((t) => `${t.incidentId}|${t.industry}`),
    );
    for (const i of exported.incidents) for (const tag of i.industries) expect(reviewed.has(`${i.id}|${tag.id}`)).toBe(true);
  });

  it("matches the committed file (run npm run export:feed to update)", () => {
    const path = join(ROOT, INCIDENT_FEED_EXPORT_PATH);
    if (process.env.UPDATE_INCIDENT_FEED_EXPORT) writeFileSync(path, renderIncidentFeedExport());
    expect(existsSync(path)).toBe(true);
    expect(readFileSync(path, "utf8")).toBe(renderIncidentFeedExport());
  });
});
