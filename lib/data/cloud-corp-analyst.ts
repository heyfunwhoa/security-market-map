import type { Claim, Source } from "../schema";

// Cloud, AI, platform, corporate, product security, GRC and offensive analyst claims (2026-11-18).
// Category-level framing only, from SACR report text and KuppingerCole and Forrester public
// abstracts and blogs, preferring 2025-2026 pages. Each passage was re-checked against the saved
// page text. Sponsored and single-vendor pages are excluded; ratings, placements and figures are
// not adopted. See docs/market-research/cloud-corp-analyst-coverage-2026-11.md.

const RETRIEVED = "2026-11-18";

export const cloudCorpAnalystSources: Source[] = [
  {
    id: "src-kc-cnapp-lc81068",
    title: "KuppingerCole, Leadership Compass: Cloud Native Application Protection Platforms (CNAPP)",
    url: "https://www.kuppingercole.com/research/lc81068/cloud-native-application-protection-platforms-cnapp",
    canonicalUrl: "https://www.kuppingercole.com/research/lc81068/cloud-native-application-protection-platforms-cnapp",
    publisher: "KuppingerCole",
    author: "Mike Small",
    sourceType: "analyst",
    publishedAt: "2026-08-03",
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "KuppingerCole's public abstract says CNAPPs are no longer simply cloud protection solutions but are becoming the security control plane for AI-native enterprises, with leading vendors combining cloud security, AI-SPM, runtime protection, attack path analysis, cloud detection and response, and agentic AI-driven operations into unified platforms.",
  },
  {
    id: "src-kc-cnapp-bc81045",
    title: "KuppingerCole, Buyer's Compass: Cloud Native Application Protection Platforms (CNAPP)",
    url: "https://www.kuppingercole.com/research/bc81045/cloud-native-application-protection-platforms-cnapp",
    canonicalUrl: "https://www.kuppingercole.com/research/bc81045/cloud-native-application-protection-platforms-cnapp",
    publisher: "KuppingerCole",
    author: "Mike Small",
    sourceType: "analyst",
    publishedAt: "2025-06-10",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "KuppingerCole's public abstract says CNAPP platforms provide integrated tools intended to help organizations using cloud services identify and manage the risks for which they are responsible.",
  },
  {
    id: "src-forrester-cloud-federal-20250507",
    title: "Forrester blog: Tackling Cloud Security: US Federal Edition",
    url: "https://www.forrester.com/blogs/tackling-cloud-security-us-federal-edition/",
    canonicalUrl: "https://www.forrester.com/blogs/tackling-cloud-security-us-federal-edition/",
    publisher: "Forrester",
    author: "Andras Cser and Devin Dickerson",
    sourceType: "analyst",
    publishedAt: "2025-05-07",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's blog says CNAPP solutions provide cloud threat detection and response across cloud infrastructure administration, guest OS configuration and storage, container runtime and orchestration, infrastructure-as-code, and application security layers.",
  },
  {
    id: "src-forrester-uvm-20250729",
    title: "Forrester blog: unified vulnerability management, Q3 2025",
    url: "https://www.forrester.com/blogs/announcing-the-forrester-wave-unified-vulnerability-management-wave-q3-2025/",
    canonicalUrl: "https://www.forrester.com/blogs/announcing-the-forrester-wave-unified-vulnerability-management-wave-q3-2025/",
    publisher: "Forrester",
    author: "Erik Nost",
    sourceType: "analyst",
    publishedAt: "2025-07-29",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's blog says UVM solutions are central repositories for vulnerability findings that orchestrate response and track remediation, and that the focus has shifted to integrating existing sources for assessments across asset classes such as cloud, applications and IoT.",
  },
  {
    id: "src-forrester-ai-agents-data-20261102",
    title: "Forrester blog: AI Agents Aren't Waiting For Data Security",
    url: "https://www.forrester.com/blogs/ai-agents-arent-waiting-for-data-security/",
    canonicalUrl: "https://www.forrester.com/blogs/ai-agents-arent-waiting-for-data-security/",
    publisher: "Forrester",
    author: "Heidi Shey",
    sourceType: "analyst",
    publishedAt: "2026-11-02",
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "Forrester's blog says agentic AI exposes and amplifies the data weaknesses organizations already have.",
  },
  {
    id: "src-forrester-ai-detection-surface-2025",
    title: "Forrester, Key Trends In AI Detection Surface (abstract)",
    url: "https://www.forrester.com/report/key-trends-in-ai-detection-surface/RES183344",
    canonicalUrl: "https://www.forrester.com/report/key-trends-in-ai-detection-surface/RES183344",
    publisher: "Forrester",
    author: "Andras Cser and Jeff Pollard",
    sourceType: "analyst",
    publishedAt: "2025-05-29",
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "Forrester's public abstract says organizations must manage the security posture of AI in several places: cloud infrastructure; training, operational and output data; the model and algorithm; wrapper applications and APIs; and identities.",
  },
  {
    id: "src-forrester-ai-governance-20261110",
    title: "Forrester blog: AI Governance Has A Strategy Problem",
    url: "https://www.forrester.com/blogs/ai-governance-has-a-strategy-problem/",
    canonicalUrl: "https://www.forrester.com/blogs/ai-governance-has-a-strategy-problem/",
    publisher: "Forrester",
    author: "Kasia Jakimowicz and Zachary Stone",
    sourceType: "analyst",
    publishedAt: "2026-11-10",
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "Forrester's blog says that with agentic AI, organizations must govern not only what a system produces but also what it can do and access, when humans should intervene, and who is accountable.",
  },
  {
    id: "src-kc-ai-security-fabric-an82044",
    title: "KuppingerCole, Advisory Note: AI Security Fabric: Introduction and Overview",
    url: "https://www.kuppingercole.com/research/an82044/ai-security-fabric",
    canonicalUrl: "https://www.kuppingercole.com/research/an82044/ai-security-fabric",
    publisher: "KuppingerCole",
    author: "Martin Kuppinger and Phillip Messerschmidt",
    sourceType: "analyst",
    publishedAt: "2026-10-26",
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "KuppingerCole's public abstract says no single product category covers identity, governance, runtime control, security and accountability for AI agents at once.",
  },
  {
    id: "src-kc-mcp-lb80918",
    title: "KuppingerCole, Leadership Brief: Model Context Protocol: The API Security Problem Nobody Is Ready For",
    url: "https://www.kuppingercole.com/research/lb80918/model-context-protocol",
    canonicalUrl: "https://www.kuppingercole.com/research/lb80918/model-context-protocol",
    publisher: "KuppingerCole",
    author: "Alexei Balaganski",
    sourceType: "analyst",
    publishedAt: "2026-05-11",
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "KuppingerCole's public abstract says MCP has become the connective tissue of the agentic AI ecosystem and is being deployed at enterprise scale without a mature authentication baseline or reliable runtime enforcement.",
  },
  {
    id: "src-forrester-mcp-20250722",
    title: "Forrester blog: MCP Doesn't Stand For \"Many Critical Problems\", But Maybe It Should For CISOs",
    url: "https://www.forrester.com/blogs/mcp-doesnt-stand-for-many-critical-problemsbut-maybe-it-should-for-cisos/",
    canonicalUrl: "https://www.forrester.com/blogs/mcp-doesnt-stand-for-many-critical-problemsbut-maybe-it-should-for-cisos/",
    publisher: "Forrester",
    author: "Jeff Pollard and Rowan Curran",
    sourceType: "analyst",
    publishedAt: "2025-07-22",
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "Forrester's blog says that because MCP governs how agents share and retrieve context, it becomes a prime target for context poisoning, impersonation and unauthorized inference.",
  },
  {
    id: "src-forrester-kubecon-na-20251203",
    title: "Forrester blog: KubeCon NA 2025 Retrospective",
    url: "https://www.forrester.com/blogs/kubecon-na-2025-retrospective-closed-and-open-source-battle-for-the-ai-native-cloud/",
    canonicalUrl: "https://www.forrester.com/blogs/kubecon-na-2025-retrospective-closed-and-open-source-battle-for-the-ai-native-cloud/",
    publisher: "Forrester",
    author: "Brent Ellis and Lee Sustar",
    sourceType: "analyst",
    publishedAt: "2025-12-03",
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "Forrester's blog says Kubernetes security has ramped up in recent years, with developments at KubeCon including agentic security workflows based on eBPF and deep system telemetry for runtime protection.",
  },
  {
    id: "src-kc-sase-bc80175",
    title: "KuppingerCole, Buyer's Compass: Secure Access Service Edge (SASE)",
    url: "https://www.kuppingercole.com/research/bc80175/secure-access-service-edge-sase",
    canonicalUrl: "https://www.kuppingercole.com/research/bc80175/secure-access-service-edge-sase",
    publisher: "KuppingerCole",
    author: "Mike Small",
    sourceType: "analyst",
    publishedAt: "2026-03-02",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "KuppingerCole's public abstract says SASE converges SD-WAN with cloud-delivered SWG, CASB, FWaaS/NGFW, ZTNA and DLP under centralized policy at distributed points of presence, with identity as the perimeter.",
  },
  {
    id: "src-forrester-zte-sase-20250218",
    title: "Forrester blog: Why We're Moving From ZTE To SASE Terminology",
    url: "https://www.forrester.com/blogs/why-were-moving-from-zte-to-sase-terminology/",
    canonicalUrl: "https://www.forrester.com/blogs/why-were-moving-from-zte-to-sase-terminology/",
    publisher: "Forrester",
    author: "Andre Kindness",
    sourceType: "analyst",
    publishedAt: "2025-02-18",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's blog defines SASE as a solution combining security and networking functions such as SD-WAN, CASB, ZTNA and SWG, delivered and supported by a single vendor with any mix of cloud, software or hardware components.",
  },
  {
    id: "src-forrester-sase-20250910",
    title: "Forrester blog: secure access service edge solutions, Q3 2025",
    url: "https://www.forrester.com/blogs/forrester-wave-secure-access-service-edge-solutions-q3-2025-a-market-transformed/",
    canonicalUrl: "https://www.forrester.com/blogs/forrester-wave-secure-access-service-edge-solutions-q3-2025-a-market-transformed/",
    publisher: "Forrester",
    author: "Andre Kindness",
    sourceType: "analyst",
    publishedAt: "2025-09-10",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's blog says the standalone SSE market has largely disappeared, with most vendors offering SD-WAN and SSE natively or through partnerships.",
  },
  {
    id: "src-forrester-psp-20260930",
    title: "Forrester blog: proactive security platforms, Q3 2026",
    url: "https://www.forrester.com/blogs/announcing-the-forrester-wave-proactive-security-platforms-q3-2026/",
    canonicalUrl: "https://www.forrester.com/blogs/announcing-the-forrester-wave-proactive-security-platforms-q3-2026/",
    publisher: "Forrester",
    author: "Erik Nost",
    sourceType: "analyst",
    publishedAt: "2026-09-30",
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "Forrester's blog says the proactive security platform market evolved from attack surface management and unified vulnerability management, and that prioritization is only an intermediate step because a prioritized vulnerability nobody fixes is still a vulnerability.",
  },
  {
    id: "src-forrester-future-proactive-2026",
    title: "Forrester, The Future Of Proactive Security (abstract)",
    url: "https://www.forrester.com/report/the-future-of-proactive-security/RES190435",
    canonicalUrl: "https://www.forrester.com/report/the-future-of-proactive-security/RES190435",
    publisher: "Forrester",
    author: "Erik Nost",
    sourceType: "analyst",
    publishedAt: "2026-01-07",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's public abstract says visibility, prioritization and remediation have always been the foundation of vulnerability management teams.",
  },
  {
    id: "src-forrester-ot-20260910",
    title: "Forrester blog: OT Security's Next Chapter Starts When Asset Discovery Stops Being The Goal",
    url: "https://www.forrester.com/blogs/ot-securitys-next-chapter-starts-when-asset-discovery-stops-being-the-goal/",
    canonicalUrl: "https://www.forrester.com/blogs/ot-securitys-next-chapter-starts-when-asset-discovery-stops-being-the-goal/",
    publisher: "Forrester",
    author: "Paddy Harrington",
    sourceType: "analyst",
    publishedAt: "2026-09-10",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's blog says the strongest OT security solutions combine asset intelligence with risk posture management, exposure prioritization and OT-specific context, and that asset discovery is no longer a key differentiator among leaders.",
  },
  {
    id: "src-kc-ai-ot-lb82016",
    title: "KuppingerCole, AI in Operational Technology: Risks, Realities, and Resilience",
    url: "https://www.kuppingercole.com/research/lb82016/ai-in-operational-technology",
    canonicalUrl: "https://www.kuppingercole.com/research/lb82016/ai-in-operational-technology",
    publisher: "KuppingerCole",
    author: "Alexei Balaganski",
    sourceType: "analyst",
    publishedAt: "2026-02-19",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "KuppingerCole's public abstract says AI adds analytics capabilities to OT but does not alter the fundamental requirements of safety, determinism and operational continuity.",
  },
  {
    id: "src-forrester-six-questions-20260120",
    title: "Forrester blog: The Success Of Your Proactive Security Strategy Depends On Your Answer To Six Questions",
    url: "https://www.forrester.com/blogs/the-success-of-your-proactive-security-strategy-depends-on-your-answer-to-six-questions/",
    canonicalUrl: "https://www.forrester.com/blogs/the-success-of-your-proactive-security-strategy-depends-on-your-answer-to-six-questions/",
    publisher: "Forrester",
    author: "Erik Nost",
    sourceType: "analyst",
    publishedAt: "2026-01-20",
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "Forrester's blog says visibility is shifting from a static asset list to environment signals such as endpoints, cloud platforms, identities, configurations and detections, and that continuous testing validates whether exposures are reachable and exploitable.",
  },
  {
    id: "src-forrester-psp-cumulate-20251113",
    title: "Forrester blog: Proactive Security Platforms Will Cumulate Visibility, Prioritization, And Remediation",
    url: "https://www.forrester.com/blogs/proactive-security-platforms-will-cumulate-visibility-prioritization-and-remediation/",
    canonicalUrl: "https://www.forrester.com/blogs/proactive-security-platforms-will-cumulate-visibility-prioritization-and-remediation/",
    publisher: "Forrester",
    author: "Erik Nost",
    sourceType: "analyst",
    publishedAt: "2025-11-13",
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "Forrester's blog says asset discovery and hardening are prerequisites to exposure management, that external asset discovery is becoming commoditized, and that ASM is still an important feature but dead as a standalone market.",
  },
  {
    id: "src-kc-asm-lc80986",
    title: "KuppingerCole, Leadership Compass: Attack Surface Management",
    url: "https://www.kuppingercole.com/research/lc80986/attack-surface-management",
    canonicalUrl: "https://www.kuppingercole.com/research/lc80986/attack-surface-management",
    publisher: "KuppingerCole",
    author: "Osman Celik",
    sourceType: "analyst",
    publishedAt: "2026-10-21",
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "KuppingerCole's public abstract says organizations need a continuously updated, prioritized view of their attack surface because AI adoption, cloud sprawl and third-party dependencies are expanding faster than periodic testing can cover.",
  },
  {
    id: "src-kc-asm-bc81043",
    title: "KuppingerCole, Buyer's Compass: Attack Surface Management",
    url: "https://www.kuppingercole.com/research/bc81043/attack-surface-management",
    canonicalUrl: "https://www.kuppingercole.com/research/bc81043/attack-surface-management",
    publisher: "KuppingerCole",
    author: "Osman Celik",
    sourceType: "analyst",
    publishedAt: "2025-06-03",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "KuppingerCole's public abstract says digital transformation has expanded the attack surface to include cloud services, mobile devices, IoT endpoints and APIs.",
  },
  {
    id: "src-forrester-microseg-20260820",
    title: "Forrester blog: microsegmentation solutions, Q3 2026",
    url: "https://www.forrester.com/blogs/announcing-the-forrester-wave-for-microsegmentation-solutions-q3-2026-not-your-parents-access-control-solution/",
    canonicalUrl: "https://www.forrester.com/blogs/announcing-the-forrester-wave-for-microsegmentation-solutions-q3-2026-not-your-parents-access-control-solution/",
    publisher: "Forrester",
    author: "James Plouffe",
    sourceType: "analyst",
    publishedAt: "2026-08-20",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's blog says any Zero Trust strategy without microsegmentation is incomplete, and that regulatory regimes place growing emphasis on network segmentation, up to mandating it.",
  },
  {
    id: "src-kc-cloud-backup-bc81047",
    title: "KuppingerCole, Buyer's Compass: Cloud Backup for Cyber Resilience",
    url: "https://www.kuppingercole.com/research/bc81047/cloud-backup-for-cyber-resilience",
    canonicalUrl: "https://www.kuppingercole.com/research/bc81047/cloud-backup-for-cyber-resilience",
    publisher: "KuppingerCole",
    author: "Mike Small",
    sourceType: "analyst",
    publishedAt: "2026-02-16",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "KuppingerCole's public abstract says recovery is as critical as prevention, and that cloud backup and DR must protect business data and infrastructure metadata, meet RPO/RTO, and withstand ransomware through immutability, air gaps, strong IAM and monitoring.",
  },
  {
    id: "src-sacr-outlook-2026",
    title: "SACR, Cybersecurity 2026 Outlook",
    url: "https://softwareanalyst.io/reports/sacr-cybersecurity-2026-outlook",
    canonicalUrl: "https://softwareanalyst.io/reports/sacr-cybersecurity-2026-outlook",
    publisher: "Software Analyst Cyber Research",
    author: "Francis Odum, Aqsa Taylor, Jensy Johny, Lawrence Pingree and Jocelyn Lee",
    sourceType: "analyst",
    publishedAt: "2026-01-14",
    retrievedAt: RETRIEVED,
    volatility: "fast",
    excerpt:
      "SACR's outlook says the 2026 mindset has shifted from prevention only to prioritizing cyber resilience: maintaining functions and recovering rapidly after a breach.",
  },
  {
    id: "src-forrester-ssc-roles-2026",
    title: "Forrester, Software Supply Chain Security Best Practices For Producers, Operators, And Choosers (abstract)",
    url: "https://www.forrester.com/report/software-supply-chain-security-best-practices-for-producers-operators-and-choosers/RES203185",
    canonicalUrl: "https://www.forrester.com/report/software-supply-chain-security-best-practices-for-producers-operators-and-choosers/RES203185",
    publisher: "Forrester",
    author: "Janet Worthington",
    sourceType: "analyst",
    publishedAt: "2026-10-08",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's public abstract says firms must treat the software supply chain as a lifecycle problem with clear, role-based responsibilities for producers, operators and choosers.",
  },
  {
    id: "src-forrester-grc-grad-20251202",
    title: "Forrester blog: GRC Platforms Enter Their Grad School Era",
    url: "https://www.forrester.com/blogs/grc-platforms-enter-their-grad-school-era/",
    canonicalUrl: "https://www.forrester.com/blogs/grc-platforms-enter-their-grad-school-era/",
    publisher: "Forrester",
    author: "Cody Scott and Paul McKay",
    sourceType: "analyst",
    publishedAt: "2025-12-02",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's blog says continuous controls monitoring, risk quantification and practical AI use cases are shifting GRC platforms from static checklists to real-time insights.",
  },
  {
    id: "src-forrester-grc-20260527",
    title: "Forrester blog: governance, risk, and compliance platforms, Q2 2026",
    url: "https://www.forrester.com/blogs/announcing-the-forrester-wave-governance-risk-and-compliance-platforms-q2-2026/",
    canonicalUrl: "https://www.forrester.com/blogs/announcing-the-forrester-wave-governance-risk-and-compliance-platforms-q2-2026/",
    publisher: "Forrester",
    author: "Paul McKay and Cody Scott",
    sourceType: "analyst",
    publishedAt: "2026-05-27",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's blog says GRC platforms have long been a system of record for risk, compliance and internal audit workflow results, and that many implement continuous controls monitoring purely to gather audit evidence.",
  },
  {
    id: "src-forrester-grc-landscape-q4-2025",
    title: "Forrester, The Governance, Risk, And Compliance Platforms Landscape, Q4 2025 (abstract)",
    url: "https://www.forrester.com/report/the-governance-risk-and-compliance-platforms-landscape-q4-2025/RES189273",
    canonicalUrl: "https://www.forrester.com/report/the-governance-risk-and-compliance-platforms-landscape-q4-2025/RES189273",
    publisher: "Forrester",
    author: "Paul McKay and Cody Scott",
    sourceType: "analyst",
    publishedAt: "2025-11-24",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's public abstract says GRC platforms can be used to centralize risk data and processes, track evolving regulatory obligations and cost-effectively reduce risk.",
  },
  {
    id: "src-forrester-tprm-landscape-q3-2025",
    title: "Forrester, The Third-Party Risk Management Platforms Landscape, Q3 2025 (abstract)",
    url: "https://www.forrester.com/report/the-third-party-risk-management-platforms-landscape-q3-2025/RES186268",
    canonicalUrl: "https://www.forrester.com/report/the-third-party-risk-management-platforms-landscape-q3-2025/RES186268",
    publisher: "Forrester",
    author: "Alla Valente",
    sourceType: "analyst",
    publishedAt: "2025-09-15",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's public abstract says TPRM platforms catalog third-party relationships, consolidate risk and compliance data, automate TPRM processes from risk identification to corrective action, and bolster ecosystem resilience.",
  },
  {
    id: "src-forrester-tprm-foundation-2025",
    title: "Forrester, How To Build The Foundation For An Effective Third-Party Risk Management Program (abstract)",
    url: "https://www.forrester.com/report/how-to-build-the-foundation-for-an-effective-third-party-risk-management-program/RES182222",
    canonicalUrl: "https://www.forrester.com/report/how-to-build-the-foundation-for-an-effective-third-party-risk-management-program/RES182222",
    publisher: "Forrester",
    author: "Alla Valente",
    sourceType: "analyst",
    publishedAt: "2025-03-28",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's public abstract says organizations accept TPRM as part of risk management, yet it has historically lacked the visibility, prioritization and executive support of other risk domains.",
  },
  {
    id: "src-forrester-proactive-fixing-20250812",
    title: "Forrester blog: The Real Future Of Proactive Security Isn't Finding Exposures, It's Fixing Them",
    url: "https://www.forrester.com/blogs/the-real-future-of-proactive-security-isnt-finding-exposures-its-fixing-them/",
    canonicalUrl: "https://www.forrester.com/blogs/the-real-future-of-proactive-security-isnt-finding-exposures-its-fixing-them/",
    publisher: "Forrester",
    author: "Erik Nost",
    sourceType: "analyst",
    publishedAt: "2025-08-12",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's blog lists, among market changes since 2022, that adoption of continuous security testing such as breach and attack simulation and penetration testing as a service remained tepid and trended toward mature enterprises, with siloed results not tied back into vulnerability management.",
  },
  {
    id: "src-forrester-validate-zt-attack-2025",
    title: "Forrester, Validate Zero Trust Controls With MITRE ATT&CK (abstract)",
    url: "https://www.forrester.com/report/validate-zero-trust-controls-with-mitre-att-and-ck/RES186484",
    canonicalUrl: "https://www.forrester.com/report/validate-zero-trust-controls-with-mitre-att-and-ck/RES186484",
    publisher: "Forrester",
    author: "Allie Mellen, Erik Nost and Tope Olufon",
    sourceType: "analyst",
    publishedAt: "2025-10-07",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's public abstract describes practical methods for systematically validating controls, identifying vulnerabilities and improving posture through adversarial testing of a Zero Trust implementation.",
  },
  {
    id: "src-forrester-zt-testing-20251020",
    title: "Forrester blog: Declaring Zero Trust Without Testing Is A Lie",
    url: "https://www.forrester.com/blogs/declaring-zero-trust-without-testing-is-a-lie/",
    canonicalUrl: "https://www.forrester.com/blogs/declaring-zero-trust-without-testing-is-a-lie/",
    publisher: "Forrester",
    author: "Tope Olufon, Allie Mellen and Erik Nost",
    sourceType: "analyst",
    publishedAt: "2025-10-20",
    retrievedAt: RETRIEVED,
    volatility: "moderate",
    excerpt:
      "Forrester's blog says Zero Trust testing must move from audit checklists to controlled attacks.",
  },
];

const base = {
  polarity: "asserts" as const,
  sourceType: "analyst" as const,
  observedAt: RETRIEVED,
  effectiveFrom: null,
  effectiveTo: null,
  confidence: "medium" as const,
  verificationStatus: "needs_review" as const,
  lastCheckedAt: RETRIEVED,
  conflictsWith: [],
  capabilityId: null,
};

export const cloudCorpAnalystClaims: Claim[] = [
  {
    ...base,
    id: "claim-kc-cnapp-control-plane-2026",
    statement:
      "KuppingerCole's 3 Aug 2026 abstract says CNAPPs are no longer simply cloud protection solutions but are becoming the security control plane for AI-native enterprises.",
    subjectType: "category",
    subjectId: "cnapp",
    sourceId: "src-kc-cnapp-lc81068",
    sourceUrl: "https://www.kuppingercole.com/research/lc81068/cloud-native-application-protection-platforms-cnapp",
    publishedAt: "2026-08-03",
    notes:
      "Public abstract only; vendor ratings not adopted.",
  },
  {
    ...base,
    id: "claim-kc-cnapp-shared-resp-2025",
    statement:
      "KuppingerCole's 10 Jun 2025 abstract says CNAPP platforms provide integrated tools intended to help organizations using cloud services identify and manage the risks for which they are responsible.",
    subjectType: "category",
    subjectId: "cnapp",
    sourceId: "src-kc-cnapp-bc81045",
    sourceUrl: "https://www.kuppingercole.com/research/bc81045/cloud-native-application-protection-platforms-cnapp",
    publishedAt: "2025-06-10",
    notes:
      "Ties the definition to the customer's side of shared responsibility. Page modified 4 Aug 2026.",
  },
  {
    ...base,
    id: "claim-kc-cdr-in-cnapp-2026",
    statement:
      "KuppingerCole's 3 Aug 2026 abstract says leading CNAPP vendors are combining cloud detection and response with cloud security, AI-SPM, runtime protection and attack path analysis into unified platforms.",
    subjectType: "category",
    subjectId: "cloud-detection",
    sourceId: "src-kc-cnapp-lc81068",
    sourceUrl: "https://www.kuppingercole.com/research/lc81068/cloud-native-application-protection-platforms-cnapp",
    publishedAt: "2026-08-03",
    notes:
      "The abstract describes CNAPP and CDR as converging; not a standalone CDR definition.",
  },
  {
    ...base,
    id: "claim-forrester-cnapp-cdr-20250507",
    statement:
      "Forrester's 7 May 2025 blog says CNAPP solutions provide cloud threat detection and response across infrastructure administration, guest OS configuration and storage, container runtime and orchestration, infrastructure-as-code, and application security layers.",
    subjectType: "category",
    subjectId: "cloud-detection",
    sourceId: "src-forrester-cloud-federal-20250507",
    sourceUrl: "https://www.forrester.com/blogs/tackling-cloud-security-us-federal-edition/",
    publishedAt: "2025-05-07",
    notes:
      "Written for US federal buyers.",
  },
  {
    ...base,
    id: "claim-forrester-agentic-data-20261102",
    statement:
      "Forrester's 2 Nov 2026 blog says agentic AI exposes and amplifies the data weaknesses that organizations already have.",
    subjectType: "category",
    subjectId: "ai-data-security",
    sourceId: "src-forrester-ai-agents-data-20261102",
    sourceUrl: "https://www.forrester.com/blogs/ai-agents-arent-waiting-for-data-security/",
    publishedAt: "2026-11-02",
    notes:
      "The post also promotes a Forrester event and Forrester's AEGIS framework.",
  },
  {
    ...base,
    id: "claim-forrester-ai-posture-layers-2025",
    statement:
      "Forrester's 29 May 2025 abstract says organizations must manage the security posture of AI across cloud infrastructure, data, the model and algorithm, wrapper applications and APIs, and identities.",
    subjectType: "category",
    subjectId: "model-security",
    sourceId: "src-forrester-ai-detection-surface-2025",
    sourceUrl: "https://www.forrester.com/report/key-trends-in-ai-detection-surface/RES183344",
    publishedAt: "2025-05-29",
    notes:
      "Public abstract only. Treats the model as one of five layers; also relevant to AI data security.",
  },
  {
    ...base,
    id: "claim-forrester-ai-gov-scope-20261110",
    statement:
      "Forrester's 10 Nov 2026 blog says that with agentic AI, organizations must govern not only what a system produces but also what it can do and access, when humans should intervene, and who is accountable.",
    subjectType: "category",
    subjectId: "ai-governance",
    sourceId: "src-forrester-ai-governance-20261110",
    sourceUrl: "https://www.forrester.com/blogs/ai-governance-has-a-strategy-problem/",
    publishedAt: "2026-11-10",
    notes:
      "Survey figures in the post are not adopted.",
  },
  {
    ...base,
    id: "claim-kc-ai-fabric-an82044",
    statement:
      "KuppingerCole's 26 Oct 2026 abstract says no single product category covers identity, governance, runtime control, security and accountability for AI agents at once.",
    subjectType: "category",
    subjectId: "ai-governance",
    sourceId: "src-kc-ai-security-fabric-an82044",
    sourceUrl: "https://www.kuppingercole.com/research/an82044/ai-security-fabric",
    publishedAt: "2026-10-26",
    notes:
      "KuppingerCole's own framework. Also relevant to agent identity.",
  },
  {
    ...base,
    id: "claim-kc-mcp-lb80918",
    statement:
      "KuppingerCole's 11 May 2026 abstract says MCP has become the connective tissue of the agentic AI ecosystem and is being deployed at enterprise scale without a mature authentication baseline or reliable runtime enforcement.",
    subjectType: "category",
    subjectId: "mcp-security",
    sourceId: "src-kc-mcp-lb80918",
    sourceUrl: "https://www.kuppingercole.com/research/lb80918/model-context-protocol",
    publishedAt: "2026-05-11",
    notes:
      "Public abstract only.",
  },
  {
    ...base,
    id: "claim-forrester-mcp-threats-20250722",
    statement:
      "Forrester's 22 Jul 2025 blog says that because MCP governs how agents share and retrieve context, it becomes a prime target for context poisoning, impersonation and unauthorized inference.",
    subjectType: "category",
    subjectId: "mcp-security",
    sourceId: "src-forrester-mcp-20250722",
    sourceUrl: "https://www.forrester.com/blogs/mcp-doesnt-stand-for-many-critical-problemsbut-maybe-it-should-for-cisos/",
    publishedAt: "2025-07-22",
    notes:
      "Counts of exposed servers in the post are not adopted.",
  },
  {
    ...base,
    id: "claim-forrester-k8s-runtime-20251203",
    statement:
      "Forrester's 3 Dec 2025 blog says Kubernetes security has ramped up in recent years, with developments at KubeCon including agentic security workflows based on eBPF and deep system telemetry for runtime protection.",
    subjectType: "category",
    subjectId: "container-security",
    sourceId: "src-forrester-kubecon-na-20251203",
    sourceUrl: "https://www.forrester.com/blogs/kubecon-na-2025-retrospective-closed-and-open-source-battle-for-the-ai-native-cloud/",
    publishedAt: "2025-12-03",
    notes:
      "A recap of a community event, not a category definition. Vendor names nearby are not adopted.",
  },
  {
    ...base,
    id: "claim-kc-sase-bc80175",
    statement:
      "KuppingerCole's 2 Mar 2026 abstract says SASE converges SD-WAN with cloud-delivered SWG, CASB, FWaaS/NGFW, ZTNA and DLP under centralized policy at distributed points of presence, with identity as the perimeter.",
    subjectType: "category",
    subjectId: "network-edge",
    sourceId: "src-kc-sase-bc80175",
    sourceUrl: "https://www.kuppingercole.com/research/bc80175/secure-access-service-edge-sase",
    publishedAt: "2026-03-02",
    notes:
      "Public abstract only.",
  },
  {
    ...base,
    id: "claim-forrester-sase-definition-20250218",
    statement:
      "Forrester's 18 Feb 2025 blog defines SASE as combined security and networking functions, such as SD-WAN, CASB, ZTNA and SWG, delivered and supported by a single vendor.",
    subjectType: "category",
    subjectId: "network-edge",
    sourceId: "src-forrester-zte-sase-20250218",
    sourceUrl: "https://www.forrester.com/blogs/why-were-moving-from-zte-to-sase-terminology/",
    publishedAt: "2025-02-18",
    notes:
      "Forrester replaced its earlier zero trust edge (ZTE) term with SASE.",
  },
  {
    ...base,
    id: "claim-forrester-sse-absorbed-20250910",
    statement:
      "Forrester's 10 Sep 2025 blog says the standalone SSE market has largely disappeared, with most vendors offering SD-WAN and SSE natively or through partnerships.",
    subjectType: "category",
    subjectId: "network-edge",
    sourceId: "src-forrester-sase-20250910",
    sourceUrl: "https://www.forrester.com/blogs/forrester-wave-secure-access-service-edge-solutions-q3-2025-a-market-transformed/",
    publishedAt: "2025-09-10",
    notes:
      "Vendor names and placements in the post are not adopted.",
  },
  {
    ...base,
    id: "claim-forrester-uvm-role-20250729",
    statement:
      "Forrester's 29 Jul 2025 blog says UVM solutions serve as central repositories for vulnerability findings, orchestrating response and tracking remediation progress.",
    subjectType: "category",
    subjectId: "it-vulnerability-management",
    sourceId: "src-forrester-uvm-20250729",
    sourceUrl: "https://www.forrester.com/blogs/announcing-the-forrester-wave-unified-vulnerability-management-wave-q3-2025/",
    publishedAt: "2025-07-29",
    notes:
      "Vendor placements in the post are not adopted.",
  },
  {
    ...base,
    id: "claim-forrester-psp-rename-20260930",
    statement:
      "Forrester's 30 Sep 2026 blog says its first proactive security platforms evaluation under that title evolved from its earlier attack surface management and unified vulnerability management evaluations, and that prioritization is only an intermediate step because a prioritized vulnerability nobody fixes is still a vulnerability.",
    subjectType: "category",
    subjectId: "it-vulnerability-management",
    sourceId: "src-forrester-psp-20260930",
    sourceUrl: "https://www.forrester.com/blogs/announcing-the-forrester-wave-proactive-security-platforms-q3-2026/",
    publishedAt: "2026-09-30",
    notes:
      "Forrester's current label for this market is proactive security platforms. Vendor placements are not adopted.",
  },
  {
    ...base,
    id: "claim-forrester-proactive-principles-2026",
    statement:
      "Forrester's 7 Jan 2026 abstract says visibility, prioritization and remediation have always been the foundation of vulnerability management teams.",
    subjectType: "category",
    subjectId: "it-vulnerability-management",
    sourceId: "src-forrester-future-proactive-2026",
    sourceUrl: "https://www.forrester.com/report/the-future-of-proactive-security/RES190435",
    publishedAt: "2026-01-07",
    notes:
      "Public abstract only.",
  },
  {
    ...base,
    id: "claim-forrester-ot-beyond-discovery-20260910",
    statement:
      "Forrester's 10 Sep 2026 blog says the strongest OT security solutions combine asset intelligence with risk posture management, exposure prioritization and OT-specific context, and that asset discovery is no longer a key differentiator among leading providers.",
    subjectType: "category",
    subjectId: "ot-security",
    sourceId: "src-forrester-ot-20260910",
    sourceUrl: "https://www.forrester.com/blogs/ot-securitys-next-chapter-starts-when-asset-discovery-stops-being-the-goal/",
    publishedAt: "2026-09-10",
    notes:
      "Vendor names and placements in the post are not adopted.",
  },
  {
    ...base,
    id: "claim-kc-ai-ot-lb82016",
    statement:
      "KuppingerCole's 19 Feb 2026 abstract says AI adds analytics capabilities to OT but does not alter the fundamental requirements of safety, determinism and operational continuity.",
    subjectType: "category",
    subjectId: "ot-security",
    sourceId: "src-kc-ai-ot-lb82016",
    sourceUrl: "https://www.kuppingercole.com/research/lb82016/ai-in-operational-technology",
    publishedAt: "2026-02-19",
    notes:
      "Scope is AI in OT. Page modified 16 Apr 2026.",
  },
  {
    ...base,
    id: "claim-forrester-visibility-signals-20260120",
    statement:
      "Forrester's 20 Jan 2026 blog says visibility is shifting from a static list of assets to signals from endpoints, cloud platforms, identities, configurations, detections and open-source intelligence.",
    subjectType: "category",
    subjectId: "security-asset-management",
    sourceId: "src-forrester-six-questions-20260120",
    sourceUrl: "https://www.forrester.com/blogs/the-success-of-your-proactive-security-strategy-depends-on-your-answer-to-six-questions/",
    publishedAt: "2026-01-20",
    notes:
      "Not specific to cyber asset attack surface management.",
  },
  {
    ...base,
    id: "claim-forrester-asset-prereq-20251113",
    statement:
      "Forrester's 13 Nov 2025 blog says asset discovery and hardening are prerequisites to exposure management and residual risk calculation.",
    subjectType: "category",
    subjectId: "security-asset-management",
    sourceId: "src-forrester-psp-cumulate-20251113",
    sourceUrl: "https://www.forrester.com/blogs/proactive-security-platforms-will-cumulate-visibility-prioritization-and-remediation/",
    publishedAt: "2025-11-13",
    notes:
      "Indirect support: the post is about attack surface management within proactive security.",
  },
  {
    ...base,
    id: "claim-kc-asm-continuous-2026",
    statement:
      "KuppingerCole's 21 Oct 2026 abstract says organizations need a continuously updated, prioritized view of their attack surface because AI adoption, cloud sprawl and third-party dependencies are expanding faster than periodic testing can cover.",
    subjectType: "category",
    subjectId: "external-attack-surface",
    sourceId: "src-kc-asm-lc80986",
    sourceUrl: "https://www.kuppingercole.com/research/lc80986/attack-surface-management",
    publishedAt: "2026-10-21",
    notes:
      "Public abstract only; vendor ratings not adopted.",
  },
  {
    ...base,
    id: "claim-kc-asm-expanded-2025",
    statement:
      "KuppingerCole's 3 Jun 2025 abstract says digital transformation has expanded the attack surface to include cloud services, mobile devices, IoT endpoints and APIs.",
    subjectType: "category",
    subjectId: "external-attack-surface",
    sourceId: "src-kc-asm-bc81043",
    sourceUrl: "https://www.kuppingercole.com/research/bc81043/attack-surface-management",
    publishedAt: "2025-06-03",
    notes:
      "Public abstract only.",
  },
  {
    ...base,
    id: "claim-forrester-asm-not-standalone-20251113",
    statement:
      "Forrester's 13 Nov 2025 blog says external asset discovery is becoming commoditized and that ASM is still an important feature but dead as a standalone market, because it does not cover visibility, prioritization and remediation together.",
    subjectType: "category",
    subjectId: "external-attack-surface",
    sourceId: "src-forrester-psp-cumulate-20251113",
    sourceUrl: "https://www.forrester.com/blogs/proactive-security-platforms-will-cumulate-visibility-prioritization-and-remediation/",
    publishedAt: "2025-11-13",
    notes:
      "Disagreement: KuppingerCole still evaluates attack surface management as its own market (claim-kc-asm-continuous-2026).",
  },
  {
    ...base,
    id: "claim-forrester-microseg-zt-20260820",
    statement:
      "Forrester's 20 Aug 2026 blog says any Zero Trust strategy without microsegmentation is incomplete, and that regulators place growing emphasis on network segmentation, up to mandating it.",
    subjectType: "category",
    subjectId: "microsegmentation",
    sourceId: "src-forrester-microseg-20260820",
    sourceUrl: "https://www.forrester.com/blogs/announcing-the-forrester-wave-for-microsegmentation-solutions-q3-2026-not-your-parents-access-control-solution/",
    publishedAt: "2026-08-20",
    notes:
      "The post does not name specific regulations in this passage. Vendor placements are not adopted.",
  },
  {
    ...base,
    id: "claim-kc-cloud-backup-bc81047",
    statement:
      "KuppingerCole's 16 Feb 2026 abstract says recovery capabilities are as critical as prevention, and that cloud backup and DR must withstand ransomware through immutability, air gaps, strong IAM and monitoring.",
    subjectType: "category",
    subjectId: "cyber-recovery",
    sourceId: "src-kc-cloud-backup-bc81047",
    sourceUrl: "https://www.kuppingercole.com/research/bc81047/cloud-backup-for-cyber-resilience",
    publishedAt: "2026-02-16",
    notes:
      "Public abstract only.",
  },
  {
    ...base,
    id: "claim-sacr-resilience-2026",
    statement:
      "SACR's 14 Jan 2026 outlook says the 2026 mindset has shifted from prevention only to prioritizing cyber resilience: maintaining functions and recovering rapidly after a breach.",
    subjectType: "category",
    subjectId: "cyber-recovery",
    sourceId: "src-sacr-outlook-2026",
    sourceUrl: "https://softwareanalyst.io/reports/sacr-cybersecurity-2026-outlook",
    publishedAt: "2026-01-14",
    notes:
      "A broad annual outlook, not a recovery-category report. Page updated 13 Oct 2026. No sponsor disclosure found on the page, though SACR offers vendor partnerships; vendor-sourced statistics in the outlook are not adopted.",
  },
  {
    ...base,
    id: "claim-forrester-ssc-roles-2026",
    statement:
      "Forrester's 8 Oct 2026 abstract says firms must treat the software supply chain as a lifecycle problem with clear, role-based responsibilities for producers, operators and choosers.",
    subjectType: "category",
    subjectId: "product-security-program",
    sourceId: "src-forrester-ssc-roles-2026",
    sourceUrl: "https://www.forrester.com/report/software-supply-chain-security-best-practices-for-producers-operators-and-choosers/RES203185",
    publishedAt: "2026-10-08",
    notes:
      "Supports the software-producer role of a product security program. Public abstract only.",
  },
  {
    ...base,
    id: "claim-forrester-grc-ccm-20251202",
    statement:
      "Forrester's 2 Dec 2025 blog says continuous controls monitoring, risk quantification and practical AI use cases are shifting GRC platforms from static checklists to real-time insights.",
    subjectType: "category",
    subjectId: "grc-controls",
    sourceId: "src-forrester-grc-grad-20251202",
    sourceUrl: "https://www.forrester.com/blogs/grc-platforms-enter-their-grad-school-era/",
    publishedAt: "2025-12-02",
    notes: null,
  },
  {
    ...base,
    id: "claim-forrester-grc-ccm-evidence-20260527",
    statement:
      "Forrester's 27 May 2026 blog says GRC platforms have long been a system of record for risk, compliance and audit results, and that many implement continuous controls monitoring purely to gather audit evidence.",
    subjectType: "category",
    subjectId: "grc-controls",
    sourceId: "src-forrester-grc-20260527",
    sourceUrl: "https://www.forrester.com/blogs/announcing-the-forrester-wave-governance-risk-and-compliance-platforms-q2-2026/",
    publishedAt: "2026-05-27",
    notes:
      "Critical of how mature continuous controls monitoring is. Vendor placements are not adopted.",
  },
  {
    ...base,
    id: "claim-forrester-grc-purpose-2025",
    statement:
      "Forrester's 24 Nov 2025 abstract says GRC platforms can be used to centralize risk data and processes, track evolving regulatory obligations and cost-effectively reduce risk.",
    subjectType: "category",
    subjectId: "grc-controls",
    sourceId: "src-forrester-grc-landscape-q4-2025",
    sourceUrl: "https://www.forrester.com/report/the-governance-risk-and-compliance-platforms-landscape-q4-2025/RES189273",
    publishedAt: "2025-11-24",
    notes:
      "Public abstract only.",
  },
  {
    ...base,
    id: "claim-forrester-tprm-platforms-2025",
    statement:
      "Forrester's 15 Sep 2025 abstract says TPRM platforms catalog third-party relationships, consolidate risk and compliance data, and automate TPRM processes from risk identification to corrective action.",
    subjectType: "category",
    subjectId: "third-party-risk",
    sourceId: "src-forrester-tprm-landscape-q3-2025",
    sourceUrl: "https://www.forrester.com/report/the-third-party-risk-management-platforms-landscape-q3-2025/RES186268",
    publishedAt: "2025-09-15",
    notes:
      "Public abstract only.",
  },
  {
    ...base,
    id: "claim-forrester-tprm-gap-2025",
    statement:
      "Forrester's 28 Mar 2025 abstract says TPRM has historically lacked the visibility, prioritization and executive support of other risk domains.",
    subjectType: "category",
    subjectId: "third-party-risk",
    sourceId: "src-forrester-tprm-foundation-2025",
    sourceUrl: "https://www.forrester.com/report/how-to-build-the-foundation-for-an-effective-third-party-risk-management-program/RES182222",
    publishedAt: "2025-03-28",
    notes:
      "Public abstract only.",
  },
  {
    ...base,
    id: "claim-forrester-ptaas-adoption-20250812",
    statement:
      "Forrester's 12 Aug 2025 blog lists, among market changes since the author joined in 2022, that adoption of continuous security testing such as breach and attack simulation and penetration testing as a service remained tepid and trended toward mature enterprises, with results siloed from vulnerability management.",
    subjectType: "category",
    subjectId: "pentest-program",
    sourceId: "src-forrester-proactive-fixing-20250812",
    sourceUrl: "https://www.forrester.com/blogs/the-real-future-of-proactive-security-isnt-finding-exposures-its-fixing-them/",
    publishedAt: "2025-08-12",
    notes:
      "A retrospective list item, not a new finding; also relevant to breach simulation. Page modified 10 Nov 2025.",
  },
  {
    ...base,
    id: "claim-forrester-validate-zt-2025",
    statement:
      "Forrester's 7 Oct 2025 abstract describes systematically validating controls and improving posture through adversarial testing of a Zero Trust implementation, using MITRE ATT&CK.",
    subjectType: "category",
    subjectId: "breach-simulation",
    sourceId: "src-forrester-validate-zt-attack-2025",
    sourceUrl: "https://www.forrester.com/report/validate-zero-trust-controls-with-mitre-att-and-ck/RES186484",
    publishedAt: "2025-10-07",
    notes:
      "Public abstract only.",
  },
  {
    ...base,
    id: "claim-forrester-zt-controlled-attacks-20251020",
    statement:
      "Forrester's 20 Oct 2025 blog says Zero Trust testing must move from audit checklists to controlled attacks.",
    subjectType: "category",
    subjectId: "breach-simulation",
    sourceId: "src-forrester-zt-testing-20251020",
    sourceUrl: "https://www.forrester.com/blogs/declaring-zero-trust-without-testing-is-a-lie/",
    publishedAt: "2025-10-20",
    notes:
      "Co-authored post on validating Zero Trust.",
  },
  {
    ...base,
    id: "claim-forrester-continuous-testing-20260120",
    statement:
      "Forrester's 20 Jan 2026 blog says continuous security testing validates whether exposures are truly reachable and exploitable.",
    subjectType: "category",
    subjectId: "breach-simulation",
    sourceId: "src-forrester-six-questions-20260120",
    sourceUrl: "https://www.forrester.com/blogs/the-success-of-your-proactive-security-strategy-depends-on-your-answer-to-six-questions/",
    publishedAt: "2026-01-20",
    notes:
      "Stated in the context of prioritization; the post does not name breach and attack simulation.",
  },
];
