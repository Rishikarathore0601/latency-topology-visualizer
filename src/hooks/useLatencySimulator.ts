import { useEffect, useState } from "react";

type Exchange = {
  name: string;
  lat: number;
  lon: number;
};

type Connection = {
  from: string;
  to: string;
  latency: number;
};

export const useLatencySimulator = (
  exchanges: Exchange[],
  mode: "realtime" | "historical"
): Connection[] => {
  const [latencies, setLatencies] = useState<Connection[]>([]);

  useEffect(() => {
    const updateLatencies = () => {
      const newLatencies: Connection[] = [];

      for (let i = 0; i < exchanges.length; i++) {
        for (let j = i + 1; j < exchanges.length; j++) {
          const latency =
            mode === "realtime" ? Math.floor(Math.random() * 100) + 20 : 50; // fixed latency for historical

          newLatencies.push({
            from: exchanges[i].name,
            to: exchanges[j].name,
            latency,
          });
        }
      }

      setLatencies(newLatencies);
    };

    updateLatencies();

    if (mode === "realtime") {
      const interval = setInterval(updateLatencies, 2000);
      return () => clearInterval(interval);
    }
  }, [exchanges, mode]);

  return latencies;
};
