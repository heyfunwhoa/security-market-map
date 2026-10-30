# Kingfisher: open-source secrets detection and credential response

Reviewed: 2026-10-30. **Evidence level: upstream publisher documentation, not independently evaluated.** Canonical vendor `mongodb`, product `kingfisher`, already present in the Market Map secrets sweep. Do not create another vendor/product entry. Technical detector and rule coverage belongs in Detector Coverage Atlas.

## Product identity and positioning
MongoDB-maintained Kingfisher is an Apache-2.0-licensed, Rust-based open-source secrets scanner. Its current upstream README documents a broader end-to-end workflow: **Detect → Validate → Map → Triage → Revoke**. This is a workflow of distinct controls, not proof that every provider and credential supports every stage.

Source: https://github.com/mongodb/kingfisher

## Architecture and control path
1. **Source acquisition:** CLI scans local files, repositories/history, code hosts, containers, object storage, collaboration systems, supported archives and other supported targets. Authenticate only to assets the operator owns or is authorized to assess; target-specific features vary.
2. **Candidate extraction and matching:** Rust engine with multithreaded pattern matching and contextual checks. Do not treat total rule count as detector/provider coverage or accuracy.
3. **Validation:** Provider-specific live checks when a supported rule and policy permit it. An unverified candidate is not necessarily false; network failures, permissions and provider state matter. Never test live third-party credentials.
4. **Blast-radius mapping:** Supported read-only provider queries describe identity/permissions or reachable assets. This is not general cloud attack-path analysis.
5. **Triage:** Structured formats including JSON, JSONL and SARIF; local/browser report viewer can ingest other scanner reports. Importing a report is **not** evidence Kingfisher natively detects the provider.
6. **Revocation:** Explicit provider-specific supported credential revocation. Higher impact: requires authorized credentials, safeguards and dry-run planning; do not trigger during comparison evaluation.

## Positioning and buyers
- **AppSec / DevSecOps:** source, CI and developer scanning with policy and automated triage; concern: false positives and workflow friction.
- **Secrets/NHI security:** live credential state, blast-radius context and revocation; concern: provider permissions and availability of verifiers.
- **SOC / incident response:** validate severity and understand leaked credential reachability; concern: authorization, logging, audit and containment safety.
- **Platform engineering:** OSS and in-process Rust/Python embedding; concern: maintenance, dependency trust, runtime footprint and deployment risk.

## Distinctions to preserve
- **Detector:** one pattern/context rule; **validation implementation:** may be separate, rule-specific, provider-specific, and may require network access.
- **Provider:** credential issuer; **source/scan surface:** where the token was found; these are different entities.
- **Finding:** candidate/validated outcome; **blast radius:** separate read-only mapping; **revocation:** explicit write action.
- **Reported benchmark:** publisher-run, environment-dependent, not an independently demonstrated performance ranking.
- **Open source license:** Apache-2.0 according to upstream README; version/third-party obligations should be checked at a pinned source commit.
- **Detection stage** is separate from **analyzer/validation stage**; the Atlas already models detectors first and optional analyzers afterward. Avoid assuming a one-to-one Kingfisher-to-TruffleHog rule mapping.

## Questions to answer in a source-pinned technical follow-up
1. Which version/commit, rule sources, rule IDs, detector names and provider identifiers are authoritative?
2. Which validation functions are implemented, what parameters do they require and what results mean valid, invalid, inconclusive or error?
3. Which credential types have read-only blast-radius mapping or supported revocation, and are these default/opt-in?
4. Which scan surfaces are CLI-supported, which are SDK-supported, and which require edition/config/credentials?
5. What redaction, fingerprint, deduplication and retention behavior applies to exported findings?
6. Which third-party report formats are imported versus produced natively?
7. What are update cadence, signatures, checksums and secure pinned release practices?

## Cross-repository ownership contract
- **Security Market Map** owns `mongodb` vendor and `kingfisher` product identity, architecture overview, buyers, ownership, categories, source links and high-level positioning.
- **Detector Coverage Atlas** owns pinned upstream rule inventory, individual detector signatures/IDs, analyzer connections, validation evidence, scanner versions, comparable scan surfaces and explicit Unknown/not_evaluated states.
- Cross-links use canonical IDs `mongodb` / `kingfisher`; no duplicated editable rule catalog, no invented side-by-side coverage.
- The Atlas currently has Kingfisher registered with `not_evaluated` scanner coverage. Do not silently promote it to supported when only a doc or source registry is added.

## Primary references
- Upstream: https://github.com/mongodb/kingfisher
- Official documentation: https://mongodb.github.io/kingfisher/
- Atlas canonical repository: https://github.com/heyfunwhoa/detector-coverage-atlas
