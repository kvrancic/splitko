import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Splitko — the orchestrator layer for the city of Split",
  description:
    "One agentic brain wired to every public data port in Split, exposed through a web dashboard, WhatsApp, and a phone number anyone can dial.",
  metadataBase: new URL("http://localhost:3000"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0c1733",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&family=Hanken+Grotesk:ital,wght@0,300..700;1,300..700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
