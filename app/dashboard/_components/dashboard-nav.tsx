"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/ui/wordmark";
import { clearDemoSession, readDemoSession } from "@/lib/profile";
import { createClient, supabaseConfigured } from "@/lib/supabase/client";

const TABS = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard" },
  { id: "chat", label: "Chat", href: "/dashboard/chat" },
];

export default function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (supabaseConfigured()) {
      const sb = createClient();
      sb.auth.getUser().then(({ data }) => {
        const meta = data?.user?.user_metadata as
          | { display_name?: string }
          | undefined;
        const email = data?.user?.email ?? "";
        setName(meta?.display_name ?? email.split("@")[0] ?? "Splićanin");
      });
    } else {
      const s = readDemoSession();
      setName(s?.user?.profile?.displayName ?? "Splićanin");
    }
  }, []);

  async function onSignOut() {
    if (supabaseConfigured()) {
      const sb = createClient();
      await sb.auth.signOut();
    } else {
      clearDemoSession();
    }
    router.push("/");
  }

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur"
      style={{
        background:
          "color-mix(in oklch, var(--color-cream) 88%, transparent)",
        borderColor: "color-mix(in oklch, var(--color-ink) 12%, transparent)",
      }}
    >
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Wordmark variant="ink" size={20} />

        <nav className="flex items-center gap-1 rounded-full bg-[var(--color-cream-shadow)] p-1">
          {TABS.map((t) => {
            const active = pathname === t.href;
            return (
              <Link
                key={t.id}
                href={t.href}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${
                  active
                    ? "bg-[var(--color-navy)] text-[var(--color-cream)]"
                    : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
                }`}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <span
            className="hidden text-xs sm:block"
            style={{ color: "var(--color-ink-soft)" }}
          >
            {name}
          </span>
          <button
            onClick={onSignOut}
            className="rounded-full border border-[var(--color-ink)]/20 px-3 py-1.5 text-xs font-semibold hover:border-[var(--color-ink)]"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
