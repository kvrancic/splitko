"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ease, sectionViewport } from "@/lib/motion";

const PRIVACY = [
  {
    label: "01",
    body:
      "No background location tracking. Splitko knows where you are only when you tell it, only for the question you are asking, only for as long as that question is open.",
  },
  {
    label: "02",
    body:
      "No standing share with state authorities. SOS is per-incident, explicit, and one-shot.",
  },
  {
    label: "03",
    body:
      "No transactions on your behalf inside e-Građani. Splitko explains, recommends, prepares. The citizen acts. Splitko never holds credentials.",
  },
  {
    label: "04",
    body:
      "Aggregate-only on sensitive surfaces. Crowd density is a number per location, not a database of faces. Housing analytics expose commercial-scale operators, not private hosts.",
  },
  {
    label: "05",
    body:
      "Conversations are ephemeral by default. Memory is opt-in, per feature, with the user in control.",
  },
];

export default function PrivacyCta() {
  return (
    <>
      <section
        id="trust"
        className="relative overflow-hidden"
        style={{ background: "var(--color-cream)", color: "var(--color-ink)" }}
      >
        <div className="mx-auto grid max-w-screen-xl gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <div className="mono-tag flex items-center gap-3 text-[var(--color-navy-mist)]">
              <span
                aria-hidden
                className="block h-[1px] w-10"
                style={{ background: "var(--color-red)" }}
              />
              Privacy & trust · 07
            </div>
            <h2
              className="display mt-5"
              style={{
                fontSize: "clamp(2rem, 0.6rem + 5.0vw, 4.4rem)",
                lineHeight: 0.98,
                letterSpacing: "-0.022em",
              }}
            >
              The version of Splitko that surveils everyone is a different
              product.
            </h2>
            <p className="mt-6 max-w-[44ch] text-[var(--color-ink-soft)] body-lg">
              This is the version that earns trust by not building that
              version.
            </p>
          </div>

          <ol className="space-y-5">
            {PRIVACY.map((p, i) => (
              <motion.li
                key={p.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={sectionViewport}
                transition={{
                  duration: 0.5,
                  ease: ease.outQuart,
                  delay: i * 0.05,
                }}
                className="grid grid-cols-[44px_1fr] gap-4 border-t border-[var(--color-ink)]/15 pt-4"
              >
                <span className="display text-[var(--color-red)] text-2xl">
                  {p.label}
                </span>
                <span className="body-lg text-[var(--color-ink-soft)]">
                  {p.body}
                </span>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="cta"
        className="relative overflow-hidden"
        style={{ background: "var(--color-red)", color: "var(--color-cream)" }}
      >
        <div className="mx-auto flex max-w-screen-xl flex-col gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mono-tag flex items-center gap-3 opacity-80">
              <span
                aria-hidden
                className="block h-[1px] w-10 bg-[var(--color-cream)]"
              />
              Build the orchestrator · 08
            </div>
            <h2
              className="display mt-5"
              style={{
                fontSize: "clamp(2.4rem, 0.6rem + 7vw, 6.5rem)",
                lineHeight: 0.96,
                letterSpacing: "-0.028em",
                maxWidth: "20ch",
              }}
            >
              The cameras are on the walls. The grandmother is waiting for a
              number she can dial.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-[15px] font-semibold transition-transform hover:scale-[1.025] active:scale-[0.98]"
              style={{
                background: "var(--color-cream)",
                color: "var(--color-navy)",
                boxShadow:
                  "0 18px 36px -18px color-mix(in oklch, var(--color-ink) 50%, transparent)",
              }}
            >
              Open the dashboard
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/dashboard/chat"
              className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-[15px] font-semibold transition-transform hover:scale-[1.025] active:scale-[0.98]"
              style={{
                background: "var(--color-navy)",
                color: "var(--color-cream)",
                boxShadow:
                  "0 18px 36px -22px color-mix(in oklch, var(--color-navy) 90%, transparent)",
              }}
            >
              Try the chat surface
            </Link>
          </div>
        </div>

        <footer className="mx-auto flex max-w-screen-xl flex-col items-start justify-between gap-6 px-5 pb-10 text-xs uppercase tracking-[0.16em] opacity-80 sm:flex-row sm:items-center sm:px-8">
          <span>Splitko · 2026 · built for the city</span>
          <span className="flex flex-wrap gap-6">
            <a href="#thesis" className="hover:opacity-100">
              Thesis
            </a>
            <a href="#marina" className="hover:opacity-100">
              Marina
            </a>
            <a href="#blocks" className="hover:opacity-100">
              Blocks
            </a>
            <Link href="/whatsapp" className="hover:opacity-100">
              WhatsApp
            </Link>
            <Link href="/voice" className="hover:opacity-100">
              Voice
            </Link>
          </span>
        </footer>
      </section>
    </>
  );
}
