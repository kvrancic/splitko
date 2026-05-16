"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { IntentId } from "@/lib/intents";

type IntentCtx = {
  intent: IntentId;
  setIntent: (id: IntentId) => void;
};

type ChatVisibilityCtx = {
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
};

const IntentCtx = createContext<IntentCtx>({
  intent: "default",
  setIntent: () => {},
});

const ChatCtx = createContext<ChatVisibilityCtx>({
  chatOpen: true,
  setChatOpen: () => {},
});

const STORAGE_KEY = "splitko.chatOpen";

export function IntentProvider({ children }: { children: React.ReactNode }) {
  const [intent, setIntent] = useState<IntentId>("default");
  const [chatOpen, setChatOpenState] = useState<boolean>(true);

  // Hydrate the chat preference from localStorage after mount to avoid SSR mismatch.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored !== null) setChatOpenState(stored === "1");
    } catch {
      // ignore — Safari private mode etc.
    }
  }, []);

  const setChatOpen = useCallback((next: boolean) => {
    setChatOpenState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
    } catch {
      // ignore
    }
  }, []);

  const intentValue = useMemo(() => ({ intent, setIntent }), [intent]);
  const chatValue = useMemo(
    () => ({ chatOpen, setChatOpen }),
    [chatOpen, setChatOpen],
  );

  return (
    <IntentCtx.Provider value={intentValue}>
      <ChatCtx.Provider value={chatValue}>{children}</ChatCtx.Provider>
    </IntentCtx.Provider>
  );
}

export function useIntent() {
  return useContext(IntentCtx);
}

export function useChatVisibility() {
  return useContext(ChatCtx);
}
