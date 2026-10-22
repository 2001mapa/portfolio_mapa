"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { mascotMoments, type MascotMoment } from "@/data/mascotMoments";
import { MascotSprite } from "./MascotSprite";

const DISMISSED_KEY = "portfolio-mascot-dismissed";
const SEEN_KEY = "portfolio-mascot-seen";

export function MascotGuide() {
  const [moment, setMoment] = useState<MascotMoment | null>(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIdRef = useRef<string | null>(null);
  const shown = useRef(new Set<string>());

  useEffect(() => {
    try {
      const seen = JSON.parse(window.sessionStorage.getItem(SEEN_KEY) ?? "[]");
      if (Array.isArray(seen)) shown.current = new Set(seen);
    } catch {
      window.sessionStorage.removeItem(SEEN_KEY);
    }

    let frame = 0;
    const desktopMedia = window.matchMedia("(min-width: 768px)");
    const update = () => {
      frame = 0;
      if (!desktopMedia.matches) {
        activeIdRef.current = null;
        setActiveId(null);
        setVisible(false);
        return;
      }
      const readingLine = window.innerHeight * 0.42;
      const current = mascotMoments.find(({ id }) => {
        const bounds = document.getElementById(id)?.getBoundingClientRect();
        return bounds && bounds.top <= readingLine && bounds.bottom > readingLine;
      });
      const nextId = current?.id ?? null;
      if (nextId !== activeIdRef.current) {
        activeIdRef.current = nextId;
        setActiveId(nextId);
        setVisible(false);
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const onFocusIn = (event: FocusEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        activeIdRef.current = null;
        setActiveId(null);
        setVisible(false);
      }
    };

    if (!dismissed && window.sessionStorage.getItem(DISMISSED_KEY) !== "true") {
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", update);
      document.addEventListener("focusin", onFocusIn);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      document.removeEventListener("focusin", onFocusIn);
      window.cancelAnimationFrame(frame);
    };
  }, [dismissed]);

  useEffect(() => {
    const showTimer = window.setTimeout(() => {
      const current = mascotMoments.find(({ id }) => id === activeId);
      if (!current || dismissed || shown.current.has(current.id) || document.hidden) return;
      if (document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement) return;

      shown.current.add(current.id);
      window.sessionStorage.setItem(SEEN_KEY, JSON.stringify([...shown.current]));
      setMoment(current);
      setVisible(true);
    }, activeId === "about" ? 1500 : 700);

    return () => window.clearTimeout(showTimer);
  }, [activeId, dismissed]);

  useEffect(() => {
    const hideTimer = window.setTimeout(() => setVisible(false), 6500);
    return () => window.clearTimeout(hideTimer);
  }, [moment]);

  if (!moment) return null;

  const onDismiss = () => {
    window.sessionStorage.setItem(DISMISSED_KEY, "true");
    setVisible(false);
    setDismissed(true);
  };

  return (
    <aside
      aria-label="Sugerencia de NULL"
      aria-hidden={!visible}
      inert={!visible}
      className={`pointer-events-none fixed z-40 hidden w-[22rem] transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none md:bottom-8 md:block print:hidden ${moment.side === "left" ? "md:left-6" : "md:bottom-28 md:right-6"} ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
    >
      <div className={`flex items-end gap-1 ${moment.side === "left" ? "md:flex-row-reverse" : ""}`}>
        <div className="pointer-events-auto relative min-w-0 flex-1 rounded-2xl border border-white/15 bg-[#1d1d20]/95 px-4 py-3 text-white shadow-[0_18px_45px_rgba(0,0,0,0.38)] backdrop-blur-md">
          <button
            type="button"
            aria-label="Ocultar sugerencias de NULL por esta visita"
            onClick={onDismiss}
            className="absolute right-2 top-1.5 flex h-7 w-7 items-center justify-center rounded-full text-base text-white/50 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
          >
            ×
          </button>
          <p className="pr-6 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] font-semibold uppercase tracking-[0.16em] text-ember">NULL · una idea</p>
          <p className="mt-2 text-sm font-medium leading-snug text-fog">{moment.message}</p>
          <Link href={moment.href} className="mt-2 inline-flex min-h-8 items-center gap-1.5 text-xs font-semibold text-[#ff896a] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember">
            {moment.action} <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <MascotSprite />
      </div>
    </aside>
  );
}
