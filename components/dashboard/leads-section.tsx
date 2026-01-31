'use client';

import React, { useState, useEffect } from 'react';
import { LeadCard } from './lead-card';
import { LeadCardShimmer } from './shimmer';
import { getRecommendedLeads, getFavoriteLeads } from '@/network/leads-api';
import { Lead } from '@/network/models/agent';

const LeadsSection = ({ onLeadClick, onViewAll }: { onLeadClick: (lead: any) => void, onViewAll: () => void }) => {
  const [isLoadingRecommended, setIsLoadingRecommended] = useState(true);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);
  const [recommended, setRecommended] = useState<Lead[]>([]);
  const [favorites, setFavorites] = useState<Lead[]>([]);

  useEffect(() => {
    // Fetch recommended leads
    const fetchRecommended = async () => {
      try {
        setIsLoadingRecommended(true);
        // TODO: Replace with actual API endpoint when available
        // For now, using mock data fallback
        const leads = await getRecommendedLeads();
        setRecommended(leads ?? []);
      } catch (error) {
        console.error('Error fetching recommended leads:', error);
        // Fallback to empty array on error
        setRecommended([]);
      } finally {
        setIsLoadingRecommended(false);
      }
    };

    // Fetch favorite leads
    const fetchFavorites = async () => {
      try {
        setIsLoadingFavorites(true);
        // TODO: Replace with actual API endpoint when available
        // For now, using mock data fallback
        const leads = await getFavoriteLeads();
        setFavorites(leads ?? []);
      } catch (error) {
        console.error('Error fetching favorite leads:', error);
        // Fallback to empty array on error
        setFavorites([]);
      } finally {
        setIsLoadingFavorites(false);
      }
    };

    fetchRecommended();
    fetchFavorites();
  }, []);

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
          {isLoadingRecommended ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="min-w-[350px] snap-start">
                <LeadCardShimmer />
              </div>
            ))
          ) : (
            recommended.map(lead => (
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
            ))
          )}
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
          {isLoadingFavorites ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="min-w-[350px] snap-start">
                <LeadCardShimmer />
              </div>
            ))
          ) : (
            favorites.map(lead => (
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
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default LeadsSection;
