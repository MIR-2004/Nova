"use client"

import CustomCursor from "@/components/custom-cursor"
import HeroSection from "@/components/hero-section"
import { FeaturesSection } from "@/components/feature-section"
import dynamic from "next/dynamic"
import ContactForm from "@/components/contact-form"
import Header from "@/components/header"

const StatsSection = dynamic(() => import("@/components/interactive-stats").then(m => m.default), { ssr: false })
const PricingSection = dynamic(() => import("@/components/pricing-section").then(m => m.PricingSection), { ssr: false })

export default function Home() {
  return (
    <main className=" min-h-screen text-white">
      <Header/>
      <CustomCursor/>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <PricingSection />
      <section id="contact" className="py-24 bg-slate-950">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-semibold mb-4">Get in touch</h3>
          <ContactForm />
        </div>
      </section>
      <footer className="py-10 text-center text-white/60">© {new Date().getFullYear()} Nova</footer>
    </main>
  );
}
