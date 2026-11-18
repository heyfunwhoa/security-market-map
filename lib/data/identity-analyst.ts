import type { Claim, Source } from "../schema";

// SACR identity analyst claims (2026-11-18). Category-level framing only.
// Each statement paraphrases one public SACR passage. Analyst framing is not a product
// capability cell, a vendor ranking, or a direct-competitor edge. Figures and market sizes in
// the reports are not adopted. Gartner, Forrester and KuppingerCole hosts were not reachable
// from the research session. See docs/market-research/ispm-wim-categories-2026-11.md.

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
];
