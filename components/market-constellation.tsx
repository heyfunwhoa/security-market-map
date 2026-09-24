export type MarketCircle = {
  id: string;
  name: string;
  lines: string[];
  question: string;
  categories: string;
  examples: string;
  href: string;
  cx: number;
  cy: number;
  r: number;
  fill: string;
};

export const marketCircles: MarketCircle[] = [
  {
    id: "email",
    name: "Email and collaboration",
    lines: ["Email"],
    question: "Can we stop phishing and account compromise?",
    categories: "Email security, phishing detection, account takeover defense, security awareness",
    examples: "Proofpoint, Mimecast, Abnormal, Microsoft",
    href: "/categories/email-security",
    cx: 115,
    cy: 355,
    r: 62,
    fill: "oklch(0.86 0.06 25)",
  },
  {
    id: "identity",
    name: "Identity and access",
    lines: ["Identity", "and access"],
    question: "Who or what can access a system?",
    categories: "SSO, MFA, access management, customer identity, IGA, PAM, nonhuman identity",
    examples: "Microsoft Entra, Okta, SailPoint, Saviynt, CyberArk",
    href: "/domains/identity",
    cx: 185,
    cy: 235,
    r: 115,
    fill: "oklch(0.84 0.05 240)",
  },
  {
    id: "endpoint",
    name: "Endpoint and device",
    lines: ["Endpoint"],
    question: "Is a laptop, server, or mobile device compromised?",
    categories: "Endpoint protection, endpoint detection and response, mobile security",
    examples: "CrowdStrike, Microsoft Defender, SentinelOne",
    href: "/categories/endpoint-security",
    cx: 210,
    cy: 400,
    r: 82,
    fill: "oklch(0.86 0.03 70)",
  },
  {
    id: "ai",
    name: "AI security",
    lines: ["AI"],
    question: "Can we govern models, apps, agents, and their access?",
    categories: "AI posture, model and application testing, prompt-injection defenses, agent identity",
    examples: "Lakera, HiddenLayer, Robust Intelligence",
    href: "/categories/ai-application-security",
    cx: 270,
    cy: 115,
    r: 70,
    fill: "oklch(0.86 0.05 190)",
  },
  {
    id: "app",
    name: "Application and software supply chain",
    lines: ["Application"],
    question: "Is the software we build and ship safe?",
    categories: "SAST, SCA, secrets detection, API security, ASPM, software supply chain security",
    examples: "GitHub, GitLab, Snyk, Checkmarx, Truffle Security",
    href: "/domains/appsec",
    cx: 350,
    cy: 245,
    r: 105,
    fill: "oklch(0.86 0.06 150)",
  },
  {
    id: "network",
    name: "Network and access edge",
    lines: ["Network", "edge"],
    question: "Which traffic and connections should be allowed?",
    categories: "Firewalls, secure web gateway, ZTNA, SSE, SASE, segmentation",
    examples: "Palo Alto Networks, Fortinet, Zscaler, Netskope, Cloudflare",
    href: "/categories/network-edge",
    cx: 500,
    cy: 165,
    r: 92,
    fill: "oklch(0.88 0.06 85)",
  },
  {
    id: "exposure",
    name: "Exposure management",
    lines: ["Exposure"],
    question: "Which weaknesses should we fix first?",
    categories: "Vulnerability management, external attack surface, breach simulation, CTEM",
    examples: "Tenable, Qualys, Rapid7, Censys, Pentera",
    href: "/domains/offensive",
    cx: 490,
    cy: 330,
    r: 90,
    fill: "oklch(0.87 0.07 55)",
  },
  {
    id: "cloud",
    name: "Cloud and workload",
    lines: ["Cloud"],
    question: "Are cloud resources configured and running safely?",
    categories: "CSPM, CIEM, CWPP, CNAPP",
    examples: "Wiz, Orca, Palo Alto Networks, Microsoft, CrowdStrike",
    href: "/domains/cloud",
    cx: 650,
    cy: 250,
    r: 110,
    fill: "oklch(0.85 0.05 220)",
  },
  {
    id: "secops",
    name: "Security operations",
    lines: ["Security", "operations"],
    question: "What happened, and how do we respond?",
    categories: "SIEM, XDR, SOAR, threat intelligence, managed detection and response",
    examples: "Microsoft Sentinel, Splunk, Google SecOps, Palo Alto Cortex, Rapid7",
    href: "/domains/secops",
    cx: 760,
    cy: 345,
    r: 90,
    fill: "oklch(0.84 0.05 20)",
  },
  {
    id: "data",
    name: "Data security",
    lines: ["Data"],
    question: "Where is sensitive data, who can reach it, and can it leave?",
    categories: "Discovery and classification, DSPM, DLP, encryption and key management",
    examples: "Microsoft Purview, Varonis, Cyera, BigID",
    href: "/domains/data",
    cx: 790,
    cy: 210,
    r: 100,
    fill: "oklch(0.85 0.05 310)",
  },
  {
    id: "governance",
    name: "Governance and resilience",
    lines: ["Governance"],
    question: "Can we demonstrate control and recover?",
    categories: "GRC, third-party risk, privacy, backup, disaster recovery, incident readiness",
    examples: "ServiceNow, Archer, OneTrust, Veeam, Rubrik",
    href: "/domains/grc",
    cx: 900,
    cy: 310,
    r: 78,
    fill: "oklch(0.86 0.04 140)",
  },
];

export function MarketConstellation() {
  return (
    <figure className="mt-6">
      <figcaption className="max-w-3xl text-sm leading-6 text-muted-foreground">
        Follow an attack from left to right. An identity gets access, uses an application or a network
        path, reaches a workload, and affects data. The circles underneath are how a team detects the
        incident, decides what to fix, and shows that the control still holds. Overlaps are shared
        problems and shared budgets, not a ranking.
      </figcaption>
      <p className="mt-3 text-xs text-muted-foreground sm:hidden">
        Scroll sideways to move from identity across to data.
      </p>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card">
        <svg
          viewBox="0 0 1040 520"
          role="group"
          aria-label="Overlapping circles of security domains, from identity to data"
          className="h-auto min-w-[720px] w-full"
        >
          <g style={{ mixBlendMode: "multiply" }}>
            {marketCircles.map((circle) => (
              <circle key={circle.id} cx={circle.cx} cy={circle.cy} r={circle.r} fill={circle.fill} />
            ))}
          </g>
          {marketCircles.map((circle) => {
            const start = circle.cy - ((circle.lines.length - 1) * 16) / 2;
            return (
              <a
                key={circle.id}
                href={circle.href}
                aria-label={`${circle.name}. ${circle.question}`}
                className="outline-none [&:hover>circle]:stroke-foreground [&:focus-visible>circle]:stroke-foreground"
              >
                <circle
                  cx={circle.cx}
                  cy={circle.cy}
                  r={circle.r}
                  fill="transparent"
                  className="stroke-transparent stroke-[3]"
                />
                <text
                  x={circle.cx}
                  y={start}
                  textAnchor="middle"
                  fill="currentColor"
                  style={{ fontFamily: "var(--font-heading)", fontSize: circle.r > 100 ? 18 : 14 }}
                  className="pointer-events-none"
                >
                  {circle.lines.map((line, index) => (
                    <tspan key={line} x={circle.cx} dy={index === 0 ? 0 : 18}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </a>
            );
          })}
        </svg>
      </div>
    </figure>
  );
}
