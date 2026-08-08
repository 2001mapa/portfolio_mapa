"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const projects = [
  { 
    slug: "landing-page", 
    title: "LANDING PAGE EXPERIENCES", 
    type: "CONVERSION DESIGN",
    color: "from-[#2A1E15]", // Brown tint
    video: "/videos/landing-page.mp4"
  },
  { 
    slug: "catalogo", 
    title: "CATÁLOGO DIGITAL", 
    type: "INTERACTIVE SHOWCASE",
    color: "from-[#1A261D]", // Green tint
    video: "/videos/catalogo.mp4"
  },
  { 
    slug: "ecommerce-erp", 
    title: "E-COMMERCE & ERP", 
    type: "FULLSTACK ARCHITECTURE",
    color: "from-[#2A261A]", // Beige/Gold tint
    video: "/videos/Ecommerce-doha-desk.mp4"
  }
];

export function WorkGrid() {
  return (
    <section id="work" className="w-full bg-obsidian text-bone py-24 md:py-[120px]">
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
            <motion.div 
              key={project.slug}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="w-full aspect-[4/5] md:aspect-[21/9] flex items-center justify-center relative group"
            >
              <Link 
                href={`/work/${project.slug}`} 
                className="relative flex flex-col justify-end w-full h-full rounded-[24px] overflow-hidden bg-obsidian border border-graphite cursor-pointer shadow-[0_20px_40px_rgba(0,0,0,0.15)] transform transition-transform duration-700 hover:scale-[1.02] hover:border-[#E8D4A6]/50 hover:shadow-[0_0_30px_rgba(232,212,166,0.1)]"
              >
                {/* Video layer */}
                {project.video ? (
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 bg-slate mix-blend-multiply opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
                )}

                {/* Custom subtle tint based on project */}
                <div className={`absolute inset-0 bg-gradient-to-t ${project.color} via-obsidian/80 to-transparent opacity-80 z-10 transition-opacity duration-700 group-hover:opacity-60`}></div>
                
                <div className="relative z-20 p-6 md:p-12 flex flex-col justify-end h-full w-full">
                  <span className="font-[family-name:var(--font-ibm-plex-mono)] text-label font-semibold tracking-caption uppercase text-bone opacity-50 mb-2 md:mb-4 block group-hover:opacity-100 group-hover:text-[#E8D4A6] transition-all">
                    {String(index + 1).padStart(2, '0')} // {project.type}
                  </span>
                  <h3 className="font-[family-name:var(--font-die-grotesk-b)] text-[32px] md:text-[64px] leading-[1.0] tracking-[-1px] font-medium uppercase text-bone group-hover:text-white transition-colors duration-500">
                    {project.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
