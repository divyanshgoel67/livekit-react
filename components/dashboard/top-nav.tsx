'use client';

import React from 'react';
import { Search, Bell, Calendar } from 'lucide-react';

const TopNav = () => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40 ml-64">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search scenarios, scripts, or leads..."
            className="w-full bg-slate-100 border border-slate-200 rounded-full py-2.5 pl-12 pr-4 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
          <Calendar size={16} className="text-cyan-600" />
          <span className="text-sm text-slate-600">Today, {today}</span>
        </div>

        <button className="relative p-2 text-slate-500 hover:text-slate-900 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-[1px] bg-slate-200"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-slate-900">John Doe</p>
            <p className="text-xs text-emerald-500">Online</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 p-[2px]">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="Profile" className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
