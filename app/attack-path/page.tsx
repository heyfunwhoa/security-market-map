import Link from "next/link";
import { AttackPath } from "@/components/attack-path";
import { PageIntro } from "@/components/chrome";
import { REVIEWED } from "@/lib/data/brief";

export const metadata = { title: "Attack path" };

export default function AttackPathPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro
        kicker="Guided scenario"
        title="A coding agent finds a key, uses it, and tries to export data"
        lede="Each step names a control that could observe or intervene. Seeing an action, recommending a response, and stopping it before completion are different. Evidence stays unknown unless a primary page has been cited."
      />
      <p className="mt-4 text-sm text-muted-foreground">
        Reviewed {REVIEWED}. Chain: secrets detection, non-human identity, a vault or PAM broker, agent
        runtime, then data security.{" "}
        <Link href="/control-map" className="text-primary hover:underline">
          Control map
        </Link>
      </p>
      <div className="mt-6">
        <AttackPath />
      </div>
    </main>
  );
}
