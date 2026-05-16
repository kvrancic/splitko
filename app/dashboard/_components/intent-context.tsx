"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { IntentId } from "@/lib/intents";

type IntentCtx = {
  intent: IntentId;
  setIntent: (id: IntentId) => void;
};

const Ctx = createContext<IntentCtx>({
  intent: "default",
  setIntent: () => {},
});

export function IntentProvider({ children }: { children: React.ReactNode }) {
  const [intent, setIntent] = useState<IntentId>("default");
  const value = useMemo(() => ({ intent, setIntent }), [intent]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useIntent() {
  return useContext(Ctx);
}
