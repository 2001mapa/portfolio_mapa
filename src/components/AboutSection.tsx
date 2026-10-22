"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const outcomes = [
  "Menos tareas repetitivas",
  "Información clara para decidir",
  "Experiencias simples para tu equipo y clientes",
];

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-obsidian pb-16 pt-28 text-bone md:pb-28 md:pt-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(ellipse_at_82%_15%,rgba(255,76,36,0.20),transparent_54%)]" />
      <div className="relative mx-auto grid max-w-[1280px] gap-12 px-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-16">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-7 flex items-center gap-3 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] font-semibold uppercase tracking-[0.16em] text-ember"
          >
            <span className="h-px w-8 bg-ember" /> Medellín · Colombia · Disponible para colaborar
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="max-w-4xl font-[family-name:var(--font-abc-gravity-variable)] text-[clamp(3rem,8vw,7.25rem)] font-medium leading-[0.91] tracking-[-0.065em] text-fog"
          >
            Convierto procesos que frenan tu negocio en <span className="text-ember">productos digitales útiles.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-mist md:text-xl"
          >
            Soy Miguel Albornoz. Diseño y desarrollo sistemas web, automatizaciones e interfaces que hacen más fácil vender, organizar y operar. La tecnología es el medio; el resultado es un proceso más claro para las personas que lo usan.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a href="#contact" className="inline-flex min-h-12 items-center justify-center rounded-full bg-ember px-6 font-[family-name:var(--font-ibm-plex-mono)] text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-tangerine">
              Hablemos de tu proceso <span className="ml-3 text-base">↗</span>
            </a>
            <a href="#work" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-6 font-[family-name:var(--font-ibm-plex-mono)] text-xs font-semibold uppercase tracking-[0.12em] text-fog transition-colors hover:border-white/50 hover:bg-white/5">
              Ver casos de estudio
            </a>
          </motion.div>

        </div>

        <motion.aside
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.14 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-graphite/30 p-5 backdrop-blur-sm"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-graphite">
            <Image src="/foto-perfil.jpeg" alt="Miguel Albornoz" fill sizes="(max-width: 1024px) 100vw, 360px" className="object-cover object-center grayscale-[0.15]" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
            <p className="absolute bottom-5 left-5 right-5 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.13em] text-white/70">Estrategia, diseño y desarrollo en un mismo proceso.</p>
          </div>
        </motion.aside>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38 }} className="relative mx-auto mt-12 grid max-w-[1280px] gap-px overflow-hidden border-y border-white/10 bg-white/10 px-6 sm:grid-cols-3">
        {outcomes.map((outcome, index) => (
          <div key={outcome} className="bg-obsidian px-6 py-5">
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.14em] text-ember">0{index + 1}</p>
            <p className="mt-2 text-sm font-medium text-fog md:text-base">{outcome}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
