# Shared Security Intelligence — foundation proposal (v0)

**Status:** design + curated seed only; **not** a deployed database, ingestion service, API, or Market Map UI feature. This PR lives in Security Market Map as a review venue, **not** as a decision that Market Map owns intelligence long term.

## Ownership and boundaries

Create one independently owned **Security Intelligence service** after this contract is validated with two consumers. It owns normalized incident, malware, actor, vulnerability, package, ATT&CK-technique, relationship, source and claim records. A consumer never writes the canonical database directly.

- **Security Market Map:** enriches security-category explanations using sourced incidents and controls; owns market categories and vendor comparisons, not incidents.
- **Builder Academy / labs:** receives public, reviewed evidence and builds synthetic teaching exercises; no live malware, exploits or customer data.
- **Detector Coverage Atlas:** optional later linkage from incident behaviors to *documented* detectors, not claims of prevention.
- **Account Signal Engine:** optional downstream company-event relevance; never convert public breaches to buying intent without separate judgment and identity resolution.
- **Research Command Center, competitive intelligence, GTM Revenue OS:** optional later read consumers, each with its own interpretation layer.
- **Joy Index:** private progress/reflections, completely outside public ingestion and publishing.

## Data movement

```text
Official primary sources + public advisories + reviewed security research
          |
          v
Source registry -> collection adapters (later) -> immutable source snapshot
          |
          v
Normalized entities + source-backed claims + explicit relationships
          |
          v
Editorial review, provenance/conflicts and lifecycle status
          |
          v
Read-only versioned API -> Market Map | Academy Labs | Atlas | Account Signals | other consumers
```

Use **PostgreSQL first**, with relationship tables and JSONB for source-specific metadata; a graph database is not justified by this initial scope. Later jobs may use Inngest, but automation is not a prerequisite for a reliable seed. Raw material stays distinct from derived claims and only permitted excerpts/metadata may be persisted.

## Canonical entity model (proposal)

- `Source`: stable ID, official publisher, URL, source type, collection method, license/usage notes, review cadence and publication/retrieval timestamps.
- `SourceSnapshot`: source ID, retrieval timestamp, checksum, published date, revision marker and storage pointer; do not store credentials, raw leaked material or copyrighted full articles.
- `Incident`: ID, title, classification (breach / supply_chain / malware_campaign / intrusion), disclosed date and nullable occurrence date, succinct neutral summary, review state and affected ecosystems.
- `ThreatActor`: alias set and attribution statements, **never** treat a campaign label as a verified person/group identity by default.
- `MalwareFamily`: normalized family/aliases, behavior; never store payloads or executable samples.
- `Vulnerability`: canonical CVE/GHSA/OSV aliases, affected-package statements and reported exploitation status; distinguish known-vulnerable from known-exploited.
- `Package`: ecosystem + normalized name + optional PURL, affected releases and publisher information from advisories.
- `Technique`: ATT&CK domain + ATT&CK external ID + STIX object ID + dataset version; import from MITRE STIX 2.1 rather than manually paraphrasing the full matrix.
- `Claim`: subject, predicate, object/statement, one or more source IDs, as-of date, `observed | reported | hypothesis | disputed | unknown`, reviewer, review timestamp.
- `Relationship`: subject/entity ID, relation type, object/entity ID, referenced claim IDs; graph edges must never imply stronger evidence than the underlying claim.

Prefer **external stable IDs plus internal UUIDs**. Do not collapse *same event*, *same actor*, *same vulnerability*, or *same package name* without review. Package identity requires ecosystem; package versions must be explicit when determining affected status.

## Initial relational tables (proposal)

```text
sources(id PK, url UNIQUE, publisher, type, cadence, license_note)
source_snapshots(id PK, source_id FK, retrieved_at, published_at, content_sha256, storage_ref)
entities(id PK, kind, external_key, display_name, created_at, UNIQUE(kind,external_key))
incidents(entity_id PK/FK, category, disclosed_on, occurred_on NULL, summary, review_status)
packages(entity_id PK/FK, ecosystem, package_name, purl NULL)
techniques(entity_id PK/FK, attack_domain, attack_id, stix_id, dataset_version)
claims(id PK, subject_id FK, predicate, object_id FK NULL, statement, epistemic_status, as_of, reviewed_at NULL)
claim_sources(claim_id FK, source_id FK, snapshot_id FK NULL, PRIMARY KEY(claim_id,source_id))
relationships(id PK, from_id FK, type, to_id FK, claim_id FK, UNIQUE(from_id,type,to_id,claim_id))
ingestion_runs(id PK, source_id FK, started_at, completed_at, state, error_summary NULL)
```

Define enforced enums/checks, strict source foreign keys and privacy/publishing policies before applying real migrations. Treat `occurred_on = NULL` as **unknown**, not the disclosure date. A claim with no evidence may only be a clearly identified hypothetical learning prompt; never return it as a confirmed incident fact.

## Quality and security gates

1. Every published factual claim has a reviewed source and publication/retrieval context; distinguish **source report** from independently confirmed event detail.
2. Keep raw source snapshots versioned, preserve revisions and do not overwrite previously recorded provenance.
3. Queue conflicting or stale claims for review; retain counterclaims and review history.
4. Validate schemas, IDs, links, dates, and all claim-source relationships; test repeat ingestion for idempotence and conflicts.
5. Use least-privilege API keys, read-only public endpoints, rate limits, input validation, pagination, caching and separate authenticated editor endpoints.
6. No live credentials, malware binaries, stolen data, unpublished breach reports or sensitive victims' data.
7. Treat MITRE data version, licenses, source terms and rights to republish as explicit metadata.
8. Mitigate injected instructions in third-party pages and RSS text. Retrieval content is data, not agent instructions.
9. Deletion/correction workflow and editorial owner are required before production release.

## MVP acceptance criteria

- Two evidence-linked public incidents in `data/security-intelligence/incidents.seed.json` can be loaded and validated.
- All seed incident sources exist in the source registry; every source URL uses HTTPS.
- Consumer v0 API shapes are defined without implementing live endpoints.
- Market Map and Academy integration sketches are testable without copying records into each product.
- Add a future independent service/repository **only when** two consumers need the same API in practice.

## Decisions still open

- Owner/maintainer, publication policy, storage account and deployment home for shared service.
- Whether to use Neon or existing Supabase; keep both supported by standard PostgreSQL schema until deployment.
- Retention policy for raw snippets, especially third-party publications and corrections.
- How to map advisory aliases/CVE records and multi-package incidents without inventing relationships.
