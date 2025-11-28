'use client';

import React from 'react';
import HeroBanner from './hero-banner';
import StatsRow from './stats-row';
import LeadsSection from './leads-section';

interface StartSimulationViewProps {
  onLeadClick: (lead: any) => void;
  onViewAll: () => void;
}

const StartSimulationView = ({ onLeadClick, onViewAll }: StartSimulationViewProps) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <HeroBanner />
      <StatsRow />
      <LeadsSection onLeadClick={onLeadClick} onViewAll={onViewAll} />
    </div>
  );
};

export default StartSimulationView;

