# Incident classification and evidence-bound ATT&CK mapping (proposal)

**Status:** documentation milestone for human review only. No live classification engine, feed activation, canonical service, migration, or published incident claims. Reuse [architecture](architecture.md), [source registry](source-registry.md), [read API contract](api-contract.md), [relationship vocabulary](relationship-vocabulary.md) and [expansion backlog](expansion-backlog.md). Security Market Map is the review venue, not the long-term incident database owner.

## Purpose and boundaries

A publicly reported security incident may be surfaced by the existing Account Signal Engine RSS research collection **Breaches & Threat Intelligence** as a discovery candidate. A Reddit post or headline is a lead, not proof. The proposed shared Security Intelligence model distinguishes (1) incident type and scope, (2) source-supported adversary behavior, (3) defensive countermeasures, (4) weaknesses/exploited vulnerabilities and (5) buyer-relevant interpretation.

No new registry, database, collector, product-capability claim or separate PRD is needed. Keep candidate research out of the published Market Map catalog until independent review. Do not infer a customer's compromise, buying intent or a vendor's protective efficacy from a public incident.

## Framework selection

| Framework | Intended use | Boundary |
| --- | --- | --- |
| [MITRE ATT&CK Enterprise](https://attack.mitre.org/resources/attack-data-and-tools/) | Versioned adversary tactic, technique and subtechnique mapping, with attack domain, external ID and STIX ID | A technique requires behavioral evidence; no stage inferred just because the incident was a breach |
| [VERIS](https://verisframework.org/) | Incident structure, actor/action/asset/attribute and outcome where reported | Unknown fields remain unknown; use schema version; not an automatic technique map |
| [MITRE D3FEND](https://d3fend.mitre.org/) | Defensive countermeasure **candidates**, with rationale | Do not assert a specific product would have prevented the event |
| [CWE](https://cwe.mitre.org/) | Identified software weakness | Only where an actual weakness is independently evidenced |
| [CAPEC](https://capec.mitre.org/) | General attack patterns | Optional explanatory relationship, not a substitute for ATT&CK observation |
| CVE/CISA KEV, GHSA/OSV/NVD | Vulnerability identity and exploitation status | CVE existence != known exploitation; strict ID and affected-version joins |

MITRE CTID [VERIS-to-ATT&CK mapping methodology](https://ctid.mitre.org/mappings/about/methodology/veris-methodology/) is a candidate pivot, not proof an incident used every associated technique.

## Classification candidate contract (illustrative, not deployed)

```json
{
  "incidentId": "incident:example",
  "incidentKind": "supply_chain",
  "reviewStatus": "candidate",
  "veris": {
    "schemaVersion": null,
    "actor": "unknown",
    "action": "unknown",
    "asset": "unknown",
    "attribute": "unknown",
    "sourceClaimIds": []
  },
  "attackMappings": [
    {
      "domain": "enterprise-attack",
      "attackId": null,
      "stixId": null,
      "attackDatasetVersion": null,
      "mappingStatus": "not_evaluated",
      "evidenceStatus": "unknown",
      "rationale": null,
      "sourceClaimIds": [],
      "reviewer": null,
      "reviewedAt": null
    }
  ],
  "defensiveMappings": [],
  "weaknessMappings": [],
  "unresolvedQuestions": []
}
```

**Status semantics:** `not_evaluated`, `candidate`, `reviewed_supported`, `disputed`, `rejected`. `rejected` means an individual candidate was reviewed and excluded; it does not imply an incident lacks that behavior. Mapping confidence is separate from source epistemic status (`reported`, `observed`, `hypothesis`, `disputed`, `unknown`). Never put a null ID in a published reviewed mapping; illustrative null represents an unclassified placeholder, not a real ATT&CK link. Maintain original source publication date, retrieval/review date and historical ATT&CK dataset version. Preserve corrections.

## Review workflow

1. Discover via registered feeds or manual public URL; record publisher, canonical URL, discovery timestamp and usage rights. Quarantine third-party text against prompt injection.
2. De-duplicate by canonical incident identity and evidence-backed commonality, not shared victim names alone. Record reporting changes and conflicting claims.
3. VERIS incident classification: fill only supported values; store `unknown` or nullable values otherwise.
4. ATT&CK classifier suggests **candidate** Enterprise techniques from explicit narrative behaviors; resolve against versioned official STIX and distinguish technique evidence from plausible explanatory hypotheses. Require source claim IDs, exact quoted/paraphrased evidence pointer, rationale and source type.
5. Optional D3FEND defense candidates; CWE/CAPEC/CVE only when applicable. Defense recommendations remain contextual, not prevention guarantees.
6. Human review approves or rejects each edge; publish only reviewed links and the reviewer's disposition. API returns missing evidence as `Not evaluated`; no implied actor attribution or stage completion.
7. Downstream GTM Revenue OS and Account Signal Engine read only reviewed public claims; buyer/persona use cases and outreach require separate qualified context.

## Initial manual fixture and QA

Use a **synthetic** third-party SaaS identity compromise example (not a claim about the linked Reddit post). Scenario: report alleges unauthorized application identity access; method of initial credential acquisition is unknown. VERIS actor/action/asset/attribute are initially unknown pending source review. Candidate ATT&CK mappings should stay `not_evaluated` until behavior-specific authoritative evidence is linked. No verified exploit, exfiltration, privilege escalation, threat actor or compromised customer may be inferred.

Fixture evaluation cases:
- Report states incident happened but no technique detail -> zero published ATT&CK mappings.
- Source reports use of a specific credential mechanism -> candidate mapping only, with official ID verified against versioned STIX; publication blocked pending reviewer.
- Two sources disagree -> retain both, mark disputed and block publication of that edge.
- A Reddit post links to a report -> preserve as discovery context; primary/original or attributable incident report required for published factual claim.
- D3FEND inferred via ATT&CK -> label as potential countermeasure, not known deployed or effective.
- Correction retracts an assertion -> revised history and public link removal without deleting provenance.

## Acceptance and next milestone

- [x] Define complementary framework roles, evidence states, reviewer gate, fixture cases and cross-project boundaries (documentation only).
- [ ] Owner reviews mapping contract against existing typed fixture and relationship model.
- [ ] Add fixture-only tests for unknown/non-mappable/disputed behavior and cross-consumer read shape; no live classification.
- [ ] Verify a real example against original/authoritative incident sources, without importing unsafe data.
- [ ] Obtain separate approvals before live RSS, automated classifier, paid APIs, database changes, public UI, merge or deployment.

**Sources:** [ATT&CK data and tools](https://attack.mitre.org/resources/attack-data-and-tools/); [VERIS](https://verisframework.org/); [CTID mapping methodology](https://ctid.mitre.org/mappings/about/methodology/veris-methodology/); [D3FEND FAQ](https://d3fend.mitre.org/faq/); [CWE](https://cwe.mitre.org/); [CAPEC](https://capec.mitre.org/).
