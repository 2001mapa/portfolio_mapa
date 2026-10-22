import Link from "next/link";
import { mascotMoments } from "@/data/mascotMoments";
import { MascotSprite } from "./MascotSprite";

export function MobileMascotNote({ id }: { id: string }) {
  const moment = mascotMoments.find((item) => item.id === id);
  if (!moment) return null;

  return (
    <aside aria-label="Idea de NULL" className="flex w-full items-end gap-2 py-7 md:hidden">
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
