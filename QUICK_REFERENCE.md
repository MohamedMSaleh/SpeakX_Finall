# SpeakX Design System - Quick Reference

## 🎨 Import Guide

### Design Tokens
```tsx
import { colors, gradients, shadows, borderRadius } from './styles/designSystem';
```

### Decorative Components
```tsx
import { 
  GradientBackground,    // Gradient container with floating shapes
  FloatingShapes,        // Animated background blobs
  GlowingOrb,           // Glowing circular element
  WaveDecoration,       // Wave divider
  BlobShape             // Organic SVG shape
} from './components/DecorativeElements';
```

### Reward Components
```tsx
import { 
  RewardBadge,          // Collectible badges
  StreakDisplay,        // Streak counter
  XPCounter,            // XP display
  LevelBadge,           // Level indicator
  ProgressRing,         // Circular progress
  AchievementCard       // Achievement display
} from './components/RewardElements';
```

### Animation Components
```tsx
import { 
  Confetti,             // Celebration confetti
  Sparkles,             // Sparkle effects
  ProgressBar,          // Animated progress bar
  PopIn,                // Entrance animation
  SuccessAnimation,     // Success modal
  BounceWrapper,        // Bounce animation
  PulseGlow,            // Pulsing glow
  CountUp               // Number count-up
} from './components/MicroInteractions';
```

---

## 🎨 Common Patterns

### Full Page Layout
```tsx
<GradientBackground variant="primary" className="h-full">
  <div className="p-6 space-y-6">
    {/* Content */}
  </div>
</GradientBackground>
```

### Card with Glow
```tsx
<div className="relative bg-white rounded-3xl p-6 shadow-lg overflow-hidden">
  <GlowingOrb color={colors.primary.blue} size={150} className="-right-12 -top-12" />
  <div className="relative z-10">
    {/* Content */}
  </div>
</div>
```

### Gradient Button
```tsx
<button
  className="px-6 py-3 rounded-2xl font-bold text-white shadow-lg hover:scale-105 active:scale-95 transition-all"
  style={{ background: gradients.cardBlue }}
>
  Click Me
</button>
```

### Progress Display
```tsx
<ProgressBar 
  progress={75} 
  gradient={gradients.cardBlue} 
  height={12} 
  showLabel 
  animated 
/>
```

### Animated Entrance
```tsx
<PopIn delay={100}>
  <div className="...">
    {/* Content appears with animation */}
  </div>
</PopIn>
```

### Success Celebration
```tsx
const [showSuccess, setShowSuccess] = useState(false);
const [showConfetti, setShowConfetti] = useState(false);

// Trigger on action
setShowConfetti(true);
setShowSuccess(true);

// Components
<Confetti active={showConfetti} duration={3000} />
<SuccessAnimation show={showSuccess} onComplete={() => setShowSuccess(false)} />
```

---

## 🎨 Color Usage

### Primary Actions
```tsx
style={{ background: gradients.cardBlue }}
// Use for: Main buttons, primary actions, important elements
```

### Success/Achievements
```tsx
style={{ background: gradients.cardGreen }}
// Use for: Completions, successes, achievements, positive feedback
```

### Warnings/Streaks
```tsx
style={{ background: gradients.cardYellow }}
// Use for: Streaks, warnings, attention-grabbing elements
```

### Progress/Energy
```tsx
style={{ background: gradients.cardPurple }}
// Use for: Progress, energy, secondary actions
```

### Special/Rewards
```tsx
style={{ background: gradients.cardPink }}
// Use for: Special rewards, premium features, celebrations
```

---

## 🎨 Badge Types

```tsx
<RewardBadge type="streak" size={48} glow animated />    // Flame icon - for streaks
<RewardBadge type="level" size={48} glow />              // Award icon - for levels
<RewardBadge type="achievement" size={48} />             // Trophy - for achievements
<RewardBadge type="star" size={48} count={3} />          // Star - for ratings
<RewardBadge type="trophy" size={48} glow animated />    // Crown - for champions
<RewardBadge type="gem" size={48} />                     // Gem - for currency
```

---

## 🎨 Animation Triggers

### On Mount
```tsx
<PopIn delay={0}>
  <div>Appears on mount</div>
</PopIn>
```

### On State Change
```tsx
const [trigger, setTrigger] = useState(false);

<BounceWrapper trigger={trigger}>
  <div>Bounces when trigger changes</div>
</BounceWrapper>
```

### On User Action
```tsx
const handleClick = () => {
  setShowConfetti(true);
  setTimeout(() => setShowConfetti(false), 3000);
};
```

---

## 🎨 Spacing Scale

```tsx
gap-2    // 8px
gap-3    // 12px
gap-4    // 16px
gap-5    // 20px
gap-6    // 24px
gap-8    // 32px

p-4      // 16px padding
p-5      // 20px padding
p-6      // 24px padding
p-8      // 32px padding
```

---

## 🎨 Border Radius

```tsx
rounded-xl     // 12px - small cards
rounded-2xl    // 16px - medium cards, buttons
rounded-3xl    // 24px - large cards, containers
rounded-full   // 9999px - circular elements
```

---

## 🎨 Shadows

```tsx
shadow-sm      // Subtle shadow
shadow-md      // Medium shadow
shadow-lg      // Large shadow
shadow-xl      // Extra large shadow
shadow-2xl     // Maximum shadow
```

---

## 🎨 Text Styles

```tsx
font-medium    // 500 weight - body text
font-bold      // 700 weight - emphasis
font-black     // 900 weight - headings

text-sm        // 14px
text-base      // 16px
text-lg        // 18px
text-xl        // 20px
text-2xl       // 24px
text-3xl       // 30px
text-4xl       // 36px
```

---

## 🎨 Hover Effects

```tsx
hover:scale-105         // Slight grow on hover
hover:shadow-xl         // Shadow grows on hover
hover:bg-gray-100       // Background changes
active:scale-95         // Shrink on click
transition-all          // Smooth transitions
duration-300            // 300ms animation
```

---

## 🎨 Responsive Design

```tsx
// Mobile first
<div className="p-4 md:p-6 lg:p-8">

// Hide on mobile
<div className="hidden md:block">

// Grid responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
```

---

## 🎨 Z-Index Layers

```
1. Background decorations: z-0 (default)
2. Content: z-10
3. Sticky headers: z-20
4. Modals/Overlays: z-50
5. Toasts/Notifications: z-60
```

---

## 🎨 Common Utilities

```tsx
// Gradient text
className="gradient-text"

// Glass effect
className="glass-effect"

// Card shadow
className="card-shadow"

// Safe area padding
className="pb-safe"
```

---

## ⚡ Performance Tips

1. Use CSS animations over JS when possible
2. Limit active animations to visible area
3. Use `transform` instead of position changes
4. Batch state updates
5. Memoize expensive components

---

## 📱 Mobile Considerations

1. Min button size: 44x44px
2. Use backdrop-blur sparingly
3. Test on actual devices
4. Consider reduced-motion preferences
5. Optimize for touch gestures

---

## 🎯 Best Practices

✅ **DO:**
- Use design tokens (colors, gradients)
- Add micro-interactions to all actions
- Celebrate user achievements
- Layer backgrounds for depth
- Maintain consistency

❌ **DON'T:**
- Use plain white backgrounds
- Skip animations on interactive elements
- Overuse heavy animations
- Ignore mobile users
- Forget accessibility

---

Made with ❤️ for SpeakX
