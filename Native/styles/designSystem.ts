/**
 * SpeakX Design System (React Native)
 * Optimized for React Native (Expo / CLI)
 */

import { Platform } from "react-native";

/* =======================
   COLORS
======================= */

export const colors = {
  primary: {
    blue: "#4F46E5",
    blueLight: "#818CF8",
    blueDark: "#3730A3",
    white: "#FFFFFF",
    offWhite: "#F9FAFB",
  },

  secondary: {
    success: "#10B981",
    successLight: "#6EE7B7",
    warning: "#F59E0B",
    warningLight: "#FCD34D",
    energy: "#8B5CF6",
    energyLight: "#C4B5FD",
    pink: "#EC4899",
    pinkLight: "#F9A8D4",
  },

  neutral: {
    gray50: "#F9FAFB",
    gray100: "#F3F4F6",
    gray200: "#E5E7EB",
    gray300: "#D1D5DB",
    gray400: "#9CA3AF",
    gray500: "#6B7280",
    gray600: "#4B5563",
    gray700: "#374151",
    gray800: "#1F2937",
    gray900: "#111827",
  },
};

/* =======================
   GRADIENTS
   (Used with expo-linear-gradient)
======================= */

export const gradients = {
  backgroundPrimary: ["#EEF2FF", "#E0E7FF", "#DBEAFE"],
  backgroundSuccess: ["#D1FAE5", "#A7F3D0"],
  backgroundWarning: ["#FEF3C7", "#FDE68A"],
  backgroundEnergy: ["#EDE9FE", "#DDD6FE"],
  backgroundPink: ["#FCE7F3", "#FBCFE8"],

  cardBlue: ["#6366F1", "#4F46E5"],
  cardGreen: ["#34D399", "#10B981"],
  cardYellow: ["#FBBF24", "#F59E0B"],
  cardPurple: ["#A78BFA", "#8B5CF6"],
  cardPink: ["#F472B6", "#EC4899"],
};

/* =======================
   SHADOWS (iOS + Android)
======================= */

export const shadows = {
  soft: {
    shadowColor: colors.primary.blue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  medium: {
    shadowColor: colors.primary.blue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },

  large: {
    shadowColor: colors.primary.blue,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 32,
    elevation: 10,
  },

  success: {
    shadowColor: colors.secondary.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 6,
  },
};

/* =======================
   BORDER RADIUS
======================= */

export const borderRadius = {
  small: 8,
  medium: 12,
  large: 16,
  xlarge: 24,
  full: 9999,
};

/* =======================
   ANIMATION TIMINGS
   (Used with Reanimated / Animated)
======================= */

export const animationTiming = {
  fast: 150,
  normal: 300,
  slow: 500,
};

/* =======================
   EASING PRESETS
======================= */

export const easingPresets = {
  easeOut: [0.16, 1, 0.3, 1],
  easeInOut: [0.65, 0, 0.35, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  spring: [0.175, 0.885, 0.32, 1.275],
};

/* =======================
   HELPERS
======================= */

export const randomInRange = (min: number, max: number) =>
  Math.random() * (max - min) + min;

/* =======================
   BLOB SHAPES (SVG PATHS)
======================= */

export const blobPaths = [
  "M45.4,-76.3C58.8,-68.8,69.5,-56.3,76.9,-42C84.3,-27.7,88.4,-11.6,86.7,3.7C85,19,77.5,33.5,67.8,45.2C58.1,56.9,46.2,65.8,33.1,71.4C20,77,5.7,79.3,-8.8,77.8C-23.3,76.3,-38,70.9,-50.4,62.6C-62.8,54.3,-72.9,43.1,-78.6,29.9C-84.3,16.7,-85.6,1.5,-82.7,-12.4C-79.8,-26.3,-72.7,-38.9,-62.8,-49.3C-52.9,-59.7,-40.2,-67.9,-27,-75.8C-13.8,-83.7,-0.2,-91.3,13.1,-88.9C26.4,-86.5,32,-74.8,45.4,-76.3Z",
  "M38.4,-65.5C50.3,-58.9,61.3,-50.4,68.7,-39.2C76.1,-28,79.9,-14,79.8,-0.1C79.7,13.8,75.7,27.6,68.3,39.8C60.9,52,50.1,62.6,37.7,68.8C25.3,75,11.3,76.8,-2.4,80.8C-16.1,84.8,-32.2,91,-45.8,87.3C-59.4,83.6,-70.5,70,-76.8,54.9C-83.1,39.8,-84.6,23.2,-82.7,8.2C-80.8,-6.8,-75.5,-20.2,-68.1,-32.7C-60.7,-45.2,-51.2,-56.8,-39.7,-63.7C-28.2,-70.6,-15.1,-72.8,-2.3,-69.1C10.5,-65.4,26.5,-72.1,38.4,-65.5Z",
];

export default {
  colors,
  gradients,
  shadows,
  borderRadius,
  animationTiming,
  easingPresets,
  randomInRange,
  blobPaths,
};
