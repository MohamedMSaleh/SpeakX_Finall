/**
 * 🎨 Reusable Animated Components Library
 * 
 * Collection of beautifully animated, emotionally engaging UI components
 * for the SpeakX application
 */

import React, { useState, useEffect, ReactNode } from 'react';

// ===== ANIMATED BUTTON =====
interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'success' | 'gold' | 'purple' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  fullWidth = false,
  className = '',
}) => {
  const baseStyles = 'relative overflow-hidden font-semibold rounded-2xl transition-all duration-300 active-press hover-lift disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-blue',
    success: 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-green',
    gold: 'bg-gradient-to-r from-gold-400 to-gold-500 text-white hover:from-gold-500 hover:to-gold-600 shadow-gold',
    purple: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 shadow-purple',
    outline: 'border-2 border-blue-500 text-blue-600 hover:bg-blue-50',
    ghost: 'text-gray-700 hover:bg-gray-100',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      <span className="flex items-center justify-center gap-2">
        {icon && <span className="animate-float">{icon}</span>}
        {children}
      </span>
    </button>
  );
};

// ===== ANIMATED CARD =====
interface AnimatedCardProps {
  children: ReactNode;
  variant?: 'default' | 'gradient' | 'glow';
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  variant = 'default',
  hover = true,
  className = '',
  onClick,
}) => {
  const baseStyles = 'rounded-3xl p-6 transition-all duration-300';
  
  const variants = {
    default: 'bg-white border border-gray-100 shadow-md',
    gradient: 'bg-gradient-to-br from-white to-blue-50 border border-blue-100 shadow-lg',
    glow: 'bg-white border border-blue-200 shadow-xl animate-glow',
  };
  
  const hoverStyles = hover ? 'hover-lift cursor-pointer' : '';
  
  return (
    <div
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
};

// ===== GRADIENT BACKGROUND =====
interface GradientBackgroundProps {
  children: ReactNode;
  variant?: 'blue' | 'green' | 'purple' | 'gold' | 'multicolor';
  className?: string;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  variant = 'multicolor',
  className = '',
}) => {
  const gradients = {
    blue: 'bg-gradient-to-b from-blue-50 to-white',
    green: 'bg-gradient-to-b from-green-50 to-white',
    purple: 'bg-gradient-to-b from-purple-50 to-white',
    gold: 'bg-gradient-to-b from-amber-50 to-white',
    multicolor: 'bg-gradient-to-br from-blue-50 via-purple-50 to-amber-50',
  };
  
  return (
    <div className={`${gradients[variant]} ${className}`}>
      {children}
    </div>
  );
};

// ===== FLOATING SHAPES =====
export const FloatingShapes: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Blob 1 */}
      <div className="absolute top-20 -left-10 w-40 h-40 bg-blue-400 rounded-full opacity-5 animate-floatSlow" style={{ animationDelay: '0s' }} />
      
      {/* Floating Blob 2 */}
      <div className="absolute top-1/3 -right-20 w-60 h-60 bg-purple-400 rounded-full opacity-5 animate-floatSlow" style={{ animationDelay: '2s' }} />
      
      {/* Floating Blob 3 */}
      <div className="absolute bottom-20 left-1/4 w-32 h-32 bg-green-400 rounded-full opacity-5 animate-floatSlow" style={{ animationDelay: '4s' }} />
      
      {/* Floating Blob 4 */}
      <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-amber-400 rounded-full opacity-5 animate-floatSlow" style={{ animationDelay: '1s' }} />
    </div>
  );
};

// ===== ANIMATED PROGRESS BAR =====
interface AnimatedProgressBarProps {
  progress: number;
  variant?: 'blue' | 'green' | 'gold' | 'purple';
  showPercentage?: boolean;
  height?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({
  progress,
  variant = 'blue',
  showPercentage = true,
  height = 'md',
  className = '',
}) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setDisplayProgress(progress), 100);
    return () => clearTimeout(timer);
  }, [progress]);
  
  const gradients = {
    blue: 'bg-gradient-to-r from-blue-500 to-blue-600',
    green: 'bg-gradient-to-r from-green-500 to-green-600',
    gold: 'bg-gradient-to-r from-amber-400 to-amber-500',
    purple: 'bg-gradient-to-r from-purple-500 to-purple-600',
  };
  
  const heights = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };
  
  return (
    <div className={className}>
      <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${heights[height]}`}>
        <div
          className={`${gradients[variant]} ${heights[height]} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${displayProgress}%` }}
        />
      </div>
      {showPercentage && (
        <div className="text-xs text-gray-600 font-semibold mt-1 text-right">
          {Math.round(displayProgress)}%
        </div>
      )}
    </div>
  );
};

// ===== ANIMATED BADGE =====
interface AnimatedBadgeProps {
  icon: ReactNode;
  label?: string;
  variant?: 'blue' | 'green' | 'gold' | 'purple' | 'pink';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  className?: string;
}

export const AnimatedBadge: React.FC<AnimatedBadgeProps> = ({
  icon,
  label,
  variant = 'blue',
  size = 'md',
  glow = false,
  className = '',
}) => {
  const variants = {
    blue: 'bg-gradient-to-br from-blue-400 to-blue-600',
    green: 'bg-gradient-to-br from-green-400 to-green-600',
    gold: 'bg-gradient-to-br from-amber-400 to-amber-600',
    purple: 'bg-gradient-to-br from-purple-400 to-purple-600',
    pink: 'bg-gradient-to-br from-pink-400 to-pink-600',
  };
  
  const sizes = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
  };
  
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div
        className={`${variants[variant]} ${sizes[size]} rounded-full flex items-center justify-center text-white shadow-lg ${
          glow ? 'animate-glow' : ''
        } hover-scale`}
      >
        {icon}
      </div>
      {label && (
        <span className="text-xs font-semibold text-gray-700">{label}</span>
      )}
    </div>
  );
};

// ===== LOADING SPINNER =====
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'blue' | 'gradient';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'gradient',
}) => {
  const sizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };
  
  const variants = {
    blue: 'border-blue-500 border-t-transparent',
    gradient: 'border-transparent border-t-blue-500',
  };
  
  return (
    <div className={`${sizes[size]} ${variants[variant]} rounded-full animate-spin`} />
  );
};

// ===== XP COUNTER =====
interface XPCounterProps {
  xp: number;
  showAnimation?: boolean;
  className?: string;
}

export const XPCounter: React.FC<XPCounterProps> = ({
  xp,
  showAnimation = false,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="bg-gradient-to-r from-amber-400 to-amber-500 p-2 rounded-lg shadow-gold">
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
      <span className={`text-lg font-black text-gray-900 ${showAnimation ? 'animate-bounceIn' : ''}`}>
        {xp.toLocaleString()}
      </span>
    </div>
  );
};

// ===== STREAK INDICATOR =====
interface StreakIndicatorProps {
  streak: number;
  className?: string;
}

export const StreakIndicator: React.FC<StreakIndicatorProps> = ({
  streak,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-2xl animate-float">🔥</span>
        </div>
      </div>
      <div>
        <div className="text-2xl font-black text-gray-900">{streak}</div>
        <div className="text-xs text-gray-500 font-semibold">Day Streak</div>
      </div>
    </div>
  );
};

// ===== ACHIEVEMENT TOAST =====
interface AchievementToastProps {
  title: string;
  description: string;
  icon: ReactNode;
  show: boolean;
  onClose: () => void;
}

export const AchievementToast: React.FC<AchievementToastProps> = ({
  title,
  description,
  icon,
  show,
  onClose,
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);
  
  if (!show) return null;
  
  return (
    <div className="fixed top-20 right-4 z-50 animate-slideLeft">
      <AnimatedCard variant="glow" className="max-w-sm">
        <div className="flex items-start gap-3">
          <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-12 h-12 rounded-full flex items-center justify-center text-2xl animate-bounceIn">
            {icon}
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900">{title}</h4>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

// ===== CONFETTI EFFECT =====
export const ConfettiEffect: React.FC = () => {
  const colors = ['#3B82F6', '#22C55E', '#FBBF24', '#A855F7', '#F472B6', '#FB923C'];
  const confettiCount = 50;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from({ length: confettiCount }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-10px',
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            animation: `confetti ${2 + Math.random() * 2}s linear forwards`,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
};

// ===== MOTIVATIONAL MESSAGE =====
interface MotivationalMessageProps {
  message: string;
  variant?: 'encouraging' | 'celebrating' | 'supportive';
  className?: string;
}

export const MotivationalMessage: React.FC<MotivationalMessageProps> = ({
  message,
  variant = 'encouraging',
  className = '',
}) => {
  const variants = {
    encouraging: 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200',
    celebrating: 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200',
    supportive: 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200',
  };
  
  const icons = {
    encouraging: '💪',
    celebrating: '🎉',
    supportive: '✨',
  };
  
  return (
    <div className={`${variants[variant]} border-2 rounded-2xl p-4 animate-slideUp ${className}`}>
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icons[variant]}</span>
        <p className="font-semibold text-gray-800">{message}</p>
      </div>
    </div>
  );
};

// ===== LEVEL UP CELEBRATION =====
interface LevelUpCelebrationProps {
  level: number;
  show: boolean;
  onClose: () => void;
}

export const LevelUpCelebration: React.FC<LevelUpCelebrationProps> = ({
  level,
  show,
  onClose,
}) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
      <ConfettiEffect />
      <div className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center animate-bounceIn">
        <div className="mb-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-5xl animate-float shadow-2xl">
            🏆
          </div>
        </div>
        <h2 className="text-3xl font-black gradient-text-gold mb-2">Level Up!</h2>
        <p className="text-gray-600 mb-4">You've reached level {level}</p>
        <AnimatedButton onClick={onClose} variant="gold" fullWidth>
          Awesome!
        </AnimatedButton>
      </div>
    </div>
  );
};
