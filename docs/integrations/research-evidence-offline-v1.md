# Offline research-evidence-v1 consumer

Status: implemented on this feature branch for review; **synthetic offline preview only**. Continues KRU-54/KRU-57 following the 15-repository audit in Technical Docs PR #94. Their existing Done states do not certify this new slice or an authenticated integration. The user's continuation authorizes this bounded preparation, not production rights, merge or deployment.

## Scope and ownership

ASE owns source capture, exact source versions and approved export binding. Technical Docs owns the unchanged versioned wire schema. SMM owns its local interpretation, Unknown semantics and eventual catalog publication review. This module consumes synthetic JSON without importing either application's stores or creating another registry.

`lib/integrations/research-evidence.ts` adapts the shared staged/reference projection into a pure `previewResearchEvidenceBatch(packages)` function. There is no route, UI, environment switch, remote fetch, scheduler, persistence, database, public catalog write, provider or send. No existing screen or navigation changes. Every returned view explicitly has `publicationAllowed: false`; supported interpretation text is also kept outside the factual statement.

## Contract and fixture provenance

| Artifact | Authority / evidence |
| --- | --- |
| Canonical schema | `heyfunwhoa/technical-docs-platform`, commit `b64c69ee911f8d597028ca723dc5668343ce285e`, `contracts/research-evidence-v1.schema.json` |
| Local schema snapshot | `lib/integrations/contracts/research-evidence-v1.schema.json`; exact Git blob `f413f0a5c0606e1470727deaace6699fa171d938` asserted by the test |
| Producer | `heyfunwhoa/account-signal-engine`, commit `93e81bf7bad2df249a163502feabb33ab9baa56a`; existing `exportApprovedResearchEvidence` (merged #71) |
| Synthetic input / output | `ase-synthetic-product.input.json` and `ase-synthetic-product.v1.json`, under the local integration fixtures |
| Independent schema check | The actual exporter output was validated with ASE's existing Ajv draft-2020-12 validator against the canonical schema before native SMM consumption |

The input is invented public-documentation text on `docs.example.com`. Its reviewer, rights grant, claim, source version and dates are **synthetic**. No source was fetched, no real review or rights approval occurred, and this is not evidence about a vendor's actual capability. Only that deliberately public-safe synthetic input/output is copied; no private application source, customer/employer record or Joy Index content is included.

The consumer derives validation from the entire pinned JSON Schema using the already-installed Zod 4 `fromJSONSchema`; it does not maintain a second hand-written runtime wire schema or add a dependency. That converter is semi-experimental in the installed library. The exact-schema pin and negative tests cover the constraints used by this particular schema; this is not certification of arbitrary JSON Schema conversion. Refresh the schema only from its canonical owner and re-review constraints/tests before updating the pin.

## Local preview policy

- Accept only the four v1 subject types: vendor, product, category and capability. Incidents, accounts and contacts remain unsupported.
- Enforce the full nested schema, including required fields, enums, extra-property rejection, SHA-256/ID patterns, HTTPS prefix and text limits.
- Require `reviewedAt` locally even though it is optional in the wire schema. Validate actual calendar dates and retrieval ≤ review ≤ production. Preserve null versus omitted publication dates. These fixture timestamps are not real inspection dates.
- Preserve source URLs, publisher, content hash/version, timestamps, stable IDs, reported/observed classification, limitations and unresolved references. Vendor claims remain reported. A well-formed hash is not independent proof of captured bytes; the producer and real reviewer must establish that binding.
- Exclude all interpretation text from factual output. Unreviewed/rejected/superseded interpretation IDs remain explicit exclusions. A supported interpretation still does not become a sourced fact.
- Replay of identical validated content (regardless of object key order) yields one preview. Changed same-ID content or a key reused for a different ID quarantines affected previews; it does not overwrite silently.
- An explicit correction needs a new ID/key, an active predecessor, the same subject and non-regressing production/review times. The predecessor is superseded; an invalid correction does not partly replace it. Withdrawn or superseded records cannot reactivate through replay; withdrawing a replacement never reactivates its predecessor.

The batch is ordered and transient. Callers must supply the **complete history including withdrawals** on every invocation. A full-history replay demonstrates deterministic recovery only; it does not prove durable retention, correction authenticity, a remote tombstone channel, erasure after backup restore, or fail-closed operation when history is missing. An isolated old package cannot tell this function it was withdrawn elsewhere. Those remain later R2/R3/R4 work.

URL guards are lexical only; there are no DNS queries or fetches. Rights, reviewer identity/authority, current review validity, publisher meaning, local catalog mapping resolution and real source safety remain unverified. No valid preview authorizes publication or a live feed. Rejected receipts contain fixed codes rather than echoing source text/errors.

## Verification and repeatable producer proof

Normal repo CI needs only the checked-in synthetic fixtures:

```sh
npm test -- lib/integrations/research-evidence.test.ts
npm run test:research-integrity
npm test
npx next typegen
npm run typecheck
npm run lint
npm run build
```

The optional proof requires an explicit clean ASE checkout at the source pin above, with its existing dependencies already installed. It does not discover private directories or run installation, capture, migrations or providers. From the SMM checkout, for sibling repositories:

```sh
../account-signal-engine/node_modules/.bin/tsx \
  --tsconfig ../account-signal-engine/tsconfig.json \
  scripts/verify-ase-research-evidence.ts ../account-signal-engine
```

This invokes the real pinned exporter on the checked-in synthetic input, requires exact equality with the saved output, then calls the actual native SMM reader. It asserts one view after duplicate replay, preserved sources, withdrawal preventing reactivation, `publicationAllowed=false`, and zero fetch calls. The script refuses a different/dirty tracked producer revision and replaces fetch with a denial during the proof. It is an explicit local verification tool, never an application import or CI dependency on a private checkout.

Observed on this branch: 57 consumer tests; the native producer proof passed. Full-suite, research-integrity, generated types/typecheck, lint, production build and release-policy results are recorded in the PR at its final head. Initial typecheck exposed fixture-only null inference and missing generated Next route types; the fixture helper was widened and `next typegen` run before final checks. No production schema/configuration or published claims changed.

## Acceptance and next gate

| Criterion | Evidence / limit |
| --- | --- |
| Actual ASE output consumed natively | Pinned synthetic input/output and optional proof script; full schema plus local policy |
| Provenance and Unknown preserved | Consumer tests; null/omitted dates and unreviewed interpretation exclusions |
| Duplicate/correction safety | Consumer tests for collisions, supersession, invalidation, out-of-order withdrawal, forks and full-history replay |
| No public data or execution effects | Pure module imported only by its test/proof; no route/storage/transport changes; output remains non-publishable |
| Real reviewed record and production integration | **Not performed**; requires owner rights/review, authenticated transport and durable correction/erasure acceptance |

Next: owner reviews this draft and reconciles the remaining KRU-54/57 acceptance scope. Keep real source review, incident-contract evolution, authenticated transport, durable history and public publication as separately approved slices. Do not rebuild the exporter or silently broaden v1.

Rollback: close the draft or revert its isolated module/tests/schema/fixture/proof/docs files. No production data or migration rollback is involved. Manual browser/accessibility QA is not applicable because there is no UI change; real-source/deployed behavior remains unverified.
