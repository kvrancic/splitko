"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Persona from "@/components/persona";
import PhoneShell from "@/components/phone-mock";
import { Wordmark } from "@/components/ui/wordmark";
import { ease } from "@/lib/motion";
import { VOICE_SCRIPTS, type VoiceLine, type VoiceScript } from "@/content/voice-script";

type Stage = "idle" | "ringing" | "live" | "ended" | "finished";

// Tunable timing knobs.
const RING_MS = 1100;        // ringing → pick up
const ENDED_PAUSE_MS = 1400; // gap between call N ending and call N+1 ringing

export default function VoiceView() {
  const [scriptIndex, setScriptIndex] = useState(0);
  const [stage, setStage] = useState<Stage>("idle");
  const [lines, setLines] = useState<VoiceLine[]>([]);
  const [speaker, setSpeaker] = useState<VoiceLine["speaker"] | null>(null);
  const runIdRef = useRef(0);
  const script = VOICE_SCRIPTS[scriptIndex] ?? VOICE_SCRIPTS[0]!;

  useEffect(() => {
    void autoplay();
    return () => {
      runIdRef.current += 1;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function autoplay() {
    const myId = ++runIdRef.current;
    for (let i = 0; i < VOICE_SCRIPTS.length; i++) {
      if (runIdRef.current !== myId) return;
      const s = VOICE_SCRIPTS[i]!;
      setScriptIndex(i);
      setLines([]);
      setSpeaker(null);
      setStage("ringing");
      await wait(RING_MS);
      if (runIdRef.current !== myId) return;
      setStage("live");
      for (const l of s.lines) {
        if (runIdRef.current !== myId) return;
        setSpeaker(l.speaker);
        setLines((prev) => [...prev, l]);
        await wait(l.durationMs);
      }
      if (runIdRef.current !== myId) return;
      setSpeaker(null);
      setStage("ended");
      // Pause before the next call rings in (or before the reel finishes).
      if (i < VOICE_SCRIPTS.length - 1) {
        await wait(ENDED_PAUSE_MS);
      }
    }
    if (runIdRef.current === myId) {
      setStage("finished");
    }
  }

  function replay() {
    runIdRef.current += 1;
    setScriptIndex(0);
    setStage("idle");
    setLines([]);
    setSpeaker(null);
    void autoplay();
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
          <p className="body-lg max-w-[48ch] opacity-85">
            Voice was expensive in 2022 and is no longer expensive in 2026.
            Citizens dial a number, the agent picks up in the Dalmatian they
            actually speak, and the answer is on the line — no app, no
            password, no e-Građani login.
          </p>
          <p className="body-lg max-w-[48ch] opacity-80">
            Two inbound calls play below, back to back: a tax-refund question
            on e-Građani, and a homeowner asking whether they can extend their
            ground floor in Lučac.
          </p>

          <div className="flex flex-wrap gap-2 pt-3">
            <button
              type="button"
              onClick={replay}
              className="rounded-full bg-[var(--color-cream)] px-4 py-2 text-sm font-semibold text-[var(--color-ink)]"
            >
              Replay
            </button>
            <Link
              href="/whatsapp"
              className="rounded-full border border-[var(--color-cream)]/40 px-4 py-2 text-sm font-semibold hover:bg-[var(--color-cream)]/10"
            >
              See WhatsApp →
            </Link>
          </div>

          <ScriptProgress index={scriptIndex} stage={stage} />
        </div>

        <div className="mx-auto">
          <PhoneShell variant="voice">
            <CallBody
              script={script}
              stage={stage}
              speaker={speaker}
              lines={lines}
            />
          </PhoneShell>
        </div>
      </section>
    </main>
  );
}

function ScriptProgress({
  index,
  stage,
}: {
  index: number;
  stage: Stage;
}) {
  return (
    <ul className="mt-2 flex flex-col gap-1.5 text-[13px] opacity-90">
      {VOICE_SCRIPTS.map((s, i) => {
        const state =
          i < index
            ? "done"
            : i === index
              ? stage === "ended" || stage === "finished"
                ? "done"
                : stage === "live" || stage === "ringing"
                  ? "playing"
                  : "queued"
              : "queued";
        const dot =
          state === "done"
            ? "var(--color-green-good)"
            : state === "playing"
              ? "var(--color-red)"
              : "color-mix(in oklch, var(--color-cream) 40%, transparent)";
        return (
          <li key={s.id} className="flex items-center gap-2">
            <span
              aria-hidden
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: dot,
                display: "inline-block",
              }}
            />
            <span style={{ fontWeight: state === "playing" ? 700 : 500 }}>
              {s.title}
            </span>
            <span className="mono-tag opacity-60">— {s.blurb}</span>
          </li>
        );
      })}
    </ul>
  );
}

function CallBody({
  script,
  stage,
  speaker,
  lines,
}: {
  script: VoiceScript;
  stage: Stage;
  speaker: VoiceLine["speaker"] | null;
  lines: VoiceLine[];
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col items-center gap-3 pb-2 pt-4">
        <PortraitForSpeaker script={script} speaker={speaker} stage={stage} />
        <div className="text-center">
          <div
            className="display"
            style={{ fontSize: "1.05rem", letterSpacing: "-0.01em" }}
          >
            {labelFor(script, speaker, stage)}
          </div>
          <div className="mono-tag mt-1 opacity-65">
            {stage === "idle"
              ? "standing by…"
              : stage === "ringing"
                ? "connecting…"
                : stage === "ended"
                  ? "call ended"
                  : stage === "finished"
                    ? "reel ended"
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
              key={`${script.id}:${i}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: ease.outQuart }}
              className="mb-2"
            >
              <div className="mono-tag opacity-70">
                {l.speaker === "caller"
                  ? script.callerName
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
      </div>

      <CallControlsBar />
    </div>
  );
}

function PortraitForSpeaker({
  script,
  speaker,
  stage,
}: {
  script: VoiceScript;
  speaker: VoiceLine["speaker"] | null;
  stage: Stage;
}) {
  // While ringing or in-between calls, show the inbound caller's portrait so
  // it's obvious who is dialing.
  const showCaller =
    speaker === "caller" || stage === "ringing" || stage === "ended";
  if (showCaller)
    return (
      <Persona
        character={script.callerCharacter}
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

function labelFor(
  script: VoiceScript,
  speaker: VoiceLine["speaker"] | null,
  stage: Stage,
) {
  if (stage === "idle") return "Splitko 0800 21 21 21";
  if (stage === "ringing") return `${script.callerName} · 0800 21 21 21`;
  if (stage === "ended") return `${script.callerName} · call ended`;
  if (stage === "finished") return "Splitko · standing by";
  if (speaker === "caller") return `${script.callerName} · ${script.callerWhere}`;
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
            active ? { scaleY: [0.4, 1, 0.6, 0.95, 0.5] } : { scaleY: 0.2 }
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

function CallControlsBar() {
  return (
    <div className="flex items-center justify-center gap-3 py-3 text-[var(--color-ink-soft)]">
      <ControlBubble label="mute">
        <span aria-hidden>🔇</span>
      </ControlBubble>
      <ControlBubble label="keypad">
        <span aria-hidden>#</span>
      </ControlBubble>
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full"
        style={{
          background: "oklch(0.5 0.22 25)",
          color: "var(--color-cream)",
        }}
        aria-hidden
      >
        ✕
      </div>
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
    <div
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-shadow)] text-[var(--color-ink)]"
    >
      {children}
    </div>
  );
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
