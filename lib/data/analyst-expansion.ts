import type { Claim, Product, Source, Vendor } from "../schema";

// Analyst-informed discovery; product statements retain their original publisher provenance.
// See docs/market-research/analyst-dspm-secrets-expansion.md for access and review limits.

export const expandedVendors: Vendor[] = [
  {
    "id": "arexdata",
    "slug": "arexdata",
    "name": "Arexdata",
    "formerNames": [],
    "website": "https://www.arexdata.com/en/",
    "positioning": "Arexdata markets DSPM for centralized data, access and permissions visibility across local and cloud repositories.",
    "primaryCategoryIds": [
      "dspm"
    ],
    "adjacentCategoryIds": [],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Validate connectors, deployment and enforcement scope; the fetched English URL serves Spanish content.",
      "Which edition, deployment, connectors, costs and remediation approval controls fit the buyer's environment?"
    ]
  },
  {
    "id": "avepoint",
    "slug": "avepoint",
    "name": "AvePoint",
    "formerNames": [],
    "website": "https://www.avepoint.com/solutions/security-posture-management",
    "positioning": "AvePoint markets DSPM with sensitive-data discovery, access visibility and governance across its platform.",
    "primaryCategoryIds": [
      "dspm"
    ],
    "adjacentCategoryIds": [],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Confirm which Confidence Platform components and licenses implement the required controls.",
      "Which edition, deployment, connectors, costs and remediation approval controls fit the buyer's environment?"
    ]
  },
  {
    "id": "dece-software",
    "slug": "dece-software",
    "name": "DECE Software",
    "formerNames": [],
    "website": "https://www.decesoftware.com/about-us",
    "positioning": "DECE Software identifies GEODI DSPM as its platform for sensitive-data visibility across cloud, on-premises and collaboration sources.",
    "primaryCategoryIds": [
      "dspm"
    ],
    "adjacentCategoryIds": [],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "GEODI is the product; DECE Software is the vendor. Connector depth and enforcement are untested.",
      "Which edition, deployment, connectors, costs and remediation approval controls fit the buyer's environment?"
    ]
  },
  {
    "id": "thales",
    "slug": "thales",
    "name": "Thales",
    "formerNames": [],
    "website": "https://cpl.thalesgroup.com/encryption/data-security-posture-management",
    "positioning": "Thales markets CipherTrust DSPM with discovery, data-risk analytics and integrated data-protection workflows.",
    "primaryCategoryIds": [
      "dspm"
    ],
    "adjacentCategoryIds": [],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Do not adopt the vendor's competitive comparison table as independently established feature parity.",
      "Which edition, deployment, connectors, costs and remediation approval controls fit the buyer's environment?"
    ]
  },
  {
    "id": "bitwarden",
    "slug": "bitwarden",
    "name": "Bitwarden",
    "formerNames": [],
    "website": "https://bitwarden.com/help/secrets-manager-overview/",
    "positioning": "Bitwarden documents Secrets Manager with machine accounts, access tokens, CLI/SDK access and secret injection.",
    "primaryCategoryIds": [
      "secrets-management"
    ],
    "adjacentCategoryIds": [],
    "identityScopes": [
      "nhi"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Separate evaluation from its human password manager; rotation and dynamic issuance coverage remain unknown here.",
      "Which edition, deployment, connectors, costs and remediation approval controls fit the buyer's environment?"
    ]
  },
  {
    "id": "1password",
    "slug": "1password",
    "name": "1Password",
    "formerNames": [],
    "website": "https://www.1password.dev/secrets-automation",
    "positioning": "1Password documents Secrets Automation through service accounts or Connect servers.",
    "primaryCategoryIds": [
      "secrets-management"
    ],
    "adjacentCategoryIds": [],
    "identityScopes": [
      "nhi"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Service-account and Connect architectures have different rate limits and infrastructure requirements. A self-hosted Connect server does not imply the whole vault service is self-hosted.",
      "Which edition, deployment, connectors, costs and remediation approval controls fit the buyer's environment?"
    ]
  },
  {
    "id": "keeper",
    "slug": "keeper",
    "name": "Keeper Security",
    "formerNames": [],
    "website": "https://docs.keeper.io/keeperpam/secrets-manager/overview",
    "positioning": "Keeper documents Secrets Manager as a KeeperPAM component for infrastructure secrets and application or CI/CD access.",
    "primaryCategoryIds": [
      "secrets-management"
    ],
    "adjacentCategoryIds": [],
    "identityScopes": [
      "nhi"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Validate target-specific rotation and packaging. Vendor superiority and certification statements are not adopted.",
      "Which edition, deployment, connectors, costs and remediation approval controls fit the buyer's environment?"
    ]
  }
];

export const expandedProducts: Product[] = [
  {
    "id": "arexdata-dspm",
    "slug": "arexdata-dspm",
    "vendorId": "arexdata",
    "name": "Arexdata DSPM",
    "positioning": "Arexdata markets DSPM for centralized data, access and permissions visibility across local and cloud repositories.",
    "primaryCategoryIds": [
      "dspm"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Validate connectors, deployment and enforcement scope; the fetched English URL serves Spanish content.",
    "officialUrl": "https://www.arexdata.com/en/",
    "useCaseIds": []
  },
  {
    "id": "avepoint-dspm",
    "slug": "avepoint-dspm",
    "vendorId": "avepoint",
    "name": "AvePoint DSPM",
    "positioning": "AvePoint markets DSPM with sensitive-data discovery, access visibility and governance across its platform.",
    "primaryCategoryIds": [
      "dspm"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Confirm which Confidence Platform components and licenses implement the required controls.",
    "officialUrl": "https://www.avepoint.com/solutions/security-posture-management",
    "useCaseIds": []
  },
  {
    "id": "geodi-dspm",
    "slug": "geodi-dspm",
    "vendorId": "dece-software",
    "name": "GEODI DSPM",
    "positioning": "DECE Software identifies GEODI DSPM as its platform for sensitive-data visibility across cloud, on-premises and collaboration sources.",
    "primaryCategoryIds": [
      "dspm"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "GEODI is the product; DECE Software is the vendor. Connector depth and enforcement are untested.",
    "officialUrl": "https://www.decesoftware.com/about-us",
    "useCaseIds": []
  },
  {
    "id": "ciphertrust-dspm",
    "slug": "ciphertrust-dspm",
    "vendorId": "thales",
    "name": "CipherTrust DSPM",
    "positioning": "Thales markets CipherTrust DSPM with discovery, data-risk analytics and integrated data-protection workflows.",
    "primaryCategoryIds": [
      "dspm"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Do not adopt the vendor's competitive comparison table as independently established feature parity.",
    "officialUrl": "https://cpl.thalesgroup.com/encryption/data-security-posture-management",
    "useCaseIds": []
  },
  {
    "id": "proofpoint-dspm",
    "slug": "proofpoint-dspm",
    "vendorId": "proofpoint",
    "name": "Proofpoint DSPM",
    "positioning": "Proofpoint describes DSPM for discovery, classification and data-risk remediation, with Normalyze product lineage.",
    "primaryCategoryIds": [
      "dspm"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Normalyze is not counted as another independent vendor. Exact acquisition closing date is not established by this page.",
    "officialUrl": "https://www.proofpoint.com/us/normalyze-is-now-proofpoint",
    "useCaseIds": []
  },
  {
    "id": "forcepoint-dspm",
    "slug": "forcepoint-dspm",
    "vendorId": "forcepoint",
    "name": "Forcepoint DSPM",
    "positioning": "Forcepoint documents DSPM for sensitive-data discovery, classification and risk assessment.",
    "primaryCategoryIds": [
      "dspm"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "The documentation contains a testing-purpose note. Confirm production version and packaging; performance and enforcement claims are not adopted.",
    "officialUrl": "https://help.forcepoint.com/dspm/en-us/onlinehelp/guid-e9e3ca45-4e27-490c-b6ce-822b57a8eaae.html",
    "useCaseIds": []
  },
  {
    "id": "google-scc-dspm",
    "slug": "google-scc-dspm",
    "vendorId": "google",
    "name": "Google Security Command Center DSPM",
    "positioning": "Google documents Security Command Center DSPM and states that this DSPM offering will shut down on February 1, 2027.",
    "primaryCategoryIds": [
      "dspm"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "limited",
    "availabilityNote": "Lifecycle warning as observed 2026-10-13. Some controls are preview or detective-only. Review the linked alternative detection capabilities before a new purchase; no general multi-cloud parity inferred.",
    "officialUrl": "https://docs.cloud.google.com/security-command-center/docs/dspm-data-security",
    "useCaseIds": []
  },
  {
    "id": "delinea-devops-secrets-vault",
    "slug": "delinea-devops-secrets-vault",
    "vendorId": "delinea",
    "name": "Delinea DevOps Secrets Vault",
    "positioning": "Delinea documents a cloud-based DevOps vault with access controls, CLI/API access and audit logging.",
    "primaryCategoryIds": [
      "secrets-management"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "nhi"
    ],
    "availability": "unknown",
    "availabilityNote": "Separate product from Secret Server. Vaulting does not establish repository secret-scanning coverage.",
    "officialUrl": "https://docs.delinea.com/online-help/devops-secrets-vault/start.htm",
    "useCaseIds": []
  },
  {
    "id": "beyondtrust-secrets-safe",
    "slug": "beyondtrust-secrets-safe",
    "vendorId": "beyondtrust",
    "name": "BeyondTrust Password Safe — Secrets Safe",
    "positioning": "BeyondTrust describes Secrets Safe as a capability within Password Safe for DevOps credential storage and access.",
    "primaryCategoryIds": [
      "secrets-management"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "nhi"
    ],
    "availability": "unknown",
    "availabilityNote": "Platform capability rather than a separate vendor. Confirm license and rotation support; no code-scanning claim.",
    "officialUrl": "https://www.beyondtrust.com/products/password-safe/features/secrets-management",
    "useCaseIds": []
  },
  {
    "id": "bitwarden-secrets-manager",
    "slug": "bitwarden-secrets-manager",
    "vendorId": "bitwarden",
    "name": "Bitwarden Secrets Manager",
    "positioning": "Bitwarden documents Secrets Manager with machine accounts, access tokens, CLI/SDK access and secret injection.",
    "primaryCategoryIds": [
      "secrets-management"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "nhi"
    ],
    "availability": "unknown",
    "availabilityNote": "Separate evaluation from its human password manager; rotation and dynamic issuance coverage remain unknown here.",
    "officialUrl": "https://bitwarden.com/help/secrets-manager-overview/",
    "useCaseIds": []
  },
  {
    "id": "1password-secrets-automation",
    "slug": "1password-secrets-automation",
    "vendorId": "1password",
    "name": "1Password Secrets Automation",
    "positioning": "1Password documents Secrets Automation through service accounts or Connect servers.",
    "primaryCategoryIds": [
      "secrets-management"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "nhi"
    ],
    "availability": "unknown",
    "availabilityNote": "Service-account and Connect architectures have different rate limits and infrastructure requirements. A self-hosted Connect server does not imply the whole vault service is self-hosted.",
    "officialUrl": "https://www.1password.dev/secrets-automation",
    "useCaseIds": []
  },
  {
    "id": "keeper-secrets-manager",
    "slug": "keeper-secrets-manager",
    "vendorId": "keeper",
    "name": "Keeper Secrets Manager",
    "positioning": "Keeper documents Secrets Manager as a KeeperPAM component for infrastructure secrets and application or CI/CD access.",
    "primaryCategoryIds": [
      "secrets-management"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "nhi"
    ],
    "availability": "unknown",
    "availabilityNote": "Validate target-specific rotation and packaging. Vendor superiority and certification statements are not adopted.",
    "officialUrl": "https://docs.keeper.io/keeperpam/secrets-manager/overview",
    "useCaseIds": []
  }
];

export const expandedSources: Source[] = [
  {
    "id": "src-expanded-arexdata-dspm",
    "title": "Arexdata DSPM — official scope",
    "url": "https://www.arexdata.com/en/",
    "canonicalUrl": "https://www.arexdata.com/en/",
    "publisher": "Arexdata",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Arexdata markets DSPM for centralized data, access and permissions visibility across local and cloud repositories."
  },
  {
    "id": "src-expanded-avepoint-dspm",
    "title": "AvePoint DSPM — official scope",
    "url": "https://www.avepoint.com/solutions/security-posture-management",
    "canonicalUrl": "https://www.avepoint.com/solutions/security-posture-management",
    "publisher": "AvePoint",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "AvePoint markets DSPM with sensitive-data discovery, access visibility and governance across its platform."
  },
  {
    "id": "src-expanded-geodi-dspm",
    "title": "GEODI DSPM — official scope",
    "url": "https://www.decesoftware.com/about-us",
    "canonicalUrl": "https://www.decesoftware.com/about-us",
    "publisher": "DECE Software",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "DECE Software identifies GEODI DSPM as its platform for sensitive-data visibility across cloud, on-premises and collaboration sources."
  },
  {
    "id": "src-expanded-ciphertrust-dspm",
    "title": "CipherTrust DSPM — official scope",
    "url": "https://cpl.thalesgroup.com/encryption/data-security-posture-management",
    "canonicalUrl": "https://cpl.thalesgroup.com/encryption/data-security-posture-management",
    "publisher": "Thales",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Thales markets CipherTrust DSPM with discovery, data-risk analytics and integrated data-protection workflows."
  },
  {
    "id": "src-expanded-proofpoint-dspm",
    "title": "Proofpoint DSPM — official scope",
    "url": "https://www.proofpoint.com/us/normalyze-is-now-proofpoint",
    "canonicalUrl": "https://www.proofpoint.com/us/normalyze-is-now-proofpoint",
    "publisher": "Proofpoint",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Proofpoint describes DSPM for discovery, classification and data-risk remediation, with Normalyze product lineage."
  },
  {
    "id": "src-expanded-forcepoint-dspm",
    "title": "Forcepoint DSPM — official scope",
    "url": "https://help.forcepoint.com/dspm/en-us/onlinehelp/guid-e9e3ca45-4e27-490c-b6ce-822b57a8eaae.html",
    "canonicalUrl": "https://help.forcepoint.com/dspm/en-us/onlinehelp/guid-e9e3ca45-4e27-490c-b6ce-822b57a8eaae.html",
    "publisher": "Forcepoint",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Forcepoint documents DSPM for sensitive-data discovery, classification and risk assessment."
  },
  {
    "id": "src-expanded-google-scc-dspm",
    "title": "Google Security Command Center DSPM — official scope",
    "url": "https://docs.cloud.google.com/security-command-center/docs/dspm-data-security",
    "canonicalUrl": "https://docs.cloud.google.com/security-command-center/docs/dspm-data-security",
    "publisher": "Google",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Google documents Security Command Center DSPM and states that this DSPM offering will shut down on February 1, 2027."
  },
  {
    "id": "src-expanded-delinea-devops-secrets-vault",
    "title": "Delinea DevOps Secrets Vault — official scope",
    "url": "https://docs.delinea.com/online-help/devops-secrets-vault/start.htm",
    "canonicalUrl": "https://docs.delinea.com/online-help/devops-secrets-vault/start.htm",
    "publisher": "Delinea",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Delinea documents a cloud-based DevOps vault with access controls, CLI/API access and audit logging."
  },
  {
    "id": "src-expanded-beyondtrust-secrets-safe",
    "title": "BeyondTrust Password Safe — Secrets Safe — official scope",
    "url": "https://www.beyondtrust.com/products/password-safe/features/secrets-management",
    "canonicalUrl": "https://www.beyondtrust.com/products/password-safe/features/secrets-management",
    "publisher": "BeyondTrust",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "BeyondTrust describes Secrets Safe as a capability within Password Safe for DevOps credential storage and access."
  },
  {
    "id": "src-expanded-bitwarden-secrets-manager",
    "title": "Bitwarden Secrets Manager — official scope",
    "url": "https://bitwarden.com/help/secrets-manager-overview/",
    "canonicalUrl": "https://bitwarden.com/help/secrets-manager-overview/",
    "publisher": "Bitwarden",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Bitwarden documents Secrets Manager with machine accounts, access tokens, CLI/SDK access and secret injection."
  },
  {
    "id": "src-expanded-1password-secrets-automation",
    "title": "1Password Secrets Automation — official scope",
    "url": "https://www.1password.dev/secrets-automation",
    "canonicalUrl": "https://www.1password.dev/secrets-automation",
    "publisher": "1Password",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "1Password documents Secrets Automation through service accounts or Connect servers."
  },
  {
    "id": "src-expanded-keeper-secrets-manager",
    "title": "Keeper Secrets Manager — official scope",
    "url": "https://docs.keeper.io/keeperpam/secrets-manager/overview",
    "canonicalUrl": "https://docs.keeper.io/keeperpam/secrets-manager/overview",
    "publisher": "Keeper Security",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Keeper documents Secrets Manager as a KeeperPAM component for infrastructure secrets and application or CI/CD access."
  }
];

export const expandedClaims: Claim[] = [
  {
    "id": "claim-expanded-arexdata-dspm",
    "statement": "Arexdata markets DSPM for centralized data, access and permissions visibility across local and cloud repositories.",
    "subjectType": "product",
    "subjectId": "arexdata-dspm",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-expanded-arexdata-dspm",
    "sourceUrl": "https://www.arexdata.com/en/",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Validate connectors, deployment and enforcement scope; the fetched English URL serves Spanish content. Publisher-reported, not independently tested; no direct-competitor or analyst endorsement claim."
  },
  {
    "id": "claim-expanded-avepoint-dspm",
    "statement": "AvePoint markets DSPM with sensitive-data discovery, access visibility and governance across its platform.",
    "subjectType": "product",
    "subjectId": "avepoint-dspm",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-expanded-avepoint-dspm",
    "sourceUrl": "https://www.avepoint.com/solutions/security-posture-management",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Confirm which Confidence Platform components and licenses implement the required controls. Publisher-reported, not independently tested; no direct-competitor or analyst endorsement claim."
  },
  {
    "id": "claim-expanded-geodi-dspm",
    "statement": "DECE Software identifies GEODI DSPM as its platform for sensitive-data visibility across cloud, on-premises and collaboration sources.",
    "subjectType": "product",
    "subjectId": "geodi-dspm",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-expanded-geodi-dspm",
    "sourceUrl": "https://www.decesoftware.com/about-us",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "GEODI is the product; DECE Software is the vendor. Connector depth and enforcement are untested. Publisher-reported, not independently tested; no direct-competitor or analyst endorsement claim."
  },
  {
    "id": "claim-expanded-ciphertrust-dspm",
    "statement": "Thales markets CipherTrust DSPM with discovery, data-risk analytics and integrated data-protection workflows.",
    "subjectType": "product",
    "subjectId": "ciphertrust-dspm",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-expanded-ciphertrust-dspm",
    "sourceUrl": "https://cpl.thalesgroup.com/encryption/data-security-posture-management",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Do not adopt the vendor's competitive comparison table as independently established feature parity. Publisher-reported, not independently tested; no direct-competitor or analyst endorsement claim."
  },
  {
    "id": "claim-expanded-proofpoint-dspm",
    "statement": "Proofpoint describes DSPM for discovery, classification and data-risk remediation, with Normalyze product lineage.",
    "subjectType": "product",
    "subjectId": "proofpoint-dspm",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-expanded-proofpoint-dspm",
    "sourceUrl": "https://www.proofpoint.com/us/normalyze-is-now-proofpoint",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Normalyze is not counted as another independent vendor. Exact acquisition closing date is not established by this page. Publisher-reported, not independently tested; no direct-competitor or analyst endorsement claim."
  },
  {
    "id": "claim-expanded-forcepoint-dspm",
    "statement": "Forcepoint documents DSPM for sensitive-data discovery, classification and risk assessment.",
    "subjectType": "product",
    "subjectId": "forcepoint-dspm",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-expanded-forcepoint-dspm",
    "sourceUrl": "https://help.forcepoint.com/dspm/en-us/onlinehelp/guid-e9e3ca45-4e27-490c-b6ce-822b57a8eaae.html",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "low",
    "verificationStatus": "needs_review",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "The documentation contains a testing-purpose note. Confirm production version and packaging; performance and enforcement claims are not adopted. Publisher-reported, not independently tested; no direct-competitor or analyst endorsement claim."
  },
  {
    "id": "claim-expanded-google-scc-dspm",
    "statement": "Google documents Security Command Center DSPM and states that this DSPM offering will shut down on February 1, 2027.",
    "subjectType": "product",
    "subjectId": "google-scc-dspm",
    "capabilityId": null,
    "polarity": "limits",
    "sourceId": "src-expanded-google-scc-dspm",
    "sourceUrl": "https://docs.cloud.google.com/security-command-center/docs/dspm-data-security",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Lifecycle warning as observed 2026-10-13. Some controls are preview or detective-only. Review the linked alternative detection capabilities before a new purchase; no general multi-cloud parity inferred. Publisher-reported, not independently tested; no direct-competitor or analyst endorsement claim."
  },
  {
    "id": "claim-expanded-delinea-devops-secrets-vault",
    "statement": "Delinea documents a cloud-based DevOps vault with access controls, CLI/API access and audit logging.",
    "subjectType": "product",
    "subjectId": "delinea-devops-secrets-vault",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-expanded-delinea-devops-secrets-vault",
    "sourceUrl": "https://docs.delinea.com/online-help/devops-secrets-vault/start.htm",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Separate product from Secret Server. Vaulting does not establish repository secret-scanning coverage. Publisher-reported, not independently tested; no direct-competitor or analyst endorsement claim."
  },
  {
    "id": "claim-expanded-beyondtrust-secrets-safe",
    "statement": "BeyondTrust describes Secrets Safe as a capability within Password Safe for DevOps credential storage and access.",
    "subjectType": "product",
    "subjectId": "beyondtrust-secrets-safe",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-expanded-beyondtrust-secrets-safe",
    "sourceUrl": "https://www.beyondtrust.com/products/password-safe/features/secrets-management",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Platform capability rather than a separate vendor. Confirm license and rotation support; no code-scanning claim. Publisher-reported, not independently tested; no direct-competitor or analyst endorsement claim."
  },
  {
    "id": "claim-expanded-bitwarden-secrets-manager",
    "statement": "Bitwarden documents Secrets Manager with machine accounts, access tokens, CLI/SDK access and secret injection.",
    "subjectType": "product",
    "subjectId": "bitwarden-secrets-manager",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-expanded-bitwarden-secrets-manager",
    "sourceUrl": "https://bitwarden.com/help/secrets-manager-overview/",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Separate evaluation from its human password manager; rotation and dynamic issuance coverage remain unknown here. Publisher-reported, not independently tested; no direct-competitor or analyst endorsement claim."
  },
  {
    "id": "claim-expanded-1password-secrets-automation",
    "statement": "1Password documents Secrets Automation through service accounts or Connect servers.",
    "subjectType": "product",
    "subjectId": "1password-secrets-automation",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-expanded-1password-secrets-automation",
    "sourceUrl": "https://www.1password.dev/secrets-automation",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Service-account and Connect architectures have different rate limits and infrastructure requirements. A self-hosted Connect server does not imply the whole vault service is self-hosted. Publisher-reported, not independently tested; no direct-competitor or analyst endorsement claim."
  },
  {
    "id": "claim-expanded-keeper-secrets-manager",
    "statement": "Keeper documents Secrets Manager as a KeeperPAM component for infrastructure secrets and application or CI/CD access.",
    "subjectType": "product",
    "subjectId": "keeper-secrets-manager",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-expanded-keeper-secrets-manager",
    "sourceUrl": "https://docs.keeper.io/keeperpam/secrets-manager/overview",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Validate target-specific rotation and packaging. Vendor superiority and certification statements are not adopted. Publisher-reported, not independently tested; no direct-competitor or analyst endorsement claim."
  }
];

export function includeExpandedDspm(vendor: Vendor): Vendor {
  if (!["proofpoint", "forcepoint", "google"].includes(vendor.id) ||
      vendor.primaryCategoryIds.includes("dspm") || vendor.adjacentCategoryIds.includes("dspm")) return vendor;
  return { ...vendor, adjacentCategoryIds: [...vendor.adjacentCategoryIds, "dspm"] };
}
