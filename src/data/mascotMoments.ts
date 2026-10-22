export type MascotMoment = {
  id: string;
  message: string;
  action: string;
  href: string;
  side: "left" | "right";
};

export const mascotMoments: MascotMoment[] = [
  {
    id: "about",
    message: "¿Qué tarea te quita más tiempo cada semana?",
    action: "Mira cómo trabajo",
    href: "#process",
    side: "right",
  },
  {
    id: "work",
    message: "¿Ya tienes tu catálogo digital?",
    action: "Ver un ejemplo",
    href: "/work/catalogo",
    side: "left",
  },
  {
    id: "services",
    message: "¿Qué proceso quieres automatizar?",
    action: "Cuéntame tu idea",
    href: "#contact",
    side: "right",
  },
  {
    id: "contact",
    message: "Podemos empezar por el problema que más te pesa.",
    action: "Cuéntame tu idea",
    href: "#contact-form",
    side: "left",
  },
];
