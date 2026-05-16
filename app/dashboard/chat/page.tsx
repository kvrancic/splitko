import ChatView from "./chat-view";

export const metadata = { title: "Chat · Splitko" };

const TOOLS = [
  {
    id: "dhmz",
    name: "DHMZ",
    desc: "Live observations from every Croatian station, sea + UV.",
    badge: "REAL",
  },
  {
    id: "izor",
    name: "IZOR",
    desc: "Public sea-quality samples for ~7,000 Adriatic locations.",
    badge: "REAL",
  },
  {
    id: "promet-bus",
    name: "Promet Buses",
    desc: "Live vehicle positions + crowdsourced load taps.",
    badge: "mock",
  },
  {
    id: "promet-park",
    name: "Promet Parking",
    desc: "Per-bay sensor grid, dynamic pricing readout.",
    badge: "mock",
  },
  {
    id: "vision",
    name: "Webcam Vision",
    desc: "Crowd density + smoke detection from public webcams.",
    badge: "mock",
  },
  {
    id: "egradani",
    name: "e-Građani RAG",
    desc: "Read-only retrieval over gov.hr and katalog službi.",
    badge: "mock",
  },
  {
    id: "statute",
    name: "City Statute",
    desc: "Statute of the City of Split, with citations.",
    badge: "mock",
  },
  {
    id: "gup",
    name: "GUP",
    desc: "Urbanistički plan extracts per address.",
    badge: "mock",
  },
  {
    id: "calendar",
    name: "Cultural Calendar",
    desc: "Klape, Hajduk, parish, market, festival schedule.",
    badge: "mock",
  },
  {
    id: "kbc",
    name: "KBC Public Queue",
    desc: "Estimated waits + scheduling support.",
    badge: "mock",
  },
  {
    id: "marketplace",
    name: "Marketplace",
    desc: "Agent-to-agent matching, sublets first.",
    badge: "mock",
  },
  {
    id: "router",
    name: "Civic Action Router",
    desc: "Classifies citizen reports, routes them to the right office.",
    badge: "mock",
  },
];

export default function ChatPage() {
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
        <div className="mono-tag text-[var(--color-ink-soft)]">Tools & ports</div>
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
              <div className="flex items-center justify-between">
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                  }}
                >
                  {t.name}
                </div>
                <span
                  className="mono-tag rounded-full px-1.5 py-0.5"
                  style={{
                    background:
                      t.badge === "REAL"
                        ? "var(--color-red)"
                        : "color-mix(in oklch, var(--color-ink) 12%, transparent)",
                    color:
                      t.badge === "REAL"
                        ? "var(--color-cream)"
                        : "var(--color-ink-soft)",
                    fontSize: "0.55rem",
                  }}
                >
                  {t.badge}
                </span>
              </div>
              <p className="mt-1 text-[11.5px] text-[var(--color-ink-soft)] leading-snug">
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
        <ChatView />
      </main>
    </div>
  );
}
