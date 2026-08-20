import { AboutSection } from "@/components/sections/AboutSection";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { AreasSection } from "@/components/sections/AreasSection";
import { ArticlesSection } from "@/components/sections/ArticlesSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { FormatsSection } from "@/components/sections/FormatsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { WhenUsefulSection } from "@/components/sections/WhenUsefulSection";

export default function Home() {
  return (
    <main id="main-content">
      <HeroSection />
      <AboutSection />
      <ManifestoSection />
      <AreasSection />
      <WhenUsefulSection />
      <ApproachSection />
      <JourneySection />
      <FormatsSection />
      <ArticlesSection />
      <FaqSection />
      <FinalCtaSection />
    </main>
  );
}
