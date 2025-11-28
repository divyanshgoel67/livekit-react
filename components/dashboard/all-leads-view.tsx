'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import { LeadCard } from './lead-card';
import { LeadCardShimmer } from './shimmer';
import FilterSidebar from './filter-sidebar';

interface Lead {
  id: string;
  name: string;
  role: string;
  company: string;
  difficulty: number;
  avatar: string;
  type: 'recommended' | 'favorite';
  source: string;
  commission: string;
  tags: string[];
}

// Extended mock data
const mockAllLeads: Lead[] = [
  { id: '1', name: 'Sarah Jenkins', role: 'CTO, TechFlow', company: 'TechFlow', difficulty: 3, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces', type: 'recommended', source: 'LinkedIn', commission: '$1,200', tags: ['Decision Maker', 'Busy'] },
  { id: '2', name: 'David Chen', role: 'VP Sales, Growth.io', company: 'Growth.io', difficulty: 4, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces', type: 'recommended', source: 'Referral', commission: '$2,500', tags: ['Friendly', 'Decision Maker'] },
  { id: '3', name: 'Amanda Low', role: 'Director, Innovate', company: 'Innovate', difficulty: 2, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces', type: 'recommended', source: 'Inbound', commission: '$800', tags: ['Budget-Conscious'] },
  { id: '4', name: 'Vikram Malhotra', role: 'CEO, BuildIt', company: 'BuildIt', difficulty: 5, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces', type: 'favorite', source: 'Conference', commission: '$5,000', tags: ['Skeptic', 'Decision Maker'] },
  { id: '5', name: 'Priya Patel', role: 'Founder, StartUp', company: 'StartUp', difficulty: 3, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=faces', type: 'favorite', source: 'Cold Email', commission: '$1,500', tags: ['Busy', 'Gatekeeper'] },
  { id: '6', name: 'James Wilson', role: 'Manager, CorpInc', company: 'CorpInc', difficulty: 1, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces', type: 'favorite', source: 'Website', commission: '$500', tags: ['Friendly'] },
  { id: '7', name: 'Elena Rodriguez', role: 'Head of Ops, LogiTech', company: 'LogiTech', difficulty: 4, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces', type: 'recommended', source: 'LinkedIn', commission: '$3,200', tags: ['Skeptic', 'Busy'] },
  { id: '8', name: 'Michael Chang', role: 'Director, FinServe', company: 'FinServe', difficulty: 5, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces', type: 'recommended', source: 'Referral', commission: '$4,500', tags: ['Decision Maker', 'Skeptic'] },
  { id: '9', name: 'Sophie Anderson', role: 'VP Marketing, BrandCo', company: 'BrandCo', difficulty: 2, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=faces', type: 'recommended', source: 'Inbound', commission: '$1,100', tags: ['Friendly', 'Budget-Conscious'] },
  { id: '10', name: 'Robert Fox', role: 'CTO, CyberNet', company: 'CyberNet', difficulty: 5, avatar: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=150&h=150&fit=crop&crop=faces', type: 'favorite', source: 'Conference', commission: '$6,000', tags: ['Skeptic', 'Decision Maker'] },
  { id: '11', name: 'Emily Parker', role: 'Founder, EcoLabs', company: 'EcoLabs', difficulty: 3, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces', type: 'favorite', source: 'Cold Email', commission: '$1,800', tags: ['Busy', 'Gatekeeper'] },
  { id: '12', name: 'Daniel Kim', role: 'Manager, RetailPlus', company: 'RetailPlus', difficulty: 1, avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=faces', type: 'favorite', source: 'Website', commission: '$600', tags: ['Friendly'] },
];

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
    // Simulate async data fetching
    const fetchLeads = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setAllLeads(mockAllLeads);
      setIsLoading(false);
    };

    fetchLeads();
  }, []);

  const filteredLeads = useMemo(() => {
    return allLeads.filter(lead => {
      // Filter by Difficulty
      if (filters.difficulty.length > 0) {
        const difficultyMap: Record<number, string> = { 1: 'Easy', 2: 'Easy', 3: 'Medium', 4: 'Hard', 5: 'Extreme' };
        const leadDifficulty = difficultyMap[lead.difficulty];
        if (!filters.difficulty.includes(leadDifficulty)) return false;
      }

      // Filter by Source
      if (filters.source.length > 0) {
        const match = filters.source.some(s => lead.source.includes(s) || (s === 'Conference' && lead.source === 'Conference'));
        if (!match) return false;
      }

      // Filter by Deal Value (Commission in this mock, but treating as proxy for Deal Value)
      const value = parseInt(lead.commission.replace(/[^0-9]/g, ''));
      if (filters.minDealValue && value < parseInt(filters.minDealValue)) return false;
      if (filters.maxDealValue && value > parseInt(filters.maxDealValue)) return false;

      // Filter by Persona
      if (filters.personas.length > 0) {
        const hasPersona = filters.personas.some(p => lead.tags.includes(p));
        if (!hasPersona) return false;
      }

      return true;
    });
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
          filteredLeads.map(lead => (
            <LeadCard
              key={lead.id}
              name={lead.name}
              role={lead.role}
              avatar={lead.avatar}
              difficulty={lead.difficulty}
              source={lead.source}
              dealValue={lead.commission}
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

