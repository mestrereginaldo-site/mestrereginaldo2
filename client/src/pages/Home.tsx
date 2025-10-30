import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CardsSection from "@/components/CardsSection";
import BuziosSection from "@/components/BuziosSection";
import SimpatiasSection from "@/components/SimpatiasSection";
import ConsultasSection from "@/components/ConsultasSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      <AboutSection />
      <CardsSection />
      <BuziosSection />
      <SimpatiasSection />
      <ConsultasSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
