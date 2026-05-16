import Link from "next/link";
import { Wordmark } from "@/components/ui/wordmark";
import LoginForm from "./login-form";

export const metadata = { title: "Sign in · Splitko" };

export default function LoginPage() {
  return (
    <main
      className="min-h-dvh"
      style={{ background: "var(--color-cream)", color: "var(--color-ink)" }}
    >
      <header className="px-5 py-5 sm:px-8 sm:py-6">
        <Wordmark variant="ink" size={22} />
      </header>

      <div className="mx-auto grid max-w-screen-xl gap-12 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[1.05fr_1fr]">
        <section className="space-y-6">
          <div className="mono-tag flex items-center gap-3 text-[var(--color-navy-mist)]">
            <span
              aria-hidden
              className="block h-[1px] w-10"
              style={{ background: "var(--color-red)" }}
            />
            Sign in · 02
          </div>
          <h1
            className="display"
            style={{
              fontSize: "clamp(2.2rem, 0.7rem + 5.4vw, 4.6rem)",
              lineHeight: 0.98,
              letterSpacing: "-0.02em",
            }}
          >
            Welcome back to your city.
          </h1>
          <p className="body-lg max-w-[44ch] text-[var(--color-ink-soft)]">
            One brain. Three doors. Your dashboard remembers what Splitko
            already learned about your week — the school run, the beach
            pattern, the ticket you opened last Tuesday.
          </p>
          <div className="mono-tag text-[var(--color-ink-soft)] opacity-70">
            New here?{" "}
            <Link href="/register" className="text-[var(--color-red)]">
              Create an account →
            </Link>
          </div>
        </section>

        <section
          style={{
            background: "var(--color-cream-shadow)",
            borderRadius: 24,
            padding: 28,
          }}
        >
          <LoginForm />
        </section>
      </div>
    </main>
  );
}
