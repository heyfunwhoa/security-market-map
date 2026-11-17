---
id: "data-encryption"
type: "category"
name: "Encryption and tokenization"
layer: "core"
vendors: 3
---

# Encryption and tokenization

Encryption, tokenization, or key control for the data itself. A key manager is not a discovery product. A secrets vault stores the credential. This category is about protecting the data that credential can reach. No algorithm is checked here.

**Buyer question:** Is the data protected when the store or the file is copied, and who holds the keys?

**Usual owner:** Data security or cryptography.

**Budget source:** Data protection. Separate from the secrets-management renewal.

## Owning seats

- Data security (`data-security`)

## Vendors (primary)

- Virtru: Encryption candidate for messages and files. Not a DSPM discovery product.
- Fortanix: Key and data-protection candidate. A key manager is not a secrets vault and not data discovery.
- PKWARE: Data encryption and masking candidate. No format or coverage is checked.

## Vendors (adjacent)

_None recorded._

## What buyers do instead

- Cloud provider encryption at rest and key management. Good enough when: Data stays in one cloud and default encryption meets requirements. Breaks when: Field-level protection, tokenization for compliance scope, or customer-held keys are needed. — hypothesis
- Application teams encrypt fields themselves. Good enough when: One or two apps with a careful team. Breaks when: Key rotation, consistency, and audit across many apps fall apart. — hypothesis

## Objections

_None recorded._

## Triggers

- A copy of a database leaves the account
- A partner needs a token instead of the raw value

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
