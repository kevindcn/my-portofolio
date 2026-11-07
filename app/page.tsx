import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SkillsMarquee from "@/components/SkillsMarquee";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import WhyHireMe from "@/components/WhyHireMe";
import Portfolio from "@/components/Portfolio";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <Hero />
      <SkillsMarquee />
      <Services />
      <Portfolio />
      <Experience />
      <WhyHireMe />
      <CTA />
      <Footer />
    </main>
  );
}
