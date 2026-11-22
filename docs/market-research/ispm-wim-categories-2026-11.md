# ISPM and WIM categories

As of **2026-11-17**. Status: categories, capabilities, use cases, glossary, alternatives, seat links and a first vendor batch are proposed. Human review is pending. Owner: repository maintainer. Next review: **2026-12-17**, or sooner if a listed product is acquired, renamed or repackaged.

> **Decision 2026-11-18: ISPM is no longer a standalone category.** On review, the owner folded ISPM into ITDR, now named "Identity threat detection and posture (ITDR, ISPM)". This follows KuppingerCole's framing that posture is part of ITDR, and most ISPM vendors already sell ITDR. Sections below that describe ISPM as its own category record the earlier proposal; the current state is in "ISPM fold-in" at the end of this note.

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
| Silverfort Identity Security Posture Management (`silverfort-ispm`, vendor `silverfort`) | New product | Primary `ispm`; vendor adds `ispm` adjacent | Silverfort ISPM product page | `cap-ispm-config`, `cap-ispm-hygiene` |

### WIM

| Record | New or existing | Placement | Source | Capability cells |
| --- | --- | --- | --- | --- |
| SPIFFE / SPIRE (`spiffe-project`, product `spire`) | New | Primary `wim` | SPIFFE overview and SPIRE concepts (project docs) | `cap-wim-short-lived-identity`, `cap-wim-attestation` |
| AWS IAM Roles Anywhere (`aws-iam-roles-anywhere`, vendor `amazon-web-services`) | New product | Primary `wim` | AWS user guide (official docs) | `cap-wim-short-lived-identity` |
| Riptides (`riptides`, `riptides-platform`) | New | Primary `wim` | Homepage | `cap-wim-short-lived-identity` |
| Defakto (`defakto`, `defakto-platform`) | New | Primary `wim` | Homepage, plus the SPIFFE overview's implementer table | `cap-wim-short-lived-identity` (from the homepage) |
| Teleport Machine & Workload Identity (`teleport-machine-workload-identity`, vendor `teleport`) | New product | Primary `wim`; vendor `wim` adjacent | Teleport documentation, plus the SPIFFE implementer table | `cap-wim-short-lived-identity` |
| Google Cloud Workload Identity Federation (`gcp-workload-identity-federation`, vendor `google`) | New product | Primary `wim`; vendor `wim` adjacent | Google Cloud IAM docs (official docs) | `cap-workload-federation` |
| Corsha (`corsha`) | Existing | `wim` adjacent | Homepage: "identity provider for machines", now industrial/OT-focused | Vendor-level claim only |
| Aembit (`aembit`) | Existing | Primary `wim` (first batch) | Existing `claim-aembit-secretless` | None added |
| Entra Workload ID (`entra-workload-id`) | Existing | `wim` adjacent (first batch) | Existing `claim-wid-federation` | None added |

Vendor-level adjacency was also added for `microsoft` (`ispm`, `wim`), `okta` (`ispm`), `amazon-web-services` (`wim`), `google` (`wim`) and `silverfort` (`ispm`) so their new products sit under them.

**Removed:** the first batch's adjacent-only `ispm` link on Brinqa. It rested on a general exposure-management claim and is no longer needed now that ISPM has directly sourced vendors.

## Still to research

| Candidate | Why not added |
| --- | --- |
| Cisco Identity Intelligence | `www.cisco.com` product page returned HTTP 403 to the research client (2026-11-17). The Oort acquisition announcement on `newsroom.cisco.com` was not reachable from the follow-up session (host not allowed). No workaround such as a spoofed browser user agent was used. |
| Defakto name history | Homepage and `/about` (retrieved 2026-11-17) name the founders but do not mention the reported former name (SPIRL). Not recorded in `formerNames`; needs a dated rename source. |

## Follow-up status (2026-11-17, after merge of PR #197)

- Merged as `aaee213` on `main`. Production on `security-market-map.vercel.app` was **not verified** from the agent session, because the host is not in its allowed domains. A human should open the post-deploy smoke paths listed in the PR #197 release handoff.
- Vault: added sources `src-wim-vault-k8s-auth` and `src-wim-vault-spiffe-auth` (HashiCorp docs, retrieved 2026-11-17) with claims `claim-wim-vault-k8s-auth` and `claim-wim-vault-spiffe-auth` on the existing `vault` product, and added `wim` as adjacent on `hashicorp` and `vault`. Vault stays primary `secrets-management`. The claims show it **accepting** workload identities (Kubernetes service account tokens, and SPIFFE SVIDs on Enterprise), not issuing them. No capability cell is filled.
- Added two learn-page distinctions with no new external claims: "ISPM, ITDR, CIEM, and IGA" (`identity-posture-detection-entitlement`) and "WIM, NHI governance, and the vault" (`workload-identity-layers`). Both restate the boundaries already in the category definitions. They are rendered by the existing `DistinctionCards` component on `/learn#distinctions`. No UI change was needed.

## Template compliance (2026-11-18)

### Vendor seat targeting ([template](vendor-seat-targeting-template.md))

Eight rows in `lib/data/vendor-seat-targeting.ts`, four per new category. Every row was `page-read` on 2026-11-18 from a vendor-owned page or vendor docs. A new header rule maps "security teams" to identity security for ISPM and cloud security for WIM.

| Category | Vendor (role) | Pitched seats | Mentioned only |
| --- | --- | --- | --- |
| ISPM | Okta (leader) | it-operations | grc-owner |
| ISPM | Silverfort (specialist) | identity-security | none |
| ISPM | Orchid Security (challenger) | identity-security | iga-owner, pam-owner, grc-owner |
| ISPM | AuthMind (challenger) | identity-security | ciso |
| WIM | Aembit (specialist) | cloud-sec, identity-security, platform, developer | grc-owner |
| WIM | Defakto (challenger) | developer | ciso, platform |
| WIM | Riptides (challenger) | cloud-sec, platform | none |
| WIM | SPIFFE / SPIRE (open-source-led) | developer, platform | none |

**What's missing (template step 6):**
- ISPM has no open-source-led vendor in the catalog.
- Okta, the leader, pitches admins and IT teams, not identity security, which the map lists as ISPM's owner.
- No ISPM page pitches the SOC.
- WIM has no large-platform "leader" with WIM as its vendor-level primary category. AWS, Google and Microsoft carry WIM only as adjacent at vendor level, so they were not sampled.

**Redirects and acquisitions (step 9):** AuthMind's homepage carries the headline "AuthMind Joins IBM to Build the Future of Agentic AI Identity Security". This is recorded as an open question on the vendor. Announcement versus close, effective date and product status are unverified. The vendor is not renamed.

**Test change:** `lib/vendor-targeting.test.ts` had a fixed `checkedAt <= "2026-11-10"` ceiling. It now compares against the current date, so it still rejects future dates without needing an edit for every research batch.

### Product research page template ([v1](../product/product-research-page-template-v1.md))

- **Product pages: not applicable.** The template governs products with a dedicated `/products/<slug>` page, listed in the reviewed `PRODUCT_RESEARCH_SLUGS` registry. None of the ISPM or WIM products were added there. The template says not to insert unreviewed product names, and these products are reached through their category and vendor pages. Promoting any of them needs its own page review.
- **Intake decision:** done (existing IDs searched, records reused, new-versus-existing recorded). The two new categories still need the separate **taxonomy review** the template requires; that review is pending.
- **Edition and version:** recorded where the source states it (Vault SPIFFE auth needs Enterprise; Entra Secure Score is free and paid). Otherwise it is Unknown.
- **Atlas handoff:** not applicable. These are not secret-detector products.
- **Browser checklist (local Chromium, production build, 2026-11-18):** 14 pages at 320 px, 375 px, 768 px, 1280 px and 200% zoom (640 CSS px at DPR 2), 70 page loads in total. Every load returned HTTP 200 with no horizontal overflow and no console errors. Keyboard: on `/categories/ispm` at 375 px, Tab reaches the first vendor link with a visible outline, and Enter opens it. Not tested: screen reader, physical touch device.
- **Source link check:** all 21 source and official URLs in `lib/data/ispm-wim.ts` and the new seat rows returned HTTP 200 on 2026-11-18.

## Analyst sources (SACR, 2026-11-18)

Canonical records: [typed data](../../lib/data/identity-analyst.ts). There are five category claims, all `analyst` / `needs_review`, each paraphrasing one public SACR passage. Report figures, market sizes and vendor rankings are not adopted. Analyst framing fills no capability cell.

| Category | Claim | Source (published) | What it supports |
| --- | --- | --- | --- |
| ISPM | `claim-sacr-ispm-20251202` | Existing `src-sacr-iga-entitlements-20251202` (2025-12-02) | ISPM definition: continuous identity-configuration assessment. ISPM shows where risk is; IGA decides what to do. Matches the map's ISPM/IGA boundary. |
| ISPM | `claim-sacr-ispm-iasm-20250211` | New `src-sacr-identity-attack-surface-20250211` | SACR's "Identity Attack Surface Management" (IASM): visibility, posture controls, remediation. Mapped to ISPM, but the labels are not treated as identical. |
| WIM | `claim-sacr-wim-20240927` | New `src-sacr-nhi-guide-20240927` | SACR separates secretless, policy-based workload access brokering from NHI discovery and lifecycle vendors. Backs the map's WIM/NHI boundary. SACR does not use the label "WIM". |
| NHI | `claim-sacr-nhi-20240927` | New `src-sacr-nhi-guide-20240927` | NHIs are spread across cloud, SaaS, on-premises and service paths, not centralized in IGA; visibility and inventory are the main challenge. |
| Identity orchestration | `claim-sacr-identity-orchestration-20261117` | New `src-sacr-identity-policy-enforcement-20261117` | IAM coverage gap: identity paths that can't be discovered, controlled or verified. Profiles Orchid as an observability and orchestration layer; the vendor claims in it are not adopted. |

**Not reachable from the research session:** `www.gartner.com`, `www.forrester.com`, `www.kuppingercole.com`, `owasp.org` and `www.cncf.io`. Gartner is needed for industry-specific identity coverage (the segment overlays in `lib/data/company-segments.ts`). SACR's report index (73 reports checked on 2026-11-18) has no industry-specific identity report.

**SACR identity reports still unsourced** (candidates for a later pass): "Identity Security Dark Matter", "Why CISOs Must Re-think Identity", "Introducing Social Engineering Identity", "The Dawn of Intent-Aware Access Fabrics", "How Palo Alto and CyberArk Will Reshape Identity Security", "The Future of Just-in-Time Trust", "Oktane 2026" and "Inside 1Password's Enterprise Identity Transformation".

## Independent claim check (2026-11-18)

A separate reviewer agent, not the one that drafted the claims, re-fetched all 23 unique source URLs (all HTTP 200) and graded all 31 claims in `ispm-wim.ts` and `identity-analyst.ts`. Result: 21 supported, 10 partially supported, none unsupported. All SACR dates match each page's `datePublished`.

Fixes applied:
- **Capability cells corrected:**
  - `claim-ispm-silverfort-hygiene` no longer fills `cap-ispm-hygiene`. The page names those weaknesses as things attackers find, not things the product fixes.
  - `claim-wim-aws-ra` moved from `cap-wim-short-lived-identity` to `cap-workload-federation`. The certificate comes from the customer's CA.
  - `claim-ispm-entra-mfa` now cites "Ensure all users can complete MFA", which supports per-account MFA coverage. The admin-roles item alone did not.
- **Wording narrowed to what the page says:** Silverfort (product statement, not problem framing), Veza (ISPM is a use-case menu item), Vault Kubernetes auth (the page's own words), Corsha ("identity provider for machines" is site metadata only), AuthMind (activity correlation plus owner mapping), Entra (directory; legacy-authentication recommendation).
- **SACR WIM claim:** now says SACR contrasts one vendor (Aembit) with the others, not a named class, and notes that Aembit is credited as a research partner on that page.
- **Minor wording:** "legacy identity stacks", "reach", "directory".
- **Notes:** no longer show internal claim IDs to readers.

## Source display on claim cards (UI change, 2026-11-18)

- **User task:** "Which source backs this claim, and how much should I trust it?" without leaving the page.
- **Destination:** `ClaimList` in `components/claims.tsx`. It is used on category, vendor, domain, home and sources pages.
- **Before:** a hover/focus/tap badge (status and source type), dates, the statement, notes and a bare "Open source" link.
- **Decision: adapt.** The `/compare` evidence block in `components/comparison-evidence.tsx` already shows the source title, publisher, dates and excerpt.
  - The link text is now "Publisher: Source title". Em dashes in registry titles are shown as colons.
  - A native `<details>` "Source details" holds the type, author, published and retrieved dates, and the registry's summary of the source. The summary is labelled as possibly citing a different passage from the claim.
  - Native disclosure works by keyboard and touch; nothing depends on hover. There is no new dependency, the existing tokens are kept, and the component stays server-rendered with no client JavaScript added.
- **Checks:** local Chromium on a production build covered `/`, `/categories/ispm`, `/categories/wim`, `/vendors/okta`, `/vendors/hashicorp` and `/sources` at 320, 375 and 1280 px. All returned HTTP 200 with no overflow and no console errors; every claim shows "Source details" and no bare "Open source" links remain. Keyboard: Tab reaches a summary and Enter opens it. No motion is added. Not tested: screen reader, physical touch device.
- **Rollback:** revert `ClaimSource` in `components/claims.tsx`.

## KuppingerCole and Forrester (2026-11-18)

Two research passes fetched public pages with plain requests. Every quoted passage was re-checked against the saved page text before it was used. Only public abstracts and blogs are used; the full reports are paywalled. All claims are `analyst` / `needs_review`, and vendor ratings, Wave or Compass placements and figures are not adopted. Claim text avoids score language, following the existing analyst-claim rule in `lib/catalog.test.ts`.

| Category | KuppingerCole | Forrester |
| --- | --- | --- |
| ISPM | 2027 ITDR research plan: posture is a component of ITDR, not enough on its own. **Counter-framing, recorded.** | 21 May 2026 blog: ISPM and ITDR are core capabilities of workforce identity platforms |
| ITDR | 6 Nov 2025 abstract (definition) | none |
| PAM | 18 May 2026 abstract (now includes NHIs) | 7 Aug 2025 blog (human, machine and agent identities; audit is the most common use) |
| CIAM | 14 Jan 2026 abstract | 10 Aug 2026 abstract |
| Identity orchestration | 21 Jul 2025 policy-based access abstract; identity-fabric research plan | none |
| Secrets management | 2026 research plan (definition of an enterprise secret) | none |
| WIM | 23 Jul 2025 NHI continuum abstract (static to adaptive credentials) | 1 Oct 2026 recap: SPIFFE is becoming the de facto NHI standard |
| NHI | (already cited) | 26 Aug 2025 blog |
| Agent identity | 10 Aug 2026 abstract | 1 Dec 2025 abstract |

**Analysts disagree on ISPM.** SACR describes ISPM as its own layer. KuppingerCole folds it into ITDR. Forrester treats it as a capability inside workforce identity platforms. The map keeps ISPM as a separate buyer conversation, which is what the vendor and use-case evidence supports, and shows all three framings on the category page.

**Not added:**
- Workforce identity: an existing test fixes it at two Gartner claims, and it was already the best-covered category.
- Research-plan dates: the plan pages carry only estimated publication dates, so these claims have `publishedAt: null`.
- CIEM (only a 2023 machine-generated summary was public).
- KuppingerCole lines labelled "Short Summary" or "Notable Quotes", which look machine-generated.
- Vendor-sponsored KuppingerCole whitepapers (Exostar/IBM on DORA and CMMC; a 2019 healthcare paper).

### Industries

- **Energy and utilities:** KuppingerCole's 13 Jul 2026 OT/ICS Buyer's Compass is attached to the `energy-utilities` profile. It names secure remote access and NHI governance as capabilities aligned to NERC CIP and IEC 62443.
- **Nothing identity-specific in public analyst text:**
  - NYDFS: Forrester's 2023 post is about third-party contracts.
  - DORA: only general compliance text, or a sponsored whitepaper.
  - HIPAA: 2021 Zero Trust framing, or a sponsored 2019 paper.
  - CMMC: Forrester's post covers the program, not identity.

  The identity requirements in these regulations (NYDFS Part 500 MFA and access privileges, HIPAA technical safeguards, CMMC's NIST SP 800-171 controls, NERC CIP access management) are better sourced from the regulation text itself. Doing that needs a new typed field on the industry profiles; see the PR for the proposal.
- **Gartner:** `www.gartner.com` refuses automated requests (HTTP 403), and that was not worked around. Gartner pages can be added from URLs and passages a person supplies.

## Secrets and other thin categories (2026-11-18)

There are 20 more `analyst` / `needs_review` claims from SACR, KuppingerCole and Forrester, each passage re-checked against the saved page text. Pages that disclose vendor sponsorship were excluded (for example SACR "Beyond the Action", sponsored by Pluto, and the Teleskope- and Cyera-sponsored DSPM reports).

| Category | Claims added | Note |
| --- | --- | --- |
| Secrets detection | KuppingerCole ×2 (2026 software supply chain security Leadership Compass and Buyer's Compass) | KuppingerCole puts secrets detection inside software supply chain security and says specialists still lead. **Gap:** no analyst page found covers secrets outside code (tickets, chat, logs) or checks whether a found secret is still live. |
| Secrets management | KuppingerCole ×2, Forrester (PKI), SACR (static secrets) | Includes PKI and certificate lifecycle |
| CIEM | KuppingerCole Buyer's Compass, SACR | |
| IGA | KuppingerCole Buyer's Compass, SACR (where IGA stops), Forrester (agents don't fit IGA) | |
| Data access governance | SACR (definition), KuppingerCole, Forrester | |
| Agentic runtime | Forrester ×2 (least agency; checks on every tool call), KuppingerCole (agent observability), SACR (JIT trust) | |
| SSPM | KuppingerCole ×2 | |

## ISPM fold-in (2026-11-18)

Decision: ISPM is not a standalone category. It is now the posture half of `itdr`.

- **Category:** `ispm` removed. `itdr` is renamed "Identity threat detection and posture (ITDR, ISPM)", and its definition, buyer question, triggers, outcomes, budget and example workflow now cover both posture and detection. `/categories/ispm` permanently redirects to `/categories/itdr` (`next.config.ts`).
- **Stable IDs kept:** `cap-ispm-*` capabilities, `uc-ispm` (identity posture baseline), `alt-ispm-*`, the `ispm` glossary term and the `claim-*ispm*` claims keep their IDs and now point at `itdr`. `alt-ispm-itdr` ("posture inside the ITDR product") was removed, because it would now point at its own category.
- **Products and vendors:** `ispm` was replaced by `itdr` (deduplicated) for Okta ISPM, Entra Identity Secure Score, Silverfort ISPM, AuthMind, Push and the existing Veza, CrowdStrike, Semperis, Silverfort, Okta and Microsoft records. Orchid Security moved to primary `identity-orchestration` with `itdr` adjacent, because its product is application identity observability and orchestration rather than posture or detection.
- **Analyst claims:** the four ISPM category claims now attach to `itdr`. Notes record that the map follows KuppingerCole's framing, and that SACR treats ISPM separately and Forrester places it in workforce identity.
- **Seat targeting:** the Okta, Orchid and AuthMind rows moved to `itdr`. The Silverfort ISPM row was dropped as a duplicate of Silverfort's existing ITDR row.
- **Learn card:** retitled "Identity posture and detection, CIEM, and IGA". Its rows still separate posture from detection.
- **Regenerated:** `context/*` and `data/security-intelligence/exports/incident-feed.v1.json` (ITDR category name only).

## Research review record

- Topic / buyer decision: ISPM: "Which identity weaknesses do we fix first, and who owns each fix?" WIM: "Which workload credentials can we stop storing, and what replaces them?"
- Owner: repository maintainer.
- Reviewer / review date / decision: pending / Unknown / pending.
- Changed vendor / product / claim IDs: new vendors `spiffe-project`, `defakto`, `riptides`, `authmind`, `orchid-security`, `push-security`; new products `okta-ispm`, `entra-identity-secure-score`, `silverfort-ispm`, `spire`, `aws-iam-roles-anywhere`, `gcp-workload-identity-federation`, `teleport-machine-workload-identity`, `defakto-platform`, `riptides-platform`, `authmind-platform`, `orchid-platform`, `push-browser-security`; new claims `claim-ispm-*` (14) and `claim-wim-*` (10); category links on `microsoft`, `okta`, `google`, `silverfort`, `veza`, `crowdstrike`, `crowdstrike-identity`, `semperis`, `teleport`, `amazon-web-services`, `corsha`, `aembit`, `entra-workload-id`; Brinqa `ispm` link removed. Also new: categories `ispm`, `wim`; eight capabilities; use cases `uc-ispm`, `uc-wim`; alternatives `alt-ispm-*`, `alt-wim-*`; glossary `ispm`, `wim`, `workload-attestation` (`federation` moved to `wim`).
- Primary / adjacent categories and rationale: see the vendor tables above. Primary placement is used where the vendor's or project's own page describes the category's core job. Adjacent placement is used where the page describes posture or workload identity as one part of a broader product.
- Original source URLs / source IDs / publisher: 17 new sources, `src-ispm-*` and `src-wim-*` in `lib/data/ispm-wim.ts`. Each records its original URL and publisher.
- Source type / evidence status: `vendor_marketing` for vendor homepages and product pages; `official_docs` for Microsoft Learn, AWS docs, Google Cloud docs, Teleport docs and SPIFFE project docs. All claims are `vendor_published`. Category text, alternatives and seat links are editorial hypotheses.
- Published date (Unknown allowed) / observed date / last checked date: Entra doc 2026-02-09; all others Unknown. Observed and last checked 2026-11-17.
- Next review date / reason for cadence: 2026-12-17. Both categories are fast-moving, and several vendor pages are marketing homepages.
- Rights / usage constraints: excerpts are short paraphrases under 420 characters. No page content is redistributed. Vendor trademarks are used only to identify products.
- Unknowns / conflicting evidence: deployment and editions for every new commercial product; which non-Okta sources Okta ISPM reads; CrowdStrike SKU; whether ISPM is bought standalone or inside an IdP, ITDR or CNAPP purchase; whether WIM competes with vault budget at a given account. SPIFFE implementer listings are likely implementer-submitted.
- Parent / product / historical names: Defakto's reported former name (SPIRL) is unverified and not recorded in `formerNames`. Okta ISPM's reported acquisition origin is unverified and not recorded.
- Acquisition, rename or discontinuation status / effective date / original evidence: none asserted.
- Duplicate and alias search result: searched `lib/data`, docs and PRs for each vendor name before adding. Existing records were reused for Okta, Microsoft, Google, Silverfort, Veza, CrowdStrike, Semperis, Teleport, Corsha, AWS and Aembit. No existing SPIFFE, Defakto, Riptides, AuthMind, Orchid or Push record was found.
- Consumer disposition (map / index / other): Security Market Map: update (this change). Job Interview Command Center, Account Signal Engine, GTM Revenue OS, Builder Academy: no change. No consumer-specific content.

## Acceptance evidence

| Criterion | Pass / fail / not run | Evidence |
| --- | --- | --- |
| Source and classification review | Researcher check done; human review not run | Each source page was retrieved 2026-11-17 and the passage behind each claim was read. Human review pending. |
| No confidential data | Pass | Public vendor and project pages only. No customer, interview, employer or credential data. |
| Catalog and research integrity checks | Pass | `npm run test:research-integrity` 7/7; `npm test` 704/704 (local). |
| Typecheck / lint / build | Pass | Local on `31aec3f`; CI `check`, Semgrep, Trivy, dependency audit and TruffleHog all passed on PR #197 at `31aec3f`. |
| Browser QA (local Chromium, production build) | Pass, with limits | `/categories/ispm`, `/categories/wim`, both use cases, `/connections` and `/vendors/defakto` at 390 px and 1280 px, with and without reduced motion: HTTP 200, no horizontal overflow, no console errors. On `/connections` at 390 px, Tab reaches the re-pointed "NHI authentication" link (38 tabs) with a visible 2 px outline; Enter opens `/categories/wim`; Back returns. Breadcrumbs offer a route back out to Landscape and Home. Not tested: screen reader, physical touch device, browser zoom, contrast measurement. `/products/<slug>` returns 404 for these and existing products alike, because only research slugs are generated; products are reached through vendor pages. |
| Human review | Not run | Pending. |
| Merge commit | Not applicable yet | Not merged. |
