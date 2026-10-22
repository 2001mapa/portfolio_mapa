import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { FloatingCTA } from "@/components/FloatingCTA";
import { GlobalNav } from "@/components/GlobalNav";
import { GlobalFooter } from "@/components/GlobalFooter";

const interGravity = Inter({
  variable: "--font-abc-gravity-variable",
  subsets: ["latin"],
  display: "swap",
});

const interGrotesk = Inter({
  variable: "--font-die-grotesk-b",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

export const viewport = {
  themeColor: '#161616',
  width: 'device-width',
  initialScale: 1,
};

const siteUrl = "https://miguelalbornozdev.vercel.app";
const shareTitle = "Miguel Albornoz · Soluciones digitales y automatización";
const shareDescription =
  "Sistemas web, automatizaciones e interfaces para vender, organizar y operar mejor.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: shareTitle,
  description: shareDescription,
  alternates: { canonical: `${siteUrl}/` },
  robots: { index: true, follow: true },
  authors: [{ name: 'Miguel Albornoz' }],
  appleWebApp: {
    capable: true,
    title: "Miguel Albornoz",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: shareTitle,
    description: shareDescription,
    url: `${siteUrl}/`,
    siteName: "Miguel Albornoz",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description: shareDescription,
    creator: "@miguelalbornoz",
  },
};

import Script from "next/script";

import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${interGravity.variable} ${interGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-die-grotesk-b)] selection:bg-ember selection:text-bone bg-obsidian">
        <Script id="register-sw" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js');
              });
            }
          `}
        </Script>
        <GlobalNav />

        <main className="flex-1 flex flex-col w-full relative z-10">
          {children}
          <FloatingCTA />
        </main>

        <GlobalFooter />
        <Analytics />
      </body>
    </html>
  );
}

