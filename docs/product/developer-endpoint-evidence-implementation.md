# Developer workstation protection: research-to-product implementation contract

**Status:** candidate design and acceptance criteria | **Reviewed:** 2026-10-29 | **Owner:** Security Market Map | **Not a completed feature**

## User job
An AppSec, endpoint security, or platform-security buyer wants to locate the attack stage that an incumbent stack misses, discover credible candidate products, inspect original evidence, and plan a safe evaluation without treating vendor statements as validated controls.

## Information architecture
1. **Zoom out:** Endpoint Security > Endpoint Control and Prevention, and AppSec > Software Supply Chain / Secrets Detection; AI Security > MCP and agent controls. Keep the categories distinct, linked by explicit adjacency; do **not** create a duplicate overlapping root domain.
2. **Zoom in:** Existing vendor pages for GitGuardian and Aikido, linked to their *specific* endpoint offerings (do not generalize all platform features to every device edition). Include product names and release/availability boundaries only after current first-party verification.
3. **Compare:** Each row requires a precise claim about an action boundary, an original source, date, verification state, limitations, and applicable product/edition/platform.
4. **Teach:** Explain actors, assets, process boundary, decision, intervention, telemetry, owner and remaining risk in plain language. Separate preventative controls from detective controls.
5. **Act:** Exportable synthetic evaluation plan and open questions, not unproven scores or purchasing claims.

## Control taxonomy and observable proof
| Control layer | Example event | Question answered | Required evidence | Non-claim |
| --- | --- | --- | --- | --- |
| Host EDR | Suspicious process accesses credentials | What ran; can host be contained? | Process lineage, alerts, action audit | Does not by itself guarantee package provenance or agent intent |
| Developer package/install interception | Package manager requests compromised version | Was request evaluated or blocked *before install*? | Supported ecosystem/version, decision, reason, enforcement timing | Network visibility does not mean all install paths are intercepted |
| Local secrets discovery | Credential exists in untracked file or shell history | What sensitive credentials exist locally? | Scan surface, timestamp, owner, redacted finding | Detecting a value is not rotation or proven exploitability |
| Git/local hook | Developer tries to commit a secret | Does a local hook stop a known test fixture? | Hook installation, version, rule, bypass behavior | Local hooks are not server-side policy |
| AI assistant tool hook | Agent reads a file then invokes tool | Is the relevant pre-tool or post-tool step checked? | Assistant/version, supported hook point, disposition, side-effect behavior | Post-tool masking does not undo completed action |
| Agent/MCP inventory | New MCP server becomes available | Which agent/tool permissions can reach assets? | Inventory scope, discovery freshness, tool grants | Inventory alone is not MCP authorization |
| Honeytoken | Decoy key is used | Was a planted decoy touched? | Placement, detection signal, alert latency | Not broad malware prevention |
| Network/DLP | Secret leaves via browser or SaaS | Can egress be observed or prevented? | Protocol coverage, TLS trust, payload handling, policy | Endpoint scan does not equal egress DLP |
| CI and Git host controls | Secret merged or dependency released | What is checked after local development? | Pipeline logs, branch policy, release gate | CI is not a laptop or post-deployment monitor |
| Vault/rotation/IAM | Secret is revoked and owner notified | Was exposure risk actually removed? | Revoke event, service ownership, impact verification | Scanning cannot invalidate credentials alone |

## Candidate capability matrix: evidence handling
**Do not** auto-fill product comparison support cells from vendor category membership. Candidate rows for further source decomposition:
- GitGuardian: scheduled machine scans; machine inventory; local hook installation; AI assistant hook points by assistant; MCP inventory; honeytoken use alerts.
- Aikido: intercepted package ecosystems; signature/feed refresh behavior; dependency install block; unsupported package sources; local secret scan; AI provider monitoring; SBOM/package inventory; container/WSL caveats.
- Common cross-vendor questions: whether raw values leave device, edition, license, OS, supported version, MDM permissions, uninstall/tamper controls, fail-open/closed policy, no-internet operation, logging and triage integrations.

For every actual cell, store: productId, capabilityId, polarity, sourceId, sourceUrl, sourceType, source publication/observation dates, statement, edition, environmental constraints, confidence, verificationStatus and review owner. Where the canonical schema lacks edition/environment as fields, preserve qualifiers in claim notes and do **not** infer those properties from an unqualified claim. Conflicting claims require a review state and supersession lineage, never silent overwrites. 'No source found' => Unknown, *not* Not Supported.

## Safe synthetic PoC: four scenarios
### S1 — accidental local credential
- Fixture: nonfunctional `FAKE_AWS_ACCESS_KEY_ID` and fake token with vendor-approved benign test patterns, stored in temporary untracked file/shell test history.
- Expected: product scan can find configured eligible surface; finding redacted; scan time and reporting bounded.
- Failure observations: no detection, unexpected plaintext upload, unbounded false positives.
- **Never** use genuine production keys or activate real credentials for evaluation.

### S2 — malicious-dependency gate
- Fixture: vendor-documented simulator or benign package policy block; no real malicious code.
- Expected: record whether install was stopped before execution, unsupported platforms, exception and fail-open behavior.
- Failure observations: allowed installation while UI claims blocked, excessive package-manager latency.

### S3 — AI agent data/tool action
- Fixture: local dummy secret and simulated tool call with no network egress.
- Expected: classify prompt scanning, pre-tool denial, post-tool visibility and side effects separately.
- Failure observations: unsupported model or IDE incorrectly counted as protected; after-the-fact notification labeled prevention.

### S4 — controls working together
- Fixture: local dummy secret + a benign blocked package + synthetic host telemetry + mock incident ticket.
- Expected: align timestamps and owners to produce one traceable response runbook; prove safe exception and credential remediation path.
- Failure observations: duplicate incidents, missing context, no owner for revocation.

## Persona/budget ownership and discovery
| Person | Why they engage | Their objection | Evidence to win evaluation |
| --- | --- | --- | --- |
| AppSec lead | Developer risks between code, package manager and AI IDE | Existing SAST/SCA should cover it | Before-install vs pipeline risk demonstration; coverage list |
| ProdSec lead | Agent and application blast radius | Competing endpoint and platform ownership | Named attack path; synthetic proof and owner diagram |
| Endpoint/IT security | Fleet-wide device policy | MDM, local TLS interception, privacy friction | OS matrix, rollback, certificate controls, measurable device impact |
| Platform engineering | Safe frictionless tooling | Install latency, false positives and proxy conflicts | Developer-focused pilot performance and exception workflow |
| Secrets/NHI leader | Credentials on laptops outside Git | Overlap with existing scanner | Exposed vs revoked evidence, ownership and scan freshness |
| SOC | Alerts without actionable context | Noisy signals and lack of containment | Deterministic event trace into ticket/SIEM and response metrics |
| CISO | Priority and cost | Duplicate spending across budgets | Risk scenario, control owner, pilot acceptance and rollout plan |

## Proposed data ingestion rules (not yet implemented)
- Reuse canonical vendor IDs `gitguardian`, `aikido` where they exist; do not add duplicates.
- Prefer separate **product records** for endpoint-specific offerings instead of decorating a generic company record with endpoint capabilities.
- Evidence claims should cite manufacturer documentation and state capabilities at the **product** level; do not copy broad vendor attributes into all child products.
- Use a documented source version/check date and editorial note; flag changing OS and AI assistant support as volatile.
- Associate controls with existing categories; maintain reciprocal navigation from these categories without asserting symmetric control capability.
- Do not auto-create a direct-competitor edge from overlapping control surfaces; use complementary/adjacent framing where a specific buyer task warrants it.
- Avoid numerical scores, coverage percentages, pricing and GA claims without primary evidence. Distinguish announced, beta, GA and licensed.

## Roadmap and acceptance
- **M0 complete in this PR:** source-linked foundational research and existing-category adjacency. No comparison-cell evidence is claimed to ship.
- **M1 next:** verify endpoint-specific products and supported platforms against first-party docs; create canonical product/source/claim records with Unknown placeholders; write catalog integrity and provenance tests.
- **M2 next:** comparison UI with enforcement phase (pre-install/pre-tool/post-tool/detect-only), original-source drilldown, confidence/freshness, and missing-evidence banner. Preserve keyboard access, readable mobile layouts and privacy of any research fixtures.
- **M3 later:** guided synthetic PoC builder, persona filters, exportable evaluation checklist and comparison correction workflow.

Acceptance for M1/M2: no duplicate IDs, category references resolve, each affirmative capability has an attributable current source, empty claim cells display Unknown, changes pass typecheck/lint/build/catalog integrity, one supported and one missing-evidence test, mobile and keyboard verification. **No merge or deploy before CI and manual review.**

## Sources
- [GitGuardian Endpoint Protection](https://docs.gitguardian.com/endpoint-protection/home)
- [GitGuardian AI Hooks](https://docs.gitguardian.com/endpoint-protection/ai-hooks)
- [Aikido Device Protection architecture](https://help.aikido.dev/aikido-device-protection/miscellaneous-aikido-endpoint/how-does-endpoint-protection-work)
- [Aikido Supported Ecosystems](https://help.aikido.dev/aikido-device-protection/miscellaneous-aikido-endpoint/supported-ecosystems)

Research-only, original publisher evidence. Neither a production effectiveness test nor a feature-parity finding.
