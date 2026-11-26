import type { Claim, Product, Source, Vendor } from "../schema";

// UTC date the cited passages were inspected. This is a vendor-literature review.
export const publicMonitoringChecked = "2026-11-20";

export const publicMonitoringVendors: Vendor[] = [{
  id: "flare", slug: "flare", name: "Flare", formerNames: [], website: "https://flare.io/",
  positioning: "Flare provides external threat intelligence. Analysts can investigate company code found in public repositories and account credentials reported in breaches.",
  primaryCategoryIds: ["threat-intelligence"], adjacentCategoryIds: ["digital-risk-protection"],
  identityScopes: ["human"], verificationStatus: "research_candidate",
  openQuestions: ["Which identifiers link a public repository finding to the company?", "Which types of exposed credentials can the team confirm and route to an owner?"],
}, {
  id: "socradar", slug: "socradar", name: "SOCRadar", formerNames: [], website: "https://socradar.io/",
  positioning: "SOCRadar monitors external threats. Its Brand Protection offering covers impersonation and its public-code monitoring can flag exposed company material.",
  primaryCategoryIds: ["threat-intelligence"], adjacentCategoryIds: ["digital-risk-protection", "external-attack-surface"],
  identityScopes: ["human", "nhi"], verificationStatus: "research_candidate",
  openQuestions: ["How does an analyst establish that a public key belongs to the company?", "Which takedowns are included in the contract?"],
}, {
  id: "group-ib", slug: "group-ib", name: "Group-IB", formerNames: [], website: "https://www.group-ib.com/",
  positioning: "Group-IB offers digital risk protection for companies dealing with suspicious domains and misuse of their trademarks.",
  primaryCategoryIds: ["threat-intelligence"], adjacentCategoryIds: ["digital-risk-protection", "external-attack-surface"],
  identityScopes: ["not_an_identity_control"], verificationStatus: "research_candidate",
  openQuestions: ["Who authorizes a trademark complaint?", "What evidence confirms a reported site came down?"],
}, {
  id: "searchlight-cyber", slug: "searchlight-cyber", name: "Searchlight Cyber", formerNames: [], website: "https://www.slcyber.io/",
  positioning: "Searchlight Cyber provides threat intelligence that connects external activity, including credentials in circulation, to an organization.",
  primaryCategoryIds: ["threat-intelligence"], adjacentCategoryIds: ["external-attack-surface", "itdr"],
  identityScopes: ["human"], verificationStatus: "research_candidate",
  openQuestions: ["Which customer identifier matched the finding?", "What evidence does the identity team receive?"],
}, {
  id: "outpost24", slug: "outpost24", name: "Outpost24", formerNames: [], website: "https://outpost24.com/",
  positioning: "Outpost24 offers external asset discovery and threat intelligence modules for investigating exposed company information.",
  primaryCategoryIds: ["external-attack-surface"], adjacentCategoryIds: [], identityScopes: ["not_an_identity_control"],
  verificationStatus: "research_candidate", openQuestions: ["Which organization identifiers help distinguish the customer’s documents from a similar company’s material?"],
}, {
  id: "wallarm", slug: "wallarm", name: "Wallarm", formerNames: [], website: "https://www.wallarm.com/",
  positioning: "Wallarm offers API security tools, including discovery of API hosts visible from outside an organization.",
  primaryCategoryIds: ["api-security"], adjacentCategoryIds: [], identityScopes: ["not_an_identity_control"],
  verificationStatus: "research_candidate", openQuestions: ["How does the customer confirm the ownership of a newly discovered API host?"],
}, {
  id: "detectify", slug: "detectify", name: "Detectify", formerNames: [], website: "https://detectify.com/",
  positioning: "Detectify monitors internet-facing assets and reports DNS records that can outlive the services they reference.",
  primaryCategoryIds: ["external-attack-surface"], adjacentCategoryIds: [], identityScopes: ["not_an_identity_control"],
  verificationStatus: "research_candidate", openQuestions: ["What evidence ties the record to the service that was retired?"],
}, {
  id: "sonatype", slug: "sonatype", name: "Sonatype", formerNames: [], website: "https://www.sonatype.com/",
  positioning: "Sonatype helps software teams review the open source components requested by their developers and build systems.",
  primaryCategoryIds: ["software-supply-chain"], adjacentCategoryIds: [], identityScopes: ["not_an_identity_control"],
  verificationStatus: "research_candidate", openQuestions: ["Which developer and build request paths are covered by the customer’s configuration?"],
},
  {
    id: "sslmate", slug: "sslmate", name: "SSLMate", formerNames: [], website: "https://sslmate.com/",
    positioning: "SSLMate offers Cert Spotter for domain owners who want to review unexpected certificate issuance.", primaryCategoryIds: ["external-attack-surface"], adjacentCategoryIds: [],
    identityScopes: ["not_an_identity_control"],
    verificationStatus: "research_candidate", openQuestions: ["Which certificate authorities and issuance patterns should the customer explicitly trust?"],
  },
  {
    id: "upguard", slug: "upguard", name: "UpGuard", formerNames: [], website: "https://www.upguard.com/",
    positioning: "UpGuard gives third-party risk teams a way to monitor suppliers and track requests for remediation.", primaryCategoryIds: ["third-party-risk"], adjacentCategoryIds: [],
    identityScopes: ["not_an_identity_control"],
    verificationStatus: "research_candidate", openQuestions: ["Which suppliers and business units belong in the monitored portfolio?"],
  },
  {
    id: "cybelangel", slug: "cybelangel", name: "CybelAngel", formerNames: [], website: "https://cybelangel.com/",
    positioning: "CybelAngel investigates exposed company material and provides analyst reports that help an owner identify the leak.", primaryCategoryIds: ["digital-risk-protection"], adjacentCategoryIds: [],
    identityScopes: ["not_an_identity_control"],
    verificationStatus: "research_candidate", openQuestions: ["Which matching signals link a reported document or repository to the customer?"],
  },
  {
    id: "netcraft", slug: "netcraft", name: "Netcraft", formerNames: [], website: "https://www.netcraft.com/",
    positioning: "Netcraft provides brand protection services for detecting phishing and coordinating site takedowns.", primaryCategoryIds: ["digital-risk-protection"], adjacentCategoryIds: [],
    identityScopes: ["not_an_identity_control"],
    verificationStatus: "research_candidate", openQuestions: ["What evidence confirms a reported site has been removed?"],
  },
  {
    id: "spycloud", slug: "spycloud", name: "SpyCloud", formerNames: [], website: "https://spycloud.com/",
    positioning: "SpyCloud connects recovered breach and infostealer data to customer watchlists for investigation.", primaryCategoryIds: ["itdr"], adjacentCategoryIds: [],
    identityScopes: ["human"],
    verificationStatus: "research_candidate", openQuestions: ["Which watchlist identifiers have been verified for this organization?"],
  },
  {
    id: "dmarcian", slug: "dmarcian", name: "dmarcian", formerNames: [], website: "https://dmarcian.com/",
    positioning: "dmarcian helps domain owners interpret mail authentication reports and investigate sending sources.", primaryCategoryIds: ["email-security"], adjacentCategoryIds: [],
    identityScopes: ["not_an_identity_control"],
    verificationStatus: "research_candidate", openQuestions: ["Which mail senders still need a business owner?"],
  },
];

export const publicMonitoringProducts: Product[] = [
  {
    id: "socradar-brand-protection", slug: "socradar-brand-protection", vendorId: "socradar", name: "SOCRadar Brand Protection",
    positioning: "Security teams can investigate impersonation and potential leaks in public code repositories.",
    primaryCategoryIds: ["threat-intelligence"], adjacentCategoryIds: ["digital-risk-protection", "secrets-detection"], useCaseIds: [],
    deployment: ["unknown"], identityScopes: ["human", "nhi"], availability: "unknown",
    availabilityNote: "The vendor lists plan-specific monitoring and takedown features. Confirm entitlements and alert routing.",
    officialUrl: "https://socradar.io/products/brand-protection/",
  }, {
    id: "group-ib-digital-risk-protection", slug: "group-ib-digital-risk-protection", vendorId: "group-ib", name: "Group-IB Digital Risk Protection",
    positioning: "A brand protection team can review suspicious domains and authorize action on trademark infringements.",
    primaryCategoryIds: ["threat-intelligence"], adjacentCategoryIds: ["digital-risk-protection"], useCaseIds: [],
    deployment: ["unknown"], identityScopes: ["not_an_identity_control"], availability: "unknown",
    availabilityNote: "The vendor specifies separate requirements for detecting infringements and acting for the trademark owner.",
    officialUrl: "https://www.group-ib.com/products/digital-risk-protection/",
  }, {
    id: "searchlight-threat", slug: "searchlight-threat", vendorId: "searchlight-cyber", name: "Searchlight Threat",
    positioning: "A threat intelligence analyst can review reports of credentials circulating outside the company and hand relevant findings to identity operations.",
    primaryCategoryIds: ["threat-intelligence"], adjacentCategoryIds: ["itdr"], useCaseIds: [],
    deployment: ["unknown"], identityScopes: ["human"], availability: "unknown",
    availabilityNote: "The cited page describes organization-linked alerts. Confirm lookback, retention and covered sources.",
    officialUrl: "https://www.slcyber.io/threat",
  }, {
    id: "aws-iam-access-analyzer-s3", slug: "aws-iam-access-analyzer-s3", vendorId: "amazon-web-services", name: "AWS IAM Access Analyzer for S3",
    positioning: "Cloud teams can review which S3 general purpose buckets grant public or cross-account access and which permissions allow it.",
    primaryCategoryIds: ["cspm"], adjacentCategoryIds: ["ciem"], useCaseIds: [],
    deployment: ["cloud_native"], identityScopes: ["not_an_identity_control"], availability: "generally_available",
    availabilityNote: "The S3 console view requires an external access analyzer in each relevant Region.",
    officialUrl: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-analyzer.html",
  }, {
    id: "microsoft-defender-cspm", slug: "microsoft-defender-cspm", vendorId: "microsoft", name: "Microsoft Defender CSPM",
    positioning: "Cloud teams can use attack paths and cloud security graph insights to assess internet exposure and public access on storage resources.",
    primaryCategoryIds: ["cspm"], adjacentCategoryIds: ["dspm"], useCaseIds: [],
    deployment: ["cloud_native"], identityScopes: ["not_an_identity_control"], availability: "unknown",
    availabilityNote: "Microsoft documents plan and environment prerequisites. Confirm onboarding and coverage for the cloud in scope.",
    officialUrl: "https://learn.microsoft.com/en-us/azure/defender-for-cloud/concept-data-security-posture-prepare",
  },
  {
    id: "truffle-security-forager", slug: "truffle-security-forager", vendorId: "truffle-security", name: "Truffle Security Forager",
    positioning: "A company can review verified API keys associated with its email domain that surfaced in public GitHub commits or published npm packages.",
    primaryCategoryIds: ["secrets-detection"], adjacentCategoryIds: ["software-supply-chain"], useCaseIds: ["uc-detect"],
    deployment: ["saas"], identityScopes: ["nhi"], availability: "unknown",
    availabilityNote: "The user guide documents Forager. Historical lookback, notification timing and contract terms remain open questions.",
    officialUrl: "https://trufflesecurity.com/docs/user-enablement-guide",
  },
  {
    id: "flare-cti-platform", slug: "flare-cti-platform", vendorId: "flare", name: "Flare Cyber Threat Intelligence Platform",
    positioning: "An analyst can investigate whether a public repository contains company code or configuration and separately review employee account exposure in breach data.",
    primaryCategoryIds: ["threat-intelligence"], adjacentCategoryIds: ["digital-risk-protection"], useCaseIds: [],
    deployment: ["unknown"], identityScopes: ["human"], availability: "unknown",
    availabilityNote: "Flare documents these workflows. Dataset entitlements, historical coverage and alert delivery commitments need confirmation.",
    officialUrl: "https://flare.io/cyber-threat-intelligence-platform",
  },
  {
    id: "recorded-future-brand-intelligence", slug: "recorded-future-brand-intelligence", vendorId: "recorded-future", name: "Recorded Future Brand Intelligence",
    positioning: "Analysts receive alerts about exposed company material, including source code or employee credentials, and can initiate takedowns for supported types of brand abuse.",
    primaryCategoryIds: ["threat-intelligence"], adjacentCategoryIds: ["digital-risk-protection"], useCaseIds: [],
    deployment: ["unknown"], identityScopes: ["human"], availability: "unknown",
    availabilityNote: "The vendor describes a commercial module. Confirm contract scope and eligibility for removal with the provider handling the exposure.",
    officialUrl: "https://www.recordedfuture.com/products/brand-intelligence",
  },
  {
    id: "microsoft-defender-easm", slug: "microsoft-defender-easm", vendorId: "microsoft", name: "Microsoft Defender EASM",
    positioning: "Defender EASM uses external infrastructure relationships to discover an organization’s internet-facing assets and build an inventory.",
    primaryCategoryIds: ["external-attack-surface"], adjacentCategoryIds: [], useCaseIds: [],
    deployment: ["unknown"], identityScopes: ["not_an_identity_control"], availability: "unknown",
    availabilityNote: "An inferred relationship needs owner review, especially after an acquisition or change of hosting provider.",
    officialUrl: "https://learn.microsoft.com/en-us/azure/external-attack-surface-management/overview",
  },
  {
    id: "outpost24-data-leakage", slug: "outpost24-data-leakage", vendorId: "outpost24", name: "Outpost24 Data Leakage",
    positioning: "Outpost24’s Data Leakage module searches external sources including public and cloud document repositories for exposed documents and confidential material. The module also searches public repositories for source code.",
    primaryCategoryIds: ["external-attack-surface"], adjacentCategoryIds: [], useCaseIds: [],
    deployment: ["unknown"], identityScopes: ["not_an_identity_control"], availability: "unknown",
    availabilityNote: "The terms leave the matching identifiers, source-by-source coverage and removal service unspecified.",
    officialUrl: "https://outpost24.com/wp-content/uploads/2026/03/Service-Specific-Terms-EASM-with-Threat-Intelligence.pdf",
  },
  {
    id: "sharepoint-advanced-management", slug: "sharepoint-advanced-management", vendorId: "microsoft", name: "SharePoint Advanced Management",
    positioning: "SharePoint Advanced Management identifies tenant sites with the most new sharing links in the last 28 days, including links that allow access without signing in.",
    primaryCategoryIds: ["data-access-governance"], adjacentCategoryIds: [], useCaseIds: [],
    deployment: ["unknown"], identityScopes: ["not_an_identity_control"], availability: "unknown",
    availabilityNote: "The report measures link creation in the tenant. It does not establish whether a recipient used the link or copied the file elsewhere.",
    officialUrl: "https://learn.microsoft.com/en-us/sharepoint/data-access-governance-sharing-links-report",
  },
  {
    id: "wallarm-aasm", slug: "wallarm-aasm", vendorId: "wallarm", name: "Wallarm API Attack Surface Management",
    positioning: "Wallarm describes agentless discovery of public API hosts within the external scope configured for its API Attack Surface Management service.",
    primaryCategoryIds: ["api-security"], adjacentCategoryIds: [], useCaseIds: [],
    deployment: ["unknown"], identityScopes: ["not_an_identity_control"], availability: "unknown",
    availabilityNote: "Ask which hosts were attributable to the company and which endpoints the service actually observed.",
    officialUrl: "https://docs.wallarm.com/api-attack-surface/overview/",
  },
  {
    id: "cloudflare-api-discovery", slug: "cloudflare-api-discovery", vendorId: "cloudflare", name: "Cloudflare API Shield API Discovery",
    positioning: "Cloudflare discovers API endpoints from traffic on its network using machine learning or configured session identifiers.",
    primaryCategoryIds: ["api-security"], adjacentCategoryIds: [], useCaseIds: [],
    deployment: ["unknown"], identityScopes: ["not_an_identity_control"], availability: "unknown",
    availabilityNote: "This view depends on traffic reaching Cloudflare. An endpoint with no observed traffic can be missing.",
    officialUrl: "https://developers.cloudflare.com/api-shield/security/api-discovery/",
  },
  {
    id: "digicert-trust-lifecycle-manager", slug: "digicert-trust-lifecycle-manager", vendorId: "digicert", name: "DigiCert Trust Lifecycle Manager",
    positioning: "DigiCert Trust Lifecycle Manager monitors public Certificate Transparency logs for certificates matching configured organizations or base domains.",
    primaryCategoryIds: ["external-attack-surface"], adjacentCategoryIds: [], useCaseIds: [],
    deployment: ["unknown"], identityScopes: ["not_an_identity_control"], availability: "unknown",
    availabilityNote: "A logged certificate alone leaves the current operator and intended use of the service unknown.",
    officialUrl: "https://docs.digicert.com/en/trust-lifecycle-manager/build-your-inventory-and-ecosystem/discovery-tools/ct-logs-monitoring.html",
  },
  {
    id: "detectify-surface-monitoring", slug: "detectify-surface-monitoring", vendorId: "detectify", name: "Detectify Surface Monitoring",
    positioning: "Detectify describes reporting an in-scope subdomain whose DNS record still references a disconnected service.",
    primaryCategoryIds: ["external-attack-surface"], adjacentCategoryIds: [], useCaseIds: [],
    deployment: ["unknown"], identityScopes: ["not_an_identity_control"], availability: "unknown",
    availabilityNote: "The DNS owner should confirm the service was retired and check whether the DNS record is still needed.",
    officialUrl: "https://support.detectify.com/support/solutions/articles/48001145084-subdomain-takeover",
  },
  {
    id: "valimail-monitor", slug: "valimail-monitor", vendorId: "digicert", name: "Valimail Monitor",
    positioning: "Valimail Monitor uses DMARC aggregate reports routed to its service to show which systems send mail using a customer’s domain.",
    primaryCategoryIds: ["email-security"], adjacentCategoryIds: [], useCaseIds: [],
    deployment: ["unknown"], identityScopes: ["not_an_identity_control"], availability: "unknown",
    availabilityNote: "A published policy alone does not supply the sender-level reporting needed to investigate an unfamiliar service.",
    officialUrl: "https://support.valimail.com/en/articles/8466256-getting-started-with-valimail-monitor",
  },
  {
    id: "proofpoint-email-fraud-defense", slug: "proofpoint-email-fraud-defense", vendorId: "proofpoint", name: "Proofpoint Email Fraud Defense",
    positioning: "Proofpoint describes identifying email senders using the customer’s domains and helping the customer implement DMARC enforcement.",
    primaryCategoryIds: ["email-security"], adjacentCategoryIds: [], useCaseIds: [],
    deployment: ["unknown"], identityScopes: ["not_an_identity_control"], availability: "unknown",
    availabilityNote: "Confirm how reports are routed and which sending services the buyer can identify before changing policy.",
    officialUrl: "https://www.proofpoint.com/us/products/email-fraud-defense",
  },
  {
    id: "sonatype-firewall-pro", slug: "sonatype-firewall-pro", vendorId: "sonatype", name: "Sonatype Firewall Pro",
    positioning: "Sonatype documents evaluating package requests in Firewall Pro and blocking potentially malicious components, including suspected typosquats.",
    primaryCategoryIds: ["software-supply-chain"], adjacentCategoryIds: [], useCaseIds: [],
    deployment: ["unknown"], identityScopes: ["not_an_identity_control"], availability: "unknown",
    availabilityNote: "Whether a customer’s developer or build would be protected depends on the request passing through the configured service.",
    officialUrl: "https://help.sonatype.com/en/firewall-pro-blocking-logic.html",
  },
  {
    id: "palo-alto-xpanse", slug: "palo-alto-xpanse", vendorId: "palo-alto-networks", name: "Cortex Xpanse Expander",
    positioning: "Expander shows whether Xpanse discovered an asset or the customer supplied it, and which observed data matched the starting identifier.", primaryCategoryIds: ["external-attack-surface"], adjacentCategoryIds: [],
    useCaseIds: [], deployment: ["unknown"],
    identityScopes: ["not_an_identity_control"], availability: "unknown",
    availabilityNote: "The guide excludes attribution evidence for services and websites. A platform or subsidiary owner still needs to confirm responsibility.", officialUrl: "https://docs-cortex.paloaltonetworks.com/r/Cortex-XPANSE/2/Cortex-Xpanse-Expander-User-Guide/Asset-Attribution",
  },
  {
    id: "salt-connect", slug: "salt-connect", vendorId: "salt-security", name: "Salt Connect",
    positioning: "Salt Connect builds an API inventory from cloud and code configuration through read-only connectors for AWS, Azure, Google Cloud and GitHub.", primaryCategoryIds: ["api-security"], adjacentCategoryIds: [],
    useCaseIds: [], deployment: ["unknown"],
    identityScopes: ["not_an_identity_control"], availability: "unknown",
    availabilityNote: "Connecting a cloud account can reveal APIs absent from observed traffic. A configuration record alone does not establish public reachability.", officialUrl: "https://salt.security/connect",
  },
  {
    id: "sslmate-cert-spotter", slug: "sslmate-cert-spotter", vendorId: "sslmate", name: "SSLMate Cert Spotter",
    positioning: "Cert Spotter monitors certificates issued for a customer’s domains. The customer can specify expected certificates or trusted authorities to narrow alerts.", primaryCategoryIds: ["external-attack-surface"], adjacentCategoryIds: [],
    useCaseIds: [], deployment: ["unknown"],
    identityScopes: ["not_an_identity_control"], availability: "unknown",
    availabilityNote: "An unexpected certificate needs review by the domain or certificate owner. A certificate alert alone does not identify a stale DNS record.", officialUrl: "https://sslmate.com/certspotter/",
  },
  {
    id: "upguard-vendor-risk", slug: "upguard-vendor-risk", vendorId: "upguard", name: "UpGuard Vendor Risk",
    positioning: "UpGuard lets teams group monitored vendors and track remediation requests against an individual supplier’s risk profile.", primaryCategoryIds: ["third-party-risk"], adjacentCategoryIds: [],
    useCaseIds: [], deployment: ["unknown"],
    identityScopes: ["not_an_identity_control"], availability: "unknown",
    availabilityNote: "The buyer still needs to map the supplier to a contract, confirm asset ownership and check the response.", officialUrl: "https://help.upguard.com/en/articles/3764556-what-is-upguard-vendor-risk",
  },
  {
    id: "jfrog-curation", slug: "jfrog-curation", vendorId: "jfrog", name: "JFrog Curation",
    positioning: "JFrog Curation offers a policy condition that blocks third-party packages its security research team has identified as malicious.", primaryCategoryIds: ["software-supply-chain"], adjacentCategoryIds: [],
    useCaseIds: [], deployment: ["unknown"],
    identityScopes: ["not_an_identity_control"], availability: "unknown",
    availabilityNote: "This source supports blocking known malicious packages. Coverage of newly registered lookalike names is unspecified.", officialUrl: "https://docs.jfrog.com/security/docs/list-of-available-conditions",
  },
  {
    id: "cybelangel-data-breach-prevention", slug: "cybelangel-data-breach-prevention", vendorId: "cybelangel", name: "CybelAngel Data Breach Prevention",
    positioning: "CybelAngel describes analyst reports that include the origin of a leak and samples of exposed documents for the customer to review.", primaryCategoryIds: ["threat-intelligence"], adjacentCategoryIds: ["digital-risk-protection", "secrets-detection"],
    useCaseIds: [], deployment: ["unknown"],
    identityScopes: ["not_an_identity_control"], availability: "unknown",
    availabilityNote: "The buyer needs to confirm the document’s owner, intended audience and who has authority to restrict access.", officialUrl: "https://cybelangel.com/data-breach-prevention/",
  },
  {
    id: "google-scc-public-storage", slug: "google-scc-public-storage", vendorId: "google", name: "Google Security Command Center Enterprise",
    positioning: "Security Health Analytics identifies publicly accessible Cloud Storage buckets. Security Command Center Enterprise can route those findings to a remediation playbook.", primaryCategoryIds: ["cspm"], adjacentCategoryIds: [],
    useCaseIds: [], deployment: ["unknown"],
    identityScopes: ["not_an_identity_control"], availability: "unknown",
    availabilityNote: "Google documents setup and permissions for remediation. A public-access finding alone leaves actual downloads unknown.", officialUrl: "https://docs.cloud.google.com/security-command-center/docs/playbooks-public-bucket-acl",
  },
  {
    id: "google-threat-intelligence", slug: "google-threat-intelligence", vendorId: "google", name: "Google Threat Intelligence",
    positioning: "Google Threat Intelligence combines Mandiant intelligence, VirusTotal data and Google visibility in a workbench for investigating threats and their relevance.", primaryCategoryIds: ["threat-intelligence"], adjacentCategoryIds: [],
    useCaseIds: [], deployment: ["unknown"],
    identityScopes: ["not_an_identity_control"], availability: "unknown",
    availabilityNote: "Confirm entitlement to the required intelligence and corroborate any suspected impact in customer telemetry.", officialUrl: "https://cloud.google.com/security/products/threat-intelligence",
  },
  {
    id: "netcraft-phishing-protection", slug: "netcraft-phishing-protection", vendorId: "netcraft", name: "Netcraft Phishing Protection",
    positioning: "Netcraft describes detecting phishing that impersonates a brand and working with infrastructure providers to disrupt or remove it.", primaryCategoryIds: ["threat-intelligence"], adjacentCategoryIds: ["digital-risk-protection"],
    useCaseIds: [], deployment: ["unknown"],
    identityScopes: ["not_an_identity_control"], availability: "unknown",
    availabilityNote: "Ask which channels are included and what evidence confirms a reported page became unavailable.", officialUrl: "https://www.netcraft.com/platform/threat-detection-and-takedown/phishing-protection",
  },
  {
    id: "spycloud-workforce", slug: "spycloud-workforce", vendorId: "spycloud", name: "SpyCloud Workforce Threat Protection",
    positioning: "SpyCloud matches verified watchlist identifiers against breach data, phishing collections and information recovered from infostealer infections.", primaryCategoryIds: ["itdr"], adjacentCategoryIds: [],
    useCaseIds: [], deployment: ["unknown"],
    identityScopes: ["human"], availability: "unknown",
    availabilityNote: "Historical coverage varies. The identity team must check whether a reported account remains active and whether a session was used.", officialUrl: "https://docs.spycloud.com/public-sc/docs/workforce-threat-protection",
  },
  {
    id: "dmarcian-platform", slug: "dmarcian-platform", vendorId: "dmarcian", name: "dmarcian DMARC Management Platform",
    positioning: "dmarcian groups email sources across monitored domains and shows authentication status so mail owners can investigate unfamiliar senders.", primaryCategoryIds: ["email-security"], adjacentCategoryIds: [],
    useCaseIds: [], deployment: ["unknown"],
    identityScopes: ["not_an_identity_control"], availability: "unknown",
    availabilityNote: "Useful sender-level visibility depends on reports reaching the service and the customer identifying its legitimate senders.", officialUrl: "https://dmarcian.com/dmarc-management-platform/",
  },
];

// Each entry produces a standard source and its scoped product claim. The guide
// reuses these claim IDs so a correction reaches both the comparison and catalog.
export type ProductEvidence = {
  key: string;
  productId: string;
  publisher: string;
  title: string;
  url: string;
  type: Source["sourceType"];
  publishedAt?: string;
  checkedAt?: string;
  author?: string;
  section: string;
  statement: string;
  caveat: string;
  capabilityId?: string;
};

const evidence: ProductEvidence[] = [
  {
    key: "socradar-code", productId: "socradar-brand-protection", publisher: "SOCRadar", title: "Implementing CTI in software development lifecycle pipelines",
    url: "https://socradar.io/blog/implementing-cyber-threat-intelligence-in-software-development-lifecycle-sdlc-pipelines/",
    type: "vendor_marketing", publishedAt: "2024-01-12", section: "Examples of CTI implementation in SDLC, Secret Removal (updated July 8, 2026)",
    statement: "SOCRadar describes monitoring public GitHub and GitLab repositories for exposed code, login credentials and API keys and alerting organizations to potential leaks.",
    caveat: "The article leaves the customer attribution rule, historical lookback and live-key verification unspecified.",
  }, {
    key: "socradar-brand-plans", productId: "socradar-brand-protection", publisher: "SOCRadar", title: "Brand Protection plans and feature comparison",
    url: "https://socradar.io/pricing/", type: "vendor_marketing", section: "Brand Protection plans and pricing",
    statement: "SOCRadar lists phishing monitoring, automated takedown requests, and code and API repository monitoring in its Brand Protection plans.",
    caveat: "A request starts a removal process. Completion and applicable limits require confirmation with the vendor.",
  }, {
    key: "group-ib-brand", productId: "group-ib-digital-risk-protection", publisher: "Group-IB", title: "Digital Risk Protection",
    url: "https://www.group-ib.com/products/digital-risk-protection/", type: "vendor_marketing", section: "Suspicious domain feed and requirements for detecting and blocking brand infringements",
    statement: "Group-IB offers suspicious-domain findings. Customers supply brand names and legitimate resources for detection. Acting to block a trademark infringement requires authority from the trademark owner.",
    caveat: "The provider handling the site can affect whether and when it is removed.",
  }, {
    key: "searchlight-credentials", productId: "searchlight-threat", publisher: "Searchlight Cyber", title: "Searchlight Threat",
    url: "https://www.slcyber.io/threat", type: "vendor_marketing", section: "Organization-linked activity and credential alerts",
    statement: "Searchlight says it connects credentials circulating on external sources to an organization and surfaces alerts with context for an analyst.",
    caveat: "The cited material leaves current password validity, successful account use and identity-provider remediation unconfirmed.",
  }, {
    key: "aws-external-storage", productId: "aws-iam-access-analyzer-s3", publisher: "Amazon Web Services", title: "Reviewing bucket access using IAM Access Analyzer for S3",
    url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-analyzer.html", type: "official_docs", section: "Reviewing bucket access and external access summary",
    statement: "AWS identifies S3 general purpose buckets with public or cross-account access and shows the source and level of the permission. The console uses a regional external access analyzer.",
    caveat: "Cross-account sharing may be intentional. A permissions finding alone does not establish that anyone read an object.", capabilityId: "cap-cspm",
  }, {
    key: "microsoft-public-storage", productId: "microsoft-defender-cspm", publisher: "Microsoft", title: "Prerequisites for data security posture management",
    url: "https://learn.microsoft.com/en-us/azure/defender-for-cloud/concept-data-security-posture-prepare", type: "official_docs", section: "Exposed to the internet/allows public access (updated November 8, 2026)",
    statement: "Microsoft documents separate conditions for network exposure and public access in Defender CSPM storage insights, including anonymous-read settings for Azure Blob containers.",
    caveat: "Confirm the plan and connected resources. Network reachability alone does not establish anonymous read access.", capabilityId: "cap-cspm",
  },
  {
    key: "gitguardian-sources", productId: "gitguardian", publisher: "GitGuardian", title: "Monitored public sources",
    url: "https://docs.gitguardian.com/public-monitoring/sources/overview", type: "official_docs", section: "Supported sources",
    statement: "GitGuardian monitors new and historical public GitHub commits. Its historical scans also cover public Gists and, for selected workspaces, public Docker Hub image layers.",
    caveat: "The Gist and Docker Hub entries specify historical coverage only.", capabilityId: "cap-secret-discovery",
  },
  {
    key: "gitguardian-attribution", productId: "gitguardian", publisher: "GitGuardian", title: "Company public perimeter",
    url: "https://docs.gitguardian.com/public-monitoring/perimeter/overview", type: "official_docs", section: "Company public perimeter",
    statement: "GitGuardian uses monitored developers, company GitHub organizations and company-specific terms near a secret to associate public findings with a customer.",
    caveat: "Applicable signals depend on the public source. A developer match still needs review to establish who owns the credential.",
  },
  {
    key: "github-attribution", productId: "github-secret-scanning", publisher: "GitHub", title: "Public monitoring for secret scanning",
    url: "https://docs.github.com/en/enterprise-cloud@latest/code-security/concepts/secret-security/public-monitoring", type: "official_docs", section: "How public monitoring works",
    statement: "GitHub looks across public GitHub repositories, Gists, and issue and pull request comments. Enterprise membership or a verified email domain connects a finding to the enterprise. With data residency, attribution uses verified domains.",
    caveat: "GitHub lists credential status only for supported secret types.", capabilityId: "cap-secret-discovery",
  },
  {
    key: "github-availability", productId: "github-secret-scanning", publisher: "GitHub", title: "Public monitoring for enterprises generally available",
    url: "https://github.blog/changelog/2026-10-28-public-monitoring-for-enterprises-generally-available/", type: "official_docs", publishedAt: "2026-10-28", section: "Release announcement and eligibility",
    statement: "GitHub announced general availability on October 28, 2026 and says public monitoring is included with GitHub Secret Protection at no additional charge.",
    caveat: "The linked product documentation specifies GitHub Enterprise Cloud with Secret Protection or GitHub Advanced Security enabled.",
  },
  {
    key: "forager-sources", productId: "truffle-security-forager", publisher: "Truffle Security", title: "User enablement guide",
    url: "https://trufflesecurity.com/docs/user-enablement-guide", type: "official_docs", section: "Forager",
    statement: "Forager monitors public GitHub commits and npm package releases for exposed secrets. Its company view presents verified keys associated with an email domain.",
    caveat: "The guide gives no historical lookback or notification-time commitment.", capabilityId: "cap-secret-discovery",
  },
  {
    key: "forager-verification", productId: "truffle-security-forager", publisher: "Truffle Security", title: "Introducing Forager",
    url: "https://trufflesecurity.com/blog/introducing-forager", type: "vendor_marketing", publishedAt: "2023-07-17", author: "Hon Kwok", section: "Introducing Forager and Secret Sources",
    statement: "Truffle Security describes verifying live API keys with TruffleHog and making exposure details available to the associated company.",
    caveat: "The launch article describes the validation workflow. Detector-by-detector coverage and detection rates remain untested here.", capabilityId: "cap-secret-verification",
  },
  {
    key: "flare-platform", productId: "flare-cti-platform", publisher: "Flare", title: "Cyber Threat Intelligence Platform",
    url: "https://flare.io/cyber-threat-intelligence-platform", type: "vendor_marketing", section: "An Identity-First Cyber Threat Intelligence Platform",
    statement: "Flare positions its platform for security teams investigating external threats and identity exposure.",
    caveat: "The platform description leaves dataset entitlements and detection performance unspecified.",
  },
  {
    key: "flare-repositories", productId: "flare-cti-platform", publisher: "Flare", title: "Queries for public repository leaks",
    url: "https://docs.flare.io/queries", type: "official_docs", section: "Identifying data leaks in public repositories",
    statement: "Flare documents investigating potential code or configuration leaks on public GitHub using organization-specific project names or code fragments.",
    caveat: "A matching project name is a lead. Credential ownership and live key validation are unspecified in this workflow.",
  },
  {
    key: "flare-breaches", productId: "flare-cti-platform", publisher: "Flare", title: "Breaches",
    url: "https://docs.flare.io/breaches", type: "official_docs", section: "The Breaches Directory",
    statement: "Flare also provides a directory of breach incidents. Where a breach includes credentials, analysts can review account data that matches the customer’s identifiers.",
    caveat: "A breach record and a key found in a public repository are distinct kinds of evidence.",
  },
  {
    key: "recorded-future-sources", productId: "recorded-future-brand-intelligence", publisher: "Recorded Future", title: "Brand Intelligence datasheet",
    url: "https://assets.recordedfuture.com/Datasheets/brand-intelligence-module.pdf", type: "vendor_marketing", section: "Page 2, Data and credential leak monitoring",
    statement: "Recorded Future describes monitoring code repositories, paste sites and dark web forums for exposed company data, including proprietary code and employee credentials.",
    caveat: "The datasheet leaves per-source lookback, machine-credential ownership and API-key validity unspecified.",
  },
  {
    key: "recorded-future-response", productId: "recorded-future-brand-intelligence", publisher: "Recorded Future", title: "Brand Intelligence product overview",
    url: "https://www.recordedfuture.com/products/brand-intelligence", type: "vendor_marketing", section: "Brand Intelligence overview and takedowns",
    statement: "Recorded Future describes alerts for code and credential leaks and a takedown workflow for brand abuse such as typosquat domains.",
    caveat: "The product page gives no commitment to remove leaked code from any particular repository or to revoke an exposed key.",
  },
  {
    key: "microsoft-easm", productId: "microsoft-defender-easm", publisher: "Microsoft", title: "What is Microsoft Defender External Attack Surface Management?",
    url: "https://learn.microsoft.com/en-us/azure/external-attack-surface-management/overview",
    type: "official_docs", section: "Discovery and inventory",
    statement: "Defender EASM uses external infrastructure relationships to discover an organization’s internet-facing assets and build an inventory.",
    caveat: "An inferred relationship needs owner review, especially after an acquisition or change of hosting provider.",
  },
  {
    key: "cycognito-assets", productId: "cycognito", publisher: "CyCognito", title: "Asset Discovery and Contextualization",
    url: "https://www.cycognito.com/documents/datasheets/DS-CyCognito_Discovery_and_Contextualization_2023Q2_v1.pdf",
    type: "vendor_marketing", section: "Asset discovery and business context",
    statement: "CyCognito describes mapping externally visible assets to the companies and subsidiaries associated with them.",
    caveat: "A candidate asset’s current operator and business owner still need confirmation.",
  },
  {
    key: "recorded-future-threat", productId: "recorded-future", publisher: "Recorded Future", title: "Threat Intelligence",
    url: "https://www.recordedfuture.com/products/threat-intelligence",
    type: "vendor_marketing", section: "Threat actors and intelligence reporting",
    statement: "Recorded Future describes reporting on threat actors and campaigns, with context for assessing which threats matter to an organization.",
    caveat: "A campaign affecting a sector leaves open whether any particular customer experienced it.",
  },
  {
    key: "outpost-documents", productId: "outpost24-data-leakage", publisher: "Outpost24", title: "EASM with Threat Intelligence service specific terms",
    url: "https://outpost24.com/wp-content/uploads/2026/03/Service-Specific-Terms-EASM-with-Threat-Intelligence.pdf",
    type: "official_docs", section: "Page 1, Threat Intelligence Modules, Data Leakage (February 2026)",
    statement: "Outpost24’s Data Leakage module searches external sources including public and cloud document repositories for exposed documents and confidential material. The module also searches public repositories for source code.",
    caveat: "The terms leave the matching identifiers, source-by-source coverage and removal service unspecified.",
  },
  {
    key: "sharepoint-links", productId: "sharepoint-advanced-management", publisher: "Microsoft", title: "Monitor sharing activities in SharePoint with sharing links activity reports",
    url: "https://learn.microsoft.com/en-us/sharepoint/data-access-governance-sharing-links-report",
    type: "official_docs", section: "Sharing links activity reports",
    statement: "SharePoint Advanced Management identifies tenant sites with the most new sharing links in the last 28 days, including links that allow access without signing in.",
    caveat: "The report measures link creation in the tenant. It does not establish whether a recipient used the link or copied the file elsewhere.",
  },
  {
    key: "wallarm-apis", productId: "wallarm-aasm", publisher: "Wallarm", title: "API Attack Surface Management overview",
    url: "https://docs.wallarm.com/api-attack-surface/overview/",
    type: "official_docs", section: "How API discovery works",
    statement: "Wallarm describes agentless discovery of public API hosts within the external scope configured for its API Attack Surface Management service.",
    caveat: "Ask which hosts were attributable to the company and which endpoints the service actually observed.",
  },
  {
    key: "cloudflare-apis", productId: "cloudflare-api-discovery", publisher: "Cloudflare", title: "API Discovery",
    url: "https://developers.cloudflare.com/api-shield/security/api-discovery/",
    type: "official_docs", section: "Endpoint discovery and traffic requirements",
    statement: "Cloudflare discovers API endpoints from traffic on its network using machine learning or configured session identifiers.",
    caveat: "This view depends on traffic reaching Cloudflare. An endpoint with no observed traffic can be missing.",
  },
  {
    key: "digicert-ct", productId: "digicert-trust-lifecycle-manager", publisher: "DigiCert", title: "CT logs monitoring",
    url: "https://docs.digicert.com/en/trust-lifecycle-manager/build-your-inventory-and-ecosystem/discovery-tools/ct-logs-monitoring.html",
    type: "official_docs", section: "Organization and base-domain monitoring",
    statement: "DigiCert Trust Lifecycle Manager monitors public Certificate Transparency logs for certificates matching configured organizations or base domains.",
    caveat: "A logged certificate alone leaves the current operator and intended use of the service unknown.",
  },
  {
    key: "detectify-dns", productId: "detectify-surface-monitoring", publisher: "Detectify", title: "Subdomain takeover",
    url: "https://support.detectify.com/support/solutions/articles/48001145084-subdomain-takeover",
    type: "official_docs", section: "How Surface Monitoring flags a DNS record for a disconnected service",
    statement: "Detectify describes reporting an in-scope subdomain whose DNS record still references a disconnected service.",
    caveat: "The DNS owner should confirm the service was retired and check whether the DNS record is still needed.",
  },
  {
    key: "bitsight-suppliers", productId: "bitsight", publisher: "Bitsight", title: "Continuous Monitoring",
    url: "https://www.bitsight.com/products/continuous-monitoring",
    type: "vendor_marketing", section: "Continuous monitoring of vendors",
    statement: "Bitsight describes monitoring a portfolio of third parties for changes in security posture so teams can prioritize vendor follow-up.",
    caveat: "The customer must connect a vendor record to its business relationship and confirm the importance of the service.",
  },
  {
    key: "scorecard-suppliers", productId: "securityscorecard", publisher: "SecurityScorecard", title: "A Deep Dive in Scoring Methodology",
    url: "https://securityscorecard.com/wp-content/uploads/2026/04/MethodologyDeepDive-3.0-Ebook_051926_SD.pdf",
    type: "official_docs", section: "Pages 21 to 23, signal collection and attribution",
    statement: "SecurityScorecard describes attributing externally collected signals to company assets and using those signals to calculate security ratings.",
    caveat: "A score change requires checking the attributed asset and the supplier’s explanation before drawing a conclusion about customer impact.",
  },
  {
    key: "valimail-reports", productId: "valimail-monitor", publisher: "Valimail", title: "Getting started with Valimail Monitor",
    url: "https://support.valimail.com/en/articles/8466256-getting-started-with-valimail-monitor",
    type: "official_docs", section: "Setting up monitoring and DMARC reporting",
    statement: "Valimail Monitor uses DMARC aggregate reports routed to its service to show which systems send mail using a customer’s domain.",
    caveat: "A published policy alone does not supply the sender-level reporting needed to investigate an unfamiliar service.",
  },
  {
    key: "valimail-owner", productId: "valimail-monitor", publisher: "DigiCert", title: "DigiCert acquires Valimail",
    url: "https://www.digicert.com/news/digicert-acquires-valimail-global-leader-in-email-authentication",
    type: "vendor_marketing", publishedAt: "2025-09-16", section: "Acquisition announcement, September 16, 2025",
    statement: "DigiCert announced its acquisition of Valimail. The map lists Valimail Monitor under DigiCert.",
    caveat: "The announcement concerns corporate ownership. DMARC functionality is documented separately.",
  },
  {
    key: "proofpoint-dmarc", productId: "proofpoint-email-fraud-defense", publisher: "Proofpoint", title: "Email Fraud Defense",
    url: "https://www.proofpoint.com/us/products/email-fraud-defense",
    type: "vendor_marketing", section: "Sender visibility and DMARC authentication",
    statement: "Proofpoint describes identifying email senders using the customer’s domains and helping the customer implement DMARC enforcement.",
    caveat: "Confirm how reports are routed and which sending services the buyer can identify before changing policy.",
  },
  {
    key: "socket-typos", productId: "socket", publisher: "Socket", title: "What to do with Socket alerts",
    url: "https://docs.socket.dev/docs/what-to-do-with-socket-alerts",
    type: "official_docs", section: "Potential Typo Squat alert",
    statement: "Socket documents an alert for a dependency whose name resembles another package and directs the reviewer to check whether that dependency was intended.",
    caveat: "A similar name alone does not establish malicious intent or that a particular organization installed the package.",
  },
  {
    key: "sonatype-packages", productId: "sonatype-firewall-pro", publisher: "Sonatype", title: "Firewall Pro blocking logic",
    url: "https://help.sonatype.com/en/firewall-pro-blocking-logic.html",
    type: "official_docs", section: "How Firewall Pro evaluates and blocks component requests",
    statement: "Sonatype documents evaluating package requests in Firewall Pro and blocking potentially malicious components, including suspected typosquats.",
    caveat: "Whether a customer’s developer or build would be protected depends on the request passing through the configured service.",
  },
  {
    key: "xpanse-attribution", productId: "palo-alto-xpanse", publisher: "Palo Alto Networks", title: "Asset Attribution",
    url: "https://docs-cortex.paloaltonetworks.com/r/Cortex-XPANSE/2/Cortex-Xpanse-Expander-User-Guide/Asset-Attribution", type: "official_docs",
    section: "Attribution evidence and origin",
    statement: "Expander shows whether Xpanse discovered an asset or the customer supplied it, and which observed data matched the starting identifier.",
    caveat: "The guide excludes attribution evidence for services and websites. A platform or subsidiary owner still needs to confirm responsibility.",
  },
  {
    key: "salt-api-inventory", productId: "salt-connect", publisher: "Salt Security", title: "Salt Connect",
    url: "https://salt.security/connect", type: "vendor_marketing",
    section: "Read-only connectors and FAQ",
    statement: "Salt Connect builds an API inventory from cloud and code configuration through read-only connectors for AWS, Azure, Google Cloud and GitHub.",
    caveat: "Connecting a cloud account can reveal APIs absent from observed traffic. A configuration record alone does not establish public reachability.",
  },
  {
    key: "sslmate-issuance", productId: "sslmate-cert-spotter", publisher: "SSLMate", title: "Cert Spotter certificate monitoring",
    url: "https://sslmate.com/certspotter/", type: "vendor_marketing",
    section: "Monitoring unexpected issuance",
    statement: "Cert Spotter monitors certificates issued for a customer’s domains. The customer can specify expected certificates or trusted authorities to narrow alerts.",
    caveat: "An unexpected certificate needs review by the domain or certificate owner. A certificate alert alone does not identify a stale DNS record.",
  },
  {
    key: "upguard-suppliers", productId: "upguard-vendor-risk", publisher: "UpGuard", title: "What is UpGuard Vendor Risk?",
    url: "https://help.upguard.com/en/articles/3764556-what-is-upguard-vendor-risk", type: "official_docs",
    section: "Monitored vendors and remediation requests",
    statement: "UpGuard lets teams group monitored vendors and track remediation requests against an individual supplier’s risk profile.",
    caveat: "The buyer still needs to map the supplier to a contract, confirm asset ownership and check the response.",
  },
  {
    key: "jfrog-package-policy", productId: "jfrog-curation", publisher: "JFrog", title: "List of available conditions",
    url: "https://docs.jfrog.com/security/docs/list-of-available-conditions", type: "official_docs",
    section: "Security conditions, Malicious package",
    statement: "JFrog Curation offers a policy condition that blocks third-party packages its security research team has identified as malicious.",
    caveat: "This source supports blocking known malicious packages. Coverage of newly registered lookalike names is unspecified.",
  },
  {
    key: "cybelangel-repository-case", productId: "cybelangel-data-breach-prevention", publisher: "CybelAngel", title: "Alert of the Month: Code Repository Gone Bad",
    url: "https://cybelangel.com/blog/alert-of-the-month-code-repository-gone-bad/", type: "customer_story", publishedAt: "2021-12-07", author: "Orlaith Traynor",
    section: "Analyst finding in a personal public repository",
    statement: "CybelAngel reports finding CRM access tokens in a developer’s personal public repository. This is a vendor-described customer case.",
    caveat: "The case gives no general commitment on public repository coverage, credential validation, company attribution or alert speed.",
  },
  {
    key: "cybelangel-documents", productId: "cybelangel-data-breach-prevention", publisher: "CybelAngel", title: "Data Breach Prevention",
    url: "https://cybelangel.com/data-breach-prevention/", type: "vendor_marketing",
    section: "Incident origin and authenticated document samples",
    statement: "CybelAngel describes analyst reports that include the origin of a leak and samples of exposed documents for the customer to review.",
    caveat: "The buyer needs to confirm the document’s owner, intended audience and who has authority to restrict access.",
  },
  {
    key: "google-storage-findings", productId: "google-scc-public-storage", publisher: "Google Cloud", title: "Enable public bucket remediation",
    url: "https://docs.cloud.google.com/security-command-center/docs/playbooks-public-bucket-acl", type: "official_docs",
    section: "Security Health Analytics public bucket findings",
    statement: "Security Health Analytics identifies publicly accessible Cloud Storage buckets. Security Command Center Enterprise can route those findings to a remediation playbook.",
    caveat: "Google documents setup and permissions for remediation. A public-access finding alone leaves actual downloads unknown.",
  },
  {
    key: "google-threat-intelligence", productId: "google-threat-intelligence", publisher: "Google Cloud", title: "Google Threat Intelligence",
    url: "https://cloud.google.com/security/products/threat-intelligence", type: "vendor_marketing",
    section: "Threat intelligence workbench and intelligence sources",
    statement: "Google Threat Intelligence combines Mandiant intelligence, VirusTotal data and Google visibility in a workbench for investigating threats and their relevance.",
    caveat: "Confirm entitlement to the required intelligence and corroborate any suspected impact in customer telemetry.",
  },
  {
    key: "netcraft-phishing", productId: "netcraft-phishing-protection", publisher: "Netcraft", title: "Phishing Protection",
    url: "https://www.netcraft.com/platform/threat-detection-and-takedown/phishing-protection", type: "vendor_marketing",
    section: "Phishing detection, disruption and takedown",
    statement: "Netcraft describes detecting phishing that impersonates a brand and working with infrastructure providers to disrupt or remove it.",
    caveat: "Ask which channels are included and what evidence confirms a reported page became unavailable.",
  },
  {
    key: "spycloud-watchlist", productId: "spycloud-workforce", publisher: "SpyCloud", title: "Workforce Threat Protection",
    url: "https://docs.spycloud.com/public-sc/docs/workforce-threat-protection", type: "official_docs",
    section: "Verified watchlist and recaptured data",
    statement: "SpyCloud matches verified watchlist identifiers against breach data, phishing collections and information recovered from infostealer infections.",
    caveat: "Historical coverage varies. The identity team must check whether a reported account remains active and whether a session was used.",
  },
  {
    key: "dmarcian-sources", productId: "dmarcian-platform", publisher: "dmarcian", title: "DMARC Management Platform",
    url: "https://dmarcian.com/dmarc-management-platform/", type: "vendor_marketing",
    section: "Domain Overview and Source Viewer",
    statement: "dmarcian groups email sources across monitored domains and shows authentication status so mail owners can investigate unfamiliar senders.",
    caveat: "Useful sender-level visibility depends on reports reaching the service and the customer identifying its legitimate senders.",
  },
];

export function registerProductEvidence({ prefix, checked, entries }: {
  prefix: string;
  checked: string;
  entries: ProductEvidence[];
}) {
  const sources: Source[] = entries.map((row) => ({
    id: `src-${prefix}-${row.key}`, title: row.title, publisher: row.publisher, author: row.author,
    url: row.url, canonicalUrl: row.url, sourceType: row.type, publishedAt: row.publishedAt ?? null,
    retrievedAt: row.checkedAt ?? checked, volatility: "fast", excerpt: row.section + ". " + row.statement,
  }));

  const claims: Claim[] = entries.map((row) => ({
    id: `claim-${prefix}-${row.key}`, subjectType: "product", subjectId: row.productId,
    capabilityId: row.capabilityId ?? null, polarity: "asserts", statement: row.statement,
    sourceId: `src-${prefix}-${row.key}`, sourceUrl: row.url, sourceType: row.type, publishedAt: row.publishedAt ?? null,
    observedAt: row.checkedAt ?? checked, lastCheckedAt: row.checkedAt ?? checked, effectiveFrom: null, effectiveTo: null,
    confidence: "medium", verificationStatus: "vendor_published", conflictsWith: [], notes: row.caveat,
  }));
  return { sources, claims };
}

export const { sources: publicMonitoringSources, claims: publicMonitoringClaims } = registerProductEvidence({
  prefix: "public", checked: publicMonitoringChecked, entries: evidence,
});

export const monitoringModeEvidence = registerProductEvidence({
  prefix: "monitoring-mode", checked: "2026-11-22", entries: [
    {
      key: "gitguardian-integration", productId: "gitguardian", publisher: "GitGuardian",
      title: "Integrate your first repositories", url: "https://docs.gitguardian.com/platform/getting-started/integrate",
      type: "official_docs", section: "GitHub integration",
      statement: "Internal Monitoring starts with a source integration. For GitHub, an authorized user installs the GitGuardian app and selects the repositories it can access.",
      caveat: "Access depends on the installation and monitored repositories.",
    },
    {
      key: "gitguardian-visibility", productId: "gitguardian", publisher: "GitGuardian",
      title: "Investigate incidents", url: "https://docs.gitguardian.com/internal-monitoring/remediate/investigate-incidents",
      type: "official_docs", section: "Public exposure types",
      statement: "An internal incident can come from a publicly visible integrated repository. GitGuardian distinguishes that occurrence from a linked incident discovered through Public Monitoring.",
      caveat: "A public repository alone does not establish that a second incident exists.",
    },
    {
      key: "gitguardian-public-incident", productId: "gitguardian", publisher: "GitGuardian",
      title: "Investigate public incidents", url: "https://docs.gitguardian.com/public-monitoring/remediate/understand-incident-properties",
      type: "official_docs", section: "Attachment reasons",
      statement: "Public incidents show how a finding was associated with a company. A developer match can involve a personal credential.",
      caveat: "Confirm which account issued the credential and which team has authority to revoke it.",
    },
    {
      key: "forager-editions", productId: "truffle-security-forager", publisher: "Truffle Security",
      title: "TruffleHog Forager on AWS Marketplace", url: "https://aws.amazon.com/marketplace/pp/prodview-3wvp2fwzcn6gm",
      type: "vendor_marketing", section: "Overview and Highlights",
      statement: "Truffle Security offers Forager Community and an Enterprise add-on. Enterprise can associate a verified public finding with a customer using cloud account IDs and organization membership as well as domains.",
      caveat: "The seller describes available signals. Which signals exist for a particular exposure and whether a notification reaches the customer require separate evidence.",
    },
  ],
});
