# Security Intelligence read API — proposed contract v0

**Contract only. Nothing below is deployed.** Version APIs at `/api/v1/security-intelligence` on a future shared service, not a private/internal API in the public portfolio.

## Routes

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/incidents?kind=supply_chain&from=2025-01-01&limit=20&cursor=...` | List reviewed incident summaries with source counts and next cursor |
| GET | `/incidents/{incidentId}` | Incident facts, chronology, claims, sources and editorial state |
| GET | `/entities/{kind}/{id}/relationships?limit=25` | Evidence-carrying edges; no implied attribution |
| GET | `/techniques/{attackId}?domain=enterprise` | Versioned reference to imported MITRE ATT&CK object |
| GET | `/packages?ecosystem=npm&name=chalk` | Package intelligence, with advisory/version caveats |
| GET | `/sources/{sourceId}` | Publisher, canonical URL, retrieved/reviewed dates and rights note |

Never expose raw snapshots or unreviewed draft claims through public endpoints.

### Incidents list response (illustrative **contract**, not live response)

```json
{
  "schemaVersion": "1",
  "data": [{
    "id": "incident:cisa-shai-hulud-2025",
    "title": "Shai-Hulud npm ecosystem compromise",
    "kind": "supply_chain",
    "disclosedOn": "2025-09-23",
    "occurredOn": null,
    "summary": "CISA issued a public alert about an npm supply-chain compromise.",
    "epistemicStatus": "reported",
    "reviewStatus": "seed_reviewed",
    "sourceIds": ["source:cisa-shai-hulud-alert"]
  }],
  "page": { "nextCursor": null }
}
```

### Endpoint safety and compatibility

- IDs are stable strings and URL-safe, with accepted `kind` enum values and bounded `limit` (default 20, max 100).
- Versioned schemas, date filters ISO 8601, UTC retrieval timestamps and documented null semantics.
- Public queries return only `seed_reviewed`/`approved` records and accompanying provenance; enforce this server-side.
- ETags/cache headers for safe immutable versions; corrections should expose revised review timestamp.
- `400` invalid query; `404` unknown/not published; `429` rate-limited; `503` upstream unavailable.
- Never expose customer account notes, Joy Index data, private source URLs or credentials.
- Consumer adapters should gracefully handle missing fields, deleted records, stale references and version changes.

## Consumer adapters

**Security Market Map:** `getIncidentEvidenceByCategory(categoryId)` maps known incident classifications/techniques to linked explanations, but does not claim that any vendor prevented an incident.

**Builder Academy:** `getSafeCaseStudy(incidentId)` converts reviewed facts into a learner-safe case narrative. Simulated attack steps and questions must be clearly labeled **synthetic**, not factual claims of the event.

**Other consumers:** Atlas uses `getRelatedDetectionResearch(incidentId)` only after independently validated detector links; Account Signal Engine maps an event to a resolved organization using separate consent/eligibility gates and never treats it as verified buying intent.

Do not allow these adapters to import the source seed JSON in production. They will call the versioned service when it exists.
