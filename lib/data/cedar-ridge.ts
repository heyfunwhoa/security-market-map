export const cedarRidgeId = "cedar-ridge";

type Reference = {
  label: string;
} & ({ productId: string } | { vendorId: string } | { categoryId: string });

type Topic = {
  title: string;
  text: string;
  sourceIds?: readonly string[];
  references?: readonly Reference[];
};

type Section = {
  id: string;
  title: string;
  intro: string;
  topics: readonly Topic[];
  prompts?: readonly { question: string; reasoning: string }[];
};

export const cedarRidgeSections: readonly Section[] = [
  {
    id: "problem",
    title: "Understand workload identity",
    intro: "Cedar Ridge Health is a fictional healthcare analytics company. Its reporting service reads restricted files from S3. The application needs an identity so the platform can grant and audit its access.",
    topics: [
      {
        title: "Accounts, roles, and temporary credentials",
        text: "An AWS account is a boundary for resources and administration. An IAM role defines an identity that a trusted principal can assume for a limited session. ECS delivers temporary task-role credentials to the reporting application, so it can authenticate without a static key in its configuration. Temporary credentials still carry the role's granted access until they expire or access is restricted.",
        sourceIds: ["src-ecs-task-role"],
        references: [{ label: "Non-human identity", categoryId: "nhi" }],
      },
      {
        title: "Trust and effective permissions",
        text: "A trust policy controls who can assume the role. Permissions determine what the resulting session can do. For Cedar Ridge, compare read access to the reporting prefix with access to every object in the bucket. Review the role and bucket policies and applicable guardrails. An explicit deny can block an action even when another policy allows it.",
        sourceIds: ["src-ecs-task-role", "src-iam-policy-evaluation"],
        references: [{ label: "Cloud infrastructure entitlements", categoryId: "ciem" }],
      },
    ],
  },
  {
    id: "architecture",
    title: "Trace the AWS architecture",
    intro: "Follow the application request, then trace two independent paths: detection and retained audit evidence.",
    topics: [
      {
        title: "Audit telemetry and threat detection",
        text: "CloudTrail management events record control-plane actions such as changes to policies. Object reads require S3 data-event coverage in the organization's audit trail or event data store. GuardDuty S3 Protection separately analyzes S3 activity for suspicious behavior. It can flag anomalies even if the team did not retain the object events it needs for investigation.",
        sourceIds: ["src-cloudtrail-data-events", "src-guardduty-s3-protection"],
      },
      {
        title: "Posture and finding prioritization",
        text: "Security Hub CSPM checks AWS configurations against controls and standards. Security Hub can combine signals from GuardDuty, CSPM, and other supported sources into prioritized exposures. A posture failure describes a configuration concern. A suspicious activity finding describes observed behavior. Neither establishes whether a particular object was accessed.",
        sourceIds: ["src-security-hub-cspm", "src-security-hub-exposures"],
      },
      {
        title: "When Security Lake helps",
        text: "Security Lake normalizes supported security events and makes them available to subscribers. Consider it when several teams need a shared source for retained telemetry across accounts. Assess source coverage, access, retention, and query ownership. For this single-account exercise, the team can start from the scoped CloudTrail evidence it already retains.",
        sourceIds: ["src-security-lake-overview", "src-cloudtrail-data-events"],
      },
    ],
  },
  {
    id: "investigate",
    title: "Investigate the alert",
    intro: "All observations below are fictional. The exercise models how an analyst checks scope and confidence before recommending containment.",
    topics: [
      { title: "09:00 · Establish the baseline", text: "The reporting job normally reads about 45 objects in half an hour from its reporting prefix. The platform team confirms no scheduled batch job during the alert window." },
      { title: "09:30 · Triage the signal", text: "A synthetic GuardDuty finding flags roughly 1,800 GetObject requests associated with the task role and an unexpected source. The request count includes outcomes the analyst has yet to verify. The exercise numbers are illustrative." },
      { title: "09:45 · Inspect the evidence", text: "Retained CloudTrail records show both allowed and denied requests, including successful reads outside the reporting prefix. That establishes successful object access in the logged scope. The full affected dataset and whether the role session was misused remain open questions." },
      { title: "10:00 · Contain and verify", text: "Preserve the finding, object event records, and relevant policies. Coordinate with the workload owner to restrict the role to necessary objects, address suspect sessions through the approved response process, and verify both legitimate report generation and blocked out-of-scope reads. Document evidence gaps and confirm future logging coverage." },
    ],
    prompts: [
      { question: "What can you conclude from the alert alone?", reasoning: "The alert raises a credible hypothesis of unusual access. Correlate the session and request outcomes, check the business baseline, and assess logging coverage before determining whether access was unauthorized or data was disclosed." },
      { question: "What would you verify before changing the role?", reasoning: "Identify the affected session and data from scoped logs, check current trust and effective permissions, confirm which accesses the application needs, and agree with the service owner on containment, rollback, and validation." },
    ],
  },
  {
    id: "market",
    title: "Compare options for two buyer decisions",
    intro: "Compare capabilities within each decision. Vendor sources describe supported or advertised functionality. Cedar Ridge would validate coverage and workflow in its own authorized evaluation.",
    topics: [
      {
        title: "Decision 1 · How should we prioritize excessive access to sensitive data?",
        text: "AWS Security Hub documents exposure correlation across AWS signals. Wiz describes combining cloud posture, identity permissions, and data sensitivity in its graph. That is partial overlap in risk prioritization. Evaluate whether each option shows the reporting role's effective access, data sensitivity, and ownership clearly enough for the cloud team to act. Relative accuracy and exact coverage for this workload are Unknown.",
        sourceIds: ["src-security-hub-exposures", "src-wiz-cloud-context"],
        references: [{ label: "Wiz", productId: "wiz" }, { label: "Cloud entitlement management", categoryId: "ciem" }],
      },
      {
        title: "Decision 2 · Where should analysts investigate and manage the case?",
        text: "Security Hub provides AWS finding and exposure context. Microsoft Sentinel documents a connector for CloudTrail and GuardDuty, which can complement AWS findings and support an existing SOC workflow. Splunk documents CloudTrail ingestion into Splunk Cloud Platform through its AWS add-on. That is an integration for telemetry ingestion. Case management parity, alert coverage, and ingestion cost for this workload remain Unknown. Test the incumbent before adding another console.",
        sourceIds: ["src-security-hub-exposures", "src-sentinel-aws-connector", "src-splunk-aws-cloudtrail"],
        references: [{ label: "Microsoft Sentinel", productId: "microsoft-sentinel" }, { label: "Splunk", vendorId: "splunk" }, { label: "SIEM category", categoryId: "siem" }],
      },
    ],
  },
  {
    id: "buyer",
    title: "Recommend a pilot",
    intro: "Start by fixing the excessive permissions and measuring the current incident workflow. Evaluate a tool against the gaps the baseline reveals.",
    topics: [
      { title: "Discovery questions", text: "Ask the cloud lead who owns role changes and which sensitive buckets have object logging. Ask the SOC lead where cases are managed and how analysts match a finding to a role session and object events. Ask the CISO what evidence would justify paying for another product or expanding an existing one." },
      { title: "Trade-offs and measures", text: "Compare existing contracts, ingestion and retention effort, and the time spent reconciling alerts across tools. Record time from alert to affected-role and data identification, the percentage of in-scope buckets with validated object-event coverage, and analyst minutes per case. Use the same synthetic case for each workflow and review results with the cloud and SOC owners." },
    ],
  },
  {
    id: "knowledge",
    title: "Check your understanding",
    intro: "Answer in your own words before opening the reasoning.",
    topics: [],
    prompts: [
      { question: "Why can GuardDuty alert if CloudTrail has no retained GetObject events?", reasoning: "GuardDuty S3 Protection has its own access to S3 activity. Cedar Ridge needs separately configured audit coverage to retrieve object-level records for its investigation." },
      { question: "Which service checks posture, which prioritizes exposures, and where does Security Lake fit?", reasoning: "Security Hub CSPM checks configurations. Security Hub correlates and prioritizes supported signals. Security Lake centralizes and normalizes supported telemetry for downstream use." },
      { question: "Give a one-minute recommendation to the CISO.", reasoning: "Explain how a task role gives temporary access, why its permissions were too broad, what the alert and audit records establish, and how you will narrow access and measure whether investigation improves." },
    ],
  },
];
