# Research and refresh engine (phase 1)

Phase 1 is an offline foundation for checking public sources, noticing meaningful changes, and queuing evidence-backed proposals. It does not publish catalog claims, and it does not call Exa or Firecrawl.

Live monitoring has not been run. A key in the environment does not enable a live fetch. `npm test` covers the fixture path only.

## What this phase does

- Registers a monitored source with a classification, canonical URL, publication metadata, monitoring frequency, permission status, and last-check status.
- Refuses body retrieval when the source policy is restricted, metadata-only, or otherwise not permitted.
- Normalizes URLs and content, then stores a snapshot only when the retained text is new.
- Keeps every prior snapshot and detected change.
- Opens a proposed claim with source attribution, low confidence, and `needs_review`. The review status starts at `pending`.
- Records a human review decision without writing `lib/data/claims.ts`.

The exercised source is the public OWASP Non-Human Identities Top 10 (2025) page already cited as `src-owasp-nhi`. The check uses a short offline fixture, not a network call. A second path feeds that same fixture through the Firecrawl adapter as a mock, with no API key.

## What this phase does not do

- It does not declare a vendor capability verified.
- It does not invent pricing, product capabilities, or analyst rankings.
- It does not download full text from analyst, paywalled, or restricted sources.
- It does not start from the Next.js UI. The sources page is unchanged and does not run a check.
- It does not add a database. The ledger is an in-memory append-only object.

## Files

| File | Role |
| --- | --- |
| `lib/schema.ts` | Existing catalog schemas. Adds `claimSubjectTypeSchema` so proposals share the catalog subject enum. Vendor, product, capability, and claim validations are otherwise unchanged. |
| `lib/research/schema.ts` | `MonitoredSource`, `SourcePolicy`, `RetrievalRun`, `SourceSnapshot`, `DetectedChange`, `ProposedClaim`, `ReviewDecision`. |
| `lib/research/policy.ts` | Permission gate and monitoring interval. |
| `lib/research/normalize.ts` | Canonical URL cleanup and content normalization. Reuses `canonicalUrl` and `contentHash` from `lib/ingestion/manual.ts`. |
| `lib/research/ledger.ts` | In-memory history and cross-checks. |
| `lib/research/pipeline.ts` | Deterministic check: due, permission, retrieve, dedupe, queue. |
| `lib/research/review.ts` | Review transitions. Acceptance does not publish. |
| `lib/research/adapters.ts` | Fixture adapter, plus Firecrawl and Exa adapters that return mocks or a not-enabled error. |
| `lib/research/fixtures.ts` | OWASP public fixture and a restricted KuppingerCole policy used only to prove denial. |
| `lib/research/vertical-slice.ts` | `runOwaspPublicFixture`. |
| `lib/ingestion/adapters.ts` | Existing startup stubs. Still unused by the app. Research checks do not call `discover`. |
| `lib/research/research.test.ts` | Policy, schema, duplicate, permission, and review tests. |

## Schema additions

`MonitoredSource` points at an optional catalog source id. It stores publisher, author, source type, classification (`industry_analyst`, `vendor_first`, or `independent_industry`), canonical URL, `publishedAt`, monitoring frequency, permission status, and last-check status.

`SourcePolicy` is the permission record:

- `restricted` can only use retrieval scope `none`.
- `metadata_only` can only use `metadata`.
- `public_permitted` may store an excerpt, or full text when the source is not an industry analyst.
- `authorized` requires `authorizationRef`. Analyst full text is allowed only on this status.
- An authorization reference on any other status is invalid.

`ProposedClaim.verificationStatus` is the literal `needs_review`. Confidence is the literal `low`. `autoPublished` is false. A proposal may name `priorClaimId`; that id is a pointer to history, and the pipeline never edits the prior claim.

`ReviewDecision.publishesAutomatically` is false, and `resultingClaimId` is null. Phase 1 cannot record a published catalog id.

`SourceSnapshot` keeps the retained text. Excerpt scope cannot store more than 420 characters, matching the catalog excerpt limit. Metadata scope stores no body. Full text, when a policy allows it, is capped at 8,000 characters and flagged `truncated`.

## Pipeline

`checkMonitoredSource` is deterministic for a given ledger, fixture, and date.

1. Load the monitored source and its policy. A classification or permission mismatch throws before a run is stored.
2. Skip disabled sources. Skip sources that are not due unless `force` is set. Quarterly means 90 days from `lib/format.ts`.
3. Ask `retrievalAllowed`. A denial records `skipped_permissions`, does not call the adapter, and stores no snapshot.
4. Metadata scope records title and URL only. It does not call the adapter and does not open a proposal.
5. Excerpt and full text call the adapter. The fixture adapter reads the supplied document. Firecrawl and Exa return a supplied mock without a key. With a key and no mock, they return `live_not_enabled` and store nothing.
6. Normalize the URL. A document whose canonical URL is a different page is an error and is not stored.
7. Hash the retained text. Whitespace, non-breaking spaces, and zero-width characters do not count as a change. Tracking query parameters do not count as a different URL.
8. If the latest snapshot has the same hash, record `unchanged` and do not add a snapshot, change, or proposal.
9. If that hash was stored before, reuse the snapshot. A return to an older hash is a `reversion` change. The older bytes stay in the ledger.
10. If the same previous-hash to next-hash change already exists, record `duplicate` and do not add another change or proposal.
11. Otherwise append a `DetectedChange` with queue status `queued`. Explicit fixture statements become `ProposedClaim` rows. A repeated statement for the same source and URL is not proposed again. The change stays queued when every statement was a duplicate.

No model assigns `verified`. Statements come from the fixture or the mock. The pipeline copies them and marks them pending.

## Review

| From | Decision | To |
| --- | --- | --- |
| `pending` | `accept`, `reject`, `request_changes`, `defer` | `accepted`, `rejected`, `changes_requested`, `deferred` |
| `changes_requested` | `resubmit`, `accept`, `reject`, `defer` | `pending`, `accepted`, `rejected`, `deferred` |
| `deferred` | `accept`, `reject`, `request_changes` | `accepted`, `rejected`, `changes_requested` |
| `accepted`, `rejected` | any | error |

Every decision stays in the ledger. The proposal’s current status changes. `verificationStatus` stays `needs_review`. Accepting a proposal does not insert or overwrite a claim in `lib/data/claims.ts`.

## Tests

`lib/research/research.test.ts` covers:

- Public, restricted, metadata-only, and authorized source policies.
- Required monitored-source fields and rejection of verified or auto-published proposals.
- URL and whitespace normalization.
- No adapter call and no body when permission is missing.
- Duplicate snapshots, duplicate proposals, and duplicate change records.
- Reversion that keeps the earlier snapshot.
- Monitoring interval suppression.
- Review transitions, including an illegal transition.
- The OWASP fixture slice and the mocked adapter path.
- `live_not_enabled` when a Firecrawl key is present.

`npm test` also runs the existing catalog suite. Those checks still require every published claim to point at a real source.

## Remaining integration

These are not implemented. Do not describe them as working.

- A real Exa search and a real Firecrawl scrape, including timeouts, robots.txt, rate limits, and storage of only the policy’s allowed scope.
- A scheduler that calls `checkMonitoredSource` on the monitoring interval.
- A human review screen. Decisions are a library call today.
- A manual edit path from an accepted proposal into `lib/data/sources.ts` and `lib/data/claims.ts`. That edit stays a pull request. The ledger must keep the prior claim.
- Authorization records for any analyst or paywalled source a person is allowed to read. A public landing page is not authorization to store the report.
- Persistence beyond the process. Phase 1 holds the ledger in memory so the published seed cannot be overwritten by a check.

## How to run the offline slice

```ts
import { runOwaspPublicFixture } from "./lib/research/vertical-slice";

const { ledger, result } = await runOwaspPublicFixture();
```

`result.proposals` are pending. `ledger.decisions` is empty until `applyReviewDecision` is called. Neither function reads `FIRECRAWL_API_KEY` or `EXA_API_KEY`.
