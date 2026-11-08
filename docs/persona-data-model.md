# Persona data model

As of: 2026-11-07. How the persona, stakeholder, title, and segment data fit together, and how to use them from other projects.

## Personas vs ICP

These are separate on purpose.

- **ICP = the account.** Which companies to sell to: size, industry, stack, regulation, signals. Not modeled here.
- **Personas = the people inside the account.** Which seats exist, what they care about, how they buy, and how their titles read.

The persona model gives ICP work its join points, so an ICP score can ask "at a 300-person fintech, which seats exist and who buys?" without changing this model:

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

From another project, fetch the whole model as JSON:

```
GET /api/persona-model
```

The payload carries `version` (`PERSONA_MODEL_VERSION` in `lib/persona-model.ts`). Bump it when a field is renamed or removed. 1.1.0 renamed the `legal` stakeholder to `legal-counsel` and added `field_validated`, pain category/use-case links, and new source types; 1.0.0 was never released.

## Keeping it honest

- Every profile, pain, edge, and overlay carries `evidence`: `sourced`, `practitioner_published`, `field_validated`, `hypothesis`, or `unknown`. `field_validated` fails the build unless the seat has 3+ reviewed, non-challenging field-note conversations. Most edges, pains, size presence, stages, and signals are hypotheses.
- `docs/market-research/security-titles-and-pains.md` is generated. After changing titles, acronyms, or pains, run `npm run docs:personas`; tests fail if the doc drifts.
- Title matching is a routing hint. Ambiguous titles return several seats and a note; confirm in discovery.
