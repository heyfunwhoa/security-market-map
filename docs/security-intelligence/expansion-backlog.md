# Shared intelligence expansion roadmap — proposed, not built

## P0 — Evidence, identity and contracts

- [x] Architecture proposal: owner boundaries, PostgreSQL, read API shape
- [x] Seed registry with two cited incident summaries
- [x] Explicit relationship dictionary, confidence/provenance and temporal revision policy
- [x] Fixture-backed cross-consumer adapter contract tests (no deployed endpoints)
- [ ] Real human review/approval of each imported edge and source date
- [ ] Migration design with FK constraints, aliases, claim versions and reviewed public views
- [ ] Market Map and Builder Academy owners approve the same service contract

## P1 — Real consumers and enriched models

- [ ] Deploy standalone read-only Security Intelligence API and database; authentication and RBAC for editorial actions
- [ ] Market Map explore-by-incident/technique/control view, powered through read API
- [ ] Academy safe incident labs derived from reviewed evidence plus **explicitly synthetic exercises**
- [ ] Model assets and exposures: repository, software package, container, CI pipeline, credential class, human/NHI identity, endpoint, cloud resource
- [ ] Add versioned MITRE D3FEND defensive mapping, CWE weakness mapping, CAPEC attack patterns with separately cited linkage rules
- [ ] Model package dependency chains, SBOM metadata (CycloneDX/SPDX where applicable), and VEX applicability assessments
- [ ] Add incident timeline revisions, attribution disputes and exportable source bibliography

## P2 — Enrichment and interoperable analysis

- [ ] OCSF-compatible synthetic event schema for lab telemetry (not raw customer logs)
- [ ] RSS/source ingestion with explicit domain and licensing allowlist; CISA KEV, OSV, NVD, GHSA adapters and alias resolution
- [ ] RAG with grounded citations, confidence and refusal to fill unknown gaps
- [ ] Read consumers: Detector Coverage Atlas, research console, GTM Revenue OS and Account Signal Engine through explicit contracts
- [ ] Rate-limited notifications for meaningful source changes; review before publication
- [ ] Evaluation harness for incorrect links, stale claims, actor attribution and generated summaries

## Recommended first demonstration: npm ecosystem incident

1. Read the reviewed Shai-Hulud CISA source summary.
2. Show confirmed source report, unknown package version list, unknown technique links and source dates.
3. Market Map explains package registry, build/CI and application security categories without asserting which vendor would stop it.
4. Academy uses exactly the same source IDs and claim status in a learner-safe simulation; scenario is labeled synthetic.
5. Add package versions, MITRE mappings, controls and attack paths **only after** separate authoritative evidence review.

## Cross-repo contract boundaries

`security-intelligence-service` (future, independent): canonical data + read API.
`security-market-map`: taxonomy and relationships to security-category capabilities.
`byjoyaing-portfolio` Builder Academy: teaching interfaces and synthetic labs.
`detector-coverage-atlas`: verified detector source research.
`account-signal-engine`: separately qualified organization relevance and account identity.
`gtm-revenue-os`: strategic GTM interpretation without treating incidents as spending intent.
`joy-index`: private reflections, never a public data source.

Start a dedicated service repo only after two real consumers validate the schema and API needs. Do not introduce multiple bespoke incident stores.
