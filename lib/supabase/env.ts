/**
 * Single source of truth for the Supabase env-var lookup.
 *
 * Supabase introduced new key names in September 2024
 * (`sb_publishable_*` + `sb_secret_*`), but the older
 * `NEXT_PUBLIC_SUPABASE_ANON_KEY` + `SUPABASE_SERVICE_ROLE_KEY` names
 * still work and many existing projects still use them. The accessors
 * here accept either pair.
 *
 * Discussion: https://github.com/orgs/supabase/discussions/29260
 */

export function supabaseUrl(): string | undefined {
  return process.env.NEXT_PUBLIC_SUPABASE_URL;
}

export function supabasePublishableKey(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

/** Server-only. Never import from a client component. Bypasses RLS. */
export function supabaseSecretKey(): string | undefined {
  return (
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export function isSupabaseConfigured(): boolean {
  const url = supabaseUrl();
  if (!url || /YOUR-PROJECT-REF/i.test(url)) return false;
  return Boolean(supabasePublishableKey());
}
