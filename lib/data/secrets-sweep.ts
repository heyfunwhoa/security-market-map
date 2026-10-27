import type { Claim, Product, Source, Vendor } from "../schema";

// Public-source sweep, 2026-10-13. Capability evidence is product-specific.
// Integration-only entries never populate native secret-discovery cells.

export const secretsSweepVendors: Vendor[] = [
  {
    "id": "gitlab",
    "slug": "gitlab",
    "name": "GitLab",
    "formerNames": [],
    "website": "https://docs.gitlab.com/user/application_security/secret_detection/",
    "positioning": "Publisher or maintainer of GitLab Secret Detection. Research candidate; see product-level evidence and scope.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Which maintained release, edition, deployment, and support terms apply?"
    ]
  },
  {
    "id": "mongodb",
    "slug": "mongodb",
    "name": "MongoDB",
    "formerNames": [],
    "website": "https://github.com/mongodb/kingfisher",
    "positioning": "Publisher or maintainer of Kingfisher. Research candidate; see product-level evidence and scope.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Which maintained release, edition, deployment, and support terms apply?"
    ]
  },
  {
    "id": "praetorian",
    "slug": "praetorian",
    "name": "Praetorian",
    "formerNames": [],
    "website": "https://github.com/praetorian-inc/noseyparker",
    "positioning": "Publisher or maintainer of Nosey Parker. Research candidate; see product-level evidence and scope.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Which maintained release, edition, deployment, and support terms apply?"
    ]
  },
  {
    "id": "yelp",
    "slug": "yelp",
    "name": "Yelp",
    "formerNames": [],
    "website": "https://github.com/Yelp/detect-secrets",
    "positioning": "Publisher or maintainer of detect-secrets. Research candidate; see product-level evidence and scope.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Which maintained release, edition, deployment, and support terms apply?"
    ]
  },
  {
    "id": "secretlint",
    "slug": "secretlint",
    "name": "Secretlint project",
    "formerNames": [],
    "website": "https://github.com/secretlint/secretlint",
    "positioning": "Publisher or maintainer of Secretlint. Research candidate; see product-level evidence and scope.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Which maintained release, edition, deployment, and support terms apply?"
    ]
  },
  {
    "id": "deepfence",
    "slug": "deepfence",
    "name": "Deepfence",
    "formerNames": [],
    "website": "https://github.com/deepfence/SecretScanner",
    "positioning": "Publisher or maintainer of Deepfence SecretScanner. Research candidate; see product-level evidence and scope.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Which maintained release, edition, deployment, and support terms apply?"
    ]
  },
  {
    "id": "thoughtworks",
    "slug": "thoughtworks",
    "name": "Thoughtworks",
    "formerNames": [],
    "website": "https://github.com/thoughtworks/talisman",
    "positioning": "Publisher or maintainer of Talisman. Research candidate; see product-level evidence and scope.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Which maintained release, edition, deployment, and support terms apply?"
    ]
  },
  {
    "id": "skyscanner",
    "slug": "skyscanner",
    "name": "Skyscanner",
    "formerNames": [],
    "website": "https://github.com/Skyscanner/whispers",
    "positioning": "Publisher or maintainer of Whispers. Research candidate; see product-level evidence and scope.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Which maintained release, edition, deployment, and support terms apply?"
    ]
  },
  {
    "id": "sonarsource",
    "slug": "sonarsource",
    "name": "Sonar",
    "formerNames": [],
    "website": "https://docs.sonarsource.com/sonarqube-server/analyzing-source-code/languages/secrets",
    "positioning": "Publisher or maintainer of SonarQube secrets detection. Research candidate; see product-level evidence and scope.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Which maintained release, edition, deployment, and support terms apply?"
    ]
  },
  {
    "id": "jfrog",
    "slug": "jfrog",
    "name": "JFrog",
    "formerNames": [],
    "website": "https://docs.jfrog.com/security/docs/secrets-scans-1",
    "positioning": "Publisher or maintainer of JFrog Advanced Security secrets scans. Research candidate; see product-level evidence and scope.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Which maintained release, edition, deployment, and support terms apply?"
    ]
  },
  {
    "id": "datadog",
    "slug": "datadog",
    "name": "Datadog",
    "formerNames": [],
    "website": "https://www.datadoghq.com/product/secret-scanning/",
    "positioning": "Publisher or maintainer of Datadog Secret Scanning. Research candidate; see product-level evidence and scope.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Which maintained release, edition, deployment, and support terms apply?"
    ]
  },
  {
    "id": "harness",
    "slug": "harness",
    "name": "Harness",
    "formerNames": [],
    "website": "https://www.harness.io/products/application-security-testing",
    "positioning": "Publisher or maintainer of Harness Application Security Testing. Research candidate; see product-level evidence and scope.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Which maintained release, edition, deployment, and support terms apply?"
    ]
  },
  {
    "id": "codeant",
    "slug": "codeant",
    "name": "CodeAnt AI",
    "formerNames": [],
    "website": "https://docs.codeant.ai/control_center/secrets",
    "positioning": "Publisher or maintainer of CodeAnt AI secrets detection. Research candidate; see product-level evidence and scope.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Which maintained release, edition, deployment, and support terms apply?"
    ]
  },
  {
    "id": "ripsecrets",
    "slug": "ripsecrets",
    "name": "ripsecrets project",
    "formerNames": [],
    "website": "https://github.com/sirwart/ripsecrets",
    "positioning": "Publisher or maintainer of ripsecrets. Research candidate; see product-level evidence and scope.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Which maintained release, edition, deployment, and support terms apply?"
    ]
  },
  {
    "id": "shhgit",
    "slug": "shhgit",
    "name": "shhgit project",
    "formerNames": [],
    "website": "https://github.com/eth0izzle/shhgit",
    "positioning": "Publisher or maintainer of shhgit. Research candidate; see product-level evidence and scope.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Which maintained release, edition, deployment, and support terms apply?"
    ]
  },
  {
    "id": "reversinglabs",
    "slug": "reversinglabs",
    "name": "ReversingLabs",
    "formerNames": [],
    "website": "https://www.reversinglabs.com/detect-prioritize-manage-exposed-secrets-in-software",
    "positioning": "Publisher or maintainer of ReversingLabs secrets detection. Research candidate; see product-level evidence and scope.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Which maintained release, edition, deployment, and support terms apply?"
    ]
  },
  {
    "id": "postman",
    "slug": "postman",
    "name": "Postman",
    "formerNames": [],
    "website": "https://learning.postman.com/docs/administration/managing-your-team/secret-scanner/overview/",
    "positioning": "Publisher or maintainer of Postman Secret Scanner. Research candidate; see product-level evidence and scope.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Which maintained release, edition, deployment, and support terms apply?"
    ]
  },
  {
    "id": "black-duck",
    "slug": "black-duck",
    "name": "Black Duck",
    "formerNames": [],
    "website": "https://www.blackduck.com/resources/datasheets/secrets-detection.html",
    "positioning": "Publisher of a secrets-scanning datasheet for source code and infrastructure-as-code. The catalog still has a separate synopsys shortlist record. This pass does not merge those names.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [
      "sast",
      "sca"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Which Black Duck or Polaris edition includes the secrets scan, and is the buyer still contracting under the Synopsys name?"
    ]
  },
  {
    "id": "opentext",
    "slug": "opentext",
    "name": "OpenText",
    "formerNames": [],
    "website": "https://www.microfocus.com/documentation/fortify-static-code-analyzer-and-tools/2540/sast-ugd-html-25.4.0/doc/2263_25.4/secretscanning.html",
    "positioning": "Publisher of the OpenText SAST documentation that describes a secrets analyzer. The product name on that documentation set is Fortify. This record does not establish a rename history.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [
      "sast"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Which Fortify edition and deployment is in the renewal?"
    ]
  },
  {
    "id": "deepsource",
    "slug": "deepsource",
    "name": "DeepSource",
    "formerNames": [],
    "website": "https://deepsource.com/docs/product/secrets-detection",
    "positioning": "Code-review platform that documents a secrets-detection feature. Plan and engine details stay on the product record.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [
      "sast"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Is the team on a plan that includes secrets detection, and is the hybrid engine enabled?"
    ]
  },
  {
    "id": "codacy",
    "slug": "codacy",
    "name": "Codacy",
    "formerNames": [],
    "website": "https://docs.codacy.com/getting-started/supported-languages-and-tools/",
    "positioning": "Code-quality platform that documents secret detection by naming other scanners. Those named tools are not a Codacy-authored detector.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [
      "sast",
      "sca"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "verificationStatus": "research_candidate",
    "openQuestions": [
      "Which languages are in scope, and which named scanner runs for each of them?"
    ]
  }
];

export const secretsSweepProducts: Product[] = [
  {
    "id": "ggshield",
    "slug": "ggshield",
    "vendorId": "gitguardian",
    "name": "ggshield",
    "positioning": "CLI scans content using the GitGuardian API. Open client does not make the hosted engine open source.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "open_source"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Open client does not make the hosted engine open source.",
    "officialUrl": "https://github.com/GitGuardian/ggshield",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "gitlab-secrets",
    "slug": "gitlab-secrets",
    "vendorId": "gitlab",
    "name": "GitLab Secret Detection",
    "positioning": "Provides pipeline and other secret detection workflows. Do not assume all workflows use the same engine or tier.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Do not assume all workflows use the same engine or tier.",
    "officialUrl": "https://docs.gitlab.com/user/application_security/secret_detection/",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "betterleaks",
    "slug": "betterleaks",
    "vendorId": "aikido",
    "name": "Betterleaks",
    "positioning": "Configurable scanner for exposed secrets. Separate project from Gitleaks; not a rename.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "open_source"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Separate project from Gitleaks; not a rename.",
    "officialUrl": "https://github.com/betterleaks/betterleaks",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "kingfisher",
    "slug": "kingfisher",
    "vendorId": "mongodb",
    "name": "Kingfisher",
    "positioning": "Detects exposed credentials and supports live validation. Validation varies by detector; no parity or coverage-count claim.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "open_source"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Validation varies by detector; no parity or coverage-count claim.",
    "officialUrl": "https://github.com/mongodb/kingfisher",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "noseyparker",
    "slug": "noseyparker",
    "vendorId": "praetorian",
    "name": "Nosey Parker",
    "positioning": "Finds secrets in textual data and Git history. Check repository lifecycle and Titus relationship before adoption.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "open_source"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Check repository lifecycle and Titus relationship before adoption.",
    "officialUrl": "https://github.com/praetorian-inc/noseyparker",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "titus",
    "slug": "titus",
    "vendorId": "praetorian",
    "name": "Titus",
    "positioning": "Detects credentials in source, binaries, and HTTP traffic. Distinct project from Nosey Parker.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "open_source"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Distinct project from Nosey Parker.",
    "officialUrl": "https://github.com/praetorian-inc/titus",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "detect-secrets",
    "slug": "detect-secrets",
    "vendorId": "yelp",
    "name": "detect-secrets",
    "positioning": "Detects secrets in code with baselines and plugins. Baseline workflows are not a managed incident response service.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "open_source"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Baseline workflows are not a managed incident response service.",
    "officialUrl": "https://github.com/Yelp/detect-secrets",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "git-secrets",
    "slug": "git-secrets",
    "vendorId": "amazon-web-services",
    "name": "git-secrets",
    "positioning": "Checks Git content against prohibited credential patterns. AWS patterns do not establish universal secret coverage.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "open_source"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. AWS patterns do not establish universal secret coverage.",
    "officialUrl": "https://github.com/awslabs/git-secrets",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "trivy",
    "slug": "trivy",
    "vendorId": "aqua",
    "name": "Trivy secret scanner",
    "positioning": "Finds secrets in plaintext files with built-in and custom rules. Image/filesystem scanning differs from full Git-history scanning.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "open_source"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Image/filesystem scanning differs from full Git-history scanning.",
    "officialUrl": "https://trivy.dev/docs/latest/guide/scanner/secret/",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "checkov",
    "slug": "checkov",
    "vendorId": "palo-alto-networks",
    "name": "Checkov secrets scanning",
    "positioning": "Scans for hardcoded credentials and secrets. Keep OSS features separate from platform services.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "open_source"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Keep OSS features separate from platform services.",
    "officialUrl": "https://www.checkov.io/2.Basics/Scanning%20Credentials%20and%20Secrets.html",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "secretlint",
    "slug": "secretlint",
    "vendorId": "secretlint",
    "name": "Secretlint",
    "positioning": "Uses pluggable rules to detect credentials before commit. Does not automatically remediate secrets.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "open_source"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Does not automatically remediate secrets.",
    "officialUrl": "https://github.com/secretlint/secretlint",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "deepfence-secret-scanner",
    "slug": "deepfence-secret-scanner",
    "vendorId": "deepfence",
    "name": "Deepfence SecretScanner",
    "positioning": "Scans container images and local directories for secrets. No general availability or support SLA inferred.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "open_source"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. No general availability or support SLA inferred.",
    "officialUrl": "https://github.com/deepfence/SecretScanner",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "talisman",
    "slug": "talisman",
    "vendorId": "thoughtworks",
    "name": "Talisman",
    "positioning": "Detects suspicious secret material in Git changesets. Local hooks can be bypassed.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "open_source"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Local hooks can be bypassed.",
    "officialUrl": "https://github.com/thoughtworks/talisman",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "credential-digger",
    "slug": "credential-digger",
    "vendorId": "sap",
    "name": "Credential Digger",
    "positioning": "Repository documents hardcoded-credential scanning. Archived lineage; not an active-product recommendation.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "open_source"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Archived lineage; not an active-product recommendation.",
    "officialUrl": "https://github.com/SAP-archive/credential-digger",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "whispers",
    "slug": "whispers",
    "vendorId": "skyscanner",
    "name": "Whispers",
    "positioning": "Finds hardcoded secrets in structured text. Structured-file scope; maintenance must be checked.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "open_source"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Structured-file scope; maintenance must be checked.",
    "officialUrl": "https://github.com/Skyscanner/whispers",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "semgrep-secrets",
    "slug": "semgrep-secrets",
    "vendorId": "semgrep",
    "name": "Semgrep Secrets",
    "positioning": "Scans code for exposed secrets. Commercial Secrets features are not implied by OSS Semgrep.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Commercial Secrets features are not implied by OSS Semgrep.",
    "officialUrl": "https://semgrep.dev/products/semgrep-secrets",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "aikido-secrets",
    "slug": "aikido-secrets",
    "vendorId": "aikido",
    "name": "Aikido Secrets Detection",
    "positioning": "Detects exposed secrets and describes live-secret checks. No independent accuracy comparison inferred.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. No independent accuracy comparison inferred.",
    "officialUrl": "https://www.aikido.dev/code/secrets-detection",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "apiiro-secrets",
    "slug": "apiiro-secrets",
    "vendorId": "apiiro",
    "name": "Apiiro Secrets Security",
    "positioning": "Detects and validates exposed secrets with application context. Vendor claims are not performance benchmarks.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Vendor claims are not performance benchmarks.",
    "officialUrl": "https://apiiro.com/product/guardian-agent/secrets-security",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "cycode-secrets",
    "slug": "cycode-secrets",
    "vendorId": "cycode",
    "name": "Cycode Secrets Detection",
    "positioning": "Scans development environments for hardcoded secrets. Confirm connectors and edition during evaluation.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Confirm connectors and edition during evaluation.",
    "officialUrl": "https://cycode.com/hard-coded-secrets-detection/",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "legit-secrets",
    "slug": "legit-secrets",
    "vendorId": "legit-security",
    "name": "Legit Secrets Detection",
    "positioning": "Detects exposed secrets across development and collaboration surfaces. Validate each connector and deployment scope.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Validate each connector and deployment scope.",
    "officialUrl": "https://www.legitsecurity.com/enterprise-secret-scanning",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "ox-secrets",
    "slug": "ox-secrets",
    "vendorId": "ox-security",
    "name": "OX Secret and PII Scan",
    "positioning": "Documents policies for hardcoded-secret findings. Native scan and imported scanner findings must be distinguished.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Native scan and imported scanner findings must be distinguished.",
    "officialUrl": "https://docs.ox.security/ox-policies/cloud-context-policies-3",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "jit-secrets",
    "slug": "jit-secrets",
    "vendorId": "jit",
    "name": "Jit Secrets Detection",
    "positioning": "Runs Gitleaks and TruffleHog behind its secrets workflow. Bundled engines; not a separately proven proprietary scanner. Full-page capability evidence unavailable on this pass; search-index evidence only, not a published capability check.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Bundled engines; not a separately proven proprietary scanner. Full-page capability evidence unavailable on this pass; search-index evidence only, not a published capability check.",
    "officialUrl": "https://www.jit.io/aspm-platform/secrets-detection",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "endor-secrets",
    "slug": "endor-secrets",
    "vendorId": "endor-labs",
    "name": "Endor Labs Secrets Detection",
    "positioning": "Scans Git history and describes live-secret validation. Validation support is provider-specific.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Validation support is provider-specific.",
    "officialUrl": "https://www.endorlabs.com/use-case/secrets-detection",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "arnica-secrets",
    "slug": "arnica-secrets",
    "vendorId": "arnica",
    "name": "Arnica Secret Detection",
    "positioning": "Detects hardcoded secrets in repository commits. Older policy docs disagree with newer PR-scanning announcement; do not assert PR coverage here.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Older policy docs disagree with newer PR-scanning announcement; do not assert PR coverage here.",
    "officialUrl": "https://docs.arnica.io/arnica-documentation/hardcoded-secrets/secret-detection",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "xygeni-secrets",
    "slug": "xygeni-secrets",
    "vendorId": "xygeni",
    "name": "Xygeni Secrets Scanner",
    "positioning": "Scans code, text, and Docker images for exposed secrets. Validation and historical scanning are separate evaluation dimensions.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Validation and historical scanning are separate evaluation dimensions.",
    "officialUrl": "https://docs.xygeni.io/xygeni-products/secrets-security/secrets-scanner",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "checkmarx-secrets",
    "slug": "checkmarx-secrets",
    "vendorId": "checkmarx",
    "name": "Checkmarx Secrets Detection",
    "positioning": "Detects hardcoded credentials in development workflows. Confirm packaging and IDE support.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Confirm packaging and IDE support.",
    "officialUrl": "https://checkmarx.com/product/secrets-detection/",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "sonar-secrets",
    "slug": "sonar-secrets",
    "vendorId": "sonarsource",
    "name": "SonarQube secrets detection",
    "positioning": "Detects secrets in source and language-agnostic configuration files. Custom rules and feature breadth vary by edition.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Custom rules and feature breadth vary by edition.",
    "officialUrl": "https://docs.sonarsource.com/sonarqube-server/analyzing-source-code/languages/secrets",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "jfrog-secrets",
    "slug": "jfrog-secrets",
    "vendorId": "jfrog",
    "name": "JFrog Advanced Security secrets scans",
    "positioning": "Scans source and binary artifacts for exposed secrets. Advanced Security packaging and validation egress need review.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Advanced Security packaging and validation egress need review.",
    "officialUrl": "https://docs.jfrog.com/security/docs/secrets-scans-1",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "mend-secrets",
    "slug": "mend-secrets",
    "vendorId": "mend",
    "name": "Mend SAST Secret Scanning",
    "positioning": "Scans source and configuration files for exposed credentials. CLI option is disabled when unspecified; documentation says detected secrets are not anonymized.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. CLI option is disabled when unspecified; documentation says detected secrets are not anonymized.",
    "officialUrl": "https://docs.mend.io/platform/latest/code-secret-scanning",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "snyk-secrets",
    "slug": "snyk-secrets",
    "vendorId": "snyk",
    "name": "Snyk Secrets",
    "positioning": "Announces general availability of a dedicated secrets scanner. 2026-08-04 announcement; older Snyk feature comparisons may be stale.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. 2026-08-04 announcement; older Snyk feature comparisons may be stale.",
    "officialUrl": "https://snyk.io/blog/snyk-secrets/",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "datadog-secrets",
    "slug": "datadog-secrets",
    "vendorId": "datadog",
    "name": "Datadog Secret Scanning",
    "positioning": "Scans code for exposed secrets. Check site availability and Code Security configuration.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Check site availability and Code Security configuration.",
    "officialUrl": "https://www.datadoghq.com/product/secret-scanning/",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "harness-ast",
    "slug": "harness-ast",
    "vendorId": "harness",
    "name": "Harness Application Security Testing",
    "positioning": "Lists secrets detection in its application security platform. Do not equate orchestration integrations with native engines.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Do not equate orchestration integrations with native engines.",
    "officialUrl": "https://www.harness.io/products/application-security-testing",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "spectral-secrets",
    "slug": "spectral-secrets",
    "vendorId": "checkpoint",
    "name": "Spectral Secrets Scanning",
    "positioning": "Scans assets for hardcoded secrets. Spectral product lineage; confirm current Check Point packaging.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Spectral product lineage; confirm current Check Point packaging.",
    "officialUrl": "https://guides.spectralops.io/docs/secrets-scanning",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "infisical-scanning",
    "slug": "infisical-scanning",
    "vendorId": "infisical",
    "name": "Infisical Secret Scanning",
    "positioning": "Documents CLI and repository secret scanning. Detection is a separate capability from vault storage.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Detection is a separate capability from vault storage.",
    "officialUrl": "https://infisical.com/videos/what-is-infisical",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "wiz-secrets",
    "slug": "wiz-secrets",
    "vendorId": "wiz",
    "name": "Wiz secrets scanning",
    "positioning": "Scans Git history, pull requests, and images for exposed secrets. CNAPP scope is not implied for every CSPM product.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. CNAPP scope is not implied for every CSPM product.",
    "officialUrl": "https://www.wiz.io/blog/secrets-found-owners-identified-issues-resolved",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "orca-secrets",
    "slug": "orca-secrets",
    "vendorId": "orca-security",
    "name": "Orca secrets detection",
    "positioning": "Lists secrets detection among application security capabilities. Use source-code and workload scope as separate evaluation dimensions.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Use source-code and workload scope as separate evaluation dimensions.",
    "officialUrl": "https://orca.security/platform/application-security/",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "prisma-secrets",
    "slug": "prisma-secrets",
    "vendorId": "palo-alto-networks",
    "name": "Prisma Cloud agentless secrets scanning",
    "positioning": "Documents agentless scanning for secrets on workloads. Historical product documentation; confirm current Cortex/Prisma packaging.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Historical product documentation; confirm current Cortex/Prisma packaging.",
    "officialUrl": "https://www.paloaltonetworks.com/blog/cloud-security/agentless-secrets-scanning/",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "defender-cloud-secrets",
    "slug": "defender-cloud-secrets",
    "vendorId": "microsoft",
    "name": "Defender for Cloud secrets scanning",
    "positioning": "Documents multiple types of secrets scanning. Repository integrations differ from native VM/deployment scanning.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Repository integrations differ from native VM/deployment scanning.",
    "officialUrl": "https://learn.microsoft.com/en-us/azure/defender-for-cloud/secrets-scanning",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "forticnapp-secrets",
    "slug": "forticnapp-secrets",
    "vendorId": "fortinet",
    "name": "FortiCNAPP secrets detection",
    "positioning": "Documents secrets scanning in its SCA workflow. Separate code scanning from agentless workload coverage. Full-page capability evidence unavailable on this pass; search-index evidence only, not a published capability check.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Separate code scanning from agentless workload coverage. Full-page capability evidence unavailable on this pass; search-index evidence only, not a published capability check.",
    "officialUrl": "https://docs.fortinet.com/document/forticnapp/latest/administration-guide/562942/secrets-detection",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "aqua-scanning",
    "slug": "aqua-scanning",
    "vendorId": "aqua",
    "name": "Aqua container scanning",
    "positioning": "Includes secrets in container/build scanning. Commercial Aqua and OSS Trivy are separate product records.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Commercial Aqua and OSS Trivy are separate product records.",
    "officialUrl": "https://www.aquasec.com/products/container-scanning/",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "singularity-cloud-secrets",
    "slug": "singularity-cloud-secrets",
    "vendorId": "sentinelone",
    "name": "Singularity Cloud Security",
    "positioning": "Includes secret scanning in its cloud-security offering. Do not attribute this to Singularity identity protection. Full-page capability evidence unavailable on this pass; search-index evidence only, not a published capability check.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Do not attribute this to Singularity identity protection. Full-page capability evidence unavailable on this pass; search-index evidence only, not a published capability check.",
    "officialUrl": "https://www.sentinelone.com/cloud/",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "armorcode-integration",
    "slug": "armorcode-integration",
    "vendorId": "armorcode",
    "name": "ArmorCode secrets integrations",
    "positioning": "Lists GitGuardian Secrets as an integration. Evidence of ingestion, not proof of a native detector.",
    "primaryCategoryIds": [
      "aspm"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Evidence of ingestion, not proof of a native detector.",
    "officialUrl": "https://www.armorcode.com/integrations",
    "useCaseIds": [
      "uc-finding-route"
    ]
  },
  {
    "id": "vault-radar",
    "slug": "vault-radar",
    "vendorId": "hashicorp",
    "name": "Vault Radar",
    "positioning": "Scans code, chat, and other sources for exposed secrets. Separate from Vault secret storage and issuance.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Separate from Vault secret storage and issuance.",
    "officialUrl": "https://developer.hashicorp.com/vault-radar",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "akeyless-github-scanner",
    "slug": "akeyless-github-scanner",
    "vendorId": "akeyless",
    "name": "Akeyless GitHub Scanner",
    "positioning": "Documents secret discovery across GitHub source and history. Requires Identity & Secrets Intelligence license and configured gateway; code scanning and inventory metadata are distinct.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Requires Identity & Secrets Intelligence license and configured gateway; code scanning and inventory metadata are distinct.",
    "officialUrl": "https://docs.akeyless.io/docs/github-scanner",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "entro-secrets",
    "slug": "entro-secrets",
    "vendorId": "entro",
    "name": "Entro secrets discovery",
    "positioning": "SailPoint's Entro page includes a customer quotation describing automated secret scanning. Customer quotation on vendor site; older Entro URL redirects here. Broader scanning scope and acquisition close date not established.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Customer quotation on vendor site; older Entro URL redirects here. Broader scanning scope and acquisition close date not established.",
    "officialUrl": "https://www.sailpoint.com/products/agentic-ai-security",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "codeant-secrets",
    "slug": "codeant-secrets",
    "vendorId": "codeant",
    "name": "CodeAnt AI secrets detection",
    "positioning": "Identifies API keys, tokens, and other secrets in code. Confirm scanner engine, retention, and licensing.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Confirm scanner engine, retention, and licensing.",
    "officialUrl": "https://docs.codeant.ai/control_center/secrets",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "ripsecrets",
    "slug": "ripsecrets",
    "vendorId": "ripsecrets",
    "name": "ripsecrets",
    "positioning": "Detects secret keys in source before commit. Community project; no commercial support inferred.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "open_source"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Community project; no commercial support inferred.",
    "officialUrl": "https://github.com/sirwart/ripsecrets",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "shhgit",
    "slug": "shhgit",
    "vendorId": "shhgit",
    "name": "shhgit",
    "positioning": "Finds secrets in code repositories. Repository-monitoring scope; maintenance requires review.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "open_source"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Repository-monitoring scope; maintenance requires review.",
    "officialUrl": "https://github.com/eth0izzle/shhgit",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "qwiet-secrets",
    "slug": "qwiet-secrets",
    "vendorId": "harness",
    "name": "Qwiet AI Secrets v2",
    "positioning": "Identifies hardcoded secrets during code analysis. Docs label this Qwiet AI by Harness; distinct product lineage.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Docs label this Qwiet AI by Harness; distinct product lineage.",
    "officialUrl": "https://docs.shiftleft.io/sast/analyzing-applications/secrets",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "reversinglabs-secrets",
    "slug": "reversinglabs-secrets",
    "vendorId": "reversinglabs",
    "name": "ReversingLabs secrets detection",
    "positioning": "Detects exposed secrets in software artifacts. Current packaging needs validation; no superiority claim adopted.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Current packaging needs validation; no superiority claim adopted.",
    "officialUrl": "https://www.reversinglabs.com/detect-prioritize-manage-exposed-secrets-in-software",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "socket-basics",
    "slug": "socket-basics",
    "vendorId": "socket",
    "name": "Socket Basics",
    "positioning": "Runs TruffleHog for secret scanning. Bundled scanner; Socket SCA alone is not proof of this capability.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Bundled scanner; Socket SCA alone is not proof of this capability.",
    "officialUrl": "https://github.com/SocketDev/socket-basics",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "tenable-secrets-connectors",
    "slug": "tenable-secrets-connectors",
    "vendorId": "tenable",
    "name": "Tenable One secrets connectors",
    "positioning": "Imports secret-detection findings through supported connectors. This source does not establish native cloud secret-scanner scope.",
    "primaryCategoryIds": [
      "aspm"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. This source does not establish native cloud secret-scanner scope.",
    "officialUrl": "https://docs.tenable.com/exposure-management/Content/connectors/connectors-and-supported-integrations.htm",
    "useCaseIds": [
      "uc-finding-route"
    ]
  },
  {
    "id": "crowdstrike-legit-integration",
    "slug": "crowdstrike-legit-integration",
    "vendorId": "crowdstrike",
    "name": "Falcon / Legit integration",
    "positioning": "Lists a Legit integration with secrets detection in code. Partner capability; not evidence of a native Falcon detector.",
    "primaryCategoryIds": [
      "aspm"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Partner capability; not evidence of a native Falcon detector.",
    "officialUrl": "https://marketplace.crowdstrike.com/listings/legit-security-platform/",
    "useCaseIds": [
      "uc-finding-route"
    ]
  },
  {
    "id": "sysdig-legacy-secrets",
    "slug": "sysdig-legacy-secrets",
    "vendorId": "sysdig",
    "name": "Sysdig legacy image secrets scanning",
    "positioning": "Legacy scanner documentation describes image-secret detection. Source states legacy engine end of life was 2024-12-31; current replacement capability remains unknown.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Source states legacy engine end of life was 2024-12-31; current replacement capability remains unknown.",
    "officialUrl": "https://docs.sysdig.com/en/docs/sysdig-secure/vulnerabilities/scanning/manage-scanning-policies/scanning-policy-gates-and-triggers/",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "postman-secret-scanner",
    "slug": "postman-secret-scanner",
    "vendorId": "postman",
    "name": "Postman Secret Scanner",
    "positioning": "Detects exposed secrets in Postman content. Confirm public/private workspace coverage and plan.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Confirm public/private workspace coverage and plan.",
    "officialUrl": "https://learning.postman.com/docs/administration/managing-your-team/secret-scanner/overview/",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "veracode-container-secrets",
    "slug": "veracode-container-secrets",
    "vendorId": "veracode",
    "name": "Veracode Container and IaC secret rules",
    "positioning": "Documents secret rules for container, infrastructure-as-code, directory, and repository scans. Static-analysis hardcoded-password findings are a different engine.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [
      "container-security",
      "sast"
    ],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. SAST CWE-259 and CWE-798 findings are not this record. The docs page lists paths the CLI does not scan.",
    "officialUrl": "https://docs.veracode.com/r/Run_Container_Security_scans",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "black-duck-secrets",
    "slug": "black-duck-secrets",
    "vendorId": "black-duck",
    "name": "Black Duck Secrets Scanning",
    "positioning": "Datasheet says the scan looks through source code, infrastructure-as-code templates, and other file types for hard-coded secrets.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [
      "sast",
      "sca"
    ],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. The datasheet does not name detectors, Git history, or validity checks. A Sigma hardcoded-secrets checker in Polaris release notes is not this record.",
    "officialUrl": "https://www.blackduck.com/resources/datasheets/secrets-detection.html",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "opentext-sast-secrets",
    "slug": "opentext-sast-secrets",
    "vendorId": "opentext",
    "name": "OpenText SAST secrets analyzer",
    "positioning": "OpenText SAST 25.4.0 documentation says one analyzer can find secrets across file types. Configuration is described as regular-expression analysis.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [
      "sast"
    ],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. This is an analyzer inside SAST, not a separate secrets product. Git history and validity checks are not described on this page.",
    "officialUrl": "https://www.microfocus.com/documentation/fortify-static-code-analyzer-and-tools/2540/sast-ugd-html-25.4.0/doc/2263_25.4/secretscanning.html",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "deepsource-secrets",
    "slug": "deepsource-secrets",
    "vendorId": "deepsource",
    "name": "DeepSource secrets detection",
    "positioning": "Documents commit scanning for hardcoded credentials with pattern matching and a classification model. The page says Team or Enterprise is required.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [
      "sast"
    ],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "limited",
    "availabilityNote": "The product page says secrets detection requires the Team or Enterprise plan. Vendor benchmark percentages on that page are not adopted. Validity checks are not described.",
    "officialUrl": "https://deepsource.com/docs/product/secrets-detection",
    "useCaseIds": [
      "uc-detect"
    ]
  },
  {
    "id": "codacy-secrets",
    "slug": "codacy-secrets",
    "vendorId": "codacy",
    "name": "Codacy secret detection",
    "positioning": "Documents secret detection as a scan type and names Opengrep, Trivy, Checkov, PMD, Bandit, and Prospector as tools used for it, depending on the language.",
    "primaryCategoryIds": [
      "secrets-detection"
    ],
    "adjacentCategoryIds": [
      "sast",
      "sca"
    ],
    "deployment": [
      "unknown"
    ],
    "identityScopes": [
      "not_an_identity_control"
    ],
    "availability": "unknown",
    "availabilityNote": "Feature existence is documented separately from current edition, release, support, and availability. Named tools differ by language. This is not a Codacy-authored detector. The page says scans run on push, not continuously.",
    "officialUrl": "https://docs.codacy.com/getting-started/supported-languages-and-tools/",
    "useCaseIds": [
      "uc-detect"
    ]
  }
];

export const secretsSweepSources: Source[] = [
  {
    "id": "src-secrets-sweep-trufflehog",
    "title": "TruffleHog — secrets detection scope",
    "url": "https://github.com/trufflesecurity/trufflehog",
    "canonicalUrl": "https://github.com/trufflesecurity/trufflehog",
    "publisher": "Truffle Security",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Scans for exposed secrets across supported sources."
  },
  {
    "id": "src-secrets-sweep-gitguardian",
    "title": "GitGuardian — secrets detection scope",
    "url": "https://www.gitguardian.com/ggshield",
    "canonicalUrl": "https://www.gitguardian.com/ggshield",
    "publisher": "GitGuardian",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Provides secrets detection through its platform and CLI."
  },
  {
    "id": "src-secrets-sweep-ggshield",
    "title": "ggshield — secrets detection scope",
    "url": "https://github.com/GitGuardian/ggshield",
    "canonicalUrl": "https://github.com/GitGuardian/ggshield",
    "publisher": "GitGuardian",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: CLI scans content using the GitGuardian API."
  },
  {
    "id": "src-secrets-sweep-github-secret-scanning",
    "title": "GitHub secret scanning — secrets detection scope",
    "url": "https://docs.github.com/en/code-security/concepts/secret-security/secret-scanning",
    "canonicalUrl": "https://docs.github.com/en/code-security/concepts/secret-security/secret-scanning",
    "publisher": "GitHub",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Detects leaked credentials in supported GitHub content."
  },
  {
    "id": "src-secrets-sweep-gitlab-secrets",
    "title": "GitLab Secret Detection — secrets detection scope",
    "url": "https://docs.gitlab.com/user/application_security/secret_detection/",
    "canonicalUrl": "https://docs.gitlab.com/user/application_security/secret_detection/",
    "publisher": "GitLab",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Provides pipeline and other secret detection workflows."
  },
  {
    "id": "src-secrets-sweep-gitleaks",
    "title": "Gitleaks — secrets detection scope",
    "url": "https://github.com/gitleaks/gitleaks",
    "canonicalUrl": "https://github.com/gitleaks/gitleaks",
    "publisher": "Gitleaks",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Scans files and Git history for potential secrets."
  },
  {
    "id": "src-secrets-sweep-betterleaks",
    "title": "Betterleaks — secrets detection scope",
    "url": "https://github.com/betterleaks/betterleaks",
    "canonicalUrl": "https://github.com/betterleaks/betterleaks",
    "publisher": "Aikido Security",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Configurable scanner for exposed secrets."
  },
  {
    "id": "src-secrets-sweep-kingfisher",
    "title": "Kingfisher — secrets detection scope",
    "url": "https://github.com/mongodb/kingfisher",
    "canonicalUrl": "https://github.com/mongodb/kingfisher",
    "publisher": "MongoDB",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Detects exposed credentials and supports live validation."
  },
  {
    "id": "src-secrets-sweep-noseyparker",
    "title": "Nosey Parker — secrets detection scope",
    "url": "https://github.com/praetorian-inc/noseyparker",
    "canonicalUrl": "https://github.com/praetorian-inc/noseyparker",
    "publisher": "Praetorian",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Finds secrets in textual data and Git history."
  },
  {
    "id": "src-secrets-sweep-titus",
    "title": "Titus — secrets detection scope",
    "url": "https://github.com/praetorian-inc/titus",
    "canonicalUrl": "https://github.com/praetorian-inc/titus",
    "publisher": "Praetorian",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Detects credentials in source, binaries, and HTTP traffic."
  },
  {
    "id": "src-secrets-sweep-detect-secrets",
    "title": "detect-secrets — secrets detection scope",
    "url": "https://github.com/Yelp/detect-secrets",
    "canonicalUrl": "https://github.com/Yelp/detect-secrets",
    "publisher": "Yelp",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Detects secrets in code with baselines and plugins."
  },
  {
    "id": "src-secrets-sweep-git-secrets",
    "title": "git-secrets — secrets detection scope",
    "url": "https://github.com/awslabs/git-secrets",
    "canonicalUrl": "https://github.com/awslabs/git-secrets",
    "publisher": "Amazon Web Services",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Checks Git content against prohibited credential patterns."
  },
  {
    "id": "src-secrets-sweep-trivy",
    "title": "Trivy secret scanner — secrets detection scope",
    "url": "https://trivy.dev/docs/latest/guide/scanner/secret/",
    "canonicalUrl": "https://trivy.dev/docs/latest/guide/scanner/secret/",
    "publisher": "Aqua Security",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Finds secrets in plaintext files with built-in and custom rules."
  },
  {
    "id": "src-secrets-sweep-checkov",
    "title": "Checkov secrets scanning — secrets detection scope",
    "url": "https://www.checkov.io/2.Basics/Scanning%20Credentials%20and%20Secrets.html",
    "canonicalUrl": "https://www.checkov.io/2.Basics/Scanning%20Credentials%20and%20Secrets.html",
    "publisher": "Palo Alto Networks",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Scans for hardcoded credentials and secrets."
  },
  {
    "id": "src-secrets-sweep-secretlint",
    "title": "Secretlint — secrets detection scope",
    "url": "https://github.com/secretlint/secretlint",
    "canonicalUrl": "https://github.com/secretlint/secretlint",
    "publisher": "Secretlint project",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Uses pluggable rules to detect credentials before commit."
  },
  {
    "id": "src-secrets-sweep-deepfence-secret-scanner",
    "title": "Deepfence SecretScanner — secrets detection scope",
    "url": "https://github.com/deepfence/SecretScanner",
    "canonicalUrl": "https://github.com/deepfence/SecretScanner",
    "publisher": "Deepfence",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Scans container images and local directories for secrets."
  },
  {
    "id": "src-secrets-sweep-talisman",
    "title": "Talisman — secrets detection scope",
    "url": "https://github.com/thoughtworks/talisman",
    "canonicalUrl": "https://github.com/thoughtworks/talisman",
    "publisher": "Thoughtworks",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Detects suspicious secret material in Git changesets."
  },
  {
    "id": "src-secrets-sweep-credential-digger",
    "title": "Credential Digger — secrets detection scope",
    "url": "https://github.com/SAP-archive/credential-digger",
    "canonicalUrl": "https://github.com/SAP-archive/credential-digger",
    "publisher": "SAP",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Repository documents hardcoded-credential scanning."
  },
  {
    "id": "src-secrets-sweep-whispers",
    "title": "Whispers — secrets detection scope",
    "url": "https://github.com/Skyscanner/whispers",
    "canonicalUrl": "https://github.com/Skyscanner/whispers",
    "publisher": "Skyscanner",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Finds hardcoded secrets in structured text."
  },
  {
    "id": "src-secrets-sweep-semgrep-secrets",
    "title": "Semgrep Secrets — secrets detection scope",
    "url": "https://semgrep.dev/products/semgrep-secrets",
    "canonicalUrl": "https://semgrep.dev/products/semgrep-secrets",
    "publisher": "Semgrep",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Scans code for exposed secrets."
  },
  {
    "id": "src-secrets-sweep-aikido-secrets",
    "title": "Aikido Secrets Detection — secrets detection scope",
    "url": "https://www.aikido.dev/code/secrets-detection",
    "canonicalUrl": "https://www.aikido.dev/code/secrets-detection",
    "publisher": "Aikido Security",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Detects exposed secrets and describes live-secret checks."
  },
  {
    "id": "src-secrets-sweep-apiiro-secrets",
    "title": "Apiiro Secrets Security — secrets detection scope",
    "url": "https://apiiro.com/product/guardian-agent/secrets-security",
    "canonicalUrl": "https://apiiro.com/product/guardian-agent/secrets-security",
    "publisher": "Apiiro",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Detects and validates exposed secrets with application context."
  },
  {
    "id": "src-secrets-sweep-cycode-secrets",
    "title": "Cycode Secrets Detection — secrets detection scope",
    "url": "https://cycode.com/hard-coded-secrets-detection/",
    "canonicalUrl": "https://cycode.com/hard-coded-secrets-detection/",
    "publisher": "Cycode",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Scans development environments for hardcoded secrets."
  },
  {
    "id": "src-secrets-sweep-legit-secrets",
    "title": "Legit Secrets Detection — secrets detection scope",
    "url": "https://www.legitsecurity.com/enterprise-secret-scanning",
    "canonicalUrl": "https://www.legitsecurity.com/enterprise-secret-scanning",
    "publisher": "Legit Security",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Detects exposed secrets across development and collaboration surfaces."
  },
  {
    "id": "src-secrets-sweep-ox-secrets",
    "title": "OX Secret and PII Scan — secrets detection scope",
    "url": "https://docs.ox.security/ox-policies/cloud-context-policies-3",
    "canonicalUrl": "https://docs.ox.security/ox-policies/cloud-context-policies-3",
    "publisher": "OX Security",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Documents policies for hardcoded-secret findings."
  },
  {
    "id": "src-secrets-sweep-jit-secrets",
    "title": "Jit Secrets Detection — secrets detection scope",
    "url": "https://www.jit.io/aspm-platform/secrets-detection",
    "canonicalUrl": "https://www.jit.io/aspm-platform/secrets-detection",
    "publisher": "Jit",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Runs Gitleaks and TruffleHog behind its secrets workflow."
  },
  {
    "id": "src-secrets-sweep-endor-secrets",
    "title": "Endor Labs Secrets Detection — secrets detection scope",
    "url": "https://www.endorlabs.com/use-case/secrets-detection",
    "canonicalUrl": "https://www.endorlabs.com/use-case/secrets-detection",
    "publisher": "Endor Labs",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Scans Git history and describes live-secret validation."
  },
  {
    "id": "src-secrets-sweep-arnica-secrets",
    "title": "Arnica Secret Detection — secrets detection scope",
    "url": "https://docs.arnica.io/arnica-documentation/hardcoded-secrets/secret-detection",
    "canonicalUrl": "https://docs.arnica.io/arnica-documentation/hardcoded-secrets/secret-detection",
    "publisher": "Arnica",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Detects hardcoded secrets in repository commits."
  },
  {
    "id": "src-secrets-sweep-xygeni-secrets",
    "title": "Xygeni Secrets Scanner — secrets detection scope",
    "url": "https://docs.xygeni.io/xygeni-products/secrets-security/secrets-scanner",
    "canonicalUrl": "https://docs.xygeni.io/xygeni-products/secrets-security/secrets-scanner",
    "publisher": "Xygeni",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Scans code, text, and Docker images for exposed secrets."
  },
  {
    "id": "src-secrets-sweep-checkmarx-secrets",
    "title": "Checkmarx Secrets Detection — secrets detection scope",
    "url": "https://checkmarx.com/product/secrets-detection/",
    "canonicalUrl": "https://checkmarx.com/product/secrets-detection/",
    "publisher": "Checkmarx",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Detects hardcoded credentials in development workflows."
  },
  {
    "id": "src-secrets-sweep-sonar-secrets",
    "title": "SonarQube secrets detection — secrets detection scope",
    "url": "https://docs.sonarsource.com/sonarqube-server/analyzing-source-code/languages/secrets",
    "canonicalUrl": "https://docs.sonarsource.com/sonarqube-server/analyzing-source-code/languages/secrets",
    "publisher": "Sonar",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Detects secrets in source and language-agnostic configuration files."
  },
  {
    "id": "src-secrets-sweep-jfrog-secrets",
    "title": "JFrog Advanced Security secrets scans — secrets detection scope",
    "url": "https://docs.jfrog.com/security/docs/secrets-scans-1",
    "canonicalUrl": "https://docs.jfrog.com/security/docs/secrets-scans-1",
    "publisher": "JFrog",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Scans source and binary artifacts for exposed secrets."
  },
  {
    "id": "src-secrets-sweep-mend-secrets",
    "title": "Mend SAST Secret Scanning — secrets detection scope",
    "url": "https://docs.mend.io/platform/latest/code-secret-scanning",
    "canonicalUrl": "https://docs.mend.io/platform/latest/code-secret-scanning",
    "publisher": "Mend",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Scans source and configuration files for exposed credentials."
  },
  {
    "id": "src-secrets-sweep-snyk-secrets",
    "title": "Snyk Secrets — secrets detection scope",
    "url": "https://snyk.io/blog/snyk-secrets/",
    "canonicalUrl": "https://snyk.io/blog/snyk-secrets/",
    "publisher": "Snyk",
    "sourceType": "vendor_marketing",
    "publishedAt": "2026-08-04",
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Announces general availability of a dedicated secrets scanner."
  },
  {
    "id": "src-secrets-sweep-datadog-secrets",
    "title": "Datadog Secret Scanning — secrets detection scope",
    "url": "https://www.datadoghq.com/product/secret-scanning/",
    "canonicalUrl": "https://www.datadoghq.com/product/secret-scanning/",
    "publisher": "Datadog",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Scans code for exposed secrets."
  },
  {
    "id": "src-secrets-sweep-harness-ast",
    "title": "Harness Application Security Testing — secrets detection scope",
    "url": "https://www.harness.io/products/application-security-testing",
    "canonicalUrl": "https://www.harness.io/products/application-security-testing",
    "publisher": "Harness",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Lists secrets detection in its application security platform."
  },
  {
    "id": "src-secrets-sweep-spectral-secrets",
    "title": "Spectral Secrets Scanning — secrets detection scope",
    "url": "https://guides.spectralops.io/docs/secrets-scanning",
    "canonicalUrl": "https://guides.spectralops.io/docs/secrets-scanning",
    "publisher": "Check Point",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Scans assets for hardcoded secrets."
  },
  {
    "id": "src-secrets-sweep-infisical-scanning",
    "title": "Infisical Secret Scanning — secrets detection scope",
    "url": "https://infisical.com/videos/what-is-infisical",
    "canonicalUrl": "https://infisical.com/videos/what-is-infisical",
    "publisher": "Infisical",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Documents CLI and repository secret scanning."
  },
  {
    "id": "src-secrets-sweep-wiz-secrets",
    "title": "Wiz secrets scanning — secrets detection scope",
    "url": "https://www.wiz.io/blog/secrets-found-owners-identified-issues-resolved",
    "canonicalUrl": "https://www.wiz.io/blog/secrets-found-owners-identified-issues-resolved",
    "publisher": "Wiz",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Scans Git history, pull requests, and images for exposed secrets."
  },
  {
    "id": "src-secrets-sweep-orca-secrets",
    "title": "Orca secrets detection — secrets detection scope",
    "url": "https://orca.security/platform/application-security/",
    "canonicalUrl": "https://orca.security/platform/application-security/",
    "publisher": "Orca Security",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Lists secrets detection among application security capabilities."
  },
  {
    "id": "src-secrets-sweep-prisma-secrets",
    "title": "Prisma Cloud agentless secrets scanning — secrets detection scope",
    "url": "https://www.paloaltonetworks.com/blog/cloud-security/agentless-secrets-scanning/",
    "canonicalUrl": "https://www.paloaltonetworks.com/blog/cloud-security/agentless-secrets-scanning/",
    "publisher": "Palo Alto Networks",
    "sourceType": "vendor_marketing",
    "publishedAt": "2023-10-10",
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Documents agentless scanning for secrets on workloads."
  },
  {
    "id": "src-secrets-sweep-defender-cloud-secrets",
    "title": "Defender for Cloud secrets scanning — secrets detection scope",
    "url": "https://learn.microsoft.com/en-us/azure/defender-for-cloud/secrets-scanning",
    "canonicalUrl": "https://learn.microsoft.com/en-us/azure/defender-for-cloud/secrets-scanning",
    "publisher": "Microsoft",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Documents multiple types of secrets scanning."
  },
  {
    "id": "src-secrets-sweep-forticnapp-secrets",
    "title": "FortiCNAPP secrets detection — secrets detection scope",
    "url": "https://docs.fortinet.com/document/forticnapp/latest/administration-guide/562942/secrets-detection",
    "canonicalUrl": "https://docs.fortinet.com/document/forticnapp/latest/administration-guide/562942/secrets-detection",
    "publisher": "Fortinet",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Documents secrets scanning in its SCA workflow."
  },
  {
    "id": "src-secrets-sweep-aqua-scanning",
    "title": "Aqua container scanning — secrets detection scope",
    "url": "https://www.aquasec.com/products/container-scanning/",
    "canonicalUrl": "https://www.aquasec.com/products/container-scanning/",
    "publisher": "Aqua Security",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Includes secrets in container/build scanning."
  },
  {
    "id": "src-secrets-sweep-singularity-cloud-secrets",
    "title": "Singularity Cloud Security — secrets detection scope",
    "url": "https://www.sentinelone.com/cloud/",
    "canonicalUrl": "https://www.sentinelone.com/cloud/",
    "publisher": "SentinelOne",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Includes secret scanning in its cloud-security offering."
  },
  {
    "id": "src-secrets-sweep-armorcode-integration",
    "title": "ArmorCode secrets integrations — secrets detection scope",
    "url": "https://www.armorcode.com/integrations",
    "canonicalUrl": "https://www.armorcode.com/integrations",
    "publisher": "ArmorCode",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Lists GitGuardian Secrets as an integration."
  },
  {
    "id": "src-secrets-sweep-vault-radar",
    "title": "Vault Radar — secrets detection scope",
    "url": "https://developer.hashicorp.com/vault-radar",
    "canonicalUrl": "https://developer.hashicorp.com/vault-radar",
    "publisher": "HashiCorp",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Scans code, chat, and other sources for exposed secrets."
  },
  {
    "id": "src-secrets-sweep-akeyless-github-scanner",
    "title": "Akeyless GitHub Scanner — secrets detection scope",
    "url": "https://docs.akeyless.io/docs/github-scanner",
    "canonicalUrl": "https://docs.akeyless.io/docs/github-scanner",
    "publisher": "Akeyless",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Documents secret discovery across GitHub source and history."
  },
  {
    "id": "src-secrets-sweep-nightfall",
    "title": "Nightfall secrets detection — secrets detection scope",
    "url": "https://help.nightfall.ai/developer-api/key-concepts/scanning_features/secrets_detection",
    "canonicalUrl": "https://help.nightfall.ai/developer-api/key-concepts/scanning_features/secrets_detection",
    "publisher": "Nightfall",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Provides secrets detection through its scanning API."
  },
  {
    "id": "src-secrets-sweep-entro-secrets",
    "title": "Entro secrets discovery — secrets detection scope",
    "url": "https://www.sailpoint.com/products/agentic-ai-security",
    "canonicalUrl": "https://www.sailpoint.com/products/agentic-ai-security",
    "publisher": "Entro Security",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: SailPoint's Entro page includes a customer quotation describing automated secret scanning."
  },
  {
    "id": "src-secrets-sweep-codeant-secrets",
    "title": "CodeAnt AI secrets detection — secrets detection scope",
    "url": "https://docs.codeant.ai/control_center/secrets",
    "canonicalUrl": "https://docs.codeant.ai/control_center/secrets",
    "publisher": "CodeAnt AI",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Identifies API keys, tokens, and other secrets in code."
  },
  {
    "id": "src-secrets-sweep-ripsecrets",
    "title": "ripsecrets — secrets detection scope",
    "url": "https://github.com/sirwart/ripsecrets",
    "canonicalUrl": "https://github.com/sirwart/ripsecrets",
    "publisher": "ripsecrets project",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Detects secret keys in source before commit."
  },
  {
    "id": "src-secrets-sweep-shhgit",
    "title": "shhgit — secrets detection scope",
    "url": "https://github.com/eth0izzle/shhgit",
    "canonicalUrl": "https://github.com/eth0izzle/shhgit",
    "publisher": "shhgit project",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Finds secrets in code repositories."
  },
  {
    "id": "src-secrets-sweep-qwiet-secrets",
    "title": "Qwiet AI Secrets v2 — secrets detection scope",
    "url": "https://docs.shiftleft.io/sast/analyzing-applications/secrets",
    "canonicalUrl": "https://docs.shiftleft.io/sast/analyzing-applications/secrets",
    "publisher": "Harness",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Identifies hardcoded secrets during code analysis."
  },
  {
    "id": "src-secrets-sweep-reversinglabs-secrets",
    "title": "ReversingLabs secrets detection — secrets detection scope",
    "url": "https://www.reversinglabs.com/detect-prioritize-manage-exposed-secrets-in-software",
    "canonicalUrl": "https://www.reversinglabs.com/detect-prioritize-manage-exposed-secrets-in-software",
    "publisher": "ReversingLabs",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Detects exposed secrets in software artifacts."
  },
  {
    "id": "src-secrets-sweep-socket-basics",
    "title": "Socket Basics — secrets detection scope",
    "url": "https://github.com/SocketDev/socket-basics",
    "canonicalUrl": "https://github.com/SocketDev/socket-basics",
    "publisher": "Socket",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Runs TruffleHog for secret scanning."
  },
  {
    "id": "src-secrets-sweep-tenable-secrets-connectors",
    "title": "Tenable One secrets connectors — secrets detection scope",
    "url": "https://docs.tenable.com/exposure-management/Content/connectors/connectors-and-supported-integrations.htm",
    "canonicalUrl": "https://docs.tenable.com/exposure-management/Content/connectors/connectors-and-supported-integrations.htm",
    "publisher": "Tenable",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Imports secret-detection findings through supported connectors."
  },
  {
    "id": "src-secrets-sweep-crowdstrike-legit-integration",
    "title": "Falcon / Legit integration — secrets detection scope",
    "url": "https://marketplace.crowdstrike.com/listings/legit-security-platform/",
    "canonicalUrl": "https://marketplace.crowdstrike.com/listings/legit-security-platform/",
    "publisher": "CrowdStrike",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Lists a Legit integration with secrets detection in code."
  },
  {
    "id": "src-secrets-sweep-sysdig-legacy-secrets",
    "title": "Sysdig legacy image secrets scanning — secrets detection scope",
    "url": "https://docs.sysdig.com/en/docs/sysdig-secure/vulnerabilities/scanning/manage-scanning-policies/scanning-policy-gates-and-triggers/",
    "canonicalUrl": "https://docs.sysdig.com/en/docs/sysdig-secure/vulnerabilities/scanning/manage-scanning-policies/scanning-policy-gates-and-triggers/",
    "publisher": "Sysdig",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Legacy scanner documentation describes image-secret detection."
  },
  {
    "id": "src-secrets-sweep-postman-secret-scanner",
    "title": "Postman Secret Scanner — secrets detection scope",
    "url": "https://learning.postman.com/docs/administration/managing-your-team/secret-scanner/overview/",
    "canonicalUrl": "https://learning.postman.com/docs/administration/managing-your-team/secret-scanner/overview/",
    "publisher": "Postman",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-13",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Detects exposed secrets in Postman content."
  },
  {
    "id": "src-secrets-sweep-veracode-container-secrets",
    "title": "Veracode Container and IaC secret rules — secrets detection scope",
    "url": "https://docs.veracode.com/r/Run_Container_Security_scans",
    "canonicalUrl": "https://docs.veracode.com/r/Run_Container_Security_scans",
    "publisher": "Veracode",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-26",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Documents secret rules for container, IaC, directory, and repository scans."
  },
  {
    "id": "src-secrets-sweep-black-duck-secrets",
    "title": "Black Duck Secrets Scanning — secrets detection scope",
    "url": "https://www.blackduck.com/resources/datasheets/secrets-detection.html",
    "canonicalUrl": "https://www.blackduck.com/resources/datasheets/secrets-detection.html",
    "publisher": "Black Duck",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "retrievedAt": "2026-10-26",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Datasheet says the scan looks through source, IaC, and other files for hard-coded secrets."
  },
  {
    "id": "src-secrets-sweep-opentext-sast-secrets",
    "title": "OpenText SAST secrets analyzer — secrets detection scope",
    "url": "https://www.microfocus.com/documentation/fortify-static-code-analyzer-and-tools/2540/sast-ugd-html-25.4.0/doc/2263_25.4/secretscanning.html",
    "canonicalUrl": "https://www.microfocus.com/documentation/fortify-static-code-analyzer-and-tools/2540/sast-ugd-html-25.4.0/doc/2263_25.4/secretscanning.html",
    "publisher": "OpenText",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-26",
    "volatility": "fast",
    "excerpt": "Research paraphrase: One SAST analyzer can find secrets across file types. Configuration is regular-expression analysis."
  },
  {
    "id": "src-secrets-sweep-deepsource-secrets",
    "title": "DeepSource secrets detection — secrets detection scope",
    "url": "https://deepsource.com/docs/product/secrets-detection",
    "canonicalUrl": "https://deepsource.com/docs/product/secrets-detection",
    "publisher": "DeepSource",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-26",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Documents commit scanning for hardcoded credentials. Team or Enterprise is required."
  },
  {
    "id": "src-secrets-sweep-codacy-secrets",
    "title": "Codacy secret detection — secrets detection scope",
    "url": "https://docs.codacy.com/getting-started/supported-languages-and-tools/",
    "canonicalUrl": "https://docs.codacy.com/getting-started/supported-languages-and-tools/",
    "publisher": "Codacy",
    "sourceType": "official_docs",
    "publishedAt": null,
    "retrievedAt": "2026-10-26",
    "volatility": "fast",
    "excerpt": "Research paraphrase: Documents secret detection and names Opengrep, Trivy, Checkov, PMD, Bandit, and Prospector by language."
  }
];

export const secretsSweepClaims: Claim[] = [
  {
    "id": "claim-secrets-sweep-trufflehog",
    "statement": "TruffleHog: Scans for exposed secrets across supported sources.",
    "subjectType": "product",
    "subjectId": "trufflehog",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-trufflehog",
    "sourceUrl": "https://github.com/trufflesecurity/trufflehog",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "OSS and commercial scopes differ. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-gitguardian",
    "statement": "GitGuardian: Provides secrets detection through its platform and CLI.",
    "subjectType": "product",
    "subjectId": "gitguardian",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-gitguardian",
    "sourceUrl": "https://www.gitguardian.com/ggshield",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "CLI is not a standalone offline detection engine. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-ggshield",
    "statement": "ggshield: CLI scans content using the GitGuardian API.",
    "subjectType": "product",
    "subjectId": "ggshield",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-ggshield",
    "sourceUrl": "https://github.com/GitGuardian/ggshield",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Open client does not make the hosted engine open source. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-github-secret-scanning",
    "statement": "GitHub secret scanning: Detects leaked credentials in supported GitHub content.",
    "subjectType": "product",
    "subjectId": "github-secret-scanning",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-github-secret-scanning",
    "sourceUrl": "https://docs.github.com/en/code-security/concepts/secret-security/secret-scanning",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Coverage and licensing depend on repository and plan. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-gitlab-secrets",
    "statement": "GitLab Secret Detection: Provides pipeline and other secret detection workflows.",
    "subjectType": "product",
    "subjectId": "gitlab-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-gitlab-secrets",
    "sourceUrl": "https://docs.gitlab.com/user/application_security/secret_detection/",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Do not assume all workflows use the same engine or tier. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-gitleaks",
    "statement": "Gitleaks: Scans files and Git history for potential secrets.",
    "subjectType": "product",
    "subjectId": "gitleaks",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-gitleaks",
    "sourceUrl": "https://github.com/gitleaks/gitleaks",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Review maintenance status separately from feature support. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-betterleaks",
    "statement": "Betterleaks: Configurable scanner for exposed secrets.",
    "subjectType": "product",
    "subjectId": "betterleaks",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-betterleaks",
    "sourceUrl": "https://github.com/betterleaks/betterleaks",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Separate project from Gitleaks; not a rename. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-kingfisher",
    "statement": "Kingfisher: Detects exposed credentials and supports live validation.",
    "subjectType": "product",
    "subjectId": "kingfisher",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-kingfisher",
    "sourceUrl": "https://github.com/mongodb/kingfisher",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Validation varies by detector; no parity or coverage-count claim. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-noseyparker",
    "statement": "Nosey Parker: Finds secrets in textual data and Git history.",
    "subjectType": "product",
    "subjectId": "noseyparker",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-noseyparker",
    "sourceUrl": "https://github.com/praetorian-inc/noseyparker",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Check repository lifecycle and Titus relationship before adoption. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-titus",
    "statement": "Titus: Detects credentials in source, binaries, and HTTP traffic.",
    "subjectType": "product",
    "subjectId": "titus",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-titus",
    "sourceUrl": "https://github.com/praetorian-inc/titus",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Distinct project from Nosey Parker. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-detect-secrets",
    "statement": "detect-secrets: Detects secrets in code with baselines and plugins.",
    "subjectType": "product",
    "subjectId": "detect-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-detect-secrets",
    "sourceUrl": "https://github.com/Yelp/detect-secrets",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Baseline workflows are not a managed incident response service. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-git-secrets",
    "statement": "git-secrets: Checks Git content against prohibited credential patterns.",
    "subjectType": "product",
    "subjectId": "git-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-git-secrets",
    "sourceUrl": "https://github.com/awslabs/git-secrets",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "AWS patterns do not establish universal secret coverage. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-trivy",
    "statement": "Trivy secret scanner: Finds secrets in plaintext files with built-in and custom rules.",
    "subjectType": "product",
    "subjectId": "trivy",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-trivy",
    "sourceUrl": "https://trivy.dev/docs/latest/guide/scanner/secret/",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Image/filesystem scanning differs from full Git-history scanning. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-checkov",
    "statement": "Checkov secrets scanning: Scans for hardcoded credentials and secrets.",
    "subjectType": "product",
    "subjectId": "checkov",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-checkov",
    "sourceUrl": "https://www.checkov.io/2.Basics/Scanning%20Credentials%20and%20Secrets.html",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Keep OSS features separate from platform services. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-secretlint",
    "statement": "Secretlint: Uses pluggable rules to detect credentials before commit.",
    "subjectType": "product",
    "subjectId": "secretlint",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-secretlint",
    "sourceUrl": "https://github.com/secretlint/secretlint",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Does not automatically remediate secrets. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-deepfence-secret-scanner",
    "statement": "Deepfence SecretScanner: Scans container images and local directories for secrets.",
    "subjectType": "product",
    "subjectId": "deepfence-secret-scanner",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-deepfence-secret-scanner",
    "sourceUrl": "https://github.com/deepfence/SecretScanner",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "No general availability or support SLA inferred. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-talisman",
    "statement": "Talisman: Detects suspicious secret material in Git changesets.",
    "subjectType": "product",
    "subjectId": "talisman",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-talisman",
    "sourceUrl": "https://github.com/thoughtworks/talisman",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Local hooks can be bypassed. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-credential-digger",
    "statement": "Credential Digger: Repository documents hardcoded-credential scanning.",
    "subjectType": "product",
    "subjectId": "credential-digger",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-credential-digger",
    "sourceUrl": "https://github.com/SAP-archive/credential-digger",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Archived lineage; not an active-product recommendation. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-whispers",
    "statement": "Whispers: Finds hardcoded secrets in structured text.",
    "subjectType": "product",
    "subjectId": "whispers",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-whispers",
    "sourceUrl": "https://github.com/Skyscanner/whispers",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Structured-file scope; maintenance must be checked. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-semgrep-secrets",
    "statement": "Semgrep Secrets: Scans code for exposed secrets.",
    "subjectType": "product",
    "subjectId": "semgrep-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-semgrep-secrets",
    "sourceUrl": "https://semgrep.dev/products/semgrep-secrets",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Commercial Secrets features are not implied by OSS Semgrep. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-aikido-secrets",
    "statement": "Aikido Secrets Detection: Detects exposed secrets and describes live-secret checks.",
    "subjectType": "product",
    "subjectId": "aikido-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-aikido-secrets",
    "sourceUrl": "https://www.aikido.dev/code/secrets-detection",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "No independent accuracy comparison inferred. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-apiiro-secrets",
    "statement": "Apiiro Secrets Security: Detects and validates exposed secrets with application context.",
    "subjectType": "product",
    "subjectId": "apiiro-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-apiiro-secrets",
    "sourceUrl": "https://apiiro.com/product/guardian-agent/secrets-security",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Vendor claims are not performance benchmarks. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-cycode-secrets",
    "statement": "Cycode Secrets Detection: Scans development environments for hardcoded secrets.",
    "subjectType": "product",
    "subjectId": "cycode-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-cycode-secrets",
    "sourceUrl": "https://cycode.com/hard-coded-secrets-detection/",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Confirm connectors and edition during evaluation. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-legit-secrets",
    "statement": "Legit Secrets Detection: Detects exposed secrets across development and collaboration surfaces.",
    "subjectType": "product",
    "subjectId": "legit-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-legit-secrets",
    "sourceUrl": "https://www.legitsecurity.com/enterprise-secret-scanning",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Validate each connector and deployment scope. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-ox-secrets",
    "statement": "OX Secret and PII Scan: Documents policies for hardcoded-secret findings.",
    "subjectType": "product",
    "subjectId": "ox-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-ox-secrets",
    "sourceUrl": "https://docs.ox.security/ox-policies/cloud-context-policies-3",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Native scan and imported scanner findings must be distinguished. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-jit-secrets",
    "statement": "Jit Secrets Detection: Runs Gitleaks and TruffleHog behind its secrets workflow.",
    "subjectType": "product",
    "subjectId": "jit-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-jit-secrets",
    "sourceUrl": "https://www.jit.io/aspm-platform/secrets-detection",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "low",
    "verificationStatus": "needs_review",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Bundled engines; not a separately proven proprietary scanner. Full-page capability evidence unavailable on this pass; search-index evidence only, not a published capability check. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-endor-secrets",
    "statement": "Endor Labs Secrets Detection: Scans Git history and describes live-secret validation.",
    "subjectType": "product",
    "subjectId": "endor-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-endor-secrets",
    "sourceUrl": "https://www.endorlabs.com/use-case/secrets-detection",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Validation support is provider-specific. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-arnica-secrets",
    "statement": "Arnica Secret Detection: Detects hardcoded secrets in repository commits.",
    "subjectType": "product",
    "subjectId": "arnica-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-arnica-secrets",
    "sourceUrl": "https://docs.arnica.io/arnica-documentation/hardcoded-secrets/secret-detection",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Older policy docs disagree with newer PR-scanning announcement; do not assert PR coverage here. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-xygeni-secrets",
    "statement": "Xygeni Secrets Scanner: Scans code, text, and Docker images for exposed secrets.",
    "subjectType": "product",
    "subjectId": "xygeni-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-xygeni-secrets",
    "sourceUrl": "https://docs.xygeni.io/xygeni-products/secrets-security/secrets-scanner",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Validation and historical scanning are separate evaluation dimensions. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-checkmarx-secrets",
    "statement": "Checkmarx Secrets Detection: Detects hardcoded credentials in development workflows.",
    "subjectType": "product",
    "subjectId": "checkmarx-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-checkmarx-secrets",
    "sourceUrl": "https://checkmarx.com/product/secrets-detection/",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Confirm packaging and IDE support. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-sonar-secrets",
    "statement": "SonarQube secrets detection: Detects secrets in source and language-agnostic configuration files.",
    "subjectType": "product",
    "subjectId": "sonar-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-sonar-secrets",
    "sourceUrl": "https://docs.sonarsource.com/sonarqube-server/analyzing-source-code/languages/secrets",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Custom rules and feature breadth vary by edition. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-jfrog-secrets",
    "statement": "JFrog Advanced Security secrets scans: Scans source and binary artifacts for exposed secrets.",
    "subjectType": "product",
    "subjectId": "jfrog-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-jfrog-secrets",
    "sourceUrl": "https://docs.jfrog.com/security/docs/secrets-scans-1",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Advanced Security packaging and validation egress need review. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-mend-secrets",
    "statement": "Mend SAST Secret Scanning: Scans source and configuration files for exposed credentials.",
    "subjectType": "product",
    "subjectId": "mend-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-mend-secrets",
    "sourceUrl": "https://docs.mend.io/platform/latest/code-secret-scanning",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "CLI option is disabled when unspecified; documentation says detected secrets are not anonymized. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-snyk-secrets",
    "statement": "Snyk Secrets: Announces general availability of a dedicated secrets scanner.",
    "subjectType": "product",
    "subjectId": "snyk-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-snyk-secrets",
    "sourceUrl": "https://snyk.io/blog/snyk-secrets/",
    "sourceType": "vendor_marketing",
    "publishedAt": "2026-08-04",
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "2026-08-04 announcement; older Snyk feature comparisons may be stale. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-datadog-secrets",
    "statement": "Datadog Secret Scanning: Scans code for exposed secrets.",
    "subjectType": "product",
    "subjectId": "datadog-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-datadog-secrets",
    "sourceUrl": "https://www.datadoghq.com/product/secret-scanning/",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Check site availability and Code Security configuration. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-harness-ast",
    "statement": "Harness Application Security Testing: Lists secrets detection in its application security platform.",
    "subjectType": "product",
    "subjectId": "harness-ast",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-harness-ast",
    "sourceUrl": "https://www.harness.io/products/application-security-testing",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Do not equate orchestration integrations with native engines. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-spectral-secrets",
    "statement": "Spectral Secrets Scanning: Scans assets for hardcoded secrets.",
    "subjectType": "product",
    "subjectId": "spectral-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-spectral-secrets",
    "sourceUrl": "https://guides.spectralops.io/docs/secrets-scanning",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Spectral product lineage; confirm current Check Point packaging. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-infisical-scanning",
    "statement": "Infisical Secret Scanning: Documents CLI and repository secret scanning.",
    "subjectType": "product",
    "subjectId": "infisical-scanning",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-infisical-scanning",
    "sourceUrl": "https://infisical.com/videos/what-is-infisical",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Detection is a separate capability from vault storage. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-wiz-secrets",
    "statement": "Wiz secrets scanning: Scans Git history, pull requests, and images for exposed secrets.",
    "subjectType": "product",
    "subjectId": "wiz-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-wiz-secrets",
    "sourceUrl": "https://www.wiz.io/blog/secrets-found-owners-identified-issues-resolved",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "CNAPP scope is not implied for every CSPM product. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-orca-secrets",
    "statement": "Orca secrets detection: Lists secrets detection among application security capabilities.",
    "subjectType": "product",
    "subjectId": "orca-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-orca-secrets",
    "sourceUrl": "https://orca.security/platform/application-security/",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Use source-code and workload scope as separate evaluation dimensions. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-prisma-secrets",
    "statement": "Prisma Cloud agentless secrets scanning: Documents agentless scanning for secrets on workloads.",
    "subjectType": "product",
    "subjectId": "prisma-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-prisma-secrets",
    "sourceUrl": "https://www.paloaltonetworks.com/blog/cloud-security/agentless-secrets-scanning/",
    "sourceType": "vendor_marketing",
    "publishedAt": "2023-10-10",
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Historical product documentation; confirm current Cortex/Prisma packaging. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-defender-cloud-secrets",
    "statement": "Defender for Cloud secrets scanning: Documents multiple types of secrets scanning.",
    "subjectType": "product",
    "subjectId": "defender-cloud-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-defender-cloud-secrets",
    "sourceUrl": "https://learn.microsoft.com/en-us/azure/defender-for-cloud/secrets-scanning",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Repository integrations differ from native VM/deployment scanning. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-forticnapp-secrets",
    "statement": "FortiCNAPP secrets detection: Documents secrets scanning in its SCA workflow.",
    "subjectType": "product",
    "subjectId": "forticnapp-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-forticnapp-secrets",
    "sourceUrl": "https://docs.fortinet.com/document/forticnapp/latest/administration-guide/562942/secrets-detection",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "low",
    "verificationStatus": "needs_review",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Separate code scanning from agentless workload coverage. Full-page capability evidence unavailable on this pass; search-index evidence only, not a published capability check. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-aqua-scanning",
    "statement": "Aqua container scanning: Includes secrets in container/build scanning.",
    "subjectType": "product",
    "subjectId": "aqua-scanning",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-aqua-scanning",
    "sourceUrl": "https://www.aquasec.com/products/container-scanning/",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Commercial Aqua and OSS Trivy are separate product records. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-singularity-cloud-secrets",
    "statement": "Singularity Cloud Security: Includes secret scanning in its cloud-security offering.",
    "subjectType": "product",
    "subjectId": "singularity-cloud-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-singularity-cloud-secrets",
    "sourceUrl": "https://www.sentinelone.com/cloud/",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "low",
    "verificationStatus": "needs_review",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Do not attribute this to Singularity identity protection. Full-page capability evidence unavailable on this pass; search-index evidence only, not a published capability check. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-armorcode-integration",
    "statement": "ArmorCode secrets integrations: Lists GitGuardian Secrets as an integration.",
    "subjectType": "product",
    "subjectId": "armorcode-integration",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-armorcode-integration",
    "sourceUrl": "https://www.armorcode.com/integrations",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Evidence of ingestion, not proof of a native detector. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-vault-radar",
    "statement": "Vault Radar: Scans code, chat, and other sources for exposed secrets.",
    "subjectType": "product",
    "subjectId": "vault-radar",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-vault-radar",
    "sourceUrl": "https://developer.hashicorp.com/vault-radar",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Separate from Vault secret storage and issuance. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-akeyless-github-scanner",
    "statement": "Akeyless GitHub Scanner: Documents secret discovery across GitHub source and history.",
    "subjectType": "product",
    "subjectId": "akeyless-github-scanner",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-akeyless-github-scanner",
    "sourceUrl": "https://docs.akeyless.io/docs/github-scanner",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Requires Identity & Secrets Intelligence license and configured gateway; code scanning and inventory metadata are distinct. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-nightfall",
    "statement": "Nightfall secrets detection: Provides secrets detection through its scanning API.",
    "subjectType": "product",
    "subjectId": "nightfall",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-nightfall",
    "sourceUrl": "https://help.nightfall.ai/developer-api/key-concepts/scanning_features/secrets_detection",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "API detection is not automatically full Git-history scanning. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-entro-secrets",
    "statement": "Entro secrets discovery: SailPoint's Entro page includes a customer quotation describing automated secret scanning.",
    "subjectType": "product",
    "subjectId": "entro-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-entro-secrets",
    "sourceUrl": "https://www.sailpoint.com/products/agentic-ai-security",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "low",
    "verificationStatus": "needs_review",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Customer quotation on vendor site; older Entro URL redirects here. Broader scanning scope and acquisition close date not established. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-codeant-secrets",
    "statement": "CodeAnt AI secrets detection: Identifies API keys, tokens, and other secrets in code.",
    "subjectType": "product",
    "subjectId": "codeant-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-codeant-secrets",
    "sourceUrl": "https://docs.codeant.ai/control_center/secrets",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Confirm scanner engine, retention, and licensing. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-ripsecrets",
    "statement": "ripsecrets: Detects secret keys in source before commit.",
    "subjectType": "product",
    "subjectId": "ripsecrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-ripsecrets",
    "sourceUrl": "https://github.com/sirwart/ripsecrets",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Community project; no commercial support inferred. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-shhgit",
    "statement": "shhgit: Finds secrets in code repositories.",
    "subjectType": "product",
    "subjectId": "shhgit",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-shhgit",
    "sourceUrl": "https://github.com/eth0izzle/shhgit",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Repository-monitoring scope; maintenance requires review. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-qwiet-secrets",
    "statement": "Qwiet AI Secrets v2: Identifies hardcoded secrets during code analysis.",
    "subjectType": "product",
    "subjectId": "qwiet-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-qwiet-secrets",
    "sourceUrl": "https://docs.shiftleft.io/sast/analyzing-applications/secrets",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Docs label this Qwiet AI by Harness; distinct product lineage. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-reversinglabs-secrets",
    "statement": "ReversingLabs secrets detection: Detects exposed secrets in software artifacts.",
    "subjectType": "product",
    "subjectId": "reversinglabs-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-reversinglabs-secrets",
    "sourceUrl": "https://www.reversinglabs.com/detect-prioritize-manage-exposed-secrets-in-software",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Current packaging needs validation; no superiority claim adopted. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-socket-basics",
    "statement": "Socket Basics: Runs TruffleHog for secret scanning.",
    "subjectType": "product",
    "subjectId": "socket-basics",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-socket-basics",
    "sourceUrl": "https://github.com/SocketDev/socket-basics",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Bundled scanner; Socket SCA alone is not proof of this capability. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-tenable-secrets-connectors",
    "statement": "Tenable One secrets connectors: Imports secret-detection findings through supported connectors.",
    "subjectType": "product",
    "subjectId": "tenable-secrets-connectors",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-tenable-secrets-connectors",
    "sourceUrl": "https://docs.tenable.com/exposure-management/Content/connectors/connectors-and-supported-integrations.htm",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "This source does not establish native cloud secret-scanner scope. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-crowdstrike-legit-integration",
    "statement": "Falcon / Legit integration: Lists a Legit integration with secrets detection in code.",
    "subjectType": "product",
    "subjectId": "crowdstrike-legit-integration",
    "capabilityId": null,
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-crowdstrike-legit-integration",
    "sourceUrl": "https://marketplace.crowdstrike.com/listings/legit-security-platform/",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Partner capability; not evidence of a native Falcon detector. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-sysdig-legacy-secrets",
    "statement": "Sysdig legacy image secrets scanning: Legacy scanner documentation describes image-secret detection.",
    "subjectType": "product",
    "subjectId": "sysdig-legacy-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-sysdig-legacy-secrets",
    "sourceUrl": "https://docs.sysdig.com/en/docs/sysdig-secure/vulnerabilities/scanning/manage-scanning-policies/scanning-policy-gates-and-triggers/",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "low",
    "verificationStatus": "needs_review",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Source states legacy engine end of life was 2024-12-31; current replacement capability remains unknown. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-postman-secret-scanner",
    "statement": "Postman Secret Scanner: Detects exposed secrets in Postman content.",
    "subjectType": "product",
    "subjectId": "postman-secret-scanner",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-postman-secret-scanner",
    "sourceUrl": "https://learning.postman.com/docs/administration/managing-your-team/secret-scanner/overview/",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-13",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-13",
    "conflictsWith": [],
    "notes": "Confirm public/private workspace coverage and plan. Public documentation review only; no scanner benchmark or tenant test. Original sources retained as links and short paraphrases; no redistribution of full source pages."
  },
  {
    "id": "claim-secrets-sweep-veracode-container-secrets",
    "statement": "Veracode documents secret rules for Container and IaC Security scans of images, directories, and repositories, including listed provider keys and customer regular expressions.",
    "subjectType": "product",
    "subjectId": "veracode-container-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-veracode-container-secrets",
    "sourceUrl": "https://docs.veracode.com/r/Run_Container_Security_scans",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-26",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-26",
    "conflictsWith": [],
    "notes": "SAST findings for CWE-259 and CWE-798 are a different engine and are not this record. The same page lists paths the CLI does not scan. Validity checks are not described. The docs footer said last updated 20 Oct 2026; that is not treated as the feature publication date. Public documentation review only; no scanner benchmark or tenant test."
  },
  {
    "id": "claim-secrets-sweep-black-duck-secrets",
    "statement": "Black Duck's secrets-scanning datasheet says the scan analyzes source code, infrastructure-as-code templates, and other file types for hard-coded secrets.",
    "subjectType": "product",
    "subjectId": "black-duck-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-black-duck-secrets",
    "sourceUrl": "https://www.blackduck.com/resources/datasheets/secrets-detection.html",
    "sourceType": "vendor_marketing",
    "publishedAt": null,
    "observedAt": "2026-10-26",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-26",
    "conflictsWith": [],
    "notes": "Datasheet only. Edition, detector list, Git history, and validity checks are not stated. Polaris release notes describe a Sigma hardcoded_secrets static-analysis checker; that checker is not this claim. The catalog synopsys record stays a separate shortlist name. Publisher-reported, not independently tested."
  },
  {
    "id": "claim-secrets-sweep-opentext-sast-secrets",
    "statement": "OpenText SAST documentation says one of its analyzers can find secrets across file types, and points configuration to regular-expression analysis.",
    "subjectType": "product",
    "subjectId": "opentext-sast-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-opentext-sast-secrets",
    "sourceUrl": "https://www.microfocus.com/documentation/fortify-static-code-analyzer-and-tools/2540/sast-ugd-html-25.4.0/doc/2263_25.4/secretscanning.html",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-26",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-26",
    "conflictsWith": [],
    "notes": "Documentation set labeled 25.4.0. This is an analyzer inside OpenText SAST, not a separate secrets product. The page does not describe Git-history scanning or validity checks. A marketing count of secret types is not part of this source. Public documentation review only; no scanner benchmark or tenant test."
  },
  {
    "id": "claim-secrets-sweep-deepsource-secrets",
    "statement": "DeepSource documents secrets detection that scans commits for hardcoded credentials, using pattern matching and a classification model named Narada. The page says the feature requires a Team or Enterprise plan.",
    "subjectType": "product",
    "subjectId": "deepsource-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-deepsource-secrets",
    "sourceUrl": "https://deepsource.com/docs/product/secrets-detection",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-26",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-26",
    "conflictsWith": [],
    "notes": "The same page publishes precision, recall, and false-positive percentages. Those figures are vendor benchmarks and are not adopted. Validity checks are not described. Publisher-reported, not independently tested; no scanner benchmark or tenant test was run for this record."
  },
  {
    "id": "claim-secrets-sweep-codacy-secrets",
    "statement": "Codacy documents secret detection as a scan type and names Opengrep, Trivy, Checkov, PMD, Bandit, and Prospector as the tools used for that scan, depending on the language.",
    "subjectType": "product",
    "subjectId": "codacy-secrets",
    "capabilityId": "cap-secret-discovery",
    "polarity": "asserts",
    "sourceId": "src-secrets-sweep-codacy-secrets",
    "sourceUrl": "https://docs.codacy.com/getting-started/supported-languages-and-tools/",
    "sourceType": "official_docs",
    "publishedAt": null,
    "observedAt": "2026-10-26",
    "effectiveFrom": null,
    "effectiveTo": null,
    "confidence": "medium",
    "verificationStatus": "vendor_published",
    "lastCheckedAt": "2026-10-26",
    "conflictsWith": [],
    "notes": "Scans run when code is pushed, not continuously. Named tools differ by language. This is not evidence of a Codacy-authored detector, a validity check, or full Git-history scanning. Public documentation review only; no scanner benchmark or tenant test."
  }
];

const detectionVendorIds = new Set([
  "aikido",
  "akeyless",
  "amazon-web-services",
  "apiiro",
  "aqua",
  "arnica",
  "black-duck",
  "checkmarx",
  "checkpoint",
  "codacy",
  "codeant",
  "cycode",
  "datadog",
  "deepfence",
  "deepsource",
  "endor-labs",
  "entro",
  "fortinet",
  "gitguardian",
  "github",
  "gitlab",
  "gitleaks",
  "harness",
  "hashicorp",
  "infisical",
  "jfrog",
  "jit",
  "legit-security",
  "mend",
  "microsoft",
  "mongodb",
  "nightfall",
  "opentext",
  "orca-security",
  "ox-security",
  "palo-alto-networks",
  "postman",
  "praetorian",
  "reversinglabs",
  "ripsecrets",
  "sap",
  "secretlint",
  "semgrep",
  "sentinelone",
  "shhgit",
  "skyscanner",
  "snyk",
  "socket",
  "sonarsource",
  "sysdig",
  "thoughtworks",
  "truffle-security",
  "veracode",
  "wiz",
  "xygeni",
  "yelp"
]);

export function includeSecretsDetection(vendor: Vendor): Vendor {
  if (!detectionVendorIds.has(vendor.id) || vendor.primaryCategoryIds.includes("secrets-detection") || vendor.adjacentCategoryIds.includes("secrets-detection")) return vendor;
  return { ...vendor, adjacentCategoryIds: [...vendor.adjacentCategoryIds, "secrets-detection"] };
}
