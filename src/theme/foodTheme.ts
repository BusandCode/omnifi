// src/theme/foodTheme.ts — standalone theme for the Food module only.
// Does not touch the app's shared src/theme/colors.ts (purple/dark theme).
import { Platform } from "react-native";

export const foodColors = {
  background: "#FAF6F0",
  surface: "#FFFFFF",
  navy: "#0B1958",
  navyDark: "#081340",
  red: "#E4302D",
  black: "#15151A",
  textPrimary: "#17181D",
  textSecondary: "#8A8B93",
  border: "#ECE6DA",
  pillActiveBg: "#15151A",
  pillActiveText: "#FFFFFF",
};

export const foodFonts = {
  serif: Platform.select({ ios: "Georgia", android: "serif", default: "serif" }),
};
