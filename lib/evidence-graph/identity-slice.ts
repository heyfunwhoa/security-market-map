import { catalog } from "../catalog";
import { projectEvidenceGraph, type SliceSpec } from "./project";

/**
 * Modest identity / secrets / NHI slice.
 * ITDR and CIAM stay on their existing pages. Persona profile work in
 * PRs #123 and #148 is intentionally not imported.
 */
export const IDENTITY_SECRETS_NHI_SLICE: SliceSpec = {
  id: "identity-secrets-nhi",
  title: "Identity, secrets, and non-human identity",
  categoryIds: [
    "workforce-identity",
    "iga",
    "pam",
    "ciem",
    "secrets-detection",
    "secrets-management",
    "nhi",
    "agent-identity",
  ],
  useCaseIds: [
    "uc-jml",
    "uc-jit",
    "uc-detect",
    "uc-vault",
    "uc-nhi",
    "uc-agent",
    "uc-ciem",
  ],
};

const projected = projectEvidenceGraph(catalog, IDENTITY_SECRETS_NHI_SLICE);
if (projected.problems.length > 0) {
  throw new Error(`Evidence graph projection failed:\n${projected.problems.join("\n")}`);
}

export const identitySecretsNhiGraph = projected.graph;
