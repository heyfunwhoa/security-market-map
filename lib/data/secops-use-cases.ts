import type { Capability, Product, UseCase, UseCaseSeats } from "../schema";

type Journey = UseCase & { productIds: string[]; seatIds: string[]; pilot: string };

export const secopsJourneys: Journey[] = [
  {
    id: "uc-investigate-finding", slug: "investigate-a-finding", name: "Investigate a security finding",
    buyerQuestion: "Can the next analyst pick up a finding and explain what happened?",
    problem: "Related alerts arrive in different queues. The next analyst needs to see the supporting events, what has been checked and who owns the case.",
    architecture: "Follow a finding from its source into a case. Inspect the linked evidence and the record available at shift change.",
    stakeholders: ["SOC analyst", "SOC lead", "Detection engineer"], budgetOwner: "Usually the SOC lead responsible for investigation coverage.",
    triggers: ["Repeated investigations of the same event", "Cases stall at shift change"],
    successMetrics: ["Minutes to reconstruct a finding", "Cases handed off with an owner and linked evidence"],
    categoryIds: ["siem"], capabilityIds: ["cap-investigation-case"],
    discoveryQuestions: ["Which evidence disappears when the case changes hands?", "Can another analyst explain the decision using only the case record?"],
    pilot: "Give two analysts the same sanitized finding. Have one open a case and the other reconstruct the timeline without a verbal handoff.",
    productIds: ["splunk", "microsoft-sentinel"], seatIds: ["soc-lead", "soc-analyst", "detection-engineer"],
  },
  {
    id: "uc-automate-response", slug: "automate-a-response", name: "Automate a response",
    buyerQuestion: "Who approves a response and how can the SOC tell that the action completed?",
    problem: "A finding can reach a queue long before anyone takes action. The SOC needs to distinguish event delivery, permission to act and proof of completion.",
    architecture: "Track the rule that routes the finding, the person or policy that approves an action, the playbook or target that executes it and the evidence returned to the case.",
    stakeholders: ["SOC lead", "Incident responder", "Cloud security engineer"], budgetOwner: "SOC or cloud security, depending on who operates the response workflow.",
    triggers: ["Repeated manual responses", "Actions marked closed without confirmation"],
    successMetrics: ["Time from approval to confirmed action", "Failed actions surfaced to an owner"],
    categoryIds: ["soar"], capabilityIds: ["cap-route-finding", "cap-run-response-playbook"],
    discoveryQuestions: ["Which system confirms the action completed after the event was delivered?", "Who handles a failed action or duplicate finding?"],
    pilot: "Route a synthetic finding to a test ticket. Record the approval, ticket ID and delivery result, then repeat with the target unavailable.",
    productIds: ["microsoft-sentinel", "aws-security-hub"], seatIds: ["soc-lead", "incident-response", "cloud-sec"],
  },
  {
    id: "uc-analyze-file", slug: "analyze-a-suspicious-file", name: "Analyze a suspicious file",
    buyerQuestion: "Can an analyst explain a file verdict and revisit the original artifact when new evidence arrives?",
    problem: "A file alert leaves two questions open. The team needs to explain the verdict today and determine whether it can revisit that same file later.",
    architecture: "Identify where the original artifact is retained, where an approved sample may be analyzed and how the resulting evidence returns to the case. Collection and analysis may sit in different tools.",
    stakeholders: ["Incident responder", "Forensics analyst", "Threat hunter"], budgetOwner: "Usually the security operations or incident response lead.",
    triggers: ["A historical file needs a second review", "Analysts receive verdicts without supporting evidence"],
    successMetrics: ["Time to retrieve an approved artifact", "Verdicts with evidence the next analyst can inspect"],
    categoryIds: ["malware-analysis"], capabilityIds: ["cap-retain-endpoint-files", "cap-inspect-file"],
    discoveryQuestions: ["Who may retain or submit the original file, and under what sharing terms?", "What will a second analyst be able to retrieve after the case closes?"],
    pilot: "Use an approved benign file with a recorded hash. Trace its retention and analysis report, then ask another analyst to retrieve the same evidence.",
    productIds: ["stairwell-platform", "reversinglabs-spectra-analyze"], seatIds: ["soc-lead", "incident-response", "digital-forensics", "threat-hunter"],
  },
];

export const secopsCapabilities: Capability[] = [
  { id: "cap-investigation-case", slug: "investigation-case", name: "Group findings in an investigation", categoryId: "siem", description: "Keep related alerts or findings together in an analyst case." },
  { id: "cap-route-finding", slug: "route-finding", name: "Route a finding to a target", categoryId: "soar", description: "Match finding events and deliver them to a configured destination." },
  { id: "cap-run-response-playbook", slug: "run-response-playbook", name: "Run a response playbook", categoryId: "soar", description: "Invoke a response workflow and inspect its execution result." },
  { id: "cap-retain-endpoint-files", slug: "retain-endpoint-files", name: "Retain original endpoint files", categoryId: "malware-analysis", description: "Preserve artifacts from enrolled endpoints for later review." },
  { id: "cap-inspect-file", slug: "inspect-file", name: "Analyze a submitted file", categoryId: "malware-analysis", description: "Produce analysis evidence about a file supplied for investigation." },
];

export const secopsSeats: UseCaseSeats[] = secopsJourneys.map(({ id, seatIds }) => ({
  useCaseId: id, seatIds, likelyBudgetSeatIds: ["soc-lead"], unmodeledStakeholders: [],
}));

export function withSecopsUseCases(product: Product): Product {
  const matches = secopsJourneys.filter((journey) => journey.productIds.includes(product.id));
  return matches.length ? { ...product, useCaseIds: [...product.useCaseIds, ...matches.map((journey) => journey.id)] } : product;
}
