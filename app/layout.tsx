import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { getPublicAppUrl } from "@/lib/site-origin";

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

const appBase = getPublicAppUrl();
const metadataBase = new URL(`${appBase.endsWith("/") ? appBase.slice(0, -1) : appBase}/`);
const defaultOg = `${appBase}/api/og?city=CIO+Dinner+Series`;

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "Workato CIO Dinner Series — North America FY27",
    template: "%s | Workato CIO Dinner Series",
  },
  description:
    "An intimate gathering of enterprise leaders across North America's most dynamic markets. 70 dinners across 10 cities. By invitation only.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    title: "Workato CIO Dinner Series — North America FY27",
    description:
      "An intimate gathering of enterprise leaders across North America's most dynamic markets. 70 dinners · 10 cities · May 2026 – January 2027.",
    type: "website",
    siteName: "Workato CIO Dinner Series",
    images: [{ url: defaultOg, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Workato CIO Dinner Series — North America FY27",
    description:
      "An intimate gathering of enterprise leaders across North America's most dynamic markets.",
    images: [defaultOg],
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
