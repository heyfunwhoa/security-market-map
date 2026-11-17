import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { SiteFooter, SiteHeader } from "@/components/chrome";
import { catalog, searchIndex } from "@/lib/catalog";
import { incidentSearchHits } from "@/lib/incident-feed";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
});

const SITE_URL = "https://security-market-map.vercel.app";
const DESCRIPTION =
  "Identity and secrets security, mapped with cited evidence. Eleven security domains, the buyer behind each category, and the source and date for every claim.";

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
    title: "Security Market Map: identity and secrets, mapped with evidence",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Security Market Map: identity and secrets, mapped with evidence",
    description: DESCRIPTION,
  },
};

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
          <SiteHeader hits={[...searchIndex(), ...incidentSearchHits()]} asOf={catalog.asOf} />
          <div id="content" tabIndex={-1}>{children}</div>
          <SiteFooter asOf={catalog.asOf} />
        </TooltipProvider>
      </body>
    </html>
  );
}
