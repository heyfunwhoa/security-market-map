# Security Market Map

An evidence-linked guide to the cybersecurity market: what each solution category does, which problems it solves, where categories overlap, and how vendors position themselves.

Built by Kristen Aing as a portfolio project combining enterprise security sales, competitive research, and product thinking.

## Why this exists

Security categories are difficult to navigate. A product may be described as identity security, secrets management, cloud security, or application security depending on its capabilities and buyer. This project makes those relationships easier to explore without treating every vendor as a direct competitor.

## What the map covers

- **Identity:** access management, IGA, PAM, CIEM, and nonhuman identities
- **Application security:** static, interactive, and dynamic testing, dependencies, secrets detection, APIs, runtime protection, supply chain, and ASPM
- **Cloud security:** CSPM, CNAPP, cloud vulnerability assessment, containers, infrastructure as code, and cloud detection
- **Data security:** DSPM, data access governance, database controls, DLP, encryption, and privacy
- **Network and access:** firewalls, ZTNA, SSE, and SASE
- **Security operations:** SIEM, XDR, MDR, and threat intelligence
- **Exposure management:** vulnerabilities, attack surface, and prioritization
- **AI security:** agent identity, authorization, data access, and application controls

Identity is the evidenced slice: every comparison cell is a sourced claim, a conflict, or Unknown. The other domains name the buyer, the budget, and research-candidate vendors. They do not invent feature checkmarks.

## What each category page explains

1. The problem it solves
2. Typical buyers and stakeholders
3. Core capabilities and common terminology
4. Adjacent and overlapping categories
5. Example vendors and their positioning
6. Sources, publication dates, and confidence notes

Vendor inclusion is illustrative. It is not an endorsement or an analyst ranking.

## Initial focus

The first deep dive maps **secrets detection → secrets management → nonhuman identity → identity governance → agent runtime → data security**. The guided scenario is a coding agent that finds a credential, uses it against a cloud service, and tries to export data.

AI security is its own domain: application testing, agent identity, runtime enforcement, MCP and tools, AI data boundaries, model deployment, and governance. SACR's ARISE and endpoint-control zones are labeled as SACR frameworks.

The Cyera–Oasis case study separates the companies' strategic rationale and the 3 Sep 2026 completion statement from any claim that a joint enforcement workflow has been reviewed.

## Research standards

- Link material claims to a public source.
- Record when a source was published and when it was reviewed.
- Separate vendor claims from independently supported findings.
- Identify analysis as interpretation.
- Do not reproduce paywalled analyst reports or present an analyst category as a universal market definition.
- Update or flag claims when positioning or product capabilities change.

## Run locally

```bash
npm install
npm run dev
```

The dev server listens on [http://127.0.0.1:43123](http://127.0.0.1:43123).

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

Copy `.env.example` to `.env.local` if you want the optional flags. Leave `FIRECRAWL_API_KEY` and `EXA_API_KEY` empty. The app runs on the local seed and does not call those adapters at startup.

## Vendor research

The published catalog stays in `lib/data`. A separate ledger can record one HashiCorp Vault check from an offline fixture and queue it as a pending vendor claim. Details are in `docs/inngest.md` and `docs/research-engine.md`.

These paths work with no external account:

- Pages, including the research panel on `/sources` and `/vendors/hashicorp`.
- `GET /api/research/status`, which returns the offline fixture until this process has saved a run.
- `npm test`, which covers deduplication, excerpt history, material alerts, and the Inngest function settings.

These paths stay idle until you configure them:

| Capability | What you must set |
| --- | --- |
| Run the scheduled functions | Locally, `INNGEST_DEV=1` and the Inngest Dev Server below. In a deployment, Inngest Cloud keys. `next start` does not fire the Monday cron by itself. |
| Serve `/api/inngest` | `INNGEST_DEV=1` for local development, or `INNGEST_SIGNING_KEY` for Cloud. Otherwise the route returns HTTP 503. |
| Send events from this app to Inngest Cloud | `INNGEST_EVENT_KEY`. Local dev does not need it. |
| Collect a live vendor page | Not available. `FIRECRAWL_API_KEY` and `EXA_API_KEY` do not enable a crawl. |
| Keep research history on one machine after a restart | The default file `.data/research-ledger.json`, or `RESEARCH_LEDGER_PATH`. Set the path to `memory` to skip the file. Two servers still do not share a ledger. |
| Publish a finding into the map | A person copies a reviewed statement into `lib/data`. Recording a review in the ledger does not do this. |

Local Dev Server, in two terminals:

```bash
INNGEST_DEV=1 npm run dev
npx inngest-cli@latest dev
```

Register `http://127.0.0.1:43123/api/inngest` in the Dev Server. Leave `INNGEST_DEV` unset on any public host.

To deploy the functions, host this Next.js app, set `INNGEST_EVENT_KEY` and `INNGEST_SIGNING_KEY` from the Inngest Cloud app, leave `INNGEST_DEV` unset, and sync `https://<host>/api/inngest`. That sync has not been done from this repository. A successful sync still checks the offline fixture. It does not monitor the public web, and a second instance will not see the first instance's ledger.

## Architecture

- Next.js App Router, TypeScript, Tailwind, and accessible UI primitives.
- Typed seed in `lib/data`, validated with Zod in `lib/schema.ts`.
- `lib/catalog.ts` merges the identity seed with the wider ecosystem and throws if a cross-reference is broken.
- Comparison fills a cell only from claims that are in force. Category membership is not evidence.
- Coverage marks stale sources from the retrieval date and the source’s volatility window.
- The phase 1 research ledger in `lib/research` checks an offline fixture, queues pending proposals, and does not publish them. See `docs/research-engine.md`. Inngest can schedule the HashiCorp fixture. See `docs/inngest.md`. Live Exa, Firecrawl, and Inngest Cloud monitoring are not implemented.
- Budget is three-year arithmetic on numbers you type. It is not a forecast.
- Territory notes stay in `localStorage`. A blank incumbent is unknown and is left out of the score.

## How to add a sourced claim

1. Add the source in `lib/data/sources.ts` with the canonical URL, publisher, retrieval date, and volatility.
2. Add the claim in `lib/data/claims.ts`. Set the subject, capability, polarity, source URL, observed date, and verification status.
3. If two current pages disagree, point `conflictsWith` both ways.
4. Run `npm test`. The catalog refuses a claim whose source, product, or capability does not exist, and a conflict that is not symmetric.
5. Do not fill a cell because a vendor is in the category. Absence of a statement stays Unknown.
6. A research proposal is not a catalog claim. Accepting one in `lib/research` does not edit this seed. Copy a reviewed statement into the files above in a separate change, and leave the older claim in place when positioning changes.

## Data limits

- Identity claims were checked against public pages as of 23 Sep 2026. They go stale. The source ledger shows which ones are past their window.
- Mapped domains are a taxonomy plus named research candidates. No claim answers SAST, SCA, CSPM, or the other non-identity capabilities.
- No analyst placement, list price, customer logo, or feature-parity grid was invented.
- Account notes never leave the browser.

## Status

The map is runnable. Identity carries cited claims. The surrounding domains are mapped, with Unknown left visible where a source has not been recorded.

## About

I’m an enterprise cybersecurity seller with experience across network security, detection and response, and application security. This project is a way to make complex security markets useful for sales discovery, competitive analysis, and learning.

## Disclaimer

This is an independent educational and portfolio project. It is not affiliated with Gartner, Forrester, IDC, or any vendor mentioned.
