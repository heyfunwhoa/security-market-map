---
id: "threat-modeling"
type: "category"
name: "Threat modeling"
layer: "core"
vendors: 1
---

# Threat modeling

A structured look at how a design can be abused, done before or beside the code. A workshop and a threat-modeling product are both in this category. Neither is a scan.

**Buyer question:** What are we building, and how would someone abuse it?

**Usual owner:** Product security, with the designing engineers in the room.

**Budget source:** Mostly time. A tool budget appears when the practice is standardized.

## Owning seats

- Security architect (`security-architect`)
- Security champion (`security-champion`)
- Product security lead (`product-security`)
- Security validation / offensive (`offensive-security`)

## Vendors (primary)

- IriusRisk: Threat-modeling product. The practice can also be a workshop with no tool. This seed does not check product features.

## Vendors (adjacent)

_None recorded._

## What buyers do instead

- Whiteboard sessions and templates in docs. Good enough when: A few high-risk designs reviewed by an experienced security engineer. Breaks when: Design reviews become a bottleneck or happen too late to change anything. — hypothesis
- Rely on testing after the code is written. Good enough when: Low-risk features and a strong testing culture. Breaks when: Design flaws keep showing up in pentests when they're expensive to fix. — hypothesis

## Objections

_None recorded._

## Triggers

- New architecture
- Agent or payment feature

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
