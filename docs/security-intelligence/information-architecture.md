# Information architecture and user journeys (v0)

**Status:** proposed public experience, not deployed pages. Security Intelligence owns canonical incident/technique vocabulary. Security Market Map owns presentation and market-category interpretation.

## Navigation

Top-level: **Explore / Incidents / Techniques & Weaknesses / Defenses & Controls / Security Market / Labs**. Each page has global search, breadcrumbs, record type, last review date, evidence status, source bibliography and contextual links.

- **Incident-first:** incident → dated facts → supported techniques → affected assets → defensive controls → security categories → learning lab
- **Technique-first:** ATT&CK tactic/technique/version → reviewed incidents → controls → technical explanation → lab
- **Package-first:** ecosystem/name/exact version → advisories or malicious publications → cited incident links → safe remediation
- **Control-first:** control → addressed behavior/weakness → evidence → technical capability → vendors with separately substantiated product claims

A graph is an optional visualization, never the only navigation. Provide a keyboard-accessible relationship list and mobile single-column fallback. Unknown links display “Not evaluated”, not “No relationship”.

## Canonical content templates

| Type | Required fields | Contextual panels |
| --- | --- | --- |
| Incident | stable ID, headline, type, source-backed summary, disclosed/occurred dates, review status | timeline, confirmed edges, unknowns, sources |
| Technique | namespace, external ID, dataset version, definition and primary source | supported incidents, defensive considerations |
| Actor/malware/campaign | canonical identity, qualified aliases, confidence/attribution source | observed events, disputed reports |
| Package | registry/ecosystem, normalized name, exact version | advisories, malicious publication reports, dependency links |
| Vulnerability | canonical ID and aliases, scope/affected versions, source | KEV/exploitation status distinguished from risk scoring |
| Control | scope, implementation assumptions, evidence type | behaviors addressed, product capabilities separately reviewed |
| Market category | definition, buyer, lifecycle, adjacent categories | technical evidence and illustrative products |

## Glossary governance

Maintain a versioned controlled vocabulary: breach ≠ intrusion ≠ campaign; malicious package ≠ vulnerable legitimate package; source report ≠ independently observed claim; tactic ≠ technique ≠ weakness ≠ mitigation; designed-to-detect ≠ measured detection effectiveness. All taxonomy changes require review and schema/consumer compatibility tests.

## Personas and views

- **Researcher:** source chronology, conflicts, attribution, provenance and entity identity
- **Developer:** package/dependency risks, affected versions, control implementation assumptions
- **Learner:** evidence-backed context + unambiguously synthetic scenarios
- **GTM analyst:** market-category mapping and cited public signals; business-impact and intent hypotheses separate

## Search contract (future)

Prefer exact ID > external alias > exact title > fuzzy matches. Search facets: entity kind, publication date, ecosystem, publisher, review status, framework and version. Never include unpublished records in counts, suggestions, autocomplete, graph expansion or vector results. A search index is rebuildable from canonical approved data.
