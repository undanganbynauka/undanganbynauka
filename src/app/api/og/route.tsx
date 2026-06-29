import { ImageResponse } from "next/og";

export const runtime = "edge";
export const dynamic = "force-static";

export async function GET(req: Request) {
  const url = new URL(req.url);

  return new Response(url.searchParams.get("groom") ?? "NULL");
}
