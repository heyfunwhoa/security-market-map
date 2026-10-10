/**
 * The Inngest SDK serves functions only in dev mode or with a cloud signing key.
 * An unset `INNGEST_DEV` and an unset `INNGEST_SIGNING_KEY` is cloud mode, and
 * the SDK answers `/api/inngest` with HTTP 500. This check matches that rule
 * so the route can explain the missing configuration instead.
 */
export function inngestServeReady(env: Record<string, string | undefined> = process.env): boolean {
  const dev = env.INNGEST_DEV?.trim() ?? "";
  const lowered = dev.toLowerCase();
  if (lowered === "1" || lowered === "true") return true;
  if (dev && lowered !== "0" && lowered !== "false" && lowered !== "undefined") return true;
  return Boolean(env.INNGEST_SIGNING_KEY?.trim());
}

export function inngestNotConfiguredResponse(): Response {
  return Response.json(
    {
      error:
        "Inngest is not configured. Set INNGEST_DEV=1 for the local Dev Server, or set INNGEST_SIGNING_KEY before connecting this app to Inngest Cloud.",
    },
    { status: 503 },
  );
}
