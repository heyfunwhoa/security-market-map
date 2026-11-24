import { MarketContext } from "@/components/market-context";
import { CIAM_PROFILE_CHECKED, ciamProfiles, type CiamProductSlug } from "@/lib/data/ciam-profiles";

export function CiamMarketContext({ slug }: { slug: CiamProductSlug }) {
  return <MarketContext profile={ciamProfiles[slug]} checked={CIAM_PROFILE_CHECKED} />;
}
