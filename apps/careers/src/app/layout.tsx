import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Careers — Thulunga",
  description:
    "Find opportunities, career guidance, and practical paths forward — curated for people from Bodoland and Northeast India.",
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans text-earth-800 antialiased">{children}</body>
    </html>
  );
}
