# AppSec category gaps: IaC, threat modeling, disclosure, model security

As of **2026-11-23**. Status: researched and proposed. Human review is pending. Owner: repository maintainer. Next review: **2026-12-23**, or sooner if a product is acquired, renamed, or repackaged.

## Why

Four AppSec-side categories had one or two vendors: IaC security (Gomboc), threat modeling (IriusRisk), model security (Palo Alto Networks via Protect AI) and disclosure and bug bounty (HackerOne, Bugcrowd). This change fills them, reusing existing vendor records wherever the vendor was already in the catalog.

Canonical records: [typed data](../../lib/data/appsec-category-gaps.ts), composed by [catalog](../../lib/catalog.ts). Two new vendors (Security Compass, Intigriti), five new products, eight sources, eight claims. Existing records edited: category lists on Palo Alto Networks, Wiz, Snyk and HiddenLayer, and `iac-security` added as adjacent on the existing Wiz Code product. No feature-parity cells, scores or direct-competitor edges.

## Placement (zoom out → zoom in)

| Category | Buyer question | Added | How placed |
| --- | --- | --- | --- |
| Infrastructure-as-code security | Is this Terraform or CloudFormation change safe before apply? | Checkov IaC (Palo Alto, new product), Snyk IaC (Snyk, new product), Wiz Code (existing product, adjacent) | Checkov already had a record for its secrets slice; the IaC slice is a separate product so the two aren't merged. Wiz Code stays primary in ASPM. |
| Model and infrastructure security | Is this model file safe to deploy? | HiddenLayer Model Scanner (HiddenLayer, new product) | HiddenLayer stays primary in AI application security; model security is added as adjacent at vendor level, primary at product level. |
| Threat modeling | How do we find design flaws before code? | Devici (Security Compass, new vendor and product) | Security Compass is the vendor; Devici is the product it acquired. |
| Disclosure and bug bounty | How do outside researchers report bugs, and who triages them? | Intigriti (new vendor and product) | Adjacent to pentest programs because it also sells PTaaS. |

To zoom back out, open each category page, then its domain.

## Limits and open questions

- Statements are publisher-reported unless marked. The Devici acquisition comes from news coverage; the Gartner Peer Insights listing is vendor-supplied product text, not a Gartner evaluation.
- Microsoft's statement that Azure AI uses HiddenLayer Model Scanner is from a co-authored partner post (2024), not an independent test.
- Snyk IaC and Checkov edition limits, and Wiz's IaC packaging inside Wiz Code, were not checked.
- Security Compass's SD Elements is not profiled.
- Not added: Bridgecrew as its own vendor (now Prisma Cloud), and other threat-modeling tools (ThreatModeler, OWASP Threat Dragon, Threagile) that turned up in research but weren't sourced here.
