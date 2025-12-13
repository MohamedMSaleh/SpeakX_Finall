# SpeakX Responsive Design Guide

## Overview
SpeakX implements a **mobile-first** responsive design system that adapts seamlessly across all device sizes, from small phones (320px) to large desktops (1920px+).

## Breakpoints

```typescript
sm: 640px   // Small devices (phones in landscape, small tablets)
md: 768px   // Medium devices (tablets)
lg: 1024px  // Large devices (laptops)
xl: 1280px  // Extra large devices (desktops)
2xl: 1536px // 2X large devices (large desktops)
```

## Device Categories

- **Mobile**: < 768px (phones in portrait/landscape)
- **Tablet**: 768px - 1023px (iPads, Android tablets)
- **Desktop**: ≥ 1024px (laptops, desktops, large screens)

## Core Principles

### 1. Mobile-First Approach
- Design for mobile first, then enhance for larger screens
- Base styles apply to mobile, use `md:` and `lg:` prefixes for larger screens
- Touch targets minimum 44x44px (WCAG 2.1 compliance)

### 2. Progressive Enhancement
- Core functionality works on all devices
- Enhanced features for larger screens (hover effects, multi-column layouts)
- Graceful degradation for smaller screens

### 3. Performance
- Smaller images/assets on mobile
- Reduced animations on low-power devices
- Optimized font sizes and spacing

## Responsive Utilities

### Hooks

```typescript
import { useIsMobile, useDeviceType, useWindowSize } from '../utils/responsive';

// Check if device is mobile
const isMobile = useIsMobile(); // true if < 768px

// Get device type
const deviceType = useDeviceType(); // 'mobile' | 'tablet' | 'desktop'

// Get window dimensions
const { width, height } = useWindowSize();

// Check for touch device
const isTouch = useIsTouchDevice();
```

### Spacing Classes

```typescript
// Padding (mobile → tablet → desktop)
responsivePadding.xs // p-3 md:p-4 lg:p-5
responsivePadding.sm // p-4 md:p-5 lg:p-6
responsivePadding.md // p-5 md:p-6 lg:p-8
responsivePadding.lg // p-6 md:p-8 lg:p-10
responsivePadding.xl // p-8 md:p-10 lg:p-12

// Gap
responsiveGap.xs // gap-2 md:gap-3 lg:gap-4
responsiveGap.sm // gap-3 md:gap-4 lg:gap-5
responsiveGap.md // gap-4 md:gap-5 lg:gap-6
responsiveGap.lg // gap-5 md:gap-6 lg:gap-8
responsiveGap.xl // gap-6 md:gap-8 lg:gap-10
```

### Typography

```typescript
fontSize.xs   // text-xs
fontSize.sm   // text-sm md:text-base
fontSize.base // text-base md:text-lg
fontSize.lg   // text-lg md:text-xl
fontSize.xl   // text-xl md:text-2xl
fontSize.2xl  // text-2xl md:text-3xl
fontSize.3xl  // text-3xl md:text-4xl
fontSize.4xl  // text-4xl md:text-5xl
```

### Grid Layouts

```typescript
gridCols.responsive // grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
gridCols.cards      // grid-cols-2 md:grid-cols-3 lg:grid-cols-4
gridCols.feature    // grid-cols-1 md:grid-cols-2 lg:grid-cols-3
gridCols.split      // grid-cols-1 lg:grid-cols-2
```

### Button Sizes

```typescript
buttonSizes.sm // px-3 py-2 text-sm md:px-4 md:py-2.5
buttonSizes.md // px-4 py-3 text-base md:px-6 md:py-3.5
buttonSizes.lg // px-6 py-4 text-lg md:px-8 md:py-5
buttonSizes.xl // px-8 py-5 text-xl md:px-10 md:py-6
```

## Components

### Responsive Layout Components

```tsx
import { ResponsiveContainer, MobileOnly, TabletUp, DesktopOnly } from '../components/ResponsiveLayout';

// Container with auto padding
<ResponsiveContainer maxWidth="xl">
  {/* Content */}
</ResponsiveContainer>

// Conditional rendering
<MobileOnly>
  <MobileMenu />
</MobileOnly>

<TabletUp>
  <DesktopMenu />
</TabletUp>

<DesktopOnly>
  <Sidebar />
</DesktopOnly>
```

### Touch-Friendly Button

```tsx
import { TouchButton } from '../components/ResponsiveLayout';

<TouchButton 
  variant="primary" 
  size="md"
  onClick={handleClick}
>
  Click Me
</TouchButton>
```

### Responsive Card

```tsx
import { ResponsiveCard } from '../components/ResponsiveLayout';

<ResponsiveCard gradient={gradients.cardBlue}>
  {/* Card content */}
</ResponsiveCard>
```

## Implementation Examples

### Dashboard Stats Grid

```tsx
// Mobile: 2 columns, Tablet: 2 columns, Desktop: 4 columns
<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
  {stats.map(stat => (
    <div className="rounded-2xl md:rounded-3xl p-4 md:p-5">
      <Icons.Award size={isMobile ? 14 : 18} />
      <div className="text-xl sm:text-2xl md:text-3xl">{stat.value}</div>
    </div>
  ))}
</div>
```

### Responsive Header

```tsx
<header className="px-3 sm:px-4 md:px-8 py-3 md:py-4">
  <button className="md:hidden min-w-[44px] min-h-[44px]">
    <Icons.Menu size={isMobile ? 20 : 24} />
  </button>
  
  <h1 className="text-lg sm:text-xl md:text-2xl">SpeakX</h1>
  
  <div className="flex gap-1 sm:gap-2 md:gap-3">
    {/* Header actions */}
  </div>
</header>
```

### Practice Cards

```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
  {practices.map(practice => (
    <button className={`
      p-4 md:p-6 
      rounded-2xl md:rounded-3xl 
      h-36 md:h-44 
      min-h-[120px]
      active:scale-95
    `}>
      <div className="w-10 h-10 md:w-14 md:h-14">
        <practice.icon size={isMobile ? 20 : 28} />
      </div>
      <div className="text-sm md:text-base lg:text-lg">
        {practice.title}
      </div>
    </button>
  ))}
</div>
```

## Touch Optimizations

### Touch Targets
- **Minimum size**: 44x44px (Apple HIG, WCAG 2.1)
- **Recommended size**: 48x48px for primary actions
- **Spacing**: 8px minimum between touch targets

### Touch Interactions

```css
/* Disable hover effects on touch devices */
@media (hover: none) and (pointer: coarse) {
  button:hover:not(:disabled) {
    transform: none;
  }
}

/* Use active states instead */
button:active {
  transform: scale(0.95);
}
```

### Implementation

```tsx
// All buttons should include min dimensions and active states
<button className="
  min-w-[44px] 
  min-h-[44px] 
  active:scale-95
  hover:scale-105 /* Only applies on hover-capable devices */
">
  {/* Button content */}
</button>
```

## Safe Areas (Mobile Notches)

```css
/* CSS Variables */
--safe-area-inset-top: env(safe-area-inset-top, 0px);
--safe-area-inset-right: env(safe-area-inset-right, 0px);
--safe-area-inset-bottom: env(safe-area-inset-bottom, 0px);
--safe-area-inset-left: env(safe-area-inset-left, 0px);

/* Usage */
.bottom-nav {
  padding-bottom: env(safe-area-inset-bottom);
}
```

Tailwind class: `pb-safe`

## Viewport Configuration

```html
<meta 
  name="viewport" 
  content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover" 
/>
```

- `viewport-fit=cover`: Extends to safe areas on devices with notches
- `maximum-scale=5.0`: Allows zooming for accessibility
- `user-scalable=yes`: Enables pinch-to-zoom

## Dynamic Viewport Height

```css
/* Use dvh instead of vh for mobile browsers */
body {
  min-height: 100vh;
  min-height: 100dvh; /* Dynamic viewport height */
}
```

## Testing Checklist

### Screen Sizes
- [ ] 320px (iPhone SE)
- [ ] 375px (iPhone 12/13)
- [ ] 390px (iPhone 14 Pro)
- [ ] 414px (iPhone 14 Pro Max)
- [ ] 768px (iPad portrait)
- [ ] 1024px (iPad landscape)
- [ ] 1280px (Small laptop)
- [ ] 1920px (Desktop)

### Device Testing
- [ ] iOS Safari
- [ ] Android Chrome
- [ ] Desktop Chrome
- [ ] Desktop Firefox
- [ ] Desktop Safari

### Touch Testing
- [ ] All buttons ≥ 44x44px
- [ ] Touch targets have spacing
- [ ] Active states work
- [ ] No hover-only functionality
- [ ] Swipe gestures work
- [ ] Scroll is smooth

### Layout Testing
- [ ] No horizontal scroll
- [ ] Content fits viewport
- [ ] Bottom nav doesn't overlap content
- [ ] Safe areas respected
- [ ] Text is readable (min 16px on mobile)
- [ ] Images scale properly

## Common Patterns

### Responsive Section

```tsx
<section className={`
  ${responsivePadding.md}
  space-y-4 md:space-y-6
  pb-24 md:pb-8  /* Extra padding on mobile for bottom nav */
`}>
  <h2 className="text-xl md:text-2xl lg:text-3xl font-black">
    Section Title
  </h2>
  
  <div className={gridCols.responsive}>
    {items.map(item => (
      <ResponsiveCard key={item.id}>
        {/* Card content */}
      </ResponsiveCard>
    ))}
  </div>
</section>
```

### Responsive Navigation

```tsx
// Mobile: Bottom nav
// Desktop: Sidebar or top nav

<MobileOnly>
  <div className="fixed bottom-0 left-0 right-0 pb-safe">
    <BottomNav />
  </div>
</MobileOnly>

<TabletUp>
  <div className="sticky top-0">
    <TopNav />
  </div>
</TabletUp>
```

### Responsive Modal/Sheet

```tsx
// Mobile: Full screen or bottom sheet
// Desktop: Centered modal

<div className={`
  fixed inset-0 md:inset-auto
  md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
  w-full md:w-auto md:max-w-lg
  h-full md:h-auto md:max-h-[90vh]
  rounded-none md:rounded-3xl
`}>
  {/* Modal content */}
</div>
```

## Performance Tips

1. **Lazy load images** on mobile
2. **Reduce animations** for low-power devices
3. **Use smaller icon sizes** on mobile
4. **Optimize fonts** with variable fonts
5. **Code split** large components
6. **Use CSS animations** instead of JS

## Accessibility

- Maintain color contrast ratios (WCAG AA: 4.5:1)
- Ensure text is readable (min 16px on mobile)
- Support pinch-to-zoom
- Provide skip links
- Test with screen readers
- Keyboard navigation on desktop

## Resources

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design - Layout](https://material.io/design/layout/responsive-layout-grid.html)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
