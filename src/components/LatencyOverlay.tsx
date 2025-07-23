"use client";

import React from "react";

type Props = {
  latencies: {
    from: string;
    to: string;
    latency: number;
  }[];
};

const LatencyOverlay = ({ latencies }: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 20,
        left: 20,
        background: "rgba(0, 0, 0, 0.7)",
        color: "white",
        padding: "12px 16px",
        borderRadius: "10px",
        fontSize: "13px",
        maxHeight: "200px",
        overflowY: "auto",
        zIndex: 10,
      }}
    >
      <strong>Live Latencies</strong>
      <ul style={{ marginTop: 8, paddingLeft: 16 }}>
        {latencies.map((l, idx) => (
          <li key={idx}>
            {l.from} ➝ {l.to}: <strong>{l.latency.toFixed(0)}ms</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatencyOverlay;
