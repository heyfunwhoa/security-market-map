---
id: "database-security"
type: "category"
name: "Database security"
layer: "core"
vendors: 4
---

# Database security

Activity monitoring and controls on the database itself. It watches queries. It is not a cloud posture scan and not file-share DLP.

**Buyer question:** Which queries ran, and can a bad one be stopped at the database?

**Usual owner:** Data security or the database team.

**Budget source:** Database or data security.

## Owning seats

- Data security (`data-security`)

## Vendors (primary)

- Satori: Data access and database-security candidate. A query control is not DSPM classification.
- Cyral: Database security candidate. Ownership was not re-checked. No query block is checked.

## Vendors (adjacent)

- Imperva
- Privacera

## What buyers do instead

- Native database audit logs and access controls. Good enough when: Few databases with a capable DBA team. Breaks when: Many engines, cloud databases, and audit requirements make native tools inconsistent. — hypothesis
- Use data posture discovery for database risk. Good enough when: The main question is where sensitive data lives. Breaks when: Activity monitoring and blocking privileged misuse are required. — hypothesis

## Objections

_None recorded._

## Triggers

- A sensitive production database
- Audit of who queried what

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
