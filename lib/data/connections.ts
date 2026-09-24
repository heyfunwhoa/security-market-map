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

export type Reading = {
  title: string;
  published: string;
  use: string;
  href: string | null;
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
      vendor("GitHub Advanced Security", "github"),
    ],
  },
  {
    name: "Secrets management",
    problem: "Storing, issuing, and rotating credentials",
    href: "/categories/secrets-management",
    examples: [
      vendor("HashiCorp", "hashicorp"),
      vendor("Akeyless", "akeyless"),
      vendor("CyberArk, now in the Idira lineage", "palo-alto-networks"),
    ],
  },
  {
    name: "NHI discovery and posture",
    problem: "Finding machine identities, owners, permissions, and risk",
    href: "/categories/nhi",
    examples: [vendor("Oasis Security", "oasis"), vendor("Entro Security", "entro"), vendor("Astrix Security", "astrix")],
  },
  {
    name: "Machine IAM and workload identity",
    problem: "Authenticating workloads and managing machine access",
    href: "/categories/nhi",
    examples: [
      vendor("Akeyless", "akeyless"),
      vendor("Cloud-native IAM", "microsoft"),
      { label: "SPIFFE/SPIRE", href: null },
    ],
  },
  {
    name: "Identity governance",
    problem: "Reviewing, approving, and removing access",
    href: "/categories/iga",
    examples: [vendor("SailPoint", "sailpoint"), vendor("Saviynt", "saviynt"), vendor("C1, formerly ConductorOne", "c1")],
  },
  {
    name: "Privileged access",
    problem: "Controlling and monitoring privileged identities",
    href: "/categories/pam",
    examples: [
      vendor("CyberArk lineage", "palo-alto-networks"),
      vendor("BeyondTrust", "beyondtrust"),
      vendor("Delinea", "delinea"),
    ],
  },
  {
    name: "Certificate lifecycle",
    problem: "Managing certificates tied to machine identities",
    href: null,
    examples: [
      { label: "Venafi", href: null },
      { label: "DigiCert", href: null },
      { label: "Keyfactor", href: null },
    ],
  },
  {
    name: "Cloud entitlements",
    problem: "Finding and reducing excessive cloud permissions",
    href: "/categories/ciem",
    examples: [
      vendor("Wiz", "wiz"),
      vendor("Microsoft", "microsoft"),
      { label: "Sonrai Security", href: null },
    ],
  },
  {
    name: "SaaS-to-SaaS and OAuth",
    problem: "Watching third-party applications and their grants",
    href: "/categories/nhi",
    examples: [
      vendor("Astrix Security", "astrix"),
      { label: "Grip Security", href: null },
      { label: "AppOmni", href: null },
    ],
  },
  {
    name: "AI agent identity",
    problem: "Agent identity, delegated permission, and activity",
    href: "/categories/agent-identity",
    examples: [vendor("C1", "c1"), vendor("Opal", "opal"), vendor("Microsoft", "microsoft")],
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
    ],
  },
  {
    name: "NHI discovery, posture, and governance",
    problem: "Which non-human identities exist, who owns them, and which permissions are still justified?",
    body: "The unit of analysis is the identity and its access, not only the credential string. Oasis has sourced inventory, owner, and lifecycle language. Entro does not. Astrix's sourced fact is the Cisco transition, not a feature list.",
    examples: [vendor("Oasis Security", "oasis"), vendor("Entro Security", "entro"), vendor("Astrix Security", "astrix")],
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

export const readings: Reading[] = [
  {
    title: "OWASP Non-Human Identities Top 10, 2025",
    published: "Project live 24 Dec 2024",
    use: "Risk list for NHIs. It ranks weaknesses, not products.",
    href: "https://owasp.org/www-project-non-human-identities-top-10/2025/table-of-contents/",
  },
  {
    title: "Gartner, Innovation Insight: Improve Security With Machine Identity and Access Management",
    published: "11 Mar 2025",
    use: "Machine identity as an IAM program, not only a vault. Page not retrieved. Subscription research.",
    href: null,
  },
  {
    title: "Gartner, Leaders' Guide to Modern Machine IAM",
    published: "23 May 2025",
    use: "Components of a machine IAM practice. Page not retrieved.",
    href: null,
  },
  {
    title: "Gartner, Innovation Insight: Secrets Management Tools",
    published: "12 Aug 2024",
    use: "Secrets management as necessary to machine identity, and not sufficient by itself. Page not retrieved.",
    href: null,
  },
  {
    title: "Gartner, Market Guide for Identity Governance and Administration",
    published: "2 Oct 2025",
    use: "IGA market structure. Not evidence that every IGA suite governs machines. Page not retrieved.",
    href: null,
  },
  {
    title: "Gartner, Emerging Tech: Key Trends for Identity Product Leaders to Add to Roadmaps in 2026",
    published: "25 Mar 2026",
    use: "Unmanaged agents and machine IAM on identity roadmaps. Page not retrieved.",
    href: null,
  },
  {
    title: "Forrester, The Key To Securing Machine Identities Starts With The Human Element",
    published: "August 2025",
    use: "Ownership and accountability for machine identities. Page not retrieved. A cited 20:1 machine-to-human ratio is an industry estimate, not an account fact.",
    href: null,
  },
  {
    title: "Forrester, Identiverse 2026 remarks on agents",
    published: "June 2026",
    use: "Delegation, context, and continuous authorization for agents. Page not retrieved.",
    href: null,
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
