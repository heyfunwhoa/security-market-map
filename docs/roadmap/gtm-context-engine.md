# GTM context engine roadmap

Status: proposed, 2026-11-08. Owner: repository maintainer. Nothing here is merged or deployed yet. Each phase lands as its own reviewed PR.

## What this is

A GTM system built on open, evidence-labeled data. It covers the same ground as GTM context platforms (Octave's library and agents, Cargo's context-in-git and plays) and GTM programs (RevLogic-style playbooks and enablement). Borrow their feature patterns, never their text, UI or brand.

```
Security Market Map (public library)
  → Account Signal Engine (private strategy + accounts)
    → agents and plays
      → learning loop back into the library
```

## Where things live

| Layer | Repo | Visibility |
| --- | --- | --- |
| Library: categories, vendors, seats, pains, objections, alternatives, triggers, segments, sources | `heyfunwhoa/security-market-map` | Public, vendor-neutral |
| Strategy: offerings, motions, seat×segment cells, playbooks, proof, references, brand voice | `heyfunwhoa/account-signal-engine` (ASE) | Private |
| Accounts, contacts, signals, scores, drafts | ASE | Private |
| Automation (plays, schedules) | n8n on the maintainer's home server, calling ASE | Private |
| Training and drills | ASE or `heyfunwhoa/truffle-camp` | Synthetic data only |

Consumers read `/api/evidence-graph?slice=market-map` and `/api/persona-model`, pin the commit, and join on `catalogId`. Nothing writes back into the market map except through a reviewed PR.

## Rules for every phase

1. The public repo holds only vendor-neutral, synthetic or cited data. No private interview, employer, customer, deal or job-search facts.
2. Every claim carries an evidence label: `sourced`, `practitioner_published`, `field_validated`, `hypothesis` or `unknown`. Hypotheses are shown as hypotheses.
3. The graph lookup runs first and the language model writes second. Every generated output lists the node IDs it used.
4. Nothing is sent, published, merged, deployed or written to a CRM without explicit human approval.
5. Before coding, read `AGENTS.md`, the Next.js docs in `node_modules/next/dist/docs/`, `docs/context-graph.md`, `docs/persona-data-model.md` and `docs/research-publication-boundary.md`.

## Done

| Item | Where |
| --- | --- |
| Seats (45), profiles, titles by level, size coverage, regulation overlays, evidence labels, field-note gate, persona pages | PR #148 |
| Evidence graph on main (identity slice, contract `evidence-graph-v1`) | PR #152, merged |
| Buyer context in the evidence graph: objections, alternatives, triggers, pain → capability, market-map slice, `/api/gaps`, `/gaps`, `/api/context-search` | PR #153 (stacked on #148) |
| Account Workshop shows seat cards from a pinned snapshot, with a stale reminder | ASE PR #200 |
| Library fill: alternatives for all 42 core categories, an objection for every seat, 157 qualification questions (every seat and segment), a sourced pain for every seat (16 new sources) | Branch `research/library-fill` (tasks 1.1 and 1.2) |

Merge order: #148 → #149 and #151 (docs) → refresh the ASE snapshot with `--reviewed` → ASE #200 → #153. See the KRU-294 reconciliation.

---

## Phase 1: Finish the library (market map, public)

Pattern: Octave's library entities; Cargo's context files in git.

| Task | Acceptance criteria |
| --- | --- |
| 1.1 Qualification questions on seats and segments (done) | `qualificationQuestionSchema`: `{ question, weight: high/medium/low, fit: good/bad, evidence }`. 3+ questions on the top 10 seats and on every segment overlay. Catalog check rejects empty or duplicate questions. |
| 1.2 Close the gap list (done for alternatives, objections and sourced pains) | `/gaps` shows 0 core categories without alternatives and 0 seats without objections. Every new record has an evidence label. |
| 1.3 Vendor targeting counts | For each top category, record which seats each vendor's product page targets, with URL and checked date (`practitioner_published`). Seat-to-category links show "N of M vendors target this seat". |
| 1.4 Markdown export (done: `npm run context:md`) | `npm run context:md` writes one markdown file per seat and per category (frontmatter: id, type, evidence) to `context/`, generated from typed data and never hand-edited. A test fails if the generated output drifts. |
| 1.5 Brief reviews | Each batch of new hypotheses gets a short review note in the PR: what was added and what still needs a source. |

## Phase 2: Strategy layer (ASE, private)

Pattern: Octave's offerings, motions, ICP matrix, playbooks, proof points, references, brand voice.

| Task | Acceptance criteria |
| --- | --- |
| 2.1 Offering | `offeringSchema`: positioning, capabilities (linked to market map capability or category keys), good-fit and bad-fit questions. One offering from public information only. |
| 2.2 Motions | `motionSchema`: `{ id, offeringId, type: net-new/upsell/displace/renew, seatIds, segmentIds, sizes }`. Two to three motions to start. |
| 2.3 Seat×segment cells | Generated per motion. Each cell holds: overview, operating landscape, narrative, pains and consequences (linked to pain node IDs), benefits, and messaging stages (`resonate`, `elevate`, `compel`). Plus `autoUpdate: boolean` so manual edits aren't overwritten. |
| 2.4 Playbook overlays | Types: `why-now`, `milestone`, `named-account`, `competitive`, each attached to a motion. Competitive overlays can't state vendor facts that lack a source record. |
| 2.5 Proof and references | `proofPointSchema` and `referenceSchema`, each with source URL, permission (`public` or `approved-internal`) and an expiry or review date. Tests block items without permission. |
| 2.6 Brand voice and writing styles | Voice traits, words to avoid, tone, length, focus (pain, benefit or neutral), and a CTA library. Defaults: concise, plain, natural language. |

Inputs needed from the maintainer: the offering's position, good-fit and bad-fit signals, 2–3 motions, and approved proof.

## Phase 3: Agents (ASE + Claude skills)

Pattern: Octave's call prep, qualification, sequence and content agents.

| Task | Acceptance criteria |
| --- | --- |
| 3.1 Call prep | Input: company domain or name, optional contact title, optional motion. Output has six switchable sections: discovery questions, call script, objection handling (from objection records), person brief (seat + level from `matchTitle`), company brief, and matched proof. Each section lists the node IDs it used. A deterministic assembly step runs before any LLM call. |
| 3.2 Qualification | Scores product, segment, seat and playbook fit from 0 to 10 using weighted questions. Instant qualifiers and disqualifiers override the score. Each question gets a yes/no answer with reasoning and confidence. Answers based only on public signals are labeled as signals, not intent. |
| 3.3 Account brief and one-pager | One page per account: likely buying group by size and stage, regulation overlays, triggers seen, the cell narrative, and gaps. Exportable. |
| 3.4 Email and sequence drafts | Uses the cell, brand voice and CTA library. Drafts only; nothing is sent. Lets you mark a draft as a training example. |
| 3.5 Runtime context | Per-record variables (`{{company}}`, `{{seat}}`, `{{trigger}}`) passed to every agent. |

## Phase 4: Access

Pattern: Octave's MCP server and skills; Cargo's CLI.

| Task | Acceptance criteria |
| --- | --- |
| 4.1 MCP server (read-only tools done: `scripts/context-mcp-server.mjs`) | Read-only tools first over `evidence-graph-v1`: `search_context`, `get_seat`, `get_category`, `get_cell`, `list_gaps`. Then `run_call_prep` and `run_qualification`, which return drafts. No write tools without an approval step. |
| 4.2 Claude skills | `/gtm:call-prep`, `/gtm:qualify`, `/gtm:account-brief`, `/gtm:audit` (the gap report) and `/gtm:library` (look up a seat or category). |
| 4.3 CLI | `npx gtm context get <type:key>` prints a node and its neighbors as markdown for coding agents. |

## Phase 5: Plays and automation

Pattern: Cargo's plays, scoring and routing.

| Task | Acceptance criteria |
| --- | --- |
| 5.1 Play format | `playSchema`: a trigger (schedule, webhook or signal) followed by steps (enrich, score, draft, notify), with retries and a dry-run mode. |
| 5.2 Weekly account scoring | Runs on n8n. Writes scores and reasons to ASE and sends one digest. No CRM writes. |
| 5.3 Signal routing | Research Hub items that match a trigger create a proposed action for review, not a task in the CRM. |
| 5.4 CRM proposals | Field updates are shown as before/after and applied only after approval. |
| 5.5 Paid enrichment | Apollo, Exa and Firecrawl calls are gated by a budget and logged. |

## Phase 6: Learning loop

Pattern: Octave's suggestions, analytics and learning loop.

| Task | Acceptance criteria |
| --- | --- |
| 6.1 Notes → suggestions | Call notes or transcripts go in. Out come proposed field notes and library or cell edits, anonymized and following the field-notes template. They sit in a review queue; nothing is applied automatically. |
| 6.2 Analytics | Which cells, objections, triggers and seats show up in real deals; win/loss patterns; predicted versus actual buying group. |
| 6.3 Promotion | Approved field notes can raise a library claim to `field_validated` through a PR to the market map, patterns only. |

## Phase 7: Enablement and assets

Pattern: RevLogic's programs; Octave's assets.

| Task | Acceptance criteria |
| --- | --- |
| 7.1 Drills | Objection and discovery role-play generated from the objection records and seat pains, with scoring rubrics. Synthetic personas only. |
| 7.2 Program templates | One playbook per area, each with a target metric: pipeline, deal execution, onboarding (30/60/90), technical enablement, adoption and growth, partners. |
| 7.3 Assets | Shareable one-pagers or microsites per account, with version history. Private by default. |

---

## Picking this up in another tool

**Fastest way in:** read `context/` (one markdown file per seat and category, generated by `npm run context:md`), or connect the read-only MCP server:

```json
{ "mcpServers": { "security-market-map": { "command": "node", "args": ["<repo>/scripts/context-mcp-server.mjs"] } } }
```

Tools: `search_context`, `get_seat`, `get_category`, `list_gaps`. It runs offline from `context/` and has no write tools.


1. Clone both repos and read `AGENTS.md` in each.
2. Branch from the latest reviewed head, one phase task per branch.
3. Run `npx next typegen && npx tsc --noEmit`, `npx vitest run`, `npm run lint` and `npm run test:research-integrity` before opening a PR.
4. In the PR, state: zoom-level placement, reused IDs and components, evidence and uncertainty, and any UI checks (responsive, keyboard, reduced motion).
5. Stop before merging or deploying.

## Next step

The private layer (Phase 2) is on hold. Next public work: 1.3 vendor targeting counts, 1.4 markdown export, and replacing new hypotheses with field notes as calls happen. Remaining gaps: contested ownership (18, expected), categories with no vendors (9), and unlinked people/budget pains.
