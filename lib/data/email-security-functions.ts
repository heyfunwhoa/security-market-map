import type { Capability, UseCase } from "../schema";

// Conceptual buyer-decision vocabulary, not evidence that any named product performs a function.
// Product-specific support must come from a separately reviewed Claim linked to a Source.
// Reuses "email-security" and adjacent existing categories; see the candidate research brief.
export const emailSecurityCapabilities: Capability[] = [
  {
    id: "cap-email-contextual-threat-detection",
    slug: "email-contextual-threat-detection",
    name: "Detect contextual phishing, impersonation and BEC",
    description:
      "A sourced product claim must identify the specific message threats evaluated (for example, payment-diversion BEC, vendor fraud, or credential harvesting). AI branding or category membership is not a measured catch rate.",
    categoryId: "email-security",
  },
  {
    id: "cap-email-link-attachment-analysis",
    slug: "email-link-attachment-analysis",
    name: "Analyze links, QR codes and attachments",
    description:
      "A sourced claim that the product follows or inspects specified URLs, redirects, QR codes or file types. Detection, sandbox execution and actual blocking are separate statements.",
    categoryId: "email-security",
  },
  {
    id: "cap-email-pre-delivery-enforcement",
    slug: "email-pre-delivery-enforcement",
    name: "Hold or quarantine before inbox delivery",
    description:
      "A sourced, edition- and configuration-scoped claim that mail is intercepted before any recipient mailbox copy exists. No MX change, fast verdicts or post-delivery removal do not imply this boundary.",
    categoryId: "email-security",
  },
  {
    id: "cap-email-post-delivery-remediation",
    slug: "email-post-delivery-remediation",
    name: "Remediate after delivery and sweep campaigns",
    description:
      "A sourced claim that an email already delivered can be removed, quarantined or otherwise actioned, with a specific scope (single mailbox or related campaign). The exposure window and rollback remain separate metrics.",
    categoryId: "email-security",
  },
  {
    id: "cap-email-user-report-triage",
    slug: "email-user-report-triage",
    name: "Triage employee-reported suspicious email",
    description:
      "A sourced claim that abuse-mailbox or phishing-button reports receive a verdict and can lead to analyst escalation, reporter feedback or remediation. Reporting alone is not autonomous triage.",
    categoryId: "email-security",
  },
  {
    id: "cap-email-threat-hunting",
    slug: "email-threat-hunting",
    name: "Investigate and hunt historical email",
    description:
      "A sourced claim for mailbox search, related-message investigation or forensic evidence export. Historical search is not proof that an entire campaign was removed.",
    categoryId: "email-security",
  },
  {
    id: "cap-email-custom-detection-engineering",
    slug: "email-custom-detection-engineering",
    name: "Create, test and govern custom email detections",
    description:
      "A sourced claim that analysts or agents author organization-specific rules/models with defined backtesting, change control and rollback. A rule suggestion does not mean automatic production enforcement.",
    categoryId: "email-security",
  },
  {
    id: "cap-email-prompt-injection-detection",
    slug: "email-prompt-injection-detection",
    name: "Detect AI-directed instructions inside email",
    description:
      "A sourced claim that the product detects suspicious instructions aimed at AI email readers or agents. Detection/tagging and preventing the agent from executing the instruction are different controls.",
    categoryId: "email-security",
  },
];

export const emailSecurityUseCases: UseCase[] = [
  {
    id: "uc-email-fraud-response",
    slug: "email-fraud-response",
    name: "Stop email fraud and reduce SOC triage",
    problem:
      "A convincing payment-change request passes sender authentication and reaches an employee. Native mail controls, an API security product and the SOC can each detect or respond at different times. A single alert is not evidence that exposure ended.",
    architecture:
      "Separate message evaluation from pre-inbox hold, post-delivery remediation, employee-reported triage, campaign hunting and organization-specific rule changes. Record the existing Microsoft 365 or Google Workspace license and gateway first. Connect email signals to identity/account response and DLP only when those controls are independently sourced and in scope.",
    stakeholders: [
      "Email/messaging security owner",
      "SOC analyst or incident responder",
      "M365 or Google Workspace administrator",
      "Security architect and procurement",
    ],
    triggers: [
      "Confirmed BEC or impersonation incident",
      "User-reported phishing backlog",
      "Secure email gateway renewal",
      "AI assistant reading untrusted mailbox content",
    ],
    budgetOwner:
      "Messaging/IT security or SOC, depending on whether the purchase is threat prevention, investigation labor or a broader workspace-security platform. Do not infer universal ownership.",
    successMetrics: [
      "Incremental confirmed threats detected against the existing stack",
      "False positives per 1,000 legitimate messages",
      "Median and p95 delivery-to-effective-remediation",
      "Employee-report queue resolution time and analyst minutes",
      "Reversal time for an incorrect quarantine or rule",
    ],
    categoryIds: ["email-security", "itdr", "dlp", "security-awareness"],
    capabilityIds: [
      "cap-email-contextual-threat-detection",
      "cap-email-link-attachment-analysis",
      "cap-email-pre-delivery-enforcement",
      "cap-email-post-delivery-remediation",
      "cap-email-user-report-triage",
      "cap-email-threat-hunting",
      "cap-email-custom-detection-engineering",
      "cap-email-prompt-injection-detection",
      "cap-dlp",
    ],
    discoveryQuestions: [
      "What specific incident are we trying to prevent: vendor-payment fraud, credential theft, malware or account takeover?",
      "Which controls act before the inbox and which remove mail after delivery, including the p95 exposure window?",
      "How are employee reports investigated, escalated and closed, and how much analyst time is involved?",
      "Can detection logic be inspected, changed, tested and rolled back, and who approves agent actions?",
      "Which current Microsoft/Google, SEG, DLP, awareness and identity controls would coexist versus truly be displaced?",
    ],
    buyerQuestion:
      "Which mail threats and operational costs are still uncovered after the existing stack, and what control must act at which point in the attack?",
  },
];
