// creates a wrapper that automatically adjusts padding and max-width based on screen size
// use like this: <ResponsiveContainer maxWidth="7xl" padding="md" />

import React from 'react';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({ 
  children, 
  className = '', 
  maxWidth = '7xl',
  padding = 'md'
}) => {
  const paddingClasses = {
    none: '',
    sm: 'px-4 sm:px-6',
    md: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-4 sm:px-6 lg:px-8 xl:px-12',
    xl: 'px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16',
  };

  return (
    <div className={`w-full mx-auto ${paddingClasses[padding]} ${className}`}>
      <div className={`max-w-${maxWidth} mx-auto`}>
        {children}
      </div>
    </div>
  );
};

export default ResponsiveContainer; 