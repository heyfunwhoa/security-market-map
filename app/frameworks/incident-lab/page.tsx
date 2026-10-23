import Link from "next/link";
import { PageIntro } from "@/components/chrome";
import { IncidentLab } from "@/components/incident-lab";
export const metadata = { title: "Incident classifier lab" };
export default function IncidentLabPage() {
 return <main className="mx-auto max-w-6xl px-4 py-10">
  <PageIntro kicker="Synthetic lab · Not live intelligence" title="Incident classification workbench" lede="Explore how source claims, candidate MITRE ATT&CK techniques, VERIS unknowns and human-review gates behave. Nothing here is a verified breach classification." />
  <p className="mt-5 text-sm text-muted-foreground">Read the <Link className="underline" href="/frameworks">framework reference</Link>. Try removing evidence or requesting reviewed status to see why publication stays blocked.</p>
  <IncidentLab />
 </main>;
}
