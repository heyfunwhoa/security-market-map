# Security Atlas

A cybersecurity analyst’s coverage map of the security estate. Identity is the evidenced slice: every comparison cell is a sourced claim, a conflict, or Unknown. Corporate IT, application security, product security, cloud, data, security operations, GRC, validation, and platform security are mapped beside it. Those domains name the buyer, the budget, and the research-candidate vendors. They do not invent feature checkmarks.

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
- `lib/catalog.ts` merges the identity seed with the wider ecosystem, derives each domain’s category list from `category.domainIds`, and throws if a cross-reference is broken.
- Comparison (`lib/compare.ts`) fills a cell only from claims that are in force. Category membership is not evidence.
- Coverage (`lib/coverage.ts`) marks stale sources from the retrieval date and the source’s volatility window.
- Budget (`lib/budget.ts`) is three-year arithmetic on numbers you type. It is not a forecast.
- Territory (`lib/territory.ts`) keeps account notes in `localStorage`. A blank incumbent is unknown and is left out of the score.
- Ingestion (`lib/ingestion`) can preview a manual source. Firecrawl and Exa adapters report whether a key is present and throw if called.

A later move to a database can replace the seed imports behind the same catalog functions. Nothing in the UI talks to a database today.

## Provenance

Claims link to a source URL, a retrieval date, and a verification status. Vendor-published is not verified. Conflicting claims stay side by side (the Idira naming pair is the seeded example). Promotional prices are labeled as promotional. Analyst pages in the seed record that no rank was copied. Research-candidate vendors outside identity have positioning and open questions, not capability assertions.

## How the domains overlap

A category can sit in more than one domain. Secrets detection is identity and application security. PAM is identity and corporate security. CIEM is identity and cloud. A CNAPP suite is a cloud label, not proof that CSPM, CIEM, workload, and code are all licensed. Product security is the practice that ships something a customer trusts. Application security is the testing toolchain. GRC and customer-trust tools collect evidence from the other domains. They do not scan code or vault a secret.

Relationships are scoped to a use case. Two products can be complements for a leaked key and adjacent budgets for a cloud finding.

## How to add a sourced claim

1. Add the source in `lib/data/sources.ts` with the canonical URL, publisher, retrieval date, and volatility.
2. Add the claim in `lib/data/claims.ts`. Set `subjectType`, `subjectId`, `capabilityId`, polarity, source URL, observed date, and verification status.
3. If two current pages disagree, point `conflictsWith` both ways.
4. Run `npm test`. The catalog refuses a claim whose source, product, or capability does not exist, and a conflict that is not symmetric.
5. Do not fill a cell because a vendor is in the category. Absence of a statement stays Unknown.

## Data limits

- Identity claims were checked against public pages as of 23 Sep 2026. They go stale. The source ledger shows which ones are past their window.
- Mapped domains are a taxonomy plus named research candidates. SAST, SCA, CSPM, vulnerability management, disclosure, and customer-trust capabilities exist so a comparison can be asked. No claim answers them.
- No analyst placement, list price, customer logo, or feature-parity grid was invented.
- Account notes never leave the browser.

## Next three improvements

1. A human review queue that may call Firecrawl or Exa, then parks every extraction as unpublished until someone accepts the claim.
2. Move the catalog to a database with the same Zod shapes, so edits are not a code change.
3. Account briefs that can be copied into a CRM, plus a scheduled recrawl of sources already marked volatile.
