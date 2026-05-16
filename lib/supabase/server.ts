import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { isSupabaseConfigured, supabasePublishableKey, supabaseUrl } from "./env";

type CookieSet = { name: string; value: string; options?: CookieOptions };

export async function createClient() {
  const cookieStore = await cookies();

  if (!isSupabaseConfigured()) {
    return makeFakeServerClient(cookieStore);
  }

  return createServerClient(supabaseUrl()!, supabasePublishableKey()!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(toSet: CookieSet[]) {
        try {
          for (const c of toSet) cookieStore.set(c.name, c.value, c.options);
        } catch {
          // Called from a server component; safe to ignore.
        }
      },
    },
  });
}

type ServerCookieStore = Awaited<ReturnType<typeof cookies>>;

function makeFakeServerClient(cookieStore: ServerCookieStore) {
  const raw = cookieStore.get("splitko-demo-session")?.value ?? null;
  let session: unknown = null;
  if (raw) {
    try {
      session = JSON.parse(decodeURIComponent(raw));
    } catch {
      /* noop */
    }
  }
  const notConfigured = () =>
    Promise.resolve({
      data: { user: null, session: null },
      error: { message: "Supabase not configured" } as never,
    });
  return {
    auth: {
      getUser: () =>
        Promise.resolve({
          // @ts-expect-error narrowed by caller
          data: { user: (session?.user as unknown) ?? null },
          error: null,
        }),
      getSession: () =>
        Promise.resolve({ data: { session: session as never }, error: null }),
      signOut: () => Promise.resolve({ error: null }),
      signInWithPassword: notConfigured,
      signUp: notConfigured,
    },
  } as unknown as ReturnType<typeof createServerClient>;
}

export function supabaseConfigured(): boolean {
  return isSupabaseConfigured();
}
