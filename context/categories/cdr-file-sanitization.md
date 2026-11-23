---
id: "cdr-file-sanitization"
type: "category"
name: "Content disarm and reconstruction"
layer: "core"
vendors: 2
---

# Content disarm and reconstruction

Prevention-first file sanitization: strip active or risky content (macros, scripts, embedded objects) from incoming files and rebuild a usable copy, instead of deciding whether the original is malicious. Usually placed on email, web download, file transfer and removable-media paths. CDR gives no verdict; file and malware analysis does.

**Buyer question:** Can people open files from outside without each one being detonated or scanned to a verdict first?

**Usual owner:** IT security or email security; OT and critical-infrastructure teams for removable media and file transfer.

**Budget source:** Email or web security, or an OT/critical-infrastructure program. Sometimes bundled in a gateway; verify with the buyer.

## Owning seats

- OT / ICS security (`ot-security`)

## Who vendors sell to

- None recorded.

## Vendors (primary)

- OPSWAT: OPSWAT markets Deep CDR as file sanitization that disarms and regenerates files, inside its MetaDefender products for email, storage and other entry points.
- Votiro: Votiro says its content disarm and reconstruction technology disarms incoming files and rebuilds them while keeping them usable, across email, downloads, file sharing and removable media.

## Vendors (adjacent)

_None recorded._

## What buyers do instead

- Gateway scanning and sandboxing instead. Good enough when: Delay is acceptable and most risky files are caught by verdicts. Breaks when: Unknown or weaponized documents get through, or sandbox delay holds up business files. — hypothesis
- Block risky file types by policy. Good enough when: The business can live without macros or certain formats. Breaks when: Teams need those files from partners and start working around the block. — hypothesis

## Objections

_None recorded._

## Triggers

- Weaponized documents getting past the gateway
- Sandbox delay blocking business files
- Removable media into an isolated network

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
