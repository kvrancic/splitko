import Image from "next/image";
import Persona from "@/components/persona";
import { MARINA_DAY, type MarinaScene } from "@/content/marina-day";
import { findHeroPhoto } from "@/lib/pexels";
import MarinaSceneIn from "./marina-day.client";

type Hydrated = MarinaScene & {
  image: { src: string; alt: string; photographer: string } | null;
};

const BLOCK_LABEL: Record<MarinaScene["block"], string> = {
  dashboard: "Dashboard reconfigures",
  "civic-action": "Civic-action block fires",
  whatsapp: "WhatsApp surface answers",
  voice: "Voice agent picks up",
  marketplace: "Agentic marketplace matches",
  cultural: "Cultural calendar surfaces",
};

const BLOCK_DOT: Record<MarinaScene["block"], string> = {
  dashboard: "var(--color-teal)",
  "civic-action": "var(--color-red)",
  whatsapp: "oklch(0.55 0.13 145)",
  voice: "var(--color-amber-warn)",
  marketplace: "var(--color-red-soft)",
  cultural: "var(--color-navy-mist)",
};

export default async function MarinaDay() {
  const hydrated: Hydrated[] = await Promise.all(
    MARINA_DAY.map(async (s) => {
      const photo = await findHeroPhoto(s.imageQuery);
      return {
        ...s,
        image: photo
          ? {
              src: photo.src.large,
              alt: photo.alt || s.imageAlt,
              photographer: photo.photographer,
            }
          : null,
      };
    }),
  );

  return (
    <section
      id="marina"
      className="relative overflow-hidden"
      style={{ background: "var(--color-cream)", color: "var(--color-ink)" }}
    >
      <div className="mx-auto max-w-screen-xl px-5 py-24 sm:px-8 sm:py-32">
        <Header />

        <ol className="mt-16 space-y-24 sm:space-y-32">
          {hydrated.map((scene, i) => (
            <Scene
              key={scene.id}
              scene={scene}
              index={i}
              flip={i % 2 === 1}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Header() {
  return (
    <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
      <div>
        <div className="mono-tag flex items-center gap-3 text-[var(--color-navy-mist)]">
          <span
            aria-hidden
            className="block h-[1px] w-10"
            style={{ background: "var(--color-red)" }}
          />
          One day, six surfaces · 03
        </div>
        <h2
          className="display mt-5"
          style={{
            fontSize: "clamp(2.1rem, 0.7rem + 5.4vw, 4.6rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.022em",
          }}
        >
          Marina, 38, Lučac. Her husband Luka, her son Roko, her daughter Ana,
          her baka Anka in Mejaši, her brother in Toronto. One brain. One week.
        </h2>
      </div>
      <div className="max-w-[28ch] text-[var(--color-ink-soft)] body-lg">
        Each block alone would have lost Marina to indifference. Together,
        they are the operating system of her week.
      </div>
    </div>
  );
}

function Scene({
  scene,
  index,
  flip,
}: {
  scene: Hydrated;
  index: number;
  flip: boolean;
}) {
  return (
    <MarinaSceneIn>
      <div
        className={`grid gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] sm:gap-12 ${
          flip ? "sm:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="flex flex-col gap-5">
          <div
            className="mono-tag inline-flex items-center gap-2 text-[var(--color-ink-soft)]"
            aria-hidden
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: BLOCK_DOT[scene.block],
                boxShadow: `0 0 10px ${BLOCK_DOT[scene.block]}`,
                display: "inline-block",
              }}
            />
            {scene.timeLabel} · {BLOCK_LABEL[scene.block]}
          </div>

          <h3
            className="display"
            style={{
              fontSize: "clamp(1.65rem, 0.5rem + 3.6vw, 3rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.018em",
            }}
          >
            {scene.title}
          </h3>

          <blockquote
            className="border-l-0 pl-0 text-[var(--color-navy)]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.05rem, 0.7rem + 0.9vw, 1.35rem)",
              fontStyle: "italic",
              lineHeight: 1.4,
            }}
          >
            {scene.croatianQuote}
          </blockquote>

          <p className="body-lg max-w-[58ch] text-[var(--color-ink-soft)]">
            {scene.beat}
          </p>
        </div>

        <div className="relative">
          {scene.image && (
            <div className="relative overflow-hidden rounded-[20px]">
              <Image
                src={scene.image.src}
                alt={scene.image.alt}
                width={960}
                height={720}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="aspect-[5/4] w-full object-cover"
                style={{ filter: "saturate(1.03) contrast(1.03)" }}
              />
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, transparent 60%, color-mix(in oklch, var(--color-ink) 35%, transparent) 100%)",
                }}
              />
            </div>
          )}

          <div className="pointer-events-none absolute -bottom-6 right-2 sm:-bottom-8 sm:right-6">
            <Persona
              character={scene.character}
              size={180}
              options={scene.options}
              scene={scene.id}
              className="rounded-[24px] bg-[var(--color-cream-shadow)] p-2 shadow-[0_18px_30px_-15px_rgba(11,20,40,0.35)]"
            />
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="mt-12 h-px w-full bg-[var(--color-ink)]/10"
      />
      <div
        aria-hidden
        className="mt-2 mono-tag text-[var(--color-ink-soft)] opacity-60"
      >
        Scene {String(index + 1).padStart(2, "0")} / 06
      </div>
    </MarinaSceneIn>
  );
}
