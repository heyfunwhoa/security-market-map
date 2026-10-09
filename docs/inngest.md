# Inngest vendor monitor

Inngest schedules and fans out vendor research. The first workflow checks one public HashiCorp Vault tutorial with an offline fixture. It does not crawl the web, call a model, or edit the published catalog.

Live monitoring has not been run. Syncing this app to Inngest Cloud has not been done.

## What already existed

- Next.js App Router pages and a Zod catalog in `lib/data`. There is no Neon database, ORM, or vendor table. Vendor, product, category, and claim records are TypeScript seeds checked by `lib/catalog.ts`.
- Phase 1 research types in `lib/research`: monitored sources, permission policies, snapshots, detected changes, and pending proposals. Firecrawl and Exa adapters return fixtures or `live_not_enabled`. They are not called when the app starts.
- Coverage staleness is date arithmetic in `lib/coverage.ts`. Nothing scheduled a refresh.
- No AI SDK is installed. A vendor statement is not classified by a model.

## What this adds

| Piece | Role |
| --- | --- |
| `lib/research/vendor-monitor.ts` | HashiCorp plan, fixture check, findings, material alerts, and the status view |
| `lib/research/runtime-store.ts` | Process-memory ledger for a local Inngest run. Empty until a function saves one |
| `lib/inngest/client.ts` | Inngest client id `security-market-map` |
| `lib/inngest/functions.ts` | Schedule, research, and material-change functions |
| `app/api/inngest/route.ts` | `GET`, `POST`, and `PUT` serve handler |
| `app/api/research/status/route.ts` | JSON status for the HashiCorp monitor |
| `components/vendor-research-panel.tsx` | Freshness, source, pending finding, versions, alerts, and failures |

The sources page and the HashiCorp vendor page render the offline preview. Other vendor pages are unchanged.

## Workflow

1. `schedule-vendor-research` runs Mondays at 12:00 UTC (`0 12 * * 1`). It selects at most five due vendors and sends `vendor/research.requested`. Only HashiCorp is registered. Concurrency is 1.
2. `research-vendor` checks that vendor's permitted sources through the existing pipeline. Official Vault documentation is stored as a short excerpt and a `vendor_claim` with `needs_review`. Retries are 2. Concurrency is 1, because the ledger is one in-memory object and two overlapping runs would overwrite each other. The same vendor and date share an idempotency key. Throttle is 2 runs per hour per vendor. A thrown failure calls `onFailure` and appends a failed workflow run without deleting snapshots. A malformed event throws `NonRetriableError` and is not retried.
3. If the retained excerpt changes after the first observation, the function sends `vendor/research.changed`. `review-vendor-change` opens one material alert and keeps the previous excerpt. The first observation does not open an alert. If the change id is not in the ledger of the process that receives the follow-up, the follow-up records a failed workflow run and does not invent an alert.

The event carries a vendor id and a date. It does not carry page text, so a caller cannot inject a capability statement.

Restricted and paywalled sources are not on this plan. The phase 1 policy gate still refuses body retrieval when a source is restricted. Robots.txt is not consulted because this workflow does not perform a live fetch.

`evidenceClass` allows `sourced_fact`, `vendor_claim`, and `ai_hypothesis`. The HashiCorp finding is `vendor_claim`. An AI hypothesis fails validation. `generatedByModel` is false.

Accepting a proposal still does not write `lib/data/claims.ts`. The published Vault claim stays as it was.

## Environment

```bash
# Local Dev Server. Required for /api/inngest while developing.
INNGEST_DEV=1

# Inngest Cloud. Leave INNGEST_DEV unset in production.
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=
```

`INNGEST_DEV=1`, or a Dev Server URL, puts the SDK in dev mode. Production leaves that variable unset and sets `INNGEST_SIGNING_KEY` and `INNGEST_EVENT_KEY` from the Inngest Cloud app. The SDK reads those keys itself. This repository does not store a key.

If neither `INNGEST_DEV` nor `INNGEST_SIGNING_KEY` is set, the process is in cloud mode with nothing to authenticate. `GET`, `POST`, and `PUT` `/api/inngest` return HTTP 503 and this message: "Inngest is not configured. Set INNGEST_DEV=1 for the local Dev Server, or set INNGEST_SIGNING_KEY before connecting this app to Inngest Cloud." The SDK would otherwise answer the same request with HTTP 500.

`npm install` uses `legacy-peer-deps` because Inngest 4.22 declares an optional SvelteKit peer this app does not use.

## Local Dev Server

In one terminal, with dev mode set:

```bash
INNGEST_DEV=1 npm run dev
```

In another:

```bash
npx inngest-cli@latest dev
```

Open the Dev Server, invoke `research-vendor` with:

```json
{ "data": { "vendorId": "hashicorp", "asOf": "2026-10-09" } }
```

The dev server shows the run, the step, and a failure if one is thrown. A successful local invoke writes the process-memory ledger. `GET /api/research/status` returns that ledger when the same server process handled the run. The static vendor page keeps showing the offline preview baked at build time. Neither result is a live crawl.

## Deployment

Register `https://<host>/api/inngest` in Inngest Cloud and set the event and signing keys in the host's environment. Leave `INNGEST_DEV` unset there. The route is dynamic. A host without `INNGEST_SIGNING_KEY` returns HTTP 503 from `/api/inngest` and will not sync. No Neon migration is included. A durable research history needs a database this repository does not have. Process memory is lost when the server exits.

## Tests

`lib/inngest/functions.test.ts` covers the fixture check, duplicate excerpts, version history, material alerts, missing fixtures, the schedule batch, and the Inngest retry, concurrency, idempotency, and throttle settings.

These tests do not call Inngest Cloud or the Dev Server.
