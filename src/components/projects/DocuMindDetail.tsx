"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

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
      <div ref={heroRef} className="relative w-full min-h-[50vh] overflow-hidden flex items-start pt-32 md:pt-40">
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
                  RAG Chatbot & Cover Letter Generator
                </span>
                <div className="h-[1px] w-12 bg-[#8A2BE2]"></div>
              </motion.div>
              
              <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 1, delay: 1 }}
                 className="mt-8"
              >
                 <a href="https://docu-mindai.vercel.app/" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-[#8A2BE2] text-white rounded-full font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-widest text-sm hover:bg-[#9370DB] transition-colors">
                   VER PROYECTO EN VIVO
                 </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#4B0082]/20 via-[#0B0C10]/80 to-[#0B0C10] mix-blend-multiply pointer-events-none"></div>
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
              <h4 className="text-[#DDA0DD] uppercase tracking-widest text-xs font-semibold">ARQUITECTURA</h4>
              <p className="text-white text-sm">Next.js 15, Google Gemini API, RAG (Retrieval-Augmented Generation), Supabase Auth, PDF Generation (jsPDF).</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-2"
            >
              <h4 className="text-[#DDA0DD] uppercase tracking-widest text-xs font-semibold">EL RETO</h4>
              <p className="text-white text-sm">Crear un Micro-SaaS completo en tiempo récord que demuestre habilidades avanzadas en Inteligencia Artificial (Vectorización y RAG) acopladas a un sistema seguro de autenticación.</p>
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
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-8 text-white uppercase">IA Aplicada a Gestión Documental Corporativa</h2>
              <p className="text-lg md:text-2xl text-[#C5C6C7] leading-relaxed mb-6">
                DocuMind AI es un producto SaaS B2B diseñado para resolver el problema de la extracción de información en grandes volúmenes de documentos corporativos. En lugar de utilizar motores de búsqueda tradicionales por palabras clave, la plataforma comprende el contexto de los documentos mediante procesamiento de lenguaje natural (NLP).
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="prose prose-invert max-w-none"
            >
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-6 text-[#DDA0DD] uppercase">Arquitectura y Flujo Técnico</h3>
              <ul className="text-[#C5C6C7] space-y-4">
                <li><strong className="text-white">Ingesta Paralelizada:</strong> Los documentos PDF son procesados en el servidor, fragmentados (chunking) de manera semántica y vectorizados mediante el modelo gemini-embedding-2.</li>
                <li><strong className="text-white">Vector Store (Búsqueda Semántica):</strong> Los embeddings se almacenan en PostgreSQL (Supabase) utilizando la extensión pgvector. Cuando un usuario consulta, el sistema realiza cálculos de similitud espacial para extraer únicamente los fragmentos más relevantes.</li>
                <li><strong className="text-white">Generación Confinada (Cero Alucinaciones):</strong> El contexto extraído se inyecta en el LLM (gemini-3.6-flash), forzando a la IA a responder estrictamente basándose en la información propietaria de la empresa y citando la página exacta de origen.</li>
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
                  <span className="ml-4 font-[family-name:var(--font-ibm-plex-mono)] text-xs text-[#DDA0DD]">Architecture Overview</span>
                </div>
                <div className="p-6 font-[family-name:var(--font-ibm-plex-mono)] text-sm md:text-base text-[#C5C6C7] flex flex-col gap-4 overflow-y-auto">
                  <div className="flex gap-2"><span className="text-[#8A2BE2]">Sec:</span> [Supabase Auth] JWT Token Validated.</div>
                  <div className="flex gap-2"><span className="text-[#8A2BE2]">Sec:</span> [Upstash Redis] Rate Limit Check: PASS (3/10 reqs).</div>
                  <div className="flex gap-2"><span className="text-yellow-400">RAG:</span> Extracting text from PDF upload...</div>
                  <div className="flex gap-2"><span className="text-yellow-400">RAG:</span> Chunking content & generating embeddings via Gemini...</div>
                  <div className="flex gap-2"><span className="text-green-400">DB:</span> Storing vectors in pgvector (PostgreSQL).</div>
                  <div className="flex gap-2"><span className="text-purple-400">AI:</span> Similarity search executed. Context injected into LLM.</div>
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
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-6 text-[#DDA0DD] uppercase">Seguridad y Rendimiento</h3>
              <ul className="text-[#C5C6C7] space-y-4">
                <li><strong className="text-white">Edge Rate Limiting:</strong> Implementación de Upstash Redis en el Middleware para proteger la API de Gemini contra abusos de cuota y ataques DDoS, manejando límites estrictos por usuario (Tenant).</li>
                <li><strong className="text-white">Aislamiento Criptográfico:</strong> Uso de Row Level Security (RLS) nativo en la base de datos, garantizando que los vectores y documentos de un usuario sean criptográficamente invisibles para otros.</li>
                <li><strong className="text-white">Health Score 100/100:</strong> Código altamente optimizado en Next.js 16 (App Router), con tipado estricto en TypeScript, prevención de re-renders innecesarios y animaciones aceleradas por GPU.</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
