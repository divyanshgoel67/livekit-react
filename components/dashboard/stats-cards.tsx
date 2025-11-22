'use client';

import { Trophy, Flame, Target, TrendingUp } from 'lucide-react';
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
        <div className="flex items-center gap-3 mb-2">
          {icon}
          <span className="text-muted-foreground text-sm">{label}</span>
        </div>
        <div className="text-4xl font-bold text-foreground">{value}</div>
      </CardContent>
    </Card>
  );
}

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={<Flame className="w-5 h-5 text-accent" />}
        label="Day Streak"
        value="5"
        className="bg-card/50 backdrop-blur-sm"
      />
      <StatCard
        icon={<Trophy className="w-5 h-5 text-primary" />}
        label="Total XP"
        value="12,400"
        className="bg-card/50 backdrop-blur-sm"
      />
      <StatCard
        icon={<Target className="w-5 h-5 text-success" />}
        label="Sessions"
        value="45"
        className="bg-card/50 backdrop-blur-sm"
      />
      <StatCard
        icon={<TrendingUp className="w-5 h-5 text-accent" />}
        label="Avg. Score"
        value="78%"
        className="bg-card/50 backdrop-blur-sm"
      />
    </div>
  );
}

