import { catalog } from "@/lib/catalog";
import { incidentFeed, industryLabel, type FeedIncident } from "@/lib/incident-feed";

/**
 * Consumer export of the reviewed incident feed for this owner's other tools
 * (Account Signal Engine, call prep, outreach). It reuses the site's publication gates:
 * only reviewed, sourced incidents; only reviewed, source-grounded sales notes; only reviewed
 * category links. Consumers read this file; they never write back to it.
 * See docs/security-intelligence/incident-feed-export.md.
 */

export const INCIDENT_FEED_EXPORT_PATH = "data/security-intelligence/exports/incident-feed.v1.json";

export function buildIncidentFeedExport(feed: readonly FeedIncident[] = incidentFeed) {
  const categoryName = new Map(catalog.categories.map((c) => [c.id, c.name]));
  const asOf = feed.map((item) => item.incident.lastReviewedOn).sort().at(-1) ?? null;
  return {
    schemaVersion: "1",
    asOf,
    usageRules: [
      "Every fact comes from the listed sources; cite the source when you use it.",
      "Sales notes are interpretation, not evidence. Follow each note's 'avoid' line.",
      "Category links mean related, not that any product would have prevented the incident.",
      "Don't infer that a prospect or customer was affected.",
      "Industry is the industry of the organization the source names, not a list of affected industries.",
    ],
    incidents: feed.map(({ slug, incident, sources, salesNote, categoryLinks, industries }) => ({
      id: incident.id,
      slug,
      title: incident.title,
      kind: incident.kind,
      disclosedOn: incident.disclosedOn,
      occurredOn: incident.occurredOn,
      summary: incident.summary,
      epistemicStatus: incident.epistemicStatus,
      affectedEcosystems: incident.affectedEcosystems,
      uncertaintyNotes: incident.uncertaintyNotes,
      lastReviewedOn: incident.lastReviewedOn,
      sources: sources.map((s) => ({ id: s.id, publisher: s.publisher, type: s.type, url: s.url, publishedOn: s.publishedOn })),
      salesNote:
        salesNote?.status === "reviewed"
          ? {
              headline: salesNote.headline,
              discoveryQuestion: salesNote.discoveryQuestion,
              avoid: salesNote.avoid,
              basedOnSourceIds: salesNote.basedOnSourceIds,
              reviewedOn: salesNote.reviewedOn,
            }
          : null,
      // Industry of the organization the source names, reviewed only; never the industry of a prospect.
      industries: industries.map((id) => ({ id, name: industryLabel(id) })),
      marketCategories: categoryLinks.map((link) => ({
        categoryId: link.categoryId,
        categoryName: categoryName.get(link.categoryId) ?? null,
        rationale: link.rationale,
        doesNotImply: link.doesNotImply,
      })),
    })),
  };
}

export type IncidentFeedExport = ReturnType<typeof buildIncidentFeedExport>;

export const renderIncidentFeedExport = () => JSON.stringify(buildIncidentFeedExport(), null, 2) + "\n";
