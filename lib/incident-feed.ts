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

export type FeedIncident = {
  slug: string;
  incident: PublicIncident;
  sources: IncidentSource[];
  salesNote: SalesNote | null;
};

export type IncidentFilters = { kind: string; ecosystem: string };

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
    });
  }
  return feed.sort((a, b) => b.incident.disclosedOn.localeCompare(a.incident.disclosedOn));
}

export function filterIncidents(feed: readonly FeedIncident[], filters: IncidentFilters): FeedIncident[] {
  return feed.filter(
    (item) =>
      (filters.kind === "all" || item.incident.kind === filters.kind) &&
      (filters.ecosystem === "all" || item.incident.affectedEcosystems.includes(filters.ecosystem)),
  );
}

export function readIncidentFilters(
  params: { get(name: string): string | null },
  feed: readonly FeedIncident[],
): IncidentFilters {
  const kind = params.get("kind") ?? "all";
  const ecosystem = params.get("ecosystem") ?? "all";
  return {
    kind: kind in INCIDENT_KIND_LABELS ? kind : "all",
    ecosystem: feed.some((item) => item.incident.affectedEcosystems.includes(ecosystem)) ? ecosystem : "all",
  };
}

export function incidentFilterUrl(filters: IncidentFilters): string {
  const params = new URLSearchParams();
  if (filters.kind !== "all") params.set("kind", filters.kind);
  if (filters.ecosystem !== "all") params.set("ecosystem", filters.ecosystem);
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
);

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
