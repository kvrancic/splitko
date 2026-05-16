"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { ease } from "@/lib/motion";
import { useChatVisibility } from "./intent-context";

const PANEL_WIDTH = 400;

export default function DashboardShell({
  main,
  chat,
}: {
  main: ReactNode;
  chat: ReactNode;
}) {
  const { chatOpen, setChatOpen } = useChatVisibility();
  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-4 lg:px-6 lg:py-6">
      <main className="min-w-0">{main}</main>

      {/* Edge handle — only on lg+. Stays anchored at the vertical center of
          the viewport so the user always knows where the chat lives. */}
      <button
        type="button"
        aria-expanded={chatOpen}
        aria-label={chatOpen ? "Hide chat" : "Open chat"}
        title={chatOpen ? "Hide chat" : "Open chat"}
        aria-controls="splitko-chat-overlay"
        onClick={() => setChatOpen(!chatOpen)}
        className="group fixed top-1/2 z-40 hidden -translate-y-1/2 items-center gap-2 rounded-l-2xl py-3.5 pl-3 pr-3 text-sm font-semibold shadow-lg transition-all lg:inline-flex"
        style={{
          right: chatOpen ? PANEL_WIDTH : 0,
          background: "var(--color-navy)",
          color: "var(--color-cream)",
        }}
      >
        <span
          aria-hidden
          className="grid h-7 w-7 place-items-center rounded-full text-base"
          style={{
            background:
              "color-mix(in oklch, var(--color-cream) 18%, transparent)",
          }}
        >
          💬
        </span>
        <span aria-hidden style={{ fontSize: "1.1em", lineHeight: 1 }}>
          {chatOpen ? "›" : "‹"}
        </span>
      </button>

      {/* Overlay drawer */}
      <AnimatePresence>
        {chatOpen && (
          <motion.aside
            id="splitko-chat-overlay"
            key="chat-overlay"
            initial={{ x: PANEL_WIDTH }}
            animate={{ x: 0 }}
            exit={{ x: PANEL_WIDTH }}
            transition={{ duration: 0.35, ease: ease.outQuart }}
            className="fixed right-0 top-[64px] z-30 hidden h-[calc(100dvh-64px)] overflow-hidden bg-[var(--color-cream)] shadow-2xl lg:block"
            style={{
              width: PANEL_WIDTH,
              borderLeft:
                "1px solid color-mix(in oklch, var(--color-ink) 12%, transparent)",
            }}
          >
            {chat}
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
