/** Offline, synthetic incident mapping validation. No publisher, API or registry writes. */
export type EpistemicStatus = "reported" | "observed" | "hypothesis" | "disputed" | "unknown";
export type MappingStatus = "not_evaluated" | "candidate" | "reviewed_supported" | "disputed" | "rejected";
export type VerisField = "actor" | "action" | "asset" | "attribute";
export type EvidenceClaim = { id: string; status: EpistemicStatus; withdrawn?: boolean; supersededBy?: string };
export type TechniqueCandidate = {
  attackId: string;
  domain: "enterprise-attack";
  taxonomy: { name: "MITRE ATT&CK"; version: string | null; stixId: string | null };
  claimIds: string[];
  rationale: string;
  status: MappingStatus;
  reviewer?: string;
  reviewedAt?: string;
};
export type IncidentClassification = {
  incidentId: string;
  fixtureOnly: true;
  veris: { schemaVersion: string | null; actor: string | null; action: string | null; asset: string | null; attribute: string | null };
  claims: EvidenceClaim[];
  mappings: TechniqueCandidate[];
  unknowns: string[];
  disagreements: string[];
};
const attackIdPattern = /^T\d{4}(?:\.\d{3})?$/;
const stixPattern = /^attack-pattern--[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** A validation report never changes candidate status or grants publication permission. */
export function evaluateClassification(input: IncidentClassification) {
  const failures: string[] = [];
  const claimIndex = new Map(input.claims.map((claim) => [claim.id, claim]));
  if (!input.fixtureOnly) failures.push("Only synthetic fixtures are supported");
  if (!input.incidentId.startsWith("synthetic:")) failures.push("Fixture ID must start with synthetic:");
  if (claimIndex.size !== input.claims.length || input.claims.some((c) => !c.id.trim())) failures.push("Duplicate or empty evidence claim ID");
  const seen = new Set<string>();
  for (const mapping of input.mappings) {
    if (!attackIdPattern.test(mapping.attackId)) failures.push("Invalid ATT&CK technique ID: " + mapping.attackId);
    if (mapping.taxonomy.name !== "MITRE ATT&CK" || mapping.domain !== "enterprise-attack") failures.push("Unsupported taxonomy");
    if (mapping.taxonomy.stixId && !stixPattern.test(mapping.taxonomy.stixId)) failures.push("Invalid STIX ID: " + mapping.attackId);
    if (seen.has(mapping.attackId)) failures.push("Duplicate technique candidate: " + mapping.attackId);
    seen.add(mapping.attackId);
    if (!mapping.rationale.trim()) failures.push("Missing rationale: " + mapping.attackId);
    if (!mapping.claimIds.length || mapping.claimIds.some((id) => !claimIndex.has(id))) failures.push("Missing evidence: " + mapping.attackId);
    if (mapping.status === "reviewed_supported") {
      if (!mapping.reviewer?.trim() || !mapping.reviewedAt || Number.isNaN(Date.parse(mapping.reviewedAt)))
        failures.push("Missing human review: " + mapping.attackId);
      if (!mapping.taxonomy.version?.trim() || !mapping.taxonomy.stixId) failures.push("Unpinned taxonomy: " + mapping.attackId);
      if (mapping.claimIds.some((id) => {
        const c = claimIndex.get(id);
        return !c || c.withdrawn || c.supersededBy || !["reported", "observed"].includes(c.status);
      })) failures.push("Unsupported, disputed or superseded evidence: " + mapping.attackId);
      if (input.disagreements.length) failures.push("Unresolved disagreement: " + mapping.attackId);
    }
  }
  return { valid: failures.length === 0, failures, publishable: false as const, candidateIds: input.mappings.filter(m => m.status === "candidate").map(m => m.attackId) };
}
