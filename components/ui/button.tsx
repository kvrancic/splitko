import type { ButtonHTMLAttributes } from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "ghost" | "outline" | "red";

type CommonProps = {
  variant?: ButtonVariant;
  className?: string;
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-[-0.005em] transition-all duration-200 ease-out will-change-transform";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-cream)] text-[var(--color-ink)] hover:scale-[1.02] hover:bg-white active:scale-[0.98]",
  ghost:
    "text-[var(--color-cream)]/85 hover:text-[var(--color-cream)] underline underline-offset-[6px] decoration-[var(--color-red)]",
  outline:
    "border border-[var(--color-cream)]/30 text-[var(--color-cream)] hover:border-[var(--color-cream)] hover:bg-[var(--color-cream)]/5",
  red: "bg-[var(--color-red)] text-[var(--color-cream)] hover:bg-[var(--color-red-hot)] hover:scale-[1.02] active:scale-[0.98]",
};

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${BASE} ${VARIANTS[variant]} ${className ?? ""}`}
      {...rest}
    >
      {children}
    </button>
  );
}

type LinkButtonProps = CommonProps & {
  href: string;
  children: React.ReactNode;
};

export function LinkButton({
  href,
  variant = "primary",
  className,
  children,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`${BASE} ${VARIANTS[variant]} ${className ?? ""}`}
    >
      {children}
    </Link>
  );
}
