# Gitleaks, Betterleaks and Kingfisher: recent sources (Sep–Nov 2026)

Status: **candidate research note, not published typed claims.** Inspected 2026-11-18. Owner: repository maintainer. Reviewer: pending.

This note gathers primary sources published from 2026-09-01 to 2026-11-18 for three open-source secret scanners already in the catalog (`gitleaks`, `betterleaks`, `kingfisher` in `lib/data/secrets-sweep.ts`). It adds no vendor, product or capability record and changes no typed claim. Several findings conflict with current catalog text; they're listed under **Proposed catalog corrections** for a human to decide.

## Zoom-level placement

Market → **Secrets detection** (category `secrets-detection`) → buyer use case **detect exposed credentials** (`uc-detect`) → the existing product records `gitleaks`, `betterleaks`, `kingfisher` → the dated release evidence below.

- **Navigation:** no change. The existing secrets sweep ([2026-10-13](secrets-detection-sweep-2026-10-13.md)) and the [Kingfisher deep dive](kingfisher-oss-deep-dive-2026-10-30.md) are the entry points.
- **Rule-level coverage:** belongs in the Detector Coverage Atlas, not here. Its Betterleaks v2 preview (`docs/review/betterleaks-v2-preview.md` on the atlas `claude/vigilant-volta-b65gar` branch) holds the rule counts.
- **Relationship:** the three are related, not three independent options. Betterleaks is maintained by the people who made Gitleaks, and Kingfisher's bundled catalog is built mainly from Betterleaks-format rules. Sharing a category doesn't make them direct substitutes for any particular buyer.

## How sources were checked

| Label | Meaning |
| --- | --- |
| **Exact (git)** | The passage was matched character for character in the file at the commit named, or in the commit title. |
| **Exact (config)** | Counted from the pinned `config/betterleaks.toml` and cross-checked with Python `tomllib`. |
| **Unverified (release page)** | Read once through a summarizing fetch tool. github.com release pages returned HTTP 403 when re-checked directly. Re-check before publishing. |

Dates: **tag date** is the tag's commit date from git. GitHub release-page dates can be a few days later (for example, Betterleaks v1.10.1 has a tag date of 2026-11-06 and a release page dated 12 Nov). The table says which kind of date it uses. Every source is **vendor- or maintainer-reported**. No independent or press source from the window was read (see Gaps).

## Gitleaks

| Date | Source | Passage / fact | Supports | Check |
| --- | --- | --- | --- | --- |
| 2026-05-21 (commit `80093b8`, before the window but still current) | [README](https://github.com/gitleaks/gitleaks/blob/master/README.md) | "Gitleaks is feature complete. I'm not merging new features into Gitleaks. Future releases will be security patches only." | Maintenance status: security patches only; the author's focus moved to Betterleaks | Exact (git) |
| — | Tags | No tag from 2026-09-01 to 2026-11-18. Newest stable is still v8.30.1 (tag date 2026-03-12) | No feature releases in the window | Exact (git) |

## Betterleaks

| Tag date | Source | Passage / fact | Supports | Check |
| --- | --- | --- | --- | --- |
| — | [README](https://github.com/betterleaks/betterleaks) at `e07e69b` | "It is maintained by the folks who made Gitleaks, including the original author." Followed by "Development is supported by" with an Aikido Security logo. LICENSE: MIT, "Copyright (c) 2026 Zachary Rice". | Governance: maintained by the Gitleaks makers, development supported by Aikido. **Doesn't say Aikido owns or publishes it.** | Exact (git) |
| 2026-09-29 | v1.9.0 | Default config grew from 417 to 463 `[[rules]]` blocks (v1.8.1 → v1.9.0). Release page: "Added 46 detection rules, including Miro, VoyageAI, and Bitbucket Data Center tokens." | Rule additions | Count: exact (git). Quote: unverified (release page) |
| 2026-09-30 | v2.0.0-rc.1 (pre-release) | Release page: "Breaking changes to the CLI, configuration, report formats, and Go API may still land before v2.0.0." | v2 is unstable until GA | Unverified (release page) |
| 2026-10-07 | v2.0.0-rc.2 | Commit "New source: containers (#393)" and "Backport container image scanning to v1" | Container image scanning (v2, backported to v1) | Exact (git commit titles) |
| 2026-11-04 | v1.10.0 | Release page: auto-loading `.betterleaks.toml` / `.gitleaks.toml` now requires `--unsafe-auto-load-config` | Breaking change for v1 users | Unverified (release page) |
| 2026-11-06 | v1.10.1 (newest stable) | Commit "fix(deps): update brotli to fix CVE-2026-111497 (#458)" | Security dependency fix only | Exact (git) |
| 2026-11-13 / 11-17 | rc.8 / rc.9 | Commits "New rule-builder system (#475)" and "stop reporting client-side publishable keys (#482)" | Rule tooling; fewer publishable-key findings | Exact (git) |
| — | [`docs/v2_migration.md`](https://github.com/betterleaks/betterleaks/blob/main/docs/v2_migration.md) | Default: "Detect and filter locally; do not validate or analyze credentials." `-a`/`--analyze`: "Validate, then analyze valid credentials when the rule supports it." "Scans never revoke credentials." SARIF, CSV, JUnit and template reporters and `--baseline-path` are removed. | v2 makes validation opt-in, adds identity/permission analysis and separate explicit revocation, and drops some report formats | Exact (git) |
| 2026-11-17 | Config at v2.0.0-rc.9 vs v1.10.1 | Reported rules 422 → 430. Rules with `validate` 229 → 247, `analyze` 0 → 77, `revoke` 0 → 13. | Analysis and revocation are new in v2 and **pre-release only** | Exact (config) |

No v2.0.0 release date is given in the README, the migration guide or the git history (checked 2026-11-18). The README says package managers and Docker `latest` may still provide v1 until the first stable v2 release.

## Kingfisher

All passages are from [`CHANGELOG.md`](https://github.com/mongodb/kingfisher/blob/main/CHANGELOG.md) or the [README](https://github.com/mongodb/kingfisher) at v2.19.1 (`0b57b81`), publisher MongoDB. Every passage was matched exactly in git; dates are tag dates.

| Tag date | Passage | Supports |
| --- | --- | --- |
| 2026-08-23 (v2.0.0, before the window and missing from the deep dive) | "**Breaking:** moved the candidate detector catalog to the Betterleaks rule format, with selected Veles detectors filling gaps" | **Lineage:** Kingfisher's detection catalog is built on Betterleaks rules plus Google OSV-SCALIBR Veles detectors |
| 2026-10-27 (v2.15.0) | "Support Betterleaks v2 validation, analysis, and explicit revocation programs" | Kingfisher runs Betterleaks v2's validation, analysis and revocation programs |
| 2026-11-08 (v2.18.0) | "Include Betterleaks `generic-api-key` at static low confidence (503 bundled rules)." | Bundled rule count at v2.18.0. A count isn't coverage. |
| 2026-11-16 (v2.19.0) | "Clone and update repositories natively with gitoxide; scans no longer need a Git executable." | Deployment: no Git binary needed |
| README | "The bundled catalog contains **503 rules**." … "Kingfisher and Betterleaks 2.0 RC5 also include credential revocation for supported providers." | Vendor-stated count, and a vendor-authored comparison with Betterleaks, TruffleHog and Gitleaks. **Not independent.** Its benchmark method (`docs/COMPARISON.md`) wasn't reviewed. |

Also in the window (CHANGELOG, exact, tag dates): opt-in GitHub gist scanning (v2.6.0, 09-23); opt-in bounded verification for ambiguous credential components (v2.7.0, 09-23); SMTP credential validation without sending email (v2.12.0, 10-11); Azure Blob Storage scanning (v2.14.0, 10-19); a JavaScript/TypeScript SDK (preview in v2.17.0 on 11-05, `npm-v1.0.0` tag on 11-08). There's no project blog post in the window; the newest is dated 2026-05-04.

The Atlas counts 456 *reported* Kingfisher rules at v2.19.1, excluding 47 hidden helper rules (456 + 47 = 503). Both figures are right; they count different things.

### Kingfisher's own comparison page (vendor-competitor content)

[`docs/COMPARISON.md`](https://github.com/mongodb/kingfisher/blob/0b57b8122e10050db3cefffde1a555a061e0b280/docs/COMPARISON.md) was last changed 2026-11-04 (commit `35aaf17`, "preparing for v2.17.0") and edited at four earlier releases in the window. MongoDB is the publisher and compares its own tool, so this is **not independent**. All passages are exact (git).

- **Runtime table, nine public repositories (Kingfisher, TruffleHog, Gitleaks):** Kingfisher is fastest on all nine (for example `linux`: 205.19 s vs 597.51 s TruffleHog vs 548.96 s Gitleaks). The page's own caveat: "These are published reference results, not a fresh benchmark of the current release." The tables don't record tool versions; the stated environment is "OS: darwin / Architecture: arm64 / CPU Cores: 16 / RAM: 48.00 GB". Betterleaks isn't in the runtime table.
- **Validated findings:** equal where non-zero (`gitlab`: 6 Kingfisher validated, 6 TruffleHog verified). Gitleaks is marked "N/A, not zero".
- **Network requests during scans:** `gitlab` 17 Kingfisher vs 15,624 TruffleHog vs 0 Gitleaks. The proxy "counts plain HTTP requests and HTTPS CONNECT tunnels"; it doesn't decrypt TLS.
- **Capability table:**
  - "Credential revocation": ✅ Kingfisher, ✅ Betterleaks 2.0 RC5, ❌ TruffleHog OSS, ❌ Gitleaks.
  - "Live credential verification": ❌ for Gitleaks only.
  - Cites a TruffleHog README pinned at `662edea`.
  - **TruffleHog relevance:** the ❌ is MongoDB's reading of TruffleHog OSS's README, labelled "Not supported as a built-in capability". This note doesn't verify it, and it says nothing about TruffleHog's commercial editions. Betterleaks' revocation is pre-release only (see above).

## Downstream use

| Project | Evidence (exact, at commit `c02727b`, 2026-11-16) | What it shows |
| --- | --- | --- |
| [CompassSecurity/pipeleek](https://github.com/CompassSecurity/pipeleek), AGPL-3.0, "a tool designed to scan CI/CD logs and artifacts for secrets" | `go.mod`: `github.com/betterleaks/betterleaks/v2 v2.0.0-rc.7` and `github.com/trufflesecurity/trufflehog/v3 v3.99.8`. `pkg/scanner/engine/betterleaks.go` imports Betterleaks v2 `scan`, `config`, `analyze` and `sources`. `pkg/scanner/rules/rules.go` imports TruffleHog `pkg/engine/defaults`. `engine.go` runs Betterleaks detection and keeps "custom GitLab verification alongside default TruffleHog detectors". | A third-party tool **embeds both** engines as libraries. For this buyer scenario (CI/CD log scanning), they're used as complements, not substitutes. Already on a Betterleaks pre-release. One project only; it doesn't show broader adoption. |

## Proposed catalog corrections (not applied, need human review)

| Record | Today | Evidence | Proposal |
| --- | --- | --- | --- |
| `betterleaks.vendorId` = `aikido`; `src-secrets-sweep-betterleaks.publisher` = "Aikido Security" | Aikido shown as vendor and publisher | README: maintained by the Gitleaks makers, development *supported by* Aikido. LICENSE copyright: Zachary Rice. | Decide whether Betterleaks should be a project with Aikido as sponsor rather than an Aikido product. Unknown: who owns the `betterleaks` GitHub org (no governance file found). |
| `gitleaks` | "Review maintenance status separately" | README since 2026-05-21: feature complete, security patches only. No tag since 2026-03-12. | Record maintenance status with this source and date. |
| `betterleaks.positioning` | "Configurable scanner for exposed secrets." | Validation is already in v1.x (229 rules in v1.10.1). Analysis and revocation exist only in v2 pre-releases. | Mention v1 validation. Keep analysis and revocation out of published capabilities until v2.0.0 is stable. |
| `kingfisher-oss-deep-dive-2026-10-30.md` | No rule lineage | v2.0.0 CHANGELOG (catalog built on Betterleaks plus Veles) | Add lineage, so overlap with Betterleaks isn't read as independent confirmation. |

## Gaps and leads (unverified)

- **Independent coverage:** none read. The hosts below don't resolve under this session's network policy (checked 2026-11-18). Each line is what a **web search summary** said: a lead to read, not a source.

| Lead | URL | Search summary claims (unverified) | Why it matters |
| --- | --- | --- | --- |
| MongoDB blog, Gitee scan | [mongodb.com](https://www.mongodb.com/company/blog/technical/scanning-7-point-25-million-public-repositories-chinas-largest-git-platform-for-secrets) | Dated 2026-10-28. Guest post with the Kingfisher team. 7.25M public Gitee repositories, about 26,400 unique verified-live credentials, compared with TruffleHog | Primary MongoDB source naming TruffleHog. Read before citing any number. |
| CybeDefend, "Open Source Secret Scanning Tools 2026: 6 Tested" | [cybedefend.com](https://www.cybedefend.com/en/blog/open-source-secret-scanning-tools) | Run 2026-10-29 on Kingfisher v2.14.0. 10 of 12 planted secrets, tied with Gitleaks | Hands-on test by a security vendor. Check methodology and whether it sells a competing product. |
| DevToolLab, "Best Secret Scanning Tools in 2026, Tested" | [devtoollab.com](https://devtoollab.com/blog/best-secret-scanning-tools) | Kingfisher v2.7.0: 9 of 10 planted secrets, 0.91 s median | Small corpus; affiliation unknown |
| BleepingComputer, Betterleaks launch (March 2026, before the window) | [bleepingcomputer.com](https://www.bleepingcomputer.com/news/security/betterleaks-a-new-open-source-secrets-scanner-to-replace-gitleaks/) | Search summaries call Zach Rice "Head of Secrets Scanning at Aikido Security" | **Key for the Aikido vendor/publisher correction:** shows employment, not ownership |
| Aikido, "Best Secret Scanning Tools in 2026" | [aikido.dev](https://www.aikido.dev/blog/top-secret-scanning-tools) | Describes Kingfisher blast-radius mapping across 43 providers | Aikido sponsors Betterleaks, so this isn't independent |
| Stéphane Robert, Betterleaks guide | [stephane-robert.info](https://www.stephane-robert.info/en/docs/devsecops/code-dependencies/betterleaks/) | Betterleaks detection plus checking whether secrets are still active | Possibly the only independent technical write-up; date unknown |

To read these, allow those hosts in the environment's network settings and re-run this check.
- **Third-party rule counts:** snippets cite 942, 958 and 1,051 Kingfisher rules. They probably refer to the older v1.x catalog. Unverified; use only version-pinned primary counts.
- **v2.0.0 date:** no release date for Betterleaks v2.0.0 found in any primary source.

## Consumer disposition

- **Security Market Map catalog:** defer. The four corrections need reviewer decisions.
- **Detector Coverage Atlas:** no change from this note. The v2 preview already covers rule-level impact.
- **TruffleHog positioning (owner's call):** Kingfisher's comparison page marks TruffleHog OSS ❌ for built-in revocation and reports more network requests during scans. Those are MongoDB's claims on its own page, recorded here as vendor-competitor content. Whether to respond is a separate decision.
- **Other consumers** (interview prep, sales, revenue): no update. Nothing here is account-specific.

Rights: short quotes (25 words or fewer) from MIT (Gitleaks, Betterleaks) and Apache-2.0 (Kingfisher) repositories, with links. Next review: when Betterleaks v2.0.0 ships, when Gitleaks tags a release, or by 2026-12-18.
