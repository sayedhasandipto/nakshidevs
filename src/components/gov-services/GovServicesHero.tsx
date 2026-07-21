import { LuFlag } from "react-icons/lu";

export default function GovServicesHero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#001830] via-[#002045] to-[#0a1628] px-6 py-24">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-0 left-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-1/3 bottom-0 h-80 w-80 rounded-full bg-emerald-500/8 blur-3xl" />

      <div className="relative mx-auto max-w-4xl text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-2 text-sm font-semibold tracking-wide text-emerald-400">
          <LuFlag className="h-4 w-4" /> সরকারি সেবা পোর্টাল
        </span>
        <h1 className="mb-6 text-4xl leading-tight font-extrabold text-white md:text-6xl">
          নাগরিক সেবা
          <span className="mt-2 block bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            ডিরেক্টরি
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl">
          বাংলাদেশের নাগরিকদের জন্য ডিজিটাল প্রশাসনিক সেবা এখন হাতের মুঠোয়।
          দ্রুত এবং স্বচ্ছ আবেদন প্রক্রিয়ার মাধ্যমে আপনার প্রয়োজনীয় সেবা
          গ্রহণ করুন।
        </p>
      </div>
    </section>
  );
}
