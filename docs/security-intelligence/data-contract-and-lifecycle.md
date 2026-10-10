# Content integrity, retention and portability

## Versioned schema responsibilities

A canonical PostgreSQL database owns `sources`, `source_snapshots`, `entities`, `entity_aliases`, `claims`, `claim_sources`, `relationships`, `review_events` and `ingestion_runs`. Consumers only use a documented read contract. Consumer-specific annotations (Market Map categories, Academy synthetic exercises, GTM relevance) remain outside core claims.

Published data must carry `schemaVersion`, stable IDs, reviewed timestamps, source IDs, epistemic label, relation evidence and field-level null semantics. An unknown occurrence date must stay `null`. Consumers must not fabricate defaults.

## Correction and publication lifecycle

`imported → needs_review → approved` with explicit dispute, rejection, supersession and retraction. Revisions append claims, not overwrite history. Approval captures reviewer and time; API serves only current approved and sourced claims. Retraction publishes an invalidation signal and causes a consumer refresh; if a consumer is unreachable it should use a bounded TTL and display source age.

Imported source reports and their summaries are not automatically confirmed incident facts. The seed records are educational examples of **reported** incidents.

## Privacy, rights, and tenant boundaries

Classify content as public/restricted/private; public API returns only approved and cleared content. Do not store stolen data, keys, exploit payloads or private victim details. Source rights metadata differentiates retrieve/store/transform/republish permissions. Keep source excerpts brief and justified; do not blindly copy complete third-party publications.

If a private organizational research workspace is added, store it separately and prohibit combining confidential entities with public search/graph results without an explicit access policy and security review.

## Data portability

Use stable canonical IDs and external IDs with scheme namespaces; export approved data as versioned JSON, source manifests and CSV when appropriate. Preserve source attribution and licensing metadata. Include an alias/deprecation map and migration notes for breaking changes. Search, graphs, vectors, and cached consumer projections are rebuildable from approved source records.

## Adoption checklist

1. Apply SQL migrations in fresh PostgreSQL and verify constraints using negative/positive DB tests.
2. Provision collector/editor/reader roles and test forbidden reads and writes.
3. Demonstrate idempotent import and source correction without altering published data prematurely.
4. Provide read API contract tests against Market Map and Academy.
5. Exercise retract → invalidate → refresh through both consumers.
6. Validate restoration and deployment smoke checks.
7. Sign off copyright/source terms and publication policy.
