import categoryLinksSeed from "@/data/security-intelligence/incident-category-links.json";
import incidentsSeed from "@/data/security-intelligence/incidents.seed.json";
import salesNotesSeed from "@/data/security-intelligence/sales-notes.json";
import sourcesSeed from "@/data/security-intelligence/sources.seed.json";
import type { SearchHit } from "@/lib/search";
import { makeSourcedIncident, type PublicIncident, type SourceRef } from "@/lib/security-intelligence-contract";

/**
 * Read-only presentation layer for the public incident feed.
 * Every incident passes the existing publication gate (makeSourcedIncident), so
 * candidates and unreviewed records never reach the feed. Sales notes are a
 * separate interpretation layer keyed by incidentId; they do not alter incident data.
 * Incident→category links follow docs/security-intelligence/relationship-vocabulary.md:
 * only reviewed, sourced links are published; proposed links stay in the data file for review.
 */

export type IncidentSource = SourceRef & { type: string; rightsNote: string | null };

export type SalesNote = {
  incidentId: string;
  status: "draft" | "reviewed";
  headline: string;
  discoveryQuestion: string;
  avoid: string;
  basedOnSourceIds: string[];
  draftedOn: string;
  draftedBy: string;
  reviewedBy: string | null;
  reviewedOn: string | null;
};

export type CategoryLink = {
  id: string;
  incidentId: string;
  categoryId: string;
  predicate: "related_to";
  rationale: string;
  doesNotImply: string;
  basedOnSourceIds: string[];
  status: "proposed" | "reviewed" | "rejected";
  proposedBy: string;
  proposedOn: string;
  reviewedBy: string | null;
  reviewedOn: string | null;
};

export type FeedIncident = {
  slug: string;
  incident: PublicIncident;
  sources: IncidentSource[];
  salesNote: SalesNote | null;
  /** Reviewed links only. */
  categoryLinks: CategoryLink[];
};

export type IncidentFilters = { kind: string; ecosystem: string; category: string };

export const NO_INCIDENT_FILTERS: IncidentFilters = { kind: "all", ecosystem: "all", category: "all" };

/** A link is publishable only when a named reviewer approved it and it cites the incident's own sources. */
export function isPublishableLink(link: CategoryLink, incident: PublicIncident): boolean {
  return (
    link.status === "reviewed" &&
    !!link.reviewedBy?.trim() &&
    !!link.reviewedOn &&
    link.incidentId === incident.id &&
    link.rationale.trim().length > 0 &&
    link.basedOnSourceIds.length > 0 &&
    link.basedOnSourceIds.every((id) => incident.sourceIds.includes(id))
  );
}

export const INCIDENT_KIND_LABELS: Record<PublicIncident["kind"], string> = {
  supply_chain: "Supply chain",
  breach: "Breach",
  intrusion: "Intrusion",
  malware_campaign: "Malware campaign",
};

const ECOSYSTEM_LABELS: Record<string, string> = {
  npm: "npm",
  enterprise_software: "Enterprise software",
  pypi: "PyPI",
  github_actions: "GitHub Actions",
  saas: "SaaS",
};

export function ecosystemLabel(id: string): string {
  return ECOSYSTEM_LABELS[id] ?? id.replaceAll("_", " ");
}

const SOURCE_TYPE_LABELS: Record<string, string> = {
  government_alert: "Government alert",
  reference_data: "Reference data",
  vendor_advisory: "Vendor advisory",
  research: "Research",
  news: "News coverage",
};

export function sourceTypeLabel(type: string): string {
  return SOURCE_TYPE_LABELS[type] ?? type.replaceAll("_", " ");
}

export function incidentSlug(id: string): string {
  return id.replace(/^incident:/, "");
}

export function buildIncidentFeed(
  incidents: readonly PublicIncident[],
  sources: readonly IncidentSource[],
  notes: readonly SalesNote[],
  links: readonly CategoryLink[] = [],
): FeedIncident[] {
  const sourceById = new Map(sources.map((source) => [source.id, source]));
  const feed: FeedIncident[] = [];
  for (const raw of incidents) {
    let sourced;
    try {
      sourced = makeSourcedIncident(raw, sources);
    } catch {
      continue; // fail closed: unreviewed, hypothetical, or unsourced records stay out
    }
    const note = notes.find((item) => item.incidentId === raw.id) ?? null;
    const noteIsGrounded =
      note !== null &&
      note.basedOnSourceIds.length > 0 &&
      note.basedOnSourceIds.every((id) => raw.sourceIds.includes(id));
    feed.push({
      slug: incidentSlug(raw.id),
      incident: sourced.incident,
      sources: sourced.sources.map((source) => sourceById.get(source.id)!),
      salesNote: noteIsGrounded ? note : null,
      categoryLinks: links.filter((link) => isPublishableLink(link, sourced.incident)),
    });
  }
  return feed.sort((a, b) => b.incident.disclosedOn.localeCompare(a.incident.disclosedOn));
}

export function filterIncidents(feed: readonly FeedIncident[], filters: IncidentFilters): FeedIncident[] {
  return feed.filter(
    (item) =>
      (filters.kind === "all" || item.incident.kind === filters.kind) &&
      (filters.ecosystem === "all" || item.incident.affectedEcosystems.includes(filters.ecosystem)) &&
      (filters.category === "all" || item.categoryLinks.some((link) => link.categoryId === filters.category)),
  );
}

export function readIncidentFilters(
  params: { get(name: string): string | null },
  feed: readonly FeedIncident[],
): IncidentFilters {
  const kind = params.get("kind") ?? "all";
  const ecosystem = params.get("ecosystem") ?? "all";
  const category = params.get("category") ?? "all";
  return {
    kind: kind in INCIDENT_KIND_LABELS ? kind : "all",
    ecosystem: feed.some((item) => item.incident.affectedEcosystems.includes(ecosystem)) ? ecosystem : "all",
    category: feed.some((item) => item.categoryLinks.some((link) => link.categoryId === category)) ? category : "all",
  };
}

export function incidentFilterUrl(filters: IncidentFilters): string {
  const params = new URLSearchParams();
  if (filters.kind !== "all") params.set("kind", filters.kind);
  if (filters.ecosystem !== "all") params.set("ecosystem", filters.ecosystem);
  if (filters.category !== "all") params.set("category", filters.category);
  const query = params.toString();
  return query ? `/incidents?${query}` : "/incidents";
}

/** Copyable talk track: always carries the publisher, date, and URL it relies on. */
export function talkTrackText(item: FeedIncident): string | null {
  const note = item.salesNote;
  if (!note) return null;
  const cited = item.sources
    .filter((source) => note.basedOnSourceIds.includes(source.id))
    .map((source) => `${source.publisher}, ${source.publishedOn ?? "date not stated"}, ${source.url}`);
  const draft = note.status === "draft" ? " (Draft, not editorially reviewed)" : "";
  return `${note.headline} Ask: ${note.discoveryQuestion}\nSource: ${cited.join("; ")}${draft}`;
}

export const incidentFeed: FeedIncident[] = buildIncidentFeed(
  incidentsSeed as PublicIncident[],
  sourcesSeed as IncidentSource[],
  salesNotesSeed as SalesNote[],
  categoryLinksSeed as CategoryLink[],
);

/** Every link in the data file, including proposed ones. For review tooling and tests, never for public pages. */
export const allCategoryLinks: readonly CategoryLink[] = categoryLinksSeed as CategoryLink[];

export function incidentsForCategory(categoryId: string): { item: FeedIncident; link: CategoryLink }[] {
  return incidentFeed.flatMap((item) =>
    item.categoryLinks.filter((link) => link.categoryId === categoryId).map((link) => ({ item, link })),
  );
}

export function incidentBySlug(slug: string): FeedIncident | undefined {
  return incidentFeed.find((item) => item.slug === slug);
}

export function incidentSearchHits(): SearchHit[] {
  return incidentFeed.map((item) => ({
    href: `/incidents/${item.slug}`,
    kind: "Incident",
    title: item.incident.title,
    text: `${item.incident.summary} ${item.incident.affectedEcosystems.map(ecosystemLabel).join(" ")} ${INCIDENT_KIND_LABELS[item.incident.kind]} ${item.incident.techniqueIds.join(" ")}`,
  }));
}
