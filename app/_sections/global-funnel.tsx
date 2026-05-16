import { FUNNEL } from "@/content/funnel";
import { findHeroPhoto } from "@/lib/pexels";
import FunnelClient from "./global-funnel.client";

export default async function GlobalFunnel() {
  const panels = await Promise.all(
    FUNNEL.map(async (p) => {
      const photo = await findHeroPhoto(p.imageQuery, "landscape");
      return {
        ...p,
        image: photo
          ? {
              src: photo.src.large2x,
              alt: photo.alt || `${p.city} street scene`,
              photographer: photo.photographer,
            }
          : null,
      };
    }),
  );

  return <FunnelClient panels={panels} />;
}
