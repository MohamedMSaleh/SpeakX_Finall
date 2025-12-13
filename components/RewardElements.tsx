import React from 'react';
import * as LucideIcons from 'lucide-react';
import { colors, gradients } from '../styles/designSystem';

/**
 * RewardBadge - Collectible badges with personality
 */
interface RewardBadgeProps {
  type: 'streak' | 'level' | 'achievement' | 'star' | 'trophy' | 'gem';
  size?: number;
  glow?: boolean;
  animated?: boolean;
  count?: number;
}

export const RewardBadge: React.FC<RewardBadgeProps> = ({ 
  type, 
  size = 48, 
  glow = false,
  animated = false,
  count
}) => {
  const badgeConfig = {
    streak: { 
      gradient: gradients.cardYellow, 
      icon: LucideIcons.Flame,
      color: colors.secondary.warning 
    },
    level: { 
      gradient: gradients.cardBlue, 
      icon: LucideIcons.Award,
      color: colors.primary.blue 
    },
    achievement: { 
      gradient: gradients.cardGreen, 
      icon: LucideIcons.Trophy,
      color: colors.secondary.success 
    },
    star: { 
      gradient: gradients.cardPurple, 
      icon: LucideIcons.Star,
      color: colors.secondary.energy 
    },
    trophy: { 
      gradient: gradients.cardYellow, 
      icon: LucideIcons.Crown,
      color: colors.secondary.warning 
    },
    gem: { 
      gradient: gradients.cardPink, 
      icon: LucideIcons.Gem,
      color: colors.secondary.pink 
    },
  };

  const config = badgeConfig[type];
  const IconComponent = config.icon;

  return (
    <div className="relative inline-flex items-center justify-center">
      {glow && (
        <div 
          className="absolute inset-0 rounded-full blur-xl opacity-50 animate-pulse"
          style={{ 
            background: config.gradient,
            width: size + 20,
            height: size + 20,
            left: -10,
            top: -10,
          }}
        />
      )}
      <div
        className={`relative rounded-full flex items-center justify-center ${animated ? 'animate-bounce' : ''}`}
        style={{
          width: size,
          height: size,
          background: config.gradient,
          boxShadow: `0 4px 16px ${config.color}40`,
        }}
      >
        <IconComponent 
          size={size * 0.5} 
          className="text-white drop-shadow-lg" 
          fill="white"
        />
        {count !== undefined && (
          <div 
            className="absolute -top-1 -right-1 bg-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md"
            style={{ color: config.color }}
          >
            {count}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * MotivationalIcon - Friendly, expressive icons
 */
interface MotivationalIconProps {
  variant: 'happy' | 'celebrate' | 'thumbsup' | 'heart' | 'rocket' | 'sparkles';
  size?: number;
  animated?: boolean;
}

export const MotivationalIcon: React.FC<MotivationalIconProps> = ({ 
  variant, 
  size = 32,
  animated = false 
}) => {
  const iconConfig = {
    happy: { icon: LucideIcons.Smile, color: colors.secondary.warning },
    celebrate: { icon: LucideIcons.PartyPopper, color: colors.secondary.pink },
    thumbsup: { icon: LucideIcons.ThumbsUp, color: colors.secondary.success },
    heart: { icon: LucideIcons.Heart, color: colors.secondary.pink },
    rocket: { icon: LucideIcons.Rocket, color: colors.secondary.energy },
    sparkles: { icon: LucideIcons.Sparkles, color: colors.secondary.warningLight },
  };

  const config = iconConfig[variant];
  const IconComponent = config.icon;

  return (
    <div className={`inline-flex ${animated ? 'animate-bounce' : ''}`}>
      <IconComponent 
        size={size} 
        style={{ color: config.color }}
        className="drop-shadow-md"
      />
    </div>
  );
};

/**
 * ProgressRing - Circular progress indicator with fun colors
 */
interface ProgressRingProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  showPercentage?: boolean;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({ 
  progress, 
  size = 120,
  strokeWidth = 8,
  color = colors.primary.blue,
  showPercentage = true
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.neutral.gray200}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
          style={{
            filter: `drop-shadow(0 2px 8px ${color}40)`,
          }}
        />
      </svg>
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold" style={{ color }}>
            {Math.round(progress)}%
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * StreakDisplay - Fun streak counter with flame
 */
interface StreakDisplayProps {
  days: number;
  size?: 'small' | 'medium' | 'large';
}

export const StreakDisplay: React.FC<StreakDisplayProps> = ({ days, size = 'medium' }) => {
  const sizeMap = {
    small: { container: 'px-3 py-1.5', icon: 20, text: 'text-sm' },
    medium: { container: 'px-4 py-2', icon: 24, text: 'text-base' },
    large: { container: 'px-6 py-3', icon: 32, text: 'text-lg' },
  };

  const config = sizeMap[size];

  return (
    <div 
      className={`inline-flex items-center gap-2 rounded-full font-bold text-white shadow-lg ${config.container}`}
      style={{ background: gradients.cardYellow }}
    >
      <LucideIcons.Flame size={config.icon} className="animate-pulse" fill="white" />
      <span className={config.text}>{days} day streak!</span>
    </div>
  );
};

/**
 * XPCounter - Experience points display
 */
interface XPCounterProps {
  xp: number;
  animated?: boolean;
}

export const XPCounter: React.FC<XPCounterProps> = ({ xp, animated = false }) => {
  return (
    <div 
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-white shadow-lg ${animated ? 'animate-bounce' : ''}`}
      style={{ background: gradients.cardPurple }}
    >
      <LucideIcons.Zap size={20} fill="white" />
      <span>+{xp} XP</span>
    </div>
  );
};

/**
 * LevelBadge - User level indicator
 */
interface LevelBadgeProps {
  level: number;
  size?: number;
}

export const LevelBadge: React.FC<LevelBadgeProps> = ({ level, size = 60 }) => {
  return (
    <div 
      className="relative inline-flex items-center justify-center rounded-2xl font-bold text-white shadow-lg"
      style={{ 
        width: size, 
        height: size,
        background: gradients.cardBlue 
      }}
    >
      <div className="text-center">
        <div className="text-xs opacity-80">LVL</div>
        <div className="text-xl">{level}</div>
      </div>
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse" />
    </div>
  );
};

/**
 * AchievementCard - Collectible achievement card
 */
interface AchievementCardProps {
  title: string;
  description: string;
  icon: 'trophy' | 'star' | 'gem' | 'crown';
  unlocked?: boolean;
  progress?: number;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({ 
  title, 
  description, 
  icon,
  unlocked = false,
  progress = 0
}) => {
  return (
    <div className={`p-4 rounded-2xl shadow-lg transition-all duration-300 ${unlocked ? 'bg-white' : 'bg-gray-100'}`}>
      <div className="flex items-start gap-3">
        <RewardBadge 
          type={icon === 'crown' ? 'trophy' : icon} 
          size={48} 
          glow={unlocked}
          animated={unlocked}
        />
        <div className="flex-1">
          <h4 className={`font-bold ${unlocked ? 'text-gray-900' : 'text-gray-400'}`}>
            {title}
          </h4>
          <p className={`text-sm ${unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
            {description}
          </p>
          {!unlocked && progress > 0 && (
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${progress}%`,
                  background: gradients.cardBlue 
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
