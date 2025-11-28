'use client';

import React from 'react';
import { TrendingUp, Phone } from 'lucide-react';

const StatsRow = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Card 1: Booking Rate */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-slate-500 text-sm font-medium mb-1">Booking Rate</p>
            <h3 className="text-3xl font-bold text-slate-900">32%</h3>
          </div>
          <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full text-xs font-bold">
            <TrendingUp size={12} />
            <span>+4%</span>
          </div>
        </div>
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div className="bg-emerald-500 h-full rounded-full" style={{ width: '32%' }}></div>
        </div>
      </div>

      {/* Card 2: Rapport Score */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-sm font-medium mb-1">Rapport Score</p>
          <h3 className="text-3xl font-bold text-slate-900">8.5<span className="text-lg text-slate-400 font-normal">/10</span></h3>
          <p className="text-xs text-slate-400 mt-1">Top 5% of reps</p>
        </div>
        <div className="relative w-16 h-16 flex items-center justify-center">
          {/* Simple SVG Circle Progress */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-100"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="text-blue-600"
              strokeDasharray="85, 100"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute text-xs font-bold text-blue-600">8.5</span>
        </div>
      </div>

      {/* Card 3: Avg Call Duration */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-slate-500 text-sm font-medium mb-1">Avg. Call Duration</p>
            <h3 className="text-3xl font-bold text-slate-900">2m 15s</h3>
          </div>
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
            <Phone size={20} />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">Target: &lt; 3m</span>
          <span className="text-xs text-emerald-600 font-medium">On Track</span>
        </div>
      </div>
    </div>
  );
};

export default StatsRow;
