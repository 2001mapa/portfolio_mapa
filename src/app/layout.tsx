import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { FloatingCTA } from "@/components/FloatingCTA";

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
  openGraph: {
    title: "Miguel Albornoz | Ecosistemas Digitales",
    description: "Ingeniería de Software de Alto Nivel enfocada en E-commerce, CRO y Motores de Venta.",
    url: "https://miguel-albornoz.vercel.app",
    siteName: "Miguel Albornoz",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miguel Albornoz | Ecosistemas Digitales",
    description: "Ingeniería de Software de Alto Nivel enfocada en E-commerce, CRO y Motores de Venta.",
  },
};

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
        
        <nav className="absolute top-0 w-full flex justify-between items-center px-6 py-4 z-50 text-caption leading-caption tracking-caption text-bone">
          <div className="font-medium uppercase truncate max-w-[150px] md:max-w-none">Miguel Albornoz</div>
          <div className="flex gap-4 md:gap-6 items-center">
            <a href="#work" className="hidden md:block font-medium uppercase hover:text-fog transition-colors">Proyectos</a>
            <a href="#services" className="hidden md:block font-medium uppercase hover:text-fog transition-colors">Servicios</a>
            {/* Ghost Contact Button */}
            <a 
              href="#contact" 
              className="font-medium uppercase border border-bone/30 px-4 md:px-6 py-3 md:py-2 rounded-full hover:bg-bone hover:text-obsidian transition-all duration-300 text-[10px] md:text-caption"
            >
              Contacto
            </a>
          </div>
        </nav>

        <main className="flex-1 flex flex-col w-full relative z-10">
          <CustomCursor />
          {children}
          <FloatingCTA />
        </main>

        {/* Footer Status Bar */}
        <footer className="w-full flex justify-between items-center px-6 pt-[48px] pb-6 border-t border-graphite bg-fog font-[family-name:var(--font-ibm-plex-mono)] text-caption leading-caption tracking-caption uppercase text-slate">
          <div>DESIGN BY MIGUEL // V1.1.0</div>
          <div className="flex gap-4">
            <span>SYS.STATUS: OK</span>
            <span>ENG: NEXT</span>
          </div>
        </footer>

      </body>
    </html>
  );
}
