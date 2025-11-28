'use client';

import React from 'react';

export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Processing your call...</h2>
          <p className="text-slate-500">Please wait while we analyze your session</p>
        </div>
      </div>
    </div>
  );
}

