import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

type CookieSet = { name: string; value: string; options?: CookieOptions };

export async function createClient() {
  const cookieStore = await cookies();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    // The server-side fake mirrors the browser fake's surface.
    return makeFakeServerClient(cookieStore);
  }

  return createServerClient(url, anon, {
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
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
