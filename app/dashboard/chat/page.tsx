import { findHeroPhoto } from "@/lib/pexels";
import ChatView from "./chat-view";

export const metadata = { title: "Chat · Splitko" };

const TOOLS = [
  {
    id: "weather",
    name: "Weather",
    desc: "Live temperature, wind, sea conditions from DHMZ.",
  },
  {
    id: "sea-quality",
    name: "Sea quality",
    desc: "Public IZOR rating for every Adriatic beach.",
  },
  {
    id: "buses",
    name: "Buses",
    desc: "Where the bus is now, and when it reaches your stop.",
  },
  {
    id: "parking",
    name: "Parking",
    desc: "Which lots have free bays, and what they cost right now.",
  },
  {
    id: "ferries",
    name: "Ferries",
    desc: "Jadrolinija departures to Brač, Hvar, Šolta.",
  },
  {
    id: "events",
    name: "Tonight in Split",
    desc: "Concerts, markets, Hajduk match, kid-friendly things.",
  },
  {
    id: "bureaucracy",
    name: "Bureaucracy help",
    desc: "Plain-language steps for obrt, prijava, vehicle papers.",
  },
  {
    id: "civic",
    name: "Report something",
    desc: "Photo of a problem in the city — Splitko routes it.",
  },
  {
    id: "marketplace",
    name: "Marketplace",
    desc: "Match with a tenant, a sublet, or a buyer near you.",
  },
  {
    id: "kbc",
    name: "Call a human",
    desc: "Place a call to KBC, MUP, your library, brief them first.",
  },
];

export const revalidate = 3600;

export default async function ChatPage() {
  const heroPhoto = await findHeroPhoto([
    "split croatia waterfront sunset",
    "split croatia old town",
    "dalmatia coast",
  ]);

  return (
    <div className="mx-auto grid max-w-screen-2xl gap-4 px-4 py-4 lg:grid-cols-[260px_1fr] lg:px-6 lg:py-6">
      <aside
        className="hidden h-[calc(100dvh-90px)] overflow-y-auto rounded-2xl p-4 lg:block no-scrollbar"
        style={{
          background: "var(--color-cream-shadow)",
          border:
            "1px solid color-mix(in oklch, var(--color-ink) 8%, transparent)",
        }}
      >
        <div className="mono-tag text-[var(--color-ink-soft)]">
          What I can do
        </div>
        <ul className="mt-3 space-y-1.5">
          {TOOLS.map((t) => (
            <li
              key={t.id}
              className="rounded-lg bg-[var(--color-cream)] p-3"
              style={{
                border:
                  "1px solid color-mix(in oklch, var(--color-ink) 6%, transparent)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                }}
              >
                {t.name}
              </div>
              <p className="mt-1 text-[12px] text-[var(--color-ink-soft)] leading-snug">
                {t.desc}
              </p>
            </li>
          ))}
        </ul>
      </aside>

      <main
        className="overflow-hidden rounded-2xl"
        style={{
          background: "var(--color-cream)",
          border:
            "1px solid color-mix(in oklch, var(--color-ink) 10%, transparent)",
          height: "calc(100dvh - 90px)",
        }}
      >
        <ChatView
          heroPhoto={
            heroPhoto
              ? { src: heroPhoto.src.large, alt: heroPhoto.alt || "Split" }
              : null
          }
        />
      </main>
    </div>
  );
}
