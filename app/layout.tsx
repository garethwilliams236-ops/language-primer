import "./globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Language Primer",
  description: "Russian, German and Arabic lessons with audio, a reader for real texts, and review flashcards.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Primer", statusBarStyle: "default" },
  icons: { icon: "/icon-512.png", apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EDF0F4" },
    { media: "(prefers-color-scheme: dark)", color: "#0E1320" },
  ],
};

const FONTS =
  "https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600&family=PT+Serif:ital,wght@0,400;0,700;1,400&family=Literata:ital,wght@0,400;0,700;1,400&family=Amiri:ital,wght@0,400;0,700;1,400&family=Unbounded:wght@500;700&display=swap";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href={FONTS} />
      </head>
      <body>{children}</body>
    </html>
  );
}
