"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export function EcommerceDetail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const headerScale = useTransform(heroProgress, [0, 1], [1, 1.2]);

  // Global page scroll for the progress bar
  const { scrollYProgress: globalProgress } = useScroll();
  const scaleX = useSpring(globalProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="w-full flex flex-col relative bg-[#151310] text-[#e8e4db]">
      {/* Global Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#c5a67c] z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Hero Header */}
      <div ref={containerRef} className="relative w-full min-h-[40vh] md:min-h-[50vh] overflow-hidden flex items-start pt-24 md:pt-40 border-b border-[#2a261a] z-20">
        <div className="relative w-full px-6 md:px-12 z-10">
          <div className="max-w-[1400px] mx-auto w-full relative h-full flex flex-col items-center justify-center pt-16 md:pt-0">
            <Link href="/#work" className="absolute top-0 left-0 md:-top-16 font-[family-name:var(--font-ibm-plex-mono)] text-caption font-semibold tracking-caption uppercase text-[#a39481] md:hover:text-[#e8e4db] active:text-[#e8e4db] transition-colors z-50 p-2 md:p-0">
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
                  & ERP DASHBOARD
                </motion.h1>
              </div>

              {/* Subtitle técnico */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mt-6 text-[#a39481] font-[family-name:var(--font-ibm-plex-mono)] text-sm tracking-widest uppercase text-center"
              >
                Full-Stack Platform · Dual Auth · Real-time Inventory · Payment Gateway
              </motion.p>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="flex flex-col items-center gap-3 text-[#a39481] z-20 pointer-events-none mt-12"
            >
              <span className="font-[family-name:var(--font-ibm-plex-mono)] text-xs tracking-[0.2em] uppercase">Explorar Arquitectura</span>
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
        <div className="max-w-[1200px] mx-auto flex flex-col gap-16 md:gap-32 font-[family-name:var(--font-die-grotesk-b)]">
          
          {/* Sidebar + Main Layout */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">

            {/* Mobile: pills horizontales */}
            <div className="flex flex-wrap gap-2 mb-4 md:hidden font-[family-name:var(--font-ibm-plex-mono)]">
              <span className="text-xs px-3 py-1.5 rounded-full border border-[#2a261a] text-[#a39481]">Next.js 15</span>
              <span className="text-xs px-3 py-1.5 rounded-full border border-[#2a261a] text-[#a39481]">Node.js</span>
              <span className="text-xs px-3 py-1.5 rounded-full border border-[#2a261a] text-[#a39481]">PostgreSQL</span>
              <span className="text-xs px-3 py-1.5 rounded-full border border-[#2a261a] text-[#a39481]">Supabase Auth</span>
              <span className="text-xs px-3 py-1.5 rounded-full border border-[#2a261a] text-[#a39481]">Zustand</span>
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
                <h4 className="text-[#c5a67c] uppercase tracking-widest text-xs font-semibold">STACK TÉCNICO</h4>
                <p className="text-[#e8e4db] text-sm">Next.js 15 (App Router), Node.js, PostgreSQL, Supabase Auth (RBAC), Zustand, Tailwind CSS, pasarela de pagos integrada.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col gap-2"
              >
                <h4 className="text-[#c5a67c] uppercase tracking-widest text-xs font-semibold">EL RETO</h4>
                <p className="text-[#e8e4db] text-sm">Construir un sistema dual: un e-commerce de alto rendimiento para usuarios finales y un ERP interno para administradores, compartiendo la misma base de datos con control de acceso por roles (RBAC) y sincronización de inventario en tiempo real.</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col gap-2"
              >
                <h4 className="text-[#c5a67c] uppercase tracking-widest text-xs font-semibold">TIPO</h4>
                <p className="text-[#e8e4db] text-sm">Proyecto B2B para cliente real. Plataforma en producción activa.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-2"
              >
                <div className="flex flex-col gap-3">
                  <a href="https://github.com/2001mapa" target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 border border-[#c5a67c]/30 text-[#a39481] rounded-full font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-widest text-xs hover:border-[#c5a67c] hover:text-[#c5a67c] transition-colors text-center">
                    {'{ '} Repo Privado {' }'}
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Main Content */}
            <div className="w-full md:w-3/4 flex flex-col gap-16 font-[family-name:var(--font-die-grotesk-b)]">
              
              {/* Métricas de impacto */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-3"
              >
                {[
                  { value: '+200%', label: 'Incremento en Conversión' },
                  { value: '99', label: 'Lighthouse Score' },
                  { value: '3x', label: 'Reducción en Gestión de Inventario' },
                ].map((m) => (
                  <div key={m.label} className="p-4 md:p-6 border border-[#2a261a] rounded-xl bg-[#1a1815] flex flex-col gap-1">
                    <span className="text-3xl md:text-4xl font-medium text-[#c5a67c] font-[family-name:var(--font-die-grotesk-b)]">{m.value}</span>
                    <span className="text-[10px] text-[#e8e4db]/50 font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-wider">{m.label}</span>
                  </div>
                ))}
              </motion.div>

              {/* Arquitectura del Sistema */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col gap-8 max-w-[1000px]"
              >
                <div className="flex items-center gap-4 text-[#c5a67c] font-[family-name:var(--font-ibm-plex-mono)] text-sm tracking-widest uppercase">
                  <span>Arquitectura del Sistema</span>
                  <span className="w-12 h-[1px] bg-[#c5a67c]"></span>
                  <span>Full-Stack Platform</span>
                </div>
                <h2 className="text-[32px] md:text-[56px] leading-[1.1] uppercase text-[#e8e4db] font-medium tracking-tight font-[family-name:var(--font-abc-gravity-variable)]">
                  Dos Sistemas,<br className="hidden md:block"/> Una Sola Arquitectura
                </h2>
                <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-body-lg text-[#a39481]">
                  <p className="flex-1">
                    La plataforma unifica un e-commerce de cara al público y un ERP interno para el equipo de operaciones en la misma base de código. El estado del carrito de compras es manejado globalmente con <strong className="text-[#e8e4db]">Zustand</strong>, con persistencia en localStorage y revalidación automática de stock mediante <strong className="text-[#e8e4db]">Next.js Server Actions</strong>.
                  </p>
                  <div className="flex-1 flex flex-col gap-4">
                    <strong className="text-[#e8e4db]">Decisiones de Ingeniería Clave:</strong>
                    <ul className="flex flex-col gap-3">
                      <li className="flex items-start gap-3">
                        <span className="text-[#c5a67c] mt-1 text-sm">✦</span> 
                        <span><strong>Control de Acceso (RBAC):</strong> Supabase Auth maneja dos roles diferenciados: compradores regulares y administradores mayoristas, con Row Level Security (RLS) en PostgreSQL para aislar los datos.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#c5a67c] mt-1 text-sm">✦</span> 
                        <span><strong>Checkout Integrado:</strong> Pasarela de pagos con webhooks para actualizar el estado de la orden en tiempo real sin polling al servidor.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#c5a67c] mt-1 text-sm">✦</span> 
                        <span><strong>Portal Mayorista Dual:</strong> Clientes regulares ven precios de retail; administradores autenticados acceden a un catálogo de descuentos con SKUs y reportes de inventario.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Desktop Video Showcase */}
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
              </motion.div>

              {/* SECTION 2: Mobile App Experience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center max-w-[1000px] mx-auto pt-16 border-t border-[#2a261a]">
                <div className="order-2 md:order-1 flex flex-col justify-center gap-6">
                  <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-[32px] md:text-[48px] leading-[1.0] tracking-[-1.5px] uppercase text-[#c5a67c] font-medium font-[family-name:var(--font-abc-gravity-variable)]"
                  >
                    Mobile-First: <br/> Experiencia Nativa
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-body-lg text-[#a39481]"
                  >
                    La experiencia mobile es tratada como una aplicación nativa, no como una vista reducida del desktop. Las animaciones están implementadas con <strong className="text-[#e8e4db]">transform</strong> y <strong className="text-[#e8e4db]">opacity</strong> exclusivamente, evitando reflows del DOM y manteniendo 60fps constantes en dispositivos de gama media. El gestor de estado del carrito persiste entre rutas usando Zustand con middleware de hidratación.
                  </motion.p>
                </div>
                <div className="order-1 md:order-2 flex items-center justify-center">
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative w-[240px] h-[480px] md:w-[280px] md:h-[560px] bg-[#1a1815] rounded-[40px] border border-[#c5a67c]/30 overflow-hidden shadow-[0_0_40px_rgba(197,166,124,0.15)]"
                  >
                    <video 
                      src="/videos/Doha-mobil.mp4" 
                      autoPlay loop muted playsInline 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
              </div>

              {/* SECTION 3: ERP Dashboard */}
              <div className="flex flex-col gap-12 pt-16 border-t border-[#2a261a]">
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col gap-6 max-w-[600px]"
                >
                  <div className="flex items-center gap-4 text-[#c5a67c] font-[family-name:var(--font-ibm-plex-mono)] text-sm tracking-widest uppercase">
                    <span>Módulo 2</span>
                    <span className="w-12 h-[1px] bg-[#c5a67c]"></span>
                    <span>Panel de Control ERP</span>
                  </div>
                  <h2 className="text-[28px] md:text-[48px] leading-[1.1] uppercase text-[#e8e4db] font-medium tracking-tight font-[family-name:var(--font-abc-gravity-variable)]">
                    ERP Custom: <br className="hidden md:block"/> Inventario & Finanzas
                  </h2>
                  <p className="text-body-lg text-[#a39481]">
                    El panel de administración es una SPA (Single Page Application) construida con componentes de datos reactivos. Las transacciones de inventario son operaciones ACID sobre PostgreSQL para garantizar consistencia en pedidos concurrentes. El dashboard incluye reportes de ventas en tiempo real, gestión de SKUs y exportación de datos.
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="w-full aspect-video bg-[#1a1815] rounded-[24px] md:rounded-[40px] border border-[#c5a67c]/20 overflow-hidden"
                >
                  <video 
                    src="/videos/ERP-Doha.mp4" 
                    autoPlay loop muted playsInline 
                    className="w-full h-full object-cover" 
                  />
                </motion.div>
              </div>

              {/* CTA Final */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full mt-4 bg-gradient-to-br from-[#1a1815] to-[#151310] border border-[#c5a67c]/40 rounded-3xl px-6 py-12 md:p-24 flex flex-col items-center text-center gap-8 shadow-[0_0_80px_rgba(197,166,124,0.15)]"
              >
                <h2 className="text-3xl md:text-[40px] font-medium tracking-tight font-[family-name:var(--font-abc-gravity-variable)] text-[#e8e4db] uppercase">
                  ¿Tienes un proyecto de <br/><span className="text-[#c5a67c]">arquitectura similar?</span>
                </h2>
                <p className="text-body-lg text-[#a39481] max-w-[500px]">
                  Estoy disponible para roles de Fullstack Engineer o Product Engineer donde pueda construir sistemas de este nivel de complejidad.
                </p>
                <Link 
                  href="/#contact"
                  className="mt-2 bg-[#c5a67c] text-[#151310] font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-widest px-10 py-5 rounded-full font-bold shadow-[0_0_30px_rgba(197,166,124,0.4)] md:hover:shadow-[0_0_50px_rgba(197,166,124,0.6)] md:hover:bg-[#d4b995] active:bg-[#d4b995] transition-all md:hover:-translate-y-1 active:scale-95"
                >
                  Hablemos
                </Link>
                
                <Link 
                  href="/#work"
                  className="mt-2 font-[family-name:var(--font-ibm-plex-mono)] text-sm tracking-widest text-[#a39481] md:hover:text-[#c5a67c] active:text-[#c5a67c] transition-colors border-b border-transparent md:hover:border-[#c5a67c] active:border-[#c5a67c] pb-1 p-2 md:p-0"
                >
                  ← Ver más proyectos
                </Link>
              </motion.div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
