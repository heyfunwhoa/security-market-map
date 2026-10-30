import type { Capability, UseCase } from "../schema";

// The compare engine intentionally returns Unknown when no matching sourced claim exists.
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
    architecture: "Compare the exact control boundary: scheduled local discovery; installation interception; pre/post AI hook; provider or MCP inventory; honeytoken alert. A claim without supported product-specific source remains Unknown.",
    stakeholders: ["AppSec", "Endpoint and IT security", "Platform engineering", "Secrets/NHI", "SOC"],
    triggers: ["Local credentials in shell history or .env files", "Malicious package incident", "AI coding agent deployment", "EDR renewal does not cover developer workflows"],
    budgetOwner: "AppSec, endpoint/IT security or platform security depending on the gap; confirm primary purchaser.",
    successMetrics: ["Eligible device enrollment and scan freshness", "Safe simulated install block rate and false blocks", "Supported agent/hook coverage", "Alert-to-credential revocation time"],
    categoryIds: ["endpoint-control", "secrets-detection", "software-supply-chain", "mcp-security"],
    capabilityIds: developerEndpointCapabilities.map((c) => c.id),
    discoveryQuestions: [
      "Which developers and environments are in scope: macOS, Windows, Linux, WSL2 or containers?",
      "Which control blocks before execution, which only detects, and what is its fail-open behavior?",
      "Which AI assistant and MCP interactions are supported at the specific hook point?",
      "Does the pilot keep full secret values local and how is the device CA managed?",
      "Who owns exception approvals, finding triage and credential revocation?",
    ],
    buyerQuestion: "Which developer action can we actually prevent, which events only provide visibility, and what is still Unknown?"
  },
];
