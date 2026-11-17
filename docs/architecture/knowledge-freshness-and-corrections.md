# Knowledge freshness and corrections (K4)

Status: **offline checks implemented; operating routine proposed.** Tracks [KRU-215](https://linear.app/krusty/issue/KRU-215). Builds on the [K1 model](knowledge-model-reconciliation.md). Written 2026-11-17.

## What the checks enforce

All checks are in `lib/knowledge/validate.ts` and `lib/knowledge/impact.ts`, and they run offline. Nothing in the app imports them, and no job runs them on a schedule.

| Rule | Code | Behaviour |
| --- | --- | --- |
| Evidence must be recent enough to count as current | `evidence_stale` | An accepted upstream result checked more than `maxAgeDays.upstream` days before `evaluatedOn` cannot support a current mapping |
| Publications must be re-checked | `target_stale` | A mapping to a publication revision whose `checkedOn` is older than `maxAgeDays.publicationRevision` fails |
| No invented clock | `freshness_date_invalid` | The caller passes `evaluatedOn`. A check dated after it fails, and a non-ISO date throws |
| Revocation wins over any assessment | `evidence_revoked`, `target_revoked` | Revocations are a separate, append-only list. A revoked evidence ID, claim or record fails every mapping that uses it, even if its assessment still says accepted |
| Rollback cannot reactivate revoked evidence | (tested) | Re-submitting the original accepted assessment does not undo a revocation |
| Age stays visible | `evidenceAgeDays` | Each mapping reports the age of its oldest upstream check, and a stale mapping keeps its confidence and age, so a reader sees what was last accepted and how old it is |
| Corrections never approve anything | `correctionImpact()` | Lists the mappings that directly use a changed thing, and turns each affected consumer accept or defer into `needs_review`. It changes nothing |
| A source update queues review | `record_revised` plus `revision_mismatch` | Mappings pinned to the old revision fail until a reviewed mapping revision exists. Nothing re-pins them automatically |

The checks only run when the caller supplies the inputs: `freshness` for staleness, `revocations` for revocations. Leaving out `freshness` is valid only for historical review, never for promoting current evidence.

## Proposed operating routine

These are **proposed human routines, not scheduled jobs.** They follow the cadence in the [delivery plan](https://github.com/heyfunwhoa/security-market-map/pull/137) (draft PR #137). No automation is claimed.

| Layer | Owner | Review cadence | Default freshness limit | Overdue queue |
| --- | --- | --- | --- | --- |
| Upstream evidence packages | ASE owns acquisition; the Market Map maintainer accepts | Event-driven, on each new export | 30 days for evidence used as current (`maxAgeDays.upstream`) | Mappings failing `evidence_stale` |
| Publication revisions (K2 register) | Market Map maintainer | Monthly triage | 365 days (`maxAgeDays.publicationRevision`) | Mappings failing `target_stale` |
| Taxonomy and metric definitions | Market Map maintainer | Quarterly | Not time-limited; revised by revision | Mappings failing `revision_mismatch` |
| Mappings | Owner of the interpretation (publisher review) | On any change to an end or its evidence | Inherits from its evidence | `correctionImpact()` output |
| Consumer decisions | Each consumer's owner | Set by the consumer | Set by the consumer | `consumerDispositions` with `needs_review` |

The limits are starting values to calibrate in the K3 pilots, not measured service levels.

**Severity** of a correction, deciding how quickly it should be handled:

| Severity | Examples | Expected handling |
| --- | --- | --- |
| High | Rights revoked; a retraction; evidence about the wrong organization | Record the revocation the same day. Every affected consumer gets `needs_review` |
| Medium | A source revision that changes meaning; a record withdrawn | Run `correctionImpact()`, then review affected mappings at the next triage |
| Low | Routine staleness; a wording-only revision | Re-check at the next scheduled review |

## Catalog revisions (decision 3 from K1)

Catalog references keep pinning the whole snapshot (`catalog@<asOf>`) for now. `correctionImpact()` with a `catalog_snapshot` change shows the cost: every mapping with a catalog end needs review when the snapshot moves. In the worked example that is 4 of 6 mappings.

**Proposal:**
- Keep snapshot pinning while mappings are few, which is true through the K3 pilots.
- Move to per-record catalog revisions only if snapshot moves start causing review churn. The pilots can measure that by counting affected mappings per snapshot change.
- Per-record revisions mean a catalog-wide schema change, so they need their own decision.

## Not covered here

- **Scheduled re-checks or alerts.** A person runs these checks.
- **Enforcement in the live site.** The site's own source staleness (the Sources page) is separate. It is measured against the catalog date, not today's date; that page's wording was corrected in this change.
- **Shared-contract changes.** Revocations are local inputs, not a research-evidence-v1 field.
