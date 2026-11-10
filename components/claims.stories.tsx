import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ClaimList } from "@/components/claims";
import { catalog } from "@/lib/catalog";
import type { Claim } from "@/lib/schema";

// Real published claims from the catalog, one per verification status that exists today.
function firstWith(status: Claim["verificationStatus"]): Claim[] {
  const claim = catalog.claims.find((c) => c.verificationStatus === status);
  return claim ? [claim] : [];
}
const longest = [...catalog.claims].sort((a, b) => b.statement.length - a.statement.length)[0];

const meta: Meta<typeof ClaimList> = {
  title: "Evidence/Claim list",
  component: ClaimList,
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="max-w-2xl"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof ClaimList>;

export const Verified: Story = { args: { claims: firstWith("verified") } };
export const VendorPublished: Story = { name: "Vendor published", args: { claims: firstWith("vendor_published") } };
export const NeedsReview: Story = { name: "Needs review", args: { claims: firstWith("needs_review") } };
export const Conflicting: Story = { args: { claims: firstWith("conflicting") } };
export const LongestStatement: Story = { name: "Longest statement in the catalog", args: { claims: [longest] } };
export const NoClaims: Story = { name: "No claims (Unknown)", args: { claims: [] } };
export const MixedList: Story = {
  name: "Mixed list",
  args: { claims: [...firstWith("verified"), ...firstWith("vendor_published"), ...firstWith("needs_review"), ...firstWith("conflicting")] },
};
