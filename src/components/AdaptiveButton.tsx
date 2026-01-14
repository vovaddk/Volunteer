import React from 'react';
import { useApp } from '../contexts/AppContext';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface AdaptiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const AdaptiveButton: React.FC<AdaptiveButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  disabled,
  ...props
}) => {
  const { mode } = useApp();

  const getBaseClasses = () => {
    const classes = [
      'inline-flex items-center justify-center gap-2',
      'rounded-lg transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
    ];

    // Full width option
    if (fullWidth) {
      classes.push('w-full');
    }

    return classes.join(' ');
  };

  const getSizeClasses = () => {
    if (mode.compact || mode.frontline) {
      // Compact/frontline mode - larger touch targets
      switch (size) {
        case 'sm':
          return 'px-4 py-2 min-h-[40px]';
        case 'md':
          return 'px-6 py-3 min-h-[48px]';
        case 'lg':
          return 'px-8 py-4 min-h-[56px]';
        case 'xl':
          return 'px-10 py-5 min-h-[64px]';
      }
    } else {
      // Normal mode
      switch (size) {
        case 'sm':
          return 'px-3 py-1.5 min-h-[32px]';
        case 'md':
          return 'px-4 py-2 min-h-[40px]';
        case 'lg':
          return 'px-6 py-3 min-h-[48px]';
        case 'xl':
          return 'px-8 py-4 min-h-[56px]';
      }
    }
  };

  const getVariantClasses = () => {
    const useShadow = !mode.lowBandwidth;

    switch (variant) {
      case 'primary':
        return `bg-[#FFD600] text-black hover:bg-[#FFED4E] active:bg-[#C7A600] focus:ring-[#FFD600] ${
          useShadow ? 'shadow-md hover:shadow-lg' : ''
        }`;
      case 'secondary':
        return `bg-[#0066FF] text-white hover:bg-[#4D94FF] active:bg-[#0052CC] focus:ring-[#0066FF] ${
          useShadow ? 'shadow-md hover:shadow-lg' : ''
        }`;
      case 'outline':
        return 'border-2 border-current bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 focus:ring-gray-400';
      case 'ghost':
        return 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-400';
      case 'danger':
        return `bg-[#FF3B30] text-white hover:bg-red-600 active:bg-red-700 focus:ring-red-500 ${
          useShadow ? 'shadow-md hover:shadow-lg' : ''
        }`;
      default:
        return '';
    }
  };

  return (
    <button
      className={`${getBaseClasses()} ${getSizeClasses()} ${getVariantClasses()} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
