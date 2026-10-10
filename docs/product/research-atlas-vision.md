# Security Market Map → Cybersecurity Knowledge Infrastructure
Status: product proposal; not implemented. Updated 2026-10-09.

## Thesis
Make Security Market Map a durable, evidence-backed cybersecurity knowledge infrastructure layer. **Product 1 is the research atlas.** The same canonical entities can later power learning, competitive intelligence, GTM research, AI retrieval, and approved APIs. Do not conflate planned capabilities with working features.

## Audiences / jobs to be done
- Enterprise security seller / sales leader: explain a category, identify buyers and triggers, position a differentiated approach with credible evidence.
- Security practitioner / architect: understand capabilities, integrations, adjacent controls, limitations and architecture.
- Product manager / marketer: research a category, segment buyers, articulate problems and competitive positioning.
- Career learner / recruiter: understand security job families, responsibilities and skills; avoid asserting one universal org chart.
- Security researcher: trace claims to primary sources, dates, conflicts and unanswered questions.

## Product areas
1. **Technology Atlas**: domains → categories → technologies → capabilities → architecture → use cases → controls/threats/regulation mappings.
2. **Glossary & Acronyms**: aliases, ambiguous expansions, definitions and related concepts; beginner/practitioner/strategic explanations.
3. **Roles & Buying Centers**: stand-alone job families, job titles, reporting relationships (contextual), responsibilities, skill maps and technology ownership.
4. **GTM & Buyer Intelligence**: ICP segmentation, buyer personas, committees, budgets as *variable hypotheses*, triggers, pains, discovery, evaluation and procurement criteria.
5. **Vendor & Product Landscape**: vendors vs products, cited feature claims, integration/overlap/complement, comparisons and changes.
6. **Analyst & Standards Library**: metadata and source links for Gartner, Forrester, IDC, Omdia, 451 and specialty sources; NIST, MITRE, OWASP etc. Independent definitions with dates, no artificial overall rank.
7. **Use Cases & Threat-to-Control Mapping**: practical workflows, technical prerequisites, risks, ATT&CK-informed threat links and validation caveats.
8. **Market Evolution**: acquisitions, category shifts, AI convergence and dated positioning changes.
9. **Learning Paths**: competency ladders by role, concept prerequisites, exercises, checks, and sources.
10. **Research & Evidence Console**: citations, confidence, conflicts, source freshness, review queues and change history.

## Critical separation: security job role vs marketing persona vs ICP
- **Role**: an organizational function/title (SOC Analyst, Cloud Security Engineer, Security Architect, CISO, IAM Engineer, AppSec Lead, DevSecOps Engineer, Detection Engineer, Threat Hunter, SecOps Director, GRC Manager, Security Product Manager). Titles vary by company and market.
- **Persona**: a role *in a specific buying motion* (economic buyer, technical evaluator, champion, operator, compliance influencer, blocker).
- **ICP**: account/company segment defined by environment, maturity, pain and fit—not a person.
- **Buying center**: combinations of stakeholders, committees and decision rights per use case and company.
Represent these separately; connect with explicit scoped relationships and evidence. The same CISO may be budget owner for one purchase and sponsor for another; security engineers may own a technical evaluation without owning budget.
- **Budget**: do not invent universal dollar amounts or ownership; represent organization-specific or source-backed ranges with currency, year and context. Unknown is valid.
- **Trigger**: funding, compliance deadline, breach, tool consolidation, cloud migration, acquisition, audit, product launch etc. Treat a public signal as a hypothesis to research, not proof of intent.

## Example paths
- Study CIEM → definition and variants → cloud architecture → IAM/IGA/CNAPP relationships → cloud-security personas → evaluation criteria → cited vendors/reports.
- Learn detection engineering → job family/skills → SIEM/XDR/detection-as-code → MITRE ATT&CK mapping → training exercise.
- Explore agent identity → NHI/PAM/IGA + agent runtime → controls, buyers, current analyst definitions → related projects.

## Product boundaries
- Preserve current identity evidence, source ledger, Zod catalog, and unknown-cell semantics.
- Public resource is an independent educational product, not analyst redistribution.
- Never auto-fill competitor feature matrices based solely on vendor category membership.
- Avoid storing personal contact records or scraped job candidate information in the research atlas.
- No private employer/customer records, secrets, or unlicensed paywalled report content.
- No requirement for a graph database or LLM in v1.

## MVP release definition
One **Identity & NHI** domain experience that links 10–20 well-defined terms, a small set of role/job-family profiles, 2–3 buyer journey scenarios, explicit category relationships, and a curated analyst/source ledger. Only publish sourced claims; leave uncertain/unsupported cells Unknown. Provide responsive navigation and accessible search/filter UI when implemented.

## Success measures
Qualitative task success: can a seller distinguish NHI from IAM/IGA? Can a new learner trace CIEM to its buyer and architecture? Can a PMM find cited differentiation criteria? Track broken links, unmatched aliases, stale sources, editorial-review throughput; don't invent usage/impact numbers.
