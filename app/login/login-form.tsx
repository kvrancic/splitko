"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient, supabaseConfigured } from "@/lib/supabase/client";
import { writeDemoSession } from "@/lib/profile";

const inputStyle =
  "w-full rounded-xl border border-[var(--color-ink)]/15 bg-[var(--color-cream)] px-4 py-3 text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-red)]";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const configured = supabaseConfigured();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      if (configured) {
        const sb = createClient();
        const { error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw new Error(error.message);
      } else {
        if (!email || !password) {
          throw new Error("Email and password required (demo mode).");
        }
        writeDemoSession({
          email,
          displayName: email.split("@")[0] ?? "Splićanin",
          dob: null,
          oib: null,
          kvart: null,
        });
      }
      router.push("/dashboard");
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block">
        <span className="mono-tag text-[var(--color-ink-soft)]">Email</span>
        <input
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputStyle + " mt-1.5"}
          placeholder="marina@lucac.split"
        />
      </label>

      <label className="block">
        <span className="mono-tag text-[var(--color-ink-soft)]">Password</span>
        <input
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputStyle + " mt-1.5"}
          placeholder="••••••••••"
        />
      </label>

      {err && (
        <div
          role="alert"
          className="rounded-lg border border-[var(--color-red)]/30 bg-[var(--color-red)]/10 px-3 py-2 text-sm text-[var(--color-red)]"
        >
          {err}
        </div>
      )}

      <button
        type="submit"
        disabled={busy}
        className="mt-2 w-full rounded-full py-3.5 text-[15px] font-semibold transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
        style={{
          background: "var(--color-navy)",
          color: "var(--color-cream)",
          boxShadow:
            "0 12px 24px -16px color-mix(in oklch, var(--color-navy) 80%, transparent)",
        }}
      >
        {busy ? "Signing in…" : "Sign in"}
      </button>

      {!configured && (
        <p className="mono-tag pt-1 text-[var(--color-ink-soft)] opacity-70">
          Demo mode — any email + password works for this build.
        </p>
      )}
    </form>
  );
}
