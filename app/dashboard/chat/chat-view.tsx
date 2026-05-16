"use client";

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

export default function ChatView() {
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
            Splitko · orchestrator
          </div>
          <div
            className="display"
            style={{ fontSize: "1.2rem", lineHeight: 1.0 }}
          >
            Show your work
          </div>
        </div>
        <div className="mono-tag rounded-full bg-[var(--color-cream-shadow)] px-2 py-1">
          {INTENTS.length} intents · {INTENTS.filter((i) => i.toolCalls.some((t) => t.real)).length} live ports
        </div>
      </header>

      <div
        ref={scrollRef}
        className="flex flex-1 flex-col gap-5 overflow-y-auto px-5 py-6 no-scrollbar"
      >
        {turns.length === 0 ? (
          <EmptyState onPick={send} />
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
            className="rounded-full bg-[var(--color-navy)] px-4 py-1.5 text-xs font-semibold text-[var(--color-cream)] disabled:opacity-40"
          >
            {busy ? "…" : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}

function EmptyState({ onPick }: { onPick: (q: string) => void }) {
  return (
    <div className="mx-auto max-w-screen-md space-y-6 text-[var(--color-ink-soft)]">
      <div>
        <h2
          className="display"
          style={{
            fontSize: "clamp(1.7rem, 0.7rem + 2vw, 2.4rem)",
            color: "var(--color-ink)",
            letterSpacing: "-0.018em",
          }}
        >
          What can I ask?
        </h2>
        <p className="body-lg">
          This is the same brain that answers on the dashboard, but you see
          every tool call as it happens. DHMZ and IZOR fire for real.
        </p>
      </div>
      <ul className="grid gap-2 sm:grid-cols-2">
        {INTENTS.slice(0, 8).map((i) => (
          <li key={i.id}>
            <button
              type="button"
              onClick={() => onPick(i.example)}
              className="w-full rounded-xl border border-[var(--color-ink)]/12 bg-[var(--color-cream-shadow)]/70 p-4 text-left transition-colors hover:bg-[var(--color-cream-shadow)]"
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  color: "var(--color-ink)",
                  letterSpacing: "-0.005em",
                }}
              >
                {i.example}
              </div>
              <div className="mono-tag mt-1 text-[var(--color-ink-soft)] opacity-70">
                will use · {i.toolCalls.map((t) => t.name).join(" · ")}
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
        <div className="ml-auto inline-block max-w-[80%] rounded-2xl rounded-br-md bg-[var(--color-navy)] px-4 py-2.5 text-sm text-[var(--color-cream)]">
          {turn.text}
        </div>
      </div>
    );
  }
  return (
    <div className="mx-auto w-full max-w-screen-md">
      <ToolStream toolCalls={turn.toolCalls} realResults={turn.realResults} />
      {turn.text && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: ease.outQuart }}
          className="mt-4 rounded-2xl border border-[var(--color-ink)]/12 bg-[var(--color-cream-shadow)]/70 p-5 leading-relaxed"
        >
          {turn.text}
          <div className="mono-tag mt-3 text-[var(--color-ink-soft)] opacity-65">
            sources · {turn.citations.join(" · ")}
          </div>
        </motion.div>
      )}
    </div>
  );
}

function ToolStream({
  toolCalls,
  realResults,
}: {
  toolCalls: (ToolCall & { done: boolean; startedAt: number })[];
  realResults: Record<string, unknown>;
}) {
  return (
    <ol className="overflow-hidden rounded-2xl border border-[var(--color-ink)]/12 bg-[var(--color-cream-shadow)]/40">
      {toolCalls.map((tc, i) => (
        <li
          key={i}
          className="grid grid-cols-[26px_1fr_auto] items-start gap-3 px-4 py-2.5"
          style={{
            borderBottom:
              i < toolCalls.length - 1
                ? "1px solid color-mix(in oklch, var(--color-ink) 8%, transparent)"
                : undefined,
            background: tc.done
              ? "color-mix(in oklch, var(--color-green-good) 5%, transparent)"
              : "color-mix(in oklch, var(--color-amber-warn) 10%, transparent)",
          }}
        >
          <span aria-hidden style={{ marginTop: 2 }}>
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
                style={{ display: "inline-block", color: "var(--color-amber-warn)" }}
              >
                ⟳
              </motion.span>
            )}
          </span>
          <div className="font-mono text-[12.5px]">
            <span style={{ color: "var(--color-navy)" }}>{tc.name}</span>
            {tc.args && (
              <span className="text-[var(--color-ink-soft)]">({tc.args})</span>
            )}
            {tc.real && (
              <AnimatePresence>
                {tc.done && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="ml-2 inline-block rounded px-1.5 py-0.5 text-[9px] font-bold"
                    style={{
                      background: "var(--color-red)",
                      color: "var(--color-cream)",
                    }}
                  >
                    REAL · {tc.real.toUpperCase()}
                  </motion.span>
                )}
              </AnimatePresence>
            )}
            {tc.real && tc.done && realResults[tc.name] ? (
              <RealPayload payload={realResults[tc.name]} />
            ) : null}
          </div>
          <span className="mono-tag opacity-65">
            {tc.done ? `${(tc.durationMs / 1000).toFixed(1)}s` : ""}
          </span>
        </li>
      ))}
    </ol>
  );
}

function RealPayload({ payload }: { payload: unknown }) {
  let preview = "";
  try {
    preview = JSON.stringify(payload, null, 2);
  } catch {
    preview = String(payload);
  }
  const truncated = preview.slice(0, 220);
  return (
    <div
      className="mt-1.5 max-h-24 overflow-hidden rounded-md bg-[var(--color-ink)]/85 p-2 font-mono text-[10.5px] text-[var(--color-cream)]"
      style={{ whiteSpace: "pre-wrap" }}
    >
      {truncated}
      {preview.length > 220 ? "…" : ""}
    </div>
  );
}

function CheckIcon() {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-flex",
        width: 20,
        height: 20,
        borderRadius: 999,
        background: "var(--color-green-good)",
        color: "var(--color-cream)",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
      }}
    >
      ✓
    </span>
  );
}

// keep Intent referenced so TS doesn't drop the type import on unused-symbol scans
type _Intent = Intent;
