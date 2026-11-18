# Industry identity requirements

As of **2026-11-18**. Status: researched and proposed. Human review is pending. Owner: repository maintainer. Next review: **2027-05-18**, or sooner if any of these rules is amended.

## Why

The industry profiles in `lib/data/company-segments.ts` named frameworks and elevated roles, but they never said which identity controls a rule requires. Public analyst pages from SACR, KuppingerCole and Forrester had almost nothing identity-specific for NYDFS, DORA, HIPAA or CMMC (see [ISPM and WIM research](ispm-wim-categories-2026-11.md)). The rule text itself is the primary source, so this change reads the rules directly.

## Model

Each industry profile now has an `identityRequirements` list (schema in `lib/schema.ts`). Each entry has:
- `rule`: the exact citation.
- `requirement`: a short paraphrase of the rule text.
- `categoryIds`: the identity categories that address the control.
- `sourceIds`: the registry sources.

`catalogProblems` rejects unknown categories, unknown sources and duplicate IDs. Category pages list the requirements that name them, under "Industry rules that call for these controls". The page states that a linked rule does not make any product compliant.

**Zoom placement:** an industry profile links to identity categories, and each category page shows the rules. A requirement names a control, not a vendor. No vendor, product or capability cell is linked.

## Requirements added (14)

| Industry | Rule | Categories | Source |
| --- | --- | --- | --- |
| NYDFS | 500.12(a): MFA for anyone accessing information systems; under a limited exemption, still for remote access, third-party apps holding nonpublic information, and privileged accounts | workforce-identity, pam | DFS, 23 NYCRR 500 (as amended) |
| NYDFS | 500.7(a)(1), (4), (6): access limited to job need, reviewed at least annually, terminated promptly | iga | same |
| NYDFS | 500.7(a)(2)-(3), (c)(1): limit privileged accounts; Class A companies monitor privileged access and implement PAM | pam | same |
| DORA | RTS 2024/1774 Art. 20(1): unique identification and authentication of persons and systems | workforce-identity, nhi | EUR-Lex |
| DORA | Art. 21(a)-(b): need-to-know, least privilege, remote and emergency access, segregation of duties | iga, pam | same |
| DORA | Art. 21: strong authentication for remote, privileged, critical and public-facing access | workforce-identity, pam | same |
| HIPAA | 164.312(a)(1)-(2): access only to granted persons or programs; unique user ID; emergency access | workforce-identity, iga | eCFR |
| HIPAA | 164.312(d): verify a person or entity is the one claimed | workforce-identity | same |
| CMMC L2 | NIST SP 800-171 r2 3.1.1: limit access to authorized users, processes and devices | iga, workforce-identity | NIST, plus the CMMC final rule |
| CMMC L2 | 3.1.5: least privilege, including privileged accounts | pam, iga | same |
| CMMC L2 | 3.5.3: MFA for privileged accounts and for network access to non-privileged accounts | workforce-identity, pam | same |
| NERC CIP | CIP-005-7 R2: MFA for all Interactive Remote Access | pam, workforce-identity | NERC |
| NERC CIP | CIP-004-7 R4, R5: authorize access based on need; revoke access | iga | NERC |
| NERC CIP | CIP-007-6 R5.1-5.2: enforce interactive authentication; inventory default and generic accounts | pam | NERC |

The CMMC Level 2 link to NIST SP 800-171 Rev. 2 was checked against the CMMC program final rule on govinfo.gov ("Level 2 security requirements derived from NIST SP 800-171 R2").

## Limits

- **Paraphrases are not legal text.** Exemptions, scoping and effective dates are summarized, not reproduced. For example, NYDFS's limited exemption is under 500.19(a) and Class A status has its own definition; NERC applicability depends on BES impact rating; HIPAA "addressable" specifications are not listed. Read the cited rule before relying on it.
- **Category links are editorial.** They mean "this category is commonly used to meet the control", not "required to buy".
- **Publication dates:** null where the source shows only a revision or "as amended" date. DORA's RTS is dated 13 March 2024 (adoption).
- **The HIPAA source uses the eCFR rendering URL,** because the human-facing eCFR page redirects to a bot check.
- **Not covered:** NIS2 and SEC rules (other profiles), PCI DSS, state privacy laws.

## Research review record

- Topic / buyer decision: which identity controls a regulated buyer must show, and which categories address them.
- Owner: repository maintainer. Reviewer / decision: pending.
- Changed IDs:
  - New sources: `src-reg-nydfs-part500`, `src-reg-hipaa-164312`, `src-reg-nist-800-171r2`, `src-reg-nerc-cip-004-7`, `src-reg-nerc-cip-005-7`, `src-reg-nerc-cip-007-6`, `src-reg-dora-rts-2024-1774`.
  - 14 `identityRequirements` across five industry profiles.
- Source type / evidence status: `official_docs` and `standard`; primary regulatory text.
- Published / observed / last checked: see Limits / 2026-11-18 / 2026-11-18.
- Rights: public-domain US government texts (eCFR, NIST, govinfo) and EU legislation (EUR-Lex reuse policy). NYDFS and NERC texts are published for public use. Paraphrases only.
- Unknowns: how each rule applies to a specific entity; future amendments.
- Consumer disposition: Security Market Map, update. Other consumers: no change.

## Acceptance evidence

| Criterion | Result | Evidence |
| --- | --- | --- |
| Source review | Researcher check done; human review not run | Each rule section was read in the fetched text on 2026-11-18 |
| Integrity checks | Pass | `lib/identity-requirements.test.ts` (unknown category or source rejected); `npm test` 707/707; `npm run test:research-integrity` 7/7 |
| Typecheck / lint / build | Pass | Local |
| Browser QA | Pass, with limits | `/categories/pam`, `workforce-identity`, `iga`, `nhi` and `wim` at 320, 375 and 1280 px: HTTP 200, no overflow, no console errors. Shows 8 requirements on PAM and workforce identity, 6 on IGA, 1 on NHI, and none on WIM (as expected). Not tested: screen reader, touch device. |
| Human review | Not run | Pending |
