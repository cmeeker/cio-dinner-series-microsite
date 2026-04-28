"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import WorkatoLogo from "@/components/WorkatoLogo";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push(from);
        router.refresh();
      } else {
        setError("Incorrect credentials.");
        setShake(true);
        setTimeout(() => setShake(false), 600);
        setPassword("");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `
    w-full px-4 py-3.5 rounded-xl text-[14px] outline-none transition-all duration-200
    bg-[var(--surface)] border
    placeholder:text-[rgba(255,255,255,0.25)]
    text-[var(--text)]
    focus:border-[var(--teal-line)]
    focus:bg-[rgba(103,234,221,0.04)]
  `;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(103,234,221,0.05) 0%, transparent 65%)",
        }}
      />
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* Card */}
      <div
        className={`relative z-10 w-full max-w-sm transition-transform duration-100 ${shake ? "animate-[shake_0.5s_ease]" : ""}`}
        style={{
          animation: shake ? "shake 0.5s ease" : undefined,
        }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <WorkatoLogo className="w-12 h-12 mb-4" />
          <h1
            className="text-[28px] font-light text-center"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            CIO Dinner Series
          </h1>
          <p
            className="text-[12px] tracking-[0.14em] uppercase mt-1"
            style={{ color: "var(--text-muted)" }}
          >
            North America · FY27
          </p>
        </div>

        {/* Form card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "var(--card)",
            border: "1px solid rgba(103,234,221,0.10)",
          }}
        >
          <div
            className="h-[2px]"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--teal), transparent)",
            }}
          />
          <form onSubmit={handleSubmit} className="p-8 space-y-4">
            <input
              ref={usernameRef}
              type="text"
              autoComplete="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={inputClass}
              style={{
                borderColor: error
                  ? "rgba(255,100,100,0.4)"
                  : "rgba(255,255,255,0.08)",
              }}
              required
            />
            <input
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              style={{
                borderColor: error
                  ? "rgba(255,100,100,0.4)"
                  : "rgba(255,255,255,0.08)",
              }}
              required
            />

            {error && (
              <p
                className="text-[12px] text-center"
                style={{ color: "rgba(255,120,120,0.9)" }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !username || !password}
              className="w-full py-3.5 rounded-xl text-[14px] font-medium tracking-wide transition-all duration-200 mt-2 disabled:opacity-40"
              style={{
                background: "var(--teal)",
                color: "#111010",
              }}
            >
              {loading ? (
                <span className="inline-flex items-center gap-2 justify-center">
                  <span
                    className="w-3.5 h-3.5 rounded-full border-2 border-[#111010] border-t-transparent animate-spin"
                  />
                  Signing in…
                </span>
              ) : (
                "Sign in →"
              )}
            </button>
          </form>
        </div>

        <p
          className="text-center text-[11px] tracking-[0.08em] mt-8"
          style={{ color: "var(--text-muted)" }}
        >
          By invitation only
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15%       { transform: translateX(-6px); }
          30%       { transform: translateX(6px); }
          45%       { transform: translateX(-4px); }
          60%       { transform: translateX(4px); }
          75%       { transform: translateX(-2px); }
          90%       { transform: translateX(2px); }
        }
      `}</style>
    </div>
  );
}

export default function LoginClient() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
