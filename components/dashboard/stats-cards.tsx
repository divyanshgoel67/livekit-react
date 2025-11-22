'use client';

import { Flame, Target, TrendingUp, Trophy } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  className?: string;
}

function StatCard({ icon, label, value, className }: StatCardProps) {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="mb-2 flex items-center gap-3">
          {icon}
          <span className="text-muted-foreground text-sm">{label}</span>
        </div>
        <div className="text-foreground text-4xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        icon={<Flame className="text-accent h-5 w-5" />}
        label="Day Streak"
        value="5"
        className="bg-card/50 backdrop-blur-sm"
      />
      <StatCard
        icon={<Trophy className="text-primary h-5 w-5" />}
        label="Total XP"
        value="12,400"
        className="bg-card/50 backdrop-blur-sm"
      />
      <StatCard
        icon={<Target className="text-success h-5 w-5" />}
        label="Sessions"
        value="45"
        className="bg-card/50 backdrop-blur-sm"
      />
      <StatCard
        icon={<TrendingUp className="text-accent h-5 w-5" />}
        label="Avg. Score"
        value="78%"
        className="bg-card/50 backdrop-blur-sm"
      />
    </div>
  );
}
