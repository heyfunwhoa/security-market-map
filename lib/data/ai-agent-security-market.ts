import type { CatalogEvent, Claim, Source, Vendor } from "../schema";

// AI agent security market structure, 2026-11-25. Research candidates only.
// Adds platform moves (CrowdStrike–Zscaler, Palo Alto Cortex Agentic Endpoint Security), two vendors
// (Backslash Security, WitnessAI) and a second source on Bay. No direct-competitor or parity claims:
// a competitor list published by a news outlet or a rival vendor is recorded as what that source said.
// See docs/market-research/ai-agent-security-market-structure-2026-11.md.

const CHECKED = "2026-11-25";

type V = Omit<Vendor, "verificationStatus" | "formerNames" | "identityScopes"> & { identityScopes?: Vendor["identityScopes"] };
const vendor = (v: V): Vendor => ({ formerNames: [], identityScopes: ["agent"], verificationStatus: "research_candidate", ...v });

export const aiAgentMarketVendors: Vendor[] = [
  vendor({
    id: "backslash-security",
    slug: "backslash-security",
    name: "Backslash Security",
    website: "https://www.backslash.security/",
    positioning:
      "Backslash markets security for the agents on developer and workforce devices (Claude Code, Cursor, Codex, GitHub Copilot) and for the MCP servers, skills, plugins, hooks, rules and local models that shape what those agents do.",
    primaryCategoryIds: ["agentic-runtime"],
    adjacentCategoryIds: ["endpoint-security", "mcp-security"],
    openQuestions: [
      "Positioning is taken from the vendor's own comparison post, which ranks Backslash first; treat it as vendor-published.",
      "Funding, customers and on-device enforcement depth were not checked on an independent source.",
    ],
  }),
  vendor({
    id: "witnessai",
    slug: "witnessai",
    name: "WitnessAI",
    website: "https://techcrunch.com/2026/01/19/rogue-agents-and-shadow-ai-why-vcs-are-betting-big-on-ai-security/",
    positioning:
      "WitnessAI markets AI security and governance for the enterprise: detecting employee use of unapproved AI tools, blocking attacks on AI use and supporting compliance, now extended to agents.",
    primaryCategoryIds: ["ai-governance"],
    adjacentCategoryIds: ["ai-data-security", "agentic-runtime"],
    identityScopes: ["not_an_identity_control"],
    openQuestions: [
      "Company website not confirmed from this session; the website field points to news coverage.",
      "Round size ($58M) is from TechCrunch; the Series B label and investor list come from a secondary roundup and are not adopted here.",
    ],
  }),
];

const src = (x: Omit<Source, "canonicalUrl" | "retrievedAt">): Source => ({ ...x, canonicalUrl: x.url, retrievedAt: CHECKED });

export const aiAgentMarketSources: Source[] = [
  src({
    id: "src-aim-crowdstrike-zscaler",
    title: "CrowdStrike — CrowdStrike to acquire Zscaler, bringing network security and zero trust to the Falcon platform",
    url: "https://ir.crowdstrike.com/news-releases/news-release-details/crowdstrike-acquire-zscaler-bringing-network-security-and-zero",
    publisher: "CrowdStrike (investor relations)",
    sourceType: "press_release",
    publishedAt: "2026-11-23",
    volatility: "moderate",
    excerpt:
      "All-stock deal valuing Zscaler at about $43.9B enterprise value, expected to close in the second half of CrowdStrike's fiscal 2028. The release frames it as Zero Trust for AI safety, with Zscaler sitting inline between every user, agent and application.",
  }),
  src({
    id: "src-aim-panw-endpoint-ai",
    title: "Palo Alto Networks blog — Securing AI tools at the endpoint",
    url: "https://www.paloaltonetworks.com/blog/ai-security/securing-ai-tools-at-the-endpoint/",
    publisher: "Palo Alto Networks",
    sourceType: "vendor_marketing",
    publishedAt: "2026-11-24",
    volatility: "fast",
    excerpt:
      "Cortex Agentic Endpoint Security, integrated with Prisma AIRS, discovers and controls AI agents on the device and inspects prompts, MCP tool calls and web requests in real time; names Cursor, Claude Code, Codex and MCP servers.",
  }),
  src({
    id: "src-aim-backslash-endpoint",
    title: "Backslash Security — Top 7 agentic endpoint security companies CISOs should evaluate in 2026",
    url: "https://www.backslash.security/blog/top-7-agentic-endpoint-security-companies",
    publisher: "Backslash Security",
    sourceType: "vendor_marketing",
    publishedAt: "2026-10-01",
    volatility: "fast",
    excerpt:
      "Vendor comparison post listing Backslash, Palo Alto Networks (Prisma AIRS Agent Security, from Koi), SentinelOne (Prompt Security), Neo Security, AIR Security, Glow and Zenity as agentic endpoint security vendors.",
  }),
  src({
    id: "src-aim-witnessai-techcrunch",
    title: "TechCrunch — Rogue agents and shadow AI: why VCs are betting big on AI security",
    url: "https://techcrunch.com/2026/01/19/rogue-agents-and-shadow-ai-why-vcs-are-betting-big-on-ai-security/",
    publisher: "TechCrunch",
    sourceType: "news",
    publishedAt: "2026-01-19",
    volatility: "moderate",
    excerpt:
      "WitnessAI raised $58M; it detects employee use of unapproved AI tools, blocks attacks and supports compliance. The piece quotes an analyst forecast of an $800B to $1.2T AI security software market by 2031.",
  }),
  src({
    id: "src-aim-bay-tnw",
    title: "TNW — Bay raises $50m for AI agent security after nine months in stealth",
    url: "https://thenextweb.com/news/bay-50m-ai-agent-security-stealth-battery-ventures",
    publisher: "TNW",
    sourceType: "news",
    publishedAt: "2026-11-10",
    volatility: "moderate",
    excerpt:
      "Bay vets each proposed agent action against the session and decides locally; installs in under five minutes with no permanent endpoint agent, kernel driver or proxy. Investors include Battery, YL, Striker, Micron Ventures and M12. Names Zenity, Straiker, NeuralTrust and Asymptote Labs as companies in the space.",
  }),
];

const s = Object.fromEntries(aiAgentMarketSources.map((x) => [x.id, x])) as Record<string, Source>;

function claim(id: string, statement: string, subjectType: Claim["subjectType"], subjectId: string, source: Source, notes: string, confidence: Claim["confidence"] = "medium"): Claim {
  return {
    id, statement, subjectType, subjectId, capabilityId: null, polarity: "asserts",
    sourceId: source.id, sourceUrl: source.url, sourceType: source.sourceType, publishedAt: source.publishedAt,
    observedAt: CHECKED, effectiveFrom: null, effectiveTo: null, confidence,
    verificationStatus: source.sourceType === "news" || source.sourceType === "review" ? "needs_review" : "vendor_published",
    lastCheckedAt: CHECKED, conflictsWith: [], notes,
  };
}

export const aiAgentMarketClaims: Claim[] = [
  claim("claim-aim-crowdstrike-zscaler", "CrowdStrike announced an all-stock agreement to acquire Zscaler at about $43.9B enterprise value on 23 Nov 2026, expected to close in the second half of its fiscal 2028.", "vendor", "crowdstrike", s["src-aim-crowdstrike-zscaler"], "Acquirer press release. Pending; not closed.", "high"),
  claim("claim-aim-crowdstrike-zscaler-ai", "CrowdStrike says that after closing it will offer Zscaler's Zero Trust SASE, security for AI and data protection as part of the Falcon platform, positioning the deal around securing AI agents' connections.", "vendor", "crowdstrike", s["src-aim-crowdstrike-zscaler"], "Stated rationale, not delivered capability."),
  claim("claim-aim-panw-aes", "Palo Alto Networks describes Cortex Agentic Endpoint Security integrated with Prisma AIRS to discover and control AI agents on endpoints, including Cursor, Claude Code, Codex and MCP servers.", "vendor", "palo-alto-networks", s["src-aim-panw-endpoint-ai"], "Vendor blog, 24 Nov 2026. Edition and licensing not checked."),
  claim("claim-aim-backslash-scope", "Backslash says it secures agents on developer and workforce devices and the MCP servers, skills, plugins, hooks, rules and local models around them.", "vendor", "backslash-security", s["src-aim-backslash-endpoint"], "Vendor-published comparison post."),
  claim("claim-aim-witnessai-round", "WitnessAI raised $58M; it detects employee use of unapproved AI tools, blocks attacks and supports compliance.", "vendor", "witnessai", s["src-aim-witnessai-techcrunch"], "News coverage, Jan 2026."),
  claim("claim-aim-bay-no-agent", "Bay says it installs across devices, cloud infrastructure and SaaS apps in under five minutes with no permanent endpoint agent, kernel driver or network proxy.", "vendor", "bay-security", s["src-aim-bay-tnw"], "Vendor statement reported in launch coverage. Compare with Bay Enforcer, described elsewhere as a static binary on the device."),
  claim("claim-aim-bay-m12", "TNW lists M12, Microsoft's venture fund, among Bay's investors alongside Battery Ventures, YL Ventures, Striker and Micron Ventures.", "vendor", "bay-security", s["src-aim-bay-tnw"], "M12 does not appear in the earlier recorded sources."),
];

export const aiAgentMarketEvents: CatalogEvent[] = [
  {
    id: "evt-crowdstrike-zscaler-agree",
    vendorId: "crowdstrike",
    date: "2026-11-23",
    kind: "acquisition",
    title: "CrowdStrike agrees to acquire Zscaler",
    summary: "All-stock deal at about $43.9B enterprise value, framed around securing AI agents' connections. Expected to close in the second half of CrowdStrike's fiscal 2028; not closed.",
    sourceId: "src-aim-crowdstrike-zscaler",
  },
  {
    id: "evt-panw-agentic-endpoint",
    vendorId: "palo-alto-networks",
    date: "2026-11-24",
    kind: "availability_note",
    title: "Cortex Agentic Endpoint Security extended with Prisma AIRS for AI tools on endpoints",
    summary: "Vendor blog describes on-device discovery and control of coding agents (Cursor, Claude Code, Codex) and MCP servers. Rival coverage attributes the agentic endpoint capability to Palo Alto's 2026 Koi acquisition; that acquisition is not separately sourced here.",
    sourceId: "src-aim-panw-endpoint-ai",
  },
];
