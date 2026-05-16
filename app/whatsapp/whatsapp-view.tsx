"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import PhoneShell from "@/components/phone-mock";
import { Wordmark } from "@/components/ui/wordmark";
import { ease } from "@/lib/motion";
import { SCRIPTS, type Bubble } from "@/content/whatsapp-scripts";

export default function WhatsappView() {
  const [active, setActive] = useState(SCRIPTS[0]!.id);
  const script = SCRIPTS.find((s) => s.id === active)!;
  const [played, setPlayed] = useState<Bubble[]>([]);
  const [playing, setPlaying] = useState(false);
  const [typingSide, setTypingSide] = useState<"user" | "splitko" | null>(null);
  const cancelRef = useRef(false);

  useEffect(() => {
    play(script);
    return () => {
      cancelRef.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  async function play(s: typeof script) {
    cancelRef.current = true;
    await new Promise((r) => setTimeout(r, 80));
    cancelRef.current = false;
    setPlayed([]);
    setPlaying(true);
    for (const b of s.bubbles) {
      if (cancelRef.current) return;
      const delay = b.delayMs ?? 600;
      setTypingSide(b.side);
      await wait(delay);
      if (cancelRef.current) return;
      setTypingSide(null);
      setPlayed((prev) => [...prev, b]);
      await wait(280);
    }
    setPlaying(false);
  }

  return (
    <main
      className="min-h-dvh"
      style={{
        background:
          "radial-gradient(120% 80% at 20% 0%, oklch(0.35 0.05 145) 0%, oklch(0.22 0.07 145) 60%, oklch(0.16 0.06 145) 100%)",
        color: "var(--color-cream)",
      }}
    >
      <header className="flex items-center justify-between px-5 py-4 sm:px-8">
        <Wordmark variant="cream" size={20} />
        <Link
          href="/dashboard"
          className="mono-tag rounded-full border border-[var(--color-cream)]/30 px-3 py-1 hover:border-[var(--color-cream)]"
        >
          ← back to dashboard
        </Link>
      </header>

      <section className="mx-auto grid max-w-screen-xl gap-12 px-5 pb-16 pt-6 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div className="space-y-5">
          <div className="mono-tag flex items-center gap-3 opacity-80">
            <span
              aria-hidden
              className="block h-[1px] w-10 bg-[var(--color-cream)]"
            />
            Surface · 02 · WhatsApp
          </div>
          <h1
            className="display"
            style={{
              fontSize: "clamp(2.1rem, 0.7rem + 5.4vw, 4.6rem)",
              lineHeight: 0.98,
              letterSpacing: "-0.022em",
            }}
          >
            Most Splićani use WhatsApp more than any other interface.
          </h1>
          <p className="body-lg max-w-[44ch] opacity-85">
            Boti runs Buenos Aires this way. There is no good reason WhatsApp
            shouldn’t be the second-most-used surface for Splitko by the end of
            its first year.
          </p>

          <div className="mt-6">
            <div className="mono-tag opacity-70">Scripted demo</div>
            <ul className="mt-3 grid gap-2 sm:grid-cols-3">
              {SCRIPTS.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => setActive(s.id)}
                    className={`w-full rounded-2xl border px-3 py-3 text-left transition-colors ${
                      active === s.id
                        ? "border-[var(--color-cream)] bg-[var(--color-cream)]/12"
                        : "border-[var(--color-cream)]/25 hover:border-[var(--color-cream)]/60"
                    }`}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                      }}
                    >
                      {s.title}
                    </div>
                    <div className="mono-tag opacity-70">{s.blurb}</div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={() => play(script)}
              disabled={playing}
              className="rounded-full bg-[var(--color-cream)] px-4 py-2 text-sm font-semibold text-[var(--color-ink)] disabled:opacity-60"
            >
              {playing ? "Playing…" : "Replay demo"}
            </button>
            <Link
              href="/voice"
              className="rounded-full border border-[var(--color-cream)]/40 px-4 py-2 text-sm font-semibold hover:bg-[var(--color-cream)]/10"
            >
              Listen to baka Anka →
            </Link>
          </div>
        </div>

        <div className="mx-auto">
          <PhoneShell variant="whatsapp">
            <div
              className="absolute inset-0 overflow-y-auto px-3 pb-20 pt-3 no-scrollbar"
              style={{ background: "oklch(0.94 0.012 80)" }}
            >
              <div className="flex flex-col gap-2">
                <AnimatePresence initial={false}>
                  {played.map((b, i) => (
                    <Bubble key={i} bubble={b} />
                  ))}
                  {typingSide && <TypingIndicator side={typingSide} />}
                </AnimatePresence>
              </div>
            </div>
            <ComposeBar />
          </PhoneShell>
        </div>
      </section>
    </main>
  );
}

function Bubble({ bubble }: { bubble: Bubble }) {
  const isUser = bubble.side === "user";
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.28, ease: ease.outExpo }}
      style={{
        alignSelf: isUser ? "flex-end" : "flex-start",
        maxWidth: "82%",
      }}
    >
      <div
        className="rounded-2xl px-3 py-2 text-[13.5px] leading-snug"
        style={{
          background: isUser ? "oklch(0.96 0.05 145)" : "var(--color-cream)",
          color: "var(--color-ink)",
          boxShadow: "0 1px 1px rgba(0,0,0,0.05)",
          borderBottomLeftRadius: isUser ? 14 : 4,
          borderBottomRightRadius: isUser ? 4 : 14,
        }}
      >
        {bubble.text && <div>{bubble.text}</div>}
        {bubble.attachment && (
          <div
            className="mt-1.5 rounded-lg px-2 py-1.5 text-[11px]"
            style={{
              background: "color-mix(in oklch, var(--color-navy) 8%, transparent)",
              border:
                "1px solid color-mix(in oklch, var(--color-navy) 30%, transparent)",
            }}
          >
            <div style={{ fontWeight: 600 }}>{bubble.attachment.label}</div>
            {bubble.attachment.sub && (
              <div className="opacity-70">{bubble.attachment.sub}</div>
            )}
          </div>
        )}
        <div
          className="mt-1 text-[10px] opacity-55"
          style={{ textAlign: isUser ? "right" : "left" }}
        >
          14:32 {isUser && "✓✓"}
        </div>
      </div>
    </motion.div>
  );
}

function TypingIndicator({ side }: { side: "user" | "splitko" }) {
  const isUser = side === "user";
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        alignSelf: isUser ? "flex-end" : "flex-start",
      }}
    >
      <div
        className="rounded-2xl px-3 py-2"
        style={{
          background: isUser ? "oklch(0.96 0.05 145)" : "var(--color-cream)",
          boxShadow: "0 1px 1px rgba(0,0,0,0.05)",
          borderBottomLeftRadius: isUser ? 14 : 4,
          borderBottomRightRadius: isUser ? 4 : 14,
        }}
      >
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                borderRadius: 999,
                background: "var(--color-ink)",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ComposeBar() {
  return (
    <div
      aria-hidden
      className="absolute inset-x-2 bottom-2 flex items-center gap-2 rounded-full px-3 py-2"
      style={{
        background: "var(--color-cream)",
        boxShadow: "0 -2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <span className="text-[13px] text-[var(--color-ink-soft)] flex-1">
        Message Splitko
      </span>
      <span
        className="inline-flex h-7 w-7 items-center justify-center rounded-full"
        style={{
          background: "oklch(0.38 0.12 145)",
          color: "var(--color-cream)",
          fontSize: 14,
        }}
      >
        ➤
      </span>
    </div>
  );
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
