import Link from "next/link";

export function Wordmark({
  variant = "cream",
  size = 22,
  asLink = true,
}: {
  variant?: "cream" | "ink";
  size?: number;
  asLink?: boolean;
}) {
  const color =
    variant === "cream" ? "var(--color-cream)" : "var(--color-ink)";
  const dotColor = "var(--color-red)";

  const inner = (
    <span
      className="display"
      style={{
        color,
        fontSize: size,
        letterSpacing: "-0.03em",
        display: "inline-flex",
        alignItems: "baseline",
        gap: 1,
      }}
    >
      splitko
      <span aria-hidden style={{ color: dotColor }}>
        .
      </span>
    </span>
  );

  if (!asLink) return inner;
  return (
    <Link href="/" aria-label="Splitko home">
      {inner}
    </Link>
  );
}
