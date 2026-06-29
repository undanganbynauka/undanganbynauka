import { ImageResponse } from "next/og";

export const runtime = "edge";
export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ff0000",
          color: "#ffffff",
          fontSize: 80,
          fontWeight: 700,
        }}
      >
        TEST
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
