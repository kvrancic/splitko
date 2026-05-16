import Link from "next/link";
import { Wordmark } from "@/components/ui/wordmark";
import RegisterForm from "./register-form";

export const metadata = { title: "Create account · Splitko" };

export default function RegisterPage() {
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
            Create an account · 01
          </div>
          <h1
            className="display"
            style={{
              fontSize: "clamp(2.2rem, 0.7rem + 5.4vw, 4.6rem)",
              lineHeight: 0.98,
              letterSpacing: "-0.02em",
            }}
          >
            Three ways in. Same brain on the other side.
          </h1>
          <p className="body-lg max-w-[44ch] text-[var(--color-ink-soft)]">
            Google for tourists who want zero friction. Email + password for
            anyone who wants a normal sign-up. <strong>Register with OIB</strong> for
            Splićani who want their bureaucracy block to know their actual
            life-event tier from day one.
          </p>

          <ul className="space-y-3 pt-4 text-[var(--color-ink-soft)]">
            <li className="flex gap-3">
              <span className="mono-tag mt-1 text-[var(--color-red)]">001</span>
              We never log in to e-Građani as you, and we never hold your
              credentials.
            </li>
            <li className="flex gap-3">
              <span className="mono-tag mt-1 text-[var(--color-red)]">002</span>
              OIB is validated locally with the real ISO 7064 MOD 11,10 algorithm
              before anything is sent.
            </li>
            <li className="flex gap-3">
              <span className="mono-tag mt-1 text-[var(--color-red)]">003</span>
              You can delete your account in one tap. Splitko keeps no copy.
            </li>
          </ul>

          <div className="mono-tag pt-4 text-[var(--color-ink-soft)] opacity-70">
            Already in?{" "}
            <Link href="/login" className="text-[var(--color-red)]">
              Sign in →
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
          <RegisterForm />
        </section>
      </div>
    </main>
  );
}
