"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { videoUrl } from "@/data/media";
import { CaseStudyBrief } from "./CaseStudyBrief";
import { ProjectHeroGlow } from "./ProjectHeroGlow";

export function OrbitKanbanDetail() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(heroProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0]);

  const { scrollYProgress: globalProgress } = useScroll();
  const scaleX = useSpring(globalProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="w-full flex flex-col relative bg-[#0B0C10] text-[#C5C6C7]">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#0F52BA] z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <div ref={heroRef} className="relative w-full min-h-[40vh] md:min-h-[50vh] overflow-hidden flex items-start pt-24 md:pt-40">
        <ProjectHeroGlow color="15, 82, 186" />
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative w-full px-6 md:px-12 z-10"
        >
          <div className="max-w-[1400px] mx-auto w-full relative h-full flex flex-col items-center justify-center pt-16 md:pt-0">
            <Link href="/#work" className="absolute top-0 left-0 md:-top-16 font-[family-name:var(--font-ibm-plex-mono)] text-caption font-semibold tracking-caption uppercase text-[#4169E1] md:hover:text-white active:text-white transition-colors z-50 p-2 md:p-0">
              ← REGRESAR
            </Link>
            
            <div className="flex flex-col items-center justify-center">
              <div className="overflow-hidden mb-2 md:mb-4">
                <motion.h1 
                  initial={{ rotate: 5, y: 100, opacity: 0 }}
                  animate={{ rotate: 0, y: 0, opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[48px] md:text-[80px] leading-[0.9] tracking-[-1px] md:tracking-[-2px] font-medium uppercase font-[family-name:var(--font-abc-gravity-variable)] text-center text-white"
                >
                  ORBIT KANBAN
                </motion.h1>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="flex items-center gap-4"
              >
                <div className="h-[1px] w-12 bg-[#0F52BA]"></div>
                <span className="font-[family-name:var(--font-ibm-plex-mono)] tracking-widest text-[#4169E1] text-sm md:text-base uppercase text-center">
                  Tablero colaborativo para organizar el trabajo
                </span>
                <div className="h-[1px] w-12 bg-[#0F52BA]"></div>
              </motion.div>
              
            </div>
          </div>
        </motion.div>
        
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0F52BA]/20 via-[#0B0C10]/80 to-[#0B0C10] mix-blend-multiply pointer-events-none"></div>
      </div>

      <CaseStudyBrief
        accent="#77A5E8"
        problem="Cuando las tareas cambian rápido, el equipo pierde prioridad, contexto y visibilidad sobre lo que está bloqueado."
        solution="Un tablero compartido que muestra las tareas, sus responsables y sus cambios sin tener que actualizar la página."
        outcome="Un flujo de trabajo que permite decidir qué sigue y detectar bloqueos antes de que frenen al equipo."
      />

      <div className="relative w-full px-6 md:px-12 pb-24 md:pb-40 z-20">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-12 md:gap-24">
          
          {/* Metadata Sidebar */}
          {/* Mobile: pills horizontales */}
          <div className="flex flex-wrap gap-2 mb-8 md:hidden font-[family-name:var(--font-ibm-plex-mono)]">
            <span className="text-xs px-3 py-1.5 rounded-full border border-graphite text-bone/70">Next.js</span>
            <span className="text-xs px-3 py-1.5 rounded-full border border-graphite text-bone/70">React</span>
            <span className="text-xs px-3 py-1.5 rounded-full border border-graphite text-bone/70">Tailwind</span>
          </div>

          {/* Desktop: sidebar sticky original */}
          <div className="hidden md:flex md:w-1/4 shrink-0 flex-col gap-8 md:sticky top-32 self-start font-[family-name:var(--font-ibm-plex-mono)]">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-2"
            >
              <h4 className="text-[#4169E1] uppercase tracking-widest text-xs font-semibold">QUÉ HACE</h4>
              <p className="text-white text-sm">Organiza las tareas por etapas, permite moverlas fácilmente y muestra los cambios al resto del equipo.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-2"
            >
              <h4 className="text-[#4169E1] uppercase tracking-widest text-xs font-semibold">EL RETO</h4>
              <p className="text-white text-sm">Ayudar a varias personas a trabajar sobre el mismo tablero sin perder cambios ni confundirse sobre qué tarea sigue.</p>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4 flex flex-col gap-12 md:gap-24 font-[family-name:var(--font-die-grotesk-b)]">
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="prose prose-invert max-w-none"
            >
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-8 text-white uppercase">El trabajo del equipo, a la vista</h2>
              <p className="text-lg md:text-2xl text-[#C5C6C7] leading-relaxed mb-6">
                Orbit reúne las tareas de un equipo en un tablero visual. Cada tarjeta muestra qué hay que hacer y en qué etapa se encuentra, para que todos sepan qué está pendiente, en curso o terminado.
              </p>
              <p className="text-lg md:text-2xl text-[#C5C6C7] leading-relaxed">
                Las tarjetas se pueden arrastrar para cambiar su prioridad. Cuando alguien mueve o edita una tarea, los demás ven el cambio sin recargar. La creación de tareas por voz es una función futura y todavía no forma parte de la experiencia terminada.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full aspect-[4/3] md:aspect-video bg-[#1F2833] rounded-[16px] overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#0F52BA]/20 flex items-center justify-center"
            >
              <video 
              src={videoUrl("orbit-kanban.mp4")}
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="prose prose-invert max-w-none"
            >
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-6 text-[#4169E1] uppercase">Cómo ayuda al equipo</h3>
              <ul className="text-[#C5C6C7] space-y-4">
                <li><strong className="text-white">Prioridades fáciles de cambiar:</strong> basta con arrastrar una tarjeta. El nuevo orden se guarda para que todos vean la misma lista.</li>
                <li><strong className="text-white">Menos cambios perdidos:</strong> cuando una persona edita una tarea, el tablero lo indica para evitar que otra sobrescriba su trabajo.</li>
                <li><strong className="text-white">Respuesta inmediata:</strong> el tablero muestra la acción en pantalla mientras termina de guardarla, para que la interacción se sienta fluida.</li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full aspect-[4/3] md:aspect-video bg-[#1F2833] rounded-[16px] overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#0F52BA]/20 p-8 flex items-center justify-center"
            >
              <div className="w-full h-full border border-[#0F52BA]/30 rounded-lg bg-obsidian flex flex-col overflow-hidden">
                <div className="h-10 bg-[#1F2833] border-b border-[#0F52BA]/30 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-4 font-[family-name:var(--font-ibm-plex-mono)] text-xs text-[#4169E1]">Un cambio de tarea, paso a paso</span>
                </div>
                <div className="p-6 font-[family-name:var(--font-ibm-plex-mono)] text-sm md:text-base text-[#C5C6C7] flex flex-col gap-4 overflow-y-auto">
                  <div className="flex gap-2"><span className="text-[#0F52BA]">01:</span> Una persona mueve la tarea a «En progreso».</div>
                  <div className="flex gap-2"><span className="text-yellow-400">02:</span> El tablero muestra el cambio al instante.</div>
                  <div className="flex gap-2"><span className="text-purple-400">03:</span> Se guarda su nueva posición.</div>
                  <div className="flex gap-2"><span className="text-green-400">04:</span> El resto del equipo ve la misma información.</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="prose prose-invert max-w-none"
            >
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-6 text-[#4169E1] uppercase">Próximo paso: crear tareas con la voz</h3>
              <p className="text-lg md:text-2xl text-[#C5C6C7] leading-relaxed mb-6">
                Esta función sigue en desarrollo. La idea es que una persona pueda dictar lo que necesita y que el sistema prepare una tarea con su descripción y prioridad para revisarla antes de guardarla.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}


