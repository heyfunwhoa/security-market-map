import { evaluateClassification, type IncidentClassification } from "./incident-classifier";

/** Minimal shape of ASE's fixture-only output; no copied registry or exporter logic. */
export type CandidateIntake = {
  status: "candidate_only"; canonicalUrl: string; publisher: string;
  retrievedAt: string | null; publishedAt: string | null;
  contentSha256: string; hashVersion: number; sourceVersion: string;
  claims: readonly unknown[]; uncertainties: readonly string[];
  correctionStatus: "none" | "superseded" | "retracted";
  exportable: false; fetched: false;
};

export type OfflineHandoff = {
  status: "blocked_unreviewed" | "blocked_correction" | "blocked_invalid";
  fingerprint: string | null;
  classification: ReturnType<typeof evaluateClassification> | null;
  reasons: string[];
  publishable: false;
};

/**
 * Fail-closed boundary until the canonical research-evidence-v1 contract supports
 * incident subjects and ASE produces an independently reviewed, rights-cleared packet.
 * This function NEVER promotes candidate intake into approved evidence.
 */
export function evaluateCandidateHandoff(intake: CandidateIntake): OfflineHandoff {
  const reasons: string[] = [];
  if (intake.status !== "candidate_only" || intake.exportable !== false || intake.fetched !== false)
    reasons.push("Not a fixture-only Research Hub candidate");
  if (!/^https:\/\//.test(intake.canonicalUrl) || !intake.publisher.trim())
    reasons.push("Missing canonical HTTPS provenance");
  if (!/^[a-f0-9]{64}$/.test(intake.contentSha256) || !Number.isSafeInteger(intake.hashVersion) || intake.hashVersion < 1 || !intake.sourceVersion.trim())
    reasons.push("Missing versioned content identity");
  if (intake.claims.length) reasons.push("Candidate intake must not assert approved factual claims");
  if (intake.correctionStatus !== "none") reasons.push("Corrected or retracted source must not activate");
  const status = reasons.length
    ? intake.correctionStatus !== "none" ? "blocked_correction" : "blocked_invalid"
    : "blocked_unreviewed";
  if (!reasons.length) reasons.push("No authorized incident subject in research-evidence-v1 and no reviewed source claims");
  return {
    status,
    fingerprint: /^[a-f0-9]{64}$/.test(intake.contentSha256)
      ? [intake.canonicalUrl, intake.sourceVersion, String(intake.hashVersion), intake.contentSha256].join("|")
      : null,
    classification: null, reasons, publishable: false
  };
}

/** Synthetic classifier is independently accessible, but never fed invented claims from intake. */
export function evaluateIndependentSyntheticFixture(fixture: IncidentClassification) {
  return evaluateClassification(fixture);
}
