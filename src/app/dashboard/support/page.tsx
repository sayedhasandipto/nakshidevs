"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";

export default function SupportPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const [activeTab, setActiveTab] = useState<"faq" | "contact">("faq");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    subject: "",
    category: "general",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      question: "কিভাবে একটি সার্ভিস অর্ডার করব?",
      answer:
        "Services পেজে গিয়ে আপনার প্রয়োজনীয় সার্ভিসটি সিলেক্ট করুন। সার্ভিসের বিস্তারিত দেখে 'Order Now' বাটনে ক্লিক করুন এবং প্রয়োজনীয় তথ্য পূরণ করে সাবমিট করুন।",
    },
    {
      question: "অর্ডারের স্ট্যাটাস কিভাবে চেক করব?",
      answer:
        "Dashboard > Orders পেজে গিয়ে আপনার সব অর্ডারের বর্তমান স্ট্যাটাস দেখতে পারবেন। প্রতিটি অর্ডারে ক্লিক করলে বিস্তারিত তথ্য পাবেন।",
    },
    {
      question: "পেমেন্ট মেথড কী কী?",
      answer:
        "আমরা বিকাশ, নগদ, রকেট এবং ব্যাংক ট্রান্সফারের মাধ্যমে পেমেন্ট গ্রহণ করি। অর্ডার কনফার্ম হওয়ার পর পেমেন্ট ডিটেইলস পাঠানো হবে।",
    },
    {
      question: "রিফান্ড পলিসি কী?",
      answer:
        "সার্ভিস শুরু হওয়ার আগে সম্পূর্ণ রিফান্ড পাওয়া যাবে। সার্ভিস চলাকালীন সময়ে আংশিক রিফান্ড প্রযোজ্য হতে পারে। বিস্তারিত জানতে সাপোর্ট টিমের সাথে যোগাযোগ করুন।",
    },
    {
      question: "প্রোফাইল তথ্য কিভাবে আপডেট করব?",
      answer:
        "Dashboard > Profile Settings পেজে গিয়ে আপনার নাম, ইমেইল, ফোন নম্বর এবং অন্যান্য তথ্য আপডেট করতে পারবেন।",
    },
    {
      question: "সার্ভিস ডেলিভারি সময় কত?",
      answer:
        "প্রতিটি সার্ভিসের জন্য আনুমানিক ডেলিভারি সময় সার্ভিস পেজে উল্লেখ আছে। সাধারণত ৩-১৫ কার্যদিবসের মধ্যে সার্ভিস সম্পন্ন হয়।",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send data to the backend
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ subject: "", category: "general", message: "" });
    }, 4000);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          সাপোর্ট সেন্টার
        </h1>
        <p className="mt-2 text-gray-500">
          আপনার যেকোনো প্রশ্ন বা সমস্যার জন্য আমরা এখানে আছি
        </p>
      </div>

      {/* Quick Contact Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <span className="material-symbols-outlined text-2xl">call</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">ফোন</p>
            <p className="font-semibold text-gray-900">+880 1940-863413</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
            <span className="material-symbols-outlined text-2xl">chat</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">WhatsApp</p>
            <p className="font-semibold text-gray-900">+880 1940-863413</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <span className="material-symbols-outlined text-2xl">mail</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">ইমেইল</p>
            <p className="font-semibold text-gray-900">
              support.nakshidevs@gmail.com
            </p>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="mb-6 flex gap-2 rounded-xl bg-gray-100 p-1">
        <button
          onClick={() => setActiveTab("faq")}
          className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
            activeTab === "faq"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <span className="material-symbols-outlined mr-2 align-middle text-lg">
            help
          </span>
          সচরাচর জিজ্ঞাসা (FAQ)
        </button>
        <button
          onClick={() => setActiveTab("contact")}
          className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
            activeTab === "contact"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <span className="material-symbols-outlined mr-2 align-middle text-lg">
            send
          </span>
          মেসেজ পাঠান
        </button>
      </div>

      {/* FAQ Section */}
      {activeTab === "faq" && (
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <button
                onClick={() =>
                  setExpandedFaq(expandedFaq === index ? null : index)
                }
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="pr-4 font-medium text-gray-900">
                  {faq.question}
                </span>
                <span
                  className={`material-symbols-outlined text-xl text-gray-400 transition-transform duration-200 ${
                    expandedFaq === index ? "rotate-180" : ""
                  }`}
                >
                  expand_more
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedFaq === index ? "max-h-40 pb-5" : "max-h-0"
                }`}
              >
                <p className="px-6 leading-relaxed text-gray-600">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Contact Form Section */}
      {activeTab === "contact" && (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          {submitted ? (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <span className="material-symbols-outlined text-3xl text-green-600">
                  check_circle
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                মেসেজ পাঠানো হয়েছে!
              </h3>
              <p className="mt-2 text-gray-500">
                আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  আপনার নাম
                </label>
                <input
                  type="text"
                  value={user?.name || ""}
                  disabled
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  ইমেইল
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  ক্যাটাগরি
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                >
                  <option value="general">সাধারণ প্রশ্ন</option>
                  <option value="order">অর্ডার সমস্যা</option>
                  <option value="payment">পেমেন্ট সমস্যা</option>
                  <option value="refund">রিফান্ড</option>
                  <option value="technical">টেকনিক্যাল সমস্যা</option>
                  <option value="other">অন্যান্য</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  বিষয়
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="আপনার সমস্যার বিষয় লিখুন"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  মেসেজ
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="আপনার সমস্যা বিস্তারিত লিখুন..."
                  required
                  rows={5}
                  className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-[#002045] px-6 py-3.5 font-medium text-white shadow-md transition-all duration-200 hover:bg-[#003070] hover:shadow-lg active:scale-[0.98]"
              >
                <span className="material-symbols-outlined mr-2 align-middle text-lg">
                  send
                </span>
                মেসেজ পাঠান
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
