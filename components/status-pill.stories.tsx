import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StatusPill } from "@/components/chrome";

// Every status the catalog can put on a page, grouped the way readers meet them.
const groups: Record<string, string[]> = {
  "Claim verification": ["verified", "vendor_published", "needs_review", "conflicting", "superseded", "research_candidate", "unknown"],
  "Source type": ["official_docs", "vendor_marketing", "press_release", "customer_story", "analyst", "review", "standard", "news", "internal_note"],
  Availability: ["generally_available", "limited", "announced", "legacy_name", "not_supported"],
  "Evidence strength": ["independently_verified", "vendor_reported", "source_referenced", "evidenced", "unverified", "disputed", "hypothesis"],
};

const meta: Meta<typeof StatusPill> = {
  title: "Evidence/Status pill",
  component: StatusPill,
  args: { status: "vendor_published" },
  argTypes: { status: { control: "select", options: Object.values(groups).flat() } },
};
export default meta;
type Story = StoryObj<typeof StatusPill>;

export const Single: Story = {};

export const AllStatuses: Story = {
  name: "All statuses",
  render: () => (
    <div className="flex max-w-3xl flex-col gap-6">
      {Object.entries(groups).map(([label, statuses]) => (
        <section key={label}>
          <h2 className="mb-2 text-sm font-semibold">{label}</h2>
          <ul className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <li key={status} className="flex flex-col items-start gap-1">
                <StatusPill status={status} />
                <code className="text-[11px] text-muted-foreground">{status}</code>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  ),
};
