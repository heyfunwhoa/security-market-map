# Knowledge model reconciliation (K1)

Status: **prototype for review, not adopted.** Tracks [KRU-212](https://linear.app/krusty/issue/KRU-212) under [KRU-211](https://linear.app/krusty/issue/KRU-211), milestone M3. Written 2026-11-17.

This page rebuilds the K1 prototype described in KRU-212's 6 November checkpoint. That checkpoint's local commit (`4bcda7b`, branch `implementation/kru-212-knowledge-validation`) was never pushed, and no remote copy exists. This version was written from the issue's recorded acceptance criteria and scope, against current `main`.

## What this is and is not

- **Is:** an isolated, offline module in `lib/knowledge/`. It holds typed record shapes, a mapping and reference validator, a synthetic worked example and tests. The page also gives the ownership matrix, the ID crosswalk, and the migration and rollback path.
- **Is not:**
  - an adopted schema or a catalog migration;
  - a publication gate, a live integration, or a change to the shared research-evidence-v1 contract.
- **Nothing outside `lib/knowledge/` imports the module.** A test enforces this.
- **No catalog record, page or API changes.**

## Unresolved authority

The canonical product requirements document (PRD) is **still unresolved**. KRU-212 records that the Notion project page says its canonical PRD "has not been revalidated". Nothing here should be read as replacing that PRD.

The prototype follows the requirements recorded in Linear (KRU-211 to KRU-218). It also follows the delivery plan in draft PR #137, `docs/product/knowledge-model-delivery-plan.md`. If the PRD conflicts with either, the PRD wins and this prototype changes. Production adoption stays blocked until a human confirms the authority.

## Baseline

| Item | Revision |
| --- | --- |
| Repository | `main` at `0e8fa68ac9dec68c21131ad929cc3cd4cab8ae94` |
| Catalog snapshot | `catalog@2026-11-11` (`catalog.asOf`) |
| Evidence contract | `lib/integrations/contracts/research-evidence-v1.schema.json`, pinned copy |
| Design inputs | Draft PR #137 (category explanation, delivery plan) and draft PR #138 (executive-priority workflows, decision briefs, intake) |

## Who checks what

The validator checks **only what K1 owns**: references, exact revisions, relation rules, mapping lifecycle, publisher review and consumer decisions. It does **not** re-check source privacy, rights, review or dates. Those checks already have owners:

| Check | Owner | Where |
| --- | --- | --- |
| Source acquisition, rights, privacy, export approval | Account Signal Engine (ASE) | ASE offline exporter |
| Evidence package shape and contract version | Technical Docs | research-evidence-v1 schema (pinned in `lib/integrations/contracts/`) |
| Consumer-side package checks: dates, review time, supersession, correction | Market Map, existing code | [`lib/integrations/research-evidence.ts`](https://github.com/heyfunwhoa/security-market-map/blob/0e8fa68ac9dec68c21131ad929cc3cd4cab8ae94/lib/integrations/research-evidence.ts) `previewResearchEvidenceBatch()` |
| Typed catalog claims and their verification status | Market Map, existing code | [`lib/schema.ts`](https://github.com/heyfunwhoa/security-market-map/blob/0e8fa68ac9dec68c21131ad929cc3cd4cab8ae94/lib/schema.ts) `claimSchema`; [`lib/catalog.ts`](https://github.com/heyfunwhoa/security-market-map/blob/0e8fa68ac9dec68c21131ad929cc3cd4cab8ae94/lib/catalog.ts) `catalogProblems()` |
| Incident review state | Market Map, existing code | [`lib/security-intelligence-contract.ts`](https://github.com/heyfunwhoa/security-market-map/blob/0e8fa68ac9dec68c21131ad929cc3cd4cab8ae94/lib/security-intelligence-contract.ts), a separate model, not merged into K1 |
| **Mapping references, revisions, relation rules, lifecycle, publisher and consumer review** | **K1 (this prototype)** | `lib/knowledge/validate.ts` |
| Freshness, correction impact and rollback enforcement | K4, [KRU-215](https://linear.app/krusty/issue/KRU-215) | Not built |

**How the upstream results arrive:** the validator receives them as inputs (`upstreamAssessmentSchema`), one per evidence ID. A missing, `blocked`, `unknown` or `outdated` result fails closed.

**These inputs are synthetic in the tests.** No adapter turns a real `previewResearchEvidenceBatch()` receipt into an assessment yet. That is the bounded integration step listed under Next steps.

## Records

New records are kept to the minimum the three pilots need. Existing catalog records are **reused by ID and never redefined**: category, capability, vendor, product, use case, source and claim.

| Record | Purpose | Owner repo | Notes |
| --- | --- | --- | --- |
| `publisher` | Who issues a publication | Market Map (identity reconciled with ASE) | Authority is contextual; no universal ranking |
| `publication_revision` | One exact edition | ASE collects; Market Map holds the reviewed reference | Edition, original document ID, URL, dates, rights, optional content hash |
| `requirement_set` | A body of requirements in one publication revision | Market Map interpretation | Kind: law, regulation, standard, guidance, assurance or contractual. These are not interchangeable |
| `requirement` | One requirement, by its original ID | Market Map interpretation | Applicability is text or null; null means not recorded |
| `business_problem` | A vendor-neutral problem | Market Map | Affected process |
| `outcome` | What should change | Market Map | Desired, vendor-reported and observed are **separate records**, never one flipped field |
| `metric_definition` | How an outcome is measured | Market Map | Unit, numerator and denominator (nullable), counter-metric required. Baselines and targets belong to the consumer |
| `initiative` | Work that addresses a problem | Market Map | Reuses an existing catalog use case by ID (for example `uc-detect`) instead of a parallel record |

Rules every record follows:
- **Stable ID and aliases:** `id` never changes, and `aliases` keep old names.
- **Revision:** every record carries a revision string, and every reference names the exact revision it was made against.
- **Catalog revision:** catalog records have no per-record revision yet, so catalog references pin the snapshot, `catalog@<asOf>`. A mapping made against an older snapshot fails with `revision_mismatch`. K4 decides finer-grained catalog revisions.
- **Editorial status:** one of `candidate`, `reviewed`, `published`, `withdrawn` or `superseded`, kept **separate from epistemic status**.
- **Supersession:** a superseded record must name an existing replacement.
- **Owner:** each record names its owner repository.
- **Synthetic flag:** records marked `synthetic: true` are worked examples. They fail by default and pass only with `allowSynthetic: true`.
- **Unknown:** Unknown is a value, not a gap. Mapping confidence keeps `unknown`, and rights keep `unknown`.

## Mappings

A mapping links two references, `from` and `to`, each at an exact revision. Each mapping also records:
- relation type;
- correspondence: `exact`, `partial` or `editorial`;
- scope;
- rationale;
- epistemic status: `reported`, `observed`, `tested`, `hypothesis` or `unknown`;
- confidence, where `unknown` is kept;
- evidence;
- lifecycle;
- publisher review.

**Allowed relations** (everything else is rejected):

| Relation | From | To |
| --- | --- | --- |
| `addresses_problem` | category, capability, initiative | business problem |
| `has_outcome` | business problem | outcome |
| `measured_by` | outcome | metric definition |
| `supports_initiative` | category, capability | initiative |
| `relevant_to_requirement` | category, capability | requirement |
| `defined_in` | category, capability, requirement, metric definition | publication revision |
| `implements_capability` | product | capability |

**Rules the validator enforces:**
- **No compliance inference:** a vendor or product can never be mapped to a requirement (`product_compliance_inference`). Category relevance is not compliance proof.
- **No transitive inference:** there is no traversal helper, and `directTargets()` returns direct targets only. "A addresses B and B has outcome C" never yields "A achieves C".
- **Evidence:**
  - Exact and partial correspondence need evidence.
  - Editorial correspondence is interpretation, so it must be `hypothesis` or `unknown`.
- **Vendor-reported evidence is never upgraded:** a vendor-published claim, or an upstream `vendor_claim`, cannot support a mapping marked `observed` or `tested`.
- **Catalog claims used as evidence must:**
  - exist;
  - not be `needs_review`, `conflicting` or `superseded`;
  - for `implements_capability`, be about the same product and capability.
- **Mapping lifecycle:** only `approved` mappings can pass. Withdrawn and superseded mappings never pass, and a superseded mapping must name a submitted replacement.
- **Publisher review:** needs an approved decision, a named reviewer and a date.
- **Duplicates:** a duplicate replay of the same mapping revision is ignored and flagged. A second upstream result for the same evidence ID is refused rather than silently overwritten.

**Result fields:**
- Each mapping returns `mapping_checks_passed`, with denial codes and messages. The name is deliberate: passing these checks **does not authorize publication**.
- Consumer decisions return `decision_recorded`.

## Consumer decisions

A consumer records its own decision (`accept`, `reject` or `defer`) about **one exact mapping revision**. Each decision needs a use scope, a rationale, a reviewer and a date.

**Publisher approval never creates a consumer decision.** A consumer cannot accept a mapping whose checks failed, but it can reject it. Each consumer gets one decision per mapping revision.

Account context, baselines, targets and financial assumptions stay with the consumer. They never flow back into this public repository. This matches the two-approval model in PR #138's executive-priority workflows.

## Crosswalk

**Existing catalog records:**

| Existing concept | Where | K1 treatment |
| --- | --- | --- |
| Category, capability, vendor, product, use case | `lib/data/*`, parsed in `lib/catalog.ts` | Reused by ID; catalog snapshot revision |
| Source, claim | `lib/data/sources.ts`, `lib/data/claims.ts` | Claims used as mapping evidence by ID; verification status checked |
| Research-evidence-v1 package | `lib/integrations/research-evidence.ts` | Upstream evidence by ID plus an upstream assessment input |
| Incident records | `data/security-intelligence/*` | Out of scope for K1; separate review model |

**Concepts from the draft PRs:**

| Concept | Where | K1 treatment |
| --- | --- | --- |
| Executive priorities B01–B13 | PR #138 `cio-ciso-budget-tracker.csv` | Research topic labels, **not** initiative IDs. Candidate `business_problem` or `initiative` records only after human review |
| Decision briefs: resilience, secure AI adoption, technology consolidation | PR #138 `docs/product/decision-briefs/` | Editorial candidates. They map to `business_problem`, `outcome` and `initiative` when a pilot adopts them |
| Category explanation contract | PR #137 `category-explanation-system.md` | Explains existing categories; adds no new category records |
| SACR crosswalk, Gartner and Latio metadata | PR #137; KRU-106; KRU-105 | Future `publisher` and `publication_revision` records, owned by K2 ([KRU-213](https://linear.app/krusty/issue/KRU-213)) |
| Intake templates | PR #138; KRU-218 | Reused by K3 ([KRU-214](https://linear.app/krusty/issue/KRU-214)) for worked paths |

## Teaching exercises and pilots

PR #137 lists five category teaching exercises: CSPM, DSPM, SAST, third-party risk and cyber recovery. KRU-214 defines three end-to-end pilots: SOC capacity, secrets exposure and recovery readiness.

- **The cyber recovery exercise is reused for the recovery-readiness pilot.** "Having a backup is not proof that the business service can be restored" becomes that pilot's counter-metric framing.
- **The other four exercises stay as later breadth coverage.** They need no new records for K1.
- **The worked example in `lib/knowledge/fixtures.ts` is a secrets-exposure slice.**
  - Its real catalog IDs: `secrets-detection`, `cap-secret-verification`, `trufflehog`, `claim-trufflehog-verify` and `uc-detect`.
  - Everything new in it is a placeholder on `example.org` and is marked synthetic.
  - It is not research. KRU-214 owns the real paths.

## Migration and rollback

1. **Now:** an additive, isolated module. No app import, no catalog change, no data file.
   - **Rollback:** delete `lib/knowledge/` and this page.
2. **After human design review and PRD confirmation:** add reviewed records as typed data behind the existing `catalogProblems()` gate, one pilot at a time.
   - Existing IDs and pages keep working, and nothing is renamed.
   - **Rollback:** remove the data file. The validator rejects orphaned mappings rather than reviving them.
3. **Only with a separately reviewed Technical Docs change:** any shared-contract addition, such as an initiative-reference contract.
   - The v1 contract is unchanged here.

There is no mandatory live service and no change to the identity flows.

## Next steps

1. **Human design review of this page and the record shapes,** plus confirmation of PRD authority.
2. **One bounded integration exercise.**
   - Run an unchanged v1 synthetic ASE package through `previewResearchEvidenceBatch()`.
   - Derive an `upstreamAssessment` from the receipt and validate one mapping against it.
   - Draft PR #175 is the related producer-side preview.
3. **K2 (KRU-213):** publication register. **K4 (KRU-215):** freshness and correction enforcement. Both build on these shapes. **K3 (KRU-214):** real pilot paths, after K2.

## Verification

`lib/knowledge/knowledge.test.ts` covers:
- **The valid case:** the worked example passes against the real catalog.
- **Synthetic records:** rejected by default.
- **References:** catalog ID reuse, exact and stale revisions, unknown and dangling references, and withdrawn or superseded targets.
- **Relations:** disallowed relation types, product and vendor compliance inference, and no transitivity.
- **Evidence:** missing evidence, editorial overclaiming, and unknown, unreviewed, conflicting, superseded or mismatched claims.
- **Upstream results:** blocked, unknown, outdated or missing results; duplicate results; and vendor-status upgrades.
- **Mapping lifecycle:** lifecycle states, supersession with and without a replacement, publisher review, and duplicate replay.
- **Consumer decisions:** pinned revisions, decisions refused on failing mappings, and duplicates.
- **Other:** Unknown confidence is kept, malformed input is reported rather than thrown, and the module stays isolated.

These tests show the prototype's rules hold for the fixtures. They do not prove the model fits real research. The design review and pilots must show that.
