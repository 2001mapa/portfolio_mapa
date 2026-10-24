/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { videoUrl } from "@/data/media";
import { CaseStudyBrief } from "./CaseStudyBrief";
import { ProjectHeroGlow } from "./ProjectHeroGlow";

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
        <ProjectHeroGlow color="0, 229, 255" />
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
              Asistente de IA para organizar información financiera
            </p>
          </motion.div>
        </div>
      </section>

      <CaseStudyBrief
        accent="#00E5FF"
        problem="Registrar y consultar información financiera desde distintos canales genera pasos repetitivos y poca visibilidad."
        solution="Un asistente que conecta conversación, datos estructurados y un panel en tiempo real."
        outcome="Una exploración de cómo la IA puede reducir tareas manuales sin quitar control a las personas."
      />

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
                <h4 className="text-[#00E5FF] uppercase tracking-widest text-xs font-semibold">QUÉ HACE</h4>
                <p className="text-white/70 text-sm">Permite registrar gastos por Telegram con texto o voz y consultarlos desde un panel en el celular.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col gap-2"
              >
                <h4 className="text-[#00E5FF] uppercase tracking-widest text-xs font-semibold">EL RETO</h4>
                <p className="text-white/70 text-sm">Convertir un mensaje cotidiano en un registro financiero claro, sin pedir que la persona llene un formulario cada vez.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col gap-2"
              >
                <h4 className="text-[#00E5FF] uppercase tracking-widest text-xs font-semibold">TIPO</h4>
                <p className="text-white/70 text-sm">Proyecto personal creado para explorar formas más sencillas de llevar un presupuesto.</p>
              </motion.div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col gap-12">

              {/* Mobile pills */}
              <div className="flex flex-wrap gap-2 md:hidden font-[family-name:var(--font-ibm-plex-mono)]">
                {["Gastos por chat", "Mensajes de voz", "Presupuestos", "Panel móvil"].map((t) => (
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
                  <span>IA y finanzas personales</span>
                </div>
                <h2 className="text-[28px] md:text-[48px] leading-[1.05] uppercase text-white font-medium tracking-tight font-[family-name:var(--font-abc-gravity-variable)]">
                  Rastrear mis gastos era aburrido.<br className="hidden md:block" /> Así que construí mi propio asistente.
                </h2>
                <p className="text-white/50 font-[family-name:var(--font-die-grotesk-b)] text-body-lg max-w-2xl">
                  <strong className="text-white">Luka</strong> funciona desde Telegram: le escribes o le envías una nota de voz sobre un gasto y lo registra. Después puedes revisar tus movimientos y presupuesto en un panel web que se actualiza sin recargar.
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
                  src={videoUrl("luka-chatbot.mp4")}
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
                  De un mensaje a un gasto registrado
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      step: "01",
                      title: "Consulta el contexto",
                      body: "Revisa las categorías y presupuestos configurados para interpretar mejor lo que escribiste.",
                    },
                    {
                      step: "02",
                      title: "Organiza la información",
                      body: "Separa el monto, el tipo de movimiento y la categoría antes de guardarlos. Si la interpretación no es correcta, debe revisarse.",
                    },
                    {
                      step: "03",
                      title: "También entiende voz",
                      body: "Puedes enviar una nota de voz en lugar de escribir; Luka extrae los datos necesarios para registrar el movimiento.",
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="flex flex-col gap-3 p-5 rounded-xl bg-white/3 border border-white/8"
                    >
                      <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[#00E5FF] text-xs tracking-widest">
                        {item.step} {'//'}
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
                  <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[#00E5FF] text-xs tracking-widest uppercase">Información actualizada</span>
                  <h4 className="text-white font-[family-name:var(--font-abc-gravity-variable)] text-xl uppercase">Del chat al panel</h4>
                  <p className="text-white/50 text-sm leading-relaxed font-[family-name:var(--font-die-grotesk-b)]">
                    Si el panel está abierto y registras un gasto en Telegram, verás el movimiento allí sin tener que actualizar la página.
                  </p>
                </div>
                <div className="flex flex-col gap-4 p-6 rounded-xl bg-white/3 border border-white/8">
                  <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[#00E5FF] text-xs tracking-widest uppercase">Acceso desde el celular</span>
                  <h4 className="text-white font-[family-name:var(--font-abc-gravity-variable)] text-xl uppercase">A mano cuando la necesites</h4>
                  <p className="text-white/50 text-sm leading-relaxed font-[family-name:var(--font-die-grotesk-b)]">
                    El panel se puede abrir desde el navegador del teléfono y añadir a la pantalla de inicio para acceder a él con mayor facilidad.
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
                <h4 className="text-white font-[family-name:var(--font-abc-gravity-variable)] text-xl uppercase">Regla de Presupuesto Personalizable</h4>
                <p className="text-white/60 text-sm leading-relaxed font-[family-name:var(--font-die-grotesk-b)] max-w-2xl">
                  Puedes repartir tu presupuesto entre necesidades, deseos y ahorros con porcentajes que tú decides. Luka compara los gastos con esos límites y también puede interpretar movimientos como <span className="text-white italic">"Presté 100 mil de mis ahorros"</span> para reflejarlos en el panel.
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


