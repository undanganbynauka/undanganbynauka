import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const groom = searchParams.get("groom") || "A";
  const bride = searchParams.get("bride") || "R";

  const groomInitial = groom.charAt(0).toUpperCase();
  const brideInitial = bride.charAt(0).toUpperCase();

  const groomName = groom.length > 20 ? groom.substring(0, 20) + "..." : groom;
  const brideName = bride.length > 20 ? bride.substring(0, 20) + "..." : bride;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #0B1120 0%, #111827 100%)",
          fontFamily: "serif",
        }}
      >
        <div style={{ position: "absolute", top: "15%", left: "20%", width: 2, height: 2, borderRadius: "50%", background: "rgba(255,255,255,0.4)" }} />
        <div style={{ position: "absolute", top: "25%", left: "70%", width: 2, height: 2, borderRadius: "50%", background: "rgba(201,169,110,0.5)" }} />
        <div style={{ position: "absolute", top: "40%", left: "15%", width: 1, height: 1, borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />
        <div style={{ position: "absolute", top: "60%", left: "85%", width: 2, height: 2, borderRadius: "50%", background: "rgba(255,255,255,0.4)" }} />
        <div style={{ position: "absolute", top: "75%", left: "30%", width: 1, height: 1, borderRadius: "50%", background: "rgba(201,169,110,0.4)" }} />
        <div style={{ position: "absolute", top: "20%", left: "50%", width: 1, height: 1, borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />
        <div style={{ position: "absolute", top: "70%", left: "60%", width: 2, height: 2, borderRadius: "50%", background: "rgba(201,169,110,0.5)" }} />

        <div style={{ fontSize: 28, color: "rgba(201,169,110,0.7)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 30 }}>
          The Wedding Of
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 30 }}>
          <span style={{ fontSize: 140, color: "#C9A96E", fontWeight: 300 }}>
            {groomInitial}
          </span>
          <span style={{ fontSize: 80, color: "rgba(201,169,110,0.5)" }}>
            &
          </span>
          <span style={{ fontSize: 140, color: "#C9A96E", fontWeight: 300 }}>
            {brideInitial}
          </span>
        </div>

        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.85)", marginTop: 30, fontWeight: 300 }}>
          {groomName} &amp; {brideName}
        </div>

        <div style={{ width: 200, height: 1, background: "rgba(201,169,110,0.3)", marginTop: 30 }} />

        <div style={{ fontSize: 20, color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 20 }}>
          Undangan Pernikahan
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
