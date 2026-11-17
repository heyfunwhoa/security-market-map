# ISPM and WIM categories

As of **2026-11-17**. Status: categories, capabilities, use cases, glossary, alternatives, seat links and a first vendor batch are proposed. Human review is pending. Owner: repository maintainer. Next review: **2026-12-17**, or sooner if a listed product is acquired, renamed or repackaged.

## Why

The catalog had no place for two buyer conversations that come up next to NHI, CIEM and ITDR:

- **Identity security posture management (ISPM):** "Where is our identity estate weak right now?" This means misconfiguration, MFA gaps, dormant or orphaned accounts and shadow admins across IdPs, directories, cloud and SaaS.
- **Workload identity management (WIM):** "Can this workload prove what it is and get access without a stored key?" This means attestation, short-lived workload identities, federation, and workload-to-resource policy.

Before this change, workload federation sat inside `nhi`. ISPM appeared only as an unadopted section heading in a SACR report note (see `claim-sacr-iga-entitlements-20251202` notes).

## Placement (zoom out → zoom in)

| Zoom level | ISPM | WIM |
| --- | --- | --- |
| Domain | Identity | Identity, Platform, Cloud |
| Category (new) | `ispm`, group `detection`, core | `wim`, group `machines`, core |
| Adjacent categories | `itdr`, `ciem`, `iga`, `workforce-identity`, `nhi`, `sspm`, `cspm` | `nhi`, `secrets-management`, `agent-identity`, `ciem`, `container-security`, `cnapp` |
| Back-links added | `ciem` and `itdr` now list `ispm` as adjacent | `nhi` and `secrets-management` now list `wim` as adjacent |
| Use case (new) | `uc-ispm` / `identity-posture-baseline` | `uc-wim` / `secretless-workload-access` |
| Capabilities (new, all Unknown cells) | `cap-ispm-config`, `cap-ispm-mfa-coverage`, `cap-ispm-hygiene`, `cap-ispm-correlation` | `cap-wim-attestation`, `cap-wim-short-lived-identity`, `cap-wim-access-policy`, `cap-wim-credential-brokering`. Reuses existing `cap-workload-federation`, which stays under `nhi` |
| Glossary | `ispm` | `wim`, `workload-attestation`. Existing `federation` term now points to `wim` |
| Seats | `identity-security` (owns), `security-architect`, `iga-owner` | `platform`, `cloud-sec`, `identity-security` |
| Alternatives (hypotheses) | IdP-native posture, posture inside ITDR, scripts and audits | Vault and rotate, cloud-native workload identity, self-run open source |

Boundaries written into the definitions:

- **ISPM vs ITDR:** posture finds the weakness before it is used. ITDR detects abuse in progress.
- **ISPM vs CIEM:** CIEM answers effective cloud permissions. ISPM covers IdP and directory configuration, authentication coverage and account hygiene across systems.
- **ISPM vs IGA:** IGA certifies and removes access through a governed process. ISPM finds the gap and hands it to an owner.
- **WIM vs NHI:** NHI governance inventories identities and assigns owners. WIM changes how a workload authenticates.
- **WIM vs secrets management:** a vault stores or issues secrets. WIM tries to remove the stored secret. They are often complementary, because targets that cannot federate still need a brokered or vaulted credential.

To zoom back out, open `/categories/ispm` or `/categories/wim`, then the Identity domain. To zoom in, open the use cases. Two boxes on the NHI ecosystem map now link to `/categories/wim` instead of `/categories/nhi`: "Machine IAM and workload identity" and "NHI authentication". No other UI or navigation change was made.

## Vendors and products

Canonical records: [typed data](../../lib/data/ispm-wim.ts), composed by [catalog](../../lib/catalog.ts). All pages were retrieved on **2026-11-17**. The Entra document carries a page date of 2026-02-09; other publication dates are Unknown. Statements are vendor-published (marketing) or official/project documentation. No feature-parity cells, scores or direct-competitor edges are added. Customer quotations on vendor pages are not adopted.

### ISPM

| Record | New or existing | Placement | Source | Capability cells |
| --- | --- | --- | --- | --- |
| Okta Identity Security Posture Management (`okta-ispm`, vendor `okta`) | New product | Primary `ispm` | Okta product page | `cap-ispm-mfa-coverage`, `cap-ispm-hygiene` |
| Microsoft Entra Identity Secure Score (`entra-identity-secure-score`, vendor `microsoft`) | New product | Primary `ispm` | Microsoft Learn (official docs) | `cap-ispm-config`, `cap-ispm-mfa-coverage`, `cap-ispm-hygiene`. Each is a listed recommendation, not a full coverage report. Scope is one Entra tenant. |
| Veza (`veza`) | Existing | `ispm` adjacent (vendor and product) | Veza homepage lists ISPM among its offerings | `cap-ispm-hygiene` |
| CrowdStrike (`crowdstrike`, `crowdstrike-identity`) | Existing | `ispm` adjacent | Identity security page | `cap-ispm-correlation`. SKU still unconfirmed. |
| Semperis (`semperis`) | Existing | `ispm` adjacent | Homepage | Vendor-level claim only |
| AuthMind (`authmind`, `authmind-platform`) | New | Primary `ispm` and `itdr` | Homepage | `cap-ispm-correlation` |
| Orchid Security (`orchid-security`, `orchid-platform`) | New | Primary `ispm` | Homepage | None (product-level statement only) |
| Push Security (`push-security`, `push-browser-security`) | New | Primary `enterprise-browser`, adjacent `ispm` | Homepage | None. Coverage is what the browser observes. |

### WIM

| Record | New or existing | Placement | Source | Capability cells |
| --- | --- | --- | --- | --- |
| SPIFFE / SPIRE (`spiffe-project`, product `spire`) | New | Primary `wim` | SPIFFE overview and SPIRE concepts (project docs) | `cap-wim-short-lived-identity`, `cap-wim-attestation` |
| AWS IAM Roles Anywhere (`aws-iam-roles-anywhere`, vendor `amazon-web-services`) | New product | Primary `wim` | AWS user guide (official docs) | `cap-wim-short-lived-identity` |
| Riptides (`riptides`, `riptides-platform`) | New | Primary `wim` | Homepage | `cap-wim-short-lived-identity` |
| Defakto (`defakto`) | New, vendor only | Primary `wim` | Listed on the SPIFFE overview's implementer table | None. Own site not reachable. |
| Teleport (`teleport`) | Existing | `wim` adjacent | Listed on the SPIFFE overview's implementer table | None |
| Corsha (`corsha`) | Existing | `wim` adjacent | Homepage: "identity provider for machines", now industrial/OT-focused | Vendor-level claim only |
| Aembit (`aembit`) | Existing | Primary `wim` (first batch) | Existing `claim-aembit-secretless` | None added |
| Entra Workload ID (`entra-workload-id`) | Existing | `wim` adjacent (first batch) | Existing `claim-wid-federation` | None added |

Vendor-level adjacency was also added for `microsoft` (`ispm`, `wim`), `okta` (`ispm`) and `amazon-web-services` (`wim`) so their new products sit under them.

**Removed:** the first batch's adjacent-only `ispm` link on Brinqa. It rested on a general exposure-management claim and is no longer needed now that ISPM has directly sourced vendors.

## Still to research

| Candidate | Why not added |
| --- | --- |
| Cisco Identity Intelligence | `cisco.com` returned HTTP 403 to the research client. |
| Google Cloud Workload Identity Federation | Redirects to `docs.cloud.google.com`, which is not an allowed domain. |
| Defakto product page | Redirects to `www.defakto.security`, which is not an allowed domain. Vendor placement relies on the SPIFFE listing only. Name history (reported former SPIRL) unverified. |
| Teleport workload identity page | Guessed URL returned 404; the correct page was not located. |
| Silverfort | Homepage text ("find, fix and fortify every identity weakness") is too general for an ISPM claim. Needs a product page. |
| HashiCorp Vault workload auth | Not fetched. Treat Vault as a complement to WIM unless evidence says otherwise. |

## Research review record

- Topic / buyer decision: ISPM: "Which identity weaknesses do we fix first, and who owns each fix?" WIM: "Which workload credentials can we stop storing, and what replaces them?"
- Owner: repository maintainer.
- Reviewer / review date / decision: pending / Unknown / pending.
- Changed vendor / product / claim IDs: new vendors `spiffe-project`, `defakto`, `riptides`, `authmind`, `orchid-security`, `push-security`; new products `okta-ispm`, `entra-identity-secure-score`, `spire`, `aws-iam-roles-anywhere`, `riptides-platform`, `authmind-platform`, `orchid-platform`, `push-browser-security`; new claims `claim-ispm-*` (12) and `claim-wim-*` (7); category links on `microsoft`, `okta`, `veza`, `crowdstrike`, `crowdstrike-identity`, `semperis`, `teleport`, `amazon-web-services`, `corsha`, `aembit`, `entra-workload-id`; Brinqa `ispm` link removed. Also new: categories `ispm`, `wim`; eight capabilities; use cases `uc-ispm`, `uc-wim`; alternatives `alt-ispm-*`, `alt-wim-*`; glossary `ispm`, `wim`, `workload-attestation` (`federation` moved to `wim`).
- Primary / adjacent categories and rationale: see the vendor tables above. Primary placement is used where the vendor's or project's own page describes the category's core job. Adjacent placement is used where the page describes posture or workload identity as one part of a broader product.
- Original source URLs / source IDs / publisher: 13 new sources, `src-ispm-*` and `src-wim-*` in `lib/data/ispm-wim.ts`. Each records its original URL and publisher.
- Source type / evidence status: `vendor_marketing` for vendor homepages and product pages; `official_docs` for Microsoft Learn, AWS docs and SPIFFE project docs. All claims are `vendor_published`. Category text, alternatives and seat links are editorial hypotheses.
- Published date (Unknown allowed) / observed date / last checked date: Entra doc 2026-02-09; all others Unknown. Observed and last checked 2026-11-17.
- Next review date / reason for cadence: 2026-12-17. Both categories are fast-moving, and several vendor pages are marketing homepages.
- Rights / usage constraints: excerpts are short paraphrases under 420 characters. No page content is redistributed. Vendor trademarks are used only to identify products.
- Unknowns / conflicting evidence: deployment and editions for every new commercial product; which non-Okta sources Okta ISPM reads; CrowdStrike SKU; whether ISPM is bought standalone or inside an IdP, ITDR or CNAPP purchase; whether WIM competes with vault budget at a given account. SPIFFE implementer listings are likely implementer-submitted.
- Parent / product / historical names: Defakto's reported former name (SPIRL) is unverified and not recorded in `formerNames`. Okta ISPM's reported acquisition origin is unverified and not recorded.
- Acquisition, rename or discontinuation status / effective date / original evidence: none asserted.
- Duplicate and alias search result: searched `lib/data`, docs and PRs for each vendor name before adding. Existing records were reused for Okta, Microsoft, Veza, CrowdStrike, Semperis, Teleport, Corsha, AWS and Aembit. No existing SPIFFE, Defakto, Riptides, AuthMind, Orchid or Push record was found.
- Consumer disposition (map / index / other): Security Market Map: update (this change). Job Interview Command Center, Account Signal Engine, GTM Revenue OS, Builder Academy: no change. No consumer-specific content.

## Acceptance evidence

| Criterion | Pass / fail / not run | Evidence |
| --- | --- | --- |
| Source and classification review | Researcher check done; human review not run | Each source page was retrieved 2026-11-17 and the passage behind each claim was read. Human review pending. |
| No confidential data | Pass | Public vendor and project pages only. No customer, interview, employer or credential data. |
| Catalog and research integrity checks | Pass | `npm run test:research-integrity` 7/7; `npm test` 704/704 (local). |
| Typecheck / lint / build | See PR | Recorded on the PR for the pushed commit. |
| Human review | Not run | Pending. |
| Merge commit | Not applicable yet | Not merged. |
