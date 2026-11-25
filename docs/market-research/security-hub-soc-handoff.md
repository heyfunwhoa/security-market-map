# AWS Security Hub to SOC investigation

Research candidate for the [AWS ecosystem guide](aws-security-ecosystem-2026-11.md) and [SecOps buyer guide](secops-pipelines-detection-enrichment.md). AWS documentation checked November 21, 2026. Buyer roles and pilot targets are illustrative.

**Trigger.** Cloud security sees an exposure on an internet-facing workload. The SOC uses its existing SIEM and case queue. Start with the cloud security lead and SOC manager. Bring in the service owner and routing administrator when evaluating the handoff.

**Discovery opener.** “Show me the last AWS finding that needed someone outside cloud security. Where did it land, who picked it up, and what evidence closed it?”

| Step | Evidence to ask for | What the gap tells you |
| --- | --- | --- |
| Choose the source | Identify whether the SOC needs a Security Hub exposure, a CSPM control finding, or the underlying activity record. Security Hub and Security Hub CSPM document distinct EventBridge event types. [Security Hub V2 events](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-v2-cwe-event-types.html) · [CSPM events](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cwe-integration-types.html) | Missing source coverage sends the conversation back to cloud security. |
| Route to the existing queue | Trace one sample finding into the actual destination. Check account, Region, resource, source link and timestamps. Repeat with an update and confirm how the queue handles it. | Missing fields, duplicate cases or failed delivery point to integration work. |
| Investigate and assign | Ask the analyst to open the original finding and any available supporting logs, explain the priority and name the workload owner. | An empty evidence trail points to telemetry coverage. A complete case with no assignee points to ownership. |
| Verify the fix | Capture the approved change and an updated observation of the resource or control. Record remaining gaps alongside the closure decision. | If a ticket closes before anyone checks the resource, agree on what will count as proof. |

**Pilot.** Use one synthetic in-scope finding and its update, plus a benign out-of-scope example. Replay the same inputs through the current workflow and the proposed workflow. Measure time to a named owner, completeness of the evidence, duplicate cases, and time to a verified outcome. Agree on the targets with the buyer. If the current workflow meets them, document that and close the evaluation. If it falls short, name the failing step and evaluate only the change needed there.

**Interview version.** “I’d start by tracing a single finding into the customer’s existing SOC workflow. If analysts get it twice, I’d check routing and updates. If it arrives without enough evidence, I’d scope data coverage. If it lands cleanly but nobody can close it, I’d bring in the workload owner and agree on proof of remediation.”
