import React, { ReactNode } from 'react';
import { useIsMobile, useDeviceType } from '../utils/responsive';

/**
 * Responsive Container - Auto-adjusts padding and max-width based on screen size
 */
export const ResponsiveContainer: React.FC<{
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}> = ({ children, className = '', maxWidth = 'full' }) => {
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  };

  return (
    <div className={`mx-auto px-4 sm:px-6 md:px-8 ${maxWidthClasses[maxWidth]} ${className}`}>
      {children}
    </div>
  );
};

/**
 * Mobile/Desktop Conditional Renderer
 */
export const MobileOnly: React.FC<{ children: ReactNode }> = ({ children }) => {
  const isMobile = useIsMobile();
  return isMobile ? <>{children}</> : null;
};

export const TabletUp: React.FC<{ children: ReactNode }> = ({ children }) => {
  const isMobile = useIsMobile();
  return !isMobile ? <>{children}</> : null;
};

export const DesktopOnly: React.FC<{ children: ReactNode }> = ({ children }) => {
  const deviceType = useDeviceType();
  return deviceType === 'desktop' ? <>{children}</> : null;
};

/**
 * Responsive Grid - Automatically adjusts columns based on screen size
 */
export const ResponsiveGrid: React.FC<{
  children: ReactNode;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: number;
  className?: string;
}> = ({ children, cols = { mobile: 1, tablet: 2, desktop: 3 }, gap = 4, className = '' }) => {
  const { mobile = 1, tablet = 2, desktop = 3 } = cols;
  
  return (
    <div 
      className={`
        grid 
        grid-cols-${mobile} 
        md:grid-cols-${tablet} 
        lg:grid-cols-${desktop} 
        gap-${gap} 
        ${className}
      `}
    >
      {children}
    </div>
  );
};

/**
 * Responsive Stack - Switches between horizontal and vertical layout
 */
export const ResponsiveStack: React.FC<{
  children: ReactNode;
  direction?: 'row' | 'col';
  switchAt?: 'sm' | 'md' | 'lg';
  gap?: number;
  className?: string;
}> = ({ children, direction = 'row', switchAt = 'md', gap = 4, className = '' }) => {
  const mobileDir = direction === 'row' ? 'flex-col' : 'flex-row';
  const desktopDir = direction === 'row' ? 'flex-row' : 'flex-col';
  
  return (
    <div className={`flex ${mobileDir} ${switchAt}:${desktopDir} gap-${gap} ${className}`}>
      {children}
    </div>
  );
};

/**
 * Responsive Spacing - Returns appropriate spacing value based on device
 */
export const useResponsiveValue = <T,>(
  mobile: T,
  tablet?: T,
  desktop?: T
): T => {
  const deviceType = useDeviceType();
  
  switch (deviceType) {
    case 'desktop':
      return desktop ?? tablet ?? mobile;
    case 'tablet':
      return tablet ?? mobile;
    default:
      return mobile;
  }
};

/**
 * Touch-Friendly Button - Ensures minimum 44x44px touch target
 */
export const TouchButton: React.FC<{
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}> = ({ children, onClick, className = '', variant = 'primary', size = 'md', disabled = false }) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm min-h-[44px]',
    md: 'px-6 py-3 text-base min-h-[48px]',
    lg: 'px-8 py-4 text-lg min-h-[52px]',
  };

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400',
    ghost: 'bg-transparent text-blue-600 hover:bg-blue-50 active:bg-blue-100',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        rounded-xl md:rounded-2xl
        font-bold
        transition-all duration-200
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
};

/**
 * Responsive Card - Auto-adjusts padding and border radius
 */
export const ResponsiveCard: React.FC<{
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  gradient?: string;
}> = ({ children, className = '', onClick, gradient }) => {
  const isMobile = useIsMobile();
  
  return (
    <div
      onClick={onClick}
      className={`
        bg-white
        rounded-2xl md:rounded-3xl
        p-4 md:p-6 lg:p-8
        shadow-lg hover:shadow-xl
        transition-all duration-300
        ${onClick ? 'cursor-pointer active:scale-95' : ''}
        ${className}
      `}
      style={gradient ? { background: gradient } : undefined}
    >
      {children}
    </div>
  );
};

export default {
  ResponsiveContainer,
  MobileOnly,
  TabletUp,
  DesktopOnly,
  ResponsiveGrid,
  ResponsiveStack,
  useResponsiveValue,
  TouchButton,
  ResponsiveCard,
};
