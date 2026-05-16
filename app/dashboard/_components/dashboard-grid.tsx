"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import type { IntentId } from "@/lib/intents";
import { ease } from "@/lib/motion";
import { useIntent } from "./intent-context";
import TileBeaches, { type BeachData } from "./tile-beaches";
import TileWeather, { type WeatherData } from "./tile-weather";
import TileCivicQueue from "./tile-civic-queue";
import TileCivicReport from "./tile-civic-report";
import TileMarketplace from "./tile-marketplace";
import TileTransit from "./tile-transit";
import TileBureauChecklist from "./tile-bureaucracy-checklist";
import TileVoiceHandoff from "./tile-voice-handoff";
import TileFerry from "./tile-ferry";
import type { TilePhoto } from "./tile-shell";

type Props = {
  beaches: BeachData[];
  weather: WeatherData | null;
  weatherPhoto: TilePhoto | null;
  civicPhoto: TilePhoto | null;
  marketplacePhoto: TilePhoto | null;
};

type TileSpec = {
  id: string;
  // priority by intent — lower is earlier; -1 hides it
  priorityByIntent: Partial<Record<IntentId, number>>;
  defaultPriority: number;
  render: () => React.ReactNode;
  // 12-column grid; cols clamp to available width.
  span: { cols: number; rows: number };
};

export default function DashboardGrid({
  beaches,
  weather,
  weatherPhoto,
  civicPhoto,
  marketplacePhoto,
}: Props) {
  const { intent } = useIntent();

  const tiles: TileSpec[] = useMemo(
    () => [
      {
        id: "beaches",
        defaultPriority: 1,
        priorityByIntent: {
          beach: 0,
          transit: 4,
          parking: 4,
          ferry: 2,
        },
        // Hero tile: takes 8/12 cols and stretches tall.
        span: { cols: 8, rows: 2 },
        render: () => (
          <TileBeaches beaches={beaches} expanded={intent === "beach"} />
        ),
      },
      {
        id: "weather",
        defaultPriority: 2,
        priorityByIntent: {
          beach: 1,
          cultural: 1,
          ferry: 3,
        },
        span: { cols: 4, rows: 2 },
        render: () => <TileWeather weather={weather} photo={weatherPhoto} />,
      },
      {
        id: "civic-report",
        defaultPriority: 3,
        priorityByIntent: {
          "civic-report": 0,
          bureaucracy: 2,
        },
        span: { cols: 8, rows: 1 },
        render: () => <TileCivicReport photo={civicPhoto} />,
      },
      {
        id: "marketplace",
        defaultPriority: 4,
        priorityByIntent: {
          marketplace: 0,
        },
        span: { cols: 4, rows: 1 },
        render: () => (
          <TileMarketplace
            expanded={intent === "marketplace"}
            photo={marketplacePhoto}
          />
        ),
      },
      // Intent-driven tiles below — appear only when their intent is active.
      {
        id: "civic-queue",
        defaultPriority: 99,
        priorityByIntent: {
          "civic-report": 1,
        },
        span: { cols: 6, rows: 1 },
        render: () => <TileCivicQueue expanded={intent === "civic-report"} />,
      },
      {
        id: "transit",
        defaultPriority: 99,
        priorityByIntent: {
          transit: 0,
          parking: 1,
          ferry: 1,
        },
        span: { cols: 8, rows: 1 },
        render: () => <TileTransit highlight={intent} />,
      },
      {
        id: "bureaucracy-checklist",
        defaultPriority: 99,
        priorityByIntent: {
          bureaucracy: 1,
        },
        span: { cols: 8, rows: 1 },
        render: () => <TileBureauChecklist />,
      },
      {
        id: "voice",
        defaultPriority: 99,
        priorityByIntent: {
          "voice-handoff": 0,
        },
        span: { cols: 8, rows: 1 },
        render: () => <TileVoiceHandoff />,
      },
      {
        id: "ferry",
        defaultPriority: 99,
        priorityByIntent: {
          ferry: 0,
        },
        span: { cols: 8, rows: 1 },
        render: () => <TileFerry />,
      },
    ],
    [beaches, weather, intent, weatherPhoto, civicPhoto, marketplacePhoto],
  );

  const visible = useMemo(() => {
    return tiles
      .map((t) => ({
        ...t,
        active:
          (intent !== "default" && t.priorityByIntent[intent] !== undefined) ||
          t.defaultPriority < 50,
        priority: t.priorityByIntent[intent] ?? t.defaultPriority,
      }))
      .filter((t) => t.active)
      .sort((a, b) => a.priority - b.priority);
  }, [tiles, intent]);

  return (
    <motion.div
      layout
      className="grid grid-cols-1 gap-4 md:grid-cols-12 lg:auto-rows-[minmax(200px,auto)]"
      transition={{ duration: 0.45, ease: ease.outQuart }}
    >
      <AnimatePresence mode="popLayout">
        {visible.map((t) => (
          <motion.div
            layout
            key={t.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.45, ease: ease.outQuart }}
            style={{
              gridColumn: `span ${Math.min(t.span.cols, 12)} / span ${Math.min(t.span.cols, 12)}`,
              gridRow: `span ${t.span.rows} / span ${t.span.rows}`,
            }}
            className="min-h-[200px]"
          >
            {t.render()}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
