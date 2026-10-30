import type { Claim, Product, Source } from "../schema";

// Product-specific evidence only; no inferred parity or measured effectiveness.
const reviewed = "2026-10-30";
export const developerEndpointProducts: Product[] = [
  {
    id: "gitguardian-developer-endpoint", slug: "gitguardian-developer-endpoint",
    vendorId: "gitguardian", name: "GitGuardian Developer Endpoint Protection",
    positioning: "Scheduled local secrets discovery with AI hooks and honeytoken workflows; not continuous host EDR.",
    primaryCategoryIds: ["endpoint-control"],
    adjacentCategoryIds: ["secrets-detection", "mcp-security", "endpoint-security"],
    deployment: ["unknown"], identityScopes: ["nhi", "agent"],
    availability: "generally_available",
    availabilityNote: "Official documentation says this is offered on Growth or Enterprise plans. Verify licensing, platform support, assistant coverage, and self-hosted prerequisites for the buyer.",
    officialUrl: "https://docs.gitguardian.com/endpoint-protection/home",
    useCaseIds: [],
  },
  {
    id: "aikido-device-protection", slug: "aikido-device-protection",
    vendorId: "aikido", name: "Aikido Device Protection",
    positioning: "Local selective package-registry interception and install decisions, local secrets scanning, and optional AI usage monitoring.",
    primaryCategoryIds: ["endpoint-control", "software-supply-chain"],
    adjacentCategoryIds: ["secrets-detection", "mcp-security", "endpoint-security"],
    deployment: ["unknown"], identityScopes: ["not_an_identity_control"],
    availability: "unknown",
    availabilityNote: "The vendor publishes operating documentation, but licensing and commercial availability per platform are not established here.",
    officialUrl: "https://help.aikido.dev/aikido-device-protection/miscellaneous-aikido-endpoint/how-does-endpoint-protection-work",
    useCaseIds: [],
  },
];
export const developerEndpointSources: Source[] = [
  { id: "src-gg-developer-endpoint-20261030", title: "GitGuardian Developer Endpoint Protection", url: "https://docs.gitguardian.com/endpoint-protection/home", canonicalUrl: "https://docs.gitguardian.com/endpoint-protection/home", publisher: "GitGuardian", sourceType: "official_docs", publishedAt: null, retrievedAt: reviewed, volatility: "fast", excerpt: "Scheduled MDM-managed ggshield scan, honeytoken and AI hooks; not a continuous EDR-style agent. Growth and Enterprise plans." },
  { id: "src-aikido-device-20261030", title: "Aikido Device Protection architecture", url: "https://help.aikido.dev/aikido-device-protection/miscellaneous-aikido-endpoint/how-does-endpoint-protection-work", canonicalUrl: "https://help.aikido.dev/aikido-device-protection/miscellaneous-aikido-endpoint/how-does-endpoint-protection-work", publisher: "Aikido Security", sourceType: "official_docs", publishedAt: null, retrievedAt: reviewed, volatility: "fast", excerpt: "A selective Layer 4 proxy makes local decisions on supported package domains; agent also scans local files for secrets." },
];
function reported(id: string, subjectId: string, sourceId: string, sourceUrl: string, statement: string, notes: string, capabilityId: string): Claim {
  return { id, subjectType: "product", subjectId, capabilityId, statement, polarity: "asserts",
    sourceId, sourceUrl, sourceType: "official_docs", publishedAt: null, observedAt: reviewed,
    effectiveFrom: null, effectiveTo: null, confidence: "medium", verificationStatus: "vendor_published",
    lastCheckedAt: reviewed, conflictsWith: [], notes };
}
export const developerEndpointClaims: Claim[] = [
  reported("claim-gg-endpoint-scheduled-20261030", "gitguardian-developer-endpoint", "src-gg-developer-endpoint-20261030", developerEndpointSources[0].url,
    "GitGuardian describes MDM-scheduled ggshield workstation secret scans, not a continuous EDR-style agent.",
    "Product-specific; scan coverage, cadence and edition must be checked in deployment.", "cap-dev-local-secret-scan"),
  reported("claim-gg-endpoint-ai-hooks-20261030", "gitguardian-developer-endpoint", "src-gg-developer-endpoint-20261030", developerEndpointSources[0].url,
    "GitGuardian documents AI Hooks and honeytokens alongside endpoint secrets discovery.",
    "Hook and assistant-specific enforcement needs separate official source and version qualification before capability comparison.", "cap-dev-ai-tool-hook"),
  reported("claim-aikido-device-selective-proxy-20261030", "aikido-device-protection", "src-aikido-device-20261030", developerEndpointSources[1].url,
    "Aikido describes local package-domain traffic interception with local policy decisions and optional AI-provider monitoring.",
    "Only supported ecosystems and domains; monitoring is not equivalent to tool-call data-loss prevention.", "cap-dev-package-install-policy"),
  reported("claim-gg-honeytoken-20261030", "gitguardian-developer-endpoint", "src-gg-developer-endpoint-20261030", developerEndpointSources[0].url,
    "GitGuardian documents placement of decoy credentials to alert when a harvester uses them.",
    "Detection alert, not malware removal or a guaranteed host-compromise conclusion.", "cap-dev-honeytoken"),
  reported("claim-aikido-ai-inventory-20261030", "aikido-device-protection", "src-aikido-device-20261030", developerEndpointSources[1].url,
    "When AI usage monitoring is enabled, Aikido reports an inventory of MCP servers, models, tools and devices.",
    "Telemetry only, not proven prompt or tool-call blocking.", "cap-dev-ai-usage-inventory"),
  reported("claim-aikido-device-local-secrets-20261030", "aikido-device-protection", "src-aikido-device-20261030", developerEndpointSources[1].url,
    "Aikido documents local file scanning for hardcoded secrets.",
    "No claim of credential verification, revocation or equal scope to GitGuardian.", "cap-dev-local-secret-scan"),
];
