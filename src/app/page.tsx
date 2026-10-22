

import { WorkGrid } from "@/components/WorkGrid";
import { AboutSection } from "@/components/AboutSection";
import { TechStackSection } from "@/components/TechStackSection";
import { ContactSection } from "@/components/ContactSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ProcessSection } from "@/components/ProcessSection";
import { ScrollProgress } from "@/components/ScrollProgress";
import { MascotGuide } from "@/components/MascotGuide";

import MaintenanceScreen from "@/components/MaintenanceScreen";

const IS_MAINTENANCE_MODE = false;

export const metadata: Metadata = {
  title: "Soluciones digitales y automatización | Miguel Albornoz",
  description: "Diseño y desarrollo sistemas web, automatizaciones y experiencias digitales para mejorar procesos de negocio.",
};

export default function Home() {
  if (IS_MAINTENANCE_MODE) {
    return <MaintenanceScreen />;
  }

  return (
    <>
      <ScrollProgress />
      <MascotGuide />
      <div className="w-full flex flex-col bg-obsidian pt-12 md:pt-16">
        <AboutSection />
        <ProcessSection />
        <WorkGrid />
        <ServicesSection />
        <TechStackSection />
        <ContactSection />
      </div>
    </>
  );
}

import type { Metadata } from "next";
