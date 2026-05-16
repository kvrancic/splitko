"use client";

import { createBrowserClient } from "@supabase/ssr";
import { isSupabaseConfigured, supabasePublishableKey, supabaseUrl } from "./env";

let cached: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  if (cached) return cached;

  if (!isSupabaseConfigured()) {
    return makeFakeBrowserClient();
  }

  cached = createBrowserClient(supabaseUrl()!, supabasePublishableKey()!);
  return cached;
}

export function supabaseConfigured(): boolean {
  return isSupabaseConfigured();
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
