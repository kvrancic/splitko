"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Wordmark } from "@/components/ui/wordmark";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.warn("[splitko] runtime error:", error.message);
  }, [error]);

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
          Something failed in the orchestrator
        </div>
        <h1
          className="display"
          style={{
            fontSize: "clamp(1.9rem, 0.7rem + 4.6vw, 3.4rem)",
            lineHeight: 1,
            letterSpacing: "-0.018em",
          }}
        >
          One of the ports threw. The city is still here.
        </h1>
        <pre
          className="max-w-full overflow-x-auto rounded-xl bg-[var(--color-cream-shadow)] p-3 text-xs"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {error.message}
        </pre>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-[var(--color-navy)] px-5 py-2.5 text-sm font-semibold text-[var(--color-cream)]"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border border-[var(--color-ink)]/20 px-5 py-2.5 text-sm font-semibold hover:border-[var(--color-ink)]"
          >
            Back to the pitch
          </Link>
        </div>
      </div>
    </main>
  );
}
