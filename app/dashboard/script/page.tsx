'use client';

import Sidebar from '@/components/dashboard/sidebar-new';
import TopNav from '@/components/dashboard/top-nav';

export default function ScriptPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar />
      <TopNav />

      <main className="ml-64 p-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4 animate-in fade-in duration-500">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
            <span className="text-4xl">🚧</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Scripts</h2>
          <p className="text-slate-500 max-w-md">
            This training module is currently under construction. Please check back later or try the Introduction Calls module.
          </p>
        </div>
      </main>
    </div>
  );
}
