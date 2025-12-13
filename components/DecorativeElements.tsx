import React, { useEffect, useState } from 'react';
import { colors, gradients, randomInRange, blobPaths } from '../styles/designSystem';

/**
 * FloatingShapes - Decorative background elements that float around
 */
interface FloatingShapesProps {
  count?: number;
  colors?: string[];
}

export const FloatingShapes: React.FC<FloatingShapesProps> = ({ 
  count = 8, 
  colors: shapeColors = [colors.primary.blueLight, colors.secondary.successLight, colors.secondary.warningLight, colors.secondary.energyLight, colors.secondary.pinkLight]
}) => {
  const [shapes, setShapes] = useState<Array<{
    id: number;
    left: number;
    top: number;
    size: number;
    delay: number;
    duration: number;
    color: string;
    opacity: number;
  }>>([]);

  useEffect(() => {
    const newShapes = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: randomInRange(0, 100),
      top: randomInRange(0, 100),
      size: randomInRange(40, 120),
      delay: randomInRange(0, 5),
      duration: randomInRange(15, 25),
      color: shapeColors[Math.floor(Math.random() * shapeColors.length)],
      opacity: randomInRange(0.05, 0.15),
    }));
    setShapes(newShapes);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute rounded-full blur-3xl animate-float"
          style={{
            left: `${shape.left}%`,
            top: `${shape.top}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            backgroundColor: shape.color,
            opacity: shape.opacity,
            animationDelay: `${shape.delay}s`,
            animationDuration: `${shape.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

/**
 * BlobShape - Organic blob shapes for visual interest
 */
interface BlobShapeProps {
  color?: string;
  size?: number;
  className?: string;
  opacity?: number;
}

export const BlobShape: React.FC<BlobShapeProps> = ({ 
  color = colors.primary.blueLight, 
  size = 200,
  className = '',
  opacity = 0.1
}) => {
  const randomPath = blobPaths[Math.floor(Math.random() * blobPaths.length)];
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute ${className}`}
      style={{ opacity }}
    >
      <path
        fill={color}
        d={randomPath}
        transform="translate(100 100)"
      />
    </svg>
  );
};

/**
 * GradientBackground - Soft gradient backgrounds with optional pattern
 */
interface GradientBackgroundProps {
  variant?: 'primary' | 'success' | 'warning' | 'energy' | 'pink';
  children?: React.ReactNode;
  className?: string;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({ 
  variant = 'primary', 
  children,
  className = ''
}) => {
  const gradientMap = {
    primary: gradients.backgroundPrimary,
    success: gradients.backgroundSuccess,
    warning: gradients.backgroundWarning,
    energy: gradients.backgroundEnergy,
    pink: gradients.backgroundPink,
  };

  return (
    <div 
      className={`relative ${className}`}
      style={{ background: gradientMap[variant] }}
    >
      <FloatingShapes />
      {children}
    </div>
  );
};

/**
 * WaveDecoration - Wave patterns for section dividers
 */
interface WaveDecorationProps {
  color?: string;
  height?: number;
  flip?: boolean;
}

export const WaveDecoration: React.FC<WaveDecorationProps> = ({ 
  color = colors.primary.white,
  height = 100,
  flip = false
}) => {
  return (
    <svg
      viewBox="0 0 1440 320"
      className={`w-full ${flip ? 'transform rotate-180' : ''}`}
      style={{ height: `${height}px` }}
      preserveAspectRatio="none"
    >
      <path
        fill={color}
        fillOpacity="1"
        d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      />
    </svg>
  );
};

/**
 * GlowingOrb - Glowing circular element for backgrounds
 */
interface GlowingOrbProps {
  color?: string;
  size?: number;
  className?: string;
}

export const GlowingOrb: React.FC<GlowingOrbProps> = ({ 
  color = colors.primary.blue,
  size = 300,
  className = ''
}) => {
  return (
    <div
      className={`absolute rounded-full blur-3xl animate-pulse pointer-events-none ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
        animationDuration: '4s',
      }}
    />
  );
};

/**
 * BubbleDecoration - Playful bubble clusters
 */
interface BubbleDecorationProps {
  count?: number;
  className?: string;
}

export const BubbleDecoration: React.FC<BubbleDecorationProps> = ({ 
  count = 5,
  className = ''
}) => {
  const bubbles = Array.from({ length: count }, (_, i) => ({
    size: randomInRange(20, 60),
    delay: randomInRange(0, 2),
  }));

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {bubbles.map((bubble, i) => (
        <div
          key={i}
          className="rounded-full bg-white/20 backdrop-blur-sm animate-bounce"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            animationDelay: `${bubble.delay}s`,
            animationDuration: '2s',
          }}
        />
      ))}
    </div>
  );
};

/**
 * PatternBackground - Dotted or grid pattern overlay
 */
interface PatternBackgroundProps {
  pattern?: 'dots' | 'grid';
  opacity?: number;
}

export const PatternBackground: React.FC<PatternBackgroundProps> = ({ 
  pattern = 'dots',
  opacity = 0.1
}) => {
  const patternSVG = pattern === 'dots' 
    ? `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><circle cx="2" cy="2" r="1" fill="currentColor"/></svg>`
    : `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" stroke-width="0.5"/></svg>`;
  
  const encodedPattern = btoa(patternSVG);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml;base64,${encodedPattern}")`,
        opacity,
      }}
    />
  );
};

/**
 * CircleGrid - Decorative circle grid pattern
 */
export const CircleGrid: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`absolute grid grid-cols-8 gap-4 ${className}`}>
      {Array.from({ length: 32 }).map((_, i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-blue-200/30"
          style={{
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};
