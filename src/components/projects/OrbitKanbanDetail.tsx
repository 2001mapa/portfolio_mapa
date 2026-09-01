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
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-8 text-white uppercase">[Aquí pondremos tu descripción...]</h2>
              <p className="text-lg md:text-2xl text-[#C5C6C7] leading-relaxed mb-6">
                Esperando el texto estratégico para la descripción del proyecto Orbit Kanban.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
