# Incident promotion template

Use this when moving reviewed candidates from `data/security-intelligence/candidates/` into the published feed. It writes down the steps earlier promotions followed (see [2026-11-21](../review-2026-11-21.md) and [2026-11-22](../review-2026-11-22-teampcp.md)). Adding candidates has its own [candidate template](incident-candidate-template.md).

Promotion happens in two PRs, each with Kristen's approval recorded in its description:

1. **Promote:** the incidents and their sources.
2. **Notes and tags:** sales notes, industries, secret exposures and category links. These are reviewed separately and can follow later.

## The bar

Promote an incident only when:

- Kristen has approved promoting it, in chat or on the PR.
- At least one source is primary: the affected organization, the researcher who found the issue, or a government advisory. News-only candidates stay in the batch with "Primary source needed".
- Every primary source has been reread in full on the promotion date, and the summary says only what those sources state.

## PR 1: promote

### Steps

1. **Reread each primary source.** Fix any claim that doesn't match, and note the fix in the review record.
2. **Add the sources** to `sources.seed.json`, one per primary source used:

   ```json
   {
     "id": "source:<publisher>-<topic>-<year>",
     "publisher": "<publisher name>",
     "type": "<company_incident_report | security_research | government_alert | vulnerability_advisory | regulator_filing>",
     "url": "https://...",
     "publishedOn": "YYYY-MM-DD",
     "lastReviewedOn": "<promotion date>",
     "cadence": "event_driven",
     "rightsNote": "Citation and short paraphrase only; check publisher terms before reuse."
   }
   ```

   Use a `type` value already in the file.

3. **Add the incidents** to `incidents.seed.json`:

   ```json
   {
     "id": "incident:<same id as the candidate>",
     "title": "<plain-language headline>",
     "kind": "<breach | intrusion | supply_chain | malware_campaign>",
     "disclosedOn": "YYYY-MM-DD",
     "occurredOn": null,
     "summary": "<paraphrase of what the primary sources state>",
     "epistemicStatus": "reported",
     "reviewStatus": "seed_reviewed",
     "affectedEcosystems": [],
     "sourceIds": ["source:..."],
     "techniqueIds": [],
     "packageIds": [],
     "uncertaintyNotes": ["..."],
     "lastReviewedOn": "<promotion date>"
   }
   ```

   - `disclosedOn` is the primary source's original publication date. If that wasn't captured, use the earliest dated source and say so in `uncertaintyNotes`.
   - `occurredOn` stays `null` unless a primary source gives the date.
   - `uncertaintyNotes` carries anything not stated as fact: attribution, attacker claims, third-party counts, disputed causes, partial primary checks.
   - `techniqueIds` stays empty. ATT&CK mappings follow the [accepted mapping rules](../incident-classification-framework.md#accepted-attck-mapping-rules-2026-11-21) in a separate review.

4. **Pin the STIX date** in `stix-created-on.json` under `createdOn`: `"incident:<id>": "<promotion date>"`. Never change an existing entry.
5. **Update the candidate batch.** Remove the promoted candidates. If none are left, delete the batch file; git keeps its history.
6. **Append, don't reformat.** Add new entries at the end of each JSON file, keeping existing lines untouched so the diff shows only new records.
7. **Regenerate the export** with `npm run export:feed`, then run `npm test`.
8. **Write the review record** in `docs/security-intelligence/review-YYYY-MM-DD[-topic].md` (below).

### Review record

```markdown
# Incident promotion review (YYYY-MM-DD[, topic])

## Promotion of N incidents from PR #...

- **Reviewer / date / decision:** Kristen Aing, YYYY-MM-DD, approved promoting <which> candidates in `candidates/<batch>.json` (PR #...).
- **Bar applied:** promote only incidents checked against a primary source (the affected organization, the original researcher or a government advisory). Every primary source was reread in full on YYYY-MM-DD, and each summary uses only what that source states.
- **Corrections made while rereading:** <each fix, or "None">.
- **Left as candidates:** <IDs and why, or "None">.
- **Candidate file:** <promoted entries removed / file deleted>.

| Incident ID    | Type         | Disclosed  | Primary source ID |
| -------------- | ------------ | ---------- | ----------------- |
| `incident:...` | supply_chain | YYYY-MM-DD | `source:...`      |

- **Disclosure dates:** <how each was chosen, where not obvious>.
- **Not recorded as fact:** <attribution, attacker claims, third-party counts>. Each is in the incident's uncertainty notes. No ATT&CK technique is asserted.
- **Not added in this pass:** sales notes, role notes, industry tags, secret-exposure tags and category links.
- **Consumer disposition:** the incidents appear on the site and in `exports/incident-feed.v1.json` (regenerated). Each STIX `created` date is pinned to YYYY-MM-DD.
```

### Release record (PR description)

```markdown
- Approved by Kristen on YYYY-MM-DD (<where>)
- Head: <sha>; required checks all success
- Release readiness: <run URL> (success)
- Rollback target: <main sha before merge>
```

## PR 2: notes and tags

Drafts go in with `status: draft` or `proposed`. Kristen reviews them, and only then do they get `reviewedBy: "Kristen Aing"` and reach the export.

| File                             | One entry per incident                                                | Rule                                                                                                       |
| -------------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `sales-notes.json`               | Headline, discovery question, "avoid" line, seller caveat, role notes | No claim that a product would have prevented the incident.                                                 |
| `incident-industries.json`       | Industry of the affected organization                                 | Leave out when the source names no single organization.                                                    |
| `incident-secret-exposures.json` | Secret type and where the first secret was exposed                    | Record a type only when a source names it. Values are in the [2026-11-22 review](../review-2026-11-22.md). |
| `incident-category-links.json`   | Market-map categories the incident relates to                         | `proposed` until reviewed. Don't infer competitors from a shared category.                                 |

Then regenerate the export, run `npm test`, and add a "Notes and tags" section to the same review record listing counts and anything left out.

## Checklist

- [ ] Kristen approved promoting these incidents.
- [ ] Each one has a primary source, reread in full today.
- [ ] Summary says only what the primary sources state; everything else is in `uncertaintyNotes`.
- [ ] Sources, incidents and STIX dates added by appending, without reformatting.
- [ ] Promoted candidates removed from the batch.
- [ ] `npm run export:feed` and `npm test` pass.
- [ ] Review record written; approval line and release record in the PR description.
- [ ] Notes and tags left for their own review.
