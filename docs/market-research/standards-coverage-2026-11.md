# Standards and regulation coverage

As of **2026-11-18**. Status: researched and proposed. Human review is pending. Owner: repository maintainer. Next review: **2027-05-18**, or sooner if a cited text is revised (several are drafts or living documents).

## Why

The analyst passes left several categories with no recent framing: vulnerability disclosure, threat modeling, product security, API security, CIAM, crypto, and parts of AI and cloud security. Primary standards and regulation text fills some of those gaps directly. This pass prefers texts published or updated from 2024 to 2026, and reads each one at its source.

Canonical records: [typed data](../../lib/data/standards.ts). There are 28 sources and 43 claims, all `needs_review` with `capabilityId: null`:
- NIST SPs, FIPS and OWASP projects are `standard`.
- NIST white papers, IRs, AI reports and the NCCoE announcement are `official_docs`, because they are guidance or reports rather than standards.
- The EU regulations are `official_docs`.
- Final texts are `high` confidence. Drafts, indirect fits and lists the project itself calls provisional are `medium`.

**Zoom placement:** every claim attaches to an existing category page. No new category, vendor, product, capability or navigation is added. A standard or regulation names a control or a risk; it never makes a product compliant.

## Coverage added

| Category | Claims | Sources (date) |
| --- | --- | --- |
| AI governance | 4 | EU AI Act Arts. 9, 12, 14; NIST AI 600-1 (Jul 2024) |
| Model security | 5 | EU AI Act Arts. 15(5), 55; NIST SP 800-218A (Jul 2024); OWASP LLM Top 10 2026 ×2 (Aug 2026) |
| Agentic runtime | 3 | NIST AI 100-2 E2025 (Mar 2025); OWASP LLM Top 10 2026; OWASP AISVS 1.01 (2026) |
| Agent identity | 2 | NIST NCCoE draft concept paper (Feb 2026); OWASP AISVS 1.01 |
| AI application security | 1 | OWASP LLM Top 10 2026 (prompt injection) |
| AI data security | 1 | OWASP LLM Top 10 2026 (sensitive information disclosure) |
| MCP security | 1 | OWASP AISVS 1.01 |
| Data encryption | 4 | NIST CSWP 39 (crypto agility, Dec 2025, updated Jun 2026); NIST IR 8547 (PQC transition, Oct 2026); FIPS 203 (Aug 2024); EU CRA Annex I |
| Vulnerability disclosure | 3 | EU CRA Annex I Part II(5)-(6) (CVD policy and contact); CRA Annex II (published contact and policy in user information); CRA Art. 14 (24-hour early warning to authorities, noted as regulatory reporting rather than outsider intake) |
| Product security program | 4 | EU CRA Annex I (security by design); NIST SP 800-53 Release 5.2.0 (Aug 2025); OWASP ASVS 5.0 (May 2025); OWASP Top 10:2025 program guidance |
| Threat modeling | 3 | NIST SP 800-218A PW.1.1; EU CRA Art. 13(2) (risk assessment, not named threat modeling); OWASP Top 10:2025 A06 |
| Software supply chain | 2 | EU CRA Annex I (SBOM); OWASP Top 10:2025 A03 |
| API security | 2 | NIST SP 800-228 (Jun 2025, updated Mar 2026) |
| CIAM | 2 | NIST SP 800-63B-4 (Jul 2025): phishing-resistant AAL2 option; syncable authenticators |
| Secrets management | 2 | OWASP ASVS 5.0 V13; OWASP Kubernetes Top 10 (2025) |
| Container security | 1 | OWASP Kubernetes Top 10 (2025) |
| SCA | 1 | OWASP Top 10:2025 A03 (track all components, including transitive) |
| CSPM | 1 | OWASP Top 10:2025 A02 (misconfiguration, including cloud services); application-centric |
| SIEM | 1 | OWASP Top 10:2025 A09 (logging and alerting) |

**Application dates matter for the EU texts:**
- **CRA:** reporting obligations under Art. 14 apply from 11 Sep 2026. Most other obligations apply from 11 Dec 2027 (Art. 71).
- **AI Act, general-purpose AI:** the Art. 55 obligations for providers of general-purpose AI models with systemic risk apply from 2 Aug 2025.
- **AI Act, high-risk systems:** EUR-Lex shows Regulation (EU) 2026/1744 postponing the high-risk obligations. The quoted wording is unchanged in the consolidated text.

## Gaps

- **Incident response:** NIST SP 800-61 Rev. 3 (Apr 2025) was researched, but `incident-response` is a seat in this catalog, not a category, so no claim was added.
- **CSPM, CWPP, IaC:** no final NIST text from 2024 to 2026. SP 800-190 (2017) and SP 800-210 (2020) are older. The NCCoE DevSecOps draft is on a host this research could not reach.
- **Customer trust:** no standard or regulation defines trust centers or security questionnaires. The CRA Annex II passage was moved to vulnerability disclosure during the independent check.
- **NHI:** no 2024 to 2026 NIST or EU text defines non-human identity governance. The OWASP NHI Top 10 2025 is already cited in the catalog.
- **OWASP Agentic Top 10 2026:** its source files could not be located on a reachable host.
- **Hosts not reachable from the research environment:** cisa.gov, owasp.org, genai.owasp.org, cloudsecurityalliance.org, enisa.europa.eu, ncsc.gov.uk, nist.gov landing pages, nccoe.nist.gov and pages.nist.gov. CISA Secure by Design, CSA guidance and ENISA material are not covered.

## What was excluded

- **Drafts with a final alternative, or examples rather than tasks:** the SSDF 1.2 draft (Dec 2025) entries for vulnerability disclosure, threat modeling and hard-coded secrets; the NIST IR 8596 Cyber AI Profile preliminary draft; the NIST IR 8320E confidential computing draft.
- **Weak fits:** SP 1800-35 (Zero Trust) on non-human subjects; SP 800-228 on workload identity; SP 800-63-4's general customer-experience sentence.
- **License, status or age:**
  - The OWASP MCP Top 10 is a beta under a non-commercial license.
  - The OWASP cheat sheets and the threat modeling project page are undated.
  - The OWASP API Security Top 10 is the 2023 edition.
  - The CycloneDX README is already covered by the CRA SBOM claim.

## Limits

- **Paraphrases are not legal or normative text.** Scope matters:
  - NIST SP 800-63B-4 is normative for US federal systems.
  - The CRA binds manufacturers of products with digital elements.
  - Most AI Act claims apply only to high-risk systems or systemic-risk general-purpose AI models.
- **OWASP sources are community projects.** The cited files are on raw.githubusercontent.com, because owasp.org could not be reached.
  - Where a file gives only a year or a month (Top 10:2025, Kubernetes Top 10 2025, AISVS 1.01, ASVS 5.0.0), `publishedAt` is null and the period is stated in the claim.
  - The OWASP Kubernetes Top 10 says its 2025 list still invites feedback.
- **Moving branches:** the OWASP raw URLs (except ASVS, pinned to `v5.0.0`) point at `main` or `master`, so their text can change. The commit API was blocked, so they could not be pinned to commits.
- **Rights:** the OWASP Kubernetes Top 10 license statement names CC BY-NC-SA 4.0 (non-commercial) inconsistently; its two claims say a rights review is required.
- **Terminology drift:** several CSRC pages carry a banner saying NIST is updating terms in response to a 2026 executive order. That was not verified, and it does not change the quoted passages.

## Research review record

- Topic: standards and regulation that define or require security categories.
- Owner: repository maintainer. Reviewer / decision: pending.
- Changed IDs: 28 sources and 43 claims in `lib/data/standards.ts`; wiring in `lib/catalog.ts`.
- Source type / evidence status: `standard` (NIST, OWASP) and `official_docs` (EUR-Lex). All claims `needs_review`.
- Published / observed / last checked: per source / 2026-11-18 / 2026-11-18.
- Rights:
  - NIST publications are US government works.
  - EU legislation is under the EUR-Lex reuse policy.
  - OWASP projects are CC BY-SA 4.0, except the Kubernetes Top 10 (see Limits).
  - Only short quotations and paraphrases are used.
- Unknowns: the gaps listed above; how each rule applies to a specific organization.
- Consumer disposition: Security Market Map, update. Other consumers: no change.

## Acceptance evidence

| Criterion | Result | Evidence |
| --- | --- | --- |
| Source review | Researcher check and independent re-check done; human review not run | All 55 candidate passages (38 NIST and EU, 17 OWASP selected) matched with `grep -F` against saved primary text on 2026-11-18. An independent reviewer re-fetched every source: 31 claims supported, 12 partial, 0 unsupported. Fixes: SP 800-63B-4 URL and authors corrected; AI 600-1 pointed at the fetchable PDF; original publication dates used for update-1 NIST pages; five NIST guidance documents retyped from `standard` to `official_docs`; AISVS title corrected; "passkeys" removed (not in the source); CRA encryption qualifier added; CRA Annex II moved to vulnerability disclosure; AI Act application dates stated; the concept-paper claim attributed to the CSRC announcement; OWASP A03 and A06 notes corrected; Kubernetes rights flagged. |
| Integrity checks | Pass | `npm test` 714/714; `npm run test:research-integrity` 7/7 |
| Typecheck / lint / build | Pass | Local; build generated 448 static pages |
| Human review | Not run | Pending |
