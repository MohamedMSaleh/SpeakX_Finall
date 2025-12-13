import React, { useEffect, useState } from 'react';
import { colors } from '../styles/designSystem';

/**
 * Confetti - Celebration animation
 */
interface ConfettiProps {
  active: boolean;
  duration?: number;
  onComplete?: () => void;
}

export const Confetti: React.FC<ConfettiProps> = ({ active, duration = 3000, onComplete }) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    left: number;
    color: string;
    delay: number;
    size: number;
    rotation: number;
  }>>([]);

  useEffect(() => {
    if (active) {
      const confettiColors = [
        colors.primary.blue,
        colors.secondary.success,
        colors.secondary.warning,
        colors.secondary.energy,
        colors.secondary.pink,
      ];

      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        delay: Math.random() * 0.5,
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
      }));

      setParticles(newParticles);

      const timer = setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [active, duration, onComplete]);

  if (!active || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute top-0 animate-confettiFall"
          style={{
            left: `${particle.left}%`,
            backgroundColor: particle.color,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${duration / 1000}s`,
            transform: `rotate(${particle.rotation}deg)`,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
          }}
        />
      ))}
    </div>
  );
};

/**
 * Sparkles - Magical sparkle effect
 */
interface SparklesProps {
  active: boolean;
  count?: number;
  color?: string;
}

export const Sparkles: React.FC<SparklesProps> = ({ 
  active, 
  count = 12,
  color = colors.secondary.warningLight 
}) => {
  const [sparkles, setSparkles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    delay: number;
    size: number;
  }>>([]);

  useEffect(() => {
    if (active) {
      const newSparkles = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 1,
        size: Math.random() * 12 + 8,
      }));

      setSparkles(newSparkles);

      const timer = setTimeout(() => {
        setSparkles([]);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [active, count]);

  if (!active || sparkles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute animate-sparkle"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDelay: `${sparkle.delay}s`,
          }}
        >
          <svg
            width={sparkle.size}
            height={sparkle.size}
            viewBox="0 0 24 24"
            fill={color}
          >
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

/**
 * ProgressBar - Animated progress bar with gradient
 */
interface ProgressBarProps {
  progress: number;
  color?: string;
  gradient?: string;
  height?: number;
  showLabel?: boolean;
  animated?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress,
  color = colors.primary.blue,
  gradient,
  height = 12,
  showLabel = false,
  animated = true
}) => {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setDisplayProgress(progress), 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayProgress(progress);
    }
  }, [progress, animated]);

  return (
    <div className="w-full">
      <div 
        className="relative w-full bg-gray-200 rounded-full overflow-hidden"
        style={{ height }}
      >
        <div
          className="h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden"
          style={{
            width: `${displayProgress}%`,
            background: gradient || color,
          }}
        >
          {/* Shimmer effect */}
          <div 
            className="absolute inset-0 animate-shimmer"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
              animation: 'shimmer 2s infinite',
            }}
          />
        </div>
      </div>
      {showLabel && (
        <div className="text-xs text-gray-600 mt-1 font-medium text-center">
          {Math.round(displayProgress)}%
        </div>
      )}
    </div>
  );
};

/**
 * BounceWrapper - Adds bounce animation to children
 */
interface BounceWrapperProps {
  children: React.ReactNode;
  trigger: boolean;
  duration?: number;
}

export const BounceWrapper: React.FC<BounceWrapperProps> = ({ 
  children, 
  trigger,
  duration = 500 
}) => {
  const [shouldBounce, setShouldBounce] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShouldBounce(true);
      const timer = setTimeout(() => setShouldBounce(false), duration);
      return () => clearTimeout(timer);
    }
  }, [trigger, duration]);

  return (
    <div className={shouldBounce ? 'animate-bounce' : ''}>
      {children}
    </div>
  );
};

/**
 * PopIn - Animated entrance effect
 */
interface PopInProps {
  children: React.ReactNode;
  delay?: number;
}

export const PopIn: React.FC<PopInProps> = ({ children, delay = 0 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`transition-all duration-500 ${
        visible ? 'animate-popIn' : 'opacity-0 scale-0'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/**
 * PulseGlow - Pulsing glow effect for important elements
 */
interface PulseGlowProps {
  children: React.ReactNode;
  color?: string;
  active?: boolean;
}

export const PulseGlow: React.FC<PulseGlowProps> = ({ 
  children, 
  color = colors.primary.blue,
  active = true 
}) => {
  return (
    <div className="relative inline-block">
      {active && (
        <div 
          className="absolute inset-0 rounded-full blur-xl opacity-50 animate-pulse"
          style={{ 
            background: color,
            filter: 'blur(20px)',
            zIndex: -1,
          }}
        />
      )}
      {children}
    </div>
  );
};

/**
 * CountUp - Animated number counter
 */
interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export const CountUp: React.FC<CountUpProps> = ({ 
  end, 
  duration = 1000,
  suffix = '',
  prefix = '' 
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    
    requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{prefix}{count}{suffix}</span>;
};

/**
 * ShakeAnimation - Shake effect for attention
 */
interface ShakeAnimationProps {
  children: React.ReactNode;
  trigger: boolean;
}

export const ShakeAnimation: React.FC<ShakeAnimationProps> = ({ children, trigger }) => {
  const [shouldShake, setShouldShake] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShouldShake(true);
      const timer = setTimeout(() => setShouldShake(false), 500);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <div className={shouldShake ? 'animate-wiggle' : ''}>
      {children}
    </div>
  );
};

/**
 * SuccessAnimation - Complete success celebration
 */
interface SuccessAnimationProps {
  show: boolean;
  message?: string;
  onComplete?: () => void;
}

export const SuccessAnimation: React.FC<SuccessAnimationProps> = ({ 
  show, 
  message = 'Great job!',
  onComplete 
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <Confetti active={show} onComplete={onComplete} />
      <div className="bg-white rounded-3xl p-8 shadow-2xl animate-popIn text-center max-w-sm">
        <div className="mb-4 flex justify-center">
          <svg className="w-24 h-24 text-green-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{message}</h2>
        <p className="text-gray-600">Keep up the amazing work!</p>
      </div>
    </div>
  );
};
