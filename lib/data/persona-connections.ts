import type { UseCaseSeatsInput } from "../schema";

/**
 * Links each use case to typed seats (security personas and non-security stakeholders).
 * Mapped from the free-text `stakeholders` and `budgetOwner` on each use case. Strings with no
 * modeled seat stay in `unmodeledStakeholders` so the gap is visible.
 */
export const useCaseSeats: UseCaseSeatsInput[] = [
  {
    useCaseId: "uc-jml",
    seatIds: ["iga-owner", "security-architect", "grc-owner", "hr-people"],
    likelyBudgetSeatIds: ["iga-owner", "grc-owner"],
    unmodeledStakeholders: ["App owners"],
  },
  {
    useCaseId: "uc-jit",
    seatIds: ["pam-owner", "it-operations", "soc-lead", "iga-owner"],
    likelyBudgetSeatIds: ["pam-owner", "identity-security"],
  },
  {
    useCaseId: "uc-detect",
    seatIds: ["appsec", "developer", "platform", "cloud-sec"],
    likelyBudgetSeatIds: ["appsec"],
  },
  {
    useCaseId: "uc-vault",
    seatIds: ["platform", "platform-security", "developer"],
    likelyBudgetSeatIds: ["platform", "platform-security"],
    unmodeledStakeholders: ["App owner"],
  },
  {
    useCaseId: "uc-nhi",
    seatIds: ["identity-security", "cloud-sec", "appsec"],
    likelyBudgetSeatIds: ["identity-security", "cloud-sec"],
    unmodeledStakeholders: ["Service owners"],
  },
  {
    useCaseId: "uc-agent",
    seatIds: ["ai-owner", "identity-security", "ai-security"],
    likelyBudgetSeatIds: ["ai-owner", "identity-security"],
    unmodeledStakeholders: ["App owner of the tool"],
  },
  {
    useCaseId: "uc-ciem",
    seatIds: ["cloud-sec", "identity-security", "platform"],
    likelyBudgetSeatIds: ["cloud-sec"],
  },
  {
    useCaseId: "uc-itdr",
    seatIds: ["soc-lead", "identity-security", "it-operations"],
    likelyBudgetSeatIds: ["soc-lead"],
  },
  {
    useCaseId: "uc-ciam",
    seatIds: ["developer", "engineering-manager", "security-architect", "cto"],
    likelyBudgetSeatIds: ["cto"],
    unmodeledStakeholders: ["Developer experience"],
  },
  {
    useCaseId: "uc-finding-route",
    seatIds: ["appsec", "it-security", "cloud-sec", "platform", "exposure-management"],
    likelyBudgetSeatIds: [],
  },
  {
    useCaseId: "uc-product-release",
    seatIds: ["product-security", "engineering-manager", "grc-owner"],
    likelyBudgetSeatIds: ["product-security"],
  },
  {
    useCaseId: "uc-customer-trust",
    seatIds: ["grc-owner", "product-security"],
    likelyBudgetSeatIds: ["grc-owner"],
    unmodeledStakeholders: ["Sales engineering"],
  },
  {
    useCaseId: "uc-sensitive-data",
    seatIds: ["data-security", "privacy", "identity-security"],
    likelyBudgetSeatIds: ["data-security"],
    unmodeledStakeholders: ["Data platform"],
  },
  {
    useCaseId: "uc-developer-endpoint",
    seatIds: ["appsec", "it-security", "platform-security", "soc-lead"],
    likelyBudgetSeatIds: ["appsec", "it-security", "platform-security"],
  },
];

/**
 * Proposed persona owners for categories that had none. Hypotheses based on each category's
 * catalog `buyerOwner` text; applied to persona `categoryIds` so they show in the buyer filter.
 */
export const orphanCategoryOwners: Record<string, string[]> = {
  "agentic-runtime": ["identity-security", "ai-owner"],
  ciam: ["identity-security"],
  "security-ratings": ["grc-owner"],
  "database-security": ["data-security"],
  "endpoint-control": ["it-security"],
  "app-runtime": ["appsec"],
  "enterprise-browser": ["it-security", "saas-security"],
  "detection-engineering": ["detection-engineer"],
  "identity-orchestration": ["security-architect"],
  "runtime-validated-application-security": ["appsec"],
  "mcp-security": ["ai-security"],
  "model-security": ["ai-owner"],
  iast: ["appsec"],
};
