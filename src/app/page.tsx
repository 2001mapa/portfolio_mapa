import { ClientHero } from "@/components/ClientHero";
import { ClientTicker } from "@/components/ClientTicker";
import { ServicesSection } from "@/components/ServicesSection";
import { WorkGrid } from "@/components/WorkGrid";
import { AboutSection } from "@/components/AboutSection";
import { TechStackSection } from "@/components/TechStackSection";
import { ContactSection } from "@/components/ContactSection";
import { PricingSection } from "@/components/PricingSection";
import { ScrollProgress } from "@/components/ScrollProgress";

import MaintenanceScreen from "@/components/MaintenanceScreen";

const IS_MAINTENANCE_MODE = false;

export default function Home() {
  if (IS_MAINTENANCE_MODE) {
    return <MaintenanceScreen />;
  }

  return (
    <>
      <ScrollProgress />
      <div className="w-full flex flex-col divide-y divide-white/5 bg-obsidian pt-12 md:pt-24">
        <AboutSection />
        <TechStackSection />
        <WorkGrid />
        <ServicesSection />
        <PricingSection />
        <ContactSection />
      </div>
    </>
  );
}
