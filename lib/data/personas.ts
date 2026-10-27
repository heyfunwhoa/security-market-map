import type { BuyerPersona } from "../schema";

export const personas: BuyerPersona[] = [
  {
    id: "ciso",
    name: "CISO / VP of security",
    title: "Sets security outcomes, risk appetite, and which programs get funded",
    caresAbout:
      "Defensible outcomes within budget—without mistaking a title for day-to-day tool ownership.",
    questions: [
      "Which security outcome warrants investment this year?",
      "Who operates the control after purchase?",
      "What evidence would make you comfortable approving?",
    ],
    categoryIds: ["grc-controls", "siem", "endpoint-security", "iga", "cnapp"],
  },
  {
    id: "security-architect",
    name: "Security architect",
    title: "Designs reusable controls and standards across apps, identity, and platform",
    caresAbout: "Threat models, integration fit, and patterns teams can actually adopt.",
    questions: [
      "Which control must be shared versus team-local?",
      "Does this duplicate an existing gateway or identity path?",
      "What fails closed if the pattern is wrong?",
    ],
    categoryIds: ["threat-modeling", "workforce-identity", "secrets-management", "aspm", "cnapp"],
  },
  {
    id: "identity-security",
    name: "Identity security lead",
    title: "Owns how humans and non-humans authenticate and stay justified",
    caresAbout:
      "Workforce IAM, NHI boundaries, and whether IGA, PAM, and cloud entitlements tell one story.",
    questions: [
      "Is the pain joiner/leaver, standing privilege, or machine identity?",
      "Who certifies cloud entitlements today?",
      "Are agents and workloads in the same program as people?",
    ],
    categoryIds: ["workforce-identity", "iga", "pam", "nhi", "ciem", "itdr", "agent-identity"],
  },
  {
    id: "iga-owner",
    name: "IGA program owner",
    title: "Runs certifications, joiners, and audit evidence",
    caresAbout: "Review completion, leavers, SoD, and connector reality.",
    questions: [
      "Which apps are API-provisioned?",
      "Are non-humans in scope this year?",
    ],
    categoryIds: ["iga", "workforce-identity"],
  },
  {
    id: "pam-owner",
    name: "PAM owner",
    title: "Owns standing privilege and admin access",
    caresAbout: "JIT, break-glass, session evidence, and vault overlap.",
    questions: [
      "Is this an Entra role or a server session?",
      "What expires on its own?",
    ],
    categoryIds: ["pam", "secrets-management"],
  },
  {
    id: "appsec",
    name: "AppSec lead",
    title: "Owns application risk in code, dependencies, APIs, and secrets findings",
    caresAbout:
      "Detection coverage, noise, developer adoption, and who remediates—including rotating a leaked credential.",
    questions: [
      "Which surfaces are in scope: code, deps, APIs, or runtime?",
      "Who is allowed to revoke or close a finding?",
      "Is this an AppSec ticket or an IT patch queue?",
    ],
    categoryIds: ["sast", "sca", "dast", "api-security", "aspm", "secrets-detection", "nhi"],
  },
  {
    id: "platform",
    name: "DevOps / platform engineering",
    title: "Runs the paved road: pipelines, vault delivery, and workload identity",
    caresAbout:
      "Self-service delivery, dynamic credentials, and keeping teams on approved modules without ticket toil.",
    questions: [
      "Static storage or dynamic issuance?",
      "Which clouds and data stores must the platform support first?",
      "Who changes the shared CI template when security raises the bar?",
    ],
    categoryIds: ["secrets-management", "nhi", "container-security", "iac-security"],
  },
  {
    id: "cloud-sec",
    name: "Cloud security",
    title: "Owns cloud account posture, workloads, entitlements, and cloud detection foundations",
    caresAbout:
      "Effective access, misconfiguration blast radius, and whether identity will certify what CNAPP finds.",
    questions: [
      "Is CIEM already in the CNAPP?",
      "Who remediates account findings versus app findings?",
      "Is this a cloud control-plane gap or a shared CI/image gap?",
    ],
    categoryIds: ["cspm", "cwpp", "ciem", "cnapp", "cloud-detection", "itdr", "adjacent-security"],
  },
  {
    id: "data-security",
    name: "Data security",
    title: "Owns where sensitive data is, who can read it, and what can leave",
    caresAbout:
      "Discovery versus access governance versus egress—and not treating a store scan as email DLP.",
    questions: [
      "Is the pain finding the data, who can read it, or how it leaves?",
      "Which channel: store, SaaS, email, endpoint, or AI tool path?",
      "Does a CNAPP data module already claim this job?",
    ],
    categoryIds: ["dspm", "dlp", "data-access-governance", "privacy-governance", "data-encryption"],
  },
  {
    id: "ai-security",
    name: "AI security",
    title: "Owns controls for models, AI apps, agents, tools, and the data those workflows touch",
    caresAbout:
      "Prompt and tool abuse, agent identity scope, and data leaving through AI paths—not only shipping the gateway.",
    questions: [
      "Is the risk the model, the app, the agent identity, or the data path?",
      "Which gateway or proxy is already deployed?",
      "Who can approve an agent action that changes production state?",
    ],
    categoryIds: ["ai-application-security", "ai-data-security", "ai-governance", "agent-identity", "nhi"],
  },
  {
    id: "ai-owner",
    name: "AI platform owner",
    title: "Ships agents and tool gateways",
    caresAbout:
      "Delivery speed, sponsorship, tool scope, and not adding a second proxy—security bar often lands with AI security or identity.",
    questions: [
      "Which gateway is already deployed?",
      "Can an agent outgrow its sponsor?",
      "Who owns the security review for a new tool grant?",
    ],
    categoryIds: ["agent-identity", "nhi", "ai-governance"],
  },
  {
    id: "engineering-manager",
    name: "Engineering manager",
    title: "Prioritizes remediation against feature work for a product team",
    caresAbout: "Clear ownership, realistic SLAs, and controls that do not stall delivery without a paved path.",
    questions: [
      "Who on your team owns security tickets today?",
      "What would make a finding actionable without a war room?",
      "Is security work estimated in the sprint or treated as interrupt?",
    ],
    categoryIds: ["sast", "sca", "aspm", "secrets-detection"],
  },
];
