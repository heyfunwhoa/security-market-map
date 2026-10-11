<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


## Shared standards and agent workflow

For tasks affecting requirements, architecture, security, data integrity, CI, releases or AI implementation, **first read this repo's** [shared-standards adoption notes](docs/engineering-standards.md) **alongside** its product-specific requirements and tests. Consult the current [Technical Docs engineering baseline](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/engineering/baseline-v1.md), [agent execution contract](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/ai/agent-harness/execution-contract.md), and [model-selection policy](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/ai/agent-harness/model-selection.md) as relevant.

Use links rather than copying shared rules. Preserve this repo's Next.js guidance, local security and data boundaries, and authoritative PRD. Treat policy adoption and actual CI/security enforcement as separate claims. If the private Technical Docs repo is inaccessible to the agent, report that limitation rather than guessing. Check for existing issues/PRs, provide acceptance-criteria-to-test evidence, and stop before merging or deploying without human approval.
