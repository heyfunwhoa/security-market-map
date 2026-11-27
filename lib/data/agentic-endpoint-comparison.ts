import type { Capability, UseCase } from "../schema";

// Agentic endpoint comparison set, 2026-11-25. Separate from developer-endpoint-comparison.ts:
// that set asks about developer workstations (local secrets, package installs, honeytokens);
// this one asks what agent-security buyers ask about AI agents acting on devices.
// The compare engine returns Unknown when no matching sourced claim exists.
export const agenticEndpointCapabilities: Capability[] = [
  { id: "cap-agent-asset-inventory", slug: "agent-asset-inventory", name: "AI agent and tool inventory", description: "Lists agents, MCP servers, extensions, skills or local models on devices. Inventory alone does not block anything.", categoryId: "agentic-runtime" },
  { id: "cap-agent-preexec-control", slug: "agent-preexec-control", name: "Decide before an agent action runs", description: "Allows, asks or blocks a proposed agent action before it executes. Coverage depends on the agent, its hook events and the deployment mode.", categoryId: "agentic-runtime" },
  { id: "cap-agent-session-context", slug: "agent-session-context", name: "Decisions use session context", description: "Weighs the prompt, prior steps, identity and tools in the session, not only the single action.", categoryId: "agentic-runtime" },
  { id: "cap-agent-policy-learning", slug: "agent-policy-learning", name: "Policy drafted from observed activity", description: "Proposes policy from observed agent behavior. A learned baseline is not a reviewed policy.", categoryId: "agentic-runtime" },
  { id: "cap-agent-unhooked-coverage", slug: "agent-unhooked-coverage", name: "Coverage for AI tools without hooks", description: "Sees or controls agents and AI tools that expose no native hook, for example through a sensor, browser or network path.", categoryId: "agentic-runtime" },
  { id: "cap-agent-action-audit", slug: "agent-action-audit", name: "Agent action audit trail", description: "Records agent actions with user, tool and decision for investigation. A record is not proof every risky action was intercepted.", categoryId: "agentic-runtime" },
];

export const agenticEndpointUseCases: UseCase[] = [
  {
    id: "uc-agentic-endpoint",
    slug: "agentic-endpoint-control",
    name: "See and control AI agents acting on devices",
    problem: "Coding and personal agents run on laptops, browsers and cloud workspaces with the user's permissions. Prompt filters and EDR see different parts of what an agent does, and approved tools spread faster than policy.",
    architecture: "Inventory agents and their tools, decide on risky actions before they run, and keep a record of who or what acted. Controls sit in five places: a short-lived MDM or EDR script (sees, cannot block), a resident sensor (stops agents and processes), the AI tool's own hooks (decides single actions for supported tools), a gateway (stops what routes through it) and a browser extension (web agents only). Check which of these a deployment turns on, which agents and events it covers, and what happens for tools without hooks.",
    stakeholders: ["CISO", "Endpoint and IT security", "AppSec and platform engineering", "AI governance", "SOC"],
    triggers: ["AI coding agent rollout", "Shadow AI or MCP server discovery", "Agent incident such as a destructive command or data exposure", "EDR renewal or AI security budget"],
    budgetOwner: "CISO or endpoint security, sometimes AI governance; confirm the purchaser.",
    successMetrics: ["Agents and tools inventoried versus known", "Risky synthetic actions decided before execution", "Supported agent and hook-event coverage", "False blocks and Ask prompts per developer per week"],
    categoryIds: ["agentic-runtime", "endpoint-control", "mcp-security", "endpoint-security", "ai-governance"],
    capabilityIds: agenticEndpointCapabilities.map((c) => c.id),
    discoveryQuestions: [
      "Which agents, versions and hook events are covered today?",
      "Which deployment mode prevents, and which only detects?",
      "What happens for AI tools that expose no hook?",
      "How is policy drafted, reviewed and approved per team?",
      "What session data leaves the device, and where is it stored?",
    ],
    buyerQuestion: "Can we see and stop risky AI agent actions on our devices without deploying a new agent?",
  },
];
