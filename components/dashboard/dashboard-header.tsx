'use client';

import { Flame, Trophy } from 'lucide-react';

export function DashboardHeader() {
  return (
    <header className="border-border bg-card/50 border-b px-8 py-4 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground text-2xl font-bold">Welcome back, Agent User</h1>
          <p className="text-muted-foreground text-sm">
            Let&apos;s improve your voice agent skills today
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="bg-accent/10 border-accent/20 flex items-center gap-2 rounded-xl border px-4 py-2">
            <Flame className="text-accent h-5 w-5" />
            <span className="text-foreground font-bold">5 Day Streak</span>
          </div>

          <div className="bg-primary/10 border-primary/20 flex items-center gap-2 rounded-xl border px-4 py-2">
            <Trophy className="text-primary h-5 w-5" />
            <span className="text-foreground font-bold">12,400 XP</span>
          </div>

          <div className="bg-card border-border rounded-xl border px-4 py-2">
            <span className="text-muted-foreground text-sm">Rank:</span>
            <span className="text-foreground ml-2 font-bold">Master Agent • Lvl 15</span>
          </div>
        </div>
      </div>
    </header>
  );
}
