/**
 * Source-based product profiles: each step of a product page lists the recorded claims that back it.
 * A step pulls claims by capability (capabilityIds) and by explicit claim ID (claimIds) for claims
 * recorded without a capability. Step summaries, checks and boundaries are editorial guidance for a
 * pilot; they are not claims. Where one fact is recorded twice (without and with a capability),
 * a step lists only the capability-tagged claim; both stay under All sources. Anything not backed by a recorded claim renders as "No recorded source".
 */
import { catalog } from "./catalog";
import { evidenceCell } from "./compare";
import type { Claim } from "./schema";

export type ProfileStep = {
  title: string;
  summary: string;
  capabilityIds: string[];
  claimIds: string[];
  check: string;
  boundary: string;
};

export const productProfileSteps: Record<string, ProfileStep[]> = {
  "bay-platform": [
    {
      title: "Discover",
      summary:
        "A short-lived collector pushed through MDM or EDR inventories agents, MCP servers, extensions, packages, skills and local models, then exits.",
      capabilityIds: ["cap-agent-asset-inventory"],
      claimIds: [
        "claim-bay-wave",
        "claim-ae-bay-agentless",
        "claim-ae-sacr-bay-deploy",
        "claim-bay-micron-rollout",
      ],
      check:
        "Confirm OS coverage, the MDM or EDR used for rollout, scan cadence and how fast a newly installed agent appears.",
      boundary:
        "A point-in-time inventory is not continuous monitoring, and discovery alone does not block anything.",
    },
    {
      title: "Set policy",
      summary:
        "Lighthouse drafts per-team policy from observed agent activity and lets teams replay it.",
      capabilityIds: ["cap-agent-policy-learning"],
      claimIds: [],
      check:
        "Replay a draft policy against real history and review what it would have blocked before turning it on.",
      boundary:
        "A learned baseline can approve risky behavior that was already normal. Sources disagree on whether a baselining period is needed.",
    },
    {
      title: "Decide",
      summary:
        "When an agent proposes an action, the AI tool hands it to Bay Enforcer through a native hook, which returns Allow, Ask or Deny using the whole session.",
      capabilityIds: [
        "cap-agent-preexec-control",
        "cap-agent-session-context",
        "cap-agent-unhooked-coverage",
      ],
      claimIds: ["claim-bay-architecture"],
      check:
        "Run a harmless synthetic action, such as a test command against a dummy bucket, and confirm the verdict arrives before it runs.",
      boundary:
        "Only tools that expose hooks, and only the events they expose, can be decided before execution. Collector-only deployments detect but do not prevent.",
    },
    {
      title: "Record",
      summary:
        "The action, session context, policy and verdict feed the inventory and entity graph for investigation.",
      capabilityIds: ["cap-agent-action-audit"],
      claimIds: [],
      check:
        "Confirm event fields, retention, export to the SIEM and who owns follow-up on an Ask or Deny.",
      boundary:
        "An audit trail of agent actions is not proof that every risky action was intercepted.",
    },
  ],
  "gitguardian-developer-endpoint": [
    {
      title: "Scan the workstation",
      summary:
        "Scheduled ggshield scans look for secrets in local files on enrolled developer machines.",
      capabilityIds: ["cap-dev-local-secret-scan"],
      claimIds: [],
      check:
        "Confirm which paths and agent artifacts are scanned, how scans are scheduled through MDM, and that full secret values stay local.",
      boundary: "A scheduled scan is not continuous process monitoring.",
    },
    {
      title: "Hook AI tools",
      summary:
        "Supported AI coding assistants call GitGuardian hooks so secrets can be caught in prompts or tool calls.",
      capabilityIds: ["cap-dev-ai-tool-hook", "cap-dev-ai-usage-inventory"],
      claimIds: [],
      check:
        "List the assistants and versions covered, and whether the decision happens before or after the tool runs.",
      boundary:
        "Hook support varies by assistant and action timing; a post-tool decision can come after an irreversible side effect.",
    },
    {
      title: "Alert on decoys",
      summary:
        "Honeytokens placed on the workstation alert when a harvester tries to use them.",
      capabilityIds: ["cap-dev-honeytoken"],
      claimIds: [],
      check:
        "Place a decoy in a test workstation and confirm who receives the alert and how fast.",
      boundary:
        "A decoy alert shows a credential was harvested and tried; it is not host malware detection.",
    },
  ],
  "aikido-device-protection": [
    {
      title: "Intercept installs",
      summary:
        "A local component watches traffic to supported package registries and applies install policy before the package lands.",
      capabilityIds: ["cap-dev-package-install-policy"],
      claimIds: [],
      check:
        "Confirm the package manager, network route, mirror, operating system and device enrollment; test with a benign synthetic block.",
      boundary:
        "An unsupported registry, offline cache, container or WSL path must not be assumed covered, and a post-install alert is not a pre-install block.",
    },
    {
      title: "Scan local files",
      summary: "Device Protection scans local files for hardcoded secrets.",
      capabilityIds: ["cap-dev-local-secret-scan"],
      claimIds: [],
      check:
        "Confirm which file types and paths are scanned and whether full values stay on the device.",
      boundary:
        "A local scan finds secrets in the files it reads; it does not rotate or revoke them.",
    },
    {
      title: "Report inventory",
      summary:
        "Device events, package inventory and optional AI usage inventory give investigation context.",
      capabilityIds: ["cap-workstation-packages", "cap-dev-ai-usage-inventory"],
      claimIds: [],
      check:
        "Confirm event timestamps, allowed and blocked decisions, metadata minimization and who responds.",
      boundary:
        "AI usage inventory does not establish prompt or MCP tool-call prevention.",
    },
  ],
  kingfisher: [
    {
      title: "Detect",
      summary: "Match candidate secrets in authorized targets.",
      capabilityIds: ["cap-secret-discovery"],
      claimIds: [],
      check: "Inspect source, pinned rule ID, location and redacted finding.",
      boundary:
        "A match is a candidate, not proof that the credential is active.",
    },
    {
      title: "Validate",
      summary: "Optionally ask a supported issuer whether a credential works.",
      capabilityIds: [],
      claimIds: ["claim-secrets-sweep-kingfisher"],
      check:
        "Confirm provider support, test authorization, outcomes and network side effects.",
      boundary:
        "Timeouts and unsupported credential types are inconclusive, not invalid.",
    },
    {
      title: "Map",
      summary: "Investigate available identity and permission context.",
      capabilityIds: [],
      claimIds: [],
      check:
        "Confirm mapped provider, read-only scope and least-privilege permissions.",
      boundary:
        "Provider-specific mapping is not universal blast-radius coverage.",
    },
    {
      title: "Triage",
      summary: "Prioritize evidence and assign an owner.",
      capabilityIds: [],
      claimIds: [],
      check:
        "Confirm output format, fingerprint, redaction and reviewer handoff.",
      boundary:
        "Importing other scanner results is not native detector support.",
    },
    {
      title: "Revoke",
      summary: "Contain an exposed credential with explicit approval.",
      capabilityIds: [],
      claimIds: [],
      check:
        "Confirm supported provider, authority, impact assessment and rollback.",
      boundary:
        "No live revocation in this research workflow; it can disrupt applications.",
    },
  ],
};

export type ResolvedStep = ProfileStep & {
  claims: Claim[];
  /** Capability names in this step with no current claim. */
  unknown: string[];
};

/** Resolve each step to its recorded claims and the capabilities still Unknown. */
export function resolveProfileSteps(
  productId: string,
  asOf: string,
): ResolvedStep[] {
  const steps = productProfileSteps[productId] ?? [];
  const productClaims = catalog.claims.filter(
    (claim) =>
      claim.subjectType === "product" &&
      claim.subjectId === productId &&
      claim.verificationStatus !== "superseded",
  );
  return steps.map((step) => {
    const claims = productClaims.filter(
      (claim) =>
        (claim.capabilityId &&
          step.capabilityIds.includes(claim.capabilityId)) ||
        step.claimIds.includes(claim.id),
    );
    const unknown = step.capabilityIds
      .filter(
        (id) =>
          evidenceCell(catalog.claims, productId, id, asOf, catalog.sources)
            .status === "unknown",
      )
      .map(
        (id) =>
          catalog.capabilities.find((capability) => capability.id === id)
            ?.name ?? id,
      );
    return { ...step, claims, unknown };
  });
}

export function hasProfileSteps(slug: string): boolean {
  return slug in productProfileSteps;
}
