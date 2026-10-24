# AI-native developer security and agentic remediation — category research candidate

**Research date:** 2026-10-14  
**Status:** Researched / pending human review; not a published typed category or verified feature-parity matrix  
**Owner:** Security Market Map research review  
**Proposed category ID:** `ai-native-developer-security`  
**Primary domain:** Application security (`appsec`)  
**Adjacencies:** SCA, SAST, ASPM, secrets detection, AI developer tooling, agent runtime security  
**Review target:** 2026-11-14 or sooner on material vendor release  
**Sources:** Public, attributed linked product documentation and vendor announcements; do not copy full copyrighted content.

## Market hypothesis and buyer decision

**Hypothesis:** Developer-agent providers are extending from writing code into security triage and remediation, while established AppSec vendors are incorporating agentic repair into existing alert workflows. These vendors may increasingly compete for control of the developer's vulnerability-to-fix workflow.

**Buyer decision:** For a product-security lead and engineering manager with a large GitHub alert backlog, should the organization use its built-in code-host security tooling, buy dedicated AppSec remediation, use an AI coding platform's security workflow, or retain manual developer triage?

**Suggested definition:** Platforms and workflows that use AI coding agents or agentic analysis to contextualize security findings, explore repository code, prioritize vulnerability risk, propose security fixes, rerun relevant verification, and preserve human review and outcome evidence. This category describes a workflow boundary, **not** a certification of scanner breadth, autonomous correctness or independent exploitability evidence.

**Exclusions:** Generic code-generation-only assistants, runtime SOC response, broad agent governance without application-security remediation, and providers that only summarize findings without supported developer workflow actions.

## Source-backed vendor-reported evidence

| Source / original URL | Publisher | Published | Checked | Supported claim | Epistemic label | Limits |
| --- | --- | --- | --- | --- | --- | --- |
| [Kilo Security Agent](https://kilo.ai/security-agent) | Kilo | Unknown | 2026-10-14 | Kilo advertises GitHub Dependabot alert synchronization, separate triage/analysis/remediation models, repository reachability investigation, remediation PRs, SLAs and history. It states a PR attempt is not resolution: Dependabot must report fixed or a user dismisses. | vendor-reported, high confidence in documented positioning | No independent precision, effectiveness or deployment test; not proof of full SAST/secrets coverage. |
| [Why most dependency alerts don't matter](https://blog.kilo.ai/p/why-most-dependency-alerts-dont-matter) | Kilo | 2026-06-24 | 2026-10-14 | Kilo describes AI reachability analysis to prioritize dependency findings. | vendor-reported | Illustrative example is not representative validation. |
| [GitHub agentic autofix preview](https://github.blog/changelog/2026-07-10-agentic-autofix-for-code-scanning-alerts-in-public-preview/) | GitHub | 2026-07-10, edited 2026-07-16 | 2026-10-14 | GitHub announced an agentic autofix public preview that investigates CodeQL/third-party code-scanning alerts, proposes edits, reruns analysis and opens draft PRs for review. | vendor-reported, high | Availability and licensing conditions apply; a passed scan does not guarantee secure behavior. |
| [Snyk Agent Fix](https://updates.snyk.io/announcing-agent-fix-new-agentic-workflow-and-model-upgrade/) | Snyk | 2026-05-28 | 2026-10-14 | Snyk describes agentic repair retries, updated model/tooling, expanded rule and language support, and vendor-internal benchmark improvement. | vendor-reported, high | Internal benchmark metrics are not independent comparative measurements; no adoption claim. |
| [GitHub Copilot Autofix expansion](https://github.blog/changelog/2025-02-20-copilot-autofix-is-available-for-more-code-scanning-alerts/) | GitHub | 2025-02-20 | 2026-10-14 | GitHub expanded the kinds of CodeQL alerts eligible for AI-suggested fixes. | vendor-reported | Earlier capability milestone, not current end-to-end agent parity. |

**Evidence synthesis:** At least three publishers document products occupying portions of the proposed vulnerability → context/reachability → agent-assisted fix → reviewed PR workflow. This triangulates the **market pattern**, not comparative technical quality or whether buyers perceive a unified category. No independent customer win/loss or spending evidence collected.

## Relationship candidates (not direct-competitor assertions)

- **Kilo Security Agent ↔ GitHub Code Security / agentic autofix:** potential partial overlap for GitHub findings and remediation. Precise alert types, approvals and commercial alternatives require a buyer-specific comparison.
- **Kilo Security Agent ↔ Snyk Agent Fix:** partial overlap hypothesis around dependency/code security investigation and remediation; different detection inputs and licensing remain unknown.
- **Kilo ↔ TruffleHog / GitGuardian:** adjacent developer workflow; specialized secret detection capabilities are **not established** for Kilo Security Agent by these sources.
- **Kilo ↔ LimaCharlie:** cross-market architectural analogy only; application-security repository fixes versus SecOps automation are distinct jobs, not confirmed substitutes.
- **Kilo ↔ Runlayer:** possible AI agent governance adjacency, no direct security buyer overlap proven here.

## Proof gaps and falsification tests

1. Test identical synthetic dependency and CodeQL fixtures across workflows. Track detection inputs, true code reachability, PR correctness, time spent, regressions, and human interventions. Never use employer/customer code.
2. Validate whether Kilo handles scanner alerts beyond Dependabot; mark SAST, secrets, IaC, container images, and CI/pre-commit integration **Unknown** until exact docs or repeatable tests show otherwise.
3. Examine pricing, buyer ownership and customer procurement evidence: does a team genuinely substitute its coding platform for AppSec spend, or layer them?
4. Seek independent published evaluation or reproducible test methodology. Vendor success percentages may not be compared across different test sets.
5. Determine safe execution isolation, prompt-injection defenses, permission boundaries, audit exports, data retention and model routing per product/tier.

## Proposed typed-catalog publication (not performed)

After reviewer approval, add a canonical category to `lib/data/categories.ts` with domain `appsec`, durable ID `ai-native-developer-security`, and explicit adjacency to `sca`, `sast`, `aspm`, and `secrets-detection` as warranted by current schema. Add Kilo as a separate vendor/product identity only after checking its company/brand/ownership history and avoiding duplicate aliases. Import narrow sourced claims via `lib/data/sources.ts` and `lib/data/claims.ts`, not by treating this brief as approved truth. Run research integrity and app tests and verify rendered categories and source links.

**Consumer disposition:** Security Market Map: propose review → typed publication; Joy Index: optional read-only market hypothesis; Academy: defer synthetic experiment; Account Signal Engine: no account intent signal; GTM Revenue OS: no forecast changes. No live collection or cross-repository writes.
