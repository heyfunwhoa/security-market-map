/**
 * "Where it fits" context for product research pages that use the regrouped layout.
 * Every line here restates a claim already recorded in the catalog; links go to vendor or product pages.
 * Peer groupings describe deployment approach only. Sharing an approach does not make vendors direct competitors.
 */
export type ProductFit = {
  deployment: string;
  analyst: { text: string; href: string; label: string };
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
        { name: "Island Agentic Endpoint Posture", href: "/vendors/island" },
        { name: "Backslash Security", href: "/vendors/backslash-security" },
      ] },
      { approach: "Same decision point: the AI tool's own hooks", items: [
        { name: "Zenity", href: "/vendors/zenity" },
        { name: "Knostic Kirin", href: "/vendors/knostic" },
        { name: "Microsoft Defender for Endpoint", href: "/vendors/microsoft" },
      ] },
      { approach: "Sensor-first: a full endpoint agent", items: [
        { name: "CrowdStrike Falcon Guardian", href: "/vendors/crowdstrike" },
        { name: "Neo Security", href: "/vendors/neo-security" },
      ] },
      { approach: "Bundled into an existing EDR or AI platform", items: [
        { name: "Palo Alto Networks (Koi)", href: "/vendors/palo-alto-networks" },
        { name: "SentinelOne (Prompt Security)", href: "/vendors/sentinelone" },
      ] },
    ],
  },
};
