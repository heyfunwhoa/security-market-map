# Incident feed export for the owner's other tools

`data/security-intelligence/exports/incident-feed.v1.json` is the reviewed incident feed in one file, for this owner's other tools to read: Account Signal Engine, call prep and outreach. It is committed, so another repo can read it from GitHub without running this app. Regenerate it with `npm run export:feed`. A test fails if the file falls out of sync with the source data.

It is built from the same join the site's `/incidents` page uses (`lib/incident-feed.ts`), so it has the same gates:

- **Incidents:** reviewed and sourced only. Candidates never appear.
- **Sales notes:** `reviewed` notes grounded in the incident's own sources only. Drafts are dropped (`salesNote: null`).
- **Industries:** reviewed industry tags only. Each tag is the industry of the organization the source names; wide campaigns with no named organization have none.
- **Secret exposure:** reviewed only. `secretTypes` lists the kinds of secret the sources say were exposed or stolen; `exposureLocations` is where the first exposed secret sat, not every store reached afterwards. An empty list means the sources don't say. `many_types` means a source reports a whole set of secrets without breaking it down. `note` flags a weaker point, such as a detail known only from a secondary summary.
- **Market categories:** reviewed links only, each with its `doesNotImply` line.

Each incident carries its facts, original sources, epistemic status and uncertainty notes, then the sales note and categories as separate fields. Every source includes its `rightsNote`, the reuse limits recorded in `sources.seed.json` (usually "citation and short paraphrase only"). Keep it with the citation. Consumers should keep that split: cite the sources for facts, treat the sales note as interpretation, and follow the top-level `usageRules`.

Consumers read this file and never write back to it. Changes go through the normal review in this repo. For outside threat-intel tools, use the STIX export instead ([stix-export.md](stix-export.md)), which leaves out sales notes and category links.

`schemaVersion` changes only for breaking changes. Added fields keep version 1.
