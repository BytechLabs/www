import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection_Glass } from "@/components/sections/ServicesSection_Glass";
import { ServicesSection_Illustrated } from "@/components/sections/ServicesSection_Illustrated";
import { WorkSection } from "@/components/sections/WorkSection";
import { ContactSection_Letter } from "@/components/sections/ContactSection_Letter";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />

      {/* PHASE 2: Services Variants */}
      {/* Option A: Glass Codex (Retained) */}
      <ServicesSection_Glass />

      {/* Option D: Illustrated Codex (Retained) */}
      <ServicesSection_Illustrated />

      {/* PHASE 3: Selected Work */}
      <WorkSection />

      {/* PHASE 4: The Correspondence (Option A) */}
      <ContactSection_Letter />

      {/* PHASE 5: The Codex Footer */}
      <Footer />
    </main>
  );
}
