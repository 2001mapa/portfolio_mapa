"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MascotSprite } from "./MascotSprite";

const DISMISSED_KEY = "portfolio-mascot-dismissed-v3";

const paths = [
  { label: "Ver proyectos reales", detail: "Mira lo que ya he construido", href: "#work" },
  { label: "Quiero crear mi web", detail: "Cuéntame qué necesitas", href: "#contact" },
  { label: "Automatizar un proceso", detail: "Descubre cómo puedo ayudarte", href: "#services" },
];

type GuideMode = "intro" | "menu" | "collapsed";

export function MascotGuide() {
  const [ready, setReady] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [mode, setMode] = useState<GuideMode>("intro");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDismissed(window.sessionStorage.getItem(DISMISSED_KEY) === "true");
      setReady(true);
    }, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready || dismissed || mode !== "intro") return;
    const timer = window.setTimeout(() => setMode("collapsed"), 6500);
    return () => window.clearTimeout(timer);
  }, [ready, dismissed, mode]);

  useEffect(() => {
    if (mode !== "menu") return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMode("collapsed");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mode]);

  if (!ready || dismissed) return null;

  const onDismiss = () => {
    window.sessionStorage.setItem(DISMISSED_KEY, "true");
    setDismissed(true);
  };

  return (
    <aside
      aria-label="NULL, guía del portafolio"
      className="fixed bottom-4 right-3 z-40 w-[min(18rem,calc(100vw-1.5rem))] text-white print:hidden md:bottom-7 md:right-7 md:w-[19rem]"
    >
      {mode === "collapsed" ? (
        <button
          type="button"
          aria-label="Abrir guía de NULL"
          onClick={() => setMode("menu")}
          className="ml-auto flex min-h-14 items-end gap-2 rounded-2xl border border-white/15 bg-[#1d1d20]/95 px-3 py-1.5 shadow-[0_18px_45px_rgba(0,0,0,0.38)] backdrop-blur-md transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember motion-reduce:transition-none"
        >
          <span className="self-center text-xs font-semibold text-fog">¿Te guío?</span>
          <MascotSprite size="small" />
        </button>
      ) : (
        <div className="flex items-end gap-1">
          <div className="relative min-w-0 flex-1 rounded-2xl border border-white/15 bg-[#1d1d20]/95 px-3 py-3 shadow-[0_18px_45px_rgba(0,0,0,0.38)] backdrop-blur-md md:px-4">
            <button
              type="button"
              aria-label="Ocultar a NULL por esta visita"
              onClick={onDismiss}
              className="absolute right-2 top-1.5 flex h-8 w-8 items-center justify-center rounded-full text-base text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
            >
              ×
            </button>
            <p className="pr-7 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] font-semibold uppercase tracking-[0.14em] text-ember">NULL · tu guía</p>
            {mode === "intro" ? (
              <button
                type="button"
                onClick={() => setMode("menu")}
                aria-expanded={false}
                className="mt-2 block w-full rounded-lg text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
              >
                <span className="block text-[13px] font-medium leading-snug text-fog">¿Buscas una web o quieres mejorar un proceso?</span>
                <span className="mt-2 block text-xs font-semibold text-[#ff896a]">Tócame y te guío →</span>
              </button>
            ) : (
              <div id="null-guide-options" className="mt-2">
                <p className="text-[13px] font-medium leading-snug text-fog">¿Qué te gustaría hacer?</p>
                <nav aria-label="Rutas sugeridas por NULL" className="mt-3 grid gap-1.5">
                  {paths.map((path) => (
                    <Link
                      key={path.href}
                      href={path.href}
                      onClick={() => setMode("collapsed")}
                      className="block min-h-12 rounded-xl border border-white/10 bg-white/5 px-3 py-2 transition-colors hover:border-ember/60 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
                    >
                      <span className="block text-xs font-semibold text-fog">{path.label} <span aria-hidden="true" className="text-[#ff896a]">↗</span></span>
                      <span className="block text-[11px] leading-snug text-white/60">{path.detail}</span>
                    </Link>
                  ))}
                </nav>
                <button
                  type="button"
                  onClick={() => setMode("collapsed")}
                  className="mt-2 min-h-8 text-[11px] text-white/60 underline-offset-2 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
                >
                  Seguir explorando
                </button>
              </div>
            )}
          </div>
          <button
            type="button"
            aria-label={mode === "menu" ? "Cerrar guía de NULL" : "Abrir opciones de NULL"}
            aria-expanded={mode === "menu"}
            aria-controls={mode === "menu" ? "null-guide-options" : undefined}
            onClick={() => setMode(mode === "menu" ? "collapsed" : "menu")}
            className="shrink-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
          >
            <MascotSprite size="small" />
          </button>
        </div>
      )}
    </aside>
  );
}
