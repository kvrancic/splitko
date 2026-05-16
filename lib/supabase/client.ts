"use client";

import { createBrowserClient } from "@supabase/ssr";

let cached: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    // Stub for the dev demo when Supabase isn't wired yet.
    // We return a minimal "fake" client so the UI doesn't crash.
    // The real implementation kicks in as soon as env vars are present.
    return makeFakeBrowserClient();
  }

  cached = createBrowserClient(url, anon);
  return cached;
}

export function supabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

type FakeClient = ReturnType<typeof createBrowserClient>;

function makeFakeBrowserClient(): FakeClient {
  const session = typeof window !== "undefined" ? readFakeSession() : null;
  const notConfigured = () =>
    Promise.resolve({
      data: { user: null, session: null },
      error: { message: "Supabase not configured", name: "AuthError" } as never,
    });
  return {
    auth: {
      signInWithPassword: notConfigured,
      signUp: notConfigured,
      signInWithOtp: notConfigured,
      signInWithOAuth: notConfigured,
      signOut: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("splitko-demo-session");
          document.cookie =
            "splitko-demo-session=; Path=/; Max-Age=0; SameSite=Lax";
        }
        return Promise.resolve({ error: null });
      },
      getSession: () =>
        Promise.resolve({ data: { session }, error: null }) as never,
      getUser: () =>
        Promise.resolve({
          data: { user: session?.user ?? null },
          error: null,
        }) as never,
      onAuthStateChange: () =>
        ({ data: { subscription: { unsubscribe() {} } } }) as never,
    },
  } as unknown as FakeClient;
}

function readFakeSession() {
  try {
    const raw = localStorage.getItem("splitko-demo-session");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
