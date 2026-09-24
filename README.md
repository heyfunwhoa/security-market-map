# Security Market Map

An evidence-linked guide to the cybersecurity market: what each solution category does, which problems it solves, where categories overlap, and how vendors position themselves.

Built by Kristen Aing as a portfolio project combining enterprise security sales, competitive research, and product thinking.

## Why this exists

Security categories are difficult to navigate. A product may be described as identity security, secrets management, cloud security, or application security depending on its capabilities and buyer. This project makes those relationships easier to explore without treating every vendor as a direct competitor.

## What the map covers

- **Identity:** access management, IGA, PAM, CIEM, and nonhuman identities
- **Application security:** code, dependencies, secrets detection, APIs, and ASPM
- **Cloud security:** CSPM, workload protection, and CNAPP
- **Data security:** DSPM, DLP, classification, and encryption
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

The first deep dive maps **secrets detection → secrets management → nonhuman identity → identity governance**. It explains where these products complement one another and where their capabilities compete.

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

Copy `.env.example` if you want the optional adapter flags. Leave `FIRECRAWL_API_KEY` and `EXA_API_KEY` empty. The app runs on the local seed and does not call those adapters at startup.

## Architecture

- Next.js App Router, TypeScript, Tailwind, and accessible UI primitives.
- Typed seed in `lib/data`, validated with Zod in `lib/schema.ts`.
- `lib/catalog.ts` merges the identity seed with the wider ecosystem and throws if a cross-reference is broken.
- Comparison fills a cell only from claims that are in force. Category membership is not evidence.
- Coverage marks stale sources from the retrieval date and the source’s volatility window.
- Budget is three-year arithmetic on numbers you type. It is not a forecast.
- Territory notes stay in `localStorage`. A blank incumbent is unknown and is left out of the score.

## How to add a sourced claim

1. Add the source in `lib/data/sources.ts` with the canonical URL, publisher, retrieval date, and volatility.
2. Add the claim in `lib/data/claims.ts`. Set the subject, capability, polarity, source URL, observed date, and verification status.
3. If two current pages disagree, point `conflictsWith` both ways.
4. Run `npm test`. The catalog refuses a claim whose source, product, or capability does not exist, and a conflict that is not symmetric.
5. Do not fill a cell because a vendor is in the category. Absence of a statement stays Unknown.

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
