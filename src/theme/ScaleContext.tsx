import { createContext, useContext } from "react";

// Multiplier applied on top of scale.ts's width-based sizing, driven by how
// much vertical space is actually available for the Invest body content on
// this device. 1 = no adjustment (content fits as designed).
const ScaleContext = createContext(1);

export function ScaleProvider({
  factor,
  children,
}: {
  factor: number;
  children: React.ReactNode;
}) {
  return (
    <ScaleContext.Provider value={factor}>{children}</ScaleContext.Provider>
  );
}

export function useLayoutScale() {
  return useContext(ScaleContext);
}

// A full 1:1 factor swing applied straight to fonts/padding looks jarring
// (tiny screens would get uncomfortably cramped text, huge ones oversized).
// DAMP limits how much of the deviation from 1 actually gets applied.
const DAMP = 0.55;
export function applyLayoutScale(size: number, factor: number) {
  return size * (1 + (factor - 1) * DAMP);
}