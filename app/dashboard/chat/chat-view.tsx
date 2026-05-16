"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { INTENTS, type Intent, type ToolCall } from "@/lib/intents";
import { ease } from "@/lib/motion";

type Turn =
  | { role: "user"; text: string }
  | {
      role: "assistant";
      text: string;
      toolCalls: (ToolCall & { done: boolean; startedAt: number })[];
      citations: string[];
      realResults: Record<string, unknown>;
    };

type HeroPhoto = { src: string; alt: string } | null;

export default function ChatView({ heroPhoto }: { heroPhoto: HeroPhoto }) {
  const [input, setInput] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [turns]);

  async function send(text: string) {
    if (!text.trim() || busy) return;
    setBusy(true);
    setTurns((t) => [...t, { role: "user", text }]);
    setInput("");

    try {
      const res = await fetch("/api/llm", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = (await res.json()) as {
        answer: string;
        toolCalls: ToolCall[];
        citations: string[];
        realResults: Record<string, unknown>;
      };
      const startedAt = Date.now();
      const initial: Turn = {
        role: "assistant",
        text: "",
        toolCalls: data.toolCalls.map((tc) => ({ ...tc, done: false, startedAt })),
        citations: data.citations,
        realResults: data.realResults,
      };
      setTurns((t) => [...t, initial]);

      for (let i = 0; i < initial.toolCalls.length; i++) {
        await new Promise((r) =>
          setTimeout(r, Math.min(initial.toolCalls[i]!.durationMs, 1500)),
        );
        setTurns((t) => {
          const copy = [...t];
          const last = copy[copy.length - 1];
          if (last && last.role === "assistant") {
            const tc = [...last.toolCalls];
            tc[i] = { ...tc[i]!, done: true };
            copy[copy.length - 1] = { ...last, toolCalls: tc };
          }
          return copy;
        });
      }

      await new Promise((r) => setTimeout(r, 250));
      setTurns((t) => {
        const copy = [...t];
        const last = copy[copy.length - 1];
        if (last && last.role === "assistant") {
          copy[copy.length - 1] = { ...last, text: data.answer };
        }
        return copy;
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b border-[var(--color-ink)]/10 px-5 py-3">
        <div>
          <div className="mono-tag text-[var(--color-ink-soft)]">
            Splitko · chat
          </div>
          <div
            className="display"
            style={{ fontSize: "1.2rem", lineHeight: 1.0 }}
          >
            Ask me anything about Split
          </div>
        </div>
      </header>

      <div
        ref={scrollRef}
        className="flex flex-1 flex-col gap-5 overflow-y-auto px-5 py-6 no-scrollbar"
      >
        {turns.length === 0 ? (
          <EmptyState onPick={send} heroPhoto={heroPhoto} />
        ) : (
          turns.map((t, i) => <Turn key={i} turn={t} />)
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="border-t border-[var(--color-ink)]/10 p-3"
      >
        <div className="mx-auto flex max-w-screen-md items-center gap-2 rounded-2xl bg-[var(--color-cream-shadow)] px-3 py-2.5">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Splitko anything…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--color-ink-soft)]"
            disabled={busy}
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="rounded-full px-4 py-1.5 text-xs font-semibold disabled:opacity-40"
            style={{
              background: "var(--color-navy)",
              color: "var(--color-cream)",
            }}
          >
            {busy ? "…" : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}

function EmptyState({
  onPick,
  heroPhoto,
}: {
  onPick: (q: string) => void;
  heroPhoto: HeroPhoto;
}) {
  // Just the first 6 intents — enough variety, low cognitive load.
  const suggestions = INTENTS.slice(0, 6);
  return (
    <div className="mx-auto w-full max-w-screen-md space-y-6 text-[var(--color-ink-soft)]">
      {heroPhoto && (
        <div
          className="relative w-full overflow-hidden rounded-2xl"
          style={{ aspectRatio: "21 / 9", background: "var(--color-cream-deep)" }}
        >
          <Image
            src={heroPhoto.src}
            alt={heroPhoto.alt}
            fill
            sizes="(min-width: 1024px) 720px, 92vw"
            className="object-cover"
          />
          <div
            className="absolute inset-x-0 bottom-0 p-5 text-[var(--color-cream)]"
            style={{
              background:
                "linear-gradient(0deg, color-mix(in oklch, var(--color-ink) 78%, transparent), transparent 70%)",
            }}
          >
            <div
              className="display"
              style={{
                fontSize: "clamp(1.5rem, 0.7rem + 1.4vw, 2rem)",
                letterSpacing: "-0.015em",
              }}
            >
              How can I help you today?
            </div>
            <p className="text-sm opacity-90">
              Type below, or tap one of the questions to try it.
            </p>
          </div>
        </div>
      )}
      <ul className="grid gap-2 sm:grid-cols-2">
        {suggestions.map((i) => (
          <li key={i.id}>
            <button
              type="button"
              onClick={() => onPick(i.example)}
              className="w-full rounded-xl bg-[var(--color-cream-shadow)] p-4 text-left transition-colors hover:bg-[var(--color-cream-deep)]"
              style={{
                border:
                  "1px solid color-mix(in oklch, var(--color-ink) 12%, transparent)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  color: "var(--color-ink)",
                  letterSpacing: "-0.005em",
                  fontSize: "0.98rem",
                }}
              >
                {i.example}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Turn({ turn }: { turn: Turn }) {
  if (turn.role === "user") {
    return (
      <div className="mx-auto max-w-screen-md self-end">
        <div
          className="ml-auto inline-block max-w-[80%] rounded-2xl rounded-br-md px-4 py-2.5 text-sm"
          style={{
            background: "var(--color-navy)",
            color: "var(--color-cream)",
          }}
        >
          {turn.text}
        </div>
      </div>
    );
  }
  return (
    <div className="mx-auto w-full max-w-screen-md">
      <ToolStream toolCalls={turn.toolCalls} />
      {turn.text && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: ease.outQuart }}
          className="mt-4 rounded-2xl bg-[var(--color-cream-shadow)] p-5 leading-relaxed"
          style={{
            border:
              "1px solid color-mix(in oklch, var(--color-ink) 10%, transparent)",
          }}
        >
          {turn.text}
          {turn.citations.length > 0 && (
            <div className="mono-tag mt-3 text-[var(--color-ink-soft)] opacity-65">
              sources · {turn.citations.join(" · ")}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

function ToolStream({
  toolCalls,
}: {
  toolCalls: (ToolCall & { done: boolean; startedAt: number })[];
}) {
  return (
    <ol
      className="overflow-hidden rounded-2xl"
      style={{
        background: "color-mix(in oklch, var(--color-cream-shadow) 60%, transparent)",
        border:
          "1px solid color-mix(in oklch, var(--color-ink) 10%, transparent)",
      }}
    >
      {toolCalls.map((tc, i) => (
        <li
          key={i}
          className="grid grid-cols-[28px_1fr_auto] items-center gap-3 px-4 py-2.5"
          style={{
            borderBottom:
              i < toolCalls.length - 1
                ? "1px solid color-mix(in oklch, var(--color-ink) 8%, transparent)"
                : undefined,
            background: tc.done
              ? "color-mix(in oklch, var(--color-green-good) 6%, transparent)"
              : "color-mix(in oklch, var(--color-amber-warn) 10%, transparent)",
          }}
        >
          <span aria-hidden>
            {tc.done ? (
              <CheckIcon />
            ) : (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  display: "inline-block",
                  color: "var(--color-amber-warn)",
                }}
              >
                ⟳
              </motion.span>
            )}
          </span>
          <div className="text-[13.5px]">
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                color: "var(--color-ink)",
              }}
            >
              {humanise(tc.name)}
            </span>
            {tc.args && (
              <span className="ml-1 text-[var(--color-ink-soft)]">
                — {tc.args}
              </span>
            )}
          </div>
          <span className="mono-tag opacity-65">
            {tc.done ? `${(tc.durationMs / 1000).toFixed(1)}s` : ""}
          </span>
        </li>
      ))}
    </ol>
  );
}

function CheckIcon() {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-flex",
        width: 22,
        height: 22,
        borderRadius: 999,
        background: "var(--color-green-good)",
        color: "var(--color-cream)",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 13,
      }}
    >
      ✓
    </span>
  );
}

function humanise(name: string) {
  switch (name) {
    case "getSeaQuality":
      return "Reading sea quality";
    case "getCurrentWeather":
      return "Checking the weather";
    case "getWebcamFrame":
      return "Looking at the webcam";
    case "getBusETA":
      return "Asking the bus";
    case "getTrafficState":
      return "Checking traffic";
    case "getParkingSignal":
      return "Counting parking bays";
    case "getDynamicPrice":
      return "Reading parking prices";
    case "ragLookup":
      return "Reading gov.hr";
    case "matchProfile":
      return "Checking your profile";
    case "classifyIssue":
      return "Classifying the photo";
    case "geocodeFromExif":
      return "Reading photo location";
    case "routeToDepartment":
      return "Routing to the office";
    case "listMarketSide":
      return "Listing market side";
    case "matchCounterparty":
      return "Finding a counterpart";
    case "negotiateBand":
      return "Negotiating the band";
    case "listEvents":
      return "Listing what's on";
    case "getWeather":
      return "Checking tonight's weather";
    case "transcribeAudio":
      return "Listening to the recording";
    case "prepareHandoff":
      return "Briefing the human";
    case "getFerry":
      return "Asking Jadrolinija";
    default:
      return name;
  }
}

// keep Intent referenced so TS doesn't drop the type import on unused-symbol scans
type _Intent = Intent;
