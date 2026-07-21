"use client";

import Link from "next/link";

const categories = [
  {
    title: "সরকারি আবেদন",
    desc: "জন্ম নিবন্ধন, এনআইডি সংশোধন, পাসপোর্ট থেকে শুরু করে সকল সরকারি ফর্ম ফিলআপ।",
    icon: "account_balance",
    href: "/gov-services",
    tags: ["জন্ম নিবন্ধন", "NID সেবা", "পাসপোর্ট", "+১২ আরও"],
    accent: "blue",
    span: "lg:col-span-7",
  },
  {
    title: "ব্যবসায়িক সেবা",
    desc: "ট্রেড লাইসেন্স, টিআইএন এবং ভ্যাট সংক্রান্ত সকল সমাধান।",
    icon: "business_center",
    href: "/business-solutions",
    tags: ["ট্রেড লাইসেন্স", "TIN", "VAT"],
    accent: "emerald",
    span: "lg:col-span-5",
  },
  {
    title: "ওয়েবসাইট ডেভেলপমেন্ট",
    desc: "আপনার ব্যবসার জন্য আধুনিক, দ্রুত ও মোবাইল ফ্রেন্ডলি ওয়েবসাইট।",
    icon: "code",
    href: "/web-dev",
    tags: ["ই-কমার্স", "পোর্টফোলিও", "ল্যান্ডিং পেজ"],
    accent: "violet",
    span: "lg:col-span-5",
  },
  {
    title: "সার্বক্ষণিক সহায়তা কেন্দ্র",
    desc: "আমাদের সাপোর্ট টিম যে কোন জটিলতায় আপনার পাশে আছে।",
    icon: "headset_mic",
    href: "/dashboard/support",
    tags: [],
    accent: "amber",
    span: "lg:col-span-7",
  },
];

const accentStyles: Record<
  string,
  { bg: string; text: string; border: string; glow: string; iconBg: string }
> = {
  blue: {
    bg: "group-hover:bg-blue-50",
    text: "text-blue-600",
    border: "group-hover:border-blue-200",
    glow: "bg-blue-500/10",
    iconBg: "bg-blue-50 text-blue-600",
  },
  emerald: {
    bg: "group-hover:bg-emerald-50",
    text: "text-emerald-600",
    border: "group-hover:border-emerald-200",
    glow: "bg-emerald-500/10",
    iconBg: "bg-emerald-50 text-emerald-600",
  },
  violet: {
    bg: "group-hover:bg-violet-50",
    text: "text-violet-600",
    border: "group-hover:border-violet-200",
    glow: "bg-violet-500/10",
    iconBg: "bg-violet-50 text-violet-600",
  },
  amber: {
    bg: "group-hover:bg-amber-50",
    text: "text-amber-600",
    border: "group-hover:border-amber-200",
    glow: "bg-amber-500/10",
    iconBg: "bg-amber-50 text-amber-600",
  },
};

export default function CategoriesGrid() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:mb-12 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p
              className="mb-2 text-sm font-semibold tracking-wider text-blue-600 uppercase"
              style={{ fontFamily: "Hind Siliguri, sans-serif" }}
            >
              আমাদের সেবাসমূহ
            </p>
            <h2
              className="text-3xl font-bold text-[#002045] sm:text-4xl"
              style={{ fontFamily: "Hind Siliguri, sans-serif" }}
            >
              জনপ্রিয় সেবা ক্যাটাগরি
            </h2>
            <p
              className="mt-3 text-base leading-relaxed text-gray-500"
              style={{ fontFamily: "Hind Siliguri, sans-serif" }}
            >
              আপনার প্রয়োজনীয় সেবাটি সহজেই খুঁজে নিন আমাদের ক্যাটাগরিগুলো
              থেকে।
            </p>
          </div>
          <Link
            href="/gov-services"
            className="group flex shrink-0 items-center gap-2 text-sm font-semibold text-[#002045] transition-all hover:gap-3"
            style={{ fontFamily: "Hind Siliguri, sans-serif" }}
          >
            সবগুলো দেখুন
            <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {categories.map((cat) => {
            const style = accentStyles[cat.accent];
            return (
              <Link
                key={cat.title}
                href={cat.href}
                className={`${cat.span} group relative block overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl sm:p-8`}
              >
                {/* Hover glow */}
                <div
                  className={`absolute top-0 right-0 h-48 w-48 ${style.glow} translate-x-8 -translate-y-8 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60`}
                />

                <div className="relative z-10">
                  {/* Icon & Arrow */}
                  <div className="mb-6 flex items-start justify-between">
                    <div
                      className={`h-14 w-14 ${style.iconBg} flex items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110`}
                    >
                      <span className="material-symbols-outlined text-3xl">
                        {cat.icon}
                      </span>
                    </div>
                    <span
                      className={`material-symbols-outlined text-gray-300 ${style.text} translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100`}
                    >
                      north_east
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3
                    className="mb-2 text-xl font-bold text-[#002045] group-hover:text-[#002045]"
                    style={{ fontFamily: "Hind Siliguri, sans-serif" }}
                  >
                    {cat.title}
                  </h3>
                  <p
                    className="mb-5 text-sm leading-relaxed text-gray-500"
                    style={{ fontFamily: "Hind Siliguri, sans-serif" }}
                  >
                    {cat.desc}
                  </p>

                  {/* Tags */}
                  {cat.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {cat.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg bg-gray-50 px-3.5 py-1.5 text-xs font-medium text-gray-600 transition-colors group-hover:bg-gray-100"
                          style={{ fontFamily: "Hind Siliguri, sans-serif" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA for support card */}
                  {cat.tags.length === 0 && (
                    <span
                      className={`inline-flex items-center gap-2 ${style.text} text-sm font-semibold transition-all group-hover:gap-3`}
                      style={{ fontFamily: "Hind Siliguri, sans-serif" }}
                    >
                      কল করুন
                      <span className="material-symbols-outlined text-lg">
                        chevron_right
                      </span>
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
