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

        <div className="relative mt-16">
          <div
            aria-hidden
            className="pointer-events-none absolute left-[21px] top-2 bottom-2 w-px sm:left-[27px]"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in oklch, var(--color-navy) 35%, transparent) 0%, color-mix(in oklch, var(--color-navy) 18%, transparent) 50%, color-mix(in oklch, var(--color-red) 35%, transparent) 100%)",
            }}
          />

          <ol className="space-y-20 sm:space-y-28">
            {hydrated.map((scene, i) => (
              <Scene
                key={scene.id}
                scene={scene}
                index={i}
                total={hydrated.length}
              />
            ))}
          </ol>
        </div>
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
        Each block alone would have lost Marina to indifference. Together, they
        are the operating system of her week.
      </div>
    </div>
  );
}

function Scene({
  scene,
  index,
  total,
}: {
  scene: Hydrated;
  index: number;
  total: number;
}) {
  const dotColor = BLOCK_DOT[scene.block];
  return (
    <MarinaSceneIn>
      <div className="relative pl-12 sm:pl-20">
        <div
          aria-hidden
          className="absolute left-0 top-1 flex h-11 w-11 items-center justify-center rounded-full sm:left-[6px] sm:h-[44px] sm:w-[44px]"
          style={{
            background: "var(--color-cream)",
            border: `2px solid ${dotColor}`,
            boxShadow:
              "0 6px 14px -8px color-mix(in oklch, var(--color-ink) 35%, transparent)",
          }}
        >
          <span
            aria-hidden
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: dotColor,
              boxShadow: `0 0 12px ${dotColor}`,
            }}
          />
        </div>

        <div className="grid gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] sm:gap-12">
          <div className="flex flex-col gap-5">
            <div
              className="mono-tag flex flex-wrap items-center gap-x-3 gap-y-1 text-[var(--color-ink-soft)]"
              aria-hidden
            >
              <span style={{ color: "var(--color-navy)", fontWeight: 600 }}>
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span
                aria-hidden
                className="h-3 w-px"
                style={{
                  background:
                    "color-mix(in oklch, var(--color-navy) 30%, transparent)",
                }}
              />
              <span>{scene.timeLabel}</span>
              <span
                aria-hidden
                className="h-3 w-px"
                style={{
                  background:
                    "color-mix(in oklch, var(--color-navy) 30%, transparent)",
                }}
              />
              <span style={{ color: dotColor, fontWeight: 600 }}>
                {BLOCK_LABEL[scene.block]}
              </span>
            </div>

            <h3
              className="display"
              style={{
                fontSize: "clamp(1.55rem, 0.5rem + 3vw, 2.6rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.018em",
              }}
            >
              {scene.title}
            </h3>

            <blockquote
              className="border-l-0 pl-0 text-[var(--color-navy)]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.05rem, 0.7rem + 0.9vw, 1.3rem)",
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
                      "linear-gradient(180deg, transparent 55%, color-mix(in oklch, var(--color-ink) 38%, transparent) 100%)",
                  }}
                />
              </div>
            )}

            <div className="pointer-events-none absolute -bottom-7 right-3 sm:-bottom-8 sm:right-6">
              <div
                style={{
                  background: "var(--color-cream)",
                  padding: 8,
                  borderRadius: 24,
                  boxShadow:
                    "0 22px 36px -22px color-mix(in oklch, var(--color-ink) 50%, transparent)",
                  border: `2px solid ${dotColor}`,
                }}
              >
                <Persona
                  character={scene.character}
                  size={150}
                  options={scene.options}
                  scene={scene.id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MarinaSceneIn>
  );
}
