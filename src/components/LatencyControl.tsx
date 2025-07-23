"use client";

import React from "react";

type Props = {
  mode: "realtime" | "historical";
  onChange: (mode: "realtime" | "historical") => void;
  lineType: "arc" | "straight";
  onLineTypeChange: (lineType: "arc" | "straight") => void;
};

const LatencyControl = ({
  mode,
  onChange,
  lineType,
  onLineTypeChange,
}: Props) => {
  return (
    <div style={{ position: "absolute", top: 20, left: 20, zIndex: 10 }}>
      <div style={{ marginBottom: 8 }}>
        <label style={{ color: "white", marginRight: 8 }}>Latency Mode:</label>
        <select value={mode} onChange={(e) => onChange(e.target.value as any)}>
          <option value="realtime">Realtime</option>
          <option value="historical">Historical</option>
        </select>
      </div>
      <div>
        <label style={{ color: "white", marginRight: 8 }}>Line Type:</label>
        <select
          value={lineType}
          onChange={(e) => onLineTypeChange(e.target.value as any)}
        >
          <option value="arc">Arc</option>
          <option value="straight">Straight</option>
        </select>
      </div>
    </div>
  );
};

export default LatencyControl;
