export type CourseAnswer = {
  label: string;
  reason: string;
};

export type CourseStep = {
  id: string;
  title: string;
  objective: string;
  concept: string;
  mechanics: string;
  caveat: string;
  example: string;
  source: { label: string; url: string };
  question: string;
  options: readonly CourseAnswer[];
  correctIndex: number;
  market: { context: string; href: string; label: string };
  teachBack: string;
};

export const awsFoundationsSteps: readonly CourseStep[] = [
  {
    id: "boundary",
    title: "Cloud responsibility and architecture",
    objective: "Distinguish the application, customer-owned controls, and AWS-operated infrastructure.",
    concept: "AWS secures the underlying cloud infrastructure; the customer configures its workloads, permissions and data access according to the services selected.",
    mechanics: "The fictional Cedar Ridge app runs in an ECS task, uses an IAM task role to request access, and reads reports in S3. S3 is a regional AWS service, not a resource inside the customer's VPC. IAM policy decisions also depend on resource policies and account-level restrictions.",
    caveat: "Shared responsibility differs by service. A secure AWS platform does not guarantee the customer's permissions are safe.",
    example: "An application can run on AWS infrastructure while retaining a role with overly broad object access.",
    source: { label: "AWS shared responsibility model", url: "https://aws.amazon.com/compliance/shared-responsibility-model/" },
    question: "The S3 bucket is misconfigured to permit unnecessary access. Who must correct the customer-managed access configuration?",
    options: [
      { label: "AWS automatically, because S3 is managed", reason: "AWS manages the S3 service, but customers configure their access permissions." },
      { label: "The customer operating the workload", reason: "Customer-managed S3 and IAM authorization controls are the customer's responsibility." },
      { label: "The external SIEM vendor", reason: "A SIEM may reveal problems but does not own the customer's IAM configuration." },
      { label: "The container registry", reason: "The registry stores images, not S3 authorization policies." }
    ],
    correctIndex: 1,
    market: { context: "Cloud platform security has shared-responsibility boundaries. Independent CNAPP/CSPM products may help assess configurations, but they do not transfer accountability.", href: "/landscape", label: "Explore the security landscape" },
    teachBack: "Explain in 2 sentences how a managed cloud service can still expose data through customer configuration."
  },
  {
    id: "identity",
    title: "ECS task roles and temporary credentials",
    objective: "Trace the identity used by a container workload.",
    concept: "A task role provides the application with temporary AWS credentials. Its trust policy controls assumption; its permissions constrain actions.",
    mechanics: "ECS supplies task-role credentials to the application. AWS evaluates the session's permissions when the app calls S3. The ECS task execution role is a separate role for ECS agent operations such as pulling images.",
    caveat: "Temporary credentials reduce reliance on static keys but can still be misused before expiry.",
    example: "A task role that permits s3:* on * gives the application excessively broad potential S3 permissions.",
    source: { label: "IAM roles for ECS tasks", url: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html" },
    question: "Which identity should the Cedar Ridge reporting application ordinarily use to call S3?",
    options: [
      { label: "The AWS root user's permanent key", reason: "Root credentials are inappropriate for routine application requests." },
      { label: "The ECS task execution role only", reason: "The execution role is primarily for ECS agent operations, not application S3 access." },
      { label: "A dedicated, least-privilege ECS task role", reason: "A task role gives the application scoped, temporary credentials." },
      { label: "A public S3 bucket policy", reason: "Public access is not an application identity." }
    ],
    correctIndex: 2,
    market: { context: "Compare AWS-native workload roles with broader machine-identity governance, privileged access and credential brokerage requirements. They can complement rather than replace one another.", href: "/categories/ciem", label: "Explore cloud entitlements" },
    teachBack: "Explain the difference between an ECS task role, task execution role, and a static AWS key."
  },
  {
    id: "authorization",
    title: "S3 least privilege",
    objective: "Identify an excessive authorization scope and propose a narrower one.",
    concept: "The application needs only GetObject for approved report objects, not all S3 actions on all resources.",
    mechanics: "A narrowly scoped identity-policy statement could allow s3:GetObject on arn:aws:s3:::cedar-ridge-reporting/approved/*. Actual authorization still depends on applicable bucket policies, SCPs, permission boundaries and explicit denies. ListBucket, if legitimately required, is a separate bucket-level action.",
    caveat: "A policy snippet by itself is not a full evaluation of effective access, and legitimate workflows must be tested before changing permissions.",
    example: "A stolen task session should not be able to retrieve objects outside the approved prefix when effective permissions enforce the boundary.",
    source: { label: "Amazon S3 access control", url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-overview.html" },
    question: "Which policy is the strongest starting point for an app that only reads report objects under approved/?",
    options: [
      { label: "Allow s3:* on all resources", reason: "This grants a broad range of S3 actions and resources." },
      { label: "Allow s3:GetObject on arn:aws:s3:::cedar-ridge-reporting/approved/*", reason: "This scopes the action and resources to the approved object prefix, subject to other controls." },
      { label: "Allow iam:* on all resources", reason: "Broad IAM administration permissions do not solve scoped S3 reads." },
      { label: "Allow s3:DeleteObject on the reporting bucket", reason: "Deleting objects is unrelated to the required read-only workflow." }
    ],
    correctIndex: 1,
    market: { context: "IAM authorization addresses workload access. Secrets scanners, vaults, CIEM and CSPM address adjacent discovery, issuance or governance problems; require an explicit buyer use case before comparing products.", href: "/categories/secrets-management", label: "Explore secrets management" },
    teachBack: "Recommend a safer policy and explain what could still block or grant a request."
  },
  {
    id: "detection",
    title: "GuardDuty versus CloudTrail evidence",
    objective: "Separate a detection hypothesis from retained object-level audit evidence.",
    concept: "GuardDuty S3 Protection detects suspicious S3 activity; CloudTrail can retain data-event audit records when an investigator enables the necessary S3 object-level logging coverage.",
    mechanics: "GuardDuty S3 Protection can analyze S3 activity without a customer creating its own CloudTrail data-event trail. A synthetic anomaly can raise an investigation lead, while retained CloudTrail object records can help establish specific requests and outcomes.",
    caveat: "An anomalous-access finding is not by itself proof of malicious intent or successful exfiltration. Coverage and log retention must be verified.",
    example: "A spike from 45 to 1,800 GetObject requests is a simulated signal. Check which requests succeeded, the role session, source and business baseline.",
    source: { label: "GuardDuty S3 Protection", url: "https://docs.aws.amazon.com/guardduty/latest/ug/s3-protection.html" },
    question: "What is the most defensible conclusion after a synthetic GuardDuty S3 anomaly finding?",
    options: [
      { label: "Sensitive data was definitely stolen", reason: "A finding is an indicator requiring corroboration, not proof of exfiltration." },
      { label: "The S3 bucket must be public", reason: "Suspicious identity-based object access does not imply public bucket access." },
      { label: "S3 access deserves investigation using available logs and context", reason: "Correlate role, API outcomes, authorization, workload schedule and retained event evidence." },
      { label: "CloudTrail automatically retained all object events", reason: "The customer's object-level logging scope and retention must be verified separately." }
    ],
    correctIndex: 2,
    market: { context: "AWS detection findings and retained telemetry may feed an existing SIEM, MDR or cloud detection product. Compare the buyer's investigation workflow, not just product names.", href: "/landscape", label: "Explore detection and SecOps alternatives" },
    teachBack: "Explain how GuardDuty and CloudTrail differ and identify two questions to ask before calling the event a breach."
  },
  {
    id: "hub",
    title: "Security Hub, posture and the SOC",
    objective: "Distinguish finding correlation, posture checks and a security data lake.",
    concept: "Security Hub contextualizes supported security findings; Security Hub CSPM evaluates posture controls; Security Lake provides a governed data lake for supported security telemetry.",
    mechanics: "The Cedar Ridge SOC may review a GuardDuty finding with CSPM and vulnerability context, then investigate actual access using retained events and existing SOC tools. A central finding is not automatically a full incident case or proof of compromise.",
    caveat: "Security Hub, CSPM, Security Lake, SIEM and incident-response tooling solve different jobs and may coexist.",
    example: "The SOC prioritizes the role and bucket exposure, verifies object access, documents change approval and tests least-privilege remediation.",
    source: { label: "AWS Security Hub documentation", url: "https://docs.aws.amazon.com/securityhub/latest/userguide/" },
    question: "Which distinction is correct?",
    options: [
      { label: "Security Lake blocks all threats at runtime", reason: "Security Lake is principally a managed security-data-lake service, not universal runtime prevention." },
      { label: "Security Hub CSPM is the same as a complete SIEM", reason: "Posture control assessment is distinct from broad telemetry analytics and case workflows." },
      { label: "GuardDuty manages IAM permissions automatically", reason: "GuardDuty provides detection; IAM policy management and response are separate." },
      { label: "Security Hub correlates supported findings; CSPM evaluates posture; Security Lake stores normalized security data", reason: "These are distinct but complementary parts of the security operations architecture." }
    ],
    correctIndex: 3,
    market: { context: "Evaluate integration with the customer's existing SIEM or CNAPP, including Wiz, Splunk and Microsoft Sentinel, before recommending consolidation or displacement. Relative efficacy remains Unknown without a test.", href: "/compare", label: "Open the existing comparison workbench" },
    teachBack: "Give a CISO a 60-second explanation of Security Hub, CSPM, Security Lake and how an existing SIEM might remain useful."
  }
];

export const awsFoundationsPassCount = 4;
