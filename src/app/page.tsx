import Header from "@/components/home/Header";
import HeroSection from "@/components/home/HeroSection";
import StatsCounter from "@/components/home/StatsCounter";
import CategoriesGrid from "@/components/home/CategoriesGrid";
import BusinessScaleup from "@/components/home/BusinessScaleup";
import TrustIndicators from "@/components/home/TrustIndicators";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="w-full bg-white">
      <Header />
      <main className="w-full">
        <HeroSection />
        <StatsCounter />
        <CategoriesGrid />
        <BusinessScaleup />
        <TrustIndicators />
      </main>
      <Footer />
    </div>
  );
}
