export type SeedLink = {
  label: string;
  href: string | null;
};

export type ChainStep = {
  problem: string;
  capability: string;
  href: string;
};

export type Segment = {
  name: string;
  problem: string;
  href: string | null;
  examples: SeedLink[];
};

export type Group = {
  name: string;
  problem: string;
  body: string;
  examples: SeedLink[];
};

export type OwaspRisk = {
  id: string;
  name: string;
  meaning: string;
  capability: string;
  href: string;
};

const vendor = (label: string, slug: string | null): SeedLink => ({
  label,
  href: slug ? `/vendors/${slug}` : null,
});

export const identityKinds: { name: string; examples: string; question: string }[] = [
  {
    name: "Human",
    examples: "Employees, contractors, customers",
    question: "Who is the person, and should they still have this access?",
  },
  {
    name: "Non-human",
    examples: "Workloads, applications, service accounts, API identities, CI jobs, certificates",
    question: "What is the machine, who owns it, and what can its credential reach?",
  },
  {
    name: "AI agent",
    examples: "Tool-using agents acting for a user or another service",
    question: "Who delegated authority, and what may this agent do on this task?",
  },
];

export const capabilityBands: { name: string; items: string; href: string }[] = [
  {
    name: "Discovery",
    items: "Inventory, exposure, attribution",
    href: "/categories/nhi",
  },
  {
    name: "Authentication",
    items: "SSO, OAuth, certificates, workload identity",
    href: "/categories/workforce-identity",
  },
  {
    name: "Governance",
    items: "Permissions, ownership, access reviews",
    href: "/categories/iga",
  },
  {
    name: "Lifecycle",
    items: "Provision, monitor, rotate, revoke, decommission",
    href: "/use-cases/nhi-lifecycle",
  },
];

export const credentialChain: ChainStep[] = [
  {
    problem: "A credential was exposed",
    capability: "Secrets detection",
    href: "/use-cases/secrets-detection",
  },
  {
    problem: "Is the credential still active?",
    capability: "Secret verification",
    href: "/use-cases/secrets-detection",
  },
  {
    problem: "Which identity owns it?",
    capability: "Identity and credential discovery",
    href: "/use-cases/nhi-lifecycle",
  },
  {
    problem: "Revoke the compromised credential",
    capability: "Revocation and remediation",
    href: "/use-cases/secrets-detection",
  },
  {
    problem: "Issue a replacement safely",
    capability: "Secrets management",
    href: "/use-cases/secrets-vaulting",
  },
  {
    problem: "Stop leaving a standing credential behind",
    capability: "Workload identity and short-lived authentication",
    href: "/use-cases/cloud-entitlements",
  },
  {
    problem: "What can that identity still reach?",
    capability: "Governance and permission analysis",
    href: "/use-cases/jml-and-reviews",
  },
];

export const nhiTypes: { type: string; example: string; questions: string }[] = [
  {
    type: "Service account",
    example: "A backend application account",
    questions: "Owner, permissions, how it authenticates",
  },
  {
    type: "API identity",
    example: "An application calling Salesforce",
    questions: "Token scope and rotation",
  },
  {
    type: "Cloud workload",
    example: "An IAM role on a Lambda function",
    questions: "Role permissions and how the workload proves itself",
  },
  {
    type: "CI/CD identity",
    example: "GitHub Actions deploying an application",
    questions: "Deployment credentials and repository permissions",
  },
  {
    type: "Kubernetes identity",
    example: "A Kubernetes service account",
    questions: "Workload authentication and cluster permissions",
  },
  {
    type: "Machine identity",
    example: "A server authenticating to another server",
    questions: "Certificates and credential lifecycle",
  },
  {
    type: "SaaS integration",
    example: "An OAuth app connected to Google Workspace",
    questions: "Grants and third-party access",
  },
  {
    type: "AI agent",
    example: "An agent using Jira, Slack, and Salesforce",
    questions: "Delegated access, task scope, activity",
  },
];

export const segments: Segment[] = [
  {
    name: "Secrets detection",
    problem: "Discovering exposed credentials",
    href: "/categories/secrets-detection",
    examples: [
      vendor("Truffle Security", "truffle-security"),
      vendor("GitGuardian", "gitguardian"),
      vendor("GitHub", "github"),
      vendor("Cycode", "cycode"),
      vendor("Nightfall", "nightfall"),
      vendor("Gitleaks", "gitleaks"),
    ],
  },
  {
    name: "Secrets management",
    problem: "Storing, issuing, and rotating credentials",
    href: "/categories/secrets-management",
    examples: [
      vendor("Akeyless", "akeyless"),
      vendor("HashiCorp", "hashicorp"),
      vendor("CyberArk lineage", "palo-alto-networks"),
      vendor("Doppler", "doppler"),
      vendor("Infisical", "infisical"),
      vendor("AWS", "amazon-web-services"),
      vendor("Google", "google"),
    ],
  },
  {
    name: "NHI discovery and posture",
    problem: "Finding machine identities, owners, permissions, and risk",
    href: "/categories/nhi",
    examples: [
      vendor("Oasis Security", "oasis"),
      vendor("Entro Security", "entro"),
      vendor("Astrix Security", "astrix"),
      vendor("Token Security", "token-security"),
      vendor("Clutch Security", "clutch"),
      vendor("Aembit", "aembit"),
    ],
  },
  {
    name: "Machine IAM and workload identity",
    problem: "Authenticating workloads and managing machine access",
    href: "/categories/nhi",
    examples: [
      vendor("Aembit", "aembit"),
      vendor("Akeyless", "akeyless"),
      vendor("Teleport", "teleport"),
      vendor("Microsoft", "microsoft"),
      vendor("Venafi", "venafi"),
      vendor("Keyfactor", "keyfactor"),
      vendor("DigiCert", "digicert"),
      { label: "SPIFFE/SPIRE", href: null },
    ],
  },
  {
    name: "Identity governance",
    problem: "Reviewing, approving, and removing access",
    href: "/categories/iga",
    examples: [
      vendor("SailPoint", "sailpoint"),
      vendor("Saviynt", "saviynt"),
      vendor("C1", "c1"),
      vendor("Okta", "okta"),
      vendor("Microsoft", "microsoft"),
      vendor("Lumos", "lumos"),
      vendor("Veza", "veza"),
      vendor("Omada", "omada"),
      vendor("One Identity", "one-identity"),
    ],
  },
  {
    name: "Privileged access",
    problem: "Controlling and monitoring privileged identities",
    href: "/categories/pam",
    examples: [
      vendor("CyberArk lineage", "palo-alto-networks"),
      vendor("BeyondTrust", "beyondtrust"),
      vendor("Delinea", "delinea"),
      vendor("Britive", "britive"),
      vendor("StrongDM", "strongdm"),
      vendor("Teleport", "teleport"),
    ],
  },
  {
    name: "Certificate lifecycle",
    problem: "Managing certificates tied to machine identities",
    href: null,
    examples: [vendor("Venafi", "venafi"), vendor("Keyfactor", "keyfactor"), vendor("DigiCert", "digicert")],
  },
  {
    name: "Cloud entitlements",
    problem: "Finding and reducing excessive cloud permissions",
    href: "/categories/ciem",
    examples: [
      vendor("Wiz", "wiz"),
      vendor("Veza", "veza"),
      vendor("Orca Security", "orca-security"),
      vendor("Sonrai Security", "sonrai"),
      vendor("Microsoft", "microsoft"),
    ],
  },
  {
    name: "SaaS-to-SaaS and OAuth",
    problem: "Watching third-party applications and their grants",
    href: "/categories/nhi",
    examples: [
      vendor("Astrix Security", "astrix"),
      vendor("AppOmni", "appomni"),
      vendor("Grip Security", "grip"),
    ],
  },
  {
    name: "AI agent identity",
    problem: "Agent identity, delegated permission, and activity",
    href: "/categories/agent-identity",
    examples: [
      vendor("C1", "c1"),
      vendor("Opal", "opal"),
      vendor("Microsoft", "microsoft"),
      vendor("Astrix Security", "astrix"),
      vendor("Aembit", "aembit"),
    ],
  },
];

export const groups: Group[] = [
  {
    name: "Secrets detection and exposure",
    problem: "Was a credential exposed, is it still live, and what do we do next?",
    body: "These products start in source code, repositories, and developer workflow. A leaked key can belong to a non-human identity. Finding the key does not, by itself, show the owner, the full permission set, or the lifecycle.",
    examples: [
      vendor("Truffle Security", "truffle-security"),
      vendor("GitGuardian", "gitguardian"),
      vendor("GitHub", "github"),
      vendor("Cycode", "cycode"),
      vendor("Nightfall", "nightfall"),
    ],
  },
  {
    name: "Secrets management and machine authentication",
    problem: "How does an application get a credential without leaving a long-lived secret in a config file?",
    body: "The buyer is often platform engineering, not only the AppSec team that found the leak. A vault and a scanner can sit in the same account. One provisions. The other finds what bypassed the approved path. Akeyless cells in this seed stay Unknown.",
    examples: [
      vendor("Akeyless", "akeyless"),
      vendor("HashiCorp", "hashicorp"),
      vendor("Idira / CyberArk lineage", "palo-alto-networks"),
      vendor("Aembit", "aembit"),
      vendor("Doppler", "doppler"),
      vendor("AWS", "amazon-web-services"),
    ],
  },
  {
    name: "NHI discovery, posture, and governance",
    problem: "Which non-human identities exist, who owns them, and which permissions are still justified?",
    body: "The unit of analysis is the identity and its access, not only the credential string. Oasis has sourced inventory, owner, and lifecycle language. Entro, Token Security, and Clutch do not. Astrix's sourced fact is the Cisco transition, not a feature list.",
    examples: [
      vendor("Oasis Security", "oasis"),
      vendor("Entro Security", "entro"),
      vendor("Token Security", "token-security"),
      vendor("Clutch Security", "clutch"),
      vendor("Astrix Security", "astrix"),
      vendor("AppOmni", "appomni"),
    ],
  },
  {
    name: "Governance, privilege, and identity platforms",
    problem: "Can the identity system the company already owns cover service accounts and agents?",
    body: "An IGA suite, a PAM platform, and a workforce IdP start from different questions. A buyer may extend one of them, or add a specialist where that extension is missing. WorkOS is a different starting point: enterprise identity features inside a SaaS product, not an inventory of unmanaged service accounts.",
    examples: [
      vendor("C1", "c1"),
      vendor("SailPoint", "sailpoint"),
      vendor("Saviynt", "saviynt"),
      vendor("Okta", "okta"),
      vendor("Microsoft", "microsoft"),
      vendor("WorkOS", "workos"),
    ],
  },
];

export const owaspRisks: OwaspRisk[] = [
  {
    id: "NHI1:2025",
    name: "Improper offboarding",
    meaning: "Machine identities stay active after they should have been removed.",
    capability: "Identity lifecycle",
    href: "/use-cases/nhi-lifecycle",
  },
  {
    id: "NHI2:2025",
    name: "Secret leakage",
    meaning: "Credentials become exposed.",
    capability: "Secrets detection",
    href: "/categories/secrets-detection",
  },
  {
    id: "NHI3:2025",
    name: "Vulnerable third-party NHI",
    meaning: "An external integration brings an identity risk with it.",
    capability: "SaaS and third-party access",
    href: "/categories/nhi",
  },
  {
    id: "NHI4:2025",
    name: "Insecure authentication",
    meaning: "Weak authentication exposes the machine identity.",
    capability: "Machine authentication",
    href: "/categories/nhi",
  },
  {
    id: "NHI5:2025",
    name: "Overprivileged NHI",
    meaning: "The identity can do more than its job requires.",
    capability: "Governance and entitlements",
    href: "/categories/iga",
  },
  {
    id: "NHI6:2025",
    name: "Insecure cloud deployment configurations",
    meaning: "Cloud configuration creates an identity risk.",
    capability: "Cloud posture",
    href: "/categories/ciem",
  },
  {
    id: "NHI7:2025",
    name: "Long-lived secrets",
    meaning: "A credential stays valid longer than it needs to.",
    capability: "Secrets management",
    href: "/categories/secrets-management",
  },
  {
    id: "NHI8:2025",
    name: "Environment isolation",
    meaning: "Weak separation lets one environment reach another.",
    capability: "Workload and infrastructure access",
    href: "/categories/ciem",
  },
  {
    id: "NHI9:2025",
    name: "NHI reuse",
    meaning: "The same identity is reused across services or environments.",
    capability: "Identity segmentation",
    href: "/categories/nhi",
  },
  {
    id: "NHI10:2025",
    name: "Human use of NHI",
    meaning: "A person uses a machine identity, which blurs accountability.",
    capability: "Privileged access and governance",
    href: "/categories/pam",
  },
];

export const namedShortlists: {
  market: string;
  frame: string;
  examples: SeedLink[];
}[] = [
  {
    market: "Machine identity",
    frame: "Gartner's 2025 machine-IAM notes name the practice. These are the companies on the shortlist. The reports were not retrieved, and this is not their vendor list.",
    examples: [
      vendor("Oasis Security", "oasis"),
      vendor("Token Security", "token-security"),
      vendor("Entro Security", "entro"),
      vendor("Clutch Security", "clutch"),
      vendor("Aembit", "aembit"),
      vendor("Akeyless", "akeyless"),
      vendor("Venafi", "venafi"),
      vendor("Astrix Security", "astrix"),
    ],
  },
  {
    market: "Secrets",
    frame: "Gartner's August 2024 secrets-management note separates storage from machine identity. Detection and the vault are still different names.",
    examples: [
      vendor("Truffle Security", "truffle-security"),
      vendor("GitGuardian", "gitguardian"),
      vendor("Cycode", "cycode"),
      vendor("GitHub", "github"),
      vendor("Akeyless", "akeyless"),
      vendor("HashiCorp", "hashicorp"),
      vendor("CyberArk lineage", "palo-alto-networks"),
    ],
  },
  {
    market: "Identity governance",
    frame: "Gartner's October 2025 IGA guide is about the market, not proof that any of these govern machines. SailPoint, Saviynt, and C1 are the names buyers bring.",
    examples: [
      vendor("SailPoint", "sailpoint"),
      vendor("Saviynt", "saviynt"),
      vendor("C1", "c1"),
      vendor("Okta", "okta"),
      vendor("Microsoft", "microsoft"),
      vendor("Lumos", "lumos"),
      vendor("Omada", "omada"),
    ],
  },
  {
    market: "Agents",
    frame: "Forrester's 2026 agent remarks and Gartner's March 2026 identity-roadmap note describe delegation. These products have agent language or sit next to it. That is not a ranking.",
    examples: [
      vendor("C1", "c1"),
      vendor("Opal", "opal"),
      vendor("Microsoft", "microsoft"),
      vendor("Astrix Security", "astrix"),
      vendor("Aembit", "aembit"),
      vendor("WorkOS", "workos"),
    ],
  },
  {
    market: "Cloud permissions",
    frame: "CIEM shows up inside CNAPP conversations and as a specialist graph. Wiz, Veza, Orca, and Sonrai are the names. None has a filled permission cell here.",
    examples: [
      vendor("Wiz", "wiz"),
      vendor("Veza", "veza"),
      vendor("Orca Security", "orca-security"),
      vendor("Sonrai Security", "sonrai"),
      vendor("Microsoft", "microsoft"),
    ],
  },
  {
    market: "The rest of the estate",
    frame: "The same shortlist habit, outside identity. Network, email, exposure, data, and recovery. Still not an analyst placement.",
    examples: [
      vendor("Palo Alto Networks", "palo-alto-networks"),
      vendor("Zscaler", "zscaler"),
      vendor("Netskope", "netskope"),
      vendor("Fortinet", "fortinet"),
      vendor("CrowdStrike", "crowdstrike"),
      vendor("SentinelOne", "sentinelone"),
      vendor("Proofpoint", "proofpoint"),
      vendor("Abnormal Security", "abnormal"),
      vendor("Mimecast", "mimecast"),
      vendor("Tenable", "tenable"),
      vendor("Qualys", "qualys"),
      vendor("Rapid7", "rapid7"),
      vendor("Censys", "censys"),
      vendor("Pentera", "pentera"),
      vendor("Cyera", "cyera"),
      vendor("BigID", "bigid"),
      vendor("Varonis", "varonis"),
      vendor("Splunk", "splunk"),
      vendor("Rubrik", "rubrik"),
      vendor("Veeam", "veeam"),
    ],
  },
  {
    market: "Detection, exposure, and the edge",
    frame: "Gartner and Forrester publish separate notes for XDR, MDR, NDR, threat intelligence, WAAP, exposure, OT, insider risk, ratings, and AI application security. These are the companies buyers name. The report pages were not retrieved, and this is not a placement.",
    examples: [
      vendor("CrowdStrike", "crowdstrike"),
      vendor("Arctic Wolf", "arctic-wolf"),
      vendor("ExtraHop", "extrahop"),
      vendor("Recorded Future", "recorded-future"),
      vendor("Akamai", "akamai"),
      vendor("CyCognito", "cycognito"),
      vendor("Axonius", "axonius"),
      vendor("Claroty", "claroty"),
      vendor("BitSight", "bitsight"),
      vendor("Lakera", "lakera"),
      vendor("Island", "island"),
    ],
  },
];

export const estateAreas: { name: string; problem: string; href: string; examples: SeedLink[] }[] = [
  {
    name: "Network edge",
    problem: "Which traffic and connections should be allowed?",
    href: "/categories/network-edge",
    examples: [
      vendor("Palo Alto Networks", "palo-alto-networks"),
      vendor("Zscaler", "zscaler"),
      vendor("Netskope", "netskope"),
      vendor("Fortinet", "fortinet"),
      vendor("Check Point", "checkpoint"),
      vendor("Cloudflare", "cloudflare"),
    ],
  },
  {
    name: "Endpoint",
    problem: "Is a laptop, server, or mobile device compromised?",
    href: "/categories/endpoint-security",
    examples: [
      vendor("CrowdStrike", "crowdstrike"),
      vendor("SentinelOne", "sentinelone"),
      vendor("Microsoft", "microsoft"),
    ],
  },
  {
    name: "Email",
    problem: "Can we stop phishing and account compromise?",
    href: "/categories/email-security",
    examples: [
      vendor("Proofpoint", "proofpoint"),
      vendor("Abnormal Security", "abnormal"),
      vendor("Mimecast", "mimecast"),
      vendor("Microsoft", "microsoft"),
    ],
  },
  {
    name: "Exposure",
    problem: "Which weaknesses should we fix first?",
    href: "/categories/it-vulnerability-management",
    examples: [
      vendor("Tenable", "tenable"),
      vendor("Qualys", "qualys"),
      vendor("Rapid7", "rapid7"),
      vendor("Censys", "censys"),
      vendor("Pentera", "pentera"),
    ],
  },
  {
    name: "Data",
    problem: "Where is sensitive data, and can it leave?",
    href: "/categories/dspm",
    examples: [vendor("Cyera", "cyera"), vendor("BigID", "bigid"), vendor("Varonis", "varonis")],
  },
  {
    name: "Operations",
    problem: "What happened, and how do we respond?",
    href: "/categories/siem",
    examples: [vendor("Splunk", "splunk"), vendor("Microsoft", "microsoft"), vendor("CrowdStrike", "crowdstrike")],
  },
  {
    name: "Recovery",
    problem: "Can we restore after the control fails?",
    href: "/categories/cyber-recovery",
    examples: [
      vendor("Rubrik", "rubrik"),
      vendor("Veeam", "veeam"),
      vendor("Cohesity", "cohesity"),
      vendor("Commvault", "commvault"),
    ],
  },
  {
    name: "XDR",
    problem: "Which host, identity, and email signals become one case?",
    href: "/categories/xdr",
    examples: [
      vendor("CrowdStrike", "crowdstrike"),
      vendor("SentinelOne", "sentinelone"),
      vendor("Microsoft", "microsoft"),
      vendor("Palo Alto Networks", "palo-alto-networks"),
    ],
  },
  {
    name: "Managed detection",
    problem: "Who responds when we do not have the overnight shift?",
    href: "/categories/mdr",
    examples: [
      vendor("Arctic Wolf", "arctic-wolf"),
      vendor("Expel", "expel"),
      vendor("Red Canary", "red-canary"),
      vendor("Secureworks", "secureworks"),
    ],
  },
  {
    name: "Network detection",
    problem: "What moves on the network that an endpoint agent cannot see?",
    href: "/categories/ndr",
    examples: [
      vendor("ExtraHop", "extrahop"),
      vendor("Vectra AI", "vectra"),
      vendor("Corelight", "corelight"),
      vendor("Darktrace", "darktrace"),
    ],
  },
  {
    name: "Threat intelligence",
    problem: "Which reporting does detection actually use?",
    href: "/categories/threat-intelligence",
    examples: [
      vendor("Recorded Future", "recorded-future"),
      vendor("Flashpoint", "flashpoint"),
      vendor("Google", "google"),
    ],
  },
  {
    name: "SaaS posture",
    problem: "Which connected apps and OAuth grants are still standing?",
    href: "/categories/sspm",
    examples: [vendor("AppOmni", "appomni"), vendor("Grip Security", "grip")],
  },
  {
    name: "Application edge",
    problem: "What blocks a request before it reaches the application?",
    href: "/categories/waf-waap",
    examples: [
      vendor("Cloudflare", "cloudflare"),
      vendor("Akamai", "akamai"),
      vendor("F5", "f5"),
      vendor("Imperva", "imperva"),
    ],
  },
  {
    name: "Microsegmentation",
    problem: "Which workloads may talk to each other?",
    href: "/categories/microsegmentation",
    examples: [vendor("Illumio", "illumio"), vendor("Akamai", "akamai")],
  },
  {
    name: "External attack surface",
    problem: "What is exposed that the asset list missed?",
    href: "/categories/external-attack-surface",
    examples: [vendor("Censys", "censys"), vendor("CyCognito", "cycognito")],
  },
  {
    name: "Asset inventory",
    problem: "Which tool is the source of truth for what exists?",
    href: "/categories/security-asset-management",
    examples: [vendor("Axonius", "axonius"), vendor("JupiterOne", "jupiterone")],
  },
  {
    name: "OT and IoT",
    problem: "What is on the plant or device network?",
    href: "/categories/ot-security",
    examples: [
      vendor("Claroty", "claroty"),
      vendor("Dragos", "dragos"),
      vendor("Nozomi Networks", "nozomi"),
      vendor("Armis", "armis"),
    ],
  },
  {
    name: "Insider risk",
    problem: "Who already has access and is moving data?",
    href: "/categories/insider-risk",
    examples: [
      vendor("DTEX Systems", "dtex"),
      vendor("Securonix", "securonix"),
      vendor("Proofpoint", "proofpoint"),
    ],
  },
  {
    name: "Security ratings",
    problem: "Whose outside-in score changes a supplier decision?",
    href: "/categories/security-ratings",
    examples: [
      vendor("BitSight", "bitsight"),
      vendor("SecurityScorecard", "securityscorecard"),
      vendor("Black Kite", "black-kite"),
    ],
  },
  {
    name: "Enterprise browser",
    problem: "Is the control the browser or the identity that opens the app?",
    href: "/categories/enterprise-browser",
    examples: [vendor("Island", "island")],
  },
  {
    name: "AI application security",
    problem: "Is the issue the model, or the identity the agent uses?",
    href: "/categories/ai-application-security",
    examples: [
      vendor("Lakera", "lakera"),
      vendor("HiddenLayer", "hiddenlayer"),
      vendor("Robust Intelligence", "robust-intelligence"),
    ],
  },
  {
    name: "Agent runtime",
    problem: "Should this agent action continue right now?",
    href: "/categories/agentic-runtime",
    examples: [
      vendor("Aembit", "aembit"),
      vendor("Apono", "apono"),
      vendor("Oasis Security", "oasis"),
      vendor("Astrix Security", "astrix"),
      vendor("C1", "c1"),
      vendor("Noma Security", "noma"),
      vendor("Keycard", "keycard"),
      vendor("Cyata", "cyata"),
    ],
  },
  {
    name: "Endpoint control",
    problem: "What is the laptop doing above the process tree?",
    href: "/categories/endpoint-control",
    examples: [
      vendor("CrowdStrike", "crowdstrike"),
      vendor("SentinelOne", "sentinelone"),
      vendor("Palo Alto Networks", "palo-alto-networks"),
      vendor("Cyberhaven", "cyberhaven"),
      vendor("Neo Security", "neo-security"),
      vendor("Bay Security", null),
      vendor("Bloom Security", null),
      vendor("Glow Security", null),
    ],
  },
];

export const identityEras: { era: string; name: string; actor: string; control: string; gap: string; href: string }[] = [
  {
    era: "Era 1",
    name: "Human identity and perimeter access",
    actor: "Employee, contractor, partner, administrator",
    control: "Authentication, directory membership, manager approval, periodic review",
    gap: "Review happens at human speed, often after the activity.",
    href: "/categories/workforce-identity",
  },
  {
    era: "Era 2",
    name: "Cloud, SaaS, and zero trust",
    actor: "Users, devices, cloud apps, SaaS, APIs",
    control: "A decision per request, with device and risk signals",
    gap: "The decision is still about reaching a resource, not an autonomous chain of actions.",
    href: "/categories/network-edge",
  },
  {
    era: "Era 3",
    name: "Non-human identities, secrets, and automation",
    actor: "Service accounts, API keys, OAuth grants, workloads, CI jobs, bots",
    control: "PAM, vaults, cloud IAM, NHI inventory, identity posture",
    gap: "Most controls assume a predictable script, job, or pipeline.",
    href: "/categories/nhi",
  },
  {
    era: "Era 4",
    name: "Agentic execution",
    actor: "Agents using delegated authority, memory, tools, APIs, and data",
    control: "Runtime identity enforcement, tool governance, intent, and an audit of the action",
    gap: "The agent can choose the next step at machine speed, before a review.",
    href: "/categories/agentic-runtime",
  },
];

export const nhiEcosystem: { name: string; note: string; href: string; examples: SeedLink[] }[] = [
  {
    name: "IAM",
    note: "Human directory. Partial view of machines.",
    href: "/categories/workforce-identity",
    examples: [vendor("Microsoft", "microsoft"), vendor("Okta", "okta")],
  },
  {
    name: "IGA",
    note: "Access reviews. Not a machine inventory by default.",
    href: "/categories/iga",
    examples: [vendor("Saviynt", "saviynt"), vendor("SailPoint", "sailpoint")],
  },
  {
    name: "ITDR",
    note: "Identity detection. Not NHI lifecycle.",
    href: "/categories/itdr",
    examples: [vendor("CrowdStrike", "crowdstrike"), vendor("Silverfort", "silverfort")],
  },
  {
    name: "NHI authentication",
    note: "SACR's 2024 split: who is the machine, and may it connect.",
    href: "/categories/nhi",
    examples: [vendor("Aembit", "aembit"), vendor("Corsha", "corsha")],
  },
  {
    name: "NHI governance",
    note: "Discovery, owners, and lifecycle. Not the same as authentication.",
    href: "/categories/nhi",
    examples: [
      vendor("Clutch Security", "clutch"),
      vendor("Entro Security", "entro"),
      vendor("Astrix Security", "astrix"),
      vendor("Natoma", "natoma"),
      vendor("Oasis Security", "oasis"),
      vendor("Token Security", "token-security"),
    ],
  },
  {
    name: "Microsegmentation",
    note: "Workload-to-workload policy on the same graphic.",
    href: "/categories/microsegmentation",
    examples: [vendor("TrustFour", "trustfour"), vendor("Illumio", "illumio")],
  },
  {
    name: "Cloud identity",
    note: "Human and non-human permissions in cloud and SaaS.",
    href: "/categories/ciem",
    examples: [
      vendor("Veza", "veza"),
      vendor("Apono", "apono"),
      vendor("Andromeda Security", "andromeda-security"),
      vendor("SlashID", "slashid"),
    ],
  },
  {
    name: "CIEM",
    note: "Cloud entitlements. A module is not an IGA suite.",
    href: "/categories/ciem",
    examples: [vendor("Wiz", "wiz"), vendor("Microsoft", "microsoft"), vendor("Sonrai Security", "sonrai")],
  },
  {
    name: "PAM, secrets, and vaults",
    note: "Where the credential is stored or brokered.",
    href: "/categories/pam",
    examples: [
      vendor("Delinea", "delinea"),
      vendor("Palo Alto Networks", "palo-alto-networks"),
      vendor("HashiCorp", "hashicorp"),
    ],
  },
];

export const sacrLanes: { name: string; topic: string | null; local: string; note: string }[] = [
  {
    name: "Security operations",
    topic: "https://softwareanalyst.substack.com/t/security-operations",
    local: "/domains/secops",
    note: "Detection, response, and the endpoint layer SACR is now calling control and prevention.",
  },
  {
    name: "Cloud and AppSec",
    topic: "https://softwareanalyst.substack.com/t/cloud-and-appsec",
    local: "/domains/cloud",
    note: "Cloud posture and application security. A CNAPP finding is not an AppSec finding.",
  },
  {
    name: "Data and AI agent security",
    topic: null,
    local: "/categories/agentic-runtime",
    note: "DSPM, DLP, and runtime control of agents. Cyera and Oasis are the announced convergence example.",
  },
  {
    name: "Identity and network security",
    topic: "https://softwareanalyst.substack.com/t/identity-and-network-security",
    local: "/domains/identity",
    note: "Human IAM through NHI, PAM, and the network decisions that still depend on an identity.",
  },
];

export const companyLenses: { company: string; href: string; focus: string; beside: string }[] = [
  {
    company: "Truffle Security",
    href: "/vendors/truffle-security",
    focus: "Secrets detection, verification, and remediation",
    beside: "The exposed credential, and the identity it may represent",
  },
  {
    company: "Akeyless",
    href: "/vendors/akeyless",
    focus: "Secrets management and machine authentication",
    beside: "Credential lifecycle and workload identity. Capability cells here are Unknown.",
  },
  {
    company: "C1",
    href: "/vendors/c1",
    focus: "Identity governance, including non-human and agent language on its own pages",
    beside: "Whether access is still appropriate. Formerly ConductorOne.",
  },
  {
    company: "WorkOS",
    href: "/vendors/workos",
    focus: "Enterprise SSO, directory sync, and organization auth inside a SaaS product",
    beside: "Developer identity infrastructure. Do not treat agent or NHI inventory as a current capability.",
  },
  {
    company: "Palo Alto Networks",
    href: "/vendors/palo-alto-networks",
    focus: "Privileged access and the CyberArk lineage, now moving under Idira",
    beside: "PAM, secrets, and machine identity. Do not merge those with Prisma Cloud.",
  },
  {
    company: "Oasis Security",
    href: "/vendors/oasis",
    focus: "NHI discovery, owners, and lifecycle language",
    beside: "The identity record, not only the leaked secret",
  },
  {
    company: "Astrix Security",
    href: "/vendors/astrix",
    focus: "NHI and SaaS-integration positioning, now part of Cisco",
    beside: "Third-party access. New standalone licenses ended 30 Jun 2026, per the homepage.",
  },
];
