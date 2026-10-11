import type { NextRequest } from "next/server";
import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { inngestNotConfiguredResponse, inngestServeReady } from "@/lib/inngest/config";
import { researchFunctions } from "@/lib/inngest/functions";

export const dynamic = "force-dynamic";

const handlers = serve({
  client: inngest,
  functions: researchFunctions,
});

function guarded(handler: (request: NextRequest, context: unknown) => Promise<Response>) {
  return (request: NextRequest, context: unknown) => {
    if (!inngestServeReady()) return inngestNotConfiguredResponse();
    return handler(request, context);
  };
}

export const GET = guarded(handlers.GET);
export const POST = guarded(handlers.POST);
export const PUT = guarded(handlers.PUT);
