import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'blue' | 'yellow';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
}) => {
  const { mode } = useApp();
  const useShadow = !mode.lowBandwidth;

  const getVariantClasses = () => {
    switch (variant) {
      case 'blue':
        return 'bg-[#0066FF] text-white';
      case 'yellow':
        return 'bg-[#FFD600] text-black';
      default:
        return 'bg-card border border-border';
    }
  };

  return (
    <div
      className={`rounded-lg p-6 ${getVariantClasses()} ${
        useShadow ? 'shadow-md' : ''
      } transition-all hover:scale-105`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p
            className={`text-sm mb-1 ${
              variant === 'default' ? 'text-muted-foreground' : 'opacity-90'
            }`}
          >
            {title}
          </p>
          <h2
            className={`${
              mode.frontline ? 'text-5xl' : mode.compact ? 'text-3xl' : 'text-4xl'
            }`}
          >
            {value.toLocaleString()}
          </h2>
        </div>
        {Icon && (
          <div
            className={`p-3 rounded-lg ${
              variant === 'default'
                ? 'bg-[#FFD600]/10'
                : variant === 'blue'
                ? 'bg-white/20'
                : 'bg-black/10'
            }`}
          >
            <Icon
              className={`w-6 h-6 ${
                variant === 'default' ? 'text-[#FFD600]' : ''
              }`}
            />
          </div>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="flex items-center gap-2">
          {trend && (
            <span
              className={`text-sm ${
                trend.isPositive
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </span>
          )}
          {subtitle && (
            <span
              className={`text-sm ${
                variant === 'default' ? 'text-muted-foreground' : 'opacity-80'
              }`}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
