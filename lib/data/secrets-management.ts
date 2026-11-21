import type { Product, Vendor } from "../schema";
import type { ProductEvidence } from "./public-monitoring";

export const secretsManagementVendors: Vendor[] = [
  {
    id: "pulumi", slug: "pulumi", name: "Pulumi", formerNames: [], website: "https://www.pulumi.com/",
    positioning: "Pulumi offers ESC to assemble environment configuration and supply consumers with authorized secrets.", primaryCategoryIds: ["secrets-management"], adjacentCategoryIds: [],
    identityScopes: ["nhi"],
    verificationStatus: "research_candidate", openQuestions: ["Which identities can open each environment and which values will be delivered?"],
  },
  {
    id: "openbao", slug: "openbao", name: "OpenBao", formerNames: [], website: "https://openbao.org/",
    positioning: "The OpenBao project documents a database secrets engine that issues credentials from configured roles.", primaryCategoryIds: ["secrets-management"], adjacentCategoryIds: [],
    identityScopes: ["nhi"],
    verificationStatus: "research_candidate", openQuestions: ["Who owns database plugins, service availability and failed revocations?"],
  },
];

export const secretsManagementProducts: Product[] = [
  {
    id: "pulumi-esc", slug: "pulumi-esc", vendorId: "pulumi", name: "Pulumi ESC",
    positioning: "Pulumi ESC resolves imports, retrieves provider values and decrypts authorized secrets when a consumer opens an environment.", primaryCategoryIds: ["secrets-management"], adjacentCategoryIds: [],
    useCaseIds: ["uc-vault"], deployment: ["unknown"],
    identityScopes: ["nhi"], availability: "unknown",
    availabilityNote: "Confirm the consumer’s permissions and whether that consumer retains a copy after the environment closes.", officialUrl: "https://www.pulumi.com/docs/esc/concepts/environments/",
  },
  {
    id: "openbao", slug: "openbao", vendorId: "openbao", name: "OpenBao",
    positioning: "OpenBao documents role-based issuance of database credentials through database plugins and its leasing mechanism.", primaryCategoryIds: ["secrets-management"], adjacentCategoryIds: [],
    useCaseIds: ["uc-vault"], deployment: ["unknown"],
    identityScopes: ["nhi"], availability: "unknown",
    availabilityNote: "Confirm plugin support and who operates the service, monitors revocation and handles failures.", officialUrl: "https://openbao.org/docs/secrets/databases/",
  },
];

const entries: ProductEvidence[] = [
  {
    key: "aws-runtime-store", productId: "aws-secrets-manager", publisher: "Amazon Web Services", title: "What is AWS Secrets Manager?",
    url: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html", type: "official_docs",
    section: "Runtime retrieval",
    statement: "AWS Secrets Manager stores application credentials and supports retrieving them at runtime through the service.",
    caveat: "The application needs an authorized identity. Moving a value into the store leaves any previously exposed issuer credential active.",
  },
  {
    key: "azure-vault-storage", productId: "azure-key-vault", publisher: "Microsoft", title: "About Azure Key Vault secrets",
    url: "https://learn.microsoft.com/en-us/azure/key-vault/secrets/about-secrets", type: "official_docs",
    section: "Secret storage and encryption",
    statement: "Azure Key Vault stores secret values encrypted at rest and decrypts them for authorized reads.",
    caveat: "Confirm how the application authenticates and which identities may read each secret.",
  },
  {
    key: "google-secret-versions", productId: "google-secret-manager", publisher: "Google Cloud", title: "Secret Manager overview",
    url: "https://docs.cloud.google.com/secret-manager/docs/overview", type: "official_docs",
    section: "Secrets and secret versions",
    statement: "Google Secret Manager stores values in secret versions. Consumers can reference a version, and administrators can disable or destroy versions.",
    caveat: "Disabling a stored version affects retrieval from Secret Manager. Confirm issuer-side revocation separately.",
  },
  {
    key: "doppler-kubernetes", productId: "doppler", publisher: "Doppler", title: "Syncing Secrets",
    url: "https://docs.doppler.com/docs/doppler-k8s-operator-syncing-secrets", type: "official_docs",
    section: "Managed Kubernetes Secret and destination namespace",
    statement: "The Doppler operator synchronizes configured values into a managed Kubernetes Secret in the specified namespace.",
    caveat: "Check cluster-level access to the resulting copy and how the application reloads changed values.",
  },
  {
    key: "pulumi-environments", productId: "pulumi-esc", publisher: "Pulumi", title: "Pulumi ESC environments",
    url: "https://www.pulumi.com/docs/esc/concepts/environments/", type: "official_docs",
    section: "Opening an environment",
    statement: "Pulumi ESC resolves imports, retrieves provider values and decrypts authorized secrets when a consumer opens an environment.",
    caveat: "Confirm the consumer’s permissions and whether that consumer retains a copy after the environment closes.",
  },
  {
    key: "aws-target-rotation", productId: "aws-secrets-manager", publisher: "Amazon Web Services", title: "Rotate AWS Secrets Manager secrets",
    url: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html", type: "official_docs",
    section: "Managed and Lambda rotation",
    statement: "AWS documents managed rotation for supported services and a Lambda rotation path that updates both the stored secret and the target service.",
    caveat: "The rotation method depends on the integration. Test client reloads, failure recovery and the old credential’s status.",
  },
  {
    key: "infisical-rotation", productId: "infisical", publisher: "Infisical", title: "Secret rotation",
    url: "https://infisical.com/docs/documentation/platform/secret-rotation/overview", type: "official_docs",
    section: "Single-phase and database credential rotations",
    statement: "Infisical documents overlapping database credential rotations using two pre-created users, and single-phase rotation for providers that allow only one active credential.",
    caveat: "Confirm the provider and rotation mode. With single-phase rotation the application can lose access until it loads the replacement.",
  },
  {
    key: "google-rotation-schedules", productId: "google-secret-manager", publisher: "Google Cloud", title: "About rotation schedules",
    url: "https://docs.cloud.google.com/secret-manager/docs/rotation-recommendations", type: "official_docs",
    section: "Rotation schedules and Pub/Sub",
    statement: "Google Secret Manager can send a Pub/Sub notification when a secret is due for rotation. A subscriber must carry out the target credential change.",
    caveat: "A delivered notification is insufficient to confirm the issuer changed the value or consumers adopted it.",
  },
  {
    key: "vault-database", productId: "vault", publisher: "HashiCorp", title: "Database secrets engine",
    url: "https://developer.hashicorp.com/vault/docs/secrets/databases", type: "official_docs",
    section: "Database credentials and leasing",
    statement: "Vault’s database secrets engine issues credentials from configured database roles and associates dynamic credentials with leases.",
    caveat: "Confirm the database plugin, privileges and how an application handles lease expiry.", capabilityId: "cap-dynamic-secrets",
  },
  {
    key: "openbao-database", productId: "openbao", publisher: "OpenBao", title: "Databases",
    url: "https://openbao.org/docs/secrets/databases/", type: "official_docs",
    section: "Database secrets engine and leasing",
    statement: "OpenBao documents role-based issuance of database credentials through database plugins and its leasing mechanism.",
    caveat: "Confirm plugin support and who operates the service, monitors revocation and handles failures.", capabilityId: "cap-dynamic-secrets",
  },
  {
    key: "akeyless-database", productId: "akeyless", publisher: "Akeyless", title: "Database Dynamic Secrets",
    url: "https://docs.akeyless.io/docs/create-dynamic-secret-to-sql-db", type: "official_docs",
    section: "Database target permissions and user TTL",
    statement: "Akeyless documents creating temporary database users or roles and removing them when their configured lifetime expires.",
    caveat: "A database target needs permissions to create and revoke the temporary access. Confirm the target type and failure behavior.", capabilityId: "cap-dynamic-secrets",
  },
  {
    key: "entra-federated-trust", productId: "entra-workload-id", publisher: "Microsoft", title: "Workload identity federation",
    url: "https://learn.microsoft.com/en-us/entra/workload-id/workload-identity-federation", type: "official_docs",
    section: "Trusting tokens from an external identity provider",
    statement: "Microsoft Entra can trust tokens from an external identity provider for a workload, including GitHub Actions, to access Entra-protected resources without storing an application secret.",
    caveat: "Access depends on the configured trust relationship. Remove the old credential separately after validating the migration.", capabilityId: "cap-workload-federation",
  },
  {
    key: "google-pipeline-federation", productId: "gcp-workload-identity-federation", publisher: "Google Cloud", title: "Workload Identity Federation with deployment pipelines",
    url: "https://docs.cloud.google.com/iam/docs/workload-identity-federation-with-deployment-pipelines", type: "official_docs",
    section: "Deployment pipeline OIDC tokens",
    statement: "Google documents exchanging deployment pipeline OIDC tokens for short-lived Google Cloud credentials so the pipeline can run without a service account key.",
    caveat: "The trust configuration must identify the intended workload. A third-party service that still requires its own API key needs separate handling.", capabilityId: "cap-workload-federation",
  },
  {
    key: "aws-secret-events", productId: "aws-secrets-manager", publisher: "Amazon Web Services", title: "Log AWS Secrets Manager events with AWS CloudTrail",
    url: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/monitoring-cloudtrail.html", type: "official_docs",
    section: "Recorded Secrets Manager API events",
    statement: "CloudTrail records Secrets Manager API calls, including calls from the console, and several rotation and deletion events.",
    caveat: "A secret read records access to the store. Check the target service’s logs to establish whether the credential was used.",
  },
  {
    key: "google-secret-read-events", productId: "google-secret-manager", publisher: "Google Cloud", title: "Secret Manager audit logging",
    url: "https://docs.cloud.google.com/secret-manager/docs/audit-logging", type: "official_docs",
    section: "Data Access methods, AccessSecretVersion",
    statement: "Google classifies AccessSecretVersion as a Data Access audit event, allowing teams with the relevant logs to investigate reads of secret versions.",
    caveat: "Confirm Data Access logging, retention and access in the buyer’s project before promising historical evidence.",
  },
];

export const secretsManagementResearch = { prefix: "management", checked: "2026-11-20", entries };
