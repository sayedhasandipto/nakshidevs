"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  ArrowRight,
  Building2,
  Eye,
  EyeOff,
  Home,
  Lock,
  Mail,
  ShieldCheck,
  User,
  UserCircle2,
  Wrench,
} from "lucide-react";
import Link from "next/link";
const ROLES = [
  {
    value: "client",
    label: "গ্রাহক (Client)",
    icon: UserCircle2,
    desc: "Looking for services",
  },
  {
    value: "provider",
    label: "সেবাদাতা (Provider)",
    icon: Wrench,
    desc: "Offering my skills",
  },
  {
    value: "business",
    label: "ব্যবসা (Business)",
    icon: Building2,
    desc: "Managing business",
  },
];

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "client",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("পাসওয়ার্ড মিলছে না");
      return;
    }
    if (formData.password.length < 8) {
      setError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error: authError } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role as any,
        callbackURL: "/dashboard",
      });

      if (authError) {
        throw new Error(
          authError.message ?? "অ্যাকাউন্ট তৈরি করতে ব্যর্থ হয়েছে",
        );
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message ?? "একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const len = formData.password.length;
    if (len === 0) return 0;
    if (len < 6) return 1;
    if (len < 10) return 2;
    if (len < 14) return 3;
    return 4;
  };

  const strength = getPasswordStrength();

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-16"
      style={{
        background:
          "linear-gradient(135deg, #0a1628 0%, #0d2137 25%, #0f2b4a 50%, #0a2240 75%, #091a30 100%)",
      }}
    >
      {/* Animated Mesh Gradient Background (Matching Home Page) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-37.5 -right-37.5 h-175 w-175 rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)",
            animation: "float 12s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-25 -left-25 h-125 w-125 rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.25) 0%, transparent 70%)",
            animation: "float 15s ease-in-out infinite reverse",
          }}
        />
        {/* Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-lg px-2">
        {/* Brand Header */}
        <div className="mb-6 flex flex-col items-center text-center">
          {/* Home Link / Badge */}
          <Link
            href="/"
            className="group mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:bg-white/10"
          >
            <Home className="h-3.5 w-3.5 text-blue-400 transition-transform group-hover:scale-110" />
            <span
              className="text-[10px] font-bold tracking-wider text-white/70 uppercase transition-colors group-hover:text-white"
              style={{ fontFamily: "Hind Siliguri, sans-serif" }}
            >
              NakshiDevs
            </span>
          </Link>

          {/* Main Heading */}
          <h1
            className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl"
            style={{ fontFamily: "Hind Siliguri, sans-serif" }}
          >
            নিবন্ধন করুন
          </h1>

          {/* Subtitle */}
          <p
            className="mt-1.5 text-sm text-white/60"
            style={{ fontFamily: "Hind Siliguri, sans-serif" }}
          >
            নতুন অ্যাকাউন্ট তৈরি করুন
          </p>
        </div>

        {/* Premium Card Container */}
        <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/4 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          {/* Border Accent Line */}
          <div className="h-05 absolute top-0 left-0 w-full bg-linear-to-r from-blue-500 via-emerald-400 to-violet-500" />

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message */}
            {error && (
              <div
                className="animate-in fade-in flex items-center gap-3 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3.5 text-xs text-rose-300 duration-300"
                style={{ fontFamily: "Hind Siliguri, sans-serif" }}
              >
                <ShieldCheck className="h-4.5 w-4.5 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Full Name */}
            <div className="space-y-1">
              <label
                className="block text-xs font-semibold tracking-wider text-white/60 uppercase"
                style={{ fontFamily: "Hind Siliguri, sans-serif" }}
              >
                পূর্ণ নাম (Full Name)
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 transition-colors duration-200">
                  <User
                    className={`h-4 w-4 ${focusedField === "name" ? "text-blue-400" : "text-white/30"}`}
                  />
                </div>
                <input
                  id="signup-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  required
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-white/6 bg-white/5 py-3.5 pr-4 pl-11 text-sm text-white transition-all duration-300 outline-none placeholder:text-white/20 focus:border-blue-500/50 focus:bg-white/8"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label
                className="block text-xs font-semibold tracking-wider text-white/60 uppercase"
                style={{ fontFamily: "Hind Siliguri, sans-serif" }}
              >
                ইমেইল ঠিকানা (Email)
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 transition-colors duration-200">
                  <Mail
                    className={`h-4 w-4 ${focusedField === "email" ? "text-blue-400" : "text-white/30"}`}
                  />
                </div>
                <input
                  id="signup-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  required
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-white/6 bg-white/5 py-3.5 pr-4 pl-11 text-sm text-white transition-all duration-300 outline-none placeholder:text-white/20 focus:border-blue-500/50 focus:bg-white/8"
                />
              </div>
            </div>

            {/* Account Type Selector */}
            <div className="space-y-1">
              <label
                className="block text-xs font-semibold tracking-wider text-white/60 uppercase"
                style={{ fontFamily: "Hind Siliguri, sans-serif" }}
              >
                অ্যাকাউন্টের ধরন (Account Type)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {ROLES.map((r) => {
                  const Icon = r.icon;
                  const isSelected = formData.role === r.value;
                  return (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() =>
                        setFormData((p) => ({ ...p, role: r.value }))
                      }
                      className="flex flex-col items-center gap-1.5 rounded-xl border border-white/6 bg-white/3 p-2.5 text-center transition-all duration-300 hover:border-blue-500/30 hover:bg-white/6"
                      style={{
                        borderColor: isSelected
                          ? "rgba(59, 130, 246, 0.4)"
                          : "",
                        backgroundColor: isSelected
                          ? "rgba(59, 130, 246, 0.08)"
                          : "",
                        boxShadow: isSelected
                          ? "0 0 15px -3px rgba(59, 130, 246, 0.2)"
                          : "",
                      }}
                    >
                      <Icon
                        className={`h-4 w-4 ${isSelected ? "text-blue-400" : "text-white/30"}`}
                      />
                      <span
                        className={`text-[9px] font-bold tracking-tight ${isSelected ? "text-white" : "text-white/40"}`}
                        style={{ fontFamily: "Hind Siliguri, sans-serif" }}
                      >
                        {r.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label
                className="block text-xs font-semibold tracking-wider text-white/60 uppercase"
                style={{ fontFamily: "Hind Siliguri, sans-serif" }}
              >
                পাসওয়ার্ড (Password)
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 transition-colors duration-200">
                  <Lock
                    className={`h-4 w-4 ${focusedField === "password" ? "text-blue-400" : "text-white/30"}`}
                  />
                </div>
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  required
                  minLength={8}
                  placeholder="Min. 8 characters"
                  className="w-full rounded-xl border border-white/6 bg-white/5 py-3.5 pr-12 pl-11 text-sm text-white transition-all duration-300 outline-none placeholder:text-white/20 focus:border-blue-500/50 focus:bg-white/8"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-white/30 transition-colors hover:text-white/60"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="flex gap-1.5 pt-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className="h-1 flex-1 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor:
                          strength >= level
                            ? strength === 1
                              ? "#ef4444"
                              : strength === 2
                                ? "#f59e0b"
                                : strength === 3
                                  ? "#10b981"
                                  : "#3b82f6"
                            : "rgba(255, 255, 255, 0.08)",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1">
              <label
                className="block text-xs font-semibold tracking-wider text-white/60 uppercase"
                style={{ fontFamily: "Hind Siliguri, sans-serif" }}
              >
                পাসওয়ার্ড নিশ্চিত করুন (Confirm Password)
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 transition-colors duration-200">
                  <Lock
                    className={`h-4 w-4 ${focusedField === "confirm" ? "text-blue-400" : "text-white/30"}`}
                  />
                </div>
                <input
                  id="signup-confirm-password"
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("confirm")}
                  onBlur={() => setFocusedField(null)}
                  required
                  placeholder="Re-enter password"
                  className="w-full rounded-xl border border-white/6 bg-white/5 py-3.5 pr-12 pl-11 text-sm text-white transition-all duration-300 outline-none placeholder:text-white/20 focus:border-blue-500/50 focus:bg-white/8"
                  style={{
                    borderColor:
                      formData.confirmPassword &&
                      formData.confirmPassword !== formData.password
                        ? "rgba(239,68,68,0.4)"
                        : formData.confirmPassword &&
                            formData.confirmPassword === formData.password
                          ? "rgba(16,185,129,0.4)"
                          : "",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-white/30 transition-colors hover:text-white/60"
                >
                  {showConfirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-xl py-3.5 text-sm font-bold text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                boxShadow: loading
                  ? "none"
                  : "0 8px 20px -4px rgba(59, 130, 246, 0.4)",
                fontFamily: "Hind Siliguri, sans-serif",
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    নিবন্ধন হচ্ছে...
                  </>
                ) : (
                  <>
                    নিবন্ধন সম্পন্ন করুন
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </span>
            </button>

            {/* Bottom Link */}
            <div
              className="pt-1 text-center text-sm text-white/50"
              style={{ fontFamily: "Hind Siliguri, sans-serif" }}
            >
              ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
              <Link
                href="/auth/login"
                className="font-bold text-blue-400 transition-colors hover:text-blue-300"
              >
                লগইন করুন
              </Link>
            </div>
          </form>
        </div>

        <p
          className="mt-6 text-center text-xs text-white/20"
          style={{ fontFamily: "Hind Siliguri, sans-serif" }}
        >
          নিবন্ধন করার মাধ্যমে আপনি আমাদের শর্তাবলীর সাথে সম্মত হচ্ছেন
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
      `}</style>
    </div>
  );
}
