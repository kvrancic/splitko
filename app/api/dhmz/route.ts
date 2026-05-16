import { NextResponse } from "next/server";
import { getCurrentObservations, getSplitObservation } from "@/lib/dhmz";

export const revalidate = 300;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const view = searchParams.get("view") ?? "split";
  try {
    if (view === "all") {
      const data = await getCurrentObservations();
      return NextResponse.json(data, {
        headers: { "Cache-Control": "public, max-age=60, s-maxage=300" },
      });
    }
    const split = await getSplitObservation();
    return NextResponse.json(
      { station: split },
      {
        headers: { "Cache-Control": "public, max-age=60, s-maxage=300" },
      },
    );
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message, station: null },
      { status: 502 },
    );
  }
}
