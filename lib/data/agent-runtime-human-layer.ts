import type { Claim, Product, Source, Vendor } from "../schema";

// Peers around Bay (agent runtime enforcement) and GhostEye (human-layer attack simulation), 2026-11-23.
// Research candidates only. Mostly funding-announcement coverage plus a few first-party pages.
// Sharing a category with Bay or GhostEye does not make a vendor a direct competitor.
// See docs/market-research/bay-ghosteye-profiles-2026-11.md ("Others in the space").

const CHECKED = "2026-11-23";

type V = Omit<Vendor, "verificationStatus" | "formerNames" | "identityScopes"> & { identityScopes?: Vendor["identityScopes"] };
const vendor = (v: V): Vendor => ({ formerNames: [], identityScopes: ["not_an_identity_control"], verificationStatus: "research_candidate", ...v });

export const runtimeHumanVendors: Vendor[] = [
  // Agent runtime
  vendor({
    id: "manifold-security",
    slug: "manifold-security",
    name: "Manifold",
    website: "https://www.manifold.security/",
    positioning: "AI detection and response (AIDR) for agents on enterprise endpoints, especially coding agents. Founded 2025 in California by the team behind Laiyer AI, which Protect AI acquired.",
    primaryCategoryIds: ["agentic-runtime"],
    adjacentCategoryIds: ["endpoint-security", "software-supply-chain"],
    identityScopes: ["agent"],
    openQuestions: ["Detect-and-respond versus block-before-run: which actions can it stop inline?", "Manifest (agent supply chain mapping, Apr 2026) scope not checked."],
  }),
  vendor({
    id: "capsule-security",
    slug: "capsule-security",
    name: "Capsule Security",
    website: "https://www.businesswire.com/news/home/20260415670902/en/",
    positioning: "Tel Aviv startup with a runtime trust layer that checks each agent tool call and data access as it happens; publishes ClawGuard, an open-source pre-invocation checkpoint for OpenClaw.",
    primaryCategoryIds: ["agentic-runtime"],
    adjacentCategoryIds: ["mcp-security"],
    identityScopes: ["agent"],
    openQuestions: ["Company website not confirmed; the website field points to its launch press release.", "HQ is Tel Aviv per most coverage; one aggregator lists Boston.", "Coverage names Copilot Studio, ServiceNow and Agentforce support; full platform list not checked."],
  }),
  vendor({
    id: "air-security",
    slug: "air-security",
    name: "AIR Security",
    website: "https://www.newswire.com/news/air-emerges-from-stealth-with-50m-to-build-a-firewall-for-agents-22853509",
    positioning: "New York startup building an inline firewall between agents and the skills, plugins and MCP servers they pull in; screens what enters an agent's context and blocks untrusted tools at runtime.",
    primaryCategoryIds: ["mcp-security"],
    adjacentCategoryIds: ["agentic-runtime"],
    identityScopes: ["agent"],
    openQuestions: ["Company website not confirmed; the website field points to its launch press release.", "Founded Feb 2026; customer count (20+) is vendor-reported."],
  }),
  vendor({
    id: "kontext-security",
    slug: "kontext-security",
    name: "Kontext Security",
    website: "https://www.htgf.de/en/kontext-raises-4m-to-stop-ai-agents-from-going-rogue-at-work/",
    positioning: "Munich startup whose runtime platform sits between agents and the tools they use, judging each action by agent identity, task, target and request, with an observe-first then enforce rollout.",
    primaryCategoryIds: ["agentic-runtime"],
    adjacentCategoryIds: ["agent-identity"],
    identityScopes: ["agent"],
    openQuestions: ["Company website not confirmed; the website field points to an investor announcement. Legal entity per one aggregator: Cobrowser Technology GmbH.", "Reported as $4M or EUR 3.5M depending on the outlet."],
  }),
  // Human layer
  vendor({
    id: "adaptive-security",
    slug: "adaptive-security",
    name: "Adaptive Security",
    website: "https://www.adaptivesecurity.com/",
    positioning: "New York company (launched 2023) running deepfake persona simulations over voice, SMS and email, triage of reported messages and per-person risk scoring. Backed by a16z and the OpenAI Startup Fund.",
    primaryCategoryIds: ["security-awareness"],
    adjacentCategoryIds: ["email-security"],
    openQuestions: ["The 100+ customer figure dates from Apr 2025.", "Not the same company as Adaptive Shield (SSPM), which is a separate record."],
  }),
  vendor({
    id: "jericho-security",
    slug: "jericho-security",
    name: "Jericho Security",
    website: "https://www.jerichosecurity.com/",
    positioning: "New York company using agentic AI to run personalized phishing, SMS, voice and video simulations, with generated training and a phishing triage center. Holds a $1.8M AFWERX contract.",
    primaryCategoryIds: ["security-awareness"],
    adjacentCategoryIds: ["email-security"],
    openQuestions: ["Coverage conflicts on whether deepfake voice/video is for simulation only or also detection.", "No commercial customers named."],
  }),
  vendor({
    id: "hoxhunt",
    slug: "hoxhunt",
    name: "Hoxhunt",
    website: "https://hoxhunt.com/",
    positioning: "Established human risk management platform (conceived 2016, 200+ employees): adaptive, gamified phishing training, behavior risk analytics and automated handling of user-reported threats.",
    primaryCategoryIds: ["security-awareness"],
    adjacentCategoryIds: ["email-security"],
    openQuestions: ["Deepfake simulation coverage comes from Hoxhunt's own comparison blog; scope by edition not checked."],
  }),
];

type P = Omit<Product, "useCaseIds" | "identityScopes"> & { identityScopes?: Product["identityScopes"] };
const product = (p: P): Product => ({ useCaseIds: [], identityScopes: ["not_an_identity_control"], ...p });

export const runtimeHumanProducts: Product[] = [
  product({ id: "manifold-aidr", slug: "manifold-aidr", vendorId: "manifold-security", name: "Manifold AIDR", positioning: "Real-time map of agents on endpoints with the tools they call, systems they reach and actions they take; quarantine, remediate or terminate rogue agents.", primaryCategoryIds: ["agentic-runtime"], adjacentCategoryIds: ["endpoint-security"], deployment: ["unknown"], identityScopes: ["agent"], availability: "generally_available", availabilityNote: "Seed-stage product; availability stage not stated in coverage.", officialUrl: "https://www.manifold.security/" }),
  product({ id: "capsule-runtime", slug: "capsule-runtime", vendorId: "capsule-security", name: "Capsule runtime platform and ClawGuard", positioning: "Evaluates every tool invocation and data access inside the agent's execution path; maps agent use through EDR and identity-provider integrations. ClawGuard is the open-source enforcer.", primaryCategoryIds: ["agentic-runtime"], adjacentCategoryIds: ["mcp-security"], deployment: ["saas", "open_source"], identityScopes: ["agent"], availability: "generally_available", availabilityNote: "Launched from stealth 15 Apr 2026.", officialUrl: "https://helpnetsecurity.com/2026/04/15/capsule-security-platform/" }),
  product({ id: "air-agent-firewall", slug: "air-agent-firewall", vendorId: "air-security", name: "AIR inline agent firewall", positioning: "Discovers agents across endpoints, cloud and SaaS, re-checks their components over time, blocks untrusted tools and injected instructions, and offers a marketplace of pre-cleared add-ons.", primaryCategoryIds: ["mcp-security"], adjacentCategoryIds: ["agentic-runtime"], deployment: ["unknown"], identityScopes: ["agent"], availability: "generally_available", availabilityNote: "Live at the 1 Sep 2026 launch per coverage.", officialUrl: "https://siliconangle.com/?p=840154" }),
  product({ id: "kontext-runtime", slug: "kontext-runtime", vendorId: "kontext-security", name: "Kontext runtime enforcement", positioning: "Policy decision per agent action using identity, task, resource and requested action; observe mode first, then enforce mode to deny unauthorized actions; keeps a decision record.", primaryCategoryIds: ["agentic-runtime"], adjacentCategoryIds: ["agent-identity"], deployment: ["unknown"], identityScopes: ["agent"], availability: "unknown", availabilityNote: "Seed-stage launch 24 Sep 2026; availability not stated.", officialUrl: "https://www.securityweek.com/kontext-security-emerges-with-4-million-for-ai-agent-runtime-controls/amp/" }),
  product({ id: "adaptive-platform", slug: "adaptive-platform", vendorId: "adaptive-security", name: "Adaptive Security platform", positioning: "Deepfake persona simulations across voice, SMS and email, real-time triage that scores reported messages, and AI risk scoring that updates with each interaction.", primaryCategoryIds: ["security-awareness"], adjacentCategoryIds: ["email-security"], deployment: ["saas"], availability: "generally_available", availabilityNote: "Commercial since 2023.", officialUrl: "https://www.adaptivesecurity.com/blog/43-million-funding-announcement" }),
  product({ id: "jericho-platform", slug: "jericho-platform", vendorId: "jericho-security", name: "Jericho Security platform", positioning: "AI-generated email, SMS, voice and video simulations personalized by role and past responses, generated micro-training, and a phishing triage center.", primaryCategoryIds: ["security-awareness"], adjacentCategoryIds: ["email-security"], deployment: ["saas"], availability: "generally_available", availabilityNote: "Self-serve sign-up with a seven-day trial for SMBs per 2025 coverage; freemium tier also reported.", officialUrl: "https://www.carahsoft.com/jericho-security/solutions" }),
  product({ id: "hoxhunt-hrm", slug: "hoxhunt-hrm", vendorId: "hoxhunt", name: "Hoxhunt Human Risk Management Platform", positioning: "Adaptive phishing training, behavior risk console and automated remediation of user-reported threats in one platform.", primaryCategoryIds: ["security-awareness"], adjacentCategoryIds: ["email-security"], deployment: ["saas"], availability: "generally_available", availabilityNote: "Platform launched as HRM in Feb 2023.", officialUrl: "https://hoxhunt.com/ai-info-page" }),
];

const src = (x: Omit<Source, "canonicalUrl" | "retrievedAt">): Source => ({ ...x, canonicalUrl: x.url, retrievedAt: CHECKED });

export const runtimeHumanSources: Source[] = [
  src({ id: "src-rh-manifold-securityweek", title: "SecurityWeek — Manifold raises $8 million for AI detection and response", url: "https://www.securityweek.com/manifold-raises-8-million-for-ai-detection-and-response/", publisher: "SecurityWeek", sourceType: "news", publishedAt: "2026-03-18", volatility: "moderate", excerpt: "Manifold, founded 2025 in California, raised an $8M seed led by Costanoa with Cherry Ventures and Rain Capital; it maps agents' tools, systems and actions and can quarantine or terminate rogue agents." }),
  src({ id: "src-rh-capsule-hns", title: "Help Net Security — Capsule Security debuts with $7 million funding", url: "https://helpnetsecurity.com/2026/04/15/capsule-security-platform/", publisher: "Help Net Security", sourceType: "news", publishedAt: "2026-04-15", volatility: "moderate", excerpt: "Capsule launches with a $7M seed led by Lama Partners and Forgepoint Capital International, plus ClawGuard, an open-source enforcer adding a checkpoint before agents run tool calls." }),
  src({ id: "src-rh-air-siliconangle", title: "SiliconANGLE — AIR Security launches with $50M to build a firewall for AI agents", url: "https://siliconangle.com/?p=840154", publisher: "SiliconANGLE", sourceType: "news", publishedAt: "2026-09-01", volatility: "moderate", excerpt: "AIR Security launches with $50M across a Sequoia-led $10M round and a Greenoaks-led $40M round, to screen skills, plugins and MCP servers entering agents' context and block untrusted ones at runtime." }),
  src({ id: "src-rh-kontext-securityweek", title: "SecurityWeek — Kontext Security emerges with $4 million for AI agent runtime controls", url: "https://www.securityweek.com/kontext-security-emerges-with-4-million-for-ai-agent-runtime-controls/amp/", publisher: "SecurityWeek", sourceType: "news", publishedAt: null, volatility: "moderate", excerpt: "Munich-based Kontext raised $4M led by 42CAP with a16z CSX and HTGF; its platform sits between agents and tools and evaluates actions in real time, starting in observe mode before enforcing." }),
  src({ id: "src-rh-kontext-htgf", title: "HTGF — Kontext raises $4M to stop AI agents from going rogue at work", url: "https://www.htgf.de/en/kontext-raises-4m-to-stop-ai-agents-from-going-rogue-at-work/", publisher: "High-Tech Gruenderfonds (investor)", sourceType: "press_release", publishedAt: "2026-09-24", volatility: "stable", excerpt: "Investor-published announcement of Kontext's $4M round led by 42CAP with a16z CSX and HTGF, to grow engineering and its runtime enforcement platform." }),
  src({ id: "src-rh-adaptive-blog", title: "Adaptive Security — We've raised $43M from a16z and the OpenAI Startup Fund", url: "https://www.adaptivesecurity.com/blog/43-million-funding-announcement", publisher: "Adaptive Security", sourceType: "press_release", publishedAt: "2025-04-02", volatility: "stable", excerpt: "Company post on its $43M round led by a16z and the OpenAI Startup Fund, describing deepfake persona simulations over voice, SMS and email, reported-message triage and AI risk scoring." }),
  src({ id: "src-rh-adaptive-extension", title: "SiliconANGLE — AI phishing simulation startup Adaptive Security gets OpenAI funding boost", url: "https://siliconangle.com/2025/09/09/ai-phishing-simulation-startup-adaptive-security-gets-openai-funding-boost/", publisher: "SiliconANGLE", sourceType: "news", publishedAt: "2025-09-09", volatility: "stable", excerpt: "Adaptive adds a further OpenAI Startup Fund investment, bringing total raised to $55M." }),
  src({ id: "src-rh-jericho-venturebeat", title: "VentureBeat — Jericho Security raises $15M to stop deepfake fraud", url: "https://venturebeat.com/ai/is-that-really-your-boss-calling-jericho-security-raises-15m-to-stop-deepfake-fraud-thats-cost-businesses-200m-in-2025-alone", publisher: "VentureBeat", sourceType: "news", publishedAt: "2025-04-24", volatility: "stable", excerpt: "New York-based Jericho raises a $15M Series A led by Era Fund; agentic simulations span email, text, voice and video; it holds a $1.8M AFWERX contract." }),
  src({ id: "src-rh-jericho-carahsoft", title: "Carahsoft — Jericho Security product overview", url: "https://www.carahsoft.com/jericho-security/solutions", publisher: "Carahsoft (reseller)", sourceType: "vendor_marketing", publishedAt: null, volatility: "moderate", excerpt: "Reseller overview lists AI-generated email, SMS and voice simulations, generated job-specific training, and an AI-driven phishing triage center." }),
  src({ id: "src-rh-hoxhunt-info", title: "Hoxhunt — company information page", url: "https://hoxhunt.com/ai-info-page", publisher: "Hoxhunt", sourceType: "vendor_marketing", publishedAt: null, volatility: "moderate", excerpt: "Hoxhunt describes a human risk management platform combining awareness training, behavioral risk analytics and automated threat remediation, with 200+ employees." }),
];

function claim(id: string, statement: string, subjectType: Claim["subjectType"], subjectId: string, source: Source, notes: string, confidence: Claim["confidence"] = "medium"): Claim {
  return {
    id, statement, subjectType, subjectId, capabilityId: null, polarity: "asserts",
    sourceId: source.id, sourceUrl: source.url, sourceType: source.sourceType, publishedAt: source.publishedAt,
    observedAt: CHECKED, effectiveFrom: null, effectiveTo: null, confidence,
    verificationStatus: source.sourceType === "news" || source.sourceType === "review" ? "needs_review" : "vendor_published",
    lastCheckedAt: CHECKED, conflictsWith: [], notes,
  };
}

const s = Object.fromEntries(runtimeHumanSources.map((x) => [x.id, x])) as Record<string, Source>;

export const runtimeHumanClaims: Claim[] = [
  claim("claim-rh-manifold-seed", "Manifold raised an $8M seed led by Costanoa Ventures in Mar 2026.", "vendor", "manifold-security", s["src-rh-manifold-securityweek"], "Funding announcement coverage."),
  claim("claim-rh-manifold-aidr", "Manifold maps agents on endpoints with the tools they call, systems they access and actions they take, and lets teams quarantine, remediate or terminate rogue agents.", "product", "manifold-aidr", s["src-rh-manifold-securityweek"], "Vendor description reported in news."),
  claim("claim-rh-capsule-seed", "Capsule Security launched from stealth in Apr 2026 with a $7M seed led by Lama Partners and Forgepoint Capital International.", "vendor", "capsule-security", s["src-rh-capsule-hns"], "Funding announcement coverage."),
  claim("claim-rh-capsule-clawguard", "Capsule publishes ClawGuard, an open-source enforcer that adds a checkpoint before agents execute tool calls.", "product", "capsule-runtime", s["src-rh-capsule-hns"], "From launch coverage."),
  claim("claim-rh-air-launch", "AIR Security launched in Sep 2026 with $50M: a $10M round led by Sequoia and a $40M round led by Greenoaks.", "vendor", "air-security", s["src-rh-air-siliconangle"], "Founders are Unit 8200 alumni; about 40 employees per coverage."),
  claim("claim-rh-air-firewall", "AIR Security screens the skills, plugins and MCP servers entering an agent's context and blocks untrusted tools and injected instructions at runtime.", "product", "air-agent-firewall", s["src-rh-air-siliconangle"], "From launch coverage."),
  claim("claim-rh-kontext-seed", "Kontext Security, based in Munich, announced $4M led by 42CAP with a16z CSX and HTGF on 24 Sep 2026.", "vendor", "kontext-security", s["src-rh-kontext-htgf"], "Investor-published release.", "high"),
  claim("claim-rh-kontext-modes", "Kontext evaluates each agent action against policy in real time, running first in observe mode and then in enforce mode to deny unauthorized actions.", "product", "kontext-runtime", s["src-rh-kontext-securityweek"], "From launch coverage."),
  claim("claim-rh-adaptive-funding", "Adaptive Security raised $43M led by a16z and the OpenAI Startup Fund in Apr 2025, OpenAI's first cybersecurity investment.", "vendor", "adaptive-security", s["src-rh-adaptive-blog"], "Company announcement.", "high"),
  claim("claim-rh-adaptive-extension", "A further OpenAI Startup Fund investment in Sep 2025 brought Adaptive Security's total raised to $55M.", "vendor", "adaptive-security", s["src-rh-adaptive-extension"], "News coverage; the added amount was not disclosed."),
  claim("claim-rh-adaptive-product", "Adaptive combines deepfake persona simulations across voice, SMS and email with triage of reported messages and per-person AI risk scoring.", "product", "adaptive-platform", s["src-rh-adaptive-blog"], "Publisher-reported."),
  claim("claim-rh-jericho-funding", "Jericho Security raised a $15M Series A led by Era Fund in Apr 2025 and holds a $1.8M AFWERX contract.", "vendor", "jericho-security", s["src-rh-jericho-venturebeat"], "News coverage."),
  claim("claim-rh-jericho-product", "Jericho's platform generates email, SMS and voice simulations, job-specific micro-training and an AI phishing triage center.", "product", "jericho-platform", s["src-rh-jericho-carahsoft"], "Reseller-published overview."),
  claim("claim-rh-hoxhunt-hrm", "Hoxhunt describes a human risk management platform that combines awareness training, behavioral risk analytics and automated threat remediation.", "product", "hoxhunt-hrm", s["src-rh-hoxhunt-info"], "Publisher-reported."),
];
