"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { createClient, supabaseConfigured } from "@/lib/supabase/client";
import { validateOib } from "@/lib/oib";
import { writeDemoSession } from "@/lib/profile";

const inputStyle =
  "w-full rounded-xl border border-[var(--color-ink)]/15 bg-[var(--color-cream)] px-4 py-3 text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-red)]";

export default function RegisterForm() {
  const router = useRouter();
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

  async function onSubmit(e: React.FormEvent) {
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
    <form onSubmit={onSubmit} className="space-y-4">
      <Field label="Display name" value={name} onChange={setName} placeholder="Marina" />
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
        placeholder="marina@lucac.split"
      />
      <Field
        label="Password"
        value={password}
        onChange={setPassword}
        type="password"
        required
        placeholder="••••••••••"
      />

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
        disabled={busy || oibState !== "valid"}
        className="mt-2 w-full rounded-full py-3.5 text-[15px] font-semibold transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
        style={{
          background: "var(--color-navy)",
          color: "var(--color-cream)",
          boxShadow:
            "0 12px 24px -16px color-mix(in oklch, var(--color-navy) 80%, transparent)",
        }}
      >
        {busy ? "Creating…" : "Create account with OIB"}
      </button>

      {!configured && (
        <p className="mono-tag pt-1 text-[var(--color-ink-soft)] opacity-70">
          Demo mode — values are stored locally, no Supabase round-trip.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mono-tag text-[var(--color-ink-soft)]">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputStyle} mt-1.5`}
      />
    </label>
  );
}
