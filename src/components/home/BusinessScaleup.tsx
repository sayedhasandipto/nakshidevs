"use client";

import Link from "next/link";

const features = [
  { icon: "devices", text: "মোবাইল ফ্রেন্ডলি ডিজাইন" },
  { icon: "bolt", text: "সুপার ফাস্ট লোডিং স্পিড" },
  { icon: "shield", text: "লাইফটাইম টেকনিক্যাল সাপোর্ট" },
  { icon: "trending_up", text: "SEO অপটিমাইজড" },
];

export default function BusinessScaleup() {
  return (
    <section
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28"
      style={{
        background:
          "linear-gradient(135deg, #0a1628 0%, #0d2137 40%, #0f2b4a 100%)",
      }}
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute top-0 right-0 h-125 w-125 rounded-full bg-emerald-500/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[100px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/3 blur-[140px]" />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left Text */}
        <div className="order-2 space-y-8 lg:order-1">
          <div>
            <p
              className="mb-4 text-sm font-semibold tracking-wider text-emerald-400 uppercase"
              style={{ fontFamily: "Hind Siliguri, sans-serif" }}
            >
              ওয়েব ডেভেলপমেন্ট সার্ভিস
            </p>
            <h2
              className="text-3xl leading-tight font-bold text-white sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "Hind Siliguri, sans-serif" }}
            >
              আপনার ছোট ব্যবসাকে বড় করুন{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #34d399, #60a5fa)",
                }}
              >
                পেশাদার ওয়েবসাইটের
              </span>{" "}
              মাধ্যমে
            </h2>
          </div>

          <p
            className="text-lg leading-relaxed text-white/50"
            style={{ fontFamily: "Hind Siliguri, sans-serif" }}
          >
            একটি ওয়েবসাইট আপনার ব্যবসার পরিচয় বদলে দিতে পারে। আমরা সুলভ মূল্যে
            আধুনিক ই-কমার্স বা পোর্টফোলিও ওয়েবসাইট তৈরি করে দিচ্ছি।
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <div
                key={f.text}
                className="group flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.03] p-3 transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.06]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 transition-transform group-hover:scale-110">
                  <span
                    className="material-symbols-outlined text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {f.icon}
                  </span>
                </div>
                <span
                  className="text-sm font-medium text-white/70"
                  style={{ fontFamily: "Hind Siliguri, sans-serif" }}
                >
                  {f.text}
                </span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/business-solutions">
              <button
                className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:from-emerald-600 hover:to-emerald-700 hover:shadow-emerald-500/30"
                style={{ fontFamily: "Hind Siliguri, sans-serif" }}
              >
                প্যাকেজগুলো দেখুন
              </button>
            </Link>
            <button
              className="rounded-xl border border-white/10 px-7 py-3.5 text-sm font-semibold text-white/70 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.04] hover:text-white"
              style={{ fontFamily: "Hind Siliguri, sans-serif" }}
            >
              ফ্রি কনসালটেশন
            </button>
          </div>
        </div>

        {/* Right Visual */}
        <div className="order-1 flex justify-center lg:order-2">
          <div className="relative w-full max-w-md">
            {/* Glow ring */}
            <div className="pointer-events-none absolute inset-0 scale-105 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 blur-2xl" />

            {/* Main image card */}
            <div className="relative rounded-3xl border border-white/[0.08] bg-white/[0.04] p-3 backdrop-blur-sm transition-all duration-500 hover:border-white/[0.15]">
              <img
                className="w-full rounded-2xl"
                alt="E-commerce mockup"
                src="https://images.unsplash.com/photo-1688561808434-886a6dd97b8c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </div>

            {/* Floating price badge */}
            <div
              className="absolute -bottom-4 -left-4 rounded-2xl border border-white/[0.1] bg-white/[0.08] px-5 py-4 shadow-2xl backdrop-blur-xl sm:-bottom-6 sm:-left-6"
              style={{ animation: "floatBadge 4s ease-in-out infinite" }}
            >
              <p
                className="mb-1 text-xs text-white/40"
                style={{ fontFamily: "Hind Siliguri, sans-serif" }}
              >
                শুরু মাত্র
              </p>
              <p
                className="text-2xl font-black text-white"
                style={{ fontFamily: "Hind Siliguri, sans-serif" }}
              >
                ৳৫,০০০
              </p>
              <p
                className="mt-1 text-xs text-emerald-400"
                style={{ fontFamily: "Hind Siliguri, sans-serif" }}
              >
                সম্পূর্ণ ওয়েবসাইট
              </p>
            </div>

            {/* Floating review badge */}
            <div
              className="absolute -top-3 -right-3 rounded-2xl border border-white/[0.1] bg-white/[0.08] px-4 py-3 shadow-2xl backdrop-blur-xl sm:-top-5 sm:-right-5"
              style={{ animation: "floatBadge 4s ease-in-out infinite 2s" }}
            >
              <div className="mb-1 flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-sm text-amber-400"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p
                className="text-xs text-white/60"
                style={{ fontFamily: "Hind Siliguri, sans-serif" }}
              >
                ১০০+ রিভিউ
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatBadge {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </section>
  );
}
