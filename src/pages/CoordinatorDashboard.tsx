import React from 'react';
import { useApp } from '../contexts/AppContext';
import { StatCard } from '../components/cards/StatCard';
import { RequestCard, Request } from '../components/cards/RequestCard';
import { Users, Clock, AlertCircle, CheckCircle, TrendingUp, MapPin } from 'lucide-react';

const CoordinatorDashboard: React.FC = () => {
  const { mode } = useApp();

  const requests: Request[] = [
    {
      id: '1',
      title: 'Medical Supplies to Bakhmut Direction',
      type: 'Medical support',
      location: 'Donetsk Oblast',
      distance: '450 km',
      urgent: true,
      timeEstimate: '6-8 hours',
      items: ['Tourniquets', 'Bandages', 'Hemostatic agents', 'IV fluids'],
      status: 'pending',
      priority: 'critical',
    },
    {
      id: '2',
      title: 'Humanitarian Aid - Kherson',
      type: 'Humanitarian aid',
      location: 'Kherson',
      distance: '280 km',
      urgent: false,
      timeEstimate: '4-5 hours',
      items: ['Food packages', 'Water', 'Hygiene kits'],
      status: 'assigned',
      priority: 'high',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="mb-8">Coordinator Dashboard</h1>

        {/* Key Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard title="Active Requests" value={12} icon={AlertCircle} variant="yellow" trend={{ value: 8, isPositive: false }} />
          <StatCard title="Volunteers" value={156} icon={Users} variant="blue" />
          <StatCard title="Hours Today" value={342} icon={Clock} />
          <StatCard title="Completed" value={28} icon={CheckCircle} />
          <StatCard title="Success Rate" value="94%" icon={TrendingUp} />
        </div>

        {/* Urgent Requests */}
        <div className="mb-6">
          <h3 className="mb-4">Urgent Requests</h3>
          <div className="grid gap-4">
            {requests.map(request => (
              <RequestCard
                key={request.id}
                request={request}
                onAccept={id => console.log('Assign', id)}
                onView={id => console.log('View', id)}
                showActions
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorDashboard;
