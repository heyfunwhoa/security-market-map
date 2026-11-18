import { createHash } from "node:crypto";

/**
 * STIX 2.1 export of the reviewed incident feed.
 *
 * Only `seed_reviewed` incidents are exported. Candidates, sales notes, category links and
 * unreviewed ATT&CK mappings never leave the repo through this path. IDs are deterministic
 * (UUIDv5 from the feed ID) so re-exports update the same objects in a consumer's TIP.
 * See docs/security-intelligence/stix-export.md.
 */

export type SeedIncident = {
  id: string;
  title: string;
  kind: string;
  disclosedOn: string;
  occurredOn: string | null;
  summary: string;
  epistemicStatus: string;
  reviewStatus: string;
  affectedEcosystems: string[];
  sourceIds: string[];
  techniqueIds: string[];
  uncertaintyNotes: string[];
  lastReviewedOn: string;
};

export type SeedSource = {
  id: string;
  publisher: string;
  type: string;
  url: string;
  publishedOn: string | null;
  rightsNote: string;
};

type StixObject = Record<string, unknown> & { type: string; id: string };
export type StixBundle = { type: "bundle"; id: string; objects: StixObject[] };

// Fixed namespace for this project's STIX IDs. Never change it: consumers key on these IDs.
const NAMESPACE = "6f1f6a3e-6b1d-5c55-9a1e-3c2f0f5b9c1a";
// OASIS standard TLP:WHITE marking definition (STIX 2.1 spec, section 7.2.1.4).
export const TLP_WHITE = "marking-definition--613f2e26-407d-48c7-9eca-b8e91df99dc9";
const EXPORTABLE = new Set(["seed_reviewed", "approved"]);

export function uuidv5(name: string, namespace = NAMESPACE): string {
  const ns = Buffer.from(namespace.replace(/-/g, ""), "hex");
  const hash = createHash("sha1").update(Buffer.concat([ns, Buffer.from(name, "utf8")])).digest();
  hash[6] = (hash[6] & 0x0f) | 0x50;
  hash[8] = (hash[8] & 0x3f) | 0x80;
  const hex = hash.subarray(0, 16).toString("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

const stamp = (day: string) => `${day}T00:00:00.000Z`;

/**
 * `createdOn` pins each incident's STIX `created` date (data/security-intelligence/stix-created-on.json).
 * STIX keeps `created` fixed for an object ID across versions; only `modified` moves. Deriving it
 * from lastReviewedOn would change it on every re-review, so it comes from this ledger instead.
 */
export function toStixBundle(incidents: SeedIncident[], sources: SeedSource[], createdOn: Readonly<Record<string, string>>): StixBundle {
  const sourceById = new Map(sources.map((s) => [s.id, s]));
  const reviewed = incidents.filter((i) => EXPORTABLE.has(i.reviewStatus));
  const latest = reviewed.map((i) => i.lastReviewedOn).sort().at(-1) ?? "2026-01-01";

  const producer: StixObject = {
    type: "identity",
    spec_version: "2.1",
    id: `identity--${uuidv5("identity:security-market-map")}`,
    created: stamp("2026-10-10"),
    modified: stamp("2026-10-10"),
    name: "Security Market Map incident feed",
    identity_class: "system",
    description: "Curated, source-cited summaries of publicly reported security incidents. Not original threat research.",
  };

  // Declares the x_smm_* fields as a STIX 2.1 top-level property extension.
  const extension: StixObject = {
    type: "extension-definition",
    spec_version: "2.1",
    id: `extension-definition--${uuidv5("extension:smm-incident-evidence")}`,
    created_by_ref: producer.id,
    // `created` never changes; a new field moves `modified` and `version`.
    created: stamp("2026-11-17"),
    modified: stamp("2026-11-18"),
    name: "Security Market Map incident evidence fields",
    description:
      "x_smm_disclosed_on, x_smm_occurred_on (omitted when unknown), x_smm_epistemic_status (reported, observed, hypothesis, disputed, unknown), x_smm_review_status, x_smm_uncertainty_notes and x_smm_source_rights (one entry per external reference: source_id and the reuse limits that apply to it).",
    schema: "https://github.com/heyfunwhoa/security-market-map/blob/main/docs/security-intelligence/stix-export.md",
    version: "1.1.0",
    extension_types: ["toplevel-property-extension"],
    extension_properties: ["x_smm_disclosed_on", "x_smm_occurred_on", "x_smm_epistemic_status", "x_smm_review_status", "x_smm_uncertainty_notes", "x_smm_source_rights"],
  };

  const objects: StixObject[] = reviewed.map((incident) => {
    const cited = incident.sourceIds.map((id) => {
      const source = sourceById.get(id);
      if (!source) throw new Error(`${incident.id} cites unknown source ${id}`);
      return source;
    });
    const refs = cited.map((source) => ({ source_name: source.publisher, url: source.url, external_id: source.id }));
    const created = createdOn[incident.id];
    if (!created) throw new Error(`${incident.id} has no pinned STIX created date; add it to stix-created-on.json once, then never change it`);
    if (created > incident.lastReviewedOn) throw new Error(`${incident.id}: created ${created} is after lastReviewedOn ${incident.lastReviewedOn}`);
    return {
      type: "incident",
      spec_version: "2.1",
      id: `incident--${uuidv5(incident.id)}`,
      created_by_ref: producer.id,
      created: stamp(created),
      modified: stamp(incident.lastReviewedOn),
      name: incident.title,
      description: incident.summary,
      labels: [incident.kind, ...incident.affectedEcosystems],
      external_references: [{ source_name: "security-market-map", external_id: incident.id }, ...refs],
      object_marking_refs: [TLP_WHITE],
      extensions: { [extension.id]: { extension_type: "toplevel-property-extension" } },
      x_smm_disclosed_on: incident.disclosedOn,
      // STIX forbids null properties, so an unknown occurrence date is omitted, not defaulted.
      ...(incident.occurredOn ? { x_smm_occurred_on: incident.occurredOn } : {}),
      x_smm_epistemic_status: incident.epistemicStatus,
      x_smm_review_status: incident.reviewStatus,
      x_smm_uncertainty_notes: incident.uncertaintyNotes,
      // STIX allows no custom fields inside external_references, so reuse limits travel here.
      x_smm_source_rights: cited.map((source) => ({ source_id: source.id, rights_note: source.rightsNote })),
    };
  });

  const report: StixObject = {
    type: "report",
    spec_version: "2.1",
    id: `report--${uuidv5("report:incident-feed")}`,
    created_by_ref: producer.id,
    created: stamp("2026-10-10"),
    modified: stamp(latest),
    name: "Security Market Map reviewed incident feed",
    description: "All reviewed incidents. Each incident cites its original sources in external_references; uncertainty is kept in x_smm_uncertainty_notes.",
    report_types: ["threat-report"],
    published: stamp(latest),
    object_refs: objects.map((o) => o.id),
    object_marking_refs: [TLP_WHITE],
  };

  return { type: "bundle", id: `bundle--${uuidv5(`bundle:${latest}:${objects.length}`)}`, objects: [producer, extension, report, ...objects] };
}
