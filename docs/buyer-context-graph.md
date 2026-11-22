# Buyer context in the evidence graph

This doc covers vendor-neutral buyer context (seats, pains, objections, alternatives, buying triggers, segments) and how it's layered onto the evidence graph that's already on main (`evidence-graph-v1`, PR #152). There is **one** graph contract. This work doesn't add a second one. The pattern follows GTM context graphs such as Octave's library and Cargo Context, but keeps this repo's evidence rules.

Seller-specific nodes stay in the consumer (Account Signal Engine) and join by `catalogId`: offerings, motions, persona×segment cells, proof points, references, accounts. This repo never imports them.

## Endpoints

| Endpoint | What it returns |
| --- | --- |
| `GET /api/evidence-graph` | The identity, secrets and NHI slice (default; unchanged) |
| `GET /api/evidence-graph?slice=market-map` | Every category and use case, plus buyer context for all seats |
| `GET /api/evidence-graph?slice=market-map&root=persona:appsec&depth=1` | A bounded neighborhood (the same limits as other slices) |
| `GET /api/gaps` | The gap report, measured against the catalog date |
| `GET /api/context-search?q=&types=&limit=` | Matching nodes plus one-hop neighbors, each with its evidence basis |
| `GET /api/persona-model` | The seat export used by the Account Workshop snapshot |

Pages: `/personas`, `/personas/[id]`, `/categories/[slug]`, `/gaps`, `/evidence-graph`.

## Contract 1.2.0 additions (additive)

- **Node kinds:** `pain` (catalog ID `<seat>:<index>`), `objection`, `alternative`, `trigger`, `segment`. Seats from #148, including business stakeholders, use the existing `persona:` kind.
- **Predicates:**
  - `experiences` (persona → pain)
  - `addressed_by` (pain → category or capability)
  - `raised_in` (pain → use case)
  - `raised_by` (objection → persona)
  - `about` (objection → category)
  - `points_to` (objection → alternative)
  - `substitutes_for` (alternative → category)
  - `activates` (trigger → use case or category)
  - `involves` (trigger → persona)
  - `requires` and `elevates` (segment → persona)
- **Evidence bases:** `field_validated` (1.1.0, gated by reviewed field notes) and `practitioner_published`, a third party's published framing. That's separate from `vendor_reported`, which is a vendor describing itself.

## Contract 1.3.0 additions (additive)

- **Node kind:** `question`, a qualification question for a seat or segment. The summary says what a good- or poor-fit answer sounds like. The detail gives its weight.
- **Predicates:**
  - `qualifies` (question → persona or segment). It carries the question's own evidence label.
  - `probes` (question → category). This is an editorial hypothesis.
- **Search:** `/api/context-search?q=<text>&types=question` returns questions with their seat or segment one hop away.

## Evidence mapping

`lib/evidence-graph/buyer-context.ts`'s `basisFor` never upgrades a label:

| Catalog label | Graph basis |
| --- | --- |
| `sourced` (with sources) | `source_referenced` |
| `sourced` (no sources) | `hypothesis` |
| `practitioner_published` | `practitioner_published` |
| `field_validated` | `field_validated` |
| `hypothesis` | `hypothesis` (sources dropped, per the contract) |
| `unknown` | `unknown` |

Editorial links between concepts (pain → category or capability, pain → use case, objection → category or alternative, trigger → persona) are always uncited `hypothesis`. A record keeps its own label only on the edge that states it. No buyer-context edge asserts a product capability.

## Gap report

`lib/gap-report.ts` reads the catalog and the market-map graph. It flags:

- core categories with no alternatives
- categories with no owning seat or no vendors
- categories with four or more owning seats
- seats whose pains are all hypotheses
- seats with no objections
- unlinked pains
- profiles not reviewed in 180+ days
- any `evidenceGraphProblems` contract violation

It never edits data.

## Consumers

Pin the commit, join on `catalogId`, and don't write back. Treat `hypothesis` as something to test in discovery, not something to claim.
