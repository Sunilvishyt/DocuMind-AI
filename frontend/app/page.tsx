"use client";

import Footer from "@/components/landing/Footer";
import CtaSection from "@/components/landing/CtaSection";
import BentoLayout from "@/components/landing/BentoLayout";
import ExpertiseSection from "@/components/landing/ExpertiseSection";
import HeroSection from "@/components/landing/HeroSection";
import Topbar from "@/components/landing/Topbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#131315] text-[#e4e2e4] font-sans selection:bg-primary/30">
      <Topbar />

      <main className="pt-16">
        <HeroSection />
        <ExpertiseSection />
        <BentoLayout />
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
