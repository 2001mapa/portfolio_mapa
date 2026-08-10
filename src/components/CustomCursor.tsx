"use client";

import { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const [isMobile, setIsMobile] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "cyan" | "ember">("default");
  
  const cursorRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = typeof window !== 'undefined' && (window.matchMedia("(hover: none)").matches || window.matchMedia("(pointer: coarse)").matches || ('ontouchstart' in window) || navigator.maxTouchPoints > 0);
    setIsMobile(checkMobile);

    if (checkMobile) return;

    let mouseX = -100;
    let mouseY = -100;
    let haloX = -100;
    let haloY = -100;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const animateHalo = () => {
      haloX += (mouseX - haloX) * 0.3; // Factor de suavidad (0.1 a 1)
      haloY += (mouseY - haloY) * 0.3;
      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${haloX}px, ${haloY}px, 0) translate(-50%, -50%)`;
      }
      requestAnimationFrame(animateHalo);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = window.getComputedStyle(target).cursor === "pointer" || target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button');
      
      setIsHovering(!!isClickable);

      if (isClickable) {
        if (target.closest('.bg-\\[\\#FF4C24\\]') || target.closest('.text-\\[\\#FF4C24\\]')) {
          setCursorType("ember");
        } else {
          setCursorType("cyan");
        }
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    const animationId = requestAnimationFrame(animateHalo);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationId);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        * {
          cursor: none !important;
        }
      `}} />
      
      {/* PUNTO CENTRAL INSTANTÁNEO */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] print:hidden"
        style={{ transform: "translate(-100px, -100px)" }}
      >
        <div 
          className={`w-3 h-3 rounded-full transition-all duration-200 ${
            isHovering ? "scale-[3] opacity-90" : "scale-100 opacity-100 bg-white"
          } ${
            isHovering && cursorType === "ember" ? "bg-[#FF4C24]" : ""
          } ${
            isHovering && cursorType !== "ember" ? "bg-[#E8D4A6]" : ""
          }`}
        />
      </div>
      
      {/* HALO EXTERIOR SUAVE */}
      <div
        ref={haloRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] print:hidden"
        style={{ transform: "translate(-100px, -100px)" }}
      >
        <div 
          className={`w-10 h-10 rounded-full border transition-all duration-300 ${
            isHovering ? "scale-50 opacity-0" : "scale-100 opacity-40 border-white"
          }`}
        />
      </div>
    </>
  );
}
