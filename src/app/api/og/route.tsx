import { ImageResponse } from "next/og";

export const runtime = "edge";
export const dynamic = "force-static";

export async function GET() {
  const groomName = "Angga";

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
            color: "#D4AF37",
            fontSize: 26,
            letterSpacing: 6,
            marginBottom: 24,
          }}
        >
          THE WEDDING OF
        </div>

        <div
          style={{
            color: "#F8E7A1",
            fontSize: 110,
            fontWeight: 700,
          }}
        >
          A &amp; R
        </div>

        <div
          style={{
            color: "#F8F8F8",
            fontSize: 38,
            marginTop: 22,
          }}
        >
          {groomName} &amp; Rini
        </div>

        <div
          style={{
            color: "#C9A227",
            fontSize: 24,
            marginTop: 18,
          }}
        >
          12 Desember 2026
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
