import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// POST /api/weddings
// Body:
//   {
//     "bride_name": "Lyla",
//     "groom_name": "Ali",
//     "wedding_slug": "ali-lyla",
//     "package": "basic" | "premium",           // optional, default "basic"
//     "guests": [                                 // optional, premium only
//       { "guest_name": "Sarah & Suami", "guest_slug": "sarah-suami" }
//     ]
//   }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const brideName = body.bride_name;
    const groomName = body.groom_name;
    const slug = body.wedding_slug;
    const pkg = body.package === "premium" ? "premium" : "basic";
    const guests: Array<{ guest_name: string; guest_slug: string }> = Array.isArray(body.guests)
      ? body.guests
      : [];

    if (!brideName || !groomName || !slug) {
      return NextResponse.json(
        { error: "bride_name, groom_name, wedding_slug wajib diisi" },
        { status: 400 }
      );
    }

    const wedding = await db.wedding.create({
      data: {
        brideName,
        groomName,
        slug,
        package: pkg,
        guests:
          guests.length > 0
            ? {
                create: guests.map((g) => ({
                  name: g.guest_name,
                  slug: g.guest_slug,
                })),
              }
            : undefined,
      },
      include: { guests: true },
    });

    return NextResponse.json({ ok: true, wedding }, { status: 201 });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// GET /api/weddings?slug=ali-lyla
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "slug wajib diisi" }, { status: 400 });
  }
  const wedding = await db.wedding.findUnique({
    where: { slug },
    include: { guests: true },
  });
  if (!wedding) {
    return NextResponse.json({ error: "undangan tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json({ wedding });
}
