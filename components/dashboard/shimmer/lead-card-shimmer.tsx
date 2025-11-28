'use client';

export function LeadCardShimmer() {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-300 shadow-sm animate-pulse">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-full bg-slate-200"></div>
        <div className="flex-1">
          <div className="h-5 bg-slate-200 rounded w-32 mb-2"></div>
          <div className="h-4 bg-slate-200 rounded w-24"></div>
        </div>
      </div>
      <div className="mb-4">
        <div className="h-3 bg-slate-200 rounded w-20 mb-2"></div>
        <div className="h-7 bg-slate-200 rounded w-16"></div>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-8 bg-slate-200 rounded-md w-24"></div>
        <div className="h-8 bg-slate-200 rounded-md w-32"></div>
      </div>
    </div>
  );
}

