"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith('/admin')) {
      return;
    }

    // Disabling Lenis to fix scroll freezing on WorkGrid
    // Native CSS scroll-behavior: smooth is already active
    return;
  }, [pathname]);

  return null;
}

