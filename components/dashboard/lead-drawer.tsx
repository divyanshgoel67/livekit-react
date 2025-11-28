'use client';

import React, { useEffect, useRef } from 'react';
import { X, Phone, MapPin, Home, Clock, Briefcase, DollarSign, Target, Zap } from 'lucide-react';

interface LeadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lead: any;
  onStartSimulation?: () => void;
}

const LeadDrawer = ({ isOpen, onClose, lead, onStartSimulation }: LeadDrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!drawerRef.current || !lead) return;

    if (isOpen) {
      // Ensure drawer is visible and positioned off-screen initially
      drawerRef.current.style.display = 'block';
      drawerRef.current.style.transform = 'translateX(100%)';
      
      // Force reflow to ensure the initial state is applied
      void drawerRef.current.offsetHeight;
      
      // Then animate in on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (drawerRef.current) {
            drawerRef.current.style.transform = 'translateX(0)';
          }
        });
      });
    } else {
      // Animate out
      if (drawerRef.current) {
        drawerRef.current.style.transform = 'translateX(100%)';
      }
    }
  }, [isOpen, lead]);

  if (!lead) return null;

  const handleDialLead = () => {
    if (onStartSimulation) {
      onStartSimulation();
    }
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out"
        style={{ 
          transform: 'translateX(100%)',
          display: 'block'
        }}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
                <img
                  src={lead.avatar}
                  alt={lead.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">{lead.name}</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-700">🔥 Status: Hot Lead</span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">

            {/* Primary Action */}
            <button
              onClick={handleDialLead}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <Phone size={24} />
              DIAL LEAD
            </button>

            {/* Compact Data Row - Flattened Single Line */}
            <div className="flex items-center justify-center gap-6 py-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-slate-400" />
                <span className="text-sm font-medium text-slate-600">Walk-in</span>
              </div>
              <div className="w-px h-4 bg-slate-200"></div>
              <div className="flex items-center gap-2">
                <Home size={14} className="text-slate-400" />
                <span className="text-sm font-medium text-slate-600">1BHK</span>
              </div>
              <div className="w-px h-4 bg-slate-200"></div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-slate-400" />
                <span className="text-sm font-medium text-slate-600">40m ago</span>
              </div>
            </div>

            {/* Mission Brief */}
            <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100">
              <div className="flex items-center gap-2 mb-3">
                <Briefcase size={18} className="text-blue-600" />
                <h3 className="font-bold text-blue-900">Mission Brief</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm font-medium text-slate-800">
                  <Target size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Discover Budget & Financing</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-medium text-slate-800">
                  <Target size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Handle "Price too high" Objection</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-medium text-slate-800">
                  <Target size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Pitch "Lifestyle Package" Amenities</span>
                </li>
              </ul>
            </div>

            {/* Gamified Intel Grid (2x2) */}
            <div>
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Zap size={18} className="text-yellow-500" />
                Intel Grid
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Budget</span>
                    <DollarSign size={14} className="text-emerald-500" />
                  </div>
                  <p className="text-base font-bold text-slate-900">{lead.dealValue || lead.commission || '$2.5M'}</p>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 bg-white shadow-sm relative overflow-hidden group">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Timeline</span>
                    <Clock size={14} className="text-slate-400" />
                  </div>
                  <p className="text-base font-bold text-slate-900 blur-sm select-none">3 Months</p>
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-bold text-slate-600 bg-white px-2 py-1 rounded shadow-sm">Unlock</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Motivation</span>
                    <Target size={14} className="text-purple-500" />
                  </div>
                  <p className="text-base font-bold text-slate-900 truncate">Investment</p>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Authority</span>
                    <Briefcase size={14} className="text-blue-500" />
                  </div>
                  <p className="text-base font-bold text-slate-900">Decision Maker</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default LeadDrawer;
