"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Home from "@/app/page";
import {
  ArrowRight,
  Eye,
  EyeOff,
  HomeIcon,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";
export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const ADMIN_EMAIL = "admin@servicehub.com";

    try {
      if (formData.email.trim() === ADMIN_EMAIL) {
        // Route through admin login API
        const res = await fetch("/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to login as admin");
        }

        router.push("/admin");
        router.refresh();
      } else {
        // Normal user login via better-auth
        const { error: authError } = await authClient.signIn.email({
          email: formData.email,
          password: formData.password,
          callbackURL: "/dashboard",
        });

        if (authError) {
          throw new Error(authError.message ?? "Failed to sign in");
        }

        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12"
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

      <div className="relative z-10 w-full max-w-105 px-2">
        {/* Brand Header */}
        <div className="mb-6 flex flex-col items-center">
          <Link
            href="/"
            className="group mb-4 flex items-center gap-2 rounded-full border border-white/8 bg-white/5 px-3.5 py-1.5 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:bg-white/8"
          >
            <HomeIcon className="h-3.5 w-3.5 text-blue-400 transition-transform group-hover:scale-110" />
            <span
              className="text-[10px] font-bold tracking-wider text-white/70 uppercase transition-colors group-hover:text-white"
              style={{ fontFamily: "Hind Siliguri, sans-serif" }}
            >
              NakshiDevs
            </span>
          </Link>
          <h1
            className="text-3xl font-extrabold tracking-tight text-white"
            style={{ fontFamily: "Hind Siliguri, sans-serif" }}
          >
            স্বাগতম
          </h1>
          <p
            className="mt-1.5 text-sm text-white/50"
            style={{ fontFamily: "Hind Siliguri, sans-serif" }}
          >
            আপনার অ্যাকাউন্টে লগইন করুন
          </p>
        </div>

        {/* Premium Card Container */}
        <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/4 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          {/* Border Accent Line */}
          <div className="absolute top-0 left-0 h-0.5 w-full bg-linear-to-r from-blue-500 via-emerald-400 to-violet-500" />

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

            {/* Email Field */}
            <div className="space-y-2">
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
                  id="login-email"
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

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  className="block text-xs font-semibold tracking-wider text-white/60 uppercase"
                  style={{ fontFamily: "Hind Siliguri, sans-serif" }}
                >
                  পাসওয়ার্ড (Password)
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-blue-400 transition-colors hover:text-blue-300"
                  style={{ fontFamily: "Hind Siliguri, sans-serif" }}
                >
                  পাসওয়ার্ড ভুলে গেছেন?
                </Link>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 transition-colors duration-200">
                  <Lock
                    className={`h-4 w-4 ${focusedField === "password" ? "text-blue-400" : "text-white/30"}`}
                  />
                </div>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  required
                  placeholder="••••••••"
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
                    লগইন হচ্ছে...
                  </>
                ) : (
                  <>
                    লগইন করুন
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </span>
            </button>

            {/* Bottom Link */}
            <div
              className="pt-2 text-center text-sm text-white/50"
              style={{ fontFamily: "Hind Siliguri, sans-serif" }}
            >
              নতুন অ্যাকাউন্ট খুলতে চান?{" "}
              <Link
                href="/auth/signup"
                className="font-bold text-blue-400 transition-colors hover:text-blue-300"
              >
                নিবন্ধন করুন
              </Link>
            </div>
          </form>
        </div>

        <p
          className="mt-6 text-center text-xs text-white/20"
          style={{ fontFamily: "Hind Siliguri, sans-serif" }}
        >
          সুরক্ষিত এবং বিশ্বস্ত নাগরিক সেবা পোর্টাল
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
