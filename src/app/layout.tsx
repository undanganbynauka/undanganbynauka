import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NAUKA — Sebuah ruang kecil untuk mengantar momen",
  description:
    "Ruang digital yang menjaga momen tetap sederhana, tenang, dan bermakna. Undangan pernikahan dengan penuh kehangatan.",
  keywords: [
    "Nauka",
    "undangan digital",
    "undangan pernikahan",
    "undangan online",
    "wedding invitation",
  ],
  authors: [{ name: "Nauka" }],
  icons: {
    icon: "/nauka-logo.png",
  },
  openGraph: {
    title: "NAUKA — Sebuah ruang kecil untuk mengantar momen",
    description:
      "Ruang digital yang menjaga momen tetap sederhana, tenang, dan bermakna.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${cormorant.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
