export const personaFrameworks = [
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
];

export const frameworkTopics = personaFrameworks.flatMap(({ topics }) => topics);
