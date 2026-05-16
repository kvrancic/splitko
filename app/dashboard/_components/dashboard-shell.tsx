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
        aria-controls="splitko-chat-overlay"
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed top-1/2 z-40 hidden -translate-y-1/2 items-center gap-1.5 rounded-l-2xl py-5 pl-3 pr-2 text-xs font-semibold shadow-lg transition-all lg:flex"
        style={{
          right: chatOpen ? PANEL_WIDTH : 0,
          background: "var(--color-navy)",
          color: "var(--color-cream)",
          writingMode: "vertical-rl",
        }}
      >
        <span aria-hidden style={{ writingMode: "horizontal-tb" }}>
          {chatOpen ? "›" : "‹"}
        </span>
        <span>{chatOpen ? "Hide chat" : "Open chat"}</span>
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
