import { ImageResponse } from "next/og";

export const runtime = "edge";
export const dynamic = "force-static";

export async function GET() {
  // Nanti data ini diambil dari database
  const groomName = "Angga";
  const brideName = "Rini";
  const weddingDate = "12 Desember 2026";

  const groomInitial = groomName.charAt(0).toUpperCase();
  const brideInitial = brideName.charAt(0).toUpperCase();

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
            fontSize: 24,
            letterSpacing: 8,
            marginBottom: 28,
          }}
        >
          THE WEDDING OF
        </div>

        <div
          style={{
            color: "#F8E7A1",
            fontSize: 140,
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          {groomInitial} &amp; {brideInitial}
        </div>

        <div
          style={{
            color: "#FFFFFF",
            fontSize: 42,
            marginTop: 24,
          }}
        >
          {groomName} &amp; {brideName}
        </div>

        <div
          style={{
            color: "#D4AF37",
            fontSize: 24,
            marginTop: 18,
          }}
        >
          {weddingDate}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
