/**
 * Proposed portable consumer view contract.
 * No DB, remote API, or cross-repository sync is implemented here.
 * The future service should expose these shapes over a versioned, read-only API.
 */
export type SourceRef = {
  id: string;
  publisher: string;
  url: string;
  publishedOn: string | null;
  lastReviewedOn: string;
};
export type PublicIncident = {
  id: string;
  title: string;
  kind: "supply_chain" | "breach" | "intrusion" | "malware_campaign";
  disclosedOn: string;
  occurredOn: string | null;
  summary: string;
  epistemicStatus: "reported" | "observed" | "hypothesis" | "disputed" | "unknown";
  reviewStatus: "seed_reviewed" | "approved" | "needs_review" | "disputed" | "retracted";
  affectedEcosystems: string[];
  sourceIds: string[];
  techniqueIds: string[];
  packageIds: string[];
  uncertaintyNotes: string[];
  lastReviewedOn: string;
};
export type SourcedIncident = {
  incident: PublicIncident;
  sources: SourceRef[];
};
export type MarketMapEvidenceView = {
  incidentId: string;
  headline: string;
  category: string;
  sourceReport: string;
  sourceIds: string[];
  unknowns: string[];
  techniqueIds: string[];
  packageIds: string[];
  preventedByVendor: null;
};
export type AcademyLabEvidenceView = {
  incidentId: string;
  caseTitle: string;
  sourceReport: string;
  sourceIds: string[];
  factStatus: "source_reported" | "directly_observed";
  learnerPrompts: { text: string; status: "synthetic" }[];
  unsupportedLinks: string[];
};

/**
 * Review status and source presence are minimum publication gates.
 * seed_reviewed means editorial seed approved for illustration, not
 * independent technical verification of all claims in the source.
 */
export function makeSourcedIncident(
  incident: PublicIncident,
  sourceRegistry: readonly SourceRef[],
): SourcedIncident {
  if (!["seed_reviewed", "approved"].includes(incident.reviewStatus)) {
    throw new Error("Unreviewed incident cannot be published");
  }
  if (!["reported", "observed"].includes(incident.epistemicStatus)) {
    throw new Error("Hypothetical or disputed incident cannot be published as a fact");
  }
  if (incident.sourceIds.length === 0) throw new Error("Missing cited source");
  const registry = new Map(sourceRegistry.map((source) => [source.id, source]));
  const sources = incident.sourceIds.map((id) => {
    const source = registry.get(id);
    if (!source || new URL(source.url).protocol !== "https:") {
      throw new Error(`Unresolvable or insecure incident source: ${id}`);
    }
    return source;
  });
  return { incident, sources };
}

/** Market Map interprets classification, without fabricating attack/control edges. */
export function toMarketMapEvidence(value: SourcedIncident): MarketMapEvidenceView {
  const { incident } = value;
  return {
    incidentId: incident.id,
    headline: incident.title,
    category: incident.kind,
    sourceReport: incident.summary,
    sourceIds: value.sources.map((source) => source.id),
    unknowns: incident.uncertaintyNotes,
    techniqueIds: incident.techniqueIds,
    packageIds: incident.packageIds,
    preventedByVendor: null,
  };
}

/** Academy carries identical factual provenance and clearly synthetic exercises. */
export function toAcademyLabEvidence(value: SourcedIncident): AcademyLabEvidenceView {
  const { incident } = value;
  return {
    incidentId: incident.id,
    caseTitle: incident.title,
    sourceReport: incident.summary,
    sourceIds: value.sources.map((source) => source.id),
    factStatus: incident.epistemicStatus === "reported" ? "source_reported" : "directly_observed",
    learnerPrompts: [
      { text: "In a fictional organization, where would you look for relevant software dependencies?", status: "synthetic" },
      { text: "Which preventive, detective and response controls would you evaluate, and what evidence would you require?", status: "synthetic" },
    ],
    unsupportedLinks: incident.uncertaintyNotes,
  };
}
