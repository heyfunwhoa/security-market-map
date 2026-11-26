---
id: "endpoint-control"
type: "category"
name: "Endpoint control and prevention"
layer: "core"
vendors: 10
---

# Endpoint control and prevention

Controls aimed at what a device is doing above the file and the process: developer tools, SaaS, AI tools, and local agents. Endpoint detection remains the process and file record. This map does not treat the broader layer as a replacement for that record.

**Buyer question:** What is happening above the operating system, and can the device stop it?

**Usual owner:** Endpoint security, often with the team adopting coding agents.

**Budget source:** Endpoint. A specialist here is not an XDR suite unless the quote says so.

## Owning seats

- IT / corporate security (`it-security`)

## Who vendors sell to

- None recorded.

## Vendors (primary)

- Cyberhaven: Named by SACR in July 2026 among endpoint-control specialists, beside data-movement detection. No endpoint or DLP capability is checked.
- Neo Security: Named by SACR as an endpoint-control specialist. Boston-based, Israeli-founded "agentic software control" company that emerged from stealth on 20 Jul 2026 with $100M (a16z, Bessemer): a full endpoint agent inventories AI agents and AI-enabled apps, scores risk, attributes actions and enforces policy on the device. Product detail in agentic-endpoint.ts.
- Glow: Tel Aviv and Palo Alto company founded 2025 that calls itself the Endpoint AI company: AI agents that inventory endpoint software, control what is allowed to run or be installed, and steer employees to managed AI tools. Launched July 2026 with a $180M Series A.

## Vendors (adjacent)

- Palo Alto Networks
- Cyata
- Aikido Security
- Socket
- Code42
- Backslash Security
- Knostic

## What buyers do instead

- Group policy and MDM restrictions. Good enough when: Standard devices and a small set of approved apps. Breaks when: Developers, admin rights, and new tools make static rules break or get bypassed. — hypothesis
- Detect with EDR instead of preventing. Good enough when: The team prefers alerting over blocking. Breaks when: Prevention is required for unapproved software, AI tools, or ransomware. — hypothesis

## Objections

- "My team will end up supporting this." — hypothesis

## Triggers

- Coding agents on laptops
- Browser and SaaS actions EDR does not see
- Teams start deploying AI agents or MCP servers with access to internal systems.

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
