import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Workato CIO Dinner Series — North America FY27",
  description:
    "An intimate gathering of enterprise leaders across North America's most dynamic markets. By invitation only. May 2026 – January 2027.",
  openGraph: {
    title: "Workato CIO Dinner Series — North America FY27",
    description:
      "An intimate gathering of enterprise leaders across North America's most dynamic markets.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${cormorant.variable}`}
    >
      <body className="min-h-screen bg-[var(--bg)] text-[var(--text)] antialiased overflow-x-hidden">
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
