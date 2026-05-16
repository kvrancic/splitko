"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import type { IntentId } from "@/lib/intents";
import { ease } from "@/lib/motion";
import { useIntent } from "./intent-context";
import TileBeaches, { type BeachData } from "./tile-beaches";
import TileWeather, { type WeatherData } from "./tile-weather";
import TileCivicQueue from "./tile-civic-queue";
import TileTonight from "./tile-tonight";
import TileBureaucracy from "./tile-bureaucracy";
import TileMarketplace from "./tile-marketplace";
import TileTransit from "./tile-transit";
import TileBureauChecklist from "./tile-bureaucracy-checklist";
import TileVoiceHandoff from "./tile-voice-handoff";
import TileFerry from "./tile-ferry";

type Props = {
  beaches: BeachData[];
  weather: WeatherData | null;
};

type TileSpec = {
  id: string;
  // priority by intent — lower is earlier; -1 hides it
  priorityByIntent: Partial<Record<IntentId, number>>;
  defaultPriority: number;
  render: () => React.ReactNode;
  span: { cols: number; rows: number };
};

export default function DashboardGrid({ beaches, weather }: Props) {
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
        span: { cols: 2, rows: 2 },
        render: () => <TileBeaches beaches={beaches} expanded={intent === "beach"} />,
      },
      {
        id: "weather",
        defaultPriority: 2,
        priorityByIntent: {
          beach: 1,
          cultural: 1,
          ferry: 3,
        },
        span: { cols: 1, rows: 2 },
        render: () => <TileWeather weather={weather} />,
      },
      {
        id: "transit",
        defaultPriority: 8,
        priorityByIntent: {
          transit: 0,
          parking: 1,
          ferry: 1,
          beach: 5,
        },
        span: { cols: 2, rows: 1 },
        render: () => <TileTransit highlight={intent} />,
      },
      {
        id: "civic-queue",
        defaultPriority: 3,
        priorityByIntent: {
          "civic-report": 0,
        },
        span: { cols: 1, rows: 1 },
        render: () => <TileCivicQueue expanded={intent === "civic-report"} />,
      },
      {
        id: "tonight",
        defaultPriority: 5,
        priorityByIntent: {
          cultural: 0,
        },
        span: { cols: 1, rows: 1 },
        render: () => <TileTonight expanded={intent === "cultural"} />,
      },
      {
        id: "bureaucracy",
        defaultPriority: 6,
        priorityByIntent: {
          bureaucracy: 0,
        },
        span: { cols: 2, rows: 1 },
        render: () => <TileBureaucracy />,
      },
      {
        id: "bureaucracy-checklist",
        defaultPriority: 99,
        priorityByIntent: {
          bureaucracy: 1,
        },
        span: { cols: 2, rows: 1 },
        render: () => <TileBureauChecklist />,
      },
      {
        id: "marketplace",
        defaultPriority: 7,
        priorityByIntent: {
          marketplace: 0,
        },
        span: { cols: 1, rows: 1 },
        render: () => <TileMarketplace expanded={intent === "marketplace"} />,
      },
      {
        id: "voice",
        defaultPriority: 99,
        priorityByIntent: {
          "voice-handoff": 0,
        },
        span: { cols: 2, rows: 1 },
        render: () => <TileVoiceHandoff />,
      },
      {
        id: "ferry",
        defaultPriority: 99,
        priorityByIntent: {
          ferry: 0,
        },
        span: { cols: 2, rows: 1 },
        render: () => <TileFerry />,
      },
    ],
    [beaches, weather, intent],
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
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:auto-rows-[minmax(160px,auto)]"
      transition={{ duration: 0.45, ease: ease.outQuart }}
    >
      <AnimatePresence mode="popLayout">
        {visible.map((t) => (
          <motion.div
            layout
            key={t.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.45, ease: ease.outQuart }}
            style={{
              gridColumn: `span ${Math.min(t.span.cols, 4)} / span ${Math.min(t.span.cols, 4)}`,
              gridRow: `span ${t.span.rows} / span ${t.span.rows}`,
            }}
            className="min-h-[160px]"
          >
            {t.render()}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
