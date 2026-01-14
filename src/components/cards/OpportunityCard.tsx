import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Clock, MapPin, Users, Wifi, WifiOff, Flame } from 'lucide-react';
import { AdaptiveButton } from '../AdaptiveButton';

export type Opportunity = {
  id: string;
  title: string;
  organization: string;
  category: string;
  location: 'frontline' | 'rear' | 'deoccupied' | 'online';
  format: 'online' | 'offline';
  urgent: boolean;
  date: string;
  imageUrl?: string;
  description: string;
  volunteersNeeded: number;
};

interface OpportunityCardProps {
  opportunity: Opportunity;
  onSelect?: (id: string) => void;
  variant?: 'normal' | 'compact';
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  onSelect,
  variant: variantProp,
}) => {
  const { mode } = useApp();
  
  const variant = variantProp || (mode.compact ? 'compact' : 'normal');
  const useShadow = !mode.lowBandwidth;
  const showImages = !mode.lowBandwidth && variant === 'normal';

  const getLocationColor = () => {
    switch (opportunity.location) {
      case 'frontline':
        return 'text-red-600 dark:text-red-400';
      case 'rear':
        return 'text-green-600 dark:text-green-400';
      case 'deoccupied':
        return 'text-orange-600 dark:text-orange-400';
      case 'online':
        return 'text-blue-600 dark:text-blue-400';
    }
  };

  if (variant === 'compact' || mode.lowBandwidth) {
    return (
      <div
        className={`bg-card border border-border rounded-lg p-4 hover:border-[#FFD600] transition-colors cursor-pointer ${
          useShadow ? 'shadow-sm hover:shadow-md' : ''
        }`}
        onClick={() => onSelect?.(opportunity.id)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {opportunity.urgent && (
                <Flame className="w-4 h-4 text-[#FF3B30] flex-shrink-0" />
              )}
              {opportunity.format === 'online' ? (
                <Wifi className="w-4 h-4 text-[#0066FF] flex-shrink-0" />
              ) : (
                <WifiOff className="w-4 h-4 text-gray-500 flex-shrink-0" />
              )}
              <span className="text-xs text-muted-foreground">{opportunity.category}</span>
            </div>
            
            <h3 className="mb-2 line-clamp-2">{opportunity.title}</h3>
            
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span className={getLocationColor()}>{opportunity.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{opportunity.date}</span>
              </div>
            </div>
          </div>

          {opportunity.urgent && (
            <span className="px-2 py-1 bg-[#FF3B30] text-white text-xs rounded flex-shrink-0">
              Urgent
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-card border border-border rounded-lg overflow-hidden hover:border-[#FFD600] transition-all cursor-pointer ${
        useShadow ? 'shadow-md hover:shadow-lg' : ''
      }`}
      onClick={() => onSelect?.(opportunity.id)}
    >
      {showImages && opportunity.imageUrl && (
        <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
          <img
            src={opportunity.imageUrl}
            alt={opportunity.title}
            className="w-full h-full object-cover"
          />
          {opportunity.urgent && (
            <div className="absolute top-3 right-3 px-3 py-1.5 bg-[#FF3B30] text-white rounded-md flex items-center gap-1.5">
              <Flame className="w-4 h-4" />
              <span>Urgent</span>
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          {opportunity.format === 'online' ? (
            <div className="px-2 py-1 bg-[#0066FF] text-white text-xs rounded flex items-center gap-1">
              <Wifi className="w-3 h-3" />
              <span>Online</span>
            </div>
          ) : (
            <div className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-xs rounded flex items-center gap-1">
              <WifiOff className="w-3 h-3" />
              <span>Offline</span>
            </div>
          )}
          <span className="text-sm text-muted-foreground">{opportunity.category}</span>
        </div>

        <h3 className="mb-2">{opportunity.title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{opportunity.description}</p>

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span className={getLocationColor()}>{opportunity.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{opportunity.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{opportunity.volunteersNeeded} needed</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{opportunity.organization}</span>
          <AdaptiveButton size="sm" variant="primary">
            Learn More
          </AdaptiveButton>
        </div>
      </div>
    </div>
  );
};
