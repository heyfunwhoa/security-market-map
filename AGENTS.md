<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


## Shared standards and agent workflow

For tasks affecting requirements, architecture, security, data integrity, CI, releases or AI implementation, **first read this repo's** [shared-standards adoption notes](docs/engineering-standards.md) **alongside** its product-specific requirements and tests. Consult the current [Technical Docs engineering baseline](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/engineering/baseline-v1.md), [agent execution contract](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/ai/agent-harness/execution-contract.md), and [model-selection policy](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/ai/agent-harness/model-selection.md) as relevant.

Use links rather than copying shared rules. Preserve this repo's Next.js guidance, local security and data boundaries, and authoritative PRD. Treat policy adoption and actual CI/security enforcement as separate claims. If the private Technical Docs repo is inaccessible to the agent, report that limitation rather than guessing. Check for existing issues/PRs, provide acceptance-criteria-to-test evidence, and stop before merging or deploying without human approval.

## UI and motion bank

Before UI, layout or animation work, read [local UI bank adoption](docs/ui-bank-adoption.md) and the linked workbench patterns. Inspect existing local components first, record reuse/adapt/new decisions, and preserve this app's tokens, privacy and domain rules. Record responsive, keyboard/focus, reduced-motion and state verification in the PR. Candidate or demo availability is not evidence of shipped adoption. Report inaccessible references rather than claiming compliance.

## Competitive research and cross-project handoff

For vendor, category, competitor or cybersecurity market changes, read the [Competitive Intelligence Playbook](docs/market-research/competitive-intelligence-playbook.md) and [Contributing research](CONTRIBUTING.md), plus the accepted shared [Research Evidence Boundary ADR](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/architecture/ADR-001-research-evidence-boundary.md). If the private Technical Docs reference is not available, follow this repo's existing claim/provenance rules and explicitly report the unavailable instruction rather than guessing.

Search the current `lib/data` catalog and existing PRs first. Separate candidate research notes from **reviewed, published typed claims**. Never infer a direct competitor from similar category labels, or fill feature parity from marketing impressions. Preserve vendor-reported status, original source URLs, observed/published/reviewed dates, rights constraints, disagreement and Unknown. Routing to Job Interview Command Center, sales accounts or revenue scenarios is **proposed consumer work** requiring each owner's review; never auto-write their stores. No private interview facts in this public repo.

## Focused agent sessions

For scoped agent work, use the proposed [focused-session procedure](https://github.com/heyfunwhoa/technical-docs-platform/blob/c749cc5c859472e2d8bdb982f0d6f346a5ad4c25/ai/agent-harness/focused-sessions.md) ([review status: PR #38](https://github.com/heyfunwhoa/technical-docs-platform/pull/38)). Start from the issue and latest checkpoint, verify current revisions, inspect relevant changes, and expand discovery for concrete dependencies. Record evidence and next action at handoff; preserve required checks and local privacy/release rules. This is a pinned proposed reference, not automatic synchronization or token/spend enforcement.
