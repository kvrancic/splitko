type BadgeProps = {
  tone?: "neutral" | "good" | "warn" | "alert" | "info";
  children: React.ReactNode;
  className?: string;
};

const TONES: Record<NonNullable<BadgeProps["tone"]>, string> = {
  neutral:
    "bg-[var(--color-ink)]/10 text-[var(--color-ink)] border border-[var(--color-ink)]/10",
  good:
    "bg-[var(--color-green-good)]/15 text-[oklch(0.42_0.16_145)] border border-[var(--color-green-good)]/30",
  warn:
    "bg-[var(--color-amber-warn)]/20 text-[oklch(0.44_0.13_75)] border border-[var(--color-amber-warn)]/40",
  alert:
    "bg-[var(--color-red)]/15 text-[var(--color-red)] border border-[var(--color-red)]/30",
  info:
    "bg-[var(--color-teal)]/15 text-[oklch(0.4_0.09_195)] border border-[var(--color-teal)]/30",
};

export function Badge({ tone = "neutral", children, className }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold tracking-[0.04em] uppercase ${TONES[tone]} ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
