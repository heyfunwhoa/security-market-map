import type { Claim, Product, Source, Vendor } from "../schema";

// Vendors for categories that had none (2026-11-09). Research candidates only.
// Every product statement is publisher-reported unless noted. No direct-competitor or parity claims.
// See docs/market-research/empty-category-vendors-2026-11.md for placement and limits.
// malware-analysis and ai-soc-investigation (Stairwell, ReversingLabs, VirusTotal, Prophet, Dropzone, Intezer; 2026-11-11): docs/market-research/file-analysis-ai-investigation-landscape-2026-11.md.

export const categoryFillVendors: Vendor[] = [
  {
    "id": "prophet-security",
    "slug": "prophet-security",
    "name": "Prophet Security",
    "formerNames": [],
    "website": "https://www.prophetsecurity.ai/",
    "positioning": "Prophet Security markets an AI SOC platform that automates alert triage, investigations, response, threat hunting and detection engineering.",
    "primaryCategoryIds": [
      "ai-soc-investigation"
    ],
    "adjacentCategoryIds": [
      "soar",
      "detection-engineering"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Investigation quality, autonomy limits and supported integrations are vendor-reported and untested here.",
      "Which pricing model, deployment and integrations fit the buyer's environment?"
    ]
  },
  {
    "id": "dropzone-ai",
    "slug": "dropzone-ai",
    "name": "Dropzone AI",
    "formerNames": [],
    "website": "https://www.dropzone.ai/",
    "positioning": "Dropzone AI markets AI agents that investigate alerts, hunt attackers and respond to emerging threats on top of existing security tools.",
    "primaryCategoryIds": [
      "ai-soc-investigation"
    ],
    "adjacentCategoryIds": [
      "soar",
      "threat-intelligence"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Investigation quality, autonomy limits and supported integrations are vendor-reported and untested here.",
      "Which pricing model, deployment and integrations fit the buyer's environment?"
    ]
  },
  {
    "id": "intezer",
    "slug": "intezer",
    "name": "Intezer",
    "formerNames": [],
    "website": "https://intezer.com/",
    "positioning": "Intezer markets an enterprise AI SOC that investigates alerts at forensic depth, with roots in malware code analysis.",
    "primaryCategoryIds": [
      "ai-soc-investigation"
    ],
    "adjacentCategoryIds": [
      "malware-analysis",
      "soar"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Investigation quality, autonomy limits and supported integrations are vendor-reported and untested here.",
      "Which pricing model, deployment and integrations fit the buyer's environment?"
    ]
  },
  {
    "id": "stairwell",
    "slug": "stairwell",
    "name": "Stairwell",
    "formerNames": [],
    "website": "https://stairwell.com/",
    "positioning": "Stairwell says it preserves executables from enrolled endpoints in a private environment, re-checks them as new intelligence arrives, and investigates related variants and affected hosts with its Backstory agent.",
    "primaryCategoryIds": [
      "malware-analysis"
    ],
    "adjacentCategoryIds": [
      "threat-intelligence",
      "soar",
      "ai-soc-investigation"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Retention, rehunt and variant claims are vendor-reported and untested here.",
      "Several Stairwell pages describe the company as threat intelligence or an AI SOC; confirm which budget the buyer uses."
    ]
  },
  {
    "id": "cribl",
    "slug": "cribl",
    "name": "Cribl",
    "formerNames": [],
    "website": "https://www.cribl.io/",
    "positioning": "Cribl markets Stream as a vendor-agnostic telemetry pipeline that collects, reduces, enriches and routes data to SIEMs, lakes and other tools.",
    "primaryCategoryIds": [
      "security-data-pipelines"
    ],
    "adjacentCategoryIds": [
      "siem"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Stream is marketed for observability and security data alike; confirm which sources, destinations and reduction rules the SOC actually needs.",
      "Which edition, deployment, integrations and costs fit the buyer's environment?"
    ]
  },
  {
    "id": "tenzir",
    "slug": "tenzir",
    "name": "Tenzir",
    "formerNames": [],
    "website": "https://tenzir.com/",
    "positioning": "Tenzir documents a data pipeline engine for security teams to collect, parse, normalize, store and route security telemetry.",
    "primaryCategoryIds": [
      "security-data-pipelines"
    ],
    "adjacentCategoryIds": [
      "siem",
      "detection-engineering"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "An open-source engine is referenced; confirm which features need a commercial edition.",
      "Which edition, deployment, integrations and costs fit the buyer's environment?"
    ]
  },
  {
    "id": "databahn",
    "slug": "databahn",
    "name": "DataBahn",
    "formerNames": [],
    "website": "https://www.databahn.ai/",
    "positioning": "DataBahn describes itself as an AI-native security data fabric that ingests, normalizes, enriches and routes security telemetry.",
    "primaryCategoryIds": [
      "security-data-pipelines"
    ],
    "adjacentCategoryIds": [
      "siem"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "AI-driven in-stream features were announced with early access; confirm what is generally available.",
      "Which edition, deployment, integrations and costs fit the buyer's environment?"
    ]
  },
  {
    "id": "anvilogic",
    "slug": "anvilogic",
    "name": "Anvilogic",
    "formerNames": [],
    "website": "https://www.anvilogic.com/",
    "positioning": "Anvilogic markets detection engineering with detection-as-code, MITRE ATT&CK coverage and a detection library across SIEMs and data platforms.",
    "primaryCategoryIds": [
      "detection-engineering"
    ],
    "adjacentCategoryIds": [
      "siem",
      "soar"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Anvilogic also positions as an AI SOC layer; separate detection lifecycle from triage before comparing it to a SIEM.",
      "Which edition, deployment, integrations and costs fit the buyer's environment?"
    ]
  },
  {
    "id": "soc-prime",
    "slug": "soc-prime",
    "name": "SOC Prime",
    "formerNames": [],
    "website": "https://socprime.com/",
    "positioning": "SOC Prime markets a detection engineering platform with a large shared library of detection rules and translation across SIEM, EDR and XDR tools.",
    "primaryCategoryIds": [
      "detection-engineering"
    ],
    "adjacentCategoryIds": [
      "threat-intelligence"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Rule-library size is vendor-reported; rule quality and fit for the buyer's telemetry are untested.",
      "Which edition, deployment, integrations and costs fit the buyer's environment?"
    ]
  },
  {
    "id": "panther",
    "slug": "panther",
    "name": "Panther",
    "formerNames": [],
    "website": "https://panther.com/",
    "positioning": "Panther describes itself as a cloud-native SIEM and AI SOC platform on a security data lake, with detection-as-code workflows.",
    "primaryCategoryIds": [
      "siem"
    ],
    "adjacentCategoryIds": [
      "detection-engineering",
      "security-data-pipelines"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Panther is a SIEM; list it here as adjacent to detection engineering, not as a standalone detection-lifecycle tool.",
      "Which edition, deployment, integrations and costs fit the buyer's environment?"
    ]
  },
  {
    "id": "xm-cyber",
    "slug": "xm-cyber",
    "name": "XM Cyber",
    "formerNames": [],
    "website": "https://xmcyber.com/",
    "positioning": "XM Cyber markets continuous exposure management (attack-path analysis that supports a CTEM program) built on an attack graph that chains vulnerabilities, misconfigurations and identity exposures into attack paths.",
    "primaryCategoryIds": [
      "breach-simulation"
    ],
    "adjacentCategoryIds": [
      "ctem",
      "external-attack-surface",
      "it-vulnerability-management"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Attack-path validation is vendor-described; how paths are validated in the buyer's environment is untested.",
      "Which edition, deployment, integrations and costs fit the buyer's environment?"
    ]
  },
  {
    "id": "brinqa",
    "slug": "brinqa",
    "name": "Brinqa",
    "formerNames": [],
    "website": "https://www.brinqa.com/",
    "positioning": "Brinqa markets unified exposure management that brings vulnerability, cloud, identity and application risk into one data model for prioritization and remediation.",
    "primaryCategoryIds": [
      "it-vulnerability-management"
    ],
    "adjacentCategoryIds": [
      "ctem",
      "aspm"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Brinqa aggregates other tools' findings; it is not a scanner. CTEM is a program, so it is listed as adjacent.",
      "Which edition, deployment, integrations and costs fit the buyer's environment?"
    ]
  },
  {
    "id": "nucleus-security",
    "slug": "nucleus-security",
    "name": "Nucleus Security",
    "formerNames": [],
    "website": "https://nucleussec.com/",
    "positioning": "Nucleus markets a vulnerability and exposure management platform that normalizes data from security tools, threat intel and pentests.",
    "primaryCategoryIds": [
      "it-vulnerability-management"
    ],
    "adjacentCategoryIds": [
      "ctem"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Positioned as an aggregation and workflow layer; confirm it is not being compared to a scanner.",
      "Which edition, deployment, integrations and costs fit the buyer's environment?"
    ]
  },
  {
    "id": "lasso-security",
    "slug": "lasso-security",
    "name": "Lasso Security",
    "formerNames": [],
    "website": "https://www.lasso.security/",
    "positioning": "Lasso markets AI security including MCP server discovery, tool-call monitoring and an open-source MCP gateway.",
    "primaryCategoryIds": [
      "mcp-security"
    ],
    "adjacentCategoryIds": [
      "ai-application-security",
      "agentic-runtime"
    ],
    "identityScopes": [
      "agent"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Ownership was not re-checked; one third-party guide refers to a Check Point acquisition. Confirm before quoting.",
      "Which edition, deployment, integrations and costs fit the buyer's environment?"
    ]
  },
  {
    "id": "operant-ai",
    "slug": "operant-ai",
    "name": "Operant AI",
    "formerNames": [],
    "website": "https://www.operant.ai/",
    "positioning": "Operant AI markets runtime protection for AI agents, including an MCP Gateway for discovery and policy over agent-to-MCP traffic.",
    "primaryCategoryIds": [
      "mcp-security"
    ],
    "adjacentCategoryIds": [
      "agentic-runtime"
    ],
    "identityScopes": [
      "agent"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Gateway sees traffic it proxies; it does not by itself explain why an agent acted.",
      "Which edition, deployment, integrations and costs fit the buyer's environment?"
    ]
  },
  {
    "id": "strata-identity",
    "slug": "strata-identity",
    "name": "Strata Identity",
    "formerNames": [],
    "website": "https://www.strata.io/",
    "positioning": "Strata documents Maverics, an identity orchestration layer that routes authentication and authorization between apps and any identity provider.",
    "primaryCategoryIds": [
      "identity-orchestration"
    ],
    "adjacentCategoryIds": [
      "workforce-identity",
      "agent-identity"
    ],
    "identityScopes": [
      "human",
      "agent"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Orchestration is not governance; confirm which IdPs and legacy apps are in scope.",
      "Which edition, deployment, integrations and costs fit the buyer's environment?"
    ]
  },
  {
    "id": "cerbos",
    "slug": "cerbos",
    "name": "Cerbos",
    "formerNames": [],
    "website": "https://www.cerbos.dev/",
    "positioning": "Cerbos documents an authorization platform: an open-source policy decision point plus a managed policy administration plane.",
    "primaryCategoryIds": [
      "identity-orchestration"
    ],
    "adjacentCategoryIds": [
      "agent-identity",
      "nhi"
    ],
    "identityScopes": [
      "human",
      "nhi",
      "agent"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "A policy engine decides an action; it is not provisioning or certification.",
      "Which edition, deployment, integrations and costs fit the buyer's environment?"
    ]
  },
  {
    "id": "authzed",
    "slug": "authzed",
    "name": "AuthZed",
    "formerNames": [],
    "website": "https://authzed.com/",
    "positioning": "AuthZed builds SpiceDB, an open-source Zanzibar-inspired permissions database for relationship-based authorization, and sells managed offerings.",
    "primaryCategoryIds": [
      "identity-orchestration"
    ],
    "adjacentCategoryIds": [
      "ciam"
    ],
    "identityScopes": [
      "human"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Relationship-based modeling is a design shift; confirm whether the buyer's problem is app authorization at all.",
      "Which edition, deployment, integrations and costs fit the buyer's environment?"
    ]
  },
  {
    "id": "credo-ai",
    "slug": "credo-ai",
    "name": "Credo AI",
    "formerNames": [],
    "website": "https://www.credo.ai/",
    "positioning": "Credo AI markets an AI governance platform with an AI registry, evidence intake from MLOps tools and a vendor portal.",
    "primaryCategoryIds": [
      "ai-governance"
    ],
    "adjacentCategoryIds": [
      "grc-controls",
      "third-party-risk"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Governance records decisions; it does not by itself block a model or tool call.",
      "Which edition, deployment, integrations and costs fit the buyer's environment?"
    ]
  },
  {
    "id": "holistic-ai",
    "slug": "holistic-ai",
    "name": "Holistic AI",
    "formerNames": [],
    "website": "https://www.holisticai.com/",
    "positioning": "Holistic AI markets an AI governance platform that discovers AI systems into an inventory and maps them to risk and regulatory requirements.",
    "primaryCategoryIds": [
      "ai-governance"
    ],
    "adjacentCategoryIds": [
      "ai-application-security"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Automatic discovery coverage depends on connectors; confirm for the buyer's clouds and code hosts.",
      "Which edition, deployment, integrations and costs fit the buyer's environment?"
    ]
  }
,{
    "id": "zerofox",
    "slug": "zerofox",
    "name": "ZeroFox",
    "formerNames": [],
    "website": "https://www.zerofox.com/",
    "positioning": "ZeroFox markets digital risk protection across brand, domain, executive, social and dark web exposure, with takedowns. It says Gartner and Forrester recognize it in DRP (vendor-reported). No product cell is assigned.",
    "primaryCategoryIds": [
      "digital-risk-protection"
    ],
    "adjacentCategoryIds": [
      "threat-intelligence",
      "external-attack-surface"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "ZeroFox's comparison pages are vendor claims; do not adopt them as parity.",
      "Which modules (brand, executive, domain, dark web) are licensed, and who runs takedowns?"
    ]
  },
  {
    "id": "contrast-security",
    "slug": "contrast-security",
    "name": "Contrast Security",
    "formerNames": [],
    "website": "https://www.contrastsecurity.com/",
    "positioning": "Contrast markets runtime application security: instrumentation inside the app for testing and for application detection and response (ADR). It says Gartner's 2026 AppSec Hype Cycle names it a Sample Vendor for ADR (vendor-reported).",
    "primaryCategoryIds": [
      "app-runtime"
    ],
    "adjacentCategoryIds": [
      "runtime-validated-application-security",
      "iast"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Instrumentation needs per-language agents; confirm coverage for the buyer's stack.",
      "A Hype Cycle Sample Vendor listing is not a ranking or endorsement."
    ]
  }
];

export const categoryFillProducts: Product[] = [
  {
    "id": "prophet-ai-soc",
    "slug": "prophet-ai-soc",
    "vendorId": "prophet-security",
    "name": "Prophet AI SOC Platform",
    "positioning": "Prophet Security markets an AI SOC platform that automates alert triage, investigations, response, threat hunting and detection engineering.",
    "primaryCategoryIds": [
      "ai-soc-investigation"
    ],
    "adjacentCategoryIds": [
      "soar",
      "detection-engineering"
    ],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "generally_available",
    "availabilityNote": "Editions and deployment not verified here.",
    "officialUrl": "https://www.prophetsecurity.ai/",
    "useCaseIds": []
  },
  {
    "id": "dropzone-ai-soc",
    "slug": "dropzone-ai-soc",
    "vendorId": "dropzone-ai",
    "name": "Dropzone AI SOC agents",
    "positioning": "Dropzone AI markets AI agents that investigate alerts, hunt attackers and respond to emerging threats on top of existing security tools.",
    "primaryCategoryIds": [
      "ai-soc-investigation"
    ],
    "adjacentCategoryIds": [
      "soar",
      "threat-intelligence"
    ],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "generally_available",
    "availabilityNote": "Editions and deployment not verified here.",
    "officialUrl": "https://www.dropzone.ai/",
    "useCaseIds": []
  },
  {
    "id": "intezer-ai-soc",
    "slug": "intezer-ai-soc",
    "vendorId": "intezer",
    "name": "Intezer AI SOC",
    "positioning": "Intezer markets an enterprise AI SOC that investigates alerts at forensic depth, with roots in malware code analysis.",
    "primaryCategoryIds": [
      "ai-soc-investigation"
    ],
    "adjacentCategoryIds": [
      "malware-analysis",
      "soar"
    ],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "generally_available",
    "availabilityNote": "Editions and deployment not verified here.",
    "officialUrl": "https://intezer.com/",
    "useCaseIds": []
  },
  {
    "id": "reversinglabs-spectra-analyze",
    "slug": "reversinglabs-spectra-analyze",
    "vendorId": "reversinglabs",
    "name": "ReversingLabs Spectra Analyze",
    "positioning": "ReversingLabs markets Spectra Analyze for SOC malware analysis using static binary and dynamic analysis, threat hunting and YARA support.",
    "primaryCategoryIds": [
      "malware-analysis"
    ],
    "adjacentCategoryIds": [
      "threat-intelligence"
    ],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "generally_available",
    "availabilityNote": "Deployment options not verified here.",
    "officialUrl": "https://www.reversinglabs.com/products/spectra-analyze",
    "useCaseIds": []
  },
  {
    "id": "virustotal",
    "slug": "virustotal",
    "vendorId": "google",
    "name": "VirusTotal",
    "positioning": "VirusTotal accepts file, URL and other submissions for malware analysis, with search and an API for automated submissions.",
    "primaryCategoryIds": [
      "malware-analysis"
    ],
    "adjacentCategoryIds": [
      "threat-intelligence"
    ],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "generally_available",
    "availabilityNote": "Free public service and paid enterprise tiers; tier features not verified here. Public submissions are subject to VirusTotal's terms and privacy notice.",
    "officialUrl": "https://www.virustotal.com/",
    "useCaseIds": []
  },
  {
    "id": "stairwell-platform",
    "slug": "stairwell-platform",
    "vendorId": "stairwell",
    "name": "Stairwell platform (Backstory)",
    "positioning": "Stairwell says it preserves executables from enrolled endpoints in a private environment, re-checks them as new intelligence arrives, and investigates related variants and affected hosts with its Backstory agent.",
    "primaryCategoryIds": [
      "malware-analysis"
    ],
    "adjacentCategoryIds": [
      "threat-intelligence",
      "soar",
      "ai-soc-investigation"
    ],
    "deployment": [
      "saas"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "generally_available",
    "availabilityNote": "Per-asset annual pricing with all capabilities included, per Stairwell's pricing page; rates are quoted, not published.",
    "officialUrl": "https://stairwell.com/store/",
    "useCaseIds": []
  },
  {
    "id": "cribl-stream",
    "slug": "cribl-stream",
    "vendorId": "cribl",
    "name": "Cribl Stream",
    "positioning": "Cribl markets Stream as a vendor-agnostic telemetry pipeline that collects, reduces, enriches and routes data to SIEMs, lakes and other tools.",
    "primaryCategoryIds": [
      "security-data-pipelines"
    ],
    "adjacentCategoryIds": [
      "siem"
    ],
    "deployment": [
      "saas",
      "self_hosted"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "generally_available",
    "availabilityNote": "Cribl.Cloud and self-managed deployments are both referenced on Cribl's site; confirm the edition.",
    "officialUrl": "https://www.cribl.io/stream",
    "useCaseIds": []
  },
  {
    "id": "tenzir-platform",
    "slug": "tenzir-platform",
    "vendorId": "tenzir",
    "name": "Tenzir",
    "positioning": "Tenzir documents a data pipeline engine for security teams to collect, parse, normalize, store and route security telemetry.",
    "primaryCategoryIds": [
      "security-data-pipelines"
    ],
    "adjacentCategoryIds": [
      "siem",
      "detection-engineering"
    ],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "generally_available",
    "availabilityNote": "Editions and deployment models not verified here.",
    "officialUrl": "https://docs.tenzir.com/overview",
    "useCaseIds": []
  },
  {
    "id": "databahn-platform",
    "slug": "databahn-platform",
    "vendorId": "databahn",
    "name": "DataBahn platform",
    "positioning": "DataBahn describes itself as an AI-native security data fabric that ingests, normalizes, enriches and routes security telemetry.",
    "primaryCategoryIds": [
      "security-data-pipelines"
    ],
    "adjacentCategoryIds": [
      "siem"
    ],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "generally_available",
    "availabilityNote": "Autonomous In-Stream Data Intelligence was announced in March 2026 with early access; core pipeline availability not separately verified.",
    "officialUrl": "https://www.prnewswire.com/news-releases/databahn-advances-security-data-pipeline-with-autonomous-in-stream-data-intelligence-302723715.html",
    "useCaseIds": []
  },
  {
    "id": "anvilogic-platform",
    "slug": "anvilogic-platform",
    "vendorId": "anvilogic",
    "name": "Anvilogic",
    "positioning": "Anvilogic markets detection engineering with detection-as-code, MITRE ATT&CK coverage and a detection library across SIEMs and data platforms.",
    "primaryCategoryIds": [
      "detection-engineering"
    ],
    "adjacentCategoryIds": [
      "siem",
      "soar"
    ],
    "deployment": [
      "saas"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "generally_available",
    "availabilityNote": "Confirm which SIEMs and data lakes are supported in the buyer's stack.",
    "officialUrl": "https://www.anvilogic.com/detection-engineering",
    "useCaseIds": []
  },
  {
    "id": "soc-prime-platform",
    "slug": "soc-prime-platform",
    "vendorId": "soc-prime",
    "name": "SOC Prime Platform",
    "positioning": "SOC Prime markets a detection engineering platform with a large shared library of detection rules and translation across SIEM, EDR and XDR tools.",
    "primaryCategoryIds": [
      "detection-engineering"
    ],
    "adjacentCategoryIds": [
      "threat-intelligence"
    ],
    "deployment": [
      "saas"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "generally_available",
    "availabilityNote": "Products include a detection marketplace and a rule-translation IDE; confirm which are licensed.",
    "officialUrl": "https://socprime.com/about/",
    "useCaseIds": []
  },
  {
    "id": "panther-platform",
    "slug": "panther-platform",
    "vendorId": "panther",
    "name": "Panther",
    "positioning": "Panther describes itself as a cloud-native SIEM and AI SOC platform on a security data lake, with detection-as-code workflows.",
    "primaryCategoryIds": [
      "siem"
    ],
    "adjacentCategoryIds": [
      "detection-engineering",
      "security-data-pipelines"
    ],
    "deployment": [
      "saas",
      "cloud_native"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "generally_available",
    "availabilityNote": "Panther states it can deploy in the customer's cloud or Panther's.",
    "officialUrl": "https://panther.com/ai-info",
    "useCaseIds": []
  },
  {
    "id": "xm-cyber-cem",
    "slug": "xm-cyber-cem",
    "vendorId": "xm-cyber",
    "name": "XM Cyber Continuous Exposure Management Platform",
    "positioning": "XM Cyber markets continuous exposure management (attack-path analysis that supports a CTEM program) built on an attack graph that chains vulnerabilities, misconfigurations and identity exposures into attack paths.",
    "primaryCategoryIds": [
      "breach-simulation"
    ],
    "adjacentCategoryIds": [
      "ctem",
      "external-attack-surface",
      "it-vulnerability-management"
    ],
    "deployment": [
      "saas"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "generally_available",
    "availabilityNote": "EASM was added to the platform; confirm module licensing.",
    "officialUrl": "https://xmcyber.com/solution-briefs/continuous-exposure-management-platform/",
    "useCaseIds": []
  },
  {
    "id": "brinqa-platform",
    "slug": "brinqa-platform",
    "vendorId": "brinqa",
    "name": "Brinqa Unified Exposure Management Platform",
    "positioning": "Brinqa markets unified exposure management that brings vulnerability, cloud, identity and application risk into one data model for prioritization and remediation.",
    "primaryCategoryIds": [
      "it-vulnerability-management"
    ],
    "adjacentCategoryIds": [
      "ctem",
      "aspm"
    ],
    "deployment": [
      "saas"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "generally_available",
    "availabilityNote": "Confirm connectors for the buyer's scanners and ticketing.",
    "officialUrl": "https://brinqa.com/solutions/unified-exposure-management",
    "useCaseIds": []
  },
  {
    "id": "nucleus-platform",
    "slug": "nucleus-platform",
    "vendorId": "nucleus-security",
    "name": "Nucleus Platform",
    "positioning": "Nucleus markets a vulnerability and exposure management platform that normalizes data from security tools, threat intel and pentests.",
    "primaryCategoryIds": [
      "it-vulnerability-management"
    ],
    "adjacentCategoryIds": [
      "ctem"
    ],
    "deployment": [
      "saas"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "generally_available",
    "availabilityNote": "Confirm connectors and deployment for regulated buyers.",
    "officialUrl": "https://nucleussec.com/use-cases/exposure-management/",
    "useCaseIds": []
  },
  {
    "id": "lasso-mcp-security",
    "slug": "lasso-mcp-security",
    "vendorId": "lasso-security",
    "name": "Lasso MCP Security",
    "positioning": "Lasso markets AI security including MCP server discovery, tool-call monitoring and an open-source MCP gateway.",
    "primaryCategoryIds": [
      "mcp-security"
    ],
    "adjacentCategoryIds": [
      "ai-application-security",
      "agentic-runtime"
    ],
    "deployment": [
      "saas",
      "open_source"
    ],
    "identityScopes": [
      "agent"
    ],
    "availability": "generally_available",
    "availabilityNote": "The MCP gateway is open source; the commercial platform is separate.",
    "officialUrl": "https://lasso.security/use-cases/mcp-security",
    "useCaseIds": []
  },
  {
    "id": "operant-mcp-gateway",
    "slug": "operant-mcp-gateway",
    "vendorId": "operant-ai",
    "name": "Operant MCP Gateway",
    "positioning": "Operant AI markets runtime protection for AI agents, including an MCP Gateway for discovery and policy over agent-to-MCP traffic.",
    "primaryCategoryIds": [
      "mcp-security"
    ],
    "adjacentCategoryIds": [
      "agentic-runtime"
    ],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "agent"
    ],
    "availability": "generally_available",
    "availabilityNote": "Launched June 2025; confirm supported clouds and clients.",
    "officialUrl": "https://www.operant.ai/",
    "useCaseIds": []
  },
  {
    "id": "strata-maverics",
    "slug": "strata-maverics",
    "vendorId": "strata-identity",
    "name": "Maverics",
    "positioning": "Strata documents Maverics, an identity orchestration layer that routes authentication and authorization between apps and any identity provider.",
    "primaryCategoryIds": [
      "identity-orchestration"
    ],
    "adjacentCategoryIds": [
      "workforce-identity",
      "agent-identity"
    ],
    "deployment": [
      "hybrid"
    ],
    "identityScopes": [
      "human",
      "agent"
    ],
    "availability": "generally_available",
    "availabilityNote": "Strata states Maverics can run in the cloud or on-premises as a proxy or app-server module.",
    "officialUrl": "https://docs.strata.io/",
    "useCaseIds": []
  },
  {
    "id": "cerbos-platform",
    "slug": "cerbos-platform",
    "vendorId": "cerbos",
    "name": "Cerbos PDP and Cerbos Hub",
    "positioning": "Cerbos documents an authorization platform: an open-source policy decision point plus a managed policy administration plane.",
    "primaryCategoryIds": [
      "identity-orchestration"
    ],
    "adjacentCategoryIds": [
      "agent-identity",
      "nhi"
    ],
    "deployment": [
      "open_source",
      "saas"
    ],
    "identityScopes": [
      "human",
      "nhi",
      "agent"
    ],
    "availability": "generally_available",
    "availabilityNote": "PDP is open source; Hub is the managed control plane.",
    "officialUrl": "https://docs.cerbos.dev/",
    "useCaseIds": []
  },
  {
    "id": "authzed-spicedb",
    "slug": "authzed-spicedb",
    "vendorId": "authzed",
    "name": "SpiceDB",
    "positioning": "AuthZed builds SpiceDB, an open-source Zanzibar-inspired permissions database for relationship-based authorization, and sells managed offerings.",
    "primaryCategoryIds": [
      "identity-orchestration"
    ],
    "adjacentCategoryIds": [
      "ciam"
    ],
    "deployment": [
      "open_source"
    ],
    "identityScopes": [
      "human"
    ],
    "availability": "generally_available",
    "availabilityNote": "Managed AuthZed offerings exist; editions not verified here.",
    "officialUrl": "https://github.com/authzed",
    "useCaseIds": []
  },
  {
    "id": "credo-ai-platform",
    "slug": "credo-ai-platform",
    "vendorId": "credo-ai",
    "name": "Credo AI governance platform",
    "positioning": "Credo AI markets an AI governance platform with an AI registry, evidence intake from MLOps tools and a vendor portal.",
    "primaryCategoryIds": [
      "ai-governance"
    ],
    "adjacentCategoryIds": [
      "grc-controls",
      "third-party-risk"
    ],
    "deployment": [
      "saas"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "generally_available",
    "availabilityNote": "Confirm which integrations feed evidence automatically.",
    "officialUrl": "https://www.credo.ai/product",
    "useCaseIds": []
  },
  {
    "id": "holistic-ai-platform",
    "slug": "holistic-ai-platform",
    "vendorId": "holistic-ai",
    "name": "Holistic AI Governance Platform",
    "positioning": "Holistic AI markets an AI governance platform that discovers AI systems into an inventory and maps them to risk and regulatory requirements.",
    "primaryCategoryIds": [
      "ai-governance"
    ],
    "adjacentCategoryIds": [
      "ai-application-security"
    ],
    "deployment": [
      "saas"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "generally_available",
    "availabilityNote": "Confirm connector coverage and runtime enforcement scope.",
    "officialUrl": "https://www.holisticai.com/blog/enterprise-ai-inventory",
    "useCaseIds": []
  },
  {
    "id": "protect-ai-guardian",
    "slug": "protect-ai-guardian",
    "vendorId": "palo-alto-networks",
    "name": "Protect AI Guardian (Prisma AIRS)",
    "positioning": "Guardian scans ML model files for security issues inside build and deploy pipelines; Protect AI is now part of Palo Alto Networks.",
    "primaryCategoryIds": [
      "model-security"
    ],
    "adjacentCategoryIds": [
      "software-supply-chain"
    ],
    "deployment": [
      "saas",
      "self_hosted"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "generally_available",
    "availabilityNote": "Local scanning runs as a Docker container in CI/CD; packaging under Prisma AIRS should be confirmed.",
    "officialUrl": "https://protectai.com/blog/guardian-local-scanning",
    "useCaseIds": []
  }
,{
    "id": "contrast-adr",
    "slug": "contrast-adr",
    "vendorId": "contrast-security",
    "name": "Contrast Application Detection and Response",
    "positioning": "Detects and blocks attacks inside running applications and APIs, with SOC integrations.",
    "primaryCategoryIds": [
      "app-runtime"
    ],
    "adjacentCategoryIds": [
      "runtime-validated-application-security"
    ],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "generally_available",
    "availabilityNote": "Announced as commercially available in August 2024.",
    "officialUrl": "https://www.contrastsecurity.com/press/contrast-security-introduces-application-detection-and-response-adr-to-identify-and-block-attacks-and-zero-days-on-applications-in-production",
    "useCaseIds": []
  }
];

export const categoryFillSources: Source[] = [
  {
    "id": "src-fill-prophet-ai-soc",
    "title": "Prophet Security \u2014 homepage",
    "url": "https://www.prophetsecurity.ai/",
    "canonicalUrl": "https://www.prophetsecurity.ai/",
    "publisher": "Prophet Security",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-11-11",
    "volatility": "fast",
    "excerpt": "Prophet Security says its AI SOC Platform automates alert triage, investigations, response, threat hunting and detection engineering."
  },
  {
    "id": "src-fill-dropzone-ai-soc",
    "title": "Dropzone AI \u2014 homepage",
    "url": "https://www.dropzone.ai/",
    "canonicalUrl": "https://www.dropzone.ai/",
    "publisher": "Dropzone AI",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-11-11",
    "volatility": "fast",
    "excerpt": "Dropzone AI describes AI agents that investigate every alert, hunt attackers and respond to emerging threats, guided by the customer."
  },
  {
    "id": "src-fill-intezer-ai-soc",
    "title": "Intezer \u2014 homepage",
    "url": "https://intezer.com/",
    "canonicalUrl": "https://intezer.com/",
    "publisher": "Intezer",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-11-11",
    "volatility": "fast",
    "excerpt": "Intezer says its AI SOC investigates all alerts at forensic depth, escalates fewer than 2% to a human and returns verdicts in under a minute."
  },
  {
    "id": "src-fill-reversinglabs-spectra-analyze",
    "title": "ReversingLabs Spectra Analyze \u2014 product page",
    "url": "https://www.reversinglabs.com/products/spectra-analyze",
    "canonicalUrl": "https://www.reversinglabs.com/products/spectra-analyze",
    "publisher": "ReversingLabs",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-11-11",
    "volatility": "fast",
    "excerpt": "ReversingLabs says Spectra Analyze analyzes malware with static binary and dynamic analysis built for the SOC, with threat hunting and YARA support."
  },
  {
    "id": "src-fill-virustotal",
    "title": "VirusTotal \u2014 upload page",
    "url": "https://www.virustotal.com/gui/home/upload",
    "canonicalUrl": "https://www.virustotal.com/gui/home/upload",
    "publisher": "VirusTotal (Google)",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-11-11",
    "volatility": "fast",
    "excerpt": "VirusTotal's upload page accepts file and URL submissions for analysis under its terms of service and privacy notice, with an API for automated submissions."
  },
  {
    "id": "src-fill-stairwell-store",
    "title": "Stairwell \u2014 Private file history (Store)",
    "url": "https://stairwell.com/store/",
    "canonicalUrl": "https://stairwell.com/store/",
    "publisher": "Stairwell",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-11-11",
    "volatility": "fast",
    "excerpt": "Stairwell says it preserves every executable from enrolled endpoints in a dedicated environment with no arbitrary retention window."
  },
  {
    "id": "src-fill-cribl-stream",
    "title": "Cribl Stream — product page",
    "url": "https://www.cribl.io/stream",
    "canonicalUrl": "https://www.cribl.io/stream",
    "publisher": "Cribl",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-11-09",
    "volatility": "fast",
    "excerpt": "Cribl markets Stream to collect, reduce, enrich and route telemetry from any source to any tool in the right format."
  },
  {
    "id": "src-fill-tenzir-platform",
    "title": "Tenzir documentation — overview",
    "url": "https://docs.tenzir.com/overview",
    "canonicalUrl": "https://docs.tenzir.com/overview",
    "publisher": "Tenzir",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-11-09",
    "volatility": "fast",
    "excerpt": "Tenzir documents its product as a data pipeline engine for security teams to collect, parse, normalize, aggregate, store, query and route security telemetry."
  },
  {
    "id": "src-fill-databahn-platform",
    "title": "DataBahn — Autonomous In-Stream Data Intelligence announcement",
    "url": "https://www.prnewswire.com/news-releases/databahn-advances-security-data-pipeline-with-autonomous-in-stream-data-intelligence-302723715.html",
    "canonicalUrl": "https://www.prnewswire.com/news-releases/databahn-advances-security-data-pipeline-with-autonomous-in-stream-data-intelligence-302723715.html",
    "publisher": "DataBahn",
    "sourceType": "press_release",
    "publishedAt": "2026-03-24",
    "retrievedAt": "2026-11-09",
    "volatility": "fast",
    "excerpt": "DataBahn announced Autonomous In-Stream Data Intelligence, positioning its security data pipeline to validate and act on data as it flows to SIEM and AI platforms."
  },
  {
    "id": "src-fill-anvilogic-platform",
    "title": "Anvilogic — agentic detection engineering",
    "url": "https://www.anvilogic.com/detection-engineering",
    "canonicalUrl": "https://www.anvilogic.com/detection-engineering",
    "publisher": "Anvilogic",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-11-09",
    "volatility": "fast",
    "excerpt": "Anvilogic markets building, deploying and maintaining detections with AI, detection-as-code, ATT&CK coverage and a curated library across SIEM and data platforms."
  },
  {
    "id": "src-fill-soc-prime-platform",
    "title": "SOC Prime — about",
    "url": "https://socprime.com/about/",
    "canonicalUrl": "https://socprime.com/about/",
    "publisher": "SOC Prime",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-11-09",
    "volatility": "fast",
    "excerpt": "SOC Prime describes its platform as built for detection engineering: discovering, building and responding to threats with shared intelligence and AI context."
  },
  {
    "id": "src-fill-panther-platform",
    "title": "Panther — official information page",
    "url": "https://panther.com/ai-info",
    "canonicalUrl": "https://panther.com/ai-info",
    "publisher": "Panther",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-11-09",
    "volatility": "fast",
    "excerpt": "Panther describes its platform as an AI SOC platform combining SIEM, a data lake and agentic workflows for detection and response, and states it is not an EDR replacement."
  },
  {
    "id": "src-fill-xm-cyber-cem",
    "title": "XM Cyber — Continuous Exposure Management Platform brief",
    "url": "https://xmcyber.com/solution-briefs/continuous-exposure-management-platform/",
    "canonicalUrl": "https://xmcyber.com/solution-briefs/continuous-exposure-management-platform/",
    "publisher": "XM Cyber",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-11-09",
    "volatility": "fast",
    "excerpt": "XM Cyber says its platform integrates all exposure types into a single attack graph to show what attackers can really do."
  },
  {
    "id": "src-fill-brinqa-platform",
    "title": "Brinqa — unified exposure management",
    "url": "https://brinqa.com/solutions/unified-exposure-management",
    "canonicalUrl": "https://brinqa.com/solutions/unified-exposure-management",
    "publisher": "Brinqa",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-11-09",
    "volatility": "fast",
    "excerpt": "Brinqa markets unified exposure management that brings vulnerability, cloud, identity and application risk together in a single platform."
  },
  {
    "id": "src-fill-nucleus-platform",
    "title": "Nucleus Security — threat exposure management",
    "url": "https://nucleussec.com/use-cases/exposure-management/",
    "canonicalUrl": "https://nucleussec.com/use-cases/exposure-management/",
    "publisher": "Nucleus Security",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-11-09",
    "volatility": "fast",
    "excerpt": "Nucleus says it integrates and normalizes data from security tools, threat intelligence feeds and manual pentests into one vulnerability and exposure management platform."
  },
  {
    "id": "src-fill-lasso-mcp-security",
    "title": "Lasso — MCP security",
    "url": "https://lasso.security/use-cases/mcp-security",
    "canonicalUrl": "https://lasso.security/use-cases/mcp-security",
    "publisher": "Lasso Security",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-11-09",
    "volatility": "fast",
    "excerpt": "Lasso markets MCP security with MCP server discovery and controls for MCP clients including Claude Desktop and Claude Code."
  },
  {
    "id": "src-fill-operant-mcp-gateway",
    "title": "Pure AI — Operant AI unveils MCP Gateway",
    "url": "https://pureai.com/Articles/2025/06/29/Operant-AI-Unveils-Security-Platform-for-AI-Agents-Using-MCP-Standard.aspx",
    "canonicalUrl": "https://pureai.com/Articles/2025/06/29/Operant-AI-Unveils-Security-Platform-for-AI-Agents-Using-MCP-Standard.aspx",
    "publisher": "Pure AI",
    "sourceType": "news",
    "publishedAt": "2025-06-29",
    "retrievedAt": "2026-11-09",
    "volatility": "fast",
    "excerpt": "Coverage of Operant's MCP Gateway launch: an extension of its AI Gatekeeper platform that identifies and manages interactions between AI agents and MCP servers."
  },
  {
    "id": "src-fill-strata-maverics",
    "title": "Strata Identity — Maverics documentation",
    "url": "https://docs.strata.io/",
    "canonicalUrl": "https://docs.strata.io/",
    "publisher": "Strata Identity",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-11-09",
    "volatility": "fast",
    "excerpt": "Strata documents Maverics as an orchestration platform for modern, legacy and AI identity that routes authentication and authorization between apps and identity providers."
  },
  {
    "id": "src-fill-cerbos-platform",
    "title": "Cerbos documentation",
    "url": "https://docs.cerbos.dev/",
    "canonicalUrl": "https://docs.cerbos.dev/",
    "publisher": "Cerbos",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-11-09",
    "volatility": "fast",
    "excerpt": "Cerbos documents an open-source policy decision point that evaluates authorization requests against policies, with Hub as a separate managed component."
  },
  {
    "id": "src-fill-authzed-spicedb",
    "title": "AuthZed — GitHub organization",
    "url": "https://github.com/authzed",
    "canonicalUrl": "https://github.com/authzed",
    "publisher": "AuthZed",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-11-09",
    "volatility": "fast",
    "excerpt": "AuthZed's official GitHub describes SpiceDB as an open-source, Zanzibar-inspired database for storing and querying fine-grained authorization data."
  },
  {
    "id": "src-fill-credo-ai-platform",
    "title": "Credo AI — product",
    "url": "https://www.credo.ai/product",
    "canonicalUrl": "https://www.credo.ai/product",
    "publisher": "Credo AI",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-11-09",
    "volatility": "fast",
    "excerpt": "Credo AI markets an AI governance platform with a centralized AI registry, evidence intake from MLOps and assessment tools, and a vendor portal."
  },
  {
    "id": "src-fill-holistic-ai-platform",
    "title": "Holistic AI — enterprise AI inventory",
    "url": "https://www.holisticai.com/blog/enterprise-ai-inventory",
    "canonicalUrl": "https://www.holisticai.com/blog/enterprise-ai-inventory",
    "publisher": "Holistic AI",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-11-09",
    "volatility": "fast",
    "excerpt": "Holistic AI says its governance platform connects to infrastructure to find AI systems automatically rather than relying on manual registry forms."
  },
  {
    "id": "src-fill-protect-ai-guardian",
    "title": "Protect AI — Guardian Local Scanning",
    "url": "https://protectai.com/blog/guardian-local-scanning",
    "canonicalUrl": "https://protectai.com/blog/guardian-local-scanning",
    "publisher": "Protect AI (Palo Alto Networks)",
    "sourceType": "vendor_marketing",
    "publishedAt": "2025-04-23",
    "retrievedAt": "2026-11-09",
    "volatility": "fast",
    "excerpt": "Protect AI says Guardian Local Scanning runs model scanning as a Docker container inside CI/CD pipelines and can scan models from sources such as Artifactory, SageMaker Model Registry and Git. The page banner states Palo Alto Networks completed its acquisition of Protect AI."
  }
,{
    "id": "src-forrester-eti-wave-2026",
    "title": "Forrester blog — Announcing The Forrester Wave: External Threat Intelligence Service Providers, Q3 2026",
    "url": "https://www.forrester.com/blogs/announcing-the-forrester-wave-external-threat-intelligence-service-providers-q3-2026/",
    "canonicalUrl": "https://www.forrester.com/blogs/announcing-the-forrester-wave-external-threat-intelligence-service-providers-q3-2026/",
    "publisher": "Forrester",
    "sourceType": "analyst",
    "publishedAt": null,
    "retrievedAt": "2026-11-09",
    "volatility": "fast",
    "excerpt": "Forrester's public announcement of its Q3 2026 External Threat Intelligence Service Providers Wave says the evaluation breaks digital risk protection into distinct areas, including brand protection, executive protection and fraud intelligence. The full report is client-only."
  },
  {
    "id": "src-recorded-future-forrester-2026",
    "title": "Recorded Future — named a Leader in External Threat Intelligence (press release)",
    "url": "https://www.recordedfuture.com/newsroom/press-releases/recorded-future-leader-external-threat-intelligence-2026",
    "canonicalUrl": "https://www.recordedfuture.com/newsroom/press-releases/recorded-future-leader-external-threat-intelligence-2026",
    "publisher": "Recorded Future",
    "sourceType": "press_release",
    "publishedAt": null,
    "retrievedAt": "2026-11-09",
    "volatility": "fast",
    "excerpt": "Recorded Future says it was named a Leader in The Forrester Wave: External Threat Intelligence Service Providers, Q3 2026 (September 17, 2026), and describes bringing external threat intelligence into third-party and supply chain risk."
  },
  {
    "id": "src-fill-zerofox-protection",
    "title": "ZeroFox — Protection",
    "url": "https://www.zerofox.com/protection/",
    "canonicalUrl": "https://www.zerofox.com/protection/",
    "publisher": "ZeroFox",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-11-09",
    "volatility": "fast",
    "excerpt": "ZeroFox says its digital risk protection includes external attack surface management, brand, domain, executive, social media, geospatial and dark web protection."
  },
  {
    "id": "src-fill-zerofox-analyst",
    "title": "ZeroFox — ZeroFox vs Doppel comparison page",
    "url": "https://www.zerofox.com/compare/zerofox-vs-doppel/",
    "canonicalUrl": "https://www.zerofox.com/compare/zerofox-vs-doppel/",
    "publisher": "ZeroFox",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-11-09",
    "volatility": "fast",
    "excerpt": "ZeroFox states that Gartner recognizes it as a Competitive Strategy Leader in global digital risk protection and that Forrester recognizes it as a leader in cyber threat intelligence and digital risk protection. Vendor-reported; the underlying analyst documents were not reviewed."
  },
  {
    "id": "src-fill-contrast-gartner-hc-2026",
    "title": "Contrast Security — Gartner Hype Cycle for Application Security, 2026",
    "url": "https://www.contrastsecurity.com/gartner-appsec-hype-cycle-adr",
    "canonicalUrl": "https://www.contrastsecurity.com/gartner-appsec-hype-cycle-adr",
    "publisher": "Contrast Security",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-11-09",
    "volatility": "fast",
    "excerpt": "Contrast says it is named a Sample Vendor for Application Detection and Response in Gartner's Hype Cycle for Application Security, 2026 (Dionisio Zumerle, 21 July 2026), and describes ADR as detecting and stopping attacks inside running applications."
  },
  {
    "id": "src-fill-contrast-adr-2024",
    "title": "Contrast Security — introduces Application Detection and Response",
    "url": "https://www.contrastsecurity.com/press/contrast-security-introduces-application-detection-and-response-adr-to-identify-and-block-attacks-and-zero-days-on-applications-in-production",
    "canonicalUrl": "https://www.contrastsecurity.com/press/contrast-security-introduces-application-detection-and-response-adr-to-identify-and-block-attacks-and-zero-days-on-applications-in-production",
    "publisher": "Contrast Security",
    "sourceType": "press_release",
    "publishedAt": "2024-08-06",
    "retrievedAt": "2026-11-09",
    "volatility": "fast",
    "excerpt": "Contrast introduced ADR on 6 Aug 2024 to detect and block attacks on custom applications and APIs from inside the application, with SIEM, XDR and CNAPP integrations; announced as commercially available."
  }
];

export const categoryFillClaims: Claim[] = [
  {
    "id": "claim-fill-prophet-ai-soc",
    "statement": "Prophet Security says its AI SOC Platform automates alert triage, investigations, response, threat hunting and detection engineering.",
    "subjectType": "product",
    "subjectId": "prophet-ai-soc",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-fill-prophet-ai-soc",
    "sourceUrl": "https://www.prophetsecurity.ai/",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-11-11",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-11",
    "conflictsWith": [],
    "notes": "Publisher-reported, not independently tested; no direct-competitor or parity claim. See docs/market-research/file-analysis-ai-investigation-landscape-2026-11.md."
  },
  {
    "id": "claim-fill-dropzone-ai-soc",
    "statement": "Dropzone AI describes AI agents that investigate every alert, hunt attackers and respond to emerging threats, guided by the customer.",
    "subjectType": "product",
    "subjectId": "dropzone-ai-soc",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-fill-dropzone-ai-soc",
    "sourceUrl": "https://www.dropzone.ai/",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-11-11",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-11",
    "conflictsWith": [],
    "notes": "Publisher-reported, not independently tested; no direct-competitor or parity claim. See docs/market-research/file-analysis-ai-investigation-landscape-2026-11.md."
  },
  {
    "id": "claim-fill-intezer-ai-soc",
    "statement": "Intezer says its AI SOC investigates all alerts at forensic depth, escalates fewer than 2% to a human and returns verdicts in under a minute.",
    "subjectType": "product",
    "subjectId": "intezer-ai-soc",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-fill-intezer-ai-soc",
    "sourceUrl": "https://intezer.com/",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-11-11",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-11",
    "conflictsWith": [],
    "notes": "Publisher-reported, not independently tested; no direct-competitor or parity claim. See docs/market-research/file-analysis-ai-investigation-landscape-2026-11.md."
  },
  {
    "id": "claim-fill-reversinglabs-spectra-analyze",
    "statement": "ReversingLabs says Spectra Analyze analyzes malware with static binary and dynamic analysis built for the SOC, with threat hunting and YARA support.",
    "subjectType": "product",
    "subjectId": "reversinglabs-spectra-analyze",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-fill-reversinglabs-spectra-analyze",
    "sourceUrl": "https://www.reversinglabs.com/products/spectra-analyze",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-11-11",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-11",
    "conflictsWith": [],
    "notes": "Publisher-reported, not independently tested; no direct-competitor or parity claim. See docs/market-research/file-analysis-ai-investigation-landscape-2026-11.md."
  },
  {
    "id": "claim-fill-virustotal",
    "statement": "VirusTotal's upload page accepts file and URL submissions for analysis under its terms of service and privacy notice, with an API for automated submissions.",
    "subjectType": "product",
    "subjectId": "virustotal",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-fill-virustotal",
    "sourceUrl": "https://www.virustotal.com/gui/home/upload",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-11-11",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-11",
    "conflictsWith": [],
    "notes": "Publisher-reported, not independently tested; no direct-competitor or parity claim. See docs/market-research/file-analysis-ai-investigation-landscape-2026-11.md."
  },
  {
    "id": "claim-fill-stairwell-store",
    "statement": "Stairwell says it preserves every executable from enrolled endpoints in a dedicated environment with no arbitrary retention window.",
    "subjectType": "product",
    "subjectId": "stairwell-platform",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-fill-stairwell-store",
    "sourceUrl": "https://stairwell.com/store/",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-11-11",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-11",
    "conflictsWith": [],
    "notes": "Publisher-reported, not independently tested; no direct-competitor claim. See docs/market-research/file-analysis-ai-investigation-landscape-2026-11.md."
  },
  {
    "id": "claim-fill-cribl-stream",
    "statement": "Cribl markets Stream to collect, reduce, enrich and route telemetry from any source to any tool in the right format.",
    "subjectType": "product",
    "subjectId": "cribl-stream",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-fill-cribl-stream",
    "sourceUrl": "https://www.cribl.io/stream",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-11-09",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-09",
    "conflictsWith": [],
    "notes": "Cribl.Cloud and self-managed deployments are both referenced on Cribl's site; confirm the edition. Publisher-reported, not independently tested; no direct-competitor claim."
  },
  {
    "id": "claim-fill-tenzir-platform",
    "statement": "Tenzir documents its product as a data pipeline engine for security teams to collect, parse, normalize, aggregate, store, query and route security telemetry.",
    "subjectType": "product",
    "subjectId": "tenzir-platform",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-fill-tenzir-platform",
    "sourceUrl": "https://docs.tenzir.com/overview",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-11-09",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-09",
    "conflictsWith": [],
    "notes": "Editions and deployment models not verified here. Publisher-reported, not independently tested; no direct-competitor claim."
  },
  {
    "id": "claim-fill-databahn-platform",
    "statement": "DataBahn announced Autonomous In-Stream Data Intelligence, positioning its security data pipeline to validate and act on data as it flows to SIEM and AI platforms.",
    "subjectType": "product",
    "subjectId": "databahn-platform",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-fill-databahn-platform",
    "sourceUrl": "https://www.prnewswire.com/news-releases/databahn-advances-security-data-pipeline-with-autonomous-in-stream-data-intelligence-302723715.html",
    "sourceType": "press_release",
    "publishedAt": "2026-03-24",
    "observedAt": "2026-11-09",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-09",
    "conflictsWith": [],
    "notes": "Autonomous In-Stream Data Intelligence was announced in March 2026 with early access; core pipeline availability not separately verified. Publisher-reported, not independently tested; no direct-competitor claim."
  },
  {
    "id": "claim-fill-anvilogic-platform",
    "statement": "Anvilogic markets building, deploying and maintaining detections with AI, detection-as-code, ATT&CK coverage and a curated library across SIEM and data platforms.",
    "subjectType": "product",
    "subjectId": "anvilogic-platform",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-fill-anvilogic-platform",
    "sourceUrl": "https://www.anvilogic.com/detection-engineering",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-11-09",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-09",
    "conflictsWith": [],
    "notes": "Confirm which SIEMs and data lakes are supported in the buyer's stack. Publisher-reported, not independently tested; no direct-competitor claim."
  },
  {
    "id": "claim-fill-soc-prime-platform",
    "statement": "SOC Prime describes its platform as built for detection engineering: discovering, building and responding to threats with shared intelligence and AI context.",
    "subjectType": "product",
    "subjectId": "soc-prime-platform",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-fill-soc-prime-platform",
    "sourceUrl": "https://socprime.com/about/",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-11-09",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-09",
    "conflictsWith": [],
    "notes": "Products include a detection marketplace and a rule-translation IDE; confirm which are licensed. Publisher-reported, not independently tested; no direct-competitor claim."
  },
  {
    "id": "claim-fill-panther-platform",
    "statement": "Panther describes its platform as an AI SOC platform combining SIEM, a data lake and agentic workflows for detection and response, and states it is not an EDR replacement.",
    "subjectType": "product",
    "subjectId": "panther-platform",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-fill-panther-platform",
    "sourceUrl": "https://panther.com/ai-info",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-11-09",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-09",
    "conflictsWith": [],
    "notes": "Panther states it can deploy in the customer's cloud or Panther's. Publisher-reported, not independently tested; no direct-competitor claim."
  },
  {
    "id": "claim-fill-xm-cyber-cem",
    "statement": "XM Cyber says its platform integrates all exposure types into a single attack graph to show what attackers can really do.",
    "subjectType": "product",
    "subjectId": "xm-cyber-cem",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-fill-xm-cyber-cem",
    "sourceUrl": "https://xmcyber.com/solution-briefs/continuous-exposure-management-platform/",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-11-09",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-09",
    "conflictsWith": [],
    "notes": "EASM was added to the platform; confirm module licensing. Publisher-reported, not independently tested; no direct-competitor claim."
  },
  {
    "id": "claim-fill-brinqa-platform",
    "statement": "Brinqa markets unified exposure management that brings vulnerability, cloud, identity and application risk together in a single platform.",
    "subjectType": "product",
    "subjectId": "brinqa-platform",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-fill-brinqa-platform",
    "sourceUrl": "https://brinqa.com/solutions/unified-exposure-management",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-11-09",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-09",
    "conflictsWith": [],
    "notes": "Confirm connectors for the buyer's scanners and ticketing. Publisher-reported, not independently tested; no direct-competitor claim."
  },
  {
    "id": "claim-fill-nucleus-platform",
    "statement": "Nucleus says it integrates and normalizes data from security tools, threat intelligence feeds and manual pentests into one vulnerability and exposure management platform.",
    "subjectType": "product",
    "subjectId": "nucleus-platform",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-fill-nucleus-platform",
    "sourceUrl": "https://nucleussec.com/use-cases/exposure-management/",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-11-09",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-09",
    "conflictsWith": [],
    "notes": "Confirm connectors and deployment for regulated buyers. Publisher-reported, not independently tested; no direct-competitor claim."
  },
  {
    "id": "claim-fill-lasso-mcp-security",
    "statement": "Lasso markets MCP security with MCP server discovery and controls for MCP clients including Claude Desktop and Claude Code.",
    "subjectType": "product",
    "subjectId": "lasso-mcp-security",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-fill-lasso-mcp-security",
    "sourceUrl": "https://lasso.security/use-cases/mcp-security",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-11-09",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-09",
    "conflictsWith": [],
    "notes": "The MCP gateway is open source; the commercial platform is separate. Publisher-reported, not independently tested; no direct-competitor claim."
  },
  {
    "id": "claim-fill-operant-mcp-gateway",
    "statement": "Coverage of Operant's MCP Gateway launch: an extension of its AI Gatekeeper platform that identifies and manages interactions between AI agents and MCP servers.",
    "subjectType": "product",
    "subjectId": "operant-mcp-gateway",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-fill-operant-mcp-gateway",
    "sourceUrl": "https://pureai.com/Articles/2025/06/29/Operant-AI-Unveils-Security-Platform-for-AI-Agents-Using-MCP-Standard.aspx",
    "sourceType": "news",
    "publishedAt": "2025-06-29",
    "observedAt": "2026-11-09",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-09",
    "conflictsWith": [],
    "notes": "Launched June 2025; confirm supported clouds and clients. Third-party coverage of a vendor announcement, not independently tested; no direct-competitor claim."
  },
  {
    "id": "claim-fill-strata-maverics",
    "statement": "Strata documents Maverics as an orchestration platform for modern, legacy and AI identity that routes authentication and authorization between apps and identity providers.",
    "subjectType": "product",
    "subjectId": "strata-maverics",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-fill-strata-maverics",
    "sourceUrl": "https://docs.strata.io/",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-11-09",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-09",
    "conflictsWith": [],
    "notes": "Strata states Maverics can run in the cloud or on-premises as a proxy or app-server module. Publisher-reported, not independently tested; no direct-competitor claim."
  },
  {
    "id": "claim-fill-cerbos-platform",
    "statement": "Cerbos documents an open-source policy decision point that evaluates authorization requests against policies, with Hub as a separate managed component.",
    "subjectType": "product",
    "subjectId": "cerbos-platform",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-fill-cerbos-platform",
    "sourceUrl": "https://docs.cerbos.dev/",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-11-09",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-09",
    "conflictsWith": [],
    "notes": "PDP is open source; Hub is the managed control plane. Publisher-reported, not independently tested; no direct-competitor claim."
  },
  {
    "id": "claim-fill-authzed-spicedb",
    "statement": "AuthZed's official GitHub describes SpiceDB as an open-source, Zanzibar-inspired database for storing and querying fine-grained authorization data.",
    "subjectType": "product",
    "subjectId": "authzed-spicedb",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-fill-authzed-spicedb",
    "sourceUrl": "https://github.com/authzed",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-11-09",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-09",
    "conflictsWith": [],
    "notes": "Managed AuthZed offerings exist; editions not verified here. Publisher-reported, not independently tested; no direct-competitor claim."
  },
  {
    "id": "claim-fill-credo-ai-platform",
    "statement": "Credo AI markets an AI governance platform with a centralized AI registry, evidence intake from MLOps and assessment tools, and a vendor portal.",
    "subjectType": "product",
    "subjectId": "credo-ai-platform",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-fill-credo-ai-platform",
    "sourceUrl": "https://www.credo.ai/product",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-11-09",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-09",
    "conflictsWith": [],
    "notes": "Confirm which integrations feed evidence automatically. Publisher-reported, not independently tested; no direct-competitor claim."
  },
  {
    "id": "claim-fill-holistic-ai-platform",
    "statement": "Holistic AI says its governance platform connects to infrastructure to find AI systems automatically rather than relying on manual registry forms.",
    "subjectType": "product",
    "subjectId": "holistic-ai-platform",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-fill-holistic-ai-platform",
    "sourceUrl": "https://www.holisticai.com/blog/enterprise-ai-inventory",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-11-09",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-09",
    "conflictsWith": [],
    "notes": "Confirm connector coverage and runtime enforcement scope. Publisher-reported, not independently tested; no direct-competitor claim."
  },
  {
    "id": "claim-fill-protect-ai-guardian",
    "statement": "Protect AI says Guardian Local Scanning runs model scanning as a container inside CI/CD pipelines against models from registries and Git.",
    "subjectType": "product",
    "subjectId": "protect-ai-guardian",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-fill-protect-ai-guardian",
    "sourceUrl": "https://protectai.com/blog/guardian-local-scanning",
    "sourceType": "vendor_marketing",
    "publishedAt": "2025-04-23",
    "observedAt": "2026-11-09",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-09",
    "conflictsWith": [],
    "notes": "Publisher-reported, not independently tested. Now sold by Palo Alto Networks; confirm current packaging."
  }
,{
    "id": "claim-forrester-eti-drp-2026",
    "statement": "Forrester's public announcement of its Q3 2026 External Threat Intelligence Wave says the evaluation breaks digital risk protection into brand protection, executive protection and fraud intelligence.",
    "subjectType": "category",
    "subjectId": "digital-risk-protection",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-forrester-eti-wave-2026",
    "sourceUrl": "https://www.forrester.com/blogs/announcing-the-forrester-wave-external-threat-intelligence-service-providers-q3-2026/",
    "sourceType": "analyst",
    "publishedAt": null,
    "observedAt": "2026-11-09",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "needs_review",
    "lastCheckedAt": "2026-11-09",
    "conflictsWith": [],
    "notes": "Category framing only. Vendor placements and scores are client-only and are not cells. No product is assigned."
  },
  {
    "id": "claim-recorded-future-forrester-2026",
    "statement": "Recorded Future says it was named a Leader in Forrester's Q3 2026 External Threat Intelligence Service Providers Wave.",
    "subjectType": "vendor",
    "subjectId": "recorded-future",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-recorded-future-forrester-2026",
    "sourceUrl": "https://www.recordedfuture.com/newsroom/press-releases/recorded-future-leader-external-threat-intelligence-2026",
    "sourceType": "press_release",
    "publishedAt": null,
    "observedAt": "2026-11-09",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-09",
    "conflictsWith": [],
    "notes": "Vendor-reported analyst placement. Forrester's report is client-only; the scoring was not reviewed. This links the vendor to DRP as adjacent only."
  },
  {
    "id": "claim-fill-zerofox-protection",
    "statement": "ZeroFox says its digital risk protection includes EASM, brand, domain, executive, social media and dark web protection.",
    "subjectType": "vendor",
    "subjectId": "zerofox",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-fill-zerofox-protection",
    "sourceUrl": "https://www.zerofox.com/protection/",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-11-09",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-09",
    "conflictsWith": [],
    "notes": "Publisher-reported, not tested. Vendor-level record only; no product cell, consistent with the DRP gate."
  },
  {
    "id": "claim-fill-zerofox-analyst",
    "statement": "ZeroFox states Gartner and Forrester recognize it in digital risk protection.",
    "subjectType": "vendor",
    "subjectId": "zerofox",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-fill-zerofox-analyst",
    "sourceUrl": "https://www.zerofox.com/compare/zerofox-vs-doppel/",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-11-09",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "needs_review",
    "lastCheckedAt": "2026-11-09",
    "conflictsWith": [],
    "notes": "Vendor-reported analyst recognition from a ZeroFox comparison page; the underlying Gartner and Forrester documents were not reviewed."
  },
  {
    "id": "claim-fill-contrast-gartner-hc-2026",
    "statement": "Contrast says Gartner's Hype Cycle for Application Security, 2026 names it a Sample Vendor for Application Detection and Response.",
    "subjectType": "vendor",
    "subjectId": "contrast-security",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-fill-contrast-gartner-hc-2026",
    "sourceUrl": "https://www.contrastsecurity.com/gartner-appsec-hype-cycle-adr",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-11-09",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-09",
    "conflictsWith": [],
    "notes": "Vendor-reported analyst listing. A Sample Vendor mention is not a ranking."
  },
  {
    "id": "claim-fill-contrast-adr",
    "statement": "Contrast introduced ADR to detect and block attacks on custom applications and APIs from inside the application, with SIEM, XDR and CNAPP integrations.",
    "subjectType": "product",
    "subjectId": "contrast-adr",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-fill-contrast-adr-2024",
    "sourceUrl": "https://www.contrastsecurity.com/press/contrast-security-introduces-application-detection-and-response-adr-to-identify-and-block-attacks-and-zero-days-on-applications-in-production",
    "sourceType": "press_release",
    "publishedAt": "2024-08-06",
    "observedAt": "2026-11-09",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-09",
    "conflictsWith": [],
    "notes": "Publisher-reported, not tested. Product is primary in application runtime protection and only adjacent to runtime-validated AppSec, consistent with the RVAS gate."
  }
];
