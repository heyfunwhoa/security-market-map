# Context graph

The market map is published as one typed graph so other projects and AI agents can traverse it the same way. The idea is borrowed from GTM context graphs such as Octave's library and Cargo Context: entities, the smaller concepts inside them, and typed relationships, all kept in git and rebuilt from the typed data on every build.

This repo holds only **vendor-neutral, public** knowledge. Seller-specific nodes stay in the consuming project and join by ID: offerings, motions, persona×segment cells, proof points, references, accounts, contacts and signals. This repo never imports them.

## Endpoints

| Endpoint | What it returns |
| --- | --- |
| `GET /api/graph` | Every node and edge (`security-market-map.context-graph.v1`), statically generated |
| `GET /api/gaps` | The gap report grouped by kind, measured against the catalog date |
| `GET /api/context-search?q=&types=&limit=` | Matching nodes plus their one-hop neighbors, for grounding an agent without running one |
| `GET /api/persona-model` | The seat-focused export the Account Workshop snapshot uses |

Pages: `/personas`, `/personas/[id]`, `/categories/[slug]` (alternatives, triggers, objections, owning seats), `/gaps`.

## Nodes

IDs are `type:key`, for example `seat:ot-security` and `category:ot-security`, because a seat and a category can share a key. `attrs.key` holds the raw catalog ID that other repos join on.

| Type | From |
| --- | --- |
| `domain`, `category`, `capability`, `outcome`, `use-case` | Catalog taxonomy |
| `vendor`, `product` | Catalog market data (research candidates) |
| `seat`, `pain` | Persona profiles and stakeholders |
| `objection`, `alternative`, `trigger` | `lib/data/objections.ts`, `alternatives.ts`, `buying-triggers.ts` |
| `segment`, `company-size` | Company-type overlays and size bands |
| `source` | Source records; every evidence edge points here |

## Edges

Each concept edge carries its `evidence` label: `sourced`, `practitioner_published`, `field_validated`, `hypothesis` or `unknown`.

```
seat ─experiences→ pain ─addressed-by→ category | capability
pain ─raised-in→ use-case            category ─contains→ capability
category ─delivers→ outcome          use-case ─uses→ category | capability
seat ─owns→ category                 seat ─seat:<type>→ seat      (hands-off-to, reports-to, approves-purchase, …)
seat ─present-at→ company-size       segment ─requires | elevates→ seat
vendor ─makes→ product ─in-category→ category ; product ─serves→ use-case
objection ─raised-by→ seat ; ─about→ category ; ─points-to→ alternative
alternative ─substitutes-for→ category
trigger ─activates→ use-case | category ; ─involves→ seat
any ─cites→ source
```

## Concepts added for the graph

- **Objections:** pushback in the buyer's words, the concern underneath, a neutral reframe to test, and questions that tell a real objection from a brush-off. Reframes argue for an approach, never for or against a named product.
- **Alternatives:** what buyers do instead (do nothing, manual process, build in-house, open source, a bundled platform feature, an adjacent category, a service), when it is good enough, and when it breaks. "When it breaks" is usually the buying trigger.
- **Buying triggers:** the event, its kind, and how it could be seen from outside. A public signal is a research lead, not buyer intent.
- **Pain → capability links:** curated by hand only where the catalog has a capability that addresses the pain. The gap report lists pains with no links.

## Gap report

`lib/gap-report.ts` is deterministic. It flags:

- core categories with no alternatives
- categories with no owning seat or no vendors
- categories with four or more owning seats
- seats whose pains are all hypotheses
- seats with no objections
- pains with no links
- profiles not reviewed in 180+ days
- dangling edges

It never edits data. Each gap is a research or review task.

## How consumers should use it

- Read the export, pin the commit, and join on `attrs.key`. Don't write back.
- Keep private nodes private. Account Signal Engine owns accounts, offerings, motions and proof.
- Treat `hypothesis` as something to test in discovery, not something to claim.
