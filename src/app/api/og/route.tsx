import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
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
          background: "#0B1120",
        }}
      >
        <div style={{ fontSize: 28, color: "#C9A96E", marginBottom: 30 }}>
          The Wedding Of
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
          <span style={{ fontSize: 140, color: "#C9A96E" }}>{groomInitial}</span>
          <span style={{ fontSize: 80, color: "#C9A96E" }}>&</span>
          <span style={{ fontSize: 140, color: "#C9A96E" }}>{brideInitial}</span>
        </div>

        <div style={{ fontSize: 36, color: "#fff", marginTop: 30 }}>
          {groomName} & {brideName}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
