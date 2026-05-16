import { dicebearUrl, type Character, type DicebearOptions } from "@/lib/dicebear";

type PersonaProps = {
  character: Character;
  scene?: string;
  size?: number;
  className?: string;
  options?: DicebearOptions;
  label?: string;
};

/**
 * Renders a consistent character across scenes via DiceBear v9 SVG over HTTPS.
 * Safe in both server and client components — it's just an <img>.
 * Seed is locked per character so the same person appears in every scene.
 */
export default function Persona({
  character,
  size = 160,
  className,
  options = {},
  label,
  scene,
}: PersonaProps) {
  const url = dicebearUrl(character, options);
  return (
    <div
      className={className}
      style={{ width: size, height: size }}
      role="img"
      aria-label={label ?? `${character} illustration${scene ? `, ${scene}` : ""}`}
    >
      <img
        src={url}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}
