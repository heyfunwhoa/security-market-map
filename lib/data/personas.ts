import type { BuyerPersona } from "../schema";

export const personas: BuyerPersona[] = [
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
    title: "Finds secrets and owns the developer workflow",
    caresAbout: "Detection, validity, and who rotates the key.",
    questions: [
      "Which surfaces are in scope?",
      "Who is allowed to revoke?",
    ],
    categoryIds: ["secrets-detection", "nhi"],
  },
  {
    id: "platform",
    name: "Platform or SRE",
    title: "Runs the vault and the workloads",
    caresAbout: "Dynamic credentials, PKI, and how a workload authenticates to the vault.",
    questions: [
      "Static storage or dynamic issuance?",
      "Which clouds and data stores?",
    ],
    categoryIds: ["secrets-management", "nhi"],
  },
  {
    id: "cloud-sec",
    name: "Cloud security",
    title: "Owns CNAPP and cloud entitlements",
    caresAbout: "Effective access and whether IAM will certify it.",
    questions: [
      "Is CIEM already in the CNAPP?",
      "Who remediates?",
    ],
    categoryIds: ["ciem", "adjacent-security", "itdr"],
  },
  {
    id: "ai-owner",
    name: "AI platform owner",
    title: "Ships agents and tool gateways",
    caresAbout: "Sponsorship, tool scope, and not adding a second proxy.",
    questions: [
      "Which gateway is already deployed?",
      "Can an agent outgrow its sponsor?",
    ],
    categoryIds: ["agent-identity", "nhi"],
  },
];
