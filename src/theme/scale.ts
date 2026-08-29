import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

export const scale = (size: number) => (width / BASE_WIDTH) * size;
export const verticalScale = (size: number) => (height / BASE_HEIGHT) * size;

export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export const fontScale = (size: number, factor = 0.3) =>
  size + (scale(size) - size) * factor;

export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));