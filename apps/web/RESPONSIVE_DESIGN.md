# Responsive Design Guide for Dormease Web Platform

## Overview

This guide covers responsive design implementation for the Dormease web platform, ensuring optimal user experience across all devices: desktop, tablet, and mobile.

## Breakpoints

Our responsive system uses the following breakpoints (matching Tailwind CSS):

- **xs**: 475px+ (Small phones)
- **sm**: 640px+ (Large phones)
- **md**: 768px+ (Tablets)
- **lg**: 1024px+ (Small laptops)
- **xl**: 1280px+ (Large laptops)
- **2xl**: 1536px+ (Desktop)
- **3xl**: 1920px+ (Large desktop)

## Responsive Components

### 1. ResponsiveContainer

Provides consistent padding and max-width across all screen sizes.

```tsx
import ResponsiveContainer from '../components/ResponsiveContainer';

<ResponsiveContainer maxWidth="7xl" padding="lg">
  <h1>Your Content</h1>
</ResponsiveContainer>
```

**Props:**
- `maxWidth`: Controls maximum width ('sm' to '9xl' or 'full')
- `padding`: Controls horizontal padding ('none', 'sm', 'md', 'lg', 'xl')

### 2. ResponsiveGrid

Automatically adjusts columns based on screen size.

```tsx
import ResponsiveGrid from '../components/ResponsiveGrid';

<ResponsiveGrid 
  cols={{ xs: 1, sm: 2, lg: 3 }}
  gap="lg"
>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</ResponsiveGrid>
```

**Props:**
- `cols`: Object defining columns for each breakpoint
- `gap`: Spacing between grid items

### 3. ResponsiveCard

Adaptive card component with responsive padding and variants.

```tsx
import ResponsiveCard from '../components/ResponsiveCard';

<ResponsiveCard variant="elevated" padding="lg" hover={true}>
  <h3>Card Title</h3>
  <p>Card content</p>
</ResponsiveCard>
```

**Props:**
- `variant`: 'default', 'elevated', 'outlined'
- `padding`: 'none', 'sm', 'md', 'lg'
- `hover`: Enable/disable hover effects

### 4. ResponsiveNavigation

Mobile-first navigation with hamburger menu for small screens.

```tsx
import ResponsiveNavigation from '../components/ResponsiveNavigation';

<ResponsiveNavigation />
```

### 5. ResponsiveImage

Optimized image loading with responsive sizing.

```tsx
import ResponsiveImage from '../components/ResponsiveImage';

<ResponsiveImage
  src="/image.jpg"
  alt="Description"
  fill
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

## Responsive Hooks

### useResponsive

Provides current breakpoint and screen dimensions.

```tsx
import { useResponsive } from '../hooks/useResponsive';

const { currentBreakpoint, width, isMd, isLg } = useResponsive();

if (isMd) {
  // Tablet-specific logic
}
```

### useBreakpoint

Check if a specific breakpoint is active.

```tsx
import { useBreakpoint } from '../hooks/useResponsive';

const isMobile = useBreakpoint('md'); // Returns true if screen < 768px
```

### useResponsiveValue

Get responsive values based on current breakpoint.

```tsx
import { useResponsiveValue } from '../hooks/useResponsive';

const fontSize = useResponsiveValue({
  xs: 'text-sm',
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-xl'
}, 'text-base');
```

## Responsive Utilities

### Typography Scale

```tsx
import { TYPOGRAPHY } from '../utils/responsive';

// Use predefined responsive typography classes
<h1 className={`${TYPOGRAPHY.h1.xs} ${TYPOGRAPHY.h1.sm} ${TYPOGRAPHY.h1.md}`}>
  Responsive Heading
</h1>
```

### Spacing Scale

```tsx
import { SPACING } from '../utils/responsive';

// Consistent spacing across breakpoints
<div style={{ margin: SPACING.lg }}>
  Content with consistent spacing
</div>
```

## Best Practices

### 1. Mobile-First Approach

Always start with mobile design and scale up:

```tsx
// ❌ Don't do this
<div className="hidden md:block">Desktop Only</div>

// ✅ Do this instead
<div className="block md:hidden">Mobile First</div>
```

### 2. Flexible Layouts

Use flexbox and grid for responsive layouts:

```tsx
<div className="flex flex-col md:flex-row gap-4">
  <div className="w-full md:w-1/2">Left Column</div>
  <div className="w-full md:w-1/2">Right Column</div>
</div>
```

### 3. Responsive Typography

Scale text sizes appropriately:

```tsx
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
  Responsive Heading
</h1>
```

### 4. Touch-Friendly Design

Ensure touch targets are at least 44px on mobile:

```tsx
<button className="min-h-[44px] px-4 py-2">
  Touch-friendly button
</button>
```

### 5. Performance Optimization

Use responsive images and lazy loading:

```tsx
<ResponsiveImage
  src="/hero.jpg"
  alt="Hero"
  fill
  priority={true}
  sizes="100vw"
/>
```

## Testing Responsiveness

### 1. Browser DevTools

- Use Chrome DevTools device toolbar
- Test various device sizes
- Check orientation changes

### 2. Real Devices

- Test on actual phones and tablets
- Check touch interactions
- Verify performance on slower devices

### 3. Cross-Browser Testing

- Test on Chrome, Firefox, Safari, Edge
- Check mobile browsers (iOS Safari, Chrome Mobile)

## Common Patterns

### Hero Section

```tsx
<section className="py-8 sm:py-12 lg:py-20">
  <ResponsiveContainer>
    <div className="text-center">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold">
        Main Heading
      </h1>
      <p className="text-lg sm:text-xl lg:text-2xl mt-4">
        Subtitle text
      </p>
    </div>
  </ResponsiveContainer>
</section>
```

### Feature Grid

```tsx
<ResponsiveGrid cols={{ xs: 1, sm: 2, lg: 3 }} gap="lg">
  {features.map(feature => (
    <ResponsiveCard key={feature.id}>
      <h3 className="text-lg sm:text-xl font-semibold">{feature.title}</h3>
      <p className="text-sm sm:text-base">{feature.description}</p>
    </ResponsiveCard>
  ))}
</ResponsiveGrid>
```

### Navigation

```tsx
<nav className="bg-darkest">
  <ResponsiveContainer>
    <div className="flex items-center justify-between h-16">
      <div className="hidden md:block">
        {/* Desktop navigation */}
      </div>
      <div className="md:hidden">
        {/* Mobile menu button */}
      </div>
    </div>
  </ResponsiveContainer>
</nav>
```

## Troubleshooting

### Common Issues

1. **Content overflow**: Use `overflow-hidden` and proper container constraints
2. **Text too small**: Ensure minimum font sizes for readability
3. **Touch targets too small**: Use `min-h-[44px]` for buttons
4. **Layout breaks**: Test edge cases and use flexible layouts

### Debug Tools

- Browser responsive design mode
- CSS Grid/Flexbox inspectors
- Performance profiling tools

## Resources

- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [MDN Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Google Mobile-First Indexing](https://developers.google.com/search/mobile-sites/mobile-first-indexing) 