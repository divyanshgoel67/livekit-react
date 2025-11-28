'use client';

export function HomeCardShimmer() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm animate-pulse p-6">
      <div className="mb-4">
        <div className="h-6 bg-slate-200 rounded w-32 mb-2"></div>
        <div className="h-8 bg-slate-200 rounded w-48"></div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-slate-200 rounded w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
      </div>
    </div>
  );
}

