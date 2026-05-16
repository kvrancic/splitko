export type SplitkoProfile = {
  email: string;
  displayName: string;
  dob: string | null; // YYYY-MM-DD
  oib: string | null;
  kvart: string | null;
};

const KEY = "splitko-demo-session";

/** Compute age in whole years from a YYYY-MM-DD date string. */
export function ageFrom(dob: string | null): number | null {
  if (!dob) return null;
  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age -= 1;
  return age;
}

/** Browser-side fake session writer (used when Supabase is not configured). */
export function writeDemoSession(profile: SplitkoProfile): void {
  if (typeof window === "undefined") return;
  const session = {
    user: {
      id: `demo-${cyrb53(profile.email)}`,
      email: profile.email,
      profile,
    },
  };
  localStorage.setItem(KEY, JSON.stringify(session));
  // Mirror to a cookie so server-side / middleware can also read it.
  document.cookie = `${KEY}=${encodeURIComponent(
    JSON.stringify(session),
  )}; Path=/; Max-Age=2592000; SameSite=Lax`;
}

export function readDemoSession(): {
  user: { id: string; email: string; profile: SplitkoProfile };
} | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearDemoSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
  document.cookie = `${KEY}=; Path=/; Max-Age=0; SameSite=Lax`;
}

// fast string hash for a demo-stable user id
function cyrb53(str: string, seed = 0): string {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h2 = Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h1 ^= h2 >>> 16;
  h2 ^= h1 >>> 16;
  return (4294967296 * (2097151 & h2) + (h1 >>> 0))
    .toString(36)
    .slice(0, 8);
}
