# Security Market Map — Product Requirements Document

> **Status:** Draft for owner review | **Owner:** security-market-map | **Reviewed:** 2026-10-10 | **Visibility:** Follow repository classification; do not copy private artifacts into public summaries.
> **Authority:** This repo's implementation/README. Shared template in `heyfunwhoa/technical-docs-platform/templates/product-prd.md` (draft PR #4). Confirm status against code and tests before treating this as a current implementation inventory.

## Executive summary
**Product:** Evidence-linked cybersecurity landscape.
**Problem:** Buyers and practitioners cannot easily tell related security categories apart or assess vendor claims.
**Vision:** Help the intended user complete the primary task with accurate, explainable information and transparent limitations.

## Users and key journey
**Primary audience:** People doing the work described by this product; user role and permissions must be confirmed in discovery.
**Job to be done:** Choose security category → understand problem/buyers → inspect overlap → trace claims to dated sources → compare verified evidence.
**Research need:** Interview or usability-test representative users; no adoption or demand figures are assumed.

## MVP and non-goals
**Scope to validate against current code:** Category taxonomy; security domains; source-backed identity slice; vendor relationships; confidence/unknown states.
**Explicitly out of scope:** Unsourced rankings, blanket feature checkmarks, affiliate recommendations, claims that all domains are equally validated.
Each proposed capability must be classified **implemented / partial / proposed / unknown** in a follow-up code audit. An item in this PRD is not proof it exists.

## Functional requirements
- **FR-01:** Complete the primary user journey with documented user input, visible result and recoverable errors.
- **FR-02:** Show the origin and freshness of any source-derived decision or record; label inferred or uncertain results.
- **FR-03:** Enable human correction/review of uncertain or high-impact information where relevant.
- **FR-04:** Keep application state and result semantics consistent across relevant UI, exports and APIs.
- **FR-05:** Provide useful empty, loading, validation-failure and partial-success states.

## Security, data and quality
Publication/source dates; conflict and unknown states; source freshness; public-source licensing and attribution.
Enforce access control proportional to data sensitivity, safe logs, redaction, dependency/security review, and synthetic fixtures in tests. Accessibility target WCAG 2.2 AA for UI workflows. Document source schema, ownership, retention, retry/rollback and operational failure modes. Avoid new runtime dependencies without an approved need.

## Success metrics and validation
Source coverage and review freshness; user task completion; number of unsupported claims (target zero).
Baseline: **unknown until measured**. Define test datasets and task-based acceptance targets before making outcome claims. Validate keyboard/mobile flows, automated lint/tests/build and source/provenance integrity.

## Proposed epics (ordered, subject to audit)
1. **EPIC-01:** Identity deep dive — capture user story, current state, P0/P1/P2 priority, dependencies, acceptance criteria and test evidence.
2. **EPIC-02:** category relationship map — capture user story, current state, P0/P1/P2 priority, dependencies, acceptance criteria and test evidence.
3. **EPIC-03:** sourced vendor evidence — capture user story, current state, P0/P1/P2 priority, dependencies, acceptance criteria and test evidence.
4. **EPIC-04:** security domains expansion — capture user story, current state, P0/P1/P2 priority, dependencies, acceptance criteria and test evidence.

## Delivery decisions and blockers
- Audit existing code, routes, data schemas, tests, CI, prior roadmap and open PRs before prioritizing implementation.
- Record architecture decisions (ADRs) in the owning repository rather than copying shared governance.
- Use feature branches, scoped PRs and preview/validation before release. Document rollback and migrations for persistence changes.
- Do not imply upstream/conceptual integrations are working until verified at runtime.
- Publication requires fact/source review and permission; deployment and PR merge are separate states.

## Definition of Done
An approved user journey and measurable acceptance criteria, working error/empty states, source provenance, no sensitive-data exposure, passing configured checks, accessibility review, and evidence of preview/production verification before release.
