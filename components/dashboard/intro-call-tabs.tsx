'use client';

import React from 'react';

interface IntroCallTabsProps {
  activeTab: 'start' | 'historical';
  onTabChange: (tab: 'start' | 'historical') => void;
}

const IntroCallTabs = ({ activeTab, onTabChange }: IntroCallTabsProps) => {
  return (
    <div className="bg-white p-1 rounded-xl inline-flex mb-6 border border-slate-200 shadow-sm">
      <button
        onClick={() => onTabChange('start')}
        className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'start'
          ? 'bg-gradient-to-r from-blue-900 to-violet-900 text-white shadow-md shadow-blue-900/20'
          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
      >
        Start Simulation
      </button>
      <button
        onClick={() => onTabChange('historical')}
        className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'historical'
          ? 'bg-gradient-to-r from-blue-900 to-violet-900 text-white shadow-md shadow-blue-900/20'
          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
      >
        Historical Simulations
      </button>
    </div>
  );
};

export default IntroCallTabs;
