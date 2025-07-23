"use client";

import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture, Stars } from "@react-three/drei";
import { ExchangeMarker } from "./ExchangeMarker";
import { ConnectionLine } from "./ConnectionLine";
import { useLatencyHistory } from "../hooks/useLatencyHistory";
import LatencyControl from "./LatencyControl";
import LatencyChart from "./LatencyChart";
import LatencyLegend from "./LatencyLegend";
import LatencyOverlay from "./LatencyOverlay";
import ThemeToggle from "./ThemeToggle";
import { latLonToVector3 } from "@/utils/convertLatLngToVector3";
import { useLatencyData } from "@/hooks/useLatencyData";

interface Exchange {
  id: string;
  name: string;
  lat: number;
  lon: number;
  location: string;
  provider: "AWS" | "Azure" | "GCP";
}

const Earth = () => {
  const texture = useTexture("/earth.jpg");
  return (
    <mesh>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const exchanges: Exchange[] = [
  {
    id: "1",
    name: "Coinbase SF",
    lat: 37.7749,
    lon: -122.4194,
    location: "San Francisco, USA",
    provider: "AWS",
  },
  {
    id: "2",
    name: "London Stock Exchange",
    lat: 51.5074,
    lon: -0.1278,
    location: "London, UK",
    provider: "Azure",
  },
  {
    id: "3",
    name: "Tokyo Exchange",
    lat: 35.6895,
    lon: 139.6917,
    location: "Tokyo, Japan",
    provider: "GCP",
  },
];

const awsRegionToExchange: Record<string, string> = {
  "us-east-1": "Coinbase SF",
  "eu-west-2": "London Stock Exchange",
  "ap-northeast-1": "Tokyo Exchange",
};

const Globe = () => {
  const [mode, setMode] = useState<"realtime" | "historical">("realtime");
  const [lineType, setLineType] = useState<"arc" | "straight">("arc");
  const [selectedExchange, setSelectedExchange] = useState<Exchange | null>(
    null
  );
  const [selectedPair, setSelectedPair] = useState<{
    from: string;
    to: string;
  } | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const { data: latencyData, loading } = useLatencyData();
  const history = useLatencyHistory(exchanges, mode);

  const latencies =
    (latencyData
      ?.map(({ region, latency }) => {
        const from = awsRegionToExchange[region];
        const to = "London Stock Exchange";
        if (!from || !to) return null;
        return { from, to, latency };
      })
      .filter(Boolean) as { from: string; to: string; latency: number }[]) ||
    [];

  return (
    <div
      style={{
        height: "100dvh",
        width: "100%",
        backgroundColor: darkMode ? "#000" : "#f0f0f0",
        color: darkMode ? "#fff" : "#000",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <LatencyControl
        mode={mode}
        onChange={setMode}
        lineType={lineType}
        onLineTypeChange={setLineType}
      />
      <LatencyLegend />
      <LatencyOverlay latencies={latencies} />

      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            color: "#fff",
            fontSize: "clamp(14px, 2vw, 18px)",
            padding: "0.5rem 1rem",
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: "8px",
          }}
        >
          Loading real-time latency data...
        </div>
      )}

      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 50 }}
        style={{ background: darkMode ? "#000" : "#e0e0e0" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <pointLight position={[0, 0, 5]} intensity={0.8} />
        <Stars radius={80} depth={30} count={3000} factor={2} fade />
        <OrbitControls />

        <Suspense fallback={null}>
          <Earth />

          {exchanges.map((ex) => (
            <ExchangeMarker
              key={ex.id}
              position={latLonToVector3(ex.lat, ex.lon, 1.01)}
              name={ex.name}
              latency={
                latencies.find((l) => l.from === ex.name || l.to === ex.name)
                  ?.latency || 100
              }
              location={ex.location}
              provider={ex.provider}
              onClick={() => setSelectedExchange(ex)}
            />
          ))}

          {latencies.map(({ from, to, latency }, index) => {
            const fromExchange = exchanges.find((ex) => ex.name === from);
            const toExchange = exchanges.find((ex) => ex.name === to);
            if (!fromExchange || !toExchange) return null;

            return (
              <ConnectionLine
                key={index}
                from={fromExchange}
                to={toExchange}
                latency={latency}
                onClick={() =>
                  setSelectedPair({ from: fromExchange.id, to: toExchange.id })
                }
              />
            );
          })}
        </Suspense>
      </Canvas>

      {/* 📦 Provider Legend */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: "2%",
          background: darkMode ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.8)",
          padding: "0.75rem",
          borderRadius: "8px",
          fontSize: "clamp(12px, 1vw, 14px)",
          width: "fit-content",
          maxWidth: "90%",
        }}
      >
        <strong>Cloud Providers</strong>
        <ul style={{ marginTop: "0.5rem", paddingLeft: "1rem" }}>
          <li style={{ color: "orange" }}>● AWS</li>
          <li style={{ color: "skyblue" }}>● Azure</li>
          <li style={{ color: "lime" }}>● GCP</li>
        </ul>
      </div>

      {/* 📈 Latency Chart Overlay */}
      {selectedPair && (
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            left: "5%",
            width: "min(90vw, 420px)",
            height: "min(60vh, 280px)",
            backgroundColor: darkMode ? "#000000cc" : "#ffffffcc",
            color: darkMode ? "#fff" : "#000",
            borderRadius: "12px",
            padding: "1rem",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            overflow: "auto",
          }}
        >
          <LatencyChart
            from={selectedPair.from}
            to={selectedPair.to}
            data={history[`${selectedPair.from}-${selectedPair.to}`] || []}
          />
        </div>
      )}
    </div>
  );
};

export default Globe;
