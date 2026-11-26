# Agent attack research: buyer-problem context

As of **2026-11-24**. Status: researched and proposed. Human review is pending. Owner: repository maintainer.

These three findings show how AI agents fail in practice. They are research, not incidents. No source reports a confirmed victim or exploitation in the wild, so they stay out of `incidents.seed.json`. The exclusion is recorded in [the 2026-11-24 candidate batch](../../data/security-intelligence/candidates/2026-11-24-agent-research-context.json).

| Finding | Researcher | Agent and surface | What the demo showed (as reported) | Vendor response (as reported) | Primary write-up (not fetched) |
| --- | --- | --- | --- | --- | --- |
| Notion 3.0 web search exfiltration (Sep 2025) | CodeIntegrity | Notion AI agent | Hidden white-on-white text in a PDF told the agent to gather client data and send it out through its web search tool | Notion said it improved injection detection and added user approval before agents open suspicious links | codeintegrity.ai/blog/notion |
| ShareLeak (found Nov 2025, patched Jan 2026, disclosed Apr 2026) | Capsule Security | Microsoft Copilot Studio agent triggered by SharePoint forms | A public form comment with a fake system message made the agent email SharePoint List customer data out through Outlook. Microsoft's safety checks flagged the request, but the data still left, and DLP did not fire | Microsoft confirmed it, patched it, and assigned CVE-2026-21520 (CVSS 7.5) | NVD CVE-2026-21520 |
| PipeLeak (disclosed Apr 2026) | Capsule Security | Salesforce Agentforce agent fed by public lead forms | An unauthenticated lead-form payload made the agent email CRM data through its authorized email action, with no volume limit found | Salesforce said it fixed the described scenario and turned on human confirmation by default for email actions. It issued no CVE. Capsule says the issue persists on Custom Topics | — |
| Fake skill "brand-landingpage" (Jun 2026) | AIR | Agent skill marketplace plus an Instagram ad | A clean skill passed the scanners AIR tested, then switched an external setup page to run a script. AIR says about 26,000 agents ran it, some on corporate accounts. The script only collected users' email addresses | No marketplace response reported | air.security/blog-posts/the-story-of-skills |

## Why it matters for buyers (vendor-agnostic)

- **Trusted channels carry the attack.** Forms, PDFs and approved email actions are ordinary business inputs. Filters on inputs and outputs, and DLP, can miss data that leaves through an action the agent is allowed to take.
- **A one-time scan doesn't hold.** A skill can be clean when it is scanned and change afterward through content it fetches. Checks need to happen at run time, or be repeated, not only at install.
- **Patches cover a case, not the class.** In each finding the vendor fixed the specific path. The underlying risk remains whenever an agent has access to private data, reads untrusted content, and can send data out.

## Caveats

- All four findings come from vendors that sell agent security (CodeIntegrity, Capsule and AIR), so each has a commercial interest in the result. AIR's reach and corporate-account figures are self-reported.
- Coverage was read; primary write-ups were not fetched in this pass.
- Related vendor records are in research PRs #245 and #247 (Capsule, AIR, CodeIntegrity), which are not merged yet.

Sources: [Simon Willison, Notion lethal trifecta](https://simonwillison.net/2025/Sep/19/notion-lethal-trifecta), [THE DECODER, Notion AI agents security update](https://the-decoder.com/notion-ai-agents-get-security-update-after-data-leak/), [VentureBeat, Copilot and Agentforce prompt injection](https://venturebeat.com/security/microsoft-salesforce-copilot-agentforce-prompt-injection-cve-agent-remediation-playbook), [The Hacker News, fake AI agent skill](https://thehackernews.com/2026/06/fake-ai-agent-skill-passed-security.html).
