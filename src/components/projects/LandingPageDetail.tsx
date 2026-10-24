"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { CaseStudyBrief } from "./CaseStudyBrief";
import { videoUrl } from "@/data/media";
import { ProjectHeroGlow } from "./ProjectHeroGlow";

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
        <ProjectHeroGlow color="211, 112, 57" />
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
                  CAFÉ
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1 
                  initial={{ rotate: -5, y: 100, opacity: 0 }}
                  animate={{ rotate: 0, y: 0, opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="text-[40px] md:text-[64px] leading-[0.9] tracking-[-1px] font-medium uppercase text-[#d37039] font-[family-name:var(--font-abc-gravity-variable)] text-center"
                >
                  ORIGEN
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

      <CaseStudyBrief
        accent="#e09c6f"
        problem="Una oferta valiosa pierde oportunidades si su mensaje, beneficios y siguiente paso no se entienden en segundos."
        solution="Una web que presenta la marca, destaca lo que ofrece y facilita el siguiente paso para el visitante."
        outcome="Una primera impresión más clara y un camino sencillo para conocer o contactar al negocio."
      />

      {/* Body */}
      <main className="relative z-20 w-full pt-16 pb-24 md:pt-20 md:pb-32 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-16 md:gap-32 font-[family-name:var(--font-die-grotesk-b)]">
          
          {/* Sidebar + Section 1 Layout */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-24 mb-0">

            {/* Mobile: pills horizontales */}
            <div className="flex flex-wrap gap-2 mb-4 md:hidden font-[family-name:var(--font-ibm-plex-mono)]">
              <span className="text-xs px-3 py-1.5 rounded-full border border-[#2a1e15] text-[#a58971]">Presentación de marca</span>
              <span className="text-xs px-3 py-1.5 rounded-full border border-[#2a1e15] text-[#a58971]">Diseño móvil</span>
              <span className="text-xs px-3 py-1.5 rounded-full border border-[#2a1e15] text-[#a58971]">Contacto</span>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:flex md:w-1/4 shrink-0 flex-col gap-8 md:sticky top-32 self-start font-[family-name:var(--font-ibm-plex-mono)]">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-2"
              >
                <h4 className="text-[#d37039] uppercase tracking-widest text-xs font-semibold">QUÉ INCLUYE</h4>
                <p className="text-[#e0cfba] text-sm">Una página para presentar la cafetería, sus productos y la experiencia de la marca en computador y celular.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col gap-2"
              >
                <h4 className="text-[#d37039] uppercase tracking-widest text-xs font-semibold">EL RETO</h4>
                <p className="text-[#e0cfba] text-sm">Transmitir la personalidad de Café Origen sin que el diseño dificulte leer, navegar o encontrar cómo visitarlos.</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col gap-2"
              >
                <h4 className="text-[#d37039] uppercase tracking-widest text-xs font-semibold">RESULTADO</h4>
                <p className="text-[#e0cfba] text-sm">Una presentación visual coherente con la marca, cómoda de explorar también desde el celular.</p>
              </motion.div>
            </div>

            {/* Main intro */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 flex flex-col gap-8"
            >
              <div className="flex items-center gap-4 text-[#d37039] font-[family-name:var(--font-ibm-plex-mono)] text-sm tracking-widest uppercase">
                <span>El proyecto</span>
                <span className="w-12 h-[1px] bg-[#d37039]"></span>
                <span>Café Origen</span>
              </div>
              
              <h2 className="text-[32px] md:text-[56px] leading-[1.1] uppercase text-[#e0cfba] font-medium tracking-tight font-[family-name:var(--font-abc-gravity-variable)]">
                Una web que se siente <br className="hidden md:block"/> como Café Origen
              </h2>
              
              <div className="flex flex-col md:flex-row gap-12 md:gap-16 text-body-lg text-[#a58971]">
                <div className="flex-1 flex flex-col gap-6">
                  <h3 className="text-[#d37039] font-medium text-xl uppercase font-[family-name:var(--font-abc-gravity-variable)] tracking-tight">El objetivo</h3>
                  <p>
                    La página debía mostrar qué hace especial a la cafetería: sus productos, su ambiente y la forma de encontrarla o ponerse en contacto. Todo tenía que entenderse sin esfuerzo desde el primer vistazo.
                  </p>
                  <p>
                    Organicé el contenido para que el visitante pueda descubrir la marca, explorar la propuesta y llegar a la acción que le interese sin perderse en la página.
                  </p>
                </div>

                <div className="flex-1 flex flex-col gap-6">
                  <h3 className="text-[#d37039] font-medium text-xl uppercase font-[family-name:var(--font-abc-gravity-variable)] tracking-tight">La experiencia</h3>
                  <ul className="list-disc pl-5 flex flex-col gap-2 mt-2">
                    <li><strong>Recorrido visual:</strong> las imágenes y los textos aparecen conforme se avanza, ayudando a contar la historia de la marca.</li>
                    <li><strong>Navegación fluida:</strong> las transiciones acompañan el contenido sin estorbar la lectura.</li>
                    <li><strong>Lectura clara:</strong> tipografía y espacios adaptados a distintos tamaños de pantalla.</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Caso de Exito: Cafe Origen */}
          <div className="w-full max-w-[800px] mx-auto mt-12 md:mt-12 px-6 md:px-0 text-center flex flex-col items-center">
             <h3 className="text-[28px] md:text-[40px] leading-tight text-[#e0cfba] font-medium uppercase font-[family-name:var(--font-abc-gravity-variable)]">Café Origen en pantalla</h3>
             <p className="text-[#a58971] mt-2 mb-6 max-w-[600px] text-body-lg">
               Una propuesta visual para una cafetería de especialidad y panadería artesanal. El diseño busca transmitir el ambiente del lugar y facilitar que una persona conozca sus productos y se anime a visitarlo.
             </p>
          </div>

          {/* Desktop Video Showcase with Social Proof */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full aspect-video bg-[#2a1e15] rounded-[24px] md:rounded-[40px] border border-[#d37039]/20 shadow-[0_0_60px_rgba(211,112,57,0.1)] overflow-hidden flex items-center justify-center relative group"
          >
             <video 
               src={videoUrl("landing-page.mp4")}
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
                <div className="min-w-8 h-8 px-2 md:min-w-10 md:h-10 rounded-full bg-[#d37039]/20 flex items-center justify-center text-[#d37039] font-bold text-sm md:text-base">
                  Café
                </div>
                <div className="flex flex-col font-[family-name:var(--font-ibm-plex-mono)]">
                  <span className="text-[9px] md:text-xs text-[#a58971] uppercase tracking-wider">La marca</span>
                  <span className="text-xs md:text-base text-[#e0cfba] font-bold">Desde el primer vistazo</span>
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
                 src={videoUrl("landing-mobile.mp4")}
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
                Diseñada para el celular
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-body-lg text-[#a58971]"
              >
                Muchas personas conocerán la cafetería desde su teléfono. Por eso, el contenido, los botones y las imágenes se adaptan a una pantalla pequeña:
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
                  <p className="text-[#a58971] text-sm">Los textos cambian de tamaño y mantienen espacio suficiente para leerse sin ampliar la pantalla.</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="p-5 border border-[#d37039]/30 bg-[#2a1e15]/50 rounded-2xl"
                >
                  <h4 className="text-[#e0cfba] font-bold mb-1">2. Control de Pantalla</h4>
                  <p className="text-[#a58971] text-sm">La página se ajusta al ancho del teléfono para evitar desplazamientos laterales que interrumpan la lectura.</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="p-5 border border-[#d37039]/30 bg-[#2a1e15]/50 rounded-2xl"
                >
                  <h4 className="text-[#e0cfba] font-bold mb-1">3. Botones para Pulgares</h4>
                  <p className="text-[#a58971] text-sm">Las acciones principales quedan en lugares cómodos de tocar mientras se navega con una mano.</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="p-5 border border-[#d37039]/30 bg-[#2a1e15]/50 rounded-2xl"
                >
                  <h4 className="text-[#e0cfba] font-bold mb-1">4. Sensación de Velocidad</h4>
                  <p className="text-[#a58971] text-sm">El contenido aparece de manera progresiva para que el recorrido se sienta fluido.</p>
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
              ¿Cómo debería sentirse <br /> <span className="text-[#d37039]">tu marca en pantalla?</span>
            </h2>
            <p className="text-body-lg text-[#a58971] max-w-[600px]">
              Podemos crear una web que explique lo que ofreces, refleje la personalidad de tu negocio y facilite que las personas den el siguiente paso.
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


