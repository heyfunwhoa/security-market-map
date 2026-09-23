import {
  accountSchema,
  fitWeightsSchema,
  type Account,
  type FitWeights,
  type UseCase,
} from "./schema";

export const DEFAULT_WEIGHTS: FitWeights = {
  igaWhitespace: 3,
  pamWhitespace: 2,
  vaultWhitespace: 2,
  complianceNamed: 2,
  agentAdoption: 3,
  triggerPresent: 3,
  cloudNamed: 1,
  idpKnown: 2,
};

export type ScoreFactor = {
  id: keyof FitWeights;
  label: string;
  weight: number;
  value: number | null;
  reason: string;
};

export type AccountScore = {
  score: number | null;
  factors: ScoreFactor[];
  includedWeight: number;
};

function whitespace(
  state: Account["iga"]["state"],
  label: string,
): { value: number | null; reason: string } {
  if (state === "unknown") {
    return {
      value: null,
      reason: `${label} is unknown. It is left out of the score so a blank field is not treated as whitespace.`,
    };
  }
  if (state === "none") {
    return {
      value: 1,
      reason: `You recorded no ${label.toLowerCase()} incumbent. That is whitespace only because you said so.`,
    };
  }
  return {
    value: 0.35,
    reason: `A named ${label.toLowerCase()} incumbent is a displacement conversation, not an empty budget.`,
  };
}

export function scoreAccount(account: Account, weights: FitWeights): AccountScore {
  const parsedAccount = accountSchema.parse(account);
  const parsedWeights = fitWeightsSchema.parse(weights);
  const iga = whitespace(parsedAccount.iga.state, "IGA");
  const pam = whitespace(parsedAccount.pam.state, "PAM");
  const vault = whitespace(parsedAccount.vault.state, "Vault");

  const factors: ScoreFactor[] = [
    {
      id: "idpKnown",
      label: "IdP recorded",
      weight: parsedWeights.idpKnown,
      value: parsedAccount.idp.trim() ? 1 : null,
      reason: parsedAccount.idp.trim()
        ? `IdP recorded as ${parsedAccount.idp.trim()}. The name is not scored as a fit by itself.`
        : "No IdP recorded. Left out of the score.",
    },
    {
      id: "igaWhitespace",
      label: "IGA whitespace",
      weight: parsedWeights.igaWhitespace,
      ...iga,
    },
    {
      id: "pamWhitespace",
      label: "PAM whitespace",
      weight: parsedWeights.pamWhitespace,
      ...pam,
    },
    {
      id: "vaultWhitespace",
      label: "Vault whitespace",
      weight: parsedWeights.vaultWhitespace,
      ...vault,
    },
    {
      id: "complianceNamed",
      label: "Compliance named",
      weight: parsedWeights.complianceNamed,
      value: parsedAccount.compliance.length ? 1 : null,
      reason: parsedAccount.compliance.length
        ? `Frameworks you listed: ${parsedAccount.compliance.join(", ")}.`
        : "No framework listed. Left out rather than assumed.",
    },
    {
      id: "agentAdoption",
      label: "Agent adoption",
      weight: parsedWeights.agentAdoption,
      value:
        parsedAccount.agentAdoption === "unknown"
          ? null
          : parsedAccount.agentAdoption === "production"
            ? 1
            : parsedAccount.agentAdoption === "pilot"
              ? 0.6
              : 0.2,
      reason:
        parsedAccount.agentAdoption === "unknown"
          ? "Agent adoption is unknown and is left out of the score."
          : `You set agent adoption to ${parsedAccount.agentAdoption}.`,
    },
    {
      id: "triggerPresent",
      label: "Trigger written down",
      weight: parsedWeights.triggerPresent,
      value: parsedAccount.triggers.trim() ? 1 : null,
      reason: parsedAccount.triggers.trim()
        ? "A trigger is recorded."
        : "No trigger recorded. Left out of the score.",
    },
    {
      id: "cloudNamed",
      label: "Cloud named",
      weight: parsedWeights.cloudNamed,
      value: parsedAccount.cloud.length ? 1 : null,
      reason: parsedAccount.cloud.length
        ? `Clouds you listed: ${parsedAccount.cloud.join(", ")}.`
        : "No cloud listed. Left out rather than assumed.",
    },
  ];

  const included = factors.filter(
    (factor) => factor.value !== null && factor.weight > 0,
  );
  const includedWeight = included.reduce((sum, factor) => sum + factor.weight, 0);
  const score =
    includedWeight === 0
      ? null
      : Math.round(
          (included.reduce(
            (sum, factor) => sum + factor.weight * (factor.value ?? 0),
            0,
          ) /
            includedWeight) *
            100,
        );

  return { score, factors, includedWeight };
}

export function accountBrief(input: {
  account: Account;
  weights: FitWeights;
  useCases: UseCase[];
}): string {
  const { account, weights, useCases } = input;
  const score = scoreAccount(account, weights);
  const selected = useCases.filter((useCase) =>
    account.useCaseIds.includes(useCase.id),
  );
  const incumbent = (label: string, value: Account["iga"]) => {
    if (value.state === "unknown") return `${label}: not recorded — do not assume`;
    if (value.state === "none") return `${label}: none recorded`;
    return `${label}: ${value.name || "named, but the name was left blank"}`;
  };

  const lines = [
    `# Account brief: ${account.name}`,
    "",
    "Working note for a cybersecurity analyst. Installed technology below is only what was typed into the atlas. Blank fields are unknown.",
    "",
    `- Industry: ${account.industry || "not recorded"}`,
    `- Employees: ${account.employees || "not recorded"}`,
    `- Identity estimate: ${account.identityEstimate || "not recorded"}`,
    `- IdP: ${account.idp || "not recorded — do not assume"}`,
    `- ${incumbent("IGA", account.iga)}`,
    `- ${incumbent("PAM", account.pam)}`,
    `- ${incumbent("Vault", account.vault)}`,
    `- Cloud: ${account.cloud.length ? account.cloud.join(", ") : "not recorded"}`,
    `- Compliance: ${account.compliance.length ? account.compliance.join(", ") : "not recorded"}`,
    `- Agent adoption: ${account.agentAdoption}`,
    `- Partner: ${account.partner || "not recorded"}`,
    `- Triggers: ${account.triggers || "not recorded"}`,
    "",
    "## Hypothesis",
    "",
    account.hypothesis || "No hypothesis recorded.",
    "",
    "## Fit score",
    "",
    score.score === null
      ? "Not scored. Add at least one weighted factor with a known value."
      : `**${score.score} / 100** from the weights currently set. Factors left unknown are excluded, then the rest are renormalized.`,
    "",
    ...score.factors.map(
      (factor) =>
        `- ${factor.label} (weight ${factor.weight}): ${
          factor.value === null ? "excluded" : factor.value
        }. ${factor.reason}`,
    ),
    "",
    "## Sources you attached",
    "",
    ...(account.sourceLinks.length
      ? account.sourceLinks.map((link) => `- [${link.label}](${link.url})`)
      : ["- None. Do not invent a tech stack to fill this."]),
    "",
    "## Discovery plan",
    "",
    ...(selected.length
      ? selected.flatMap((useCase) => [
          `### ${useCase.name}`,
          "",
          ...useCase.discoveryQuestions.map((question) => `- ${question}`),
          "",
        ])
      : ["- Select use cases on the account before exporting a discovery plan.", ""]),
    "## Notes",
    "",
    account.notes || "None.",
    "",
  ];

  return lines.join("\n");
}
