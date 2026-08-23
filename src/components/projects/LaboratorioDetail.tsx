"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

export function LaboratorioDetail() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-obsidian min-h-screen text-bone pt-24 pb-12">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#1A1A26] opacity-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(26,26,38,0.8)_0,rgba(10,10,12,1)_100%)]"></div>
        
        <div className="max-w-[1400px] mx-auto w-full px-6 relative z-10 flex flex-col items-center justify-center h-full text-center">
          <Link href="/#work" className="absolute top-0 left-6 md:-top-16 font-[family-name:var(--font-ibm-plex-mono)] text-caption font-semibold tracking-caption uppercase text-[#7a7a99] md:hover:text-[#c4c4e0] active:text-[#c4c4e0] transition-colors z-50 p-2 md:p-0">
            ← REGRESAR AL HUB
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-[family-name:var(--font-ibm-plex-mono)] text-sm tracking-widest text-[#9999b3] uppercase mb-6 block">
              Side Projects & IA
            </span>
            <h1 className="text-[40px] md:text-[80px] lg:text-[120px] leading-[0.9] font-medium tracking-tight text-white font-[family-name:var(--font-abc-gravity-variable)] uppercase mb-8">
              LABORATORIO
            </h1>
            <p className="font-[family-name:var(--font-die-grotesk-b)] text-body-lg md:text-2xl text-[#9999b3] max-w-2xl mx-auto">
              Proyectos personales, bots y automatizaciones.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section Placeholder */}
      <section className="w-full py-16 md:py-32">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">AI Finance Bot (Telegram)</h3>
              <p className="text-slate">Contenido en construcción...</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">YT to MP3 Converter</h3>
              <p className="text-slate">Contenido en construcción...</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
