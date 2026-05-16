import Link from "next/link";
import { Wordmark } from "@/components/ui/wordmark";

export default function NotFound() {
  return (
    <main
      className="min-h-dvh"
      style={{ background: "var(--color-cream)", color: "var(--color-ink)" }}
    >
      <header className="px-5 py-5 sm:px-8 sm:py-6">
        <Wordmark variant="ink" size={22} />
      </header>
      <div className="mx-auto flex max-w-screen-md flex-col items-start gap-6 px-5 py-24 sm:px-8">
        <div className="mono-tag flex items-center gap-3 text-[var(--color-red)]">
          <span
            aria-hidden
            className="block h-[1px] w-10"
            style={{ background: "var(--color-red)" }}
          />
          404 · not on the city map
        </div>
        <h1
          className="display"
          style={{
            fontSize: "clamp(2.2rem, 0.7rem + 5.4vw, 4.6rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.022em",
          }}
        >
          The orchestrator doesn't have that one wired up yet.
        </h1>
        <p className="body-lg max-w-[44ch] text-[var(--color-ink-soft)]">
          Try the landing page or your dashboard. If you were looking for a
          specific city data port, ping the team to plug it in.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full bg-[var(--color-navy)] px-5 py-2.5 text-sm font-semibold text-[var(--color-cream)]"
          >
            Back to the pitch
          </Link>
          <Link
            href="/dashboard"
            className="rounded-full border border-[var(--color-ink)]/20 px-5 py-2.5 text-sm font-semibold hover:border-[var(--color-ink)]"
          >
            Open the dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
