'use client';

import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { AnalyticsDashboard } from '@/components/dashboard/analytics-dashboard';

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <DashboardSidebar />

      <main className="flex-1 ml-20">
        <DashboardHeader />

        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Analytics</h1>
            <p className="text-muted-foreground">Track your performance and identify areas for improvement</p>
          </div>

          <AnalyticsDashboard />
        </div>
      </main>
    </div>
  );
}

