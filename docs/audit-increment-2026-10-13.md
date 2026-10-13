# Comparison evidence audit increment

Priority 1: an unreviewed denial now stays unverified instead of asserting not supported. Existing reviewed evidence, conflict and unknown semantics remain intact.

Priority 2: source freshness is visible beside comparison evidence. Reuses the catalog source registry and existing volatility windows at the comparison date. Missing registry entries are labeled freshness unavailable; stale sources are marked for refresh. Reuses native disclosures and existing tokens, with no new dependencies or motion.

Verification: all 64 tests passed, including unreviewed denial and stale/missing/current source cases. `next typegen`, typecheck, lint and production build passed. Fresh checkouts need generated Next route types before standalone typecheck. Browser responsive, keyboard/focus and reduced-motion checks remain pending after browser installation failed.

Next priority: protect and test the research review/publication boundary before live publication. The existing research review POST route still needs an authorization review; this PR does not make publication safe or activate a live research pipeline. No merge or deployment performed.
