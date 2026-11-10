import type { VendorSeatTargeting } from "@/lib/schema";

// KRU-329. Who each vendor says it sells to, in the categories where seat ownership is
// contested. Seat ids are an editorial mapping of the vendor's own audience wording.
// "Security teams" maps to the seat that owns the category day to day (AppSec for code
// scanning, platform security for secrets management). Vendor audience is not buyer proof.

const CHECKED = "2026-11-09";

export const vendorSeatTargeting: VendorSeatTargeting[] = [
  // Secrets detection and remediation
  {
    vendorId: "truffle-security",
    categoryId: "secrets-detection",
    seatIds: ["appsec", "developer"],
    audience: "Security teams run the program; pre-commit and pre-receive hooks are for developers.",
    urls: ["https://trufflesecurity.com/trufflehog-enterprise", "https://trufflesecurity.com/"],
    basis: "vendor-page",
    inspection: "search-excerpt",
    checkedAt: CHECKED,
  },
  {
    vendorId: "gitguardian",
    categoryId: "secrets-detection",
    seatIds: ["appsec", "platform", "developer"],
    audience: "Application security, platform engineering and development teams.",
    urls: ["https://itwire.com/guest-articles/company-news/gitguardian-unveils-hasmysecretleaked,-bringing-leak-detection-to-every-secret-in-the-devops-pipeline"],
    basis: "vendor-press",
    inspection: "search-excerpt",
    checkedAt: CHECKED,
  },
  {
    vendorId: "github",
    categoryId: "secrets-detection",
    seatIds: ["developer", "appsec"],
    audience: "Developers get feedback at push time; org owners and security managers enable it and get bypass alerts.",
    urls: ["https://docs.github.com/code-security/secret-scanning/push-protection-for-repositories-and-organizations"],
    basis: "vendor-docs",
    inspection: "search-excerpt",
    checkedAt: CHECKED,
  },
  {
    vendorId: "cycode",
    categoryId: "secrets-detection",
    seatIds: ["appsec", "developer"],
    audience: "Security teams and developers, with an IDE plug-in for developers.",
    urls: ["https://cycode.com/press/cycode-elevates-its-security-first-developer-friendly-appsec-aspm-platform-with-new-capabilities/"],
    basis: "vendor-press",
    inspection: "search-excerpt",
    checkedAt: CHECKED,
  },
  // Secrets management
  {
    vendorId: "hashicorp",
    categoryId: "secrets-management",
    seatIds: ["platform"],
    audience: "Platform teams that run shared infrastructure services.",
    urls: ["https://www.hashicorp.com/blog/hashiconf-global-preview-sessions-for-cloud-platform-teams"],
    basis: "vendor-page",
    inspection: "search-excerpt",
    checkedAt: CHECKED,
  },
  {
    vendorId: "doppler",
    categoryId: "secrets-management",
    seatIds: ["developer", "platform", "platform-security"],
    audience: "Developers first, with DevOps and security teams controlling access.",
    urls: ["https://www.doppler.com/blog/series-a-announcement", "https://www.doppler.com/centralized-secrets-management"],
    basis: "vendor-page",
    inspection: "search-excerpt",
    checkedAt: CHECKED,
  },
  {
    vendorId: "infisical",
    categoryId: "secrets-management",
    seatIds: ["developer", "platform", "platform-security"],
    audience: "Developers, infrastructure and security teams.",
    urls: ["https://infisical.com/docs/documentation/getting-started/introduction"],
    basis: "vendor-docs",
    inspection: "search-excerpt",
    checkedAt: CHECKED,
  },
  {
    vendorId: "akeyless",
    categoryId: "secrets-management",
    seatIds: ["platform", "platform-security", "grc-owner"],
    audience: "IT security, DevOps engineers, platform engineers and compliance officers.",
    urls: ["https://www.akeyless.io/landing/product-tour/"],
    basis: "vendor-page",
    inspection: "search-excerpt",
    checkedAt: CHECKED,
  },
  // Application security posture management
  {
    vendorId: "apiiro",
    categoryId: "aspm",
    seatIds: ["appsec", "developer"],
    audience: "AppSec teams, with a shared view for developers.",
    urls: ["https://apiiro.com/?p=7818"],
    basis: "vendor-page",
    inspection: "search-excerpt",
    checkedAt: CHECKED,
  },
  {
    vendorId: "armorcode",
    categoryId: "aspm",
    seatIds: ["appsec", "exposure-management", "product-security"],
    audience: "Application security and vulnerability management teams, plus a page for product security leaders.",
    urls: ["https://armorcode.com/platform-overview", "https://www.armorcode.com/product-security-leaders"],
    basis: "vendor-page",
    inspection: "search-excerpt",
    checkedAt: CHECKED,
  },
  {
    vendorId: "ox-security",
    categoryId: "aspm",
    seatIds: ["appsec", "developer"],
    audience: "Built for security, translated for developers.",
    urls: ["https://www.ox.security/?p=8807"],
    basis: "vendor-page",
    inspection: "search-excerpt",
    checkedAt: CHECKED,
  },
  {
    vendorId: "cycode",
    categoryId: "aspm",
    seatIds: ["appsec", "developer"],
    audience: "Security teams and developers working from one ASPM view.",
    urls: ["https://cycode.com/press/cycode-elevates-its-security-first-developer-friendly-appsec-aspm-platform-with-new-capabilities/"],
    basis: "vendor-press",
    inspection: "search-excerpt",
    checkedAt: CHECKED,
  },
];
