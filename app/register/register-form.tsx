"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { createClient, supabaseConfigured } from "@/lib/supabase/client";
import { validateOib } from "@/lib/oib";
import { writeDemoSession } from "@/lib/profile";

type Tab = "google" | "email" | "oib";

const inputStyle =
  "w-full rounded-xl border border-[var(--color-ink)]/15 bg-[var(--color-cream)] px-4 py-3 text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-red)]";

const TABS: { id: Tab; label: string; hint: string }[] = [
  { id: "google", label: "Google", hint: "One tap" },
  { id: "email", label: "Email + password", hint: "Classic" },
  { id: "oib", label: "Register with OIB", hint: "For Splićani" },
];

export default function RegisterForm() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("oib");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [oib, setOib] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const configured = supabaseConfigured();

  const oibState = useMemo<"empty" | "invalid" | "valid">(() => {
    if (oib.length === 0) return "empty";
    if (oib.length === 11 && validateOib(oib)) return "valid";
    return "invalid";
  }, [oib]);

  async function onGoogle() {
    setErr(null);
    if (!configured) {
      setErr(
        "Google sign-in needs Supabase configured first. Switch to email or OIB for the demo.",
      );
      return;
    }
    const sb = createClient();
    await sb.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
  }

  async function onEmail(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      if (configured) {
        const sb = createClient();
        const { error } = await sb.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: name || email.split("@")[0] },
          },
        });
        if (error) throw new Error(error.message);
      } else {
        writeDemoSession({
          email,
          displayName: name || (email.split("@")[0] ?? "Splićanin"),
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

  async function onOib(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (oibState !== "valid") {
      setErr("OIB does not match the ISO 7064 MOD 11,10 check.");
      return;
    }
    if (!dob) {
      setErr("Date of birth is required.");
      return;
    }
    setBusy(true);
    try {
      if (configured) {
        const sb = createClient();
        const { data, error } = await sb.auth.signUp({
          email,
          password,
          options: {
            data: {
              display_name: name || email.split("@")[0],
              dob,
              oib,
            },
          },
        });
        if (error) throw new Error(error.message);
        // Best-effort profiles upsert.
        if (data?.user) {
          await sb
            .from("profiles")
            .upsert({
              id: data.user.id,
              display_name: name || email.split("@")[0],
              dob,
              oib,
            })
            .select();
        }
      } else {
        writeDemoSession({
          email,
          displayName: name || (email.split("@")[0] ?? "Splićanin"),
          dob,
          oib,
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
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-1.5 rounded-full bg-[var(--color-cream)] p-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-full px-3 py-2 text-xs font-semibold transition-all ${
              tab === t.id
                ? "bg-[var(--color-navy)] text-[var(--color-cream)]"
                : "text-[var(--color-ink-soft)]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div
        className="mono-tag text-[var(--color-ink-soft)] opacity-70"
        aria-live="polite"
      >
        {TABS.find((t) => t.id === tab)?.hint}
      </div>

      {tab === "google" && (
        <div className="space-y-3">
          <button
            type="button"
            onClick={onGoogle}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--color-ink)]/20 bg-[var(--color-cream)] py-3 text-sm font-semibold hover:border-[var(--color-ink)]"
          >
            <GoogleIcon /> Continue with Google
          </button>
          {!configured && (
            <p className="mono-tag text-[var(--color-ink-soft)] opacity-70">
              Demo mode — Google OAuth needs Supabase + Google client.
              Use email or OIB to walk through the flow.
            </p>
          )}
        </div>
      )}

      {tab === "email" && (
        <form onSubmit={onEmail} className="space-y-3">
          <Field label="Display name" value={name} onChange={setName} />
          <Field
            label="Email"
            value={email}
            onChange={setEmail}
            type="email"
            required
          />
          <Field
            label="Password"
            value={password}
            onChange={setPassword}
            type="password"
            required
          />
          <SubmitButton busy={busy}>Create account</SubmitButton>
        </form>
      )}

      {tab === "oib" && (
        <form onSubmit={onOib} className="space-y-3">
          <Field label="Display name" value={name} onChange={setName} />
          <Field
            label="Date of birth"
            value={dob}
            onChange={setDob}
            type="date"
            required
          />
          <div>
            <label className="mono-tag text-[var(--color-ink-soft)]" htmlFor="oib">
              OIB · 11 digits
            </label>
            <input
              id="oib"
              inputMode="numeric"
              pattern="\d{11}"
              maxLength={11}
              value={oib}
              onChange={(e) => setOib(e.target.value.replace(/\D/g, ""))}
              className={`${inputStyle} mt-1.5 font-mono tracking-[0.18em] ${
                oibState === "invalid"
                  ? "border-[var(--color-red)] text-[var(--color-red)]"
                  : oibState === "valid"
                    ? "border-[var(--color-green-good)]"
                    : ""
              }`}
              placeholder="12345678903"
              required
            />
            <p className="mono-tag mt-1.5 text-[var(--color-ink-soft)] opacity-80">
              {oibState === "empty"
                ? "We validate locally before submitting anything."
                : oibState === "valid"
                  ? "✓ Valid OIB — checksum matches"
                  : "✗ Doesn’t match the ISO 7064 MOD 11,10 checksum"}
            </p>
          </div>
          <Field
            label="Email"
            value={email}
            onChange={setEmail}
            type="email"
            required
          />
          <Field
            label="Password"
            value={password}
            onChange={setPassword}
            type="password"
            required
          />
          <SubmitButton busy={busy} disabled={oibState !== "valid"}>
            Create account with OIB
          </SubmitButton>
        </form>
      )}

      {err && (
        <div
          role="alert"
          className="rounded-lg border border-[var(--color-red)]/30 bg-[var(--color-red)]/10 px-3 py-2 text-sm text-[var(--color-red)]"
        >
          {err}
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mono-tag text-[var(--color-ink-soft)]">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputStyle} mt-1.5`}
      />
    </label>
  );
}

function SubmitButton({
  busy,
  disabled,
  children,
}: {
  busy: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={busy || disabled}
      className="mt-3 w-full rounded-full bg-[var(--color-navy)] py-3 text-sm font-semibold text-[var(--color-cream)] transition-all hover:bg-[var(--color-ink)] disabled:opacity-50"
    >
      {busy ? "Creating…" : children}
    </button>
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
