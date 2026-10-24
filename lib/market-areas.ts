export type MarketArea = {
  id: string;
  name: string;
  question: string;
  categories: string;
  examples: string;
  href: string;
  fill: string;
};

export const marketAreas: MarketArea[] = [
  {
    id: "email",
    name: "Email and collaboration",
    question: "Can we stop phishing and account compromise?",
    categories: "Email security, phishing detection, account takeover defense, security awareness",
    examples: "Proofpoint, Mimecast, Abnormal, Microsoft",
    href: "/categories/email-security",
    fill: "oklch(0.86 0.06 25)",
  },
  {
    id: "identity",
    name: "Identity and access",
    question: "Who or what can access a system?",
    categories: "SSO, MFA, access management, customer identity, IGA, PAM, nonhuman identity",
    examples: "Microsoft Entra, Okta, SailPoint, Saviynt, CyberArk",
    href: "/domains/identity",
    fill: "oklch(0.84 0.05 240)",
  },
  {
    id: "endpoint",
    name: "Endpoint and device",
    question: "Is a laptop, server, or mobile device compromised?",
    categories: "Endpoint protection, endpoint detection and response, mobile security",
    examples: "CrowdStrike, Microsoft Defender, SentinelOne",
    href: "/categories/endpoint-security",
    fill: "oklch(0.86 0.03 70)",
  },
  {
    id: "ai",
    name: "AI security",
    question: "Can we govern models, apps, agents, and their access?",
    categories: "AI posture, model and application testing, prompt-injection defenses, agent identity",
    examples: "Lakera, HiddenLayer, Robust Intelligence",
    href: "/categories/ai-application-security",
    fill: "oklch(0.86 0.05 190)",
  },
  {
    id: "app",
    name: "Application and software supply chain",
    question: "Is the software we build and ship safe?",
    categories: "SAST, SCA, secrets detection, API security, ASPM, software supply chain security",
    examples: "GitHub, GitLab, Snyk, Checkmarx, Truffle Security",
    href: "/domains/appsec",
    fill: "oklch(0.86 0.06 150)",
  },
  {
    id: "network",
    name: "Network and access edge",
    question: "Which traffic and connections should be allowed?",
    categories: "Firewalls, secure web gateway, ZTNA, SSE, SASE, segmentation",
    examples: "Palo Alto Networks, Fortinet, Zscaler, Netskope, Cloudflare",
    href: "/categories/network-edge",
    fill: "oklch(0.88 0.06 85)",
  },
  {
    id: "exposure",
    name: "Exposure management",
    question: "Which weaknesses should we fix first?",
    categories: "Vulnerability management, external attack surface, breach simulation, CTEM",
    examples: "Tenable, Qualys, Rapid7, Censys, Pentera",
    href: "/domains/offensive",
    fill: "oklch(0.87 0.07 55)",
  },
  {
    id: "cloud",
    name: "Cloud and workload",
    question: "Are cloud resources configured and running safely?",
    categories: "CSPM, CIEM, CWPP, CNAPP",
    examples: "Wiz, Orca, Palo Alto Networks, Microsoft, CrowdStrike",
    href: "/domains/cloud",
    fill: "oklch(0.85 0.05 220)",
  },
  {
    id: "secops",
    name: "Security operations",
    question: "What happened, and how do we respond?",
    categories: "SIEM, XDR, SOAR, threat intelligence, managed detection and response",
    examples: "Microsoft Sentinel, Splunk, Google SecOps, Palo Alto Cortex, Rapid7",
    href: "/domains/secops",
    fill: "oklch(0.84 0.05 20)",
  },
  {
    id: "data",
    name: "Data security",
    question: "Where is sensitive data, who can reach it, and can it leave?",
    categories: "Discovery and classification, DSPM, DLP, encryption and key management",
    examples: "Cyera, Teleskope, Concentric AI, Varonis, BigID",
    href: "/domains/data",
    fill: "oklch(0.85 0.05 310)",
  },
  {
    id: "governance",
    name: "Governance and resilience",
    question: "Can we demonstrate control and recover?",
    categories: "GRC, third-party risk, privacy, backup, disaster recovery, incident readiness",
    examples: "ServiceNow, Archer, OneTrust, Veeam, Rubrik",
    href: "/domains/grc",
    fill: "oklch(0.86 0.04 140)",
  },
];

