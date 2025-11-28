'use client';

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface FilterState {
  difficulty: string[];
  source: string[];
  minDealValue: string;
  maxDealValue: string;
  personas: string[];
}

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  initialFilters: FilterState;
}

const FilterSidebar = ({ isOpen, onClose, onApply, initialFilters }: FilterSidebarProps) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const handleDifficultyChange = (level: string) => {
    setFilters(prev => ({
      ...prev,
      difficulty: prev.difficulty.includes(level)
        ? prev.difficulty.filter(l => l !== level)
        : [...prev.difficulty, level]
    }));
  };

  const handleSourceChange = (source: string) => {
    setFilters(prev => ({
      ...prev,
      source: prev.source.includes(source)
        ? prev.source.filter(s => s !== source)
        : [...prev.source, source]
    }));
  };

  const handlePersonaToggle = (persona: string) => {
    setFilters(prev => ({
      ...prev,
      personas: prev.personas.includes(persona)
        ? prev.personas.filter(p => p !== persona)
        : [...prev.personas, persona]
    }));
  };

  const handleClearAll = () => {
    setFilters({
      difficulty: [],
      source: [],
      minDealValue: '',
      maxDealValue: '',
      personas: []
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
            <h2 className="text-xl font-bold text-slate-900">Filters</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Difficulty */}
            <section>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Difficulty Level</h3>
              <div className="space-y-3">
                {['Easy', 'Medium', 'Hard', 'Extreme'].map((level) => (
                  <label key={level} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.difficulty.includes(level) ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300 bg-white group-hover:border-indigo-400'}`}>
                      {filters.difficulty.includes(level) && <Check size={14} className="text-white" />}
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={filters.difficulty.includes(level)}
                      onChange={() => handleDifficultyChange(level)}
                    />
                    <span className="text-slate-600 group-hover:text-slate-900">{level}</span>
                  </label>
                ))}
              </div>
            </section>

            <div className="h-px bg-slate-100" />

            {/* Source */}
            <section>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Lead Source</h3>
              <div className="space-y-3">
                {['Inbound', 'Outbound', 'Referral', 'Conference'].map((source) => (
                  <label key={source} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.source.includes(source) ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300 bg-white group-hover:border-indigo-400'}`}>
                      {filters.source.includes(source) && <Check size={14} className="text-white" />}
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={filters.source.includes(source)}
                      onChange={() => handleSourceChange(source)}
                    />
                    <span className="text-slate-600 group-hover:text-slate-900">{source}</span>
                  </label>
                ))}
              </div>
            </section>

            <div className="h-px bg-slate-100" />

            {/* Deal Value */}
            <section>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Estimated Deal Size</h3>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-xs text-slate-500 mb-1 block">Min ($)</label>
                  <input
                    type="number"
                    placeholder="10,000"
                    value={filters.minDealValue}
                    onChange={(e) => setFilters(prev => ({ ...prev, minDealValue: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-slate-500 mb-1 block">Max ($)</label>
                  <input
                    type="number"
                    placeholder="1,000,000"
                    value={filters.maxDealValue}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxDealValue: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </section>

            <div className="h-px bg-slate-100" />

            {/* Persona */}
            <section>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Customer Persona</h3>
              <div className="flex flex-wrap gap-2">
                {['Skeptic', 'Busy', 'Friendly', 'Budget-Conscious', 'Decision Maker', 'Gatekeeper'].map((persona) => (
                  <button
                    key={persona}
                    onClick={() => handlePersonaToggle(persona)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${filters.personas.includes(persona)
                      ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                  >
                    {persona}
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-4">
            <button
              onClick={handleClearAll}
              className="px-4 py-2 text-slate-500 font-medium hover:text-slate-900 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={() => onApply(filters)}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 hover:shadow-indigo-500/30 transition-all"
            >
              Show Results
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;

