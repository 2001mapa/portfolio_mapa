"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export function LinktreeDetail() {
  const heroRef = useRef<HTMLDivElement>(null);
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
    <div className="w-full flex flex-col relative bg-[#130f1c] text-[#d6cce5]">
      {/* Global Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#b039d3] z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Dark Purple Header with Parallax */}
      <div ref={heroRef} className="relative w-full min-h-[40vh] md:min-h-[50vh] overflow-hidden flex items-start pt-24 md:pt-40">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative w-full px-6 md:px-12 z-10"
        >
          <div className="max-w-[1400px] mx-auto w-full relative h-full flex flex-col items-center justify-center pt-16 md:pt-0">
            <Link href="/#work" className="absolute top-0 left-0 md:-top-16 font-[family-name:var(--font-ibm-plex-mono)] text-caption font-semibold tracking-caption uppercase text-[#8971a5] md:hover:text-[#d6cce5] active:text-[#d6cce5] transition-colors z-50 p-2 md:p-0">
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
                  LINKTREE
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1 
                  initial={{ rotate: -5, y: 100, opacity: 0 }}
                  animate={{ rotate: 0, y: 0, opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="text-[40px] md:text-[64px] leading-[0.9] tracking-[-1px] font-medium uppercase text-[#b039d3] font-[family-name:var(--font-abc-gravity-variable)] text-center"
                >
                  PREMIUM
                </motion.h1>
              </div>
            </div>
            
            {/* Scroll Indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="flex flex-col items-center gap-3 text-[#8971a5] z-20 pointer-events-none mt-16"
            >
              <span className="font-[family-name:var(--font-ibm-plex-mono)] text-xs tracking-[0.2em] uppercase">Descubre Más</span>
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-[1px] h-12 bg-gradient-to-b from-[#b039d3] to-transparent"
              />
            </motion.div>
          </div>
        </motion.div>
        {/* Parallax Background */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 bg-[#1e152a] opacity-30 z-0"></motion.div>
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
            <div className="flex items-center gap-4 text-[#b039d3] font-[family-name:var(--font-ibm-plex-mono)] text-sm tracking-widest uppercase">
              <span>Presentación del Servicio</span>
              <span className="w-12 h-[1px] bg-[#b039d3]"></span>
              <span>Ecosistema de Enlaces</span>
            </div>
            
            <h2 className="text-[32px] md:text-[56px] leading-[1.1] uppercase text-[#d6cce5] font-medium tracking-tight font-[family-name:var(--font-abc-gravity-variable)]">
              Tu tarjeta de <br className="hidden md:block"/> presentación digital definitiva
            </h2>
            <div className="flex flex-col md:flex-row gap-12 md:gap-16 text-body-lg text-[#8971a5] mt-12 md:mt-16">
              <div className="flex-1 flex flex-col gap-6">
                <h3 className="text-[#b039d3] font-medium text-xl uppercase font-[family-name:var(--font-abc-gravity-variable)] tracking-tight">El Problema de un solo enlace</h3>
                <p>
                  Instagram y TikTok limitan tu perfil a un solo enlace. Si tu negocio vende múltiples productos, tiene un catálogo y recibe pedidos por WhatsApp, obligar al cliente a buscar la información le genera fricción y te hace perder ventas.
                </p>
                <p>
                  Las plataformas gratuitas de enlaces se ven genéricas, están llenas de publicidad de terceros y rompen por completo con la identidad y el prestigio de tu marca.
                </p>
              </div>

              <div className="flex-1 flex flex-col gap-6">
                <h3 className="text-[#b039d3] font-medium text-xl uppercase font-[family-name:var(--font-abc-gravity-variable)] tracking-tight">La Solución: Ecosistema Premium</h3>
                <p>
                  Diseñamos <strong>Linktrees de Alto Rendimiento</strong>. Micro-sitios ultrarrápidos, programados a medida, que actúan como el embudo de conversión perfecto para tus redes sociales.
                </p>
                <ul className="list-disc pl-5 flex flex-col gap-2 mt-2">
                  <li><strong>Centralización Total:</strong> Catálogo, WhatsApp, TikTok y pagos a un solo clic.</li>
                  <li><strong>Identidad Absoluta:</strong> 100% fiel a tu estética, sin logos ni publicidad ajena.</li>
                  <li><strong>Mobile-First:</strong> Experiencia fluida pensada para el 95% de tráfico que viene de Instagram.</li>
                </ul>
              </div>
            </div>
          </motion.div>
               {/* Caso de Exito: Stylo */}
          <div className="w-full max-w-[800px] mx-auto mt-12 md:mt-12 px-6 md:px-0 text-center flex flex-col items-center">
             <h3 className="text-[28px] md:text-[40px] leading-tight text-[#d6cce5] font-medium uppercase font-[family-name:var(--font-abc-gravity-variable)]">Caso de Éxito: Stylo Caps</h3>
             <p className="text-[#8971a5] mt-2 mb-6 max-w-[500px] text-body-lg">
               Emprendimiento de accesorios. Centralizamos su catálogo y canales de contacto en un solo micro-sitio para eliminar la fricción de ventas.
             </p>
             <a 
               href="https://stylocaps.netlify.app/" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="inline-flex items-center justify-center border border-[#b039d3] text-[#b039d3] md:hover:bg-[#b039d3] md:hover:text-white active:bg-[#b039d3] active:text-white transition-colors px-6 py-3 rounded-full font-[family-name:var(--font-ibm-plex-mono)] uppercase text-sm tracking-widest font-semibold mb-4 shadow-[0_0_20px_rgba(176,57,211,0.15)] md:hover:shadow-[0_0_30px_rgba(176,57,211,0.3)] active:scale-95"
             >
               VISITAR STYLO EN VIVO ↗
             </a>
          </div>

          {/* Animated Video Showcase 1 (Stylo) */}
          <div className="w-full flex justify-center items-center py-4 md:py-8 relative mt-0 px-4 md:px-0">
            <div className="relative flex items-center justify-center w-full max-w-[800px]">
              
              {/* Desktop Video (Background, Fades out and in) */}
              <motion.div 
                animate={{ 
                  opacity: [1, 1, 0.4, 0.4, 1],
                  scale: [1, 1, 0.95, 0.95, 1],
                  filter: [
                    "brightness(1) blur(0px)", 
                    "brightness(1) blur(0px)", 
                    "brightness(0.3) blur(10px)", 
                    "brightness(0.3) blur(10px)", 
                    "brightness(1) blur(0px)"
                  ]
                }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  times: [0, 0.4, 0.5, 0.9, 1]
                }}
                className="relative z-10 w-full aspect-video bg-[#1e152a] rounded-[16px] md:rounded-[24px] overflow-hidden border border-[#b039d3]/30 shadow-[0_0_50px_rgba(176,57,211,0.2)]"
              >
                <video 
                  src="/videos/Stylo-Escritorio.mp4" 
                  autoPlay loop muted playsInline 
                  className="w-full h-full object-cover" 
                />
              </motion.div>

              {/* Mobile Video (Emerges to the front in a loop) */}
              <motion.div
                style={{ translateX: "-50%", translateY: "-50%" }}
                animate={{ 
                  opacity: [0, 0, 1, 1, 0],
                  scale: [0.8, 0.8, 1, 1, 0.8]
                }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  times: [0, 0.4, 0.5, 0.9, 1]
                }}
                className="absolute z-20 top-1/2 left-1/2 h-[160%] md:h-[110%] w-auto drop-shadow-[0_30px_80px_rgba(176,57,211,0.5)] flex items-center justify-center"
              >
                <video 
                  src="/videos/Stylo-mobil.mp4" 
                  autoPlay loop muted playsInline 
                  className="h-full w-auto object-contain rounded-[14px] md:rounded-[30px] overflow-hidden" 
                />
              </motion.div>

            </div>
          </div>

          {/* Caso de Exito: Full Accesorios */}
          <div className="w-full max-w-[800px] mx-auto mt-24 md:mt-32 px-6 md:px-0 text-center flex flex-col items-center">
             <h3 className="text-[28px] md:text-[40px] leading-tight text-[#d6cce5] font-medium uppercase font-[family-name:var(--font-abc-gravity-variable)]">Caso de Éxito: Full Accesorios</h3>
             <p className="text-[#8971a5] mt-2 mb-6 max-w-[550px] text-body-lg">
               Tienda de bisutería fina. Sus clientas saturaban el DM pidiendo el catálogo, precios y el WhatsApp por separado. Diseñamos un ecosistema para centralizar toda su operativa de forma elegante.
             </p>
             <a 
               href="https://fullaccesorioss.netlify.app/" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="inline-flex items-center justify-center border border-[#b039d3] text-[#b039d3] md:hover:bg-[#b039d3] md:hover:text-white active:bg-[#b039d3] active:text-white transition-colors px-6 py-3 rounded-full font-[family-name:var(--font-ibm-plex-mono)] uppercase text-sm tracking-widest font-semibold mb-4 shadow-[0_0_20px_rgba(176,57,211,0.15)] md:hover:shadow-[0_0_30px_rgba(176,57,211,0.3)] active:scale-95"
             >
               VISITAR FULL ACCESORIOS ↗
             </a>
          </div>

          {/* Animated Video Showcase 2 (Full) */}
          <div className="w-full flex justify-center items-center py-4 md:py-8 relative mt-0 px-4 md:px-0">
            <div className="relative flex items-center justify-center w-full max-w-[800px]">
              
              {/* Desktop Video (Background, Fades out and in) */}
              <motion.div 
                animate={{ 
                  opacity: [1, 1, 0.4, 0.4, 1],
                  scale: [1, 1, 0.95, 0.95, 1],
                  filter: [
                    "brightness(1) blur(0px)", 
                    "brightness(1) blur(0px)", 
                    "brightness(0.3) blur(10px)", 
                    "brightness(0.3) blur(10px)", 
                    "brightness(1) blur(0px)"
                  ]
                }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  times: [0, 0.4, 0.5, 0.9, 1],
                  delay: 2 // Offset the loop by 2 seconds so they don't animate exactly at the same time
                }}
                className="relative z-10 w-full aspect-video bg-[#1e152a] rounded-[16px] md:rounded-[24px] overflow-hidden border border-[#b039d3]/30 shadow-[0_0_50px_rgba(176,57,211,0.2)]"
              >
                <video 
                  src="/videos/Full_Escritorio.mp4" 
                  autoPlay loop muted playsInline 
                  className="w-full h-full object-cover" 
                />
              </motion.div>

              {/* Mobile Video (Emerges to the front in a loop) */}
              <motion.div
                style={{ translateX: "-50%", translateY: "-50%" }}
                animate={{ 
                  opacity: [0, 0, 1, 1, 0],
                  scale: [0.8, 0.8, 1, 1, 0.8]
                }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  times: [0, 0.4, 0.5, 0.9, 1],
                  delay: 2 // Offset the loop by 2 seconds
                }}
                className="absolute z-20 top-1/2 left-1/2 h-[160%] md:h-[110%] w-auto drop-shadow-[0_30px_80px_rgba(176,57,211,0.5)] flex items-center justify-center"
              >
                <video 
                  src="/videos/Full_Mobil.mp4" 
                  autoPlay loop muted playsInline 
                  className="h-full w-auto object-contain rounded-[14px] md:rounded-[30px] overflow-hidden" 
                />
              </motion.div>

            </div>
          </div>

          {/* Invitation CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full mt-12 bg-gradient-to-br from-[#1e152a] to-[#130f1c] border border-[#b039d3]/40 rounded-3xl px-6 py-12 md:p-24 flex flex-col items-center text-center gap-8 shadow-[0_0_80px_rgba(176,57,211,0.15)]"
          >
            <h2 className="text-[40px] md:text-[64px] leading-[1.0] font-medium tracking-tight font-[family-name:var(--font-abc-gravity-variable)] text-[#d6cce5] uppercase">
              ¿Listo para tu primer <br /> <span className="text-[#b039d3]">paso digital?</span>
            </h2>
            <p className="text-body-lg text-[#8971a5] max-w-[600px]">
              Empieza con un Ecosistema de Enlaces y profesionaliza tu presencia en redes sociales desde el día uno.
            </p>

            <Link 
              href="/work/landing-page"
              className="mt-6 font-[family-name:var(--font-ibm-plex-mono)] text-sm tracking-widest text-[#8971a5] md:hover:text-[#b039d3] active:text-[#b039d3] transition-colors border-b border-transparent md:hover:border-[#b039d3] active:border-[#b039d3] pb-1 p-2 md:p-0"
            >
              SIGUIENTE PROYECTO: LANDING PAGE →
            </Link>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
