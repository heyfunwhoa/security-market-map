import type { Claim, Source } from "../schema";

// AppSec analyst claims (2026-11-18). Category-level framing only, from SACR report text and
// KuppingerCole and Forrester public abstracts and blogs. Each passage was re-checked against the
// saved page text. Sponsored and single-vendor pages are excluded; ratings, placements, prices and
// figures are not adopted. DAST is deliberately left without category claims (see lib/catalog.test.ts).
// See docs/market-research/appsec-analyst-coverage-2026-11.md.

const RETRIEVED = "2026-11-18";

export const appsecAnalystSources: Source[] = [
  {
    id: "src-forrester-sast-20260105",
    title: "Forrester blog: static application security testing, 2026",
    url: "https://www.forrester.com/blogs/announcing-the-forrester-wave-static-application-security-testing-solutions-and-buyers-guide-ai-brings-opportunity-to-sast-solutions/",
    canonicalUrl: "https://www.forrester.com/blogs/announcing-the-forrester-wave-static-application-security-testing-solutions-and-buyers-guide-ai-brings-opportunity-to-sast-solutions/",
    publisher: "Forrester",
    author: "Janet Worthington",
    sourceType: "analyst",
    publishedAt: "2026-01-05",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester defines SAST as solutions that analyze an application's proprietary source code, byte-code or binary without requiring the program to be executed.",
  },
  {
    id: "src-sacr-agentic-remediation-20251126",
    title: "SACR, Agentic Remediation: The New Control Layer for AI-Generated Code",
    url: "https://softwareanalyst.io/reports/agentic-remediation-the-new-control-layer-for-ai-generated-code",
    canonicalUrl: "https://softwareanalyst.io/reports/agentic-remediation-the-new-control-layer-for-ai-generated-code",
    publisher: "Software Analyst Cyber Research",
    author: "Aqsa Taylor",
    sourceType: "analyst",
    publishedAt: "2025-11-26",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "SACR's report says security tools built for static analysis and human authorship are now misaligned with AI-driven output.",
  },
  {
    id: "src-forrester-retail-appsec-20241029",
    title: "Forrester blog: Retailers Adopt Three Application Security Technologies Now",
    url: "https://www.forrester.com/blogs/retailers-adopt-three-application-security-technologies-now/",
    canonicalUrl: "https://www.forrester.com/blogs/retailers-adopt-three-application-security-technologies-now/",
    publisher: "Forrester",
    author: "Sandy Carielli",
    sourceType: "analyst",
    publishedAt: "2024-10-29",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's blog says SCA tools build an inventory of open-source and third-party components so security teams and developers can remediate vulnerabilities, license risks and noncompliant usage.",
  },
  {
    id: "src-forrester-sca-20250520",
    title: "Forrester blog: Software Composition Analysis (SCA) Is The AppSec Hero We Deserve And Need",
    url: "https://www.forrester.com/blogs/software-composition-analysis-sca-is-the-app-sec-hero-we-deserve-and-need/",
    canonicalUrl: "https://www.forrester.com/blogs/software-composition-analysis-sca-is-the-app-sec-hero-we-deserve-and-need/",
    publisher: "Forrester",
    author: "Janet Worthington",
    sourceType: "analyst",
    publishedAt: "2025-05-20",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's blog says SCA is valued for generating a software bill of materials and that static reachability, whether first-party code calls the vulnerable function, should be table stakes.",
  },
  {
    id: "src-sacr-black-hat-2026",
    title: "SACR, Black Hat USA 2026: The Agentic Security Shift",
    url: "https://softwareanalyst.io/reports/black-hat-usa-2026-the-agentic-security-shift",
    canonicalUrl: "https://softwareanalyst.io/reports/black-hat-usa-2026-the-agentic-security-shift",
    publisher: "Software Analyst Cyber Research",
    author: "Francis Odum, Lawrence Pingree, Paul Webber and Sean Sosnowski",
    sourceType: "analyst",
    publishedAt: "2026-08-21",
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "SACR's Black Hat 2026 field notes describe the return of software composition analysis in a new form, and call skills, MCP servers and plugins the least governed layer of the stack.",
  },
  {
    id: "src-forrester-ads-20260402",
    title: "Forrester blog: Agentic Development Security: Why AppSec Needs A New Operating Model",
    url: "https://www.forrester.com/blogs/agentic-development-security-why-appsec-needs-a-new-operating-model/",
    canonicalUrl: "https://www.forrester.com/blogs/agentic-development-security-why-appsec-needs-a-new-operating-model/",
    publisher: "Forrester",
    author: "Janet Worthington",
    sourceType: "analyst",
    publishedAt: "2026-04-02",
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "Forrester's blog says detection is becoming commoditized while context is not, and that correlating findings with exploitability, reachability, runtime exposure and business impact separates leaders.",
  },
  {
    id: "src-forrester-api-landscape-2024",
    title: "Forrester blog: The API Security Landscape 2024",
    url: "https://www.forrester.com/blogs/the-api-security-landscape-2024/",
    canonicalUrl: "https://www.forrester.com/blogs/the-api-security-landscape-2024/",
    publisher: "Forrester",
    author: "Madelein van der Hout",
    sourceType: "analyst",
    publishedAt: "2024-11-01",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester defines API security software as software that discovers and analyzes API traffic and endpoints and implements policies and controls to protect APIs from unauthorized access and abuse.",
  },
  {
    id: "src-forrester-api-components-res179903",
    title: "Forrester, The Eight Components Of API Security (abstract)",
    url: "https://www.forrester.com/report/the-eight-components-of-api-security/RES179903",
    canonicalUrl: "https://www.forrester.com/report/the-eight-components-of-api-security/RES179903",
    publisher: "Forrester",
    author: "Sandy Carielli, Madelein van der Hout and David Mooter",
    sourceType: "analyst",
    publishedAt: "2025-05-27",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's public abstract lists governance, discovery, testing, authentication and authorization, protection, detection, response and third-party API use as the components of API security.",
  },
  {
    id: "src-kc-api-bc80971",
    title: "KuppingerCole, Buyer's Compass: API Security and Management",
    url: "https://www.kuppingercole.com/research/bc80971/api-security-and-management",
    canonicalUrl: "https://www.kuppingercole.com/research/bc80971/api-security-and-management",
    publisher: "KuppingerCole",
    author: "Alexei Balaganski",
    sourceType: "analyst",
    publishedAt: "2025-08-01",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "KuppingerCole's public abstract says businesses need unified platforms for security and governance across the API lifecycle, using discovery, runtime protection, compliance and analytics.",
  },
  {
    id: "src-kc-api-ai-lb80920",
    title: "KuppingerCole, Leadership Brief: No API Security, No AI Security",
    url: "https://www.kuppingercole.com/research/lb80920/no-api-security-no-ai-security",
    canonicalUrl: "https://www.kuppingercole.com/research/lb80920/no-api-security-no-ai-security",
    publisher: "KuppingerCole",
    author: "Alexei Balaganski",
    sourceType: "analyst",
    publishedAt: "2026-05-28",
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "KuppingerCole's public abstract says every AI system acts through APIs, retrieving context, invoking tools and chaining decisions across enterprise infrastructure.",
  },
  {
    id: "src-forrester-wapp-20260603",
    title: "Forrester blog: Move Over, WAF: The Web Application Protection Platform Takes Over",
    url: "https://www.forrester.com/blogs/move-over-waf-the-web-application-protection-platform-takes-over/",
    canonicalUrl: "https://www.forrester.com/blogs/move-over-waf-the-web-application-protection-platform-takes-over/",
    publisher: "Forrester",
    author: "Sandy Carielli",
    sourceType: "analyst",
    publishedAt: "2026-06-03",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester defines web application protection platforms as unified solutions that inspect traffic to and from web apps, mobile apps and APIs, block exploits, volumetric and business-logic attacks, and enforce policies.",
  },
  {
    id: "src-forrester-wapp-res187552",
    title: "Forrester, The Rise Of Web Application Protection Platforms (abstract)",
    url: "https://www.forrester.com/report/the-rise-of-web-application-protection-platforms/RES187552",
    canonicalUrl: "https://www.forrester.com/report/the-rise-of-web-application-protection-platforms/RES187552",
    publisher: "Forrester",
    author: "Sandy Carielli",
    sourceType: "analyst",
    publishedAt: "2025-10-16",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's public abstract says most WAF vendors, after building and buying bot management and API security, have consolidated their offerings into unified web application protection platforms.",
  },
  {
    id: "src-kc-waap-bc81050",
    title: "KuppingerCole, Buyer's Compass: Web Application and API Protection (WAAP)",
    url: "https://www.kuppingercole.com/research/bc81050/web-application-and-api-protection-waap",
    canonicalUrl: "https://www.kuppingercole.com/research/bc81050/web-application-and-api-protection-waap",
    publisher: "KuppingerCole",
    author: "Osman Celik",
    sourceType: "analyst",
    publishedAt: "2025-09-24",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "KuppingerCole's public abstract says WAAPs outperform traditional WAFs by using behavioral analysis, AI algorithms and adaptive threat detection.",
  },
  {
    id: "src-kc-genai-defense-bc81051",
    title: "KuppingerCole, Buyer's Compass: GenAI Defense",
    url: "https://www.kuppingercole.com/research/bc81051/genai-defense",
    canonicalUrl: "https://www.kuppingercole.com/research/bc81051/genai-defense",
    publisher: "KuppingerCole",
    author: "Jonathan Care",
    sourceType: "analyst",
    publishedAt: "2026-01-19",
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "KuppingerCole's public abstract says generative AI systems introduce security challenges traditional tools handle poorly, including prompt injection, data exposure, regulatory compliance and harmful output.",
  },
  {
    id: "src-kc-genai-defense-lc81042",
    title: "KuppingerCole, Leadership Compass: Generative AI Defense",
    url: "https://www.kuppingercole.com/research/lc81042/generative-ai-defense",
    canonicalUrl: "https://www.kuppingercole.com/research/lc81042/generative-ai-defense",
    publisher: "KuppingerCole",
    author: "Jonathan Care",
    sourceType: "analyst",
    publishedAt: "2025-12-02",
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "KuppingerCole's public abstract describes the generative AI defense market as security and compliance solutions that protect AI interactions, manage associated risks and integrate with traditional and AI-specific security systems.",
  },
  {
    id: "src-forrester-ai-red-teams-20250930",
    title: "Forrester blog: How To Build AI Red Teams That Actually Work",
    url: "https://www.forrester.com/blogs/how-to-build-ai-red-teams-that-actually-work/",
    canonicalUrl: "https://www.forrester.com/blogs/how-to-build-ai-red-teams-that-actually-work/",
    publisher: "Forrester",
    author: "Jeff Pollard",
    sourceType: "analyst",
    publishedAt: "2025-09-30",
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "Forrester's blog says AI red teaming blends offensive security tactics with safety evaluations for bias, toxicity and reputational harm.",
  },
  {
    id: "src-sacr-uadp-convergence-20260218",
    title: "SACR, The Convergence of AI and Data Security: Unified Agentic Defense Platforms",
    url: "https://softwareanalyst.io/reports/the-convergence-of-ai-and-data-security-an-industry-wide-majestic-technoscope-of-unified-agentic-defense-platforms",
    canonicalUrl: "https://softwareanalyst.io/reports/the-convergence-of-ai-and-data-security-an-industry-wide-majestic-technoscope-of-unified-agentic-defense-platforms",
    publisher: "Software Analyst Cyber Research",
    author: "Lawrence Pingree",
    sourceType: "analyst",
    publishedAt: "2026-02-18",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "SACR's report says deploying AI introduces novel security risks that are semantic and probabilistic in nature, not simply bugs in lines of code.",
  },
  {
    id: "src-forrester-sscs-20261015",
    title: "Forrester blog: Your Software Supply Chain Risk Doesn't Stop At Your Suppliers",
    url: "https://www.forrester.com/blogs/your-software-supply-chain-risk-doesnt-stop-at-your-suppliers/",
    canonicalUrl: "https://www.forrester.com/blogs/your-software-supply-chain-risk-doesnt-stop-at-your-suppliers/",
    publisher: "Forrester",
    author: "Janet Worthington",
    sourceType: "analyst",
    publishedAt: "2026-10-15",
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "Forrester's blog says software supply chain security is no longer just about open-source libraries: development environments, repositories, build systems, CI/CD pipelines, credentials and release processes are targets that give attackers a trusted route downstream.",
  },
  {
    id: "src-forrester-sscs-res203185",
    title: "Forrester, Software Supply Chain Security Best Practices For Producers, Operators, And Choosers (abstract)",
    url: "https://www.forrester.com/report/software-supply-chain-security-best-practices-for-producers-operators-and-choosers/RES203185",
    canonicalUrl: "https://www.forrester.com/report/software-supply-chain-security-best-practices-for-producers-operators-and-choosers/RES203185",
    publisher: "Forrester",
    author: "Janet Worthington",
    sourceType: "analyst",
    publishedAt: "2026-10-08",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's public abstract says firms must treat the software supply chain as a lifecycle problem with role-based responsibilities for producers, operators and choosers.",
  },
  {
    id: "src-kc-sscs-lc81221",
    title: "KuppingerCole, Leadership Compass: Software Supply Chain Security (2023)",
    url: "https://www.kuppingercole.com/research/lc81221/software-supply-chain-security",
    canonicalUrl: "https://www.kuppingercole.com/research/lc81221/software-supply-chain-security",
    publisher: "KuppingerCole",
    author: "Richard Hill",
    sourceType: "analyst",
    publishedAt: "2023-08-02",
    retrievedAt: RETRIEVED,
    volatility: "stable",
    excerpt:
      "KuppingerCole's public abstract says software supply chain security is evolving toward end-to-end SDLC capabilities, including source and build integrity, vulnerability management and visibility across APIs and containers.",
  },
];

const base = {
  polarity: "asserts" as const,
  sourceType: "analyst" as const,
  observedAt: RETRIEVED,
  effectiveFrom: null,
  effectiveTo: null,
  confidence: "medium" as const,
  verificationStatus: "needs_review" as const,
  lastCheckedAt: RETRIEVED,
  conflictsWith: [],
  capabilityId: null,
};

export const appsecAnalystClaims: Claim[] = [
  {
    ...base,
    id: "claim-forrester-sast-20260105",
    statement:
      "Forrester's 5 Jan 2026 blog defines SAST as solutions that analyze an application's proprietary source code, byte-code or binary without requiring the program to be executed.",
    subjectType: "category",
    subjectId: "sast",
    sourceId: "src-forrester-sast-20260105",
    sourceUrl: "https://www.forrester.com/blogs/announcing-the-forrester-wave-static-application-security-testing-solutions-and-buyers-guide-ai-brings-opportunity-to-sast-solutions/",
    publishedAt: "2026-01-05",
    notes:
      "Definition only. Vendor names and satisfaction figures in the post are not adopted.",
  },
  {
    ...base,
    id: "claim-sacr-sast-ai-code-20251126",
    statement:
      "SACR's 26 Nov 2025 report says security tools built for static analysis and human authorship are now misaligned with AI-generated output.",
    subjectType: "category",
    subjectId: "sast",
    sourceId: "src-sacr-agentic-remediation-20251126",
    sourceUrl: "https://softwareanalyst.io/reports/agentic-remediation-the-new-control-layer-for-ai-generated-code",
    publishedAt: "2025-11-26",
    notes:
      "Market-context section only; the report's single-vendor sections are not adopted.",
  },
  {
    ...base,
    id: "claim-forrester-sca-inventory-20241029",
    statement:
      "Forrester's 29 Oct 2024 blog says SCA tools build an inventory of open-source and third-party components so teams can find and remediate vulnerabilities, license risks, conflicts and noncompliant usage.",
    subjectType: "category",
    subjectId: "sca",
    sourceId: "src-forrester-retail-appsec-20241029",
    sourceUrl: "https://www.forrester.com/blogs/retailers-adopt-three-application-security-technologies-now/",
    publishedAt: "2024-10-29",
    notes:
      "Written for retailers; the definition is general.",
  },
  {
    ...base,
    id: "claim-forrester-sca-reachability-20250520",
    statement:
      "Forrester's 20 May 2025 blog says SCA is valued for generating an SBOM and that static reachability, whether first-party code calls the vulnerable function, should be table stakes.",
    subjectType: "category",
    subjectId: "sca",
    sourceId: "src-forrester-sca-20250520",
    sourceUrl: "https://www.forrester.com/blogs/software-composition-analysis-sca-is-the-app-sec-hero-we-deserve-and-need/",
    publishedAt: "2025-05-20",
    notes:
      "Analyst opinion on minimum capability; it does not fill any vendor's reachability cell.",
  },
  {
    ...base,
    id: "claim-sacr-sca-agents-20260821",
    statement:
      "SACR's 21 Aug 2026 Black Hat notes describe the return of software composition analysis in a new form, extending to the components AI agents use.",
    subjectType: "category",
    subjectId: "sca",
    sourceId: "src-sacr-black-hat-2026",
    sourceUrl: "https://softwareanalyst.io/reports/black-hat-usa-2026-the-agentic-security-shift",
    publishedAt: "2026-08-21",
    notes:
      "Conference field notes, not a category study.",
  },
  {
    ...base,
    id: "claim-forrester-aspm-context-20260402",
    statement:
      "Forrester's 2 Apr 2026 blog says detection is becoming commoditized while context is not, and that correlating findings with exploitability, reachability, runtime exposure and business impact separates leaders.",
    subjectType: "category",
    subjectId: "aspm",
    sourceId: "src-forrester-ads-20260402",
    sourceUrl: "https://www.forrester.com/blogs/agentic-development-security-why-appsec-needs-a-new-operating-model/",
    publishedAt: "2026-04-02",
    notes:
      "Forrester frames this under agentic development security, not ASPM; it supports the prioritization job ASPM tools claim. No public KuppingerCole ASPM research was found.",
  },
  {
    ...base,
    id: "claim-forrester-api-definition-2024",
    statement:
      "Forrester's 1 Nov 2024 blog defines API security software as software that discovers and analyzes API traffic and endpoints and implements policies and controls to protect APIs from unauthorized access and abuse.",
    subjectType: "category",
    subjectId: "api-security",
    sourceId: "src-forrester-api-landscape-2024",
    sourceUrl: "https://www.forrester.com/blogs/the-api-security-landscape-2024/",
    publishedAt: "2024-11-01",
    notes:
      "Definition only.",
  },
  {
    ...base,
    id: "claim-forrester-api-components",
    statement:
      "Forrester's 27 May 2025 abstract lists governance, discovery, testing, authentication and authorization, protection, detection, response and third-party API use as the components of API security.",
    subjectType: "category",
    subjectId: "api-security",
    sourceId: "src-forrester-api-components-res179903",
    sourceUrl: "https://www.forrester.com/report/the-eight-components-of-api-security/RES179903",
    publishedAt: "2025-05-27",
    notes:
      "Public abstract only.",
  },
  {
    ...base,
    id: "claim-kc-api-lifecycle-bc80971",
    statement:
      "KuppingerCole's 1 Aug 2025 abstract says businesses need unified platforms for security and governance across the API lifecycle, using discovery, runtime protection, compliance and analytics.",
    subjectType: "category",
    subjectId: "api-security",
    sourceId: "src-kc-api-bc80971",
    sourceUrl: "https://www.kuppingercole.com/research/bc80971/api-security-and-management",
    publishedAt: "2025-08-01",
    notes:
      "KuppingerCole bundles API management with API security. Public abstract only.",
  },
  {
    ...base,
    id: "claim-kc-api-ai-lb80920",
    statement:
      "KuppingerCole's 28 May 2026 abstract says every AI system acts through APIs, retrieving context, invoking tools and chaining decisions across enterprise infrastructure.",
    subjectType: "category",
    subjectId: "api-security",
    sourceId: "src-kc-api-ai-lb80920",
    sourceUrl: "https://www.kuppingercole.com/research/lb80920/no-api-security-no-ai-security",
    publishedAt: "2026-05-28",
    notes:
      "Links API security to AI application security. Public abstract only.",
  },
  {
    ...base,
    id: "claim-forrester-wapp-definition-20260603",
    statement:
      "Forrester's 3 Jun 2026 blog defines web application protection platforms as unified solutions that inspect traffic to and from web apps, mobile apps and APIs, block exploit, volumetric and business-logic attacks, and enforce policy.",
    subjectType: "category",
    subjectId: "waf-waap",
    sourceId: "src-forrester-wapp-20260603",
    sourceUrl: "https://www.forrester.com/blogs/move-over-waf-the-web-application-protection-platform-takes-over/",
    publishedAt: "2026-06-03",
    notes:
      "Forrester's label is web application protection platform. A savings figure in the post is not adopted.",
  },
  {
    ...base,
    id: "claim-forrester-wapp-consolidation",
    statement:
      "Forrester's 16 Oct 2025 abstract says most WAF vendors, after building and buying bot management and API security, have consolidated their offerings into unified web application protection platforms.",
    subjectType: "category",
    subjectId: "waf-waap",
    sourceId: "src-forrester-wapp-res187552",
    sourceUrl: "https://www.forrester.com/report/the-rise-of-web-application-protection-platforms/RES187552",
    publishedAt: "2025-10-16",
    notes:
      "Public abstract only. Forrester treats bot management as a separate market.",
  },
  {
    ...base,
    id: "claim-kc-waap-bc81050",
    statement:
      "KuppingerCole's 24 Sep 2025 abstract says WAAPs outperform traditional WAFs by using behavioral analysis, AI algorithms and adaptive threat detection.",
    subjectType: "category",
    subjectId: "waf-waap",
    sourceId: "src-kc-waap-bc81050",
    sourceUrl: "https://www.kuppingercole.com/research/bc81050/web-application-and-api-protection-waap",
    publishedAt: "2025-09-24",
    notes:
      "Comparative framing from a public abstract; not tested.",
  },
  {
    ...base,
    id: "claim-kc-genai-defense-bc81051",
    statement:
      "KuppingerCole's 19 Jan 2026 abstract says generative AI systems introduce security challenges traditional tools handle poorly, including prompt injection, data exposure, regulatory compliance and harmful output.",
    subjectType: "category",
    subjectId: "ai-application-security",
    sourceId: "src-kc-genai-defense-bc81051",
    sourceUrl: "https://www.kuppingercole.com/research/bc81051/genai-defense",
    publishedAt: "2026-01-19",
    notes:
      "KuppingerCole's label is generative AI defense. Public abstract only.",
  },
  {
    ...base,
    id: "claim-kc-genai-defense-lc81042",
    statement:
      "KuppingerCole's 2 Dec 2025 abstract describes the generative AI defense market as solutions that protect AI interactions, manage associated risks and integrate with traditional and AI-specific security systems.",
    subjectType: "category",
    subjectId: "ai-application-security",
    sourceId: "src-kc-genai-defense-lc81042",
    sourceUrl: "https://www.kuppingercole.com/research/lc81042/generative-ai-defense",
    publishedAt: "2025-12-02",
    notes:
      "Public abstract only. Vendor ratings are not adopted.",
  },
  {
    ...base,
    id: "claim-forrester-ai-red-team-20250930",
    statement:
      "Forrester's 30 Sep 2025 blog says AI red teaming blends offensive security tactics with safety evaluations for bias, toxicity and reputational harm.",
    subjectType: "category",
    subjectId: "ai-application-security",
    sourceId: "src-forrester-ai-red-teams-20250930",
    sourceUrl: "https://www.forrester.com/blogs/how-to-build-ai-red-teams-that-actually-work/",
    publishedAt: "2025-09-30",
    notes:
      "Prices in the post are not adopted.",
  },
  {
    ...base,
    id: "claim-sacr-ai-risk-semantic-20260218",
    statement:
      "SACR's 18 Feb 2026 report says deploying AI introduces novel security risks that are semantic and probabilistic in nature, not simply bugs in lines of code.",
    subjectType: "category",
    subjectId: "ai-application-security",
    sourceId: "src-sacr-uadp-convergence-20260218",
    sourceUrl: "https://softwareanalyst.io/reports/the-convergence-of-ai-and-data-security-an-industry-wide-majestic-technoscope-of-unified-agentic-defense-platforms",
    publishedAt: "2026-02-18",
    notes:
      "Long report with many vendor profiles; only this framing sentence is adopted.",
  },
  {
    ...base,
    id: "claim-forrester-sscs-pipeline-20261015",
    statement:
      "Forrester's 15 Oct 2026 blog says software supply chain security is no longer just about open-source libraries, because development environments, repositories, build systems, CI/CD pipelines, credentials and release processes give attackers a trusted route downstream.",
    subjectType: "category",
    subjectId: "software-supply-chain",
    sourceId: "src-forrester-sscs-20261015",
    sourceUrl: "https://www.forrester.com/blogs/your-software-supply-chain-risk-doesnt-stop-at-your-suppliers/",
    publishedAt: "2026-10-15",
    notes:
      "Breach-cost figures in the post are not adopted.",
  },
  {
    ...base,
    id: "claim-forrester-sscs-lifecycle",
    statement:
      "Forrester's 8 Oct 2026 abstract says firms must treat the software supply chain as a lifecycle problem with role-based responsibilities for producers, operators and choosers.",
    subjectType: "category",
    subjectId: "software-supply-chain",
    sourceId: "src-forrester-sscs-res203185",
    sourceUrl: "https://www.forrester.com/report/software-supply-chain-security-best-practices-for-producers-operators-and-choosers/RES203185",
    publishedAt: "2026-10-08",
    notes:
      "Public abstract only.",
  },
  {
    ...base,
    id: "claim-kc-sscs-lc81221",
    statement:
      "KuppingerCole's 2023 abstract says software supply chain security is evolving toward end-to-end SDLC capabilities, including source and build integrity, vulnerability management and visibility across APIs and containers.",
    subjectType: "category",
    subjectId: "software-supply-chain",
    sourceId: "src-kc-sscs-lc81221",
    sourceUrl: "https://www.kuppingercole.com/research/lc81221/software-supply-chain-security",
    publishedAt: "2023-08-02",
    notes:
      "2023 report (page modified 2026). The next sentence naming vendors is not adopted. A 2026 edition is served only in German and is not used.",
  },
  {
    ...base,
    id: "claim-sacr-agent-components-20260821",
    statement:
      "SACR's 21 Aug 2026 Black Hat notes call skills, MCP servers and plugins the least governed layer of the stack and say vetting must be continuous because trusted components get hijacked after approval.",
    subjectType: "category",
    subjectId: "software-supply-chain",
    sourceId: "src-sacr-black-hat-2026",
    sourceUrl: "https://softwareanalyst.io/reports/black-hat-usa-2026-the-agentic-security-shift",
    publishedAt: "2026-08-21",
    notes:
      "Conference field notes.",
  },
];
