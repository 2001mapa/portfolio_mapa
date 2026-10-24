"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { videoUrl } from "@/data/media";
import { CaseStudyBrief } from "./CaseStudyBrief";
import { ProjectHeroGlow } from "./ProjectHeroGlow";

export function DocuMindDetail() {
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
        className="fixed top-0 left-0 right-0 h-1 bg-[#8A2BE2] z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <div ref={heroRef} className="relative w-full min-h-[40vh] md:min-h-[50vh] overflow-hidden flex items-start pt-24 md:pt-40">
        <ProjectHeroGlow color="138, 43, 226" />
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative w-full px-6 md:px-12 z-10"
        >
          <div className="max-w-[1400px] mx-auto w-full relative h-full flex flex-col items-center justify-center pt-16 md:pt-0">
            <Link href="/#work" className="absolute top-0 left-0 md:-top-16 font-[family-name:var(--font-ibm-plex-mono)] text-caption font-semibold tracking-caption uppercase text-[#DDA0DD] md:hover:text-white active:text-white transition-colors z-50 p-2 md:p-0">
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
                  DOCUMIND AI
                </motion.h1>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="flex items-center gap-4"
              >
                <div className="h-[1px] w-12 bg-[#8A2BE2]"></div>
                <span className="font-[family-name:var(--font-ibm-plex-mono)] tracking-widest text-[#DDA0DD] text-sm md:text-base uppercase text-center">
                  Asistente de IA para consultar documentos
                </span>
                <div className="h-[1px] w-12 bg-[#8A2BE2]"></div>
              </motion.div>
              
            </div>
          </div>
        </motion.div>
        
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#4B0082]/20 via-[#0B0C10]/80 to-[#0B0C10] mix-blend-multiply pointer-events-none"></div>
      </div>

      <CaseStudyBrief
        accent="#DDA0DD"
        problem="Información repartida en documentos y respuestas repetitivas que hacen lenta la consulta."
        solution="Un asistente que busca dentro de los archivos y responde indicando de dónde obtuvo la información."
        outcome="Consultas más rápidas, trazables y sin obligar al equipo a revisar archivos uno por uno."
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
              <h4 className="text-[#DDA0DD] uppercase tracking-widest text-xs font-semibold">QUÉ HACE</h4>
              <p className="text-white text-sm">Permite hacer preguntas sobre varios documentos, encontrar respuestas con su fuente y crear borradores a partir de la información disponible.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-2"
            >
              <h4 className="text-[#DDA0DD] uppercase tracking-widest text-xs font-semibold">EL RETO</h4>
              <p className="text-white text-sm">Hacer que consultar muchos archivos sea sencillo sin perder de vista la privacidad ni la procedencia de cada respuesta.</p>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4 flex flex-col gap-12 md:gap-24 font-[family-name:var(--font-die-grotesk-b)]">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full aspect-[4/3] md:aspect-video bg-[#1F2833] rounded-[16px] overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#8A2BE2]/20 flex items-center justify-center mb-6"
            >
              <video 
                src={videoUrl("documind.mp4")}
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
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-8 text-white uppercase">Pregúntale a tus documentos</h2>
              <p className="text-lg md:text-2xl text-[#C5C6C7] leading-relaxed mb-6">
                DocuMind AI ayuda a encontrar información cuando está repartida entre muchos archivos. En lugar de abrir cada PDF y buscar página por página, la persona puede hacer una pregunta en lenguaje cotidiano.
              </p>
              <p className="text-lg md:text-2xl text-[#C5C6C7] leading-relaxed">
                El asistente consulta los documentos cargados, muestra de dónde sale la respuesta y puede preparar borradores, como una carta de presentación basada en un currículum y una oferta laboral.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="prose prose-invert max-w-none"
            >
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-6 text-[#DDA0DD] uppercase">¿Qué ofrece la plataforma?</h3>
              <ul className="text-[#C5C6C7] space-y-4">
                <li><strong className="text-white">Respuestas que se pueden comprobar:</strong> muestra el documento de origen para que la persona revise la información antes de usarla. Como cualquier IA, sus respuestas deben verificarse.</li>
                <li><strong className="text-white">Borradores a partir de tus archivos:</strong> puede relacionar un currículum con una oferta de trabajo y proponer una carta de presentación para revisar y ajustar.</li>
                <li><strong className="text-white">Protección frente a instrucciones engañosas:</strong> incorpora controles para que el contenido de un archivo no cambie las reglas con las que trabaja el asistente.</li>
                <li><strong className="text-white">Espacios separados:</strong> cada usuario consulta sus propios archivos y tiene límites de uso para cuidar la privacidad y los recursos.</li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full aspect-[4/3] md:aspect-video bg-[#1F2833] rounded-[16px] overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#8A2BE2]/20 p-8 flex items-center justify-center"
            >
              <div className="w-full h-full border border-[#8A2BE2]/30 rounded-lg bg-obsidian flex flex-col overflow-hidden">
                <div className="h-10 bg-[#1F2833] border-b border-[#8A2BE2]/30 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-4 font-[family-name:var(--font-ibm-plex-mono)] text-xs text-[#DDA0DD]">Así responde DocuMind</span>
                </div>
                <div className="p-6 font-[family-name:var(--font-ibm-plex-mono)] text-sm md:text-base text-[#C5C6C7] flex flex-col gap-4 overflow-y-auto">
                  <div className="flex gap-2"><span className="text-[#8A2BE2]">01:</span> Identifica al usuario y sus documentos.</div>
                  <div className="flex gap-2"><span className="text-yellow-400">02:</span> Busca los fragmentos relacionados con la pregunta.</div>
                  <div className="flex gap-2"><span className="text-green-400">03:</span> Redacta una respuesta basada en esos fragmentos.</div>
                  <div className="flex gap-2"><span className="text-purple-400">04:</span> Señala la fuente para poder comprobarla.</div>
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
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-6 text-[#DDA0DD] uppercase">Lo que hay detrás de una respuesta útil</h3>
              <p className="text-lg md:text-2xl text-[#C5C6C7] leading-relaxed mb-6">
                Para que el asistente sea útil en un proceso de trabajo, no basta con que genere texto. También debe indicar sus fuentes, separar la información de cada persona y controlar el uso.
              </p>
              <ul className="text-[#C5C6C7] space-y-4">
                <li><strong className="text-white">Uso controlado:</strong> limita la cantidad de consultas para evitar consumos inesperados.</li>
                <li><strong className="text-white">Datos protegidos:</strong> establece permisos para que cada usuario acceda solo a su información.</li>
                <li><strong className="text-white">Información verificable:</strong> permite volver al archivo original antes de tomar una decisión.</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}


