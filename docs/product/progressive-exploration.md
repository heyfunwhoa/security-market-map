# Progressive market exploration — addition and navigation contract

**Status:** proposed application guidance, subject to review | **Owner:** Security Market Map maintainer | **Date:** 2026-10-28

## Mental model

**Zoom out:** Security landscape → domain → category/buyer problem → specific use case.

**Zoom in:** shortlist of vendor/product options → one product → source-attributed capabilities, architectural differences, limits, and Unknowns.

Allow the reader to move back to the parent context without losing the meaning of the selected filters. This is progressive disclosure, **not** an invented competitor ranking or literal map/camera zoom requirement.

## When someone introduces a new topic

1. Ask what buyer problem or architecture decision it explains. Classify it within existing domain/category/use-case IDs where appropriate; do not invent a new category just for a new term.
2. Search existing vendor, product, claim, source, and relationship IDs and open PRs first. Reuse records; distinguish products from parent vendors.
3. Research original sources. Record observed and publication dates, vendor-reported vs. verified, scope/edition, and explicit Unknowns. Follow the [Competitive Intelligence Playbook](../market-research/competitive-intelligence-playbook.md).
4. Place the knowledge at the **right depth**. A high-level market explanation belongs at domain/category, a product positioning statement at product depth, and technical claims/limitations in evidence-linked detail. Preserve links across levels rather than copying facts into every page.
5. Check how readers would **zoom in** to this fact and **zoom out** to adjacent options. Reuse existing `/landscape`, `/compare`, and `/vendors/[slug]` routes. If current navigation already works, make no UI change.
6. Explicitly distinguish direct substitute, partial overlap, complement, and Unknown for the buyer decision. Do not infer a competitive edge from a category label.
7. Propose source-backed notes first. Update typed catalog and UI only through their existing editorial, testing and PR gates. No automatic publication, scraper, cross-repo sync, deployment, or private-data import.

## Delinea example

**Broad:** cybersecurity → identity/security infrastructure → PAM and secrets management.

**Narrow:** human-focused privileged access versus application and workload secrets delivery → Secret Server vs. DevOps Secrets Vault (DSV) → DSV's documented API/CLI access and workload authentication → target-specific dynamic credential prerequisites, editions and unknowns.

**Sideways:** compare DSV's *workload secret-delivery* requirements with HashiCorp Vault, Infisical, Akeyless, and cloud-native secret managers. TruffleHog addresses exposed-secret discovery, a different layer; don't invent head-to-head parity. See [candidate Delinea research](../market-research/delinea-dsv-vs-traditional-pam.md) when merged; draft PR #105 may be unmerged.

## Acceptance checklist for each proposed addition

- [ ] Buyer question and zoom level described.
- [ ] Existing ID, source, feature, relationship and PR overlap reviewed.
- [ ] Breadcrumb/broaden path and relevant narrower comparison or detail destination identified; if none needed, explicitly say so.
- [ ] Facts carry original provenance, review status, dates and Unknowns.
- [ ] No unsupported category-to-feature or category-to-direct-competitor inference.
- [ ] UI changes, if any, checked for focus/keyboard, responsive layout, reduced motion and empty states.
- [ ] PR clearly distinguishes proposal, checks, merged status and published status.

The progressive filter UI is proposed in draft PR #106, not assumed merged, browser verified, or deployed. This document records intended behavior; it does not assert technical enforcement.
