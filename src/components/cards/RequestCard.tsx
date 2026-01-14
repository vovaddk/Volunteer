import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { MapPin, Clock, Package, Flame, Navigation } from 'lucide-react';
import { AdaptiveButton } from '../AdaptiveButton';

export type Request = {
  id: string;
  title: string;
  type: string;
  location: string;
  distance: string;
  urgent: boolean;
  timeEstimate: string;
  items: string[];
  status: 'pending' | 'assigned' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
};

interface RequestCardProps {
  request: Request;
  onAccept?: (id: string) => void;
  onView?: (id: string) => void;
  showActions?: boolean;
}

export const RequestCard: React.FC<RequestCardProps> = ({
  request,
  onAccept,
  onView,
  showActions = true,
}) => {
  const { mode } = useApp();
  const useShadow = !mode.lowBandwidth;

  const getPriorityColor = () => {
    switch (request.priority) {
      case 'critical':
        return 'bg-[#FF3B30] text-white';
      case 'high':
        return 'bg-[#FF9500] text-white';
      case 'medium':
        return 'bg-[#FFD600] text-black';
      case 'low':
        return 'bg-gray-200 dark:bg-gray-700 text-foreground';
    }
  };

  const getStatusColor = () => {
    switch (request.status) {
      case 'pending':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'assigned':
        return 'text-blue-600 dark:text-blue-400';
      case 'in-progress':
        return 'text-orange-600 dark:text-orange-400';
      case 'completed':
        return 'text-green-600 dark:text-green-400';
    }
  };

  return (
    <div
      className={`bg-card border-2 ${
        request.urgent ? 'border-[#FF3B30]' : 'border-border'
      } rounded-lg p-4 md:p-6 transition-all ${useShadow ? 'shadow-md' : ''} ${
        mode.frontline ? 'min-h-[120px]' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3 flex-1">
          {request.urgent && <Flame className="w-5 h-5 text-[#FF3B30] flex-shrink-0 mt-1" />}
          <div className="flex-1 min-w-0">
            <h3 className="mb-1">{request.title}</h3>
            <span className="text-sm text-muted-foreground">{request.type}</span>
          </div>
        </div>

        <span className={`px-3 py-1 rounded text-sm flex-shrink-0 ${getPriorityColor()}`}>
          {request.priority}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <span className="truncate">{request.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <span>{request.distance}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <span>{request.timeEstimate}</span>
        </div>
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <span>{request.items.length} items</span>
        </div>
      </div>

      {request.items.length > 0 && !mode.compact && (
        <div className="mb-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Items to deliver:</p>
          <p className="text-sm">{request.items.slice(0, 3).join(', ')}{request.items.length > 3 ? '...' : ''}</p>
        </div>
      )}

      {showActions && (
        <div className="flex gap-3">
          {onView && (
            <AdaptiveButton
              variant="outline"
              size={mode.frontline ? 'lg' : 'md'}
              fullWidth
              onClick={() => onView(request.id)}
            >
              View Details
            </AdaptiveButton>
          )}
          {onAccept && request.status === 'pending' && (
            <AdaptiveButton
              variant={request.urgent ? 'danger' : 'primary'}
              size={mode.frontline ? 'lg' : 'md'}
              fullWidth
              onClick={() => onAccept(request.id)}
            >
              {request.urgent ? '🔥 Accept Urgent' : 'Accept Request'}
            </AdaptiveButton>
          )}
          {request.status !== 'pending' && (
            <div className={`flex items-center justify-center w-full py-2 ${getStatusColor()}`}>
              Status: {request.status}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
