# Relationship vocabulary and evidence rules (v0 proposal)

Relationships are **directed, typed, temporal, and supported by a claim**. Not every graph connection means causation.

| Predicate | Subject → object | Minimum evidentiary rule | What it does NOT imply |
| --- | --- | --- | --- |
| `targets` | campaign → organization/sector | dated reporting identifying target | successful compromise |
| `affects` | incident/advisory → asset/ecosystem/package version | source specifying scope | all versions affected |
| `exploits` | incident/campaign → vulnerability | incident-specific published technical evidence | every incident used that CVE |
| `uses_malware` | incident/campaign → malware family | family attribution from a reviewed source | malware family identifies a unique actor |
| `uses_technique` | incident/campaign → ATT&CK technique | mapping rationale + ATT&CK dataset version + incident evidence | technique is confirmed by mere similarity |
| `attributed_to` | incident/campaign → threat actor | explicit attribution source and qualifier | independent verification of attribution |
| `enabled_by` | incident → weakness/exposure | documented causal chain | generic possibility is fact |
| `addresses` | defensive control → technique/weakness | documented scope/limitation and source | guaranteed prevention |
| `detects` | detector → behavior | measured test or documented detector capability; flag provenance | zero false negatives |
| `mitigates` | control → weakness/technique | defensive efficacy evidence + deployment assumptions | that control would have stopped this incident |
| `categorized_as` | capability → market category | reviewed taxonomy mapping | vendor ships the capability |
| `implements` | product → capability | dated product documentation or verified test | that customer's deployment enabled it |
| `documented_by` | claim → source | exact source ID + relevant excerpt/section | independent corroboration |
| `derived_from` | claim → earlier claim | transparent transformation and traceable lineage | independent evidence |
| `supersedes` | claim/version → earlier claim/version | documented correction/revision | historical evidence is erased |
| `related_to` | entity → entity | explicit rationale, never a substitute for causal predicate | attribution, causation or exploit proof |

**Epistemic labels:** `reported` (source states it), `observed` (direct reproducible observation), `hypothesis` (plausible but unverified), `disputed` (evidence conflict), `unknown` (no basis for answer). Keep confidence (high/medium/low) distinct from this label.

**Edge contract:** `{ id, subjectId, predicate, objectId, claimId, validFrom?, validTo?, reviewedAt?, status }`. `claimId` is mandatory for all publishable edges; `documented_by` may be modeled as a join rather than a user-visible semantic edge. Reject dangling references and unreviewed edges.

## Special cases

- **CVE/OSV/GHSA:** advisory aliases identify references, not necessarily separate vulnerabilities. Confirm matching scope before deduplicating.
- **Package:** ecosystem + case-sensitive normalized package name + release/version. Distinguish malicious publication from vulnerabilities in legitimate packages and from compromised maintainers.
- **ATT&CK/D3FEND/CWE/CAPEC:** separate namespaces and dataset versions. Don't conflate attack behaviors, defensive techniques, weaknesses and attack patterns.
- **Controls:** separate `designed_to_address` (documented design intent) from `demonstrated_effective_against` (tested observation) before any public effectiveness statement.
- **Actor attribution:** allow multiple mutually disputed claims. Never auto-infer actor from a malware family or IP address.
- **Organization resolution:** distinguish legal entity, product, domain, parent/subsidiary and reported victim. Protect nonpublic victim information.

No edge should be added for the two seed incidents until its documentary support and review notes exist.
