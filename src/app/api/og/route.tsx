import { ImageResponse } from "next/og";

export const runtime = "edge";
export const dynamic = "force-static";

export async function GET() {
  const text = "Angga";

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
          backgroundColor: "#0F172A",
          color: "#FFFFFF",
        }}
      >
        <div
          style={{
            fontSize: 28,
            marginBottom: 20,
          }}
        >
          THE WEDDING OF
        </div>

        <div
          style={{
            fontSize: 80,
          }}
        >
          {text}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
