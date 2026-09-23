const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "Date not stated";
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

export function addDays(iso: string, days: number): string {
  const date = new Date(`${iso}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function relationshipLabel(type: string): string {
  switch (type) {
    case "direct_competitor":
      return "Direct competitor";
    case "bundled_alternative":
      return "Bundled alternative";
    case "complement":
      return "Complement";
    case "adjacent_budget":
      return "Adjacent budget";
    default:
      return type;
  }
}

export function sourceTypeLabel(type: string): string {
  switch (type) {
    case "official_docs":
      return "Official docs";
    case "vendor_marketing":
      return "Vendor marketing";
    case "press_release":
      return "Press release";
    case "customer_story":
      return "Customer story";
    case "analyst":
      return "Analyst";
    case "review":
      return "Review";
    case "standard":
      return "Standard";
    case "internal_note":
      return "Internal note";
    default:
      return type;
  }
}

export function verificationLabel(status: string): string {
  switch (status) {
    case "verified":
      return "Verified";
    case "vendor_published":
      return "Vendor-published";
    case "needs_review":
      return "Needs review";
    case "conflicting":
      return "Conflicting";
    case "superseded":
      return "Superseded";
    case "research_candidate":
      return "Research candidate";
    default:
      return status;
  }
}

export function cellStatusLabel(status: string): string {
  switch (status) {
    case "evidenced":
      return "Evidence";
    case "limited":
      return "Scoped";
    case "conflicting":
      return "Conflict";
    case "unverified":
      return "Unverified";
    case "unknown":
      return "Unknown";
    case "not_supported":
      return "Not supported";
    default:
      return status;
  }
}

export function availabilityLabel(status: string): string {
  switch (status) {
    case "generally_available":
      return "Documented as available";
    case "announced":
      return "Announced";
    case "limited":
      return "Limited";
    case "legacy_name":
      return "Name in transition";
    case "unknown":
      return "Availability unknown";
    default:
      return status;
  }
}

export function priceSignalLabel(type: string): string {
  switch (type) {
    case "public_list":
      return "Public list price";
    case "promotional_offer":
      return "Promotional offer";
    case "commissioned_composite":
      return "Commissioned composite";
    case "field_signal":
      return "Field signal";
    case "actual_quote":
      return "Actual quote";
    default:
      return type;
  }
}

export function deploymentLabel(value: string): string {
  switch (value) {
    case "saas":
      return "SaaS";
    case "self_hosted":
      return "Self-hosted";
    case "hybrid":
      return "Hybrid";
    case "cloud_native":
      return "Cloud-native";
    case "open_source":
      return "Open source";
    case "unknown":
      return "Deployment unknown";
    default:
      return value;
  }
}

export function scopeLabel(value: string): string {
  switch (value) {
    case "human":
      return "Human";
    case "nhi":
      return "NHI";
    case "agent":
      return "Agent";
    case "not_an_identity_control":
      return "Not an identity control";
    default:
      return value;
  }
}
