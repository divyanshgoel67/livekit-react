'use client';

import { SidebarWrapper } from '@/components/dashboard/sidebar-wrapper';
import TopNav from '@/components/dashboard/top-nav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <SidebarWrapper />
      <TopNav />
      <main className="ml-64 p-8 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
