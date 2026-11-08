import type { PersonaProfileInput, StakeholderInput } from "../schema";
import { absent, dedicated, external, shared, sizes } from "./size-helpers";

/**
 * Non-security seats that shape security purchases. They own no product category, so they stay out of
 * the landscape buyer filter, but they appear in profiles, edges, and size coverage.
 * Everything here is a hypothesis unless a profile or edge cites sources.
 */

const REVIEWED = "2026-11-07";
const base = { lastReviewedAt: REVIEWED } as const;

export const stakeholders: StakeholderInput[] = [
  {
    id: "ceo-founder",
    name: "CEO / founder",
    title: "Runs the company; at small companies often the real security buyer",
    roleInSecurityDeals:
      "Sponsor and approver at small companies; executive backstop for the CISO elsewhere.",
    questions: [
      "What does this unblock — a customer, a raise, an audit?",
      "Who will own this after we buy it?",
    ],
    aliases: ["CEO", "Founder", "Co-founder", "Chief Executive Officer"],
  },
  {
    id: "cio",
    name: "CIO / VP of IT",
    title: "Owns IT strategy, budget, and often the CISO's reporting line",
    roleInSecurityDeals:
      "Budget holder or approver when security sits under IT; owns the corporate estate the control runs on.",
    questions: [
      "Does this land on IT's budget or security's?",
      "What does IT have to run or support after go-live?",
    ],
    aliases: ["CIO", "Chief Information Officer", "VP IT", "Head of IT"],
  },
  {
    id: "it-operations",
    name: "IT operations / systems administrator",
    title:
      "Runs endpoints, identity directory, SaaS admin, backups, and patching",
    roleInSecurityDeals:
      "Operator and frequent blocker; at small companies the de facto security team.",
    questions: [
      "Who deploys and maintains the agent or integration?",
      "What breaks if this goes wrong?",
    ],
    aliases: [
      "IT ops",
      "Sysadmin",
      "IT manager",
      "Help desk lead",
      "Corporate engineering",
    ],
  },
  {
    id: "cfo",
    name: "CFO / finance",
    title: "Approves spend, multi-year terms, and budget timing",
    roleInSecurityDeals:
      "Final spend approval above thresholds; shapes timing, term length, and payment structure.",
    questions: [
      "Is this budgeted this fiscal year?",
      "What is the cost of not doing it?",
    ],
    aliases: ["CFO", "Chief Financial Officer", "VP Finance", "FP&A"],
  },
  {
    id: "procurement",
    name: "Procurement / vendor management",
    title: "Runs sourcing, vendor onboarding, and commercial negotiation",
    roleInSecurityDeals:
      "Gatekeeper for vendor onboarding and paper; routes the vendor security review.",
    questions: [
      "Is the vendor already onboarded or on a framework agreement?",
      "Which reviews must clear before signature?",
    ],
    aliases: [
      "Procurement",
      "Sourcing",
      "Vendor management",
      "Purchasing",
      "Strategic sourcing",
    ],
  },
  {
    id: "legal-counsel",
    name: "Legal / general counsel",
    title:
      "Owns contract terms, data processing terms, and incident disclosure judgment",
    roleInSecurityDeals:
      "Approver on MSA, DPA, liability, and data terms; partner on incident materiality and notification.",
    questions: [
      "Which terms are non-negotiable for us?",
      "Does this vendor process personal or regulated data?",
    ],
    aliases: [
      "General Counsel",
      "GC",
      "Legal",
      "Corporate counsel",
      "Commercial counsel",
    ],
  },
  {
    id: "board-audit-committee",
    name: "Board / audit or risk committee",
    title: "Oversees cyber risk and holds management accountable",
    roleInSecurityDeals:
      "Rarely in the deal; their questions create the triggers and the reporting the CISO must answer.",
    questions: [
      "What did the board ask for last quarter?",
      "Which risk would embarrass us in front of the board?",
    ],
    aliases: [
      "Board",
      "Audit committee",
      "Risk committee",
      "Board of directors",
    ],
  },
  {
    id: "hr-people",
    name: "HR / people operations",
    title: "Owns the employee lifecycle and people-risk cases",
    roleInSecurityDeals:
      "Source of joiner/mover/leaver truth for identity; partner on insider risk and awareness.",
    questions: [
      "Is the HR system the source of truth for access changes?",
      "Who handles a people-risk case?",
    ],
    aliases: ["HR", "People ops", "People team", "HRIS owner"],
  },
];

const S = {
  ians: "src-persona-ians-ciso-2026",
  ponemon: "src-persona-ponemon-influence-2026",
  hitch: "src-seg-hitch-2025-summary",
  sec: "src-seg-sec-cyber-rule",
  nydfs: "src-seg-nydfs-500",
  dora: "src-seg-dora-article-5",
  nis2: "src-seg-nis2-article-20",
} as const;

export const stakeholderProfiles: PersonaProfileInput[] = [
  {
    ...base,
    personaId: "ceo-founder",
    primaryDomainId: null,
    cluster: "business",
    orgPlacement: "executive",
    buyingRoles: ["economic-buyer", "executive-sponsor", "approver"],
    function: "executive",
    job: "Run the company; decide when security becomes a funded function.",
    pains: [
      {
        pain: "Deals stall on customer security reviews",
        evidence: "hypothesis",
        relatedCategoryIds: ["customer-trust"],
        relatedUseCaseIds: ["uc-customer-trust"],
      },
      {
        pain: "Hard to judge how much security is enough",
        evidence: "hypothesis",
      },
    ],
    triggers: [
      "Enterprise customer security review",
      "Fundraise diligence",
      "First compliance audit",
      "Incident",
    ],
    edges: [
      {
        toPersonaId: "ciso",
        type: "sponsors",
        carries: "Mandate and budget for a security function",
        qualify: "Does the security lead have a direct line to you?",
        evidence: "sourced",
        sourceIds: [S.hitch],
      },
    ],
    dealStages: ["business-case", "close"],
    publicSignals: ["Funding round", "Enterprise customer wins announced"],
    bySize: sizes(
      dedicated("Often the actual buyer"),
      dedicated(),
      dedicated("Rarely in the deal"),
    ),
    evidence: "hypothesis",
  },
  {
    ...base,
    personaId: "cio",
    primaryDomainId: "corporate",
    cluster: "business",
    orgPlacement: "it",
    buyingRoles: ["economic-buyer", "budget-owner-possible", "approver"],
    function: "it",
    job: "Own IT strategy and spend; frequently the CISO's manager.",
    pains: [
      { pain: "Security and IT budgets compete", evidence: "hypothesis" },
      { pain: "Every new tool adds support load", evidence: "hypothesis" },
    ],
    edges: [
      {
        toPersonaId: "it-operations",
        type: "sponsors",
        carries: "IT priorities and headcount",
        evidence: "hypothesis",
      },
      {
        toPersonaId: "it-security",
        type: "sponsors",
        carries: "Corporate estate budget",
        evidence: "hypothesis",
      },
    ],
    dealStages: ["business-case", "close"],
    publicSignals: [
      "New CIO announced",
      "IT modernization or transformation program",
    ],
    bySize: sizes(absent(["cto", "it-operations"]), dedicated(), dedicated()),
    evidence: "sourced",
    sourceIds: [S.ians],
  },
  {
    ...base,
    personaId: "it-operations",
    primaryDomainId: "corporate",
    cluster: "business",
    orgPlacement: "it",
    buyingRoles: ["operator", "blocker", "influencer"],
    function: "it",
    job: "Keep endpoints, directory, SaaS, backups, and patches running.",
    pains: [
      {
        pain: "Every security tool adds agents and tickets",
        evidence: "hypothesis",
      },
      {
        pain: "Too few people for patching and access requests",
        evidence: "hypothesis",
        relatedCategoryIds: ["iga", "it-vulnerability-management"],
        relatedUseCaseIds: ["uc-jml"],
      },
    ],
    edges: [
      {
        toPersonaId: "iga-owner",
        type: "co-owns",
        carries: "Directory and account lifecycle",
        evidence: "hypothesis",
      },
      {
        toPersonaId: "cyber-recovery",
        type: "co-owns",
        carries: "Backups and restores",
        evidence: "hypothesis",
      },
    ],
    dealStages: ["technical-evaluation", "implementation"],
    publicSignals: [
      "IT operations postings",
      "Office expansion or acquisition",
    ],
    bySize: sizes(
      dedicated("Often the de facto security team"),
      dedicated(),
      dedicated(),
    ),
    evidence: "hypothesis",
  },
  {
    ...base,
    personaId: "cfo",
    primaryDomainId: null,
    cluster: "business",
    orgPlacement: "finance-procurement",
    buyingRoles: ["approver", "economic-buyer"],
    function: "finance-procurement",
    job: "Approve spend and terms; decide budget timing.",
    pains: [
      {
        pain: "Security spend rising without clear ROI",
        evidence: "practitioner_published",
        sourceIds: ["src-seg-hitch-2025-summary"],
      },
      {
        pain: "Budget pressure on security teams has leveled off but not reversed",
        evidence: "sourced",
        sourceIds: ["src-persona-isc2-workforce-2025"],
      },
    ],
    triggers: [
      "Fiscal year planning",
      "Spend above approval thresholds",
      "Cyber insurance renewal",
    ],
    edges: [
      {
        toPersonaId: "ciso",
        type: "approves-purchase",
        carries: "Spend approval, term length, timing",
        qualify: "What is the approval threshold and who signs above it?",
        evidence: "hypothesis",
      },
      {
        toPersonaId: "procurement",
        type: "sponsors",
        carries: "Commercial policy",
        evidence: "hypothesis",
      },
    ],
    dealStages: ["business-case", "close"],
    publicSignals: ["Fiscal year-end timing", "Cost reduction announcements"],
    bySize: sizes(shared(["ceo-founder"]), dedicated(), dedicated()),
    evidence: "hypothesis",
  },
  {
    ...base,
    personaId: "procurement",
    primaryDomainId: null,
    cluster: "business",
    orgPlacement: "finance-procurement",
    buyingRoles: ["approver", "blocker"],
    function: "finance-procurement",
    job: "Run sourcing, onboard vendors, and negotiate paper.",
    pains: [
      {
        pain: "Vendor security reviews delay purchases",
        evidence: "practitioner_published",
        sourceIds: ["src-pain-whistic-vendor-2025"],
        relatedCategoryIds: ["third-party-risk"],
        relatedUseCaseIds: ["uc-customer-trust"],
      },
      { pain: "Overlapping vendors and renewals", evidence: "hypothesis" },
    ],
    messageToTest:
      "Make the vendor review easy to pass: security pack, DPA, and a clear consolidation story up front.",
    successMeasures: [
      "Cycle time from request to signature",
      "Spend consolidated across overlapping vendors",
      "Renewals negotiated before auto-renew",
    ],
    objections: [
      "Overlaps with a tool we already pay for",
      "Security review isn't complete",
      "Multi-year terms required for discount",
    ],
    edges: [
      {
        toPersonaId: "grc-owner",
        type: "depends-on",
        carries: "Vendor security review result",
        qualify: "Which reviews must clear before signature?",
        evidence: "hypothesis",
      },
      {
        toPersonaId: "legal-counsel",
        type: "co-owns",
        carries: "MSA, DPA, order form",
        evidence: "hypothesis",
      },
    ],
    dealStages: ["procurement-legal", "close", "renewal-expansion"],
    publicSignals: ["Supplier portal or vendor onboarding requirements"],
    bySize: sizes(absent(["cfo", "ceo-founder"]), shared(["cfo"]), dedicated()),
    evidence: "practitioner_published",
    sourceIds: [S.ponemon],
  },
  {
    ...base,
    personaId: "legal-counsel",
    primaryDomainId: null,
    cluster: "business",
    orgPlacement: "legal-privacy",
    buyingRoles: ["approver", "blocker"],
    function: "legal-privacy",
    job: "Approve contract and data terms; judge incident disclosure obligations.",
    pains: [
      {
        pain: "Short incident disclosure windows for public companies",
        evidence: "sourced",
        sourceIds: ["src-seg-sec-cyber-rule"],
      },
      {
        pain: "Data processing terms vary by vendor and region",
        evidence: "hypothesis",
        relatedCategoryIds: ["privacy-governance", "third-party-risk"],
      },
    ],
    edges: [
      {
        toPersonaId: "privacy",
        type: "co-owns",
        carries: "Data processing terms",
        evidence: "hypothesis",
      },
      {
        toPersonaId: "incident-response",
        type: "co-owns",
        carries: "Materiality and notification decisions",
        qualify: "Who decides whether an incident is material?",
        evidence: "hypothesis",
      },
    ],
    dealStages: ["procurement-legal"],
    publicSignals: ["Regulatory action or litigation"],
    bySize: sizes(external("Outside counsel"), dedicated(), dedicated()),
    evidence: "hypothesis",
  },
  {
    ...base,
    personaId: "board-audit-committee",
    primaryDomainId: null,
    cluster: "business",
    orgPlacement: "executive",
    buyingRoles: ["approver"],
    function: "executive",
    job: "Oversee cyber risk; hold management accountable.",
    pains: [
      {
        pain: "Personal accountability for cyber oversight in regulated sectors",
        evidence: "sourced",
        sourceIds: ["src-seg-nis2-article-20", "src-seg-dora-article-5"],
      },
      {
        pain: "Hard to judge security posture from management reports",
        evidence: "hypothesis",
        relatedCategoryIds: ["grc-controls", "security-ratings"],
      },
    ],
    triggers: [
      "Peer breach in the news",
      "Regulatory exam",
      "Annual risk disclosure",
    ],
    edges: [
      {
        toPersonaId: "ciso",
        type: "oversees",
        carries: "Cyber risk reporting and accountability",
        qualify: "What did the board ask for last quarter?",
        evidence: "sourced",
        sourceIds: [S.sec, S.nydfs],
      },
    ],
    dealStages: ["prospecting"],
    publicSignals: [
      "10-K cybersecurity disclosure (public companies)",
      "New director with cyber background",
    ],
    bySize: sizes(
      shared(["ceo-founder"], "Investor board, light cyber oversight"),
      dedicated(),
      dedicated(),
    ),
    evidence: "sourced",
    sourceIds: [S.sec, S.nydfs, S.dora, S.nis2],
  },
  {
    ...base,
    personaId: "hr-people",
    primaryDomainId: null,
    cluster: "business",
    orgPlacement: "people",
    buyingRoles: ["influencer", "approver"],
    function: "people",
    job: "Own the employee lifecycle and people-risk cases.",
    pains: [
      { pain: "Access changes lag HR events", evidence: "hypothesis", relatedCategoryIds: ["iga"], relatedUseCaseIds: ["uc-jml"] },
      {
        pain: "People-risk cases need fairness and privacy",
        evidence: "hypothesis",
      },
    ],
    edges: [
      {
        toPersonaId: "iga-owner",
        type: "feeds",
        carries: "Joiner/mover/leaver events",
        evidence: "hypothesis",
      },
      {
        toPersonaId: "insider-risk",
        type: "co-owns",
        carries: "People-risk cases",
        evidence: "hypothesis",
      },
    ],
    dealStages: ["implementation"],
    publicSignals: ["HRIS migration", "Layoffs or rapid hiring"],
    bySize: sizes(shared(["ceo-founder"]), dedicated(), dedicated()),
    evidence: "hypothesis",
  },
];
