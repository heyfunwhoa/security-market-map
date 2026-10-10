# Engineering, Quality & Security Baseline

**Project:** Next.js security research application. This is a proposed policy, not proof of functioning CI or passing checks.

## Definition of Done
1. Define intent, acceptance criteria and change risk. Make changes on a feature branch with focused commits; open a PR against the default branch.
2. Run applicable validations: npm ci; npm run lint; npm run typecheck; npm test; npm run build. Do not install or enforce unsuitable tooling simply to make repositories look uniform.
3. Inspect changes for accidental secrets, sensitive data, unexpected generated files, dependency risks and unintended access or deployment impacts.
4. Document source/feature behavior, tested evidence, security considerations, review outcome and release/rollback plan if deployable.
5. Merge only after relevant checks and human review. Confirm changes landed as expected.

## Project-specific controls
Maintain citation provenance and distinguish hypotheses from evidence; defend external ingestion against SSRF and prompt injection.

## Rollout priorities
- **P0:** Inventory existing checks, workflows, permissions, dependency alerts and security scanners. Never overwrite working CI; record missing checks separately from checks that are passing.
- **P0:** Add narrowly scoped lint/tests/build or structured-data validation, matching project language and risks. Keep live SaaS/cloud credentials out of CI tests.
- **P1:** Add reusable PR checklist, review and protection rules where available, and evidence-driven coverage targets.
- **P2:** Add scheduled reviews, observability, release controls, deeper threat modeling and supply-chain attestations only where justified.

## Review checklist
- [ ] PR is focused; diff and acceptance criteria reviewed
- [ ] Applicable automated checks run and output reviewed (not merely configured)
- [ ] Secret/dependency/privacy risks checked
- [ ] Documentation and cited claims updated when relevant
- [ ] Deployment, rollback and monitoring reviewed when relevant

**Standards reference:** [NIST SSDF](https://csrc.nist.gov/projects/ssdf), [GitHub PR workflow](https://docs.github.com/en/pull-requests), [OWASP guidance](https://cheatsheetseries.owasp.org/).