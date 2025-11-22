'use client';

import { AnalyticsDashboard } from '@/components/dashboard/analytics-dashboard';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard/sidebar';

export default function AnalyticsPage() {
  return (
    <div className="bg-background text-foreground flex min-h-screen">
      <DashboardSidebar />

      <main className="ml-20 flex-1">
        <DashboardHeader />

        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-foreground mb-2 text-4xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">
              Track your performance and identify areas for improvement
            </p>
          </div>

          <AnalyticsDashboard />
        </div>
      </main>
    </div>
  );
}
