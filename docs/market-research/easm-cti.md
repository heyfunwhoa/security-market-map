# External attack surface management and cyber threat intelligence

The exposure management team asks which internet-facing assets belong to the organization and who can fix them. The intelligence team asks which threats warrant a decision, what evidence supports that assessment and who needs the result. A sector advisory can connect the two when an exposure owner identifies the affected asset.

| Starting point in the app | Buyer drill-down |
| --- | --- |
| Corporate security → Exposure → [External attack surface](https://security-market-map.vercel.app/categories/external-attack-surface#market-research) | 25 offerings across five buyer needs, from discovery and ownership to application testing. |
| Security operations → [Threat intelligence](https://security-market-map.vercel.app/categories/threat-intelligence#market-research) | 22 offerings across six buyer needs, including adversary research, infrastructure investigation, intelligence management and vulnerability prioritization. |
| Application security → [Secrets detection → Public monitoring](https://security-market-map.vercel.app/categories/secrets-detection#public-monitoring) | Six offerings for investigating secrets or code exposed outside company-controlled repositories. EASM, threat intelligence and digital risk protection link into this comparison. |

Each category links to the other market, relevant existing vendor profiles and original evidence. Ten vendor or brand entries have sourced products in both directories. This is a count within the two selected directories. Product scopes, commercial entitlements and buyer shortlists require separate confirmation.

## Research and downloads

### Three more public exposure categories

| Category and buyer question | Example and handoff | Products and original evidence |
| --- | --- | --- |
| [Digital risk protection](https://security-market-map.vercel.app/categories/digital-risk-protection#public-exposure-guide) · Who can get a fake sign-in page removed? | Brand protection confirms the impersonation. The trademark owner authorizes action where required. Track requests separately from confirmed removals. | [Group-IB Digital Risk Protection](https://www.group-ib.com/products/digital-risk-protection/) · [Recorded Future Brand Intelligence](https://www.recordedfuture.com/products/brand-intelligence) · [SOCRadar Brand Protection plans](https://socradar.io/pricing/) |
| [Identity threat detection and response](https://security-market-map.vercel.app/categories/itdr#public-exposure-guide) · Does a leaked login belong to a current employee account? | An employee email appears in external breach data. The SOC identifies the account and hands the finding to identity operations to check activity and decide on a response. | [Flare Breaches](https://docs.flare.io/breaches) · [Searchlight Threat](https://www.slcyber.io/threat) |
| [Cloud security posture](https://security-market-map.vercel.app/categories/cspm#public-exposure-guide) · Who can read this bucket or container? | A cloud team reviews the storage permissions with the data owner, records the intended audience and confirms the resulting access. Investigating a download requires separate evidence. | [AWS IAM Access Analyzer for S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-analyzer.html) · [Microsoft Defender CSPM storage exposure criteria](https://learn.microsoft.com/en-us/azure/defender-for-cloud/concept-data-security-posture-prepare) |

These are proposed buyer workflows and measures. In each category, open a product to read its specific supported claim, limitations, check date and publisher source. The comparison reuses the same evidence as the vendor profiles. A shared scenario alone does not establish equivalence. The six EASM and CTI entries for Group-IB, Searchlight Cyber and SOCRadar now link to their catalog vendors.

### Public monitoring buyer conversation

Ask what the customer wants to find. An unknown internet-facing host belongs with the exposure team. A company API key in a personal repository needs an attributed alert and an owner who can revoke the key. Copied proprietary code may need a takedown. An employee login in a breach report belongs with identity response. A single incident can involve several of these teams.

| Buyer decision | Offerings to evaluate | Evidence to ask for |
| --- | --- | --- |
| Find an organization-linked secret in public developer activity | GitGuardian Public Monitoring, GitHub Secret Protection public monitoring, Truffle Security Forager | The actual source covered, historical or ongoing detection, the attribution signal, and who can act on the alert. |
| Investigate reports of exposed code or company data | Flare public repository leak investigation, Recorded Future Brand Intelligence, SOCRadar Brand Protection | A reviewed code or data match, the analyst handoff, and how the team tracks removal and credential rotation. |

#### What each vendor does

| Vendor and offering | What the security team gets | Original evidence |
| --- | --- | --- |
| GitGuardian Public Monitoring | Finds company-linked secrets in public developer activity. GitHub commits have ongoing and historical coverage. Gists have historical coverage. Historical Docker Hub image scanning is available to selected workspaces. | [Monitored sources](https://docs.gitguardian.com/public-monitoring/sources/overview) · [How a finding is linked to a company](https://docs.gitguardian.com/public-monitoring/perimeter/overview) |
| GitHub Secret Protection public monitoring | Alerts eligible enterprises about secrets found across public GitHub, including personal repositories, Gists and issue or pull request comments. Attribution uses enterprise membership or a verified email domain, with a domain-only rule for data-residency customers. | [Coverage and attribution](https://docs.github.com/en/enterprise-cloud@latest/code-security/concepts/secret-security/public-monitoring) · [Availability and licensing](https://github.blog/changelog/2026-10-28-public-monitoring-for-enterprises-generally-available/) |
| Truffle Security Forager | Shows verified keys associated with a company email domain from public GitHub commits and npm releases. An AppSec team can investigate a key exposed in the package that users actually downloaded. | [Forager in the user guide](https://trufflesecurity.com/docs/user-enablement-guide) · [Domain attribution and verification](https://trufflesecurity.com/blog/introducing-forager) |
| Flare Cyber Threat Intelligence Platform | Helps an analyst investigate code or configuration that matches company identifiers in public GitHub. Its breach directory separately shows exposed accounts that match the customer’s identifiers. | [Platform overview](https://flare.io/cyber-threat-intelligence-platform) · [Public repository workflow](https://docs.flare.io/queries) · [Breach directory](https://docs.flare.io/breaches) |
| Recorded Future Brand Intelligence | Alerts analysts to exposed company information, including source code and employee credentials, across repositories, paste sites and underground forums. Its product page also describes takedowns for supported brand abuse. Removal of a particular code leak and revocation of a key require separate confirmation. | [Coverage datasheet, page 2](https://assets.recordedfuture.com/Datasheets/brand-intelligence-module.pdf) · [Product and response scope](https://www.recordedfuture.com/products/brand-intelligence) |
| SOCRadar Brand Protection | SOCRadar describes monitoring public GitHub and GitLab for company material such as code or API keys. Ask how an alert is attributed to the customer, how far back coverage goes, and which credential types can be validated. Those details remain unknown from these sources. | [Public code monitoring](https://socradar.io/blog/implementing-cyber-threat-intelligence-in-software-development-lifecycle-sdlc-pipelines/) · [Brand Protection feature table](https://socradar.io/pricing/) |

The [catalog evidence](../../lib/data/public-monitoring.ts) supplies the same claims to the vendor profiles, Sources registry and public monitoring comparison. The [buyer guide](../../research/public-secret-monitoring.json) adds the proposed buyer fit and evaluation question for each offering. The initial comparison was prepared November 19, 2026. Source passages were rechecked November 20 UTC. The earlier Recorded Future solution-brief link redirected to the homepage during this review. The current datasheet and product page support the narrower response wording above.

All six explanations use publisher documentation or marketing material. Each claim records the section consulted, scope, caveat, evidence status and check date. Publication dates are unknown unless the publisher gave a date. Security Market Map maintainer review is pending. Review at the next material source, packaging or product change, or by February 19, 2027. Only original paraphrases and links are included. These six offerings form a separate sample from the EASM and CTI directories.

### EASM and threat intelligence downloads

- [Filterable workbook](../../public/research/easm-cti-market-map.xlsx) with the two markets, both directories, overlap, industry, buyer questions and company history.
- [Conversation guide](../../public/research/easm-cti-conversation-guide.pdf) with a one-page map for each market.
- [On-page research snapshot](../../research/easm-cti.json) with publisher URLs at the offering, industry observation and corporate event. The snapshots derive from the same November review. When revising this edition, reconcile descriptions, totals, source links and downloads together.

## Review record

| Field | Record |
| --- | --- |
| Owner and review | Security Market Map maintainer. Candidate research pending human editorial review. |
| Placement | The paired directories use `external-attack-surface` and `threat-intelligence`. The focused guides reuse the secrets detection, threat intelligence, digital risk protection, identity threat detection and cloud posture categories. Across these additions there are four new vendors, eight new products and seventeen source-linked product claims. |
| Evidence and dates | Product descriptions are vendor-reported. Forecasts are attributed analyst estimates. The directory sources were checked November 19, 2026. The public monitoring claim records carry the subsequent inspection date in UTC. Publication dates are unknown unless recorded. |
| Editorial interpretation | Buyer needs, likely participants, talk tracks and evaluation criteria are proposed interpretations. Independent effectiveness, licensing and direct substitutability are unknown unless supported separately. |
| Rights and privacy | Public sources linked and paraphrased. The workbook and PDF contain original summaries. |
| Next review | Proposed February 19, 2027, or earlier after material packaging changes, acquisitions, product retirement or source corrections. |

Review or correct the relevant row and its source under [Contributing research](../../CONTRIBUTING.md). The linked buyer situations are examples for discussion.
