---
id: "secrets-detection"
type: "category"
name: "Secrets detection and remediation"
layer: "core"
vendors: 64
---

# Secrets detection and remediation

Finding credentials in code, tickets, images, chat, and other places they should not be, then verifying whether they still work and getting them rotated. Detection does not issue the replacement credential.

**Buyer question:** Where are live secrets exposed, and who has to revoke them?

**Usual owner:** AppSec or DevSecOps. This is often the seller's home territory.

**Budget source:** AppSec or source-control security, not the vault budget and not IGA.

## Owning seats

- AppSec lead (`appsec`)
- Engineering manager (`engineering-manager`)
- Security champion (`security-champion`)
- Software developer (`developer`)

## Vendors (primary)

- Truffle Security: TruffleHog finds secrets and can verify whether detectors recognize them as live. That is detection, not vaulting and not NHI governance.
- GitGuardian: Secrets detection vendor. On the detection shortlist beside TruffleHog and GitHub secret scanning. No capability is checked in this seed.
- GitHub: GitHub secret scanning and push protection are source-control controls. GitHub is part of Microsoft, and this product is still not Entra ID Governance.
- Gitleaks: Open-source secret scanner. Detection only in this map. Validity verification is not asserted.
- Cycode: Application security platform often shortlisted for secrets detection and ASPM. Scanner behavior is unverified in this seed.
- GitLab: Publisher or maintainer of GitLab Secret Detection. Research candidate; see product-level evidence and scope.
- MongoDB: Publisher or maintainer of Kingfisher. Research candidate; see product-level evidence and scope.
- Praetorian: Publisher or maintainer of Nosey Parker. Research candidate; see product-level evidence and scope.
- Yelp: Publisher or maintainer of detect-secrets. Research candidate; see product-level evidence and scope.
- Secretlint project: Publisher or maintainer of Secretlint. Research candidate; see product-level evidence and scope.
- Deepfence: Publisher or maintainer of Deepfence SecretScanner. Research candidate; see product-level evidence and scope.
- Thoughtworks: Publisher or maintainer of Talisman. Research candidate; see product-level evidence and scope.
- Skyscanner: Publisher or maintainer of Whispers. Research candidate; see product-level evidence and scope.
- Sonar: Publisher or maintainer of SonarQube secrets detection. Research candidate; see product-level evidence and scope.
- JFrog: Publisher or maintainer of JFrog Advanced Security secrets scans. Research candidate; see product-level evidence and scope.
- Datadog: Publisher or maintainer of Datadog Secret Scanning. Research candidate; see product-level evidence and scope.
- Harness: Publisher or maintainer of Harness Application Security Testing. Research candidate; see product-level evidence and scope.
- CodeAnt AI: Publisher or maintainer of CodeAnt AI secrets detection. Research candidate; see product-level evidence and scope.
- ripsecrets project: Publisher or maintainer of ripsecrets. Research candidate; see product-level evidence and scope.
- shhgit project: Publisher or maintainer of shhgit. Research candidate; see product-level evidence and scope.
- ReversingLabs: Publisher or maintainer of ReversingLabs secrets detection. Research candidate; see product-level evidence and scope.
- Postman: Publisher or maintainer of Postman Secret Scanner. Research candidate; see product-level evidence and scope.
- Black Duck: Publisher of a secrets-scanning datasheet for source code and infrastructure-as-code. The catalog still has a separate synopsys shortlist record. This pass does not merge those names.
- OpenText: Publisher of the OpenText SAST documentation that describes a secrets analyzer. The product name on that documentation set is Fortify. This record does not establish a rename history.
- DeepSource: Code-review platform that documents a secrets-detection feature. Plan and engine details stay on the product record.
- Codacy: Code-quality platform that documents secret detection by naming other scanners. Those named tools are not a Codacy-authored detector.

## Vendors (adjacent)

- Microsoft
- SAP
- Palo Alto Networks
- HashiCorp
- Akeyless
- Amazon Web Services
- Infisical
- Nightfall
- Entro Security
- Astrix Security
- Wiz
- SentinelOne
- Snyk
- Semgrep
- Checkmarx
- Veracode
- Varonis
- Orca Security
- Aqua Security
- Token Security
- Clutch Security
- Fortinet
- Check Point
- BigID
- Mend
- Sysdig
- Endor Labs
- Jit
- Arnica
- Xygeni
- Aikido Security
- Apiiro
- OX Security
- Legit Security
- Socket
- Teleskope
- Sentra
- Strac

## What buyers do instead

- Open-source scanners in CI. Good enough when: A few repos, one team, and someone who owns tuning and triage. Breaks when: Coverage spreads past git (tickets, chat, logs, images) or nobody can tell which hits are live. — hypothesis
- Secret scanning bundled in the code host or AppSec suite. Good enough when: Code lives in one host and the team only needs push protection on new commits. Breaks when: History, non-code sources, or verification of whether a credential still works matter. — hypothesis
- Rotate after an incident. Good enough when: Small blast radius and no audit or customer pressure. Breaks when: A leaked credential is used, or an audit or customer asks how leaks are found. — hypothesis

## Objections

- "Our platform vendor already does this." — hypothesis
- "We built our own." — hypothesis
- "The open-source tool is good enough." — hypothesis
- "Developers will ignore it or route around it." — hypothesis
- "That belongs to another team." — hypothesis
- "We can't give a vendor access to that data." — hypothesis
- "We need to finish the vault rollout before anything else." — hypothesis
- "We don't have sprint time for security work." — hypothesis

## Triggers

- Secret in a public commit
- Scanner pilot
- Incident from a leaked key
- A live credential is found in a public repo, ticket, or chat.
- A breach or near-miss starts with stolen or abused credentials.
- The company needs its first SOC 2 or ISO 27001 to close enterprise deals.
- The company hires its first AppSec or product security engineer.
- An acquisition brings in new code, cloud accounts, and identities.

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
