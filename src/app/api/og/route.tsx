import { ImageResponse } from "next/og";

export const runtime = "edge";
export const dynamic = "force-static";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const params = url.searchParams;

  const groom = params.get("groom") || "A";

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
        {groom}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
