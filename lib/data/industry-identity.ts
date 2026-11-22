import type { Source } from "../schema";

// Regulation and standard texts behind the industry identity requirements in
// lib/data/company-segments.ts. Each was read in full on 2026-11-18. Requirements paraphrase the
// rule; they name controls, not products. See docs/market-research/industry-identity-requirements-2026-11.md.

const RETRIEVED = "2026-11-18";

export const industryIdentitySources: Source[] = [
  {
    id: "src-reg-nydfs-part500",
    title: "23 NYCRR Part 500, Cybersecurity Requirements for Financial Services Companies (as amended)",
    url: "https://www.dfs.ny.gov/cybersecurity/23-NYCRR-Part-500",
    canonicalUrl: "https://www.dfs.ny.gov/cybersecurity/23-NYCRR-Part-500",
    publisher: "New York State Department of Financial Services",
    sourceType: "official_docs",
    publishedAt: null,
    retrievedAt: RETRIEVED,
    volatility: "stable",
    excerpt:
      "Section 500.7 limits user and privileged access to what the job requires, requires at least annual access reviews and prompt termination, and requires Class A companies to monitor privileged access with a PAM solution. Section 500.12 requires multi-factor authentication.",
  },
  {
    id: "src-reg-hipaa-164312",
    title: "45 CFR 164.312, Technical safeguards (eCFR)",
    url: "https://www.ecfr.gov/api/renderer/v1/content/enhanced/current/title-45?part=164&section=164.312",
    canonicalUrl: "https://www.ecfr.gov/api/renderer/v1/content/enhanced/current/title-45?part=164&section=164.312",
    publisher: "U.S. Government Publishing Office (eCFR)",
    sourceType: "official_docs",
    publishedAt: null,
    retrievedAt: RETRIEVED,
    volatility: "stable",
    excerpt:
      "The HIPAA Security Rule's technical safeguards require access only for persons or software programs granted access rights, unique user identification, an emergency access procedure, audit controls, and verification that a person or entity seeking access is the one claimed.",
  },
  {
    id: "src-reg-nist-800-171r2",
    title: "NIST SP 800-171 Rev. 2, Protecting Controlled Unclassified Information (February 2020, updated January 2021)",
    url: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-171r2.pdf",
    canonicalUrl: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-171r2.pdf",
    publisher: "National Institute of Standards and Technology",
    sourceType: "standard",
    publishedAt: null,
    retrievedAt: RETRIEVED,
    volatility: "stable",
    excerpt:
      "Requirement 3.1.1 limits system access to authorized users, processes and devices; 3.1.5 applies least privilege, including for privileged accounts; 3.5.3 requires multifactor authentication for privileged accounts and for network access to non-privileged accounts.",
  },
  {
    id: "src-reg-nerc-cip-004-7",
    title: "NERC CIP-004-7, Cyber Security: Personnel & Training",
    url: "https://www.nerc.com/pa/Stand/Reliability%20Standards/CIP-004-7.pdf",
    canonicalUrl: "https://www.nerc.com/pa/Stand/Reliability%20Standards/CIP-004-7.pdf",
    publisher: "North American Electric Reliability Corporation",
    sourceType: "standard",
    publishedAt: null,
    retrievedAt: RETRIEVED,
    volatility: "stable",
    excerpt:
      "Requirement R4 requires documented access management programs, including a process to authorize access based on need; R5 requires access revocation programs.",
  },
  {
    id: "src-reg-nerc-cip-005-7",
    title: "NERC CIP-005-7, Cyber Security: Electronic Security Perimeter(s)",
    url: "https://www.nerc.com/pa/Stand/Reliability%20Standards/CIP-005-7.pdf",
    canonicalUrl: "https://www.nerc.com/pa/Stand/Reliability%20Standards/CIP-005-7.pdf",
    publisher: "North American Electric Reliability Corporation",
    sourceType: "standard",
    publishedAt: null,
    retrievedAt: RETRIEVED,
    volatility: "stable",
    excerpt: "Requirement R2 requires multi-factor authentication for all Interactive Remote Access sessions to applicable BES Cyber Systems.",
  },
  {
    id: "src-reg-nerc-cip-007-6",
    title: "NERC CIP-007-6, Cyber Security: System Security Management",
    url: "https://www.nerc.com/pa/Stand/Reliability%20Standards/CIP-007-6.pdf",
    canonicalUrl: "https://www.nerc.com/pa/Stand/Reliability%20Standards/CIP-007-6.pdf",
    publisher: "North American Electric Reliability Corporation",
    sourceType: "standard",
    publishedAt: null,
    retrievedAt: RETRIEVED,
    volatility: "stable",
    excerpt:
      "Requirement R5 (system access controls) requires a method to enforce authentication of interactive user access where technically feasible, and an inventory of enabled default or other generic account types.",
  },
  {
    id: "src-reg-dora-rts-2024-1774",
    title: "Commission Delegated Regulation (EU) 2024/1774, ICT risk management RTS under DORA",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R1774",
    canonicalUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R1774",
    publisher: "European Commission (EUR-Lex)",
    sourceType: "official_docs",
    publishedAt: "2024-03-13",
    retrievedAt: RETRIEVED,
    volatility: "stable",
    excerpt:
      "Article 20 requires identity management that uniquely identifies and authenticates natural persons and systems. Article 21 requires access rights based on need-to-know and least privilege, segregation of duties, and strong authentication for remote, privileged and critical access.",
  },
  {
    id: "src-reg-nis2-directive-2022-2555",
    title: "Directive (EU) 2022/2555 (NIS2)",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32022L2555",
    canonicalUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32022L2555",
    publisher: "European Union (EUR-Lex)",
    sourceType: "official_docs",
    publishedAt: "2022-12-14",
    retrievedAt: "2026-11-18",
    volatility: "stable",
    excerpt:
      "Article 21(2) lists the minimum cybersecurity risk-management measures, including (i) human resources security, access control policies and asset management, and (j) the use of multi-factor or continuous authentication solutions where appropriate.",
  },
  {
    id: "src-reg-nis2-ir-2024-2690",
    title: "Commission Implementing Regulation (EU) 2024/2690 (NIS2 technical and methodological requirements)",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2690",
    canonicalUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2690",
    publisher: "European Commission (EUR-Lex)",
    sourceType: "official_docs",
    publishedAt: "2024-10-17",
    retrievedAt: "2026-11-18",
    volatility: "stable",
    excerpt:
      "For digital infrastructure and digital provider entities, including managed service and managed security service providers, the Annex requires access rights on need-to-know and least privilege, policies for privileged and administration accounts with strong authentication, full identity life-cycle management, and multi-factor or continuous authentication.",
  },
];
