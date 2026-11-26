import type { Claim, Product, Source, Vendor } from "../schema";

// AI agent security platforms (2026-11-23). Research candidates only.
// Publisher-reported or news unless noted. No direct-competitor or parity claims.
// Prompt Security reuses the existing SentinelOne vendor. See docs/market-research/mcp-security-scanners-2026-11.md.

const CHECKED = "2026-11-23";

export const agentSecurityVendors: Vendor[] = [
  {
    id: "zenity",
    slug: "zenity",
    name: "Zenity",
    formerNames: [],
    website: "https://zenity.io/",
    positioning:
      "Zenity markets an AI agent security and governance platform: agent inventory, posture management, runtime boundaries and detection across SaaS, cloud and endpoint agents.",
    primaryCategoryIds: ["agentic-runtime"],
    adjacentCategoryIds: ["mcp-security", "ai-governance"],
    identityScopes: ["agent"],
    verificationStatus: "research_candidate",
    openQuestions: [
      "The platform page names MCP Security but does not describe what it covers.",
      "Which agent platforms (Copilot Studio, Agentforce, Bedrock, coding agents) are in the buyer's estate, and which are covered inline versus by API?",
    ],
  },
  {
    id: "pillar-security",
    slug: "pillar-security",
    name: "Pillar Security",
    formerNames: [],
    website: "https://www.pillar.security/",
    positioning:
      "Pillar Security markets one platform to discover, test, secure and govern AI agents, with an inventory of agents, models, MCP servers and skills.",
    primaryCategoryIds: ["ai-application-security"],
    adjacentCategoryIds: ["mcp-security", "agentic-runtime"],
    identityScopes: ["agent"],
    verificationStatus: "research_candidate",
    openQuestions: [
      "Red teaming, posture and runtime guardrails are vendor-reported and untested here.",
      "Deployment options and pricing were not checked on a first-party page.",
    ],
  },
  {
    id: "straiker",
    slug: "straiker",
    name: "Straiker",
    formerNames: [],
    website: "https://www.straiker.ai/",
    positioning:
      "Straiker markets agent security in three products: Discover AI (inventory and posture), Ascend AI (adversarial testing) and Defend AI (runtime protection).",
    primaryCategoryIds: ["agentic-runtime"],
    adjacentCategoryIds: ["mcp-security", "ai-application-security"],
    identityScopes: ["agent"],
    verificationStatus: "research_candidate",
    openQuestions: [
      "Capability details come from news coverage and an investor Q&A; the vendor's own product pages were not reviewed.",
      "Which coding, productivity and custom agent platforms are covered, and which need the inline gateway?",
    ],
  },
];

export const agentSecurityProducts: Product[] = [
  {
    id: "zenity-platform",
    slug: "zenity-platform",
    vendorId: "zenity",
    name: "Zenity AI Agent Security & Governance Platform",
    positioning:
      "Live agent inventory, AI security posture management for agent configuration and permissions, runtime boundaries that act at the decision point, and AI detection and response.",
    primaryCategoryIds: ["agentic-runtime"],
    adjacentCategoryIds: ["mcp-security", "ai-governance"],
    deployment: ["saas"],
    identityScopes: ["agent"],
    availability: "generally_available",
    availabilityNote: "Runtime Boundaries and Exposure Management were announced 27 Jul 2026; check which modules a given edition includes.",
    officialUrl: "https://zenity.io/platform",
    useCaseIds: [],
  },
  {
    id: "pillar-platform",
    slug: "pillar-platform",
    vendorId: "pillar-security",
    name: "Pillar Security Platform",
    positioning:
      "Inventory of agents, models, MCP servers and skills; scanning of agent configs, permissions and identities; policy enforcement. Lists skill and MCP poisoning among the risks it targets.",
    primaryCategoryIds: ["ai-application-security"],
    adjacentCategoryIds: ["mcp-security", "agentic-runtime"],
    deployment: ["unknown"],
    identityScopes: ["agent"],
    availability: "generally_available",
    availabilityNote: "A separate Pillar for AI Coding Agents offering covers agents on developer endpoints; its availability stage was not checked.",
    officialUrl: "https://www.pillar.security/",
    useCaseIds: [],
  },
  {
    id: "straiker-platform",
    slug: "straiker-platform",
    vendorId: "straiker",
    name: "Straiker (Discover AI, Ascend AI, Defend AI)",
    positioning:
      "Discover AI identifies agents, MCPs and tools; Defend AI traces agent actions at runtime and can run as an inline gateway that blocks malicious actions; Ascend AI does adversarial testing.",
    primaryCategoryIds: ["agentic-runtime"],
    adjacentCategoryIds: ["mcp-security", "ai-application-security"],
    deployment: ["unknown"],
    identityScopes: ["agent"],
    availability: "generally_available",
    availabilityNote: "Discover AI launched 23 Mar 2026 per news coverage. Inline gateway is one deployment option for Defend AI.",
    officialUrl: "https://www.straiker.ai/",
    useCaseIds: [],
  },
  {
    id: "sentinelone-prompt-security",
    slug: "sentinelone-prompt-security",
    vendorId: "sentinelone",
    name: "Prompt Security (SentinelOne)",
    positioning:
      "Discovers sanctioned and shadow GenAI use through a lightweight agent and browser extensions, captures prompts and responses, and applies policy to redact data or block risky prompts.",
    primaryCategoryIds: ["ai-data-security"],
    adjacentCategoryIds: ["ai-application-security"],
    deployment: ["saas"],
    identityScopes: ["human"],
    availability: "generally_available",
    availabilityNote:
      "Acquisition signed 5 Aug 2025; an SEC-filing summary says it closed in early Sep 2025. Current packaging inside Singularity was not checked.",
    officialUrl: "https://www.sentinelone.com/blog/a-new-chapter-for-ai-and-cybersecurity-sentinelone-acquires-prompt-security/",
    useCaseIds: [],
  },
];

export const agentSecuritySources: Source[] = [
  {
    id: "src-agent-zenity-platform",
    title: "Zenity — AI Agent Security & Governance Platform",
    url: "https://zenity.io/platform",
    canonicalUrl: "https://zenity.io/platform",
    publisher: "Zenity",
    sourceType: "vendor_marketing",
    publishedAt: null,
    retrievedAt: CHECKED,
    volatility: "fast",
    excerpt:
      "Platform page lists AI Observability (live agent inventory), AISPM for agent configuration and permissions, Runtime Boundaries, AIDR, and an MCP Security module, across SaaS, cloud/homegrown and endpoint agents.",
  },
  {
    id: "src-agent-zenity-series-c",
    title: "Zenity raises $125 million Series C",
    url: "https://www.intelcapital.com/zenity-raises-125-million-to-secure-the-era-of-1-billion-ai-agent/",
    canonicalUrl: "https://www.intelcapital.com/zenity-raises-125-million-to-secure-the-era-of-1-billion-ai-agent/",
    publisher: "Intel Capital (reposted Zenity release)",
    sourceType: "press_release",
    publishedAt: "2026-08-03",
    retrievedAt: CHECKED,
    volatility: "stable",
    excerpt: "Zenity announces a $125M Series C led by Norwest to expand its AI agent security and governance platform.",
  },
  {
    id: "src-agent-pillar-home",
    title: "Pillar Security — Securing the agentic workforce",
    url: "https://www.pillar.security/",
    canonicalUrl: "https://www.pillar.security/",
    publisher: "Pillar Security",
    sourceType: "vendor_marketing",
    publishedAt: null,
    retrievedAt: CHECKED,
    volatility: "fast",
    excerpt:
      "Homepage describes one platform to discover, test, secure and govern AI agents, an inventory of agents, models, MCP servers and skills, and lists skill/MCP poisoning among targeted risks.",
  },
  {
    id: "src-agent-straiker-discover",
    title: "Help Net Security — Straiker enables visibility and runtime protection for enterprise AI agents",
    url: "https://www.helpnetsecurity.com/2026/03/23/straiker-discover-ai/",
    canonicalUrl: "https://www.helpnetsecurity.com/2026/03/23/straiker-discover-ai/",
    publisher: "Help Net Security",
    sourceType: "news",
    publishedAt: "2026-03-23",
    retrievedAt: CHECKED,
    volatility: "moderate",
    excerpt:
      "Coverage of Straiker's Discover AI launch, which identifies agents, MCPs and tools, and of Defend AI, which traces agent actions at runtime and supports an inline gateway that can block malicious actions.",
  },
  {
    id: "src-agent-straiker-series-a",
    title: "SC Media — Straiker raises $64 million to secure enterprise AI agents",
    url: "https://www.scworld.com/brief/straiker-raises-64-million-to-secure-enterprise-ai-agents",
    canonicalUrl: "https://www.scworld.com/brief/straiker-raises-64-million-to-secure-enterprise-ai-agents",
    publisher: "SC Media",
    sourceType: "news",
    publishedAt: null,
    retrievedAt: CHECKED,
    volatility: "stable",
    excerpt: "Straiker raises a $64M Series A; its platform combines agent discovery, pre-deployment testing and real-time threat blocking.",
  },
  {
    id: "src-agent-s1-prompt-blog",
    title: "SentinelOne — A new chapter for AI and cybersecurity: SentinelOne acquires Prompt Security",
    url: "https://www.sentinelone.com/blog/a-new-chapter-for-ai-and-cybersecurity-sentinelone-acquires-prompt-security/",
    canonicalUrl: "https://www.sentinelone.com/blog/a-new-chapter-for-ai-and-cybersecurity-sentinelone-acquires-prompt-security/",
    publisher: "SentinelOne",
    sourceType: "vendor_marketing",
    publishedAt: null,
    retrievedAt: CHECKED,
    volatility: "moderate",
    excerpt:
      "SentinelOne says Prompt Security's agent and browser extensions discover sanctioned and shadow GenAI use, capture prompts and responses, and apply policy to redact data or block high-risk prompts.",
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

const s = Object.fromEntries(agentSecuritySources.map((x) => [x.id, x])) as Record<string, Source>;

export const agentSecurityClaims: Claim[] = [
  claim(
    "claim-agent-zenity-platform",
    "Zenity lists agent inventory, AI security posture management, runtime boundaries and AI detection and response across SaaS, cloud and endpoint agents.",
    "product",
    "zenity-platform",
    s["src-agent-zenity-platform"],
    "Publisher-reported, not tested. The MCP Security module is named without a description.",
  ),
  claim(
    "claim-agent-zenity-series-c",
    "Zenity raised a $125M Series C led by Norwest in Aug 2026.",
    "vendor",
    "zenity",
    s["src-agent-zenity-series-c"],
    "Company announcement reposted by an investor.",
    "high",
  ),
  claim(
    "claim-agent-pillar-inventory",
    "Pillar Security describes an inventory of agents, models, MCP servers and skills, and names skill and MCP poisoning among the risks it addresses.",
    "product",
    "pillar-platform",
    s["src-agent-pillar-home"],
    "Publisher-reported, not tested.",
  ),
  claim(
    "claim-agent-straiker-discover-defend",
    "Straiker's Discover AI identifies agents, MCPs and tools, and Defend AI supports an inline gateway that can block malicious agent actions.",
    "product",
    "straiker-platform",
    s["src-agent-straiker-discover"],
    "From news coverage of a vendor launch.",
  ),
  claim(
    "claim-agent-straiker-series-a",
    "Straiker raised a $64M Series A in Jun 2026.",
    "vendor",
    "straiker",
    s["src-agent-straiker-series-a"],
    "Also reported by Axios Pro and SecurityWeek.",
  ),
  claim(
    "claim-agent-prompt-security",
    "Prompt Security, now part of SentinelOne, discovers sanctioned and shadow GenAI use through an agent and browser extensions and applies redaction or blocking policy to prompts.",
    "product",
    "sentinelone-prompt-security",
    s["src-agent-s1-prompt-blog"],
    "Acquirer's description at announcement. Close date from an SEC-filing summary, not the filing itself.",
  ),
];
