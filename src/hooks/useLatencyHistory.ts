import { useEffect, useRef, useState } from "react";
import { Exchange } from "../types";

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
): HistoryMap => {
  const [history, setHistory] = useState<HistoryMap>({});
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (mode !== "realtime") return;

    const updateHistory = () => {
      const now = Date.now();

      setHistory((prevHistory) => {
        const newHistory: HistoryMap = { ...prevHistory };

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

        return newHistory;
      });
    };

    intervalRef.current = setInterval(updateHistory, 2000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [mode, exchanges]);

  return history;
};
