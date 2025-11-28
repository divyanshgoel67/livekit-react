'use client';

import React, { useState, useEffect } from 'react';
import { Play, Target } from 'lucide-react';
import { HeroBannerShimmer } from './shimmer';

const HeroBanner = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate async data fetching
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <HeroBannerShimmer />;
  }

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900 to-violet-900 p-8 shadow-lg">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Master Your Opening Pitch
            </h1>
            <p className="text-blue-100 text-lg max-w-xl">
              65% of leads are lost in the first minute. Sharpen your opening hook to stop losing commissions.
            </p>
          </div>

          <button className="flex items-center gap-2 bg-white text-blue-900 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors shadow-md">
            <Play size={20} fill="currentColor" />
            <span>Watch Tutorial</span>
          </button>
        </div>

        {/* 3D Target Visual */}
        <div className="hidden md:flex items-center justify-center w-48 h-48 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-2xl relative group">
          {/* Outer Ring */}
          <div className="absolute inset-4 rounded-full border-4 border-white/20"></div>
          {/* Middle Ring */}
          <div className="absolute inset-8 rounded-full border-4 border-white/30"></div>
          {/* Inner Ring */}
          <div className="absolute inset-12 rounded-full border-4 border-red-500/80 bg-red-500/20"></div>

          {/* Bullseye */}
          <div className="relative z-10 w-8 h-8 bg-red-500 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.6)] animate-pulse"></div>

          {/* Dart (represented by icon for simplicity, or CSS shapes) */}
          <Target size={64} className="absolute text-white/90 drop-shadow-lg" />
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
    </div>
  );
};

export default HeroBanner;
