"use client";

import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { videoUrl } from "@/data/media";
import { CaseStudyBrief } from "./CaseStudyBrief";
import { ProjectHeroGlow } from "./ProjectHeroGlow";

export function CatalogoDetail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="w-full min-h-screen flex flex-col relative bg-[#131c15] text-[#d6e0d8]">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#4a7c59] z-50 origin-left"
        style={{ scaleX }}
      />

      <div className="relative w-full min-h-[40vh] md:min-h-[50vh] overflow-hidden flex items-start pt-24 md:pt-40 border-b border-[#2b3a2e] z-20">
        <ProjectHeroGlow color="74, 124, 89" />
        <div className="relative w-full px-6 md:px-12 z-10">
          <div className="max-w-[1400px] mx-auto w-full relative h-full flex flex-col items-center justify-center pt-16 md:pt-0">
            <Link href="/#work" className="absolute top-0 left-0 md:-top-16 font-[family-name:var(--font-ibm-plex-mono)] text-caption font-semibold tracking-caption uppercase text-[#7a9982] md:hover:text-[#d6e0d8] active:text-[#d6e0d8] transition-colors z-50 p-2 md:p-0">
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
                  PARA MAYORISTAS
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

      <CaseStudyBrief
        accent="#7a9982"
        problem="Mostrar muchas referencias por fotos y mensajes sueltos hace difícil encontrar productos y preparar un pedido."
        solution="Un catálogo navegable con filtros, información centralizada y un camino directo para solicitar productos."
        outcome="Una experiencia de compra más clara para clientes y menos trabajo operativo para el equipo comercial."
      />

      <main className="w-full pt-16 pb-24 md:pt-20 md:pb-32 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-16 md:gap-32 font-[family-name:var(--font-die-grotesk-b)]">
          
          {/* Sidebar + Section 1 Layout */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-24 mb-0">

            {/* Mobile: pills horizontales */}
            <div className="flex flex-wrap gap-2 mb-4 md:hidden font-[family-name:var(--font-ibm-plex-mono)]">
              <span className="text-xs px-3 py-1.5 rounded-full border border-[#1a2a1e] text-[#7a9982]">Productos y filtros</span>
              <span className="text-xs px-3 py-1.5 rounded-full border border-[#1a2a1e] text-[#7a9982]">Carrito</span>
              <span className="text-xs px-3 py-1.5 rounded-full border border-[#1a2a1e] text-[#7a9982]">Pedido por WhatsApp</span>
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
                <h4 className="text-[#4a7c59] uppercase tracking-widest text-xs font-semibold">QUÉ INCLUYE</h4>
                <p className="text-[#d6e0d8] text-sm">Un catálogo con categorías y filtros, carrito de selección y envío del pedido por WhatsApp.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col gap-2"
              >
                <h4 className="text-[#4a7c59] uppercase tracking-widest text-xs font-semibold">EL RETO</h4>
                <p className="text-[#d6e0d8] text-sm">Permitir que el cliente encuentre referencias sin pedir fotos una por una y envíe su selección en un mensaje claro.</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col gap-2"
              >
                <h4 className="text-[#4a7c59] uppercase tracking-widest text-xs font-semibold">TIPO</h4>
                <p className="text-[#d6e0d8] text-sm">Catálogo desarrollado para una marca; los videos muestran su experiencia de compra.</p>
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
              <div className="flex items-center gap-4 text-[#4a7c59] font-[family-name:var(--font-ibm-plex-mono)] text-sm tracking-widest uppercase">
                <span>El proyecto</span>
                <span className="w-12 h-[1px] bg-[#4a7c59]"></span>
                <span>Esencias del Bosque</span>
              </div>
              
              <h2 className="text-[32px] md:text-[56px] leading-[1.1] uppercase text-[#d6e0d8] font-medium tracking-tight font-[family-name:var(--font-abc-gravity-variable)]">
                Del catálogo <br className="hidden md:block"/> al pedido por WhatsApp
              </h2>
              
              <div className="flex flex-col md:flex-row gap-12 md:gap-16 text-body-lg text-[#7a9982]">
                <div className="flex-1 flex flex-col gap-6">
                  <h3 className="text-[#4a7c59] font-medium text-xl uppercase font-[family-name:var(--font-abc-gravity-variable)] tracking-tight">El problema</h3>
                  <p>
                    Buscar una referencia en un PDF o entre muchas fotos puede tomar tiempo. Aquí el cliente filtra por categoría y precio, encuentra lo que le interesa y puede compartir un enlace que conserva esa selección de filtros.
                  </p>
                  <p>
                    Después añade los productos al carrito. Al terminar, el catálogo prepara un mensaje con las referencias elegidas para enviarlo por WhatsApp. <strong className="text-[#d6e0d8]">La solicitud se conversa y confirma allí; no es un pago en línea.</strong>
                  </p>
                </div>

                <div className="flex-1 flex flex-col gap-6">
                  <h3 className="text-[#4a7c59] font-medium text-xl uppercase font-[family-name:var(--font-abc-gravity-variable)] tracking-tight">Cómo funciona</h3>
                  <ul className="list-disc pl-5 flex flex-col gap-2 mt-2">
                    <li><strong>Filtros fáciles de compartir:</strong> al copiar el enlace, otra persona puede abrir el catálogo con la misma categoría y el mismo orden.</li>
                    <li><strong>Productos administrables:</strong> el equipo puede actualizar la información desde un panel; los visitantes solo ven el catálogo público.</li>
                    <li><strong>Selección conservada:</strong> los productos elegidos permanecen en el carrito mientras el cliente recorre la página.</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Caso de Exito: Esencias del Bosque */}
          <div className="w-full max-w-[800px] mx-auto mt-12 md:mt-12 px-6 md:px-0 text-center flex flex-col items-center">
             <h3 className="text-[28px] md:text-[40px] leading-tight text-[#d6e0d8] font-medium uppercase font-[family-name:var(--font-abc-gravity-variable)]">El catálogo de Esencias del Bosque</h3>
             <p className="text-[#7a9982] mt-2 mb-6 max-w-[600px] text-body-lg">
               Una vitrina digital para una marca de cosmética artesanal y aromaterapia. Reúne los productos en un lugar fácil de explorar y prepara la selección del cliente para continuar el pedido por WhatsApp.
             </p>
          </div>

          {/* Desktop Video Showcase with Social Proof */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full aspect-video bg-[#1a261d] rounded-[24px] md:rounded-[40px] border border-[#4a7c59]/20 shadow-[0_0_60px_rgba(74,124,89,0.1)] overflow-hidden flex items-center justify-center relative group"
          >
             <video 
               src={videoUrl("catalogo.mp4")}
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
                <div className="min-w-8 h-8 px-2 md:min-w-10 md:h-10 rounded-full bg-[#4a7c59]/20 flex items-center justify-center text-[#4a7c59] font-bold text-sm md:text-base">
                  Fácil
                </div>
                <div className="flex flex-col font-[family-name:var(--font-ibm-plex-mono)]">
                  <span className="text-[9px] md:text-xs text-[#7a9982] uppercase tracking-wider">Catálogo</span>
                  <span className="text-xs md:text-base text-[#d6e0d8] font-bold">Encuentra tus productos</span>
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
                   src={videoUrl("ecommerce-mobile.mp4")}
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
                Fácil de usar en el celular
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-body-lg text-[#7a9982]"
              >
                El cliente puede explorar el catálogo y preparar su pedido desde el teléfono sin instalar una aplicación:
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
                  <p className="text-[#7a9982] text-sm">Los nombres, precios y descripciones se adaptan al tamaño de la pantalla.</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="p-5 border border-[#4a7c59]/30 bg-[#1a261d]/50 rounded-2xl"
                >
                  <h4 className="text-[#d6e0d8] font-bold mb-1">2. Botones para Pulgares</h4>
                  <p className="text-[#7a9982] text-sm">La navegación y las acciones principales quedan cómodas para usar con una mano.</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="p-5 border border-[#4a7c59]/30 bg-[#1a261d]/50 rounded-2xl"
                >
                  <h4 className="text-[#d6e0d8] font-bold mb-1">3. Distribución Inteligente</h4>
                  <p className="text-[#7a9982] text-sm">Los productos se ordenan en vertical para que se puedan revisar sin desplazarse hacia los lados.</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="p-5 border border-[#4a7c59]/30 bg-[#1a261d]/50 rounded-2xl"
                >
                  <h4 className="text-[#d6e0d8] font-bold mb-1">4. Animaciones Inmersivas</h4>
                  <p className="text-[#7a9982] text-sm">Las imágenes acompañan el recorrido sin quitarle protagonismo a la información del producto.</p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Invitation CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full mt-12 bg-gradient-to-br from-[#1a261d] to-[#131c15] border border-[#4a7c59]/40 rounded-3xl px-6 py-12 md:p-24 flex flex-col items-center text-center gap-8 shadow-[0_0_80px_rgba(74,124,89,0.15)]"
          >
            <h2 className="text-[40px] md:text-[64px] leading-[1.0] font-medium tracking-tight font-[family-name:var(--font-abc-gravity-variable)] text-[#d6e0d8] uppercase">
              Eleva el prestigio <br /> <span className="text-[#4a7c59]">de tu catálogo.</span>
            </h2>
            <p className="text-body-lg text-[#7a9982] max-w-[600px]">
              Podemos organizar tus productos en un catálogo que sea fácil de explorar y te ayude a recibir solicitudes más claras.
            </p>
            <Link 
              href="/#contact"
              className="mt-4 bg-[#4a7c59] text-[#131c15] font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-widest px-10 py-5 rounded-full font-bold shadow-[0_0_30px_rgba(74,124,89,0.4)] md:hover:shadow-[0_0_50px_rgba(74,124,89,0.6)] md:hover:bg-[#5b986e] active:bg-[#5b986e] md:hover:text-white active:text-white transition-all md:hover:-translate-y-1 active:scale-95"
            >
              Elevar mi Marca Ahora
            </Link>
            
            <Link 
              href="/work/ecommerce-erp"
              className="mt-6 font-[family-name:var(--font-ibm-plex-mono)] text-sm tracking-widest text-[#7a9982] md:hover:text-[#4a7c59] active:text-[#4a7c59] transition-colors border-b border-transparent md:hover:border-[#4a7c59] active:border-[#4a7c59] pb-1 p-2 md:p-0"
            >
              VER TAMBIÉN: LA TIENDA VIRTUAL DOHA →
            </Link>
          </motion.div>

        </div>
      </main>
    </div>
  );
}


