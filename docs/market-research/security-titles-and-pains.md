# Security seats — functions, titles, acronyms, and pains

As of: 2026-10-13. Generated from `lib/data/persona-profiles.ts`, `lib/data/stakeholders.ts`, and `lib/data/titles.ts` by `renderTitlesAndPains()`. Do not hand-edit; run `npm run docs:personas`.

Use `matchTitle("Sr. Manager, Product Security")` in `lib/title-match.ts` to resolve a real title to seat, function, seniority, and confidence. Titles and roles are hypotheses for routing research; confirm authority and budget in discovery.

## Seniority levels

| Level | Reads from titles like | Usually plays |
| --- | --- | --- |
| C-level / founder | Chief …, CISO/CTO/CIO/CFO, Founder | economic-buyer, executive-sponsor, approver |
| VP / SVP | VP, SVP, EVP | economic-buyer, approver, executive-sponsor |
| Director / head of | Director, Senior Director, Head of | budget-owner-possible, approver, evaluator |
| Manager | Manager, Sr. Manager, Supervisor | evaluator, operator, budget-owner-possible |
| Senior / staff / principal / lead IC | Senior, Staff, Principal, Lead, Architect | evaluator, influencer, operator |
| Individual contributor | Engineer, Analyst, Administrator | user, evaluator, influencer |

"Head of" reads as director by default; at small companies it is often the top seat.

## Acronyms that need care

| Acronym | Means | Watch out |
| --- | --- | --- |
| CSO | Chief Security Officer | Sometimes physical security or a strategy role |
| BISO | Business Information Security Officer | Embedded security lead for one business unit, not the company CISO |
| vCISO | Virtual / fractional CISO | Usually an outside advisor; check who actually decides |
| CPO | Chief Privacy Officer | Also Chief Product Officer or Chief People Officer |
| HRM | Human risk management | Also human resources management |
| DevSecOps | Development, security and operations | Overloaded: can mean an AppSec engineer, a platform security engineer, or a DevOps engineer with security duties |
| CorpSec | Corporate security | Sometimes physical security |
| SOC | Security operations center | SOC 1 / SOC 2 are audit reports owned by GRC, not the security operations center |
| IR | Incident response | Also investor relations |
| MDR | Managed detection and response | Provider seat or the customer who buys it |
| IRM | Insider risk management | Also integrated risk management (GRC) |
| VM | Vulnerability management | Also virtual machine |

## Security (29)

| Seat | Acronyms | Typical titles by level | Pains |
| --- | --- | --- | --- |
| `ciso` CISO / VP of security | CISO, CSO, BISO, vCISO | **Dir:** Director of Security; Head of Security<br>**VP:** VP of Security<br>**C:** CISO; Chief Information Security Officer | Scope keeps growing faster than team and budget (Socket)<br>Must prove business impact and ROI to get spend approved (Socket) |
| `security-architect` Security architect | BISO | **Sr IC:** Senior Security Architecture Architect; Staff Security Architecture Architect<br>**Mgr:** Security Architecture Manager; Security Architect Manager<br>**Dir:** Director of Security Architecture; Head of Security Architecture | Teams buy overlapping tools that bypass shared standards<br>Design reviews happen too late to change anything |
| `identity-security` Identity security lead | IAM, NHI, ITDR, CIAM, CIEM | **IC:** Identity Security Engineer; Identity and Access Management Engineer<br>**Sr IC:** Senior Identity Security Engineer; Staff Identity Security Engineer<br>**Mgr:** Identity Security Manager; Identity and Access Management Manager<br>**Dir:** Director of Identity Security; Head of Identity Security<br>**VP:** VP of Identity Security | Third-party access widens exposure beyond the identity team's view (Verizon)<br>Machine identities and credentials outnumber and outlive their owners |
| `iga-owner` IGA program owner | IAM, IGA, HRIS | **IC:** Identity Governance Engineer; IGA Engineer<br>**Sr IC:** Senior Identity Governance Engineer; Staff Identity Governance Engineer<br>**Mgr:** Identity Governance Manager; IGA Manager<br>**Dir:** Director of Identity Governance; Head of Identity Governance | Access reviews get rubber-stamped<br>Leavers keep access because HR and IT records disagree |
| `pam-owner` PAM owner | PAM, PIM | **IC:** Privileged Access Engineer; PAM Engineer<br>**Sr IC:** Senior Privileged Access Engineer; Staff Privileged Access Engineer<br>**Mgr:** Privileged Access Manager; PAM Manager<br>**Dir:** Director of Privileged Access; Head of Privileged Access | Standing admin privilege is hard to remove<br>App teams resist moving credentials into the vault |
| `appsec` AppSec lead | AppSec, ASE, SSDLC, DevSecOps | **IC:** Application Security Engineer; AppSec Engineer<br>**Sr IC:** Senior Application Security Engineer; Staff Application Security Engineer<br>**Mgr:** Application Security Manager; AppSec Manager<br>**Dir:** Director of Application Security; Head of Application Security<br>**VP:** VP of Application Security | False positives and duplicate findings drown real issues (Enterprise Security Tech)<br>Findings without a named owner never get fixed |
| `cloud-sec` Cloud security | InfraSec, NHI, CloudSec, CSPM, CNAPP, CIEM | **IC:** Cloud Security Engineer; CloudSec Engineer<br>**Sr IC:** Senior Cloud Security Engineer; Staff Cloud Security Engineer<br>**Mgr:** Cloud Security Manager; CloudSec Manager<br>**Dir:** Director of Cloud Security; Head of Cloud Security<br>**VP:** VP of Cloud Security | Posture findings outnumber the people who can fix them<br>Multi-cloud and fast-changing accounts break visibility |
| `data-security` Data security | DSPM, DLP | **IC:** Data Security Engineer; Data Loss Prevention Engineer<br>**Sr IC:** Senior Data Security Engineer; Staff Data Security Engineer<br>**Mgr:** Data Security Manager; Data Loss Prevention Manager<br>**Dir:** Director of Data Security; Head of Data Security<br>**VP:** VP of Data Security | Don't know where sensitive data sits across SaaS and cloud<br>DLP either blocks the business or misses real leaks |
| `ai-security` AI security | AISec | **IC:** AI Security Engineer; AI Red Team Engineer<br>**Sr IC:** Senior AI Security Engineer; Staff AI Security Engineer<br>**Mgr:** AI Security Manager; AI Red Team Manager<br>**Dir:** Director of AI Security; Head of AI Security<br>**VP:** VP of AI Security | The AI risk taxonomy changes every year (OWASP GenAI Security Project)<br>Agents use credentials nobody inventoried |
| `it-security` IT / corporate security | DLP, SASE, CorpSec, EDR, VM | **IC:** IT Security Engineer; Corporate Security Engineer<br>**Sr IC:** Senior IT Security Engineer; Staff IT Security Engineer<br>**Mgr:** IT Security Manager; Corporate Security Manager<br>**Dir:** Director of IT Security; Head of IT Security<br>**VP:** VP of IT Security | Patch backlog on endpoints and servers<br>Too many overlapping endpoint and email tools |
| `product-security` Product security lead | ProdSec, PSIRT, SSDLC | **IC:** Product Security Engineer; ProdSec Engineer<br>**Sr IC:** Senior Product Security Engineer; Staff Product Security Engineer<br>**Mgr:** Product Security Manager; ProdSec Manager<br>**Dir:** Director of Product Security; Head of Product Security<br>**VP:** VP of Product Security | Launch deadlines arrive before the security review<br>Customer questionnaires and researcher reports pile up |
| `platform-security` Platform security | PlatSec, InfraSec, DevSecOps | **IC:** Platform Security Engineer; Infrastructure Security Engineer<br>**Sr IC:** Senior Platform Security Engineer; Staff Platform Security Engineer<br>**Mgr:** Platform Security Manager; Infrastructure Security Manager<br>**Dir:** Director of Platform Security; Head of Platform Security | One bad template or base image repeats the same flaw across every team<br>Secrets and credentials sprawl across CI and images (GitGuardian) |
| `soc-lead` SOC manager | ITDR, EDR, SOC, SecOps, SIEM, SOAR, XDR, MDR | **Mgr:** Security Operations Manager; SOC Manager<br>**Dir:** Director of Security Operations; Head of Security Operations<br>**VP:** VP of Security Operations | Keeping skilled analysts (SANS Institute)<br>SOC work is disconnected from the business; many staff don't know the SOC budget (SANS Institute) |
| `detection-engineer` Detection engineer | SecOps, SIEM, SOAR, DetEng | **IC:** Detection Engineering Engineer; Detection Engineer<br>**Sr IC:** Senior Detection Engineering Engineer; Staff Detection Engineering Engineer<br>**Mgr:** Detection Engineering Manager; Detection Manager<br>**Dir:** Director of Detection Engineering; Head of Detection Engineering | False positives are the top detection challenge (Stamus Networks)<br>Missing telemetry for new environments |
| `offensive-security` Security validation / offensive | OffSec, BAS | **IC:** Offensive Security Engineer; Red Team Engineer<br>**Sr IC:** Senior Offensive Security Engineer; Staff Offensive Security Engineer<br>**Mgr:** Offensive Security Manager; Red Team Manager<br>**Dir:** Director of Offensive Security; Head of Offensive Security<br>**VP:** VP of Offensive Security | Validated findings don't get remediated<br>Point-in-time tests go stale fast |
| `grc-owner` GRC or trust lead | BISO, GRC, TPRM, VRM, C-SCRM | **IC:** GRC Analyst; Governance Risk and Compliance Analyst<br>**Sr IC:** Senior GRC Analyst; Lead GRC Analyst<br>**Mgr:** GRC Manager; Governance Risk and Compliance Manager<br>**Dir:** Director of GRC; Head of GRC<br>**VP:** VP of GRC | Vendor and customer questionnaires eat hours every week (Whistic)<br>Evidence depends on control owners who don't report to GRC |
| `soc-analyst` SOC analyst | SOC, SecOps | **IC:** SOC Analyst; Security Operations Analyst<br>**Sr IC:** Senior SOC Analyst; Lead SOC Analyst | Alert fatigue from noisy, low-context alerts (Stamus Networks)<br>Burnout and limited career path (SANS Institute) |
| `incident-response` Incident responder | IR, CSIRT, DFIR | **IC:** Incident Response Analyst; IR Analyst<br>**Sr IC:** Senior Incident Response Analyst; Lead Incident Response Analyst<br>**Mgr:** Incident Response Manager; IR Manager<br>**Dir:** Director of Incident Response; Head of Incident Response | Unclear authority to contain<br>Third-party incidents with little visibility (Verizon) |
| `threat-hunter` Threat hunter | — | **IC:** Threat Hunting Analyst; Threat Hunter Analyst<br>**Sr IC:** Senior Threat Hunting Analyst; Lead Threat Hunting Analyst<br>**Mgr:** Threat Hunting Manager; Threat Hunter Manager | Hunts fail on missing telemetry<br>Hunting time gets eaten by triage |
| `threat-intel` Threat intelligence analyst | CTI | **IC:** Threat Intelligence Analyst; Cyber Threat Intelligence Analyst<br>**Sr IC:** Senior Threat Intelligence Analyst; Lead Threat Intelligence Analyst<br>**Mgr:** Threat Intelligence Manager; Cyber Threat Intelligence Manager<br>**Dir:** Director of Threat Intelligence; Head of Threat Intelligence | Intel doesn't turn into detections or blocks<br>Hard to show value to the teams who consume it |
| `digital-forensics` Digital forensics | DFIR | **IC:** Digital Forensics Analyst; Forensics Analyst<br>**Sr IC:** Senior Digital Forensics Analyst; Lead Digital Forensics Analyst<br>**Mgr:** Digital Forensics Manager; Forensics Manager<br>**Dir:** Director of Digital Forensics; Head of Digital Forensics | Evidence lost during fast containment<br>Retainer scope doesn't match the incident |
| `insider-risk` Insider risk | IRM | **IC:** Insider Risk Analyst; Insider Threat Analyst<br>**Sr IC:** Senior Insider Risk Analyst; Lead Insider Risk Analyst<br>**Mgr:** Insider Risk Manager; Insider Threat Manager<br>**Dir:** Director of Insider Risk; Head of Insider Risk | Privacy and HR limits on monitoring<br>Cases cut across HR, legal, and security |
| `network-security` Network security | NetSec, SASE, SSE, CASB | **IC:** Network Security Engineer; NetSec Engineer<br>**Sr IC:** Senior Network Security Engineer; Staff Network Security Engineer<br>**Mgr:** Network Security Manager; NetSec Manager<br>**Dir:** Director of Network Security; Head of Network Security | Edge devices and VPNs are prime exploitation targets<br>Lateral movement is hard to see |
| `saas-security` SaaS security | SSE, SSPM, CASB | **IC:** SaaS Security Engineer; Business Application Security Engineer<br>**Sr IC:** Senior SaaS Security Engineer; Staff SaaS Security Engineer<br>**Mgr:** SaaS Security Manager; Business Application Security Manager<br>**Dir:** Director of SaaS Security; Head of SaaS Security | Hundreds of SaaS apps configured by business owners<br>OAuth grants and integrations nobody reviews |
| `ot-security` OT / ICS security | OT, ICS | **IC:** OT Security Engineer; ICS Security Engineer<br>**Sr IC:** Senior OT Security Engineer; Staff OT Security Engineer<br>**Mgr:** OT Security Manager; ICS Security Manager<br>**Dir:** Director of OT Security; Head of OT Security<br>**VP:** VP of OT Security | Can't patch or scan without risking downtime<br>No complete asset inventory for plants and control systems (ISA Global Cybersecurity Alliance) |
| `exposure-management` Exposure / attack-surface owner | EASM, CTEM, VM | **IC:** Exposure Management Analyst; Attack Surface Management Analyst<br>**Sr IC:** Senior Exposure Management Analyst; Lead Exposure Management Analyst<br>**Mgr:** Exposure Management Manager; Attack Surface Management Manager<br>**Dir:** Director of Exposure Management; Head of Exposure Management | Asset inventory is incomplete<br>Exposures get routed to the wrong owner |
| `cyber-recovery` Cyber recovery / resilience | — | **IC:** Cyber Recovery Engineer; Cyber Resilience Engineer<br>**Sr IC:** Senior Cyber Recovery Engineer; Staff Cyber Recovery Engineer<br>**Mgr:** Cyber Recovery Manager; Cyber Resilience Manager<br>**Dir:** Director of Cyber Recovery; Head of Cyber Recovery | Restores never tested against a ransomware scenario<br>Backups reachable by the same attacker |
| `supply-chain-security` Software supply-chain security | C-SCRM, SBOM | **IC:** Software Supply Chain Security Engineer; Supply Chain Security Engineer<br>**Sr IC:** Senior Software Supply Chain Security Engineer; Staff Software Supply Chain Security Engineer<br>**Mgr:** Software Supply Chain Security Manager; Supply Chain Security Manager<br>**Dir:** Director of Software Supply Chain Security; Head of Software Supply Chain Security | Can't tell which dependency issues are reachable or malicious<br>Customers and regulators ask for SBOMs and provenance |
| `security-awareness` Security awareness / people security | SATE, HRM | **IC:** Security Awareness Specialist; Human Risk Specialist<br>**Sr IC:** Senior Security Awareness Specialist; Lead Security Awareness Specialist<br>**Mgr:** Security Awareness Manager; Human Risk Manager<br>**Dir:** Director of Security Awareness; Head of Security Awareness | Completion rates don't show behavior change<br>Phishing still works despite training |

## Engineering (6)

| Seat | Acronyms | Typical titles by level | Pains |
| --- | --- | --- | --- |
| `platform` DevOps / platform engineering | DevSecOps, NHI, SRE | **IC:** Platform Engineering Engineer; Platform Engineer<br>**Sr IC:** Senior Platform Engineering Engineer; Staff Platform Engineering Engineer<br>**Mgr:** Platform Engineering Manager; Platform Manager<br>**Dir:** Director of Platform Engineering; Head of Platform Engineering<br>**VP:** VP of Platform Engineering | Security tickets and credential requests create toil<br>Static secrets break deploys and leak (GitGuardian) |
| `ai-owner` AI platform owner | MLOps | **IC:** AI Platform Engineer; ML Platform Engineer<br>**Sr IC:** Senior AI Platform Engineer; Staff AI Platform Engineer<br>**Mgr:** AI Platform Manager; ML Platform Manager<br>**Dir:** Director of AI Platform; Head of AI Platform<br>**VP:** VP of AI Platform | Shipping agents faster than controls exist<br>Unclear who approves agent data and tool access |
| `engineering-manager` Engineering manager | EM | **Mgr:** Engineering Manager; Software Engineering Manager<br>**Dir:** Director of Engineering; Head of Engineering | Security work competes with the roadmap<br>Findings arrive without fix guidance (Latio Tech) |
| `security-champion` Security champion | — | **IC:** Security Champion<br>**Sr IC:** Senior Security Champion | Security work isn't in the sprint plan<br>No time or training to triage findings |
| `developer` Software developer | CIAM, SWE | **IC:** Software Engineer; Backend Engineer<br>**Sr IC:** Senior Software Engineer; Staff Software Engineer | Hours lost each week to false positives and duplicate findings (Digitalisation World)<br>Security gates slow shipping |
| `cto` CTO / VP of engineering | CTO | **VP:** VP of Engineering<br>**C:** CTO; Chief Technology Officer | Security tools that aren't developer-friendly slow delivery (Latio Tech)<br>Enterprise deals need security proof the team can't produce fast |

## IT (2)

| Seat | Acronyms | Typical titles by level | Pains |
| --- | --- | --- | --- |
| `cio` CIO / VP of IT | CIO | **Dir:** Director of IT; Head of IT<br>**VP:** VP of IT<br>**C:** CIO; Chief Information Officer | Security and IT budgets compete<br>Every new tool adds support load |
| `it-operations` IT operations / systems administrator | — | **IC:** IT Operations Administrator; IT Administrator<br>**Sr IC:** Senior IT Operations Administrator; Lead IT Operations Administrator<br>**Mgr:** IT Operations Manager; IT Manager<br>**Dir:** Director of IT Operations; Head of IT Operations | Every security tool adds agents and tickets<br>Too few people for patching and access requests |

## Legal & privacy (2)

| Seat | Acronyms | Typical titles by level | Pains |
| --- | --- | --- | --- |
| `privacy` Privacy / DPO | DPO, CPO | **IC:** Privacy Analyst; Data Protection Analyst<br>**Sr IC:** Senior Privacy Analyst; Lead Privacy Analyst<br>**Mgr:** Privacy Manager; Data Protection Manager<br>**Dir:** Director of Privacy; Head of Privacy<br>**VP:** VP of Privacy<br>**C:** CPO; Chief Privacy Officer | Can't say where personal data lives or who touches it<br>New privacy rules land faster than the program can adapt |
| `legal` Legal / general counsel | GC | **IC:** Legal Counsel; Commercial Legal Counsel<br>**Sr IC:** Senior Legal Counsel; Lead Legal Counsel<br>**Mgr:** Legal Manager; Commercial Legal Manager<br>**Dir:** Director of Legal; Head of Legal<br>**VP:** VP of Legal | Short incident disclosure windows for public companies (K&L Gates)<br>Data processing terms vary by vendor and region |

## Finance & procurement (2)

| Seat | Acronyms | Typical titles by level | Pains |
| --- | --- | --- | --- |
| `cfo` CFO / finance | CFO, FP&A | **IC:** Finance Analyst; FP&A Analyst<br>**Sr IC:** Senior Finance Analyst; Lead Finance Analyst<br>**Mgr:** Finance Manager; FP&A Manager<br>**Dir:** Director of Finance; Head of Finance<br>**VP:** VP of Finance<br>**C:** CFO; Chief Financial Officer | Security spend rising without clear ROI (Socket)<br>Budget pressure on security teams has leveled off but not reversed (ISC2) |
| `procurement` Procurement / vendor management | — | **IC:** Procurement Specialist; Sourcing Specialist<br>**Sr IC:** Senior Procurement Specialist; Lead Procurement Specialist<br>**Mgr:** Procurement Manager; Sourcing Manager<br>**Dir:** Director of Procurement; Head of Procurement<br>**VP:** VP of Procurement | Vendor security reviews delay purchases (Whistic)<br>Overlapping vendors and renewals |

## Executive & board (2)

| Seat | Acronyms | Typical titles by level | Pains |
| --- | --- | --- | --- |
| `ceo-founder` CEO / founder | CEO | **C:** CEO; Founder | Deals stall on customer security reviews<br>Hard to judge how much security is enough |
| `board-audit-committee` Board / audit or risk committee | — | **C:** Board; Audit committee | Personal accountability for cyber oversight in regulated sectors (Springlex, Hannes Snellman)<br>Hard to judge security posture from management reports |

## People (1)

| Seat | Acronyms | Typical titles by level | Pains |
| --- | --- | --- | --- |
| `hr-people` HR / people operations | HRIS | **IC:** People Operations Specialist; People Specialist<br>**Sr IC:** Senior People Operations Specialist; Lead People Operations Specialist<br>**Mgr:** People Operations Manager; People Manager<br>**Dir:** Director of People Operations; Head of People Operations<br>**VP:** VP of People Operations | Access changes lag HR events<br>People-risk cases need fairness and privacy |

## External providers (1)

| Seat | Acronyms | Typical titles by level | Pains |
| --- | --- | --- | --- |
| `mssp-ops` MSSP / MDR operations lead | MDR, MSSP | **IC:** Managed Security Services Analyst; Managed Detection and Response Analyst<br>**Sr IC:** Senior Managed Security Services Analyst; Lead Managed Security Services Analyst<br>**Mgr:** Managed Security Services Manager; Managed Detection and Response Manager<br>**Dir:** Director of Managed Security Services; Head of Managed Security Services<br>**VP:** VP of Managed Security Services | Per-tenant tooling cost squeezes margin<br>Analyst staffing and retention (SANS Institute) |

Pains with a publisher in parentheses are sourced (survey or report; vendor-published sources are labeled in `lib/data/persona-sources.ts`). The rest are hypotheses.
