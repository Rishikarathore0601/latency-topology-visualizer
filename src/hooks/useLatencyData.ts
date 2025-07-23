import { useEffect, useState } from "react";

interface LatencyEntry {
  region: string;
  latency: number;
}

const REGIONS = [
  "us-east-1",
  "us-west-2",
  "eu-west-1",
  "ap-south-1",
  "ap-northeast-1",
  "sa-east-1",
  "ca-central-1",
  "me-south-1",
];

export function useLatencyData() {
  const [data, setData] = useState<LatencyEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const simulate = () => {
      const result = REGIONS.map((region) => ({
        region,
        latency: Math.floor(Math.random() * 200 + 40),
      }));
      setData(result);
      setLoading(false);
    };

    simulate();
    const interval = setInterval(simulate, 10000);

    return () => clearInterval(interval);
  }, []);

  return { data, loading };
}
