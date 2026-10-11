import { recordVendorReview } from "@/lib/research/vendor-monitor";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Review input is invalid.", published: false }, { status: 400 });
  }
  const result = recordVendorReview(body);
  if (!result.ok) return Response.json({ error: result.error, published: false }, { status: result.status });
  return Response.json(result);
}
