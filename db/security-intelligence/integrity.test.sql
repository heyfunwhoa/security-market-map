-- Run only against an isolated throwaway PostgreSQL database.
\set ON_ERROR_STOP on
BEGIN;
INSERT INTO security_intelligence.sources(id,url,publisher)
 VALUES ('source:test','https://example.org/advisory','Test publisher');
INSERT INTO security_intelligence.entities(id,kind,external_key,display_name) VALUES
 ('00000000-0000-4000-8000-000000000001','incident','test:incident','Example incident'),
 ('00000000-0000-4000-8000-000000000002','technique','test:technique','Example technique'),
 ('00000000-0000-4000-8000-000000000003','actor','test:actor','Example actor'),
 ('00000000-0000-4000-8000-000000000004','category','test:category','Example category');
INSERT INTO security_intelligence.claims(id,subject_id,predicate,object_id,statement,epistemic_status,confidence,review_status)
 VALUES ('00000000-0000-4000-8000-000000000010','00000000-0000-4000-8000-000000000001','uses_technique','00000000-0000-4000-8000-000000000002','Example source reports technique','reported','medium','needs_review');
INSERT INTO security_intelligence.claim_sources(claim_id,source_id)
 VALUES ('00000000-0000-4000-8000-000000000010','source:test');
INSERT INTO security_intelligence.relationships(id,claim_id,subject_id,predicate,object_id)
 VALUES ('00000000-0000-4000-8000-000000000020','00000000-0000-4000-8000-000000000010','00000000-0000-4000-8000-000000000001','uses_technique','00000000-0000-4000-8000-000000000002');

DO $$ BEGIN
 IF EXISTS (SELECT 1 FROM security_intelligence.published_claims) THEN
  RAISE EXCEPTION 'Unreviewed claim leaked into public view';
 END IF;
END $$;

DO $$ BEGIN
 BEGIN
  INSERT INTO security_intelligence.relationships(id,claim_id,subject_id,predicate,object_id)
    VALUES ('00000000-0000-4000-8000-000000000021','00000000-0000-4000-8000-000000000010','00000000-0000-4000-8000-000000000001','attributed_to','00000000-0000-4000-8000-000000000003');
  RAISE EXCEPTION 'Incorrect relationship was accepted';
 EXCEPTION WHEN raise_exception THEN
  IF SQLERRM='Incorrect relationship was accepted' THEN RAISE; END IF;
 END;
END $$;

UPDATE security_intelligence.claims
 SET review_status='approved',reviewer_id='test-reviewer',reviewed_at=now()
 WHERE id='00000000-0000-4000-8000-000000000010';
DO $$ BEGIN
 IF (SELECT count(*) FROM security_intelligence.published_claims) <> 1 OR
    (SELECT count(*) FROM security_intelligence.published_relationships) <> 1 THEN
   RAISE EXCEPTION 'Approved claim and relation not published together';
 END IF;
END $$;
UPDATE security_intelligence.claims SET review_status='retracted'
 WHERE id='00000000-0000-4000-8000-000000000010';
DO $$ BEGIN
 IF EXISTS(SELECT 1 FROM security_intelligence.published_relationships) THEN
   RAISE EXCEPTION 'Retracted relationship still published';
 END IF;
END $$;
ROLLBACK;
