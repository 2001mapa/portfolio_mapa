"use client";

import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { useRef } from "react";

export function CatalogoDetail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="w-full min-h-screen flex flex-col relative bg-[#131c15] text-[#d6e0d8]">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#4a7c59] z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="relative w-full min-h-[50vh] overflow-hidden flex items-start pt-32 md:pt-40 border-b border-[#2b3a2e] z-20">
        <div className="relative w-full px-6 md:px-12 z-10">
          <div className="max-w-[1400px] mx-auto w-full relative h-full flex flex-col items-center justify-center pt-16 md:pt-0">
            <Link href="/#work" className="absolute top-0 left-0 md:-top-16 font-[family-name:var(--font-ibm-plex-mono)] text-caption font-semibold tracking-caption uppercase text-[#7a9982] hover:text-[#d6e0d8] transition-colors z-50">
              ← REGRESAR AL HUB
            </Link>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute top-0 right-0 md:-top-16 hidden md:flex flex-col items-end gap-1 font-[family-name:var(--font-ibm-plex-mono)] text-sm tracking-widest text-[#7a9982]"
            >
              <span>PROYECTO //</span>
              <span className="text-[#d6e0d8]">02</span>
            </motion.div>

            <div className="flex flex-col items-center justify-center">
              <div className="overflow-hidden mb-2 md:mb-4">
                <motion.h1 
                  initial={{ rotate: 5, y: 100, opacity: 0 }}
                  animate={{ rotate: 0, y: 0, opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[48px] md:text-[80px] leading-[0.9] tracking-[-1px] md:tracking-[-2px] font-medium uppercase font-[family-name:var(--font-abc-gravity-variable)] text-center text-[#d6e0d8]"
                >
                  CATÁLOGO
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1 
                  initial={{ rotate: -5, y: 100, opacity: 0 }}
                  animate={{ rotate: 0, y: 0, opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="text-[40px] md:text-[64px] leading-[0.9] tracking-[-1px] font-medium uppercase text-[#4a7c59] font-[family-name:var(--font-abc-gravity-variable)] text-center"
                >
                  DIGITAL
                </motion.h1>
              </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="flex flex-col items-center gap-3 text-[#7a9982] z-20 pointer-events-none mt-16"
            >
              <span className="font-[family-name:var(--font-ibm-plex-mono)] text-xs tracking-[0.2em] uppercase">Descubre Más</span>
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-[1px] h-12 bg-gradient-to-b from-[#4a7c59] to-transparent"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <main className="w-full pt-16 pb-24 md:pt-20 md:pb-32 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-24 md:gap-32 font-[family-name:var(--font-die-grotesk-b)]">
          
          {/* Section 1: La Visión del Cliente */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8 max-w-[1200px]"
          >
            <div className="flex items-center gap-4 text-[#4a7c59] font-[family-name:var(--font-ibm-plex-mono)] text-sm tracking-widest uppercase">
              <span>Estudio de Caso</span>
              <span className="w-12 h-[1px] bg-[#4a7c59]"></span>
              <span>Esencias del Bosque</span>
            </div>
            
            <h2 className="text-[32px] md:text-[56px] leading-[1.1] uppercase text-[#d6e0d8] font-medium tracking-tight font-[family-name:var(--font-abc-gravity-variable)]">
              Belleza Natural, <br className="hidden md:block"/> Experiencia Digital
            </h2>
            
            <div className="flex flex-col md:flex-row gap-12 md:gap-16 text-body-lg text-[#7a9982]">
              <div className="flex-1 flex flex-col gap-6">
                <h3 className="text-[#4a7c59] font-medium text-xl uppercase font-[family-name:var(--font-abc-gravity-variable)] tracking-tight">1. La Visión del Cliente (El "Por Qué")</h3>
                <p>
                  El cliente no quería simplemente "vender productos por internet". Su necesidad principal era <strong>transmitir un sentimiento</strong>: el alivio y la quietud que se siente al entrar a un invernadero al amanecer. 
                </p>
                <p>
                  Quería expresar que sus productos no son cosmética industrial producida en masa, sino <strong>"atmósferas" y "remedios"</strong> creados mediante una alquimia lenta. El objetivo era que la página web misma fuera un refugio visual que calmara la mente del visitante antes incluso de comprar el producto.
                </p>
                <h3 className="text-[#4a7c59] font-medium text-xl uppercase font-[family-name:var(--font-abc-gravity-variable)] tracking-tight mt-4">Directrices de Diseño</h3>
                <ul className="list-disc pl-5 flex flex-col gap-2 mt-2">
                  <li><strong>Minimalismo Orgánico:</strong> Uso de fondos blancos puros contrastados con un verde botánico específico y tipografía negra entintada.</li>
                  <li><strong>Arquitectura de Líneas:</strong> Sin sombras pesadas ni cajas genéricas. Todo definido por bordes finos de <code>1px</code>, dando un aspecto de "documento de laboratorio botánico".</li>
                  <li><strong>Tipografía Premium:</strong> Combinación de Serif para títulos artísticos y Grotesk para datos técnicos y legibilidad moderna.</li>
                </ul>
              </div>

              <div className="flex-1 flex flex-col gap-6">
                <h3 className="text-[#4a7c59] font-medium text-xl uppercase font-[family-name:var(--font-abc-gravity-variable)] tracking-tight">2. Contenido y Arquitectura</h3>
                <p>La plataforma se estructuró en secciones clave, cada una diseñada como una experiencia interactiva:</p>
                <ul className="flex flex-col gap-4">
                  <li className="flex items-start gap-3">
                    <span className="text-[#4a7c59] mt-1 text-sm">✦</span> 
                    <span><strong>Inicio (Hero & Home):</strong> Te sumerge en la <em>Galería de Convergencia</em>, un árbol dibujado matemáticamente que crece con el scroll.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#4a7c59] mt-1 text-sm">✦</span> 
                    <span><strong>El Catálogo (Archivo):</strong> Una tienda libre de desorden con filtros por categorías y tarjetas de producto que alternan su diseño.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#4a7c59] mt-1 text-sm">✦</span> 
                    <span><strong>Filosofía (Nosotros):</strong> A través de un tallo que desciende por la pantalla, cuenta la historia de la maceración lenta.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#4a7c59] mt-1 text-sm">✦</span> 
                    <span><strong>Carrito y Checkout:</strong> Un panel lateral fluido que permite gestionar productos sin perder de vista la tienda, con un modal de pago inmersivo.</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Desktop Video Showcase with Social Proof */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full aspect-video bg-[#1a261d] rounded-[24px] md:rounded-[40px] border border-[#4a7c59]/20 shadow-[0_0_60px_rgba(74,124,89,0.1)] overflow-hidden flex items-center justify-center relative group"
          >
             <video 
               src="/videos/catalogo.mp4" 
               autoPlay loop muted playsInline 
               className="w-full h-full object-cover" 
             />
             
             {/* Social Proof Metric */}
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-[#131c15]/80 backdrop-blur-md border border-[#4a7c59]/30 rounded-xl md:rounded-2xl p-2 md:p-4 flex items-center gap-2 md:gap-4 drop-shadow-2xl scale-90 md:scale-100 origin-bottom-right"
             >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#4a7c59]/20 flex items-center justify-center text-[#4a7c59] font-bold text-sm md:text-base">
                  2s
                </div>
                <div className="flex flex-col font-[family-name:var(--font-ibm-plex-mono)]">
                  <span className="text-[9px] md:text-xs text-[#7a9982] uppercase tracking-wider">Velocidad</span>
                  <span className="text-xs md:text-base text-[#d6e0d8] font-bold">Carga de Catálogo</span>
                </div>
             </motion.div>
          </motion.div>

          {/* Mobile Video Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center max-w-[1200px] mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-full max-w-[360px] relative drop-shadow-[0_0_40px_rgba(74,124,89,0.3)] flex items-center justify-center mx-auto md:mx-0 rounded-[40px] overflow-hidden border-[6px] md:border-[8px] border-[#1a261d] bg-[#131c15]">
                 <video 
                   src="/videos/ecommerce-mobile.mp4" 
                   autoPlay loop muted playsInline 
                   className="w-full h-auto rounded-[32px]" 
                 />
              </div>
            </motion.div>
            
            <div className="flex flex-col justify-center gap-6">
              <motion.h2 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-[32px] md:text-[48px] leading-[1.0] tracking-[-1.5px] uppercase text-[#4a7c59] font-medium font-[family-name:var(--font-abc-gravity-variable)]"
              >
                3. Ingeniería Mobile-First
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-body-lg text-[#7a9982]"
              >
                Construir una web altamente animada y gráfica suele ser un desastre en teléfonos móviles si no se planifica desde el código base. Lograr que se sintiera como una <strong>App Nativa Premium</strong> requirió una reingeniería arquitectónica:
              </motion.p>
              
              <div className="flex flex-col gap-4 mt-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="p-5 border border-[#4a7c59]/30 bg-[#1a261d]/50 rounded-2xl"
                >
                  <h4 className="text-[#d6e0d8] font-bold mb-1">1. Lectura sin Esfuerzo</h4>
                  <p className="text-[#7a9982] text-sm">Las fuentes se adaptan mágicamente. El texto es compacto en el celular para no saturar, y masivo en la computadora para impactar.</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="p-5 border border-[#4a7c59]/30 bg-[#1a261d]/50 rounded-2xl"
                >
                  <h4 className="text-[#d6e0d8] font-bold mb-1">2. Botones para Pulgares</h4>
                  <p className="text-[#7a9982] text-sm">Escondimos los menús estorbosos y pusimos la navegación en la parte inferior, justo donde descansa el pulgar, como en las mejores apps.</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="p-5 border border-[#4a7c59]/30 bg-[#1a261d]/50 rounded-2xl"
                >
                  <h4 className="text-[#d6e0d8] font-bold mb-1">3. Distribución Inteligente</h4>
                  <p className="text-[#7a9982] text-sm">La información se apila perfectamente en vertical cuando se detecta un celular, garantizando que el usuario entienda todo a primera vista.</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="p-5 border border-[#4a7c59]/30 bg-[#1a261d]/50 rounded-2xl"
                >
                  <h4 className="text-[#d6e0d8] font-bold mb-1">4. Animaciones Inmersivas</h4>
                  <p className="text-[#7a9982] text-sm">Las imágenes y productos aparecen suavemente justo cuando el usuario hace scroll, guiando su atención de forma natural hacia la compra.</p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Invitation CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full mt-12 bg-gradient-to-br from-[#1a261d] to-[#131c15] border border-[#4a7c59]/40 rounded-3xl p-12 md:p-24 flex flex-col items-center text-center gap-8 shadow-[0_0_80px_rgba(74,124,89,0.15)]"
          >
            <h2 className="text-[40px] md:text-[64px] leading-[1.0] font-medium tracking-tight font-[family-name:var(--font-abc-gravity-variable)] text-[#d6e0d8] uppercase">
              Eleva el prestigio <br /> <span className="text-[#4a7c59]">de tu catálogo.</span>
            </h2>
            <p className="text-body-lg text-[#7a9982] max-w-[600px]">
              Vender online no debería sentirse barato. Transformamos tiendas comunes en galerías digitales de alto impacto que fidelizan clientes y justifican precios premium.
            </p>
            <Link 
              href="/#contact"
              className="mt-4 bg-[#4a7c59] text-[#131c15] font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-widest px-10 py-5 rounded-full font-bold shadow-[0_0_30px_rgba(74,124,89,0.4)] hover:shadow-[0_0_50px_rgba(74,124,89,0.6)] hover:bg-[#5b986e] hover:text-white transition-all hover:-translate-y-1"
            >
              Elevar mi Marca Ahora
            </Link>
            
            <Link 
              href="/work/ecommerce-erp"
              className="mt-6 font-[family-name:var(--font-ibm-plex-mono)] text-sm tracking-widest text-[#7a9982] hover:text-[#4a7c59] transition-colors border-b border-transparent hover:border-[#4a7c59] pb-1"
            >
              SIGUIENTE PROYECTO: E-COMMERCE & ERP →
            </Link>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
