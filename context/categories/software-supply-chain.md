---
id: "software-supply-chain"
type: "category"
name: "Software supply chain"
layer: "core"
vendors: 17
---

# Software supply chain

The path from a dependency, image, or build to what runs in production. SCA, SBOM, and secrets detection are pieces of it. A supply-chain product is not a SAST scanner and not a vault unless the quote says so.

**Buyer question:** What went into the build, and can we say where a package came from?

**Usual owner:** AppSec or platform security.

**Budget source:** AppSec or platform. Often a different renewal from the corporate vulnerability scanner.

## Owning seats

- Software supply-chain security (`supply-chain-security`)

## Who vendors sell to

- None recorded.

## Vendors (primary)

- Chainguard: Software supply-chain vendor associated with hardened images. Not an SCA scanner by assumption.
- Endor Labs: Dependency and reachability vendor on SCA shortlists. No reachability claim is checked.
- Scribe Security: Supply-chain and attestation candidate. An SBOM is not proof the build was protected.
- Jit: Named on the supply-chain and product-security shortlist. Not a corporate VM scanner.
- Arnica: Pipeline and secrets-adjacent vendor on supply-chain shortlists. Scanner behavior is unverified.
- Xygeni: Software supply-chain vendor. No SBOM or malware claim is checked.
- OX Security: Supply-chain and ASPM candidate. Unverified.
- Kusari: Supply-chain vendor associated with dependency and build policy. No policy claim is checked.
- Stacklok: Supply-chain and open-source trust vendor. Not a secrets vault.
- Legit Security: Software supply-chain and ASPM vendor. Capabilities unverified.
- Socket: Dependency supply-chain vendor. A malicious-package signal is not a CVE scanner unless that is what they show.

## Vendors (adjacent)

- GitGuardian
- Cycode
- Mend
- Aikido Security
- Apiiro
- RapidFort

## What buyers do instead

- Generate SBOMs on request. Good enough when: Few customers ask and releases are infrequent. Breaks when: Customers or regulators expect continuous attestations and build integrity. — hypothesis

## Objections

- "We'll deal with SBOMs when customers make us." — hypothesis

## Triggers

- A malicious package
- A customer asking for an SBOM

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
