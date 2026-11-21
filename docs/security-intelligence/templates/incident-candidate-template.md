# Incident candidate template

Copy [`incident-candidate-batch.template.json`](incident-candidate-batch.template.json) to `data/security-intelligence/candidates/YYYY-MM-DD-short-topic.json`, fill it in, and run `npm test`. `lib/incident-candidates.test.ts` checks every batch file and the template itself, so a missing or wrong field fails the tests. Rules and review steps: [incident classification framework](../incident-classification-framework.md).

## Batch fields

| Field                                      | What to put                                                                                |
| ------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `batch`                                    | Same as the file name, without `.json`.                                                    |
| `status`                                   | Always `candidate_only`.                                                                   |
| `publishable`                              | Always `false`. Promotion to `incidents.seed.json` happens only after owner review.        |
| `framework`                                | Leave as is.                                                                               |
| `discoveryContext`                         | What you searched, when, and which candidates were checked against the company's own page. |
| `excludedFromIncidents` / `excludedReason` | Leads you looked at but left out, and why.                                                 |

## Candidate fields

| Field                                    | What to put                                                                                                                                                                                                                      |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `incidentId`                             | `incident:` plus lowercase words and hyphens, usually company, what happened and year. Must not already be in the seed.                                                                                                          |
| `title`                                  | Plain-language headline.                                                                                                                                                                                                         |
| `incidentKind`                           | `breach`, `intrusion`, `supply_chain` or `malware_campaign`.                                                                                                                                                                     |
| `reviewStatus`                           | Always `candidate`.                                                                                                                                                                                                              |
| `discovery[]`                            | Every source used. `sourceRole` is `primary` for the affected company's own statement or the original research, `secondary` for news and summaries. Needs publisher, `https` URL, date found and usage rights.                   |
| `dedupeCheck`                            | Whether it overlaps anything in the seed or other batches, and how.                                                                                                                                                              |
| `veris`                                  | Leave all values `null` for now.                                                                                                                                                                                                 |
| `claims[]`                               | One fact per claim, paraphrased. `epistemicStatus` is `reported`, `observed`, `hypothesis`, `disputed` or `unknown`. `sourceUrl` must be one of the `discovery` URLs. Claim IDs follow `claim:<incident-id-without-prefix>:<n>`. |
| `attackMappings`                         | Leave as `not_evaluated`. ATT&CK techniques are added only with behavioral evidence and review.                                                                                                                                  |
| `defensiveMappings` / `weaknessMappings` | Leave empty.                                                                                                                                                                                                                     |
| `unresolvedQuestions`                    | Unknowns, source conflicts and cautions. If no source is `primary`, one entry must start with `Primary source needed`.                                                                                                           |

## Quick checks before opening a PR

- Facts come from the source, not memory; anything unverified is marked.
- Conflicting sources are both kept and attributed.
- No sales claim that a product would have prevented the incident.
- `npm test` passes.
