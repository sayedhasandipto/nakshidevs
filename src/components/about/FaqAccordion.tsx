"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How long does a project take?",
    a: "Depending on complexity, most websites are delivered within 2–6 weeks. We always agree on a timeline upfront.",
  },
  {
    q: "Do you offer revisions?",
    a: "Yes! All our packages include revision rounds to ensure you are 100% satisfied with the final result.",
  },
  {
    q: "What happens after delivery?",
    a: "We provide post-delivery support. Our Premium and Standard plans include months of dedicated support.",
  },
  {
    q: "Can I upgrade my plan later?",
    a: "Absolutely. You can upgrade your package at any time and we will apply a credit for what you already paid.",
  },
];

export default function FaqAccordion() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
        >
          <button
            onClick={() => setOpenFaq(openFaq === i ? null : i)}
            className="flex w-full items-center justify-between p-6 text-left transition-colors duration-200 hover:bg-gray-50"
          >
            <span className="pr-4 font-semibold text-[#002045]">{faq.q}</span>
            <span
              className={`shrink-0 text-2xl font-bold text-blue-600 transition-transform duration-300 ${openFaq === i ? "rotate-45" : ""}`}
            >
              +
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <p className="px-6 pb-6 text-sm leading-relaxed text-gray-600">
              {faq.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
