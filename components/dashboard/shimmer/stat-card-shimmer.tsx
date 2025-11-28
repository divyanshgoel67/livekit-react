'use client';

export function StatCardShimmer() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="h-4 bg-slate-200 rounded w-24 mb-2"></div>
          <div className="h-8 bg-slate-200 rounded w-16"></div>
        </div>
        <div className="h-6 bg-slate-200 rounded w-12"></div>
      </div>
      <div className="w-full bg-slate-100 h-1.5 rounded-full"></div>
    </div>
  );
}

