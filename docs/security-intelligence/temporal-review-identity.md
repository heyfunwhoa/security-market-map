# Time, entity identity, corrections, and editorial governance

**Design-only policy** — this does not implement scheduled collection, a production review queue or access controls.

## Time semantics

An incident may have several independent dates:
- `occurredOn`: independently supported event date or null
- `firstObservedOn`: first reported detection; null if unknown
- `disclosedOn`: public notice or source report date
- `sourcePublishedOn`: date attached to the cited source
- `retrievedAt`: actual collection timestamp (UTC), never fabricated
- `validFrom/validTo`: period an edge or state is asserted to apply
- `recordedAt`: when the system stored the claim (transaction time)
- `reviewedAt`: editorial check timestamp
- `supersededAt`: when a claim was replaced, without deleting its history

Store both **valid time** and **system/recorded time** for significant claims (bitemporal history). Support `asOf=...` read queries for historical research, but enforce publication visibility at every historical state. Null means unknown; never default occurred date to disclosed date.

## Entity resolution

Use canonical internal UUIDs and source-qualified external IDs. Record `aliases`, `aliasSourceId`, `relationship`, `resolutionStatus` and merge decisions. Candidate matches are not merges.

Examples: `npm:@scope/package` plus exact version; GHSA IDs versus CVE IDs; ATT&CK technique external ID and STIX ID; organization legal name versus brand. Maintain split/undo history for mistaken merges and redirect aliases only after review. Avoid auto-joining by fuzzy name alone.

## Editorial lifecycle

`imported → needs_review → approved`, with side states `disputed`, `rejected`, `superseded`, `retracted`.

1. Importer stores a source snapshot/checksum and emits draft claim.
2. Reviewer checks authoritative source, date, scope, terminology, attribution, rights and competing accounts.
3. Reviewer approves with identity and evidence references, or marks conflicting/unknown with rationale.
4. Corrections create a new version; original snapshot and claim remain for audit, and publishable views point to current approved versions.
5. Retractions stop public display and invalidate cached results; preserve access-restricted audit trail where lawful.
6. Scheduled or event-driven re-review marks stale claims without silently rewriting them.

**Approval gate:** Public API must never return imported, needs_review, disputed, rejected or retracted records as verified facts. Hypothetical/synthetic exercises must be explicitly labeled and kept in the consumer's own namespace.

## Sourcing and rights

Keep URLs, publisher, publication/retrieval timestamps, relevant short excerpts when permitted, licenses/terms, and review decisions. Do not ingest copyrighted full texts indiscriminately. Don't redistribute malicious code, secret values, leaked credentials, or personal data about victims. Treat retrieved pages as hostile/untrusted inputs for any model or automation.

Maintain correction requests, takedown contact, retention schedule, deletion review, ownership and audit logging **before** enabling public automated collection.

## Suggested operational metrics (not measured yet)

- Ingestion freshness, source fetch success, parse errors, repeat-import idempotency
- Orphan relationship count (target zero), unreviewed public fact count (target zero)
- Alias collision and incorrect-merge rate, number of disputes and time to resolution
- Percentage of public claims with live primary source links, staleness and re-review backlog
- False mapping rate in sampled ATT&CK/control relationships
- API latency/error rate and consumer contract compatibility

Monthly editorial audits; event-driven reviews for source corrections; automate notification only after reviewers and service ownership are assigned.
