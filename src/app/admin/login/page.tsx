"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
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

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to login as admin");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12">
      {/* Animated gradient background specifically for Admin (red/orange/purple hues) */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-slate-900 to-rose-950" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 h-96 w-96 rounded-full opacity-10 blur-3xl"
          style={{
            background: "radial-gradient(circle, #f43f5e 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, #e11d48 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-5 blur-3xl"
          style={{
            background: "radial-gradient(circle, #9f1239 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Brand header */}
        <div className="mb-8 text-center">
          <div
            className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg shadow-rose-500/20"
            style={{
              background: "linear-gradient(135deg, #f43f5e 0%, #be123c 100%)",
            }}
          >
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Admin Portal
          </h1>
          <p className="mt-2 text-sm text-rose-200/60">
            Authorized personnel only
          </p>
        </div>

        {/* Glassmorphism card */}
        <div
          className="rounded-2xl p-8 shadow-2xl"
          style={{
            background: "rgba(20, 20, 20, 0.4)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(244, 63, 94, 0.1)",
            boxShadow:
              "0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error alert */}
            {error && (
              <div
                className="flex items-center gap-3 rounded-xl p-4 text-sm"
                style={{
                  background: "rgba(244,63,94,0.1)",
                  border: "1px solid rgba(244,63,94,0.2)",
                }}
              >
                <svg
                  className="h-4 w-4 shrink-0 text-rose-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-rose-300">{error}</span>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="mb-2 block text-xs font-semibold tracking-widest text-slate-400 uppercase">
                Admin Email
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
                  <svg
                    className="h-4 w-4 transition-colors duration-200"
                    style={{
                      color:
                        focusedField === "email"
                          ? "#f43f5e"
                          : "rgba(148,163,184,0.6)",
                    }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <input
                  id="admin-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  required
                  placeholder="admin@servicehub.com"
                  className="w-full rounded-xl border border-white/5 bg-black/20 py-3.5 pr-4 pl-11 text-sm text-white transition-all duration-200 outline-none placeholder:text-slate-600 focus:border-rose-500/50 focus:bg-rose-500/5 focus:ring-1 focus:ring-rose-500/50"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-xs font-semibold tracking-widest text-slate-400 uppercase">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
                  <svg
                    className="h-4 w-4 transition-colors duration-200"
                    style={{
                      color:
                        focusedField === "password"
                          ? "#f43f5e"
                          : "rgba(148,163,184,0.6)",
                    }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  required
                  placeholder="Enter admin password"
                  className="w-full rounded-xl border border-white/5 bg-black/20 py-3.5 pr-12 pl-11 text-sm text-white transition-all duration-200 outline-none placeholder:text-slate-600 focus:border-rose-500/50 focus:bg-rose-500/5 focus:ring-1 focus:ring-rose-500/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-500 transition-opacity hover:opacity-80"
                >
                  {showPassword ? (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="relative mt-2 w-full overflow-hidden rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                background: "linear-gradient(135deg, #f43f5e 0%, #be123c 100%)",
                boxShadow: loading
                  ? "none"
                  : "0 4px 20px rgba(225, 29, 72, 0.4)",
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
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
                    Authenticating...
                  </>
                ) : (
                  <>
                    Secure Login
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
