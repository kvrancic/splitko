"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Persona from "@/components/persona";
import PhoneShell from "@/components/phone-mock";
import { Wordmark } from "@/components/ui/wordmark";
import { ease } from "@/lib/motion";
import { VOICE_SCRIPTS, type VoiceLine, type VoiceScript } from "@/content/voice-script";

type Stage = "incoming" | "ringing" | "live" | "ended";

export default function VoiceView() {
  const [active, setActive] = useState<VoiceScript["id"]>(VOICE_SCRIPTS[0]!.id);
  const script = VOICE_SCRIPTS.find((s) => s.id === active)!;
  const [stage, setStage] = useState<Stage>("incoming");
  const [lines, setLines] = useState<VoiceLine[]>([]);
  const [speaker, setSpeaker] = useState<VoiceLine["speaker"] | null>(null);
  const runIdRef = useRef(0);

  // Reset call state whenever the user switches scripts.
  useEffect(() => {
    runIdRef.current += 1;
    setStage("incoming");
    setLines([]);
    setSpeaker(null);
  }, [active]);

  useEffect(() => {
    return () => {
      runIdRef.current += 1;
    };
  }, []);

  async function pickUp() {
    const myId = ++runIdRef.current;
    setStage("ringing");
    await wait(900);
    if (runIdRef.current !== myId) return;
    setStage("live");
    setLines([]);
    for (const l of script.lines) {
      if (runIdRef.current !== myId) return;
      setSpeaker(l.speaker);
      setLines((prev) => [...prev, l]);
      await wait(l.durationMs);
    }
    if (runIdRef.current === myId) {
      setSpeaker(null);
      setStage("ended");
    }
  }

  function reset() {
    runIdRef.current += 1;
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
            citizen dials a number on a magnet on the fridge. The agent picks
            up in the Dalmatian they actually speak.
          </p>

          <div className="mt-6">
            <div className="mono-tag opacity-70">Scripted demo</div>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {VOICE_SCRIPTS.map((s) => (
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

          <div className="rounded-2xl border border-[var(--color-cream)]/25 p-5">
            <div className="mono-tag opacity-70">
              Inbound call · {script.callerName} · {script.callerWhere}
            </div>
            <p className="mt-2 text-[var(--color-cream)]/85">
              {script.callerName} dials 0800 21 21 21 from a landline. The agent
              answers in their dialect, listens, and walks them through the
              answer on the line.
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
                      : "Call ended"}
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
              script={script}
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
  script,
  stage,
  speaker,
  lines,
  onPickUp,
}: {
  script: VoiceScript;
  stage: Stage;
  speaker: VoiceLine["speaker"] | null;
  lines: VoiceLine[];
  onPickUp: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col items-center gap-3 pb-2 pt-4">
        <PortraitForSpeaker script={script} speaker={speaker} />
        <div className="text-center">
          <div
            className="display"
            style={{ fontSize: "1.05rem", letterSpacing: "-0.01em" }}
          >
            {labelFor(script, speaker, stage)}
          </div>
          <div className="mono-tag mt-1 opacity-65">
            {stage === "incoming"
              ? "incoming"
              : stage === "ringing"
                ? "connecting…"
                : stage === "ended"
                  ? "call ended"
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

      <CallControls stage={stage} onPickUp={onPickUp} />
    </div>
  );
}

function PortraitForSpeaker({
  script,
  speaker,
}: {
  script: VoiceScript;
  speaker: VoiceLine["speaker"] | null;
}) {
  if (speaker === "caller")
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
  if (stage === "incoming")
    return `${script.callerName} · 0800 21 21 21`;
  if (stage === "ringing") return "Connecting…";
  if (stage === "ended") return `${script.callerName} · call ended`;
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
