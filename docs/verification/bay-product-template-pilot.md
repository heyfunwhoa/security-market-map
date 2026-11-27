# Bay platform: product research page template validation

Status: product-specific research and acceptance plan. Evidence is vendor-published, analyst-restated or news coverage, not a tested deployment. Reviewed 2026-11-25.

## Pilot purpose

Test [Product Research Page Template v1](../product/product-research-page-template-v1.md) with an **existing early-stage vendor and existing product** in agentic runtime enforcement, a category with no product page yet. Bay acts on AI agent actions, not on package installs (Aikido) or local secrets (GitGuardian), so the page uses its own four-stage sequence instead of reusing either.

Intake decision: *existing product enrichment*. Canonical identifiers: vendor `bay-security`, product `bay-platform` (both in [bay-ghosteye.ts](../../lib/data/bay-ghosteye.ts)). No duplicate vendor, product or category. Route `/products/bay-platform`. Primary category: agentic runtime enforcement. `endpoint-control` is added as an adjacent category because SACR places Bay in endpoint control and prevention zones 1–4. Capability and SACR claims live in [agentic-endpoint.ts](../../lib/data/agentic-endpoint.ts).

## Product-specific journey

1. **Discover:** a short-lived collector, pushed through existing MDM or EDR, inventories agents, MCP servers, extensions, packages, skills and local models, then exits. Check OS coverage, cadence and how fast a new agent appears before asserting continuous visibility.
2. **Set policy:** Lighthouse drafts per-team policy from about 30 days of activity and can replay it against that history. Distinguish a learned baseline from a reviewed policy.
3. **Decide:** the AI tool hands each proposed action to Bay Enforcer through a native hook; Bay returns Allow, Ask or Deny on the device using the whole session. Only hooked tools and hooked events can be decided before execution.
4. **Record:** action, session context, policy and verdict feed the inventory and entity graph. An audit trail is not proof every risky action was intercepted.

## Buyer-specific evaluation

- **CISO / security leadership:** which agent actions are actually prevented today, versus inventoried or alerted? What is the proof-of-value success criterion?
- **Endpoint / IT:** which MDM or EDR delivers the collector, what permissions does Bay Enforcer need, and what is the uninstall and tamper story?
- **Security engineering / SOC:** what fields reach the SIEM, how are Ask and Deny events routed, and who owns follow-up?
- **AppSec / platform engineering:** which coding agents and hook events are covered (Claude Code, Cursor, Codex, Copilot), and what is the developer experience of Ask?
- **AI governance:** how does per-team policy handle a new team, a new agent or a new MCP server, and who approves exceptions?

## Evidence boundary

| Statement | Source | Type |
| --- | --- | --- |
| Agentless rollout through existing MDM/EDR; no persistent agent, proxy or kernel driver | [AWS Marketplace listing](https://aws.amazon.com/marketplace/pp/prodview-2sqtxuxrvfows) | Vendor |
| Enforcer returns Allow, Ask or Deny on the device using the whole session | AWS Marketplace listing | Vendor |
| Live in under five minutes; automated prevention within an hour | [bay.io](https://www.bay.io/) | Vendor |
| Ephemeral collector over Intune or CrowdStrike; Windows, Mac, Linux, cloud endpoints, containers | [SACR ECP report](https://softwareanalyst.substack.com/p/the-ciso-guide-to-endpoint-control) | Analyst, restating vendor |
| Collector-only deployments run in detection mode; validate breadth, latency and parity in a proof of value | SACR ECP report | Analyst caveat |

Not found in any source: a supported-agent list, a hook-event list, pricing, or an independent test. Keep those Unknown. No invented latency, false-positive rate, deployment time or customer outcome beyond what the cited sources attribute to Bay.

## Template acceptance

- [x] Existing canonical entities reused; no direct-competitor edge inferred from shared category.
- [x] Page is useful without the comparison: plain-language sequence, limitation, original evidence, review date and pilot questions.
- [x] `ProductFocus` uses Bay's own four stages, with a check and boundary per stage.
- [x] Breadcrumb points to the primary category (agentic runtime enforcement).
- [x] Unknown control boundaries list only capabilities with no claim; a limited cell (hooks: vendor asserts, SACR caveats) is shown as evidence with its boundary, not as Unknown.
- [x] Source-based profile layout (2026-11-25): buyer question, one Where it fits section, steps with proof, gaps and pilot tests, company and news block, all sources collapsed and grouped by who said it. Comparison uses the agentic endpoint set (`uc-agentic-endpoint`), linking Bay with CrowdStrike Falcon Guardian, Island Agentic Endpoint Posture and Knostic Kirin.
- [x] Lighthouse conflict recorded: launch coverage says about 30 days of observed activity; Bay's AWS listing says no baselining period.
- [x] Rendered at 375px and 1280px after the regroup.
- [x] Unit, catalog integrity, lint and typecheck pass.
- [ ] Production build: not run to completion here; this environment cannot reach Google Fonts.
- [x] Rendered in headless Chrome against `next dev` at 320px and 1280px: breadcrumb, section nav, four stages, limitation, evidence list and the four-product comparison all render; no horizontal overflow seen at 320px.
- [ ] 375px, tablet, 200% zoom, keyboard and focus, and opening every source link. Not run.
- `src-sacr-ecp` was re-read on 2026-11-25, so its retrieved date is updated; this clears the stale-source flag on Bay's hook cell.
- [ ] Human review before merge.

## Non-goals

Do not install Bay software, connect an MDM or EDR, run agents against Bay Enforcer, or send real session data in this research pilot.
