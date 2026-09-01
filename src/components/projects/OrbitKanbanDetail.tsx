"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

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
      <div ref={heroRef} className="relative w-full min-h-[50vh] overflow-hidden flex items-start pt-32 md:pt-40">
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
                  Realtime Workspace & Sockets
                </span>
                <div className="h-[1px] w-12 bg-[#0F52BA]"></div>
              </motion.div>
              
              <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 1, delay: 1 }}
                 className="mt-8"
              >
                 <a href="https://orbit-kanban.vercel.app/" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-[#0F52BA] text-white rounded-full font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-widest text-sm hover:bg-[#4169E1] transition-colors shadow-[0_0_20px_rgba(15,82,186,0.5)]">
                   VER PROYECTO EN VIVO
                 </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0F52BA]/20 via-[#0B0C10]/80 to-[#0B0C10] mix-blend-multiply pointer-events-none"></div>
      </div>

      <div className="relative w-full px-6 md:px-12 pb-24 md:pb-40 z-20">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-12 md:gap-24">
          
          {/* Metadata Sidebar */}
          <div className="w-full md:w-1/4 shrink-0 flex flex-col gap-8 md:sticky top-32 self-start font-[family-name:var(--font-ibm-plex-mono)]">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-2"
            >
              <h4 className="text-[#4169E1] uppercase tracking-widest text-xs font-semibold">ARQUITECTURA</h4>
              <p className="text-white text-sm">Next.js 15, WebSockets (Supabase Realtime), Drag & Drop (@hello-pangea/dnd), PostgreSQL.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-2"
            >
              <h4 className="text-[#4169E1] uppercase tracking-widest text-xs font-semibold">EL RETO</h4>
              <p className="text-white text-sm">Construir una plataforma de gestión de tareas que sincronice el estado entre múltiples usuarios e interfaces al instante, sin recargar la página, gestionando conflictos de concurrencia.</p>
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
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-8 text-white uppercase">Gestión de Proyectos en Tiempo Real</h2>
              <p className="text-lg md:text-2xl text-[#C5C6C7] leading-relaxed mb-6">
                Orbit es un tablero Kanban colaborativo de alto rendimiento inspirado en herramientas como Jira y Linear. Diseñado para equipos modernos, destaca por resolver problemas arquitectónicos complejos que los tableros básicos suelen ignorar.
              </p>
              <p className="text-lg md:text-2xl text-[#C5C6C7] leading-relaxed">
                Utiliza el algoritmo matemático LexoRank para un reordenamiento de tareas ultrarrápido, WebSockets para colaboración en vivo, y un motor de IA para convertir voz a requerimientos (este último en fase final de integración).
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
                src="/videos/orbit-kanban.mp4" 
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
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-6 text-[#4169E1] uppercase">Ingeniería y Resolución de Problemas</h3>
              <ul className="text-[#C5C6C7] space-y-4">
                <li><strong className="text-white">Ordenamiento Determinista (LexoRank):</strong> Implementación del mismo algoritmo matemático que utiliza Jira. Permite arrastrar y soltar (Drag & Drop) miles de tarjetas instantáneamente, calculando strings lexicográficos en lugar de reescribir índices, lo que evita masivos cuellos de botella en la base de datos PostgreSQL.</li>
                <li><strong className="text-white">Prevención de Conflictos (Pessimistic Locking):</strong> Uso de Supabase Realtime para sincronización en vivo. Incluye un sistema visual de bloqueo: si un miembro del equipo está editando una tarjeta, esta se bloquea para los demás, previniendo la colisión de datos en entornos de alta concurrencia.</li>
                <li><strong className="text-white">Manejo de Estado Optimista:</strong> Utilización de React Query para mutaciones optimistas. La UI reacciona instantáneamente a las acciones del usuario, actualizándose en segundo plano, lo que garantiza una sensación de velocidad absoluta incluso en redes de alta latencia.</li>
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
                  <span className="ml-4 font-[family-name:var(--font-ibm-plex-mono)] text-xs text-[#4169E1]">Orbit System Events</span>
                </div>
                <div className="p-6 font-[family-name:var(--font-ibm-plex-mono)] text-sm md:text-base text-[#C5C6C7] flex flex-col gap-4 overflow-y-auto">
                  <div className="flex gap-2"><span className="text-[#0F52BA]">WSS:</span> Connected to Supabase Realtime Channel 'workspace:123'.</div>
                  <div className="flex gap-2"><span className="text-yellow-400">Mutate:</span> Optimistic update triggered. UI updated instantly.</div>
                  <div className="flex gap-2"><span className="text-purple-400">Drag:</span> Task ID 45 moved to 'In Progress'.</div>
                  <div className="flex gap-2"><span className="text-green-400">LexoRank:</span> New Rank Calculated: 'aaa|aab'. Writing to Postgres...</div>
                  <div className="flex gap-2"><span className="text-pink-400">Event:</span> 'user_2' is editing Task ID 45. Locking card for others.</div>
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
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-6 text-[#4169E1] uppercase">Futuro Próximo: Voice-to-Task AI</h3>
              <p className="text-lg md:text-2xl text-[#C5C6C7] leading-relaxed mb-6">
                El motor de Inteligencia Artificial está construido y actualmente en fase de integración (WIP). Los usuarios podrán dictar requerimientos complejos mientras la IA (Whisper + GPT-4o) se encarga de transcribir, extraer contexto, auto-etiquetar y asignar la prioridad correcta de la tarea, todo sin tocar el teclado.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
