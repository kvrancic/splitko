import { NextResponse } from "next/server";
import { getOrderedSplitBeaches } from "@/lib/izor";

export const revalidate = 86400;

export async function GET() {
  try {
    const beaches = await getOrderedSplitBeaches();
    return NextResponse.json(
      { beaches },
      {
        headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
      },
    );
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message, beaches: [] },
      { status: 502 },
    );
  }
}
