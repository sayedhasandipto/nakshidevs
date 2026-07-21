import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/home/Header";
import FaqAccordion from "@/components/about/FaqAccordion";
import {
  LuTrophy,
  LuSmile,
  LuZap,
  LuShield,
  LuTarget,
  LuLock,
  LuRocket,
  LuBuilding,
} from "react-icons/lu";

export const metadata: Metadata = {
  title: "About Us | NakshiDevs",
  description:
    "Learn about NakshiDevs — our mission, team, and commitment to delivering premium digital services.",
};

const stats = [
  {
    value: "500+",
    label: "Projects Completed",
    icon: LuTrophy,
    iconColor: "text-yellow-500",
  },
  {
    value: "200+",
    label: "Happy Clients",
    icon: LuSmile,
    iconColor: "text-pink-500",
  },
  {
    value: "5+",
    label: "Years Experience",
    icon: LuZap,
    iconColor: "text-amber-500",
  },
  {
    value: "24/7",
    label: "Support Available",
    icon: LuShield,
    iconColor: "text-blue-500",
  },
];

const team = [
  {
    name: "Robiul Hasan Resad",
    role: "Founder & CEO",
    bio: "Visionary entrepreneur with 7+ years in web development and digital transformation.",
    initials: "SH",
    linear: "from-blue-500 to-indigo-600",
  },
  {
    name: "Refat Raihan",
    role: "UI/UX Designers",
    bio: "Creative minds crafting pixel-perfect, user-centric interfaces that convert visitors.",
    initials: "DT",
    linear: "from-purple-500 to-pink-600",
  },
  {
    name: "Sayed Hasan Dipto",
    role: "Full-Stack Engineers",
    bio: "Expert engineers building scalable, high-performance web applications.",
    initials: "DV",
    linear: "from-emerald-500 to-teal-600",
  },
];

const values = [
  {
    icon: LuTarget,
    iconColor: "text-red-500",
    title: "Client-First",
    desc: "Every decision guided by what delivers the most value to our clients.",
  },
  {
    icon: LuZap,
    iconColor: "text-amber-500",
    title: "Speed & Quality",
    desc: "Delivered on time without compromising the quality that sets our work apart.",
  },
  {
    icon: LuLock,
    iconColor: "text-blue-500",
    title: "Trust & Transparency",
    desc: "Open communication and honest pricing — no hidden fees, no surprises.",
  },
  {
    icon: LuRocket,
    iconColor: "text-indigo-500",
    title: "Innovation-Driven",
    desc: "Modern technologies building future-proof digital solutions.",
  },
];

const services = [
  "Custom Website Development",
  "E-Commerce Solutions",
  "UI/UX Design & Branding",
  "SEO & Digital Marketing",
  "Ongoing Support & Maintenance",
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden bg-white">
        {/* ── Hero ─────────────────────────────────── */}
        <section className="relative overflow-hidden bg-linear-to-br from-[#001830] via-[#002045] to-[#0a1628] px-6 py-32">
          <div className="pointer-events-none absolute top-0 left-1/4 h-125 w-125 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="pointer-events-none absolute right-1/4 bottom-0 h-100 w-100 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="relative mx-auto max-w-4xl text-center">
            <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm font-semibold tracking-wide text-blue-400">
              <LuBuilding className="h-4 w-4" /> About NakshiDevs
            </span>
            <h1 className="mb-6 text-4xl leading-tight font-extrabold text-white md:text-6xl">
              Building the Future of
              <span className="mt-2 block bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Digital Bangladesh
              </span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl">
              We are a passionate team of developers, designers, and strategists
              dedicated to helping businesses thrive in the digital era with
              premium web solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/#pricing"
                className="rounded-xl bg-blue-500 px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:shadow-blue-500/40"
              >
                View Our Packages
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </section>

        {/* ── Stats ─────────────────────────────────── */}
        <section className="bg-gray-50 px-6 py-16">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group cursor-default rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-2 flex justify-center">
                  <stat.icon
                    className={`h-8 w-8 transition-transform duration-200 group-hover:scale-110 ${stat.iconColor}`}
                  />
                </div>
                <p className="mb-1 text-3xl font-extrabold text-[#002045] md:text-4xl">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-gray-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Mission ─────────────────────────────────── */}
        <section className="px-6 py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
            <div>
              <span className="text-sm font-semibold tracking-widest text-blue-600 uppercase">
                Our Mission
              </span>
              <h2 className="mt-3 text-3xl leading-snug font-bold text-[#002045] md:text-4xl">
                Empowering Businesses
                <br />
                Through Technology
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-600">
                At NakshiDevs, our mission is to make premium digital services
                accessible to every business — from ambitious startups to
                established enterprises.
              </p>
              <p className="mt-4 leading-relaxed text-gray-500">
                We have helped hundreds of clients across Bangladesh transform
                their online presence and achieve measurable growth with
                world-class web solutions.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/#pricing"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#002045] px-7 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#001530]"
                >
                  See Packages →
                </Link>
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-[#002045] px-7 py-3 font-semibold text-[#002045] transition-all duration-300 hover:bg-[#002045] hover:text-white"
                >
                  Log In
                </Link>
              </div>
            </div>

            {/* Services checklist card */}
            <div className="group relative">
              <div className="rounded-3xl bg-linear-to-br from-[#002045] to-[#0a1628] p-8 text-white shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="mb-6 text-lg font-bold text-blue-300">
                  What We Offer
                </h3>
                <div className="space-y-3">
                  {services.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition-all duration-200 hover:border-blue-400/30 hover:bg-white/10"
                    >
                      <span className="shrink-0 text-lg font-bold text-green-400">
                        ✓
                      </span>
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-blue-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          </div>
        </section>

        {/* ── Core Values ─────────────────────────────────── */}
        <section className="bg-linear-to-b from-gray-50 to-white px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 text-center">
              <span className="text-sm font-semibold tracking-widest text-blue-600 uppercase">
                What We Stand For
              </span>
              <h2 className="mt-3 text-3xl font-bold text-[#002045] md:text-4xl">
                Our Core Values
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="group cursor-default rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="mb-4 flex">
                    <value.icon
                      className={`h-10 w-10 transition-transform duration-200 group-hover:scale-110 ${value.iconColor}`}
                    />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-[#002045]">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-500">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team ─────────────────────────────────── */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 text-center">
              <span className="text-sm font-semibold tracking-widest text-blue-600 uppercase">
                The People Behind the Work
              </span>
              <h2 className="mt-3 text-3xl font-bold text-[#002045] md:text-4xl">
                Meet Our Team
              </h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="group rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
                >
                  <div
                    className={`h-20 w-20 rounded-2xl bg-linear-to-br ${member.linear} mx-auto mb-5 flex items-center justify-center text-2xl font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    {member.initials}
                  </div>
                  <h3 className="text-xl font-bold text-[#002045]">
                    {member.name}
                  </h3>
                  <p className="mb-3 text-sm font-medium text-blue-600">
                    {member.role}
                  </p>
                  <p className="text-sm leading-relaxed text-gray-500">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────── */}
        <section className="bg-gray-50 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <span className="text-sm font-semibold tracking-widest text-blue-600 uppercase">
                Got Questions?
              </span>
              <h2 className="mt-3 text-3xl font-bold text-[#002045] md:text-4xl">
                Frequently Asked
              </h2>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────── */}
        <section className="relative overflow-hidden bg-linear-to-br from-[#001830] via-[#002045] to-[#0a1628] px-6 py-24">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-1/2 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-3xl text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm font-semibold text-blue-400">
              <LuRocket className="h-4 w-4" /> Ready to get started?
            </span>
            <h2 className="mb-5 text-3xl leading-tight font-extrabold text-white md:text-5xl">
              Let&apos;s Build Something
              <br />
              <span className="bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Great Together
              </span>
            </h2>
            <p className="mx-auto mb-12 max-w-xl text-lg text-gray-300">
              Explore our packages and start your digital journey today. No
              commitment required.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/#pricing"
                className="rounded-xl bg-blue-500 px-10 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:shadow-blue-500/30"
              >
                View Packages →
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-xl border border-white/20 bg-white/10 px-10 py-4 font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
