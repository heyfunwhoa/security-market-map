# Cross-project credential evidence contract — v1 draft

**Consumers:** Builder Academy (educational), Detector Coverage Atlas (scanner source facts), Security Market Map (sourced market claims). **Status:** proposed interoperability contract, **not an active integration**. Do not introduce an independent production database, API, scraper, or LLM secret ingestion merely for this.

## Invariants

1. Preserve **Detect → Identify → Verify → Assess blast radius → Investigate → Remediate**. Containment may be urgent and run in parallel; never wait for optional verification to revoke obviously exposed sensitive material.
2. **No actual secret values, raw tokens, private keys, personal identifiers, account IDs, or confidential source code** cross repository boundaries. Do not transmit them to LLMs or analytics. Use synthetic fixtures and public documentation.
3. Separate *scanner implementation facts* from *credential instance findings* and *vendor capability claims*: these are three different object kinds.
4. Unknown remains **Unknown**. Detection is not validity; a verifier function is not proof every token is verifiable; theoretical blast radius is not observed exploitation; vendor marketing is not independently verified.
5. Carry source provenance, observed/reviewed date, method, confidence/verification state, and limitations. Prefer source IDs and URLs to copied claims.
6. Scope sources by authorization and confidentiality before display. No silent promotions from private to public.

## Shared concept IDs

Use stable, namespaced keys, not inferred vendor matches:

| ID | Meaning | Owner of source-of-truth |
| --- | --- | --- |
| `stage:detect` | Pattern/signature/entropy/context scan | Builder Academy curriculum |
| `stage:identify` | Credential type/provider and workload owner correlation | Builder Academy curriculum |
| `stage:verify` | Safe/authorized credential validity checks | Builder Academy curriculum |
| `stage:assess` | Effective access and potential blast radius | Builder Academy curriculum |
| `stage:investigate` | Observed usage and incident evidence | Builder Academy curriculum |
| `stage:remediate` | Revoke, rotate, fix and validate recovery | Builder Academy curriculum |
| `concept:secret-credential` | Authentication material, not an identity | Builder Academy glossary |
| `concept:non-human-identity` | Service/workload/agent identity and lifecycle | Builder Academy glossary |
| `concept:effective-permissions` | Access permitted by current policy | Builder Academy glossary |
| `domain:identity` | Identity security market area | Security Market Map taxonomy |
| `domain:appsec` | AppSec market area | Security Market Map taxonomy |

**Cross-repo references should be versioned, optional and resolvable.** Never assume a category ID matches a detector folder ID.

## Logical record schema (no dependency)

```ts
type EvidenceReferenceV1 = {
  schemaVersion: "1";
  id: string;                     // stable public-safe slug
  kind: "scanner_fact" | "market_claim" | "educational_example";
  stageId: "stage:detect" | "stage:identify" | "stage:verify" |
           "stage:assess" | "stage:investigate" | "stage:remediate";
  conceptIds: string[];
  subjectRef: string;             // e.g. public scanner detector id, market category id
  source: {
    repository: "detector-coverage-atlas" | "security-market-map" | "byjoyaing-portfolio";
    sourceId: string;
    url: string;                  // public authoritative URL, never credential URL
    commitSha?: string;           // required for code-derived scanner facts
    observedAt: string;           // ISO date; do not assume up-to-date
    reviewedAt?: string;
  };
  method: string;                 // regex parser, Go AST, vendor source review, synthetic simulation...
  evidenceStatus: "code_observed" | "vendor_published" |
                  "independently_checked" | "synthetic" | "unknown" | "conflicting";
  claim: string;                  // public-safe statement, not raw secret
  limitations: string[];
  publicSafe: true;               // export rejects absent or false
};
```

## Producer adapters: no new backend

- **Detector Atlas** retains its SHA-pinned `data/snapshots/trufflehog.json`. Its optional **static, public-safe projection** emits only source-supported detector metadata; no credential findings. A `Verify()` implementation fact means *verification code exists*, not that a leaked credential was tested.
- **Security Market Map** retains its `lib/data/sources.ts`, `claims.ts`, Zod verification status and freshness model. Its optional projection emits sourced market claims, *not inferred feature parity*. It must keep vendor marketing labeled vendor-published and Unknown for unevidenced cells.
- **Builder Academy** retains purely synthetic labs. It may show canonical public links to producer facts, with source dates. No automatic cross-project fetch is necessary until the contracts are tested.

## Acceptance checks for a future exporter

- Reject secret-looking values and any non-public source; reject raw key-bearing fields by allowlist.
- Reject missing source ID, method, observed date, limitations, schema version or code SHA for scanner facts.
- Validate stage IDs and public-safe concept IDs.
- Never convert `unknown` to true/false or `vendor_published` to independently checked.
- Pin producer schema version and SHA, keep last known-good snapshot on failure.
- Surface unresolved/stale/conflicting evidence as such in the UI.
- Separate source content and citations from hypotheses. Support takedowns and provenance corrections.

## Follow-up

Review schema in each repo; implement minimal deterministic validation fixtures first. Only after tests pass, consider a static JSON producer artifact in one repo, and a read-only consumer in the portfolio. No live verification, secrets export, public identity inventory, or AI ingestion.

## Market Map mapping

`Source` → source ID, canonical URL, publisher and retrieved date. `Claim` → claim ID, source ID, verification status and confidence. Do not replace existing Zod schemas or collapse provenance into a single generic boolean. Map only researched claims with approved public URLs.
