# STIX 2.1 export of the incident feed

Run `npm run export:stix` (optionally `-- path/to/out.json`) to write the reviewed incident feed as one [STIX 2.1](https://docs.oasis-open.org/cti/stix/v2.1/stix-v2.1.html) bundle that threat-intel platforms (MISP, OpenCTI, QRadar, Sentinel and others) can import. The output file is git-ignored; nothing is published or sent anywhere.

## What goes out

| STIX object | From | Notes |
| --- | --- | --- |
| `identity` | this project | Producer of every object (`created_by_ref`) |
| `extension-definition` | this doc | Declares the `x_smm_*` fields below as a top-level property extension |
| `report` | the feed | `threat-report` listing every exported incident |
| `incident` | `incidents.seed.json` | One per incident with `reviewStatus` `seed_reviewed` or `approved` |

Each `incident` carries the title, summary, kind and ecosystems as `labels`, the original sources as `external_references` (publisher and URL from `sources.seed.json`), TLP:WHITE, and these extension fields: `x_smm_disclosed_on`, `x_smm_occurred_on` (omitted when unknown, never defaulted), `x_smm_epistemic_status`, `x_smm_review_status` and `x_smm_uncertainty_notes`.

## What never goes out

Candidates, sales notes (`sales-notes.json`), category links and unreviewed ATT&CK mappings. There is no STIX `confidence` score, because the feed records epistemic status rather than a number. IOCs are not stored in the feed, so none are exported.

## Design choices

- **Stable IDs:** UUIDv5 from each feed ID, so re-importing updates the same objects. The validator warns that STIX *recommends* UUIDv4; this is a deliberate trade-off.
- **ATT&CK:** when a technique mapping is reviewed with a pinned MITRE STIX ID, add a `relationship` to MITRE's own `attack-pattern` ID rather than minting a new one.
- **Validation:** checked with the OASIS [stix2-validator](https://github.com/oasis-open/cti-stix-validator) (`pip install stix2-validator`, then `stix2_validator out.json`). Expected warnings: UUIDv4 recommendation and external references without hashes.
