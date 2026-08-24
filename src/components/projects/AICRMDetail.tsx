"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export function AICRMDetail() {
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
        className="fixed top-0 left-0 right-0 h-1 bg-[#45A29E] z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <div ref={heroRef} className="relative w-full min-h-[50vh] overflow-hidden flex items-start pt-32 md:pt-40">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative w-full px-6 md:px-12 z-10"
        >
          <div className="max-w-[1400px] mx-auto w-full relative h-full flex flex-col items-center justify-center pt-16 md:pt-0">
            <Link href="/#work" className="absolute top-0 left-0 md:-top-16 font-[family-name:var(--font-ibm-plex-mono)] text-caption font-semibold tracking-caption uppercase text-[#66FCF1] md:hover:text-white active:text-white transition-colors z-50 p-2 md:p-0">
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
                  AI-DRIVEN CRM
                </motion.h1>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="flex items-center gap-4"
              >
                <div className="h-[1px] w-12 bg-[#45A29E]"></div>
                <span className="font-[family-name:var(--font-ibm-plex-mono)] tracking-widest text-[#66FCF1] text-sm md:text-base uppercase">
                  TELEGRAM BOT & SUPABASE
                </span>
                <div className="h-[1px] w-12 bg-[#45A29E]"></div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#1F2833]/20 via-[#0B0C10]/80 to-[#0B0C10] mix-blend-multiply pointer-events-none"></div>
      </div>

      <div className="relative w-full px-6 md:px-12 pb-24 md:pb-40 z-20">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-12 md:gap-24">
          
          {/* Metadata Sidebar */}
          <div className="w-full md:w-1/4 shrink-0 flex flex-col gap-8 md:sticky top-32 self-start font-[family-name:var(--font-ibm-plex-mono)]">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-2"
            >
              <h4 className="text-[#66FCF1] uppercase tracking-widest text-xs font-semibold">ARQUITECTURA</h4>
              <p className="text-white text-sm">Next.js 15, Supabase (PostgreSQL), Telegram Bot API, Google Gemini 3.6 API, Vercel Serverless.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-2"
            >
              <h4 className="text-[#66FCF1] uppercase tracking-widest text-xs font-semibold">EL RETO</h4>
              <p className="text-white text-sm">Automatizar la gestión de clientes (CRM) permitiendo que un desarrollador actualice su base de datos, genere contratos en PDF y cambie estados mediante mensajes de voz y texto en Telegram usando Lenguaje Natural.</p>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4 flex flex-col gap-12 md:gap-24 font-[family-name:var(--font-die-grotesk-b)]">
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="prose prose-invert max-w-none"
            >
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-8 text-white uppercase">El Problema de los CRMs Tradicionales</h2>
              <p className="text-lg md:text-2xl text-[#C5C6C7] leading-relaxed mb-6">
                Llenar formularios es lento. Cuando un cliente acepta una propuesta, un desarrollador pierde tiempo entrando a un panel, creando el registro, generando un PDF y enviándolo por correo.
              </p>
              <p className="text-lg md:text-2xl text-[#C5C6C7] leading-relaxed">
                Este proyecto nació de la necesidad de <strong className="text-white">eliminar la fricción</strong> operativa mediante la Inteligencia Artificial.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full aspect-[4/3] md:aspect-video bg-[#1F2833] rounded-[16px] overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#45A29E]/20 p-8 flex items-center justify-center"
            >
              <div className="w-full h-full border border-[#45A29E]/30 rounded-lg bg-obsidian flex flex-col overflow-hidden">
                <div className="h-10 bg-[#1F2833] border-b border-[#45A29E]/30 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-4 font-[family-name:var(--font-ibm-plex-mono)] text-xs text-[#66FCF1]">EGO Bot - Telegram Webhook</span>
                </div>
                <div className="p-6 font-[family-name:var(--font-ibm-plex-mono)] text-sm md:text-base text-[#C5C6C7] flex flex-col gap-4 overflow-y-auto">
                  <div className="flex gap-2"><span className="text-[#45A29E]">User:</span> Registra un lead llamado Miguel Paz.</div>
                  <div className="flex gap-2"><span className="text-yellow-400">EGO:</span> ¿De qué trata el proyecto y cuál es el valor estimado?</div>
                  <div className="flex gap-2"><span className="text-[#45A29E]">User:</span> Es un CRM de 150 mil pesos.</div>
                  <div className="flex gap-2"><span className="text-green-400">Action:</span> {`{"action": "create_lead", "clientName": "Miguel Paz", "projectName": "CRM", "totalValue": 150000}`}</div>
                  <div className="flex gap-2"><span className="text-purple-400">System:</span> Lead insertado en PostgreSQL (Supabase) con éxito.</div>
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
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-8 text-white uppercase">Arquitectura y Serverless RAG</h2>
              <p className="text-lg md:text-2xl text-[#C5C6C7] leading-relaxed mb-6">
                Construí un webhook en Next.js App Router conectado a la API de Telegram. Cada mensaje se procesa a través de la API de <strong className="text-white">Google Gemini 3.6 Flash</strong>. 
              </p>
              <p className="text-lg md:text-2xl text-[#C5C6C7] leading-relaxed">
                A diferencia de los chatbots normales, diseñé un <strong className="text-white">sistema de memoria a corto plazo (Stateful Context)</strong> que le permite al LLM recordar la conversación. Además, el modelo está instruido con "Few-Shot Prompting" y reglas estrictas para invocar funciones JSON (Function Calling) conectadas directamente a Supabase.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
