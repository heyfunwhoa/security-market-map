# Secure development baseline

All application PRs should pass `npm test`, `npm run typecheck`, `npm run lint`, and `npm run build`. CI uses read-only repository contents permissions. CodeQL runs for JavaScript/TypeScript on PRs, main, and a weekly schedule. Dependabot proposes dependency and GitHub Actions updates weekly.

Security-sensitive changes require human review: authentication, authorization, external URL crawling, webhook signatures, data storage, ingestion of untrusted text/HTML, secrets, AI retrieval/prompts, tool execution, and publishing claims. Scan outputs are not proof that an application is secure.

Repository administrator follow-up:
1. Check GitHub Settings > Code security and analysis for available secret scanning, push protection, Dependabot alerts, and CodeQL support.
2. Check Settings > Rules > Rulesets to require CI and CodeQL checks before merging, where supported.
3. Confirm workflows are triggered and complete successfully before enforcing as required checks.
4. Review GitHub Actions permissions and third-party action versions. Pin actions by full immutable SHA in a hardening follow-up after verifying trusted commits.
5. Consider dependency review on PRs and periodic external review before enabling active external crawlers.

Research data standards: never infer product support from category membership; maintain source evidence, dates, conflicts, and explicit Unknown values. Treat analyst content as rights-restricted unless permitted.
