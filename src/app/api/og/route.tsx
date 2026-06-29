import { ImageResponse } from "next/og";

export const runtime = "edge";
export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1b2333",
        }}
      >
        <div
          style={{
            color: "#e7c97f",
            fontSize: 32,
          }}
        >
          The Wedding Of
        </div>

        <div
          style={{
            color: "#f6e2a4",
            fontSize: 120,
            fontWeight: 700,
            marginTop: 20,
          }}
        >
          A &amp; L
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
