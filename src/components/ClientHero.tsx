"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ClientHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  
  const monitorY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  // 3D Perspective transforms
  const rotateX = useTransform(scrollYProgress, [0, 0.6], [25, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 0.6], [-20, 0]);
  const monitorScale = useTransform(scrollYProgress, [0, 0.6], [0.75, 1.1]);

  return (
    <div ref={containerRef} className="relative min-h-[150vh] w-full bg-obsidian flex flex-col items-center overflow-hidden" style={{ perspective: "1500px" }}>
      


      {/* Profile Photo Showcase Container */}
      <motion.div 
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="relative z-10 mt-[15vh] md:mt-[15vh] mx-auto w-[70%] sm:w-[60%] md:w-[400px] aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(232,212,166,0.15)] border border-white/10"
        style={{ y: monitorY, scale: monitorScale }}
      >
        <img 
          src="/foto-perfil.jpeg" 
          alt="Miguel - Software Engineer"
          className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
        />
        {/* Subtle inner gradient to blend with the dark background */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-60 pointer-events-none"></div>
      </motion.div>

      {/* Metadata Bottom Left */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
        className="fixed top-24 md:top-auto md:bottom-12 left-6 md:left-[80px] z-20 flex flex-col gap-[6px] font-[family-name:var(--font-ibm-plex-mono)] text-caption font-medium text-slate uppercase"
      >
        <div className="flex items-center gap-2 text-white bg-obsidian border border-graphite px-3 py-1.5 rounded-full w-fit shadow-lg">
          <div className="w-2 h-2 rounded-full bg-[#FF4C24] animate-pulse shadow-[0_0_10px_#FF4C24]"></div>
          <span className="text-[10px] md:text-xs tracking-widest">DISPONIBLE PARA PROYECTOS</span>
        </div>
        <span className="hidden md:block">DESIGN BY MIGUEL</span>
        <span className="hidden md:block">V0.9</span>
        <span className="hidden md:block">03/10 CET</span>
      </motion.div>

      {/* Right Side Descriptor (Adapted for Mobile) */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 1.4 }}
        className="fixed bottom-[250px] left-6 right-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-auto md:right-[80px] z-20 md:max-w-[280px] mix-blend-difference"
      >
        <p className="font-[family-name:var(--font-die-grotesk-b)] text-[10px] md:text-[18px] leading-[1.4] font-medium text-bone text-left md:text-right opacity-80 md:opacity-100 uppercase">
          ESCALANDO NEGOCIOS A TRAVÉS DE INGENIERÍA DE SOFTWARE PREMIUM. 
          CONSTRUYO E-COMMERCE QUE CONVIERTEN Y SISTEMAS ERP QUE AUTOMATIZAN TU OPERACIÓN.
        </p>
      </motion.div>

      {/* Scroll Indicator (CRO Requirement) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 1.8 }}
        style={{ opacity: textOpacity }}
        className="fixed bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 pointer-events-none"
      >
        <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] tracking-widest text-[#E8D4A6] uppercase drop-shadow-[0_0_8px_rgba(232,212,166,0.5)]">
          Desliza para explorar
        </span>
        <div className="w-[1px] h-[60px] bg-gradient-to-b from-[#E8D4A6] to-transparent overflow-hidden">
          <motion.div 
            animate={{ y: [0, 60] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-full h-1/2 bg-white"
          />
        </div>
      </motion.div>
    </div>
  );
}
