"use client";

import { type ReactNode } from "react";

type PhoneShellProps = {
  variant?: "whatsapp" | "voice" | "dashboard";
  carrier?: string;
  time?: string;
  children: ReactNode;
  className?: string;
};

/**
 * iPhone-style shell with dynamic-island notch, status bar, and a body slot.
 * Variant changes the header treatment.
 */
export default function PhoneShell({
  variant = "whatsapp",
  carrier = "Splitko",
  time = "14:32",
  children,
  className,
}: PhoneShellProps) {
  return (
    <div
      className={className}
      style={{
        width: "min(360px, 88vw)",
        aspectRatio: "9 / 19.5",
        borderRadius: 42,
        padding: 6,
        background:
          "linear-gradient(180deg, oklch(0.32 0.04 257) 0%, oklch(0.18 0.04 257) 100%)",
        boxShadow:
          "0 30px 60px -20px rgba(8, 18, 40, 0.45), 0 6px 16px rgba(8, 18, 40, 0.2)",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "var(--color-cream)",
          borderRadius: 36,
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <StatusBar carrier={carrier} time={time} />
        <HeaderBar variant={variant} />
        <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
          {children}
        </div>
      </div>
      <DynamicIsland />
    </div>
  );
}

function StatusBar({ carrier, time }: { carrier: string; time: string }) {
  return (
    <div
      style={{
        height: 38,
        padding: "0 22px",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        fontSize: 11,
        letterSpacing: "0.02em",
        color: "var(--color-ink)",
        opacity: 0.9,
        paddingBottom: 6,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      <span>{time}</span>
      <span style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <span>{carrier}</span>
        <span aria-hidden>•••</span>
      </span>
    </div>
  );
}

function HeaderBar({ variant }: { variant: "whatsapp" | "voice" | "dashboard" }) {
  if (variant === "whatsapp") {
    return (
      <div
        style={{
          background: "oklch(0.38 0.12 145)",
          color: "var(--color-cream)",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 999,
            background: "var(--color-cream)",
            color: "oklch(0.38 0.12 145)",
            display: "grid",
            placeItems: "center",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
          }}
        >
          S
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14 }}>Splitko</div>
          <div style={{ fontSize: 11, opacity: 0.85 }}>online</div>
        </div>
      </div>
    );
  }
  if (variant === "voice") {
    return (
      <div
        style={{
          padding: "16px 22px 12px",
          color: "var(--color-navy)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-navy-mist)",
          }}
        >
          Splitko
        </div>
        <div className="display" style={{ fontSize: "1.4rem" }}>
          0800 SPLIT
        </div>
      </div>
    );
  }
  return (
    <div
      style={{
        padding: "10px 16px",
        background: "var(--color-navy)",
        color: "var(--color-cream)",
        fontWeight: 600,
        fontSize: 14,
      }}
    >
      Splitko / Dashboard
    </div>
  );
}

function DynamicIsland() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: 8,
        left: "50%",
        transform: "translateX(-50%)",
        width: 110,
        height: 28,
        borderRadius: 14,
        background: "oklch(0.06 0.005 257)",
        boxShadow: "inset 0 0 0 1px oklch(0.22 0.04 257)",
        zIndex: 5,
      }}
    />
  );
}
