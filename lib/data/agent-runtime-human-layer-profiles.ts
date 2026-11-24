import type { CatalogEvent, Claim, Source, Vendor } from "../schema";
import {
  runtimeHumanClaims as baseClaims,
  runtimeHumanProducts,
  runtimeHumanSources as baseSources,
  runtimeHumanVendors as baseVendors,
} from "./agent-runtime-human-layer";

// Profile depth for the Bay and GhostEye neighbors (2026-11-23): founders, HQ, funding history,
// named customers and launch events. Applied on top of ./agent-runtime-human-layer.ts.
// Research candidates only. Where outlets disagree the vendor's openQuestions say so.

const CHECKED = "2026-11-23";

type Patch = Partial<Pick<Vendor, "positioning" | "website" | "openQuestions">>;

const patches: Record<string, Patch> = {
  "manifold-security": {
    positioning:
      "California AIDR startup (2025), CEO Neal Swaelens. Maps agents on endpoints, especially coding agents and tools like Claude Cowork and OpenClaw, with their tools, MCP servers, databases and actions, flags anomalies and can quarantine or terminate agents. $8M seed led by Costanoa (Mar 2026).",
    openQuestions: [
      "Co-founders other than the CEO are not named in the sources reviewed.",
      "No customers named. Detect-and-respond versus inline blocking is not specified.",
      "Manifest (agent supply chain mapping, Apr 2026) scope not checked.",
    ],
  },
  "capsule-security": {
    positioning:
      "Tel Aviv startup, CEO Naor Paz. Runtime trust layer that checks each agent tool call and data access inside the execution path, with no proxy, gateway or SDK; coverage reports name Copilot Studio, ServiceNow and Agentforce. Publishes open-source ClawGuard. $7M seed (Apr 2026); advisers include Chris Krebs.",
    openQuestions: [
      "Company website not confirmed; the website field points to its launch press release.",
      "HQ is Tel Aviv per most coverage; one aggregator lists Boston.",
      "The press release says Gartner lists Capsule as a representative vendor for guardian agents; the Gartner document was not checked.",
    ],
  },
  "air-security": {
    positioning:
      "New York company founded Feb 2026 by Unit 8200 veterans Yair Saban (CEO) and Niv Hoffman (CTO); former Disney and Costco CISO Ryan Knisley is Chief Strategy Officer. Inline firewall that vets skills, plugins, sub-agents and MCP servers before and after install and blocks what enters an agent's context. $50M across two seed rounds (Sep 2026); about 40 employees.",
    openQuestions: [
      "Company website not confirmed; the website field points to its launch press release.",
      "Round is described as two seed rounds ($10M Sequoia-led, $40M Greenoaks-led) and in some outlets as one $50M seed.",
      "Customer count (20+) is vendor-reported; no customers named.",
    ],
  },
  "kontext-security": {
    positioning:
      "Munich company (Cobrowser Technology GmbH per one aggregator) founded by Jens Ernstberger (CEO, doctorate in cryptography) and Michel Osswald. Task-aware runtime authorization between agents and tools: each action is judged by agent identity, assigned task, resource and request, observe-first then enforce, with short-lived credentials brokered so secrets stay out of agent environments. $4M led by 42CAP (Sep 2026).",
    openQuestions: [
      "Company website not confirmed; the website field points to an investor announcement.",
      "Reported as $4M or EUR 3.5M depending on the outlet.",
      "Credential brokering is described by an aggregator, not a first-party page.",
    ],
  },
  "asymptote-labs": {
    positioning:
      "New York startup (2025) founded by Justin D'Souza (CEO) and Shukan Shah (CTO), backed through South Park Commons. Beacon (MIT, Go, May 2026) records agent activity from 23+ harnesses including Claude Code, Codex and Cursor into one OpenTelemetry-based schema; a paid platform adds detection and blocking. $5.5M seed led by Tower Research Ventures (Oct 2026).",
    openQuestions: [
      "Website domain from a tools directory, not a first-party page.",
      "No customers named; Tower Research's own security team is evaluating Beacon.",
      "SOC 2 Type II (Aug 2026) is reported by a directory only.",
    ],
  },
  "rein-security": {
    positioning:
      "New York and Tel Aviv company (2024), CEO Matan Bar-Efrat. Launched in Jan 2026 with $8M for application runtime security (API security, SCA reachability), then extended its patented sidecar to where AI agents execute, plus agent supply chain security. $25M Series A co-led by Glilot and Sienna (Oct 2026), $35M total. Names Lemonade and Dun & Bradstreet.",
    openQuestions: [
      "Sidecar deployment model and supported runtimes not checked.",
      "Customer outcomes are vendor-reported.",
    ],
  },
  "geordie-ai": {
    positioning:
      "London company (2025) founded by Henry Comfort (CEO), Benji Weber (CTO, ex-Snyk) and Hanah-Marie Darley (Chief AI Officer). Independent security and governance view of agents across cloud, code and endpoint, plus Beam runtime remediation. $6.5M seed, then a $30M Series A led by Balderton with Crosspoint, General Catalyst and Ten Eleven (May 2026); Owkin is a named customer.",
    openQuestions: [
      "Company website not confirmed; the website field points to its lead investor's announcement.",
      "Total raised is $36.5M per SecurityWeek and $43M per one aggregator; post-money valuation ($155M) is aggregator-reported.",
    ],
  },
  arcjet: {
    positioning:
      "San Francisco developer security company founded 2023 by David Mytton (previously Server Density and Console.dev). SDKs run bot detection, rate limits, prompt-injection checks and data redaction in code; Guards (May 2026) and agent runtime security (Sep 2026) extend that into agent tool handlers and workflows. $3.6M seed led by a16z (Sep 2024) and $8.3M Series A led by Plural (Oct 2025), about $12M total.",
    openQuestions: [
      "The coding-agent runtime announcement was seen only via a social post; confirm on a first-party page.",
      "One aggregator lists $20.6M total; most coverage says $12M.",
    ],
  },
  "eve-security": {
    website: "https://eve.security/",
    positioning:
      "Austin company founded 2025 by Nadav Cornberg (CEO), Sharon Eilon (CRO) and Amit Eliav (CTO). Runtime layer that turns security policy into deterministic enforcement for agents on Databricks, Copilot Studio, AgentCore, Bedrock and Glean. $3M seed (LiveOak, Tau, Sep 2025) extended by $4.5M led by Run Ventures (Sep 2026) to $7.5M.",
    openQuestions: [
      "Website and founder names come from a funding-news site and aggregators, not a first-party page.",
      "No customers named.",
    ],
  },
  codeintegrity: {
    positioning:
      "Founded May 2024 near Seattle by Steven Jung (CEO) and Abi Raghuram (CTO, ex-Truveta); now San Francisco. Deterministic runtime control layer that limits which systems and data an agent can reach. The Economist cited its sub-four-hour compromise of Notion's AI features. $5M seed led by Syn Ventures, $5.25M total; piloting with regulated companies.",
    openQuestions: [
      "Company website not confirmed; the website field points to funding coverage.",
      "Round is $5M in the article body and $4.8M in its URL and some outlets.",
    ],
  },
  "adaptive-security": {
    positioning:
      "New York company founded by Brian Long (CEO) and Andrew Jones (CPO), co-founders of Attentive and TapCommerce. Deepfake persona simulations over voice, SMS, email and video, reported-message triage and risk scoring, since expanded to agentic email security and AI governance. $43M Series A (a16z, OpenAI Startup Fund) grew to $55M; $81M Series B led by Bain Capital Ventures (Dec 2025), $146.5M total.",
    openQuestions: [
      "Customer count is vendor-reported and has moved fast: 100+ (Apr 2025), 500+ (Dec 2025), 2,000+ (current About page).",
      "Not the same company as Adaptive Shield (SSPM), which is a separate record.",
    ],
  },
  "jericho-security": {
    positioning:
      "New York company (2023), CEO Sage Wohns. Agentic AI runs personalized phishing, SMS, voice and video simulations, generates role-specific training and triages reported phishing. $15M Series A led by Era Fund (Apr 2025) and a $1.8M AFWERX contract.",
    openQuestions: [
      "Co-founders beyond the CEO come from an aggregator only.",
      "Coverage conflicts on whether deepfake voice/video is for simulation only or also detection.",
      "No commercial customers named.",
    ],
  },
  hoxhunt: {
    positioning:
      "Helsinki company founded 2016 by Mika Aalto (CEO), Pyry Åvist (CTO) and two other co-founders. Adaptive, gamified phishing training that rewards reporting, behavior risk analytics, automated handling of reported threats and, more recently, deepfake simulations. $40M Series B led by Level Equity (May 2022), about $43M total; 200+ employees.",
    openQuestions: [
      "No funding after 2022 found.",
      "Deepfake simulation coverage comes from Hoxhunt's own comparison blog; scope by edition not checked.",
    ],
  },
  doppel: {
    positioning:
      "Social engineering defense platform founded by Kevin Tian (CEO) and Rahul Madduluri (CTO): brand and executive protection, takedowns, human risk management with Simulation, and email security. $70M Series C led by Bessemer (Nov 2025) at a valuation above $600M, $124M total.",
    openQuestions: [
      "HQ not confirmed from a first-party page.",
      "Brand protection and email security sides are not profiled here.",
    ],
  },
  "brightside-ai": {
    positioning:
      "Swiss company (Brightside Technologies SA, Prilly/Lausanne, 2023), CEO Andrey Suzdaltsev and COO Andrey Lazarev. OSINT-personalized phishing, live AI vishing with voice cloning, consent-based deepfake video, and digital footprint monitoring. $1M from Social Links (Nov 2023); Tech4Trust accelerator; selling through MSSP partners.",
    openQuestions: ["Small team (under 12 per aggregators); no named customers."],
  },
  "breacher-ai": {
    positioning:
      "Orlando company (Breacher.ai Corp), founder and CEO Jason Thatcher. Red-team style deepfake social engineering: agentic voice, live deepfake video in meeting apps and help-desk verification tests, sold self-serve from $199/month, as managed engagements and white-label through MSSPs.",
    openQuestions: [
      "Sources are mostly the company's own press releases.",
      "Funding and customers not found.",
    ],
  },
};

export const runtimeHumanVendors: Vendor[] = baseVendors.map((v) => ({ ...v, ...(patches[v.id] ?? {}) }));
export { runtimeHumanProducts };

const src = (x: Omit<Source, "canonicalUrl" | "retrievedAt">): Source => ({ ...x, canonicalUrl: x.url, retrievedAt: CHECKED });

const extraSources: Source[] = [
  src({ id: "src-rhp-capsule-bw", title: "Business Wire — Capsule Security exits stealth with $7M", url: "https://www.businesswire.com/news/home/20260415670902/en/", publisher: "Capsule Security (press release)", sourceType: "press_release", publishedAt: "2026-04-15", volatility: "stable", excerpt: "Release says Capsule stops malicious actions and tool abuse across agent platforms without proxies, gateways or SDKs, and calls it a representative vendor in Gartner's guardian agents market guide." }),
  src({ id: "src-rhp-capsule-scmedia", title: "SC Media — Capsule Security launches with $7 million to secure AI agents", url: "https://www.scworld.com/brief/capsule-security-launches-with-7-million-to-secure-ai-agents", publisher: "SC Media", sourceType: "news", publishedAt: null, volatility: "moderate", excerpt: "Brief says Capsule's platform enforces guardrails between prompt and action and supports Copilot Studio, ServiceNow and Agentforce without proxies or gateways." }),
  src({ id: "src-rhp-air-techcrunch", title: "TechCrunch — AIR raises $50M to help companies vet the skills and add-ons AI agents use", url: "https://techcrunch.com/?p=3159543", publisher: "TechCrunch", sourceType: "news", publishedAt: "2026-09-01", volatility: "moderate", excerpt: "Unit 8200 veterans Yair Saban (CEO) and Niv Hoffman (CTO) built a platform to discover agents and continuously vet their skills and add-ons; rounds of $10M (Sequoia) and $40M (Greenoaks) closed weeks apart." }),
  src({ id: "src-rhp-kontext-siliconangle", title: "SiliconANGLE — Kontext raises $4M to control what AI agents are allowed to do inside businesses", url: "https://siliconangle.com/2026/09/24/kontext-raises-4m-to-control-what-ai-agents-are-allowed-to-do-inside-businesses/", publisher: "SiliconANGLE", sourceType: "news", publishedAt: "2026-09-24", volatility: "moderate", excerpt: "Coverage describes task-aware control: an agent fixing a bug may read the repo but not send code outside or modify unrelated infrastructure, even if its credentials allow both." }),
  src({ id: "src-rhp-asymptote-spc", title: "South Park Commons — Asymptote Labs", url: "https://www.southparkcommons.com/companies/asymptote-labs/", publisher: "South Park Commons (investor)", sourceType: "vendor_marketing", publishedAt: null, volatility: "moderate", excerpt: "Investor page lists Asymptote as AI detection and response, founded 2025 in New York, backing founders Justin and Shukan through its Founder Fellowship." }),
  src({ id: "src-rhp-rein-stealth", title: "Help Net Security — Rein Security launches to provide protection inside application production environments", url: "https://www.helpnetsecurity.com/2026/01/28/rein-security-application-protection/", publisher: "Help Net Security", sourceType: "news", publishedAt: "2026-01-28", volatility: "stable", excerpt: "Rein launches its application runtime platform for API security and SCA reachability, using runtime context to surface validated production risk." }),
  src({ id: "src-rhp-geordie-securityweek", title: "SecurityWeek — Geordie raises $30 million for AI security and governance platform", url: "https://www.securityweek.com/geordie-raises-30-million-for-ai-security-and-governance-platform/", publisher: "SecurityWeek", sourceType: "news", publishedAt: "2026-05-28", volatility: "stable", excerpt: "Geordie's $30M Series A brings total raised to $36.5M." }),
  src({ id: "src-rhp-geordie-bankinfosec", title: "BankInfoSecurity — Startup Geordie AI lands $30M to secure enterprise AI agents", url: "https://bankinfosecurity.com/startup-geordie-ai-lands-30m-to-secure-enterprise-ai-agents-a-31919", publisher: "Information Security Media Group", sourceType: "news", publishedAt: null, volatility: "moderate", excerpt: "Co-founder Hanah-Marie Darley says the round funds engineering and product, with visibility across cloud, code and endpoint agent environments." }),
  src({ id: "src-rhp-arcjet-seedcamp", title: "Seedcamp — Arcjet raises $3.6M seed funding", url: "https://seedcamp.com/views/arcjet-raises-3-6m-seed-funding-to-help-developers-protect-their-apps-in-production/", publisher: "Seedcamp (investor)", sourceType: "press_release", publishedAt: "2024-09-10", volatility: "stable", excerpt: "Investor post on Arcjet's $3.6M seed led by Zane Lackey at Andreessen Horowitz, for founder David Mytton." }),
  src({ id: "src-rhp-arcjet-series-a", title: "FinTech Global — Arcjet raises $8.3m to fight AI-driven cyberattacks", url: "https://fintech.global/2025/10/10/arcjet-raises-8-3m-to-fight-ai-driven-cyberattacks/", publisher: "FinTech Global", sourceType: "news", publishedAt: "2025-10-10", volatility: "stable", excerpt: "Arcjet raises an $8.3M Series A, bringing total funding to $12M, to roll out in-code security for modern applications." }),
  src({ id: "src-rhp-eve-saasnews", title: "The SaaS News — Eve Security raises $4.5M in seed extension", url: "https://www.thesaasnews.com/news/eve-security-raises-4-5m-seed-extension/", publisher: "The SaaS News", sourceType: "news", publishedAt: "2026-09-15", volatility: "stable", excerpt: "Austin-based Eve Security raises $4.5M led by Run Ventures, bringing total funding to $7.5M; lists eve.security as its website." }),
  src({ id: "src-rhp-eve-dealroom", title: "Dealroom — Eve Security company profile", url: "https://dealroom.co/companies/eve-security/", publisher: "Dealroom", sourceType: "review", publishedAt: null, volatility: "moderate", excerpt: "Profile lists Austin, founded 2025 by Nadav Cornberg, Sharon Eilon and Amit Eliav, with a $3M seed led by LiveOak and Tau in Sep 2025." }),
  src({ id: "src-rhp-adaptive-series-b", title: "SecurityWeek — Adaptive Security raises $81 million in Series B funding", url: "https://securityweek.com/adaptive-security-raises-81-million-in-series-b-funding", publisher: "SecurityWeek", sourceType: "news", publishedAt: "2025-12-16", volatility: "stable", excerpt: "Adaptive's $81M Series B led by Bain Capital Ventures brings total raised to $146.5M." }),
  src({ id: "src-rhp-adaptive-about", title: "Adaptive Security — About", url: "https://www.adaptivesecurity.com/about", publisher: "Adaptive Security", sourceType: "vendor_marketing", publishedAt: null, volatility: "fast", excerpt: "About page credits co-founders Brian Long and Andrew Jones (Attentive, TapCommerce), cites 2,000+ customers, and lists awareness training, phishing simulation, agentic email security and AI governance." }),
  src({ id: "src-rhp-hoxhunt-series-b", title: "SecurityWeek — Cybersecurity training firm Hoxhunt raises $40 million", url: "https://www.securityweek.com/cybersecurity-training-firm-hoxhunt-raises-40-million/", publisher: "SecurityWeek", sourceType: "news", publishedAt: "2022-05-31", volatility: "stable", excerpt: "Hoxhunt's $40M Series B brings total raised to over $43M." }),
  src({ id: "src-rhp-hoxhunt-finsmes", title: "FinSMEs — Hoxhunt raises $40M in Series B funding", url: "https://www.finsmes.com/?p=229296", publisher: "FinSMEs", sourceType: "news", publishedAt: "2022-05-31", volatility: "stable", excerpt: "Helsinki-based Hoxhunt, led by CEO Mika Aalto and CTO Pyry Åvist, raised $40M led by Level Equity with Icebreaker.vc; its gamified platform rewards reporting simulated and real threats." }),
  src({ id: "src-rhp-doppel-series-c", title: "Doppel — Doppel raises $70M Series C to outpace social engineering attacks", url: "https://www.doppel.com/blog/doppel-series-c", publisher: "Doppel", sourceType: "press_release", publishedAt: "2025-11-19", volatility: "stable", excerpt: "Founder note on a $70M Series C led by Bessemer, and the launch of a human risk management product with multi-channel simulation and AI-generated training." }),
  src({ id: "src-rhp-doppel-securityweek", title: "SecurityWeek — Doppel raises $70 million at $600 million valuation", url: "https://www.securityweek.com/doppel-raises-70-million-at-600-million-valuation/", publisher: "SecurityWeek", sourceType: "news", publishedAt: "2025-11-19", volatility: "stable", excerpt: "Series C brings Doppel's total raised to $124M and its valuation above $600M, six months after its Series B." }),
  src({ id: "src-rhp-brightside-finsmes", title: "FinSMEs — Brightside AI raises $1M in funding", url: "https://finsmes.com/?p=295624", publisher: "FinSMEs", sourceType: "news", publishedAt: "2023-11-29", volatility: "stable", excerpt: "Prilly, Switzerland-based Brightside AI, led by CEO Andrey Suzdaltsev, raised $1M from Social Links for its social engineering defense SaaS." }),
  src({ id: "src-rhp-jericho-yespress", title: "Jericho Security — company summary", url: "https://yespress.io/jericho-security.md", publisher: "yespress.io (aggregator)", sourceType: "review", publishedAt: null, volatility: "moderate", excerpt: "Summary lists Jericho as founded 2023 in New York by Sage Wohns (CEO), Tim Hwang and Dan Chyan, about 39 employees, $20M raised." }),
];

export const runtimeHumanSources: Source[] = [...baseSources, ...extraSources];

const all = Object.fromEntries(runtimeHumanSources.map((x) => [x.id, x])) as Record<string, Source>;

function claim(id: string, statement: string, subjectType: Claim["subjectType"], subjectId: string, sourceId: string, notes: string, confidence: Claim["confidence"] = "medium"): Claim {
  const source = all[sourceId];
  if (!source) throw new Error(`unknown source ${sourceId}`);
  return {
    id, statement, subjectType, subjectId, capabilityId: null, polarity: "asserts",
    sourceId: source.id, sourceUrl: source.url, sourceType: source.sourceType, publishedAt: source.publishedAt,
    observedAt: CHECKED, effectiveFrom: null, effectiveTo: null, confidence,
    verificationStatus: source.sourceType === "news" || source.sourceType === "review" ? "needs_review" : "vendor_published",
    lastCheckedAt: CHECKED, conflictsWith: [], notes,
  };
}

const extraClaims: Claim[] = [
  // Agent runtime
  claim("claim-rhp-manifold-ceo", "Manifold's CEO and co-founder is Neal Swaelens; investors in its seed include Costanoa, Cherry Ventures, Rain Capital and Modern Technical Fund.", "vendor", "manifold-security", "src-rh-manifold-securityweek", "Other co-founders not named in this source."),
  claim("claim-rhp-manifold-agents", "Manifold maps agents' connections to MCP servers, databases and external systems and flags behavioral anomalies, citing coding agents and tools like Claude Cowork and OpenClaw.", "product", "manifold-aidr", "src-rh-manifold-securityweek", "Vendor description reported in news."),
  claim("claim-rhp-capsule-no-proxy", "Capsule says it stops malicious actions and tool abuse across agent platforms without proxies, gateways or SDKs.", "product", "capsule-runtime", "src-rhp-capsule-bw", "Company press release."),
  claim("claim-rhp-capsule-platforms", "SC Media reports Capsule supports Microsoft Copilot Studio, ServiceNow and Salesforce Agentforce.", "product", "capsule-runtime", "src-rhp-capsule-scmedia", "News brief."),
  claim("claim-rhp-capsule-gartner", "Capsule's launch release says Gartner lists it as a representative vendor for guardian agents.", "vendor", "capsule-security", "src-rhp-capsule-bw", "Vendor-reported; the Gartner document was not checked.", "low"),
  claim("claim-rhp-air-founders", "AIR Security was founded by Unit 8200 veterans Yair Saban (CEO) and Niv Hoffman (CTO); its $50M came in a Sequoia-led $10M round and a Greenoaks-led $40M round weeks apart.", "vendor", "air-security", "src-rhp-air-techcrunch", "News coverage."),
  claim("claim-rhp-kontext-task", "Kontext weighs the task an agent was given, so an agent fixing a bug can read the repository but not send code to an outside service or change unrelated infrastructure.", "product", "kontext-runtime", "src-rhp-kontext-siliconangle", "Vendor example reported in news."),
  claim("claim-rhp-asymptote-founders", "Asymptote Labs was founded in 2025 in New York by Justin D'Souza and Shukan Shah, backed through South Park Commons' Founder Fellowship.", "vendor", "asymptote-labs", "src-rhp-asymptote-spc", "Investor page."),
  claim("claim-rhp-rein-origin", "Rein Security launched in Jan 2026 with an application runtime platform for API security and SCA reachability before extending to AI agents.", "vendor", "rein-security", "src-rhp-rein-stealth", "News coverage of launch."),
  claim("claim-rhp-geordie-total", "Geordie's $30M Series A brings its total raised to $36.5M.", "vendor", "geordie-ai", "src-rhp-geordie-securityweek", "One aggregator lists $43M total."),
  claim("claim-rhp-geordie-scope", "Geordie says it provides visibility into agents across cloud, code and endpoint environments.", "product", "geordie-platform", "src-rhp-geordie-bankinfosec", "Co-founder statement in news."),
  claim("claim-rhp-arcjet-seed", "Arcjet raised a $3.6M seed led by Andreessen Horowitz in Sep 2024.", "vendor", "arcjet", "src-rhp-arcjet-seedcamp", "Investor announcement.", "high"),
  claim("claim-rhp-arcjet-series-a", "Arcjet raised an $8.3M Series A in Oct 2025, bringing total funding to $12M.", "vendor", "arcjet", "src-rhp-arcjet-series-a", "Led by Plural and Ott Kaukver per other coverage."),
  claim("claim-rhp-eve-hq", "Eve Security is based in Austin and lists eve.security as its website.", "vendor", "eve-security", "src-rhp-eve-saasnews", "Funding-news site citing the company's press release."),
  claim("claim-rhp-eve-founders", "Eve Security was founded in 2025 by Nadav Cornberg, Sharon Eilon and Amit Eliav and raised a $3M seed led by LiveOak and Tau in Sep 2025.", "vendor", "eve-security", "src-rhp-eve-dealroom", "Aggregator."),
  claim("claim-rhp-codeintegrity-founders", "CodeIntegrity was founded in May 2024 near Seattle by Steven Jung (CEO) and Abi Raghuram (CTO) and is now based in San Francisco; its seed was $5M, $5.25M total.", "vendor", "codeintegrity", "src-rh-codeintegrity-geekwire", "News coverage."),
  // Human layer
  claim("claim-rhp-adaptive-series-b", "Adaptive Security raised an $81M Series B led by Bain Capital Ventures in Dec 2025, bringing total raised to $146.5M.", "vendor", "adaptive-security", "src-rhp-adaptive-series-b", "NVIDIA's NVentures, Citi Ventures and Capital One Ventures also joined per the company."),
  claim("claim-rhp-adaptive-about", "Adaptive's co-founders Brian Long and Andrew Jones previously co-founded Attentive and TapCommerce; the company cites 2,000+ customers.", "vendor", "adaptive-security", "src-rhp-adaptive-about", "Vendor-reported customer count."),
  claim("claim-rhp-adaptive-scope", "Adaptive now lists agentic email security and AI governance alongside awareness training and phishing simulation.", "product", "adaptive-platform", "src-rhp-adaptive-about", "Publisher-reported."),
  claim("claim-rhp-jericho-founders", "An aggregator lists Jericho Security as founded in 2023 in New York by Sage Wohns (CEO), Tim Hwang and Dan Chyan.", "vendor", "jericho-security", "src-rhp-jericho-yespress", "Aggregator; CEO name also appears in news coverage.", "low"),
  claim("claim-rhp-hoxhunt-series-b", "Hoxhunt raised a $40M Series B in May 2022, bringing its total to over $43M.", "vendor", "hoxhunt", "src-rhp-hoxhunt-series-b", "News coverage."),
  claim("claim-rhp-hoxhunt-founders", "Hoxhunt is based in Helsinki and led by CEO Mika Aalto and CTO Pyry Åvist; its Series B was led by Level Equity with Icebreaker.vc.", "vendor", "hoxhunt", "src-rhp-hoxhunt-finsmes", "News coverage."),
  claim("claim-rhp-doppel-series-c", "Doppel raised a $70M Series C led by Bessemer in Nov 2025, bringing total raised to $124M at a valuation above $600M.", "vendor", "doppel", "src-rhp-doppel-securityweek", "News coverage; the company's note confirms the round and lead."),
  claim("claim-rhp-doppel-hrm", "Doppel shipped a human risk management product with multi-channel simulation and AI-generated awareness training.", "product", "doppel-simulation", "src-rhp-doppel-series-c", "Company founder note."),
  claim("claim-rhp-brightside-funding", "Brightside AI, based in Prilly, Switzerland and led by CEO Andrey Suzdaltsev, raised $1M from Social Links in Nov 2023.", "vendor", "brightside-ai", "src-rhp-brightside-finsmes", "News coverage."),
];

export const runtimeHumanClaims: Claim[] = [...baseClaims, ...extraClaims];

export const runtimeHumanEvents: CatalogEvent[] = [
  { id: "evt-capsule-launch", vendorId: "capsule-security", date: "2026-04-15", kind: "launch", title: "Capsule Security exits stealth with $7M", summary: "Launched its runtime trust layer for agents and the open-source ClawGuard enforcer.", sourceId: "src-rhp-capsule-bw" },
  { id: "evt-air-launch", vendorId: "air-security", date: "2026-09-01", kind: "launch", title: "AIR Security launches with $50M", summary: "Came out of stealth with an inline firewall that vets agent skills, plugins and MCP servers.", sourceId: "src-rhp-air-techcrunch" },
  { id: "evt-kontext-launch", vendorId: "kontext-security", date: "2026-09-24", kind: "launch", title: "Kontext launches publicly with $4M", summary: "Launched task-aware runtime authorization for AI agents.", sourceId: "src-rh-kontext-htgf" },
  { id: "evt-rein-launch", vendorId: "rein-security", date: "2026-01-28", kind: "launch", title: "Rein Security launches application runtime platform", summary: "Launched for API security and SCA reachability; agent coverage followed with its Oct 2026 Series A.", sourceId: "src-rhp-rein-stealth" },
  { id: "evt-arcjet-agent-runtime", vendorId: "arcjet", date: "2026-09-17", kind: "launch", title: "Arcjet launches agent runtime security", summary: "Added observe, enforce and audit controls for AI agents in production.", sourceId: "src-rh-arcjet-hns" },
  { id: "evt-doppel-simulation", vendorId: "doppel", date: "2025-08-21", kind: "launch", title: "Doppel launches Simulation", summary: "Added multi-channel AI social engineering simulation to the Doppel Vision platform.", sourceId: "src-rh-doppel-launch" },
  { id: "evt-breacher-oses", vendorId: "breacher-ai", date: "2026-10-28", kind: "launch", title: "Breacher.ai launches OSES AI Vishing Simulator", summary: "Self-serve agentic deepfake voice simulation, listed from $199 a month.", sourceId: "src-rh-breacher-oses" },
];
