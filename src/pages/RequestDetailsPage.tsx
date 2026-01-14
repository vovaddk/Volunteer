import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { AdaptiveButton } from '../components/AdaptiveButton';
import { MapPin, Clock, Package, Navigation, CheckCircle, Camera, AlertTriangle } from 'lucide-react';

const RequestDetailsPage: React.FC = () => {
  const { mode } = useApp();
  const [deliveryStatus, setDeliveryStatus] = useState<'viewing' | 'in-progress' | 'completed'>('viewing');

  const request = {
    id: '1',
    title: 'Medical Supplies to Bakhmut Direction',
    type: 'Medical support',
    location: 'Donetsk Oblast, Field Hospital #7',
    distance: '450 km',
    timeEstimate: '6-8 hours',
    items: ['Tourniquets (50 units)', 'Bandages (200 units)', 'Hemostatic agents', 'IV fluids (100 bags)'],
    contactPerson: 'Dr. Petro Ivanov',
    contactPhone: '+380 50 123 4567',
    safetyNotes: 'Active combat zone. Travel only during daylight. Check-in required every 2 hours.',
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-6 h-6 text-[#FF3B30]" />
            <h1>Urgent Delivery Request</h1>
          </div>
          <h2 className="text-muted-foreground">{request.title}</h2>
        </div>

        {/* Safety Alert */}
        <div className="mb-6 p-4 bg-[#FF3B30]/10 border-2 border-[#FF3B30] rounded-lg">
          <p className="text-sm text-[#FF3B30] dark:text-red-400">
            <strong>⚠️ Safety Notice:</strong> {request.safetyNotes}
          </p>
        </div>

        {/* Request Details */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Destination</p>
                <p>{request.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Navigation className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Distance</p>
                <p>{request.distance}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Estimated Time</p>
                <p>{request.timeEstimate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Items</p>
                <p>{request.items.length} types</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <h4 className="mb-2">Items to Deliver:</h4>
            <ul className="space-y-1">
              {request.items.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-[#FFD600] rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h4 className="mb-4">Contact Information</h4>
          <p className="mb-2">
            <strong>Contact Person:</strong> {request.contactPerson}
          </p>
          <p>
            <strong>Phone:</strong> <a href={`tel:${request.contactPhone}`} className="text-[#0066FF] hover:underline">{request.contactPhone}</a>
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {deliveryStatus === 'viewing' && (
            <>
              <AdaptiveButton
                variant="danger"
                size={mode.frontline ? 'xl' : 'lg'}
                fullWidth
                onClick={() => setDeliveryStatus('in-progress')}
              >
                🔥 Accept & Start Delivery
              </AdaptiveButton>
              <AdaptiveButton variant="outline" size="lg" fullWidth>
                View Route on Map
              </AdaptiveButton>
            </>
          )}

          {deliveryStatus === 'in-progress' && (
            <>
              <div className="p-4 bg-[#0066FF]/10 border border-[#0066FF] rounded-lg text-center mb-4">
                <p className="text-[#0066FF]">📍 Delivery in progress...</p>
              </div>
              <AdaptiveButton
                variant="primary"
                size={mode.frontline ? 'xl' : 'lg'}
                fullWidth
                onClick={() => setDeliveryStatus('completed')}
              >
                <CheckCircle className="w-5 h-5" />
                Confirm Delivery Complete
              </AdaptiveButton>
              <AdaptiveButton variant="outline" size="lg" fullWidth>
                <Camera className="w-5 h-5" />
                Upload Photo Confirmation
              </AdaptiveButton>
            </>
          )}

          {deliveryStatus === 'completed' && (
            <div className="p-6 bg-[#34C759]/10 border-2 border-[#34C759] rounded-lg text-center">
              <CheckCircle className="w-16 h-16 text-[#34C759] mx-auto mb-4" />
              <h3 className="mb-2 text-[#34C759]">Delivery Completed!</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Thank you for your service. You've contributed 8 hours to help those in need.
              </p>
              <AdaptiveButton variant="primary" onClick={() => window.location.href = '/cabinet'}>
                Return to Cabinet
              </AdaptiveButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsPage;
