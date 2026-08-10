'use client';

import { usePathname } from 'next/navigation';

export function GlobalFooter() {
  const pathname = usePathname();

  // Hide on admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="w-full flex justify-between items-center px-6 pt-[48px] pb-6 border-t border-graphite bg-fog font-[family-name:var(--font-ibm-plex-mono)] text-caption leading-caption tracking-caption uppercase text-slate print:hidden">
      <div>DESIGN BY MIGUEL // V1.1.0</div>
      <div className="flex gap-4">
        <span>SYS.STATUS: OK</span>
        <span>ENG: NEXT</span>
      </div>
    </footer>
  );
}
