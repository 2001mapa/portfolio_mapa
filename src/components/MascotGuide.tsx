"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { mascotMoments, type MascotMoment } from "@/data/mascotMoments";
import { MascotSprite } from "./MascotSprite";

const DISMISSED_KEY = "portfolio-mascot-dismissed-v2";

export function MascotGuide() {
  const [moment, setMoment] = useState<MascotMoment | null>(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const shown = useRef(new Set<string>());

  useEffect(() => {
    if (dismissed || window.sessionStorage.getItem(DISMISSED_KEY) === "true") return;

    let idleTimer = 0;
    let frame = 0;
    let hideTimer = 0;
    let exitTimer = 0;
    let playing = false;
    let pending: MascotMoment | null = null;
    const desktopMedia = window.matchMedia("(min-width: 768px)");

    const playNext = () => {
      if (playing || !pending || document.hidden) return;
      if (document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement) return;

      const next = pending;
      pending = null;
      shown.current.add(next.id);
      playing = true;
      setMoment(next);
      setVisible(true);

      hideTimer = window.setTimeout(() => {
        setVisible(false);
        exitTimer = window.setTimeout(() => {
          playing = false;
          update();
          playNext();
        }, 350);
      }, desktopMedia.matches ? 6500 : 3600);
    };

    const update = () => {
      const readingLine = window.innerHeight * 0.42;
      const current = mascotMoments.find(({ id }) => {
        const bounds = document.getElementById(id)?.getBoundingClientRect();
        return bounds && bounds.top <= readingLine && bounds.bottom > readingLine;
      });
      if (!current || shown.current.has(current.id)) {
        pending = null;
        return;
      }
      if (!desktopMedia.matches && window.scrollY < 160 && current.id === "about") return;
      pending = current;
      playNext();
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    const onFocusIn = (event: FocusEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        setVisible(false);
      }
    };

    idleTimer = window.setTimeout(update, desktopMedia.matches ? 1200 : 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("visibilitychange", playNext);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("visibilitychange", playNext);
      window.clearTimeout(idleTimer);
      window.clearTimeout(hideTimer);
      window.clearTimeout(exitTimer);
      window.cancelAnimationFrame(frame);
    };
  }, [dismissed]);

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
      className={`pointer-events-none fixed bottom-24 z-40 w-[calc(100vw-1.5rem)] max-w-[17rem] transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none md:w-[22rem] md:max-w-none print:hidden ${moment.side === "left" ? "left-3 right-auto" : "right-3 left-auto"} ${moment.id === "about" ? "md:bottom-auto md:left-auto md:right-6 md:top-28" : moment.side === "left" ? "md:bottom-8 md:left-6 md:right-auto" : "md:bottom-28 md:right-6"} ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
    >
      <div className={`flex items-end gap-1 ${moment.side === "left" ? "md:flex-row-reverse" : ""}`}>
        <div className="pointer-events-auto relative min-w-0 flex-1 rounded-2xl border border-white/15 bg-[#1d1d20]/95 px-3 py-2.5 text-white shadow-[0_18px_45px_rgba(0,0,0,0.38)] backdrop-blur-md md:px-4 md:py-3">
          <button
            type="button"
            aria-label="Ocultar sugerencias de NULL por esta visita"
            onClick={onDismiss}
            className="absolute right-2 top-1.5 flex h-7 w-7 items-center justify-center rounded-full text-base text-white/50 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
          >
            ×
          </button>
          <p className="pr-6 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] font-semibold uppercase tracking-[0.16em] text-ember">NULL · una idea</p>
          <p className="mt-2 text-[13px] font-medium leading-snug text-fog md:text-sm">{moment.message}</p>
          <Link href={moment.href} className="mt-2 inline-flex min-h-8 items-center gap-1.5 text-xs font-semibold text-[#ff896a] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember">
            {moment.action} <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <MascotSprite />
      </div>
    </aside>
  );
}
