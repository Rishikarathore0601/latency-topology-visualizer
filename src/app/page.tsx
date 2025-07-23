"use client";

import dynamic from "next/dynamic";

const Globe = dynamic(() => import("../components/Globe"), { ssr: false });

export default function Home() {
  return (
    <div style={{ height: "100vh", width: "100vw", backgroundColor: "#000" }}>
      <Globe />
    </div>
  );
}
