"use client";

const features = [
  {
    icon: "verified_user",
    title: "নিরাপত্তা ও গোপনীয়তা",
    description:
      "আপনার সকল তথ্য এবং ডকুমেন্টস আমাদের কাছে সম্পূর্ণ নিরাপদ। আধুনিক এনক্রিপশন ব্যবস্থার মাধ্যমে আমরা সুরক্ষা নিশ্চিত করি।",
    accent: "blue",
  },
  {
    icon: "electric_bolt",
    title: "দ্রুত এবং নির্ভরযোগ্য",
    description:
      "আমাদের সিস্টেম ২৪/৭ সক্রিয় থাকে। দ্রুত আবেদন প্রক্রিয়াকরণ এবং তাৎক্ষণিক প্রতিক্রিয়া পান।",
    accent: "emerald",
  },
  {
    icon: "support_agent",
    title: "সার্বক্ষণিক সহায়তা",
    description:
      "আমাদের দক্ষ টিম সর্বদা আপনার সমস্যা সমাধানে প্রস্তুত। বাংলায় কাস্টমার সাপোর্ট পাবেন।",
    accent: "violet",
  },
];

const accentMap: Record<
  string,
  { iconBg: string; iconColor: string; borderHover: string }
> = {
  blue: {
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    borderHover: "hover:border-blue-200",
  },
  emerald: {
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    borderHover: "hover:border-emerald-200",
  },
  violet: {
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    borderHover: "hover:border-violet-200",
  },
};

export default function TrustIndicators() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50/50 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center sm:mb-16">
          <p
            className="mb-3 text-sm font-semibold tracking-wider text-blue-600 uppercase"
            style={{ fontFamily: "Hind Siliguri, sans-serif" }}
          >
            কেন আমরা
          </p>
          <h2
            className="mb-4 text-3xl font-bold text-[#002045] sm:text-4xl"
            style={{ fontFamily: "Hind Siliguri, sans-serif" }}
          >
            কেন আমাদের বেছে নেবেন?
          </h2>
          <p
            className="mx-auto max-w-2xl text-base leading-relaxed text-gray-500"
            style={{ fontFamily: "Hind Siliguri, sans-serif" }}
          >
            আমরা শুধুমাত্র সার্ভিস দিই না, আমরা দিই এক নির্ভরযোগ্য অংশীদারিত্বের
            নিশ্চয়তা।
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature, index) => {
            const colors = accentMap[feature.accent];
            return (
              <div
                key={index}
                className={`group relative rounded-2xl border border-gray-100 bg-white p-8 ${colors.borderHover} overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl`}
              >
                {/* Subtle hover glow */}
                <div
                  className={`absolute top-0 right-0 h-40 w-40 ${colors.iconBg} translate-x-12 -translate-y-12 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-40`}
                />

                <div className="relative z-10 space-y-5 text-center">
                  <div
                    className={`h-16 w-16 ${colors.iconBg} ${colors.iconColor} mx-auto flex items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110`}
                  >
                    <span
                      className="material-symbols-outlined text-3xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {feature.icon}
                    </span>
                  </div>
                  <h3
                    className="text-xl font-bold text-[#002045]"
                    style={{ fontFamily: "Hind Siliguri, sans-serif" }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed text-gray-500"
                    style={{ fontFamily: "Hind Siliguri, sans-serif" }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
