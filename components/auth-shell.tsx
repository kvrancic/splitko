import Link from "next/link";
import type { ReactNode } from "react";
import { Wordmark } from "@/components/ui/wordmark";

type Mode = "login" | "register";

type AuthShellProps = {
  mode: Mode;
  /** The form, rendered inside the right-hand card. */
  children: ReactNode;
};

const COPY: Record<
  Mode,
  {
    kicker: string;
    title: string;
    lede: string;
    bullets: { tag: string; body: string }[];
  }
> = {
  login: {
    kicker: "Sign in · 02",
    title: "Welcome back to your city.",
    lede: "Your dashboard remembers what Splitko already learned about your week — the school run, the beach pattern, the ticket you opened last Tuesday.",
    bullets: [
      {
        tag: "001",
        body: "OIB stays where you put it. We never ship it to a third party.",
      },
      {
        tag: "002",
        body: "Memory is opt-in. Delete the conversation, the city forgets.",
      },
    ],
  },
  register: {
    kicker: "Create an account · 01",
    title: "One number unlocks every block.",
    lede: "Your OIB is the key Splitko uses to personalise the bureaucracy block, life-event tier and civic-action routing — validated locally before anything is sent.",
    bullets: [
      {
        tag: "001",
        body: "We never log in to e-Građani as you, and we never hold your credentials.",
      },
      {
        tag: "002",
        body: "OIB is validated locally with the real ISO 7064 MOD 11,10 algorithm.",
      },
      {
        tag: "003",
        body: "You can delete your account in one tap. Splitko keeps no copy.",
      },
    ],
  },
};

export default function AuthShell({ mode, children }: AuthShellProps) {
  const copy = COPY[mode];

  return (
    <main
      className="min-h-dvh"
      style={{ background: "var(--color-cream)", color: "var(--color-ink)" }}
    >
      <header className="flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6">
        <Link href="/" aria-label="Splitko home">
          <Wordmark variant="ink" size={22} />
        </Link>
        <Link
          href="/"
          className="mono-tag text-[var(--color-ink-soft)] transition-opacity hover:opacity-100"
          style={{ opacity: 0.7 }}
        >
          ← Back to splitko.hr
        </Link>
      </header>

      <div className="mx-auto grid max-w-screen-xl gap-10 px-5 pb-16 pt-6 sm:px-8 sm:gap-14 lg:grid-cols-[1fr_minmax(0,460px)] lg:items-start">
        <section className="space-y-7">
          <div className="mono-tag flex items-center gap-3 text-[var(--color-navy-mist)]">
            <span
              aria-hidden
              className="block h-[1px] w-10"
              style={{ background: "var(--color-red)" }}
            />
            {copy.kicker}
          </div>
          <h1
            className="display"
            style={{
              fontSize: "clamp(2rem, 0.7rem + 4.6vw, 4.2rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
            }}
          >
            {copy.title}
          </h1>
          <p className="body-lg max-w-[48ch] text-[var(--color-ink-soft)]">
            {copy.lede}
          </p>

          <ul className="space-y-3 pt-2 text-[var(--color-ink-soft)]">
            {copy.bullets.map((b) => (
              <li key={b.tag} className="flex gap-3">
                <span className="mono-tag mt-1 text-[var(--color-red)]">
                  {b.tag}
                </span>
                <span className="body-lg">{b.body}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="lg:sticky lg:top-8"
          style={{
            background: "var(--color-cream-shadow)",
            borderRadius: 24,
            padding: 24,
            border:
              "1px solid color-mix(in oklch, var(--color-ink) 8%, transparent)",
            boxShadow:
              "0 30px 60px -40px color-mix(in oklch, var(--color-ink) 35%, transparent)",
          }}
        >
          <ModeToggle mode={mode} />

          <div className="mt-6">{children}</div>
        </section>
      </div>
    </main>
  );
}

function ModeToggle({ mode }: { mode: Mode }) {
  return (
    <div
      className="grid grid-cols-2 gap-1 rounded-full p-1"
      style={{
        background:
          "color-mix(in oklch, var(--color-ink) 6%, var(--color-cream))",
      }}
    >
      <ToggleLink href="/login" active={mode === "login"}>
        Sign in
      </ToggleLink>
      <ToggleLink href="/register" active={mode === "register"}>
        Create account
      </ToggleLink>
    </div>
  );
}

function ToggleLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-full px-3 py-2 text-center text-[13px] font-semibold transition-colors"
      style={{
        background: active ? "var(--color-navy)" : "transparent",
        color: active ? "var(--color-cream)" : "var(--color-ink-soft)",
      }}
    >
      {children}
    </Link>
  );
}
