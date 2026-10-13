# Security release readiness — security-market-map

Reviewed: 2026-10-13 UTC. Owner: Kristen Aing. Status: proposed branch changes; **not merged, deployed, or certified**. This app owns this record; shared policy remains in [Technical Docs](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/engineering/baseline-v1.md).

## Evidence and boundaries

Main Trivy run [38339032854](https://github.com/heyfunwhoa/security-market-map/actions/runs/38339032854) was green despite five HIGH production dependency findings: MCP SDK, braces, Next.js, sharp and source-map-js. The PR patches Next.js to 16.3.8, aligns ESLint configuration, updates affected transitive dependencies and classifies shadcn as a build-time dependency (its CSS import remains available during builds). Production npm audit after remediation: zero advisories. Vitest is updated to 4.1.11 to address the separate critical development-test dependency findings. 64 tests, lint and production build passed.

The full dependency audit still reports 8 HIGH development-tool entries rooted in braces/fast-glob, including shadcn and the Next ESLint tooling. This is **unresolved**, not an approved exception or a claim of non-exploitability. Do not run untrusted patterns/code through those tools with production credentials. An owner must review a scoped dependency replacement/update; do not force a major framework downgrade just to silence npm audit.

Trivy and npm production audits now fail on HIGH/CRITICAL; Semgrep remains blocking. Scans run on PR/main and weekly/manual schedules. Live GitHub/Vercel enforcement was not verified for this repository.

## Required check names after this PR

- `check`
- `Production dependency audit`
- `semgrep`
- `TruffleHog introduced secrets`
- `Trivy dependency and config review`

A failing job is not a merge or deployment gate until the hosting/repository settings require it. Use these exact emitted names, confirm they appear for the candidate SHA, and recheck after future workflow renames. In this change secret scans run on PR/push; weekly/manual runs scan history. Scanner rules/databases update independently of pinned binaries. Trivy's default npm coverage and `npm audit --omit=dev` exclude development dependencies. No ignored-CVE file or blanket continue-on-error is introduced.

## Owner settings and acceptance evidence

1. Inspect existing main protection. Require PRs and the applicable checks above, require up-to-date branches, restrict force pushes/deletion and review bypass permissions. Do not require a path-filtered check that may never emit. If the plan does not support private rules, record the limitation and use reviewed manual releases until a plan decision is made; do not make private source public as a workaround.
2. In the correct Vercel project, require the checks emitted on main before production domain assignment where supported. Confirm preview protection separately from production access. Do not change billing, secrets or identity settings as a side effect.
3. Once those settings are active, create a temporary PR with a harmless failing check. Record its head SHA, failed check, blocked merge state and production-domain behavior. Close it without merging; confirm a passing candidate remains releasable. This exercise has **not** been performed in this audit.
4. Match the intended release SHA to the deployed SHA, verify applicable anonymous/authenticated synthetic behavior, and record rollback instructions before release. Existing data and credentials are not testing fixtures.
5. Enable owner GitHub Actions failure notifications and verify delivery from an approved failure exercise. Runtime alerts require an owner-selected destination and an end-to-end delivery check; a green build or empty error list does not prove monitoring. No email/Slack messages were sent by this audit.

## Open operational register

| Item | State | Owner / review |
| --- | --- | --- |
| Main protection / failing-PR exercise | Unverified or blocked as described above | Kristen; before next production release |
| Vercel deployment gate / release SHA | Unverified | Kristen; before next production release |
| Runtime alert delivery | Unverified; do not claim active protection | Kristen; select destination and verify before real-data rollout |
| Development dependency findings | Review full audit separately; no implicit acceptance | Kristen; review by 2026-10-20 |
| Scanner finding response | Block high/critical production findings; assess remaining findings | Kristen; on each failed run |

For any exception, record the advisory, affected path, exposure, owner, mitigation and expiry in a reviewed PR. An entry here is not risk acceptance. Revert the scoped workflow/dependency commit to roll back this change; do not bypass a known failed gate to ship.
