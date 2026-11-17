export const cedarRidgeId = "cedar-ridge";

type Reference = {
  label: string;
} & ({ productId: string } | { vendorId: string } | { categoryId: string });

type Topic = {
  title: string;
  text: string;
  sourceIds?: readonly string[];
  evidence?: readonly { time: string; session: string; object: string; result: string }[];
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
        text: "An AWS account owns resources and provides an administration boundary. Its root user has broad account control, an IAM user is a persistent identity, and an IAM role is assumed for a temporary session. ECS makes temporary task-role credentials available to the application for S3 access. The separate execution role gives the ECS agent permissions for tasks such as pulling images. Temporary credentials avoid a static application key, but a session can still use overly broad permissions.",
        sourceIds: ["src-iam-identities", "src-ecs-task-role"],
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
        title: "CloudTrail · retain audit telemetry",
        text: "CloudTrail records API activity for audit and investigation. Management events include control-plane activity such as policy changes. The investigator must separately configure S3 data events for the relevant buckets and operations to retain object reads such as GetObject. A gap in the selected scope or retention limits what Cedar Ridge can reconstruct.",
        sourceIds: ["src-cloudtrail-data-events"],
      },
      {
        title: "GuardDuty · detect unusual data access",
        text: "GuardDuty S3 Protection analyzes a separate stream of S3 data events. It evaluates behavior such as the requesting identity, API calls, and location against learned patterns. Unusual GetObject activity can produce a finding even if Cedar Ridge did not configure its own trail to retain those events. Coverage depends on the enabled protection and Region. The finding gives the SOC a lead to investigate.",
        sourceIds: ["src-guardduty-s3-protection", "src-guardduty-s3-findings"],
      },
      {
        title: "Posture and finding prioritization",
        text: "Security Hub CSPM evaluates AWS configurations against enabled security controls and standards. For example, a failed S3 control can show a configuration problem. Security Hub brings in supported signals from GuardDuty, CSPM, Inspector, and Macie. When supported resources have sufficient contributing traits, it can produce a separate exposure finding with severity and contributing signals. The SOC uses that context to prioritize review and checks retained object events to determine access.",
        sourceIds: ["src-security-hub-cspm", "src-security-hub-exposures"],
      },
      {
        title: "When Security Lake helps",
        text: "Security Lake can collect enabled source types such as CloudTrail S3 data events and Security Hub CSPM findings. It normalizes them to the Open Cybersecurity Schema Framework (OCSF) and stores them in an S3 data lake for authorized downstream tools and teams. Consider it when several accounts or SOC tools need shared telemetry. It still takes source configuration, retention decisions, and an investigation workflow. Cedar Ridge can start with its scoped audit trail.",
        sourceIds: ["src-security-lake-overview", "src-security-lake-aws-sources"],
      },
    ],
  },
  {
    id: "investigate",
    title: "Investigate the alert",
    intro: "All observations below are fictional. The exercise models how an analyst checks scope and confidence before recommending containment.",
    topics: [
      { title: "09:00 · Establish the baseline", text: "The reporting job normally reads about 45 objects in half an hour from its reporting prefix. The platform team confirms no scheduled batch job during the alert window." },
      { title: "09:30 · Triage the signal", text: "A synthetic GuardDuty finding flags roughly 1,800 GetObject requests associated with the analytics task role, session reporting-task-42, and an unexpected source. The request count includes outcomes the analyst has yet to verify. The exercise numbers are illustrative." },
      {
        title: "09:45 · Inspect the evidence",
        text: "These fictional GetObject records are simplified for the exercise. Match the assumed role and session against the finding and check each request result. The successful read outside the reporting prefix establishes object access in the logged scope. Check approved workload activity and logging coverage before concluding misuse or estimating the full affected dataset.",
        evidence: [
          { time: "09:06 UTC", session: "reporting-task-42", object: "reports/weekly.csv", result: "Success" },
          { time: "09:12 UTC", session: "reporting-task-42", object: "restricted/cohort-example.csv", result: "Success" },
          { time: "09:14 UTC", session: "reporting-task-42", object: "restricted/archive-example.csv", result: "AccessDenied" },
        ],
        sourceIds: ["src-cloudtrail-data-events"],
      },
      { title: "10:00 · Contain and verify", text: "Preserve the finding, object event records, and relevant policies. Coordinate with the workload owner to restrict the role to necessary objects, address suspect sessions through the approved response process, and verify both legitimate report generation and blocked out-of-scope reads. Document evidence gaps and confirm future logging coverage.", sourceIds: ["src-aws-ir-containment"] },
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
        text: "AWS Security Hub documents exposure correlation across AWS signals. Wiz describes combining cloud posture, identity permissions, and data sensitivity in its graph. That is partial overlap in prioritization. Use the same scenario to see whether each option identifies the role-to-bucket path, explains its risk and identifies an owner. Determine whether the gap is configuration checks, exposure prioritization, or sensitive data context. Relative accuracy and in-scope coverage are Unknown.",
        sourceIds: ["src-security-hub-exposures", "src-wiz-cloud-context"],
        references: [{ label: "Wiz", productId: "wiz" }, { label: "Cloud entitlement management", categoryId: "ciem" }],
      },
      {
        title: "Credential management is a separate requirement",
        text: "The ECS task role handles application access to AWS. Vault can issue leased AWS credentials, including temporary credentials for an assumed role, where a separate broker is a requirement. It can complement the AWS identity model. The Cedar Ridge application already receives temporary credentials through ECS, so ask what additional use case would justify operating a broker. Neither claim establishes entitlement review or S3 detection coverage.",
        sourceIds: ["src-ecs-task-role", "src-vault-aws-secrets-engine"],
        references: [{ label: "HashiCorp Vault", productId: "vault" }],
      },
      {
        title: "Decision 2 · Where should analysts investigate and manage the case?",
        text: "Security Hub provides AWS finding and exposure context. Sentinel documents CloudTrail and GuardDuty ingestion and has incident timelines and tasks. Splunk documents CloudTrail ingestion into Splunk Cloud Platform via its AWS add-on and case investigation in Splunk Enterprise Security. Both are options for the specific buyer requirement of working a case in a central SOC queue. The connectors complement AWS telemetry and detection. Security Lake addresses centralized retention and access to normalized data. Evaluate its added value only if the SOC needs that shared store and has a supported path to query it. Compare which fields reach the case, who owns triage, and whether the team can reconstruct the same object access in each system. Detection parity, exact configuration, and ingestion cost remain Unknown.",
        sourceIds: ["src-security-hub-exposures", "src-sentinel-aws-connector", "src-sentinel-incident-workflow", "src-splunk-aws-cloudtrail", "src-splunk-es-investigations"],
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
      { title: "Trade-offs and measures", text: "Compare existing contracts, ingestion and retention effort, and the time spent reconciling alerts across tools. Record time from alert to affected-role and data identification, the percentage of in-scope buckets with validated object-event coverage, and analyst minutes per case. Replay the same synthetic case for each workflow. Ask the SOC owner to time the investigation and the cloud owner to verify the coverage denominator. Use analyst minutes saved per case and monthly case volume to estimate analyst hours recovered, then compare against incremental operating cost." },
    ],
  },
  {
    id: "knowledge",
    title: "Check your understanding",
    intro: "Answer in your own words before opening the reasoning.",
    topics: [],
    prompts: [
      { question: "Which request extends the suspected scope of the incident?", reasoning: "The successful read outside the reporting prefix extends the observed scope. The denied request records an attempt. Compare the session to expected workload activity and account for any unlogged buckets before making a broader claim." },
      { question: "Why can GuardDuty alert if CloudTrail has no retained GetObject events?", reasoning: "GuardDuty S3 Protection has its own access to S3 activity. Cedar Ridge needs separately configured audit coverage to retrieve object-level records for its investigation." },
      { question: "Which service checks posture, which prioritizes exposures, and where does Security Lake fit?", reasoning: "Security Hub CSPM checks configurations. Security Hub correlates and prioritizes supported signals. Security Lake centralizes and normalizes supported telemetry for downstream use." },
      { question: "Give a one-minute recommendation to the CISO.", reasoning: "Explain how a task role gives temporary access, why its permissions were too broad, what the alert and audit records establish, and how you will narrow access and measure whether investigation improves." },
    ],
  },
];
