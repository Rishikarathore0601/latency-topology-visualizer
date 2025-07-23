// components/ExchangeMarker.tsx
import React, { useState } from "react";
import { Sphere } from "@react-three/drei";
import { Html } from "@react-three/drei";
import * as THREE from "three";

interface ExchangeMarkerProps {
  position: THREE.Vector3;
  name: string;
  latency: number;
  location: string;
  provider: "AWS" | "Azure" | "GCP";
  onClick?: () => void;
}

export const ExchangeMarker: React.FC<ExchangeMarkerProps> = ({
  position,
  name,
  latency,
}) => {
  const [hovered, setHovered] = useState(false);

  const color =
    latency < 80
      ? "#00FF00"
      : latency < 120
      ? "#FFFF00"
      : latency < 180
      ? "#FFA500"
      : "#FF0000";

  return (
    <group position={position.toArray()}>
      <Sphere
        args={[0.02, 16, 16]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial color={color} />
      </Sphere>

      {hovered && (
        <Html distanceFactor={10}>
          <div
            style={{
              background: "rgba(0, 0, 0, 0.75)",
              padding: "5px 10px",
              borderRadius: "5px",
              color: "#fff",
              fontSize: "12px",
              pointerEvents: "none",
            }}
          >
            <div>
              <strong>{name}</strong>
            </div>
            <div>Latency: {latency} ms</div>
          </div>
        </Html>
      )}
    </group>
  );
};
