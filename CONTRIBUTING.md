# Contributing research

Use this checklist for a vendor addition, category change or factual correction. The [competitive intelligence playbook](docs/market-research/competitive-intelligence-playbook.md) owns research methods; [operations and integrity](docs/security-intelligence/operations-and-integrity.md) describes the future ingestion boundary.

## Minimum submission

- Search existing IDs, aliases and open PRs. Reuse records; distinguish the parent company from its products.
- Record the buyer decision, primary/adjacent categories and why the placement fits.
- Add original source URL, publisher, source type, observation date, last check date and evidence status. Leave unknown publication dates null.
- Keep vendor statements vendor-published. A human review does not make marketing independently verified.
- Put owner, next review date, uncertainty and rights/usage notes in the [research review template](docs/market-research/review-template.md). This is submission metadata, not a claim these fields are enforced in the current catalog schema.
- For renamed/acquired/discontinued vendors, record parent, historical name, status, source and effective date (or Unknown). Distinguish an acquisition announcement from closing and from integrated product availability. Preserve stable IDs and history; do not count a historical brand as another independent option.
- No private interview, employer, customer or credential information.

## Delivery states

| State | Required evidence |
| --- | --- |
| Researched | Original sources inspected; draft and unknowns recorded |
| Reviewed | Named human reviewer/owner and decision recorded in PR |
| Checks passed | Results on the current PR commit; failures and not-run checks explicit |
| Merged | Merge commit recorded |
| Published and verified | Deployment commit/URL plus affected vendor/category/source pages inspected; citations and Unknown states visible |

A PR is a proposal. A merge is not deployment evidence. For docs-only changes, deployment verification is not applicable; verify the merged document instead. Revert the change through a reviewed PR if incorrect; keep corrections and superseded evidence attributable.

## Checks and limits

Run `npm run test:research-integrity`, `npm test`, `npx next typegen`, `npm run typecheck`, `npm run lint` and `npm run build`. Existing CI keeps its current checks and adds the dependency-free research integrity suite in the same job.

Automated: unique IDs within each catalog collection, existing reference/category/source-URL checks, matching claim/source evidence types, capability subjects, and local file targets in this checklist/template. Existing catalog tests cover mapped application links.

Human: source meaning, classification quality, ownership/acquisition history, rights, publication approval, external URL freshness and deployed behavior. No online link crawler or scheduled job is added. CI presence does not prove branch protection or prevent an administrator bypass.

## Shared policy reference

The previously proposed `governance/research-intelligence-lifecycle.md` path is absent from the shared repo as checked 2026-10-13. Use the accepted [Research Evidence Boundary ADR](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/architecture/ADR-001-research-evidence-boundary.md) and [Engineering Baseline](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/engineering/baseline-v1.md), alongside the local playbook. This does not claim that the missing lifecycle document was adopted.
