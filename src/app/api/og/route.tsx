import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";
export const dynamic = "force-static";

export async function GET(request: NextRequest) {
  const groom = request.nextUrl.searchParams.get("groom") ?? "A";
  const bride = request.nextUrl.searchParams.get("bride") ?? "L";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1b2333",
          color: "#e7c97f",
          fontSize: 52,
        }}
      >
        {groom} &amp; {bride}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
