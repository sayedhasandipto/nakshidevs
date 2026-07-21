"use client";

import Link from "next/link";
import {
  LuBaby,
  LuUserCheck,
  LuStore,
  LuBriefcase,
  LuGavel,
  LuCode,
  LuLayoutGrid,
  LuArrowRight,
  LuChevronRight,
} from "react-icons/lu";
import { LucideCheckCircle2 } from "lucide-react";

const services = [
  {
    title: "জন্ম নিবন্ধন (আবেদন ও সংশোধন)",
    desc: "নতুন জন্ম নিবন্ধনের জন্য অনলাইনে আবেদন করুন অথবা বিদ্যমান নিবন্ধনের যেকোনো তথ্য সংশোধন করুন। আপনার পরিচয় নিশ্চিত করতে এটি অত্যাবশ্যকীয়।",
    icon: LuBaby,
    features: [
      "অনলাইন আবেদন",
      "তথ্য যাচাইকরণ",
      "দ্রুত সংশোধন",
      "ডিজিটাল কপি ডাউনলোড",
    ],
    link: "/services/1",
    linkText: "আবেদন করুন",
    colSpan: "md:col-span-8",
    bg: "bg-white hover:border-blue-200 hover:shadow-blue-500/5",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    btnStyle: "bg-[#002045] text-white hover:bg-[#001530] hover:shadow-blue-500/20",
    large: true,
  },
  {
    title: "ভোটার আইডি কার্ড",
    desc: "নতুন ভোটার হিসেবে নিবন্ধন করুন বা জাতীয় পরিচয়পত্রের ভুল সংশোধন করুন। স্মার্ট কার্ডের স্ট্যাটাস চেক করুন।",
    icon: LuUserCheck,
    link: "/services/2",
    linkText: "আবেদন করুন",
    colSpan: "md:col-span-4",
    bg: "bg-gradient-to-br from-emerald-50/50 to-teal-50/50 border-emerald-100 hover:border-emerald-200 hover:shadow-emerald-500/5",
    iconColor: "text-emerald-600",
    iconBg: "bg-white shadow-sm",
    btnStyle: "bg-emerald-700 text-white hover:bg-emerald-800 hover:shadow-emerald-500/20",
    large: false,
  },
  {
    title: "ব্যবসা নিবন্ধন",
    desc: "ট্রেড লাইসেন্সসহ সম্পূর্ণ ব্যবসা নিবন্ধন প্রক্রিয়া। আইনি ডকুমেন্টেশন, লাইসেন্স প্রস্তুতি এবং ফাইলিং সহায়তা।",
    icon: LuStore,
    link: "/services/3",
    linkText: "বিস্তারিত দেখুন",
    colSpan: "md:col-span-6",
    bg: "bg-white hover:border-indigo-200 hover:shadow-indigo-500/5",
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50",
    btnStyle: "text-indigo-600 hover:text-indigo-700 bg-transparent hover:underline",
    borderLeft: "border-l-4 border-l-indigo-600",
    large: false,
  },
  {
    title: "চাকরি আবেদন সহায়তা",
    desc: "পেশাদার সিভি তৈরি, কভার লেটার এবং ইন্টারভিউ কোচিং সেবা। চাকরি পেতে সর্বোচ্চ সহায়তা।",
    icon: LuBriefcase,
    link: "/services/4",
    linkText: "আবেদন করুন",
    colSpan: "md:col-span-6",
    bg: "bg-white hover:border-cyan-200 hover:shadow-cyan-500/5",
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-50",
    btnStyle: "text-cyan-600 hover:text-cyan-700 bg-transparent hover:underline",
    borderLeft: "border-l-4 border-l-cyan-500",
    large: false,
  },
  {
    title: "আইনি পরামর্শ",
    desc: "ব্যক্তিগত ও ব্যবসায়িক বিষয়ে বিশেষজ্ঞ আইনি পরামর্শ। ডকুমেন্ট রিভিউ, চুক্তি প্রস্তুত এবং আইনি সহায়তা।",
    icon: LuGavel,
    link: "/services/5",
    linkText: "পরামর্শ নিন",
    colSpan: "md:col-span-4",
    bg: "bg-gradient-to-br from-amber-50/50 to-orange-50/50 border-amber-100 hover:border-amber-200 hover:shadow-amber-500/5",
    iconColor: "text-amber-600",
    iconBg: "bg-white shadow-sm",
    btnStyle: "bg-[#002045] text-white hover:bg-[#001530] hover:shadow-blue-500/20",
    large: false,
  },
  {
    title: "ওয়েব ডেভেলপমেন্ট",
    desc: "আপনার ব্যবসার জন্য পেশাদার ওয়েবসাইট তৈরি। কাস্টম ডিজাইন, রেসপনসিভ লেআউট এবং এসইও অপটিমাইজেশন।",
    icon: LuCode,
    link: "/services/6",
    linkText: "বিস্তারিত দেখুন",
    colSpan: "md:col-span-4",
    bg: "bg-white hover:border-purple-200 hover:shadow-purple-500/5",
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50",
    btnStyle: "text-purple-600 hover:text-purple-700 bg-transparent hover:underline",
    borderLeft: "border-l-4 border-l-purple-500",
    large: false,
  },
  {
    title: "সকল সেবা দেখুন",
    desc: "আমাদের সম্পূর্ণ সেবা তালিকা ব্রাউজ করুন এবং আপনার প্রয়োজন অনুযায়ী সঠিক সেবাটি খুঁজে নিন।",
    icon: LuLayoutGrid,
    link: "/services",
    linkText: "সকল সেবা",
    colSpan: "md:col-span-4",
    bg: "bg-gradient-to-br from-[#001c3d] via-[#002b5c] to-[#081e3a] border-blue-900 shadow-lg shadow-blue-950/20",
    iconColor: "text-white",
    iconBg: "bg-white/10 backdrop-blur-xs",
    btnStyle: "bg-blue-500 text-white hover:bg-blue-600 hover:shadow-blue-500/30",
    textWhite: true,
    large: false,
  },
];

export default function ServiceGrid() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.title}
              className={`${service.colSpan} group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-gray-150/80 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${service.bg} ${service.borderLeft || ""}`}
            >
              {/* Subtle hover background glow */}
              {!service.textWhite && (
                <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-slate-100 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
              )}

              <div
                className={`flex h-full flex-col ${
                  service.large
                    ? "md:flex-row md:items-start md:gap-8"
                    : "justify-between"
                }`}
              >
                {/* Icon Wrapper */}
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${service.iconBg} ${service.iconColor} transition-transform duration-300 group-hover:scale-110 ${service.large ? "" : "mb-6"}`}
                >
                  <Icon className="h-7 w-7" />
                </div>

                {/* Content Area */}
                <div className="flex flex-1 flex-col justify-between h-full">
                  <div>
                    <h3
                      className={`text-xl font-bold tracking-tight md:text-2xl transition-colors duration-200 ${
                        service.textWhite
                          ? "text-white group-hover:text-blue-300"
                          : "text-[#002045] group-hover:text-blue-900"
                      }`}
                      style={{ fontFamily: "Hind Siliguri, sans-serif" }}
                    >
                      {service.title}
                    </h3>
                    <p
                      className={`mt-3 text-sm leading-relaxed ${
                        service.textWhite ? "text-gray-300/90" : "text-gray-500"
                      }`}
                      style={{ fontFamily: "Hind Siliguri, sans-serif" }}
                    >
                      {service.desc}
                    </p>

                    {/* Features list */}
                    {service.features && (
                      <ul className="my-6 grid grid-cols-1 gap-2.5 text-sm sm:grid-cols-2">
                        {service.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-center gap-2 font-medium text-gray-600"
                            style={{ fontFamily: "Hind Siliguri, sans-serif" }}
                          >
                            <LucideCheckCircle2 className="h-4.5 w-4.5 shrink-0 text-emerald-500" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Button Link */}
                  <div className={`mt-6 ${service.large ? "" : "mt-auto"}`}>
                    <Link
                      href={service.link}
                      className={`inline-flex items-center gap-2 rounded-xl py-3 px-6 text-sm font-bold transition-all duration-300 ${service.btnStyle} ${
                        service.btnStyle.includes("bg-transparent")
                          ? "px-0"
                          : "shadow-sm hover:scale-[1.02]"
                      }`}
                      style={{ fontFamily: "Hind Siliguri, sans-serif" }}
                    >
                      <span>{service.linkText}</span>
                      {service.btnStyle.includes("bg-transparent") ? (
                        <LuChevronRight className="h-4.5 w-4.5 transition-transform duration-200 group-hover:translate-x-1" />
                      ) : (
                        <LuArrowRight className="h-4.5 w-4.5 transition-transform duration-200 group-hover:translate-x-1" />
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
