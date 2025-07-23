"use client";

import React from "react";

interface ThemeToggleProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function ThemeToggle({
  darkMode,
  toggleDarkMode,
}: ThemeToggleProps) {
  return (
    <button
      onClick={toggleDarkMode}
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        padding: "8px 16px",
        background: darkMode ? "#f5f5f5" : "#222",
        color: darkMode ? "#222" : "#fff",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
        zIndex: 1000,
      }}
    >
      {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
