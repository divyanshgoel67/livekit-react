'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/sidebar-new';
import TopNav from '@/components/dashboard/top-nav';
import StartSimulationView from '@/components/dashboard/start-simulation-view';
import HistoricalSimulationsView from '@/components/dashboard/historical-simulations-view';
import IntroCallTabs from '@/components/dashboard/intro-call-tabs';
import LeadDrawer from '@/components/dashboard/lead-drawer';
import AllLeadsView from '@/components/dashboard/all-leads-view';
import { Toaster } from '@/components/livekit/toaster';

export default function TrainingPage() {
  const [activeTab, setActiveTab] = useState<'start' | 'historical'>('start');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [showAllLeads, setShowAllLeads] = useState(false);

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
    const agentUrl = '/dashboard/agent';
    window.open(agentUrl, '_blank');
    // Close the drawer
    handleCloseDrawer();
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar />
      <TopNav />

      <main className="ml-64 p-8 max-w-7xl mx-auto">
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
      </main>

      <LeadDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        lead={selectedLead}
        onStartSimulation={handleStartSimulation}
      />

      <Toaster />
    </div>
  );
}
