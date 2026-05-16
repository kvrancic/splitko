"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/ui/wordmark";

const SECTIONS = [
  { id: "thesis", label: "Thesis" },
  { id: "funnel", label: "World" },
  { id: "marina", label: "Marina" },
  { id: "blocks", label: "Blocks" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={{
        background: scrolled
          ? "color-mix(in oklch, var(--color-navy) 88%, transparent)"
          : "transparent",
        backdropFilter: scrolled ? "saturate(120%) blur(10px)" : "none",
        WebkitBackdropFilter: scrolled ? "saturate(120%) blur(10px)" : "none",
        borderBottom: scrolled
          ? "1px solid color-mix(in oklch, var(--color-cream) 12%, transparent)"
          : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-5 py-4 sm:px-8">
        <Wordmark variant="cream" size={22} />

        <nav className="hidden items-center gap-7 text-sm font-medium sm:flex">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-[var(--color-cream)]/75 transition-colors hover:text-[var(--color-cream)]"
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden text-sm font-semibold text-[var(--color-cream)]/75 hover:text-[var(--color-cream)] sm:inline"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-[var(--color-red)] px-4 py-2 text-sm font-semibold text-[var(--color-cream)] transition-all hover:bg-[var(--color-red-hot)] hover:scale-[1.03] active:scale-[0.98]"
          >
            Open the dashboard
          </Link>
        </div>
      </div>
    </header>
  );
}
