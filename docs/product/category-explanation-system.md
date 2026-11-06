# Category explanation system

**Status:** proposed authoring and presentation contract, with worked editorial examples. **Owner:** Market Map maintainer. **Date:** 2026-11-06. **Review:** pending. Complements the [product-page template](product-research-page-template-v1.md) and [progressive exploration contract](progressive-exploration.md). No schema/UI deployment accompanies this document.

## Reader promise

A reader should understand what a category does, how it works, what it leaves unresolved, who operates it and how to evaluate it before encountering vendor names. The explanation must work without knowledge of LimaCharlie or another company.

## Three reading depths, one canonical explanation

| Depth | Reader task | Content |
| --- | --- | --- |
| Orientation: about 30 seconds | Explain why the category exists | Plain-language job, a concrete example, what it is not |
| Working knowledge: about 3 minutes | Explain how it operates | Inputs, workflow, outputs, prerequisites, responsible team and neighbors |
| Evaluation: about 10 minutes | Ask useful questions and inspect evidence | Boundaries, failure cases, measures, cost drivers, references and unresolved questions |

Times are editorial targets, not measured task-completion results. Use headings and progressive detail, not three conflicting summaries. Keep content readable without opening interactive elements.

## The category card

| Field | Required content | Editorial test |
| --- | --- | --- |
| Identity | Stable existing ID, title, acronym, aliases | Can the reader distinguish alternate names from distinct categories? |
| Kind | Product category, suite, practice/program, architecture principle, service or emerging analyst framing | Is the reader comparing like with like? Allow a qualified mixed classification |
| Job | One sentence describing the problem and desired outcome | Does it work without a vendor or buzzword? |
| Example | A realistic, explicitly illustrative situation | Does it show the problem rather than assert product effectiveness? |
| Scope | Assets/environments and exclusions | Can the reader see where the control stops? |
| Workflow | Inputs → processing/decision → outputs → follow-up | Avoid forcing credentials into non-identity workflows |
| Dependencies | Permissions, data, agents, deployment and human action | What must be true for the advertised result to happen? |
| Ownership | Accountable team, operator and budget hypotheses | Mark organizational variation; no universal org chart |
| Neighbors | Upstream, complementary and overlapping jobs | Explain the boundary, not merely a list of acronyms |
| Evaluation | A demonstration, an adversarial/negative case and observable success | Avoid arbitrary scores and invented benchmark results |
| Economics | Pricing units to investigate plus implementation and labor costs | No unsupported rates or default ROI assumptions |
| Evidence | Source, version, date, statement scope, status and limitations | Is a framework being misused to validate a vendor? |
| Next action | Learning exercise or research gap | Is the reader able to do something beyond memorize terminology? |

## Evidence is scoped, not inherited

Use three separate evidence tracks:

- **Outcome/control reference:** standards or technical guidance explaining the security objective and approach.
- **Market-language reference:** analyst/public research explaining a category, suite or emerging term. Attribute Gartner, Forrester, SACR and other authors explicitly; licensed report access and rank reproduction are separate questions.
- **Product evidence:** official product/version documentation and qualified claims about a specific offering. Category membership never proves a capability.

Proposed reference record: existing source ID where available, exact URL, publisher, source type, document/version, publication date or Unknown, observed date, specific statement supported, limitations, reviewer, next check and rights note. This is an editorial record until schema support is reviewed. Do not create a competing runtime source registry.

Separate completeness dimensions: **explanation drafted / references attached / editorially reviewed / product evidence available / published / tested in a defined environment**. These are not one numeric quality score. Existing `verified` is a repository evidence label, not a certification of the product or the whole category.

## Workflow design that fits different categories

| Family | Suitable workflow | Example output |
| --- | --- | --- |
| Access controls | Principal, authentication, policy, authorization, action, audit | Approved or rejected resource access |
| Discovery/posture | Asset inventory, observation, assessment, prioritization, owner, remediation check | Owned finding with verified closure |
| Testing | Test target, technique, finding, reproduction, fix, retest | Reproducible defect and regression evidence |
| Runtime prevention | Activity, context, decision, enforcement, exception, audit | Allowed/blocked action and reason |
| Operations | Signal, investigation, authorization, response, recovery, learning | Case and outcome evidence |
| Governance | Obligation/risk, owner, control, evidence, decision, review | Accountable risk treatment and evidence |
| Recovery | Business dependency, recovery plan, restore, validation, failback | Demonstrated service restoration |

These are teaching patterns, not mandatory event sequences. Workflows can branch and repeat. Keep plain text as the baseline; use a compact diagram only when branching or topology adds meaning.

## Five pilot acceptance tasks

1. **CSPM:** explain why identifying a public storage configuration does not establish that an attacker accessed it.
2. **DSPM:** explain why locating sensitive data does not establish that exfiltration can be blocked.
3. **SAST:** explain why a code finding needs triage and a verified fix; distinguish it from testing the running application.
4. **Third-party risk:** explain why an external score or questionnaire alone does not establish supplier safety.
5. **Cyber recovery:** explain why having a backup is not proof that the business service can be restored.

A pilot passes editorial review when a reader can identify the job, dependency, boundary, owner and one evaluation question, and trace the factual guidance to a suitable source. Test with real readers before claiming measured learning improvements.

## Bounded application plan

Reuse `Category`, `/categories/[slug]`, current breadcrumbs, domain/adjacency links, evidence rendering and source IDs. Current fields already cover basic definition/buyer/workflow metadata. Propose optional `conceptKind`, `scope`, `boundaries`, `workflowSteps`, `evaluationQuestions` and scoped reference links only after editorial pilot review. Do not force existing identity flows into a breaking migration.

Render orientation → workflow/boundaries → ownership/evaluation → source guidepoints → vendor discovery. Existing product and comparison components remain secondary. Do not create a new navigation system, diagram library, database or scraper.

Before implementation, follow UI-bank guidance and inspect existing components; verify narrow/mobile layouts, keyboard/focus, reduced motion, empty evidence, Unknown states and return-to-domain navigation. Before publication, ensure all cited records exist and source type/qualifiers remain visible. Current delivery is documents and worked examples only.

## Delivery and outcome tracking

The [knowledge-model delivery plan](knowledge-model-delivery-plan.md) connects this explanation contract to versioned sources, requirements, business outcomes and independently reviewed consumer adoption. Track delivery in [KRU-211](https://linear.app/krusty/issue/KRU-211); the three end-to-end schema pilots complement the five teaching exercises above. This is planned work, not implemented schema or integration.
