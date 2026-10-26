import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const sans = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Mary Magdy | Full-stack developer",
  description:
    "Full-stack developer with 9+ years building enterprise software in React, Angular, ASP.NET Core and Node. Based in Cairo, open to full-stack roles.",
};

export const viewport: Viewport = { themeColor: "#05070c", colorScheme: "dark" };

// Marks the page as scripted before first paint, so scroll reveals only hide
// content when they can also show it again.
const jsFlag = `document.documentElement.classList.add("js")`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      {/* Extensions such as Grammarly or password managers add attributes to
          <body> before React loads; this keeps that from being reported as a
          hydration error. It covers <body>'s own attributes only. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
