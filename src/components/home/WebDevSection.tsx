import Link from "next/link";
import { FaSearchengin } from "react-icons/fa";
import { MdDevices, MdOutlineSecurity, MdOutlineSpeed } from "react-icons/md";

export default function WebDevSection() {
  const features = [
    {
      icon: <MdOutlineSpeed />,
      title: "সুপার ফাস্ট পারফরম্যান্স",
      desc: "সর্বাধুনিক প্রযুক্তি ব্যবহার করে অত্যন্ত দ্রুত গতির ওয়েবসাইট",
    },
    {
      icon: <MdDevices />,
      title: "রেস্পন্সিভ ডিজাইন",
      desc: "মোবাইল, ট্যাবলেট এবং ডেক্সটপ সব ডিভাইসেই পারফেক্ট ভিউ",
    },
    {
      icon: <MdOutlineSecurity />,
      title: "সর্বোচ্চ নিরাপত্তা",
      desc: "আপনার ও কাস্টমারের ডেটা সুরক্ষিত রাখতে অ্যাডভান্সড সিকিউরিটি",
    },
    {
      icon: <FaSearchengin />,
      title: "এসইও ফ্রেন্ডলি",
      desc: "গুগল সার্চে আপনার ওয়েবসাইটকে সবার উপরে নিয়ে আসার ব্যবস্থা",
    },
  ];

  const technologies = [
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Next.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    },
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "Tailwind CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    },
    {
      name: "MongoDB",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
  ];

  return (
    <section
      id="webdev"
      className="relative overflow-hidden bg-white px-6 py-24"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-blue-50 blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-green-50 blur-[100px]"></div>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-[#002045]">
              <span className="material-symbols-outlined text-sm">code</span>
              প্রফেশনাল ওয়েব ডেভেলপমেন্ট
            </div>

            <h2 className="text-4xl leading-tight font-extrabold text-[#002045] md:text-5xl">
              আপনার ব্যবসার জন্য <br />
              <span className="bg-gradient-to-r from-[#002045] to-[#0a6c44] bg-clip-text text-transparent">
                কাস্টম ওয়েব সলিউশন
              </span>
            </h2>

            <p className="text-lg leading-relaxed text-gray-600">
              আমরা শুধুমাত্র টেমপ্লেট ব্যবহার করে ওয়েবসাইট বানাই না। আমরা আধুনিক
              প্রযুক্তি ব্যবহার করে একদম শূন্য থেকে আপনার ব্যবসার প্রয়োজন
              অনুযায়ী কাস্টম ওয়েবসাইট ডেভেলপ করি, যা হবে দ্রুত, নিরাপদ এবং
              আকর্ষণীয়।
            </p>

            <div className="grid grid-cols-1 gap-6 pt-4 sm:grid-cols-2">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#002045]">
                    <span className="material-symbols-outlined">
                      {feature.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <Link href="/business-solutions">
                <button className="flex transform items-center gap-2 rounded-xl bg-[#002045] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-blue-900 hover:shadow-xl">
                  ওয়েবসাইট প্যাকেজগুলো দেখুন
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </button>
              </Link>
            </div>
          </div>

          {/* Right Content / Visuals */}
          <div className="relative">
            <div className="absolute inset-0 scale-105 rotate-3 transform rounded-3xl bg-gradient-to-tr from-[#002045] to-[#0a6c44] opacity-10"></div>
            <div className="relative z-10 rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl">
              <h3 className="mb-8 text-center text-2xl font-bold text-gray-800">
                আমরা যে প্রযুক্তিগুলো ব্যবহার করি
              </h3>

              <div className="mb-10 grid grid-cols-3 place-items-center gap-8">
                {technologies.map((tech, idx) => (
                  <div
                    key={idx}
                    className="group flex flex-col items-center gap-3"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 p-3 transition-transform duration-300 group-hover:scale-110 group-hover:border-blue-100 group-hover:shadow-md">
                      <img
                        src={tech.icon}
                        alt={tech.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-500 transition-colors group-hover:text-[#002045]">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center">
                <h4 className="mb-2 font-bold text-[#002045]">
                  কেন কাস্টম কোডিং?
                </h4>
                <p className="text-sm leading-relaxed text-gray-600">
                  ওয়ার্ডপ্রেস বা অন্যান্য সিএমএস (CMS) এর তুলনায় কাস্টম কোডেড
                  ওয়েবসাইট অনেক বেশি ফাস্ট এবং সিকিউর। আপনার ব্যবসার প্রসারের
                  সাথে সাথে ওয়েবসাইটের ফাংশনালিটি বাড়ানোর ক্ষেত্রে কাস্টম কোড
                  সবচেয়ে ভালো পারফর্ম করে।
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
