import { currentVendorMonitorView } from "@/lib/research/vendor-monitor";

export const dynamic = "force-dynamic";

export async function GET() {
  const view = await currentVendorMonitorView();
  return Response.json(view);
}
