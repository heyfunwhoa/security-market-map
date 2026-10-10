# Operations, permissions and integrity gates

**Status:** implementation blueprint. No production service, backup job, role grants, or remote API is configured by this document.

## Trust and responsibility boundaries

Collector → staging/quarantine → canonical entities + source snapshots → human editorial review → approved projections → public read API → consumers. One modular service, not six separate microservices.

| Role | Allowed | Not allowed |
| --- | --- | --- |
| Collector | Fetch approved feeds, insert snapshots and imported/draft records | Approve or publish |
| Reviewer | Approve/dispute/retract claims, resolve aliases, document evidence and rationale | Change database roles/permissions |
| Administrator | Configure sources, roles, retention and policy | Bypass auditable review for published claims |
| Public reader | Read approved and safely redacted projections through API | Raw snapshots, unpublished entities, editor endpoints |

Enforce **database privileges as well as API authorization**. Views alone do not prevent privileged clients from querying tables. Apply RLS if multi-tenant/private workspaces are introduced. Disallow confidential company intelligence in the public intelligence service.

## Durable ingest protocol

1. Require a source allowlist, HTTPS, fetch budget, response-size cap, content type and source terms.
2. Save retrieval timestamp, exact source URL, hash, revision marker and permitted snapshot metadata.
3. Use an idempotency key `(source_id, external_id, revision_hash)`; repeated deliveries must produce no duplicate canonical entity or claim.
4. Resolve candidates without auto-merging; conflict/alias collisions go to quarantine.
5. Normalize into an **imported draft**, not approved public data.
6. Retries: bounded exponential backoff with jitter for transient failures; no retry for malformed documents/4xx except explicitly retryable status.
7. Persist a checkpoint after committing a batch; put permanent failures in a dead-letter/quarantine queue with source and reason.
8. Replay into drafts on source correction; require human review before publication and invalidate approved cached results after edits.

The pure TypeScript ingestion planner and tests exercise identity/revision classification. It is **not** a distributed worker, transactional queue, or durable scheduler.

## Enforceable invariants

- Every entity ID unique; aliases are scoped to source/namespace and require review before canonical merge.
- Every public claim must be approved, source-backed and attributable to a reviewer.
- Every published relationship must match its subject/object/predicate claim and pass kind compatibility.
- Versioned history distinguishes event validity from when the system knew a fact.
- Malicious publications, CVE advisories, exploit claims and real incidents are separate objects and relationships.
- Corrections/retractions invalidate dependent consumer views, caches, search indexes and exports.
- No stolen credentials, malware executables, sensitive victim details or private Joy Index content in canonical/public records.
- Third-party articles and RSS are **untrusted data**, never instructions to a tool-using agent.

## Release and recovery readiness

P0 before production: provision isolated database; validate ordered migrations and restore path; least-privilege app roles; public projection queries; schema/contract tests; independent integration smoke tests; no-secret review; source licensing check.

P1: backup schedule with tested restoration; documented RPO/RTO objectives; deploy health endpoint; API error-rate/latency budget; job queue depth/failure monitoring; security incident playbook; documented correction/takedown owner.

No SLA or RPO/RTO numeric target is invented before deployment topology and cost are known. All schema alterations use forward-compatible staged migrations and a tested recovery plan; do not assume SQL `DOWN` is safely reversible after data writes.

## Observability and evaluation

- Source retrieval success and lag, invalid/quarantined rate, retry count, source drift
- Duplicate identities and confirmed false merges, conflicts awaiting editorial review
- Unsupported/dangling relationship rate, ratio of public claims with primary citations
- Last-reviewed age and correction propagation delay
- API p95 latency, non-2xx rate, authorization failures, consumer schema mismatches
- Regression dataset for adverse examples: syndicated reporting, malicious-package vs vulnerable-package confusion, uncertain actor attribution, disputed facts and retracted claims

**Publication target:** zero unreviewed public claims; zero orphan graph edges. These are design objectives, not measured production results.

## AI provenance

AI-generated drafts record source IDs, model/prompt version, execution timestamp and human review result. Model output is never an independent source. Prevent instructions embedded in collected pages from controlling ingestion or publication operations.
