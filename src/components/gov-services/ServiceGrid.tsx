import Link from "next/link";

const services = [
  {
    title: "জন্ম নিবন্ধন (আবেদন ও সংশোধন)",
    desc: "নতুন জন্ম নিবন্ধনের জন্য অনলাইনে আবেদন করুন অথবা বিদ্যমান নিবন্ধনের যেকোনো তথ্য সংশোধন করুন। আপনার পরিচয় নিশ্চিত করতে এটি অত্যাবশ্যকীয়।",
    icon: "child_care",
    features: [
      "অনলাইন আবেদন",
      "তথ্য যাচাই",
      "দ্রুত সংশোধন",
      "ডিজিটাল কপি ডাউনলোড",
    ],
    link: "/services/1",
    linkText: "আবেদন করুন",
    colSpan: "md:col-span-8",
    bg: "bg-white",
    iconBg: "bg-blue-50 text-blue-600",
    btnStyle: "bg-[#002045] text-white hover:bg-[#001530]",
    large: true,
  },
  {
    title: "ভোটার আইডি কার্ড",
    desc: "নতুন ভোটার হিসেবে নিবন্ধন করুন বা জাতীয় পরিচয়পত্রের ভুল সংশোধন করুন। স্মার্ট কার্ডের স্ট্যাটাস চেক করুন।",
    icon: "how_to_reg",
    link: "/services/2",
    linkText: "আবেদন করুন",
    colSpan: "md:col-span-4",
    bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
    iconBg: "bg-white text-indigo-600 shadow-sm",
    btnStyle: "bg-[#0a6c44] text-white hover:bg-[#085a38]",
    large: false,
  },
  {
    title: "ব্যবসা নিবন্ধন",
    desc: "ট্রেড লাইসেন্সসহ সম্পূর্ণ ব্যবসা নিবন্ধন প্রক্রিয়া। আইনি ডকুমেন্টেশন, লাইসেন্স প্রস্তুতি এবং ফাইলিং সহায়তা।",
    icon: "storefront",
    link: "/services/3",
    linkText: "বিস্তারিত দেখুন",
    colSpan: "md:col-span-6",
    bg: "bg-white",
    iconBg: "bg-emerald-50 text-emerald-600",
    btnStyle: "text-[#002045] hover:text-blue-700 bg-transparent",
    borderLeft: "border-l-4 border-l-[#0a6c44]",
    large: false,
  },
  {
    title: "চাকরি আবেদন সহায়তা",
    desc: "পেশাদার সিভি তৈরি, কভার লেটার এবং ইন্টারভিউ কোচিং সেবা। চাকরি পেতে সর্বোচ্চ সহায়তা।",
    icon: "work",
    link: "/services/4",
    linkText: "আবেদন করুন",
    colSpan: "md:col-span-6",
    bg: "bg-white",
    iconBg: "bg-blue-50 text-blue-600",
    btnStyle: "text-[#002045] hover:text-blue-700 bg-transparent",
    borderLeft: "border-l-4 border-l-[#002045]",
    large: false,
  },
  {
    title: "আইনি পরামর্শ",
    desc: "ব্যক্তিগত ও ব্যবসায়িক বিষয়ে বিশেষজ্ঞ আইনি পরামর্শ। ডকুমেন্ট রিভিউ, চুক্তি প্রস্তুত এবং আইনি সহায়তা।",
    icon: "gavel",
    link: "/services/5",
    linkText: "পরামর্শ নিন",
    colSpan: "md:col-span-4",
    bg: "bg-gradient-to-br from-amber-50 to-orange-50",
    iconBg: "bg-white text-amber-600 shadow-sm",
    btnStyle: "bg-[#002045] text-white hover:bg-[#001530]",
    large: false,
  },
  {
    title: "ওয়েব ডেভেলপমেন্ট",
    desc: "আপনার ব্যবসার জন্য পেশাদার ওয়েবসাইট তৈরি। কাস্টম ডিজাইন, রেসপনসিভ লেআউট এবং এসইও অপটিমাইজেশন।",
    icon: "code",
    link: "/services/6",
    linkText: "বিস্তারিত দেখুন",
    colSpan: "md:col-span-4",
    bg: "bg-white",
    iconBg: "bg-purple-50 text-purple-600",
    btnStyle: "text-[#002045] hover:text-blue-700 bg-transparent",
    borderLeft: "border-l-4 border-l-purple-500",
    large: false,
  },
  {
    title: "সকল সেবা দেখুন",
    desc: "আমাদের সম্পূর্ণ সেবা তালিকা ব্রাউজ করুন এবং আপনার প্রয়োজন অনুযায়ী সঠিক সেবাটি খুঁজে নিন।",
    icon: "apps",
    link: "/services",
    linkText: "সকল সেবা →",
    colSpan: "md:col-span-4",
    bg: "bg-gradient-to-br from-[#002045] to-[#0a1628]",
    iconBg: "bg-white/10 text-white",
    btnStyle: "bg-blue-500 text-white hover:bg-blue-600",
    textWhite: true,
    large: false,
  },
];

export default function ServiceGrid() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {services.map((service) => (
          <div
            key={service.title}
            className={`${service.colSpan} group relative overflow-hidden rounded-2xl border border-gray-200 ${service.bg} ${service.borderLeft || ""} p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
          >
            <div
              className={
                service.large
                  ? "flex flex-col items-start gap-6 md:flex-row"
                  : "flex h-full flex-col"
              }
            >
              <div
                className={`h-14 w-14 rounded-xl ${service.iconBg} flex shrink-0 items-center justify-center ${service.large ? "" : "mb-5"}`}
              >
                <span className="material-symbols-outlined text-3xl">
                  {service.icon}
                </span>
              </div>

              <div className={service.large ? "" : "grow"}>
                <h3
                  className={`mb-3 text-xl font-bold md:text-2xl ${service.textWhite ? "text-white" : "text-[#002045]"}`}
                >
                  {service.title}
                </h3>
                <p
                  className={`mb-5 text-sm leading-relaxed ${service.textWhite ? "text-gray-300" : "text-gray-600"}`}
                >
                  {service.desc}
                </p>

                {service.features && (
                  <ul className="mb-6 grid grid-cols-1 gap-2 text-sm text-gray-600 sm:grid-cols-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <span
                          className="material-symbols-outlined text-lg text-[#0a6c44]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

                <div className={service.large ? "" : "mt-auto"}>
                  <Link
                    href={service.link}
                    className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all duration-300 ${service.btnStyle} ${
                      service.btnStyle.includes("bg-transparent")
                        ? "px-0 hover:underline"
                        : "shadow-sm hover:-translate-y-0.5 hover:shadow-md"
                    }`}
                  >
                    {service.linkText}
                    <span className="material-symbols-outlined text-lg">
                      {service.btnStyle.includes("bg-transparent")
                        ? "chevron_right"
                        : "arrow_forward"}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
