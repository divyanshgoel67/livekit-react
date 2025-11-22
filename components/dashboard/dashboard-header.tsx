'use client';

import { Flame, Trophy } from 'lucide-react';

export function DashboardHeader() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, Agent User</h1>
          <p className="text-sm text-muted-foreground">Let&apos;s improve your voice agent skills today</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-xl border border-accent/20">
            <Flame className="w-5 h-5 text-accent" />
            <span className="text-foreground font-bold">5 Day Streak</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl border border-primary/20">
            <Trophy className="w-5 h-5 text-primary" />
            <span className="text-foreground font-bold">12,400 XP</span>
          </div>

          <div className="px-4 py-2 bg-card rounded-xl border border-border">
            <span className="text-sm text-muted-foreground">Rank:</span>
            <span className="text-foreground font-bold ml-2">Master Agent • Lvl 15</span>
          </div>
        </div>
      </div>
    </header>
  );
}

