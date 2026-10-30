# Security organization personas — core five plus adjacent seats

As of: 2026-10-27 (America/Chicago). Owner: Security Market Map editorial maintainer.
Status: source-linked research candidate; human review pending. Builds on domain seeds and typed buyer personas; does **not** invent ICP cutoffs, budget authority, or deal champions from titles alone.
Next manual review: 2026-11-27, or sooner after a material domain/persona catalog change.

## How to read this

- **Domain** = coverage lane in the atlas (`appsec`, `product`, `platform`, `corporate`, `cloud`, `data`, `secops`, `identity`, `grc`, `offensive`, `ai`).
- **Job role** = organizational function (what the person does day to day).
- **Buying persona** = seat in a purchase (evaluator, operator, budget owner possible). Titles do not prove budget.
- **ICP** = account fit, not a person. Public positioning alone does not validate an ICP.

**Evidence labels:** vendor/practitioner-published = publisher’s own framing; hypothesis = working separation to validate in discovery; unknown = missing deal or interview evidence. All pains, triggers, objections and success measures below are **hypotheses** unless a primary source is cited.

Related local artifacts:

- Typed catalog personas: `lib/data/personas.ts` and `ecosystemPersonas` in `lib/data/ecosystem.ts` (`aliases` field)
- Domain charters: `domainSeeds` in `lib/data/ecosystem.ts`
- Separation of role / persona / ICP: [research atlas vision](../product/research-atlas-vision.md)
- Method: [Competitive Intelligence Playbook](competitive-intelligence-playbook.md)
- Vendor-audience example (different slice): [LimaCharlie audience personas](limacharlie-audience-personas.md)

## Acronyms and same-seat aliases

Canonical catalog `name` is the display label. `aliases` hold acronyms and alternate titles for the **same seat**. Landscape buyer filters show a short sample (`Name · Alias / Alias`).

| Catalog ID | Common short names | Also heard as (same seat) |
| --- | --- | --- |
| `appsec` | AppSec, ASE | Application security, software security, ASPM owner, Director of AppSec |
| `product-security` | ProdSec | Product security, PSIRT lead, SSDLC / secure SDLC program owner |
| `platform-security` | PlatformSec, PlatSec, InfraSec | Infrastructure security, CI/CD / pipeline security, K8s / container security owner |
| `platform` | DevOps, SRE, Platform eng | Platform engineering, IDP / developer platform, CI/CD owner (ops) |
| `it-security` | ITSec, CorpSec | Corporate security, EDR / SEG owner, VM / VulnOps / patch owner |
| `ciso` | CISO, CSO | VP Security, Head of Security, security executive |
| `security-architect` | SecArch | Enterprise / principal / solutions security architect |
| `identity-security` | IdSec, IAM lead | Head of identity, workforce identity, NHI program owner |
| `iga-owner` | IGA | Identity governance, JML / access certification / SoD owner |
| `pam-owner` | PAM, PIM | Privileged access, JIT privilege, break-glass owner |
| `cloud-sec` | CloudSec | CNAPP / CSPM / CWPP / CIEM owner, cloud posture |
| `data-security` | DataSec | DSPM / DLP / DAG owner, information protection |
| `privacy` | DPO, CPO | Privacy counsel / engineer / program owner |
| `soc-lead` | SOC, SecOps lead | D&R lead, blue team lead, MDR buyer, XDR program owner |
| `detection-engineer` | DetEng, DaC | Detection-as-code, SIEM / content / threat detection engineer |
| `offensive-security` | OffSec, Red team | Purple team, pentester, BAS / AEV / security validation |
| `grc-owner` | GRC | Compliance, trust, TPRM / vendor risk, audit liaison |
| `ai-security` | AISec | LLM / GenAI / model / agent security, AI governance security |
| `ai-owner` | AI platform | MLOps, LLM / agent platform, AI gateway owner |
| `engineering-manager` | EM | Eng manager, team lead, head of engineering (influencer) |
| `security-champion` | Champion | AppSec champion, embedded security partner, guild security lead |
| `soc-analyst` | Tier 1 | Triage specialist, security analyst, blue team analyst |
| `incident-response` | IR, CSIRT | Tier 2, incident responder, DFIR (response seat) |
| `threat-hunter` | Hunt | Tier 3, proactive threat hunter |
| `threat-intel` | CTI | Threat analysis, threat intel analyst/lead |
| `digital-forensics` | DFIR (forensics) | Forensic analyst, computer forensics |
| `insider-risk` | IRM | Insider threat, people risk |
| `network-security` | NetSec | NDR / NGFW / microsegmentation / SSE network seat |
| `saas-security` | SaaSSec, SSPM | SaaS posture, CASB buyer (access seat—qualify) |
| `ot-security` | OT, ICS | Industrial / SCADA cybersecurity |
| `exposure-management` | EASM, CTEM, ASM | Attack surface / exposure owner |
| `cyber-recovery` | Cyber resilience | Backup/restore, ransomware recovery |
| `supply-chain-security` | C-SCRM (software) | SBOM / dependency / artifact integrity |
| `security-awareness` | SATE | People security, human risk, phishing sims |
| `mssp-ops` | MSSP, MDR provider | Managed SOC / service delivery SecOps; LC-AUD-01/02 |
| `provider-founder` | MSSP/MDR CEO | Provider founder / business leader; LC-PER-01 |
| `secops-platform-architect` | SecOps architect | Security platform architect; LC-PER-02 |
| `security-product-leader` | AI SOC builder | Security startup / product founder; LC-PER-07 / LC-AUD-04 |
| `ir-services-lead` | IR firm | DFIR services / breach response firm; LC-AUD-05 |
| `service-delivery` | Security CS | Managed-service delivery / customer success |
| `procurement` | Purchasing | Finance / vendor management on security buys |
| `vciso` | Virtual CISO | Fractional / outsourced CISO |
| `malware-analyst` | RE | Malware reverse engineer |
| `legal-counsel` | Legal | Commercial / security contracts counsel; LC committee legal |
| `email-security` | EmailSec, SEG | Mailbox / secure email gateway owner; LC email use case |
| `developer` | SWE | Software engineer, application developer |
| `cto` | CTO | VP Engineering, Head of Engineering; LC-PER-02 eng seat |

### Overloaded labels (do **not** treat as one exclusive persona)

These titles are common and ambiguous. Qualify which seat is meant before mapping a deal or lesson.

| Heard as | Could mean | Qualify with |
| --- | --- | --- |
| DevSecOps | AppSec tooling, PlatformSec rails, or platform eng paved road | Who owns the scanner vs the CI template vs the vault? |
| Security engineering | AppSec, PlatformSec, detection, or cloud | What is the primary backlog: code, platform, detections, or accounts? |
| Infosec / Information security | Often corporate IT + SOC; sometimes the whole CISO org | Estate: employee devices vs product vs cloud? |
| Cybersecurity | Generic umbrella | Which domain and fixer queue? |
| Trust & safety | GRC/trust, product abuse, or content safety | Customer questionnaire vs product abuse vs moderation? |
| Platform team | DevOps/platform eng **or** PlatformSec | Operator of the road vs setter of the security bar? |
| VM | IT vulnerability management **or** virtual machine | Patch queue vs compute instance? |
| Security architect | Enterprise architect vs cloud vs AppSec architect | Shared pattern owner or single-domain specialist? |
| DFIR | Incident response **or** digital forensics (or both) | Containment now vs evidence for later? |
| CASB vs SSPM | Access/data path control vs SaaS app posture | User-to-SaaS traffic/policy vs SaaS misconfig/grants? |
| Analyst | SOC Tier 1, detection eng, CTI, or GRC | Which queue and which output artifact? |

## Why these five first

Many buying motions fail when sellers treat “security” as one buyer. These five lanes collide on secrets, CI/CD, containers, and vulnerability tickets—yet they usually have **different owners, queues, and budgets**.

| Order | Persona ID (catalog) | Domain | One-line job (hypothesis) |
| --- | --- | --- | --- |
| 1 | `appsec` | `appsec` | Find and reduce risk in code, dependencies, APIs, and app-facing secrets |
| 2 | `product-security` | `product` | Set the bar for shipping a trustworthy product (design review, disclosure, launch gates) |
| 3 | `platform-security` | `platform` | Secure the shared delivery and runtime platform many teams consume |
| 4 | `platform` | `platform` (ops) | Run paved roads: CI/CD, infra, developer platform, workload identity delivery |
| 5 | `it-security` | `corporate` | Protect the employee estate: endpoints, email, edge, IT asset patching |

`platform` in the typed catalog is the **DevOps / platform engineering** operator seat, not PlatformSec. PlatformSec is a security function that sets the bar for that shared platform.

## Boundary map (hypothesis)

| If the question is mainly… | Primary owner to test | Not the default owner |
| --- | --- | --- |
| Vulnerable library or SAST finding in product code | AppSec | IT corporate VM |
| Launch / design-review / disclosure / customer trust for *the product* | ProdSec | Corporate laptop controls |
| Hardened CI templates, golden images, admission policy, shared secrets path | PlatformSec (+ platform eng as operator) | AppSec-only tooling renewal |
| Vault rollout, pipeline reliability, self-service developer platform | DevOps / platform engineering | CISO as day-to-day operator |
| Endpoint agent, email gateway, OS patch queue | IT corporate security | AppSec backlog |

Cross-cutting controls (secrets, identity, cloud posture) need an **explicit primary** plus contributors—not “shared ownership” as a slogan.

## Persona profiles

Everything in these profiles is a **working hypothesis** unless marked with a source. Suggested metrics are evaluation measures, not claimed outcomes.

### SEC-PER-01 — AppSec lead / engineer (`appsec`)

- **Domain:** Application security. **Potential buying roles:** evaluator; manager may be budget owner possible.
- **Job:** Reduce application risk through testing, triage, developer enablement, and ownership of AppSec tooling.
- **Typical category anchors:** `sast`, `sca`, `dast`, `api-security`, `aspm`, `secrets-detection`.
- **Likely pain / trigger:** alert backlog, false positives, unclear fix ownership, secret leak in git, ASPM consolidation pitch.
- **Message to test:** show coverage of the surfaces that matter and a path from finding → owner → fix without a second queue that dies.
- **Success measures:** mean time to remediate for severity bands the team accepts; developer adoption; invalid/noise rate; percent of findings with a named owner.
- **Objections:** slows delivery; duplicates IDE/CI native tools; no revoke/rotate path for secrets; scoring that developers ignore.
- **Discovery:** “Which AppSec findings become tickets, and who is allowed to close them without a waiver?”
- **Disconfirmation:** no funded AppSec owner; engineering will not accept gates; the pain is only OS/IT patching.
- **Source anchors:** OWASP DevSecOps Guideline roles describe AppSec engineers owning SAST/DAST/SCA/secrets tooling and triage support.[^OWASP-ROLES] Practitioner articles distinguish AppSec (application layer) from broader product-security programs.[^SNYK-PROD][^PLATSEC-OWN]

### SEC-PER-02 — Product security lead (`product-security`)

- **Domain:** Product security. **Potential buying roles:** evaluator / influencer; head of ProdSec may be budget owner possible for program tooling.
- **Job:** Make the *product customers buy* trustworthy: threat modeling, design review, secure engineering expectations, disclosure, and launch bars.
- **Typical category anchors:** `product-security-program`, `threat-modeling`, `vulnerability-disclosure`, often overlapping `sast` / AppSec tooling.
- **Likely pain / trigger:** customer questionnaires, launch deadline, coordinated disclosure, bug bounty volume, regulator or enterprise buyer diligence.
- **Message to test:** separate program governance from scanner SKUs; show how evidence maps to a shipping decision.
- **Success measures:** time-to-triage for external reports; percent of high-risk features with a recorded review; exception age; questionnaire cycle time.
- **Objections:** “we already have AppSec tools”; GRC owns questionnaires only; engineering treats reviews as optional.
- **Discovery:** “What is the launch bar, and who can accept residual risk for a customer-facing change?”
- **Disconfirmation:** company only ships internal tools with no external trust surface; “ProdSec” is a title on AppSec tooling with no program.
- **Source anchors:** Product vs application security framing in practitioner literature.[^SNYK-PROD] Domain charter in this atlas separates product trust work from corporate IT controls (`product` vs `corporate` domains).

### SEC-PER-03 — Platform security (`platform-security`)

- **Domain:** Platform and infrastructure security. **Potential buying roles:** evaluator / influencer; sometimes co-budget with platform eng.
- **Job:** Secure the shared internal platform: CI/CD guardrails, baseline identity for workloads, runtime policy, secrets delivery mechanisms, build-system supply chain, multi-tenant internal infra risk.
- **Typical category anchors:** `container-security`, `iac-security`, `secrets-management`, often adjacent to cloud categories without owning CNAPP alone.
- **Likely pain / trigger:** pipeline compromise fear, secret sprawl in CI, unsigned images, admission gaps, many teams failing the same way.
- **Message to test:** AppSec secures what the product *does*; PlatformSec secures how products are *built and run* on shared rails.[^PLATSEC-OWN]
- **Success measures:** percent of services on approved templates/images; policy exceptions with expiry; mean time to rotate a compromised CI credential; blast-radius drills for shared infra.
- **Objections:** platform eng already “owns security”; cloud team owns everything in the account; AppSec scanners are enough.
- **Discovery:** “If one CI template or base image is wrong, how many services fail the same way—and who can change that template?”
- **Disconfirmation:** no shared platform (every team owns bespoke infra); security only reviews apps after merge with no platform control plane.
- **Source anchors:** Platform vs AppSec vs cloud ownership model.[^PLATSEC-OWN] OWASP DevSecOps Guideline DevSecOps/platform engineers harden CI/CD, golden images, and IaC modules as the paved road.[^OWASP-ROLES]

### SEC-PER-04 — DevOps / platform engineering (`platform`)

- **Domain:** Operates inside platform/infrastructure; often **not** a security title. **Potential buying roles:** operator; head of platform may be budget owner possible for vault/platform spend.
- **Job:** Deliver reliable self-service: pipelines, environments, developer portals, infrastructure modules, workload authentication to vaults and clouds.
- **Typical category anchors:** `secrets-management`, `nhi`, plus operational stake in `container-security` / `iac-security` implementations.
- **Likely pain / trigger:** ticket load for env vars; brittle static secrets; multi-cloud delivery; platform standardization program; SRE toil.
- **Message to test:** dynamic credentials and paved roads reduce toil *and* close the bypass paths AppSec keeps finding.
- **Success measures:** time to provision credentials for a new service; failed deploy rate from secret mishandling; adoption of approved modules; on-call pages tied to config drift.
- **Objections:** vault becomes another dependency; migration cost; security policy blocks self-service; unclear who pays.
- **Discovery:** “Static storage or dynamic issuance—and which clouds and data stores must the platform support first?”
- **Disconfirmation:** security team will not allow platform to operate the control; every team must keep local secret stores by policy.
- **Source anchors:** OWASP DevSecOps Guideline paved-road responsibilities for DevSecOps/platform engineers.[^OWASP-ROLES] Existing typed persona `platform` in this catalog.

### SEC-PER-05 — IT / corporate security (`it-security`)

- **Domain:** Corporate and IT security. **Potential buying roles:** evaluator / operator; manager may be budget owner possible for endpoint/email/VM lines.
- **Job:** Protect the employee and corporate estate: endpoints, email, network edge, IT asset vulnerability management, awareness.
- **Typical category anchors:** `endpoint-security`, `email-security`, `network-edge`, `it-vulnerability-management`, `security-awareness`.
- **Likely pain / trigger:** ransomware tabletop, phishing volume, missing OS patches, remote-work device gaps, audit of corporate controls.
- **Message to test:** this purchase is the corporate estate—not the product’s AppSec program and not the production vault path.
- **Success measures:** patch SLA for critical IT assets; phishing report rate / time-to-contain; endpoint coverage; mean time to isolate a device.
- **Objections:** “product security already covers us”; SOC owns detection so IT security is redundant; tool sprawl with overlapping XDR.
- **Discovery:** “Is this the corporate estate or the product—and who patches?”
- **Disconfirmation:** the stated pain is only in application code or cloud workload posture with no corporate estate owner.
- **Source anchors:** Domain charter for `corporate` in this atlas; CIS Critical Security Controls as a common corporate-control vocabulary (framework reference, not a purchase proof).[^CIS]

## Adjacent seats (wave 2)

These seats show up in the same buying motions as the core five. They are **not** substitutes for AppSec/ProdSec/PlatformSec/DevOps/IT corporate; they are the people who sponsor, design, operate, or block those purchases.

| Persona ID | Domain | One-line job (hypothesis) |
| --- | --- | --- |
| `ciso` | leadership across domains | Fund outcomes and set risk appetite; confirm who operates after signature |
| `security-architect` | cross-cutting | Design reusable patterns; veto duplicate control planes |
| `identity-security` | `identity` | Workforce + NHI program coherence (IGA/PAM/CIEM/agent seats underneath) |
| `iga-owner` / `pam-owner` | `identity` | Specialist operators inside identity (already in typed catalog) |
| `cloud-sec` | `cloud` | Cloud account posture, workloads, entitlements, cloud detection foundations |
| `data-security` | `data` | Where data is, who can read it, what can leave |
| `soc-lead` | `secops` | Detection/response queue and safe automation |
| `detection-engineer` | `secops` | Detection content quality and maintainability |
| `offensive-security` | `offensive` | Validate whether controls work (BAS / pentest / disclosure testing) |
| `grc-owner` | `grc` | Evidence, third parties, customer trust questionnaires |
| `ai-security` | `ai` | Controls for models, AI apps, agents, and AI data paths |
| `ai-owner` | `ai` / platform | Ships the gateway; often not the security budget owner |
| `privacy` | `data` / `grc` | Privacy obligations and evidence (DPO/CPO); not every DSPM control |
| `engineering-manager` | engineering | Prioritizes remediation vs features; common AppSec influencer |
| `security-champion` | engineering × AppSec | Embedded developer contact; influencer/fixer, rarely budget owner |

### SEC-PER-06 — CISO / VP of security (`ciso`)

- **Potential buying roles:** economic buyer or executive sponsor; authority must be confirmed per deal.
- **Job:** improve defensible security outcomes within budget and governance.
- **Discovery:** “Which security outcome warrants investment, and who operates the control after purchase?”
- **Disconfirmation:** initiative lacks priority, sponsor, budget, or named operator.
- **Do not assume:** CISO day-to-day ownership of vault, SAST, or EDR operations.

### SEC-PER-07 — Security architect (`security-architect`)

- **Potential buying roles:** influencer / technical evaluator.
- **Job:** reusable secure patterns (identity, crypto, API, platform) and major design sign-off.
- **Discovery:** “Which control must be shared versus team-local—and what already provides that path?”
- **Disconfirmation:** architecture is purely advisory with no veto; purchase is a single-team tactical tool.

### SEC-PER-08 — Identity security lead (`identity-security`)

- **Job:** one coherent identity story across workforce, privilege, cloud entitlements, and non-humans.
- **Specialists underneath:** `iga-owner`, `pam-owner` remain valid for scoped deals.
- **Discovery:** “Is the pain joiner/leaver, standing privilege, machine identity, or cloud entitlements?”
- **Disconfirmation:** only a single app certification project with no identity program owner.

### SEC-PER-09 — Cloud security (`cloud-sec`)

- **Job:** cloud control-plane posture, workload protection, entitlements, and cloud detection foundations.
- **Boundary:** AppSec secures product behavior; PlatformSec secures shared delivery rails; Cloud secures where workloads live in provider accounts.[^PLATSEC-OWN]
- **Discovery:** “Is CIEM already in the CNAPP—and who remediates account findings versus app findings?”

### SEC-PER-10 — Data security (`data-security`)

- **Job:** discover sensitive data, govern access, and control egress—without collapsing DSPM, DAG, DLP, and privacy into one SKU.
- **Discovery:** “Is the missing fact where the data is, who can read it, or whether it can leave?”
- **Disconfirmation:** pain is only code vulnerability or only endpoint DLP with no data-store scope.

### SEC-PER-11 — SOC manager (`soc-lead`) and detection engineer (`detection-engineer`)

- **SOC manager:** queue outcomes, coverage, staffing, safe automation approvals.
- **Detection engineer:** expressible/testable content, telemetry gaps, tuning ownership.
- **Discovery (SOC):** “Which queue costs the most time, and what would an unacceptable automated action look like?”
- **Discovery (detection):** “Show a detection you cannot express cleanly today.”
- **Disconfirmation:** no operating SOC / no content owner; purchase is only a preventive scanner.

### SEC-PER-12 — Security validation / offensive (`offensive-security`)

- **Job:** prove controls fail safely and map findings to fixers (BAS platform ≠ pentest program ≠ bug bounty intake).
- **Discovery:** “Continuous simulation, point-in-time test, or disclosure triage—and which remediation queue?”
- **Disconfirmation:** no appetite to remediate validated findings; report-only culture.

### SEC-PER-13 — GRC or trust lead (`grc-owner`)

- **Job:** evidence and outside questions; consumes operated controls, does not replace them.
- **Discovery:** “Who operates the control you need evidence for—and is this our vendor review or a customer’s?”
- **Disconfirmation:** buyer wants a scanner or SOC platform sold as “compliance done.”

### SEC-PER-14 — AI security (`ai-security`) vs AI platform owner (`ai-owner`)

- **AI security:** model/app/agent/data-path controls and approved actions.
- **AI platform owner:** ships gateways and agents; may sponsor spend but often is not the security bar owner.
- **Discovery:** “Is the risk the model, the app, the agent identity, or the data path—and who approves tool grants?”

### SEC-PER-15 — Engineering manager (`engineering-manager`)

- **Potential buying roles:** influencer / blocker for AppSec and platform adoption.
- **Job:** schedule remediation beside features; reject controls without a paved path.
- **Discovery:** “Is security work in the sprint, and what makes a finding actionable for your team?”

### SEC-PER-16 — Privacy / DPO (`privacy`)

- **Job:** privacy program, lawful processing, subject rights, DPIAs, customer DPA evidence.
- **Boundary:** Data security often owns DSPM/DLP tooling; privacy owns obligations and evidence. Overlap is common—confirm primary.
- **Aliases:** DPO, CPO, privacy counsel/engineer.
- **Discovery:** “Is this a privacy program gap or a missing technical control?”

### SEC-PER-17 — Security champion (`security-champion`)

- **Job:** local security contact inside a product engineering team; translates AppSec asks into team work.
- **Potential buying roles:** influencer / user; rarely economic buyer.
- **Aliases:** AppSec champion, embedded security partner.
- **Discovery:** “Are you the fixer, the reviewer, or both—and what already runs in your pipeline?”
- **Source anchors:** OWASP DevSecOps Guideline security champions as embedded developer contacts.[^OWASP-ROLES]

## Wave 3 — SecOps depth, exposure, SaaS, OT, and adjacent buyers (sourced)

NICE work roles are **not job titles**; a single job may cover multiple roles.[^NICE-ROLES] Use them as evidence that the work exists, then qualify the employer’s title and budget.

| Persona ID | One-line job | Primary source anchors |
| --- | --- | --- |
| `soc-analyst` | Tier-1 triage and enrichment | SOC role literature (Tier 1 triage).[^PAN-SOC] |
| `incident-response` | Investigate, contain, recover | NICE Incident Response.[^NICE-IR][^PAN-SOC] |
| `threat-hunter` | Proactive hunt / Tier-3 escalation | SOC Tier-3 threat hunter framing.[^PAN-SOC] |
| `threat-intel` | Collect/analyze/disseminate threat assessments | NICE Threat Analysis.[^NICE-TA] |
| `digital-forensics` | Evidence analysis from incidents | NICE Digital Forensics.[^NICE-ROLES] |
| `insider-risk` | Insider threat identification/assessment | NICE Insider Threat Analysis.[^NICE-ROLES] |
| `network-security` | Edge, NDR, segmentation, related traffic controls | Atlas categories `network-edge`, `ndr`, `microsegmentation`, `waf-waap` |
| `saas-security` | SaaS posture / grants (SSPM) vs access brokers (CASB) | SSPM vs CASB distinction in practitioner literature.[^SSPM-CASB] |
| `ot-security` | Industrial / OT cybersecurity engineering | NICE OT Cybersecurity Engineering.[^NICE-ROLES] |
| `exposure-management` | EASM / CTEM / continuous exposure prioritization | Atlas `external-attack-surface`, `ctem`, asset management |
| `cyber-recovery` | Backup/restore/resilience after destructive attacks | Atlas `cyber-recovery` |
| `supply-chain-security` | Software dependencies, provenance, C-SCRM | NICE Cybersecurity Supply Chain Risk Management.[^NICE-ROLES] |
| `security-awareness` | Awareness / phishing simulation / human risk | Atlas `security-awareness` |
| `mssp-ops` | Multi-tenant MDR/MSSP delivery economics | LimaCharlie audience/persona research (provider lane).[^LC-AUD] |
| `developer` | Ships code; consumes shift-left tooling | NICE Secure Software Development; OWASP developer role.[^NICE-ROLES][^OWASP-ROLES] |
| `cto` | Engineering strategy; co-sponsors platform/security buys | Buying-committee technical/economic sponsor (hypothesis; confirm per deal) |

### SEC-PER-18 — SOC analyst (`soc-analyst`)

- **Source:** Tier-1 triage specialist responsibilities in SOC literature.[^PAN-SOC]
- **Discovery:** “What does a justified alert look like, and what forces escalation?”
- **Boundary:** Not the SOC manager (`soc-lead`) and not detection engineering content owner (`detection-engineer`).

### SEC-PER-19 — Incident responder (`incident-response`)

- **Source:** NICE Incident Response—investigate, analyze, respond to network cybersecurity incidents.[^NICE-IR]
- **Discovery:** “Who declares an incident, and who is allowed to contain?”
- **Boundary:** Overlaps DFIR branding; separate forensics seat when evidence/legal is the primary job.

### SEC-PER-20 — Threat hunter (`threat-hunter`)

- **Source:** Tier-3 proactive hunting / major escalation seat in SOC literature.[^PAN-SOC]
- **Discovery:** “Which hunt hypotheses fail because telemetry is missing?”

### SEC-PER-21 — Threat intelligence analyst (`threat-intel`)

- **Source:** NICE Threat Analysis—collect, process, analyze, disseminate threat assessments and indicators.[^NICE-TA]
- **Discovery:** “Who consumes your intel, and how do indicators become detections or blocks?”

### SEC-PER-22 — Digital forensics (`digital-forensics`)

- **Source:** NICE Digital Forensics.[^NICE-ROLES]
- **Discovery:** “In-house, retainer, or both—and what must survive for legal?”

### SEC-PER-23 — Insider risk (`insider-risk`)

- **Source:** NICE Insider Threat Analysis.[^NICE-ROLES]
- **Discovery:** “People-risk program or DLP purchase—and who can see cases?”

### SEC-PER-24 — Network security (`network-security`)

- **Hypothesis buyer** for NDR/edge/microsegmentation/WAF motions in this atlas.
- **Discovery:** “Edge access, lateral movement, or DNS/web filtering—and who remediates?”

### SEC-PER-25 — SaaS security (`saas-security`)

- **Source:** SSPM focuses on SaaS app posture/misconfig/grants; CASB more often user-to-SaaS access/data paths.[^SSPM-CASB]
- **Discovery:** “Misconfig posture or access/data path control—and who owns the critical SaaS apps?”

### SEC-PER-26 — OT / ICS security (`ot-security`)

- **Source:** NICE Operational Technology (OT) Cybersecurity Engineering.[^NICE-ROLES]
- **Discovery:** “Which plants/lines are in scope, and who can approve changes?”

### SEC-PER-27 — Exposure / attack-surface owner (`exposure-management`)

- **Hypothesis** spanning EASM/CTEM/asset inventory categories in this atlas.
- **Discovery:** “Internet-facing discovery, cloud exposure, or full CTEM—and who remediates?”

### SEC-PER-28 — Cyber recovery (`cyber-recovery`)

- **Hypothesis** for ransomware recovery / immutable backup buyers mapped to `cyber-recovery`.
- **Discovery:** “When did you last test a clean-room restore?”

### SEC-PER-29 — Software supply-chain security (`supply-chain-security`)

- **Source:** NICE Cybersecurity Supply Chain Risk Management (program lens); overlaps AppSec SCA without being only a CVE scanner.[^NICE-ROLES]
- **Discovery:** “Vulnerable deps, malicious packages, or build provenance?”

### SEC-PER-30 — Security awareness (`security-awareness`)

- **Hypothesis** for SATE / human-risk platform buyers; distinct from email gateway owners.
- **Discovery:** “Completion vanity metric or phishing-report / click reduction?”

### SEC-PER-31 — MSSP / MDR operations (`mssp-ops`)

- **Source:** Provider audience economics in LimaCharlie persona research (hypothesis to validate per provider).[^LC-AUD]
- **Discovery:** “What limits profitable multi-tenant growth—and which queue costs the most?”

### SEC-PER-32 — Software developer (`developer`)

- **Source:** NICE Secure Software Development; OWASP developer as primary consumer of shift-left tooling.[^NICE-ROLES][^OWASP-ROLES]
- **Buying role:** user / influencer; rarely budget owner.

### SEC-PER-33 — CTO / VP Engineering (`cto`)

- **Hypothesis** engineering economic/technical sponsor for platform and developer-security tooling.
- **Discovery:** “Engineering-owned platform buy or security-owned control—and what adoption proof is required?”
- **Also maps:** LimaCharlie LC-PER-02 engineering seat (build-versus-buy for security infrastructure).[^LC-AUD]

## Wave 4 — LimaCharlie audience personas mapped into the catalog

Source research: [LimaCharlie audience and buyer personas](limacharlie-audience-personas.md) (2026-10-13). Those profiles remain hypotheses; this table only maps them to typed catalog IDs so landscape filters and discovery reuse one set of seats. Vendor homepage prominence is **not** ICP proof.

| LimaCharlie ID | Catalog persona ID(s) | Notes |
| --- | --- | --- |
| LC-AUD-01 MSSP / LC-AUD-02 MDR | `mssp-ops`, `provider-founder` | Ops vs economic buyer |
| LC-AUD-03 Enterprise SOC | `soc-lead`, `secops-platform-architect`, `ciso` | Ops champion, platform architect, executive |
| LC-AUD-04 Security product / AI SOC builder | `security-product-leader`, `cto` | Product founder vs eng sponsor |
| LC-AUD-05 IR firm | `ir-services-lead`, `incident-response` | Firm lead vs individual responder |
| LC-PER-01 Provider founder/CEO | `provider-founder` | New typed seat |
| LC-PER-02 CTO / security platform architect | `cto`, `secops-platform-architect` | Split eng sponsor vs SecOps platform architect |
| LC-PER-03 Head of SOC | `soc-lead` | Existing; alias `LC-PER-03` |
| LC-PER-04 Detection / security automation | `detection-engineer` | Alias includes Security automation engineer |
| LC-PER-05 SOC analyst / IR | `soc-analyst`, `incident-response` | Split triage vs response |
| LC-PER-06 Enterprise CISO | `ciso` | Existing; alias `LC-PER-06` |
| LC-PER-07 Security startup / product eng leader | `security-product-leader` | New typed seat |
| LC committee: finance/procurement | `procurement` | Buying-committee blocker seat |
| LC committee: service delivery / CS | `service-delivery` | Provider onboarding/support seat |
| LC committee: legal/privacy/compliance | `legal-counsel`, `privacy`, `grc-owner` | Split legal paper from privacy/GRC veto |
| LC committee: IT / infrastructure / identity | `it-security`, `platform`, `identity-security` | Deployment permission seats (aliases noted) |
| LC use case: email security | `email-security` | Split from broad `it-security` when SEG/API mail is the job |

### SEC-PER-34 — Provider founder / CEO (`provider-founder`)

- **Source:** LC-PER-01 hypothesis in LimaCharlie audience research.[^LC-AUD]
- **Discovery:** “What limits profitable customer growth today, and who owns that constraint?”
- **Boundary:** Not the day-to-day `mssp-ops` operator unless the founder still wears that hat.

### SEC-PER-35 — SecOps platform architect (`secops-platform-architect`)

- **Source:** LC-PER-02 security-platform architect seat.[^LC-AUD]
- **Discovery:** “What must your team own, and what would you prefer to stop maintaining?”
- **Boundary:** Distinct from enterprise `security-architect` (broad controls) and from `platform` DevOps paved roads.

### SEC-PER-36 — Security product / AI SOC builder (`security-product-leader`)

- **Source:** LC-PER-07 / LC-AUD-04.[^LC-AUD]
- **Discovery:** “Which part of the product must be yours, and what dependency risk can you accept?”

### SEC-PER-37 — IR firm / DFIR services lead (`ir-services-lead`)

- **Source:** LC-AUD-05 incident response firm audience.[^LC-AUD]
- **Discovery:** “Endpoint visibility, response actions, or both—and what permission boundary is unacceptable?”

### SEC-PER-38 — Security service delivery / CS (`service-delivery`)

- **Source:** LC additional buying-committee role (service delivery / customer success).[^LC-AUD]
- **Discovery:** “Who is the named operating owner after go-live?”

### SEC-PER-39 — Procurement / finance (`procurement`)

- **Source:** LC additional buying-committee role (finance / procurement).[^LC-AUD]
- **Discovery:** “How will usage variability be capped or forecast?”

### SEC-PER-40 — vCISO (`vciso`)

- **Hypothesis** common for SMB / mid-market and MSSP-attached leadership; confirm whether they recommend tools, MSSP, or process only.
- **Discovery:** “Who operates the control after you leave the engagement?”

### SEC-PER-41 — Malware / reverse engineer (`malware-analyst`)

- **Source:** Specialty SOC role commonly listed beside Tier 1–3 analysts.[^PAN-SOC]
- **Discovery:** “How do analysis findings reach detection engineering and IR?”

### SEC-PER-42 — Legal counsel for security buys (`legal-counsel`)

- **Source:** LC additional buying-committee role (legal / privacy / compliance)—legal paper distinct from privacy program or GRC evidence.[^LC-AUD]
- **Discovery:** “Which clauses usually stall security vendors here?”
- **Boundary:** Not the DPO/`privacy` program owner and not `grc-owner` questionnaire work unless one person wears all three hats.

### SEC-PER-43 — Email security owner (`email-security`)

- **Source:** Vendor use-case positioning for email security as a SecOps-adjacent control; corporate SEG/API mail often sits with ITSec—split when the seat is dedicated.[^LC-AUD]
- **Discovery:** “Gateway policy, API mailbox detection, or user reporting—and who remediates a compromised mailbox?”
- **Boundary:** Distinct from `security-awareness` (behavior/sims) and from broad `it-security` when email is only one of many estates.

## Buying-committee collisions to qualify

| Collision | What goes wrong | Qualification question |
| --- | --- | --- |
| AppSec scanner vs ProdSec program | Tooling sold as a “program” | Is the gap a finding pipeline or a launch/disclosure process? |
| AppSec secret finding vs platform vault | Detection without revoke/rotate | Who is allowed to revoke, and who operates the approved secret path? |
| PlatformSec policy vs DevOps delivery | Gate without paved road (or road without bar) | Who changes the shared template, and who accepts exceptions? |
| IT VM vs AppSec SCA | Same word “vulnerability,” different queue | Is the asset an employee laptop/server image or a library in a repo? |
| Cloud security vs PlatformSec | Account posture vs shared delivery rails | Is the failure a cloud control-plane gap or a CI/image/admission gap? |
| DSPM vs DLP vs privacy | One “data” pitch, three jobs | Store discovery, egress channel, or policy/evidence? |
| SOC tooling vs preventive control | Detection sold as prevention (or reverse) | Is the pain investigate/respond or stop/build differently? |
| AI platform vs AI security | Gateway shipped without control ownership | Who can approve agent actions and data paths? |
| GRC evidence vs control operator | Questionnaire answered without an operator | Who runs the control the evidence claims exists? |
| CISO sponsor vs operator | Signature without adoption | Who is on-call for exceptions after go-live? |
| SOC analyst vs detection eng | Alert UI vs content ownership | Who writes/tests the detection vs who triages it? |
| IR vs forensics | Contain now vs preserve evidence | Is the immediate job stop-the-bleeding or case-ready evidence? |
| SSPM vs CASB/SSE | Posture vs access path | SaaS misconfig/grants or user-to-SaaS traffic/policy? |
| EASM vs AppSec | Internet assets vs code findings | Reachability inventory or repository vulnerability? |
| OT vs IT corporate | Plant safety vs laptop estate | Which change board can approve the control? |
| Awareness vs email security | Training vs gateway | Behavior program or SEG/API mail control? |
| MSSP ops vs enterprise SOC | Multi-tenant margin vs internal queue | Selling a service or operating one org’s SOC? |
| Provider founder vs MSSP ops | Signature vs delivery reality | Who owns margin math vs who owns the queue? |
| SecOps platform architect vs detection eng | Infrastructure vs content | Building the rails or writing detections on them? |
| Security product builder vs enterprise SOC | Embed dependency vs operate defense | Shipping a product or defending one company? |
| IR firm vs enterprise IR | Engagement tooling vs standing SOC | Retainer/breach response or full-time SOC seat? |
| vCISO vs CISO | Advisory vs employed authority | Can they approve spend and name an operator? |
| Legal vs privacy vs GRC | Contract stall vs DPIA vs questionnaire | Which veto is active on this deal? |
| EmailSec vs ITSec vs awareness | Gateway vs estate owner vs training | SEG/API mail control or people program? |
| IT / infra / identity committee | Deployment blocked after security says yes | Who must grant integrate/change permission? |

## Fit worksheet (do not score leads from titles alone)

1. Name the estate: product code, shared platform, cloud account, data store/channel, AI workflow, or corporate IT.
2. Name the primary owner and the fixer queue.
3. Name budget line hypotheses separately from champion enthusiasm.
4. List retained commitments (existing SAST, EDR, vault, CNAPP, SIEM, DSPM).
5. Agree evaluation measures and failure conditions before a bake-off.
6. Record Unknowns explicitly—especially economic buyer and segment thresholds.

## Claims, uncertainty and refresh

| Claim ID | Statement | Status / source | Limit |
| --- | --- | --- | --- |
| SEC-ORG-C01 | Atlas domains already separate appsec, product, platform, corporate, and neighbors | Local catalog; domain seeds | Not proof of any customer’s org chart |
| SEC-ORG-C02 | OWASP DevSecOps Guideline distinguishes AppSec vs platform paved-road roles | Practitioner guideline [^OWASP-ROLES] | Not budget authority; not universal titles |
| SEC-ORG-C03 | Practitioner sources separate AppSec vs ProdSec and PlatformSec vs AppSec vs cloud | [^SNYK-PROD][^PLATSEC-OWN] | Vendor/practitioner framing; not independent interview validation |
| SEC-ORG-C04 | NICE Framework defines work roles (IR, Threat Analysis, OT, Insider Threat, Forensics, C-SCRM, Secure Software Development, etc.) that are not job titles | [^NICE-ROLES][^NICE-IR][^NICE-TA] | Employer titles and budgets still require discovery |
| SEC-ORG-C05 | SOC literature commonly separates Tier-1 triage, Tier-2 IR, Tier-3 hunt, and SOC manager | [^PAN-SOC] | Vendor encyclopedia; not a universal org chart |
| SEC-ORG-C06 | SSPM and CASB are often complementary but different jobs (posture vs access/data path) | [^SSPM-CASB] | Vendor/practitioner framing; product editions vary |
| SEC-ORG-C07 | LimaCharlie research defines LC-AUD-01–05 and LC-PER-01–07 as working hypotheses for SecOps/platform buyers | [^LC-AUD] | Not revenue mix, ICP thresholds, or proven champions |
| SEC-ORG-H01 | Core-five through wave-four pains, triggers, measures in this note | Hypothesis | Validate in discovery |
| SEC-ORG-U01 | Typical budget split, headcount ratios, and win rates across these seats | Unknown | Needs authorized deal/cohort evidence |

## Cross-repository disposition

- **Security Market Map — update:** this research note; typed personas with `aliases` across core five, adjacent, wave-three, and LimaCharlie-mapped wave-four seats; landscape filter labels sample aliases. No fabricated capability cells.
- **Builder Academy Roles DB — update:** enrich/add matching role rows (including provider founder, SecOps platform architect, security product builder, IR firm, procurement, legal counsel, email security, vCISO) with also-known-as text.
- **Private career preparation — update only by explicit request:** may reference this version for interview questions; no private answers belong here.
- **GTM Revenue OS / Account Signal Engine — no automatic change:** role hypotheses are not account intent or enrichment facts.

## Original sources

Observed 2026-10-27. Living pages; publication dates not established unless noted. Paraphrase only. NICE Framework Components version cited on NICCS as 2.2.0 when retrieved.

[^OWASP-ROLES]: OWASP DevSecOps Guideline — Roles and Responsibilities: https://owasp.github.io/DevSecOpsGuideline/1-People/1-1-Shape-the-team/1-1-2-Roles-and-Responsibilities/
[^SNYK-PROD]: Snyk — Product Security vs. Application Security: https://snyk.io/articles/enterprise-security/product-security-vs-application-security/
[^PLATSEC-OWN]: PlatformSecurity — Platform Security vs AppSec vs Cloud Security: Who Owns What?: https://platformsecurity.com/blog/platform-security-vs-appsec-vs-cloud-security-ownership
[^CIS]: CIS Critical Security Controls: https://www.cisecurity.org/controls
[^NICE-ROLES]: NICCS / NIST — NICE Workforce Framework for Cybersecurity (work role categories and roles; work roles ≠ job titles): https://niccs.cisa.gov/workforce-development/nice-framework
[^NICE-IR]: NICCS — Incident Response work role: https://niccs.cisa.gov/tools/nice-framework/work-role/incident-response
[^NICE-TA]: NICCS — Threat Analysis work role: https://niccs.cisa.gov/tools/nice-framework/work-role/threat-analysis
[^PAN-SOC]: Palo Alto Networks Cyberpedia — Security Operations Center (SOC) Roles and Responsibilities (Tier 1–3 and SOC manager): https://www.paloaltonetworks.com/cyberpedia/soc-roles-and-responsibilities
[^SSPM-CASB]: Check Point — SSPM vs CASB (posture vs access-path framing): https://www.checkpoint.com/cyber-hub/threat-prevention/saas-security-posture-management-sspm/sspm-vs-casb/
[^LC-AUD]: Security Market Map — LimaCharlie audience and buyer personas: [limacharlie-audience-personas.md](limacharlie-audience-personas.md)
