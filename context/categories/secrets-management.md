---
id: "secrets-management"
type: "category"
name: "Secrets management"
layer: "core"
vendors: 22
---

# Secrets management

Vaulting, dynamic issuance, rotation, PKI, and key management. The secret is the credential. The workload or person using it is a separate identity.

**Buyer question:** Where should this credential live, and can we issue it for a short time instead of storing it?

**Usual owner:** Platform, SRE, or a secrets-management owner.

**Budget source:** Platform engineering or security engineering. A vault module inside PAM is a different evaluation from an IGA suite.

## Owning seats

- Security architect (`security-architect`)
- PAM owner (`pam-owner`)
- DevOps / platform engineering (`platform`)
- Platform security (`platform-security`)
- CTO / VP of engineering (`cto`)

## Vendors (primary)

- Palo Alto Networks: Closed the CyberArk acquisition on 11 Feb 2026 and introduced Idira on 12 May 2026. Brand changes toward Idira began 31 May 2026. Prisma Cloud remains a cloud-security product. Do not merge Idira, secrets, and CNAPP into one capability row. Palo Alto Networks markets Cortex DSPM for cloud and AI data exposure. Vendor-reported DSPM scope reviewed 2026-10-13.
- Delinea: PAM vendor known for Secret Server and privileged access. Confirm whether the deal is vaulting, session control, or both.
- HashiCorp: Vault is the reference product for dynamic secrets and PKI in this atlas. IBM completed the acquisition on 27 Feb 2025. Vault competes in a secrets-management evaluation and complements IGA when the question is issuance.
- Akeyless: Secrets management and machine-credential vendor. Shortlist it against Vault for issuance. Do not assume NHI governance parity.
- Amazon Web Services: AWS Secrets Manager is the cloud-native secret store. It is a bundled alternative when the workload and the secret both live in AWS. It is not an IGA product.
- Google: Google Secret Manager is the cloud secret store on GCP. Same boundary as the other cloud secret stores: issuance and storage, not governance of every identity.
- Doppler: Developer-oriented secrets manager. Competes in a vault evaluation, not in IGA.
- Infisical: Secrets management product, including an open-source option buyers mention. Capabilities unverified here.
- Bitwarden: Bitwarden documents Secrets Manager with machine accounts, access tokens, CLI/SDK access and secret injection.
- 1Password: 1Password documents Secrets Automation through service accounts or Connect servers.
- Keeper Security: Keeper documents Secrets Manager as a KeeperPAM component for infrastructure secrets and application or CI/CD access.

## Vendors (adjacent)

- Microsoft
- IBM
- BeyondTrust
- Teleport
- Oasis Security
- Aembit
- Venafi
- Keyfactor
- DigiCert
- Keycard
- Fortanix

## What buyers do instead

- Cloud provider secret stores. Good enough when: One cloud, one platform team, few on-prem systems. Breaks when: Multi-cloud, on-prem, or dynamic credentials across many teams. — hypothesis
- Environment variables and config files. Good enough when: Very early stage with a handful of services. Breaks when: Rotation, audit, or offboarding becomes someone's weekend. — hypothesis

## Objections

- "Our cloud provider's native tools are enough." — hypothesis
- "We need to finish the vault rollout before anything else." — hypothesis

## Triggers

- Hardcoded database passwords
- Certificate expiry
- Vault consolidation
- A live credential is found in a public repo, ticket, or chat.
- A major cloud migration or a second cloud provider.

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
