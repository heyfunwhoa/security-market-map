/**
 * Which AI agents each product says it covers, taken from one recorded claim per row. "Not listed" means
 * the cited claim does not name the agent, not that the product lacks support. Scope says what the claim
 * covers: deciding on actions, inventory and posture, or inspecting data in AI tools.
 */
import { catalog } from "./catalog";

export const AGENTS = [
  { key: "claude-code", label: "Claude Code", aliases: ["Claude Code", "Claude Enterprise (Chat, Cowork and Code)"] },
  { key: "claude-desktop", label: "Claude desktop or Cowork", aliases: ["Claude Desktop", "Claude Cowork", "Claude Enterprise (Chat, Cowork and Code)"] },
  { key: "cursor", label: "Cursor", aliases: ["Cursor"] },
  { key: "codex", label: "OpenAI Codex", aliases: ["Codex"] },
  { key: "copilot", label: "GitHub Copilot", aliases: ["Copilot"] },
  { key: "gemini-cli", label: "Gemini CLI", aliases: ["Gemini CLI"] },
  { key: "windsurf", label: "Windsurf", aliases: ["Windsurf"] },
  { key: "antigravity", label: "Antigravity", aliases: ["Antigravity"] },
  { key: "devin", label: "Devin", aliases: ["Devin"] },
  { key: "opencode", label: "OpenCode", aliases: ["OpenCode"] },
] as const;

export type AgentKey = (typeof AGENTS)[number]["key"];
export type CoverageScope = "Decides on actions" | "Inventory and posture" | "Data in AI tools";

export type AgentCoverageRow = { productId: string; claimId: string; scope: CoverageScope; agents: AgentKey[] };

export const agentCoverage: AgentCoverageRow[] = [
  { productId: "backslash-agentic-endpoint", claimId: "claim-ae-backslash-onhost", scope: "Decides on actions", agents: ["claude-code", "cursor", "codex", "copilot", "antigravity", "devin"] },
  { productId: "crowdstrike-falcon-guardian", claimId: "claim-ae-cap-guardian-hooks", scope: "Decides on actions", agents: ["claude-code", "codex", "copilot", "opencode", "cursor"] },
  { productId: "knostic-kirin", claimId: "claim-ae-knostic-agents", scope: "Decides on actions", agents: ["cursor", "claude-code", "copilot", "windsurf", "codex", "devin", "gemini-cli", "claude-desktop"] },
  { productId: "microsoft-defender-for-endpoint", claimId: "claim-ae-cap-msde-hook", scope: "Decides on actions", agents: ["claude-code", "codex", "copilot"] },
  { productId: "palo-alto-koi", claimId: "claim-ae-cap-koi-preexec", scope: "Decides on actions", agents: ["cursor", "claude-code", "antigravity"] },
  { productId: "zenity-platform", claimId: "claim-ae-zenity-agents", scope: "Decides on actions", agents: ["codex", "claude-code", "claude-desktop", "cursor", "copilot"] },
  { productId: "island-agentic-endpoint-posture", claimId: "claim-ae-island-realtime", scope: "Inventory and posture", agents: ["claude-desktop", "claude-code", "codex", "cursor", "gemini-cli", "copilot"] },
  { productId: "harmonic-platform", claimId: "claim-ae-harmonic-endpoint", scope: "Data in AI tools", agents: ["claude-desktop", "cursor", "codex"] },
];

/** Products in the agentic endpoint set with no public agent list in a recorded claim. */
export const agentCoverageNotPublished = ["bay-platform", "glow-platform", "bloom-platform", "pluto-platform", "origin-endpoint-ai-observability"];

export function resolveAgentCoverage() {
  return agentCoverage
    .map((row) => {
      const product = catalog.products.find((item) => item.id === row.productId);
      const claim = catalog.claims.find((item) => item.id === row.claimId);
      return product && claim ? { ...row, product, claim } : null;
    })
    .filter((row) => row !== null)
    .sort((a, b) => a.scope.localeCompare(b.scope) || a.product.name.localeCompare(b.product.name));
}
