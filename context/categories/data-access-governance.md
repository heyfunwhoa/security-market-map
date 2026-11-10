---
id: "data-access-governance"
type: "category"
name: "Data access governance"
layer: "core"
vendors: 17
---

# Data access governance

Policy on who may query or read a dataset, usually at a catalog, warehouse, or database. Identity governance reviews the account. This reviews the data grant. A DSPM path is not enforcement in the query.

**Buyer question:** Who can query this data, and is that grant still appropriate?

**Usual owner:** Data security or the data platform, with identity in the room.

**Budget source:** Data platform or data security. Not the IGA renewal by default.

## Owning seats

- Data security (`data-security`)

## Who vendors sell to

- None recorded.

## Vendors (primary)

- Immuta: Data access governance candidate for analytics platforms. Not an IGA suite and not a DSPM scanner by assumption.
- Privacera: Data access governance candidate. No warehouse coverage is checked.
- Satori: Data access and database-security candidate. A query control is not DSPM classification.

## Vendors (adjacent)

- Cyera
- Varonis
- BigID
- Teleskope
- Concentric AI
- Sentra
- Securiti
- Symmetry Systems
- Theom
- Cyral
- AvePoint
- Arexdata
- TrustLogix
- Lightbeam

## What buyers do instead

- Data owners review access in tickets. Good enough when: A few sensitive data stores with clear owners. Breaks when: Access sprawls across SaaS, warehouses, and AI tools. — hypothesis
- Extend IGA certifications to data stores. Good enough when: Data access mostly follows application roles. Breaks when: Fine-grained permissions in warehouses and file shares don't map to app roles. — hypothesis

## Objections

_None recorded._

## Triggers

- A warehouse everyone can read
- A privacy review of access

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
