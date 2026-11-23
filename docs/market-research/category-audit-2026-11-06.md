# Current category and explanation audit

**Audit date:** 2026-11-06; **refreshed:** 2026-11-22. **Owner:** Security Market Map maintainer. **Review:** human editorial review pending. **Baseline:** `main` commit `3117ba7efb660794e616fb9e637ab6acbb06017b` (refresh). The original 6 Nov audit used `e31e89f`; counts, tables and findings below were recomputed from the refreshed baseline. Catalog code is unchanged by that draft. **Next review:** after the next catalog publication.

## Scope and method

Complete inventory of the parsed catalog, per-category coverage counts, source metadata, existing research-document inventory, schema and category/product rendering paths. Loaded `lib/catalog.ts` through the installed Vite SSR loader, so counts include composed modules and schema validation rather than text-search estimates. Inspected `lib/schema.ts`, category route, `lib/product-research.ts`, PRD and existing explanation/product templates. No production browser audit, vendor effectiveness benchmark, full reread of every external source or legal/compliance assessment was performed. “Complete inventory” does not mean every stored claim was independently revalidated.

The fresh authoritative-source review and adjacent explanations are in [the adjacent guide](adjacent-category-guide.md). The proposed authoring/presentation contract is in [the explanation system](../product/category-explanation-system.md).

## Current inventory

| Collection | Records |
| --- | ---: |
| domains | 11 |
| categories | 77 |
| vendors | 271 |
| products | 373 |
| capabilities | 53 |
| useCases | 17 |
| personas | 37 |
| sources | 643 |
| claims | 598 |
| relationships | 95 |
| stories | 0 |
| pricing | 1 |
| events | 19 |
| glossary | 22 |
| scenarios | 2 |
| distinctions | 4 |

Counts represent records, not breadth of tested capabilities or completed profile pages. Only three product slugs are enabled in the dedicated product-research page registry: Kingfisher, GitGuardian Developer Endpoint and Aikido Device Protection. There are 373 product records, not 373 implemented deep-dive pages.

## Category evidence by domain

“Category with a claim” means at least one `subjectType=category` record. It does not mean that the definition or every teaching field is sourced, approved or current. Cross-domain memberships overlap, so domain totals must not be added together.

| Domain | Category memberships | Categories with direct claims | Direct claim records |
| --- | ---: | ---: | ---: |
| Identity security (`identity`) | 16 | 15 | 70 |
| Corporate and IT security (`corporate`) | 20 | 18 | 49 |
| Application security (`appsec`) | 15 | 13 | 49 |
| Product security (`product`) | 12 | 11 | 42 |
| Cloud security (`cloud`) | 14 | 12 | 35 |
| Data security (`data`) | 9 | 7 | 25 |
| Security operations (`secops`) | 17 | 15 | 57 |
| Governance, risk, and compliance (`grc`) | 7 | 4 | 15 |
| Security validation (`offensive`) | 4 | 4 | 13 |
| Platform and infrastructure security (`platform`) | 8 | 8 | 32 |
| AI security (`ai`) | 7 | 7 | 38 |

## Findings and priorities

| Priority | Finding | Evidence / consequence | Action |
| --- | --- | --- | --- |
| P0 | Explanation and evidence need separate completion states | 68/77 categories have a direct category claim, but 243 of the 246 category claim records are `needs_review`; two are `verified`, one `vendor_published` | Show foundation drafted, references attached and reviewed as separate states; never call claim presence “verified coverage” |
| P0 | Neutral references are still a minority of the typed source ledger | 36 of 643 sources have `sourceType=standard` (OWASP, NIST, CIS, NICE, OpenSSF, NIS2 and NERC CIP material); 203 are analyst sources | Add bounded, reviewed standards anchors for adjacent categories; do not globally relabel vendor/analyst evidence |
| P1 | The common flow is identity-shaped | Required `flowSchema` fields are actor, credential, permission, decision, action and evidence | Add an optional generic workflow shape in a future schema/UI PR; preserve current identity flow until migrated |
| P1 | Practical examples are uneven | 44 of 77 categories have no linked use-case record | Add scenario coverage based on learner needs; a category can have explanatory prose even without a use-case entity |
| P1 | Catalog breadth exceeds deep product research | 373 products but only three enabled product-research pages | Prioritize standalone category explanation before multiplying vendor pages |
| P1 | Foundational fields do not carry field-level provenance | Category route explicitly calls definition, owner, budget, triggers, outcomes and workflow editorial wording | Keep that disclosure; later attach exact source scope to each supported statement, not a blanket standards badge |
| P1 | Framework, market category, practice and service are mixed in one category collection | CTEM, product-security program, MDR and scanning tools represent different kinds of things | Add proposed `conceptKind` metadata, preserving existing IDs and routes; avoid a disruptive taxonomy rewrite |
| P2 | The header date is the newest claim, not a review date | The catalog header now uses the newest claim date (2026-11-22), with `AS_OF` only as a fallback; source retrieval dates span 2026-09-23 to 2026-11-22 | Keep per-source/claim dates visible; a newest-claim date does not mean older records were rechecked |
| P2 | Some catalog categories are intentionally exploratory | 9 categories have no primary product memberships | Do not auto-fill products; retain a useful neutral explanation and visible research gaps |
| P2 | Two canonical source URLs are registered twice | AvePoint (`src-avepoint-dspm-20261013`, `src-expanded-avepoint-dspm`) and a Forrester software supply chain report (`src-forrester-sscs-res203185`, `src-forrester-ssc-roles-2026`) | Review claim history before consolidating IDs; this is not a broken-reference finding |
| P2 | Source registration does not ensure claim usage | 119 of 643 source records are not referenced by a typed claim's `sourceId` (many support persona, segment or research pages) | Review intent; a source may support future research, so do not delete automatically |

All 77 categories have schema-required definition, buyer question, owner, triggers, budget, outcomes, adjacency, domain membership, example workflow and illustrative flow. Structural completeness is not explanation quality. The current category page already provides domain/adjacency links and a broaden path; reuse these. Comparison callouts currently appear early for secrets detection and endpoint control; future content-order review should keep the category lesson primary and comparison optional.

## Every category: inventory and review queue

C = direct category claim records; U = linked use cases; P = products with primary membership. A zero C does not imply zero vendor/product evidence. “No direct category claim” is an editorial review queue, not an assertion that the category is absent or invalid.

| Category ID | Name | Domains | C | U | P | Category evidence action |
| --- | --- | --- | ---: | ---: | ---: | --- |
| `workforce-identity` | Workforce identity | identity | 4 | 3 | 6 | Review pending claims and teaching scope |
| `ciam` | Customer identity (CIAM) | identity | 5 | 1 | 6 | Review pending claims and teaching scope |
| `iga` | Identity governance (IGA) | identity | 6 | 5 | 13 | Review pending claims and teaching scope |
| `pam` | PAM and PIM | identity, corporate | 3 | 1 | 10 | Review pending claims and teaching scope |
| `ciem` | CIEM and access intelligence | identity, cloud | 3 | 2 | 5 | Review pending claims and teaching scope |
| `itdr` | Identity threat detection and posture (ITDR, ISPM) | identity, secops | 7 | 3 | 10 | Review pending claims and teaching scope |
| `secrets-detection` | Secrets detection and remediation | identity, appsec | 2 | 3 | 69 | Review pending claims and teaching scope |
| `secrets-management` | Secrets management | identity, platform | 8 | 3 | 16 | Review pending claims and teaching scope |
| `nhi` | NHI and workload identity | identity, platform | 6 | 5 | 17 | Review pending claims and teaching scope |
| `wim` | Workload identity management (WIM) | identity, cloud, platform | 3 | 1 | 7 | Review pending claims and teaching scope |
| `agent-identity` | AI agent identity and runtime authorization | identity, product, ai | 5 | 1 | 4 | Review pending claims and teaching scope |
| `identity-orchestration` | Identity orchestration and authorization | identity, appsec | 3 | 0 | 4 | Review pending claims and teaching scope |
| `adjacent-security` | Adjacent security | identity, cloud, data, grc | 0 | 1 | 1 | No direct category claim; source foundational statements |
| `security-data-pipelines` | Security data pipeline platforms (SDPP) | secops, platform | 3 | 0 | 3 | Review pending claims and teaching scope |
| `detection-engineering` | Detection engineering lifecycle | secops | 1 | 0 | 2 | Review pending claims and teaching scope |
| `endpoint-security` | Endpoint security | corporate, secops | 0 | 0 | 3 | No direct category claim; source foundational statements |
| `email-security` | Email security | corporate | 2 | 1 | 11 | Review pending claims and teaching scope |
| `network-edge` | Network edge | corporate | 4 | 0 | 5 | Review pending claims and teaching scope |
| `it-vulnerability-management` | IT vulnerability management | corporate | 4 | 1 | 5 | Review pending claims and teaching scope |
| `ctem` | Continuous threat exposure management | corporate, cloud | 2 | 1 | 0 | Review pending claims and teaching scope |
| `security-awareness` | Security awareness | corporate | 1 | 1 | 1 | Review pending claims and teaching scope |
| `sast` | Static analysis (SAST) | appsec, product | 3 | 1 | 8 | Review pending claims and teaching scope |
| `dast` | Dynamic testing (DAST) | appsec | 0 | 0 | 4 | No direct category claim; source foundational statements |
| `sca` | Software composition analysis | appsec, product | 5 | 1 | 7 | Review pending claims and teaching scope |
| `api-security` | API security | appsec, product | 7 | 0 | 8 | Review pending claims and teaching scope |
| `aspm` | Application security posture | appsec, product | 2 | 0 | 10 | Review pending claims and teaching scope |
| `app-runtime` | Application runtime protection | appsec | 1 | 0 | 2 | Review pending claims and teaching scope |
| `product-security-program` | Product security program | product | 5 | 1 | 0 | Review pending claims and teaching scope |
| `threat-modeling` | Threat modeling | appsec, product | 4 | 0 | 1 | Review pending claims and teaching scope |
| `vulnerability-disclosure` | Disclosure and bug bounty | product, offensive | 3 | 1 | 2 | Review pending claims and teaching scope |
| `customer-trust` | Customer trust | product, grc | 0 | 1 | 1 | No direct category claim; source foundational statements |
| `cspm` | Cloud posture (CSPM) | cloud | 2 | 1 | 6 | Review pending claims and teaching scope |
| `cwpp` | Cloud workload protection | cloud, platform | 1 | 0 | 0 | Review pending claims and teaching scope |
| `cnapp` | Cloud-native application protection | cloud | 4 | 0 | 8 | Review pending claims and teaching scope |
| `cloud-detection` | Cloud detection and response | cloud, secops | 3 | 0 | 3 | Review pending claims and teaching scope |
| `dspm` | Data security posture | cloud, data | 5 | 1 | 23 | Review pending claims and teaching scope |
| `dlp` | Data loss prevention | corporate, data | 2 | 2 | 5 | Review pending claims and teaching scope |
| `privacy-governance` | Privacy governance | data, grc | 1 | 0 | 2 | Review pending claims and teaching scope |
| `data-access-governance` | Data access governance | identity, data | 4 | 1 | 4 | Review pending claims and teaching scope |
| `database-security` | Database security | data | 0 | 1 | 2 | No direct category claim; source foundational statements |
| `data-encryption` | Encryption and tokenization | data | 8 | 1 | 3 | Review pending claims and teaching scope |
| `siem` | SIEM | secops | 4 | 0 | 4 | Review pending claims and teaching scope |
| `soar` | SOAR and response automation | secops | 3 | 0 | 0 | Review pending claims and teaching scope |
| `grc-controls` | Control evidence and risk | grc | 3 | 1 | 1 | Review pending claims and teaching scope |
| `third-party-risk` | Third-party risk | grc | 4 | 1 | 2 | Review pending claims and teaching scope |
| `breach-simulation` | Breach and attack simulation | secops, offensive | 4 | 0 | 3 | Review pending claims and teaching scope |
| `pentest-program` | Penetration testing | product, offensive | 1 | 0 | 0 | Review pending claims and teaching scope |
| `container-security` | Container and Kubernetes security | cloud, platform | 3 | 0 | 4 | Review pending claims and teaching scope |
| `iac-security` | Infrastructure-as-code security | cloud, platform | 1 | 0 | 1 | Review pending claims and teaching scope |
| `xdr` | Extended detection and response | corporate, secops | 4 | 0 | 4 | Review pending claims and teaching scope |
| `mdr` | Managed detection and response | secops | 4 | 0 | 6 | Review pending claims and teaching scope |
| `ndr` | Network detection and response | corporate, secops | 4 | 0 | 4 | Review pending claims and teaching scope |
| `threat-intelligence` | Threat intelligence | secops | 4 | 0 | 11 | Review pending claims and teaching scope |
| `malware-analysis` | File and malware analysis | secops | 0 | 0 | 3 | No direct category claim; source foundational statements |
| `ai-soc-investigation` | AI SOC investigation | secops | 4 | 0 | 3 | Review pending claims and teaching scope |
| `sspm` | SaaS security posture | identity, corporate | 3 | 0 | 5 | Review pending claims and teaching scope |
| `waf-waap` | Web application and API protection | appsec | 4 | 0 | 5 | Review pending claims and teaching scope |
| `microsegmentation` | Microsegmentation | corporate, cloud | 2 | 0 | 2 | Review pending claims and teaching scope |
| `external-attack-surface` | External attack surface | corporate, offensive | 5 | 0 | 8 | Review pending claims and teaching scope |
| `digital-risk-protection` | Digital risk protection | corporate | 2 | 0 | 0 | Review pending claims and teaching scope |
| `security-asset-management` | Cyber asset management | corporate | 3 | 0 | 2 | Review pending claims and teaching scope |
| `ot-security` | OT and IoT security | corporate | 3 | 0 | 4 | Review pending claims and teaching scope |
| `insider-risk` | Insider risk | data, secops | 3 | 0 | 3 | Review pending claims and teaching scope |
| `security-ratings` | Security ratings | grc | 0 | 0 | 3 | No direct category claim; source foundational statements |
| `enterprise-browser` | Enterprise browser | corporate | 1 | 0 | 2 | Review pending claims and teaching scope |
| `ai-application-security` | AI application security | appsec, product, ai | 6 | 0 | 4 | Review pending claims and teaching scope |
| `runtime-validated-application-security` | Runtime-validated application security | appsec, product | 1 | 0 | 0 | Review pending claims and teaching scope |
| `cyber-recovery` | Cyber recovery | corporate | 3 | 0 | 4 | Review pending claims and teaching scope |
| `agentic-runtime` | Agentic runtime enforcement | identity, secops, ai | 8 | 0 | 14 | Review pending claims and teaching scope |
| `endpoint-control` | Endpoint control and prevention | corporate, secops | 1 | 1 | 4 | Review pending claims and teaching scope |
| `mcp-security` | MCP and tool security | appsec, ai | 4 | 1 | 2 | Review pending claims and teaching scope |
| `ai-data-security` | AI data security | data, ai | 2 | 1 | 0 | Review pending claims and teaching scope |
| `model-security` | Model and infrastructure security | cloud, ai | 6 | 0 | 1 | Review pending claims and teaching scope |
| `ai-governance` | AI governance | grc, ai | 7 | 0 | 2 | Review pending claims and teaching scope |
| `software-supply-chain` | Software supply chain | appsec, platform | 7 | 1 | 14 | Review pending claims and teaching scope |
| `cloud-vulnerability` | Cloud vulnerability management | corporate, cloud | 0 | 0 | 2 | No direct category claim; source foundational statements |
| `iast` | Interactive application testing | appsec | 0 | 0 | 0 | No direct category claim; source foundational statements |

## Existing research documents

Inventory of research Markdown on the refreshed baseline plus this PR's files. Titles are navigation evidence, not an assertion that every document was refreshed. Historical documents retain their original dates. The 6 Nov foundation files belong to PR #137 until it merges.

| File | Existing title |
| --- | --- |
| [adjacent-analyst-fields-2026-10.md](adjacent-analyst-fields-2026-10.md) | Adjacent analyst fields — 26 Oct 2026 |
| [adjacent-category-guide.md](adjacent-category-guide.md) | Beyond SecOps: category explanations and authoritative guidepoints |
| [agentic-email-security-2026-11-05.md](agentic-email-security-2026-11-05.md) | Agentic and API-native email security — November 2026 competitive landscape |
| [agentic-secops-competitive-landscape.md](agentic-secops-competitive-landscape.md) | Agentic SecOps and MSSP/MDR platform landscape — October 2026 |
| [ai-native-developer-security-agentic-remediation.md](ai-native-developer-security-agentic-remediation.md) | AI-native developer security and agentic remediation — category research candidate |
| [analyst-dspm-secrets-expansion.md](analyst-dspm-secrets-expansion.md) | Analyst-informed DSPM and secrets expansion |
| [appsec-analyst-coverage-2026-11.md](appsec-analyst-coverage-2026-11.md) | AppSec analyst coverage |
| [aws-security-ecosystem-2026-11.md](aws-security-ecosystem-2026-11.md) | AWS security ecosystem: buyer-led architecture and partner map |
| [aws-security-hub-product-deep-dive-2026-11.md](aws-security-hub-product-deep-dive-2026-11.md) | AWS Security Hub: product deep dive |
| [aws-security-learning-scenario-2026-11.md](aws-security-learning-scenario-2026-11.md) | AWS security learning scenario: compromised workload identity and S3 data access |
| [category-audit-2026-11-06.md](category-audit-2026-11-06.md) | Current category and explanation audit |
| [cloud-corp-analyst-coverage-2026-11.md](cloud-corp-analyst-coverage-2026-11.md) | Cloud, AI, platform, corporate, GRC and offensive analyst coverage |
| [competitive-intelligence-playbook.md](competitive-intelligence-playbook.md) | Competitive Intelligence Playbook — Cybersecurity Markets |
| [delinea-dsv-vs-traditional-pam.md](delinea-dsv-vs-traditional-pam.md) | Delinea DevOps Secrets Vault vs. traditional PAM vaults |
| [developer-endpoint-gitguardian-aikido-2026-10-29.md](developer-endpoint-gitguardian-aikido-2026-10-29.md) | Developer endpoint and AI workflow security: GitGuardian vs Aikido |
| [dspm-analyst-discovery.md](dspm-analyst-discovery.md) | DSPM analyst-led discovery — 2026-10-13 |
| [dspm-coverage-expansion.md](dspm-coverage-expansion.md) | DSPM coverage expansion |
| [dspm-vendor-refresh.md](dspm-vendor-refresh.md) | DSPM and adjacent data security: Teleskope, Concentric AI, Nightfall |
| [easm-cti.md](easm-cti.md) | External attack surface management and cyber threat intelligence |
| [empty-category-vendors-2026-11.md](empty-category-vendors-2026-11.md) | Vendors for categories that had none |
| [field-notes-template.md](field-notes-template.md) | Field notes intake |
| [file-analysis-ai-investigation-landscape-2026-11.md](file-analysis-ai-investigation-landscape-2026-11.md) | File analysis, retained-evidence hunting and AI investigation — November 2026 |
| [gartner-2026-metadata-seed.md](gartner-2026-metadata-seed.md) | Gartner 2026 research — metadata-only seed (KRU-106) |
| [industry-category-foundation.md](industry-category-foundation.md) | Cybersecurity industry and category foundation |
| [industry-identity-requirements-2026-11.md](industry-identity-requirements-2026-11.md) | Industry identity requirements |
| [ispm-wim-categories-2026-11.md](ispm-wim-categories-2026-11.md) | ISPM and WIM categories |
| [kingfisher-oss-deep-dive-2026-10-30.md](kingfisher-oss-deep-dive-2026-10-30.md) | Kingfisher: open-source secrets detection and credential response |
| [limacharlie-agent-runtime-engineering-burden.md](limacharlie-agent-runtime-engineering-burden.md) | LimaCharlie AI Sessions vs other agent architectures — engineering burden thesis |
| [limacharlie-audience-personas.md](limacharlie-audience-personas.md) | LimaCharlie audience and buyer personas — current-state research |
| [limacharlie-environments-sales-cycles-2026-10-29.md](limacharlie-environments-sales-cycles-2026-10-29.md) | LimaCharlie environment technical fit and sales-cycle hypotheses |
| [limacharlie-icp-signals-validation-2026-10-29.md](limacharlie-icp-signals-validation-2026-10-29.md) | LimaCharlie ICP trigger signals and validation evidence |
| [limacharlie-platform-foundation.md](limacharlie-platform-foundation.md) | LimaCharlie platform foundation — evidence note |
| [review-template.md](review-template.md) | Research review record |
| [sacr-category-crosswalk-2026-11-06.md](sacr-category-crosswalk-2026-11-06.md) | SACR coverage crosswalk for Security Market Map |
| [sacr-cross-domain-enrichment-2026-10.md](sacr-cross-domain-enrichment-2026-10.md) | SACR cross-domain market enrichment — reviewed source snapshot |
| [secops-data-analyst-coverage-2026-11.md](secops-data-analyst-coverage-2026-11.md) | SecOps and data security analyst coverage |
| [secops-infrastructure-overlap.md](secops-infrastructure-overlap.md) | Security data, SecOps infrastructure and AI SOC overlap |
| [secops-mssp-economics-2026-11-06.md](secops-mssp-economics-2026-11-06.md) | EDR, SecOps and MSSP economics: a buyer-led market map |
| [secops-pipelines-detection-enrichment.md](secops-pipelines-detection-enrichment.md) | SecOps data infrastructure and detection engineering — evidence review |
| [secrets-detection-sweep-2026-10-13.md](secrets-detection-sweep-2026-10-13.md) | Secrets detection market sweep |
| [secrets-management-comparison.md](secrets-management-comparison.md) | Secrets management landscape: Infisical and alternatives |
| [security-ecosystem-map.md](security-ecosystem-map.md) | Security ecosystem map — personas, work edges, coverage, and influence |
| [security-org-personas.md](security-org-personas.md) | Security organization personas — core five plus adjacent seats |
| [security-titles-and-pains.md](security-titles-and-pains.md) | Security seats — functions, titles, acronyms, and pains |
| [sourced-fields-2026-10-27.md](sourced-fields-2026-10-27.md) | Sourced field sentences — 27 Oct 2026 |
| [standards-coverage-2026-11.md](standards-coverage-2026-11.md) | Standards and regulation coverage |
| [vendor-seat-targeting-template.md](vendor-seat-targeting-template.md) | Vendor seat targeting: how to add a category |
| [workforce-identity-and-credential-response.md](workforce-identity-and-credential-response.md) | Workforce identity and credential exposure |

## Completion and implementation boundary

Delivered: inventory across every current category; specific gaps; adjacent domain explanations; authoritative reference guidepoints; reusable explanation contract. Existing vendor records remain intact. No new category IDs, vendor capabilities or comparison relationships were generated.

Next implementation sequence: review reference scope → pilot the explanation contract on CSPM, DSPM, SAST, third-party risk and cyber recovery → add reviewed typed metadata → render in existing category pages → validate learner tasks and accessibility → consider broader rollout. Proposed effort: 1–2 editorial days for five pilots, 2–4 engineering days for schema/rendering and validation, then 1–2 editorial hours per category for straightforward enrichment; complex sources need more. Estimates are planning assumptions. AI assists extraction and consistency; a human owns technical/source review.

Repo integrity checks validate structure, not truth. UI/browser checks are required only when presentation is implemented. Do not present this documentation change as a deployed system or a source freshness refresh of all 643 records.
