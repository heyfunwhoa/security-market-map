import { describe, expect, it } from "vitest";
import {
  buildIncidentFeed,
  filterIncidents,
  incidentBySlug,
  incidentFeed,
  incidentFilterUrl,
  incidentSearchHits,
  readIncidentFilters,
  talkTrackText,
  type IncidentSource,
  type SalesNote,
} from "./incident-feed";
import type { PublicIncident } from "./security-intelligence-contract";

const source: IncidentSource = {
  id: "source:a",
  publisher: "Example Agency",
  url: "https://example.org/alert",
  publishedOn: "2025-01-02",
  lastReviewedOn: "2026-10-10",
  type: "government_alert",
  rightsNote: null,
};
const base: PublicIncident = {
  id: "incident:example",
  title: "Example",
  kind: "breach",
  disclosedOn: "2025-01-02",
  occurredOn: null,
  summary: "Reported example.",
  epistemicStatus: "reported",
  reviewStatus: "seed_reviewed",
  affectedEcosystems: ["npm"],
  sourceIds: ["source:a"],
  techniqueIds: [],
  packageIds: [],
  uncertaintyNotes: [],
  lastReviewedOn: "2026-10-10",
};
const note: SalesNote = {
  incidentId: "incident:example",
  status: "draft",
  headline: "Headline.",
  discoveryQuestion: "Question?",
  avoid: "Avoid.",
  basedOnSourceIds: ["source:a"],
  draftedOn: "2026-11-14",
  draftedBy: "agent-draft",
  reviewedBy: null,
  reviewedOn: null,
};

describe("incident feed", () => {
  it("publishes only reviewed, sourced incidents from the seed", () => {
    expect(incidentFeed.length).toBeGreaterThan(0);
    for (const item of incidentFeed) {
      expect(["seed_reviewed", "approved"]).toContain(item.incident.reviewStatus);
      expect(item.sources.length).toBeGreaterThan(0);
      for (const s of item.sources) expect(s.url.startsWith("https://")).toBe(true);
    }
  });

  it("fails closed on candidate, needs-review, hypothetical and unsourced records", () => {
    const rejected = [
      { ...base, id: "incident:r1", reviewStatus: "needs_review" as const },
      { ...base, id: "incident:r2", epistemicStatus: "hypothesis" as const },
      { ...base, id: "incident:r3", sourceIds: [] },
      { ...base, id: "incident:r4", sourceIds: ["source:missing"] },
    ];
    expect(buildIncidentFeed(rejected, [source], [])).toEqual([]);
  });

  it("drops a sales note that cites a source outside its incident", () => {
    const stray = { ...note, basedOnSourceIds: ["source:other"] };
    expect(buildIncidentFeed([base], [source], [stray])[0].salesNote).toBeNull();
    expect(buildIncidentFeed([base], [source], [note])[0].salesNote).toEqual(note);
  });

  it("every seed sales note is grounded in its own incident's sources", () => {
    for (const item of incidentFeed) {
      if (!item.salesNote) continue;
      for (const id of item.salesNote.basedOnSourceIds) expect(item.incident.sourceIds).toContain(id);
      if (item.salesNote.status === "reviewed") expect(item.salesNote.reviewedBy).toBeTruthy();
    }
  });

  it("copied talk track always carries publisher, date and URL, and flags drafts", () => {
    const [item] = buildIncidentFeed([base], [source], [note]);
    const text = talkTrackText(item)!;
    expect(text).toContain("Example Agency");
    expect(text).toContain("2025-01-02");
    expect(text).toContain("https://example.org/alert");
    expect(text).toContain("Draft");
    expect(talkTrackText({ ...item, salesNote: null })).toBeNull();
  });

  it("sorts newest disclosure first and filters by kind and ecosystem", () => {
    const older = { ...base, id: "incident:old", disclosedOn: "2020-01-01", kind: "supply_chain" as const, affectedEcosystems: ["enterprise_software"] };
    const feed = buildIncidentFeed([older, base], [source], []);
    expect(feed.map((i) => i.slug)).toEqual(["example", "old"]);
    expect(filterIncidents(feed, { kind: "supply_chain", ecosystem: "all" }).map((i) => i.slug)).toEqual(["old"]);
    expect(filterIncidents(feed, { kind: "all", ecosystem: "npm" }).map((i) => i.slug)).toEqual(["example"]);
  });

  it("ignores unknown URL filter values and round-trips valid ones", () => {
    const params = new URLSearchParams("kind=bogus&ecosystem=npm");
    const filters = readIncidentFilters(params, incidentFeed);
    expect(filters.kind).toBe("all");
    expect(filters.ecosystem).toBe("npm");
    expect(incidentFilterUrl(filters)).toBe("/incidents?ecosystem=npm");
    expect(incidentFilterUrl({ kind: "all", ecosystem: "all" })).toBe("/incidents");
  });

  it("resolves detail slugs without the incident: prefix", () => {
    for (const item of incidentFeed) expect(incidentBySlug(item.slug)?.incident.id).toBe(`incident:${item.slug}`);
  });

  it("indexes every published incident for search and nothing else", () => {
    const hits = incidentSearchHits();
    expect(hits.map((h) => h.href)).toEqual(incidentFeed.map((i) => `/incidents/${i.slug}`));
    expect(hits.every((h) => h.kind === "Incident")).toBe(true);
  });
});
