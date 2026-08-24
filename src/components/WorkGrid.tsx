"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

const projects = [
  { 
    slug: "docu-mind", 
    title: "DOCUMIND: AI PLATFORM", 
    type: "RAG / MICRO-SAAS / FULLSTACK AI",
    color: "from-[#4B0082]", // Indigo/Deep Purple
    video: "" 
  },
  { 
    slug: "ai-crm", 
    title: "AI-DRIVEN CRM & TELEGRAM BOT", 
    type: "FULLSTACK AI INTEGRATION",
    color: "from-[#1A1A26]", // Dark Blue
    video: "" // Dejamos en blanco temporalmente o ponemos un GIF de telegram
  },
  { 
    slug: "ecommerce-erp", 
    title: "E-COMMERCE & ERP ARCHITECTURE", 
    type: "SCALABLE SYSTEMS",
    color: "from-[#2A261A]", // Beige/Gold
    video: "/videos/Ecommerce-doha-desk.mp4"
  },
  { 
    slug: "landing-page", 
    title: "CONVERSION OPTIMIZED FRONTEND", 
    type: "REACT PERFORMANCE",
    color: "from-[#2A1E15]", // Brown
    video: "/videos/landing-page.mp4"
  },
  { 
    slug: "linktree", 
    title: "MICRO-FRONTEND ECOSYSTEM", 
    type: "UI/UX ENGINEERING",
    color: "from-[#1E152A]", // Purple
    video: "/videos/Stylo-Escritorio.mp4"
  },
  {
    slug: "laboratorio",
    title: "LABORATORIO & EXPERIMENTOS",
    type: "SIDE PROJECTS & IA",
    color: "from-[#1A261D]", // Green
    video: ""
  }
];

function ProjectCard({ project, index }: { project: any, index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Autoplay on mobile via IntersectionObserver for an app-like feel
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (!isMobile || !videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(() => {});
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
      className="w-full aspect-[4/5] md:aspect-[21/9] flex items-center justify-center relative group"
    >
      <Link 
        href={`/work/${project.slug}`} 
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
        className="relative flex flex-col justify-end w-full h-full rounded-[24px] overflow-hidden bg-obsidian border border-graphite cursor-pointer shadow-[0_20px_40px_rgba(0,0,0,0.15)] transform transition-transform duration-700 md:hover:scale-[1.02] md:hover:border-[#E8D4A6]/50 md:hover:shadow-[0_0_30px_rgba(232,212,166,0.1)] active:scale-[0.98]"
      >
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
              <span className="font-[family-name:var(--font-ibm-plex-mono)] text-label font-semibold tracking-caption uppercase text-bone opacity-70 md:opacity-50 mb-2 md:mb-4 block md:group-hover:opacity-100 md:group-hover:text-[#E8D4A6] transition-all">
                {String(index + 1).padStart(2, '0')} // {project.type}
              </span>
              <h3 className="font-[family-name:var(--font-die-grotesk-b)] text-[32px] md:text-[64px] leading-[1.0] tracking-[-1px] font-medium uppercase text-bone md:group-hover:text-white transition-colors duration-500">
                {project.title}
              </h3>
            </div>
            {/* Visual click indicator */}
            <div className="opacity-0 md:group-hover:opacity-100 transform translate-x-4 md:group-hover:translate-x-0 transition-all duration-500 mb-2 md:mb-4 hidden sm:block">
              <span className="text-[#E8D4A6] text-3xl md:text-5xl font-light">↗</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function WorkGrid() {
  return (
    <section id="work" className="w-full bg-obsidian text-bone py-12 md:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-12 md:gap-24">
        
        {/* Section Wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex justify-center md:justify-start"
        >
          <h2 className="text-[40px] md:text-[96px] leading-[1.0] font-medium tracking-tight md:tracking-[-1.92px] text-slate font-[family-name:var(--font-abc-gravity-variable)] uppercase select-none text-center md:text-left">
            PROYECTOS DESTACADOS
          </h2>
        </motion.div>

        <div className="flex flex-col gap-8 md:gap-16 w-full">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
