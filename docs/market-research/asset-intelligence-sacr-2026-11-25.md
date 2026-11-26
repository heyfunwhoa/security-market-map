# Asset Intelligence: concept, evidence and vendor crosswalk

## Concepts
CAASM (Cyber Asset Attack Surface Management) consolidates heterogeneous inventories. SACR describes Asset Intelligence as the evolution toward reconciled, timely evidence for operational decisions, not a replacement for authoritative systems. Existing catalog category: security-asset-management. Reuse rather than create a duplicate. Adjacent concepts: EASM, exposure prioritization, specialized discovery, ITAM (IT asset management), CMDB (configuration management database), identity/SaaS/NHI (non-human identity) governance, control validation.
Observation = source-specific time-bound assertion; entity = resolved object; asset = governed resource; relationship = evidence-bearing link.
Six pillars (pp. 13–15): source coverage; explainable reconciliation and conflict handling; freshness and change awareness; relationship and business context; control coverage validation; operational delivery and governed action.
Maturity (pp. 21–25): 0 fragmented inventory; 1 consolidated inventory; 2 reconciled context graph; 3 contextualized security operations; 4 federated just-in-time context for bounded autonomous action. Assess per workflow, not averaged vendor score.
Architecture (pp. 15–17): ingest/normalize -> resolve/correlate -> enrich -> evaluate -> deliver context. Preserve provenance, conflict, freshness and authority boundaries.
Use cases (pp. 17–21): control coverage, exposure prioritization, incident scope, NHI governance, cloud/SaaS/OT governance, safe automation. Acceptance: distinguish missing, stale and verified absent; trace owner and relationships; measure decision time and independently verify outcomes. 
Adoption (pp. 33–36): choose decision, baseline context, define trust, prove workflows, scale carefully. Metrics (p. 37): control coverage, ownership completeness, reconciliation quality, freshness, remediation efficiency, verified outcomes.
Cross-framework editorial hypothesis: Asset Intelligence supplies context to AIAP and ARISE; execution authority stays with consuming workflow. Not a SACR integration claim.

## Sources
- Existing source ID src-sacr-caasm-20261019: [SACR, From CAASM to Asset Intelligence](https://softwareanalyst.io/reports/from-caasm-to-asset-intelligence), Sean Sosnowski, Oct 19 2026, updated Nov 17 2026. User-supplied PDF reviewed Nov 25, 38 pages. Figure 8 p. 26 (also Figure 1 p. 3). Commissioned by Axonius; SACR states editorial independence; Axonius sole detailed profile.
- Report cites NIST CSF (inventory and criticality), CISA asset visibility directive, FIRST EPSS (not complete risk), CIS Control 1 (expected asset population). These are follow-up source anchors, not independently reviewed here.
- Axonius profile pp. 27–32: adapter collection, deterministic resolution, field precedence, Asset Fabric/Graph, saved queries, Action Center and enforcement sets. Agent experience not GA at assessment. No current availability inference.

## Vendor catalog intake: original Figure 8
- **Asset Intelligence and CAASM:** Axonius; Arctic Wolf; JupiterOne; Rapid7; Surf.ai.
- **External Attack Surface Management:** Cortex (Palo Alto Networks); CrowdStrike; Censys; CyCognito; Google Cloud; Microsoft; Wiz.
- **Exposure Management and Vulnerability Prioritization:** Axonius; Brinqa; Nozomi; Panaseer; Qualys; Rapid7; SAFE (logo reading provisional); Seemplicity; Surf.ai; Tenable; XM Cyber; Zafran.
- **Specialized Asset Discovery:** Claroty; Dragos; Forescout; Google Cloud; Oligo; runZero; ServiceNow; Wiz.
- **ITAM, CMDB and Service Context:** BMC; Flexera; Freshworks; Lansweeper; ServiceNow.
- **Identity, SaaS and NHI Governance:** Astrix; C1; Entro; Microsoft; Okta; Saviynt; SailPoint.
- **Control Validation and Security Testing:** AttackIQ; Cymulate; Picus; Pentera; SafeBreach.
These are graphic labels, not verified product capabilities. Cortex and C1 are brand labels requiring canonical vendor mapping; preserve original label, reconcile existing IDs, avoid duplicate records. SAFE logo reading provisional. No logos hosted. No typed capability claims or maturity ratings. Next: reconcile each vendor against existing catalog, verify official product sources, then integrate approved associations and run catalog tests. No production changes.
