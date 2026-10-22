"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { mascotMoments } from "@/data/mascotMoments";
import { MascotSprite } from "./MascotSprite";

export function MobileMascotNote({ id }: { id: string }) {
  const noteRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const moment = mascotMoments.find((item) => item.id === id);

  useEffect(() => {
    const note = noteRef.current;
    if (!note) return;

    let showTimer = 0;
    let hideTimer = 0;
    let hasAppeared = false;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || entry.intersectionRatio < 0.45) {
        window.clearTimeout(showTimer);
        window.clearTimeout(hideTimer);
        setVisible(false);
        return;
      }

      if (hasAppeared) return;
      showTimer = window.setTimeout(() => {
        hasAppeared = true;
        setVisible(true);
        hideTimer = window.setTimeout(() => setVisible(false), 4800);
      }, 200);
    }, { threshold: 0.45 });

    observer.observe(note);
    return () => {
      observer.disconnect();
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!moment) return null;

  return (
    <aside
      ref={noteRef}
      aria-label="Idea de NULL"
      aria-hidden={!visible}
      inert={!visible}
      className={`flex w-full items-end gap-2 py-7 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none md:hidden ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
    >
      <MascotSprite size="small" />
      <div className="min-w-0 flex-1 rounded-2xl border border-white/15 bg-[#1d1d20] px-4 py-3 text-white shadow-[0_12px_28px_rgba(0,0,0,0.18)]">
        <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] font-semibold uppercase tracking-[0.16em] text-ember">NULL · una idea</p>
        <p className="mt-2 text-sm font-medium leading-snug text-fog">{moment.message}</p>
        <Link href={moment.href} className="mt-2 inline-flex min-h-8 items-center gap-1.5 text-xs font-semibold text-[#ff896a] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember">
          {moment.action} <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </aside>
  );
}
