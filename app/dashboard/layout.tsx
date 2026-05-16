import { type ReactNode } from "react";
import DashboardNav from "./_components/dashboard-nav";

export const metadata = { title: "Dashboard · Splitko" };

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-[var(--color-cream)] text-[var(--color-ink)]">
      <DashboardNav />
      {children}
    </div>
  );
}
