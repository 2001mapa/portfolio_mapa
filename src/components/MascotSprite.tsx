import Image from "next/image";

export function MascotSprite({ size = "medium" }: { size?: "small" | "medium" }) {
  return (
    <span
      aria-hidden="true"
      className={`mascot-float relative block shrink-0 [image-rendering:pixelated] drop-shadow-[0_0_12px_rgba(255,76,36,0.42)] ${size === "small" ? "h-[84px] w-[46px]" : "h-24 w-[52px]"}`}
    >
      <Image src="/mascot-null-v2.png" alt="" width={296} height={545} unoptimized className="h-full w-full" />
      <span className="mascot-face mascot-face-smile">
        <svg viewBox="0 0 48 30" preserveAspectRatio="xMidYMid meet" shapeRendering="crispEdges" aria-hidden="true">
          <path d="M7 7h3v4h3v3h4v-3h3V7h3v6h-3v4H10v-4H7zm21 0h3v4h3v3h4v-3h3V7h3v6h-3v4H31v-4h-3zM13 21h3v3h3v2h10v-2h3v-3h3v5h-3v3H16v-3h-3z" fill="#f31624" />
        </svg>
      </span>
      <span className="mascot-face mascot-face-think">
        <svg viewBox="0 0 48 30" preserveAspectRatio="xMidYMid meet" shapeRendering="crispEdges" aria-hidden="true">
          <path d="M7 8h13v3H7zm21-3h9v3h3v3h-3V8h-9zM11 14h5v5h-5zm22 0h5v5h-5zm-9 9h8v3h-8zm-4 3h4v3h-4z" fill="#f31624" />
        </svg>
      </span>
      <span className="mascot-face mascot-face-wink">
        <svg viewBox="0 0 48 30" preserveAspectRatio="xMidYMid meet" shapeRendering="crispEdges" aria-hidden="true">
          <path d="M7 13h14v3H7zm23-5h3v3h3v3h3v-3h3V8h3v7h-3v3h-9v-3h-3zM11 22h3v3h4v2h12v-2h4v-3h3v5h-3v3H14v-3h-3z" fill="#f31624" />
        </svg>
      </span>
    </span>
  );
}
