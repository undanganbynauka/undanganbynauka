import Link from "next/link";

export default function Home() {
  return (
    <main style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", gap: "20px" }}>
      <h1>Nauka</h1>

      <Link href="/sacred">Sacred</Link>
      <Link href="/celestial">Celestial</Link>
    </main>
  );
}
