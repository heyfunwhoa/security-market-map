# Incident feed UX plan

**Status:** proposed design, with phase 1 implemented in the PR that adds this file. Phases 2 and 3 are proposals that need owner review. This document does not change the incident schema, the classification framework, or the publication gate in `lib/security-intelligence-contract.ts`.

Reuse: [information architecture](../security-intelligence/information-architecture.md), [classification framework](../security-intelligence/incident-classification-framework.md), [progressive exploration](progressive-exploration.md), [UI bank adoption](../ui-bank-adoption.md).

## Users and jobs

Primary users are security sellers preparing for accounts. Secondary users are AppSec and DevSec practitioners checking what happened.

1. **Account prep:** find recent incidents for an ecosystem or category and see whether they are reviewed.
2. **Call prep:** copy a sourced talking point (with publisher, date and link) for a call.
3. **Practitioner check:** see what is known, what is unknown, and which ATT&CK techniques are mapped. Show "Not evaluated" when nothing is mapped.

"How a category changed over time" is deferred until the catalog has enough reviewed incidents.

## UX audit (as of `main` at 7bbcc1a)

1. The primary nav in `components/chrome.tsx` has 15 pages and no entry for incidents or threat intel.
2. `incidents.seed.json` (2 reviewed incidents) is only read by tests. No page shows a real incident.
3. The cmdk search (`components/search-panel.tsx`, `lib/catalog.ts#searchIndex`) does not index incidents.
4. Incidents carry `affectedEcosystems`, but there is no reviewed link from an incident to a market category.
5. `/frameworks/incident-lab` is a synthetic reviewer workbench and the only incident screen. It reads as the incident product.
6. The home page puts long caveats before the first useful action.
7. `.dark` tokens exist in `app/globals.css`, but nothing applies them. The dark palette is the stock neutral one and its contrast is untested.
8. Evidence states render inconsistently across pages. `StatusPill` exists but has no incident states.
9. The graph views (`/evidence-graph`, `/connections`) have no keyboard-friendly relationship list.
10. No screen gives a copyable, sourced talking point.

## Information architecture

```
Header:  Domains · Products · Compare · Incidents · [Search ⌘K] · [All pages]
                                         │
/incidents                     feed: reviewed incidents, newest disclosure first
  ?kind=supply_chain|breach|intrusion|malware_campaign
  ?ecosystem=npm|enterprise_software|…
  ?category=<category id>        (phase 2, needs reviewed incident→category links)
/incidents/[slug]              detail: claims, sources, unknowns, ATT&CK, talk track
/categories/[slug]             gains "Related incidents" (phase 2)
/review/incident-lab           incident lab moves out of the reader path (phase 2)
```

Zoom levels follow [progressive exploration](progressive-exploration.md): domain → category → incident feed filtered to that scope → incident detail → individual source. Every detail page links back to the feed scoped to the same ecosystem and to the unfiltered feed.

Filters are URL parameters, so a filtered view can be shared or bookmarked. Each filter is a single choice with an "All" option. Active filters are shown with a "Clear filters" action. Filtering happens in the client over static data, with no request needed.

## Wireframes

### Market map entry (home, phase 2 trim)

```
┌──────────────────────────────────────────────────────────────┐
│ The security market, mapped by what each solution protects.  │
│ [Explore domains]  [Browse products]  [Recent incidents →]   │
├──────────────────────────────────────────────────────────────┤
│  Prevent        Detect         Respond        Govern         │
│  ┌──────┐       ┌──────┐       ┌──────┐       ┌──────┐       │
│  │ Id.  │       │ SecOps│      │ IR   │       │ GRC  │       │
│  └──────┘       └──────┘       └──────┘       └──────┘       │
│  Click a block → domain page → category → related incidents  │
├──────────────────────────────────────────────────────────────┤
│ ▸ How to read this map (caveats, collapsed)                  │
└──────────────────────────────────────────────────────────────┘
```

### Incident feed (`/incidents`, phase 1)

```
┌──────────────────────────────────────────────────────────────┐
│ Incidents                                                    │
│ Publicly reported incidents that passed editorial review.    │
│ Each one cites its sources. Candidates are not shown.        │
├──────────────────────────────────────────────────────────────┤
│ Type: (All) Supply chain  Breach  Intrusion  Malware         │
│ Ecosystem: (All) npm  Enterprise software                    │
│ 2 incidents · Clear filters                     (aria-live)  │
├──────────────────────────────────────────────────────────────┤
│ SUPPLY CHAIN · Disclosed 23 Sep 2025         [Seed reviewed] │
│ Shai-Hulud npm ecosystem compromise                          │
│ CISA issued an alert describing a self-replicating npm…      │
│ ┃ Talk track [Draft]  CISA alerted on a self-replicating…    │
│ Source: CISA · 23 Sep 2025 │ npm │ ATT&CK: Not evaluated     │
│ 2 open questions                                             │
├──────────────────────────────────────────────────────────────┤
│ SUPPLY CHAIN · Disclosed 13 Dec 2020         [Seed reviewed] │
│ SolarWinds Orion supply-chain compromise                     │
│ …                                                            │
└──────────────────────────────────────────────────────────────┘
Mobile: same order, one column; filters wrap; tap targets ≥ 44px.
```

### Incident detail (`/incidents/[slug]`, phase 1)

```
┌──────────────────────────────────────────────────────────────┐
│ Home › Incidents › Shai-Hulud npm ecosystem compromise       │
│ SUPPLY CHAIN                                                 │
│ Shai-Hulud npm ecosystem compromise                          │
│ [Seed reviewed] [Reported]  Disclosed 23 Sep 2025 ·          │
│ Occurred: not stated · Last reviewed 10 Oct 2026             │
├───────────────────────────────┬──────────────────────────────┤
│ What was reported             │ Talk track       [Draft]     │
│ CISA issued an alert…         │ "CISA alerted on…"           │
│                               │ Ask: which teams install…    │
│ What is not known             │ Avoid: naming packages…      │
│ • Affected packages…          │ Based on: CISA, 23 Sep 2025  │
│ • No ATT&CK technique…        │ [Copy with source]           │
│                               │ (status: "Copied")           │
│ Sources (1)                   ├──────────────────────────────┤
│ CISA · Government alert       │ Classification               │
│ Published 23 Sep 2025 ·       │ ATT&CK: Not evaluated        │
│ Reviewed 10 Oct 2026          │ Ecosystems: npm              │
│ Rights: citation + summary    │ Packages: none linked        │
│ [Open source ↗]               │                              │
├───────────────────────────────┴──────────────────────────────┤
│ ← All incidents   ← More npm incidents                       │
└──────────────────────────────────────────────────────────────┘
Mobile: one column in this order: header, talk track, reported,
unknowns, sources, classification.
```

## Incident card spec

| Order | Field | Source | Display rule |
| --- | --- | --- | --- |
| 1 | Incident type | `kind` | Uppercase kicker text, not colour alone |
| 1 | Disclosed date | `disclosedOn` | Always shown. `occurredOn` appears on the detail page only, as "not stated" when null |
| 1 | Review status | `reviewStatus` | `StatusPill`, top right |
| 2 | Title | `title` | Link to `/incidents/[slug]`. The whole title is the link target |
| 3 | Summary | `summary` | Two-line clamp on the card, full text on the detail page |
| 4 | Talk track | `sales-notes.json` `headline` | Left-ruled block below the summary. Always labelled, with a Draft or Reviewed pill. Missing notes show "No talk track yet" |
| 5 | Sources | `sourceIds` → `sources.seed.json` | Publisher and published date always visible on the card. Never hidden behind a click |
| 5 | Ecosystems | `affectedEcosystems` | Plain text chips |
| 5 | ATT&CK | `techniqueIds` | Technique IDs, or "Not evaluated" when empty. Never "None" |
| 5 | Open questions | `uncertaintyNotes.length` | Count on the card, full list on the detail page |

**Where the talk track sits:** below the evidence, never above it. The reader sees what was reported and who reported it before reading the interpretation. On the detail page it moves to the side column on desktop and directly under the header on mobile, because it is the seller's main task.

**Sources:** a source shows its publisher, type, published date, reviewed date, rights note and an outbound link. Copying a talk track always includes publisher, published date and URL.

**Sales notes are a presentation layer.** They live in `data/security-intelligence/sales-notes.json`, keyed by `incidentId`, outside the incident schema. Each note lists the source IDs it relies on, and a test enforces that they belong to the same incident. Notes carry `status: "draft" | "reviewed"` and a `reviewedBy` field. Notes written by an agent start as `draft` and render with a Draft pill until a human reviews them. A note must not claim a product would have prevented an incident, or imply anything about a customer's exposure or buying intent.

**STIX alignment:** a card maps to a STIX 2.1 `report` (incident title, `published` = disclosed date, `external_references` = sources). Techniques map to `attack-pattern` objects by ATT&CK STIX ID once a dataset version is pinned. The talk track is a local `note` object pointing to the report, so interpretation stays separable from evidence. Phase 1 creates no STIX objects. It only keeps the UI from merging these layers.

## Open-source components

| Need | Choice | License | Status | Why / what it replaces |
| --- | --- | --- | --- | --- |
| Primitives | shadcn/ui + Radix (`radix-ui`) | MIT | Already installed | Cards, badges, sheets, tabs. Nothing to replace |
| Styling | Tailwind CSS v4 | MIT | Already installed | Existing tokens in `app/globals.css` |
| Search / command palette | cmdk | MIT | Already installed | Phase 1 adds incidents to the existing index |
| Icons | lucide-react | ISC | Already installed | Copy, external-link and filter icons |
| Relationship graphs | cytoscape | MIT | Already installed | Already powers `/evidence-graph`. React Flow (`@xyflow/react`, MIT) would duplicate it, so it is not proposed |
| Tables | TanStack Table | MIT | Phase 3 proposal | Headless sort/filter for a feed of more than ~50 incidents. Replaces hand-written filtering. About 15 KB gzipped, under the ask threshold |
| Timelines / charts | visx (per-package) or Recharts | MIT | Phase 3 proposal | Category-over-time view. Recharts is likely over the 50 KB gzipped threshold, so it needs approval first. visx can be installed per package and stays smaller. Hand-written SVG is the fallback |
| Technique taxonomy | MITRE ATT&CK STIX data | ATT&CK Terms of Use (royalty-free, attribution) | Phase 3 | A pinned dataset version is required before any reviewed mapping, per the classification framework |
| Interchange format | STIX 2.1 | OASIS open standard | Phase 3 | Export and import shape. No runtime dependency is needed to emit JSON |

Phase 1 adds no dependencies.

## Phased plan

| Phase | Item | Effort | User impact |
| --- | --- | --- | --- |
| 1 (this PR) | `/incidents` feed with type and ecosystem filters stored in the URL | ≤ ½ day | High: incidents become findable (job 1) |
| 1 | `/incidents/[slug]` detail with sources, unknowns and ATT&CK "Not evaluated" | ≤ ½ day | High: practitioner check (job 3) |
| 1 | Sales notes file plus a copy button that includes the source | 2 h | High: job 2, the main seller task |
| 1 | Incidents in the header nav and cmdk search; incident states in `StatusPill` | 1 h | Medium: removes the dead end |
| 2 | Proposed incident→category links (`status: proposed`, reviewer, rationale), "Related incidents" on category pages, and a category filter | 1–2 days | High: ties incidents to the market map |
| 2 | Candidate display decision: keep candidates out, or show them in a labelled review queue. Requires a gate change in `security-intelligence-contract.ts` | ½ day after decision | Medium |
| 2 | Working dark mode: OS-preference fallback, warm dark tokens, AA contrast check | 1 day | Medium |
| 2 | Move incident lab to `/review/incident-lab`, with a redirect | 2 h | Medium: removes confusion |
| 2 | Home page trim: actions first, caveats collapsed | ½ day | Medium |
| 2 | Keyboard-friendly relationship list beside the cytoscape graphs | 1 day | Medium (accessibility) |
| 3 | STIX 2.1 export of reviewed incidents against a pinned ATT&CK dataset | 2–3 days | Medium: interoperability |
| 3 | Account prep pack: category + incidents + talk tracks exported to markdown, reusing `lib/context-md.ts` | 2 days | High for sellers |
| 3 | Category timeline (visx or SVG), once there are 20 or more reviewed incidents | 2 days | Medium |
| 3 | TanStack Table feed view, once there are more than 50 incidents | 1 day | Medium |
