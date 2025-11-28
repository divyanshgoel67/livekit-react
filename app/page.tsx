'use client';

import Sidebar from '@/components/dashboard/sidebar-new';
import TopNav from '@/components/dashboard/top-nav';
import { HomeView } from '@/components/dashboard/home-view';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar />
      <TopNav />

      <main className="ml-64 p-8 max-w-7xl mx-auto">
        <HomeView />
      </main>
    </div>
  );
}
