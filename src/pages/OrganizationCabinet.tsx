import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { StatCard } from '../components/cards/StatCard';
import { AdaptiveButton } from '../components/AdaptiveButton';
import { Users, CheckCircle, Clock, TrendingUp, Plus, X } from 'lucide-react';

const OrganizationCabinet: React.FC = () => {
  const { mode } = useApp();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: 'rear',
    format: 'offline',
    urgent: false,
    description: '',
    volunteersNeeded: 1,
  });

  const myOpportunities = [
    { id: '1', title: 'Medical Supplies Sorting', volunteers: 12, needed: 15, status: 'active' },
    { id: '2', title: 'Food Distribution', volunteers: 8, needed: 10, status: 'active' },
    { id: '3', title: 'Community Center Cleanup', volunteers: 20, needed: 20, status: 'completed' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating opportunity:', formData);
    setShowCreateForm(false);
    // Reset form
    setFormData({
      title: '',
      category: '',
      location: 'rear',
      format: 'offline',
      urgent: false,
      description: '',
      volunteersNeeded: 1,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="mb-2">Organization Dashboard</h1>
            <p className="text-muted-foreground">Manage your volunteering opportunities</p>
          </div>
          <AdaptiveButton
            variant="primary"
            size="lg"
            onClick={() => setShowCreateForm(true)}
          >
            <Plus className="w-5 h-5" />
            Create Opportunity
          </AdaptiveButton>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Active Opportunities" value={2} icon={TrendingUp} variant="yellow" />
          <StatCard title="Total Volunteers" value={40} icon={Users} variant="blue" />
          <StatCard title="Completed Tasks" value={15} icon={CheckCircle} />
          <StatCard title="Volunteer Hours" value={842} icon={Clock} />
        </div>

        {/* Opportunities List */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="mb-6">My Opportunities</h3>
          <div className="space-y-4">
            {myOpportunities.map(opp => (
              <div
                key={opp.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-[#FFD600] transition-colors"
              >
                <div className="flex-1">
                  <h4 className="mb-1">{opp.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {opp.volunteers} / {opp.needed} volunteers
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded text-sm ${
                      opp.status === 'active'
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-600'
                        : 'bg-blue-100 dark:bg-blue-900/20 text-blue-600'
                    }`}
                  >
                    {opp.status}
                  </span>
                  <AdaptiveButton variant="outline" size="sm">
                    Manage
                  </AdaptiveButton>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Opportunity Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h3>Create New Opportunity</h3>
                <button onClick={() => setShowCreateForm(false)} className="p-2 hover:bg-muted rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD600]"
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD600]"
                      required
                    >
                      <option value="">Select category</option>
                      <option value="Medical support">Medical support</option>
                      <option value="Humanitarian aid">Humanitarian aid</option>
                      <option value="Education">Education</option>
                      <option value="Rebuilding">Rebuilding</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2">Volunteers Needed</label>
                    <input
                      type="number"
                      min="1"
                      value={formData.volunteersNeeded}
                      onChange={e => setFormData({ ...formData, volunteersNeeded: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD600]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD600] resize-none"
                    required
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="urgent"
                    checked={formData.urgent}
                    onChange={e => setFormData({ ...formData, urgent: e.target.checked })}
                    className="w-5 h-5 rounded border-2 border-border"
                  />
                  <label htmlFor="urgent" className="cursor-pointer">
                    🔥 Mark as urgent
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <AdaptiveButton type="submit" variant="primary" fullWidth>
                    Create Opportunity
                  </AdaptiveButton>
                  <AdaptiveButton
                    type="button"
                    variant="outline"
                    fullWidth
                    onClick={() => setShowCreateForm(false)}
                  >
                    Cancel
                  </AdaptiveButton>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizationCabinet;
