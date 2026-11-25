# Security buyer playbook index

Start with the customer’s words. Use the linked playbook to identify who owns the problem, what the customer already has, and which evidence would justify a project.

| What the customer says | Start with | Bring to the next meeting | What the pilot should prove |
| --- | --- | --- | --- |
| “We already scan our repos.” | AppSec. Ask what happened the last time a company credential surfaced outside its managed repositories. | Credential issuer administrator, workload owner and SOC if usage is in question. | A synthetic exposure reaches the right team, an owner is named, and the team can verify simulated containment and workload health. [Public credential playbook](workforce-identity-and-credential-response.md#buyer-playbook-for-an-aws-key-found-outside-company-repositories) |
| “Cloud sees the alert. Our SOC uses a different queue.” | Cloud security and the SOC manager. Ask them to walk through their last finding that needed another team. | Analyst, routing administrator and accountable application owner. | The SOC gets one actionable case, retains the original evidence, and records a verified resolution. [Security Hub handoff](security-hub-soc-handoff.md) |
| “Email, identity and cloud each saw something.” | Incident lead. Ask which evidence ties the events together. | Email security, IAM, cloud security and the data owner as needed. | An analyst can connect the related records and keep an unrelated event out of the case. [Cross-domain phishing investigation](secops-pipelines-detection-enrichment.md#from-phishing-to-cloud-and-data-investigation) |

## Mock AWS discovery call

This is a fictional example for interview practice. All timings and thresholds are illustrative.

**Customer.** “We already have Security Hub and a SIEM. What would you help us improve?”

**Seller.** “Show me the last cloud finding that needed an application team. When could the analyst see it, when did the owner accept it, and what showed the issue was fixed?”

**Customer.** “The alert arrived in four minutes with a link to the original finding. We spent forty minutes finding who owned the workload. The ticket closed the next day, but the case had no later resource check.”

**Seller.** “I’d ask the cloud security lead to own a short evaluation with the SOC and application owner. We’d replay the same synthetic finding and update through the current workflow and a version that uses an ownership lookup and records a follow-up resource check. Would a named owner within fifteen minutes, one case through the update, and a verified closure record meet your goal?”

| Buyer decision | Illustrative outcome |
| --- | --- |
| Advance | The incumbent misses the agreed ownership or closure target on replay. The revised workflow meets it, and cloud security agrees to own the change. |
| Pass on expansion | The incumbent meets the targets once ownership data is corrected. The team can make and maintain that process change with its existing tools. |

**Mock result.** The initial answer points to an ownership and closure problem. Alert delivery and source evidence were already working in the example. The right follow-up is a measured workflow comparison with the cloud security lead. The fictional conversation does not establish a purchase case.

For the product behavior behind this scenario, see [AWS Security Hub exposure findings](https://docs.aws.amazon.com/securityhub/latest/userguide/exposure-findings.html) and [AWS Security Hub EventBridge event types](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-v2-cwe-event-types.html).
