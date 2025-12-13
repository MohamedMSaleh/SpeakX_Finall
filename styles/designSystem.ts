/**
 * SpeakX Design System
 * A fun, engaging, and motivating visual language for language learning
 * Inspired by gamification and positive reinforcement
 */

export const colors = {
  // Primary Brand Colors
  primary: {
    blue: '#4F46E5', // Indigo-600
    blueLight: '#818CF8', // Indigo-400
    blueDark: '#3730A3', // Indigo-800
    white: '#FFFFFF',
    offWhite: '#F9FAFB',
  },
  
  // Secondary Reward Colors
  secondary: {
    success: '#10B981', // Emerald-500 - for achievements
    successLight: '#6EE7B7', // Emerald-300
    warning: '#F59E0B', // Amber-500 - for streaks
    warningLight: '#FCD34D', // Amber-300
    energy: '#8B5CF6', // Violet-500 - for progress
    energyLight: '#C4B5FD', // Violet-300
    pink: '#EC4899', // Pink-500 - for special rewards
    pinkLight: '#F9A8D4', // Pink-300
  },
  
  // Neutral Colors
  neutral: {
    gray50: '#F9FAFB',
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray600: '#4B5563',
    gray700: '#374151',
    gray800: '#1F2937',
    gray900: '#111827',
  },
};

export const gradients = {
  // Background Gradients
  backgroundPrimary: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 50%, #DBEAFE 100%)',
  backgroundSuccess: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
  backgroundWarning: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
  backgroundEnergy: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
  backgroundPink: 'linear-gradient(135deg, #FCE7F3 0%, #FBCFE8 100%)',
  
  // Card & Component Gradients
  cardBlue: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
  cardGreen: 'linear-gradient(135deg, #34D399 0%, #10B981 100%)',
  cardYellow: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
  cardPurple: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
  cardPink: 'linear-gradient(135deg, #F472B6 0%, #EC4899 100%)',
  
  // Shimmer & Glow Effects
  shimmer: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
  glow: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0) 70%)',
};

export const shadows = {
  soft: '0 2px 8px rgba(79, 70, 229, 0.08)',
  medium: '0 4px 16px rgba(79, 70, 229, 0.12)',
  large: '0 8px 32px rgba(79, 70, 229, 0.16)',
  glow: '0 0 20px rgba(99, 102, 241, 0.3)',
  success: '0 4px 16px rgba(16, 185, 129, 0.2)',
  warning: '0 4px 16px rgba(245, 158, 11, 0.2)',
  energy: '0 4px 16px rgba(139, 92, 246, 0.2)',
};

export const borderRadius = {
  small: '8px',
  medium: '12px',
  large: '16px',
  xlarge: '24px',
  full: '9999px',
};

export const animations = {
  // Duration
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  
  // Easing
  easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
  easeInOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
};

export const keyframes = {
  // Bounce animation for rewards
  bounce: `
    @keyframes bounce {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-20px) scale(1.05); }
    }
  `,
  
  // Pulse animation for active elements
  pulse: `
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.8; }
    }
  `,
  
  // Float animation for background elements
  float: `
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      33% { transform: translateY(-20px) rotate(5deg); }
      66% { transform: translateY(10px) rotate(-5deg); }
    }
  `,
  
  // Shimmer animation for loading/success states
  shimmer: `
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  `,
  
  // Confetti fall animation
  confettiFall: `
    @keyframes confettiFall {
      0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
      100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
    }
  `,
  
  // Pop-in animation
  popIn: `
    @keyframes popIn {
      0% { transform: scale(0); opacity: 0; }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); opacity: 1; }
    }
  `,
  
  // Progress fill animation
  progressFill: `
    @keyframes progressFill {
      0% { width: 0%; }
      100% { width: var(--progress-width); }
    }
  `,
  
  // Wiggle animation for attention
  wiggle: `
    @keyframes wiggle {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(-10deg); }
      75% { transform: rotate(10deg); }
    }
  `,
  
  // Sparkle animation
  sparkle: `
    @keyframes sparkle {
      0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
      50% { opacity: 1; transform: scale(1) rotate(180deg); }
    }
  `,
  
  // Slide up with fade
  slideUp: `
    @keyframes slideUp {
      0% { transform: translateY(20px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }
  `,
};

// Helper function to generate random values for decorative elements
export const randomInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

// Predefined blob paths for SVG shapes
export const blobPaths = [
  "M45.4,-76.3C58.8,-68.8,69.5,-56.3,76.9,-42C84.3,-27.7,88.4,-11.6,86.7,3.7C85,19,77.5,33.5,67.8,45.2C58.1,56.9,46.2,65.8,33.1,71.4C20,77,5.7,79.3,-8.8,77.8C-23.3,76.3,-38,70.9,-50.4,62.6C-62.8,54.3,-72.9,43.1,-78.6,29.9C-84.3,16.7,-85.6,1.5,-82.7,-12.4C-79.8,-26.3,-72.7,-38.9,-62.8,-49.3C-52.9,-59.7,-40.2,-67.9,-27,-75.8C-13.8,-83.7,-0.2,-91.3,13.1,-88.9C26.4,-86.5,32,-74.8,45.4,-76.3Z",
  "M38.4,-65.5C50.3,-58.9,61.3,-50.4,68.7,-39.2C76.1,-28,79.9,-14,79.8,-0.1C79.7,13.8,75.7,27.6,68.3,39.8C60.9,52,50.1,62.6,37.7,68.8C25.3,75,11.3,76.8,-2.4,80.8C-16.1,84.8,-32.2,91,-45.8,87.3C-59.4,83.6,-70.5,70,-76.8,54.9C-83.1,39.8,-84.6,23.2,-82.7,8.2C-80.8,-6.8,-75.5,-20.2,-68.1,-32.7C-60.7,-45.2,-51.2,-56.8,-39.7,-63.7C-28.2,-70.6,-15.1,-72.8,-2.3,-69.1C10.5,-65.4,26.5,-72.1,38.4,-65.5Z",
  "M41.7,-72.8C54.2,-65.4,64.5,-54.5,71.4,-41.8C78.3,-29.1,81.8,-14.6,80.5,-0.7C79.2,13.2,73.1,26.4,64.8,37.8C56.5,49.2,46,58.8,34.1,65.3C22.2,71.8,9,75.2,-4.5,82.2C-18,89.2,-32.3,99.8,-44.1,93.8C-55.9,87.8,-65.2,65.2,-71.7,44.3C-78.2,23.4,-81.9,4.2,-79.8,-13.9C-77.7,-32,-69.8,-49,-58.4,-61.2C-47,-73.4,-32.1,-80.8,-17.4,-82.5C-2.7,-84.2,11.8,-80.2,41.7,-72.8Z",
];

export default {
  colors,
  gradients,
  shadows,
  borderRadius,
  animations,
  keyframes,
  randomInRange,
  blobPaths,
};
