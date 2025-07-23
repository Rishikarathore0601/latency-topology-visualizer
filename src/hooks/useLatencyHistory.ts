// hooks/useLatencyHistory.ts
import { useEffect, useRef, useState } from "react";
import { Exchange } from "../types"; // Adjust relative path based on location

type LatencyPoint = {
  timestamp: number;
  value: number;
};

type HistoryMap = {
  [key: string]: LatencyPoint[];
};

export const useLatencyHistory = (
  exchanges: Exchange[],
  mode: "realtime" | "historical"
) => {
  const [history, setHistory] = useState<HistoryMap>({});
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (mode !== "realtime") return;

    const updateHistory = () => {
      const newHistory: HistoryMap = { ...history };
      const now = Date.now();

      exchanges.forEach((from) => {
        exchanges.forEach((to) => {
          if (from.id !== to.id) {
            const key = `${from.id}-${to.id}`;
            const latency = Math.floor(Math.random() * 200 + 20); // Simulated latency
            if (!newHistory[key]) newHistory[key] = [];
            newHistory[key].push({ timestamp: now, value: latency });

            // Keep only last 30 data points
            if (newHistory[key].length > 30) {
              newHistory[key].shift();
            }
          }
        });
      });

      setHistory({ ...newHistory });
    };

    intervalRef.current = setInterval(updateHistory, 2000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [mode, exchanges]);

  return history;
};
