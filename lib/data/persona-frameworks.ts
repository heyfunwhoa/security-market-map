type PersonaView = {
  label: string;
  sourceName?: string;
  sourceUrl?: string;
  topics: { id: string; label: string; categoryIds: string[] }[];
};

export const personaFrameworks: PersonaView[] = [
  {
    label: "CISO and board · NIST CSF 2.0",
    sourceName: "NIST CSF 2.0",
    sourceUrl: "https://www.nist.gov/cyberframework/faqs",
    topics: [
      { id: "csf-govern", label: "Govern", categoryIds: ["grc-controls", "third-party-risk", "ai-governance"] },
      { id: "csf-identify", label: "Identify", categoryIds: ["security-asset-management", "external-attack-surface", "dspm", "ctem"] },
      { id: "csf-protect", label: "Protect", categoryIds: ["workforce-identity", "pam", "endpoint-security", "dlp", "data-encryption", "software-supply-chain"] },
      { id: "csf-detect", label: "Detect", categoryIds: ["siem", "ndr", "itdr", "cloud-detection", "detection-engineering"] },
      { id: "csf-respond", label: "Respond", categoryIds: ["soar", "mdr", "xdr", "ai-soc-investigation", "malware-analysis"] },
      { id: "csf-recover", label: "Recover", categoryIds: ["cyber-recovery"] },
    ],
  },
  {
    label: "AppSec practitioner · OWASP SAMM",
    sourceName: "OWASP SAMM",
    sourceUrl: "https://owaspsamm.org/model/",
    topics: [
      { id: "samm-strategy", label: "Governance · Strategy & Metrics", categoryIds: ["product-security-program", "aspm"] },
      { id: "samm-policy", label: "Governance · Policy & Compliance", categoryIds: ["grc-controls", "product-security-program"] },
      { id: "samm-education", label: "Governance · Education & Guidance", categoryIds: ["product-security-program"] },
      { id: "samm-threat-assessment", label: "Design · Threat Assessment", categoryIds: ["threat-modeling"] },
      { id: "samm-requirements", label: "Design · Security Requirements", categoryIds: ["product-security-program", "threat-modeling"] },
      { id: "samm-architecture", label: "Design · Secure Architecture", categoryIds: ["threat-modeling", "api-security", "iac-security"] },
      { id: "samm-build", label: "Implementation · Secure Build", categoryIds: ["software-supply-chain", "sca", "secrets-detection"] },
      { id: "samm-deployment", label: "Implementation · Secure Deployment", categoryIds: ["iac-security", "container-security", "software-supply-chain"] },
      { id: "samm-defects", label: "Implementation · Defect Management", categoryIds: ["aspm", "vulnerability-disclosure"] },
      { id: "samm-architecture-assessment", label: "Verification · Architecture Assessment", categoryIds: ["threat-modeling", "pentest-program"] },
      { id: "samm-requirements-testing", label: "Verification · Requirements-driven Testing", categoryIds: ["api-security", "dast", "iast"] },
      { id: "samm-security-testing", label: "Verification · Security Testing", categoryIds: ["sast", "dast", "sca", "pentest-program", "runtime-validated-application-security"] },
      { id: "samm-incidents", label: "Operations · Incident Management", categoryIds: ["vulnerability-disclosure", "soar", "ai-soc-investigation"] },
      { id: "samm-environment", label: "Operations · Environment Management", categoryIds: ["iac-security", "cspm", "container-security"] },
      { id: "samm-operational", label: "Operations · Operational Management", categoryIds: ["app-runtime", "cloud-vulnerability", "cyber-recovery"] },
    ],
  },
  {
    label: "SOC analyst",
    topics: [
      { id: "soc-triage", label: "Triage and enrich an alert", categoryIds: ["siem", "xdr", "ai-soc-investigation"] },
      { id: "soc-route", label: "Route findings and coordinate response", categoryIds: ["soar", "xdr", "mdr"] },
    ],
  },
  {
    label: "Incident responder and digital forensics",
    sourceName: "NIST incident response guidance",
    sourceUrl: "https://csrc.nist.gov/pubs/sp/800/61/r3/final",
    topics: [
      { id: "ir-scope", label: "Analyze artifacts and scope an incident", categoryIds: ["malware-analysis", "endpoint-security", "ai-soc-investigation"] },
      { id: "ir-contain", label: "Coordinate containment", categoryIds: ["soar", "xdr", "endpoint-security"] },
      { id: "ir-recover", label: "Validate recovery and restoration", categoryIds: ["cyber-recovery"] },
    ],
  },
  {
    label: "Threat hunter",
    sourceName: "MITRE D3FEND",
    sourceUrl: "https://d3fend.mitre.org/faq/",
    topics: [
      { id: "hunt-historical", label: "Search historical evidence for a threat", categoryIds: ["malware-analysis", "threat-intelligence", "siem"] },
      { id: "hunt-pivot", label: "Pivot across endpoint, network, and identity signals", categoryIds: ["endpoint-security", "ndr", "itdr", "xdr"] },
    ],
  },
  {
    label: "Detection engineer",
    topics: [
      { id: "detection-telemetry", label: "Onboard and normalize telemetry", categoryIds: ["security-data-pipelines", "siem"] },
      { id: "detection-rules", label: "Build, validate, and tune detections", categoryIds: ["detection-engineering", "siem", "breach-simulation"] },
    ],
  },
  {
    label: "Cloud and platform security",
    sourceName: "CSA Cloud Controls Matrix",
    sourceUrl: "https://cloudsecurityalliance.org/research/cloud-controls-matrix",
    topics: [
      { id: "cloud-posture", label: "Find cloud misconfigurations and excess permissions", categoryIds: ["cspm", "cnapp", "ciem"] },
      { id: "cloud-guardrails", label: "Set deployment and workload guardrails", categoryIds: ["iac-security", "container-security", "cwpp"] },
      { id: "cloud-respond", label: "Investigate cloud workload activity", categoryIds: ["cloud-detection", "cwpp", "siem"] },
    ],
  },
  {
    label: "Identity security and IAM",
    topics: [
      { id: "identity-lifecycle", label: "Provision and review workforce access", categoryIds: ["workforce-identity", "iga"] },
      { id: "identity-privilege", label: "Reduce standing privileges and machine access", categoryIds: ["pam", "ciem", "nhi"] },
      { id: "identity-detect", label: "Investigate identity misuse", categoryIds: ["itdr", "siem"] },
    ],
  },
  {
    label: "Data security and privacy",
    topics: [
      { id: "data-discover", label: "Discover sensitive data and review access", categoryIds: ["dspm", "data-access-governance", "privacy-governance"] },
      { id: "data-protect", label: "Limit sensitive data movement", categoryIds: ["dlp", "data-encryption", "ai-data-security"] },
    ],
  },
  {
    label: "AI and agent security",
    sourceName: "NIST AI Risk Management Framework",
    sourceUrl: "https://www.nist.gov/itl/ai-risk-management-framework",
    topics: [
      { id: "ai-inventory", label: "Inventory and govern AI systems", categoryIds: ["ai-governance", "model-security", "agent-identity"] },
      { id: "ai-runtime", label: "Review and constrain agent tool actions", categoryIds: ["agentic-runtime", "mcp-security", "ai-application-security", "ai-data-security"] },
    ],
  },
  {
    label: "Exposure management",
    topics: [
      { id: "exposure-discover", label: "Discover exposed assets and prioritize findings", categoryIds: ["external-attack-surface", "security-asset-management", "it-vulnerability-management", "ctem"] },
      { id: "exposure-validate", label: "Validate which exposures need action", categoryIds: ["ctem", "breach-simulation", "cloud-vulnerability", "runtime-validated-application-security"] },
    ],
  },
  {
    label: "Governance, risk, and compliance",
    topics: [
      { id: "grc-evidence", label: "Collect control and audit evidence", categoryIds: ["grc-controls", "customer-trust", "privacy-governance"] },
      { id: "grc-suppliers", label: "Assess suppliers and monitor third-party risk", categoryIds: ["third-party-risk", "security-ratings", "customer-trust"] },
    ],
  },
];

export const frameworkTopics = personaFrameworks.flatMap(({ topics }) => topics);
