"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ClientProjectDetail({ slug }: { slug: string }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="w-full flex flex-col relative">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-ember z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Dark Header with Parallax */}
      <div ref={heroRef} className="relative w-full min-h-[80vh] overflow-hidden bg-obsidian text-bone">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 flex flex-col justify-end pb-12 pt-32 px-6 z-10"
        >
          <div className="max-w-[1200px] mx-auto w-full">
            <Link href="/#work" className="font-[family-name:var(--font-ibm-plex-mono)] text-caption font-semibold tracking-caption uppercase text-slate hover:text-fog transition-colors mb-12 block">
              ← REGRESAR AL HUB
            </Link>
            
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-heading-lg md:text-[120px] leading-[0.8] tracking-[-3px] font-medium uppercase text-fog font-[family-name:var(--font-abc-gravity-variable)] mb-12 mix-blend-difference"
            >
              {slug.replace(/-/g, " ")}
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex flex-col sm:flex-row gap-6 sm:gap-12 font-[family-name:var(--font-ibm-plex-mono)] text-label font-medium tracking-label uppercase text-slate border-t border-graphite pt-6"
            >
              <div className="flex flex-col gap-2">
                <span className="text-graphite">ROLE</span>
                <span>LEAD ENGINEER</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-graphite">STACK</span>
                <span>NEXT.JS, SUPABASE</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-graphite">STATUS</span>
                <span className="text-tangerine bg-tangerine/10 px-2 py-1 rounded-[14.4px] w-max">DEPLOYED</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
        {/* Parallax Background Image Placeholder */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 bg-graphite opacity-30 mix-blend-multiply z-0"></motion.div>
      </div>

      {/* Light Body */}
      <main className="relative z-20 w-full bg-bone text-graphite py-24 px-6 flex-1 shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
        <article className="max-w-[800px] mx-auto flex flex-col gap-24 font-[family-name:var(--font-die-grotesk-b)]">
          <SectionBlock 
            title="EL PROBLEMA TÉCNICO" 
            text="Durante el desarrollo de esta plataforma, nos enfrentamos a desafíos críticos de concurrencia y orquestación de datos. Manejar transacciones complejas en tiempo real requería un diseño de base de datos estricto y un middleware capaz de revertir operaciones si la pasarela de pagos fallaba en el último milisegundo."
          />

          <SectionBlock 
            title="LA SOLUCIÓN ARQUITECTÓNICA" 
            text="Implementamos un patrón de transacciones distribuidas y utilizamos TanStack Query para prefetch y revalidación optimista en el cliente. En el backend, PostgreSQL mediante Supabase nos permitió escribir triggers a nivel de fila (RLS) para garantizar la atomicidad de cada orden, previniendo los ataques de doble gasto o el doble descuento de inventario."
          />

          <SectionBlock 
            title="EL IMPACTO" 
            text="Reducción del 100% en discrepancias de inventario durante picos de tráfico. El sistema ahora procesa miles de órdenes concurrentes con una latencia p99 de menos de 120ms, asegurando la escalabilidad financiera."
          />
        </article>
      </main>
    </div>
  );
}

function SectionBlock({ title, text }: { title: string; text: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h2 className="text-subheading leading-subheading tracking-subheading font-medium uppercase mb-6 text-ember">{title}</h2>
      <p className="text-body-lg leading-body-lg tracking-body-lg text-slate">
        {text}
      </p>
    </motion.section>
  );
}
