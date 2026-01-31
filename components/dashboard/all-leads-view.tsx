'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import { LeadCard } from './lead-card';
import { LeadCardShimmer } from './shimmer';
import FilterSidebar from './filter-sidebar';
import { getLeads } from '@/network/leads-api';
import { Lead } from '@/network/models/agent';

interface AllLeadsViewProps {
  onBack: () => void;
  onLeadClick: (lead: any) => void;
}

const AllLeadsView = ({ onBack, onLeadClick }: AllLeadsViewProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [allLeads, setAllLeads] = useState<Lead[]>([]);
  const [filters, setFilters] = useState({
    difficulty: [] as string[],
    source: [] as string[],
    minDealValue: '',
    maxDealValue: '',
    personas: [] as string[]
  });

  useEffect(() => {
    // Fetch leads with filters applied via API query params
    const fetchLeads = async () => {
      try {
        setIsLoading(true);
        // TODO: Replace with actual API endpoint when available
        // For now, using mock data fallback
        const leads = await getLeads({
          difficulty: filters.difficulty,
          source: filters.source,
          minDealValue: filters.minDealValue || undefined,
          maxDealValue: filters.maxDealValue || undefined,
          personas: filters.personas,
        });
        setAllLeads(leads ?? []);
      } catch (error) {
        console.error('Error fetching leads:', error);
        // Fallback to empty array on error
        setAllLeads([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, [filters]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">All Leads</h1>
            <p className="text-slate-500 text-sm">Browse and select leads to simulate</p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search leads..."
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 w-64"
            />
          </div>
          <button
            onClick={() => setIsFilterOpen(true)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-medium transition-colors ${Object.values(filters).some(v => v.length > 0 || v !== '')
              ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
          >
            <Filter size={18} />
            Filter
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <LeadCardShimmer key={i} />
          ))
        ) : (
          allLeads.map(lead => (
            <LeadCard
              key={lead.id}
              name={lead.name}
              role={lead.role}
              avatar={lead.avatar}
              difficulty={lead.difficulty}
              source={lead.source}
              dealValue={lead.dealValue}
              onClick={() => onLeadClick(lead)}
            />
          ))
        )}
      </div>

      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={(newFilters) => {
          setFilters(newFilters);
          setIsFilterOpen(false);
        }}
        initialFilters={filters}
      />
    </div>
  );
};

export default AllLeadsView;

