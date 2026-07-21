"use client";

import { useState } from "react";
import Header from "@/components/home/Header";
import Footer from "@/components/layout/Footer";
import {
  LuPhone,
  LuMail,
  LuMapPin,
  LuSend,
  LuClock,
  LuMessageSquare,
} from "react-icons/lu";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Mock API call to simulate message sending
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success(
        "আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে! আমরা দ্রুত যোগাযোগ করব।",
      );
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("দুঃখিত, বার্তাটি পাঠানো যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 pt-24 font-sans text-slate-800">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#001830] via-[#002045] to-[#0a1628] px-6 py-20 text-center text-white">
          <div className="pointer-events-none absolute top-0 left-1/4 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl" />
          <div className="pointer-events-none absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl" />

          <div className="relative mx-auto max-w-3xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-blue-400 uppercase">
              <LuMessageSquare className="h-4 w-4" /> যোগাযোগ করুন
            </span>
            <h1 className="mb-6 text-3xl font-extrabold md:text-5xl">
              আমাদের সাথে{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                যোগাযোগ করুন
              </span>
            </h1>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-300 md:text-base">
              আপনার যেকোনো প্রশ্ন, জিজ্ঞাসা বা নতুন কোনো প্রজেক্টের ব্যাপারে
              আমাদের সাথে কথা বলুন। আমাদের টিম আপনাকে সাহায্য করতে প্রস্তুত।
            </p>
          </div>
        </section>

        {/* Contact Info & Form Section */}
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Info Cards Column */}
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                <h3 className="mb-6 text-lg font-bold text-[#002045]">
                  যোগাযোগের মাধ্যম
                </h3>
                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <LuPhone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                        আমাদের ফোন নম্বর
                      </p>
                      <a
                        href="tel:+8801940863413"
                        className="mt-1 block text-base font-bold text-gray-700 transition-colors hover:text-blue-600"
                      >
                        +৮৮০ ১৯৪০-৮৬৩৪১৩
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <LuMail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                        আমাদের ইমেইল
                      </p>
                      <a
                        href="mailto:info.nakshidevs@gmail.com"
                        className="mt-1 block text-base font-bold text-gray-700 transition-colors hover:text-indigo-600"
                      >
                        info.nakshidevs@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                      <LuMapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                        আমাদের ঠিকানা
                      </p>
                      <p className="mt-1 text-sm leading-relaxed font-medium text-gray-600">
                        বকশীগঞ্জ, জামালপুর, ময়মনসিংহ।
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Hours Card */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                    <LuClock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#002045]">
                      সহায়তার সময়সূচী
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-gray-500">
                      আমরা সপ্তাহের ৭ দিন, ২৪ ঘণ্টা আমাদের গ্রাহকদের জরুরি
                      প্রযুক্তিগত সহায়তা প্রদান করে থাকি। যেকোনো সাধারণ
                      জিজ্ঞাসার জন্য আমাদের সাপোর্ট টিম সাধারণত ২-৪ ঘণ্টার মধ্যে
                      উত্তর দিয়ে থাকে।
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <h3 className="mb-2 text-xl font-bold text-[#002045]">
                  আমাদের বার্তা পাঠান
                </h3>
                <p className="mb-6 text-sm text-gray-500">
                  নিচের ফর্মটি পূরণ করুন এবং আপনার মেসেজটি আমাদের টিমকে জানিয়ে
                  দিন।
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="name-input"
                        className="text-xs font-bold text-gray-600"
                      >
                        আপনার নাম
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name-input"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:outline-hidden"
                        placeholder="উদা: রিফাত হাসান"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="email-input"
                        className="text-xs font-bold text-gray-600"
                      >
                        আপনার ইমেইল
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email-input"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:outline-hidden"
                        placeholder="name@example.com"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="subject-input"
                      className="text-xs font-bold text-gray-600"
                    >
                      বার্তার বিষয়
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject-input"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:outline-hidden"
                      placeholder="কোন বিষয়ে যোগাযোগ করতে চান"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="message-input"
                      className="text-xs font-bold text-gray-600"
                    >
                      আপনার বার্তা
                    </label>
                    <textarea
                      name="message"
                      id="message-input"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:outline-hidden"
                      placeholder="এখানে আপনার বার্তাটি লিখুন..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="submit-button"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#002045] py-4 font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#001530] disabled:pointer-events-none disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <>
                        <LuSend className="h-4 w-4" /> বার্তা পাঠান
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
