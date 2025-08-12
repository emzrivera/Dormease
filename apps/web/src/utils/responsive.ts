// provides constants and helper functions for consistent responsive design.

// responsive breakpoints (matching Tailwind config)
export const BREAKPOINTS = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920,
} as const;

// responsive spacing scale
export const SPACING = {
  xs: '0.5rem',    // 8px
  sm: '1rem',      // 16px
  md: '1.5rem',    // 24px
  lg: '2rem',      // 32px
  xl: '3rem',      // 48px
  '2xl': '4rem',   // 64px
  '3xl': '6rem',   // 96px
} as const;

// responsive typography scale
export const TYPOGRAPHY = {
  h1: {
    xs: 'text-2xl',    // 24px
    sm: 'text-3xl',    // 30px
    md: 'text-4xl',    // 36px
    lg: 'text-5xl',    // 48px
    xl: 'text-6xl',    // 60px
  },
  h2: {
    xs: 'text-xl',     // 20px
    sm: 'text-2xl',    // 24px
    md: 'text-3xl',    // 30px
    lg: 'text-4xl',    // 36px
    xl: 'text-5xl',    // 48px
  },
  body: {
    xs: 'text-sm',     // 14px
    sm: 'text-base',   // 16px
    md: 'text-lg',     // 18px
    lg: 'text-xl',     // 20px
    xl: 'text-2xl',    // 24px
  },
} as const;

// responsive grid columns
export const GRID_COLS = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5,
  '2xl': 6,
} as const;

// utility function to get responsive class
export const getResponsiveClass = (
  baseClass: string,
  responsiveVariants: Record<string, string>
): string => {
  const classes = [baseClass];
  
  Object.entries(responsiveVariants).forEach(([breakpoint, variant]) => {
    if (breakpoint === 'base') {
      classes[0] = variant;
    } else {
      classes.push(`${breakpoint}:${variant}`);
    }
  });
  
  return classes.join(' ');
};

// hook for responsive values (if you want to use it in components)
export const useResponsiveValue = <T>(
  values: {
    xs?: T;
    sm?: T;
    md?: T;
    lg?: T;
    xl?: T;
    '2xl'?: T;
  },
  defaultValue: T
): T => {
  // This is a placeholder - in a real implementation, you'd use a hook like useMediaQuery
  // For now, return the default value
  return defaultValue;
};

// Media query helpers
export const MEDIA_QUERIES = {
  xs: `@media (min-width: ${BREAKPOINTS.xs}px)`,
  sm: `@media (min-width: ${BREAKPOINTS.sm}px)`,
  md: `@media (min-width: ${BREAKPOINTS.md}px)`,
  lg: `@media (min-width: ${BREAKPOINTS.lg}px)`,
  xl: `@media (min-width: ${BREAKPOINTS.xl}px)`,
  '2xl': `@media (min-width: ${BREAKPOINTS['2xl']}px)`,
  '3xl': `@media (min-width: ${BREAKPOINTS['3xl']}px)`,
} as const; 