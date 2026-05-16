"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ease } from "@/lib/motion";
import ChatPanel from "./chat-panel";

export default function MobileChatDrawer() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-[0_18px_40px_-12px_rgba(11,20,40,0.4)] lg:hidden"
        style={{
          background: "var(--color-navy)",
          color: "var(--color-cream)",
        }}
      >
        Ask Splitko
        <span aria-hidden>↗</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col lg:hidden"
            style={{
              background: "color-mix(in oklch, var(--color-ink) 60%, transparent)",
            }}
            onClick={() => setOpen(false)}
          >
            <motion.aside
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.45, ease: ease.outQuart }}
              className="mt-auto h-[78dvh] overflow-hidden rounded-t-3xl"
              style={{
                background: "var(--color-cream)",
                boxShadow: "0 -20px 40px rgba(0,0,0,0.18)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[var(--color-ink)]/10 px-4 py-2.5">
                <div className="mono-tag text-[var(--color-ink-soft)]">
                  Splitko · chat
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full p-1 text-[var(--color-ink-soft)]"
                  aria-label="Close chat"
                >
                  ✕
                </button>
              </div>
              <div className="h-[calc(100%-44px)]">
                <ChatPanel />
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
