import type { Capability, UseCase } from "../schema";

// The compare engine intentionally returns Unknown when no matching sourced claim exists.
export const workstationEvidenceCapabilities: Capability[] = [
  { id: "cap-dev-package-lookback", slug: "dev-package-lookback", name: "Find past downloads of a newly flagged package", description: "Use historical package activity to identify earlier exposure to a dependency named in a new advisory.", categoryId: "software-supply-chain" },
  { id: "cap-workstation-packages", slug: "workstation-packages", name: "Inventory detected software packages on developer devices", description: "List observed packages and versions with device prevalence and observation time.", categoryId: "endpoint-control" },
  { id: "cap-file-retrohunt", slug: "file-retrohunt", name: "Hunt historical customer samples", description: "Apply new indicators or rules to a customer collection of previously captured files.", categoryId: "malware-analysis" },
  { id: "cap-file-retrieval", slug: "file-retrieval", name: "Retrieve a previously captured file", description: "Recover file content from a retained sample. Collection policy and size limits determine what is available.", categoryId: "malware-analysis" },
  { id: "cap-file-device-history", slug: "file-device-history", name: "Trace a file to devices over time", description: "Associate a file with named devices and observation times. Execution requires separate evidence.", categoryId: "endpoint-security" },
];

export const developerEndpointCapabilities: Capability[] = [
  { id: "cap-dev-local-secret-scan", slug: "dev-local-secret-scan", name: "Local workstation secrets discovery", description: "Finds secrets in supported local files, not merely committed repositories.", categoryId: "endpoint-control" },
  { id: "cap-dev-package-install-policy", slug: "dev-package-install-policy", name: "Supported package install interception", description: "Makes an allow/block decision during package installation on explicitly supported registries or marketplaces.", categoryId: "endpoint-control" },
  { id: "cap-dev-ai-tool-hook", slug: "dev-ai-tool-hook", name: "AI coding assistant tool-call hooks", description: "Inspects and may prevent supported prompt or tool-call actions. Assistant/version and pre/post execution timing matter.", categoryId: "endpoint-control" },
  { id: "cap-dev-ai-usage-inventory", slug: "dev-ai-usage-inventory", name: "AI provider and MCP usage inventory", description: "Reports agents, models, tools or MCP usage without implying tool-call prevention.", categoryId: "endpoint-control" },
  { id: "cap-dev-honeytoken", slug: "dev-honeytoken", name: "Endpoint honeytoken alert", description: "Places an intentionally invalid decoy credential and alerts on its use; not equivalent to host malware detection.", categoryId: "endpoint-control" },
];
export const developerEndpointUseCases: UseCase[] = [
  { id: "uc-developer-endpoint", slug: "developer-endpoint-protection", name: "Protect developer workstations and AI coding workflows",
    problem: "Secrets remain outside Git, agents can access local assets, and dependency installs can introduce compromised code. EDR, SCA and code scanning observe different stages.",
    architecture: "Follow a package from installation to incident review. AppSec checks what was allowed and which credentials were exposed. Responders search retained files for new indicators and trace sightings to devices. Confirm execution and credential use with endpoint and provider logs.",
    stakeholders: ["AppSec", "Endpoint and IT security", "Platform engineering", "Secrets/NHI", "SOC"],
    triggers: ["Local credentials in shell history or .env files", "Malicious package incident", "AI coding agent deployment", "EDR renewal does not cover developer workflows"],
    budgetOwner: "AppSec, endpoint/IT security or platform security depending on the gap; confirm primary purchaser.",
    successMetrics: ["Eligible device enrollment and scan freshness", "Safe simulated install block rate and false blocks", "Supported agent/hook coverage", "Alert-to-credential revocation time", "Time from a package advisory to a list of devices with supporting evidence"],
    categoryIds: ["endpoint-control", "secrets-detection", "software-supply-chain", "mcp-security", "malware-analysis", "endpoint-security"],
    capabilityIds: [...workstationEvidenceCapabilities, ...developerEndpointCapabilities].map((c) => c.id).concat("cap-secret-verification"),
    comparisonShortlists: {
      title: "After a package is removed",
      options: [
        { label: "Which devices encountered the package?", productIds: ["crowdstrike-platform", "aikido-device-protection", "microsoft-defender-for-endpoint", "stairwell-platform"] },
        { label: "Can we recover the file and hunt for related samples?", productIds: ["stairwell-platform", "limacharlie-binlib", "reversinglabs-spectra-analyze", "carbon-black-cloud-enterprise-edr"] },
      ],
    },
    discoveryQuestions: [
      "Which developers and environments are in scope: macOS, Windows, Linux, WSL2 or containers?",
      "Which control blocks before execution, which only detects, and what is its fail-open behavior?",
      "Which AI assistant and MCP interactions are supported at the specific hook point?",
      "Does the pilot keep full secret values local and how is the device CA managed?",
      "If a developer tool is declared malicious after removal, can responders recover the file, hunt related samples and identify the devices that saw each one?",
      "Who owns exception approvals, finding triage and credential revocation?",
    ],
    buyerQuestion: "Which developer actions can we prevent, and what evidence can responders recover after a package advisory?"
  },
];
