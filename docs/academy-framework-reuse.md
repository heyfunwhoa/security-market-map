# Academy links and framework reuse

Status: proposed static link pilot, 2026-10-13. Merge and deployment require their normal review gates.

## Ownership
- Academy owns public explanations, exercises and learner progress.
- Market Map owns sourced vendor/product claims and category relationships.
- [Technical Docs framework register](https://github.com/heyfunwhoa/technical-docs-platform/tree/9ef20979b0ae439e754d24be89a89985185c48d9/frameworks) is maintained in a private repository and owns shared framework IDs and review metadata; this maintainer reference is not a public destination.
- Private Joy Index owns personal notes and adaptations. Public builds never read it.

The preview metadata in `lib/academy-links.ts` points to existing Academy routes observed in source. Live deployment availability was not verified. It does not copy lesson content, sync progress, or imply vendor endorsement.

## Proposed lesson mappings
These are editorial planning references, not verified control coverage or shipped lesson adoption.

| Lesson or workflow | Framework IDs | Why / review required |
| --- | --- | --- |
| Credential-risk exercise | mitre-attack, nist-ssdf | Select an exact technique and secure-development practice for the specific scenario before publishing a mapping. |
| Pre-commit limitations lesson | nist-ssdf, owasp-asvs | Explain layered checks; pin versions and relevant requirement IDs, without claiming pre-commit achieves compliance. |
| CI/CD provenance lesson | slsa | Separate provenance evidence from a verified assurance level. |
| AppSec program overview | owasp-samm, owasp-top-10 | Distinguish program maturity from risk-awareness themes. |
| Source-verification activity | research-evidence-lifecycle | Separate observed evidence, editorial review and published claims. |

IDE, AI assistant, pre-commit hook and CI/CD are workflow locations or tooling, not framework names. MITRE ATT&CK maps adversary behavior in a concrete scenario; it is not a generic score for a vendor. Detailed mappings must cite an upstream version, technique/requirement ID, rationale, reviewer and evidence.

## UI adoption
Use the existing summary-card pattern, native anchors, existing border/type/spacing tokens and a responsive list. Cards are server rendered and omit irrelevant categories. No new dependencies, motion, data fetch or shared state.

## Maintenance and rollback
Review links when Academy routes change. Change preview metadata through a PR. The framework-register CTA is omitted from the public UI because Technical Docs is private. A commit-pinned link does not grant public access. Add a separately reviewed public-safe projection only after its destination and visibility have been verified; do not expose the private repository or fetch it at runtime.
Remove the AcademyLinks import and render call to roll back category cards; no data migration is needed.

## Verification and evidence handoff · 2026-10-13

The original source-only pilot statement above is historical. [KRU-78 verification](kru-78-verification.md) now records passing public HTTP/content checks for all three destinations, local responsive/keyboard checks, and the remaining Market Map deployment verification gate. It also records the owner-reviewed handoff to [KRU-54](https://linear.app/krusty/issue/KRU-54) (offline importer) and [KRU-61](https://linear.app/krusty/issue/KRU-61) (later exercises). No importer or exercise implementation is added here.
