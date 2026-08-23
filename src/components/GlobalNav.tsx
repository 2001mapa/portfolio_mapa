'use client';

import { usePathname } from 'next/navigation';

export function GlobalNav() {
  const pathname = usePathname();

  // Hide on admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <nav className="absolute top-0 w-full flex justify-between items-center px-6 py-4 z-50 text-caption leading-caption tracking-caption text-bone print:hidden">
      <div className="font-medium uppercase truncate max-w-[150px] md:max-w-none">Miguel Albornoz</div>
      <div className="flex gap-4 md:gap-6 items-center">
        <a href="#work" className="hidden md:block font-medium uppercase hover:text-fog transition-colors">Proyectos</a>
        <a href="#services" className="hidden md:block font-medium uppercase hover:text-fog transition-colors">Servicios</a>
        <a 
          href="#contact" 
          className="font-medium uppercase border border-bone/30 px-5 md:px-6 py-3 md:py-2 rounded-full active:bg-bone/20 md:hover:bg-bone active:text-white md:hover:text-obsidian transition-all duration-300 text-xs md:text-caption"
        >
          Contacto
        </a>
      </div>
    </nav>
  );
}
