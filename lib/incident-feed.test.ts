import { describe, expect, it } from "vitest";
import { catalog } from "./catalog";
import {
  buildIncidentFeed,
  filterIncidents,
  incidentBySlug,
  incidentFeed,
  incidentFilterUrl,
  incidentSearchHits,
  allCategoryLinks,
  incidentsForCategory,
  isPublishableLink,
  NO_INCIDENT_FILTERS,
  type CategoryLink,
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
    expect(text).not.toContain("Caveat:");
    expect(text.endsWith(`\nMore: https://security-market-map.vercel.app/incidents/${item.slug}`)).toBe(true);
    expect(talkTrackText({ ...item, salesNote: null })).toBeNull();
    const [withCaveat] = buildIncidentFeed([base], [source], [{ ...note, sellerCaveat: "Impact isn't confirmed." }]);
    expect(talkTrackText(withCaveat)).toContain("\nCaveat: Impact isn't confirmed.\nSource:");
    expect(talkTrackText(withCaveat)).toContain("\nMore: https://security-market-map.vercel.app/incidents/");
  });

  it("sorts newest disclosure first and filters by kind and ecosystem", () => {
    const older = { ...base, id: "incident:old", disclosedOn: "2020-01-01", kind: "supply_chain" as const, affectedEcosystems: ["enterprise_software"] };
    const feed = buildIncidentFeed([older, base], [source], []);
    expect(feed.map((i) => i.slug)).toEqual(["example", "old"]);
    expect(filterIncidents(feed, { ...NO_INCIDENT_FILTERS, kind: "supply_chain" }).map((i) => i.slug)).toEqual(["old"]);
    expect(filterIncidents(feed, { ...NO_INCIDENT_FILTERS, ecosystem: "npm" }).map((i) => i.slug)).toEqual(["example"]);
  });

  it("ignores unknown URL filter values and round-trips valid ones", () => {
    const params = new URLSearchParams("kind=bogus&ecosystem=npm");
    const filters = readIncidentFilters(params, incidentFeed);
    expect(filters.kind).toBe("all");
    expect(filters.ecosystem).toBe("npm");
    expect(incidentFilterUrl(filters)).toBe("/incidents?ecosystem=npm");
    expect(incidentFilterUrl(NO_INCIDENT_FILTERS)).toBe("/incidents");
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

const link: CategoryLink = {
  id: "link:example:sca",
  incidentId: "incident:example",
  categoryId: "sca",
  predicate: "related_to",
  rationale: "Reason.",
  doesNotImply: "No prevention claim.",
  basedOnSourceIds: ["source:a"],
  status: "reviewed",
  proposedBy: "agent-draft",
  proposedOn: "2026-11-14",
  reviewedBy: "Reviewer",
  reviewedOn: "2026-11-15",
};

describe("incident category links", () => {
  it("publishes only reviewed links with a named reviewer, a date and the incident's own sources", () => {
    expect(isPublishableLink(link, base)).toBe(true);
    expect(isPublishableLink({ ...link, status: "proposed" }, base)).toBe(false);
    expect(isPublishableLink({ ...link, status: "rejected" }, base)).toBe(false);
    expect(isPublishableLink({ ...link, reviewedBy: null }, base)).toBe(false);
    expect(isPublishableLink({ ...link, reviewedBy: "  " }, base)).toBe(false);
    expect(isPublishableLink({ ...link, reviewedOn: null }, base)).toBe(false);
    expect(isPublishableLink({ ...link, basedOnSourceIds: ["source:other"] }, base)).toBe(false);
    expect(isPublishableLink({ ...link, basedOnSourceIds: [] }, base)).toBe(false);
    expect(isPublishableLink({ ...link, incidentId: "incident:other" }, base)).toBe(false);
  });

  it("filters the feed by category through reviewed links only", () => {
    const other = { ...base, id: "incident:other" };
    const feed = buildIncidentFeed([base, other], [source], [], [link, { ...link, id: "x", incidentId: "incident:other", status: "proposed" }]);
    expect(filterIncidents(feed, { ...NO_INCIDENT_FILTERS, category: "sca" }).map((i) => i.slug)).toEqual(["example"]);
    expect(readIncidentFilters(new URLSearchParams("category=sca"), feed).category).toBe("sca");
    expect(readIncidentFilters(new URLSearchParams("category=nope"), feed).category).toBe("all");
    expect(incidentFilterUrl({ ...NO_INCIDENT_FILTERS, category: "sca" })).toBe("/incidents?category=sca");
  });

  it("every link in the data file is well formed and points at real records", () => {
    const categoryIds = new Set(catalog.categories.map((c) => c.id));
    const ids = new Set<string>();
    for (const entry of allCategoryLinks) {
      expect(ids.has(entry.id), `duplicate ${entry.id}`).toBe(false);
      ids.add(entry.id);
      expect(categoryIds.has(entry.categoryId), `unknown category ${entry.categoryId}`).toBe(true);
      const incident = incidentFeed.find((item) => item.incident.id === entry.incidentId);
      expect(incident, `unknown or unpublished incident ${entry.incidentId}`).toBeDefined();
      for (const id of entry.basedOnSourceIds) expect(incident!.incident.sourceIds).toContain(id);
      expect(entry.basedOnSourceIds.length).toBeGreaterThan(0);
      expect(entry.rationale.trim()).not.toBe("");
      expect(entry.doesNotImply.trim()).not.toBe("");
      expect(entry.predicate).toBe("related_to");
      if (entry.status === "reviewed") {
        expect(entry.reviewedBy?.trim()).toBeTruthy();
        expect(entry.reviewedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    }
  });

  it("never shows proposed links on public pages", () => {
    const proposed = allCategoryLinks.filter((entry) => entry.status !== "reviewed");
    for (const entry of proposed) {
      expect(incidentsForCategory(entry.categoryId).some(({ link: shown }) => shown.id === entry.id)).toBe(false);
    }
  });
});

describe("seller shortcuts", () => {
  it("builds one copyable call-prep block with every talk track and its source", async () => {
    const { talkTracksDocument, latestIncidents } = await import("./incident-feed");
    const doc = talkTracksDocument(incidentFeed);
    const withNotes = incidentFeed.filter((item) => item.salesNote);
    expect(doc.split("\n\n")).toHaveLength(withNotes.length);
    for (const item of withNotes) {
      expect(doc).toContain(item.incident.title);
      for (const id of item.salesNote!.basedOnSourceIds) {
        expect(doc).toContain(item.sources.find((source) => source.id === id)!.url);
      }
    }
    expect(talkTracksDocument([])).toBe("");
    expect(latestIncidents(3).map((item) => item.slug)).toEqual(incidentFeed.slice(0, 3).map((item) => item.slug));
  });

  it("keeps ecosystems to technology ecosystems, not industries", () => {
    for (const item of incidentFeed) expect(item.incident.affectedEcosystems).not.toContain("pharmaceutical");
  });
});

describe("industry tags", () => {
  it("publishes only reviewed tags with a known industry, a named reviewer and the incident's own sources", async () => {
    const { isPublishableIndustry } = await import("./incident-feed");
    const tag = {
      id: "industry:example:technology",
      incidentId: "incident:example",
      industry: "technology",
      rationale: "Named company is a software company.",
      basedOnSourceIds: ["source:a"],
      status: "reviewed" as const,
      proposedBy: "agent-draft",
      proposedOn: "2026-11-17",
      reviewedBy: "Reviewer",
      reviewedOn: "2026-11-17",
    };
    expect(isPublishableIndustry(tag, base)).toBe(true);
    expect(isPublishableIndustry({ ...tag, status: "proposed" }, base)).toBe(false);
    expect(isPublishableIndustry({ ...tag, industry: "pharmaceutical_guess" }, base)).toBe(false);
    expect(isPublishableIndustry({ ...tag, reviewedBy: " " }, base)).toBe(false);
    expect(isPublishableIndustry({ ...tag, basedOnSourceIds: ["source:other"] }, base)).toBe(false);
    const feed = buildIncidentFeed([base], [source], [], [], [tag, { ...tag, id: "x", industry: "retail", status: "proposed" }]);
    expect(feed[0].industries).toEqual(["technology"]);
    expect(filterIncidents(feed, { ...NO_INCIDENT_FILTERS, industry: "technology" })).toHaveLength(1);
    expect(filterIncidents(feed, { ...NO_INCIDENT_FILTERS, industry: "retail" })).toHaveLength(0);
    expect(readIncidentFilters(new URLSearchParams("industry=retail"), feed).industry).toBe("all");
    expect(incidentFilterUrl({ ...NO_INCIDENT_FILTERS, industry: "technology" })).toBe("/incidents?industry=technology");
  });

  it("every industry tag in the data file is well formed and points at a published incident", async () => {
    const { allIndustryTags, INDUSTRY_LABELS } = await import("./incident-feed");
    const ids = new Set<string>();
    for (const tag of allIndustryTags) {
      expect(ids.has(tag.id), `duplicate ${tag.id}`).toBe(false);
      ids.add(tag.id);
      expect(tag.industry in INDUSTRY_LABELS, `unknown industry ${tag.industry}`).toBe(true);
      const incident = incidentFeed.find((item) => item.incident.id === tag.incidentId);
      expect(incident, `unknown incident ${tag.incidentId}`).toBeDefined();
      expect(tag.basedOnSourceIds.length).toBeGreaterThan(0);
      for (const id of tag.basedOnSourceIds) expect(incident!.incident.sourceIds).toContain(id);
      expect(tag.rationale.trim()).not.toBe("");
      if (tag.status === "reviewed") {
        expect(tag.reviewedBy?.trim()).toBeTruthy();
        expect(tag.reviewedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    }
  });
});
