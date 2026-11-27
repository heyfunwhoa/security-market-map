/**
 * "Where it fits" context for product research pages that use the regrouped layout.
 * Every line here restates a claim already recorded in the catalog; links go to vendor or product pages.
 * Peer groupings describe deployment approach only. Sharing an approach does not make vendors direct competitors.
 */
export type ProductFit = {
  deployment: string;
  /** null when no analyst coverage is recorded; the page says so instead of leaving a gap. */
  analyst: { text: string; href: string; label: string } | null;
  peers: { approach: string; items: { name: string; href: string }[] }[];
};

export const productFit: Record<string, ProductFit> = {
  "bay-platform": {
    deployment: "Agentless rollout: a short-lived collector delivered through the MDM or EDR already on the device, plus a decision on each agent action through the AI tool's own hook. No persistent agent, proxy or kernel driver, per Bay.",
    analyst: {
      text: "SACR places Bay in endpoint control and prevention zones 1–4 (posture, in-session enforcement, runtime visibility, intent) and calls it the strongest zone 1 option for credential exposure in agentic toolchains. SACR also notes a collector-only deployment runs in detection mode.",
      href: "https://softwareanalyst.substack.com/p/the-ciso-guide-to-endpoint-control",
      label: "SACR, CISO Guide to Endpoint Control and Prevention (22 Jul 2026)",
    },
    peers: [
      { approach: "Same rollout: agentless through existing MDM or EDR", items: [
        { name: "Island Agentic Endpoint Posture", href: "/products/island-agentic-endpoint-posture" },
        { name: "Backslash Security", href: "/products/backslash-agentic-endpoint" },
      ] },
      { approach: "Same decision point: the AI tool's own hooks", items: [
        { name: "Zenity", href: "/products/zenity-platform" },
        { name: "Knostic Kirin", href: "/products/knostic-kirin" },
        { name: "Microsoft Defender for Endpoint", href: "/vendors/microsoft" },
      ] },
      { approach: "Sensor-first: a full endpoint agent", items: [
        { name: "CrowdStrike Falcon Guardian", href: "/products/crowdstrike-falcon-guardian" },
        { name: "Neo Security", href: "/vendors/neo-security" },
      ] },
      { approach: "Bundled into an existing EDR or AI platform", items: [
        { name: "Palo Alto Networks (Koi)", href: "/products/palo-alto-koi" },
        { name: "SentinelOne (Prompt Security)", href: "/vendors/sentinelone" },
      ] },
    ],
  },
  "island-agentic-endpoint-posture": {
    deployment: "Runs on Island Desktop for existing Island customers; otherwise agentless through the MDM or EDR already managing the device, per Island. Island does not say which enforcement actions work in agentless mode.",
    analyst: null,
    peers: [
      { approach: "Same rollout: agentless through existing MDM or EDR", items: [
        { name: "Bay platform", href: "/products/bay-platform" },
        { name: "Backslash Security", href: "/products/backslash-agentic-endpoint" },
      ] },
      { approach: "Decision at the AI tool's own hooks", items: [
        { name: "Zenity", href: "/products/zenity-platform" },
        { name: "Knostic Kirin", href: "/products/knostic-kirin" },
        { name: "Microsoft Defender for Endpoint", href: "/vendors/microsoft" },
      ] },
      { approach: "Sensor-first: a full endpoint agent", items: [
        { name: "CrowdStrike Falcon Guardian", href: "/products/crowdstrike-falcon-guardian" },
        { name: "Neo Security", href: "/vendors/neo-security" },
      ] },
      { approach: "Bundled into an existing EDR or AI platform", items: [
        { name: "Palo Alto Networks (Koi)", href: "/products/palo-alto-koi" },
        { name: "SentinelOne (Prompt Security)", href: "/vendors/sentinelone" },
      ] },
    ],
  },
  "palo-alto-koi": {
    deployment: "Palo Alto describes an endpoint component rolled out through its deployment portal on macOS, Windows and Linux, with network routing through Quick Trust or SASE. Koi's own page shows a script package pushed through MDM or EDR. Sold standalone alongside any EDR, or through Cortex XDR and Prisma AIRS.",
    analyst: {
      text: "SACR places Koi across endpoint control and prevention zones 1 to 5 and describes it as a network supply-chain gateway that uses existing CrowdStrike, Defender and MDM telemetry instead of a new agent.",
      href: "https://softwareanalyst.substack.com/p/the-ciso-guide-to-endpoint-control",
      label: "SACR, CISO Guide to Endpoint Control and Prevention (22 Jul 2026)",
    },
    peers: [
      { approach: "Same rollout: agentless through existing MDM or EDR", items: [
        { name: "Bay platform", href: "/products/bay-platform" },
        { name: "Island Agentic Endpoint Posture", href: "/products/island-agentic-endpoint-posture" },
        { name: "Backslash Security", href: "/products/backslash-agentic-endpoint" },
      ] },
      { approach: "Decision at the AI tool's own hooks", items: [
        { name: "Zenity", href: "/products/zenity-platform" },
        { name: "Knostic Kirin", href: "/products/knostic-kirin" },
      ] },
      { approach: "Extends an EDR the customer already runs", items: [
        { name: "CrowdStrike Falcon Guardian", href: "/products/crowdstrike-falcon-guardian" },
        { name: "Microsoft Defender for Endpoint", href: "/vendors/microsoft" },
        { name: "SentinelOne (Prompt Security)", href: "/vendors/sentinelone" },
      ] },
    ],
  },
  "crowdstrike-falcon-guardian": {
    deployment: "Runs on the Falcon sensor the customer already has; CrowdStrike states discovery on Windows and macOS. No separate install is described.",
    analyst: {
      text: "SACR covers this line as Falcon AIDR, delivered through the Falcon sensor, browser extensions, AI gateway integrations, an SDK and an MCP proxy, and notes its prompt-layer telemetry depends on network connectivity. CrowdStrike calls Guardian the evolution of Falcon AIDR, so this is the same product line.",
      href: "https://softwareanalyst.substack.com/p/the-ciso-guide-to-endpoint-control",
      label: "SACR, CISO Guide to Endpoint Control and Prevention (22 Jul 2026)",
    },
    peers: [
      { approach: "Extends an EDR the customer already runs", items: [
        { name: "Microsoft Defender for Endpoint", href: "/vendors/microsoft" },
        { name: "SentinelOne (Prompt Security)", href: "/vendors/sentinelone" },
        { name: "Palo Alto Networks (Koi)", href: "/products/palo-alto-koi" },
      ] },
      { approach: "Startup with its own endpoint agent", items: [
        { name: "Neo Security", href: "/vendors/neo-security" },
      ] },
      { approach: "Agentless through existing MDM or EDR", items: [
        { name: "Bay platform", href: "/products/bay-platform" },
        { name: "Island Agentic Endpoint Posture", href: "/products/island-agentic-endpoint-posture" },
        { name: "Backslash Security", href: "/products/backslash-agentic-endpoint" },
      ] },
      { approach: "Decision at the AI tool's own hooks", items: [
        { name: "Zenity", href: "/products/zenity-platform" },
        { name: "Knostic Kirin", href: "/products/knostic-kirin" },
      ] },
    ],
  },
  "backslash-agentic-endpoint": {
    deployment: "A script pushed through existing MDM that runs, reports and exits, plus an on-host component needed for inline blocking, per Backslash.",
    analyst: null,
    peers: [
      { approach: "Same rollout: agentless through existing MDM or EDR", items: [
        { name: "Bay platform", href: "/products/bay-platform" },
        { name: "Island Agentic Endpoint Posture", href: "/products/island-agentic-endpoint-posture" },
      ] },
      { approach: "Decision at the AI tool's own hooks", items: [
        { name: "Zenity", href: "/products/zenity-platform" },
        { name: "Knostic Kirin", href: "/products/knostic-kirin" },
      ] },
      { approach: "Extends an EDR the customer already runs", items: [
        { name: "CrowdStrike Falcon Guardian", href: "/products/crowdstrike-falcon-guardian" },
        { name: "Palo Alto Networks (Koi)", href: "/products/palo-alto-koi" },
      ] },
    ],
  },
  "knostic-kirin": {
    deployment: "Kirin runs inside each supported agent, per Knostic. A third-party profile describes a user-space endpoint client pushed through MDM or installed by developers; Knostic's page does not say.",
    analyst: null,
    peers: [
      { approach: "Same decision point: the AI tool's own hooks", items: [
        { name: "Zenity", href: "/products/zenity-platform" },
        { name: "Bay platform", href: "/products/bay-platform" },
        { name: "Microsoft Defender for Endpoint", href: "/vendors/microsoft" },
      ] },
      { approach: "Agentless through existing MDM or EDR", items: [
        { name: "Backslash Security", href: "/products/backslash-agentic-endpoint" },
        { name: "Island Agentic Endpoint Posture", href: "/products/island-agentic-endpoint-posture" },
      ] },
      { approach: "Extends an EDR the customer already runs", items: [
        { name: "CrowdStrike Falcon Guardian", href: "/products/crowdstrike-falcon-guardian" },
        { name: "Palo Alto Networks (Koi)", href: "/products/palo-alto-koi" },
      ] },
    ],
  },
  "zenity-platform": {
    deployment: "No endpoint sensor, per Zenity: native agent hooks and OpenTelemetry for visibility and blocking, plus the Zenity MCP gateway for tool calls. The endpoint is one surface of a platform that also covers SaaS and cloud agents.",
    analyst: null,
    peers: [
      { approach: "Same decision point: the AI tool's own hooks", items: [
        { name: "Knostic Kirin", href: "/products/knostic-kirin" },
        { name: "Bay platform", href: "/products/bay-platform" },
        { name: "Microsoft Defender for Endpoint", href: "/vendors/microsoft" },
      ] },
      { approach: "Agentless through existing MDM or EDR", items: [
        { name: "Backslash Security", href: "/products/backslash-agentic-endpoint" },
        { name: "Island Agentic Endpoint Posture", href: "/products/island-agentic-endpoint-posture" },
      ] },
      { approach: "Extends an EDR the customer already runs", items: [
        { name: "CrowdStrike Falcon Guardian", href: "/products/crowdstrike-falcon-guardian" },
        { name: "Palo Alto Networks (Koi)", href: "/products/palo-alto-koi" },
      ] },
    ],
  },
};
