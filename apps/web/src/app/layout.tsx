import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thulunga — Find your direction. Build your future.",
  description:
    "Thulunga means inspiration in Bodo. A platform for students and young people from Bodoland and Northeast India — careers, guidance, community, and opportunity.",
  openGraph: {
    title: "Thulunga — Find your direction. Build your future.",
    description:
      "Curated career paths, scholarships, remote jobs, and community resources for people from Bodoland and Northeast India.",
    url: "https://thulunga.com",
    siteName: "Thulunga",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
