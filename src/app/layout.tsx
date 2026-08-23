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

export const metadata: Metadata = {
  metadataBase: new URL("https://miguel-albornoz.vercel.app"),
  title: "Miguel Albornoz | Ecosistemas Digitales",
  description: "Ingeniería de Software de Alto Nivel enfocada en E-commerce, CRO y Motores de Venta.",
  authors: [{ name: 'Miguel Albornoz' }],
  openGraph: {
    title: "Miguel Albornoz | Ecosistemas Digitales",
    description: "Ingeniería de Software de Alto Nivel enfocada en E-commerce, CRO y Motores de Venta.",
    url: "https://miguel-albornoz.vercel.app",
    siteName: "Miguel Albornoz",
    locale: "es_ES",
    type: "website",
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Miguel Albornoz' }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Miguel Albornoz | Ecosistemas Digitales",
    description: "Ingeniería de Software de Alto Nivel enfocada en E-commerce, CRO y Motores de Venta.",
    creator: "@miguelalbornoz",
    images: ["/og-image.jpg"],
  },
};

import { Toaster } from 'sonner';

import { SmoothScroll } from "@/components/SmoothScroll";

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
        <SmoothScroll />
        <GlobalNav />

        <main className="flex-1 flex flex-col w-full relative z-10">
          {children}
          <FloatingCTA />
        </main>

        <GlobalFooter />
        <Toaster theme="dark" position="bottom-right" toastOptions={{ style: { background: '#1c1a17', border: '1px solid rgba(255,255,255,0.1)', color: '#eae5d9' } }} />
      </body>
    </html>
  );
}
