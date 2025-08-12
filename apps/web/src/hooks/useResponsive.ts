// provide react hooks that gives real-time info about screen size
//use like this: const { currentBreakpoint, width, isMd, isLg } = useResponsive();
//              if (isMd) {
//                   // Do something specific for tablet screens
//              }


'use client';

import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '../utils/responsive';

type Breakpoint = keyof typeof BREAKPOINTS;

interface ResponsiveState {
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  is2xl: boolean;
  is3xl: boolean;
  currentBreakpoint: Breakpoint;
  width: number;
}

export const useResponsive = (): ResponsiveState => {
  const [responsiveState, setResponsiveState] = useState<ResponsiveState>({
    isXs: false,
    isSm: false,
    isMd: false,
    isLg: false,
    isXl: false,
    is2xl: false,
    is3xl: false,
    currentBreakpoint: 'xs',
    width: 0,
  });

  useEffect(() => {
    const updateResponsiveState = () => {
      const width = window.innerWidth;
      
      let currentBreakpoint: Breakpoint = 'xs';
      
      if (width >= BREAKPOINTS['3xl']) {
        currentBreakpoint = '3xl';
      } else if (width >= BREAKPOINTS['2xl']) {
        currentBreakpoint = '2xl';
      } else if (width >= BREAKPOINTS.xl) {
        currentBreakpoint = 'xl';
      } else if (width >= BREAKPOINTS.lg) {
        currentBreakpoint = 'lg';
      } else if (width >= BREAKPOINTS.md) {
        currentBreakpoint = 'md';
      } else if (width >= BREAKPOINTS.sm) {
        currentBreakpoint = 'sm';
      }

      setResponsiveState({
        isXs: width >= BREAKPOINTS.xs,
        isSm: width >= BREAKPOINTS.sm,
        isMd: width >= BREAKPOINTS.md,
        isLg: width >= BREAKPOINTS.lg,
        isXl: width >= BREAKPOINTS.xl,
        is2xl: width >= BREAKPOINTS['2xl'],
        is3xl: width >= BREAKPOINTS['3xl'],
        currentBreakpoint,
        width,
      });
    };

    // Set initial state
    updateResponsiveState();

    // Add event listener
    window.addEventListener('resize', updateResponsiveState);

    // Cleanup
    return () => window.removeEventListener('resize', updateResponsiveState);
  }, []);

  return responsiveState;
};

// Hook for specific breakpoint queries
export const useBreakpoint = (breakpoint: Breakpoint): boolean => {
  const { width } = useResponsive();
  return width >= BREAKPOINTS[breakpoint];
};

// Hook for responsive values
export const useResponsiveValue = <T>(
  values: Partial<Record<Breakpoint, T>>,
  defaultValue: T
): T => {
  const { currentBreakpoint } = useResponsive();
  
  // Find the best matching value for current breakpoint
  const breakpoints: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];
  const currentIndex = breakpoints.indexOf(currentBreakpoint);
  
  // Look for the closest breakpoint with a value
  for (let i = currentIndex; i >= 0; i--) {
    const bp = breakpoints[i];
    if (values[bp] !== undefined) {
      return values[bp]!;
    }
  }
  
  return defaultValue;
}; 