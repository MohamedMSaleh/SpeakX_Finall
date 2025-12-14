/**
 * 🎨 SpeakX Global Design System & Theme
 * 
 * Complete visual identity system featuring:
 * - Expanded color palette with gradients
 * - Animation constants and timing functions
 * - Spacing, shadows, and typography
 * - Reusable design tokens
 */

export const theme = {
  // 🎨 Core Color Palette
  colors: {
    // Primary Brand Colors
    primary: {
      blue: {
        50: '#EFF6FF',
        100: '#DBEAFE',
        200: '#BFDBFE',
        300: '#93C5FD',
        400: '#60A5FA',
        500: '#3B82F6',
        600: '#2563EB',
        700: '#1D4ED8',
        800: '#1E40AF',
        900: '#1E3A8A',
      },
      white: '#FFFFFF',
    },
    
    // Soft Greens (Growth & Success)
    green: {
      50: '#F0FDF4',
      100: '#DCFCE7',
      200: '#BBF7D0',
      300: '#86EFAC',
      400: '#4ADE80',
      500: '#22C55E',
      600: '#16A34A',
      700: '#15803D',
    },
    
    // Warm Gold (Achievement & Rewards)
    gold: {
      50: '#FFFBEB',
      100: '#FEF3C7',
      200: '#FDE68A',
      300: '#FCD34D',
      400: '#FBBF24',
      500: '#F59E0B',
      600: '#D97706',
      700: '#B45309',
    },
    
    // Clean Purple (Supportive Highlights)
    purple: {
      50: '#FAF5FF',
      100: '#F3E8FF',
      200: '#E9D5FF',
      300: '#D8B4FE',
      400: '#C084FC',
      500: '#A855F7',
      600: '#9333EA',
      700: '#7E22CE',
    },
    
    // Additional Accent Colors
    pink: {
      50: '#FDF2F8',
      100: '#FCE7F3',
      200: '#FBCFE8',
      300: '#F9A8D4',
      400: '#F472B6',
      500: '#EC4899',
    },
    
    orange: {
      50: '#FFF7ED',
      100: '#FFEDD5',
      200: '#FED7AA',
      300: '#FDBA74',
      400: '#FB923C',
      500: '#F97316',
    },
    
    // Neutrals
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },
  
  // 🌈 Gradient Definitions
  gradients: {
    primary: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    success: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
    gold: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
    purple: 'linear-gradient(135deg, #A855F7 0%, #9333EA 100%)',
    sunset: 'linear-gradient(135deg, #F472B6 0%, #F97316 50%, #FBBF24 100%)',
    ocean: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
    spring: 'linear-gradient(135deg, #22C55E 0%, #3B82F6 100%)',
    warm: 'linear-gradient(135deg, #FB923C 0%, #FBBF24 100%)',
    
    // Soft Background Gradients
    backgrounds: {
      blue: 'linear-gradient(180deg, #EFF6FF 0%, #FFFFFF 100%)',
      green: 'linear-gradient(180deg, #F0FDF4 0%, #FFFFFF 100%)',
      purple: 'linear-gradient(180deg, #FAF5FF 0%, #FFFFFF 100%)',
      gold: 'linear-gradient(180deg, #FFFBEB 0%, #FFFFFF 100%)',
      multicolor: 'linear-gradient(135deg, #EFF6FF 0%, #FAF5FF 50%, #FFFBEB 100%)',
    },
  },
  
  // 🎭 Shadows & Depth
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    
    // Colored Shadows
    blue: '0 10px 25px -5px rgba(59, 130, 246, 0.3)',
    green: '0 10px 25px -5px rgba(34, 197, 94, 0.3)',
    gold: '0 10px 25px -5px rgba(245, 158, 11, 0.3)',
    purple: '0 10px 25px -5px rgba(168, 85, 247, 0.3)',
    
    // Glow Effects
    glow: {
      blue: '0 0 20px rgba(59, 130, 246, 0.4)',
      green: '0 0 20px rgba(34, 197, 94, 0.4)',
      gold: '0 0 20px rgba(245, 158, 11, 0.4)',
      purple: '0 0 20px rgba(168, 85, 247, 0.4)',
    },
  },
  
  // ✨ Animation Timing & Constants
  animations: {
    // Durations
    durations: {
      instant: '100ms',
      fast: '200ms',
      normal: '300ms',
      slow: '500ms',
      slower: '700ms',
    },
    
    // Easing Functions
    easings: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
    
    // Keyframes (CSS classes to be added)
    keyframes: {
      fadeIn: 'fadeIn',
      fadeOut: 'fadeOut',
      slideUp: 'slideUp',
      slideDown: 'slideDown',
      slideLeft: 'slideLeft',
      slideRight: 'slideRight',
      bounce: 'bounce',
      pulse: 'pulse',
      wiggle: 'wiggle',
      sparkle: 'sparkle',
      float: 'float',
      glow: 'glow',
    },
  },
  
  // 📏 Spacing & Border Radius
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
  },
  
  borderRadius: {
    sm: '0.5rem',    // 8px
    md: '0.75rem',   // 12px
    lg: '1rem',      // 16px
    xl: '1.5rem',    // 24px
    '2xl': '2rem',   // 32px
    full: '9999px',
  },
  
  // 📝 Typography
  typography: {
    fontFamily: {
      sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      display: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
    },
    
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      black: '900',
    },
  },
  
  // 🎯 Component-Specific Tokens
  components: {
    button: {
      heights: {
        sm: '2rem',
        md: '2.5rem',
        lg: '3rem',
      },
      padding: {
        sm: '0.5rem 1rem',
        md: '0.75rem 1.5rem',
        lg: '1rem 2rem',
      },
    },
    
    card: {
      padding: {
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
      },
    },
    
    badge: {
      sizes: {
        sm: '1.5rem',
        md: '2rem',
        lg: '3rem',
      },
    },
  },
  
  // 🌟 Special Effect Constants
  effects: {
    // Particle System
    particles: {
      count: {
        low: 10,
        medium: 20,
        high: 50,
      },
      sizes: ['2px', '3px', '4px'],
      colors: ['#3B82F6', '#22C55E', '#FBBF24', '#A855F7', '#F472B6'],
    },
    
    // Floating Shapes
    shapes: {
      sizes: {
        sm: '100px',
        md: '150px',
        lg: '200px',
      },
      opacity: [0.03, 0.05, 0.07],
    },
  },
};

// Helper Functions
export const getGradient = (type: keyof typeof theme.gradients) => theme.gradients[type];
export const getColor = (color: string, shade: number) => {
  const [colorName] = color.split('.');
  return (theme.colors as any)[colorName]?.[shade] || color;
};

export default theme;
