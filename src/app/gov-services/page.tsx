import Header from "@/components/home/Header";
import GovServicesHero from "@/components/gov-services/GovServicesHero";
import ServiceGrid from "@/components/gov-services/ServiceGrid";
import ProcessSection from "@/components/gov-services/ProcessSection";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "নাগরিক সেবা ডিরেক্টরি | NakshiDevs",
  description:
    "বাংলাদেশের নাগরিকদের জন্য ডিজিটাল প্রশাসনিক সেবা এখন হাতের মুঠোয়। দ্রুত এবং স্বচ্ছ আবেদন প্রক্রিয়ার মাধ্যমে আপনার প্রয়োজনীয় সেবা গ্রহণ করুন।",
};

export default function GovServicesPage() {
  return (
    <div className="w-full bg-white">
      <Header />
      <main className="w-full">
        <GovServicesHero />
        <ServiceGrid />
        <ProcessSection />
      </main>
      <Footer />
    </div>
  );
}
