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
        // Demo mode: any non-empty credentials work, persist a fake session.
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

  async function onGoogle() {
    setErr(null);
    if (!configured) {
      setErr(
        "Google sign-in needs Supabase configured first. Use email + password to demo.",
      );
      return;
    }
    const sb = createClient();
    await sb.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
  }

  async function onMagicLink() {
    setErr(null);
    if (!email) {
      setErr("Enter your email to receive a magic link.");
      return;
    }
    if (!configured) {
      // Demo: pretend.
      writeDemoSession({
        email,
        displayName: email.split("@")[0] ?? "Splićanin",
        dob: null,
        oib: null,
        kvart: null,
      });
      router.push("/dashboard");
      return;
    }
    setBusy(true);
    try {
      const sb = createClient();
      const { error } = await sb.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/dashboard` },
      });
      if (error) throw new Error(error.message);
      setErr("Check your inbox for a magic link.");
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <button
        type="button"
        onClick={onGoogle}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--color-ink)]/20 bg-[var(--color-cream)] py-3 text-sm font-semibold transition-colors hover:border-[var(--color-ink)]"
      >
        <GoogleIcon />
        Continue with Google
      </button>

      <div className="my-2 flex items-center gap-3 text-[var(--color-ink-soft)] opacity-60">
        <span className="h-px flex-1 bg-current" />
        <span className="mono-tag">or</span>
        <span className="h-px flex-1 bg-current" />
      </div>

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

      <div className="flex flex-col gap-2 pt-2 sm:flex-row">
        <button
          type="submit"
          disabled={busy}
          className="flex-1 rounded-full bg-[var(--color-navy)] py-3 text-sm font-semibold text-[var(--color-cream)] transition-all hover:bg-[var(--color-ink)] disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
        <button
          type="button"
          onClick={onMagicLink}
          disabled={busy}
          className="rounded-full border border-[var(--color-ink)]/20 px-5 py-3 text-sm font-semibold hover:border-[var(--color-ink)]"
        >
          Magic link
        </button>
      </div>

      {!configured && (
        <p className="mono-tag pt-2 text-[var(--color-ink-soft)] opacity-70">
          Demo mode — Supabase not configured. Any email/password works for
          this build.
        </p>
      )}
    </form>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden>
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.05-1.25-.16-1.83H9v3.46h4.84a4.13 4.13 0 01-1.79 2.72v2.26h2.9c1.7-1.57 2.69-3.88 2.69-6.6z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.83.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.95v2.33A9 9 0 009 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.95 10.71A5.4 5.4 0 013.66 9c0-.59.1-1.17.29-1.71V4.96H.95A9 9 0 000 9c0 1.45.35 2.83.95 4.04l3-2.33z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.51.45 3.44 1.34l2.58-2.58A9 9 0 00.95 4.96l3 2.33C4.66 5.17 6.65 3.58 9 3.58z"
      />
    </svg>
  );
}
