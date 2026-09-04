"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

export function LaboratorioDetail() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="w-full bg-[#0B0C10] min-h-screen text-bone">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#00E5FF] z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Hero */}
      <section className="relative w-full min-h-[45vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,229,255,0.06)_0,transparent_70%)]" />

        <div className="max-w-[1400px] mx-auto w-full px-6 relative z-10 flex flex-col items-center justify-center py-32 text-center">
          <Link
            href="/#work"
            className="absolute top-6 left-6 font-[family-name:var(--font-ibm-plex-mono)] text-xs font-semibold tracking-widest uppercase text-white/40 hover:text-white transition-colors"
          >
            ← REGRESAR AL HUB
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6"
          >
            <span className="font-[family-name:var(--font-ibm-plex-mono)] text-xs tracking-widest text-[#00E5FF]/70 uppercase">
              Laboratorio & Experimentos
            </span>
            <h1 className="text-[56px] md:text-[96px] lg:text-[120px] leading-[0.85] font-medium tracking-tight text-white font-[family-name:var(--font-abc-gravity-variable)] uppercase">
              LUKA
            </h1>
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-sm md:text-base text-white/50 max-w-lg mx-auto tracking-wide">
              AI Financial Assistant · Telegram Bot · Realtime PWA
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="w-full py-16 md:py-24 px-6">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-20 md:gap-32">

          {/* Luka Card */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-20">

            {/* Sidebar */}
            <div className="hidden md:flex md:w-1/4 shrink-0 flex-col gap-8 md:sticky top-32 self-start font-[family-name:var(--font-ibm-plex-mono)]">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-2"
              >
                <h4 className="text-[#00E5FF] uppercase tracking-widest text-xs font-semibold">STACK TÉCNICO</h4>
                <p className="text-white/70 text-sm">Next.js 14, Supabase Realtime (WebSockets), Google Gemini API, Telegram Bot API, PostgreSQL (RLS), Vercel Serverless.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col gap-2"
              >
                <h4 className="text-[#00E5FF] uppercase tracking-widest text-xs font-semibold">EL RETO</h4>
                <p className="text-white/70 text-sm">Orquestar un pipeline multimodal (texto + audio) entre la API de Telegram y Gemini, con Structured JSON Output para escritura sin errores en la base de datos y sincronización en tiempo real al panel web.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col gap-2"
              >
                <h4 className="text-[#00E5FF] uppercase tracking-widest text-xs font-semibold">TIPO</h4>
                <p className="text-white/70 text-sm">Proyecto personal en producción. Uso diario activo.</p>
              </motion.div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col gap-12">

              {/* Mobile pills */}
              <div className="flex flex-wrap gap-2 md:hidden font-[family-name:var(--font-ibm-plex-mono)]">
                {["Next.js 14", "Gemini API", "Supabase Realtime", "Telegram Bot", "PWA"].map((t) => (
                  <span key={t} className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-white/50">{t}</span>
                ))}
              </div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center gap-4 text-[#00E5FF] font-[family-name:var(--font-ibm-plex-mono)] text-xs tracking-widest uppercase">
                  <span>Experimento Personal</span>
                  <span className="w-10 h-[1px] bg-[#00E5FF]" />
                  <span>AI + Finanzas</span>
                </div>
                <h2 className="text-[28px] md:text-[48px] leading-[1.05] uppercase text-white font-medium tracking-tight font-[family-name:var(--font-abc-gravity-variable)]">
                  Rastrear mis gastos era aburrido.<br className="hidden md:block" /> Así que construí mi propio asistente.
                </h2>
                <p className="text-white/50 font-[family-name:var(--font-die-grotesk-b)] text-body-lg max-w-2xl">
                  <strong className="text-white">Luka</strong> es un asistente financiero que vive en Telegram, entiende voz y texto en lenguaje natural, y sincroniza cada transacción en tiempo real con un panel web progresivo (PWA) mediante WebSockets.
                </p>
              </motion.div>

              {/* Video */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
                className="w-full rounded-2xl overflow-hidden border border-[#00E5FF]/15 shadow-[0_0_60px_rgba(0,229,255,0.07)] bg-[#0d0f14]"
              >
                <video
                  src="/videos/luka-chatbot.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Architecture Breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="flex flex-col gap-6"
              >
                <h3 className="text-white font-[family-name:var(--font-abc-gravity-variable)] text-xl md:text-2xl uppercase tracking-tight">
                  El Pipeline de Inteligencia Artificial
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      step: "01",
                      title: "Context Injection",
                      body: "Antes de llamar a Gemini, el webhook consulta la DB e inyecta el patrimonio, presupuestos y deudas activas del usuario directamente en el System Prompt. La IA tiene consciencia del estado financiero completo en cada mensaje.",
                    },
                    {
                      step: "02",
                      title: "Structured JSON Output",
                      body: "Configuré un responseSchema estricto en el SDK de Gemini para que el modelo responda exclusivamente con objetos JSON tipados (action_type, amount, category). Cero alucinaciones, inserción directa a PostgreSQL.",
                    },
                    {
                      step: "03",
                      title: "Multimodal Nativo",
                      body: "Si el mensaje es una nota de voz, el webhook descarga el .ogg de Telegram, lo convierte a Base64 y lo envía al modelo multimodal. Audio transcrito, clasificado y registrado en un solo viaje de red.",
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="flex flex-col gap-3 p-5 rounded-xl bg-white/3 border border-white/8"
                    >
                      <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[#00E5FF] text-xs tracking-widest">
                        {item.step} //
                      </span>
                      <h4 className="text-white font-semibold text-sm uppercase font-[family-name:var(--font-ibm-plex-mono)] tracking-wider">
                        {item.title}
                      </h4>
                      <p className="text-white/50 text-sm leading-relaxed font-[family-name:var(--font-die-grotesk-b)]">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Realtime + PWA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="flex flex-col gap-4 p-6 rounded-xl bg-white/3 border border-white/8">
                  <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[#00E5FF] text-xs tracking-widest uppercase">Realtime Sync</span>
                  <h4 className="text-white font-[family-name:var(--font-abc-gravity-variable)] text-xl uppercase">WebSockets via Supabase</h4>
                  <p className="text-white/50 text-sm leading-relaxed font-[family-name:var(--font-die-grotesk-b)]">
                    Si la app está abierta y registro un gasto en Telegram, el panel se actualiza instantáneamente sin recargar la página. Supabase Realtime transmite los eventos de la base de datos vía WebSockets directamente a los Client Components de React, esquivando las cachés estáticas del servidor.
                  </p>
                </div>
                <div className="flex flex-col gap-4 p-6 rounded-xl bg-white/3 border border-white/8">
                  <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[#00E5FF] text-xs tracking-widest uppercase">Progressive Web App</span>
                  <h4 className="text-white font-[family-name:var(--font-abc-gravity-variable)] text-xl uppercase">Nativa en iOS & Android</h4>
                  <p className="text-white/50 text-sm leading-relaxed font-[family-name:var(--font-die-grotesk-b)]">
                    Instalable desde el navegador como una app nativa: icono propio, sin barra de navegación de Safari/Chrome y tema de color dinámico que tiñe el status bar del celular. Mobile-First y diseñada para uso diario real.
                  </p>
                </div>
              </motion.div>

              {/* Financial Intelligence */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="flex flex-col gap-4 p-6 rounded-xl bg-[#00E5FF]/4 border border-[#00E5FF]/15"
              >
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[#00E5FF] text-xs tracking-widest uppercase">Inteligencia Financiera</span>
                <h4 className="text-white font-[family-name:var(--font-abc-gravity-variable)] text-xl uppercase">Regla 50/30/20 Automatizada</h4>
                <p className="text-white/60 text-sm leading-relaxed font-[family-name:var(--font-die-grotesk-b)] max-w-2xl">
                  El sistema evalúa cada gasto contra la regla 50/30/20 (Necesidades/Deseos/Ahorros) y lo clasifica automáticamente. Entiende comandos complejos como <span className="text-white italic">"Préstale 100 mil a Juan de mis ahorros"</span>, descontando de la liquidez y creando una deuda activa en el panel de cuentas por cobrar.
                </p>
              </motion.div>

              {/* Nav */}
              <div className="pt-4 border-t border-white/8 flex justify-start">
                <Link
                  href="/#work"
                  className="font-[family-name:var(--font-ibm-plex-mono)] text-sm tracking-widest text-white/30 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1"
                >
                  ← Volver al portafolio
                </Link>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
