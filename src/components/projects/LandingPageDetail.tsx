"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export function LandingPageDetail() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Hero-specific scroll
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0]);

  // Global page scroll for the progress bar
  const { scrollYProgress: globalProgress } = useScroll();
  const scaleX = useSpring(globalProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="w-full flex flex-col relative bg-[#1c140d] text-[#e0cfba]">
      {/* Global Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#d37039] z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Dark Brown Header with Parallax */}
      <div ref={heroRef} className="relative w-full min-h-[40vh] md:min-h-[50vh] overflow-hidden flex items-start pt-24 md:pt-40">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative w-full px-6 md:px-12 z-10"
        >
          <div className="max-w-[1400px] mx-auto w-full relative h-full flex flex-col items-center justify-center pt-16 md:pt-0">
            <Link href="/#work" className="absolute top-0 left-0 md:-top-16 font-[family-name:var(--font-ibm-plex-mono)] text-caption font-semibold tracking-caption uppercase text-[#a58971] md:hover:text-[#e0cfba] active:text-[#e0cfba] transition-colors z-50 p-2 md:p-0">
              ← REGRESAR AL HUB
            </Link>
            
            <div className="flex flex-col items-center justify-center">
              <div className="overflow-hidden mb-2 md:mb-4">
                <motion.h1 
                  initial={{ rotate: 5, y: 100, opacity: 0 }}
                  animate={{ rotate: 0, y: 0, opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[48px] md:text-[80px] leading-[0.9] tracking-[-1px] md:tracking-[-2px] font-medium uppercase font-[family-name:var(--font-abc-gravity-variable)] text-center"
                >
                  LANDING
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1 
                  initial={{ rotate: -5, y: 100, opacity: 0 }}
                  animate={{ rotate: 0, y: 0, opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="text-[40px] md:text-[64px] leading-[0.9] tracking-[-1px] font-medium uppercase text-[#d37039] font-[family-name:var(--font-abc-gravity-variable)] text-center"
                >
                  EXPERIENCES
                </motion.h1>
              </div>
            </div>
            
            {/* Scroll Indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="flex flex-col items-center gap-3 text-[#a58971] z-20 pointer-events-none mt-16"
            >
              <span className="font-[family-name:var(--font-ibm-plex-mono)] text-xs tracking-[0.2em] uppercase">Descubre Más</span>
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-[1px] h-12 bg-gradient-to-b from-[#d37039] to-transparent"
              />
            </motion.div>
          </div>
        </motion.div>
        {/* Parallax Background */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 bg-[#2a1e15] opacity-30 z-0"></motion.div>
      </div>

      {/* Body */}
      <main className="relative z-20 w-full pt-16 pb-24 md:pt-20 md:pb-32 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-16 md:gap-32 font-[family-name:var(--font-die-grotesk-b)]">
          
          {/* Section 1 & 2: Project Info & Brief */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8 max-w-[1200px]"
          >
            <div className="flex items-center gap-4 text-[#d37039] font-[family-name:var(--font-ibm-plex-mono)] text-sm tracking-widest uppercase">
              <span>Presentación del Proyecto</span>
              <span className="w-12 h-[1px] bg-[#d37039]"></span>
              <span>Café Origen</span>
            </div>
            
            <h2 className="text-[32px] md:text-[56px] leading-[1.1] uppercase text-[#e0cfba] font-medium tracking-tight font-[family-name:var(--font-abc-gravity-variable)]">
              El Arte de Vender <br className="hidden md:block"/> con Estética y Precisión
            </h2>
            
            <div className="flex flex-col md:flex-row gap-12 md:gap-16 text-body-lg text-[#a58971] mt-8 md:mt-12">
              <div className="flex-1 flex flex-col gap-6">
                <h3 className="text-[#d37039] font-medium text-xl uppercase font-[family-name:var(--font-abc-gravity-variable)] tracking-tight">El Problema: Webs que no venden</h3>
                <p>
                  Tener una página web "bonita" ya no es suficiente. Si tu sitio está lleno de menús confusos, textos aburridos y tarda más de 3 segundos en cargar, el usuario simplemente se irá.
                </p>
                <p>
                  Las plantillas genéricas carecen de alma. No logran transmitir la verdadera calidad de tus productos ni generar la confianza necesaria para que un cliente decida comprarte o visitarte.
                </p>
              </div>

              <div className="flex-1 flex flex-col gap-6">
                <h3 className="text-[#d37039] font-medium text-xl uppercase font-[family-name:var(--font-abc-gravity-variable)] tracking-tight">La Solución: Landing Inmersiva</h3>
                <p>
                  Desarrollamos páginas de aterrizaje de <strong>ultra-conversión</strong>. No son simples webs, son vitrinas digitales estructuradas psicológicamente para vender.
                </p>
                <ul className="list-disc pl-5 flex flex-col gap-2 mt-2">
                  <li><strong>Arquitectura Persuasiva:</strong> Guiamos al usuario desde el asombro inicial hasta la conversión sin distracciones.</li>
                  <li><strong>Identidad Editorial:</strong> Diseño crudo, tipografías premium y animaciones sutiles.</li>
                  <li><strong>Velocidad Absoluta:</strong> Código puro y optimizado que carga al instante.</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Caso de Exito: Cafe Origen */}
          <div className="w-full max-w-[800px] mx-auto mt-12 md:mt-12 px-6 md:px-0 text-center flex flex-col items-center">
             <h3 className="text-[28px] md:text-[40px] leading-tight text-[#e0cfba] font-medium uppercase font-[family-name:var(--font-abc-gravity-variable)]">Caso de Éxito: Café Origen</h3>
             <p className="text-[#a58971] mt-2 mb-6 max-w-[600px] text-body-lg">
               Cafetería de especialidad y panadería artesanal. Su web anterior se sentía "generada por IA". Construimos una vitrina editorial inmersiva para que el visitante "sintiera el aroma del café" solo con hacer scroll, atrayendo más clientes físicos al local.
             </p>
          </div>

          {/* Boton de Visita */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full flex justify-center mt-0 mb-12 md:mb-16"
          >
             <a 
               href="https://el-origen-cafe.vercel.app/" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="inline-flex items-center justify-center border border-[#d37039] text-[#d37039] active:bg-[#d37039] active:text-[#1c140d] md:hover:bg-[#d37039] md:hover:text-[#1c140d] transition-colors px-8 py-4 rounded-full font-[family-name:var(--font-ibm-plex-mono)] uppercase text-sm tracking-widest font-semibold shadow-[0_0_20px_rgba(211,112,57,0.15)] md:hover:shadow-[0_0_30px_rgba(211,112,57,0.3)] active:scale-95"
             >
               VISITAR CAFÉ ORIGEN EN VIVO ↗
             </a>
          </motion.div>

          {/* Desktop Video Showcase with Social Proof */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full aspect-video bg-[#2a1e15] rounded-[24px] md:rounded-[40px] border border-[#d37039]/20 shadow-[0_0_60px_rgba(211,112,57,0.1)] overflow-hidden flex items-center justify-center relative group"
          >
             <video 
               src="/videos/landing-page.mp4" 
               autoPlay loop muted playsInline 
               className="w-full h-full object-cover" 
             />
             
             {/* Social Proof Metric */}
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-[#1c140d]/80 backdrop-blur-md border border-[#d37039]/30 rounded-xl md:rounded-2xl p-2 md:p-4 flex items-center gap-2 md:gap-4 drop-shadow-2xl scale-90 md:scale-100 origin-bottom-right"
             >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#d37039]/20 flex items-center justify-center text-[#d37039] font-bold text-sm md:text-base">
                  99
                </div>
                <div className="flex flex-col font-[family-name:var(--font-ibm-plex-mono)]">
                  <span className="text-[9px] md:text-xs text-[#a58971] uppercase tracking-wider">Rendimiento</span>
                  <span className="text-xs md:text-base text-[#e0cfba] font-bold">Calificación de Google</span>
                </div>
             </motion.div>
          </motion.div>

          {/* Mobile Video & Engineering Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center max-w-[1200px] mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mx-auto w-full max-w-[360px] relative drop-shadow-[0_0_40px_rgba(211,112,57,0.3)] flex items-center justify-center rounded-[40px] overflow-hidden border-[6px] md:border-[8px] border-[#2a1e15] bg-[#1c140d]"
            >
               <video 
                 src="/videos/landing-mobile.mp4" 
                 autoPlay loop muted playsInline 
                 className="w-full h-auto rounded-[32px]" 
               />
            </motion.div>
            
            <div className="flex flex-col justify-center gap-6">
              <motion.h2 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-[32px] md:text-[48px] leading-[1.0] tracking-[-1.5px] uppercase text-[#d37039] font-medium font-[family-name:var(--font-abc-gravity-variable)]"
              >
                4. Ingeniería Mobile-First
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-body-lg text-[#a58971]"
              >
                Para que esta experiencia no se rompiera en un celular y se sintiera como una <strong>App Nativa</strong>, implementamos cuatro estrategias técnicas rigurosas:
              </motion.p>
              
              <div className="flex flex-col gap-4 mt-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="p-5 border border-[#d37039]/30 bg-[#2a1e15]/50 rounded-2xl"
                >
                  <h4 className="text-[#e0cfba] font-bold mb-1">1. Lectura sin Esfuerzo</h4>
                  <p className="text-[#a58971] text-sm">Los textos se adaptan mágicamente a cualquier pantalla. Tus clientes jamás tendrán que hacer "zoom" con los dedos para poder leer tu oferta.</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="p-5 border border-[#d37039]/30 bg-[#2a1e15]/50 rounded-2xl"
                >
                  <h4 className="text-[#e0cfba] font-bold mb-1">2. Control de Pantalla</h4>
                  <p className="text-[#a58971] text-sm">Eliminamos los molestos desplazamientos horizontales accidentales. La navegación se siente sólida y firme, guiando al usuario hacia la compra.</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="p-5 border border-[#d37039]/30 bg-[#2a1e15]/50 rounded-2xl"
                >
                  <h4 className="text-[#e0cfba] font-bold mb-1">3. Botones para Pulgares</h4>
                  <p className="text-[#a58971] text-sm">Ubicamos la botonera principal en la parte inferior de la pantalla, justo donde descansa el pulgar del usuario, al igual que en Instagram o WhatsApp.</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="p-5 border border-[#d37039]/30 bg-[#2a1e15]/50 rounded-2xl"
                >
                  <h4 className="text-[#e0cfba] font-bold mb-1">4. Sensación de Velocidad</h4>
                  <p className="text-[#a58971] text-sm">La página se anticipa al usuario y carga el contenido justo antes de que haga scroll, creando una sensación de inmersión y velocidad extrema.</p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Invitation CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full mt-12 bg-gradient-to-br from-[#2a1e15] to-[#1c140d] border border-[#d37039]/40 rounded-3xl px-6 py-12 md:p-24 flex flex-col items-center text-center gap-8 shadow-[0_0_80px_rgba(211,112,57,0.15)]"
          >
            <h2 className="text-[40px] md:text-[64px] leading-[1.0] font-medium tracking-tight font-[family-name:var(--font-abc-gravity-variable)] text-[#e0cfba] uppercase">
              ¿Listo para tu propio <br /> <span className="text-[#d37039]">cambio radical?</span>
            </h2>
            <p className="text-body-lg text-[#a58971] max-w-[600px]">
              Al igual que Café Origen, tu negocio no merece una plantilla genérica. Construimos experiencias digitales crudas, rentables y diseñadas con ingeniería milimétrica para vender.
            </p>
            <Link 
              href="/#contact"
              className="mt-4 bg-[#d37039] text-[#1c140d] font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-widest px-10 py-5 rounded-full font-bold shadow-[0_0_30px_rgba(211,112,57,0.4)] md:hover:shadow-[0_0_50px_rgba(211,112,57,0.6)] md:hover:bg-[#e67a3e] md:hover:text-white active:bg-[#e67a3e] active:text-white transition-all md:hover:-translate-y-1 active:scale-95"
            >
              Diseñar mi Experiencia
            </Link>
            
            <Link 
              href="/work/catalogo"
              className="mt-6 font-[family-name:var(--font-ibm-plex-mono)] text-sm tracking-widest text-[#a58971] md:hover:text-[#d37039] active:text-[#d37039] transition-colors border-b border-transparent md:hover:border-[#d37039] active:border-[#d37039] pb-1 p-2 md:p-0"
            >
              SIGUIENTE PROYECTO: CATÁLOGO DIGITAL →
            </Link>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
