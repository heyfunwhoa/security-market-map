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
| SEC-ORG-H01 | Core-five and wave-two pains, triggers, measures in this note | Hypothesis | Validate in discovery |
| SEC-ORG-U01 | Typical budget split, headcount ratios, and win rates across these seats | Unknown | Needs authorized deal/cohort evidence |

## Cross-repository disposition

- **Security Market Map — update:** this research note; typed personas with `aliases` for core five plus adjacent seats (including `privacy`, `security-champion`); landscape filter labels sample aliases. No fabricated capability cells.
- **Builder Academy Roles DB — update:** keep/enrich AppSec, ProdSec, PlatformSec, DevOps, IT corporate, CISO, architect, cloud, IAM, data, detection, offensive, AI security, GRC; add privacy and security-champion rows; store acronyms in role names/body where useful.
- **Private career preparation — update only by explicit request:** may reference this version for interview questions; no private answers belong here.
- **GTM Revenue OS / Account Signal Engine — no automatic change:** role hypotheses are not account intent or enrichment facts.

## Original sources

Observed 2026-10-27. Living pages; publication dates not established unless noted. Paraphrase only.

[^OWASP-ROLES]: OWASP DevSecOps Guideline — Roles and Responsibilities: https://owasp.github.io/DevSecOpsGuideline/1-People/1-1-Shape-the-team/1-1-2-Roles-and-Responsibilities/
[^SNYK-PROD]: Snyk — Product Security vs. Application Security: https://snyk.io/articles/enterprise-security/product-security-vs-application-security/
[^PLATSEC-OWN]: PlatformSecurity — Platform Security vs AppSec vs Cloud Security: Who Owns What?: https://platformsecurity.com/blog/platform-security-vs-appsec-vs-cloud-security-ownership
[^CIS]: CIS Critical Security Controls: https://www.cisecurity.org/controls
