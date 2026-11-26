import type { Claim, Product, Source, Vendor } from "../schema";

// MCP and agent-skill security tools (2026-11-23). Research candidates only.
// Every product statement is publisher-reported unless noted. No direct-competitor or parity claims.
// Cisco and Snyk reuse their existing vendor records. See docs/market-research/mcp-security-scanners-2026-11.md.

const CHECKED = "2026-11-23";

export const mcpSecurityVendors: Vendor[] = [
  {
    id: "panguard-ai",
    slug: "panguard-ai",
    name: "Panguard AI",
    formerNames: [],
    website: "https://panguard.ai/",
    positioning:
      "Panguard AI publishes PanGuard, an open-source tool that scans the skills AI agents install and guards the tool calls they make, built on its open Agent Threat Rules (ATR) format.",
    primaryCategoryIds: ["mcp-security"],
    adjacentCategoryIds: ["agentic-runtime"],
    identityScopes: ["agent"],
    verificationStatus: "research_candidate",
    openQuestions: [
      "Company size, funding and customer count are not stated in the sources reviewed.",
      "Paid tiers (Enterprise, Migrator Pro, Sovereign) are named on the site; their pricing and contents were not reviewed. Sovereign is described as design-partner stage.",
      "The upstream merges of ATR rules into Cisco and Microsoft tooling are vendor-reported and were not checked in those projects.",
    ],
  },
  {
    id: "runlayer",
    slug: "runlayer",
    name: "Runlayer",
    formerNames: [],
    website: "https://www.runlayer.com/",
    positioning:
      "Runlayer markets an MCP security platform: a gateway that controls which apps agents reach, threat detection on MCP requests, observability and permissions tied to the identity provider.",
    primaryCategoryIds: ["mcp-security"],
    adjacentCategoryIds: ["agent-identity"],
    identityScopes: ["agent"],
    verificationStatus: "research_candidate",
    openQuestions: [
      "Capabilities come from launch coverage (Nov 2025); the vendor's own product pages were not reviewed.",
      "Deployment model, pricing and current customer base are unknown.",
    ],
  },
];

export const mcpSecurityProducts: Product[] = [
  {
    id: "panguard",
    slug: "panguard",
    vendorId: "panguard-ai",
    name: "PanGuard",
    positioning:
      "Command-line tool that scans installed agent skills against ATR rules before use, puts a guard between agents and the tools they call, and shows results in a local dashboard.",
    primaryCategoryIds: ["mcp-security"],
    adjacentCategoryIds: ["agentic-runtime"],
    deployment: ["open_source", "self_hosted"],
    identityScopes: ["agent"],
    availability: "generally_available",
    availabilityNote:
      "Free, MIT-licensed and installed from npm. Runs on-device by default. Commercial tiers are listed separately; their availability was not checked.",
    officialUrl: "https://github.com/panguard-ai/panguard-ai",
    useCaseIds: [],
  },
  {
    id: "cisco-mcp-scanner",
    slug: "cisco-mcp-scanner",
    vendorId: "cisco",
    name: "Cisco MCP Scanner",
    positioning:
      "Open-source tool from Cisco AI Defense that scans MCP servers for vulnerabilities before they are connected to AI systems. Can run alone or alongside AI Defense.",
    primaryCategoryIds: ["mcp-security"],
    adjacentCategoryIds: ["ai-application-security"],
    deployment: ["open_source"],
    identityScopes: ["agent"],
    availability: "generally_available",
    availabilityNote: "Open source and downloadable on its own. AI Defense itself is a separate commercial product.",
    officialUrl: "https://blogs.cisco.com/ai/securing-the-ai-agent-supply-chain-with-ciscos-open-source-mcp-scanner",
    useCaseIds: [],
  },
  {
    id: "snyk-invariant-mcp-scan",
    slug: "snyk-invariant-mcp-scan",
    vendorId: "snyk",
    name: "MCP-Scan (Invariant Labs, now Snyk)",
    positioning:
      "MCP server scanner from Invariant Labs that detects tool poisoning and MCP rug pulls. Snyk acquired Invariant Labs in June 2025.",
    primaryCategoryIds: ["mcp-security"],
    adjacentCategoryIds: ["ai-application-security"],
    deployment: ["open_source"],
    identityScopes: ["agent"],
    availability: "generally_available",
    availabilityNote:
      "Published as open source by Invariant Labs. The current name and packaging inside Snyk were not re-checked; one third-party post calls it agent-scan.",
    officialUrl: "https://snyk.io/news/snyk-acquires-invariant-labs-to-accelerate-agentic-ai-security-innovation",
    useCaseIds: [],
  },
  {
    id: "runlayer-platform",
    slug: "runlayer-platform",
    vendorId: "runlayer",
    name: "Runlayer",
    positioning:
      "MCP gateway with per-request threat detection, observability on approved MCP servers, a catalog of vetted servers, and agent permissions matched to the user's own through Okta or Entra.",
    primaryCategoryIds: ["mcp-security"],
    adjacentCategoryIds: ["agent-identity"],
    deployment: ["unknown"],
    identityScopes: ["agent"],
    availability: "generally_available",
    availabilityNote: "Came out of stealth 17 Nov 2025 per launch coverage. Supported clients and deployment not checked.",
    officialUrl: "https://www.runlayer.com/",
    useCaseIds: [],
  },
];

export const mcpSecuritySources: Source[] = [
  {
    id: "src-mcp-panguard-github",
    title: "PanGuard — GitHub repository README",
    url: "https://github.com/panguard-ai/panguard-ai",
    canonicalUrl: "https://github.com/panguard-ai/panguard-ai",
    publisher: "Panguard AI",
    sourceType: "official_docs",
    publishedAt: null,
    retrievedAt: CHECKED,
    volatility: "fast",
    excerpt:
      "README describes a one-command npm install that scans installed agent skills against open ATR rules, places a guard between agents and their tools, runs on-device by default, and states ATR is MIT-licensed.",
  },
  {
    id: "src-mcp-panguard-compare",
    title: "PanGuard — Where PanGuard fits in your security stack",
    url: "https://panguard.ai/compare",
    canonicalUrl: "https://panguard.ai/compare",
    publisher: "Panguard AI",
    sourceType: "vendor_marketing",
    publishedAt: null,
    retrievedAt: CHECKED,
    volatility: "fast",
    excerpt:
      "Vendor page positions PanGuard as the AI agent layer, complementing EDR, dependency scanners and prompt firewalls, with pre-install skill auditing and runtime monitoring.",
  },
  {
    id: "src-mcp-cisco-scanner",
    title: "Cisco — Securing the AI agent supply chain with Cisco's open-source MCP Scanner",
    url: "https://blogs.cisco.com/ai/securing-the-ai-agent-supply-chain-with-ciscos-open-source-mcp-scanner",
    canonicalUrl: "https://blogs.cisco.com/ai/securing-the-ai-agent-supply-chain-with-ciscos-open-source-mcp-scanner",
    publisher: "Cisco",
    sourceType: "vendor_marketing",
    publishedAt: null,
    retrievedAt: CHECKED,
    volatility: "moderate",
    excerpt:
      "Cisco announces MCP Scanner, an open-source tool for finding vulnerabilities in MCP servers before integration, which complements AI Defense and can also be deployed stand-alone.",
  },
  {
    id: "src-mcp-snyk-invariant",
    title: "Snyk — Snyk acquires Invariant Labs to accelerate agentic AI security innovation",
    url: "https://snyk.io/news/snyk-acquires-invariant-labs-to-accelerate-agentic-ai-security-innovation",
    canonicalUrl: "https://snyk.io/news/snyk-acquires-invariant-labs-to-accelerate-agentic-ai-security-innovation",
    publisher: "Snyk",
    sourceType: "press_release",
    publishedAt: "2025-06-24",
    retrievedAt: CHECKED,
    volatility: "moderate",
    excerpt:
      "Snyk announces the acquisition of Invariant Labs, whose tools let developers observe agent behavior, enforce contextual rules on agents, and scan MCP servers for vulnerabilities.",
  },
  {
    id: "src-mcp-runlayer-launch",
    title: "TechCrunch — MCP AI agent security startup Runlayer launches with $11M",
    url: "https://techcrunch.com/2025/11/17/mcp-ai-agent-security-startup-runlayer-launches-with-8-unicorns-11m-from-khoslas-keith-rabois-and-felicis",
    canonicalUrl: "https://techcrunch.com/2025/11/17/mcp-ai-agent-security-startup-runlayer-launches-with-8-unicorns-11m-from-khoslas-keith-rabois-and-felicis",
    publisher: "TechCrunch",
    sourceType: "news",
    publishedAt: "2025-11-17",
    retrievedAt: CHECKED,
    volatility: "moderate",
    excerpt:
      "Launch coverage: Runlayer exits stealth with $11M seed from Khosla's Keith Rabois and Felicis, offering an MCP gateway, request-level threat detection, observability and identity-provider-based permissions.",
  },
];

function claim(
  id: string,
  statement: string,
  subjectType: Claim["subjectType"],
  subjectId: string,
  source: Source,
  notes: string,
  confidence: Claim["confidence"] = "medium",
): Claim {
  return {
    id,
    statement,
    subjectType,
    subjectId,
    capabilityId: null,
    polarity: "asserts",
    sourceId: source.id,
    sourceUrl: source.url,
    sourceType: source.sourceType,
    publishedAt: source.publishedAt,
    observedAt: CHECKED,
    effectiveFrom: null,
    effectiveTo: null,
    confidence,
    verificationStatus: source.sourceType === "news" ? "needs_review" : "vendor_published",
    lastCheckedAt: CHECKED,
    conflictsWith: [],
    notes,
  };
}

const [panguardGithub, panguardCompare, ciscoScanner, snykInvariant, runlayerLaunch] = mcpSecuritySources;

export const mcpSecurityClaims: Claim[] = [
  claim(
    "claim-mcp-panguard-skill-scan",
    "PanGuard scans the skills installed by AI agents against open ATR rules and places a guard between agents and the tools they call.",
    "product",
    "panguard",
    panguardGithub,
    "Publisher-reported, not independently tested. The rule count changes often (747 to 785 across vendor pages), so no count is recorded here.",
  ),
  claim(
    "claim-mcp-panguard-layer",
    "Panguard AI positions PanGuard as an AI-agent layer that complements EDR, dependency scanners and prompt firewalls rather than replacing them.",
    "vendor",
    "panguard-ai",
    panguardCompare,
    "Vendor positioning. No direct-competitor claim.",
  ),
  claim(
    "claim-mcp-cisco-scanner",
    "Cisco MCP Scanner is an open-source tool that scans MCP servers for vulnerabilities before integration and can run without AI Defense.",
    "product",
    "cisco-mcp-scanner",
    ciscoScanner,
    "Publisher-reported, not independently tested.",
  ),
  claim(
    "claim-mcp-snyk-invariant",
    "Snyk acquired Invariant Labs, whose tools include scanning MCP servers for vulnerabilities and enforcing contextual security rules on agents.",
    "product",
    "snyk-invariant-mcp-scan",
    snykInvariant,
    "Acquisition announced 24 Jun 2025. Current product name and packaging inside Snyk not re-checked.",
    "high",
  ),
  claim(
    "claim-mcp-runlayer-launch",
    "Runlayer launched from stealth in Nov 2025 with an MCP gateway, request-level threat detection, observability and permissions tied to Okta or Entra.",
    "product",
    "runlayer-platform",
    runlayerLaunch,
    "From news coverage of the launch; the vendor's own pages were not reviewed.",
  ),
];
