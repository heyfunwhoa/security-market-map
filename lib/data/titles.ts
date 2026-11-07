import type { BuyingRole, SeniorityLevel } from "../schema";

/**
 * Title normalization data: seniority levels, acronym groups, per-seat title forms, and rules for
 * generic or overloaded titles. All mappings are hypotheses for routing research, not proof of
 * authority or budget. Validate titles and roles in discovery.
 */

export type SeniorityInfo = {
  label: string;
  /** Regex sources matched against a normalized lowercase title. First matching level wins, top to bottom. */
  patterns: string[];
  /** Buying roles this level most often plays. Intersect with the seat's own roles before using. */
  typicalBuyingRoles: BuyingRole[];
};

/** Ordered most senior first, so "VP" beats "Manager" in "VP, Engineering Manager Programs". */
export const seniorityLevels: Record<SeniorityLevel, SeniorityInfo> = {
  "c-level": {
    label: "C-level / founder",
    patterns: ["\\bchief\\b", "\\bc[a-z]?[a-z]o\\b", "\\bfounder\\b", "\\bco founder\\b", "\\bpresident\\b"],
    typicalBuyingRoles: ["economic-buyer", "executive-sponsor", "approver"],
  },
  vp: {
    label: "VP / SVP",
    patterns: ["\\b(s|e)?vp\\b", "\\bvice president\\b"],
    typicalBuyingRoles: ["economic-buyer", "approver", "executive-sponsor"],
  },
  director: {
    label: "Director / head of",
    patterns: ["\\bdirector\\b", "\\bhead of\\b", "\\bhead\\b"],
    typicalBuyingRoles: ["budget-owner-possible", "approver", "evaluator"],
  },
  manager: {
    label: "Manager",
    patterns: ["\\bmanager\\b", "\\bmgr\\b", "\\bsupervisor\\b"],
    typicalBuyingRoles: ["evaluator", "operator", "budget-owner-possible"],
  },
  "senior-ic": {
    label: "Senior / staff / principal / lead IC",
    patterns: ["\\bsenior\\b", "\\bsr\\b", "\\bstaff\\b", "\\bprincipal\\b", "\\blead\\b", "\\bdistinguished\\b", "\\barchitect\\b", "\\bfellow\\b"],
    typicalBuyingRoles: ["evaluator", "influencer", "operator"],
  },
  ic: {
    label: "Individual contributor",
    patterns: [],
    typicalBuyingRoles: ["user", "evaluator", "influencer"],
  },
};

/** Exceptions where a C-style acronym is not an executive (e.g. "CTI analyst", "CSE"). */
export const notExecutiveAcronyms = ["cti", "cse", "cso tools", "cmo"];

export type AcronymEntry = {
  acronym: string;
  expansion: string;
  seatIds: string[];
  /** Set when the acronym is overloaded or easy to misread. */
  caution?: string;
};

/** Acronyms grouped by the seats they usually point to. Similar acronyms share a seat list. */
export const acronymGlossary: AcronymEntry[] = [
  // Leadership and governance
  { acronym: "CISO", expansion: "Chief Information Security Officer", seatIds: ["ciso"] },
  { acronym: "CSO", expansion: "Chief Security Officer", seatIds: ["ciso"], caution: "Sometimes physical security or a strategy role" },
  { acronym: "BISO", expansion: "Business Information Security Officer", seatIds: ["ciso", "security-architect", "grc-owner"], caution: "Embedded security lead for one business unit, not the company CISO" },
  { acronym: "vCISO", expansion: "Virtual / fractional CISO", seatIds: ["ciso"], caution: "Usually an outside advisor; check who actually decides" },
  { acronym: "GRC", expansion: "Governance, risk and compliance", seatIds: ["grc-owner"] },
  { acronym: "TPRM", expansion: "Third-party risk management", seatIds: ["grc-owner"] },
  { acronym: "VRM", expansion: "Vendor risk management", seatIds: ["grc-owner"] },
  { acronym: "DPO", expansion: "Data Protection Officer", seatIds: ["privacy"] },
  { acronym: "CPO", expansion: "Chief Privacy Officer", seatIds: ["privacy"], caution: "Also Chief Product Officer or Chief People Officer" },
  { acronym: "SATE", expansion: "Security awareness, training and education", seatIds: ["security-awareness"] },
  { acronym: "HRM", expansion: "Human risk management", seatIds: ["security-awareness"], caution: "Also human resources management" },

  // Build securely
  { acronym: "AppSec", expansion: "Application security", seatIds: ["appsec"] },
  { acronym: "ASE", expansion: "Application Security Engineer", seatIds: ["appsec"] },
  { acronym: "ProdSec", expansion: "Product security", seatIds: ["product-security"] },
  { acronym: "PSIRT", expansion: "Product Security Incident Response Team", seatIds: ["product-security"] },
  { acronym: "SSDLC", expansion: "Secure software development lifecycle", seatIds: ["product-security", "appsec"] },
  { acronym: "PlatSec", expansion: "Platform security", seatIds: ["platform-security"] },
  { acronym: "InfraSec", expansion: "Infrastructure security", seatIds: ["platform-security", "cloud-sec"] },
  { acronym: "DevSecOps", expansion: "Development, security and operations", seatIds: ["appsec", "platform-security", "platform"], caution: "Overloaded: can mean an AppSec engineer, a platform security engineer, or a DevOps engineer with security duties" },
  { acronym: "C-SCRM", expansion: "Cyber supply chain risk management", seatIds: ["supply-chain-security", "grc-owner"] },
  { acronym: "SBOM", expansion: "Software bill of materials", seatIds: ["supply-chain-security"] },

  // Identity
  { acronym: "IAM", expansion: "Identity and access management", seatIds: ["identity-security", "iga-owner"] },
  { acronym: "IGA", expansion: "Identity governance and administration", seatIds: ["iga-owner"] },
  { acronym: "PAM", expansion: "Privileged access management", seatIds: ["pam-owner"] },
  { acronym: "PIM", expansion: "Privileged identity management", seatIds: ["pam-owner"] },
  { acronym: "NHI", expansion: "Non-human identity", seatIds: ["identity-security", "platform", "cloud-sec"] },
  { acronym: "ITDR", expansion: "Identity threat detection and response", seatIds: ["identity-security", "soc-lead"] },
  { acronym: "CIAM", expansion: "Customer identity and access management", seatIds: ["identity-security", "developer"] },

  // Cloud, data, network, SaaS, OT
  { acronym: "CloudSec", expansion: "Cloud security", seatIds: ["cloud-sec"] },
  { acronym: "CSPM", expansion: "Cloud security posture management", seatIds: ["cloud-sec"] },
  { acronym: "CNAPP", expansion: "Cloud-native application protection platform", seatIds: ["cloud-sec"] },
  { acronym: "CIEM", expansion: "Cloud infrastructure entitlement management", seatIds: ["cloud-sec", "identity-security"] },
  { acronym: "DSPM", expansion: "Data security posture management", seatIds: ["data-security"] },
  { acronym: "DLP", expansion: "Data loss prevention", seatIds: ["data-security", "it-security"] },
  { acronym: "NetSec", expansion: "Network security", seatIds: ["network-security"] },
  { acronym: "SASE", expansion: "Secure access service edge", seatIds: ["network-security", "it-security"] },
  { acronym: "SSE", expansion: "Security service edge", seatIds: ["network-security", "saas-security"] },
  { acronym: "SSPM", expansion: "SaaS security posture management", seatIds: ["saas-security"] },
  { acronym: "CASB", expansion: "Cloud access security broker", seatIds: ["saas-security", "network-security"] },
  { acronym: "OT", expansion: "Operational technology", seatIds: ["ot-security"] },
  { acronym: "ICS", expansion: "Industrial control systems", seatIds: ["ot-security"] },
  { acronym: "CorpSec", expansion: "Corporate security", seatIds: ["it-security"], caution: "Sometimes physical security" },
  { acronym: "EDR", expansion: "Endpoint detection and response", seatIds: ["it-security", "soc-lead"] },

  // Detect and respond
  { acronym: "SOC", expansion: "Security operations center", seatIds: ["soc-lead", "soc-analyst"], caution: "SOC 1 / SOC 2 are audit reports owned by GRC, not the security operations center" },
  { acronym: "SecOps", expansion: "Security operations", seatIds: ["soc-lead", "soc-analyst", "detection-engineer"] },
  { acronym: "SIEM", expansion: "Security information and event management", seatIds: ["detection-engineer", "soc-lead"] },
  { acronym: "SOAR", expansion: "Security orchestration, automation and response", seatIds: ["soc-lead", "detection-engineer"] },
  { acronym: "XDR", expansion: "Extended detection and response", seatIds: ["soc-lead"] },
  { acronym: "DetEng", expansion: "Detection engineering", seatIds: ["detection-engineer"] },
  { acronym: "IR", expansion: "Incident response", seatIds: ["incident-response"], caution: "Also investor relations" },
  { acronym: "CSIRT", expansion: "Computer Security Incident Response Team", seatIds: ["incident-response"] },
  { acronym: "DFIR", expansion: "Digital forensics and incident response", seatIds: ["digital-forensics", "incident-response"] },
  { acronym: "CTI", expansion: "Cyber threat intelligence", seatIds: ["threat-intel"] },
  { acronym: "MDR", expansion: "Managed detection and response", seatIds: ["mssp-ops", "soc-lead"], caution: "Provider seat or the customer who buys it" },
  { acronym: "MSSP", expansion: "Managed security service provider", seatIds: ["mssp-ops"] },
  { acronym: "IRM", expansion: "Insider risk management", seatIds: ["insider-risk"], caution: "Also integrated risk management (GRC)" },

  // Validate and exposure
  { acronym: "OffSec", expansion: "Offensive security", seatIds: ["offensive-security"] },
  { acronym: "BAS", expansion: "Breach and attack simulation", seatIds: ["offensive-security"] },
  { acronym: "EASM", expansion: "External attack surface management", seatIds: ["exposure-management"] },
  { acronym: "CTEM", expansion: "Continuous threat exposure management", seatIds: ["exposure-management"] },
  { acronym: "VM", expansion: "Vulnerability management", seatIds: ["it-security", "exposure-management"], caution: "Also virtual machine" },

  // Engineering and AI
  { acronym: "SRE", expansion: "Site reliability engineer", seatIds: ["platform"] },
  { acronym: "SWE", expansion: "Software engineer", seatIds: ["developer"] },
  { acronym: "EM", expansion: "Engineering manager", seatIds: ["engineering-manager"] },
  { acronym: "MLOps", expansion: "Machine learning operations", seatIds: ["ai-owner"] },
  { acronym: "AISec", expansion: "AI security", seatIds: ["ai-security"] },

  // Business and IT
  { acronym: "CTO", expansion: "Chief Technology Officer", seatIds: ["cto"] },
  { acronym: "CIO", expansion: "Chief Information Officer", seatIds: ["cio"] },
  { acronym: "CFO", expansion: "Chief Financial Officer", seatIds: ["cfo"] },
  { acronym: "CEO", expansion: "Chief Executive Officer", seatIds: ["ceo-founder"] },
  { acronym: "GC", expansion: "General Counsel", seatIds: ["legal"] },
  { acronym: "FP&A", expansion: "Financial planning and analysis", seatIds: ["cfo"] },
  { acronym: "HRIS", expansion: "Human resources information system", seatIds: ["hr-people", "iga-owner"] },
];

export type TitleForm = {
  /** Words that name the domain in titles: "Application Security", "Detection". */
  stems: string[];
  /** Nouns an IC in this seat usually carries: "Engineer", "Analyst". */
  icNouns: string[];
  /** Lowest and highest level this seat usually reaches as a named title. */
  levels: SeniorityLevel[];
};

const allBelowC: SeniorityLevel[] = ["ic", "senior-ic", "manager", "director", "vp"];
const icToDirector: SeniorityLevel[] = ["ic", "senior-ic", "manager", "director"];
const icToManager: SeniorityLevel[] = ["ic", "senior-ic", "manager"];

/** How each seat's titles are usually built. Used to generate typical titles per level and to match stems. */
export const titleForms: Record<string, TitleForm> = {
  ciso: { stems: ["Security", "Information Security", "Cybersecurity"], icNouns: [], levels: ["director", "vp", "c-level"] },
  "security-architect": { stems: ["Security Architecture", "Security Architect"], icNouns: ["Architect"], levels: ["senior-ic", "manager", "director"] },
  "grc-owner": { stems: ["GRC", "Governance Risk and Compliance", "Compliance", "Security Compliance", "Trust", "Third-Party Risk"], icNouns: ["Analyst", "Specialist"], levels: allBelowC },
  privacy: { stems: ["Privacy", "Data Protection"], icNouns: ["Analyst", "Engineer", "Counsel"], levels: [...allBelowC, "c-level"] },
  "security-awareness": { stems: ["Security Awareness", "Human Risk"], icNouns: ["Specialist", "Analyst"], levels: icToDirector },
  appsec: { stems: ["Application Security", "AppSec", "Software Security"], icNouns: ["Engineer", "Analyst"], levels: allBelowC },
  "product-security": { stems: ["Product Security", "ProdSec"], icNouns: ["Engineer"], levels: allBelowC },
  "platform-security": { stems: ["Platform Security", "Infrastructure Security", "Cloud Infrastructure Security"], icNouns: ["Engineer"], levels: icToDirector },
  "supply-chain-security": { stems: ["Software Supply Chain Security", "Supply Chain Security"], icNouns: ["Engineer"], levels: icToDirector },
  "security-champion": { stems: ["Security Champion"], icNouns: [], levels: ["ic", "senior-ic"] },
  "identity-security": { stems: ["Identity Security", "Identity and Access Management", "IAM", "Identity"], icNouns: ["Engineer", "Analyst", "Architect"], levels: allBelowC },
  "iga-owner": { stems: ["Identity Governance", "IGA", "Access Governance"], icNouns: ["Engineer", "Analyst"], levels: icToDirector },
  "pam-owner": { stems: ["Privileged Access", "PAM"], icNouns: ["Engineer", "Analyst"], levels: icToDirector },
  "cloud-sec": { stems: ["Cloud Security", "CloudSec"], icNouns: ["Engineer", "Architect", "Analyst"], levels: allBelowC },
  "data-security": { stems: ["Data Security", "Data Loss Prevention", "DLP", "Information Protection"], icNouns: ["Engineer", "Analyst"], levels: allBelowC },
  "network-security": { stems: ["Network Security", "NetSec"], icNouns: ["Engineer", "Architect", "Analyst"], levels: icToDirector },
  "saas-security": { stems: ["SaaS Security", "Business Application Security"], icNouns: ["Engineer", "Analyst"], levels: icToDirector },
  "ot-security": { stems: ["OT Security", "ICS Security", "Industrial Cybersecurity", "OT Cybersecurity"], icNouns: ["Engineer", "Analyst"], levels: allBelowC },
  "it-security": { stems: ["IT Security", "Corporate Security", "Enterprise Security", "Endpoint Security", "Vulnerability Management"], icNouns: ["Engineer", "Analyst", "Administrator"], levels: allBelowC },
  "soc-lead": { stems: ["Security Operations", "SOC", "SecOps", "Detection and Response"], icNouns: [], levels: ["manager", "director", "vp"] },
  "detection-engineer": { stems: ["Detection Engineering", "Detection", "Threat Detection", "SIEM"], icNouns: ["Engineer"], levels: icToDirector },
  "soc-analyst": { stems: ["SOC", "Security Operations", "Security"], icNouns: ["Analyst"], levels: ["ic", "senior-ic"] },
  "incident-response": { stems: ["Incident Response", "IR", "CSIRT"], icNouns: ["Analyst", "Engineer", "Responder"], levels: icToDirector },
  "threat-hunter": { stems: ["Threat Hunting", "Threat Hunter"], icNouns: ["Analyst", "Engineer"], levels: icToManager },
  "threat-intel": { stems: ["Threat Intelligence", "Cyber Threat Intelligence", "CTI"], icNouns: ["Analyst"], levels: icToDirector },
  "digital-forensics": { stems: ["Digital Forensics", "Forensics", "DFIR"], icNouns: ["Analyst", "Examiner", "Engineer"], levels: icToDirector },
  "insider-risk": { stems: ["Insider Risk", "Insider Threat"], icNouns: ["Analyst", "Investigator"], levels: icToDirector },
  "offensive-security": { stems: ["Offensive Security", "Red Team", "Penetration Testing", "Security Validation"], icNouns: ["Engineer", "Operator", "Tester"], levels: allBelowC },
  "exposure-management": { stems: ["Exposure Management", "Attack Surface Management", "Vulnerability Management", "Threat and Vulnerability Management"], icNouns: ["Analyst", "Engineer"], levels: icToDirector },
  "cyber-recovery": { stems: ["Cyber Recovery", "Cyber Resilience", "Backup and Recovery", "Disaster Recovery"], icNouns: ["Engineer", "Analyst"], levels: icToDirector },
  platform: { stems: ["Platform Engineering", "Platform", "DevOps", "Site Reliability", "Infrastructure"], icNouns: ["Engineer"], levels: allBelowC },
  developer: { stems: ["Software", "Backend", "Frontend", "Full Stack", "Application"], icNouns: ["Engineer", "Developer"], levels: ["ic", "senior-ic"] },
  "engineering-manager": { stems: ["Engineering", "Software Engineering", "Development"], icNouns: [], levels: ["manager", "director"] },
  cto: { stems: ["Engineering", "Technology"], icNouns: [], levels: ["vp", "c-level"] },
  "ai-owner": { stems: ["AI Platform", "ML Platform", "Machine Learning", "AI Engineering", "MLOps"], icNouns: ["Engineer"], levels: allBelowC },
  "ai-security": { stems: ["AI Security", "AI Red Team", "LLM Security"], icNouns: ["Engineer", "Researcher"], levels: allBelowC },
  "mssp-ops": { stems: ["Managed Security Services", "Managed Detection and Response", "MDR", "Security Service Delivery"], icNouns: ["Analyst", "Engineer"], levels: allBelowC },
  "ceo-founder": { stems: [], icNouns: [], levels: ["c-level"] },
  cio: { stems: ["IT", "Information Technology"], icNouns: [], levels: ["director", "vp", "c-level"] },
  "it-operations": { stems: ["IT Operations", "IT", "Systems", "Corporate Engineering", "End User Computing", "Help Desk"], icNouns: ["Administrator", "Engineer", "Technician", "Specialist"], levels: icToDirector },
  cfo: { stems: ["Finance", "FP&A", "Financial Planning and Analysis", "Controller"], icNouns: ["Analyst"], levels: [...allBelowC, "c-level"] },
  procurement: { stems: ["Procurement", "Sourcing", "Strategic Sourcing", "Purchasing", "Vendor Management"], icNouns: ["Specialist", "Analyst", "Buyer"], levels: allBelowC },
  legal: { stems: ["Legal", "Commercial Legal", "Corporate Legal"], icNouns: ["Counsel", "Attorney", "Paralegal"], levels: allBelowC },
  "board-audit-committee": { stems: ["Board", "Audit Committee", "Risk Committee"], icNouns: ["Director", "Member"], levels: ["c-level"] },
  "hr-people": { stems: ["People Operations", "People", "Human Resources", "HR", "HRIS"], icNouns: ["Specialist", "Partner", "Analyst"], levels: [...allBelowC, "c-level"] },
};

export type TitleRule = {
  id: string;
  /** Regex source matched against a normalized lowercase title. */
  pattern: string;
  seatIds: string[];
  confidence: "high" | "medium" | "low";
  note: string;
};

/** Generic and overloaded titles that need a hint rather than a single answer. Checked in addition to aliases and stems. */
export const titleRules: TitleRule[] = [
  { id: "generic-security-engineer", pattern: "\\b(cyber ?)?security engineer\\b", seatIds: ["appsec", "platform-security", "cloud-sec", "it-security", "detection-engineer"], confidence: "low", note: "Generic title. Ask what they secure: product code, platform, cloud, corporate estate, or detections." },
  { id: "generic-security-analyst", pattern: "\\b(cyber ?|information )?security analyst\\b", seatIds: ["soc-analyst", "grc-owner", "it-security"], confidence: "low", note: "Could be SOC triage, compliance, or corporate IT security." },
  { id: "information-security-manager", pattern: "\\b(information security|infosec|cybersecurity|cyber security) (manager|officer|lead|program manager)\\b", seatIds: ["it-security", "grc-owner", "ciso"], confidence: "low", note: "At small companies often the top security person; at large ones a program or compliance role." },
  { id: "isso", pattern: "\\b(isso|information system security officer)\\b", seatIds: ["grc-owner", "it-security"], confidence: "medium", note: "Common in government and defense contractors; compliance-heavy." },
  { id: "biso", pattern: "\\b(biso|business information security officer)\\b", seatIds: ["ciso", "security-architect", "grc-owner"], confidence: "medium", note: "Embedded security lead for a business unit, not the company CISO." },
  { id: "vciso", pattern: "\\b(vciso|virtual ciso|fractional ciso)\\b", seatIds: ["ciso"], confidence: "medium", note: "Usually an outside advisor; find who actually decides." },
  { id: "devsecops", pattern: "\\bdevsecops\\b", seatIds: ["appsec", "platform-security", "platform"], confidence: "low", note: "Overloaded label; confirm whether they own testing, platform guardrails, or pipelines." },
  { id: "soc-audit", pattern: "\\bsoc ?(1|2)\\b", seatIds: ["grc-owner"], confidence: "high", note: "SOC 1 / SOC 2 are audit reports, not the security operations center." },
  { id: "compliance", pattern: "\\b(compliance|audit|risk) (manager|analyst|lead|specialist|director)\\b", seatIds: ["grc-owner"], confidence: "medium", note: "Confirm security or regulatory compliance, not finance-only audit." },
  { id: "trust", pattern: "\\b(trust|security assurance|customer trust)\\b", seatIds: ["grc-owner", "product-security"], confidence: "medium", note: "Trust teams answer customer security reviews." },
  { id: "it-leader", pattern: "\\b(it (director|manager)|director of it|head of it)\\b", seatIds: ["cio", "it-operations"], confidence: "medium", note: "At small companies the IT lead often owns security tools too." },
  { id: "sysadmin", pattern: "\\b(sys ?admin|systems? administrator|it administrator|helpdesk|help desk|desktop support)\\b", seatIds: ["it-operations"], confidence: "high", note: "Operator; often the de facto security team at small companies." },
  { id: "counsel", pattern: "\\b(general counsel|counsel|attorney|legal)\\b", seatIds: ["legal"], confidence: "high", note: "Privacy counsel also maps to privacy." },
  { id: "finance", pattern: "\\b(controller|fp ?a|finance)\\b", seatIds: ["cfo"], confidence: "medium", note: "Finance approver; confirm approval thresholds." },
  { id: "people", pattern: "\\b(human resources|people ops|people operations|hrbp|talent|head of people|chief people officer|vp people|vp of people)\\b", seatIds: ["hr-people"], confidence: "medium", note: "Talent acquisition rarely matters for security purchases." },
  { id: "security-leader", pattern: "\\b(director|head|vp|vice president|svp)( of)? (information |cyber ?|it )?security$", seatIds: ["ciso"], confidence: "medium", note: "Top security seat at many mid-size companies; at enterprises often one layer below the CISO." },
  { id: "engineering-leader", pattern: "\\b(director of engineering|engineering director|head of engineering|vp of engineering|vp engineering|svp engineering)\\b", seatIds: ["engineering-manager", "cto"], confidence: "medium", note: "Engineering leader; at smaller companies may be the top technical seat." },
  { id: "board", pattern: "\\b(board member|board director|non executive director|independent director|audit committee|board of directors)\\b", seatIds: ["board-audit-committee"], confidence: "high", note: "Oversight, not an operator; shapes triggers and reporting." },
  { id: "security-eng-manager", pattern: "\\bsecurity engineering (manager|director|lead)\\b", seatIds: ["appsec", "platform-security", "ciso"], confidence: "low", note: "Security engineering leaders may own AppSec, platform, and tooling at once." },
];
