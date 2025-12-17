import { useEffect, useState } from 'react';

/**
 * SpeakX Responsive Utilities
 * Mobile-first responsive design system
 */

// Breakpoint definitions (matching Tailwind defaults)
export const breakpoints = {
  sm: 640,   // Small devices (phones in landscape, small tablets)
  md: 768,   // Medium devices (tablets)
  lg: 1024,  // Large devices (laptops)
  xl: 1280,  // Extra large devices (desktops)
  '2xl': 1536, // 2X large devices (large desktops)
} as const;

export type Breakpoint = keyof typeof breakpoints;
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

/**
 * Hook to detect current screen size
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

/**
 * Hook to detect if screen is at or above a breakpoint
 */
export const useBreakpoint = (breakpoint: Breakpoint): boolean => {
  return useMediaQuery(`(min-width: ${breakpoints[breakpoint]}px)`);
};

/**
 * Hook to detect device type
 */
export const useDeviceType = (): DeviceType => {
  const isMd = useBreakpoint('md');
  const isLg = useBreakpoint('lg');

  if (isLg) return 'desktop';
  if (isMd) return 'tablet';
  return 'mobile';
};

/**
 * Hook to detect if device is mobile
 */
export const useIsMobile = (): boolean => {
  return !useBreakpoint('md');
};

/**
 * Hook to detect if device is tablet
 */
export const useIsTablet = (): boolean => {
  const isMd = useBreakpoint('md');
  const isLg = useBreakpoint('lg');
  return isMd && !isLg;
};

/**
 * Hook to detect if device is desktop
 */
export const useIsDesktop = (): boolean => {
  return useBreakpoint('lg');
};

/**
 * Hook to get window dimensions
 */
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

/**
 * Hook to detect touch device
 */
export const useIsTouchDevice = (): boolean => {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-ignore
      navigator.msMaxTouchPoints > 0
    );
  }, []);

  return isTouch;
};

/**
 * Responsive spacing utility
 * Returns smaller values on mobile, larger on desktop
 */
export const getResponsiveSpacing = (
  mobile: number,
  tablet?: number,
  desktop?: number
): string => {
  const t = tablet ?? mobile * 1.5;
  const d = desktop ?? mobile * 2;
  
  return `${mobile}px md:${t}px lg:${d}px`;
};

/**
 * Responsive font size utility
 */
export const getResponsiveFontSize = (
  mobile: string,
  tablet?: string,
  desktop?: string
): string => {
  const classes = [mobile];
  if (tablet) classes.push(`md:${tablet}`);
  if (desktop) classes.push(`lg:${desktop}`);
  return classes.join(' ');
};

/**
 * Touch target size validator
 * Ensures minimum 44x44px for touch targets (WCAG 2.1)
 */
export const getTouchTargetClass = (size?: number): string => {
  const minSize = size ?? 44;
  return `min-w-[${minSize}px] min-h-[${minSize}px]`;
};

/**
 * Safe area insets for mobile devices (notches, etc.)
 */
export const safeAreaClasses = {
  top: 'pt-safe-top',
  bottom: 'pb-safe-bottom',
  left: 'pl-safe-left',
  right: 'pr-safe-right',
  x: 'px-safe-x',
  y: 'py-safe-y',
  all: 'p-safe',
} as const;

/**
 * Mobile-first padding classes
 */
export const responsivePadding = {
  xs: 'p-3 md:p-4 lg:p-5',
  sm: 'p-4 md:p-5 lg:p-6',
  md: 'p-5 md:p-6 lg:p-8',
  lg: 'p-6 md:p-8 lg:p-10',
  xl: 'p-8 md:p-10 lg:p-12',
} as const;

/**
 * Mobile-first gap classes
 */
export const responsiveGap = {
  xs: 'gap-2 md:gap-3 lg:gap-4',
  sm: 'gap-3 md:gap-4 lg:gap-5',
  md: 'gap-4 md:gap-5 lg:gap-6',
  lg: 'gap-5 md:gap-6 lg:gap-8',
  xl: 'gap-6 md:gap-8 lg:gap-10',
} as const;

/**
 * Container max-width classes
 */
export const containerClasses = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
} as const;

/**
 * Grid column classes for responsive layouts
 */
export const gridCols = {
  responsive: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  cards: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  feature: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  split: 'grid-cols-1 lg:grid-cols-2',
} as const;

/**
 * Font size scale (mobile-first)
 */
export const fontSize = {
  xs: 'text-xs',
  sm: 'text-sm md:text-base',
  base: 'text-base md:text-lg',
  lg: 'text-lg md:text-xl',
  xl: 'text-xl md:text-2xl',
  '2xl': 'text-2xl md:text-3xl',
  '3xl': 'text-3xl md:text-4xl',
  '4xl': 'text-4xl md:text-5xl',
} as const;

/**
 * Icon size scale based on device
 */
export const getResponsiveIconSize = (deviceType: DeviceType): number => {
  switch (deviceType) {
    case 'mobile':
      return 20;
    case 'tablet':
      return 24;
    case 'desktop':
      return 28;
  }
};

/**
 * Button size variants (mobile-first)
 */
export const buttonSizes = {
  sm: 'px-3 py-2 text-sm md:px-4 md:py-2.5',
  md: 'px-4 py-3 text-base md:px-6 md:py-3.5',
  lg: 'px-6 py-4 text-lg md:px-8 md:py-5',
  xl: 'px-8 py-5 text-xl md:px-10 md:py-6',
} as const;

/**
 * Card size variants
 */
export const cardSizes = {
  sm: 'p-4 md:p-5',
  md: 'p-5 md:p-6 lg:p-8',
  lg: 'p-6 md:p-8 lg:p-10',
} as const;

export default {
  breakpoints,
  useMediaQuery,
  useBreakpoint,
  useDeviceType,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useWindowSize,
  useIsTouchDevice,
  getResponsiveSpacing,
  getResponsiveFontSize,
  getTouchTargetClass,
  safeAreaClasses,
  responsivePadding,
  responsiveGap,
  containerClasses,
  gridCols,
  fontSize,
  getResponsiveIconSize,
  buttonSizes,
  cardSizes,
};
