import Image from "next/image";
import { findHeroPhoto } from "@/lib/pexels";
import HeroMotion from "./hero.motion";

export default async function Hero() {
  const photo = await findHeroPhoto([
    "split croatia riva waterfront sunset",
    "split croatia old town aerial",
    "split croatia palm riva",
  ]);

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 80% at 20% 10%, oklch(0.27 0.07 257) 0%, oklch(0.18 0.075 257) 60%, oklch(0.135 0.065 257) 100%)",
        color: "var(--color-cream)",
      }}
    >
      {photo && (
        <Image
          src={photo.src.large2x}
          alt={photo.alt || "Split, Croatia waterfront at dusk"}
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center 65%",
            opacity: 0.36,
            mixBlendMode: "luminosity",
          }}
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, color-mix(in oklch, var(--color-navy) 80%, transparent) 60%, var(--color-navy) 100%)",
        }}
      />

      <HeroMotion />

      {photo && (
        <div
          className="absolute bottom-3 left-4 z-10 text-[10px] uppercase tracking-[0.16em] opacity-50 sm:left-8"
          aria-hidden
        >
          photo · {photo.photographer} · pexels
        </div>
      )}
    </section>
  );
}
