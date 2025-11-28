'use client';

import React from 'react';
import { LeadCard } from './lead-card';

interface Lead {
  id: string;
  name: string;
  role: string;
  company: string;
  difficulty: number;
  avatar: string;
  type: 'recommended' | 'favorite';
  source: string;
  dealValue: string;
}

const leads: Lead[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'CTO, TechFlow',
    company: 'TechFlow',
    difficulty: 3,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces',
    type: 'recommended',
    source: 'LinkedIn',
    dealValue: '$2.5M'
  },
  {
    id: '2',
    name: 'David Chen',
    role: 'VP Sales, Growth.io',
    company: 'Growth.io',
    difficulty: 4,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
    type: 'recommended',
    source: 'Referral',
    dealValue: '$5.2M'
  },
  {
    id: '3',
    name: 'Amanda Low',
    role: 'Director, Innovate',
    company: 'Innovate',
    difficulty: 2,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces',
    type: 'recommended',
    source: 'Inbound',
    dealValue: '$1.8M'
  },
  {
    id: '4',
    name: 'Vikram Malhotra',
    role: 'CEO, BuildIt',
    company: 'BuildIt',
    difficulty: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces',
    type: 'favorite',
    source: 'Conference',
    dealValue: '$8.5M'
  },
  {
    id: '5',
    name: 'Priya Patel',
    role: 'Founder, StartUp',
    company: 'StartUp',
    difficulty: 3,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=faces',
    type: 'favorite',
    source: 'Cold Email',
    dealValue: '$3.2M'
  },
  {
    id: '6',
    name: 'James Wilson',
    role: 'Manager, CorpInc',
    company: 'CorpInc',
    difficulty: 1,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces',
    type: 'favorite',
    source: 'Website',
    dealValue: '$1.2M'
  },
  {
    id: '7',
    name: 'Elena Rodriguez',
    role: 'VP Marketing, BrandCo',
    company: 'BrandCo',
    difficulty: 4,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces',
    type: 'recommended',
    source: 'LinkedIn',
    dealValue: '$4.1M'
  },
  {
    id: '8',
    name: 'Michael Chang',
    role: 'Director, FinTech',
    company: 'FinTech',
    difficulty: 2,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=faces',
    type: 'recommended',
    source: 'Referral',
    dealValue: '$2.9M'
  },
  {
    id: '9',
    name: 'Lisa Thompson',
    role: 'CEO, FutureScale',
    company: 'FutureScale',
    difficulty: 5,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces',
    type: 'recommended',
    source: 'Conference',
    dealValue: '$7.5M'
  },
  {
    id: '10',
    name: 'Robert Foster',
    role: 'Head of Sales, SellIt',
    company: 'SellIt',
    difficulty: 3,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces',
    type: 'favorite',
    source: 'Cold Email',
    dealValue: '$3.8M'
  },
  {
    id: '11',
    name: 'Sophie Anderson',
    role: 'Founder, EcoTech',
    company: 'EcoTech',
    difficulty: 2,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces',
    type: 'favorite',
    source: 'Inbound',
    dealValue: '$1.5M'
  },
];

const LeadsSection = ({ onLeadClick, onViewAll }: { onLeadClick: (lead: any) => void, onViewAll: () => void }) => {
  const recommended = leads.filter(l => l.type === 'recommended');
  const favorites = leads.filter(l => l.type === 'favorite');

  return (
    <div className="space-y-8">
      {/* Recommended Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900">Recommended Leads</h2>
          <button
            onClick={onViewAll}
            className="text-sm text-cyan-600 font-medium hover:underline"
          >
            View All
          </button>
        </div>
        <div className="flex overflow-x-auto pb-6 gap-6 snap-x scrollbar-hide">
          {recommended.map(lead => (
            <div key={lead.id} className="min-w-[350px] snap-start">
              <LeadCard
                name={lead.name}
                role={lead.role}
                avatar={lead.avatar}
                difficulty={lead.difficulty}
                source={lead.source}
                dealValue={lead.dealValue}
                onClick={() => onLeadClick(lead)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Favorites / All Leads Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900">Favorites & Recent</h2>
          <button
            onClick={onViewAll}
            className="text-sm text-cyan-600 font-medium hover:underline"
          >
            View All
          </button>
        </div>
        <div className="flex overflow-x-auto pb-6 gap-6 snap-x scrollbar-hide">
          {favorites.map(lead => (
            <div key={lead.id} className="min-w-[350px] snap-start">
              <LeadCard
                name={lead.name}
                role={lead.role}
                avatar={lead.avatar}
                difficulty={lead.difficulty}
                source={lead.source}
                dealValue={lead.dealValue}
                onClick={() => onLeadClick(lead)}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LeadsSection;
