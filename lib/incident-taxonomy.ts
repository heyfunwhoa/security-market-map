import { evaluateClassification, type IncidentClassification } from "./incident-classifier";

/**
 * Offline curated technique-page subset. NOT a STIX collection import.
 * Names and object versions verified against official MITRE technique pages.
 * No guessed STIX IDs, collection version, or auto-published claims.
 */
const TECHNIQUES = {
  "T1195.001": { name: "Compromise Software Dependencies and Development Tools", techniqueVersion: "2.0", domain: "enterprise-attack", tactic: "initial-access", url: "https://attack.mitre.org/techniques/T1195/001/" },
  "T1195.002": { name: "Compromise Software Supply Chain", techniqueVersion: "1.1", domain: "enterprise-attack", tactic: "initial-access", url: "https://attack.mitre.org/techniques/T1195/002/" }
} as const;
type TechniqueId = keyof typeof TECHNIQUES;
export const OFFLINE_VERIS_SCHEMA_REFERENCE = { repository: "https://github.com/vz-risk/veris", version: "1.3.2", schemaImported: false } as const;

export function inspectOfflineTaxonomy(input: IncidentClassification) {
  const evaluation = evaluateClassification(input);
  const errors = [...evaluation.failures];
  const techniques = input.mappings.map(mapping => {
    const exact = Object.prototype.hasOwnProperty.call(TECHNIQUES,mapping.attackId)
      ? TECHNIQUES[mapping.attackId as TechniqueId] : null;
    if (!exact) errors.push("Unknown/unpinned ATT&CK ID: " + mapping.attackId);
    if (mapping.taxonomy.version !== null || mapping.taxonomy.stixId !== null)
      errors.push("Unverified STIX collection metadata: " + mapping.attackId);
    if (mapping.status === "reviewed_supported")
      errors.push("Cannot approve without pinned original STIX collection and reviewer evidence: " + mapping.attackId);
    return { attackId: mapping.attackId, detail: exact, stixId: null, collectionVersion: null, status: "candidate" as const };
  });
  // VERIS schema is referenced, but its actual official enum JSON has not been imported.
  // Until that is pinned and validated, only null/unknown fields are acceptable.
  for (const field of ["actor", "action", "asset", "attribute"] as const) {
    if (input.veris[field] !== null) errors.push("VERIS value not validated against official schema: " + field);
  }
  if (input.veris.schemaVersion !== null && input.veris.schemaVersion !== OFFLINE_VERIS_SCHEMA_REFERENCE.version)
    errors.push("Stale VERIS schema version");
  if (input.disagreements.length) errors.push("Unresolved incident evidence disagreement");
  if (input.mappings.some(m => m.claimIds.some(id => {
    const c = input.claims.find(c => c.id===id);
    return !c || c.withdrawn || !!c.supersededBy || c.status==="disputed" || c.status==="hypothesis" || c.status==="unknown";
  }))) errors.push("Unusable or disputed mapping evidence");
  return { valid: errors.length===0, errors, techniques, verisSchema: OFFLINE_VERIS_SCHEMA_REFERENCE, unknowns: input.unknowns, disagreements: input.disagreements, publishable: false as const };
}
