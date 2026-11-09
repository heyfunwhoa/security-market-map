# Evidence graph contract v1

Status: proposed with this change. Not merged, reviewed, or deployed.
Owner: repository maintainer. Next review: 2027-02-08, or sooner if the identity, secrets, or NHI catalog changes.

## What this is

`lib/evidence-graph` projects the validated Zod catalog into one read-only graph. The first slice is Identity, secrets, and non-human identity. Node and edge ids are deterministic functions of catalog ids. The graph is not a second fact store, a Neo4j database, or a background job.

Contract version: `1.2.0`.

1.2.0 (additive): buyer-context node kinds (`pain`, `objection`, `alternative`, `trigger`, `segment`), their predicates, the `practitioner_published` basis, and a `market-map` slice (`?slice=market-map`). See `docs/buyer-context-graph.md`. The identity slice is unchanged.

1.1.0 (additive): `sourceType` is derived from the catalog's `sourceTypeSchema`, which now includes `news`, `legal_summary` and `academic`. Also adds the `field_validated` evidence basis, which may only be used when the catalog's field-note gate passes: 3+ reviewed, anonymized conversations that don't challenge the claim. Nothing in the graph uses `field_validated` yet.

Read the whole slice at `GET /api/evidence-graph`. Read a bounded neighborhood with `root`, `depth` (0–2), `nodeLimit` (1–80), and `edgeLimit` (1–160). Unknown roots, unsupported parameters, and limits outside those bounds return 400. The route performs no external fetch.

The page is `/evidence-graph`. Connections and the identity domain link to it. Category, use-case, and vendor links on a selected record lead back to the existing pages.

## What a line means

| Basis | Meaning |
| --- | --- |
| Taxonomy mapping | Domain, category, use-case, or capability membership already stored in the catalog. |
| Catalog structure | A product's vendor link. |
| Hypothesis | Persona-to-category interest. The merged persona schema has no source id. |
| Unknown | A product comparison whose `sourceId` is null. |
| Source referenced | A product comparison that cites a catalog source. The citation does not make the comparison independently verified. |
| Vendor reported, needs review, disputed, superseded | Copied from the claim's existing verification status. |
| Independently verified | The claim status is already `verified`. In this catalog that status is limited to an independent public standard. |

`assertsProductCapability` is true only on a `concerns_capability` edge when the claim asserts a product capability, names a capability, is verified, and cites a standard. Category tags, buyer interest, unsourced comparisons, vendor-reported claims, denials, and review-queue notes cannot set that flag. The current slice has no such edge. The two verified OWASP NHI statements remain category statements, not product capabilities.

Vendor nodes keep `research_candidate`.

## Projection bounds

Products enter the slice only when a relationship names them and that relationship's use case is in the slice. Other primary products, including the secrets-detection research sweep, are counted under `omissions.primaryProductsNotProjected`. Omission is not a finding that a product lacks a capability.

Adjacent categories outside the eight anchor categories are not expanded. ITDR and customer-authentication use cases stay on their existing pages. Open pull requests #123 and #148 are not imported: #123 adds LimaCharlie seats on `cursor/limacharlie-personas-expansion-413d`, and #148 adds persona profiles and `lib/persona-graph.ts` on `research/security-ecosystem-map`. Those branches still need their own review, including the `legal` / `legal-counsel` overlap called out on #148. This graph uses persona ids already on `main` and labels buyer interest as a hypothesis so a later merge can attach sources without changing the id shape `persona:{catalogId}`.

## UI

The page reuses the local page introduction, status pill, breadcrumbs, and link styling. Cytoscape.js 3.33.1 (MIT) draws one diagram. The layout is a stable preset grid, not a force simulation, and it does not animate. Shape distinguishes record kind. Dash pattern distinguishes Unknown or hypothesis, dotted lines distinguish sourced or vendor-reported edges, and solid lines distinguish taxonomy or catalog structure. Color is not the evidence label.

The node list is searchable and keyboard operable. Category filters use pressed buttons. The page opens on the first category in the slice, Workforce identity, so the diagram can show that category, its use cases, and member products at a readable size. All in this slice remains available and stays inside the existing node and edge caps. The evidence panel shows dates, sources, research-candidate status, and the capability limitation. The relationship list is the keyboard path. Below the medium breakpoint the diagram is hidden and the lists remain.

## Not in this version

No new catalog claims. No persona profile import. No Neo4j, extra database, external graph API, or cross-repository sync. No inference that two products compete because they share a category.
