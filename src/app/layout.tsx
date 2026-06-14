import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Playfair_Display, Lora, Amiri, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "./sacred.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Undangan by Nauka — Ali & Lyla",
  description:
    "Undangan pernikahan dengan penuh kehangatan. Tenang, suci, dan bermakna.",
  keywords: [
    "undangan digital",
    "undangan pernikahan",
    "wedding invitation",
    "nauka",
  ],
  authors: [{ name: "Nauka" }],
  openGraph: {
    title: "Undangan by Nauka — Ali & Lyla",
    description:
      "Undangan pernikahan dengan penuh kehangatan. Tenang, suci, dan bermakna.",
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
        className={`${inter.variable} ${jakarta.variable} ${cormorant.variable} ${playfair.variable} ${lora.variable} ${amiri.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
