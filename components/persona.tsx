import {
  dicebearUrl,
  fetchDicebearSvg,
  type Character,
  type DicebearOptions,
} from "@/lib/dicebear";

type PersonaProps = {
  character: Character;
  scene?: string;
  size?: number;
  className?: string;
  options?: DicebearOptions;
  label?: string;
};

/**
 * Renders a consistent character across scenes by inlining a DiceBear v9 SVG
 * server-side. Use `options` to override clothing color, expression, etc.,
 * while the seed stays locked per character.
 */
export default async function Persona({
  character,
  size = 160,
  className,
  options = {},
  label,
  scene,
}: PersonaProps) {
  const url = dicebearUrl(character, options);
  const svg = await fetchDicebearSvg(url);
  return (
    <div
      className={className}
      style={{ width: size, height: size }}
      aria-label={label ?? `${character} illustration${scene ? `, ${scene}` : ""}`}
      role="img"
    >
      {svg ? (
        <div
          style={{ width: "100%", height: "100%" }}
          // SVG comes from a trusted, well-known API — DiceBear v9 over HTTPS.
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <PersonaFallback character={character} />
      )}
    </div>
  );
}

function PersonaFallback({ character }: { character: Character }) {
  const initial = character[0]?.toUpperCase() ?? "•";
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "var(--color-navy-soft)",
        color: "var(--color-cream)",
        display: "grid",
        placeItems: "center",
        borderRadius: 12,
        fontFamily: "var(--font-display)",
        fontSize: "2.4rem",
      }}
    >
      {initial}
    </div>
  );
}
