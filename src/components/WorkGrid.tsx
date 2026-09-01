"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

type Project = {
  slug: string;
  title: string;
  type: string;
  color: string;
  video: string;
  stack: string[];
  status: 'live' | 'wip' | 'personal';
};

const projects: Project[] = [
  { 
    slug: "docu-mind", 
    title: "DOCUMIND AI", 
    type: "RAG / MICRO-SAAS / FULLSTACK AI",
    color: "from-[#4B0082]", // Indigo/Deep Purple
    video: "/videos/documind.mp4",
    stack: ["Next.js 16", "Supabase", "pgvector", "Gemini"],
    status: "live"
  },
  { 
    slug: "orbit-kanban", 
    title: "ORBIT KANBAN", 
    type: "WEBSOCKETS / STATE MANAGEMENT",
    color: "from-[#0F52BA]", // Sapphire Blue
    video: "/videos/orbit-kanban.mp4",
    stack: ["Next.js 15", "Supabase Realtime", "LexoRank", "React Query"],
    status: "live"
  },
  { 
    slug: "ecommerce-erp", 
    title: "E-COMMERCE & ERP", 
    type: "FULLSTACK E-COMMERCE",
    color: "from-[#1A3A1A]", // Dark Green
    video: "/videos/Ecommerce-doha-desk.mp4",
    stack: ["Next.js", "Node.js", "PostgreSQL"],
    status: "live"
  },
  { 
    slug: "linktree", 
    title: "LINKTREE PRO", 
    type: "FULLSTACK / SAAS CLONE",
    color: "from-[#1A1A26]", // Dark Blue
    video: "/videos/Stylo-Escritorio.mp4",
    stack: ["Next.js", "Vercel", "Tailwind"],
    status: "live"
  },
  { 
    slug: "landing-page", 
    title: "LANDING ALTA PERFORMANCE", 
    type: "FRONTEND / CRO",
    color: "from-[#1A1A1A]", // Dark
    video: "/videos/landing-page.mp4",
    stack: ["Next.js", "Lighthouse 100"],
    status: "live"
  },
  { 
    slug: "catalogo", 
    title: "CATÁLOGO DIGITAL", 
    type: "B2B / CLIENT PROJECT",
    color: "from-[#1A1A26]", // Dark Blue
    video: "/videos/catalogo.mp4",
    stack: ["Next.js", "Supabase", "Vercel"],
    status: "live"
  },
  { 
    slug: "laboratorio", 
    title: "LABORATORIO & EXPERIMENTOS", 
    type: "AI EXPERIMENTS",
    color: "from-[#261A1A]", // Dark Red/Brown
    video: "",
    stack: ["OpenAI", "Gemini", "Node.js"],
    status: "wip"
  }
];

function getBentoColSpan(index: number): string {
  const pattern = [
    'md:col-span-2', // grande
    'md:col-span-1', // pequeña
    'md:col-span-1', // pequeña
    'md:col-span-2', // grande
    'md:col-span-3', // full width
    'md:col-span-2', // grande
    'md:col-span-1', // pequeña
  ];
  return pattern[index % pattern.length];
}

function ProjectCard({ project, index, colSpan }: { project: Project; index: number; colSpan: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isLab = project.slug === "laboratorio";
  const Wrapper = isLab ? "div" : Link;
  const wrapperProps = isLab ? {} : { href: `/work/${project.slug}` };

  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && window.matchMedia("(max-width: 768px)").matches) {
            videoRef.current?.play().catch(()=>{});
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className={`${colSpan} w-full md:h-full h-auto aspect-[4/3] md:aspect-auto flex items-center justify-center relative group ${isLab ? 'opacity-70 grayscale' : ''}`}
    >
      {/* @ts-ignore */}
      <Wrapper 
        {...wrapperProps}
        onMouseEnter={() => {
          if (!window.matchMedia("(max-width: 768px)").matches) {
            videoRef.current?.play().catch(()=>{});
          }
        }}
        onMouseLeave={() => {
          if (!window.matchMedia("(max-width: 768px)").matches) {
            videoRef.current?.pause();
          }
        }}
        className={`relative flex flex-col justify-end w-full h-full rounded-[24px] overflow-hidden bg-obsidian border border-graphite shadow-[0_20px_40px_rgba(0,0,0,0.15)] transform transition-transform duration-700 ${isLab ? 'cursor-not-allowed' : 'cursor-pointer md:hover:scale-[1.02] md:hover:border-[#E8D4A6]/50 md:hover:shadow-[0_0_30px_rgba(232,212,166,0.1)] active:scale-[0.98]'}`}
      >
        {/* Status badge */}
        <div className="absolute top-4 right-4 z-30">
          {project.status === 'live' && (
            <span className="flex items-center gap-1.5 text-[9px] px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              EN VIVO
            </span>
          )}
          {project.status === 'wip' && (
            <span className="flex items-center gap-1.5 text-[9px] px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              PRÓXIMAMENTE
            </span>
          )}
        </div>

        {/* Video layer with cinematic clip-path reveal */}
        {project.video ? (
          <div className="absolute inset-0 z-0 transition-all duration-700 md:[clip-path:inset(5%)] md:group-hover:[clip-path:inset(0%)] md:opacity-60 md:group-hover:opacity-100 opacity-100 [clip-path:inset(0%)]">
            <video
              ref={videoRef}
              src={project.video}
              loop
              muted
              playsInline
              preload="none"
              className="w-full h-full object-cover bg-graphite"
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-slate mix-blend-multiply opacity-20 md:group-hover:opacity-40 transition-opacity duration-700"></div>
        )}

        {/* Custom subtle tint based on project */}
        <div className={`absolute inset-0 bg-gradient-to-t ${project.color} via-obsidian/80 to-transparent opacity-80 z-10 transition-opacity duration-700 md:group-hover:opacity-60`}></div>
        
        <div className="relative z-20 p-6 md:p-12 flex flex-col justify-end h-full w-full">
          <div className="flex justify-between items-end">
            <div>
              {/* Stack badges */}
              <div className="flex flex-wrap gap-1.5 mb-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                {project.stack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-white/60 font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-wider border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <span className="font-[family-name:var(--font-ibm-plex-mono)] text-label font-semibold tracking-caption uppercase text-bone opacity-70 md:opacity-50 mb-2 md:mb-4 block md:group-hover:opacity-100 md:group-hover:text-[#E8D4A6] transition-all">
                {String(index + 1).padStart(2, '0')} // {project.type}
              </span>
              <h3 className={`font-[family-name:var(--font-die-grotesk-b)] leading-[1.0] tracking-[-1px] font-medium uppercase text-bone md:group-hover:text-white transition-colors duration-500 flex items-center gap-4 ${
                colSpan === 'md:col-span-1' 
                  ? 'text-2xl md:text-3xl' 
                  : colSpan === 'md:col-span-3'
                  ? 'text-[32px] md:text-[80px]'
                  : 'text-[32px] md:text-[56px]'
              }`}>
                {project.title}
                {isLab && (
                  <span className="hidden md:inline-block text-sm tracking-widest font-[family-name:var(--font-ibm-plex-mono)] bg-white/10 text-white px-3 py-1 rounded-full border border-white/20">
                    PRÓXIMAMENTE
                  </span>
                )}
              </h3>
            </div>
            {/* Visual click indicator */}
            {!isLab && (
              <div className="opacity-0 md:group-hover:opacity-100 transform translate-x-4 md:group-hover:translate-x-0 transition-all duration-500 mb-2 md:mb-4 hidden sm:block">
                <span className="text-[#E8D4A6] text-3xl md:text-5xl font-light">↗</span>
              </div>
            )}
          </div>
        </div>
      </Wrapper>
    </motion.div>
  );
}

export function WorkGrid() {
  return (
    <section id="work" className="w-full bg-obsidian text-bone py-12 md:py-[120px]">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-16"
        >
          <h2 className="text-[#E8D4A6] uppercase tracking-widest text-sm font-semibold font-[family-name:var(--font-ibm-plex-mono)] flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[#E8D4A6]"></span>
            CASOS DE ESTUDIO
          </h2>
          <p className="text-3xl md:text-5xl font-[family-name:var(--font-die-grotesk-b)] text-bone uppercase tracking-[-1px] md:tracking-[-2px] leading-[0.9]">
            PROYECTOS <span className="text-white">DESTACADOS</span>
          </p>
        </motion.div>
        
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 md:auto-rows-[380px]">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.slug} 
              project={project} 
              index={index}
              colSpan={getBentoColSpan(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
