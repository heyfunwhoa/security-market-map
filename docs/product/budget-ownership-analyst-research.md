# Budget Ownership & Analyst Research — research specification
Date: 2026-10-09 · status: planning, not a dataset of verified budget ownership.

## Five distinct financial questions
1. **Budget authority:** who controls or approves expenditure?
2. **Budget origin:** CISO/security, CIO/IT, infrastructure, product/engineering, privacy/compliance, business unit, shared services, or board-level special program?
3. **Funding split:** which departments contribute and what is the cost-allocation method (headcount, usage, cost center, shared service, chargeback)? No percentages absent evidence.
4. **Approval hierarchy:** department leader → VP/functional leader → CISO/CIO/CFO → procurement/finance/board depending on thresholds and company structure; never presume a standard chain.
5. **Economic motion:** net-new budget, reallocated budget, tool consolidation, committed program, renewal, capital vs operating classification where relevant, multi-year commitment, fiscal/calendar deadlines.

## Schema considerations
`BudgetAllocation`: accountContextId?, categoryId, initiativeId?, costCenter?, owningFunction, executiveSponsorRole, approverRole, contributorFunctions[], allocationMethod?, amount?, currency?, fiscalYear?, capexOpex?, confidence, evidenceIds[], observedAt?, status.
`BuyingCenter`: account segment, use case, stakeholders with *decision role* (economic buyer, technical evaluator, operator, champion, procurement, compliance), not synonymous with job title.
`FundingHypothesis`: technologyId, segmentId, plausibleModels[], triggers[], questions[], sourceIds, status='hypothesis' until verified.
For generic public atlas data, avoid named private accounts or personal contact records. Support Unknown and multiple models, never force percentages to sum unless explicitly sourced.

## Category examples — hypotheses to investigate, NOT market-wide facts
- Identity governance: IAM/security program, central IT, risk/compliance, or jointly funded.
- Cloud security/CNAPP: security vs cloud platform/infrastructure engineering; potentially split between security operations and cloud teams.
- AppSec/ASPM: application/product security plus engineering/platform budgets; centralized product-security program possible.
- SIEM/SOAR/MDR: SOC/security operations, central security, or outsourced operations/shared services.
- CIAM: product, digital customer experience, or application engineering; not necessarily CISO-owned.
- AI-agent security: AI/platform, security, risk/governance or cross-functional pilots.
Provide discovery prompts for ownership, chargeback, decision rights, renewal displacement, contract entity, and expansion paths.

## Analyst library and metadata
Authors/sources to prioritize: Gartner, Forrester, IDC, Omdia, 451 Research/S&P Global, KuppingerCole, ISG, plus reputable specialty and public-sector standards bodies. Record report title, publishedAt, publisher, author(s), marketDefinition, methodology, geography, company-size sample, date reviewed, source/access rights, supported findings, limits, and category IDs.
**Separate** global market spending and forecasts from buyer surveys and individual account budgets. A worldwide information-security forecast cannot tell us whether a specific enterprise's CISO or CIO pays for CIEM.
Do not invent Gartner Magic Quadrant positions or Forrester Wave scores; no republishing licensed paywalled content. Link publisher-authorized abstracts and create original paraphrased synthesis.

## Initial source examples (verify on ingestion)
- Gartner, *Forecast Analysis: Information Security, Worldwide, 2026*, published 2026-02-05, https://www.gartner.com/en/documents/7408930 — worldwide spending forecast, not individual budgets.
- Gartner, 2025-07-29 public newsroom forecast: https://www.gartner.com/en/newsroom/press-releases/2025-07-29-gartner-forecasts-worldwide-end-user-spending-on-information-security-to-total-213-billion-us-dollars-in-2025 — use date/version context; forecasts can be revised.
- NIST NICE: https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center/about — cybersecurity work role concepts, not purchasing authority.

## Validation and learning
Test against two contrasting *hypothetical* firms (centralized security vs distributed engineering) and show Unknown where information is missing. First learn the research model; only then add verified analyst records and any buyer-budget survey findings.
