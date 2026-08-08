"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function EcommerceDetail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const headerScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <div className="w-full flex flex-col relative bg-[#151310] text-[#e8e4db]">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#c5a67c] z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Header */}
      <div ref={containerRef} className="relative w-full min-h-[50vh] overflow-hidden flex items-start pt-32 md:pt-40 border-b border-[#2a261a] z-20">
        <div className="relative w-full px-6 md:px-12 z-10">
          <div className="max-w-[1400px] mx-auto w-full relative h-full flex flex-col items-center justify-center pt-16 md:pt-0">
            <Link href="/#work" className="absolute top-0 left-0 md:-top-16 font-[family-name:var(--font-ibm-plex-mono)] text-caption font-semibold tracking-caption uppercase text-[#a39481] hover:text-[#e8e4db] transition-colors z-50">
              ← REGRESAR AL HUB
            </Link>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute top-0 right-0 md:-top-16 hidden md:flex flex-col items-end gap-1 font-[family-name:var(--font-ibm-plex-mono)] text-sm tracking-widest text-[#a39481]"
            >
              <span>PROYECTO //</span>
              <span className="text-[#c5a67c]">03</span>
            </motion.div>

            <div className="flex flex-col items-center justify-center">
              <div className="overflow-hidden mb-2 md:mb-4">
                <motion.h1 
                  initial={{ rotate: 5, y: 100, opacity: 0 }}
                  animate={{ rotate: 0, y: 0, opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[48px] md:text-[80px] leading-[0.9] tracking-[-1px] md:tracking-[-2px] font-medium uppercase font-[family-name:var(--font-abc-gravity-variable)] text-center text-[#e8e4db]"
                >
                  E-COMMERCE
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1 
                  initial={{ rotate: -5, y: 100, opacity: 0 }}
                  animate={{ rotate: 0, y: 0, opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="text-[40px] md:text-[64px] leading-[0.9] tracking-[-1px] font-medium uppercase text-[#c5a67c] font-[family-name:var(--font-abc-gravity-variable)] text-center"
                >
                  & ERP
                </motion.h1>
              </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="flex flex-col items-center gap-3 text-[#a39481] z-20 pointer-events-none mt-16"
            >
              <span className="font-[family-name:var(--font-ibm-plex-mono)] text-xs tracking-[0.2em] uppercase">Descubre Más</span>
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-[1px] h-12 bg-gradient-to-b from-[#c5a67c] to-transparent"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <main className="w-full pt-16 pb-24 md:pt-20 md:pb-32 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-32 font-[family-name:var(--font-die-grotesk-b)]">
          
          {/* SECTION 1: Desktop Video & Case Study */}
          <div className="flex flex-col gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-8 max-w-[1000px]"
            >
              <div className="flex items-center gap-4 text-[#c5a67c] font-[family-name:var(--font-ibm-plex-mono)] text-sm tracking-widest uppercase">
                <span>Ecosistema Digital</span>
                <span className="w-12 h-[1px] bg-[#c5a67c]"></span>
                <span>Fase 1</span>
              </div>
              <h2 className="text-[32px] md:text-[56px] leading-[1.1] uppercase text-[#e8e4db] font-medium tracking-tight font-[family-name:var(--font-abc-gravity-variable)]">
                E-Commerce: Diseñado <br className="hidden md:block"/> para Convertir
              </h2>
              <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-body-lg text-[#a39481]">
                <p className="flex-1">
                  Tu escaparate virtual debe ser tan impresionante como tu tienda física. No estamos hablando de una simple página web, sino de un motor construido para capturar ventas de forma rápida y visualmente deslumbrante. El cliente no solo compra un producto, compra un estatus.
                </p>
                <div className="flex-1 flex flex-col gap-4">
                  <strong className="text-[#e8e4db]">El Ecosistema de Conversión:</strong>
                  <ul className="flex flex-col gap-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#c5a67c] mt-1 text-sm">✦</span> 
                      <span><strong>Estética de Lujo (Premium UI):</strong> Colores curados, animaciones sutiles y transiciones fluidas que elevan la percepción de tu marca.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#c5a67c] mt-1 text-sm">✦</span> 
                      <span><strong>Checkout Ultrarrápido:</strong> Proceso de pago sin fricciones con pasarela integrada para procesar Tarjetas de Crédito y Transferencias Bancarias al instante.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#c5a67c] mt-1 text-sm">✦</span> 
                      <span><strong>Portal Mayorista Dual:</strong> Clientes regulares ven retail; mayoristas autenticados acceden a su propio catálogo de precios y descuentos.</span>
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
              className="w-full aspect-video bg-[#1a1815] rounded-[24px] md:rounded-[40px] border border-[#c5a67c]/20 shadow-[0_0_60px_rgba(197,166,124,0.1)] overflow-hidden flex items-center justify-center relative group"
            >
               <video 
                 src="/videos/Ecommerce-doha-desk.mp4" 
                 autoPlay loop muted playsInline 
                 className="w-full h-full object-cover" 
               />
               
               {/* Social Proof Metric */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-[#151310]/80 backdrop-blur-md border border-[#c5a67c]/30 rounded-xl md:rounded-2xl p-2 md:p-4 flex items-center gap-2 md:gap-4 drop-shadow-2xl scale-90 md:scale-100 origin-bottom-right"
               >
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#c5a67c]/20 flex items-center justify-center text-[#c5a67c] font-bold text-sm md:text-lg">
                    $
                  </div>
                  <div className="flex flex-col font-[family-name:var(--font-ibm-plex-mono)]">
                    <span className="text-[9px] md:text-xs text-[#a39481] uppercase tracking-wider">Tasa de Conversión</span>
                    <span className="text-xs md:text-base text-[#e8e4db] font-bold">+200% Incremento</span>
                  </div>
               </motion.div>
            </motion.div>
          </div>

          {/* SECTION 2: Mobile App Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center max-w-[1000px] mx-auto pt-16 border-t border-[#2a261a]">
            <div className="order-2 md:order-1 flex flex-col justify-center gap-6">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-[32px] md:text-[48px] leading-[1.0] tracking-[-1.5px] uppercase text-[#c5a67c] font-medium font-[family-name:var(--font-abc-gravity-variable)]"
              >
                Mobile-First: <br/> Siente que tienes <br/> una App Nativa
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-body-lg text-[#a39481]"
              >
                Hoy en día, el <strong>80% del tráfico de compras</strong> proviene de teléfonos. Por eso, no hicimos una web que "se adapta" a móviles; construimos una experiencia nativa desde cero. Eliminamos los menús torpes e incorporamos navegación fluida idéntica a usar Instagram o WhatsApp.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-6 border border-[#c5a67c]/30 bg-[#1a1815] rounded-2xl mt-4 shadow-[0_0_30px_rgba(197,166,124,0.05)]"
              >
                <h3 className="text-[#c5a67c] font-medium text-xl uppercase mb-3 font-[family-name:var(--font-abc-gravity-variable)] tracking-tight">Cero Descargas, Fricción Cero</h3>
                <p className="text-[#a39481] text-base leading-relaxed">
                  Los usuarios odian ir a la App Store y gastar memoria. Nuestra tecnología permite que, desde el navegador del celular, la tienda reaccione a la misma velocidad que una app instalada, con botones diseñados para los pulgares y teclados numéricos automáticos al pagar.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2 flex justify-center w-full"
            >
              <div className="w-full max-w-[360px] relative drop-shadow-[0_0_40px_rgba(197,166,124,0.3)] flex items-center justify-center mx-auto rounded-[40px] overflow-hidden border-[6px] md:border-[8px] border-[#1a1815] bg-[#151310]">
                 <video 
                   src="/videos/Doha-mobil.mp4" 
                   autoPlay loop muted playsInline 
                   className="w-full h-auto rounded-[32px]" 
                 />
              </div>
            </motion.div>
          </div>

          {/* SECTION 3: ERP System */}
          <div className="flex flex-col gap-12 pt-16 border-t border-[#2a261a]">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center max-w-[800px] mx-auto gap-6"
            >
              <h2 className="text-[32px] md:text-[56px] leading-[1.1] uppercase text-[#e8e4db] font-medium tracking-tight font-[family-name:var(--font-abc-gravity-variable)]">
                El ERP: Control Absoluto <br/> en Tiempo Real
              </h2>
              <p className="text-body-lg text-[#a39481]">
                Detrás de una gran vitrina hay un motor industrial. Mientras el E-Commerce vende, el ERP (Enterprise Resource Planning) administra cada centavo y cada producto sin cálculos manuales.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-8 w-full max-w-[1000px]">
                <div className="bg-[#1a1815] p-6 rounded-2xl border border-[#c5a67c]/10">
                  <h4 className="text-[#c5a67c] font-bold mb-2">Inventario Blindado</h4>
                  <p className="text-[#a39481] text-sm">El Kardex descuenta stock automáticamente con cada venta o devolución física/digital. Cero descuadres.</p>
                </div>
                <div className="bg-[#1a1815] p-6 rounded-2xl border border-[#c5a67c]/10">
                  <h4 className="text-[#c5a67c] font-bold mb-2">Motor Contable</h4>
                  <p className="text-[#a39481] text-sm">Cada movimiento dispara asientos contables hacia el Libro Mayor usando el PUC. Olvídate de los cierres manuales.</p>
                </div>
                <div className="bg-[#1a1815] p-6 rounded-2xl border border-[#c5a67c]/10">
                  <h4 className="text-[#c5a67c] font-bold mb-2">Reportes al Instante</h4>
                  <p className="text-[#a39481] text-sm">Genera tu Estado de Resultados o Balance General con Utilidad Neta/Bruta en un solo clic.</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="w-full bg-[#1a1815] rounded-[24px] md:rounded-[40px] border border-[#c5a67c]/20 shadow-[0_0_60px_rgba(197,166,124,0.15)] overflow-hidden flex items-center justify-center relative"
            >
               <video 
                 src="/videos/ERP-Doha.mp4" 
                 autoPlay loop muted playsInline 
                 className="w-full h-auto" 
               />
            </motion.div>
          </div>

          {/* SECTION 4: Architecture Conclusion */}
          <div className="pt-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#c5a67c]/10 to-[#1a1815] border border-[#c5a67c]/30 rounded-3xl p-8 md:p-12 text-center max-w-[900px] mx-auto"
            >
              <h3 className="text-[24px] md:text-[32px] uppercase text-[#e8e4db] font-medium tracking-tight font-[family-name:var(--font-abc-gravity-variable)] mb-4">
                🛡️ Arquitectura de Clase Mundial
              </h3>
              <p className="text-body-lg text-[#a39481] mb-8">
                Todo esto corre sobre la misma tecnología que utilizan las empresas más grandes del mundo: servidores ultrarrápidos en la nube con <strong>seguridad de nivel bancario</strong> para cifrar los datos de extremo a extremo.
              </p>
              <div className="inline-block bg-[#1a1815] border border-[#c5a67c] text-[#c5a67c] px-6 py-4 rounded-full font-[family-name:var(--font-ibm-plex-mono)] tracking-wider text-sm">
                MENOS TRABAJO MANUAL, MÁS VENTAS CERRADAS
              </div>
            </motion.div>
          </div>

          {/* Invitation CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full mt-4 bg-gradient-to-br from-[#1a1815] to-[#151310] border border-[#c5a67c]/40 rounded-3xl p-12 md:p-24 flex flex-col items-center text-center gap-8 shadow-[0_0_80px_rgba(197,166,124,0.15)]"
          >
            <h2 className="text-[40px] md:text-[64px] leading-[1.0] font-medium tracking-tight font-[family-name:var(--font-abc-gravity-variable)] text-[#e8e4db] uppercase">
              Digitaliza tu <br /> <span className="text-[#c5a67c]">operación completa.</span>
            </h2>
            <p className="text-body-lg text-[#a39481] max-w-[600px]">
              Desde una vitrina virtual de lujo hasta un sistema contable que trabaja solo. Construyamos la infraestructura digital que tu empresa necesita para escalar.
            </p>
            <Link 
              href="/#contact"
              className="mt-4 bg-[#c5a67c] text-[#151310] font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-widest px-10 py-5 rounded-full font-bold shadow-[0_0_30px_rgba(197,166,124,0.4)] hover:shadow-[0_0_50px_rgba(197,166,124,0.6)] hover:bg-[#d4b995] hover:text-[#151310] transition-all hover:-translate-y-1"
            >
              Cotizar mi Ecosistema
            </Link>
            
            <Link 
              href="/#work"
              className="mt-6 font-[family-name:var(--font-ibm-plex-mono)] text-sm tracking-widest text-[#a39481] hover:text-[#c5a67c] transition-colors border-b border-transparent hover:border-[#c5a67c] pb-1"
            >
              VOLVER AL HUB DE PROYECTOS →
            </Link>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
