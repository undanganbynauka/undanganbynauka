import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const groom = searchParams.get("groom") || "A";
  const bride = searchParams.get("bride") || "L";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#0b1020", // solid dulu (NO gradient)
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 28,
            color: "#d6b25e",
            letterSpacing: 2,
            marginBottom: 20,
          }}
        >
          THE WEDDING OF
        </div>

        {/* Initials */}
        <div
          style={{
            fontSize: 120,
            color: "#f5d27a",
            fontWeight: 700,
          }}
        >
          {groom} & {bride}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 22,
            color: "#ffffff",
            marginTop: 20,
            opacity: 0.8,
          }}
        >
          With Love & Blessing
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
