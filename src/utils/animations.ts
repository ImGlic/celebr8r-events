
import { CSSProperties } from 'react';

type AnimationVariant = 'fadeIn' | 'slideIn' | 'scaleIn' | 'float';

interface AnimationProps {
  duration?: number;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'out-expo' | 'in-expo';
}

export const getAnimation = (
  variant: AnimationVariant, 
  { 
    duration = 0.4, 
    delay = 0, 
    direction = 'up',
    easing = 'ease-out'
  }: AnimationProps = {}
): CSSProperties => {
  
  const baseStyle: CSSProperties = {
    animationDuration: `${duration}s`,
    animationFillMode: 'both',
    animationDelay: `${delay}s`,
    animationTimingFunction: easing,
  };

  switch (variant) {
    case 'fadeIn':
      return {
        ...baseStyle,
        animationName: 'fade-in',
      };
    
    case 'slideIn':
      let animationName = 'slide-in-up';
      if (direction === 'right') animationName = 'slide-in-right';
      else if (direction === 'left') animationName = 'slide-out-left';
      
      return {
        ...baseStyle,
        animationName,
      };
    
    case 'scaleIn':
      return {
        ...baseStyle,
        animationName: 'scale-in',
      };

    case 'float':
      return {
        ...baseStyle,
        animationName: 'float',
        animationDuration: '4s',
        animationIterationCount: 'infinite',
      };
    
    default:
      return {};
  }
};

export const staggerChildren = (count: number, baseDelay: number = 0.05): string => {
  let styles = '';
  for (let i = 0; i < count; i++) {
    styles += `
      & > *:nth-child(${i + 1}) {
        animation-delay: ${baseDelay * i}s;
      }
    `;
  }
  return styles;
};
