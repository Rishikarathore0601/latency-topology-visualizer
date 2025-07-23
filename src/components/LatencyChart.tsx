// components/LatencyChart.tsx
"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type LatencyPoint = {
  timestamp: number;
  value: number;
};

interface Props {
  data: LatencyPoint[];
  from: string;
  to: string;
}

const LatencyChart: React.FC<Props> = ({ data, from, to }) => {
  const formattedData = data.map((d) => ({
    ...d,
    time: new Date(d.timestamp).toLocaleTimeString(),
  }));

  return (
    <div style={{ height: 300, width: "100%", padding: "1rem" }}>
      <h3>
        Latency History: {from} → {to}
      </h3>
      <ResponsiveContainer>
        <LineChart data={formattedData}>
          <XAxis dataKey="time" />
          <YAxis domain={[0, 300]} />
          <Tooltip />
          <CartesianGrid stroke="#ccc" />
          <Line type="monotone" dataKey="value" stroke="#3B82F6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LatencyChart;
