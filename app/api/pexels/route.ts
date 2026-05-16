import { NextResponse } from "next/server";
import { searchPexels } from "@/lib/pexels";

export const revalidate = 86400;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") ?? "split croatia waterfront";
  const perPage = Math.min(Number(searchParams.get("per") ?? 6), 12);
  const orientation =
    (searchParams.get("o") as "landscape" | "portrait" | "square" | null) ??
    "landscape";

  const photos = await searchPexels(query, perPage, orientation);
  return NextResponse.json(
    { photos },
    {
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
    },
  );
}
