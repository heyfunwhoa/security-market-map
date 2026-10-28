# Secrets detection market sweep

Observed/reviewed: **2026-10-13**. Status: public-source research and proposed catalog additions, pending PR review. This is a broad sweep, not a claim that every small project or vendor has been discovered.

## Buyer decision and inclusion rule

An AppSec, cloud security, or platform team needs to find exposed credentials in its actual estate. Include a company or OSS maintainer when a primary source describes detection, bundled scanning, or ingestion of secret findings. Secret storage, credential issuance, inventory metadata, and rotation alone do not qualify as exposed-secret detection. A vault may have a separate scanner, as with Vault Radar, Infisical, and Akeyless.

**60 records reviewed:** 17 newly represented publishers/maintainers, 55 additional product records, and five existing product records enriched with new source evidence. Existing company IDs are reused. OSS projects are associated with their actual maintainer, not counted as independent commercial companies. Three integration-only records have no native discovery capability claim; five records remain `needs_review`. All other new claims are publisher-reported, never independently verified.

Canonical application records: [typed sweep](../../lib/data/secrets-sweep.ts), composed by [catalog](../../lib/catalog.ts). This document explains the research; it is not a second data ingestion pipeline. Catalog snapshot date advances, but older source and claim review dates are unchanged. No capability rankings, completeness scores, detector-count comparisons, or direct-competitor edges are added.

## Evidence inventory

Each numbered link is the original publisher source. Observed/reviewed date for every row is 2026-10-13; publication date is unknown unless explicitly given below. `Vendor published` also covers project-maintainer documentation and means the publisher describes the feature, not that we tested it. Short paraphrases only; no full-page copies or secret values are retained.

| Product / project | Publisher / maintainer | Lane | Supported statement | Evidence status and caveat | Source |
| --- | --- | --- | --- | --- | --- |
| TruffleHog | Truffle Security | specialist/OSS | Scans for exposed secrets across supported sources. | **Vendor published.** OSS and commercial scopes differ. | [S01](https://github.com/trufflesecurity/trufflehog) |
| GitGuardian | GitGuardian | specialist | Provides secrets detection through its platform and CLI. | **Vendor published.** CLI is not a standalone offline detection engine. | [S02](https://www.gitguardian.com/ggshield) |
| ggshield | GitGuardian | API client/OSS | CLI scans content using the GitGuardian API. | **Vendor published.** Open client does not make the hosted engine open source. | [S03](https://github.com/GitGuardian/ggshield) |
| GitHub secret scanning | GitHub | SCM | Detects leaked credentials in supported GitHub content. | **Vendor published.** Coverage and licensing depend on repository and plan. | [S04](https://docs.github.com/en/code-security/concepts/secret-security/secret-scanning) |
| GitLab Secret Detection | GitLab | SCM | Provides pipeline and other secret detection workflows. | **Vendor published.** Do not assume all workflows use the same engine or tier. | [S05](https://docs.gitlab.com/user/application_security/secret_detection/) |
| Gitleaks | Gitleaks | OSS | Scans files and Git history for potential secrets. | **Vendor published.** Review maintenance status separately from feature support. | [S06](https://github.com/gitleaks/gitleaks) |
| Betterleaks | Aikido Security | OSS | Configurable scanner for exposed secrets. | **Vendor published.** Separate project from Gitleaks; not a rename. | [S07](https://github.com/betterleaks/betterleaks) |
| Kingfisher | MongoDB | OSS | Detects exposed credentials and supports live validation. | **Vendor published.** Validation varies by detector; no parity or coverage-count claim. | [S08](https://github.com/mongodb/kingfisher) |
| Nosey Parker | Praetorian | OSS | Finds secrets in textual data and Git history. | **Vendor published.** Check repository lifecycle and Titus relationship before adoption. | [S09](https://github.com/praetorian-inc/noseyparker) |
| Titus | Praetorian | OSS | Detects credentials in source, binaries, and HTTP traffic. | **Vendor published.** Distinct project from Nosey Parker. | [S10](https://github.com/praetorian-inc/titus) |
| detect-secrets | Yelp | OSS | Detects secrets in code with baselines and plugins. | **Vendor published.** Baseline workflows are not a managed incident response service. | [S11](https://github.com/Yelp/detect-secrets) |
| git-secrets | Amazon Web Services | OSS | Checks Git content against prohibited credential patterns. | **Vendor published.** AWS patterns do not establish universal secret coverage. | [S12](https://github.com/awslabs/git-secrets) |
| Trivy secret scanner | Aqua Security | OSS | Finds secrets in plaintext files with built-in and custom rules. | **Vendor published.** Image/filesystem scanning differs from full Git-history scanning. | [S13](https://trivy.dev/docs/latest/guide/scanner/secret/) |
| Checkov secrets scanning | Palo Alto Networks | OSS | Scans for hardcoded credentials and secrets. | **Vendor published.** Keep OSS features separate from platform services. | [S14](https://www.checkov.io/2.Basics/Scanning%20Credentials%20and%20Secrets.html) |
| Secretlint | Secretlint project | OSS | Uses pluggable rules to detect credentials before commit. | **Vendor published.** Does not automatically remediate secrets. | [S15](https://github.com/secretlint/secretlint) |
| Deepfence SecretScanner | Deepfence | OSS | Scans container images and local directories for secrets. | **Vendor published.** No general availability or support SLA inferred. | [S16](https://github.com/deepfence/SecretScanner) |
| Talisman | Thoughtworks | OSS | Detects suspicious secret material in Git changesets. | **Vendor published.** Local hooks can be bypassed. | [S17](https://github.com/thoughtworks/talisman) |
| Credential Digger | SAP | OSS/archived | Repository documents hardcoded-credential scanning. | **Vendor published.** Archived lineage; not an active-product recommendation. | [S18](https://github.com/SAP-archive/credential-digger) |
| Whispers | Skyscanner | OSS | Finds hardcoded secrets in structured text. | **Vendor published.** Structured-file scope; maintenance must be checked. | [S19](https://github.com/Skyscanner/whispers) |
| Semgrep Secrets | Semgrep | AppSec | Scans code for exposed secrets. | **Vendor published.** Commercial Secrets features are not implied by OSS Semgrep. | [S20](https://semgrep.dev/products/semgrep-secrets) |
| Aikido Secrets Detection | Aikido Security | AppSec | Detects exposed secrets and describes live-secret checks. | **Vendor published.** No independent accuracy comparison inferred. | [S21](https://www.aikido.dev/code/secrets-detection) |
| Apiiro Secrets Security | Apiiro | ASPM | Detects and validates exposed secrets with application context. | **Vendor published.** Vendor claims are not performance benchmarks. | [S22](https://apiiro.com/product/guardian-agent/secrets-security) |
| Cycode Secrets Detection | Cycode | ASPM | Scans development environments for hardcoded secrets. | **Vendor published.** Confirm connectors and edition during evaluation. | [S23](https://cycode.com/hard-coded-secrets-detection/) |
| Legit Secrets Detection | Legit Security | ASPM | Detects exposed secrets across development and collaboration surfaces. | **Vendor published.** Validate each connector and deployment scope. | [S24](https://www.legitsecurity.com/enterprise-secret-scanning) |
| OX Secret and PII Scan | OX Security | ASPM | Documents policies for hardcoded-secret findings. | **Vendor published.** Native scan and imported scanner findings must be distinguished. | [S25](https://docs.ox.security/ox-policies/cloud-context-policies-3) |
| Jit Secrets Detection | Jit | bundled OSS | Runs Gitleaks and TruffleHog behind its secrets workflow. | **Needs review.** Bundled engines; not a separately proven proprietary scanner. Full-page capability evidence unavailable on this pass; search-index evidence only, not a published capability check. | [S26](https://www.jit.io/aspm-platform/secrets-detection) |
| Endor Labs Secrets Detection | Endor Labs | AppSec | Scans Git history and describes live-secret validation. | **Vendor published.** Validation support is provider-specific. | [S27](https://www.endorlabs.com/use-case/secrets-detection) |
| Arnica Secret Detection | Arnica | AppSec | Detects hardcoded secrets in repository commits. | **Vendor published.** Older policy docs disagree with newer PR-scanning announcement; do not assert PR coverage here. | [S28](https://docs.arnica.io/arnica-documentation/hardcoded-secrets/secret-detection) |
| Xygeni Secrets Scanner | Xygeni | AppSec | Scans code, text, and Docker images for exposed secrets. | **Vendor published.** Validation and historical scanning are separate evaluation dimensions. | [S29](https://docs.xygeni.io/xygeni-products/secrets-security/secrets-scanner) |
| Checkmarx Secrets Detection | Checkmarx | AppSec | Detects hardcoded credentials in development workflows. | **Vendor published.** Confirm packaging and IDE support. | [S30](https://checkmarx.com/product/secrets-detection/) |
| SonarQube secrets detection | Sonar | AppSec | Detects secrets in source and language-agnostic configuration files. | **Vendor published.** Custom rules and feature breadth vary by edition. | [S31](https://docs.sonarsource.com/sonarqube-server/analyzing-source-code/languages/secrets) |
| JFrog Advanced Security secrets scans | JFrog | AppSec | Scans source and binary artifacts for exposed secrets. | **Vendor published.** Advanced Security packaging and validation egress need review. | [S32](https://docs.jfrog.com/security/docs/secrets-scans-1) |
| Mend SAST Secret Scanning | Mend | AppSec | Scans source and configuration files for exposed credentials. | **Vendor published.** CLI option is disabled when unspecified; documentation says detected secrets are not anonymized. | [S33](https://docs.mend.io/platform/latest/code-secret-scanning) |
| Snyk Secrets | Snyk | AppSec | Announces general availability of a dedicated secrets scanner. | **Vendor published.** 2026-08-04 announcement; older Snyk feature comparisons may be stale. | [S34](https://snyk.io/blog/snyk-secrets/) |
| Datadog Secret Scanning | Datadog | AppSec | Scans code for exposed secrets. | **Vendor published.** Check site availability and Code Security configuration. | [S35](https://www.datadoghq.com/product/secret-scanning/) |
| Harness Application Security Testing | Harness | bundled/orchestrated | Lists secrets detection in its application security platform. | **Vendor published.** Do not equate orchestration integrations with native engines. | [S36](https://www.harness.io/products/application-security-testing) |
| Spectral Secrets Scanning | Check Point | AppSec/CNAPP | Scans assets for hardcoded secrets. | **Vendor published.** Spectral product lineage; confirm current Check Point packaging. | [S37](https://guides.spectralops.io/docs/secrets-scanning) |
| Infisical Secret Scanning | Infisical | secrets management + detection | Documents CLI and repository secret scanning. | **Vendor published.** Detection is a separate capability from vault storage. | [S38](https://infisical.com/videos/what-is-infisical) |
| Wiz secrets scanning | Wiz | CNAPP | Scans Git history, pull requests, and images for exposed secrets. | **Vendor published.** CNAPP scope is not implied for every CSPM product. | [S39](https://www.wiz.io/blog/secrets-found-owners-identified-issues-resolved) |
| Orca secrets detection | Orca Security | CNAPP | Lists secrets detection among application security capabilities. | **Vendor published.** Use source-code and workload scope as separate evaluation dimensions. | [S40](https://orca.security/platform/application-security/) |
| Prisma Cloud agentless secrets scanning | Palo Alto Networks | CNAPP | Documents agentless scanning for secrets on workloads. | **Vendor published.** Historical product documentation; confirm current Cortex/Prisma packaging. | [S41](https://www.paloaltonetworks.com/blog/cloud-security/agentless-secrets-scanning/) |
| Defender for Cloud secrets scanning | Microsoft | CNAPP | Documents multiple types of secrets scanning. | **Vendor published.** Repository integrations differ from native VM/deployment scanning. | [S42](https://learn.microsoft.com/en-us/azure/defender-for-cloud/secrets-scanning) |
| FortiCNAPP secrets detection | Fortinet | CNAPP | Documents secrets scanning in its SCA workflow. | **Needs review.** Separate code scanning from agentless workload coverage. Full-page capability evidence unavailable on this pass; search-index evidence only, not a published capability check. | [S43](https://docs.fortinet.com/document/forticnapp/latest/administration-guide/562942/secrets-detection) |
| Aqua container scanning | Aqua Security | CNAPP | Includes secrets in container/build scanning. | **Vendor published.** Commercial Aqua and OSS Trivy are separate product records. | [S44](https://www.aquasec.com/products/container-scanning/) |
| Singularity Cloud Security | SentinelOne | CNAPP | Includes secret scanning in its cloud-security offering. | **Needs review.** Do not attribute this to Singularity identity protection. Full-page capability evidence unavailable on this pass; search-index evidence only, not a published capability check. | [S45](https://www.sentinelone.com/cloud/) |
| ArmorCode secrets integrations | ArmorCode | integration only | Lists GitGuardian Secrets as an integration. | **Vendor published.** Evidence of ingestion, not proof of a native detector. | [S46](https://www.armorcode.com/integrations) |
| Vault Radar | HashiCorp | specialist | Scans code, chat, and other sources for exposed secrets. | **Vendor published.** Separate from Vault secret storage and issuance. | [S47](https://developer.hashicorp.com/vault-radar) |
| Akeyless GitHub Scanner | Akeyless | secrets management + detection | Documents secret discovery across GitHub source and history. | **Vendor published.** Requires Identity & Secrets Intelligence license and configured gateway; code scanning and inventory metadata are distinct. | [S48](https://docs.akeyless.io/docs/github-scanner) |
| Nightfall secrets detection | Nightfall | DLP/API | Provides secrets detection through its scanning API. | **Vendor published.** API detection is not automatically full Git-history scanning. | [S49](https://help.nightfall.ai/developer-api/key-concepts/scanning_features/secrets_detection) |
| Entro secrets discovery | Entro Security | NHI + detection | SailPoint's Entro page includes a customer quotation describing automated secret scanning. | **Needs review.** Customer quotation on vendor site; older Entro URL redirects here. Broader scanning scope and acquisition close date not established. | [S50](https://www.sailpoint.com/products/agentic-ai-security) |
| CodeAnt AI secrets detection | CodeAnt AI | AppSec | Identifies API keys, tokens, and other secrets in code. | **Vendor published.** Confirm scanner engine, retention, and licensing. | [S51](https://docs.codeant.ai/control_center/secrets) |
| ripsecrets | ripsecrets project | OSS | Detects secret keys in source before commit. | **Vendor published.** Community project; no commercial support inferred. | [S52](https://github.com/sirwart/ripsecrets) |
| shhgit | shhgit project | OSS | Finds secrets in code repositories. | **Vendor published.** Repository-monitoring scope; maintenance requires review. | [S53](https://github.com/eth0izzle/shhgit) |
| Qwiet AI Secrets v2 | Harness | AppSec | Identifies hardcoded secrets during code analysis. | **Vendor published.** Docs label this Qwiet AI by Harness; distinct product lineage. | [S54](https://docs.shiftleft.io/sast/analyzing-applications/secrets) |
| ReversingLabs secrets detection | ReversingLabs | software supply chain | Detects exposed secrets in software artifacts. | **Vendor published.** Current packaging needs validation; no superiority claim adopted. | [S55](https://www.reversinglabs.com/detect-prioritize-manage-exposed-secrets-in-software) |
| Socket Basics | Socket | bundled OSS | Runs TruffleHog for secret scanning. | **Vendor published.** Bundled scanner; Socket SCA alone is not proof of this capability. | [S56](https://github.com/SocketDev/socket-basics) |
| Tenable One secrets connectors | Tenable | integration only | Imports secret-detection findings through supported connectors. | **Vendor published.** This source does not establish native cloud secret-scanner scope. | [S57](https://docs.tenable.com/exposure-management/Content/connectors/connectors-and-supported-integrations.htm) |
| Falcon / Legit integration | CrowdStrike | integration only | Lists a Legit integration with secrets detection in code. | **Vendor published.** Partner capability; not evidence of a native Falcon detector. | [S58](https://marketplace.crowdstrike.com/listings/legit-security-platform/) |
| Sysdig legacy image secrets scanning | Sysdig | legacy | Legacy scanner documentation describes image-secret detection. | **Needs review.** Source states legacy engine end of life was 2024-12-31; current replacement capability remains unknown. | [S59](https://docs.sysdig.com/en/docs/sysdig-secure/vulnerabilities/scanning/manage-scanning-policies/scanning-policy-gates-and-triggers/) |
| Postman Secret Scanner | Postman | developer platform | Detects exposed secrets in Postman content. | **Vendor published.** Confirm public/private workspace coverage and plan. | [S60](https://learning.postman.com/docs/administration/managing-your-team/secret-scanner/overview/) |

## Important changes and ambiguous evidence

- **Snyk:** official announcement dated 2026-08-04 says Snyk Secrets is generally available. Older comparisons that omit a dedicated scanner need updating. We do not infer parity from availability.
- **Prisma Cloud:** the agentless-scanning announcement is dated 2023-10-10. Capability lineage is documented; present-day Cortex/Prisma naming, edition and commercial terms need confirmation.
- **Entro:** the former website redirects to SailPoint's Entro page. The current page includes customer quotations about secret scanning. Preserve the Entro entity for now; a redirect and an acquisition-intent reference are insufficient evidence of an acquisition close date. Do not silently rewrite corporate history.
- **Jit:** search-indexed official product and scanner-summary pages describe bundled engines, but full-page retrieval failed (502/404). The record stays `needs_review` until a full original can be reviewed. [Scanner summary](https://docs.jit.io/docs/security-tools).
- **FortiCNAPP:** original documentation is search-indexed, but full-page retrieval returned 403. Keep the code-scanning claim in review. Separate [agentless-workload scope](https://docs.fortinet.com/document/forticnapp/latest/administration-guide/305474/secrets-detected-by-agentless-workload-scanning) from code scanning.
- **SentinelOne:** older indexed cloud pages describe secret scanning; the currently redirected platform page did not expose the same capability text. The record stays in review. Do not copy that claim onto the identity product.
- **Sysdig:** the retrieved legacy scanner page says its engine reached end of life on 2024-12-31. Historical detection is recorded but not asserted as a current supported capability. The newer [SCM integration](https://docs.sysdig.com/en/sysdig-secure/source-code-management/) mentions secret alerts; that alone does not resolve the native-engine question.
- **Arnica:** a [2026-06-23 announcement](https://www.arnica.io/announcement/new-feature-announcement-pr-secrets-scanning-and-secrets-in-head) describes PR scanning, while an older [policy page](https://docs.arnica.io/arnica-documentation/hardcoded-secrets/secrets-policy-settings) says it is not supported by design. This sweep only asserts repository-commit detection from the detector documentation. PR coverage needs reconciled version/edition evidence.
- **OSS lineage:** Betterleaks is separate from Gitleaks; Titus is separate from Nosey Parker; Kingfisher is separately maintained. Shared rules or ancestry do not establish equivalent detection. Credential Digger is in SAP's archived organization; maintenance/license checks remain necessary before adopting any OSS project.
- **Packaging:** ggshield is an open-source client to a hosted engine. Socket Basics bundles TruffleHog. Harness orchestration and Qwiet analysis are separate records. ArmorCode, Tenable One connectors and Falcon/Legit integrations do not receive native-discovery checkmarks.

## AppSec suite modules added 2026-10-26

Cycode Secrets Detection and the other named modules from the table above were already catalog products. This pass adds AppSec suites whose current public pages describe a secrets module and that were still absent. Pages were fetched 2026-10-26. Publication dates are unknown. Statements are vendor-reported. No validity-check cell is filled. No direct-competitor edge is added.

| Product | What the page supports | What it does not support | Source |
| --- | --- | --- | --- |
| Veracode Container and IaC secret rules | Secret rules for image, directory, and repository scans, including listed provider keys and customer regular expressions | SAST CWE-259 and CWE-798 findings. Those stay a different engine. Validity checks are not described. | https://docs.veracode.com/r/Run_Container_Security_scans |
| Black Duck Secrets Scanning | Datasheet: source code, IaC templates, and other file types for hard-coded secrets | Detector list, Git history, and validity. The Sigma hardcoded-secrets checker in Polaris release notes is not this record. The `synopsys` shortlist record is not merged. | https://www.blackduck.com/resources/datasheets/secrets-detection.html |
| OpenText SAST secrets analyzer | One analyzer in the 25.4.0 SAST docs can find secrets across file types. Configuration points to regular-expression analysis. | A separate secrets product, Git-history scanning, validity checks, and any marketing count of secret types. | https://www.microfocus.com/documentation/fortify-static-code-analyzer-and-tools/2540/sast-ugd-html-25.4.0/doc/2263_25.4/secretscanning.html |
| DeepSource secrets detection | Commit scanning for hardcoded credentials with pattern matching and a model named Narada. Team or Enterprise is required. | The page's precision, recall, and false-positive percentages. Those vendor benchmarks are not adopted. | https://deepsource.com/docs/product/secrets-detection |
| Codacy secret detection | Secret detection is a scan type. The table names Opengrep, Trivy, Checkov, PMD, Bandit, and Prospector by language. | A Codacy-authored detector. Scans run on push, not continuously. Complement edges point at the existing Trivy and Checkov products only. | https://docs.codacy.com/getting-started/supported-languages-and-tools/ |

Sonatype Lifecycle documentation describes SCM scans that read manifests, lockfiles, and artifacts for component analysis. That is not a secrets module, so no Sonatype product was added.

## Wiz Code, added 2026-10-26

Wiz secrets scanning was already a catalog product from the blog that describes Git history, pull requests, images, cloud resources, and provider validation. Wiz Code is the adjacent application-security product. Pages fetched 2026-10-26.

| Product | What the page supports | What it does not support | Source |
| --- | --- | --- | --- |
| Wiz Code | The platform page lists secrets scanning and says it finds hardcoded secrets in code, infrastructure-as-code templates, and container images. The same page names SAST, SCA, infrastructure-as-code, and other modules. | Those other module names are not capability cells. Rule counts, exploitability, and AI-fix language are not adopted. The CNAPP record stays a different product and an adjacent budget. | https://www.wiz.io/platform/wiz-code |
| Wiz SAST availability | A post dated 2 Dec 2025 says SAST was in public preview for Wiz Code customers, with repository and pull request scanning. | The platform page fetched 26 Oct 2026 does not repeat the preview label. Current availability stays unknown. No SAST capability cell is filled. | https://www.wiz.io/blog/introducing-wiz-sast-where-code-risk-meets-cloud-context |

## DSPM and DLP neighbors, checked 2026-10-26

Pages were fetched 2026-10-26. Statements are vendor-reported. No validity-check cell is filled. No direct-competitor edge is added. The DSPM or DLP company record does not receive the discovery cell. Third-party guides were not adopted. The private Technical Docs baseline returned 404 on an earlier pass and was not available to re-fetch.

| Product | What the page supports | What it does not support | Source |
| --- | --- | --- | --- |
| Varonis Dev Cycle secrets detection | Exposed secrets and API keys in GitHub and Bitbucket, including commit history and pull requests. Credentials and tokens in Docker images, npm packages, and JFrog artifacts. | A provider validity check. Rotation and token revocation are named and are not separate capability cells. | https://www.varonis.com/solutions/dev-cycle-data-security |
| BigID Secrets Security | Exposed API keys, passwords, tokens, certificates, encryption keys, and credentials across cloud, SaaS, code, collaboration tools, databases, files, and AI environments. | Git history. The page says a detected secret does not by itself show whether it is active. That is not a verification cell. | https://bigid.com/secrets-security/ |
| Sentra cloud secrets scanning | Scanning of code, configuration, and documentation copied into the cloud estate, including environment files, keys, certificates, and infrastructure-as-code. | The article's file-extension count. Git history and provider validity. The page has no publication date. | https://www.sentra.io/learn/source-code-secrets-scanning-the-missing-half-of-your-cloud-data-security-strategy |
| Strac secret scanning | A 10 Aug 2026 post says secret scanning is part of Strac's DLP and names Slack, GitHub, Jira, Confluence, and Google Drive. | Regex, entropy, and machine-learning sentences, which are general methods. "Active secrets" is not a validity check. | https://www.strac.io/blog/secret-scanning |
| Teleskope secrets elements | Entity Taxonomy v2 Secrets family: password, API key, private key, seed phrase, and token. | A Git-history scanner. An example credentials policy on the policy-maker page is not evidence that policy is enabled. | https://docs.teleskope.ai/specifications/entity-taxonomy-v2 |
| Cyera | No secrets product. The DSPM page describes classification. An adjacent-budget edge points at TruffleHog and does not fill a discovery cell. | Third-party guides that name Cyera. ROI and precision figures on the DSPM page. | https://www.cyera.com/platform/dspm |
| Concentric AI | A press release dated 18 May 2023 says Semantic Intelligence could detect hardcoded secrets in data repositories and messaging apps. The claim does not fill a discovery cell. | The product overview fetched the same day, which does not repeat secrets detection. Industry-first language and the customer quotation. | https://concentric.ai/press-release/concentric-ai-announces-industrys-first-deep-learning-driven-detection-of-secrets-and-keys-within-todays-most-popular-on-premise-and-cloud-data-repositories/ |

## Remaining discovery / verification queue

These are deliberately not positive feature assertions. Missing evidence means Unknown, not unsupported.

| Candidate / family | Disposition and next evidence needed |
| --- | --- |
| Tenable Cloud Security / Cloud Exposure | Cloud reports discuss exposed secrets, but the connector evidence is not native scanner evidence. Retrieve current cloud feature documentation and supported surfaces. [Research lead](https://www.tenable.com/blog/secrets-in-the-open-cloud-data-exposures-that-put-your-business-at-risk). |
| CrowdStrike native cloud / ASPM | Partner listing is documented. Obtain a current Falcon-native secrets scanner page before adding native scope. |
| Sysdig current engine | Resolve replacement-engine support; do not reuse retired-engine claims. |
| Doppler, AWS Secrets Manager, Azure Key Vault, Google Secret Manager | Vaulting alone excluded. Require a separately documented exposure scanner; git-secrets is a separate AWS OSS project. |
| Veracode, Black Duck/Polaris, Snyk legacy checks, Sonatype | Checked 2026-10-26. Veracode Container and IaC secret rules, the Black Duck secrets-scanning datasheet, OpenText SAST's secrets analyzer, DeepSource secrets detection, and Codacy's named-tool secret detection are now catalog products. Veracode SAST CWE-259 and CWE-798 findings stay off that product. Sonatype Lifecycle's SCM scan reads manifests and artifacts for component analysis; that is not a secrets module and no Sonatype secrets product was added. Snyk's dedicated product was already included above. |
| Upwind, Uptycs, Qualys, Prowler, KICS, Terrascan | Check precise native secret/credential rules and surfaces. CSPM/IaC posture coverage alone is insufficient. |
| Varonis, BigID, Cyera, Sentra, Teleskope, Concentric, Strac | Checked 2026-10-26. Varonis, BigID, Sentra, Strac, and Teleskope now have secrets records beside the DSPM or DLP company record. Cyera's DSPM page was not adopted as a detector. Concentric's 18 May 2023 announcement is recorded and does not fill a discovery cell because the current product overview does not repeat it. Nightfall was already evidenced separately. |
| Gitrob, detect-secrets forks, CredScan, Veles, LeakTK, newer small OSS scanners | Resolve canonical repo, maintained/archived status, license and whether wrapper, rule pack, or independent engine. Do not inflate company counts with forks. |
| Mobile/binary/web scanners | Evaluate explicit embedded-credential extraction separately from source scanning and generic sensitive-data matches. |

## Evaluation dimensions to deepen next

For a buyer shortlist, record: repositories and full history; files/images/VMs; cloud deployment metadata; SaaS/chat/tickets; developer endpoints and AI-agent artifacts; custom/generic/encoded detection; provider-specific validity checks; ownership and blast radius; pre-commit/push enforcement; rotation/revocation; private deployment and egress; retention and redaction; price unit and maintenance costs. Unknown remains Unknown. A valid secret is not necessarily exploitable in a buyer's environment; a removed Git string is not a revoked credential.

Do not run scanners against third-party accounts or test discovered credentials as part of desk research. A later authorized evaluation should use synthetic test fixtures, documented scanner versions, the same corpus and clear precision/recall methodology.

## Review and downstream disposition

- Security Market Map: proposed typed catalog update with explicit source status; category membership alone never fills comparison cells.
- Joy Index: read-only reference and learning notes, linked to this canonical sweep rather than copied vendor data.
- Detector Coverage Atlas: no changes; provider/detector-level comparison is separate future work.
- Interview, CRM, employer, and revenue-model stores: no changes; no private facts used.
- Shared Research Intelligence Lifecycle reference returned 404 during this pass. Local Competitive Intelligence Playbook and existing catalog provenance rules governed the work.

Refresh before a buying or competitive decision and after relevant releases, redirects, acquisitions or archived-repo notices. Suggested review cadence is monthly; **no automation was created**.
