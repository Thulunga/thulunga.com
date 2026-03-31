import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thulunga — Inspiration & Motivation from Bodoland",
  description:
    "Thulunga means inspiration. A platform built to help people from Bodoland and beyond find direction, opportunities, and community.",
  keywords: ["Bodoland", "Bodo community", "careers", "opportunities", "Assam", "Northeast India"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans text-earth-800 antialiased">{children}</body>
    </html>
  );
}
