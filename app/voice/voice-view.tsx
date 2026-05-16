"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Persona from "@/components/persona";
import PhoneShell from "@/components/phone-mock";
import { Wordmark } from "@/components/ui/wordmark";
import { ease } from "@/lib/motion";
import { VOICE_SCRIPT, type VoiceLine } from "@/content/voice-script";

type Stage = "incoming" | "ringing" | "live" | "transferred";

export default function VoiceView() {
  const [stage, setStage] = useState<Stage>("incoming");
  const [lines, setLines] = useState<VoiceLine[]>([]);
  const [speaker, setSpeaker] = useState<VoiceLine["speaker"] | null>(null);
  const cancelRef = useRef(false);

  useEffect(() => {
    return () => {
      cancelRef.current = true;
    };
  }, []);

  async function pickUp() {
    cancelRef.current = false;
    setStage("ringing");
    await wait(900);
    if (cancelRef.current) return;
    setStage("live");
    setLines([]);
    for (let i = 0; i < VOICE_SCRIPT.length; i++) {
      if (cancelRef.current) return;
      const l = VOICE_SCRIPT[i]!;
      setSpeaker(l.speaker);
      setLines((prev) => [...prev, l]);
      await wait(l.durationMs);
      if (cancelRef.current) return;
      if (l.speaker === "splitko" && l.text.startsWith("Prebacujem")) {
        setStage("transferred");
      }
    }
    setSpeaker(null);
  }

  function reset() {
    cancelRef.current = true;
    setStage("incoming");
    setLines([]);
    setSpeaker(null);
  }

  return (
    <main
      className="min-h-dvh"
      style={{
        background:
          "radial-gradient(120% 80% at 80% 10%, oklch(0.36 0.06 257) 0%, oklch(0.2 0.06 257) 55%, oklch(0.14 0.06 257) 100%)",
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

      <section className="mx-auto grid max-w-screen-xl gap-12 px-5 pb-16 pt-6 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="space-y-5">
          <div className="mono-tag flex items-center gap-3 opacity-80">
            <span
              aria-hidden
              className="block h-[1px] w-10 bg-[var(--color-cream)]"
            />
            Surface · 03 · phone
          </div>
          <h1
            className="display"
            style={{
              fontSize: "clamp(2.1rem, 0.7rem + 5.4vw, 4.6rem)",
              lineHeight: 0.98,
              letterSpacing: "-0.022em",
            }}
          >
            The most underbuilt surface in civic tech, suddenly cheap.
          </h1>
          <p className="body-lg max-w-[44ch] opacity-85">
            Voice was expensive in 2022 and is no longer expensive in 2026. A
            grandmother dials a number on a magnet on her fridge. The agent
            picks up in the Dalmatian she actually speaks.
          </p>

          <div className="rounded-2xl border border-[var(--color-cream)]/25 p-5">
            <div className="mono-tag opacity-70">Inbound call · baka Anka</div>
            <p className="mt-2 text-[var(--color-cream)]/85">
              Anka, 76, dials 0800 SPLIT from her landline. She has a
              prescription she doesn’t understand. The agent walks her through
              it and transfers her to KBC reception with a briefing.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={pickUp}
                disabled={stage === "live" || stage === "ringing"}
                className="rounded-full bg-[var(--color-red)] px-4 py-2 text-sm font-semibold text-[var(--color-cream)] hover:bg-[var(--color-red-hot)] disabled:opacity-60"
              >
                {stage === "incoming"
                  ? "Pick up the call"
                  : stage === "ringing"
                    ? "Ringing…"
                    : stage === "live"
                      ? "On the call"
                      : "Transferred"}
              </button>
              <button
                type="button"
                onClick={reset}
                className="rounded-full border border-[var(--color-cream)]/30 px-4 py-2 text-sm font-semibold hover:border-[var(--color-cream)]"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto">
          <PhoneShell variant="voice">
            <CallBody
              stage={stage}
              speaker={speaker}
              lines={lines}
              onPickUp={pickUp}
            />
          </PhoneShell>
        </div>
      </section>
    </main>
  );
}

function CallBody({
  stage,
  speaker,
  lines,
  onPickUp,
}: {
  stage: Stage;
  speaker: VoiceLine["speaker"] | null;
  lines: VoiceLine[];
  onPickUp: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col items-center gap-3 pb-2 pt-4">
        <PortraitForSpeaker speaker={speaker} />
        <div className="text-center">
          <div
            className="display"
            style={{ fontSize: "1.05rem", letterSpacing: "-0.01em" }}
          >
            {labelFor(speaker, stage)}
          </div>
          <div className="mono-tag mt-1 opacity-65">
            {stage === "incoming"
              ? "incoming"
              : stage === "ringing"
                ? "connecting…"
                : stage === "transferred"
                  ? "transferred to KBC"
                  : "on the line"}
          </div>
        </div>
      </div>

      <Waveform active={Boolean(speaker) && stage === "live"} speaker={speaker} />

      <div
        className="flex-1 overflow-y-auto px-4 pb-2 pt-3 text-[13px] no-scrollbar"
        style={{ background: "var(--color-cream)" }}
      >
        <AnimatePresence initial={false}>
          {lines.map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: ease.outQuart }}
              className="mb-2"
            >
              <div className="mono-tag opacity-70">
                {l.speaker === "anka"
                  ? "Anka"
                  : l.speaker === "splitko"
                    ? "Splitko"
                    : "KBC ambulanta"}
              </div>
              <p
                style={{
                  color:
                    l.speaker === "splitko"
                      ? "var(--color-navy)"
                      : "var(--color-ink)",
                  fontStyle: l.speaker === "splitko" ? "normal" : "italic",
                }}
              >
                {l.text}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>

        {stage === "transferred" && <BriefingCard />}
      </div>

      <CallControls stage={stage} onPickUp={onPickUp} />
    </div>
  );
}

function PortraitForSpeaker({
  speaker,
}: {
  speaker: VoiceLine["speaker"] | null;
}) {
  if (speaker === "anka")
    return (
      <Persona
        character="anka"
        size={72}
        className="overflow-hidden rounded-full bg-[var(--color-cream-shadow)] p-1"
      />
    );
  if (speaker === "reception")
    return (
      <Persona
        character="doctor"
        size={72}
        className="overflow-hidden rounded-full bg-[var(--color-cream-shadow)] p-1"
      />
    );
  return (
    <div
      className="flex h-[72px] w-[72px] items-center justify-center rounded-full"
      style={{
        background: "var(--color-navy)",
        color: "var(--color-cream)",
      }}
    >
      <span
        className="display"
        style={{ fontSize: "1.5rem", letterSpacing: "-0.02em" }}
      >
        S.
      </span>
    </div>
  );
}

function labelFor(speaker: VoiceLine["speaker"] | null, stage: Stage) {
  if (stage === "incoming") return "Anka K. · 0800 SPLIT";
  if (stage === "ringing") return "Connecting…";
  if (stage === "transferred") return "KBC ambulanta";
  if (speaker === "anka") return "Anka K. · Mejaši";
  if (speaker === "reception") return "KBC ambulanta";
  return "Splitko · agent";
}

function Waveform({
  active,
  speaker,
}: {
  active: boolean;
  speaker: VoiceLine["speaker"] | null;
}) {
  const bars = 22;
  return (
    <div
      className="grid gap-1 px-5"
      style={{
        gridTemplateColumns: `repeat(${bars}, 1fr)`,
        alignItems: "end",
        height: 36,
      }}
      aria-hidden
    >
      {Array.from({ length: bars }).map((_, i) => (
        <motion.span
          key={i}
          animate={
            active
              ? { scaleY: [0.4, 1, 0.6, 0.95, 0.5] }
              : { scaleY: 0.2 }
          }
          transition={{
            duration: 0.9,
            repeat: active ? Infinity : 0,
            delay: (i * 0.05) % 0.9,
            ease: "easeInOut",
          }}
          style={{
            display: "block",
            height: 28,
            background:
              speaker === "splitko"
                ? "var(--color-cream)"
                : "var(--color-red)",
            borderRadius: 2,
            transformOrigin: "bottom",
          }}
        />
      ))}
    </div>
  );
}

function BriefingCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: ease.outQuart }}
      className="mt-3 rounded-xl p-3"
      style={{
        background: "var(--color-cream-shadow)",
        border:
          "1px solid color-mix(in oklch, var(--color-navy) 30%, transparent)",
      }}
    >
      <div className="mono-tag text-[var(--color-red)]">briefing card</div>
      <p className="mt-1 text-[12px]">
        Anka K. · DOB 1950-04-12 · prescription clarification only, no new
        symptoms. Two pills/day with food. Please confirm refill on Aug 14.
      </p>
    </motion.div>
  );
}

function CallControls({
  stage,
  onPickUp,
}: {
  stage: Stage;
  onPickUp: () => void;
}) {
  if (stage === "incoming") {
    return (
      <div className="flex items-center justify-around py-3">
        <button
          type="button"
          onClick={onPickUp}
          className="flex h-12 w-12 items-center justify-center rounded-full text-[20px]"
          style={{
            background: "oklch(0.55 0.22 145)",
            color: "var(--color-cream)",
          }}
          aria-label="Answer"
        >
          ☎
        </button>
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-full text-[20px]"
          style={{
            background: "oklch(0.5 0.22 25)",
            color: "var(--color-cream)",
          }}
          aria-label="Decline"
        >
          ✕
        </button>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center gap-3 py-3 text-[var(--color-ink-soft)]">
      <ControlBubble label="mute">
        <span aria-hidden>🔇</span>
      </ControlBubble>
      <ControlBubble label="keypad">
        <span aria-hidden>#</span>
      </ControlBubble>
      <button
        type="button"
        className="flex h-12 w-12 items-center justify-center rounded-full"
        style={{
          background: "oklch(0.5 0.22 25)",
          color: "var(--color-cream)",
        }}
        aria-label="End"
      >
        ✕
      </button>
    </div>
  );
}

function ControlBubble({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-shadow)] text-[var(--color-ink)]"
    >
      {children}
    </button>
  );
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
