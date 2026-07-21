import Header from "@/components/home/Header";
import Footer from "@/components/layout/Footer";
import WebDevSection from "@/components/home/WebDevSection";
import { Metadata } from "next";
import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";

export const metadata: Metadata = {
  title: "Web Development | NakshiDevs",
  description:
    "আপনার ব্যবসার জন্য আধুনিক ও দ্রুত ওয়েবসাইট তৈরি করুন। প্রফেশনাল ওয়েব ডেভেলপমেন্ট সলিউশন।",
};

export default function WebDevPage() {
  return (
    <div className="font-hind-siliguri min-h-screen bg-gray-50">
      <Header />

      <main className="pt-24 pb-0">
        {/* Full Page Hero / Header for Web Dev */}
        <section className="bg-linear-to-r from-blue-900 to-[#002045] px-6 py-16 text-center text-white">
          <div className="mx-auto max-w-4xl space-y-6">
            <h1 className="text-4xl leading-tight font-extrabold md:text-5xl">
              প্রফেশনাল ওয়েবসাইট ডেভেলপমেন্ট
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-blue-100/90 md:text-xl">
              কাস্টম কোডিং থেকে শুরু করে ই-কমার্স সলিউশন—আপনার ব্যবসার ডিজিটাল
              উপস্থিতিকে আরও শক্তিশালী করতে আমরা রয়েছি আপনার পাশে।
            </p>
          </div>
        </section>

        {/* Using the detailed component we already built */}
        <WebDevSection />

        {/* Additional Details Section for the Page */}
        <section className="border-t border-gray-200 bg-gray-50 px-6 py-20">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="mb-12 text-3xl font-bold text-[#002045]">
              আমরা যে ধরণের ওয়েবসাইট তৈরি করি
            </h2>
            <div className="grid grid-cols-1 gap-8 text-left md:grid-cols-3">
              <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#002045]">
                  <MdOutlineShoppingCart className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#002045]">
                  ই-কমার্স ওয়েবসাইট
                </h3>
                <p className="leading-relaxed text-gray-600">
                  আপনার প্রোডাক্ট অনলাইনে বিক্রি করার জন্য পেমেন্ট গেটওয়ে,
                  ইনভেন্টরি ম্যানেজমেন্ট সহ সম্পূর্ণ কাস্টম ই-কমার্স সলিউশন।
                </p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-[#0a6c44]">
                  <span className="material-symbols-outlined text-2xl">
                    business
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#002045]">
                  কর্পোরেট ওয়েবসাইট
                </h3>
                <p className="leading-relaxed text-gray-600">
                  কোম্পানির প্রোফাইল, সার্ভিস সমূহ এবং কন্টাক্ট ইনফরমেশন
                  সুন্দরভাবে উপস্থাপন করার জন্য ডাইনামিক কর্পোরেট সাইট।
                </p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <span className="material-symbols-outlined text-2xl">
                    person
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#002045]">
                  পোর্টফোলিও/পার্সোনাল
                </h3>
                <p className="leading-relaxed text-gray-600">
                  আপনার কাজ বা সার্ভিস ক্লায়েন্টদের কাছে প্রফেশনালভাবে তুলে
                  ধরতে ওয়ান পেজ বা মাল্টি পেজ পোর্টফোলিও সাইট।
                </p>
              </div>
            </div>

            <div className="mt-16">
              <Link href="/business-solutions">
                <button className="transform rounded-full bg-green-500 px-10 py-4 text-xl font-bold text-[#002045] shadow-lg transition-all hover:-translate-y-1 hover:bg-green-400">
                  মূল্য তালিকা দেখুন
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
