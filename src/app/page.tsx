import { ApproachSection } from "@/components/sections/ApproachSection";
import { AreasSection } from "@/components/sections/AreasSection";
import { ArticlesSection } from "@/components/sections/ArticlesSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { FormatsSection } from "@/components/sections/FormatsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { WhenUsefulSection } from "@/components/sections/WhenUsefulSection";

export default function Home() {
  return (
    <main id="main-content">
      <HeroSection />
      <ManifestoSection />
      <AreasSection />
      <WhenUsefulSection />
      <ApproachSection />
      <FormatsSection />
      <FaqSection />
      <ArticlesSection />
      <FinalCtaSection />
    </main>
  );
}
