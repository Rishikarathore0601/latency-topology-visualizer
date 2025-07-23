"use client";

import React, { useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import { Line } from "@react-three/drei";
import { latLonToVector3 } from "../utils/convertLatLngToVector3";
import { MovingDot } from "./MovingDot";

interface Exchange {
  lat: number;
  lon: number;
  name: string;
  id: string;
}

interface Props {
  from: Exchange;
  to: Exchange;
  latency: number;
  onClick?: () => void;
}

export const getLatencyColor = (latency: number): string => {
  if (latency < 100) return "lime";
  if (latency < 200) return "yellow";
  if (latency < 300) return "orange";
  return "red";
};

export const ConnectionLine: React.FC<Props> = ({
  from,
  to,
  latency,
  onClick,
}) => {
  const [color, setColor] = useState(getLatencyColor(latency));

  useEffect(() => {
    setColor(getLatencyColor(latency));
  }, [latency]);

  const curve = useMemo(() => {
    const start = latLonToVector3(from.lat, from.lon, 1.01);
    const end = latLonToVector3(to.lat, to.lon, 1.01);
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    mid.normalize().multiplyScalar(1.2); // Arc height
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [from.lat, from.lon, to.lat, to.lon]);

  const points = useMemo(() => curve.getPoints(100), [curve]);

  return (
    <>
      <Line
        points={points}
        color={color}
        lineWidth={1}
        dashed={false}
        onClick={onClick}
      />
      <MovingDot
        curve={curve}
        duration={latency / 100} // Lower latency = faster speed
        color={color}
      />
    </>
  );
};
