import { ClientHero } from "@/components/ClientHero";
import { ClientTicker } from "@/components/ClientTicker";
import { ServicesSection } from "@/components/ServicesSection";
import { WorkGrid } from "@/components/WorkGrid";
import { AboutSection } from "@/components/AboutSection";
import { AliadosSection } from "@/components/AliadosSection";
import { ContactSection } from "@/components/ContactSection";
import { PricingSection } from "@/components/PricingSection";

export default function Home() {
  return (
    <>
      <div className="w-full flex flex-col divide-y divide-white/5 bg-obsidian pt-12 md:pt-24">
        <AboutSection />
        <AliadosSection />
        <WorkGrid />
        <ServicesSection />
        <PricingSection />
        <ContactSection />
      </div>
    </>
  );
}
