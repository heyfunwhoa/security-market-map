import type { SegmentOverlayInput } from "../schema";

/**
 * Company size bands and company-type overlays.
 * Employee cutoffs (~500 / ~5,000) are working estimates for discovery, not ICP rules; no reviewed
 * source gives exact cutoffs (IANS segments Fortune 500 / large / midsize, but the breakdown is gated).
 * Sources support the shape: first security hire around 30–100 employees (practitioner guidance), most
 * teams under 10 people (IDC/Tines), and specialization rather than headcount growing with size (Osterman).
 */

export const companySizeBands = {
  small: {
    label: "Small / startup",
    employees: "Under ~500",
    shape: "Zero to a few security people. CTO, founder, or IT generalist covers most seats; outside firms fill gaps.",
    sourceIds: ["src-seg-first-hire-rule", "src-seg-firstmark-first-hire"],
  },
  "mid-market": {
    label: "Mid-market",
    employees: "~500 to ~5,000",
    shape: "Small team of generalists under a hands-on security leader; MDR and retainers common.",
    sourceIds: ["src-seg-hitch-2025-summary", "src-seg-idc-tines-team-size", "src-seg-osterman-team-scaling"],
  },
  enterprise: {
    label: "Enterprise",
    employees: "~5,000+",
    shape: "Specialized seats exist; procurement, legal, and vendor review in every deal.",
    sourceIds: ["src-persona-ians-ciso-2026", "src-seg-osterman-team-scaling"],
  },
} as const;

const REVIEWED = "2026-11-07";
const base = { lastReviewedAt: REVIEWED } as const;

export const segmentOverlays: SegmentOverlayInput[] = [
  // ── Business model ──────────────────────────────────────────────
  {
    ...base,
    id: "software-saas",
    name: "Software / SaaS company",
    kind: "business-model",
    appliesTo: "Companies whose product is software they build and run.",
    elevatedPersonaIds: ["product-security", "appsec", "platform-security", "cto", "grc-owner"],
    addedTriggers: ["Enterprise customer security questionnaire", "SOC 2 or ISO 27001 for sales", "Customer-reported vulnerability"],
    notes: "Security is part of what customers buy, so product trust and customer evidence weigh more than in non-tech firms.",
    evidence: "hypothesis",
  },
  {
    ...base,
    id: "non-tech-enterprise",
    name: "Non-tech enterprise",
    kind: "business-model",
    appliesTo: "Retail, manufacturing, logistics, services, and other firms where software is internal.",
    elevatedPersonaIds: ["cio", "it-security", "identity-security", "grc-owner", "it-operations"],
    addedTriggers: ["Ransomware in the sector", "Cyber insurance requirements", "M&A integration"],
    notes: "Fewer product security seats; corporate IT, identity, and third-party risk carry more of the program.",
    evidence: "hypothesis",
  },

  // ── Industry and regulation ─────────────────────────────────────
  {
    ...base,
    id: "financial-services-ny",
    name: "Financial services (NYDFS-regulated)",
    kind: "industry",
    appliesTo: "Banks, insurers, and other entities licensed by the New York Department of Financial Services.",
    mandatedSeats: [
      { title: "Named CISO", personaId: "ciso", rule: "23 NYCRR 500 requires a qualified CISO responsible for the cybersecurity program.", sourceIds: ["src-seg-nydfs-500"] },
    ],
    elevatedPersonaIds: ["ciso", "grc-owner", "board-audit-committee", "identity-security"],
    addedTriggers: ["Annual Part 500 certification", "DFS examination"],
    frameworks: ["23 NYCRR 500"],
    evidence: "sourced",
    sourceIds: ["src-seg-nydfs-500"],
  },
  {
    ...base,
    id: "financial-services-eu",
    name: "Financial services (EU, DORA)",
    kind: "industry",
    appliesTo: "EU financial entities in scope of the Digital Operational Resilience Act.",
    mandatedSeats: [
      { title: "Management body accountable for ICT risk", personaId: "board-audit-committee", rule: "DORA Article 5 gives the management body ultimate responsibility for the ICT risk management framework.", sourceIds: ["src-seg-dora-article-5"] },
    ],
    elevatedPersonaIds: ["board-audit-committee", "grc-owner", "procurement", "cyber-recovery"],
    addedTriggers: ["ICT third-party register", "Resilience testing", "Incident reporting"],
    frameworks: ["DORA"],
    evidence: "sourced",
    sourceIds: ["src-seg-dora-article-5"],
  },
  {
    ...base,
    id: "healthcare-hipaa",
    name: "Healthcare (HIPAA)",
    kind: "industry",
    appliesTo: "U.S. covered entities and business associates handling ePHI.",
    mandatedSeats: [
      { title: "HIPAA security official", rule: "45 CFR 164.308(a)(2) requires designating a security official for Security Rule policies and procedures.", sourceIds: ["src-seg-hipaa-164308"] },
    ],
    elevatedPersonaIds: ["privacy", "grc-owner", "it-security", "identity-security", "legal-counsel"],
    addedTriggers: ["Business associate agreement", "OCR investigation", "Ransomware affecting care"],
    frameworks: ["HIPAA Security Rule"],
    notes: "At smaller providers the security official is often an IT or compliance leader, not a CISO.",
    evidence: "sourced",
    sourceIds: ["src-seg-hipaa-164308"],
  },
  {
    ...base,
    id: "defense-industrial-base",
    name: "Defense industrial base (CMMC)",
    kind: "industry",
    appliesTo: "DoD contractors and subcontractors handling FCI or CUI.",
    mandatedSeats: [
      { title: "Affirming official", rule: "CMMC requires an affirmation of continuous compliance for in-scope contractor systems.", sourceIds: ["src-seg-cmmc-dfars-rule"] },
    ],
    elevatedPersonaIds: ["grc-owner", "it-security", "it-operations", "ceo-founder"],
    addedTriggers: ["CMMC requirement in a solicitation", "Prime contractor flow-down", "Assessment date"],
    frameworks: ["CMMC (32 CFR 170)", "DFARS"],
    notes: "Many in-scope contractors are small; the affirming official may be an executive with no security team.",
    evidence: "sourced",
    sourceIds: ["src-seg-cmmc-program-rule", "src-seg-cmmc-dfars-rule"],
  },
  {
    ...base,
    id: "energy-utilities",
    name: "Energy and utilities (NERC CIP)",
    kind: "industry",
    appliesTo: "North American bulk electric system entities subject to NERC CIP.",
    mandatedSeats: [
      { title: "CIP Senior Manager", rule: "CIP-003 requires identifying a CIP Senior Manager by name and documenting changes within 30 days.", sourceIds: ["src-seg-nerc-cip-003"] },
    ],
    elevatedPersonaIds: ["ot-security", "grc-owner", "network-security"],
    addedTriggers: ["CIP audit", "Plant or substation change window"],
    frameworks: ["NERC CIP", "ISA/IEC 62443"],
    evidence: "sourced",
    sourceIds: ["src-seg-nerc-cip-003", "src-persona-isagca-62443-cisa"],
  },
  {
    ...base,
    id: "eu-essential-important",
    name: "EU essential and important entities (NIS2)",
    kind: "region",
    appliesTo: "Entities in scope of NIS2 as transposed by each member state.",
    mandatedSeats: [
      { title: "Management body approves and oversees measures", personaId: "board-audit-committee", rule: "NIS2 Article 20: management bodies approve cybersecurity risk measures, oversee them, can be held liable, and must follow training.", sourceIds: ["src-seg-nis2-article-20"] },
    ],
    elevatedPersonaIds: ["board-audit-committee", "ciso", "grc-owner", "supply-chain-security"],
    addedTriggers: ["National transposition deadline", "Management training", "Supply chain security requirements"],
    frameworks: ["NIS2"],
    evidence: "sourced",
    sourceIds: ["src-seg-nis2-article-20"],
  },

  // ── Ownership ───────────────────────────────────────────────────
  {
    ...base,
    id: "us-public-company",
    name: "U.S. public company",
    kind: "ownership",
    appliesTo: "SEC registrants filing 10-K and 8-K reports.",
    mandatedSeats: [
      { title: "Board oversight of cyber risk (disclosed)", personaId: "board-audit-committee", rule: "Regulation S-K Item 106 requires annual disclosure of cyber risk management and board oversight.", sourceIds: ["src-seg-sec-cyber-rule"] },
    ],
    elevatedPersonaIds: ["ciso", "legal-counsel", "board-audit-committee", "incident-response"],
    addedTriggers: ["Material incident (8-K Item 1.05 within four business days of materiality)", "Annual 10-K cyber disclosure"],
    frameworks: ["SEC cybersecurity disclosure rules"],
    evidence: "sourced",
    sourceIds: ["src-seg-sec-cyber-rule"],
  },
  {
    ...base,
    id: "private-company",
    name: "Private or PE/VC-backed company",
    kind: "ownership",
    appliesTo: "Privately held companies, including investor-backed ones.",
    elevatedPersonaIds: ["ceo-founder", "cfo", "cto"],
    addedTriggers: ["Fundraise or exit diligence", "Enterprise customer requirement", "Investor portfolio security program"],
    notes: "Fewer disclosure rules; customer and investor diligence drive priorities.",
    evidence: "hypothesis",
  },

  // ── Providers ───────────────────────────────────────────────────
  {
    ...base,
    id: "mssp-mdr-provider",
    name: "MSSP / MDR / MSP provider",
    kind: "provider",
    appliesTo: "Firms that run security for many customers.",
    elevatedPersonaIds: ["mssp-ops", "soc-lead", "detection-engineer"],
    addedTriggers: ["New customer onboarding cost", "Margin pressure", "Tool consolidation across tenants"],
    notes: "A buyer of multi-tenant tooling and a channel to small and mid-market customers at the same time.",
    evidence: "hypothesis",
  },
];
