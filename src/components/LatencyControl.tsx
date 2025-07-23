"use client";

import React from "react";

type Mode = "realtime" | "historical";
type LineType = "arc" | "straight";

type Props = {
  mode: Mode;
  onChange: (mode: Mode) => void;
  lineType: LineType;
  onLineTypeChange: (lineType: LineType) => void;
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
        <label style={{ color: "blue", marginRight: 8 }} htmlFor="latencyMode">
          Latency Mode:
        </label>
        <select
          id="latencyMode"
          value={mode}
          onChange={(e) => onChange(e.target.value as Mode)}
        >
          <option value="realtime">Realtime</option>
          <option value="historical">Historical</option>
        </select>
      </div>
      <div>
        <label style={{ color: "blue", marginRight: 8 }} htmlFor="lineType">
          Line Type:
        </label>
        <select
          id="lineType"
          value={lineType}
          onChange={(e) => onLineTypeChange(e.target.value as LineType)}
        >
          <option value="arc">Arc</option>
          <option value="straight">Straight</option>
        </select>
      </div>
    </div>
  );
};

export default LatencyControl;
