"use client";

import React from "react";

const LatencyLegend = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        left: 20,
        background: "rgba(0, 0, 0, 0.6)",
        padding: "10px 14px",
        borderRadius: "8px",
        color: "white",
        fontSize: "14px",
        lineHeight: "1.5",
        zIndex: 10,
        marginTop: "100px",
      }}
    >
      <strong>Latency Legend</strong>
      <div style={{ marginTop: 6 }}>
        <div style={{ color: "#00ff00" }}>🟢 &lt; 100ms (Fast)</div>
        <div style={{ color: "#ffff00" }}>🟡 100–200ms (Moderate)</div>
        <div style={{ color: "#ff0000" }}>🔴 &gt; 200ms (Slow)</div>
      </div>
    </div>
  );
};

export default LatencyLegend;
