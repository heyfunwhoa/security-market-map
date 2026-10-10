-- Security Intelligence v0: proposed PostgreSQL schema.
-- Not applied to any live database. Apply only after environment/role review.
BEGIN;
CREATE SCHEMA IF NOT EXISTS security_intelligence;

CREATE TABLE security_intelligence.sources (
 id text PRIMARY KEY CHECK(id ~ '^source:[a-z0-9-]+$'),
 url text NOT NULL UNIQUE CHECK(url ~ '^https://'),
 publisher text NOT NULL CHECK(length(btrim(publisher)) > 0),
 rights_note text NOT NULL DEFAULT '',
 review_cadence text NOT NULL DEFAULT 'event_driven',
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE security_intelligence.source_snapshots (
 id uuid PRIMARY KEY,
 source_id text NOT NULL REFERENCES security_intelligence.sources(id),
 retrieved_at timestamptz NOT NULL,
 published_at timestamptz,
 sha256 text NOT NULL CHECK(sha256 ~ '^[a-f0-9]{64}$'),
 storage_ref text,
 UNIQUE(source_id, sha256)
);
CREATE TABLE security_intelligence.entities (
 id uuid PRIMARY KEY,
 kind text NOT NULL CHECK(kind IN ('incident','campaign','actor','malware','vulnerability','package','package_version','technique','weakness','control','product','capability','organization','asset')),
 external_key text NOT NULL,
 display_name text NOT NULL CHECK(length(btrim(display_name)) > 0),
 created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(kind, external_key),
 UNIQUE(id, kind)
);
CREATE TABLE security_intelligence.entity_aliases (
 id uuid PRIMARY KEY,
 entity_id uuid NOT NULL REFERENCES security_intelligence.entities(id),
 namespace text NOT NULL,
 alias text NOT NULL,
 source_id text REFERENCES security_intelligence.sources(id),
 resolution_status text NOT NULL CHECK(resolution_status IN ('candidate','approved','rejected')),
 decision_note text,
 reviewed_at timestamptz,
 created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(namespace, alias, entity_id)
);
CREATE TABLE security_intelligence.incidents (
 entity_id uuid PRIMARY KEY REFERENCES security_intelligence.entities(id),
 classification text NOT NULL CHECK(classification IN ('breach','supply_chain','malware_campaign','intrusion')),
 disclosed_on date NOT NULL,
 occurred_on date,
 summary text NOT NULL CHECK(length(btrim(summary)) > 0)
);
CREATE TABLE security_intelligence.claims (
 id uuid PRIMARY KEY,
 subject_id uuid NOT NULL REFERENCES security_intelligence.entities(id),
 predicate text NOT NULL,
 object_id uuid REFERENCES security_intelligence.entities(id),
 statement text NOT NULL CHECK(length(btrim(statement)) > 0),
 epistemic_status text NOT NULL CHECK(epistemic_status IN ('reported','observed','hypothesis','disputed','unknown')),
 confidence text NOT NULL CHECK(confidence IN ('high','medium','low')),
 review_status text NOT NULL CHECK(review_status IN ('imported','needs_review','approved','disputed','rejected','superseded','retracted')),
 valid_from timestamptz,
 valid_to timestamptz,
 recorded_at timestamptz NOT NULL DEFAULT now(),
 reviewed_at timestamptz,
 reviewer_id text,
 supersedes_claim_id uuid REFERENCES security_intelligence.claims(id),
 CHECK(valid_to IS NULL OR valid_from IS NOT NULL AND valid_to > valid_from),
 CHECK(review_status <> 'approved' OR (reviewed_at IS NOT NULL AND reviewer_id IS NOT NULL AND epistemic_status IN ('reported','observed')))
);
CREATE TABLE security_intelligence.claim_sources (
 claim_id uuid NOT NULL REFERENCES security_intelligence.claims(id),
 source_id text NOT NULL REFERENCES security_intelligence.sources(id),
 snapshot_id uuid REFERENCES security_intelligence.source_snapshots(id),
 PRIMARY KEY(claim_id, source_id)
);
CREATE TABLE security_intelligence.relationships (
 id uuid PRIMARY KEY,
 claim_id uuid NOT NULL UNIQUE REFERENCES security_intelligence.claims(id),
 subject_id uuid NOT NULL REFERENCES security_intelligence.entities(id),
 predicate text NOT NULL CHECK(predicate IN ('targets','affects','exploits','uses_malware','uses_technique','attributed_to','enabled_by','addresses','detects','mitigates','categorized_as','implements','derived_from','supersedes','related_to')),
 object_id uuid NOT NULL REFERENCES security_intelligence.entities(id),
 CHECK(subject_id <> object_id)
);
CREATE TABLE security_intelligence.ingestion_runs (
 id uuid PRIMARY KEY,
 source_id text NOT NULL REFERENCES security_intelligence.sources(id),
 idempotency_key text NOT NULL,
 state text NOT NULL CHECK(state IN ('started','succeeded','failed','quarantined')),
 started_at timestamptz NOT NULL DEFAULT now(),
 finished_at timestamptz,
 error_summary text,
 UNIQUE(source_id,idempotency_key)
);
CREATE TABLE security_intelligence.review_events (
 id uuid PRIMARY KEY,
 claim_id uuid NOT NULL REFERENCES security_intelligence.claims(id),
 action text NOT NULL CHECK(action IN ('approve','dispute','reject','retract','supersede','request_review')),
 actor_id text NOT NULL,
 happened_at timestamptz NOT NULL DEFAULT now(),
 reason text NOT NULL CHECK(length(btrim(reason)) > 0)
);
CREATE INDEX claims_subject_idx ON security_intelligence.claims(subject_id, review_status);
CREATE INDEX claims_object_idx ON security_intelligence.claims(object_id);
CREATE INDEX relationships_subject_idx ON security_intelligence.relationships(subject_id, predicate);
CREATE INDEX relationships_object_idx ON security_intelligence.relationships(object_id, predicate);

-- PUBLIC projection requires approved, provenance-backed claims. No raw sources/snapshots exposed.
-- App role grants must be explicitly configured by an operator; schema grants are NOT given here.
CREATE VIEW security_intelligence.published_claims AS
 SELECT c.id,c.subject_id,c.predicate,c.object_id,c.statement,c.epistemic_status,c.confidence,c.valid_from,c.valid_to,c.reviewed_at
 FROM security_intelligence.claims c
 WHERE c.review_status = 'approved' AND c.epistemic_status IN ('reported','observed')
 AND EXISTS (SELECT 1 FROM security_intelligence.claim_sources cs WHERE cs.claim_id = c.id);
CREATE VIEW security_intelligence.published_relationships AS
 SELECT r.id,r.subject_id,r.predicate,r.object_id,r.claim_id
 FROM security_intelligence.relationships r
 JOIN security_intelligence.published_claims c ON c.id = r.claim_id
 AND c.subject_id = r.subject_id AND c.object_id = r.object_id AND c.predicate = r.predicate;

REVOKE ALL ON SCHEMA security_intelligence FROM PUBLIC;
REVOKE ALL ON ALL TABLES IN SCHEMA security_intelligence FROM PUBLIC;
COMMIT;
