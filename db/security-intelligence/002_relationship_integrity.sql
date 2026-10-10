-- Integrity hardening, applied after 001_foundation.sql. Review on isolated PostgreSQL first.
BEGIN;
CREATE OR REPLACE FUNCTION security_intelligence.validate_claim_relationship()
RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE c record; s_kind text; o_kind text;
BEGIN
 SELECT * INTO c FROM security_intelligence.claims WHERE id=NEW.claim_id;
 IF NOT FOUND OR c.subject_id <> NEW.subject_id OR c.object_id IS DISTINCT FROM NEW.object_id OR c.predicate <> NEW.predicate THEN
   RAISE EXCEPTION 'Relationship must exactly match its supporting claim';
 END IF;
 SELECT kind INTO s_kind FROM security_intelligence.entities WHERE id=NEW.subject_id;
 SELECT kind INTO o_kind FROM security_intelligence.entities WHERE id=NEW.object_id;
 IF (NEW.predicate='uses_technique' AND (s_kind NOT IN ('incident','campaign') OR o_kind <> 'technique'))
 OR (NEW.predicate='attributed_to' AND (s_kind NOT IN ('incident','campaign') OR o_kind <> 'actor'))
 OR (NEW.predicate='uses_malware' AND (s_kind NOT IN ('incident','campaign') OR o_kind <> 'malware'))
 OR (NEW.predicate='exploits' AND (s_kind NOT IN ('incident','campaign') OR o_kind <> 'vulnerability'))
 OR (NEW.predicate IN ('addresses','mitigates') AND (s_kind <> 'control' OR o_kind NOT IN ('technique','weakness')))
 OR (NEW.predicate='implements' AND (s_kind <> 'product' OR o_kind <> 'capability'))
 OR (NEW.predicate='categorized_as' AND (s_kind <> 'capability' OR o_kind <> 'category')) THEN
  RAISE EXCEPTION 'Invalid subject/object kinds for %', NEW.predicate;
 END IF;
 RETURN NEW;
END;$$;
CREATE TRIGGER relationship_type_integrity
 BEFORE INSERT OR UPDATE ON security_intelligence.relationships
 FOR EACH ROW EXECUTE FUNCTION security_intelligence.validate_claim_relationship();

CREATE OR REPLACE FUNCTION security_intelligence.validate_snapshot_owner()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
 IF NEW.snapshot_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM security_intelligence.source_snapshots s
    WHERE s.id=NEW.snapshot_id AND s.source_id=NEW.source_id
 ) THEN
   RAISE EXCEPTION 'Snapshot source must match claim source';
 END IF;
 RETURN NEW;
END;$$;
CREATE TRIGGER claim_snapshot_source_integrity
 BEFORE INSERT OR UPDATE ON security_intelligence.claim_sources
 FOR EACH ROW EXECUTE FUNCTION security_intelligence.validate_snapshot_owner();

-- Prevent stale relation projections when the underlying claim mutates.
CREATE OR REPLACE FUNCTION security_intelligence.prevent_linked_claim_mutation()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
 IF EXISTS(SELECT 1 FROM security_intelligence.relationships r WHERE r.claim_id=OLD.id)
 AND (NEW.subject_id IS DISTINCT FROM OLD.subject_id
   OR NEW.object_id IS DISTINCT FROM OLD.object_id
   OR NEW.predicate IS DISTINCT FROM OLD.predicate) THEN
   RAISE EXCEPTION 'Immutable linked claim identity; supersede with a new claim instead';
 END IF;
 RETURN NEW;
END;$$;
CREATE TRIGGER prevent_claim_link_changes
 BEFORE UPDATE ON security_intelligence.claims
 FOR EACH ROW EXECUTE FUNCTION security_intelligence.prevent_linked_claim_mutation();
COMMIT;
