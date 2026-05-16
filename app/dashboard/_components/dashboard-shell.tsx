"use client";

import type { ReactNode } from "react";
import { useChatVisibility } from "./intent-context";

export default function DashboardShell({
  main,
  chat,
}: {
  main: ReactNode;
  chat: ReactNode;
}) {
  const { chatOpen } = useChatVisibility();
  return (
    <div
      className={`mx-auto grid max-w-screen-2xl grid-cols-1 gap-4 px-4 py-4 lg:gap-6 lg:px-6 lg:py-6 ${
        chatOpen
          ? "lg:grid-cols-[1fr_min(380px,32vw)]"
          : "lg:grid-cols-1"
      }`}
    >
      <main className="min-w-0">{main}</main>
      {chatOpen && (
        <div
          className="hidden h-[calc(100dvh-90px)] overflow-hidden rounded-2xl lg:block"
          style={{
            border:
              "1px solid color-mix(in oklch, var(--color-ink) 10%, transparent)",
          }}
        >
          {chat}
        </div>
      )}
    </div>
  );
}
