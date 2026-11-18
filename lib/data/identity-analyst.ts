import type { Claim, Source } from "../schema";

// SACR identity analyst claims (2026-11-18). Category-level framing only.
// Each statement paraphrases one public SACR passage. Analyst framing is not a product
// capability cell, a vendor ranking, or a direct-competitor edge. Figures and market sizes in
// the reports are not adopted. KuppingerCole and Forrester entries (2026-11-18) use public
// abstracts and blogs only. Gartner refuses automated requests and is not included. See docs/market-research/ispm-wim-categories-2026-11.md.

const RETRIEVED = "2026-11-18";

export const identityAnalystSources: Source[] = [
  {
    id: "src-sacr-nhi-guide-20240927",
    title: "SACR, The Complete Guide to the Growing Impact of Non-Human Identities in Cybersecurity",
    url: "https://softwareanalyst.io/reports/the-complete-guide-to-the-growing-impact-of-non-human-identities-in-cybersecurity",
    canonicalUrl: "https://softwareanalyst.io/reports/the-complete-guide-to-the-growing-impact-of-non-human-identities-in-cybersecurity",
    publisher: "Software Analyst Cyber Research",
    author: "Francis Odum",
    sourceType: "analyst",
    publishedAt: "2024-09-27",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "SACR's NHI guide says non-human identities are distributed across cloud, SaaS, on-premises and service-to-service paths rather than centralized in IGA, and separates secretless, policy-based workload access from NHI discovery and lifecycle vendors.",
  },
  {
    id: "src-sacr-identity-attack-surface-20250211",
    title: "SACR, Securing the Identity Attack Surface: A Deep Dive into the New Battlefield of Identity Security",
    url: "https://softwareanalyst.io/reports/securing-the-identity-attack-surface-a-deep-dive-into-the-new-battlefield-of-identity-security",
    canonicalUrl: "https://softwareanalyst.io/reports/securing-the-identity-attack-surface-a-deep-dive-into-the-new-battlefield-of-identity-security",
    publisher: "Software Analyst Cyber Research",
    author: "Francis Odum",
    sourceType: "analyst",
    publishedAt: "2025-02-11",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "SACR describes Identity Attack Surface Management (IASM) as a response to gaps in legacy identity vendors, aiming at full visibility into identity stacks, posture controls, identity protection and remediation driven by that visibility.",
  },
  {
    id: "src-sacr-identity-policy-enforcement-20261117",
    title: "SACR, How CISOs Can Extend, Enforce, and Verify Identity Controls",
    url: "https://softwareanalyst.io/reports/identity-policy-enforcement-and-governance",
    canonicalUrl: "https://softwareanalyst.io/reports/identity-policy-enforcement-and-governance",
    publisher: "Software Analyst Cyber Research",
    author: "Uche Obiora",
    sourceType: "analyst",
    publishedAt: "2026-11-17",
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "SACR says an IAM coverage gap persists wherever an enterprise cannot discover a relevant identity path, apply the intended control, or verify the result, including local accounts, fallback authentication and application-specific permissions outside central IAM.",
  },
  {
    id: "src-kc-itdr-plan-2027",
    title: "KuppingerCole, Leadership Compass ITDR 2027 (research plan)",
    url: "https://www.kuppingercole.com/researchplan/leadership-compass-itdr-2027",
    canonicalUrl: "https://www.kuppingercole.com/researchplan/leadership-compass-itdr-2027",
    publisher: "KuppingerCole",
    author: "Alejandro Leal",
    sourceType: "analyst",
    publishedAt: null,
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "KuppingerCole's 2027 ITDR research plan says identity security posture and exposure management capabilities will be evaluated as important components of ITDR platforms but are not, on their own, sufficient for inclusion.",
  },
  {
    id: "src-kc-itdr-lc81209",
    title: "KuppingerCole, Leadership Compass: Identity Threat Detection and Response (ITDR)",
    url: "https://www.kuppingercole.com/research/lc81209/identity-threat-detection-and-response-itdr",
    canonicalUrl: "https://www.kuppingercole.com/research/lc81209/identity-threat-detection-and-response-itdr",
    publisher: "KuppingerCole",
    author: "Alejandro Leal",
    sourceType: "analyst",
    publishedAt: "2025-11-06",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "KuppingerCole's public abstract says effective ITDR solutions detect malicious activity involving identity systems, provide continuous discovery and visibility of identity assets, and support investigation, response and recovery.",
  },
  {
    id: "src-kc-pam-lc81007",
    title: "KuppingerCole, Leadership Compass: Privileged Access Management (PAM)",
    url: "https://www.kuppingercole.com/research/lc81007/privileged-access-management-pam",
    canonicalUrl: "https://www.kuppingercole.com/research/lc81007/privileged-access-management-pam",
    publisher: "KuppingerCole",
    author: "Alejandro Leal",
    sourceType: "analyst",
    publishedAt: "2026-05-18",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "KuppingerCole's public abstract says PAM solutions control, manage and monitor privileged access across endpoints, servers, applications and cloud and hybrid environments, for human administrators and non-human identities.",
  },
  {
    id: "src-kc-ciam-lc80904",
    title: "KuppingerCole, Leadership Compass: Consumer Identity and Access Management (CIAM)",
    url: "https://www.kuppingercole.com/research/lc80904/consumer-identity-and-access-management-ciam",
    canonicalUrl: "https://www.kuppingercole.com/research/lc80904/consumer-identity-and-access-management-ciam",
    publisher: "KuppingerCole",
    author: "John Tolbert",
    sourceType: "analyst",
    publishedAt: "2026-01-14",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "KuppingerCole's public abstract says the CIAM market is evolving toward secure user experiences and regulatory compliance, with vendors offering authentication, identity verification and fraud prevention.",
  },
  {
    id: "src-kc-pbam-lc80895",
    title: "KuppingerCole, Leadership Compass: Policy Based Access Management",
    url: "https://www.kuppingercole.com/research/lc80895/policy-based-access-management",
    canonicalUrl: "https://www.kuppingercole.com/research/lc80895/policy-based-access-management",
    publisher: "KuppingerCole",
    author: "Nitish Deshpande",
    sourceType: "analyst",
    publishedAt: "2025-07-21",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "KuppingerCole's public abstract says the report examines solutions that provide integrated policy lifecycle management and dynamic access control models.",
  },
  {
    id: "src-kc-identity-fabrics-plan-2026",
    title: "KuppingerCole, Leadership Compass Identity Fabrics 2026 (research plan)",
    url: "https://www.kuppingercole.com/researchplan/leadership-compass-identity-fabrics-2026",
    canonicalUrl: "https://www.kuppingercole.com/researchplan/leadership-compass-identity-fabrics-2026",
    publisher: "KuppingerCole",
    author: "John Tolbert",
    sourceType: "analyst",
    publishedAt: null,
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "KuppingerCole's identity fabrics research plan says an identity fabric is not a single product but an architectural model for how IAM capabilities are composed, orchestrated and exposed across the IT environment.",
  },
  {
    id: "src-kc-secrets-plan-2026",
    title: "KuppingerCole, Leadership Compass Enterprise Secrets Management for Humans, Workloads, and Machines 2026 (research plan)",
    url: "https://www.kuppingercole.com/researchplan/leadership-compass-enterprise-secrets-management-for-humans-workloads-and-machines-2026",
    canonicalUrl: "https://www.kuppingercole.com/researchplan/leadership-compass-enterprise-secrets-management-for-humans-workloads-and-machines-2026",
    publisher: "KuppingerCole",
    author: "Warwick Ashford",
    sourceType: "analyst",
    publishedAt: null,
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "KuppingerCole's secrets management research plan defines an enterprise secret as any credential, key, certificate, token or configuration value that grants access, proves identity, protects data, signs code, establishes trust or enables privileged automation.",
  },
  {
    id: "src-kc-nhi-continuum-an80990",
    title: "KuppingerCole, Advisory Note: From Machine Identity to Agentic AI: Charting the NHI Continuum",
    url: "https://www.kuppingercole.com/research/an80990/from-machine-identity-to-agentic-ai-charting-the-nhi-continuum",
    canonicalUrl: "https://www.kuppingercole.com/research/an80990/from-machine-identity-to-agentic-ai-charting-the-nhi-continuum",
    publisher: "KuppingerCole",
    author: "Matthias Reinwarth",
    sourceType: "analyst",
    publishedAt: "2025-07-23",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "KuppingerCole's public abstract says machine and workload identities are already essential for securing communication between systems, and that moving from static machine credentials to context-aware, adaptive identities reshapes lifecycle, trust and governance requirements.",
  },
  {
    id: "src-kc-ai-agents-an82034",
    title: "KuppingerCole, Advisory Note: When AI Agents Break the Security Model",
    url: "https://www.kuppingercole.com/research/an82034/when-ai-agents-break-the-security-model",
    canonicalUrl: "https://www.kuppingercole.com/research/an82034/when-ai-agents-break-the-security-model",
    publisher: "KuppingerCole",
    author: "Matthias Reinwarth",
    sourceType: "analyst",
    publishedAt: "2026-08-10",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "KuppingerCole's public abstract says traditional IAM assumes deterministic lifecycles, human-speed interaction and a known identity population, and that AI agents violate those assumptions.",
  },
  {
    id: "src-kc-ot-ics-bc81089",
    title: "KuppingerCole, Buyer's Compass: Cybersecurity for OT/ICS",
    url: "https://www.kuppingercole.com/research/bc81089/cybersecurity-for-ot-ics",
    canonicalUrl: "https://www.kuppingercole.com/research/bc81089/cybersecurity-for-ot-ics",
    publisher: "KuppingerCole",
    author: "Warwick Ashford",
    sourceType: "analyst",
    publishedAt: "2026-07-13",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "KuppingerCole's public abstract says effective OT/ICS security solutions combine asset discovery, protocol-aware monitoring, strong secure remote access and NHI governance, segmentation and audit-ready reporting aligned to IEC 62443, NERC CIP, NIS2 and DORA.",
  },
  {
    id: "src-forrester-workforce-identity-20260521",
    title: "Forrester blog: workforce identity security platforms, Q2 2026",
    url: "https://www.forrester.com/blogs/announcing-the-forrester-wave-workforce-identity-platforms-q2-2026/",
    canonicalUrl: "https://www.forrester.com/blogs/announcing-the-forrester-wave-workforce-identity-platforms-q2-2026/",
    publisher: "Forrester",
    author: "Geoff Cairns",
    sourceType: "analyst",
    publishedAt: "2026-05-21",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's blog says identity security posture management and identity threat detection and response have become core capabilities of workforce identity security platforms, alongside phishing-resistant MFA, just-in-time privileged access and contextual access controls.",
  },
  {
    id: "src-forrester-pim-20250807",
    title: "Forrester blog: privileged identity management solutions, Q3 2025",
    url: "https://www.forrester.com/blogs/announcing-the-forrester-wave-privileged-identity-management-solutions-q3-2025/",
    canonicalUrl: "https://www.forrester.com/blogs/announcing-the-forrester-wave-privileged-identity-management-solutions-q3-2025/",
    publisher: "Forrester",
    author: "Geoff Cairns",
    sourceType: "analyst",
    publishedAt: "2025-08-07",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's blog says privileged identity management solutions, once rooted in compliance and administrator access control, are evolving to cover human, machine and AI agent identities, and that audit compliance and incident investigation remain the most common use cases.",
  },
  {
    id: "src-forrester-ciam-landscape-q3-2026",
    title: "Forrester, The Customer Identity And Access Management Solutions Landscape, Q3 2026 (abstract)",
    url: "https://www.forrester.com/report/the-customer-identity-and-access-management-solutions-landscape-q3-2026/RES200000194",
    canonicalUrl: "https://www.forrester.com/report/the-customer-identity-and-access-management-solutions-landscape-q3-2026/RES200000194",
    publisher: "Forrester",
    author: "Andras Cser",
    sourceType: "analyst",
    publishedAt: "2026-08-10",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's public abstract says CIAM solutions are used to improve customer experience, secure access, reduce fraud, and contain app development, maintenance and compliance labor costs.",
  },
  {
    id: "src-forrester-machine-identities-20250826",
    title: "Forrester blog: The Key To Securing Machine Identities Starts With The Human Element",
    url: "https://www.forrester.com/blogs/the-key-to-securing-machine-identities-starts-with-the-human-element/",
    canonicalUrl: "https://www.forrester.com/blogs/the-key-to-securing-machine-identities-starts-with-the-human-element/",
    publisher: "Forrester",
    author: "Geoff Cairns",
    sourceType: "analyst",
    publishedAt: "2025-08-26",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's blog says the volume of machine identities, also called nonhuman identities, is increasing rapidly and outpacing the number of human identities.",
  },
  {
    id: "src-forrester-oktane-2026",
    title: "Forrester blog: Oktane 2026 recap",
    url: "https://www.forrester.com/blogs/oktane-2026-recap-okta-announces-a-unified-iam-control-plane-with-agent-governance-and-identity-details-remaining-unclear/",
    canonicalUrl: "https://www.forrester.com/blogs/oktane-2026-recap-okta-announces-a-unified-iam-control-plane-with-agent-governance-and-identity-details-remaining-unclear/",
    publisher: "Forrester",
    author: "Andras Cser",
    sourceType: "analyst",
    publishedAt: "2026-10-01",
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "Forrester's Oktane 2026 recap says SPIFFE has started to become the de facto standard for nonhuman identities.",
  },
  {
    id: "src-forrester-aegis-iam-agents",
    title: "Forrester, Applying Forrester's AEGIS Framework To IAM And AI Agents (abstract)",
    url: "https://www.forrester.com/report/applying-forresters-aegis-framework-to-iam-and-ai-agents/RES189384",
    canonicalUrl: "https://www.forrester.com/report/applying-forresters-aegis-framework-to-iam-and-ai-agents/RES189384",
    publisher: "Forrester",
    author: "Andras Cser and Geoff Cairns",
    sourceType: "analyst",
    publishedAt: "2025-12-01",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's public abstract says AI agents, because of their autonomy and nondeterministic actions, represent a new type of identity that is neither fully machine nor human.",
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

export const identityAnalystClaims: Claim[] = [
  {
    ...base,
    id: "claim-sacr-ispm-20251202",
    statement:
      "SACR's 2 Dec 2025 identity-stack report says ISPM continuously assesses the security configuration of identity systems across cloud, SaaS and IAM platforms, surfacing misconfigurations, unused privileges, weak MFA enforcement and stale accounts, and that ISPM shows where risk exists while IGA decides what must be done.",
    subjectType: "category",
    subjectId: "ispm",
    sourceId: "src-sacr-iga-entitlements-20251202",
    sourceUrl: "https://softwareanalyst.io/reports/modernizing-the-identity-stack-from-visibility-to-governance-through-entitlement-intelligence",
    publishedAt: "2025-12-02",
    notes:
      "Paraphrases the report's ISPM section body; the map's earlier IGA claim on this report deliberately left that section out. Analyst framing; it does not fill a capability cell or rank vendors.",
  },
  {
    ...base,
    id: "claim-sacr-ispm-iasm-20250211",
    statement:
      "SACR's 11 Feb 2025 report describes Identity Attack Surface Management as a response to gaps in legacy identity vendors, aimed at full visibility into legacy identity stacks, posture controls and remediation.",
    subjectType: "category",
    subjectId: "ispm",
    sourceId: "src-sacr-identity-attack-surface-20250211",
    sourceUrl: "https://softwareanalyst.io/reports/securing-the-identity-attack-surface-a-deep-dive-into-the-new-battlefield-of-identity-security",
    publishedAt: "2025-02-11",
    notes:
      "SACR's label is IASM, not ISPM. Mapped to ispm because both describe proactive identity posture and hygiene; the map does not treat the labels as identical. Revenue figures in the report are not adopted.",
  },
  {
    ...base,
    id: "claim-sacr-wim-20240927",
    statement:
      "SACR's 27 Sep 2024 NHI guide contrasts Aembit, which it says brokers workload access through real-time policy and secretless, short-lived credentials, with the other vendors discussed, which it says focus on NHI discovery, visibility, lifecycle management and remediation.",
    subjectType: "category",
    subjectId: "wim",
    sourceId: "src-sacr-nhi-guide-20240927",
    sourceUrl: "https://softwareanalyst.io/reports/the-complete-guide-to-the-growing-impact-of-non-human-identities-in-cybersecurity",
    publishedAt: "2024-09-27",
    notes:
      "SACR draws the contrast around one vendor, not a named class, and does not use the label WIM. Aembit is credited as a research partner on the same page. Supports the map's WIM-versus-NHI boundary only as framing. Not a vendor ranking or capability cell.",
  },
  {
    ...base,
    id: "claim-sacr-nhi-20240927",
    statement:
      "SACR's 27 Sep 2024 NHI guide says non-human identities are distributed across cloud, SaaS, on-premises and service-to-service paths rather than centralized in IGA, and names visibility and inventory as the biggest enterprise challenge.",
    subjectType: "category",
    subjectId: "nhi",
    sourceId: "src-sacr-nhi-guide-20240927",
    sourceUrl: "https://softwareanalyst.io/reports/the-complete-guide-to-the-growing-impact-of-non-human-identities-in-cybersecurity",
    publishedAt: "2024-09-27",
    notes: "Growth multiples and NHI-to-human ratios in the report are not adopted.",
  },
  {
    ...base,
    id: "claim-sacr-identity-orchestration-20261117",
    statement:
      "SACR's 17 Nov 2026 report says an IAM coverage gap persists wherever an enterprise cannot reach an identity path, apply the intended control or verify the result, including local accounts, fallback authentication and application-specific permissions outside central IAM.",
    subjectType: "category",
    subjectId: "identity-orchestration",
    sourceId: "src-sacr-identity-policy-enforcement-20261117",
    sourceUrl: "https://softwareanalyst.io/reports/identity-policy-enforcement-and-governance",
    publishedAt: "2026-11-17",
    notes:
      "The report profiles Orchid as an identity observability and orchestration layer and evaluates vendors on a common question set; those vendor statements are marked vendor-reported in the report and are not adopted as cells. Also relevant to ispm.",
  },
  {
    ...base,
    id: "claim-kc-ispm-in-itdr",
    statement:
      "KuppingerCole's research plan for its 2027 ITDR evaluation says identity security posture and exposure management capabilities, such as configuration assessment and excessive-privilege identification, are important components of ITDR platforms but not, on their own, sufficient for inclusion.",
    subjectType: "category",
    subjectId: "ispm",
    sourceId: "src-kc-itdr-plan-2027",
    sourceUrl: "https://www.kuppingercole.com/researchplan/leadership-compass-itdr-2027",
    publishedAt: null,
    notes:
      "Counter-framing: KuppingerCole treats posture as part of ITDR, not a standalone market, while SACR describes ISPM separately. The map keeps ISPM as its own buyer conversation and records this disagreement. Research-plan page; no publication date.",
  },
  {
    ...base,
    id: "claim-kc-itdr-lc81209",
    statement:
      "KuppingerCole's 6 Nov 2025 abstract says effective ITDR solutions detect malicious activity involving identity systems, provide continuous discovery and visibility of identity assets, and support investigation, response and recovery.",
    subjectType: "category",
    subjectId: "itdr",
    sourceId: "src-kc-itdr-lc81209",
    sourceUrl: "https://www.kuppingercole.com/research/lc81209/identity-threat-detection-and-response-itdr",
    publishedAt: "2025-11-06",
    notes:
      "Public abstract only; the full report is paywalled. Vendor ratings are not adopted.",
  },
  {
    ...base,
    id: "claim-kc-pam-lc81007",
    statement:
      "KuppingerCole's 18 May 2026 abstract says PAM solutions control, manage and monitor privileged access across endpoints, servers, applications and cloud and hybrid environments, covering non-human identities as well as human administrators.",
    subjectType: "category",
    subjectId: "pam",
    sourceId: "src-kc-pam-lc81007",
    sourceUrl: "https://www.kuppingercole.com/research/lc81007/privileged-access-management-pam",
    publishedAt: "2026-05-18",
    notes:
      "Public abstract only. Vendor ratings are not adopted.",
  },
  {
    ...base,
    id: "claim-kc-ciam-lc80904",
    statement:
      "KuppingerCole's 14 Jan 2026 abstract says CIAM vendors offer authentication, identity verification and fraud prevention capabilities, and that the market is evolving toward secure user experience and regulatory compliance.",
    subjectType: "category",
    subjectId: "ciam",
    sourceId: "src-kc-ciam-lc80904",
    sourceUrl: "https://www.kuppingercole.com/research/lc80904/consumer-identity-and-access-management-ciam",
    publishedAt: "2026-01-14",
    notes:
      "Public abstract only. Vendor ratings are not adopted.",
  },
  {
    ...base,
    id: "claim-kc-pbam-lc80895",
    statement:
      "KuppingerCole's 21 Jul 2025 abstract frames policy-based access management as integrated policy lifecycle management with dynamic access control models.",
    subjectType: "category",
    subjectId: "identity-orchestration",
    sourceId: "src-kc-pbam-lc80895",
    sourceUrl: "https://www.kuppingercole.com/research/lc80895/policy-based-access-management",
    publishedAt: "2025-07-21",
    notes:
      "Public abstract only. The map's identity-orchestration category spans orchestration and policy engines; this supports the policy-engine side.",
  },
  {
    ...base,
    id: "claim-kc-identity-fabric-plan",
    statement:
      "KuppingerCole's identity fabrics research plan says an identity fabric is not a single product but an architectural model for how IAM capabilities are composed, orchestrated and exposed across the IT environment.",
    subjectType: "category",
    subjectId: "identity-orchestration",
    sourceId: "src-kc-identity-fabrics-plan-2026",
    sourceUrl: "https://www.kuppingercole.com/researchplan/leadership-compass-identity-fabrics-2026",
    publishedAt: null,
    notes:
      "Research-plan page; no publication date. Supports the map's point that orchestration is an architecture, not a single product.",
  },
  {
    ...base,
    id: "claim-kc-secrets-plan",
    statement:
      "KuppingerCole's secrets management research plan defines an enterprise secret as any credential, key, certificate, token or configuration value that grants access, proves identity, protects data, signs code, establishes trust or enables privileged automation.",
    subjectType: "category",
    subjectId: "secrets-management",
    sourceId: "src-kc-secrets-plan-2026",
    sourceUrl: "https://www.kuppingercole.com/researchplan/leadership-compass-enterprise-secrets-management-for-humans-workloads-and-machines-2026",
    publishedAt: null,
    notes:
      "Research-plan page; no publication date. The same page treats AI agent identities as an emerging subtype of workload identity.",
  },
  {
    ...base,
    id: "claim-kc-wim-an80990",
    statement:
      "KuppingerCole's 23 Jul 2025 abstract says machine and workload identities secure communication between systems, and that moving from static machine credentials to context-aware, adaptive identities reshapes lifecycle, trust and governance requirements.",
    subjectType: "category",
    subjectId: "wim",
    sourceId: "src-kc-nhi-continuum-an80990",
    sourceUrl: "https://www.kuppingercole.com/research/an80990/from-machine-identity-to-agentic-ai-charting-the-nhi-continuum",
    publishedAt: "2025-07-23",
    notes:
      "KuppingerCole uses the NHI label and does not describe SPIFFE or attestation in public text. Supports the static-to-short-lived shift WIM describes.",
  },
  {
    ...base,
    id: "claim-kc-agent-an82034",
    statement:
      "KuppingerCole's 10 Aug 2026 abstract says traditional IAM assumes deterministic lifecycles, human-speed interaction and a known identity population, and that AI agents violate those assumptions.",
    subjectType: "category",
    subjectId: "agent-identity",
    sourceId: "src-kc-ai-agents-an82034",
    sourceUrl: "https://www.kuppingercole.com/research/an82034/when-ai-agents-break-the-security-model",
    publishedAt: "2026-08-10",
    notes:
      "Public abstract only.",
  },
  {
    ...base,
    id: "claim-forrester-ispm-itdr-core",
    statement:
      "Forrester's 21 May 2026 blog says identity security posture management and identity threat detection and response have become core capabilities of workforce identity security platforms.",
    subjectType: "category",
    subjectId: "ispm",
    sourceId: "src-forrester-workforce-identity-20260521",
    sourceUrl: "https://www.forrester.com/blogs/announcing-the-forrester-wave-workforce-identity-platforms-q2-2026/",
    publishedAt: "2026-05-21",
    notes:
      "Forrester frames ISPM and ITDR as capabilities inside workforce identity platforms, not standalone markets. Recorded alongside the SACR and KuppingerCole framings; vendor scores are not adopted.",
  },
  {
    ...base,
    id: "claim-forrester-pim-20250807",
    statement:
      "Forrester's 7 Aug 2025 blog says privileged identity management, once rooted in compliance and administrator access control, now spans human, machine and AI agent identities, and that audit compliance and incident investigation remain the most common use cases.",
    subjectType: "category",
    subjectId: "pam",
    sourceId: "src-forrester-pim-20250807",
    sourceUrl: "https://www.forrester.com/blogs/announcing-the-forrester-wave-privileged-identity-management-solutions-q3-2025/",
    publishedAt: "2025-08-07",
    notes:
      "Forrester's label is privileged identity management. Vendor scores are not adopted.",
  },
  {
    ...base,
    id: "claim-forrester-ciam-q3-2026",
    statement:
      "Forrester's 10 Aug 2026 abstract says CIAM solutions are used to improve customer experience, secure access, reduce fraud, and contain app development, maintenance and compliance labor costs.",
    subjectType: "category",
    subjectId: "ciam",
    sourceId: "src-forrester-ciam-landscape-q3-2026",
    sourceUrl: "https://www.forrester.com/report/the-customer-identity-and-access-management-solutions-landscape-q3-2026/RES200000194",
    publishedAt: "2026-08-10",
    notes:
      "Public abstract only.",
  },
  {
    ...base,
    id: "claim-forrester-nhi-20250826",
    statement:
      "Forrester's 26 Aug 2025 blog says the volume of machine identities, also called nonhuman identities, is increasing rapidly and outpacing human identities.",
    subjectType: "category",
    subjectId: "nhi",
    sourceId: "src-forrester-machine-identities-20250826",
    sourceUrl: "https://www.forrester.com/blogs/the-key-to-securing-machine-identities-starts-with-the-human-element/",
    publishedAt: "2025-08-26",
    notes:
      "Forrester prefers the term machine identities. Ratios quoted in the post come from the Cloud Security Alliance and are not adopted.",
  },
  {
    ...base,
    id: "claim-forrester-spiffe-20261001",
    statement:
      "Forrester's 1 Oct 2026 Oktane recap says SPIFFE has started to become the de facto standard for nonhuman identities.",
    subjectType: "category",
    subjectId: "wim",
    sourceId: "src-forrester-oktane-2026",
    sourceUrl: "https://www.forrester.com/blogs/oktane-2026-recap-okta-announces-a-unified-iam-control-plane-with-agent-governance-and-identity-details-remaining-unclear/",
    publishedAt: "2026-10-01",
    notes:
      "Event recap that names vendors; Forrester has no category called workload identity management. Supports SPIFFE as the WIM standard only as analyst opinion.",
  },
  {
    ...base,
    id: "claim-forrester-agent-aegis",
    statement:
      "Forrester's 1 Dec 2025 abstract says AI agents, because of their autonomy and nondeterministic actions, are a new type of identity that is neither fully machine nor human.",
    subjectType: "category",
    subjectId: "agent-identity",
    sourceId: "src-forrester-aegis-iam-agents",
    sourceUrl: "https://www.forrester.com/report/applying-forresters-aegis-framework-to-iam-and-ai-agents/RES189384",
    publishedAt: "2025-12-01",
    notes:
      "Public abstract only.",
  },
];
