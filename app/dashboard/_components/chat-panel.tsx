"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { INTENTS, type IntentId, type ToolCall } from "@/lib/intents";
import { ease } from "@/lib/motion";
import { useIntent } from "./intent-context";

type Message =
  | { role: "user"; text: string }
  | {
      role: "assistant";
      text: string;
      toolCalls: (ToolCall & { startedAt: number; done: boolean })[];
      citations: string[];
    };

const STARTER_SUGGESTIONS = [
  "Idem na kupanje, koja plaža sad?",
  "Kako do Mertojaka u 8?",
  "Gdje ima parking blizu Rive?",
  "Imam fotku puknutog fenjera.",
  "Što ima u Splitu večeras s djecom?",
  "Tražim podstanara za jul, soba u Manušu.",
  "Trebam nazvati KBC.",
  "Hoću biti na Braču u 11.",
];

export default function ChatPanel() {
  const { setIntent } = useIntent();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  async function send(text: string) {
    if (!text.trim() || busy) return;
    setBusy(true);
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");

    try {
      const res = await fetch("/api/llm", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = (await res.json()) as {
        intent: IntentId;
        answer: string;
        toolCalls: ToolCall[];
        citations: string[];
      };
      setIntent(data.intent);

      const startedAt = Date.now();
      const initial = data.toolCalls.map((tc) => ({
        ...tc,
        startedAt,
        done: false,
      }));
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: "",
          toolCalls: initial,
          citations: data.citations,
        },
      ]);

      // Animate tool calls completing sequentially.
      let cumulative = 0;
      for (let i = 0; i < initial.length; i++) {
        cumulative += Math.min(initial[i]!.durationMs, 1400);
        await new Promise((r) => setTimeout(r, Math.min(initial[i]!.durationMs, 1400)));
        setMessages((m) => {
          const copy = [...m];
          const last = copy[copy.length - 1];
          if (last && last.role === "assistant") {
            const tc = [...last.toolCalls];
            tc[i] = { ...tc[i]!, done: true };
            copy[copy.length - 1] = { ...last, toolCalls: tc };
          }
          return copy;
        });
      }

      await new Promise((r) => setTimeout(r, 200));
      // Reveal answer text.
      setMessages((m) => {
        const copy = [...m];
        const last = copy[copy.length - 1];
        if (last && last.role === "assistant") {
          copy[copy.length - 1] = { ...last, text: data.answer };
        }
        return copy;
      });
    } catch (err) {
      console.warn(err);
    } finally {
      setBusy(false);
    }
  }

  return (
    <aside
      className="flex h-full flex-col overflow-hidden bg-[var(--color-cream)]"
      style={{
        borderLeft: "1px solid color-mix(in oklch, var(--color-ink) 10%, transparent)",
      }}
    >
      <header className="flex items-center justify-between gap-2 border-b border-[var(--color-ink)]/10 px-4 py-3">
        <div>
          <div className="mono-tag text-[var(--color-ink-soft)]">
            Splitko · chat
          </div>
          <div
            className="display"
            style={{ fontSize: "1.15rem", lineHeight: 1.0 }}
          >
            Ask anything
          </div>
        </div>
        <span
          className="mono-tag rounded-full px-2 py-1"
          style={{
            background: "var(--color-navy)",
            color: "var(--color-cream)",
          }}
        >
          live
        </span>
      </header>

      <div
        ref={scrollRef}
        className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-4 no-scrollbar"
      >
        {messages.length === 0 ? (
          <EmptyState onPick={send} />
        ) : (
          messages.map((m, i) => (
            <MessageBubble key={i} message={m} />
          ))
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="border-t border-[var(--color-ink)]/10 p-3"
      >
        <div className="flex items-center gap-2 rounded-2xl bg-[var(--color-cream-shadow)] px-3 py-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--color-ink-soft)]"
            disabled={busy}
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="rounded-full bg-[var(--color-navy)] px-3 py-1.5 text-xs font-semibold text-[var(--color-cream)] transition-opacity disabled:opacity-40"
          >
            {busy ? "…" : "Ask"}
          </button>
        </div>
      </form>
    </aside>
  );
}

function EmptyState({ onPick }: { onPick: (q: string) => void }) {
  return (
    <div className="space-y-3 text-[var(--color-ink-soft)]">
      <p className="body-lg">
        Type a question, or pick one. The dashboard reconfigures around what
        you ask.
      </p>
      <ul className="flex flex-wrap gap-2">
        {STARTER_SUGGESTIONS.map((s) => (
          <li key={s}>
            <button
              type="button"
              onClick={() => onPick(s)}
              className="rounded-full border border-[var(--color-ink)]/15 px-3 py-1.5 text-left text-xs font-medium transition-colors hover:border-[var(--color-ink)] hover:bg-[var(--color-cream-shadow)]"
            >
              {s}
            </button>
          </li>
        ))}
      </ul>
      <div className="mono-tag pt-2 text-[var(--color-ink-soft)] opacity-60">
        Real ports: {INTENTS.filter((i) => i.toolCalls.some((t) => t.real)).length}
        {" / "}
        Mocked ports: {INTENTS.length}
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  if (message.role === "user") {
    return (
      <div className="self-end max-w-[90%]">
        <div
          className="rounded-2xl rounded-br-md px-3 py-2 text-sm"
          style={{
            background: "var(--color-navy)",
            color: "var(--color-cream)",
          }}
        >
          {message.text}
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-2">
      <div
        className="rounded-2xl rounded-tl-md px-3 py-2 text-sm"
        style={{
          background: "var(--color-cream-shadow)",
          color: "var(--color-ink)",
        }}
      >
        {message.toolCalls.length > 0 && (
          <ul className="mb-2 space-y-1.5">
            {message.toolCalls.map((tc, i) => (
              <ToolCallLine key={i} tc={tc} />
            ))}
          </ul>
        )}
        {message.text ? (
          <p className="leading-relaxed">{message.text}</p>
        ) : (
          <div className="mono-tag text-[var(--color-ink-soft)]">
            Composing…
          </div>
        )}
        {message.text && message.citations.length > 0 && (
          <p className="mono-tag mt-2 text-[var(--color-ink-soft)] opacity-70">
            sources · {message.citations.join(" · ")}
          </p>
        )}
      </div>
    </div>
  );
}

function ToolCallLine({
  tc,
}: {
  tc: ToolCall & { done: boolean };
}) {
  return (
    <li className="grid grid-cols-[18px_1fr_auto] items-center gap-2 text-[12px]">
      <span aria-hidden>
        {tc.done ? (
          <span style={{ color: "var(--color-green-good)" }}>✓</span>
        ) : (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ display: "inline-block" }}
          >
            ◜
          </motion.span>
        )}
      </span>
      <span className="truncate font-mono">
        {tc.name}
        {tc.args && (
          <span className="opacity-60">({tc.args})</span>
        )}
        {tc.real && (
          <AnimatePresence>
            {tc.done && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="ml-2 inline-block rounded px-1 text-[9px] font-bold"
                style={{
                  background: "var(--color-red)",
                  color: "var(--color-cream)",
                }}
              >
                REAL
              </motion.span>
            )}
          </AnimatePresence>
        )}
      </span>
      <span className="mono-tag opacity-65">
        {tc.done ? `${(tc.durationMs / 1000).toFixed(1)}s` : ""}
      </span>
    </li>
  );
}
