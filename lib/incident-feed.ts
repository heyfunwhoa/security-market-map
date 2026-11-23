import categoryLinksSeed from "@/data/security-intelligence/incident-category-links.json";
import industriesSeed from "@/data/security-intelligence/incident-industries.json";
import exposuresSeed from "@/data/security-intelligence/incident-secret-exposures.json";
import incidentsSeed from "@/data/security-intelligence/incidents.seed.json";
import salesNotesSeed from "@/data/security-intelligence/sales-notes.json";
import sourcesSeed from "@/data/security-intelligence/sources.seed.json";
import type { SearchHit } from "@/lib/search";
import { makeSourcedIncident, type PublicIncident, type SourceRef } from "@/lib/security-intelligence-contract";
import { SITE_URL } from "@/lib/site";

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
  /** One plain line for sellers on what not to overstate. Optional; reviewed with the note. */
  sellerCaveat?: string;
  /** Owner-approved angle per buyer role (catalog persona id). Interpretation, not evidence. */
  roleNotes?: { roleId: string; note: string }[];
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

/**
 * Industry of the organization a source names (for account prep). Kept in its own
 * reviewed file, like category links, so the incident record and its schema are unchanged.
 * Wide campaigns with no single named organization get no industry rather than a guess.
 */
export type IndustryTag = {
  id: string;
  incidentId: string;
  industry: string;
  rationale: string;
  basedOnSourceIds: string[];
  status: "proposed" | "reviewed" | "rejected";
  proposedBy: string;
  proposedOn: string;
  reviewedBy: string | null;
  reviewedOn: string | null;
};

export const INDUSTRY_LABELS: Record<string, string> = {
  automotive: "Automotive",
  education: "Education",
  energy_utilities: "Energy and utilities",
  financial_services: "Financial services",
  government: "Government",
  healthcare_life_sciences: "Healthcare and life sciences",
  manufacturing: "Manufacturing",
  media_entertainment: "Media and entertainment",
  retail: "Retail",
  technology: "Technology",
  telecommunications: "Telecommunications",
  transportation: "Transportation",
};

export function industryLabel(id: string): string {
  return INDUSTRY_LABELS[id] ?? id.replaceAll("_", " ");
}

export function isPublishableIndustry(tag: IndustryTag, incident: PublicIncident): boolean {
  return (
    tag.status === "reviewed" &&
    tag.industry in INDUSTRY_LABELS &&
    !!tag.reviewedBy?.trim() &&
    !!tag.reviewedOn &&
    tag.incidentId === incident.id &&
    tag.rationale.trim().length > 0 &&
    tag.basedOnSourceIds.length > 0 &&
    tag.basedOnSourceIds.every((id) => incident.sourceIds.includes(id))
  );
}

/**
 * What kind of secret an incident involved and where the first exposed secret sat, as the
 * sources state it. Kept in its own reviewed file, like industries. A field the sources don't
 * state is left empty, never guessed; "many_types" means a source reports a whole set of
 * secrets without breaking it down. Location records only where the leak started, not every
 * store the attacker reached afterwards. See docs/security-intelligence/review-2026-11-22.md.
 */
export type SecretExposure = {
  id: string;
  incidentId: string;
  secretTypes: string[];
  exposureLocations: string[];
  rationale: string;
  /** Plain note on a weaker point, e.g. a detail known only from a secondary summary. */
  note?: string;
  basedOnSourceIds: string[];
  status: "proposed" | "reviewed" | "rejected";
  proposedBy: string;
  proposedOn: string;
  reviewedBy: string | null;
  reviewedOn: string | null;
};

export const SECRET_TYPE_LABELS: Record<string, string> = {
  cloud_access_key: "Cloud access key",
  git_platform_token: "Git platform token",
  ci_cd_secret: "CI/CD secret",
  ai_provider_key: "AI provider key",
  api_key: "API key (non-AI)",
  oauth_integration_token: "OAuth or integration token",
  session_sso_token: "Session or SSO token",
  service_account_credential: "Service account or machine credential",
  password: "Password",
  package_registry_token: "Package registry token",
  ssh_key: "SSH key",
  database_credential: "Database credential",
  signing_encryption_key: "Signing or encryption key",
  many_types: "Many types",
};

export const EXPOSURE_LOCATION_LABELS: Record<string, string> = {
  public_repo: "Public code repo",
  private_repo: "Private code repo",
  ci_cd: "CI/CD pipeline or logs",
  build_artifact: "Build artifact or image",
  developer_machine: "Developer machine",
  exposed_app_config: "Exposed app config",
  vendor_platform: "Vendor or platform",
  support_chat_work_files: "Support, chat or work files",
  personal_account_browser: "Personal account or browser profile",
};

export function secretTypeLabel(id: string): string {
  return SECRET_TYPE_LABELS[id] ?? id.replaceAll("_", " ");
}

export function exposureLocationLabel(id: string): string {
  return EXPOSURE_LOCATION_LABELS[id] ?? id.replaceAll("_", " ");
}

export function isPublishableExposure(entry: SecretExposure, incident: PublicIncident): boolean {
  return (
    entry.status === "reviewed" &&
    !!entry.reviewedBy?.trim() &&
    !!entry.reviewedOn &&
    entry.incidentId === incident.id &&
    entry.secretTypes.length + entry.exposureLocations.length > 0 &&
    entry.secretTypes.every((id) => id in SECRET_TYPE_LABELS) &&
    entry.exposureLocations.every((id) => id in EXPOSURE_LOCATION_LABELS) &&
    entry.rationale.trim().length > 0 &&
    entry.basedOnSourceIds.length > 0 &&
    entry.basedOnSourceIds.every((id) => incident.sourceIds.includes(id))
  );
}

export type FeedIncident = {
  slug: string;
  incident: PublicIncident;
  sources: IncidentSource[];
  salesNote: SalesNote | null;
  /** Reviewed links only. */
  categoryLinks: CategoryLink[];
  /** Reviewed industry ids only. */
  industries: string[];
  /** Reviewed secret types; empty when the sources don't say. */
  secretTypes: string[];
  /** Reviewed location of the first exposed secret; empty when the sources don't say. */
  exposureLocations: string[];
  /** Note on the reviewed exposure entry, if any. */
  exposureNote: string | null;
};

export type IncidentFilters = {
  kind: string;
  ecosystem: string;
  category: string;
  industry: string;
  secret: string;
  location: string;
};

export const NO_INCIDENT_FILTERS: IncidentFilters = {
  kind: "all",
  ecosystem: "all",
  category: "all",
  industry: "all",
  secret: "all",
  location: "all",
};

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
  ci_cd: "CI/CD",
  aws: "AWS",
  azure: "Azure",
  github: "GitHub",
  docker_hub: "Docker Hub",
  microsoft_cloud: "Microsoft cloud",
  ai_agents: "AI agents",
  ide_extensions: "IDE extensions",
  rubygems: "RubyGems",
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
  company_incident_report: "Company incident report",
  vulnerability_advisory: "Vulnerability advisory",
  security_research: "Security research",
  regulator_filing: "Regulator filing",
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
  industries: readonly IndustryTag[] = [],
  exposures: readonly SecretExposure[] = [],
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
      industries: [
        ...new Set(industries.filter((tag) => isPublishableIndustry(tag, sourced.incident)).map((tag) => tag.industry)),
      ],
      ...exposureFields(exposures.filter((entry) => isPublishableExposure(entry, sourced.incident))),
    });
  }
  return feed.sort((a, b) => b.incident.disclosedOn.localeCompare(a.incident.disclosedOn));
}

function exposureFields(entries: readonly SecretExposure[]) {
  return {
    secretTypes: [...new Set(entries.flatMap((entry) => entry.secretTypes))],
    exposureLocations: [...new Set(entries.flatMap((entry) => entry.exposureLocations))],
    exposureNote: entries.map((entry) => entry.note).find((note) => !!note?.trim()) ?? null,
  };
}

export function filterIncidents(feed: readonly FeedIncident[], filters: IncidentFilters): FeedIncident[] {
  return feed.filter(
    (item) =>
      (filters.kind === "all" || item.incident.kind === filters.kind) &&
      (filters.ecosystem === "all" || item.incident.affectedEcosystems.includes(filters.ecosystem)) &&
      (filters.category === "all" || item.categoryLinks.some((link) => link.categoryId === filters.category)) &&
      (filters.industry === "all" || item.industries.includes(filters.industry)) &&
      (filters.secret === "all" || item.secretTypes.includes(filters.secret)) &&
      (filters.location === "all" || item.exposureLocations.includes(filters.location)),
  );
}

export function readIncidentFilters(
  params: { get(name: string): string | null },
  feed: readonly FeedIncident[],
): IncidentFilters {
  const kind = params.get("kind") ?? "all";
  const ecosystem = params.get("ecosystem") ?? "all";
  const category = params.get("category") ?? "all";
  const industry = params.get("industry") ?? "all";
  const secret = params.get("secret") ?? "all";
  const location = params.get("location") ?? "all";
  return {
    kind: kind in INCIDENT_KIND_LABELS ? kind : "all",
    ecosystem: feed.some((item) => item.incident.affectedEcosystems.includes(ecosystem)) ? ecosystem : "all",
    category: feed.some((item) => item.categoryLinks.some((link) => link.categoryId === category)) ? category : "all",
    industry: feed.some((item) => item.industries.includes(industry)) ? industry : "all",
    secret: feed.some((item) => item.secretTypes.includes(secret)) ? secret : "all",
    location: feed.some((item) => item.exposureLocations.includes(location)) ? location : "all",
  };
}

export function incidentFilterUrl(filters: IncidentFilters): string {
  const params = new URLSearchParams();
  if (filters.kind !== "all") params.set("kind", filters.kind);
  if (filters.ecosystem !== "all") params.set("ecosystem", filters.ecosystem);
  if (filters.category !== "all") params.set("category", filters.category);
  if (filters.industry !== "all") params.set("industry", filters.industry);
  if (filters.secret !== "all") params.set("secret", filters.secret);
  if (filters.location !== "all") params.set("location", filters.location);
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
  const caveat = note.sellerCaveat ? `\nCaveat: ${note.sellerCaveat}` : "";
  // Link back to this site so a pasted talk track (Slack, notes) is self-contained.
  const more = `\nMore: ${SITE_URL}/incidents/${item.slug}`;
  return `${note.headline} Ask: ${note.discoveryQuestion}${caveat}\nSource: ${cited.join("; ")}${draft}${more}`;
}

/** Call-prep block: each incident's title and disclosure date with its sourced talk track. */
export function talkTracksDocument(items: readonly FeedIncident[]): string {
  return items
    .map((item) => {
      const text = talkTrackText(item);
      return text ? `${item.incident.title} (disclosed ${item.incident.disclosedOn})\n${text}` : null;
    })
    .filter((block): block is string => block !== null)
    .join("\n\n");
}

/** Newest reviewed incidents first, for compact lists such as the home page. */
export function latestIncidents(count: number): FeedIncident[] {
  return incidentFeed.slice(0, count);
}

export const incidentFeed: FeedIncident[] = buildIncidentFeed(
  incidentsSeed as PublicIncident[],
  sourcesSeed as IncidentSource[],
  salesNotesSeed as SalesNote[],
  categoryLinksSeed as CategoryLink[],
  industriesSeed as IndustryTag[],
  exposuresSeed as SecretExposure[],
);

/** Every secret-exposure entry in the data file, including proposed ones. For review tooling and tests only. */
export const allSecretExposures: readonly SecretExposure[] = exposuresSeed as SecretExposure[];

/** Every industry tag in the data file, including proposed ones. For review tooling and tests only. */
export const allIndustryTags: readonly IndustryTag[] = industriesSeed as IndustryTag[];

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
    text: `${item.incident.summary} ${item.incident.affectedEcosystems.map(ecosystemLabel).join(" ")} ${INCIDENT_KIND_LABELS[item.incident.kind]} ${item.industries.map(industryLabel).join(" ")} ${item.secretTypes.map(secretTypeLabel).join(" ")} ${item.exposureLocations.map(exposureLocationLabel).join(" ")} ${item.incident.techniqueIds.join(" ")}`,
  }));
}
