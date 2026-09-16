import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { colors as lightColors } from "./colors";

export type ThemeMode = "dark" | "light";
export type ThemeColors = typeof lightColors;

const STORAGE_KEY = "omnifi_theme_mode_v1";

const darkColors: ThemeColors = {
  // background: "#01000e",
  background: "#000000",
  border: "rgba(255,255,255,0.08)",
  surface: "#151217",
  surfaceAlt: "#211D26",
  primary: "#8B5CF6",
  primaryLight: "#8B5CF6",
  primaryDark: "#9D28D9",
  primaryTint: "rgba(139, 92, 246, 0.12)",
  textPrimary: "#FFFFFF",
  textSecondary: "#8E8E93",
  success: "#34C759",
  successTint: "rgba(52, 199, 89, 0.15)",
  danger: "#FF3B30",
  dangerTint: "rgba(255, 59, 48, 0.15)",
};

type ThemeContextValue = {
  mode: ThemeMode;
  colors: ThemeColors;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("light");

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((storedMode) => {
        if (storedMode === "light" || storedMode === "dark")
          setModeState(storedMode);
      })
      .catch(() => {});
  }, []);

  const setMode = (nextMode: ThemeMode) => {
    setModeState(nextMode);
    AsyncStorage.setItem(STORAGE_KEY, nextMode).catch(() => {});
  };

  const value: ThemeContextValue = {
    mode,
    colors: mode === "light" ? lightColors : darkColors,
    setMode,
    toggleMode: () => setMode(mode === "dark" ? "light" : "dark"),
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
