import { isProductResearchSlug } from "@/lib/product-destination";
import { productComparisonUrl } from "@/lib/landscape-shortlist";
import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { SiteFooter, SiteHeader } from "@/components/chrome";
import { catalog, searchAliases, searchIndex } from "@/lib/catalog";
import { incidentSearchHits } from "@/lib/incident-feed";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
});

const DESCRIPTION =
  "Browse security domains, categories and product profiles. Follow the source and date behind each claim. Identity and secrets have the deepest coverage.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Security Market Map",
    template: "%s · Security Market Map",
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Security Market Map",
    title: "Security Market Map | Domains, categories and products",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Security Market Map | Domains, categories and products",
    description: DESCRIPTION,
  },
};

const profileComparisons = Object.fromEntries(
  catalog.products.filter((product) => isProductResearchSlug(product.slug))
    .map((product) => [`/products/${product.slug}`, productComparisonUrl(product)]),
);

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <TooltipProvider>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2 focus:shadow"
          >
            Skip to content
          </a>
          <SiteHeader profileComparisons={profileComparisons} hits={[...searchIndex(), ...incidentSearchHits()]} aliases={searchAliases()} asOf={catalog.asOf} />
          <div id="content" tabIndex={-1}>{children}</div>
          <SiteFooter asOf={catalog.asOf} />
        </TooltipProvider>
        <Analytics />
        </body>
    </html>
  );
}
