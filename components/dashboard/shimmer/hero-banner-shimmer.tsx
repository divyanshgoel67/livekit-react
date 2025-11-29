'use client';

export function HeroBannerShimmer() {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-r from-slate-200 to-slate-300 p-8 shadow-lg animate-pulse">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 space-y-6">
          <div>
            <div className="h-10 bg-slate-400 rounded w-3/4 mb-3"></div>
            <div className="h-6 bg-slate-300 rounded w-full max-w-xl"></div>
            <div className="h-6 bg-slate-300 rounded w-2/3 max-w-xl mt-2"></div>
          </div>
          <div className="h-12 bg-slate-400 rounded-full w-40"></div>
        </div>
        <div className="hidden md:flex items-center justify-center w-48 h-48 bg-slate-300/50 rounded-full"></div>
      </div>
    </div>
  );
}

