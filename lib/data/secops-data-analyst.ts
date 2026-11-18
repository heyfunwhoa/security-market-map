import type { Claim, Source } from "../schema";

// SecOps and data security analyst claims (2026-11-18). Category-level framing only, from SACR
// report text and KuppingerCole and Forrester public abstracts and blogs, preferring 2025-2026
// pages. Each passage was re-checked against the saved page text. Sponsored and single-vendor pages
// are excluded; ratings, placements, prices and figures are not adopted.
// See docs/market-research/secops-data-analyst-coverage-2026-11.md.

const RETRIEVED = "2026-11-18";

export const secopsDataAnalystSources: Source[] = [
  {
    id: "src-kc-ai-soc-bc81082",
    title: "KuppingerCole, Buyer's Compass: The Emerging AI SOC",
    url: "https://www.kuppingercole.com/research/bc81082/the-emerging-ai-soc",
    canonicalUrl: "https://www.kuppingercole.com/research/bc81082/the-emerging-ai-soc",
    publisher: "KuppingerCole",
    author: "Matthew Gardiner",
    sourceType: "analyst",
    publishedAt: "2026-05-04",
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "KuppingerCole's public abstract says AI SOC platforms extend SOAR with generative AI and task-focused agents for normalization, correlation, enrichment, summarization, triage, hunting, case management and orchestrated response.",
  },
  {
    id: "src-sacr-ai-soc-landscape-2025",
    title: "SACR, AI SOC Market Landscape For 2025",
    url: "https://softwareanalyst.io/reports/sacr-ai-soc-market-landscape-for-2025",
    canonicalUrl: "https://softwareanalyst.io/reports/sacr-ai-soc-market-landscape-for-2025",
    publisher: "Software Analyst Cyber Research",
    author: "Francis Odum",
    sourceType: "analyst",
    publishedAt: "2025-08-04",
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "SACR's landscape says AI SOC platforms monitor environments, investigate alerts and respond to threats with less manual effort, and that they are not detection engines on their own but analyze already generated alerts.",
  },
  {
    id: "src-sacr-siem-2025",
    title: "SACR, Modernizing SIEM: The 2025 State of the Market",
    url: "https://softwareanalyst.io/reports/modernizing-siem-the-2025-state-of-the-market",
    canonicalUrl: "https://softwareanalyst.io/reports/modernizing-siem-the-2025-state-of-the-market",
    publisher: "Software Analyst Cyber Research",
    author: "Aqsa Taylor",
    sourceType: "analyst",
    publishedAt: "2025-09-24",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "SACR's report says SIEM is not disappearing but transforming: despite pricing and volume pressure from XDR, data lakes and security data pipelines, it remains central to the SOC and its definition has expanded.",
  },
  {
    id: "src-forrester-security-analytics-20250624",
    title: "Forrester blog: security analytics platforms, 2025",
    url: "https://www.forrester.com/blogs/announcing-the-forrester-wave-security-analytics-platforms-2025-the-siem-vs-xdr-fight-intensifies/",
    canonicalUrl: "https://www.forrester.com/blogs/announcing-the-forrester-wave-security-analytics-platforms-2025-the-siem-vs-xdr-fight-intensifies/",
    publisher: "Forrester",
    author: "Allie Mellen",
    sourceType: "analyst",
    publishedAt: "2025-06-24",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's blog says the security analytics platform is the central location where security operations takes place, and that Forrester has called it the security analytics platform market, not the SIEM market, since 2015.",
  },
  {
    id: "src-kc-xdr-lc80923",
    title: "KuppingerCole, Leadership Compass: eXtended Detection and Response (XDR)",
    url: "https://www.kuppingercole.com/research/lc80923/extended-detection-and-response-xdr",
    canonicalUrl: "https://www.kuppingercole.com/research/lc80923/extended-detection-and-response-xdr",
    publisher: "KuppingerCole",
    author: "John Tolbert",
    sourceType: "analyst",
    publishedAt: "2024-12-05",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "KuppingerCole's public abstract says the report examines solutions that provide comprehensive observability and remediation across endpoints and networks, including cloud environments.",
  },
  {
    id: "src-forrester-xdr-landscape-q1-2026",
    title: "Forrester, The XDR Platforms Landscape, Q1 2026 (abstract)",
    url: "https://www.forrester.com/report/the-extended-detection-and-response-platforms-landscape-q1-2026/RES191488",
    canonicalUrl: "https://www.forrester.com/report/the-extended-detection-and-response-platforms-landscape-q1-2026/RES191488",
    publisher: "Forrester",
    author: "Allie Mellen",
    sourceType: "analyst",
    publishedAt: "2026-02-05",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's public abstract says XDR platforms are used to augment detection engineering, accelerate detection and response, and enhance analyst experience.",
  },
  {
    id: "src-kc-ndr-bc82021",
    title: "KuppingerCole, Buyer's Compass: Network Detection and Response (NDR)",
    url: "https://www.kuppingercole.com/research/bc82021/network-detection-and-response-ndr",
    canonicalUrl: "https://www.kuppingercole.com/research/bc82021/network-detection-and-response-ndr",
    publisher: "KuppingerCole",
    author: "Osman Celik",
    sourceType: "analyst",
    publishedAt: "2026-05-06",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "KuppingerCole's public abstract describes NDR as network-first visibility with traffic and encrypted-traffic analysis, threat-intelligence enrichment, behavioral baselining and explainable investigations, driving playbook-based response through SIEM, SOAR, EPDR, firewall and ITSM integrations.",
  },
  {
    id: "src-forrester-nav-landscape-q2-2025",
    title: "Forrester, The Network Analysis And Visibility Solutions Landscape, Q2 2025 (abstract)",
    url: "https://www.forrester.com/report/the-network-analysis-and-visibility-solutions-landscape-q2-2025/RES182961",
    canonicalUrl: "https://www.forrester.com/report/the-network-analysis-and-visibility-solutions-landscape-q2-2025/RES182961",
    publisher: "Forrester",
    author: "Jitin Shabadu",
    sourceType: "analyst",
    publishedAt: "2025-05-21",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's public abstract says network analysis and visibility solutions identify threats across complex networks, uncover posture improvements and provide telemetry to orchestrate response.",
  },
  {
    id: "src-kc-cti-lb82047",
    title: "KuppingerCole, Leadership Brief: Cyber Threat Intelligence",
    url: "https://www.kuppingercole.com/research/lb82047/cyber-threat-intelligence",
    canonicalUrl: "https://www.kuppingercole.com/research/lb82047/cyber-threat-intelligence",
    publisher: "KuppingerCole",
    author: "Jonathan Care",
    sourceType: "analyst",
    publishedAt: "2026-11-05",
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "KuppingerCole's public abstract says organizations use cyber threat intelligence to guide detection, patching and risk decisions, and that source coverage alone is no longer a useful measure: intelligence that reaches no control or decision-maker adds cost without reducing risk.",
  },
  {
    id: "src-forrester-state-of-ti-2025",
    title: "Forrester, The State Of Threat Intelligence, 2025 (abstract)",
    url: "https://www.forrester.com/report/the-state-of-threat-intelligence-2025/RES189649",
    canonicalUrl: "https://www.forrester.com/report/the-state-of-threat-intelligence-2025/RES189649",
    publisher: "Forrester",
    author: "Jitin Shabadu and Merritt Maxim",
    sourceType: "analyst",
    publishedAt: "2025-12-09",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's public abstract says threat intelligence provides actionable insight into potential or active threats targeting a specific organization, industry or geography.",
  },
  {
    id: "src-forrester-ti-operationalize-2026",
    title: "Forrester, Best Practices For Operationalizing Threat Intelligence For Detection And Response (abstract)",
    url: "https://www.forrester.com/report/best-practices-for-operationalizing-threat-intelligence-for-detection-and-response/RES198943",
    canonicalUrl: "https://www.forrester.com/report/best-practices-for-operationalizing-threat-intelligence-for-detection-and-response/RES198943",
    publisher: "Forrester",
    author: "Jitin Shabadu and Allie Mellen",
    sourceType: "analyst",
    publishedAt: "2026-07-22",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's public abstract says threat intelligence can enhance detection, analyst experience and vulnerability prioritization, but operationalizing it at scale can be manual and full of roadblocks.",
  },
  {
    id: "src-kc-mdr-bc81061",
    title: "KuppingerCole, Buyer's Compass: Managed Detection and Response",
    url: "https://www.kuppingercole.com/research/bc81061/managed-detection-and-response",
    canonicalUrl: "https://www.kuppingercole.com/research/bc81061/managed-detection-and-response",
    publisher: "KuppingerCole",
    author: "Warwick Ashford",
    sourceType: "analyst",
    publishedAt: "2026-05-11",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "KuppingerCole's public abstract says MDR provides 24/7 monitoring, telemetry correlation, validated detection and analyst-led investigation and response, augmented by automation and AI.",
  },
  {
    id: "src-forrester-mdr-2025",
    title: "Forrester, Choose Your Own MDR Adventure Amid Ever-Expanding Services (abstract)",
    url: "https://www.forrester.com/report/choose-your-own-mdr-adventure-amid-ever-expanding-services/RES182019",
    canonicalUrl: "https://www.forrester.com/report/choose-your-own-mdr-adventure-amid-ever-expanding-services/RES182019",
    publisher: "Forrester",
    author: "Jeff Pollard and Jess Burn",
    sourceType: "analyst",
    publishedAt: "2025-02-04",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's public abstract says MDR emerged as an innovative offering that substantially disrupted the status quo in managed security services.",
  },
  {
    id: "src-kc-ai-soc-lc81057",
    title: "KuppingerCole, Leadership Compass: The Emerging AI Security Operations Center (SOC)",
    url: "https://www.kuppingercole.com/research/lc81057/the-emerging-ai-security-operations-center-soc",
    canonicalUrl: "https://www.kuppingercole.com/research/lc81057/the-emerging-ai-security-operations-center-soc",
    publisher: "KuppingerCole",
    author: "Matthew Gardiner",
    sourceType: "analyst",
    publishedAt: "2026-04-20",
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "KuppingerCole's public abstract covers the security automation market, historically called SOAR, examining alert triage, integrations, investigative support, case management and response automation.",
  },
  {
    id: "src-forrester-dpm-20241112",
    title: "Forrester blog: If You're Not Using Data Pipeline Management For Security And IT, You Need To",
    url: "https://www.forrester.com/blogs/if-youre-not-using-data-pipeline-management-dpm-for-security-and-it-you-need-to/",
    canonicalUrl: "https://www.forrester.com/blogs/if-youre-not-using-data-pipeline-management-dpm-for-security-and-it-you-need-to/",
    publisher: "Forrester",
    author: "Allie Mellen, Michele Goetz, Carlos Casanova and Jeff Pollard",
    sourceType: "analyst",
    publishedAt: "2024-11-12",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's blog says data pipeline management tools can route, reduce, redact, enrich or transform data.",
  },
  {
    id: "src-forrester-xdr-20260625",
    title: "Forrester blog: extended detection and response platforms, 2026",
    url: "https://www.forrester.com/blogs/announcing-the-forrester-wave-on-extended-detection-and-response-platforms-platformization-ai-and-ai/",
    canonicalUrl: "https://www.forrester.com/blogs/announcing-the-forrester-wave-on-extended-detection-and-response-platforms-platformization-ai-and-ai/",
    publisher: "Forrester",
    author: "Allie Mellen",
    sourceType: "analyst",
    publishedAt: "2026-06-25",
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "Forrester's blog says AI agents are supporting SOC functions, particularly triage and investigation, and that XDR vendors are building detection and response platforms that cover more domains with more specific detection.",
  },
  {
    id: "src-forrester-nav-20251015",
    title: "Forrester blog: network analysis and visibility, Q4 2025",
    url: "https://www.forrester.com/blogs/announcing-the-forrester-wave-network-analysis-and-visibility-q4-2025/",
    canonicalUrl: "https://www.forrester.com/blogs/announcing-the-forrester-wave-network-analysis-and-visibility-q4-2025/",
    publisher: "Forrester",
    author: "Jitin Shabadu",
    sourceType: "analyst",
    publishedAt: "2025-10-15",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's blog says many call NAV capabilities network detection and response, and that NAV predates the NDR term and better reflects solutions that mostly deploy passively without native response.",
  },
  {
    id: "src-forrester-mdr-ir-20260316",
    title: "Forrester blog: Prevent MDR-To-IR Handoff Chaos Before A Breach",
    url: "https://www.forrester.com/blogs/prevent-mdr-to-ir-handoff-chaos-before-a-breach/",
    canonicalUrl: "https://www.forrester.com/blogs/prevent-mdr-to-ir-handoff-chaos-before-a-breach/",
    publisher: "Forrester",
    author: "Jess Burn and Jeff Pollard",
    sourceType: "analyst",
    publishedAt: "2026-03-16",
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "Forrester's blog says MDR teams are optimized for continuity and speed: they triage alerts, apply playbooks and maintain visibility across complex environments.",
  },
  {
    id: "src-sacr-trusted-soc-part1-20260727",
    title: "SACR, AI SOC Technoscope Series: Building the Trusted SOC (Part 1)",
    url: "https://softwareanalyst.io/reports/ai-soc-technoscope-series-building-the-trusted-soc-part-1",
    canonicalUrl: "https://softwareanalyst.io/reports/ai-soc-technoscope-series-building-the-trusted-soc-part-1",
    publisher: "Software Analyst Cyber Research",
    author: "Sean Sosnowski",
    sourceType: "analyst",
    publishedAt: "2026-07-27",
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "SACR's report says several AI SOC vendors are adding detection engineering and even SIEM capabilities, partly because weak upstream detections cap the value of downstream investigation and response.",
  },
  {
    id: "src-forrester-privacy-mgmt-q2-2025",
    title: "Forrester, The Privacy Management Software Landscape, Q2 2025 (abstract)",
    url: "https://www.forrester.com/report/the-privacy-management-software-landscape-q2-2025/RES184404",
    canonicalUrl: "https://www.forrester.com/report/the-privacy-management-software-landscape-q2-2025/RES184404",
    publisher: "Forrester",
    author: "Enza Iannopollo",
    sourceType: "analyst",
    publishedAt: "2025-06-25",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's public abstract says privacy management software helps organizations become and remain compliant, unlock the ethical use of sensitive data including for AI, and respond quickly to privacy risks.",
  },
  {
    id: "src-kc-dsp-lb80905",
    title: "KuppingerCole, Leadership Brief: Data Security Platforms: Governing Access for Humans, Services, and AI",
    url: "https://www.kuppingercole.com/research/lb80905/data-security-platforms",
    canonicalUrl: "https://www.kuppingercole.com/research/lb80905/data-security-platforms",
    publisher: "KuppingerCole",
    author: "Alexei Balaganski",
    sourceType: "analyst",
    publishedAt: "2026-04-28",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "KuppingerCole's public abstract says traditional controls tied to individual systems no longer provide consistent protection as data spreads across clouds, analytics and AI, and that platforms enforcing policy at the data layer control access by humans, services and AI.",
  },
  {
    id: "src-forrester-modern-dlp-2025",
    title: "Forrester, The Guide To Modern Data Loss Prevention (abstract)",
    url: "https://www.forrester.com/report/the-guide-to-modern-data-loss-prevention/RES184144",
    canonicalUrl: "https://www.forrester.com/report/the-guide-to-modern-data-loss-prevention/RES184144",
    publisher: "Forrester",
    author: "Heidi Shey",
    sourceType: "analyst",
    publishedAt: "2025-06-16",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's public abstract says DLP technology remains a core component of data security and that modern DLP incorporates richer context to enable risk-based responses.",
  },
  {
    id: "src-forrester-state-of-encryption-2025",
    title: "Forrester, The State Of Encryption, 2025 (abstract)",
    url: "https://www.forrester.com/report/the-state-of-encryption-2025/RES186755",
    canonicalUrl: "https://www.forrester.com/report/the-state-of-encryption-2025/RES186755",
    publisher: "Forrester",
    author: "Heidi Shey",
    sourceType: "analyst",
    publishedAt: "2025-09-23",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's public abstract says full-disk, file and email encryption are widespread and privacy practices are driving encryption of data at rest, in transit and in use.",
  },
  {
    id: "src-forrester-hsm-pq-2026",
    title: "Forrester, Hardware Security Module Requirements For The Post-Quantum Era (abstract)",
    url: "https://www.forrester.com/report/hardware-security-module-requirements-for-the-post-quantum-era/RES190874",
    canonicalUrl: "https://www.forrester.com/report/hardware-security-module-requirements-for-the-post-quantum-era/RES190874",
    publisher: "Forrester",
    author: "Andras Cser and Heidi Shey",
    sourceType: "analyst",
    publishedAt: "2026-01-21",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's public abstract says hardware security modules provide the foundation of modern asymmetric and symmetric encryption, tokenization, digital signature and time stamping.",
  },
  {
    id: "src-kc-crypto-agility-lb80919",
    title: "KuppingerCole, Leadership Brief: Crypto-Agility: Managing Cryptographic Change in the Post-Quantum Era",
    url: "https://www.kuppingercole.com/research/lb80919/crypto-agility",
    canonicalUrl: "https://www.kuppingercole.com/research/lb80919/crypto-agility",
    publisher: "KuppingerCole",
    author: "Alexei Balaganski",
    sourceType: "analyst",
    publishedAt: "2026-05-15",
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "KuppingerCole's public abstract says crypto-agility has become an urgent enterprise requirement as post-quantum cryptography, machine identities and regulation expose the risk of treating cryptographic infrastructure as static.",
  },
  {
    id: "src-forrester-weaponized-insiders-20260127",
    title: "Forrester blog: Weaponized Insiders Can Result In Big Consequences",
    url: "https://www.forrester.com/blogs/weaponized-insiders-can-result-in-big-consequences/",
    canonicalUrl: "https://www.forrester.com/blogs/weaponized-insiders-can-result-in-big-consequences/",
    publisher: "Forrester",
    author: "Joseph Blankenship",
    sourceType: "analyst",
    publishedAt: "2026-01-27",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's blog says insider risk management is an ongoing program to protect against, detect and respond to insider incidents.",
  },
  {
    id: "src-forrester-insider-ai-agents-20260928",
    title: "Forrester blog: Manage Insider Risk To Protect Your Potential",
    url: "https://www.forrester.com/blogs/manage-insider-risk-to-protect-your-potential/",
    canonicalUrl: "https://www.forrester.com/blogs/manage-insider-risk-to-protect-your-potential/",
    publisher: "Forrester",
    author: "Joseph Blankenship",
    sourceType: "analyst",
    publishedAt: "2026-09-28",
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "Forrester's blog says insider risk management has so far focused on human insiders, and that AI agents add a new type of insider because of their autonomy, decision-making ability and access.",
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

export const secopsDataAnalystClaims: Claim[] = [
  {
    ...base,
    id: "claim-kc-ai-soc-bc81082",
    statement:
      "KuppingerCole's 4 May 2026 abstract says AI SOC platforms extend SOAR with generative AI and task-focused agents for normalization, correlation, enrichment, summarization, triage, hunting, case management and orchestrated response.",
    subjectType: "category",
    subjectId: "ai-soc-investigation",
    sourceId: "src-kc-ai-soc-bc81082",
    sourceUrl: "https://www.kuppingercole.com/research/bc81082/the-emerging-ai-soc",
    publishedAt: "2026-05-04",
    notes:
      "Public abstract only.",
  },
  {
    ...base,
    id: "claim-sacr-ai-soc-scope-2025",
    statement:
      "SACR's 4 Aug 2025 landscape says AI SOC platforms investigate alerts and respond to threats with less manual effort, and that they are not detection engines on their own but analyze alerts that other tools already generated.",
    subjectType: "category",
    subjectId: "ai-soc-investigation",
    sourceId: "src-sacr-ai-soc-landscape-2025",
    sourceUrl: "https://softwareanalyst.io/reports/sacr-ai-soc-market-landscape-for-2025",
    publishedAt: "2025-08-04",
    notes:
      "Page modified 29 Jul 2026. Single-vendor profile sections in the report are not adopted.",
  },
  {
    ...base,
    id: "claim-sacr-siem-transforming-2025",
    statement:
      "SACR's 24 Sep 2025 report says SIEM is not disappearing but transforming: despite pricing and volume pressure and competition from XDR, data lakes and security data pipelines, it remains central to the SOC and its definition has expanded.",
    subjectType: "category",
    subjectId: "siem",
    sourceId: "src-sacr-siem-2025",
    sourceUrl: "https://softwareanalyst.io/reports/modernizing-siem-the-2025-state-of-the-market",
    publishedAt: "2025-09-24",
    notes:
      "The report's key-player vendor sections are not adopted.",
  },
  {
    ...base,
    id: "claim-forrester-siem-central-20250624",
    statement:
      "Forrester's 24 Jun 2025 blog says the security analytics platform is the central location where security operations takes place, and that Forrester has called this the security analytics platform market rather than the SIEM market since 2015.",
    subjectType: "category",
    subjectId: "siem",
    sourceId: "src-forrester-security-analytics-20250624",
    sourceUrl: "https://www.forrester.com/blogs/announcing-the-forrester-wave-security-analytics-platforms-2025-the-siem-vs-xdr-fight-intensifies/",
    publishedAt: "2025-06-24",
    notes:
      "Forrester's label for SIEM is security analytics platform. Vendor names and placements in the post are not adopted.",
  },
  {
    ...base,
    id: "claim-kc-xdr-lc80923",
    statement:
      "KuppingerCole's 5 Dec 2024 abstract describes XDR solutions as providing comprehensive observability and remediation across endpoints and networks, including cloud environments.",
    subjectType: "category",
    subjectId: "xdr",
    sourceId: "src-kc-xdr-lc80923",
    sourceUrl: "https://www.kuppingercole.com/research/lc80923/extended-detection-and-response-xdr",
    publishedAt: "2024-12-05",
    notes:
      "Public abstract only. Vendor ratings are not adopted.",
  },
  {
    ...base,
    id: "claim-forrester-xdr-purpose-2026",
    statement:
      "Forrester's 5 Feb 2026 abstract says XDR platforms are used to augment detection engineering, accelerate detection and response, and enhance analyst experience.",
    subjectType: "category",
    subjectId: "xdr",
    sourceId: "src-forrester-xdr-landscape-q1-2026",
    sourceUrl: "https://www.forrester.com/report/the-extended-detection-and-response-platforms-landscape-q1-2026/RES191488",
    publishedAt: "2026-02-05",
    notes:
      "Public abstract only.",
  },
  {
    ...base,
    id: "claim-kc-ndr-bc82021",
    statement:
      "KuppingerCole's 6 May 2026 abstract describes NDR as network-first visibility with traffic and encrypted-traffic analysis, threat-intelligence enrichment, behavioral baselining and explainable investigations, driving playbook-based response through integrations.",
    subjectType: "category",
    subjectId: "ndr",
    sourceId: "src-kc-ndr-bc82021",
    sourceUrl: "https://www.kuppingercole.com/research/bc82021/network-detection-and-response-ndr",
    publishedAt: "2026-05-06",
    notes:
      "Public abstract only.",
  },
  {
    ...base,
    id: "claim-forrester-nav-2025",
    statement:
      "Forrester's 21 May 2025 abstract says network analysis and visibility solutions identify threats across sophisticated networks, uncover posture improvements and use supplemental telemetry to orchestrate response.",
    subjectType: "category",
    subjectId: "ndr",
    sourceId: "src-forrester-nav-landscape-q2-2025",
    sourceUrl: "https://www.forrester.com/report/the-network-analysis-and-visibility-solutions-landscape-q2-2025/RES182961",
    publishedAt: "2025-05-21",
    notes:
      "Forrester's label is network analysis and visibility (NAV); an earlier Forrester post maps NDR to NAV. Public abstract only.",
  },
  {
    ...base,
    id: "claim-kc-cti-lb82047",
    statement:
      "KuppingerCole's 5 Nov 2026 abstract says organizations use threat intelligence to guide detection, patching and risk decisions, and that source coverage alone is no longer a useful measure because intelligence that reaches no control or decision-maker adds cost without reducing risk.",
    subjectType: "category",
    subjectId: "threat-intelligence",
    sourceId: "src-kc-cti-lb82047",
    sourceUrl: "https://www.kuppingercole.com/research/lb82047/cyber-threat-intelligence",
    publishedAt: "2026-11-05",
    notes:
      "Public abstract only.",
  },
  {
    ...base,
    id: "claim-forrester-ti-definition-2025",
    statement:
      "Forrester's 9 Dec 2025 abstract says threat intelligence provides actionable insight into potential or active threats targeting a specific organization, industry or geography.",
    subjectType: "category",
    subjectId: "threat-intelligence",
    sourceId: "src-forrester-state-of-ti-2025",
    sourceUrl: "https://www.forrester.com/report/the-state-of-threat-intelligence-2025/RES189649",
    publishedAt: "2025-12-09",
    notes:
      "Survey figures in the report are not adopted.",
  },
  {
    ...base,
    id: "claim-forrester-ti-operationalize-2026",
    statement:
      "Forrester's 22 Jul 2026 abstract says threat intelligence can improve detection, analyst experience and vulnerability prioritization, but operationalizing it at scale can be manual and full of roadblocks.",
    subjectType: "category",
    subjectId: "threat-intelligence",
    sourceId: "src-forrester-ti-operationalize-2026",
    sourceUrl: "https://www.forrester.com/report/best-practices-for-operationalizing-threat-intelligence-for-detection-and-response/RES198943",
    publishedAt: "2026-07-22",
    notes:
      "Public abstract only. Also relevant to detection engineering.",
  },
  {
    ...base,
    id: "claim-kc-mdr-bc81061",
    statement:
      "KuppingerCole's 11 May 2026 abstract says MDR provides 24/7 monitoring, telemetry correlation, validated detection and analyst-led investigation and response, augmented by automation and AI.",
    subjectType: "category",
    subjectId: "mdr",
    sourceId: "src-kc-mdr-bc81061",
    sourceUrl: "https://www.kuppingercole.com/research/bc81061/managed-detection-and-response",
    publishedAt: "2026-05-11",
    notes:
      "Public abstract only.",
  },
  {
    ...base,
    id: "claim-forrester-mdr-2025",
    statement:
      "Forrester's 4 Feb 2025 abstract says MDR emerged as an innovative offering that substantially disrupted the status quo in managed security services.",
    subjectType: "category",
    subjectId: "mdr",
    sourceId: "src-forrester-mdr-2025",
    sourceUrl: "https://www.forrester.com/report/choose-your-own-mdr-adventure-amid-ever-expanding-services/RES182019",
    publishedAt: "2025-02-04",
    notes:
      "Public abstract only.",
  },
  {
    ...base,
    id: "claim-kc-soar-ai-soc-lc81057",
    statement:
      "KuppingerCole's 20 Apr 2026 abstract covers the security automation market, historically called SOAR, examining alert triage, integrations, investigative support, case management and response automation.",
    subjectType: "category",
    subjectId: "soar",
    sourceId: "src-kc-ai-soc-lc81057",
    sourceUrl: "https://www.kuppingercole.com/research/lc81057/the-emerging-ai-security-operations-center-soc",
    publishedAt: "2026-04-20",
    notes:
      "KuppingerCole now titles this market the emerging AI SOC. Public abstract only; vendor ratings not adopted.",
  },
  {
    ...base,
    id: "claim-forrester-dpm-20241112",
    statement:
      "Forrester's 12 Nov 2024 blog says data pipeline management tools can route, reduce, redact, enrich or transform data.",
    subjectType: "category",
    subjectId: "security-data-pipelines",
    sourceId: "src-forrester-dpm-20241112",
    sourceUrl: "https://www.forrester.com/blogs/if-youre-not-using-data-pipeline-management-dpm-for-security-and-it-you-need-to/",
    publishedAt: "2024-11-12",
    notes:
      "Forrester's label is data pipeline management. Vendor names in the next paragraph are not adopted.",
  },
  {
    ...base,
    id: "claim-forrester-ai-agents-triage-2026",
    statement:
      "Forrester's 25 Jun 2026 blog says AI agents are increasingly supporting security operations center functions, particularly triage and investigation.",
    subjectType: "category",
    subjectId: "ai-soc-investigation",
    sourceId: "src-forrester-xdr-20260625",
    sourceUrl: "https://www.forrester.com/blogs/announcing-the-forrester-wave-on-extended-detection-and-response-platforms-platformization-ai-and-ai/",
    publishedAt: "2026-06-25",
    notes:
      "Vendor names and placements in the post are not adopted.",
  },
  {
    ...base,
    id: "claim-forrester-xdr-direction-2026",
    statement:
      "Forrester's 25 Jun 2026 blog says XDR vendors are building detection and response platforms that cover more domains with more specific detection than before.",
    subjectType: "category",
    subjectId: "xdr",
    sourceId: "src-forrester-xdr-20260625",
    sourceUrl: "https://www.forrester.com/blogs/announcing-the-forrester-wave-on-extended-detection-and-response-platforms-platformization-ai-and-ai/",
    publishedAt: "2026-06-25",
    notes:
      "Vendor names and placements in the post are not adopted.",
  },
  {
    ...base,
    id: "claim-forrester-ndr-nav-20251015",
    statement:
      "Forrester's 15 Oct 2025 blog says many call NAV capabilities network detection and response, and that NAV predates the NDR term and better reflects solutions that mostly deploy passively without native response.",
    subjectType: "category",
    subjectId: "ndr",
    sourceId: "src-forrester-nav-20251015",
    sourceUrl: "https://www.forrester.com/blogs/announcing-the-forrester-wave-network-analysis-and-visibility-q4-2025/",
    publishedAt: "2025-10-15",
    notes:
      "Maps the map's NDR category to Forrester's NAV label. Vendor names and placements in the post are not adopted.",
  },
  {
    ...base,
    id: "claim-forrester-mdr-role-20260316",
    statement:
      "Forrester's 16 Mar 2026 blog says MDR teams are optimized for continuity and speed: they triage alerts, apply playbooks and maintain visibility across complex environments.",
    subjectType: "category",
    subjectId: "mdr",
    sourceId: "src-forrester-mdr-ir-20260316",
    sourceUrl: "https://www.forrester.com/blogs/prevent-mdr-to-ir-handoff-chaos-before-a-breach/",
    publishedAt: "2026-03-16",
    notes:
      "The post's point is the handoff from MDR to incident response, where MDR's role stops.",
  },
  {
    ...base,
    id: "claim-sacr-detection-eng-ai-soc-2026",
    statement:
      "SACR's 27 Jul 2026 report says several AI SOC vendors are adding detection engineering and even SIEM capabilities, partly because weak upstream detections cap the value of downstream investigation and response.",
    subjectType: "category",
    subjectId: "detection-engineering",
    sourceId: "src-sacr-trusted-soc-part1-20260727",
    sourceUrl: "https://softwareanalyst.io/reports/ai-soc-technoscope-series-building-the-trusted-soc-part-1",
    publishedAt: "2026-07-27",
    notes:
      "Market-convergence observation, not a category definition. Part 2 of the series ranks vendors and is not used.",
  },
  {
    ...base,
    id: "claim-forrester-privacy-mgmt-2025",
    statement:
      "Forrester's 25 Jun 2025 abstract says privacy management software helps organizations become and remain compliant, unlock the ethical use of sensitive data including for AI and generative AI, and respond quickly to privacy risks.",
    subjectType: "category",
    subjectId: "privacy-governance",
    sourceId: "src-forrester-privacy-mgmt-q2-2025",
    sourceUrl: "https://www.forrester.com/report/the-privacy-management-software-landscape-q2-2025/RES184404",
    publishedAt: "2025-06-25",
    notes:
      "Public abstract only. No 2025-2026 privacy page was found from KuppingerCole or SACR.",
  },
  {
    ...base,
    id: "claim-kc-data-layer-lb80905",
    statement:
      "KuppingerCole's 28 Apr 2026 abstract says traditional controls tied to individual systems no longer provide consistent protection as sensitive data spreads across clouds, analytics and AI, and that platforms enforcing policy at the data layer control access by humans, services and AI.",
    subjectType: "category",
    subjectId: "database-security",
    sourceId: "src-kc-dsp-lb80905",
    sourceUrl: "https://www.kuppingercole.com/research/lb80905/data-security-platforms",
    publishedAt: "2026-04-28",
    notes:
      "Framed as data security platforms, not database activity monitoring; supports the view that per-system controls such as database security are being absorbed into data-layer platforms. No recent database-specific analyst page was found.",
  },
  {
    ...base,
    id: "claim-forrester-modern-dlp-2025",
    statement:
      "Forrester's 16 Jun 2025 abstract says DLP technology remains a core component of data security and that modern DLP incorporates richer context to enable risk-based responses.",
    subjectType: "category",
    subjectId: "dlp",
    sourceId: "src-forrester-modern-dlp-2025",
    sourceUrl: "https://www.forrester.com/report/the-guide-to-modern-data-loss-prevention/RES184144",
    publishedAt: "2025-06-16",
    notes:
      "Public abstract only.",
  },
  {
    ...base,
    id: "claim-forrester-encryption-2025",
    statement:
      "Forrester's 23 Sep 2025 abstract says full-disk, file and email encryption are widespread, and that privacy practices are driving encryption of data at rest, in transit and in use.",
    subjectType: "category",
    subjectId: "data-encryption",
    sourceId: "src-forrester-state-of-encryption-2025",
    sourceUrl: "https://www.forrester.com/report/the-state-of-encryption-2025/RES186755",
    publishedAt: "2025-09-23",
    notes:
      "Survey figures in the report are not adopted.",
  },
  {
    ...base,
    id: "claim-forrester-hsm-2026",
    statement:
      "Forrester's 21 Jan 2026 abstract says hardware security modules provide the foundation of modern asymmetric and symmetric encryption, tokenization, digital signature and time stamping.",
    subjectType: "category",
    subjectId: "data-encryption",
    sourceId: "src-forrester-hsm-pq-2026",
    sourceUrl: "https://www.forrester.com/report/hardware-security-module-requirements-for-the-post-quantum-era/RES190874",
    publishedAt: "2026-01-21",
    notes:
      "Public abstract only; specific to HSMs.",
  },
  {
    ...base,
    id: "claim-kc-crypto-agility-2026",
    statement:
      "KuppingerCole's 15 May 2026 abstract says crypto-agility has become an urgent enterprise requirement as post-quantum cryptography, machine identities and regulation expose the risk of treating cryptographic infrastructure as static.",
    subjectType: "category",
    subjectId: "data-encryption",
    sourceId: "src-kc-crypto-agility-lb80919",
    sourceUrl: "https://www.kuppingercole.com/research/lb80919/crypto-agility",
    publishedAt: "2026-05-15",
    notes:
      "About managing cryptography as a practice, not encryption products. Public abstract only.",
  },
  {
    ...base,
    id: "claim-forrester-irm-program-2026",
    statement:
      "Forrester's 27 Jan 2026 blog says insider risk management is an ongoing program to protect against, detect and respond to insider incidents.",
    subjectType: "category",
    subjectId: "insider-risk",
    sourceId: "src-forrester-weaponized-insiders-20260127",
    sourceUrl: "https://www.forrester.com/blogs/weaponized-insiders-can-result-in-big-consequences/",
    publishedAt: "2026-01-27",
    notes:
      "The post is built around one case; its breach figures are not adopted.",
  },
  {
    ...base,
    id: "claim-forrester-insider-ai-agents-2026",
    statement:
      "Forrester's 28 Sep 2026 blog says insider risk management has so far focused on human insiders, and that AI agents add a new type of insider because of their autonomy, decision-making ability and access.",
    subjectType: "category",
    subjectId: "insider-risk",
    sourceId: "src-forrester-insider-ai-agents-20260928",
    sourceUrl: "https://www.forrester.com/blogs/manage-insider-risk-to-protect-your-potential/",
    publishedAt: "2026-09-28",
    notes:
      "Also relevant to agent identity.",
  },
];
