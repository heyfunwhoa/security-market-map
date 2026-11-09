# Persona data model

As of: 2026-11-08. How the persona, stakeholder, title, and segment data fit together, and how to use them from other projects.

Implementation status: the typed model and export were merged in [PR #148](https://github.com/heyfunwhoa/security-market-map/pull/148) (merge `96b6c6b`, deployed to production on 2026-11-09). Consumers should still pin an exact commit, because the export carries no content revision of its own.

## Personas vs ICP

These are separate on purpose.

- **ICP = the account.** Which companies to sell to: size, industry, stack, regulation, signals. Not modeled here.
- **Personas = the people inside the account.** Which seats exist, what they care about, how they buy, and how their titles read.

The persona model gives ICP work its join points, so account research can ask "at a 300-person fintech, which seats should we investigate?" without treating a size-band hypothesis as a confirmed org chart:

| ICP input | Persona model field to join on |
| --- | --- |
| Employee count | `companySizeBands`, `profile.bySize` (dedicated / shared / usually-absent / external, plus `coveredBy`) |
| Industry, region, ownership | `segmentOverlays` (`elevatedPersonaIds`, `mandatedSeats`, `addedTriggers`) |
| Observable signals (postings, filings) | `profile.publicSignals`; job titles via `matchTitle()` |
| Product category fit | `persona.categoryIds` → `vendorsForSeat()` |
| Use case fit | `useCaseSeats` → `seatsForUseCase()` |

Do not score accounts from titles alone (see the fit worksheet in `market-research/security-org-personas.md`).

## Entities

| Entity | File | Key | What it holds |
| --- | --- | --- | --- |
| Persona | `lib/data/personas.ts`, `lib/data/ecosystem.ts` | `id` | Security seats that own product categories. Drives the landscape buyer filter. |
| Stakeholder | `lib/data/stakeholders.ts` | `id` | Non-security seats (CEO, CIO, IT ops, CFO, procurement, legal, board, HR). No categories. |
| Seat profile | `lib/data/persona-profiles.ts`, `lib/data/stakeholders.ts` | `personaId` | One per persona and stakeholder: function, cluster, org placement, buying roles, job, **pains**, triggers, measures, objections, edges, communities, frameworks, deal stages, public signals, presence by size, evidence. |
| Edge | inside a profile | `toPersonaId` + `type` | Who sponsors, reports to, hands off to, collides with whom, and what moves across. |
| Title form | `lib/data/titles.ts` (`titleForms`) | seat id | Stems, IC nouns, and levels a seat reaches; used to generate and match titles. |
| Acronym | `lib/data/titles.ts` (`acronymGlossary`) | `acronym` | Expansion, seats, and a caution when overloaded (SOC vs SOC 2, DevSecOps, IR). |
| Title rule | `lib/data/titles.ts` (`titleRules`) | `id` | Generic or overloaded titles that return several seats with a note. |
| Seniority level | `lib/data/titles.ts` (`seniorityLevels`) | level | IC → C-level, title patterns, typical buying roles. |
| Segment overlay | `lib/data/company-segments.ts` | `id` | Business model, industry, region, ownership, provider overlays; rule-required seats are sourced. |
| Use case seats | `lib/data/persona-connections.ts` | `useCaseId` | Seats and likely budget seats per use case; unmodeled stakeholders listed. |
| Source | `lib/data/persona-sources.ts` | `id` | Paraphrased source records behind sourced profiles, pains, edges, and overlays. |
| Field note | `lib/data/field-notes.ts` | `id` | Anonymized patterns from real conversations (patterns only, month only). Needed before any `field_validated` label. Intake: `docs/market-research/field-notes-template.md`. |
| Title corpus | `lib/fixtures/title-corpus.ts` | title | Representative job titles with the expected seat; regression test for `matchTitle`. |

Schemas live in `lib/schema.ts` (`personaProfileSchema`, `stakeholderSchema`, `segmentOverlaySchema`, `useCaseSeatsSchema`, `painSchema`, `seatFunctionSchema`, `seniorityLevelSchema`, `dealStageSchema`, `companySizeSchema`, `fieldNoteSchema`). `lib/catalog.ts` fails the build on broken links, missing profiles, and unsourced "sourced" claims.

## Functions → clusters → seats

- `function`: where the seat lives — security, engineering, IT, legal-privacy, finance-procurement, executive, people, external.
- `cluster`: the shared job — lead-govern, build, protect, detect-respond, validate, recover, engineering-ai, service-provider, business.
- `orgPlacement`: where it usually reports (can be "varies").
- Seniority is read from the title, not stored on the seat; `buyingRolesFor(seat, level)` narrows roles by level.

## How to use it

```ts
import { matchTitle, typicalTitles, seatsByFunction } from "@/lib/title-match";
import { seatContext, committeeForStage, whoCovers, painsForCategory, painsForUseCase } from "@/lib/persona-graph";

matchTitle("Sr. Manager, Product Security");
// → seniority "manager", top seat product-security (function security, confidence high), likely buying roles

typicalTitles("appsec");          // titles per level, IC → VP
seatsByFunction().security;       // seats with acronyms
seatContext("identity-security"); // edges, use cases, vendors, overlays, who covers it by size
painsForCategory("itdr");          // seats whose pains this category addresses
painsForUseCase("uc-finding-route");
committeeForStage("close", "small");   // who is in the room at close at a small company
whoCovers("ciso", "small");       // → ceo-founder, cto
```

Once the owning PR is reviewed, merged, and its deployment is verified, a consumer can read the model as JSON:

```
GET /api/persona-model
```

The payload carries `version` (`PERSONA_MODEL_VERSION` in `lib/persona-model.ts`). Bump it when a field is renamed or removed. 1.1.0 renamed the `legal` stakeholder to `legal-counsel` and added `field_validated`, pain category/use-case links, and new source types; 1.0.0 was never released.

## Keeping it honest

- Every profile, pain, edge, and overlay carries `evidence`: `sourced`, `practitioner_published`, `field_validated`, `hypothesis`, or `unknown`. `field_validated` fails the build unless the seat has 3+ reviewed, non-challenging field-note conversations. Most edges, pains, size presence, stages, and signals are hypotheses.
- `docs/market-research/security-titles-and-pains.md` is generated. After changing titles, acronyms, or pains, run `npm run docs:personas`; tests fail if the doc drifts.
- Title matching is a routing hint. Ambiguous titles return several seats and a note; confirm in discovery.

## One owner for each kind of knowledge

This is the local application of the existing shared [connected sales-flow design](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/product/security-gtm-intelligence-foundation/sales-flow.md). It adds no separate persona registry, shared database, synchronization job, or new contract version.

| Knowledge | Authoritative home | How other projects use it |
| --- | --- | --- |
| Stable persona/stakeholder IDs, names, aliases, generic questions | Existing typed records listed above | Reference the seat ID and exact content revision |
| Generic responsibilities, pains, outcomes, handoffs and evidence labels | Existing typed profiles, edges and source records | Read or derive a view; propose corrections in this repository |
| Role explanations and research candidates | This repository's research atlas | Editorial context; not an automatic override of typed data |
| Generated titles/pains reference and JSON export | Derived from the typed model | Regenerate; never maintain a competing editable copy |
| Lesson sequence, examples and learner progress | The consuming learning system | Reference the relevant seats; own the teaching and assessment |
| Company positioning and approved product proof | Authorized company enablement system | Apply a company overlay without rewriting neutral role guidance |
| Actual people, expressed priorities and buying-role assignments | Authorized CRM or company record | Link generic seat guidance; retain account evidence and authority locally |
| Shared provenance, privacy and interface rules | Existing Technical Docs standards/contracts | Link the shared rules; this document only explains persona-specific use |

The same responsibility can appear in several products as a generated view or a contextual example. Edit the underlying generic profile here. A lesson owns its explanation; it does not become a new authority for the persona's responsibilities.

## Reference a seat and a content revision

Use the existing sales-flow design's `personaRefs` with revisions. For a manual lesson or brief, record the following as front matter or a small reference table. These are consumer metadata conventions, not fields newly added to `personaModel()` or a second runtime schema.

| Reference field | Meaning |
| --- | --- |
| `repository`, `path` | Owning repository and typed file, or explicitly identified research document |
| `personaId` | Existing stable ID, such as `platform`; stakeholders use their existing seat ID |
| `revision` | Full Git commit for the source content actually inspected |
| `sourceStatus` | Proposed branch versus reviewed/merged content, with PR or review evidence |
| `modelVersion` | Export format version when using JSON; omit for a document-only reference |
| `checkedAt` | When this consumer checked this reference, not a verification date for every upstream claim |
| `consumerOwner`, `use` | Who maintains the derived artifact and why it uses this seat |
| `nextReviewTrigger` | Changed seat/source/ID, corrected evidence, or use before publication |

`PERSONA_MODEL_VERSION` identifies the payload format. It is not a content revision or editorial approval. `asOf` is also not proof that every source was inspected. Pin the Git revision separately; a future deployed consumer must obtain a verifiable deployment revision or content digest before relying on an export. That provenance is not currently included in the JSON payload.

The proposed export lists `sourceIds` but does not embed complete source records. A consumer making source-dependent claims must resolve those IDs in `catalog.sources` at the same revision and retain the original classification, dates, limitations and permitted reuse. A missing source, unknown seat, inaccessible revision or unsupported payload version is a review gap. Do not silently substitute a similar title or mark a reference verified.

Read-only cached projections are acceptable when labeled with their source revision and refresh state. They are replaceable derived data, not a second editable catalog. No consumer cache or automated refresh is implemented by this documentation.

## Change and correction workflow

1. Identify whether the change concerns a generic role, an account observation, a company overlay, or a lesson. Send it to the owner in the table above.
2. For a generic change, reuse the seat ID, inspect source support, and distinguish a responsibility hypothesis from observed evidence. Review title rules when an alias could match several functions.
3. Edit the existing typed records in a bounded PR. Run existing catalog/model tests and regenerate the titles/pains document with `npm run docs:personas` if its inputs change. Do not hand-edit generated output.
4. Record changed seat/source IDs, the old and new content revisions, and whether the change affects meaning, compatibility or presentation.
5. Each affected consumer records update / no change / defer with a reason. Re-review a current recommendation whose basis is invalidated. Preserve historical meeting records and assessment evidence with their original attribution.
6. For a seat split, rename or retirement, retain an explicit old-to-new mapping and review dependent references before removal. An unresolved mapping stays unknown.

This is a manual review workflow. There is no change webhook, consumer-impact registry or automatic retraction enforcement in this change. Introduce automation only after two concrete consumers demonstrate the same need; use the existing export and shared contracts.

### Current sequencing

- The typed model, generated view and API merged in PR #148. Propose changes through new PRs against `main`.
- [PR #123](https://github.com/heyfunwhoa/security-market-map/pull/123) adds seats that overlap this work. Before the second PR merges, reconcile `legal-counsel` with `legal`, preserve aliases, and ensure every resulting seat has exactly one profile. Do not publish an assumed migration.
- A document consumer can use an exact branch reference for review today, clearly marked proposed. A runtime consumer must wait for a reviewed compatible revision and verified access.
- Account research and sales tools may consume generic role guidance; this does not supply account-specific ownership, buying intent or permission to write company systems.

## Acceptance examples for consumers

| Situation | Expected handling |
| --- | --- |
| Two lessons reference the same `platform` revision | Both link one profile; neither maintains a full editable copy |
| A seat's responsibilities change | Review affected explanations/questions; preserve historical learner responses |
| An SRE title matches the broad `platform` seat | Ask which service and responsibility it covers; do not infer platform product ownership or budget |
| A source ID or seat is missing | Mark unresolved and pause the affected claim instead of guessing |
| A new source invalidates a current recommendation | Flag the recommendation for review; retain its original source revision |
| A private conversation suggests a general pattern | Keep the conversation in its authorized system; independently research any public claim |
