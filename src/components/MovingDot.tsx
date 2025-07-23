"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const MovingDot = ({
  curve,
  duration = 3,
  color = "white",
}: {
  curve: THREE.Curve<THREE.Vector3>;
  duration?: number;
  color?: string;
}) => {
  const dotRef = useRef<THREE.Mesh>(null);
  const clockRef = useRef(0);

  useFrame((_, delta) => {
    clockRef.current += delta;
    const t = (clockRef.current % duration) / duration;
    const point = curve.getPoint(t);
    if (dotRef.current) {
      dotRef.current.position.copy(point);
    }
  });

  return (
    <mesh ref={dotRef}>
      <sphereGeometry args={[0.02, 16, 16]} />{" "}
      {/* Slightly larger and smoother sphere */}
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
};
