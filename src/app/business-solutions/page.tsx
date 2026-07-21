import Header from "@/components/home/Header";
import Footer from "@/components/layout/Footer";
import PricingSection from "@/components/business/PricingSection";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Business Solutions | GovService BD",
  description:
    "আপনার ব্যবসার জন্য সেরা মানের ওয়েবসাইট তৈরি করুন। ই-কমার্স, পোর্টফোলিও, এবং কর্পোরেট ওয়েবসাইটের সাশ্রয়ী প্যাকেজ।",
};

export default function BusinessSolutionsPage() {
  const benefits = [
    {
      icon: "public",
      title: "ব্র্যান্ড ভ্যালু বৃদ্ধি",
      description:
        "একটি প্রফেশনাল ওয়েবসাইট আপনার ব্যবসার বিশ্বাসযোগ্যতা এবং ব্র্যান্ড ভ্যালু কয়েকগুণ বাড়িয়ে দেয়। কাস্টমাররা সহজেই আপনার উপর আস্থা রাখতে পারে।",
    },
    {
      icon: "schedule",
      title: "২৪/৭ অনলাইন উপস্থিতি",
      description:
        "আপনার দোকান বা অফিস বন্ধ থাকলেও ওয়েবসাইট কখনও ঘুমায় না। দিন-রাত যেকোনো সময় কাস্টমার আপনার সার্ভিস বা প্রোডাক্ট সম্পর্কে জানতে পারে।",
    },
    {
      icon: "trending_up",
      title: "সেলস ও কাস্টমার বৃদ্ধি",
      description:
        "অনলাইনে কোনো ভৌগোলিক সীমানা নেই। ওয়েবসাইট থাকলে আপনি পুরো দেশ এমনকি দেশের বাইরে থেকেও কাস্টমার পেতে পারেন, যা সেলস বাড়াতে সাহায্য করে।",
    },
    {
      icon: "savings",
      title: "দীর্ঘমেয়াদী সাশ্রয়ী বিনিয়োগ",
      description:
        "অফলাইন মার্কেটিং এর তুলনায় ডিজিটাল মাধ্যমে মার্কেটিং করা অনেক সাশ্রয়ী। একবার একটি ভালো ওয়েবসাইট তৈরি করলে তা দীর্ঘকাল ধরে ব্যবসার প্রসারে সাহায্য করে।",
    },
  ];

  return (
    <div className="font-hind-siliguri min-h-screen bg-gray-50">
      <Header />

      <main className="pt-24 pb-0">
        {/* Hero Section - Premium Design */}
        <section className="relative overflow-hidden bg-[#002045] px-6 py-24 text-white">
          <div className="absolute inset-0 bg-linear-to-br from-[#002045] via-[#04336c] to-[#0a6c44] opacity-90"></div>

          {/* Decorative Elements */}
          <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-blue-500/20 blur-[100px]"></div>
          <div className="absolute right-[-10%] bottom-[-10%] h-[50%] w-[50%] rounded-full bg-[#0a6c44]/30 blur-[120px]"></div>

          <div className="relative z-10 mx-auto max-w-5xl space-y-8 text-center">
            <div className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold tracking-wider text-blue-200 backdrop-blur-md">
              ডিজিটাল যুগে আপনার ব্যবসার প্রথম পদক্ষেপ
            </div>
            <h1 className="bg-linear-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-5xl leading-tight font-extrabold text-transparent md:text-6xl">
              আপনার ব্যবসাকে দিন একটি <br className="hidden md:block" />{" "}
              <span className="text-green-400">প্রফেশনাল ডিজিটাল পরিচয়</span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-light text-blue-100/90 md:text-2xl">
              শুধুমাত্র একটি ওয়েবসাইট নয়, আমরা তৈরি করি আপনার ব্যবসার জন্য একটি
              কমপ্লিট ডিজিটাল সলিউশন যা আপনার সেলস ও ব্র্যান্ড ভ্যালু বাড়াতে
              সাহায্য করবে।
            </p>
            <div className="flex flex-col justify-center gap-6 pt-8 sm:flex-row">
              <Link href="#pricing">
                <button className="w-full transform rounded-xl bg-green-500 px-8 py-4 text-lg font-bold text-[#002045] shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-300 hover:-translate-y-1 hover:bg-green-400 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] sm:w-auto">
                  প্যাকেজগুলো দেখুন
                </button>
              </Link>
              <Link href="/contact">
                <button className="w-full transform rounded-xl border border-white/30 bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 sm:w-auto">
                  ফ্রি কনসালটেশন নিন
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Invest Section */}
        <section className="relative bg-white px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-3xl font-bold text-[#002045] md:text-5xl">
                কেন ওয়েবসাইটে বিনিয়োগ করবেন?
              </h2>
              <p className="mx-auto max-w-3xl text-xl text-gray-600">
                বর্তমান প্রতিযোগিতামূলক বাজারে টিকে থাকতে এবং ব্যবসাকে বড় করতে
                একটি প্রফেশনাল ওয়েবসাইটের বিকল্প নেই।
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="group rounded-2xl border border-gray-100 bg-gray-50 p-8 shadow-sm transition-colors duration-500 hover:bg-[#002045] hover:text-white hover:shadow-xl"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-blue-100 transition-colors duration-500 group-hover:bg-white/10">
                    <span className="material-symbols-outlined text-4xl text-[#002045] transition-colors duration-500 group-hover:text-green-400">
                      {benefit.icon}
                    </span>
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-800 group-hover:text-white">
                    {benefit.title}
                  </h3>
                  <p className="leading-relaxed text-gray-600 group-hover:text-gray-300">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <div id="pricing">
          <PricingSection />
        </div>

        {/* How It Works Section */}
        <section className="border-t border-gray-200 bg-gray-50 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-[#002045] md:text-5xl">
                আমাদের কাজের ধাপসমূহ
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                খুব সহজেই আমাদের মাধ্যমে আপনার ওয়েবসাইট তৈরি করে নিতে পারেন
              </p>
            </div>

            <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4">
              {/* Connecting line for desktop */}
              <div className="absolute top-1/2 right-[10%] left-[10%] z-0 hidden h-0.5 -translate-y-1/2 bg-blue-200 md:block"></div>

              {[
                {
                  step: "১",
                  title: "প্যাকেজ নির্বাচন",
                  desc: "আপনার প্রয়োজন অনুযায়ী সঠিক প্যাকেজটি বেছে নিন",
                  icon: "ads_click",
                },
                {
                  step: "২",
                  title: "পরামর্শ ও চুক্তি",
                  desc: "আমাদের এক্সপার্টদের সাথে কথা বলে রিকোয়ারমেন্ট ফাইনাল করুন",
                  icon: "handshake",
                },
                {
                  step: "৩",
                  title: "ডিজাইন ও ডেভেলপমেন্ট",
                  desc: "আমরা আপনার ওয়েবসাইটের কাজ শুরু করবো এবং আপডেট জানাবো",
                  icon: "code",
                },
                {
                  step: "৪",
                  title: "ডেলিভারি ও সাপোর্ট",
                  desc: "টেস্টিং শেষে ওয়েবসাইট হ্যান্ডওভার এবং ফ্রি সাপোর্ট উপভোগ করুন",
                  icon: "rocket_launch",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full border-4 border-gray-50 bg-white text-[#002045] shadow-lg">
                    <span className="material-symbols-outlined text-3xl">
                      {item.icon}
                    </span>
                    <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-green-500 font-bold text-white">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-[#002045]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-[#002045] md:text-5xl">
                সাধারণ জিজ্ঞাসা (FAQ)
              </h2>
              <p className="text-lg text-gray-600">
                ওয়েবসাইট তৈরি সংক্রান্ত কিছু সাধারণ প্রশ্নের উত্তর
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  q: "ডোমেইন এবং হোস্টিং কি আমাকে আলাদাভাবে কিনতে হবে?",
                  a: "আমাদের প্রিমিয়াম ও এন্টারপ্রাইজ প্যাকেজগুলোতে প্রথম বছরের জন্য ডোমেইন এবং হোস্টিং সম্পূর্ণ ফ্রি দেওয়া হয়। অন্যান্য প্যাকেজের ক্ষেত্রে আলাদাভাবে নিতে হবে, তবে আমরা এ বিষয়ে সম্পূর্ণ সাহায্য করবো।",
                },
                {
                  q: "ওয়েবসাইট তৈরি করতে কতদিন সময় লাগে?",
                  a: "এটি ওয়েবসাইটের ধরন এবং রিকোয়ারমেন্টের উপর নির্ভর করে। সাধারণত একটি পোর্টফোলিও সাইটের জন্য ৫-৭ দিন এবং ই-কমার্স সাইটের জন্য ১৫-২০ দিন সময় লাগতে পারে।",
                },
                {
                  q: "ওয়েবসাইট তৈরির পর কি কোনো সাপোর্ট পাবো?",
                  a: "অবশ্যই! আমাদের প্রতিটি প্যাকেজের সাথে নির্দিষ্ট মেয়াদের ফ্রি টেকনিক্যাল সাপোর্ট থাকে। পরবর্তীতে আপনি চাইলে মেইনটেন্যান্স কন্ট্রাক্ট করতে পারবেন।",
                },
                {
                  q: "আমি কি পরে প্যাকেজ আপগ্রেড করতে পারবো?",
                  a: "হ্যাঁ, আপনি যেকোনো সময় আপনার বর্তমান প্যাকেজ থেকে বড় প্যাকেজে আপগ্রেড করতে পারবেন। এক্ষেত্রে শুধুমাত্র প্যাকেজের মূল্যের পার্থক্যটি প্রদান করতে হবে।",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-100 bg-gray-50 p-6 transition-shadow hover:shadow-md"
                >
                  <h3 className="mb-3 flex items-start text-lg font-bold text-[#002045]">
                    <span className="material-symbols-outlined mt-0.5 mr-3 text-green-500">
                      help
                    </span>
                    {faq.q}
                  </h3>
                  <p className="pl-9 leading-relaxed text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-linear-to-r from-[#002045] to-[#04336c] px-6 py-20 text-center text-white">
          <div className="mx-auto max-w-3xl space-y-8">
            <h2 className="text-3xl font-bold md:text-5xl">
              এখনও সিদ্ধান্ত নিতে পারছেন না?
            </h2>
            <p className="text-xl font-light text-blue-100/90">
              আমাদের এক্সপার্ট টিমের সাথে আজই যোগাযোগ করুন। আমরা আপনার ব্যবসার
              ধরন বুঝে সঠিক পরামর্শ দিব। সম্পূর্ণ বিনামূল্যে!
            </p>
            <div className="pt-4">
              <Link href="/contact">
                <button className="transform rounded-full bg-green-500 px-10 py-4 text-xl font-bold text-[#002045] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-green-400">
                  ফ্রি কনসালটেশন বুক করুন
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
