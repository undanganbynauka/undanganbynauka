import { db } from "@/lib/db";
import { notFound } from "next/navigation";

// Premium package route: /ali-lyla/sarah-suami
// Guest slug is unique per wedding, looked up in DB.
export default async function PremiumInvitePage({
  params,
}: {
  params: Promise<{ weddingSlug: string; guestSlug: string }>;
}) {
  const { weddingSlug, guestSlug } = await params;

  const wedding = await db.wedding.findUnique({
    where: { slug: weddingSlug },
    include: {
      guests: {
        where: { slug: guestSlug },
        take: 1,
      },
    },
  });

  if (!wedding) notFound();

  const guest = wedding.guests[0];
  if (!guest) notFound();

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0B1120",
        color: "rgba(255,255,255,0.85)",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        padding: "32px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontSize: "13px",
          letterSpacing: "0.1em",
          color: "rgba(255,255,255,0.45)",
          marginBottom: "32px",
        }}
      >
        Kepada Yth.
        <br />
        <span style={{ color: "rgba(201,169,110,0.85)", fontSize: "16px" }}>
          {guest.name}
        </span>
      </p>

      <p
        style={{
          fontSize: "11px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)",
          marginBottom: "24px",
        }}
      >
        Undangan Pernikahan
      </p>

      <h1
        style={{
          fontFamily: "var(--font-bodoni), Georgia, serif",
          fontSize: "48px",
          fontWeight: 400,
          lineHeight: 1.2,
          margin: 0,
        }}
      >
        {wedding.groomName}
        <br />
        <span
          style={{
            fontSize: "14px",
            letterSpacing: "0.3em",
            color: "rgba(201,169,110,0.6)",
            display: "inline-block",
            margin: "16px 0",
          }}
        >
          &amp;
        </span>
        <br />
        {wedding.brideName}
      </h1>

      <p
        style={{
          fontSize: "11px",
          color: "rgba(255,255,255,0.25)",
          marginTop: "40px",
        }}
      >
        Paket {wedding.package}
      </p>
    </main>
  );
}
