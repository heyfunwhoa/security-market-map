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
