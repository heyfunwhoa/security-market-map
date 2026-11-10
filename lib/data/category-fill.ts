import type { Claim, Product, Source, Vendor } from "../schema";

// Vendors for categories that had none (2026-11-09). Research candidates only.
// Every product statement is publisher-reported unless noted. No direct-competitor or parity claims.
// See docs/market-research/empty-category-vendors-2026-11.md for placement and limits.

export const categoryFillVendors: Vendor[] = [
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
];

export const categoryFillProducts: Product[] = [
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
];

export const categoryFillSources: Source[] = [
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
];

export const categoryFillClaims: Claim[] = [
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
];
