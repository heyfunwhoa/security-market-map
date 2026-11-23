# Incident promotion review (2026-11-22, TeamPCP / Mini Shai-Hulud follow-ons)

## Promotion of 5 incidents from PRs #227 and #230

- **Reviewer / date / decision:** Kristen Aing, 2026-11-22, approved promoting all 5 candidates in `candidates/2026-11-22-teampcp-worm-follow-ons.json` (PR #227, with GitHub's primary sources added in PR #230).
- **Bar applied:** the same rule as earlier reviews: promote only incidents checked against a primary source (the affected company, the original researcher or a government advisory). Before promotion, every primary source was reread in full on 2026-11-22, and each summary uses only what that source states.
- **Corrections made while rereading:**
  - Singapore's advisory AD-2026-009 calls the malware the "Shai-Hulud" worm. It doesn't use the researchers' name "ChainDrop", which the candidate claim had wrongly said it did. The seed summary uses the advisory's wording, and the name is in an uncertainty note.
  - Mistral says its compromised npm versions could not run their payload; only the PyPI version did. The seed summary says so.
  - Grafana describes the missed credential only as the leaked `grafana-delivery-bot` identity, so no token type is recorded.
- **Candidate file:** all 5 were promoted, so the batch file is removed, following #210's practice of keeping only unpromoted candidates. Its full history stays in git.

| Incident ID | Type | Disclosed | Primary source ID |
| --- | --- | --- | --- |
| `incident:tanstack-mini-shai-hulud-2026` | supply_chain | 2026-05-11 | `source:tanstack-npm-postmortem-2026` |
| `incident:grafana-github-tanstack-2026` | breach | 2026-05-16 | `source:grafana-tanstack-incident-update-2026`, `source:grafana-tanstack-post-incident-review-2026` |
| `incident:mistral-sdk-tanstack-2026` | supply_chain | 2026-05-12 | `source:mistral-advisory-mai-2026-002` |
| `incident:github-internal-repos-nx-console-2026` | breach | 2026-05-20 | `source:github-internal-repositories-investigation-2026`, `source:nx-console-advisory-ghsa-c9j4-9m59-847w` |
| `incident:keyv-shai-hulud-npm-2026` | supply_chain | 2026-08-06 | `source:csa-sg-ad-2026-009` |

- **Disclosure dates:**
  - TanStack: its postmortem's original publication date (updated 2026-05-15).
  - Grafana: the date it says it first disclosed publicly. Its earliest dated post is 2026-05-19.
  - Mistral: the advisory's publication date (updated 2026-05-14).
  - GitHub: its blog post.
  - keyv: Singapore's advisory. Researchers dated the compromise 2026-08-04, but the incident is dated by its earliest primary source.
- **Not recorded as fact:** attacker attribution (TeamPCP), the attacker's claim to hold Mistral repositories, and researchers' package counts. Each appears in the incident's uncertainty notes. No ATT&CK technique is asserted.
- **Not added in this pass:** sales notes, role notes, industry tags, secret-exposure tags and category links. Those are separate reviews.
- **Consumer disposition:** the 5 incidents appear on the site and in `exports/incident-feed.v1.json` (regenerated). Each STIX `created` date is pinned to 2026-11-22.

## Notes and tags for the 5 incidents (PR #232)

Kristen Aing reviewed and approved all of the agent's drafts for the 5 incidents above as written ("Good to go"), on 2026-11-22. They are now `reviewed`, with `reviewedBy: "Kristen Aing"` and `reviewedOn: "2026-11-22"`.

- **Sales notes:** 5, each with a headline, a discovery question, an "avoid" line, a seller caveat and 2 role notes.
- **Industry tags:** 4, all `technology`. keyv has none, because its source is a government advisory about a campaign and names no single organization.
- **Secret-exposure tags:** 5. A type is recorded only for TanStack (`ci_cd_secret`, the OIDC token read from the runner). Locations:
  - CI/CD for TanStack and Grafana
  - developer machine for Mistral and GitHub
  - both for keyv
- **Category links:** 6, all `related_to` with a `doesNotImply` line. Software supply chain for all 5, plus `nhi` for Grafana's leaked bot identity.
