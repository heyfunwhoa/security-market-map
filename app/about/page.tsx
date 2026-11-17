import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/chrome";

export const metadata: Metadata = {
  title: "About",
  description: "Who maintains the Security Market Map, what it is for, and what it is not.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <PageIntro
        kicker="About"
        title="Why this map exists"
        lede="Security categories overlap. This map makes those relationships easier to explore without treating every vendor as a direct competitor."
      />

      <section className="mt-10" aria-labelledby="purpose">
        <h2 id="purpose" className="text-2xl">Purpose</h2>
        <p className="mt-3 text-sm leading-6">
          Help people prepare for security conversations with less research friction. The map organizes the
          landscape and connects published claims to their sources, keeping Unknown and research limits visible.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">
          <li>Who it helps: AEs, SEs, analysts, buyers, and learners comparing categories and tools.</li>
          <li>What gets in their way: overlapping categories, scattered sources, and unclear capability claims.</li>
          <li>What it is not: a ranking, an analyst classification, or a test of any product.</li>
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="ownership">
        <h2 id="ownership" className="text-2xl">Ownership</h2>
        <p className="mt-3 text-sm leading-6">
          Built and maintained by Kristen Aing as a portfolio project that combines enterprise security sales,
          competitive research, and product thinking. It is independent research and is not affiliated with any
          vendor or analyst firm named on the site.
        </p>
        <p className="mt-3 text-sm leading-6">
          The source code and research data are public on{" "}
          <a href="https://github.com/heyfunwhoa/security-market-map" className="text-primary underline underline-offset-4">
            GitHub
          </a>
          . Corrections and new sources go through the contribution guide there.
        </p>
      </section>

      <section className="mt-10" aria-labelledby="read-more">
        <h2 id="read-more" className="text-2xl">Read next</h2>
        <ul className="mt-3 space-y-2 text-sm leading-6">
          <li>
            <Link href="/methodology" className="text-primary underline underline-offset-4">
              How to read this map
            </Link>
          </li>
          <li>
            <Link href="/sources" className="text-primary underline underline-offset-4">
              Sources and references
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
