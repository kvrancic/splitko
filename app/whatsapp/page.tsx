import { findHeroPhoto } from "@/lib/pexels";
import { buildScripts } from "@/content/whatsapp-scripts";
import WhatsappView from "./whatsapp-view";

export const metadata = { title: "WhatsApp · Splitko" };
export const revalidate = 3600;

export default async function WhatsappPage() {
  const photo = await findHeroPhoto([
    "pothole road damage",
    "broken pavement street",
    "road street damage",
    "cracked asphalt",
  ]);

  const civicImage = photo
    ? { src: photo.src.medium, alt: photo.alt || "road damage photo" }
    : null;

  const scripts = buildScripts({ civicImage });

  return <WhatsappView scripts={scripts} />;
}
