import type { Claim, Product, Source, Vendor } from "../schema";

// ISPM and WIM vendors (2026-11-17). Research candidates only.
// Every statement is publisher-reported or project/official documentation. No direct-competitor or parity claims.
// See docs/market-research/ispm-wim-categories-2026-11.md for placement, limits and blocked sources.

export const ispmWimVendors: Vendor[] = [
  {
    "id": "spiffe-project",
    "slug": "spiffe-project",
    "name": "SPIFFE / SPIRE (CNCF)",
    "formerNames": [],
    "website": "https://spiffe.io/",
    "positioning": "Open-source workload identity standards (SPIFFE) and reference implementation (SPIRE). Project documentation describes short-lived SVIDs and node and workload attestation. A project, not a commercial vendor.",
    "primaryCategoryIds": [
      "wim"
    ],
    "adjacentCategoryIds": [
      "nhi",
      "secrets-management"
    ],
    "identityScopes": [
      "nhi"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Who would run and support SPIRE at this account, or is a commercial SPIFFE implementation preferred?"
    ]
  },
  {
    "id": "defakto",
    "slug": "defakto",
    "name": "Defakto",
    "formerNames": [],
    "website": "https://www.defakto.security/",
    "positioning": "Defakto describes a non-human IAM platform built on SPIFFE that replaces secrets and standing access with short-lived, verified identities for workloads, CI/CD jobs, machines and AI agents. It is also listed on the SPIFFE project's implementer table.",
    "primaryCategoryIds": [
      "wim"
    ],
    "adjacentCategoryIds": [
      "nhi",
      "agent-identity"
    ],
    "identityScopes": [
      "nhi",
      "agent"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "What does the product add over self-run SPIRE, and is the reported former name (SPIRL) accurate? The homepage does not state it."
    ]
  },
  {
    "id": "riptides",
    "slug": "riptides",
    "name": "Riptides",
    "formerNames": [],
    "website": "https://riptides.io/",
    "positioning": "Riptides describes kernel-level, SPIFFE-based workload identity, secretless credentials, automatic mTLS and per-agent controls for AI agents.",
    "primaryCategoryIds": [
      "wim"
    ],
    "adjacentCategoryIds": [
      "agent-identity",
      "nhi"
    ],
    "identityScopes": [
      "nhi",
      "agent"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Which operating systems and runtimes does the kernel-level enforcement support?"
    ]
  },
  {
    "id": "authmind",
    "slug": "authmind",
    "name": "AuthMind",
    "formerNames": [],
    "website": "https://www.authmind.com/",
    "positioning": "AuthMind markets identity observability: correlating access-path activity of human, non-human and AI agent identities across cloud, SaaS and on-premises.",
    "primaryCategoryIds": [
      "ispm",
      "itdr"
    ],
    "adjacentCategoryIds": [
      "nhi",
      "agent-identity"
    ],
    "identityScopes": [
      "human",
      "nhi",
      "agent"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Is it bought as posture, detection, or both, and which identity sources does it read?",
      "The homepage (retrieved 2026-11-18) carries a headline 'AuthMind Joins IBM to Build the Future of Agentic AI Identity Security'. Announcement versus closed acquisition, effective date and product status are not verified."
    ]
  },
  {
    "id": "orchid-security",
    "slug": "orchid-security",
    "name": "Orchid Security",
    "formerNames": [],
    "website": "https://www.orchid.security/",
    "positioning": "Orchid markets discovery of unmanaged apps, hidden authentication flows and ungoverned access, with posture across self-hosted and SaaS applications.",
    "primaryCategoryIds": [
      "ispm"
    ],
    "adjacentCategoryIds": [
      "iga",
      "identity-orchestration"
    ],
    "identityScopes": [
      "human",
      "nhi"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "How does it observe application authentication flows, and does remediation change the app or the IdP?"
    ]
  },
  {
    "id": "push-security",
    "slug": "push-security",
    "name": "Push Security",
    "formerNames": [],
    "website": "https://pushsecurity.com/",
    "positioning": "Browser-based security vendor. It says it observes how users actually log in, including accounts, authentication methods and shadow apps, and guides MFA and SSO adoption in the browser.",
    "primaryCategoryIds": [
      "enterprise-browser"
    ],
    "adjacentCategoryIds": [
      "ispm",
      "itdr"
    ],
    "identityScopes": [
      "human"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Browser extension coverage across managed and unmanaged devices?"
    ]
  }
];

export const ispmWimProducts: Product[] = [
  {
    "id": "okta-ispm",
    "slug": "okta-ispm",
    "vendorId": "okta",
    "name": "Okta Identity Security Posture Management",
    "positioning": "Okta markets continuous analysis of identity security exposure, including access without MFA, shadow admins, and offboarded users with access.",
    "primaryCategoryIds": [
      "ispm"
    ],
    "adjacentCategoryIds": [
      "itdr",
      "nhi"
    ],
    "deployment": [
      "saas"
    ],
    "identityScopes": [
      "human",
      "nhi"
    ],
    "availability": "generally_available",
    "availabilityNote": "Product page observed 2026-11-17. Supported non-Okta sources and editions not verified.",
    "officialUrl": "https://www.okta.com/products/identity-security-posture-management/",
    "useCaseIds": []
  },
  {
    "id": "entra-identity-secure-score",
    "slug": "entra-identity-secure-score",
    "vendorId": "microsoft",
    "name": "Microsoft Entra Identity Secure Score",
    "positioning": "A score and recommendations measuring an Entra tenant's alignment with Microsoft's identity security recommendations.",
    "primaryCategoryIds": [
      "ispm"
    ],
    "adjacentCategoryIds": [
      "workforce-identity"
    ],
    "deployment": [
      "saas"
    ],
    "identityScopes": [
      "human"
    ],
    "availability": "generally_available",
    "availabilityNote": "Documented as available to free and paid customers; some recommendations need a paid license (doc dated 2026-02-09).",
    "officialUrl": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-identity-secure-score",
    "useCaseIds": []
  },
  {
    "id": "spire",
    "slug": "spire",
    "vendorId": "spiffe-project",
    "name": "SPIRE",
    "positioning": "Open-source SPIFFE implementation that attests nodes and workloads and issues short-lived SVIDs.",
    "primaryCategoryIds": [
      "wim"
    ],
    "adjacentCategoryIds": [
      "nhi"
    ],
    "deployment": [
      "open_source",
      "self_hosted"
    ],
    "identityScopes": [
      "nhi"
    ],
    "availability": "generally_available",
    "availabilityNote": "Project documentation observed 2026-11-17. Self-run; no vendor support implied.",
    "officialUrl": "https://spiffe.io/docs/latest/spire-about/spire-concepts/",
    "useCaseIds": []
  },
  {
    "id": "aws-iam-roles-anywhere",
    "slug": "aws-iam-roles-anywhere",
    "vendorId": "amazon-web-services",
    "name": "AWS IAM Roles Anywhere",
    "positioning": "Temporary IAM credentials for workloads outside AWS, authenticated with X.509 certificates from the customer's CA.",
    "primaryCategoryIds": [
      "wim"
    ],
    "adjacentCategoryIds": [
      "nhi",
      "secrets-management"
    ],
    "deployment": [
      "cloud_native"
    ],
    "identityScopes": [
      "nhi"
    ],
    "availability": "generally_available",
    "availabilityNote": "Documented in the AWS user guide observed 2026-11-17.",
    "officialUrl": "https://docs.aws.amazon.com/rolesanywhere/latest/userguide/introduction.html",
    "useCaseIds": []
  },
  {
    "id": "riptides-platform",
    "slug": "riptides-platform",
    "vendorId": "riptides",
    "name": "Riptides workload and agent identity",
    "positioning": "Kernel-level SPIFFE-based workload identity, secretless credentials and mTLS, with controls for AI agents.",
    "primaryCategoryIds": [
      "wim"
    ],
    "adjacentCategoryIds": [
      "agent-identity",
      "nhi"
    ],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "nhi",
      "agent"
    ],
    "availability": "generally_available",
    "availabilityNote": "Homepage observed 2026-11-17. Editions and deployment not verified.",
    "officialUrl": "https://riptides.io/",
    "useCaseIds": []
  },
  {
    "id": "authmind-platform",
    "slug": "authmind-platform",
    "vendorId": "authmind",
    "name": "AuthMind identity observability",
    "positioning": "Correlates access-path activity of human, non-human and AI agent identities across environments.",
    "primaryCategoryIds": [
      "ispm",
      "itdr"
    ],
    "adjacentCategoryIds": [
      "nhi",
      "agent-identity"
    ],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "human",
      "nhi",
      "agent"
    ],
    "availability": "generally_available",
    "availabilityNote": "Homepage observed 2026-11-17. Editions and deployment not verified.",
    "officialUrl": "https://www.authmind.com/",
    "useCaseIds": []
  },
  {
    "id": "orchid-platform",
    "slug": "orchid-platform",
    "vendorId": "orchid-security",
    "name": "Orchid identity platform",
    "positioning": "Discovers unmanaged apps and hidden authentication flows and tracks application identity posture.",
    "primaryCategoryIds": [
      "ispm"
    ],
    "adjacentCategoryIds": [
      "iga",
      "identity-orchestration"
    ],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "human",
      "nhi"
    ],
    "availability": "generally_available",
    "availabilityNote": "Homepage observed 2026-11-17. Editions and deployment not verified.",
    "officialUrl": "https://www.orchid.security/",
    "useCaseIds": []
  },
  {
    "id": "push-browser-security",
    "slug": "push-browser-security",
    "vendorId": "push-security",
    "name": "Push browser security",
    "positioning": "Browser-based visibility into logins, authentication methods and shadow apps, with in-browser guardrails.",
    "primaryCategoryIds": [
      "enterprise-browser"
    ],
    "adjacentCategoryIds": [
      "ispm",
      "itdr"
    ],
    "deployment": [
      "saas"
    ],
    "identityScopes": [
      "human"
    ],
    "availability": "generally_available",
    "availabilityNote": "Homepage observed 2026-11-17. Browser and device coverage not verified.",
    "officialUrl": "https://pushsecurity.com/",
    "useCaseIds": []
  },
  {
    "id": "gcp-workload-identity-federation",
    "slug": "gcp-workload-identity-federation",
    "vendorId": "google",
    "name": "Google Cloud Workload Identity Federation",
    "positioning": "Lets workloads outside Google Cloud reach Google Cloud resources with federated identities instead of service account keys.",
    "primaryCategoryIds": [
      "wim"
    ],
    "adjacentCategoryIds": [
      "nhi"
    ],
    "deployment": [
      "cloud_native"
    ],
    "identityScopes": [
      "nhi"
    ],
    "availability": "generally_available",
    "availabilityNote": "Documented on Google Cloud IAM docs observed 2026-11-17.",
    "officialUrl": "https://docs.cloud.google.com/iam/docs/workload-identity-federation",
    "useCaseIds": []
  },
  {
    "id": "defakto-platform",
    "slug": "defakto-platform",
    "vendorId": "defakto",
    "name": "Defakto non-human IAM platform",
    "positioning": "SPIFFE-based short-lived identities for workloads, CI/CD jobs, machines and AI agents, replacing stored secrets.",
    "primaryCategoryIds": [
      "wim"
    ],
    "adjacentCategoryIds": [
      "nhi",
      "agent-identity"
    ],
    "deployment": [
      "saas",
      "self_hosted",
      "hybrid"
    ],
    "identityScopes": [
      "nhi",
      "agent"
    ],
    "availability": "generally_available",
    "availabilityNote": "Homepage observed 2026-11-17 says cloud, on-premises or hybrid deployment. Editions not verified.",
    "officialUrl": "https://www.defakto.security/",
    "useCaseIds": []
  },
  {
    "id": "teleport-machine-workload-identity",
    "slug": "teleport-machine-workload-identity",
    "vendorId": "teleport",
    "name": "Teleport Machine & Workload Identity",
    "positioning": "Short-lived certificates, automatically issued and renewed, in place of static secrets for machines and workloads.",
    "primaryCategoryIds": [
      "wim"
    ],
    "adjacentCategoryIds": [
      "nhi",
      "pam"
    ],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "nhi"
    ],
    "availability": "generally_available",
    "availabilityNote": "Documentation observed 2026-11-17. Editions and licensing not verified.",
    "officialUrl": "https://goteleport.com/docs/machine-workload-identity/",
    "useCaseIds": []
  },
  {
    "id": "silverfort-ispm",
    "slug": "silverfort-ispm",
    "vendorId": "silverfort",
    "name": "Silverfort Identity Security Posture Management",
    "positioning": "Discovery and mitigation of identity weaknesses across hybrid environments, including AD, cloud IdPs and legacy authentication.",
    "primaryCategoryIds": [
      "ispm"
    ],
    "adjacentCategoryIds": [
      "itdr"
    ],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "human",
      "nhi"
    ],
    "availability": "generally_available",
    "availabilityNote": "Product page observed 2026-11-17. Editions and deployment not verified.",
    "officialUrl": "https://www.silverfort.com/platform/identity-security-posture-management/",
    "useCaseIds": []
  }
];

export const ispmWimSources: Source[] = [
  {
    "id": "src-ispm-okta",
    "title": "Okta \u2014 Identity Security Posture Management",
    "url": "https://www.okta.com/products/identity-security-posture-management/",
    "canonicalUrl": "https://www.okta.com/products/identity-security-posture-management/",
    "publisher": "Okta",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-11-17",
    "volatility": "fast",
    "excerpt": "Okta's ISPM page says it continuously scans the identity graph to detect access points without MFA, identifies shadow admin accounts, and monitors non-MFA access, local accounts, and offboarded employees and contractors with access."
  },
  {
    "id": "src-ispm-entra-secure-score",
    "title": "What is the Identity Secure Score? \u2014 Microsoft Entra ID",
    "url": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-identity-secure-score",
    "canonicalUrl": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-identity-secure-score",
    "publisher": "Microsoft",
    "sourceType": "official_docs",
    "publishedAt": "2026-02-09",
    "retrievedAt": "2026-11-17",
    "volatility": "moderate",
    "excerpt": "Microsoft documents the Identity Secure Score as a percentage indicating alignment with its security recommendations, available to free and paid customers, with recommendations such as removing dormant accounts from sensitive groups and requiring MFA for administrative roles."
  },
  {
    "id": "src-ispm-veza",
    "title": "Veza \u2014 homepage",
    "url": "https://veza.com/",
    "canonicalUrl": "https://veza.com/",
    "publisher": "Veza",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-11-17",
    "volatility": "fast",
    "excerpt": "Veza's homepage lists Identity Security Posture Management among its offerings and says it maps users, groups, roles, policies, permissions and resources to uncover dormant accounts, excessive privileges, access drift, non-human and third-party access."
  },
  {
    "id": "src-ispm-crowdstrike",
    "title": "CrowdStrike \u2014 Next-gen identity security",
    "url": "https://www.crowdstrike.com/en-us/platform/next-gen-identity-security/",
    "canonicalUrl": "https://www.crowdstrike.com/en-us/platform/next-gen-identity-security/",
    "publisher": "CrowdStrike",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-11-17",
    "volatility": "fast",
    "excerpt": "CrowdStrike's identity security page says it discovers, correlates and enriches human, non-human and AI identities and exposes overprivileged access, misconfigurations and attack paths, and refers to proactive posture management."
  },
  {
    "id": "src-ispm-semperis",
    "title": "Semperis \u2014 homepage",
    "url": "https://www.semperis.com/",
    "canonicalUrl": "https://www.semperis.com/",
    "publisher": "Semperis",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-11-17",
    "volatility": "fast",
    "excerpt": "Semperis's homepage describes continuous monitoring with constantly updated indicators and finding and fixing vulnerabilities in human and non-human identities, alongside Active Directory recovery."
  },
  {
    "id": "src-ispm-authmind",
    "title": "AuthMind \u2014 homepage",
    "url": "https://www.authmind.com/",
    "canonicalUrl": "https://www.authmind.com/",
    "publisher": "AuthMind",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-11-17",
    "volatility": "fast",
    "excerpt": "AuthMind describes identity observability that continuously correlates access-path activity of AI agent, non-human and human identities across cloud, SaaS and on-premises environments, and lists preventing privileged access and MFA bypass."
  },
  {
    "id": "src-ispm-orchid",
    "title": "Orchid Security \u2014 homepage",
    "url": "https://www.orchid.security/",
    "canonicalUrl": "https://www.orchid.security/",
    "publisher": "Orchid Security",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-11-17",
    "volatility": "fast",
    "excerpt": "Orchid says it uncovers unmanaged apps, hidden authentication flows and ungoverned access, analyzes authentication and authorization flows, and maintains consistent posture across self-hosted and SaaS applications."
  },
  {
    "id": "src-ispm-push",
    "title": "Push Security \u2014 homepage",
    "url": "https://pushsecurity.com/",
    "canonicalUrl": "https://pushsecurity.com/",
    "publisher": "Push Security",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-11-17",
    "volatility": "fast",
    "excerpt": "Push says it shows how users actually log in, including every account, authentication method and shadow app, and uses in-browser guardrails to guide employees to register MFA, change weak passwords and adopt SSO."
  },
  {
    "id": "src-wim-spiffe-overview",
    "title": "SPIFFE overview",
    "url": "https://spiffe.io/docs/latest/spiffe-about/overview/",
    "canonicalUrl": "https://spiffe.io/docs/latest/spiffe-about/overview/",
    "publisher": "SPIFFE project (CNCF)",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-11-17",
    "volatility": "moderate",
    "excerpt": "SPIFFE is described as open-source standards for securely identifying software systems; its core specification defines short-lived cryptographic identity documents (SVIDs) issued through an API. The page also lists software that implements SPIFFE."
  },
  {
    "id": "src-wim-spire-concepts",
    "title": "SPIRE concepts",
    "url": "https://spiffe.io/docs/latest/spire-about/spire-concepts/",
    "canonicalUrl": "https://spiffe.io/docs/latest/spire-about/spire-concepts/",
    "publisher": "SPIFFE project (CNCF)",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-11-17",
    "volatility": "moderate",
    "excerpt": "SPIRE is described as a production-ready implementation of the SPIFFE APIs that performs node and workload attestation to issue SVIDs to workloads and verify the SVIDs of other workloads."
  },
  {
    "id": "src-wim-aws-roles-anywhere",
    "title": "What is AWS IAM Roles Anywhere?",
    "url": "https://docs.aws.amazon.com/rolesanywhere/latest/userguide/introduction.html",
    "canonicalUrl": "https://docs.aws.amazon.com/rolesanywhere/latest/userguide/introduction.html",
    "publisher": "Amazon Web Services",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-11-17",
    "volatility": "moderate",
    "excerpt": "AWS documents IAM Roles Anywhere as a way to obtain temporary IAM credentials for workloads such as servers, containers and applications running outside AWS, authenticating with X.509 certificates against a configured trust anchor."
  },
  {
    "id": "src-wim-riptides",
    "title": "Riptides \u2014 homepage",
    "url": "https://riptides.io/",
    "canonicalUrl": "https://riptides.io/",
    "publisher": "Riptides",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-11-17",
    "volatility": "fast",
    "excerpt": "Riptides describes kernel-level, SPIFFE-based workload identity, secretless credentials, automatic mTLS and per-agent egress control, and says it replaces static secrets with short-lived, attested identities."
  },
  {
    "id": "src-wim-corsha",
    "title": "Corsha \u2014 homepage",
    "url": "https://corsha.com/",
    "canonicalUrl": "https://corsha.com/",
    "publisher": "Corsha",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-11-17",
    "volatility": "fast",
    "excerpt": "Corsha describes itself as an identity provider for machines and an industrial identity security platform that gives every machine a verifiable identity and applies identity-based policies at the connection level."
  },
  {
    "id": "src-wim-gcp-wif",
    "title": "Workload Identity Federation \u2014 Google Cloud IAM",
    "url": "https://docs.cloud.google.com/iam/docs/workload-identity-federation",
    "canonicalUrl": "https://docs.cloud.google.com/iam/docs/workload-identity-federation",
    "publisher": "Google Cloud",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-11-17",
    "volatility": "moderate",
    "excerpt": "Google documents Workload Identity Federation as granting on-premises or multicloud workloads access to Google Cloud resources with federated identities instead of service account keys, including X.509 certificates, AWS, Azure, Active Directory, GitHub, GitLab and OIDC or SAML IdPs."
  },
  {
    "id": "src-wim-defakto",
    "title": "Defakto \u2014 homepage",
    "url": "https://www.defakto.security/",
    "canonicalUrl": "https://www.defakto.security/",
    "publisher": "Defakto",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-11-17",
    "volatility": "fast",
    "excerpt": "Defakto describes a non-human IAM platform built on SPIFFE and other open protocols that replaces secrets and standing access with short-lived, verified identities issued and revoked on demand, deployable in cloud, on-premises or hybrid environments."
  },
  {
    "id": "src-wim-teleport-mwi",
    "title": "Teleport Machine & Workload Identity \u2014 documentation",
    "url": "https://goteleport.com/docs/machine-workload-identity/",
    "canonicalUrl": "https://goteleport.com/docs/machine-workload-identity/",
    "publisher": "Teleport",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-11-17",
    "volatility": "moderate",
    "excerpt": "Teleport documents Machine & Workload Identity as replacing static secrets with short-lived certificates that are automatically issued and renewed for non-human identities, with use cases including CI/CD pipelines and workload-to-workload authentication."
  },
  {
    "id": "src-ispm-silverfort",
    "title": "Silverfort \u2014 Identity Security Posture Management",
    "url": "https://www.silverfort.com/platform/identity-security-posture-management/",
    "canonicalUrl": "https://www.silverfort.com/platform/identity-security-posture-management/",
    "publisher": "Silverfort",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-11-17",
    "volatility": "fast",
    "excerpt": "Silverfort's ISPM page says it automates discovery and mitigation of weaknesses that expose hybrid environments to identity threats, including misconfigurations in AD, cloud IdPs and legacy authentication modes, excessive privileges, stale credentials and shadow admins."
  },
  {
    "id": "src-wim-vault-k8s-auth",
    "title": "Kubernetes auth method \u2014 Vault",
    "url": "https://developer.hashicorp.com/vault/docs/auth/kubernetes",
    "canonicalUrl": "https://developer.hashicorp.com/vault/docs/auth/kubernetes",
    "publisher": "HashiCorp",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-11-17",
    "volatility": "moderate",
    "excerpt": "HashiCorp documents a Kubernetes auth method that lets workloads authenticate to Vault using a Kubernetes service account token, and notes the token can also be used through JWT auth."
  },
  {
    "id": "src-wim-vault-spiffe-auth",
    "title": "SPIFFE auth method overview \u2014 Vault",
    "url": "https://developer.hashicorp.com/vault/docs/auth/spiffe",
    "canonicalUrl": "https://developer.hashicorp.com/vault/docs/auth/spiffe",
    "publisher": "HashiCorp",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-11-17",
    "volatility": "moderate",
    "excerpt": "HashiCorp documents a Vault Enterprise SPIFFE auth method that lets workloads authenticate with X.509 or JWT SPIFFE SVIDs trusted through a configured trust bundle, working the same across bare metal, VMs and multi-cloud Kubernetes. An appropriate Enterprise license is required."
  }
];

export const ispmWimClaims: Claim[] = [
  {
    "id": "claim-ispm-okta-mfa",
    "statement": "Okta's ISPM page says the product continuously scans the organization's identity graph to detect access points without MFA and identify local accounts.",
    "subjectType": "product",
    "subjectId": "okta-ispm",
    "capabilityId": "cap-ispm-mfa-coverage",
    "polarity": "asserts",
    "sourceId": "src-ispm-okta",
    "sourceUrl": "https://www.okta.com/products/identity-security-posture-management/",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-11-17",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-17",
    "conflictsWith": [],
    "notes": "Publisher-reported, not independently tested. No direct-competitor or parity claim. See docs/market-research/ispm-wim-categories-2026-11.md."
  },
  {
    "id": "claim-ispm-okta-hygiene",
    "statement": "The same Okta page says the product identifies shadow admin accounts and permissions, and monitors offboarded employees and contractors who still have access.",
    "subjectType": "product",
    "subjectId": "okta-ispm",
    "capabilityId": "cap-ispm-hygiene",
    "polarity": "asserts",
    "sourceId": "src-ispm-okta",
    "sourceUrl": "https://www.okta.com/products/identity-security-posture-management/",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-11-17",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-17",
    "conflictsWith": [],
    "notes": "Publisher-reported. Which IdPs and SaaS apps are connected is not stated in the passage. Customer quotations on the page are not adopted."
  },
  {
    "id": "claim-ispm-entra-score",
    "statement": "Microsoft documents the Identity Secure Score as a percentage showing alignment with Microsoft's security recommendations for an Entra tenant, available to free and paid customers; some recommendations need a paid license.",
    "subjectType": "product",
    "subjectId": "entra-identity-secure-score",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-ispm-entra-secure-score",
    "sourceUrl": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-identity-secure-score",
    "sourceType": "official_docs",
    "publishedAt": "2026-02-09",
    "observedAt": "2026-11-17",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "high",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-17",
    "conflictsWith": [],
    "notes": "Official documentation. Scope is the Entra tenant; it does not claim posture across other IdPs."
  },
  {
    "id": "claim-ispm-entra-dormant",
    "statement": "Microsoft lists 'Remove dormant accounts from sensitive groups' among the recommendations included in the Identity Secure Score.",
    "subjectType": "product",
    "subjectId": "entra-identity-secure-score",
    "capabilityId": "cap-ispm-hygiene",
    "polarity": "asserts",
    "sourceId": "src-ispm-entra-secure-score",
    "sourceUrl": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-identity-secure-score",
    "sourceType": "official_docs",
    "publishedAt": "2026-02-09",
    "observedAt": "2026-11-17",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "high",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-17",
    "conflictsWith": [],
    "notes": "Official documentation. The dormant-account recommendation relates to sensitive groups; licensing for each recommendation varies."
  },
  {
    "id": "claim-ispm-entra-mfa",
    "statement": "Microsoft lists 'Require multifactor authentication (MFA) for administrative roles' among the Identity Secure Score recommendations.",
    "subjectType": "product",
    "subjectId": "entra-identity-secure-score",
    "capabilityId": "cap-ispm-mfa-coverage",
    "polarity": "asserts",
    "sourceId": "src-ispm-entra-secure-score",
    "sourceUrl": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-identity-secure-score",
    "sourceType": "official_docs",
    "publishedAt": "2026-02-09",
    "observedAt": "2026-11-17",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "high",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-17",
    "conflictsWith": [],
    "notes": "Official documentation. A recommendation on admin roles, not a per-account MFA coverage report across all users."
  },
  {
    "id": "claim-ispm-entra-config",
    "statement": "Microsoft lists recommendations to edit misconfigured certificate templates among the Identity Secure Score recommendations.",
    "subjectType": "product",
    "subjectId": "entra-identity-secure-score",
    "capabilityId": "cap-ispm-config",
    "polarity": "asserts",
    "sourceId": "src-ispm-entra-secure-score",
    "sourceUrl": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-identity-secure-score",
    "sourceType": "official_docs",
    "publishedAt": "2026-02-09",
    "observedAt": "2026-11-17",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "high",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-17",
    "conflictsWith": [],
    "notes": "Official documentation. Certificate-template recommendations may depend on connected on-premises components; not checked."
  },
  {
    "id": "claim-ispm-veza-hygiene",
    "statement": "Veza's homepage lists Identity Security Posture Management among its offerings and says it uncovers dormant accounts, excessive privileges, access drift, and non-human and third-party access.",
    "subjectType": "product",
    "subjectId": "veza",
    "capabilityId": "cap-ispm-hygiene",
    "polarity": "asserts",
    "sourceId": "src-ispm-veza",
    "sourceUrl": "https://veza.com/",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-11-17",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-17",
    "conflictsWith": [],
    "notes": "Publisher-reported, not independently tested. No direct-competitor or parity claim. See docs/market-research/ispm-wim-categories-2026-11.md."
  },
  {
    "id": "claim-ispm-crowdstrike-correlate",
    "statement": "CrowdStrike's identity security page says it discovers, correlates and enriches human, non-human and AI identities and exposes overprivileged access, misconfigurations and attack paths.",
    "subjectType": "product",
    "subjectId": "crowdstrike-identity",
    "capabilityId": "cap-ispm-correlation",
    "polarity": "asserts",
    "sourceId": "src-ispm-crowdstrike",
    "sourceUrl": "https://www.crowdstrike.com/en-us/platform/next-gen-identity-security/",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-11-17",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-17",
    "conflictsWith": [],
    "notes": "Publisher-reported. The SKU that delivers this is not named in the passage; the product record's SKU name remains unconfirmed."
  },
  {
    "id": "claim-ispm-semperis",
    "statement": "Semperis's homepage describes continuous monitoring with constantly updated indicators and finding and fixing vulnerabilities in human and non-human identities.",
    "subjectType": "vendor",
    "subjectId": "semperis",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-ispm-semperis",
    "sourceUrl": "https://www.semperis.com/",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-11-17",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-17",
    "conflictsWith": [],
    "notes": "Publisher-reported, not independently tested. No direct-competitor or parity claim. See docs/market-research/ispm-wim-categories-2026-11.md."
  },
  {
    "id": "claim-ispm-authmind",
    "statement": "AuthMind says it continuously correlates the access-path activity of AI agent, non-human and human identities across cloud, SaaS and on-premises environments.",
    "subjectType": "product",
    "subjectId": "authmind-platform",
    "capabilityId": "cap-ispm-correlation",
    "polarity": "asserts",
    "sourceId": "src-ispm-authmind",
    "sourceUrl": "https://www.authmind.com/",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-11-17",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-17",
    "conflictsWith": [],
    "notes": "Publisher-reported, not independently tested. No direct-competitor or parity claim. See docs/market-research/ispm-wim-categories-2026-11.md."
  },
  {
    "id": "claim-ispm-orchid",
    "statement": "Orchid Security says it uncovers unmanaged apps, hidden authentication flows and ungoverned access, and maintains consistent posture across self-hosted and SaaS applications.",
    "subjectType": "product",
    "subjectId": "orchid-platform",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-ispm-orchid",
    "sourceUrl": "https://www.orchid.security/",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-11-17",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-17",
    "conflictsWith": [],
    "notes": "Publisher-reported, not independently tested. No direct-competitor or parity claim. See docs/market-research/ispm-wim-categories-2026-11.md."
  },
  {
    "id": "claim-ispm-push",
    "statement": "Push Security says it shows every account, authentication method and shadow app users log in with, and guides employees in the browser to register MFA, change weak passwords and adopt SSO.",
    "subjectType": "product",
    "subjectId": "push-browser-security",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-ispm-push",
    "sourceUrl": "https://pushsecurity.com/",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-11-17",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-17",
    "conflictsWith": [],
    "notes": "Publisher-reported. Coverage is what the browser observes, not an IdP configuration scan."
  },
  {
    "id": "claim-wim-spiffe-def",
    "statement": "The SPIFFE project describes SPIFFE as a set of open-source specifications for bootstrapping and issuing identity to services across heterogeneous environments, centered on short-lived cryptographic identity documents (SVIDs).",
    "subjectType": "product",
    "subjectId": "spire",
    "capabilityId": "cap-wim-short-lived-identity",
    "polarity": "asserts",
    "sourceId": "src-wim-spiffe-overview",
    "sourceUrl": "https://spiffe.io/docs/latest/spiffe-about/overview/",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-11-17",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "high",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-17",
    "conflictsWith": [],
    "notes": "Project documentation for the specification. SPIRE is the reference implementation; the spec itself is not a product."
  },
  {
    "id": "claim-wim-spire-attest",
    "statement": "The SPIFFE project documents SPIRE as an implementation of the SPIFFE APIs that performs node and workload attestation to issue SVIDs to workloads and verify other workloads' SVIDs.",
    "subjectType": "product",
    "subjectId": "spire",
    "capabilityId": "cap-wim-attestation",
    "polarity": "asserts",
    "sourceId": "src-wim-spire-concepts",
    "sourceUrl": "https://spiffe.io/docs/latest/spire-about/spire-concepts/",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-11-17",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "high",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-17",
    "conflictsWith": [],
    "notes": "Project documentation. Operating SPIRE (servers, agents, datastore) is the customer's responsibility."
  },
  {
    "id": "claim-wim-spiffe-defakto",
    "statement": "The SPIFFE overview page lists Defakto among software that implements SPIFFE, with SVID issuance, attestation-based issuance, the Workload API and federation marked.",
    "subjectType": "vendor",
    "subjectId": "defakto",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-wim-spiffe-overview",
    "sourceUrl": "https://spiffe.io/docs/latest/spiffe-about/overview/",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-11-17",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-17",
    "conflictsWith": [],
    "notes": "Listing on the project page, likely submitted by implementers. Not a capability cell. See claim-wim-defakto for the vendor's own description."
  },
  {
    "id": "claim-wim-spiffe-teleport",
    "statement": "The SPIFFE overview page lists Teleport among software that implements SPIFFE.",
    "subjectType": "vendor",
    "subjectId": "teleport",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-wim-spiffe-overview",
    "sourceUrl": "https://spiffe.io/docs/latest/spiffe-about/overview/",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-11-17",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-17",
    "conflictsWith": [],
    "notes": "Listing on the project page. Not a capability cell. See claim-wim-teleport-mwi for Teleport's own documentation."
  },
  {
    "id": "claim-wim-aws-ra",
    "statement": "AWS documents IAM Roles Anywhere as a way for workloads running outside AWS to obtain temporary IAM credentials, authenticating with X.509 certificates issued by the customer's certificate authority.",
    "subjectType": "product",
    "subjectId": "aws-iam-roles-anywhere",
    "capabilityId": "cap-wim-short-lived-identity",
    "polarity": "asserts",
    "sourceId": "src-wim-aws-roles-anywhere",
    "sourceUrl": "https://docs.aws.amazon.com/rolesanywhere/latest/userguide/introduction.html",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-11-17",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "high",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-17",
    "conflictsWith": [],
    "notes": "Official documentation. Requires a customer CA and trust anchor; scope is AWS targets only."
  },
  {
    "id": "claim-wim-riptides",
    "statement": "Riptides says it replaces static secrets with short-lived, attested identities and provides SPIFFE-compatible workload identities without operating SPIRE servers.",
    "subjectType": "product",
    "subjectId": "riptides-platform",
    "capabilityId": "cap-wim-short-lived-identity",
    "polarity": "asserts",
    "sourceId": "src-wim-riptides",
    "sourceUrl": "https://riptides.io/",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-11-17",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-17",
    "conflictsWith": [],
    "notes": "Publisher-reported. Kernel-level enforcement and supported platforms are not checked."
  },
  {
    "id": "claim-wim-corsha",
    "statement": "Corsha describes itself as an identity provider for machines that gives every machine a verifiable identity and applies identity-based policies at the connection level, with an industrial and OT focus.",
    "subjectType": "vendor",
    "subjectId": "corsha",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-wim-corsha",
    "sourceUrl": "https://corsha.com/",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-11-17",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-17",
    "conflictsWith": [],
    "notes": "Publisher-reported, not independently tested. No direct-competitor or parity claim. See docs/market-research/ispm-wim-categories-2026-11.md."
  },
  {
    "id": "claim-wim-gcp-wif",
    "statement": "Google documents Workload Identity Federation as letting on-premises or multicloud workloads access Google Cloud resources with federated identities instead of service account keys, including X.509 certificates, AWS, Azure, Active Directory, GitHub, GitLab and OIDC or SAML identity providers.",
    "subjectType": "product",
    "subjectId": "gcp-workload-identity-federation",
    "capabilityId": "cap-workload-federation",
    "polarity": "asserts",
    "sourceId": "src-wim-gcp-wif",
    "sourceUrl": "https://docs.cloud.google.com/iam/docs/workload-identity-federation",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-11-17",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "high",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-17",
    "conflictsWith": [],
    "notes": "Official documentation. Targets are Google Cloud resources only."
  },
  {
    "id": "claim-wim-defakto",
    "statement": "Defakto says its platform, built on SPIFFE and other open protocols, replaces secrets and standing access with short-lived, verified identities issued and revoked on demand for workloads, CI/CD jobs, machines and AI agents.",
    "subjectType": "product",
    "subjectId": "defakto-platform",
    "capabilityId": "cap-wim-short-lived-identity",
    "polarity": "asserts",
    "sourceId": "src-wim-defakto",
    "sourceUrl": "https://www.defakto.security/",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-11-17",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-17",
    "conflictsWith": [],
    "notes": "Publisher-reported, not independently tested. No direct-competitor or parity claim. See docs/market-research/ispm-wim-categories-2026-11.md."
  },
  {
    "id": "claim-wim-teleport-mwi",
    "statement": "Teleport documents Machine & Workload Identity as replacing static secrets with short-lived certificates that are automatically issued and renewed for non-human identities, including CI/CD pipelines and workload-to-workload authentication.",
    "subjectType": "product",
    "subjectId": "teleport-machine-workload-identity",
    "capabilityId": "cap-wim-short-lived-identity",
    "polarity": "asserts",
    "sourceId": "src-wim-teleport-mwi",
    "sourceUrl": "https://goteleport.com/docs/machine-workload-identity/",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-11-17",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "high",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-17",
    "conflictsWith": [],
    "notes": "Vendor documentation. Supported targets and editions not checked."
  },
  {
    "id": "claim-ispm-silverfort",
    "statement": "Silverfort's ISPM page says it uncovers and helps mitigate weaknesses that expose hybrid environments to identity threats, including misconfigurations in AD, cloud IdPs and legacy authentication modes.",
    "subjectType": "product",
    "subjectId": "silverfort-ispm",
    "capabilityId": "cap-ispm-config",
    "polarity": "asserts",
    "sourceId": "src-ispm-silverfort",
    "sourceUrl": "https://www.silverfort.com/platform/identity-security-posture-management/",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-11-17",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-17",
    "conflictsWith": [],
    "notes": "Publisher-reported, not independently tested. No direct-competitor or parity claim. See docs/market-research/ispm-wim-categories-2026-11.md."
  },
  {
    "id": "claim-ispm-silverfort-hygiene",
    "statement": "The same Silverfort page names excessive privileges, stale credentials, unconstrained delegation and shadow admins as identity weaknesses it addresses.",
    "subjectType": "product",
    "subjectId": "silverfort-ispm",
    "capabilityId": "cap-ispm-hygiene",
    "polarity": "asserts",
    "sourceId": "src-ispm-silverfort",
    "sourceUrl": "https://www.silverfort.com/platform/identity-security-posture-management/",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-11-17",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-17",
    "conflictsWith": [],
    "notes": "Publisher-reported, not independently tested. No direct-competitor or parity claim. See docs/market-research/ispm-wim-categories-2026-11.md. The page frames these as weaknesses attackers chain; it does not say each is auto-remediated."
  },
  {
    "id": "claim-wim-vault-k8s-auth",
    "statement": "HashiCorp documents a Vault Kubernetes auth method that authenticates workloads with a Kubernetes service account token, so a pod can obtain Vault access without a pre-shared Vault credential.",
    "subjectType": "product",
    "subjectId": "vault",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-wim-vault-k8s-auth",
    "sourceUrl": "https://developer.hashicorp.com/vault/docs/auth/kubernetes",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-11-17",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "high",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-17",
    "conflictsWith": [],
    "notes": "Official documentation. This is how a workload reaches Vault; the secrets Vault then returns may still be static or dynamic. Vault remains a secrets manager that complements WIM, not a WIM product."
  },
  {
    "id": "claim-wim-vault-spiffe-auth",
    "statement": "HashiCorp documents a SPIFFE auth method that lets workloads authenticate to Vault with X.509 or JWT SVIDs; the page states an appropriate Vault Enterprise license is required.",
    "subjectType": "product",
    "subjectId": "vault",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-wim-vault-spiffe-auth",
    "sourceUrl": "https://developer.hashicorp.com/vault/docs/auth/spiffe",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-11-17",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "high",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-11-17",
    "conflictsWith": [],
    "notes": "Official documentation. Enterprise-only per the page; the version that introduced it was not confirmed. Shows Vault accepting identities issued by a WIM layer; it does not issue SVIDs itself."
  }
];
