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
      className="fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300"
      style={{
        background: scrolled
          ? "color-mix(in oklch, var(--color-navy) 94%, transparent)"
          : "color-mix(in oklch, var(--color-navy) 25%, transparent)",
        backdropFilter: "saturate(140%) blur(12px)",
        WebkitBackdropFilter: "saturate(140%) blur(12px)",
        borderBottom: scrolled
          ? "1px solid color-mix(in oklch, var(--color-cream) 14%, transparent)"
          : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-5 py-3.5 sm:px-8 sm:py-4">
        <Wordmark variant="cream" size={22} />

        <nav className="hidden items-center gap-7 text-[13px] font-medium sm:flex">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="transition-colors"
              style={{
                color: "color-mix(in oklch, var(--color-cream) 92%, transparent)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-cream)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color =
                  "color-mix(in oklch, var(--color-cream) 92%, transparent)")
              }
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/login"
            className="hidden text-[13px] font-semibold transition-colors sm:inline"
            style={{
              color: "color-mix(in oklch, var(--color-cream) 88%, transparent)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-cream)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color =
                "color-mix(in oklch, var(--color-cream) 88%, transparent)")
            }
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="rounded-full px-4 py-2 text-[13px] font-semibold transition-transform hover:scale-[1.04] active:scale-[0.98]"
            style={{
              background: "var(--color-red)",
              color: "var(--color-cream)",
              boxShadow:
                "0 10px 24px -16px color-mix(in oklch, var(--color-red-hot) 70%, transparent)",
            }}
          >
            Open the dashboard
          </Link>
        </div>
      </div>
    </header>
  );
}
