import { NextResponse } from "next/server";
import { detectIntent } from "@/lib/intents";
import { getSplitObservation } from "@/lib/dhmz";
import { getOrderedSplitBeaches } from "@/lib/izor";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { text?: string };
  const text = body.text ?? "";
  const intent = detectIntent(text);

  // For real intents that read DHMZ/IZOR, fire them so the demo
  // can show real timestamps under the animated tool-call rows.
  const realResults: Record<string, unknown> = {};
  for (const tc of intent.toolCalls) {
    if (tc.real === "dhmz") {
      realResults[tc.name] = await getSplitObservation().catch(() => null);
    } else if (tc.real === "izor") {
      realResults[tc.name] = (await getOrderedSplitBeaches().catch(() => []))
        .slice(0, 3)
        .map((b) => ({ name: b.lpla, rating: b.locj, year: b.lkad }));
    }
  }

  // Fill the {temp}, {wind} placeholders in the answer if dhmz data is present.
  let answer = intent.answer;
  const dhmz = (realResults.getCurrentWeather ??
    realResults.getWeather) as
    | { tempC: number | null; windSpeed: number | null; windDir: string | null }
    | null;
  if (dhmz) {
    answer = answer
      .replace("{temp}", dhmz.tempC?.toFixed(1) ?? "—")
      .replace("{wind}", dhmz.windSpeed?.toFixed(1) ?? "—")
      .replace("{windDir}", dhmz.windDir ?? "—");
  } else {
    answer = answer
      .replace("{temp}", "—")
      .replace("{wind}", "—")
      .replace("{windDir}", "—");
  }

  return NextResponse.json({
    intent: intent.id,
    answer,
    toolCalls: intent.toolCalls,
    citations: intent.citations,
    realResults,
  });
}
