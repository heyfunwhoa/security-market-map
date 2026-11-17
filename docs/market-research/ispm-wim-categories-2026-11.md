# ISPM and WIM categories

As of **2026-11-17**. Status: categories, capabilities, use cases, glossary, alternatives and seat links are proposed. Vendor research is **blocked** (see below). Human review is pending. Owner: repository maintainer. Next review: **2026-12-17**, or as soon as the vendor hosts listed below are reachable.

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

## Vendor links in this change (existing records only, no new claims)

| Record | Change | Basis |
| --- | --- | --- |
| `aembit` (vendor and product) | `wim` added as a primary category | Existing claim `claim-aembit-secretless`: policy-based, secretless, conditional access between workloads and resources, with temporary just-in-time access. The open question on whether the mechanism is federation stays open. |
| `entra-workload-id` (product) | `wim` added as an adjacent category | Existing claim `claim-wid-federation`: Microsoft documents workload identity federation without managing secrets for that hop. |
| `brinqa` (vendor) | `ispm` added as an adjacent category | Existing claim `claim-fill-brinqa-platform`: exposure management that brings identity risk together with other risk. Adjacent only. This is **not** evidence of ISPM capabilities. |

No capability cell is filled. All eight new capability cells read Unknown for every product.

## Blocked: vendor and source research

This session's network policy refused every vendor and documentation host tried: `aembit.io`, `spiffe.io`, `www.okta.com` and `learn.microsoft.com`. Under the [contributing rules](../../CONTRIBUTING.md), a new vendor or claim needs an inspected original source, so **no new vendor, product, source or claim records were added**. The lists below are **unverified candidates written from contributor knowledge, not from inspected sources**. Do not quote them, and do not promote them to typed records until a primary page has been read and dated.

### ISPM candidates to research

| Candidate | Existing catalog ID | What to verify |
| --- | --- | --- |
| Okta (Identity Security Posture Management) | `okta` | Product name, scope across non-Okta IdPs and SaaS, and its origin (reported to come from an acquisition; unverified) |
| Microsoft Entra (identity secure score and recommendations) | `microsoft` | Whether a score and recommendations count as ISPM, and the license tier |
| CrowdStrike (Falcon identity products) | `crowdstrike` | Which SKU, and posture versus detection scope |
| Silverfort | `silverfort` | Posture features beyond ITDR and MFA enforcement |
| Semperis | `semperis` | AD and Entra posture assessment scope |
| Veza | `veza` | Whether access intelligence includes posture findings (SACR groups entitlement intelligence with ISPM; body text not adopted) |
| Cisco (Identity Intelligence) | none | Product, and whether it came from an acquisition; effective date |
| AuthMind, Orchid Security, Push Security | none | Category self-description and scope |

### WIM candidates to research

| Candidate | Existing catalog ID | What to verify |
| --- | --- | --- |
| SPIFFE / SPIRE (CNCF open source) | none | Spec and project pages; attestation model; graduation status |
| Defakto (reported former name SPIRL) | none | Name history, relation to SPIFFE, product scope |
| Teleport (machine and workload identity) | `teleport` | Product name and scope; its current positioning reads "Capabilities unknown" |
| HashiCorp Vault | `vault` | Workload auth methods; keep as a complement unless evidence says otherwise |
| Google Cloud Workload Identity Federation, AWS IAM Roles Anywhere | none (cloud vendors may exist) | Documentation pages; treat as platform-bundle alternatives |
| Corsha | `corsha` | Already in the SACR "NHI authentication" box; confirm before adding `wim` |
| Riptides | none | Category self-description |

**To unblock:** an environment owner adds the vendor and documentation hosts above under Allowed domains in this environment's network settings (see the [network access docs](https://code.claude.com/docs/en/cloud-environments#network-access)). Then each candidate gets one source and one claim, following `lib/data/category-fill.ts`.

## Research review record

- Topic / buyer decision: identity posture baseline (ISPM); secretless workload access (WIM).
- Owner: repository maintainer. Reviewer / decision: pending.
- Changed IDs: categories `ispm`, `wim`; capabilities listed above; use cases `uc-ispm`, `uc-wim`; alternatives `alt-ispm-*`, `alt-wim-*`; glossary `ispm`, `wim`, `workload-attestation`, `federation` (category moved); vendor/product category links `aembit`, `entra-workload-id`, `brinqa`.
- Sources: no new sources. Reused claims `claim-aembit-secretless`, `claim-wid-federation` and `claim-fill-brinqa-platform`.
- Evidence status: category text, alternatives and seat links are editorial hypotheses. Vendor statements are unchanged and vendor-published.
- Unknowns: every new capability cell; every candidate above; whether ISPM is bought as a standalone product or inside IdP, ITDR or CNAPP; whether WIM competes with vault budget at a given account.
- Rights: no third-party text was copied.
- Consumer disposition: Security Market Map, update (this change). Other consumers: no change.
