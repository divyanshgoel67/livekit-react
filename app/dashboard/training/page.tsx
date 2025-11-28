'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import StartSimulationView from '@/components/dashboard/start-simulation-view';
import HistoricalSimulationsView from '@/components/dashboard/historical-simulations-view';
import IntroCallTabs from '@/components/dashboard/intro-call-tabs';
import LeadDrawer from '@/components/dashboard/lead-drawer';
import AllLeadsView from '@/components/dashboard/all-leads-view';
import { Toaster } from '@/components/livekit/toaster';

export default function TrainingPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'start' | 'historical'>('start');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [showAllLeads, setShowAllLeads] = useState(false);
  const [activeView, setActiveView] = useState<string>('introduction-calls');

  // Get active view from URL params or default to introduction-calls
  useEffect(() => {
    if (searchParams) {
      const view = searchParams.get('view') || 'introduction-calls';
      setActiveView(view);
    }
  }, [searchParams]);

  const handleLeadClick = (lead: any) => {
    setSelectedLead(lead);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedLead(null), 300); // Clear after animation
  };

  const handleStartSimulation = () => {
    console.log('🚀 Starting simulation with lead:', selectedLead);
    // Open agent page in a new tab
    const agentUrl = '/agent';
    window.open(agentUrl, '_blank');
    // Close the drawer
    handleCloseDrawer();
  };

  // Show placeholder for non-introduction-calls views
  if (activeView !== 'introduction-calls') {
    const viewNames: Record<string, string> = {
      'cold-calls': 'Cold Calls',
      'discovery-calls': 'Discovery Calls',
      'negotiation': 'Negotiation & Closing',
      'situation': 'Situation handling',
    };

    const viewName = viewNames[activeView] || activeView.replace(/-/g, ' ');

    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4 animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
          <span className="text-4xl">🚧</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 capitalize">{viewName}</h2>
        <p className="text-slate-500 max-w-md">
          This training module is currently under construction. Please check back later or try the Introduction Calls module.
        </p>
      </div>
    );
  }

  return (
    <>
      {showAllLeads ? (
        <AllLeadsView
          onBack={() => setShowAllLeads(false)}
          onLeadClick={handleLeadClick}
        />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Introduction Call</h1>
            <p className="text-slate-500">Master the art of the first conversation</p>
          </div>

          <IntroCallTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === 'start' ? (
            <StartSimulationView
              onLeadClick={handleLeadClick}
              onViewAll={() => setShowAllLeads(true)}
            />
          ) : (
            <HistoricalSimulationsView />
          )}
        </div>
      )}

      <LeadDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        lead={selectedLead}
        onStartSimulation={handleStartSimulation}
      />

      <Toaster />
    </>
  );
}
